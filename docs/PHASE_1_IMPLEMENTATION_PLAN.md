# CyberLearn — Phase 1 Implementation Plan

**Document type:** Staff-level engineering specification  
**Status:** Ready for implementation  
**Branch target:** `main`  
**Source of truth:** `docs/ARCHITECTURE_AUDIT.md`  
**Audited codebase:** `main @ 6eb96a48`  
**Author:** Lead Architecture Review · 2026-07-29

---

## How to Use This Document

This document is a complete engineering specification. An engineer who has not participated in any prior design discussion should be able to read this document and implement every system without making a single architectural decision. All decisions have already been made here, with rationale provided.

**Do not deviate from the interfaces defined in this document.** They have been designed to interoperate. If you identify a genuine issue during implementation, update this document first and notify the team.

---

## Table of Contents

1. [Preamble — Scope, Principles, Glossary](#1-preamble)
2. [System Map — How the 5 Systems Relate](#2-system-map)
3. [System 1 — Event Bus](#3-system-1-event-bus)
4. [System 2 — XP Engine](#4-system-2-xp-engine)
5. [System 3 — Save Manager](#5-system-3-save-manager)
6. [System 4 — Route Guards](#6-system-4-route-guards)
7. [System 5 — Remove Dual Data Sources](#7-system-5-remove-dual-data-sources)
8. [Cross-System Integration & Data Flow](#8-cross-system-integration)
9. [Implementation Sequence](#9-implementation-sequence)
10. [Risk Register](#10-risk-register)
11. [Testing Checklist](#11-testing-checklist)

---

## 1. Preamble

### 1.1 Scope

Phase 1 delivers exactly five systems. No more. These five systems are the **prerequisite infrastructure** for every future feature — game feel, achievements, audio, dialogue, campaign maps. They must be correct, well-typed, and extensible, because every subsequent phase will build on them.

**In scope:**
- Event Bus
- XP Engine
- Save Manager
- Route Guards
- Dual Data Source removal

**Explicitly out of scope for Phase 1:**
- Audio Manager
- Achievement Engine
- Notification Overlay
- Dialogue Engine
- Scene Engine
- Campaign World Map
- Backend / HTTP API
- UI changes to Dashboard, Sidebar, or MobileNav

### 1.2 Governing Principles

Every decision in this document was made against these five criteria, in priority order:

1. **Simple** — if two designs solve the same problem, the simpler one wins
2. **Backward-compatible** — no existing feature breaks, no URL changes
3. **Testable** — pure functions preferred; side effects isolated to store actions and event emissions
4. **Mobile-first** — no synchronous blocking operations, no localStorage reads on the render thread
5. **Extensible** — interfaces are designed to absorb Phase 2–4 requirements without modification

### 1.3 Glossary

| Term | Definition in this document |
|------|----------------------------|
| **Event Bus** | Module-level singleton pub/sub system for typed game events |
| **GameEvent** | TypeScript discriminated union — the canonical type for all events |
| **XP Engine** | Pure-function calculation layer + Zustand store for XP state |
| **Save Manager** | Persistence coordination layer with adapter pattern for future cloud sync |
| **StorageAdapter** | Interface that localStorage (now) and HTTP (later) both implement |
| **Route Guard** | React Router v6 `loader` function that enforces auth before rendering |
| **Config file** | Static TypeScript file in `src/config/` — display-layer metadata only, no business logic |
| **Content Engine** | Existing `src/lib/content/` system — Vite glob + Zod validation, source of truth for curriculum data |

---

## 2. System Map

The five systems form a dependency graph. Build them in the order shown.

```
┌─────────────────────────────────────────────────────────────────┐
│                       PHASE 1 SYSTEMS                           │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                      EVENT BUS                           │  │
│  │   emit() · on() · off() · once() · onAny()               │  │
│  │   No dependencies. Built first. Everything else uses it. │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              ▲                                  │
│              ┌───────────────┼───────────────┐                  │
│              │               │               │                  │
│   ┌──────────┴──┐    ┌───────┴──────┐   ┌───┴──────────────┐   │
│   │  XP ENGINE  │    │ SAVE MANAGER │   │   ROUTE GUARDS   │   │
│   │             │    │              │   │                   │   │
│   │ Pure fns +  │    │ IStorage-    │   │ requireAuth()     │   │
│   │ useXPStore  │    │ Adapter +    │   │ redirectAuth()    │   │
│   │             │    │ SaveManager  │   │                   │   │
│   │ Emits:      │    │              │   │ Reads:            │   │
│   │ XP_AWARDED  │    │ Persists:    │   │ useAuthStore      │   │
│   │ LEVEL_UP    │    │ XP, progress │   │ .getState()       │   │
│   └──────────┬──┘    │ achievements │   └───────────────────┘   │
│              │       └──────────────┘                           │
│              │                                                   │
│   ┌──────────┴──────────────────────────────────────────────┐   │
│   │           REMOVE DUAL DATA SOURCES                      │   │
│   │                                                         │   │
│   │  src/data/academyData.ts  →  src/config/academy-       │   │
│   │                               display.config.ts         │   │
│   │  src/data/courseData.ts   →  src/config/standalone-    │   │
│   │                               courses.config.ts         │   │
│   └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### 2.1 Cross-System Data Flow (Complete Lesson Scenario)

The following sequence shows all five systems working together after Phase 1 is complete.

```
Player taps "Complete" on the last section of an Operation
│
├─ useLessonStore.completeLesson(lessonId)
│    └─ marks lesson complete + records timestamp
│
├─ useXPStore.awardXP(amount, source, bonuses)        [XP Engine]
│    ├─ calculateXPAward() → XPAwardResult            [pure fn]
│    ├─ updates totalXP + currentRank in state
│    ├─ SaveManager.persist('xp', newState)           [Save Manager]
│    ├─ EventBus.emit({ type: 'XP_AWARDED', ... })    [Event Bus]
│    └─ if rank changed:
│         EventBus.emit({ type: 'LEVEL_UP', ... })    [Event Bus]
│
├─ EventBus.emit({ type: 'LESSON_COMPLETED', ... })   [Event Bus]
│
└─ [Phase 2 listeners — not built yet, but wired in:]
     AchievementEngine.on('LESSON_COMPLETED') → evaluate conditions
     AudioManager.on('XP_AWARDED')            → play SFX
     NotificationOverlay.on('XP_AWARDED')     → show XP pop
     NotificationOverlay.on('LEVEL_UP')       → show rank-up screen
```

This is the chain that makes the platform feel like a game. Phase 1 builds the `EventBus`, `XP Engine`, and `SaveManager` links. Phase 2 adds the listeners.

---

## 3. System 1 — Event Bus

### 3.1 Purpose

A typed, synchronous, decoupled pub/sub channel. Any part of the application can emit an event without knowing who is listening. Any part of the application can subscribe to events without knowing who emits them. This is the connective tissue that allows the XP Engine, Achievement Engine, Audio Manager, and Notification System to evolve independently.

### 3.2 Responsibilities

- Provide a single, canonical channel for all platform-wide events
- Enforce compile-time type safety on both emit and subscribe
- Support multiple listeners per event type
- Support one-shot listeners (fire once, automatically unsubscribe)
- Support wildcard listeners (for analytics, logging, debugging)
- Return an unsubscribe cleanup function from every `on()` call
- Never throw from `emit()` — listener errors are caught and logged

### 3.3 Why a Module Singleton, Not a Class or Context

Three alternatives were considered:

| Option | Problem |
|--------|---------|
| `class EventBus` + dependency injection | Requires passing an instance through the component tree or using Context. Adds boilerplate. Makes it harder to use in Zustand store actions (outside React). |
| React Context + `useEventBus()` hook | Only works inside React components. Cannot be used in Zustand actions, loaders, or utility functions. |
| **Module singleton** ✅ | Importable from anywhere — React components, Zustand actions, loaders, utility functions. Zero setup. No Context providers needed. |

A module singleton is appropriate here because: (a) there is exactly one event bus in the application lifetime, (b) it carries no state (events are fire-and-forget), and (c) it needs to be accessible from outside the React tree.

### 3.4 Folder Structure

```
src/
  lib/
    events/
      event-types.ts        ← GameEvent discriminated union (the only file that grows over time)
      event-bus.ts          ← Core pub/sub implementation (rarely changes)
      index.ts              ← Public API re-export
```

### 3.5 Types

#### `event-types.ts`

```typescript
import type { Rank, Achievement } from '@/types'

// ─────────────────────────────────────────────────────────
// XP Award Source — every XP gain has a traceable origin
// ─────────────────────────────────────────────────────────

export type XPAwardSource =
  | 'lesson_completion'
  | 'mission_completion'
  | 'quiz_perfect_score'
  | 'challenge_solved'
  | 'practical_complete'
  | 'daily_login'
  | 'streak_bonus'
  | 'achievement_reward'
  | 'first_try_bonus'
  | 'speed_bonus'
  | 'combo_bonus'

// ─────────────────────────────────────────────────────────
// GameEvent — discriminated union
// Add new event types by adding a new member to this union.
// Existing code is unaffected — union is open for extension.
// ─────────────────────────────────────────────────────────

export type GameEvent =

  // ── Player lifecycle ──────────────────────────────────
  | {
      type: 'PLAYER_LOGGED_IN'
      payload: { userId: string; displayName: string }
    }
  | {
      type: 'PLAYER_LOGGED_OUT'
      payload: { userId: string }
    }
  | {
      type: 'PROFILE_UPDATED'
      payload: { field: string; previousValue: unknown; newValue: unknown }
    }

  // ── Content progress ──────────────────────────────────
  | {
      type: 'LESSON_STARTED'
      payload: { lessonId: string; courseSlug: string; moduleSlug: string }
    }
  | {
      type: 'LESSON_COMPLETED'
      payload: {
        lessonId:  string
        courseSlug: string
        xpEarned: number
        firstTime: boolean
        durationMs: number
      }
    }
  | {
      type: 'SECTION_COMPLETED'
      payload: { lessonId: string; sectionId: string; sectionType: string }
    }
  | {
      type: 'MISSION_STARTED'
      payload: { moduleSlug: string; courseSlug: string }
    }
  | {
      type: 'MISSION_COMPLETED'
      payload: { moduleSlug: string; courseSlug: string; totalXP: number }
    }
  | {
      type: 'QUIZ_COMPLETED'
      payload: {
        lessonId:   string
        sectionId:  string
        score:      number   // 0–100
        isPerfect:  boolean
        attempts:   number
      }
    }
  | {
      type: 'CHALLENGE_SOLVED'
      payload: {
        lessonId:  string
        sectionId: string
        attempts:  number
        firstTry:  boolean
      }
    }
  | {
      type: 'PRACTICAL_COMPLETED'
      payload: { lessonId: string; sectionId: string }
    }

  // ── XP & Progression ─────────────────────────────────
  | {
      type: 'XP_AWARDED'
      payload: {
        amount:     number
        source:     XPAwardSource
        lessonId?:  string
        breakdown:  XPAwardBreakdown
      }
    }
  | {
      type: 'LEVEL_UP'
      payload: {
        previousRank: Rank
        newRank:      Rank
        totalXP:      number
      }
    }
  | {
      type: 'STREAK_UPDATED'
      payload: { currentStreak: number; isNewRecord: boolean }
    }

  // ── Achievements & Rewards ────────────────────────────
  | {
      type: 'ACHIEVEMENT_UNLOCKED'
      payload: { achievement: Achievement; xpReward: number }
    }
  | {
      type: 'BADGE_UNLOCKED'
      payload: { badgeId: string; badgeName: string; moduleSlug: string }
    }
  | {
      type: 'ITEM_COLLECTED'
      payload: { itemId: string; itemType: string; source: string }
    }

  // ── Audio ─────────────────────────────────────────────
  | {
      type: 'AUDIO_PLAY'
      payload: {
        track:    string
        category: 'music' | 'sfx' | 'voice'
        loop?:    boolean
        volume?:  number
      }
    }
  | {
      type: 'AUDIO_STOP'
      payload: { track?: string; category?: 'music' | 'sfx' | 'voice' }
    }

  // ── Scenes & Narrative ────────────────────────────────
  | {
      type: 'SCENE_CHANGED'
      payload: {
        fromScene: string | null
        toScene:   string
        transition: 'fade' | 'slide' | 'cut' | 'dissolve'
      }
    }
  | {
      type: 'DIALOGUE_STARTED'
      payload: { dialogueId: string; characterId: string }
    }
  | {
      type: 'DIALOGUE_ENDED'
      payload: { dialogueId: string }
    }

  // ── UI Notifications ──────────────────────────────────
  | {
      type: 'NOTIFICATION_PUSH'
      payload: {
        id:       string
        variant:  'xp' | 'achievement' | 'level-up' | 'info' | 'error'
        title:    string
        body?:    string
        duration: number   // ms
        icon?:    string
      }
    }

// ─────────────────────────────────────────────────────────
// XPAwardBreakdown — inline here because it belongs to events
// (the full XP type system lives in src/lib/xp/)
// ─────────────────────────────────────────────────────────

export interface XPAwardBreakdown {
  base:    number
  bonuses: Array<{ type: XPAwardSource; amount: number; reason: string }>
  multiplier: number
  total:   number
}
```

### 3.6 Interface — `event-bus.ts`

```typescript
// Public surface of the Event Bus module

// Subscribe to a specific event type
// Returns an unsubscribe cleanup function
export function on<K extends GameEvent['type']>(
  type: K,
  listener: (event: Extract<GameEvent, { type: K }>) => void
): () => void

// Subscribe to all events (wildcard) — for analytics and debugging only
export function onAny(
  listener: (event: GameEvent) => void
): () => void

// Subscribe to an event exactly once, then auto-unsubscribe
export function once<K extends GameEvent['type']>(
  type: K,
  listener: (event: Extract<GameEvent, { type: K }>) => void
): () => void

// Emit an event to all registered listeners
// Never throws — listener errors are caught, logged, and silenced
export function emit<T extends GameEvent>(event: T): void

// Remove all listeners (use in tests only)
export function _resetForTests(): void
```

### 3.7 Implementation Notes

**Listener error isolation:** Each listener call is wrapped in `try/catch`. A throwing listener does not prevent other listeners from receiving the event. Errors are logged to `console.error` in development and silently swallowed in production.

**Synchronous dispatch:** All listeners are called synchronously within `emit()`. This is a deliberate choice — it keeps the call stack readable and avoids ordering bugs that async dispatch introduces. If a listener needs to do async work (e.g., save to backend), it should kick off a Promise internally and not block `emit()`.

**Memory management:** Every `on()` call returns a cleanup function. Components must call it in their `useEffect` cleanup. Zustand store subscribers (which live for the app lifetime) do not need to clean up.

**No replay, no persistence:** Events are fire-and-forget. There is no event log, no replay, no persistence. If a listener misses an event (e.g., because it subscribed after emit was called), it does not receive it. This is intentional — components should derive state from stores, not from event history.

### 3.8 Data Flow

```
emit(event)
    │
    ├── wildcard listeners called first (analytics)
    │
    ├── type-specific listeners called in registration order
    │   ├── listener 1 called (try/catch wrapped)
    │   ├── listener 2 called (try/catch wrapped)
    │   └── listener N called (try/catch wrapped)
    │
    └── returns void (synchronous, no await)
```

### 3.9 State Management

The Event Bus carries **no state**. It is a pure routing layer. State changes happen in Zustand stores that listen to events. The bus itself is a stateless map of `Set<listener>` collections keyed by event type.

### 3.10 Error Handling

| Scenario | Behavior |
|----------|----------|
| Listener throws synchronously | Caught. Other listeners still fire. Error logged in dev. |
| `emit()` called before any listeners registered | Silent no-op. Safe to call at any time. |
| Same listener registered twice | Registered twice, fires twice. Use `once()` or manage externally. |
| `on()` cleanup function called twice | Safe no-op on second call. |
| `emit()` from inside a listener (re-entrancy) | Supported. Listener sets do not change during dispatch. |

### 3.11 Mobile Considerations

- Zero performance cost when no listeners are registered (early return in emit)
- Synchronous dispatch keeps frame budget predictable
- Wildcard listeners (`onAny`) should never be registered in production builds — add a dev-only guard

### 3.12 Future Extensibility

The `GameEvent` union is open for extension. Add new members without modifying existing code. The `switch/case` pattern in any listener will cause a TypeScript error for unhandled cases if `never` exhaustive checks are used — this is a feature, not a bug.

**Phase 2 additions expected:**
- `NOTIFICATION_PUSH` → NotificationOverlay subscribes
- `AUDIO_PLAY` / `AUDIO_STOP` → AudioManager subscribes
- `ACHIEVEMENT_UNLOCKED` → NotificationOverlay + AchievementStore subscribe
- `SCENE_CHANGED` → SceneEngine subscribes
- `DIALOGUE_STARTED` → DialogueEngine subscribes

### 3.13 Example Usage

**In a Zustand store action (outside React):**
```typescript
import { emit } from '@/lib/events'

// Inside useXPStore
awardXP: (amount, source, breakdown) => {
  // ... update state ...
  emit({ type: 'XP_AWARDED', payload: { amount, source, breakdown } })
}
```

**In a React component (with cleanup):**
```typescript
import { on } from '@/lib/events'

useEffect(() => {
  const unsubscribe = on('XP_AWARDED', (event) => {
    console.log('XP gained:', event.payload.amount)
  })
  return unsubscribe  // called on unmount
}, [])
```

**One-shot listener (e.g., waiting for first completion):**
```typescript
import { once } from '@/lib/events'

once('LESSON_COMPLETED', (event) => {
  // Fires only the first time any lesson is completed, then auto-cleans up
  trackFirstLessonCompletion(event.payload.lessonId)
})
```

### 3.14 Integration Points

- **`useXPStore`** — emits `XP_AWARDED`, `LEVEL_UP` after state updates
- **`useLessonStore`** — emits `LESSON_STARTED`, `LESSON_COMPLETED`, `SECTION_COMPLETED`
- **`useAuthStore`** — emits `PLAYER_LOGGED_IN`, `PLAYER_LOGGED_OUT`
- **Phase 2: `AudioManager`** — listens to `XP_AWARDED`, `ACHIEVEMENT_UNLOCKED`, `LESSON_COMPLETED`
- **Phase 2: `NotificationOverlay`** — listens to `NOTIFICATION_PUSH`, `XP_AWARDED`, `LEVEL_UP`
- **Phase 2: `AchievementEngine`** — listens to `LESSON_COMPLETED`, `QUIZ_COMPLETED`, `CHALLENGE_SOLVED`

### 3.15 Migration Strategy

No migration needed. This is a new file with no existing consumers. Wire existing stores to emit events after Phase 1 is complete (see Section 8: Cross-System Integration).

### 3.16 Testing Strategy

```
[ ] emit() with no listeners — no throw, no error
[ ] on() registers listener, listener fires on emit()
[ ] on() cleanup function stops listener from firing
[ ] once() fires exactly once, then stops
[ ] onAny() receives all event types
[ ] Listener that throws does not prevent other listeners from firing
[ ] Re-entrant emit() (emit from inside a listener) does not cause infinite loop
[ ] TypeScript: emit() with wrong payload shape → compile error
[ ] TypeScript: on() with non-existent event type → compile error
[ ] _resetForTests() clears all listeners between test cases
```

---

## 4. System 2 — XP Engine

### 4.1 Purpose

The XP Engine is the authoritative source for:
1. Calculating how much XP to award for any action
2. Maintaining the player's total XP and current rank
3. Notifying the rest of the platform when XP is earned or rank changes

The XP Engine **never touches the UI directly**. It calculates, stores, and emits. Phase 2 systems (Notification Overlay, Audio Manager) react to the events.

### 4.2 Responsibilities

- Accept XP award requests with a base amount + optional bonuses
- Calculate the final award amount (base × multiplier + bonuses)
- Update `totalXP` in persisted state
- Compare before/after rank against the `RANKS` table (already defined in `src/types/index.ts`)
- Emit `XP_AWARDED` event with full breakdown
- Emit `LEVEL_UP` event if the player crossed a rank threshold
- Expose `getTotalXP()`, `getCurrentRank()`, `getRankProgress()` selectors
- Wire into `useLessonStore.completeLesson()` to automatically award lesson XP

### 4.3 Architecture Decision — Pure Functions + Zustand Store

The XP Engine is split into two layers:

```
src/lib/xp/
  xp-engine.ts       ← PURE FUNCTIONS — no side effects, fully unit testable
  xp-rules.ts        ← Bonus definitions, multiplier table, speed thresholds
  index.ts           ← Re-export public API

src/store/
  xp-store.ts        ← ZUSTAND STORE — state + side effects + event emission
```

**Why split?** Pure functions are trivially unit-testable without mocking stores, React, or the event bus. The store coordinates the pure functions with side effects (persistence, event emission). This pattern is identical to how `useLessonStore` works today.

### 4.4 Folder Structure

```
src/
  lib/
    xp/
      xp-engine.ts    ← calculateXPAward(), getRankForXP(), getRankProgress()
      xp-rules.ts     ← BONUS_RULES, MULTIPLIERS, SPEED_THRESHOLDS
      index.ts        ← Public API
  store/
    xp-store.ts       ← useXPStore (Zustand, persisted)
  types/
    index.ts          ← RANKS already here — DO NOT MOVE
```

### 4.5 Types

#### `xp-rules.ts`

```typescript
import type { XPAwardSource } from '@/lib/events'

// ─────────────────────────────────────────────────────────
// Multiplier sources — applied to the BASE amount only
// ─────────────────────────────────────────────────────────

export interface XPMultiplier {
  type:   'streak' | 'daily' | 'pro' | 'event'
  value:  number    // 1.0 = no change, 1.5 = +50%, 2.0 = double
  label:  string    // displayed in XP breakdown UI
  active: boolean
}

// ─────────────────────────────────────────────────────────
// Speed bonus — awarded when lesson completed faster than threshold
// ─────────────────────────────────────────────────────────

export interface SpeedThreshold {
  maxPercentOfEstimate: number   // e.g. 0.6 = completed in < 60% of estimated time
  bonusPercent:         number   // e.g. 0.25 = +25% of base XP
  label:                string
}

export const SPEED_THRESHOLDS: SpeedThreshold[] = [
  { maxPercentOfEstimate: 0.50, bonusPercent: 0.50, label: 'Lightning Fast' },
  { maxPercentOfEstimate: 0.65, bonusPercent: 0.25, label: 'Speed Run' },
  { maxPercentOfEstimate: 0.80, bonusPercent: 0.10, label: 'Quick Study' },
]

// ─────────────────────────────────────────────────────────
// Streak multiplier table
// ─────────────────────────────────────────────────────────

export const STREAK_MULTIPLIERS: Record<number, number> = {
  0:  1.0,
  3:  1.1,
  7:  1.25,
  14: 1.5,
  30: 2.0,
}

// ─────────────────────────────────────────────────────────
// Fixed bonus amounts by source
// ─────────────────────────────────────────────────────────

export const BONUS_AMOUNTS: Partial<Record<XPAwardSource, number>> = {
  quiz_perfect_score: 50,
  challenge_solved:   75,
  first_try_bonus:    100,
  daily_login:        25,
}
```

#### `xp-engine.ts` (pure function signatures)

```typescript
import type { Rank } from '@/types'
import type { XPAwardBreakdown, XPAwardSource } from '@/lib/events'
import type { XPMultiplier } from './xp-rules'

// ─────────────────────────────────────────────────────────
// Input to the XP calculation engine
// ─────────────────────────────────────────────────────────

export interface XPAwardInput {
  base:         number
  source:       XPAwardSource
  bonuses?:     Array<{ type: XPAwardSource; amount: number; reason: string }>
  multipliers?: XPMultiplier[]
}

// ─────────────────────────────────────────────────────────
// Output — full breakdown for display and event emission
// ─────────────────────────────────────────────────────────

export interface XPAwardResult {
  breakdown:   XPAwardBreakdown   // matches event payload type
  finalAmount: number             // floor(breakdown.total)
}

// ─────────────────────────────────────────────────────────
// Rank progress — for progress bar rendering
// ─────────────────────────────────────────────────────────

export interface RankProgress {
  currentRank:  Rank
  nextRank:     Rank | null     // null if at max rank
  xpIntoRank:   number          // XP earned within current rank
  xpNeeded:     number          // XP needed to reach next rank
  progressPct:  number          // 0–100
}

// ─────────────────────────────────────────────────────────
// Pure function signatures
// (implementations are pure: same input → same output, no side effects)
// ─────────────────────────────────────────────────────────

export function calculateXPAward(input: XPAwardInput): XPAwardResult
export function getRankForXP(totalXP: number): Rank
export function getRankProgress(totalXP: number): RankProgress
export function getStreakMultiplier(streakDays: number): number
```

### 4.6 Zustand Store Interface — `xp-store.ts`

```typescript
import type { Rank } from '@/types'
import type { XPAwardSource, XPAwardBreakdown } from '@/lib/events'
import type { RankProgress } from '@/lib/xp'

interface XPStoreState {
  // ── Persisted state ──────────────────────────────────
  totalXP:      number
  currentRank:  Rank
  rankHistory:  Array<{ rank: Rank; achievedAt: number }>

  // ── Actions ──────────────────────────────────────────
  awardXP: (
    amount:    number,
    source:    XPAwardSource,
    options?:  {
      lessonId?:   string
      bonuses?:    XPAwardBreakdown['bonuses']
      multiplier?: number
    }
  ) => XPAwardBreakdown

  // ── Selectors (non-persisted derived state) ──────────
  getRankProgress: () => RankProgress
  getXPToNextRank: () => number
}

// Persisted keys: totalXP, currentRank, rankHistory
// localStorage key: 'cyber-learn:v1:xp'
```

### 4.7 Data Flow

```
Caller: useLessonStore.completeLesson(lessonId)
│
├─ useXPStore.awardXP(lesson.xpReward, 'lesson_completion', { lessonId })
│    │
│    ├─ calculateXPAward({ base, source, bonuses, multipliers })
│    │    ├─ sum bonuses
│    │    ├─ apply streak multiplier
│    │    └─ return { breakdown, finalAmount }
│    │
│    ├─ previousRank = currentRank
│    ├─ totalXP += finalAmount
│    ├─ currentRank = getRankForXP(totalXP)
│    │
│    ├─ emit({ type: 'XP_AWARDED', payload: { amount, source, breakdown, lessonId } })
│    │
│    └─ if currentRank.tier !== previousRank.tier:
│         ├─ rankHistory.push({ rank: currentRank, achievedAt: Date.now() })
│         └─ emit({ type: 'LEVEL_UP', payload: { previousRank, newRank: currentRank, totalXP } })
│
└─ SaveManager.persist('xp', newState)
```

### 4.8 State Management

| Field | Persisted | Type | Notes |
|-------|-----------|------|-------|
| `totalXP` | ✅ | `number` | Authoritative XP total |
| `currentRank` | ✅ | `Rank` | Derived from `totalXP` but persisted for instant read |
| `rankHistory` | ✅ | `Rank[]` | Record of when each rank was reached |

**localStorage key:** `cyber-learn:v1:xp`

**Initialization:** On first load, if no persisted state exists, `totalXP = 0`, `currentRank = RANKS[0]` (Script Kiddie).

**Existing `RANKS` array in `src/types/index.ts` is used directly** — do not copy or duplicate it.

### 4.9 Wiring Into Existing Lesson Store

`useLessonStore.completeLesson()` currently marks the lesson as complete but awards no XP. After Phase 1, add XP award after the state update:

```
// EXTEND (do not rewrite) useLessonStore.completeLesson():
// After the existing state update, add:
//   const xpReward = get().getLessonXPReward(lessonId) // see note below
//   useXPStore.getState().awardXP(xpReward, 'lesson_completion', { lessonId })
//   emit({ type: 'LESSON_COMPLETED', payload: { lessonId, xpEarned: xpReward, firstTime: true, ... } })
```

**Note on XP reward lookup:** The lesson's `xpReward` value comes from the lesson JSON (accessible from `useLessonStore.progress[lessonId]`). For Phase 1, the approach is: the caller of `completeLesson()` passes the `xpReward` as a parameter. The lesson player already has this value from the loaded `FullLesson` object. This avoids requiring the lesson store to load content JSON.

```typescript
// Extended signature:
completeLesson: (lessonId: string, xpReward: number) => void
```

### 4.10 Error Handling

| Scenario | Behavior |
|----------|----------|
| `awardXP` called with `amount <= 0` | Log warning, award 0, emit no events |
| `calculateXPAward` receives negative bonus | Bonus is clamped to 0 |
| `totalXP` would exceed `Number.MAX_SAFE_INTEGER` | Clamped, warning logged |
| `getRankForXP` called with NaN | Returns `RANKS[0]` (Script Kiddie) |
| localStorage quota exceeded | SaveManager handles — see Section 5 |

### 4.11 Mobile Considerations

- All calculations are synchronous, O(n) where n = number of bonuses (always small)
- No DOM interaction, no layout recalculation
- `getRankProgress()` is computed on demand — not stored — to avoid stale derived state
- Framer Motion XP bar animations are triggered by the `XP_AWARDED` event in Phase 2, not by polling

### 4.12 Future Extensibility

The `XPMultiplier` array in `awardXP()` is the extension point for:
- Pro subscription multiplier (1.5×)
- Live event multiplier ("Weekend XP Rush" 2×)
- Seasonal multipliers
- Referral bonuses

Add new `XPAwardSource` values to `event-types.ts` without touching any existing code.

### 4.13 Example Usage

**In the lesson player (after lesson completion):**
```typescript
// src/features/lesson/components/lesson-player.tsx
const { awardXP } = useXPStore()

const handleComplete = () => {
  useLessonStore.getState().completeLesson(lesson.id, lesson.xpReward)
  // awardXP is called inside completeLesson after the extend
}
```

**Reading rank progress for UI:**
```typescript
const { getRankProgress } = useXPStore()
const progress = getRankProgress()
// progress.progressPct → XP bar fill percentage
// progress.currentRank → rank label, icon, color
// progress.nextRank    → next rank name for "X XP to Pentester" display
```

### 4.14 Integration Points

- **`useLessonStore.completeLesson()`** — calls `useXPStore.awardXP()` after state update
- **`EventBus`** — receives `XP_AWARDED` and `LEVEL_UP` emissions
- **`SaveManager`** — persists `xp-store` state after each award
- **Dashboard `XPBar` component** — reads `useXPStore.getRankProgress()` (replaces mock `MOCK_USER.xp`)
- **Sidebar user panel** — reads `useXPStore.totalXP` (replaces `mockUser.xp`)
- **Phase 2: Notification Overlay** — listens to `XP_AWARDED`, `LEVEL_UP` events
- **Phase 2: Audio Manager** — listens to `XP_AWARDED` to play SFX

### 4.15 Testing Strategy

```
[ ] calculateXPAward({ base: 100 }) → finalAmount === 100
[ ] calculateXPAward({ base: 100, bonuses: [{ amount: 50 }] }) → finalAmount === 150
[ ] calculateXPAward with multiplier 1.5 → finalAmount === base × 1.5
[ ] Bonuses are itemized in breakdown.bonuses array
[ ] getRankForXP(0) → RANKS[0] (Script Kiddie)
[ ] getRankForXP(500) → RANKS[1] (Blue Teamer)
[ ] getRankForXP(2000) → RANKS[2] (Analyst)
[ ] getRankForXP(Infinity) → RANKS[RANKS.length - 1] (Zero Day)
[ ] getRankProgress(0) → progressPct: 0, nextRank: Blue Teamer
[ ] getRankProgress(1250) → progressPct: 50, within Analyst range
[ ] awardXP emits XP_AWARDED event with correct payload
[ ] awardXP crossing a rank boundary emits LEVEL_UP event
[ ] awardXP NOT crossing rank boundary does NOT emit LEVEL_UP
[ ] awardXP with amount 0 emits no events, logs warning
[ ] getStreakMultiplier(0) → 1.0
[ ] getStreakMultiplier(7) → 1.25
[ ] getStreakMultiplier(30) → 2.0
[ ] Store state is persisted to localStorage under 'cyber-learn:v1:xp'
[ ] Store initializes from persisted state on reload
```

---

## 5. System 3 — Save Manager

### 5.1 Purpose

A centralized persistence coordination layer with an adapter interface. Today the adapter is `localStorage`. In Phase 3, the adapter is an HTTP API. The application code never changes — only the adapter implementation swaps.

The Save Manager is **not** a replacement for Zustand's `persist` middleware. Zustand `persist` handles real-time store-to-localStorage writes. The Save Manager adds:
1. **Namespaced key registry** — prevents collisions between stores
2. **Version migrations** — upgrade persisted state between app versions
3. **Quota monitoring** — warn before localStorage fills (critical on mobile)
4. **Adapter abstraction** — the interface that allows a future HTTP adapter to slot in

### 5.2 Responsibilities

- Define canonical storage keys for all persisted domains
- Provide a `StorageAdapter` interface that both localStorage and HTTP implement
- Run schema version migrations at app startup
- Monitor storage quota and emit `NOTIFICATION_PUSH` warnings when near limit
- Provide `exportSave()` / `importSave()` for local backup (Phase 1 stub, Phase 2 full implementation)

### 5.3 Architecture

```
src/
  lib/
    persistence/
      storage-adapter.ts          ← IStorageAdapter interface
      local-storage-adapter.ts    ← localStorage implementation
      key-registry.ts             ← STORAGE_KEYS — canonical key names
      migrations.ts               ← VERSION + migration runner
      save-manager.ts             ← SaveManager singleton
      index.ts                    ← Public API
```

### 5.4 Key Registry — `key-registry.ts`

All localStorage keys in the application must be defined here. No store, component, or utility may use a hardcoded string key for localStorage access.

```typescript
// ─────────────────────────────────────────────────────────
// Namespace: cyber-learn:v{version}:{domain}
// ─────────────────────────────────────────────────────────

export const STORAGE_VERSION = 1

export const STORAGE_KEYS = {
  // Existing keys (from Zustand persist middleware — DO NOT CHANGE)
  AUTH:             'cyber-learn-auth',
  LESSON_PROGRESS:  'cyber-learn-lesson-progress',
  UI:               'cyber-learn-ui',

  // New keys (Phase 1)
  XP:               `cyber-learn:v${STORAGE_VERSION}:xp`,
  ACHIEVEMENTS:     `cyber-learn:v${STORAGE_VERSION}:achievements`,
  SETTINGS:         `cyber-learn:v${STORAGE_VERSION}:settings`,
  CAREER:           `cyber-learn:v${STORAGE_VERSION}:career`,
  INVENTORY:        `cyber-learn:v${STORAGE_VERSION}:inventory`,

  // Save metadata
  SAVE_VERSION:     'cyber-learn:save-version',
  SAVE_CHECKSUM:    'cyber-learn:save-checksum',
} as const

export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS]
```

**Note on existing keys:** The three existing Zustand `persist` keys (`cyber-learn-auth`, `cyber-learn-lesson-progress`, `cyber-learn-ui`) are not versioned. They predate the Save Manager. Leave them as-is — changing them would lose all existing user progress. New keys introduced in Phase 1 use the versioned `cyber-learn:v1:*` namespace.

### 5.5 Adapter Interface — `storage-adapter.ts`

```typescript
// ─────────────────────────────────────────────────────────
// IStorageAdapter — every persistence backend implements this
// ─────────────────────────────────────────────────────────

export interface IStorageAdapter {
  readonly name: string

  // Read a value — returns null if not found
  get<T>(key: string): Promise<T | null>

  // Write a value
  set<T>(key: string, value: T): Promise<void>

  // Delete a value
  remove(key: string): Promise<void>

  // Delete all keys with the given prefix (or all keys if no prefix)
  clear(prefix?: string): Promise<void>

  // List all keys (optionally filtered by prefix)
  keys(prefix?: string): Promise<string[]>

  // Estimated bytes used (approximate, used for quota monitoring)
  estimatedUsageBytes(): Promise<number>

  // True if the adapter is currently available and writable
  isAvailable(): Promise<boolean>
}
```

**Why async?** localStorage is synchronous, but an HTTP adapter is not. The interface must be async to be compatible with both. On mobile, even localStorage access can block for several milliseconds on cold reads — async encourages correct patterns.

### 5.6 LocalStorageAdapter — `local-storage-adapter.ts`

Key implementation details (do not deviate):

1. `get<T>()` — `JSON.parse(localStorage.getItem(key))`. Returns null on parse error (corrupted data), logs warning.
2. `set<T>()` — `localStorage.setItem(key, JSON.stringify(value))`. Catches `QuotaExceededError` and throws a typed `StorageQuotaError` — never silently fails.
3. `estimatedUsageBytes()` — sums `(key.length + value.length) * 2` for all keys (UTF-16 approximation).
4. `isAvailable()` — attempts a write/delete of a sentinel key; returns false if it throws (private browsing mode).

```typescript
export class StorageQuotaError extends Error {
  constructor(public readonly bytesRequested: number) {
    super(`localStorage quota exceeded (requested ~${bytesRequested} bytes)`)
    this.name = 'StorageQuotaError'
  }
}
```

### 5.7 Migrations — `migrations.ts`

```typescript
export interface Migration {
  fromVersion: number
  toVersion:   number
  description: string
  run:         (adapter: IStorageAdapter) => Promise<void>
}

// ─────────────────────────────────────────────────────────
// Registered migrations — add new entries as the app evolves.
// Each migration runs exactly once, in version order.
// ─────────────────────────────────────────────────────────

export const MIGRATIONS: Migration[] = [
  // Phase 1 baseline — no data transformation needed.
  // This migration just establishes the version baseline.
  {
    fromVersion: 0,
    toVersion:   1,
    description: 'Phase 1 baseline — establish save version',
    run:         async (_adapter) => { /* no-op */ },
  },
  // Future example:
  // {
  //   fromVersion: 1,
  //   toVersion:   2,
  //   description: 'Rename rank field in XP store',
  //   run: async (adapter) => {
  //     const xp = await adapter.get(STORAGE_KEYS.XP)
  //     if (xp && 'oldRankField' in xp) {
  //       xp.newRankField = xp.oldRankField
  //       delete xp.oldRankField
  //       await adapter.set(STORAGE_KEYS.XP, xp)
  //     }
  //   },
  // },
]
```

### 5.8 Save Manager — `save-manager.ts`

```typescript
// ─────────────────────────────────────────────────────────
// SaveManager — singleton, created once at app startup
// ─────────────────────────────────────────────────────────

export interface ISaveManager {
  // Run migrations at app startup (call once from main.tsx or App.tsx)
  initialize(): Promise<void>

  // Read/write through the active adapter
  get<T>(key: StorageKey): Promise<T | null>
  set<T>(key: StorageKey, value: T): Promise<void>
  remove(key: StorageKey): Promise<void>

  // Storage health
  checkQuota(): Promise<StorageQuotaStatus>

  // Backup (Phase 1: stub that returns JSON blob; Phase 2: cloud upload)
  exportSave(): Promise<string>
  importSave(json: string): Promise<void>

  // Swap the active adapter (used in tests + future cloud sync toggle)
  setAdapter(adapter: IStorageAdapter): void
}

export interface StorageQuotaStatus {
  usedBytes:     number
  estimatedMax:  number   // 5,000,000 for localStorage
  usedPercent:   number   // 0–100
  isNearLimit:   boolean  // true if > 80%
  isCritical:    boolean  // true if > 95%
}
```

**Singleton pattern:** Export a pre-constructed instance: `export const saveManager = new SaveManagerImpl(new LocalStorageAdapter())`. This is importable from anywhere. Tests can call `saveManager.setAdapter(mockAdapter)` to swap the backend.

### 5.9 App Startup — Initialization

In `src/main.tsx`, before `ReactDOM.render`:

```
saveManager.initialize()
  │
  ├─ checks current SAVE_VERSION in localStorage
  ├─ runs all pending MIGRATIONS in order
  ├─ writes new SAVE_VERSION to localStorage
  ├─ checkQuota()
  │    └─ if isNearLimit: emit NOTIFICATION_PUSH warning (Phase 2)
  └─ resolves — app is ready to render
```

**Race condition note:** `initialize()` must complete before any store reads happen. In `main.tsx`, use `await saveManager.initialize()` before calling `createRoot().render()`. This is a one-time ~5ms operation.

### 5.10 Data Flow — Write Path

```
useXPStore.awardXP()
│
├─ [updates Zustand state — triggers Zustand persist middleware]
│    └─ persist writes to localStorage key 'cyber-learn-auth' (existing behavior, unchanged)
│
└─ saveManager.set(STORAGE_KEYS.XP, newXPState)
     └─ localStorageAdapter.set(key, value)
          ├─ JSON.stringify(value)
          ├─ localStorage.setItem(key, json)
          └─ catches QuotaExceededError → throws StorageQuotaError
```

**Note:** For Phase 1, the XP store uses `saveManager.set()` directly rather than Zustand's `persist` middleware. This is because Zustand `persist` uses its own key format that bypasses the Key Registry. As Phase 1 systems are new (no existing persisted state), this is safe. The three existing stores continue using Zustand `persist` unchanged.

### 5.11 Error Handling

| Scenario | Behavior |
|----------|----------|
| `StorageQuotaError` from `set()` | Caught by SaveManager. Emits `NOTIFICATION_PUSH` with warning. Logs to console. Does not crash. |
| Corrupted JSON in `get()` | Returns `null`. Logs warning. App treats as missing data (re-initializes). |
| Migration throws | Caught. Migration is skipped. Previous version number is retained (will retry next startup). Error logged. |
| `isAvailable()` returns false | App falls back to in-memory only. Warns user on next render. |
| `importSave()` receives malformed JSON | Throws `SaveImportError`. Existing state is not modified. |

### 5.12 Mobile Considerations

- localStorage on iOS Safari has a 5 MB limit (lower than desktop Chrome's 10 MB). The `estimatedMax` in `checkQuota()` should use 5,000,000 bytes as the conservative limit.
- Storage access on the main thread blocks rendering. All adapter methods are async and should never be called during render.
- `initialize()` at startup (before first render) is the safe window for synchronous-ish storage access — it completes in < 10ms on mobile hardware.
- When localStorage is unavailable (private browsing mode on iOS Safari), the app must degrade gracefully. Use `isAvailable()` check at startup and display an in-app notice.

### 5.13 Future Extensibility

**Phase 3: HTTP Adapter**
```typescript
class HttpStorageAdapter implements IStorageAdapter {
  // Reads from local cache first, syncs to server async
  async get<T>(key: string): Promise<T | null> { ... }
  // Writes locally + queues server sync
  async set<T>(key: string, value: T): Promise<void> { ... }
}
```

The application code (`saveManager.get()`, `saveManager.set()`) does not change. Only the adapter constructor arg changes.

**Phase 3: Offline queue**
Add `syncQueue: Array<{ key, value, timestamp }>` to the HTTP adapter. When network is unavailable, writes go to the queue. When network restores, the queue drains. This is transparent to calling code.

### 5.14 Testing Strategy

```
[ ] LocalStorageAdapter.get() returns null for missing key
[ ] LocalStorageAdapter.get() returns parsed value for existing key
[ ] LocalStorageAdapter.get() returns null for corrupted JSON (logs warning)
[ ] LocalStorageAdapter.set() persists value to localStorage
[ ] LocalStorageAdapter.set() throws StorageQuotaError when quota exceeded
[ ] LocalStorageAdapter.remove() deletes key
[ ] LocalStorageAdapter.estimatedUsageBytes() returns approximate byte count
[ ] LocalStorageAdapter.isAvailable() returns true in normal environment
[ ] Migrations run in version order
[ ] Each migration runs exactly once (idempotent)
[ ] save version is written after all migrations complete
[ ] checkQuota() correctly computes usedPercent
[ ] checkQuota() isNearLimit = true when > 80%
[ ] exportSave() returns valid JSON string containing all STORAGE_KEYS
[ ] importSave() with valid JSON restores all keys
[ ] importSave() with invalid JSON throws SaveImportError without modifying state
[ ] setAdapter() swaps adapter for subsequent calls (critical for test isolation)
```

---

## 6. System 4 — Route Guards

### 6.1 Purpose

Prevent unauthenticated users from accessing protected routes. Redirect authenticated users away from Login and Register pages. Preserve the intended destination so users land where they expected after logging in.

### 6.2 The React Router v6 Loader Pattern

React Router v6 provides `loader` functions that run before a route's component renders. They can return data (loaded by `useLoaderData()`) or a `redirect()` Response. This is the correct pattern for auth guards — it prevents the protected page from rendering at all, rather than conditionally rendering a spinner or redirect component.

**Critical:** Zustand's `getState()` is synchronous and works outside React components. This means auth checks in loaders are instant — no async required.

### 6.3 Folder Structure

```
src/
  router/
    guards.ts     ← requireAuth(), redirectIfAuthenticated()
    index.tsx     ← EXTEND: add loader: requireAuth to protected routes
```

### 6.4 Guards Interface — `guards.ts`

```typescript
import { redirect } from 'react-router-dom'
import type { LoaderFunctionArgs } from 'react-router-dom'
import { useAuthStore } from '@/store/auth-store'
import { ROUTES } from '@/lib/constants'

// ─────────────────────────────────────────────────────────
// requireAuth
//
// Use as the `loader` on any route that requires authentication.
// Returns null (no data) if authenticated.
// Returns a redirect Response to /login if not authenticated.
//
// Preserves the intended destination in a `redirect` query param.
// ─────────────────────────────────────────────────────────

export function requireAuth({ request }: LoaderFunctionArgs): Response | null {
  const { isAuthenticated } = useAuthStore.getState()
  if (!isAuthenticated) {
    const url = new URL(request.url)
    const redirectParam = encodeURIComponent(url.pathname + url.search)
    throw redirect(`${ROUTES.AUTH.LOGIN}?redirect=${redirectParam}`)
  }
  return null
}

// ─────────────────────────────────────────────────────────
// redirectIfAuthenticated
//
// Use as the `loader` on Login and Register routes.
// Bounces already-authenticated users to the dashboard.
// ─────────────────────────────────────────────────────────

export function redirectIfAuthenticated(): Response | null {
  const { isAuthenticated } = useAuthStore.getState()
  if (isAuthenticated) {
    throw redirect(ROUTES.DASHBOARD)
  }
  return null
}
```

### 6.5 Router Changes — `index.tsx`

Apply guards by adding `loader` properties to existing route objects. Do not restructure the router.

```
BEFORE:
  { path: 'dashboard', element: <Dashboard /> }

AFTER:
  { path: 'dashboard', element: <Dashboard />, loader: requireAuth }
```

**Routes that require `loader: requireAuth`:**
```
/dashboard
/academy-paths
/courses
/courses/:courseSlug
/labs
/challenges
/leaderboard
/career-hub
/certificates
/resources
/community
/profile
/settings
/courses/:courseSlug/lessons/:lessonSlug   ← LessonPage (outside AppLayout)
```

**Routes that require `loader: redirectIfAuthenticated`:**
```
/login
/register
/forgot-password
```

**Routes with no guard:**
```
/                ← root redirect, not a page
/*               ← 404 page
```

### 6.6 Post-Login Redirect — `useRedirectParam` Hook

After login succeeds, the app should navigate to the original destination. Add this hook in `src/hooks/use-redirect-param.ts`:

```typescript
// Reads the `redirect` query param from the current URL.
// Used in the Login page to navigate after successful auth.
export function useRedirectParam(): string {
  // reads URLSearchParams from useLocation()
  // returns decoded redirect param, or ROUTES.DASHBOARD as default
}
```

The Login page currently calls `setUser()` and `setToken()` separately. After Phase 1, the auth store should have an atomic `login()` action (see Section 6.7).

### 6.7 Auth Store Extension (Minimal)

The existing `useAuthStore` needs one addition — an atomic `login()` action. This is a one-line change. Do not restructure the store.

```typescript
// ADD to existing auth-store interface:
login: (user: UserProfile, token: string) => void

// Implementation:
login: (user, token) =>
  set({ user, token, isAuthenticated: true }),
```

**Why atomic?** The current `setUser()` + `setToken()` sequence triggers two renders. Between the two renders, `isAuthenticated` is briefly true but `user` is null. Route guards read `isAuthenticated` — this inconsistency could briefly allow a route guard to pass with a null user. The atomic `login()` action eliminates the intermediate state.

### 6.8 Data Flow — Auth Check

```
Browser navigates to /dashboard (or /courses/:slug/lessons/:slug)
│
├─ React Router calls: requireAuth({ request })
│    ├─ useAuthStore.getState()  ← synchronous
│    │
│    ├─ isAuthenticated === false?
│    │    └─ throw redirect('/login?redirect=%2Fdashboard')
│    │         └─ React Router intercepts, renders Login page
│    │
│    └─ isAuthenticated === true?
│         └─ return null  ← route renders normally
│
└─ Component renders
```

```
User logs in successfully
│
├─ useAuthStore.getState().login(user, token)
│    └─ sets { user, token, isAuthenticated: true } atomically
│
├─ EventBus.emit({ type: 'PLAYER_LOGGED_IN', payload: { userId, displayName } })
│
└─ navigate(redirectParam || ROUTES.DASHBOARD)
     └─ React Router re-evaluates the route → requireAuth passes → page renders
```

### 6.9 Error Handling

| Scenario | Behavior |
|----------|----------|
| `useAuthStore.getState()` returns stale state (token expired on server) | Phase 1: no token validation against server. User stays authenticated until explicit logout. Phase 3: HTTP adapter validates token on each request; 401 response triggers `logout()`. |
| User clears localStorage manually | `isAuthenticated` and `token` are lost. Next navigation triggers redirect to login. Expected behavior. |
| `redirect` query param contains an XSS-style URL | URL is encoded with `encodeURIComponent`. On redirect, use `new URL(param, window.location.origin)` to validate it's same-origin before navigating. |

### 6.10 Mobile Considerations

- `requireAuth` is synchronous — adds 0ms to Time to First Byte
- No spinner, no flash of protected content — the guard fires before render
- On mobile, "bounce back from login to intended destination" is critical UX. The `redirect` param must be preserved through any navigations on the login page (e.g., switching to Register and back).

### 6.11 Testing Strategy

```
[ ] requireAuth({ request }) with isAuthenticated=false → redirect to /login
[ ] requireAuth({ request }) preserves pathname in `redirect` query param
[ ] requireAuth({ request }) with isAuthenticated=true → returns null
[ ] redirectIfAuthenticated() with isAuthenticated=true → redirect to /dashboard
[ ] redirectIfAuthenticated() with isAuthenticated=false → returns null
[ ] useRedirectParam() returns ROUTES.DASHBOARD when no param present
[ ] useRedirectParam() returns decoded path when param present
[ ] login() action sets user, token, isAuthenticated atomically (single render)
[ ] All AppLayout children routes have requireAuth loader applied
[ ] LessonPage route has requireAuth loader applied
[ ] Login and Register routes have redirectIfAuthenticated loader applied
[ ] Navigating to /dashboard while logged out shows Login page
[ ] Completing login redirects to original destination
```

---

## 7. System 5 — Remove Dual Data Sources

### 7.1 Current State Analysis

Two TypeScript files in `src/data/` serve as static data sources. Both are imported by exactly one consumer each. Neither is tested. Neither is validated at runtime.

**File 1: `src/data/academyData.ts`**
- Exports: `ACADEMIES: AcademyDef[]` (5 academies) and `AcademyDef` interface
- Sole consumer: `src/features/academy/pages/academy-paths.tsx`
- Fields: `id`, `slug`, `name`, `theme`, `description`, `difficulty`, `estimatedHours`, `xpReward`, `coverEmoji`, `accentColor`, `totalModules`, `isAvailable`, `isComingSoon`
- **Overlap with Content Engine:** `slug`, `name`/`title`, `description`, `difficulty`, `estimatedHours`, `xpReward`, `coverEmoji` all exist in `content/courses/*/course.json`
- **NOT in Content Engine:** `accentColor`, `totalModules` (computable), `isAvailable`, `isComingSoon`, `theme`

**File 2: `src/data/courseData.ts`**
- Exports: `STANDALONE_COURSES: Course[]` (10 courses)
- Sole consumer: `src/features/courses/pages/courses.tsx`
- These standalone courses have **no corresponding JSON files** in `content/courses/`
- They are catalogue entries only — no lesson content exists yet

**Observation from `academy-paths.tsx`:** The page already uses BOTH sources — it imports `ACADEMIES` from `academyData.ts` AND calls `loadCourse()` from the Content Engine. This is the dual-source problem in practice.

### 7.2 Migration Philosophy

The goal is not to eliminate static data entirely. The goal is to eliminate **duplication** and establish **clear ownership**:

- **Content Engine** owns: curriculum structure, learning objectives, lesson counts, XP rewards, difficulty, prerequisites — everything educational
- **Config files** own: UI presentation data that has no place in curriculum JSON — accent colors, availability flags, "coming soon" state

### 7.3 Migration Plan — `academyData.ts`

#### Step 1: Create `src/config/academy-display.config.ts`

Move the three fields that are purely presentational and not in `course.json`:

```typescript
// src/config/academy-display.config.ts
//
// Presentation-layer metadata for Academy cards.
// Curriculum data (title, description, XP, modules) comes from the Content Engine.
// This file owns ONLY display-layer config: color, availability, theme label.
//
// When to update: when a new academy is added to content/courses/ or
// when availability/color needs to change. Delete entries when the
// corresponding course.json is removed.

export interface AcademyDisplayConfig {
  slug:         string    // must match content/courses/<slug>/course.json
  accentColor:  string    // hex — used for card theming
  theme:        string    // label shown above title ("Recruit Training")
  isAvailable:  boolean   // false = renders as "Classified" / locked
  isComingSoon: boolean
}

export const ACADEMY_DISPLAY: AcademyDisplayConfig[] = [
  {
    slug:         'digital-security-landscape',
    accentColor:  '#00FF87',
    theme:        'Recruit Training',
    isAvailable:  true,
    isComingSoon: false,
  },
  {
    slug:         'networking-fundamentals',
    accentColor:  '#00D9FF',
    theme:        'Network Intelligence',
    isAvailable:  true,
    isComingSoon: false,
  },
  {
    slug:         'linux-for-hackers',
    accentColor:  '#22C55E',
    theme:        'Terminal Mastery',
    isAvailable:  true,
    isComingSoon: false,
  },
  {
    slug:         'web-security-fundamentals',
    accentColor:  '#7B5EA7',
    theme:        'Web Infiltration',
    isAvailable:  true,
    isComingSoon: false,
  },
  {
    slug:         'offensive-operations',
    accentColor:  '#FF4757',
    theme:        'Red Team Tactics',
    isAvailable:  false,
    isComingSoon: true,
  },
]
```

#### Step 2: Update `academy-paths.tsx`

The page currently imports `ACADEMIES` and uses `academy.accentColor`, `academy.theme`, `academy.isAvailable`, `academy.isComingSoon`. After migration, it will:

1. Load all courses from the Content Engine: `getAllCourses()` (already partially doing this via `loadCourse`)
2. Read display config from `ACADEMY_DISPLAY`
3. Merge at render time using `slug` as the join key

```typescript
// BEFORE:
import { ACADEMIES } from '@/data/academyData'

// AFTER:
import { getAllCourses }    from '@/lib/content'
import { ACADEMY_DISPLAY } from '@/config/academy-display.config'

// Merge example (in component):
const academies = courses.map(course => ({
  ...course,
  ...(ACADEMY_DISPLAY.find(d => d.slug === course.slug) ?? {
    accentColor: '#6B7280',
    theme: 'Coming Soon',
    isAvailable: false,
    isComingSoon: true,
  }),
}))
```

The `AcademyCard` component's props change from `AcademyDef` to a merged type. Since `AcademyCard` is defined within `academy-paths.tsx` (not exported), this is a contained change.

**Loading state:** `getAllCourses()` is async. The page already has a loading skeleton (`AcademyCardSkeleton`) because it calls `loadCourse()`. The pattern is already established — just extend it to `getAllCourses()`.

#### Step 3: Delete `src/data/academyData.ts`

After Step 2 builds and renders correctly, delete the file.

### 7.4 Migration Plan — `courseData.ts`

The standalone courses in `courseData.ts` have no JSON files in `content/courses/`. Migrating them to the Content Engine requires creating JSON files — which is content work, not architecture work.

**Phase 1 decision:** Move the file from `src/data/` to `src/config/` with a clear comment marking it as temporary.

#### Step 1: Create `src/config/standalone-courses.config.ts`

Copy `courseData.ts` verbatim, changing only:
1. The file path
2. Adding a comment block explaining its temporary status

```typescript
// src/config/standalone-courses.config.ts
//
// Standalone courses — skill modules not part of any Academy curriculum path.
// These courses are displayed on the /courses page.
//
// TEMPORARY: This file will be deleted when each course has a corresponding
// content/courses/<slug>/course.json file with full lesson content.
// Do NOT add new entries here — add content/courses/<slug>/course.json instead.
//
// Current status:
//   wireshark-deep-dive          → no content JSON yet
//   burp-suite-fundamentals      → no content JSON yet
//   python-crash-course          → no content JSON yet
//   (... etc)
```

#### Step 2: Update `courses.tsx` import

```typescript
// BEFORE:
import { STANDALONE_COURSES } from '@/data/courseData'

// AFTER:
import { STANDALONE_COURSES } from '@/config/standalone-courses.config'
```

#### Step 3: Delete `src/data/courseData.ts`

#### Step 4: Delete `src/data/` directory

After both files are removed, the `src/data/` directory should be empty. Delete it.

### 7.5 Risk Analysis

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| `AcademyCard` breaks due to prop type change | Medium | Medium | `AcademyCard` is internal to `academy-paths.tsx` — no other consumers |
| `getAllCourses()` ordering differs from `ACADEMIES` ordering | Low | Low | `AcademyDef` has `id` field; sort by `id` from `ACADEMY_DISPLAY` order |
| Missing academy in `ACADEMY_DISPLAY` | Low | Low | Fallback defaults (gray, "Coming Soon", locked) prevent render crash |
| New course added to content engine without `ACADEMY_DISPLAY` entry | Medium | Low | Fallback defaults handle gracefully — add config entry when needed |
| Standalone courses never get content JSON files | Medium | Low | Config file with comment clearly signals intent. Low risk to architecture. |

### 7.6 After Migration — Data Ownership Map

```
Content Engine (course.json)     Config Files             Zustand Stores
────────────────────────────     ──────────────────────   ──────────────────
title                            accentColor              XP state
description                      theme label              lesson progress
difficulty                       isAvailable              achievements
estimatedHours                   isComingSoon             auth state
xpReward                         (standalone courses      settings
learningObjectives                catalog until content
modules (with lessonCounts)       is created)
tags
coverEmoji
prerequisites
```

### 7.7 Testing Strategy

```
[ ] AcademyPaths page renders without importing from src/data/
[ ] All 5 academies appear on the page after migration
[ ] Academy cards show correct accentColor for each academy
[ ] "Offensive Operations" card renders as locked/classified
[ ] Available academies show theme label correctly
[ ] src/data/academyData.ts has been deleted
[ ] src/data/courseData.ts has been deleted
[ ] src/data/ directory has been deleted
[ ] Courses page renders correctly importing from src/config/
[ ] 10 standalone courses still appear on courses page
[ ] No TypeScript errors in academy-paths.tsx or courses.tsx
[ ] Build completes with zero errors: npm run build
[ ] Academy page loading state (skeleton) shows while getAllCourses() resolves
```

---

## 8. Cross-System Integration

### 8.1 Wiring the Systems Together

After all five systems are built independently, they must be wired together. This section defines exactly which existing files change and how.

#### `src/main.tsx` — Add Save Manager initialization

```
// ADD before ReactDOM.createRoot(...).render(...)
await saveManager.initialize()
```

This is the only startup change needed.

#### `src/store/auth-store.ts` — Add atomic `login()` action

Extend the existing interface and implementation. 3 lines of code. Existing `setUser()` and `setToken()` remain for backward compatibility.

Add event emissions:
- `login()` emits `PLAYER_LOGGED_IN`
- `logout()` emits `PLAYER_LOGGED_OUT`

#### `src/features/lesson/store/lesson-store.ts` — Add XP award + event emission

Extend `completeLesson(lessonId)` to `completeLesson(lessonId, xpReward)`. After the existing state update:
1. Call `useXPStore.getState().awardXP(xpReward, 'lesson_completion', { lessonId })`
2. Emit `{ type: 'LESSON_COMPLETED', ... }`

Do not rewrite the store. Extend it by adding parameters and post-state-update calls.

#### `src/features/lesson/pages/lesson-page.tsx` — Pass xpReward to completeLesson

The lesson player has access to the `FullLesson` object which contains `xpReward`. Pass it to `completeLesson()`. One argument addition.

#### `src/features/dashboard/pages/dashboard.tsx` — Replace mock XP with store

```typescript
// BEFORE:
const MOCK_USER = { xp: 3240, rank: { label: 'Analyst', ... } }

// AFTER:
const { totalXP, getRankProgress } = useXPStore()
const { currentRank, progressPct } = getRankProgress()
```

Other mock constants (`MOCK_USER.displayName`, `MOCK_USER.streak`) remain as mock until the auth store has real user data. Only replace the XP and rank values — they now have real computation.

#### `src/components/layout/sidebar.tsx` — Replace mock XP

```typescript
// BEFORE:
xp: user?.xp ?? 3240

// AFTER:
const { totalXP } = useXPStore()
// use totalXP instead of mockUser.xp
```

### 8.2 Complete Integration Sequence (First-Time User Flow)

```
1. User opens app
   └─ saveManager.initialize() runs migrations, checks quota

2. User visits /dashboard
   └─ requireAuth loader fires → isAuthenticated=false → redirect /login

3. User logs in
   └─ useAuthStore.login(user, token)
        ├─ state updates atomically
        └─ emit PLAYER_LOGGED_IN

4. User navigates to /dashboard
   └─ requireAuth passes → Dashboard renders
        └─ XPBar reads useXPStore.totalXP (= 0 for new user)

5. User starts Operation 2.1
   └─ emit LESSON_STARTED

6. User completes last section, taps "Mission Complete"
   └─ lessonStore.completeLesson(lessonId, 350)   ← 350 XP from lesson JSON
        ├─ state updated
        ├─ xpStore.awardXP(350, 'lesson_completion', { lessonId })
        │    ├─ calculateXPAward({ base: 350 }) → { finalAmount: 350, breakdown: ... }
        │    ├─ totalXP: 0 → 350
        │    ├─ currentRank: Script Kiddie (still, 350 < 500)
        │    ├─ saveManager.set('xp', { totalXP: 350, currentRank, rankHistory })
        │    └─ emit XP_AWARDED { amount: 350, source: 'lesson_completion', ... }
        └─ emit LESSON_COMPLETED { lessonId, xpEarned: 350, firstTime: true }

7. [Phase 2, not built yet] AudioManager hears XP_AWARDED → plays XP sfx
8. [Phase 2, not built yet] NotificationOverlay hears XP_AWARDED → shows "+350 XP" pop
```

---

## 9. Implementation Sequence

Build in this exact order. Each system is independently buildable and testable. Do not start the next system until the current one has passing tests.

```
Week 1, Day 1–2:   System 1 — Event Bus
                   Deliverable: event-bus.ts, event-types.ts, index.ts
                   Tests passing: all 9 Event Bus tests

Week 1, Day 3–4:   System 2 — XP Engine (pure functions only)
                   Deliverable: xp-rules.ts, xp-engine.ts, index.ts
                   Tests passing: all calculateXPAward + getRankForXP tests

Week 1, Day 5:     System 2 — XP Store
                   Deliverable: xp-store.ts
                   Tests passing: all useXPStore tests
                   Wire: auth-store login/logout events

Week 2, Day 1–2:   System 3 — Save Manager
                   Deliverable: all 5 persistence files
                   Tests passing: all SaveManager tests
                   Wire: main.tsx initialize()

Week 2, Day 3:     System 4 — Route Guards
                   Deliverable: guards.ts, router/index.tsx updated
                   Tests passing: all Route Guard tests
                   Wire: auth-store atomic login(), login page redirect param

Week 2, Day 4–5:   System 5 — Remove Dual Data Sources
                   Deliverable: config files created, data files deleted
                   Tests passing: all Data Source migration tests
                   Wire: academy-paths.tsx, courses.tsx updated

Week 3, Day 1:     Cross-System Integration
                   Wire: lessonStore.completeLesson() → xpStore.awardXP() → EventBus
                   Wire: dashboard/sidebar read from useXPStore
                   Wire: lesson-page passes xpReward to completeLesson()
                   Tests passing: full integration test (Complete Lesson Flow)

Week 3, Day 2:     Full regression test + npm run build (zero errors)
```

---

## 10. Risk Register

| ID | Risk | Likelihood | Impact | Owner | Mitigation |
|----|------|------------|--------|-------|------------|
| R1 | `saveManager.initialize()` takes > 100ms on first load | Low | High | Keep migration #0 as a no-op. Future migrations are O(keys), not O(data size). |
| R2 | iOS Safari private browsing blocks localStorage | Medium | Medium | `isAvailable()` check at startup. App falls back to in-memory. In-memory state is lost on tab close — acceptable for Phase 1. |
| R3 | `requireAuth` loader blocks navigation on iOS WebKit (slow `getState()`) | Low | Medium | `getState()` is a Zustand synchronous read from a JS object. Sub-microsecond. No risk. |
| R4 | Event Bus listener leak (component unmounts without cleanup) | Medium | Low | The `on()` return value pattern is idiomatic. ESLint `exhaustive-deps` rule + code review catch missing cleanup. Add a dev-only listener count warning if count exceeds 50. |
| R5 | XP Store initial state missing on user's first session | Low | High | Zustand's `persist` `onRehydrateStorage` callback provides defaults. Ensure `RANKS[0]` is the default rank in the store definition. |
| R6 | `ACADEMY_DISPLAY` slug doesn't match `course.json` slug after a rename | Low | Medium | TypeScript doesn't catch this (both are `string`). Add a dev-only startup assertion: every `ACADEMY_DISPLAY` slug must exist in `getAllCourses()`. |
| R7 | `useLessonStore.completeLesson()` called twice for the same lesson | Low | Low | Store already guards against re-completion (`if (state.progress[lessonId]?.completedAt) return`). XP will not be double-awarded. |
| R8 | Event Bus wildcard listener registered in production (performance) | Low | Low | Add `if (import.meta.env.DEV)` guard around any `onAny()` registration. |

---

## 11. Testing Checklist

### 11.1 Unit Tests (Vitest + @testing-library/react)

**Event Bus**
```
[ ] emit() with no listeners — no throw
[ ] on() listener fires on matching event type
[ ] on() listener does not fire on other event types
[ ] on() cleanup function removes listener
[ ] once() fires exactly once
[ ] onAny() receives every event type
[ ] Listener that throws does not prevent other listeners from firing
[ ] Re-entrant emit() (emit from within listener) is safe
[ ] _resetForTests() clears all listeners
```

**XP Engine (pure functions)**
```
[ ] calculateXPAward({ base: 0 }) → finalAmount: 0
[ ] calculateXPAward({ base: 100 }) → finalAmount: 100
[ ] calculateXPAward({ base: 100, bonuses: [{ amount: 50 }] }) → 150
[ ] calculateXPAward multiplier applied to base only, not bonuses
[ ] getRankForXP boundary values (0, 499, 500, 1999, 2000, etc.)
[ ] getRankProgress progressPct: 0 at rank min, 100 at rank max
[ ] getRankProgress nextRank: null at max rank (Zero Day)
[ ] getStreakMultiplier returns correct table values
```

**XP Store**
```
[ ] awardXP emits XP_AWARDED with correct breakdown
[ ] awardXP crossing rank threshold emits LEVEL_UP
[ ] awardXP NOT crossing threshold does NOT emit LEVEL_UP
[ ] State persists between store instantiations (mocked localStorage)
[ ] getRankProgress() reflects current totalXP
```

**Save Manager**
```
[ ] get() returns null for missing key
[ ] set()/get() round-trip preserves value
[ ] set() with QuotaExceeded throws StorageQuotaError
[ ] Migration #0 runs on first startup
[ ] Migration runs only once (idempotent)
[ ] checkQuota() returns correct usedPercent
[ ] importSave() with invalid JSON throws, does not modify state
[ ] setAdapter() swaps adapter correctly
```

**Route Guards**
```
[ ] requireAuth with isAuthenticated=false → redirect /login
[ ] requireAuth preserves pathname in redirect param
[ ] requireAuth with isAuthenticated=true → null
[ ] redirectIfAuthenticated with isAuthenticated=true → /dashboard
[ ] redirectIfAuthenticated with isAuthenticated=false → null
[ ] login() sets user+token+isAuthenticated atomically
```

**Data Migration**
```
[ ] academy-paths.tsx renders 5 academies from Content Engine
[ ] All academy cards have correct accentColor from config
[ ] Locked academy renders as "Classified"
[ ] courses.tsx renders 10 standalone courses from config
[ ] No imports from src/data/ anywhere in codebase (grep check)
[ ] npm run build → zero errors
[ ] npm run lint → zero warnings
[ ] npm run type-check → zero errors
```

### 11.2 Integration Test — Complete Lesson Flow

```
[ ] Navigate to /dashboard while logged out → redirected to /login
[ ] Log in → redirected to /dashboard
[ ] Navigate to lesson page → requireAuth passes
[ ] Complete all sections of a lesson
[ ] completeLesson() is called with correct lessonId and xpReward
[ ] useXPStore.totalXP increases by xpReward amount
[ ] XP_AWARDED event fires with correct amount
[ ] LESSON_COMPLETED event fires with correct lessonId
[ ] Dashboard XPBar reflects new totalXP
[ ] Sidebar user panel reflects new totalXP
[ ] XP persists after page reload (localStorage check)
[ ] Completing same lesson a second time does NOT double-award XP
```

### 11.3 Build Verification

Run these commands in order before marking Phase 1 complete:

```bash
npm run type-check   # zero errors
npm run lint         # zero warnings (--max-warnings 0)
npm run build        # zero build errors
```

Additionally, verify:
```bash
# No remaining imports from src/data/
grep -r "from '@/data/" src/   # must return empty

# All Event Bus usages have cleanup
# (manual review — search for on() calls inside useEffect without return)
```

---

## 12. Architecture Gates Applied

Each Phase 1 system is evaluated here against all three gates defined in `docs/ENGINEERING_PRINCIPLES.md`. This section is the formal stamp of architectural approval before implementation begins. If any gate fails, implementation does not start.

---

### System 1 — Event Bus

#### Technical Gate
```
[✅] Clean public interface: on(), once(), onAny(), emit(), _resetForTests() via index.ts
[✅] Minimum surface: 4 functions cover all use cases
[✅] Independently testable: pure module, no React, no other engines
[✅] Self-contained error handling: listener errors are caught, logged, isolated
[✅] Backward-compatible: new file, no existing consumers to break
[✅] Zero any types: full generic type inference on emit() and on()
[✅] Type-check: GameEvent discriminated union enforces payload shapes at compile time
[✅] Exhaustive switch: not applicable (Event Bus has no switch statements)
```

#### Product Gate
```
[✅] Directly improves learner experience: enables XP, achievements, audio — all retention loops
[✅] Content-creator independent: content creators never touch the Event Bus
[✅] Platform-wide by design: all 5 academies + all future systems use the same bus
[✅] Works with zero content: module singleton initializes with no data
[✅] Works at scale: O(1) emit, O(n listeners) — handles 1000+ listeners without concern
[✅] Degrades gracefully: no listeners = no-op; never throws from emit()
[✅] Not duplicating existing capability: no event system existed
[✅] Long-lived: pub/sub is a 30-year-old pattern; this will not need replacement
```

#### Long-Term Gate
```
[✅] Reusable by every academy: academies emit LESSON_COMPLETED — bus is agnostic
[✅] Supports 100+ operations: event routing is O(1) per event type
[✅] Cross-platform: pure TypeScript, no platform APIs
[✅] Understandable in one day: 4 functions, module singleton, 50 lines of implementation
[✅] Future systems integrate without modifying bus: add to GameEvent union, register listener
[✅] Reduces future complexity: Achievement, Audio, Analytics all connect here — not to each other
[✅] Stable API for 5 years: additive-only (union extension); no breaking surface
[✅] Deletion impact: only consumers that explicitly import from @/lib/events would break
```

**Gate Result: PASS ✅ — Proceed with implementation.**

---

### System 2 — XP Engine

#### Technical Gate
```
[✅] Clean public interface: calculateXPAward, getRankForXP, getRankProgress, getStreakMultiplier via index.ts
[✅] Minimum surface: pure functions + one Zustand store action (awardXP)
[✅] Independently testable: pure functions need no React; store tests use mock adapter
[✅] Self-contained error handling: invalid inputs return safe defaults, no throws
[✅] Backward-compatible: new files; completeLesson() signature extension is non-breaking (optional param pattern possible)
[✅] Zero any types: all functions explicitly typed
[✅] Type-check: RANKS array from src/types/index.ts; RankProgress, XPAwardResult typed
[✅] Exhaustive switch: getRankForXP uses array find, not switch — acceptable
```

#### Product Gate
```
[✅] Directly improves learner experience: XP is the primary retention and motivation loop
[✅] Content-creator independent: XP values come from lesson.json; content team controls rewards
[✅] Platform-wide: every academy, every operation uses the same XP Engine
[✅] Works with zero content: totalXP = 0, rank = Script Kiddie, progressPct = 0
[✅] Works at scale: O(1) calculation, O(1) rank lookup, O(1) store update
[✅] Degrades gracefully: if calculateXPAward receives 0, awards 0, emits no events
[✅] Not duplicating: no XP system existed
[✅] Long-lived: XP + rank progression is a 20-year mobile game pattern
```

#### Long-Term Gate
```
[✅] Reusable by every academy: awardXP('lesson_completion', ...) is academy-agnostic
[✅] Supports 100+ operations: XP state is a single number; no per-lesson storage
[✅] Cross-platform: pure TypeScript + Zustand; works everywhere
[✅] Understandable in one day: pure functions are self-documenting
[✅] Future systems integrate without modification: Pro multiplier, Live Events → XPMultiplier[]
[✅] Reduces complexity: replaces hardcoded mock XP throughout Dashboard and Sidebar
[✅] Stable API: awardXP() signature absorbs future bonus types via optional bonuses array
[✅] Deletion impact: only consumers of useXPStore and @/lib/xp would break
```

**Gate Result: PASS ✅ — Proceed with implementation.**

---

### System 3 — Save Manager

#### Technical Gate
```
[✅] Clean public interface: initialize(), get(), set(), remove(), checkQuota(), exportSave(), importSave(), setAdapter() via index.ts
[✅] Minimum surface: 7 methods cover all persistence use cases
[✅] Independently testable: setAdapter() enables mock adapter in all tests
[✅] Self-contained error handling: StorageQuotaError, StorageUnavailableError, SaveImportError typed
[✅] Backward-compatible: does not replace existing Zustand persist keys; new keys use new namespace
[✅] Zero any types: IStorageAdapter.get<T>() uses generic; T is caller-specified
[✅] Type-check: StorageKey union prevents typos in key strings
[✅] Exhaustive switch: not applicable
```

#### Product Gate
```
[✅] Directly improves learner experience: prevents silent progress loss; enables cross-device sync in Phase 3
[✅] Content-creator independent: persistence is invisible to content
[✅] Platform-wide: all new engines use saveManager; existing Zustand stores continue using persist
[✅] Works with zero content: initialize() with empty localStorage completes in < 1ms
[✅] Works at scale: O(1) per operation; O(keys) for quota check — never per-lesson
[✅] Degrades gracefully: isAvailable() false → in-memory fallback; writes are no-ops
[✅] Not duplicating: extends Zustand persist with coordination + migration + quota monitoring
[✅] Long-lived: adapter pattern means this file lives for the platform's lifetime
```

#### Long-Term Gate
```
[✅] Reusable by every academy: any engine adds a STORAGE_KEYS entry and calls saveManager.set()
[✅] Supports 100+ operations: O(1) read/write; quota check is independent of operation count
[✅] Cross-platform: Web Storage API is universal; HttpAdapter will be HTTP
[✅] Understandable in one day: adapter pattern is a textbook design; migration runner is sequential
[✅] Future systems integrate without modifying Save Manager: add key to registry, call existing API
[✅] Reduces complexity: centralizes key naming, prevents collision, enables migration
[✅] Stable API: initialize/get/set/remove surface is stable; adapters extend without API change
[✅] Deletion impact: only engines calling saveManager.* would break
```

**Gate Result: PASS ✅ — Proceed with implementation.**

---

### System 4 — Route Guards

#### Technical Gate
```
[✅] Clean interface: two pure functions exported from guards.ts
[✅] Minimum surface: requireAuth + redirectIfAuthenticated cover all auth guard scenarios
[✅] Independently testable: pure functions — mock LoaderFunctionArgs, mock getState()
[✅] Error handling: redirect() is a Response, not an exception — Router handles it correctly
[✅] Backward-compatible: loader: property added to existing routes; component unchanged
[✅] Zero any types: LoaderFunctionArgs typed by react-router-dom
[✅] Type-check: redirect() from react-router-dom returns typed Response
[✅] No switch statements
```

#### Product Gate
```
[✅] Directly improves learner experience: prevents unauthenticated access to learning content
[✅] Content-creator independent: guards are invisible to content
[✅] Platform-wide: all protected routes use the same two functions
[✅] Works with zero content: guard runs before content loads
[✅] Works at scale: O(1) — synchronous Zustand.getState() call
[✅] Degrades gracefully: redirect is a hard failure mode, not a degradation — this is correct
[✅] Not duplicating: no guards existed
[✅] Long-lived: React Router v6 loader pattern is the framework-recommended approach
```

#### Long-Term Gate
```
[✅] Reusable: future guards (requirePro, requirePrerequisites) follow the same loader function signature
[✅] Supports 100+ operations: each route gets a loader — O(routes) not O(operations)
[✅] Cross-platform: React Router v6 works in browser and React Native (web router)
[✅] Understandable in one day: 2 functions, 10 lines each
[✅] Future systems integrate: requirePro loader is a new function, not a modification
[✅] Reduces complexity: replaces any future PrivateRoute component nesting
[✅] Stable API: loader function signature is React Router v6 standard
[✅] Deletion impact: removing guards would expose protected routes — not silent breakage
```

**Gate Result: PASS ✅ — Proceed with implementation.**

---

### System 5 — Remove Dual Data Sources

This is a refactoring task, not a new system. Gate evaluation focuses on migration safety.

#### Technical Gate
```
[✅] No new public interface: consumers import from config, not data
[✅] TypeScript: config files are typed (AcademyDisplayConfig, Course)
[✅] No any types introduced
[✅] Build must pass before and after migration
[✅] Lint must pass before and after migration
```

#### Product Gate
```
[✅] Does not change any user-visible behavior
[✅] Academy display config correctly maps all 5 academies
[✅] Standalone courses all preserved in config file
[✅] Academy loading state preserved (skeleton shows while Content Engine resolves)
[✅] Content team unaffected: they never edited src/data/ files
```

#### Long-Term Gate
```
[✅] Single source of truth for curriculum: Content Engine
[✅] Single source of truth for display config: src/config/
[✅] Clear migration path for standalone courses: add course.json, delete from config
[✅] The src/data/ pattern (hardcoded curriculum in TypeScript) is retired
[✅] Future academies are added by creating course.json files, not editing TypeScript
```

**Gate Result: PASS ✅ — Proceed with implementation.**

---

## 13. Future Consumer Map

This section documents every known future consumer of each Phase 1 system. It proves each system is genuinely platform infrastructure — not a one-time feature. The detailed version of this map is in `docs/ENGINEERING_PRINCIPLES.md` Section 7.

### Summary Map

```
EVENT BUS
├── Phase 1 (emitters):   useXPStore, useLessonStore, useAuthStore
├── Phase 2 (listeners):  AchievementEngine, AudioManager, NotificationEngine
├── Phase 2 (both):       DialogueEngine, SceneEngine
├── Phase 2 (passive):    Analytics (onAny)
└── Phase 3+:             CareerEngine, LiveEvents, SocialMilestones, StreakManager,
                          CutsceneManager, MissionEngine, RelationshipSystem

XP ENGINE
├── Phase 1:              useLessonStore (awardXP on complete), Dashboard, Sidebar
├── Phase 2:              AchievementEngine (XP threshold checks), NotificationEngine (LEVEL_UP display)
├── Phase 3:              Leaderboard, ProSubscription (multiplier), LiveEvents (multiplier),
                          CareerEngine (domain XP), SocialMilestones (LEVEL_UP share)
└── Content:              lesson.json provides xpReward values — engine never hardcodes amounts

SAVE MANAGER
├── Phase 1:              useXPStore (totalXP, rankHistory)
├── Phase 2:              AchievementStore (unlocked achievements), SettingsStore, NotificationStore
├── Phase 3:              InventorySystem, CareerEngine, RelationshipSystem, CloudSync (adapter swap)
└── Never:                Analytics (read-only observer; does not need persistence)

ROUTE GUARDS
├── Phase 1:              All AppLayout routes, LessonPage
├── Phase 2:              requirePro guard (Pro content gating)
├── Phase 3:              requirePrerequisites guard (curriculum sequencing enforcement)
└── Future:               requireBetaAccess, requireAgeVerification (jurisdictional compliance)

CONTENT ENGINE (existing — documented for completeness)
├── Phase 1:              LessonPage, AcademyPaths (via getAllCourses())
├── Phase 2:              CampaignWorldMap, MissionEngine, SearchIndex
├── Phase 3:              CareerEngine (tags/objectives matching), PrerequisiteResolver,
                          Sitemap generator, Offline content cache
└── Never:                Any engine that only needs XP/progress state — that's the XP/Lesson store
```

### Why This Matters

Every Phase 1 system will be consumed by at least 4 future systems. This means:

1. **The interfaces defined in this plan cannot change arbitrarily.** Future consumers depend on them. Changes require migration plans.
2. **The Event Bus event types are the most change-sensitive surface.** Adding new types is free. Renaming or removing types breaks every listener.
3. **The STORAGE_KEYS registry grows monotonically.** Keys are never deleted — only deprecated. Old keys are migrated, not removed.
4. **The Save Manager adapter interface is the cloud sync hook.** When Phase 3 adds a backend, the adapter swap must be transparent to all engine code.

---

## 14. Engine vs Feature vs Module — Full Classification

All systems in the current codebase are classified here. Use this table when deciding where new code belongs. The classification criteria and decision flowchart are in `docs/ENGINEERING_PRINCIPLES.md` Section 5.

| System | Classification | Current Location | Correct Location | Action |
|--------|---------------|-----------------|-----------------|--------|
| Event Bus | Engine (Infrastructure) | — (new) | `src/lib/events/` | Build here |
| XP Engine | Engine | — (new) | `src/lib/xp/` + `src/store/xp-store.ts` | Build here |
| Save Manager | Engine (Infrastructure) | — (new) | `src/lib/persistence/` | Build here |
| Content Engine | Engine | `src/lib/content/` | `src/lib/content/` | Correct ✅ |
| Route Guards | Utility Module | — (new) | `src/router/guards.ts` | Build here |
| Auth Store | Engine fragment | `src/store/auth-store.ts` | `src/store/auth-store.ts` | Correct ✅ |
| UI Store | Engine fragment | `src/store/ui-store.ts` | `src/store/ui-store.ts` | Correct ✅ |
| **Lesson Store** | **Engine fragment** | `src/features/lesson/store/` | **`src/store/lesson-store.ts`** | **Migrate in Phase 2** |
| Interactive Library | Component collection | `src/features/interactive/` | `src/features/interactive/` | Correct ✅ |
| Dashboard | Feature | `src/features/dashboard/pages/` | `src/features/dashboard/pages/` | Correct ✅ |
| Academy Paths | Feature | `src/features/academy/pages/` | `src/features/academy/pages/` | Correct ✅ |
| Lesson Player | Feature | `src/features/lesson/pages/` | `src/features/lesson/pages/` | Correct ✅ |
| Courses Page | Feature | `src/features/courses/pages/` | `src/features/courses/pages/` | Correct ✅ |
| RANKS constant | Constants | `src/types/index.ts` | `src/types/index.ts` | Correct ✅ |
| Academy Display Config | Config | `src/data/academyData.ts` | `src/config/academy-display.config.ts` | Migrate (System 5) |
| Standalone Courses | Config (temporary) | `src/data/courseData.ts` | `src/config/standalone-courses.config.ts` | Migrate (System 5) |
| `formatXP`, `formatDuration` | Utility | `src/lib/utils.ts` | `src/lib/utils.ts` | Correct ✅ |

### The Lesson Store Migration Note

The lesson store lives at `src/features/lesson/store/lesson-store.ts`. This is architecturally incorrect — store/engine code should not live inside a `features/` directory, because features are consumers of engines, not engines themselves.

**Phase 1 action:** Leave it in place. Changing the import path mid-Phase requires updating every consumer and risks breaking the build.

**Phase 2 action:** Move to `src/store/lesson-store.ts`. Update all imports. The Zustand persist key (`cyber-learn-lesson-progress`) does not change — this preserves all existing user progress.

This is a known and accepted inconsistency. It is documented here so that it is intentional, not accidental.

---

## 15. Identified Gaps and Long-Term Safeguards

This section documents items the original plan was silent on. Each gap, if unaddressed, becomes technical debt before Phase 2 is complete. Address all items below during Phase 1 implementation.

---

### Gap 1 — Error Boundaries

**Problem:** No error boundary strategy exists. If the Content Engine throws a `ContentValidationError` during lesson load, or if a section renderer throws an uncaught exception, the user sees a white screen.

**Required action during Phase 1:**

1. Create `src/components/shared/error-boundary.tsx` — a class component wrapper that catches render errors and displays a graceful fallback.
2. Wrap `LessonPage` in `<ErrorBoundary fallback={<LessonUnavailable />}>` in `src/router/index.tsx`.
3. Wrap `AppLayout`'s `<Outlet />` in `<ErrorBoundary fallback={<PageUnavailable />}>`.

The fallback components show a message, a link back to the dashboard, and a log of what failed. They never expose raw stack traces in production.

**This is a blocking requirement before Phase 1 ships.**

---

### Gap 2 — Analytics Integration Point

**Problem:** The plan mentions `onAny()` for analytics but does not establish it as a platform rule or define its startup behavior.

**Required action during Phase 1:**

1. Create `src/lib/analytics/index.ts` as a stub: `export function initAnalytics(): void { /* noop in Phase 1 */ }`
2. Call `initAnalytics()` in `src/main.tsx` at startup.
3. The stub registers nothing. When a real analytics SDK is added in Phase 3, the implementation swaps in. No other files change.

**Rule codified:** Platform Rule A1 in `docs/ENGINEERING_PRINCIPLES.md` — analytics may only observe via `EventBus.onAny()`. No component may import an analytics SDK.

---

### Gap 3 — `prefers-reduced-motion` Compliance

**Problem:** The existing lesson player and Dashboard have Framer Motion animations. None of them currently check `useReducedMotion()`. This violates WCAG 2.2 AA and Accessibility Principle 8 in `ENGINEERING_PRINCIPLES.md`.

**Required action during Phase 1:**

Audit every existing Framer Motion `motion.*` element in the codebase and add `useReducedMotion()` checks. The pattern is:

```typescript
const prefersReduced = useReducedMotion()
// then: duration: prefersReduced ? 0 : 0.28
// and:  x: prefersReduced ? 0 : 40
```

Files to audit:
- `src/features/lesson/components/lesson-player.tsx`
- `src/features/dashboard/pages/dashboard.tsx`
- `src/features/academy/pages/academy-paths.tsx`
- `src/components/layout/sidebar.tsx`

This does not change visual behavior for users who have not set their OS preference. It is zero-risk and zero-effort to add.

---

### Gap 4 — `dvh` Viewport Height

**Problem:** Several components use `min-h-screen` (which maps to `100vh`). On mobile browsers, `100vh` includes the browser's address bar and navigation chrome. When the user scrolls and the browser chrome hides, elements sized to `100vh` overflow or jump. This is a well-known iOS Safari and mobile Chrome bug that affects every production mobile web app.

**Required action during Phase 1:**

Replace `min-h-screen` with `min-h-[100dvh]` in these locations:
- `src/components/layout/app-layout.tsx`
- `src/features/lesson/components/lesson-player.tsx` (already uses `fixed inset-0` — verify it is correct)

`dvh` (dynamic viewport height) is supported in all modern mobile browsers (Safari 15.4+, Chrome 108+, Firefox 101+). For older browsers, `100vh` is an acceptable fallback via `@supports`.

---

### Gap 5 — i18n Stub

**Problem:** The plan has no provision for future internationalization. Every user-facing string in the codebase is a hardcoded English literal.

**Required action during Phase 1:**

1. Create `src/lib/i18n/index.ts` as a stub:
   ```typescript
   export const t = (key: string): string => key
   ```
2. Do NOT require all existing components to use `t()` in Phase 1. This is too disruptive.
3. DO require all new Phase 1 code (XP Engine, Save Manager error messages, Route Guard redirect text) to use `t()` for any user-facing string.
4. Document in `ENGINEERING_PRINCIPLES.md` Section 10 that the `t()` wrapper is the i18n integration point. *(Already done — see that document.)*

**This is a 10-minute task that prevents months of future refactoring.**

---

### Gap 6 — Development-Only Safeguards

**Problem:** Several platform rules need enforcement in development mode but would add overhead in production. The plan does not define where these guards live or how they're toggled.

**Required development-only safeguards:**

```typescript
// src/lib/dev-guards.ts
// All exports are no-ops in production builds (tree-shaken by Vite)

export function assertEventBusListenerCount(maxListeners: number): void {
  if (!import.meta.env.DEV) return
  // warn if total registered listeners exceeds threshold (e.g., 100)
  // helps catch listener leak regressions
}

export function assertNoDataImports(): void {
  // Enforced at build time via ESLint rule, not runtime
  // This comment documents the intent
}

export function warnOnAnyRegistration(location: string): void {
  if (!import.meta.env.DEV) return
  console.warn(`[EventBus] onAny() registered at: ${location}. Ensure this is analytics-only.`)
}
```

Vite's production build tree-shakes all `import.meta.env.DEV` branches automatically. These guards add zero overhead in production.

---

### Gap 7 — Zustand Store Naming Convention

**Problem:** The three existing Zustand stores use unversioned keys (`cyber-learn-auth`, `cyber-learn-lesson-progress`, `cyber-learn-ui`). The new XP store uses a versioned key (`cyber-learn:v1:xp`). This inconsistency could confuse future engineers about which convention to follow.

**Decision (codified here):**

- **Existing store keys are frozen.** Changing them would delete all user progress and auth state. Do not change them.
- **All new stores use:** `cyber-learn:v{N}:{domain}` where N is the current `STORAGE_VERSION` and domain is a lowercase slug.
- **Document this in `STORAGE_KEYS`** with a comment explaining the historical inconsistency.

```typescript
export const STORAGE_KEYS = {
  // LEGACY: pre-Save Manager keys. Do NOT rename — changing these loses user data.
  // These bypass the Save Manager and are controlled directly by Zustand persist.
  AUTH:             'cyber-learn-auth',
  LESSON_PROGRESS:  'cyber-learn-lesson-progress',
  UI:               'cyber-learn-ui',

  // CURRENT: Save Manager controlled. Versioned namespace.
  XP:               `cyber-learn:v${STORAGE_VERSION}:xp`,
  // ... etc
} as const
```

---

### Gap 8 — Confirmation That Phase 1 Passes All Gate Questions

The Architecture Gates in `docs/ENGINEERING_PRINCIPLES.md` Section 4 ask twelve long-term questions. Every Phase 1 system must answer yes to all twelve. The gate evaluations in Section 12 above confirm this. Any system where a question could not be answered "yes" was redesigned before this document was finalized.

**The one partial exception:** *"Can it support 1,000 concurrent users without architectural changes?"* — The Save Manager uses localStorage, which is per-device. 1,000 users each have their own localStorage. There is no concurrency issue. In Phase 3 when the HTTP adapter is added, the backend handles concurrency. The Save Manager's interface does not change. This is the correct answer.

---

### Gap 10 — `exportSave()` Format Is Unspecified

**Problem:** Section 5.8 specifies `exportSave()` as "a Phase 1 stub that returns a JSON blob." The schema of that JSON blob is not defined. If Phase 1 and Phase 2 implementations each make different assumptions about the format, `importSave()` in Phase 2 will fail silently on Phase 1 exports — or worse, import corrupted state.

**Required action during Phase 1:**

The `exportSave()` return value must follow a versioned envelope format. This format must be defined in Phase 1 so that Phase 2 can implement a compatible `importSave()`.

```typescript
// src/lib/persistence/save-export-schema.ts

export interface SaveExportEnvelope {
  schemaVersion: 1          // increment when the export format changes
  exportedAt:    number      // Date.now()
  platform:      'cyber-learn'
  appVersion:    string      // from package.json version
  keys: {
    [storageKey: string]: unknown   // the raw value for each STORAGE_KEY
  }
}
```

**Rules for the export format:**
1. `schemaVersion` is the migration version for `importSave()`, not the app version
2. `keys` contains only keys that exist in `STORAGE_KEYS` — no raw localStorage dumps
3. `importSave()` checks `schemaVersion` and runs a migration if needed before restoring
4. An export from a future version is rejected with `SaveImportError` if `schemaVersion` exceeds the current implementation's known version

**This format must be treated as a public API surface.** It can be shared with users for manual backup. It can be sent to a backend for cloud save. It can be imported on a new device. Once defined in Phase 1, it cannot be changed without a `schemaVersion` increment and a migration function.

---

### Gap 9 — `LEGACY_REGISTRY` in LessonPage

**Problem:** `LessonPage` has a `LEGACY_REGISTRY` in-file map that keeps the `web-security-fundamentals/sql-injection-intro` demo route working without a JSON file. This is identified in the Architecture Audit as low-priority technical debt.

**Phase 1 action:** Create the lesson JSON file.

```
content/
  courses/
    web-security-fundamentals/
      module-01-intro/
        sql-injection-intro/
          lesson.json   ← CREATE THIS
```

A minimal `lesson.json` with the existing demo content is sufficient. Once the file exists, remove `LEGACY_REGISTRY` entirely from `LessonPage`. This is a 30-minute task that removes an inconsistency from the content loading pipeline.

---

*Phase 1 Implementation Plan — CyberLearn Architecture · 2026-07-29 (updated 2026-07-29)*  
*Reference: `docs/ENGINEERING_PRINCIPLES.md` v1.1 for all architectural standards*  
*v1.1 additions: Gap 10 (exportSave format specification); references updated for EP v1.1 Principles 13–14 and Feature Rules*  
*Next: Phase 2 — Game Feel Layer (Audio, Achievements, Notifications, Dialogue)*
