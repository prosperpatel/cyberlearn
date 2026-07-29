# CyberLearn — Engineering Principles

**Document type:** Permanent engineering standard  
**Authority:** This document governs all technical decisions on the CyberLearn platform.  
**Relationship to Constitution:** The Constitution governs what we build and why. This document governs how we build it. Both are binding. Neither supersedes the other.  
**Last reviewed:** 2026-07-29

> When an engineer three years from now asks "why is it built this way?" — this document is the answer. If a decision is not captured here, it does not yet have an authoritative answer.

---

## Table of Contents

1. [What CyberLearn Is — Architecturally](#1-what-cyberlearn-is)
2. [The Engineering Principles](#2-the-twelve-engineering-principles)
3. [Platform Rules](#3-platform-rules)
4. [The Three Architecture Gates](#4-the-three-architecture-gates)
5. [Engine vs Feature vs Module](#5-engine-vs-feature-vs-module)
6. [System Ownership Model](#6-system-ownership-model)
7. [Future Consumer Map](#7-future-consumer-map)
8. [Performance Budgets](#8-performance-budgets)
9. [Accessibility Standards](#9-accessibility-standards)
10. [Internationalization Readiness](#10-internationalization-readiness)
11. [Error Handling Policy](#11-error-handling-policy)
12. [Content Versioning Policy](#12-content-versioning-policy)
13. [Architecture Decision Records](#13-architecture-decision-records)
14. [Anti-Patterns Registry](#14-anti-patterns-registry)
15. [How This Document Evolves](#15-how-this-document-evolves)

---

## 1. What CyberLearn Is — Architecturally

CyberLearn is not a course website with a good design. It is a **content-driven game engine wrapped in a learning platform**. This distinction changes every architectural decision.

A course website serves content to viewers. CyberLearn runs **operations** on **learners** — with state, progression, narrative, feedback loops, audio, animation, social mechanics, and persistent career development. The architecture must reflect this reality at every level.

### The Three-Layer Model

Every part of the platform belongs to exactly one layer:

```
┌─────────────────────────────────────────────────────────┐
│  CONTENT LAYER                                          │
│  JSON files + Zod schemas                               │
│  Created by: content team, curriculum designers         │
│  Contains: narrative, XP values, quiz questions,        │
│            learning objectives, section data            │
│  Rule: Content changes NEVER require code changes       │
└─────────────────────────┬───────────────────────────────┘
                          │ consumed by
┌─────────────────────────▼───────────────────────────────┐
│  ENGINE LAYER                                           │
│  src/lib/* + src/store/*                                │
│  Created by: engineers                                  │
│  Contains: XP calculation, progression, audio,          │
│            achievements, save management, event bus     │
│  Rule: Engines never import from features               │
│  Rule: Engines communicate via Event Bus only           │
└─────────────────────────┬───────────────────────────────┘
                          │ consumed by
┌─────────────────────────▼───────────────────────────────┐
│  FEATURE LAYER                                          │
│  src/features/*                                         │
│  Created by: product engineers                          │
│  Contains: route-level pages, presentation components   │
│  Rule: Features consume engines via stores and events   │
│  Rule: Features never contain business logic            │
└─────────────────────────────────────────────────────────┘
```

This model is non-negotiable. The moment business logic creeps into the feature layer, the architecture begins to collapse into an unmaintainable monolith.

---

## 2. The Engineering Principles

Each principle is a law, not a suggestion. Each includes a rationale (why it matters), how to apply it, and an anti-pattern to avoid.

---

### Principle 1 — Content-Driven Over Hardcoded

**Law:** Educational content — lessons, XP values, dialogue, quiz questions, section data, learning objectives, career information — must live in content JSON files. Never in TypeScript source code.

**Why:** Content creators should be able to add, modify, or remove an entire Operation without touching application code. If curriculum lives in TypeScript, every content update requires a developer, a pull request, a build, and a deploy. This bottleneck destroys the content team's velocity and creates unnecessary coupling between curriculum design and engineering.

**How to apply:**
- Lesson XP rewards belong in `lesson.json` (`xpReward: 350`), not in `const LESSON_XP = 350`
- Quiz questions belong in `lesson.json` sections, not in component files
- Dialogue belongs in content JSON, not in JSX string literals
- Learning objectives belong in `lesson.json`, not in hardcoded arrays

**Anti-pattern:**
```typescript
// ❌ Never do this
const LESSON_XP_REWARDS = {
  'lesson-01-the-connected-world': 350,
  'lesson-02-journey-of-a-data-packet': 350,
}
```

**Correct approach:**
```typescript
// ✅ XP comes from the content file
const lesson = await getLesson(courseSlug, lessonSlug)
const xpReward = lesson.xpReward  // 350, as defined in lesson.json
```

---

### Principle 2 — Engines Own Logic, Features Own Presentation

**Law:** Business logic lives in `src/lib/` (pure functions) or `src/store/` (stateful engines). Features at `src/features/` render state and dispatch actions. No exceptions.

**Why:** When a feature component contains business logic, that logic cannot be reused, cannot be tested in isolation, and cannot be composed with future systems. A quiz scoring function inside `QuizSection.tsx` cannot be tested without mounting a React component, cannot be called by the Achievement Engine, and cannot be shared with a future challenge-scoring system.

**How to apply:**
- If you are writing a calculation inside a component — stop. Extract it to `src/lib/`.
- If you are writing a state update inside a component — stop. Move it to a store action.
- Components should only call store actions and read store state.

**Anti-pattern:**
```typescript
// ❌ Business logic inside a component
function QuizSection({ section }) {
  const [score, setScore] = useState(0)
  const handleAnswer = (optionId: string) => {
    const correct = section.options.filter(o => o.isCorrect)
    const points = correct.some(o => o.id === optionId) ? 50 : 0  // Logic in component
    setScore(prev => prev + points)
  }
}
```

**Correct approach:**
```typescript
// ✅ Logic lives in a pure function; component only renders
// src/lib/quiz/quiz-engine.ts
export function scoreQuizAnswer(options: QuizOption[], selectedId: string): number {
  return options.some(o => o.id === selectedId && o.isCorrect) ? 50 : 0
}

// Component just calls it
const points = scoreQuizAnswer(section.options, selectedId)
```

---

### Principle 3 — Event-Driven Over Direct Coupling

**Law:** Systems communicate via the Event Bus. A system completing an action emits an event. Other systems react. No system calls another system's functions directly for cross-cutting concerns.

**Why:** Direct coupling means that when the XP Engine wants to trigger an achievement check, it must import the Achievement Engine. When the Achievement Engine is refactored, the XP Engine breaks. With event-driven design, the XP Engine emits `XP_AWARDED` — the Achievement Engine listens. Neither knows the other exists. They can be built, deployed, and replaced independently.

**How to apply:**
- After state changes that matter to the platform, emit an event
- Never import one engine from another
- `useLessonStore` does not import `useAchievementStore`
- `useXPStore` does not import `useAudioManager`

**Anti-pattern:**
```typescript
// ❌ Direct coupling between engines
import { useAchievementStore } from '@/store/achievement-store'

// Inside useLessonStore.completeLesson():
useAchievementStore.getState().evaluate(lessonId)  // Creates hard dependency
```

**Correct approach:**
```typescript
// ✅ Event emission — Achievement Engine reacts independently
import { emit } from '@/lib/events'

// Inside useLessonStore.completeLesson():
emit({ type: 'LESSON_COMPLETED', payload: { lessonId, xpEarned, firstTime: true } })
// Achievement Engine registers: on('LESSON_COMPLETED', evaluate)
```

---

### Principle 4 — Extend Before Rewriting

**Law:** Before rewriting a system, enumerate every consumer, document the migration cost, and prove that extension is impossible. If extension is possible with less than 50% additional code, extend. If a rewrite is necessary, it requires a migration plan, a compatibility layer, and team sign-off.

**Why:** Rewrites are the single most dangerous source of technical debt. They invalidate tests, break integrations, destroy institutional knowledge, and almost always take 3× longer than estimated. The CyberLearn discriminated-union pattern is specifically designed for extension — new section types, event types, and storage keys can all be added without touching existing code.

**How to apply:**
- Adding a new section type: add to the union (1 line), add Zod schema (5–10 lines), add renderer case (1 component). Three contained changes.
- Adding a new event type: add to `GameEvent` union (5 lines). Zero other changes required.
- Adding a new storage domain: add key to `STORAGE_KEYS` (1 line). Call `saveManager.set()`.

**Anti-pattern:**
```typescript
// ❌ "This section renderer is getting complex, let me start over with a plugin system"
// — This is premature complexity. The current pattern handles 100+ section types without modification.
```

---

### Principle 5 — One Owner Per System

**Law:** Every engine, module, and config file has a designated owner who is responsible for its API contract, migration strategy, and breaking-change communication. "Everyone owns it" means no one owns it.

**Why:** Systems without owners accumulate contradictory changes, inconsistent patterns, and undocumented breaking changes. The owner is not a gatekeeper — they are the person who ensures the system's architectural integrity is maintained as it evolves.

**How to apply:** See Section 6 (System Ownership Model) for the current owner map.

---

### Principle 6 — Mobile-First Is Not a Checkbox

**Law:** Mobile is the primary design target. Desktop is the enhanced experience. Every performance budget, every touch target, every animation, every layout decision is evaluated on a mid-range Android device first.

**Why:** CyberLearn's learners access the platform across all device types, often on mobile during commutes, in the field, or in environments without desktop access. A platform that degrades on mobile is not a platform for all learners.

**Reference device:** Snapdragon 680, 4GB RAM, Android 13, 4G LTE with 150ms latency.

**How to apply:**
- Use `dvh` (dynamic viewport height) instead of `vh` everywhere. `100vh` breaks on mobile browsers when the address bar shows/hides.
- All touch targets minimum 44×44px (WCAG 2.5.5).
- Use `safe-area-inset-*` for notched and punch-hole devices.
- All Framer Motion animations must be GPU-composited (`opacity`, `transform` only — never `width`, `height`, `top`, `left`).
- Test scroll performance on mobile before merging any list-heavy component.

---

### Principle 7 — Performance Is Correctness

**Law:** A lesson section that renders in 200ms is not "slow" — it is **broken**. Performance is a correctness requirement, not an optimization. See Section 8 for specific budgets.

**Why:** Learning requires flow state. Any perceptible lag — a janky animation, a slow section transition, a delayed button response — breaks immersion and signals to the learner that the platform is not professional. CyberLearn competes with AAA games for attention. Games do not ship with 200ms input latency.

**How to apply:**
- Animations: `transform` and `opacity` only. Never animate `width`, `margin`, `padding`, `top`, or `left`.
- Images/assets: lazy load with `loading="lazy"` and explicit width/height to prevent layout shift.
- Bundle size increases > 10KB gzipped require justification in the pull request.
- No synchronous localStorage reads or writes in the render path.
- All async operations in engines (Save Manager, Content Engine) are `async/await` — never blocking.

---

### Principle 8 — Accessibility Is Non-Negotiable

**Law:** Every feature ships with full keyboard navigation, appropriate ARIA labels, and respect for `prefers-reduced-motion`. Accessibility failures are blocking bugs, not backlog items.

**Why:** Accessibility is not a feature for a minority — it is correctness for everyone. Keyboard navigation benefits power users. High-contrast support benefits users in bright environments. Reduced-motion support benefits users with vestibular disorders AND users on low-end devices where complex animations drop frames.

**Hard rules:**
- All animations check `prefers-reduced-motion` via Framer Motion's `useReducedMotion()` hook. If reduced motion is preferred, use instant transitions (duration: 0) or fade-only animations.
- Every icon-only button has `aria-label`.
- Color alone never conveys information. A red error also has an icon or text label.
- Tab order must match visual reading order.
- Minimum contrast ratio 4.5:1 for body text, 3:1 for large text (WCAG 2.2 AA).

---

### Principle 9 — Type Everything, Trust Nothing At Boundaries

**Law:** TypeScript's type system is the primary safety net inside the application. At system boundaries — content JSON files, localStorage reads, API responses, user input — Zod is the runtime validator. No `any`. No untyped returns. No silent failures.

**Why:** TypeScript catches mistakes at compile time. Zod catches data corruption at runtime. Together they eliminate an entire class of bugs that would otherwise surface in production. `any` is a hole in both nets.

**How to apply:**
- Content JSON files are validated by Zod on every load. If validation fails, throw `ContentValidationError` — never silently return invalid data.
- localStorage reads use `IStorageAdapter.get<T>()` which returns `T | null`. Callers handle null explicitly.
- `unknown` + type narrowing over `any` when you genuinely don't know the type.
- `as Type` casts require a comment explaining why the cast is safe.

**Hard rule:** `eslint` is configured with `@typescript-eslint/no-explicit-any` set to `error`. This is not overridable per-file.

---

### Principle 10 — Simple Systems Beat Clever Systems

**Law:** The best code is code a new engineer understands in one read without a mental model of the entire codebase. If an implementation requires a clever trick, it requires a comment explaining the trick. If multiple tricks accumulate, refactor.

**Why:** CyberLearn will be maintained by engineers who join three years from now. Clever code that was obvious to its author is a trap for everyone else. The discriminated union pattern, the module singleton event bus, the pure-function + Zustand store split — these are all simple and composable, not clever.

**How to apply:**
- If you need to explain what a function does (not why) — rename it.
- If a function does two things, split it into two functions.
- Three similar blocks of code is a pattern. Extract it. Two similar blocks is coincidence. Leave it.
- Prefer explicit over implicit. A `switch` with all cases named beats a dynamic dispatch table that requires knowing the full key set.

---

### Principle 11 — The Exhaustive Switch Rule

**Law:** Every `switch` statement over a TypeScript discriminated union must include a `default` branch that enforces exhaustiveness. No exceptions.

**Why:** Discriminated unions are the primary extension mechanism for section types, event types, and game states. When a new member is added to the union, every `switch` that doesn't handle it has a bug. The `never` exhaustive check makes that bug a TypeScript compile error — impossible to miss.

**Required pattern:**
```typescript
function render(section: LessonSection) {
  switch (section.type) {
    case 'hook':        return <HookRenderer section={section} />
    case 'story':       return <StoryRenderer section={section} />
    // ... all cases ...
    default: {
      const _exhaustive: never = section
      console.error('Unhandled section type:', _exhaustive)
      return null
    }
  }
}
```

This is already implemented in `SectionRenderer`. It must be replicated in every future `switch` over `LessonSection`, `GameEvent`, or any other discriminated union.

---

### Principle 12 — Every Design Decision Has a Written Reason

**Law:** Significant architectural decisions are recorded in `docs/decisions/` using the ADR format (see Section 13). Future engineers should never need to reverse-engineer intent from code structure alone.

**Why:** The cost of writing a decision record is 20 minutes. The cost of reverse-engineering an undocumented decision is hours to days — and often leads to the wrong conclusion and a well-intentioned but harmful refactor.

**What qualifies as a significant decision:**
- Choosing a module singleton over a class or Context (Event Bus)
- Choosing Zustand over Redux or Context for state
- Choosing the pure-function + store split for the XP Engine
- Choosing adapter pattern for the Save Manager
- Choosing React Router v6 loaders over component-level guards
- Any decision that a reasonable engineer might question or want to change

---

### Principle 13 — Reuse Before Creating

**Law:** Before writing a new function, utility, hook, or component, search the codebase for an existing one that solves the same problem. The codebase grows through specialization and composition — not through duplication.

**Why:** Every duplicated piece of logic is two maintenance targets. When a bug is found in one, the other goes unpatched. When an edge case is discovered and fixed, the other copy keeps the broken behavior. The XP Engine, the Content Engine, and the Interactive Library were built specifically to be reused. If a feature reimplements logic that one of these engines already provides, the platform now has two conflicting authorities for the same concern.

**How to apply — the three-step check before creating anything new:**
1. **Grep for it.** Search for the function name, the concept, or a keyword. It may already exist in `src/lib/`, `src/components/`, or the interactive library.
2. **Can an existing system be extended?** Apply Principle 4 first. If the existing system can cover the need with an addition, extend it.
3. **Only if both answers are no:** create the new thing in the correct location (`src/lib/` for logic, `src/components/` for shared UI).

**Anti-pattern:**
```typescript
// ❌ Same formatting logic duplicated across two feature files
// src/features/dashboard/pages/dashboard.tsx
const formatXP = (xp: number) => `${xp.toLocaleString()} XP`

// src/features/lesson/components/lesson-player.tsx
const displayXP = (xp: number) => `${xp.toLocaleString()} XP`
```

**Correct approach:**
```typescript
// ✅ One canonical implementation in src/lib/utils.ts
export function formatXP(xp: number): string {
  return `${xp.toLocaleString()} XP`
}
// Both features import from @/lib/utils — one source, one maintenance target
```

---

### Principle 14 — Composition Over Monoliths

**Law:** Build systems from small, focused, composable pieces. A function that does one thing well is better than a function that does three things adequately. The platform's existing architecture is proof of this principle — honor it in every new layer.

**Why:** The discriminated-union lesson engine is a composition model: 15 focused section types composed into a lesson, each renderer responsible for exactly one section type. The Event Bus is a composition model: emitters and listeners compose independently without knowing each other exist. When a system becomes monolithic — one large store that owns all state, one giant function that does everything, one component that manages its own business logic — it becomes impossible to test in isolation, impossible to reuse parts, and dangerous to modify without unintended side effects.

**How to apply:**
- **Functions:** One function = one responsibility. If you need a prose comment to explain what a function does (not why), it needs to be split or renamed.
- **Store actions:** Each action performs one state transition. `completeLesson()` marks the lesson complete. The XP Engine awards XP independently. The Event Bus notifies listeners independently. No one action should do all three.
- **Components:** One primary concern per component. A section renderer renders a section — it does not also manage XP state, play audio, or check achievements. When a component prop list exceeds 6 props, consider whether it should be split.
- **Engines:** Each engine owns one domain. The XP Engine owns XP. The Achievement Engine owns achievements. They communicate via events, not by calling each other.

**Anti-pattern:**
```typescript
// ❌ One store action that owns every concern
completeLesson: (lessonId, xpReward) => {
  set({ completed: [...completed, lessonId] })
  // + XP calculation inline
  // + achievement checking inline
  // + audio trigger inline
  // + notification scheduling inline
  // + analytics tracking inline
}
// Impossible to test in isolation. Impossible to change one concern without touching all others.
```

**Correct approach:**
```typescript
// ✅ One action, one concern — others react via Event Bus
completeLesson: (lessonId, xpReward) => {
  set({ completed: [...completed, lessonId] })
  useXPStore.getState().awardXP(xpReward, 'lesson_completion', { lessonId })
  emit({ type: 'LESSON_COMPLETED', payload: { lessonId, xpEarned: xpReward } })
  // AchievementEngine listens to LESSON_COMPLETED — independently
  // AudioManager listens to XP_AWARDED — independently
  // NotificationEngine listens to both — independently
}
```

---

## 3. Platform Rules

These are specific, operational rules derived from the twelve principles. They are concrete enough to check in a code review.

### Content Rules

| # | Rule |
|---|------|
| C1 | Never hardcode XP reward amounts in TypeScript. They live in `lesson.json > xpReward`. |
| C2 | Never hardcode dialogue or narrative in component files. They live in `lesson.json > sections[*].narrative`. |
| C3 | Never hardcode learning objectives. They live in `lesson.json > learningObjectives`. |
| C4 | Never hardcode quiz questions. They live in `lesson.json > sections[*]` (type: `quiz`). |
| C5 | Content changes — adding lessons, editing dialogue, updating XP values — must never require code changes. |
| C6 | Every content JSON file must pass Zod schema validation before being accepted into the content pipeline. |
| C7 | Display-layer metadata (accent color, availability flags) lives in `src/config/`. Curriculum data lives in `content/`. Never mix them. |

### Engine Rules

| # | Rule |
|---|------|
| E1 | Every engine exposes its public API only through its `index.ts`. Internal modules are never imported directly by consumers. |
| E2 | Engines never import from `src/features/`. The dependency arrow always points from features toward engines, never the reverse. |
| E3 | Engines communicate with each other only via the Event Bus. No direct function calls between engines for cross-cutting concerns. |
| E4 | Every engine has a designated owner (see Section 6). |
| E5 | Business logic (calculations, validations, state transitions) lives in pure functions inside `src/lib/`. Side effects (persistence, event emission) live in Zustand store actions. |
| E6 | Pure functions are synchronous. Engines that need async operations use store actions, not pure functions. |
| E7 | Every Zustand store exposes `getState()` for non-React consumers (loaders, utility functions, other store actions). Never use hooks outside of React components. |

### Analytics Rule

| # | Rule |
|---|------|
| A1 | **The Analytics Tap:** The only place analytics code may observe application behavior is inside an `EventBus.onAny()` listener registered at app startup. No component, store, or engine may import an analytics SDK directly. Analytics is a passive observer — it never affects application behavior. |

This rule exists because analytics integrations tend to spread across an entire codebase if not constrained. The Event Bus already captures every significant event. Analytics needs only to subscribe to them.

```typescript
// src/lib/analytics/index.ts — the ONLY analytics integration point
import { onAny } from '@/lib/events'

export function initAnalytics() {
  if (import.meta.env.DEV) return  // no analytics in development

  onAny((event) => {
    analyticsClient.track(event.type, event.payload)
  })
}
```

### TypeScript Rules

| # | Rule |
|---|------|
| T1 | `any` is a lint error (`@typescript-eslint/no-explicit-any: error`). Use `unknown` + type narrowing. |
| T2 | Every `switch` over a discriminated union must have a `default: { const _: never = x }` exhaustive branch. |
| T3 | Type assertions (`as Type`) require a comment explaining why the cast is safe. |
| T4 | All exported functions have explicit return types. TypeScript's inference is for internal use. |
| T5 | `tsconfig.json` strict mode stays enabled. No per-file `// @ts-ignore` without a linked issue. |

### Testing Rules

| # | Rule |
|---|------|
| TS1 | Pure functions are unit-tested with inputs and expected outputs only. Never mock internals of pure functions. |
| TS2 | Zustand stores are integration-tested using the real store with a mock StorageAdapter. |
| TS3 | React components are tested for user-visible behavior (what renders, what changes on interaction) — not implementation details (which function was called, what prop was passed). |
| TS4 | Every new engine (`src/lib/*`) ships with a corresponding `__tests__/` directory on the same day. |
| TS5 | Test coverage is not a metric. Confidence is a metric. A 100%-covered system that only tests happy paths is less valuable than a 60%-covered system that tests every error state. |

### Dependency Rules

| # | Rule |
|---|------|
| D1 | Adding a new npm dependency > 10KB gzipped requires a pull request comment justifying it against the alternatives. |
| D2 | Dependencies that solve a problem solvable in < 50 lines of idiomatic TypeScript are not added. |
| D3 | No dependency may be imported in `src/lib/` from `src/features/`. The engine layer has no feature-layer imports. |

### Feature Rules

| # | Rule |
|---|------|
| FR1 | Before building a feature, ask: "Is this logic needed by only one feature, or could it serve others?" If the answer is "others," design an engine first. The feature becomes a consumer of that engine. |
| FR2 | Feature components contain no business logic. If a value is computed rather than directly displayed, that computation belongs in `src/lib/`. A component that computes a score, calculates a rank, or evaluates a condition contains business logic that belongs in an engine. |
| FR3 | Features may not import from other features. If Feature A needs something from Feature B, that thing belongs in `src/lib/` or `src/components/shared/`. Cross-feature imports create hidden coupling that causes silent breakage on refactors. |
| FR4 | Feature-specific UI state (open/closed drawers, active tabs, local loading spinners) belongs in the feature. Domain state (XP, progress, achievements, auth) belongs in engine stores in `src/store/`. |
| FR5 | If the same business logic appears in two or more features, extract it to `src/lib/` immediately — before it drifts into a third. |

---

## 4. The Three Architecture Gates

Every new system — engine, module, significant feature, or infrastructure change — must pass three gates before implementation begins. These gates are evaluated in order. Failure at any gate stops implementation until the design is revised.

A "new system" is defined as anything that introduces a new `src/lib/` directory, a new Zustand store, a new route with business logic, or a new dependency > 10KB.

---

### Gate 1 — Technical Gate

*Can we build this correctly?*

```
[ ] Does it have a clean, documented public interface (index.ts exports only)?
[ ] Is the public API the minimum surface needed to serve its consumers?
[ ] Can it be independently unit-tested without mounting React or importing other engines?
[ ] Does it handle its own error conditions without crashing the application?
[ ] Is it backward-compatible with all existing integrations?
[ ] Does it introduce zero new `any` types?
[ ] Does it pass `npm run type-check` with zero errors?
[ ] Does it pass `npm run lint` with zero warnings?
[ ] Does every discriminated union switch include a `never` exhaustive branch?
[ ] Are all public functions explicitly return-typed?
```

Gate 1 passes when every item is checked. Any unchecked item blocks implementation.

---

### Gate 2 — Product Gate

*Should we build this?*

```
[ ] Does this directly improve a learner's experience or the content team's velocity?
[ ] Can content creators use it without writing TypeScript code?
[ ] Is it designed for the entire platform, not for one specific academy or lesson?
[ ] Does it work correctly with zero content (empty state — no courses, no lessons)?
[ ] Does it work correctly with maximum expected content (500+ lessons)?
[ ] Does it degrade gracefully when its dependencies are unavailable?
[ ] Is there no existing system that already provides this capability?
[ ] Is this a long-lived capability, or a one-off workaround?
```

Gate 2 passes when every item is checked. If a capability already exists and could be extended, the extension is implemented instead.

---

### Gate 3 — Long-Term Gate

*Will this be the right design in 5–10 years?*

```
[ ] Can this system be reused by every future academy without modification?
[ ] Can it support 1,000 concurrent users without architectural changes?
[ ] Does it work on Android, iOS, tablet, and web browser with equal correctness?
[ ] Can a new engineer understand it within one working day?
[ ] Can future systems integrate by listening to events — without modifying this implementation?
[ ] Does it reduce future complexity rather than increase it?
[ ] Is the public API stable enough that v1 consumers will not need migration for at least 3 years?
[ ] If this system were deleted tomorrow, how many other systems would break? (Answer should be: "only those that explicitly import from it")
```

Gate 3 passes when every item is checked. If the answer to any question is "no," the design is revised before implementation.

---

## 5. Engine vs Feature vs Module

### The Decision Framework

```
Is it rendered at a specific route?
├─ YES → Feature   (src/features/<name>/pages/)
└─ NO → continue

Does it own state, calculate business logic, and/or emit events?
├─ YES → Engine    (src/lib/<name>/ + optional src/store/<name>-store.ts)
└─ NO → continue

Is it a reusable React component with no business logic?
├─ YES → Component (src/components/ or src/features/<name>/components/)
└─ NO → continue

Is it a reusable pure function?
├─ YES → Utility   (src/lib/utils.ts or src/lib/<domain>/index.ts)
└─ NO → continue

Is it static presentation metadata (colors, flags, labels)?
└─ YES → Config    (src/config/<name>.config.ts)
```

### Classification Table — All Existing and Planned Systems

| System | Classification | Location | Rationale |
|--------|---------------|----------|-----------|
| **Event Bus** | Engine (Infrastructure) | `src/lib/events/` | Owns no domain state but is platform infrastructure — no business logic, just routing |
| **XP Engine** | Engine | `src/lib/xp/` + `src/store/xp-store.ts` | Owns XP state, calculates awards, emits events |
| **Save Manager** | Engine (Infrastructure) | `src/lib/persistence/` | Owns persistence contract, adapter selection |
| **Content Engine** | Engine | `src/lib/content/` | Owns content loading, validation, caching |
| **Route Guards** | Utility Module | `src/router/guards.ts` | Pure functions with no state — not an engine |
| **Achievement Engine** *(Phase 2)* | Engine | `src/lib/achievements/` + `src/store/achievement-store.ts` | Owns achievement state, evaluates conditions |
| **Audio Manager** *(Phase 2)* | Engine | `src/lib/audio/` | Owns audio state, playback control |
| **Notification Engine** *(Phase 2)* | Engine | `src/lib/notifications/` + `src/store/notification-store.ts` | Owns notification queue, display state |
| **Dialogue Engine** *(Phase 2)* | Engine | `src/lib/dialogue/` | Owns dialogue state, character management |
| **Scene Engine** *(Phase 2)* | Engine | `src/lib/scenes/` | Owns scene transition state |
| **Career Engine** *(Phase 3)* | Engine | `src/lib/career/` | Owns career interest profile, progression |
| **Analytics** *(Phase 2)* | Engine (Passive) | `src/lib/analytics/` | Passive event observer — no state, no emissions |
| **Dashboard** | Feature | `src/features/dashboard/pages/` | Route-level presentation |
| **Academy Paths** | Feature | `src/features/academy/pages/` | Route-level presentation |
| **Lesson Player** | Feature | `src/features/lesson/` | Full-screen route, consumes Content Engine |
| **Lesson Store** | Engine fragment | `src/features/lesson/store/` | Should migrate to `src/store/lesson-store.ts` |
| **Interactive Library** | Component collection | `src/features/interactive/` | Reusable UI only, no business logic |
| **RANKS constant** | Config/Constants | `src/types/index.ts` | Static data — not an engine |
| **Academy Display Config** | Config | `src/config/academy-display.config.ts` | Presentation metadata — not curriculum |

### The Lesson Store Exception

`src/features/lesson/store/lesson-store.ts` is currently inside `src/features/` but contains engine-level logic. This is a known architectural inconsistency inherited from the initial build. It should be migrated to `src/store/lesson-store.ts` in Phase 2. Until then, it is treated as an engine for all practical purposes. Its store key remains unchanged during migration to avoid losing user progress.

---

## 6. System Ownership Model

**Ownership** means: responsible for the API contract, migration planning, breaking-change communication, and review of proposed changes. Owners are not gatekeepers — they are stewards.

Every system has exactly one owner. Ownership is a file in `docs/owners.md`.

### Current Ownership Map

| System | Owner | Stability |
|--------|-------|-----------|
| **Event Bus** | Lead Architect | Stable — interface is additive-only |
| **XP Engine** | Lead Architect | Stable — extension via bonus/multiplier types |
| **Save Manager** | Lead Architect | Stable — adapter pattern absorbs backend changes |
| **Content Engine** | Content Engineer | Stable — Zod schema changes require migration |
| **Lesson Store** | Product Engineer | Active — will grow with Phase 2 requirements |
| **Auth Store** | Product Engineer | Stable |
| **UI Store** | Product Engineer | Ephemeral — will shrink as engines handle more state |
| **Design System** | Design/Frontend Lead | Stable — additive only |
| **Interactive Library** | Content Engineer | Active — new components added per curriculum need |
| **Router** | Lead Architect | Stable — extends with loaders, not structure changes |

### What "Stable" Means

A stable system's public interface (the `index.ts` exports) does not change without:
1. A migration plan for every existing consumer
2. A versioned deprecation period (minimum: one full phase)
3. Owner communication to all consumers before the change ships

---

## 7. Future Consumer Map

This section documents every known future consumer of each existing system. It proves that each system is genuinely reusable and justifies its engine classification.

### Event Bus

The Event Bus is the connective tissue of the entire platform. Every system that needs to know about cross-cutting state changes becomes a consumer.

**Why every future consumer benefits:** The Event Bus is why CyberLearn's systems do not need to know each other exist. The Achievement Engine does not import the Lesson Store. The Audio Manager does not import the XP Engine. The Analytics module imports nothing. Every consumer listed below benefits from the same architectural property: it can be built, tested, replaced, or removed independently without any other system caring. Each new consumer is a new capability — not a new coupling. This is the direct mechanism by which CyberLearn stays extensible as it grows from 1 academy to 5.

| Future Consumer | Events Consumed | Events Emitted | Why It Needs the Bus |
|----------------|-----------------|----------------|----------------------|
| **Achievement Engine** | `LESSON_COMPLETED`, `QUIZ_COMPLETED`, `CHALLENGE_SOLVED`, `STREAK_UPDATED` | `ACHIEVEMENT_UNLOCKED` | Must react to progress without coupling to lesson/quiz stores |
| **Audio Manager** | `XP_AWARDED`, `ACHIEVEMENT_UNLOCKED`, `LESSON_COMPLETED`, `SCENE_CHANGED`, `DIALOGUE_STARTED` | `AUDIO_PLAY`, `AUDIO_STOP` | Audio reacts to game events without knowing their source |
| **Notification Engine** | `NOTIFICATION_PUSH`, `XP_AWARDED`, `LEVEL_UP`, `ACHIEVEMENT_UNLOCKED` | — | UI layer observes events to schedule toasts and overlays |
| **Analytics** | All (`onAny`) | — | Passive event tap — the only analytics integration point |
| **Dialogue Engine** | `SCENE_CHANGED`, `MISSION_STARTED` | `DIALOGUE_STARTED`, `DIALOGUE_ENDED` | Dialogue responds to scene transitions without tight coupling |
| **Scene Engine** | `MISSION_COMPLETED`, `DIALOGUE_ENDED` | `SCENE_CHANGED` | Scene transitions triggered by game events |
| **Mission Engine** | `LESSON_COMPLETED` (for all lessons in a module) | `MISSION_STARTED`, `MISSION_COMPLETED` | Aggregates lesson completions into mission state |
| **Career Engine** | `MISSION_COMPLETED`, `ACHIEVEMENT_UNLOCKED`, `LESSON_COMPLETED` | `PROFILE_UPDATED` | Career recommendations update based on completed content |
| **Live Events** | `PLAYER_LOGGED_IN` | `XP_AWARDED` (bonus), custom multiplier events | Live events apply temporary XP bonuses on login |
| **Social/Community** | `LEVEL_UP`, `ACHIEVEMENT_UNLOCKED`, `MISSION_COMPLETED` | — | Share milestones to community feed |
| **Streak Manager** | `PLAYER_LOGGED_IN`, `LESSON_COMPLETED` | `STREAK_UPDATED` | Streak logic reacts to login and completion events |
| **Cutscene Manager** | `MISSION_COMPLETED`, `BADGE_UNLOCKED` | `SCENE_CHANGED` | Cutscenes play after mission completion/badge events |

### XP Engine

The XP Engine is the authoritative scoring layer. Every system that rewards or displays player progression uses it.

**Why every future consumer benefits:** The XP Engine provides a single authoritative XP total. When the Leaderboard, the Career Engine, the Achievement Engine, and the Progress Bar all read from `useXPStore`, they all agree on the same number — always. Removing the XP Engine would require every consumer to implement its own XP tracking, or worse, read from localStorage directly, leading to divergent totals and impossible-to-debug inconsistencies. The multiplier system (`XPMultiplier[]`) is the extension point for every future XP modifier — Pro subscriptions, Live Events, streak bonuses — and every future consumer benefits from these modifiers automatically without any changes to their code.

| Future Consumer | How It Uses XP Engine | Why Not Direct Store Access |
|----------------|----------------------|----------------------------|
| **Achievement Engine** | Reads `totalXP` to check XP-threshold achievements | Reads state, does not award — uses `getRankProgress()` selector |
| **Leaderboard** | Reads `totalXP` per user for ranking | Server-side in Phase 3; XP store is the local authority |
| **Career Engine** | Reads `totalXP` + domain-specific XP for career recommendations | Career specialization requires XP by category (future: `getXPByCategory()`) |
| **Daily Challenge** | Awards bonus XP via `awardXP('challenge_solved', ...)` | Follows standard XP Engine interface |
| **Live Events** | Applies temporary multipliers via `XPMultiplier[]` arg | Multiplier system is already designed into `awardXP()` |
| **Pro Subscription** | Applies permanent 1.5× multiplier | Same multiplier system |
| **Progress Bar / XPBar** | Reads `getRankProgress()` for visual rendering | Component consumes selector, not raw state |
| **Social Milestones** | Detects rank changes via `LEVEL_UP` event | Event-driven — social system is a listener |

### Save Manager

The Save Manager is the persistence contract for the entire platform. Every new engine that needs persistent state registers a key with the Save Manager.

**Why every future consumer benefits:** Every future engine that calls `saveManager.set(STORAGE_KEYS.ACHIEVEMENTS, data)` will work correctly today with localStorage, and identically in Phase 3 with an HTTP backend — without changing a single line of consumer code. This is the direct financial ROI of the adapter pattern: every engine written to the Save Manager interface is automatically ready for cloud sync, offline queuing, and data migration when those features are added. The alternative — engines calling `localStorage` directly — would require touching every engine when the backend arrives.

| Future Consumer | Persists | Notes |
|----------------|----------|-------|
| **Achievement Engine** | Unlocked achievements, unlock timestamps | `STORAGE_KEYS.ACHIEVEMENTS` |
| **Inventory System** | Collected items, item metadata | `STORAGE_KEYS.INVENTORY` |
| **Career Engine** | Interest profile, career goal, recommended paths | `STORAGE_KEYS.CAREER` |
| **Settings Manager** | Audio on/off, volume, language preference, display mode | `STORAGE_KEYS.SETTINGS` |
| **Relationship System** | Character relationship scores | Future key: `cyber-learn:v1:relationships` |
| **Cloud Sync** | All keys via `HttpStorageAdapter` | Phase 3: adapter swap — no application code changes |
| **Offline Queue** | Pending sync items for when network restores | Phase 3: `HttpStorageAdapter` handles internally |
| **Streak Manager** | Current streak, last active date | Future key: `cyber-learn:v1:streak` |

### Content Engine

The Content Engine is the platform's curriculum source of truth. Every feature that displays educational content is a consumer.

**Why every future consumer benefits:** Future consumers can be built today against curriculum that does not yet exist. The Campaign World Map can be built to consume `getAllCourses()` before Academy 3 is authored. The Prerequisite Resolver can be built against `lesson.prerequisites` before any prerequisites are written. The Search Engine can index section data before the content team has written 90% of the curriculum. This decoupling of feature development from content authoring is one of the platform's most consequential architectural properties — it means engineering velocity is not gated on content team delivery.

| Future Consumer | Uses | Notes |
|----------------|------|-------|
| **Campaign World Map** | `getAllCourses()`, `getModulesForCourse()` | Module metadata for visual map nodes |
| **Search** | All lesson data indexed at startup | Future: `buildSearchIndex()` from lesson sections |
| **Career Engine** | `lesson.tags`, `lesson.learningObjectives` | Match learner interests to curriculum domains |
| **Prerequisite Resolver** | `lesson.prerequisites` | Lock/unlock operations based on completion |
| **Progress Aggregation** | All lesson IDs per module | Module completion = all lesson IDs in progress store |
| **Accessibility Layer** | Section `description` fields | Alt text for diagrams, voiceover for screen readers |
| **Sitemap Generator** | `getAvailableLessonKeys()` | Already exposed — build-time sitemap for SEO |
| **Content Search Engine** | All lesson JSON | Full-text search across all sections |

### Route Guards

Route Guards are a utility module (not a full engine), but they compose with future access control systems.

**Why every future consumer benefits:** Every future guard follows the exact same React Router v6 `loader` function signature as `requireAuth`. When `requirePro` is added, it looks like `requireAuth` — same shape, same error handling, same redirect pattern. When `requirePrerequisites` is added, it also follows the same signature. No consumer, no route, and no component needs to know how authentication works, how subscription status is checked, or how prerequisite completion is determined. The pattern is stable for 5+ years because it is the framework's own recommended pattern — not an internal convention that could drift.

| Future Consumer | Guard Type | Notes |
|----------------|------------|-------|
| **Pro Content** | `requirePro` loader | Checks user subscription tier before rendering premium lessons |
| **Prerequisite Gates** | `requirePrerequisites(lessonId)` loader | Checks prerequisite completion before rendering locked operations |
| **Beta Access** | `requireBetaAccess(featureFlag)` loader | Feature flag checking for staged rollouts |
| **Age Verification** | `requireAgeVerification` loader | If required by jurisdiction for certain content |

---

## 8. Performance Budgets

These are concrete, measurable targets. They define "working correctly" for mobile-first experience. Missing these budgets is equivalent to a bug.

### Timing Budgets

| Metric | Budget | Measurement Method |
|--------|--------|--------------------|
| Time to Interactive (4G, mid-range Android) | < 3,000ms | Lighthouse CI on reference device profile |
| Section transition animation duration | ≤ 280ms | Framer Motion `duration` prop |
| Section renderer render time | < 16ms (1 frame @ 60fps) | React DevTools Profiler |
| Zustand store state update → re-render | < 32ms (2 frames) | React DevTools Profiler |
| localStorage read (Save Manager `get()`) | < 5ms | Performance.now() in development |
| Content Engine `getLesson()` on cache hit | < 1ms | Performance.now() in development |
| Content Engine `getLesson()` on cache miss | < 50ms | Network tab (4G throttle) |

### Bundle Size Budgets

| Bundle | Budget | Notes |
|--------|--------|-------|
| Initial (core) bundle | < 150KB gzipped | Measured with `npm run build` output |
| Lesson Player (lazy chunk) | < 80KB gzipped | Lazy-loaded on first lesson navigation |
| Per-dependency addition | < 10KB gzipped requires justification | Logged in PR description |

### Storage Budgets

| Threshold | Action |
|-----------|--------|
| > 3MB used | Log warning in development |
| > 4MB used | Emit `NOTIFICATION_PUSH` warning to user: "Consider clearing old progress" |
| > 4.5MB used | Block new writes (except progress). This is the safety margin before iOS Safari's 5MB limit |
| > 4.8MB used | Log critical error. Offer `exportSave()` and manual clear |

### Animation Performance Rule

All animations must use GPU-composited properties only:

```
✅ ALLOWED:   opacity, transform (translate, scale, rotate)
❌ FORBIDDEN: width, height, top, left, margin, padding, border-radius (during animation)
```

Animating non-composited properties forces layout and paint recalculations on every frame, causing jank on mobile. Violations are detectable via Chrome DevTools "Paint flashing" and Framer Motion's `onUpdate` performance logging.

---

## 9. Accessibility Standards

CyberLearn targets WCAG 2.2 Level AA. Accessibility is not a separate checklist — it is part of the definition of done for every feature.

### Required For Every Feature

```
[ ] All interactive elements have visible focus styles (not outline: none)
[ ] All icon-only buttons have aria-label
[ ] Color alone never conveys status — always paired with icon or text
[ ] Minimum contrast ratio: 4.5:1 for body text, 3:1 for large text (18px+)
[ ] All form inputs have associated <label> elements
[ ] All images have alt text (empty alt="" for decorative images)
[ ] Tab order matches visual reading order
[ ] No content flashes at > 3Hz (WCAG 2.3.1)
[ ] prefers-reduced-motion is respected: all animations have a zero-duration or fade-only fallback
[ ] Touch targets minimum 44×44px (WCAG 2.5.5)
[ ] Dynamic content changes are announced to screen readers via aria-live
```

### `prefers-reduced-motion` Implementation Rule

```typescript
// ✅ Required pattern for all Framer Motion animations
import { useReducedMotion } from 'framer-motion'

function AnimatedSection({ children }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      initial={{ opacity: 0, x: prefersReduced ? 0 : 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: prefersReduced ? 0 : 0.28 }}
    >
      {children}
    </motion.div>
  )
}
```

The `useReducedMotion()` hook is already available in Framer Motion. Every animation in the codebase must use it. This is retroactively required for all existing animations.

---

## 10. Internationalization Readiness

i18n is not a Phase 1 feature. However, the architecture must not make i18n harder to add in Phases 3–5. The following rules apply immediately to prevent i18n technical debt from accumulating.

### Rules

**R1 — No user-facing strings in engines.** Pure functions and store actions never contain English display strings. If an engine needs to produce a display message, it returns a key string (`'xp.award.levelUp'`) that the UI resolves via an i18n library.

**R2 — Content JSON is the localization boundary for curriculum.** All educational content (narrative, quiz questions, explanations) is in English in `lesson.json`. In the future, a locale-specific `lesson.fr.json` or a `translations` block can be added to the schema. The Content Engine's `getLesson()` signature will accept an optional `locale` parameter. Do not prevent this by hardcoding the file path pattern.

**R3 — UI strings are acceptable in components for now** — but they should be wrapped in a `t()` function call as if an i18n library exists, even if `t` is currently just `(s: string) => s`. When a real i18n library is added, the `t()` wrapper is already the integration point.

```typescript
// src/lib/i18n/index.ts (Phase 1 stub)
export const t = (key: string, _params?: Record<string, string>): string => key

// Usage in components (Phase 1 — key is also the default English string)
<h1>{t('dashboard.welcome.title')}</h1>

// Phase 3 — swap the implementation; no component changes needed
export const t = (key: string, params?: Record<string, string>): string =>
  i18nLibrary.translate(currentLocale, key, params)
```

**R4 — Date, number, and currency formatting** must use `Intl` objects, never hardcoded format strings.

---

## 11. Error Handling Policy

### The Two Error Contexts

**Development errors** (programmer mistakes — wrong types, missing fields, API contract violations): fail loudly. Throw. Log. Crash. These should never reach production.

**Runtime errors** (content corruption, storage quota, network failures, invalid user input): fail gracefully. Log. Degrade. Show a helpful message. Never crash.

### Error Boundary Policy

Every route-level page component must be wrapped in a React Error Boundary. The boundary renders a graceful fallback — not a white screen.

```
Required: <ErrorBoundary fallback={<ContentUnavailable />}>
  <LessonPlayer />
</ErrorBoundary>
```

Content errors (Zod validation failures from the Content Engine) should display:
- What was being loaded
- That the issue has been logged
- A link back to the course listing
- Not: a raw error stack trace

### Error Type Hierarchy

```typescript
// All platform errors extend this
class CyberLearnError extends Error {
  constructor(message: string, public readonly code: string) { ... }
}

// Content layer
class ContentValidationError extends CyberLearnError { ... }   // Zod failure
class ContentNotFoundError   extends CyberLearnError { ... }   // Missing JSON file

// Persistence layer
class StorageQuotaError      extends CyberLearnError { ... }   // localStorage full
class StorageUnavailableError extends CyberLearnError { ... }  // Private browsing

// Auth layer
class AuthExpiredError       extends CyberLearnError { ... }   // Token expired (Phase 3)
```

Custom error types are importable and catchable in tests. String matching on `error.message` is never used to identify error types.

---

## 12. Content Versioning Policy

Lesson JSON files have a `version` field. The following policy governs when version numbers change and what happens when they do.

### Versioning Rules

| Change Type | Version Part | Rule |
|-------------|-------------|------|
| Fix typos, reword text, update XP value | Patch `1.0.0 → 1.0.1` | No schema change. No migration needed. |
| Add a new optional field | Minor `1.0.x → 1.1.0` | Zod schema gets a new `z.optional()` field. Old files still validate. |
| Remove a field, rename a field, change a field type | Major `1.x.x → 2.0.0` | Breaking change. Requires a Zod migration or new schema version. Existing files must be updated. |
| Add a new required field | Major `1.x.x → 2.0.0` | All existing files will fail validation until updated. |

### The Schema is the Contract

The Zod schema (`src/lib/content/schemas.ts`) is the enforcer of this contract. When a new required field is added, `ContentLessonSchema.safeParse()` will fail for all existing files that don't have it. This is intentional — it forces the content team to update files before the code ships.

### No Silent Degradation

When content fails Zod validation, the correct behavior is to throw `ContentValidationError` with a detailed message identifying exactly which fields failed. Never silently return partial data. Never fall back to defaults for required fields.

---

## 13. Architecture Decision Records

Significant design decisions are recorded in `docs/decisions/` using this format.

### ADR Template

```markdown
# ADR-001: [Decision Title]

**Date:** YYYY-MM-DD
**Status:** Accepted | Deprecated | Superseded by ADR-XXX
**Deciders:** [names or roles]

## Context

[What problem were we solving? What constraints existed?]

## Decision

[What did we decide?]

## Rationale

[Why this option over the alternatives? What did we reject and why?]

## Consequences

**Positive:**
- [What this makes easier]

**Negative:**
- [What this makes harder or what trade-offs were accepted]

## Alternatives Considered

[What else was considered and why it was rejected]
```

### Existing Decisions to Document

The following decisions are already made and implemented. ADRs for them should be written to capture the reasoning before it is forgotten:

| ADR # | Decision |
|-------|----------|
| ADR-001 | Event Bus as module singleton, not class or Context |
| ADR-002 | Pure functions + Zustand store split for the XP Engine |
| ADR-003 | Adapter pattern for Save Manager (future backend compatibility) |
| ADR-004 | React Router v6 loaders for route guards (vs. component-level `<PrivateRoute>`) |
| ADR-005 | Vite `import.meta.glob` for content discovery (vs. a content manifest file) |
| ADR-006 | Discriminated union for `LessonSection` with `never` exhaustive check |
| ADR-007 | `src/config/` for display-layer metadata, `content/` for curriculum data |
| ADR-008 | Zustand over Redux for state management |

---

## 14. Anti-Patterns Registry

Patterns that have been explicitly considered and rejected. If you think one of these is a good idea, read this section before proceeding.

| # | Anti-Pattern | Why It's Rejected |
|---|-------------|-------------------|
| AP-01 | **Business logic in React components** | Cannot be reused, cannot be tested without mounting React, cannot be composed with future engines |
| AP-02 | **Direct engine-to-engine imports for cross-cutting concerns** | Creates tight coupling — use the Event Bus instead |
| AP-03 | **Analytics SDK imports inside feature components** | Analytics must be a passive observer via `EventBus.onAny()` — never a direct call |
| AP-04 | **Hardcoded XP values in TypeScript** | XP belongs in content JSON; changing it requires a content edit, not a code deploy |
| AP-05 | **Hardcoded dialogue in JSX** | Dialogue belongs in content JSON; content creators cannot edit TypeScript safely |
| AP-06 | **`any` types** | Bypasses TypeScript's entire value proposition; use `unknown` + narrowing |
| AP-07 | **Switching on discriminated unions without `never` exhaustive check** | Missing a new union member is a compile-time error with the check; a runtime bug without it |
| AP-08 | **Rewriting a system because it feels "messy"** | "Messy" requires evidence. Document the problems, enumerate consumers, prove extension is impossible, then propose a migration plan. Not a rewrite on gut feeling. |
| AP-09 | **Adding a new engine without an `index.ts` export boundary** | Internal modules leak into consumers; future refactors break every consumer |
| AP-10 | **Storing curriculum metadata in the same file as display config** | Content team edits curriculum. Design team edits display config. They must not be in the same file or they will conflict. |
| AP-11 | **Using `localStorage` key strings directly** | All keys go through `STORAGE_KEYS` in the Key Registry; prevents collisions and enables migration |
| AP-12 | **Registering `EventBus.onAny()` in production for non-analytics purposes** | `onAny()` fires for every event; using it as a general-purpose hook is a performance and coupling risk |
| AP-13 | **Animating layout properties (width, height, top, left)** | Forces layout + paint on every frame; causes jank on mobile. Use `transform` only. |
| AP-14 | **`vh` instead of `dvh` for full-height elements on mobile** | `100vh` includes browser chrome on mobile; `100dvh` (dynamic viewport height) is correct |
| AP-15 | **Importing a store from another store** | Stores communicate via the Event Bus or by reading `getState()` — never by importing and calling store actions across stores |
| AP-16 | **Cross-feature imports** (`import { thing } from '@/features/other-feature'`) | Features depend on each other's internals. When Feature B is refactored, Feature A breaks silently. Shared logic belongs in `src/lib/`, shared UI in `src/components/shared/`. |
| AP-17 | **Duplicating business logic across features** | The same calculation in two places becomes two maintenance targets. When a bug is found in one, the other persists. Extract to `src/lib/` — the engine layer exists to prevent this. |
| AP-18 | **Building a feature when an engine is the right abstraction** | A "feature" used by 3+ other features or future systems is an engine that has not found its home yet. Engines live in `src/lib/`. Features are route-level consumers. If you cannot answer "this renders at `/path` and has no other consumers," it is not a feature. |

---

## 15. How This Document Evolves

This document is a living standard. It evolves through the following process:

1. **Proposal:** Any engineer can propose an addition, change, or removal via a pull request to this file.
2. **Discussion:** The proposal is reviewed by the system owner and at least one other senior engineer.
3. **Decision:** Accepted changes are merged with a clear rationale. Rejected changes have a documented reason in the PR.
4. **No emergency bypasses:** Platform rules are never bypassed "just for this PR." If a rule needs to change, change the rule. Do not violate it.

**What this document does NOT govern:**
- Product roadmap decisions (governed by the Constitution)
- Design decisions (governed by the Design System)
- Curriculum decisions (governed by the Knowledge Graph)

**What to do when this document conflicts with the Constitution:** The Constitution's educational and product principles take precedence over engineering convenience. Engineering decisions that conflict with Constitution principles require explicit sign-off.

---

*CyberLearn Engineering Principles · Version 1.1 · 2026-07-29*  
*Changes in v1.1: Principles 13–14 added (Reuse Before Creating, Composition Over Monoliths); Feature Rules added to Section 3; Section 7 expanded with benefit narratives; Anti-Patterns AP-16–18 added.*  
*This document is binding on all engineering work in the CyberLearn platform repository.*
