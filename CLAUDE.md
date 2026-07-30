# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server on http://localhost:5173 (opens browser)
npm run build        # tsc type-check + Vite production build → dist/
npm run preview      # Serve the dist/ build locally
npm run lint         # ESLint — zero warnings policy (--max-warnings 0)
npm run type-check   # tsc --noEmit only, no build output
```

There is no test runner configured yet.

## Architecture Overview

### Tech Stack
React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui (Radix primitives) + Zustand + Framer Motion + Zod. Path alias `@` maps to `src/`.

### Route Structure

Four layout contexts in `src/router/index.tsx`:
- **`AppLayout`** — sidebar nav shell for all authenticated pages (Dashboard, Courses, Labs, Challenges, Leaderboard, Profile, Settings, Missions hub)
- **`AuthLayout`** — minimal centered shell for Login / Register
- **`LessonPage`** — full-screen, outside both shells, at `/courses/:courseSlug/lessons/:lessonSlug`
- **`MissionPage`** — full-screen mission engine, at `/missions/:missionId`

---

## Mission Engine (`src/engine/` + `src/features/mission/`)

The mission engine is the interactive narrative layer — full-screen cinematic experiences separate from the lesson system.

### Engine Provider Tree

`EngineProviders` in `src/engine/providers/engine-providers.tsx` composes all subsystems in dependency order — this nesting is load-bearing:

```
AccessibilityProvider   ← outermost; others read reducedMotion
  AudioProvider         ← inits volumes from saved settings
    AssetProvider       ← preloading singleton
      DialogueProvider  ← needs useAudio for voice file playback
        {children}
        DebugOverlay
```

`EngineProviders` wraps the entire app in `src/App.tsx`. `SceneManagerProvider` is **not** included here — it is per-mission and provided by `MissionShell`.

### MissionConfig

Every mission is a single `MissionConfig` object (`src/features/mission/types.ts`):

```ts
{
  metadata:     MissionMetadata   // id, title, durationMin, maxXp, prerequisites, …
  initialScene: SceneId           // must match a key in `scenes`
  scenes:       SceneDefinition[] // [{id, component, nextSceneId, label}]
  tracks:       AudioTrackDef[]   // registered on mount, before first scene renders
  assets:       AssetDefinition[] // preloaded; LoadingScreen shown until complete
}
```

Scene components receive `{ onComplete, onNavigate }` as props. Calling `onComplete()` advances to the `nextSceneId` declared in the config. Call `onNavigate(sceneId)` for non-linear jumps.

### MissionShell Lifecycle

`src/features/mission/mission-shell.tsx` runs on every mission:
1. Register audio tracks + assets
2. Preload assets (shows `<LoadingScreen>` with ratio progress)
3. Call `progress.initMission(id)` + emit `mission:start`
4. Render `SceneManagerProvider` with the config's scene registry
5. On unmount: emit `mission:abandon` if not completed

To signal mission complete from a scene: `engineBus.emit('mission:complete', { missionId, xpEarned })`.

### Adding a New Mission

1. Create `src/features/mission-XX-<slug>/config.ts` exporting a `MissionConfig`
2. Register it in `src/features/mission/mission-registry.ts`:
   ```ts
   import { missionXXConfig } from '../mission-XX-<slug>/config'
   export const MISSION_REGISTRY = new Map([
     ['mission-01', mission01Config],
     ['mission-XX', missionXXConfig],  // add here
   ])
   ```
3. Add a card to `src/features/missions/pages/missions.tsx` `CATALOG` array

No router changes needed — `/missions/:missionId` is already a catch-all that looks up `MISSION_REGISTRY`.

For a reference implementation, see `src/features/mission-engine-test/` — a minimal mission that exercises every engine subsystem (audio, assets, dialogue, transitions).

---

## Dialogue System (`src/engine/dialogue/`)

Dialogue is a JSON-driven script played through `useDialogue()`.

### Script format (JSON)

```jsonc
{
  "id": "script-id",
  "speakers": {
    "aria": { "id": "aria", "displayName": "ARIA", "colorClass": "text-cyan-400" }
  },
  "lines": [
    { "id": "line-01", "speakerId": "aria", "text": "Hello.", "emotion": "neutral" },
    { "id": "line-02", "speakerId": "aria", "text": "Last line.", "autoAdvanceMs": 3000 }
  ]
}
```

`autoAdvanceMs` — advance automatically after N ms (no user tap needed). Omit or `null` for manual-only advance. `skippable: false` blocks the user from skipping that line.

### useDialogue hook

```ts
const { state, currentLine, play, advance, onTypewriterComplete, skipTypewriter } = useDialogue()
play(script)          // start a script
advance()             // skip typewriter or move to next line
onTypewriterComplete  // pass to <Typewriter onComplete={...}>
```

`state.displayState` is `'idle' | 'typing' | 'waiting' | 'auto-advancing' | 'complete'`.

**Critical React constraint**: never call `setDialogueState` (or any function that calls it) inside a `useEffect` that sets up the auto-advance timer — the state change triggers cleanup which cancels the timer in the same microtask. Similarly, never call `advanceInternal()` inside a `setDialogueState` updater; capture a flag in the updater and call the function after `setDialogueState` returns.

---

## Engine Event Bus (`src/engine/event-bus/`)

Typed pub/sub system shared across all engine subsystems.

```ts
import { engineBus } from '@/engine/event-bus'

engineBus.emit('mission:complete', { missionId: 'mission-01', xpEarned: 100 })

const off = engineBus.on('scene:enter', ({ sceneId }) => { /* ... */ })
off() // unsubscribe
```

All event names and payload shapes are defined in `src/engine/event-bus/events.ts` (`EngineEventMap`). Adding a new event requires only adding it there — TypeScript enforces the payload everywhere automatically.

---

## Audio Subsystem (`src/engine/audio/`)

`AudioManager` (`audio-manager.ts`) is a singleton wrapping Howler.js. Volume is `master × channel × track`.

```ts
const audio = useAudio()
audio.play('track-id')
audio.fadeIn('track-id', 1500)
audio.fadeOut('track-id', 1000)
audio.stop('track-id')
```

**Mobile audio unlock**: Web Audio context starts `'suspended'` on iOS/Android. Call `audio.unlock()` synchronously inside the user-gesture handler that launches a mission — before any `navigate()` call. If you wait until the scene mounts the gesture token has expired and audio will be silent.

```ts
onStart={() => {
  audio.unlock()          // must be called inside the gesture handler
  navigate(ROUTES.MISSION(m.id))
}}
```

---

## Save / Progress System (`src/engine/save/`)

`useProgressStore` (`progress-store.ts`) is a Zustand store backed by a custom `SaveService` that reads/writes `localStorage` directly (not Zustand's `persist` middleware). It handles mission lifecycle, scene visits, checkpoints, achievements, and audio/accessibility settings.

```ts
const progress = useProgressStore()
progress.initMission('mission-01')           // touch-or-create save record
progress.visitScene('mission-01', 'boot')    // record scene visit
progress.setCheckpoint('mission-01', 'clue-found', true)
progress.getCheckpoint('mission-01', 'clue-found')  // → true
progress.completeMission('mission-01', 150)  // record XP
```

This store is distinct from `useLessonStore` (lesson progress) and `useAuthStore` (auth).

---

## Content Engine (`src/lib/content/`)

Lessons are static JSON files discovered at build time via Vite `import.meta.glob`.

Directory layout:
```
content/courses/
  <course-slug>/
    course.json
    <module-slug>/
      module.json
      <lesson-slug>/
        lesson.json
```

**Adding a new lesson**: create the folder + `lesson.json`. No config changes needed.

Loading pipeline: `loadLesson()` → `getLesson()` → Zod `ContentLessonSchema` → cached `FullLesson`.

`LessonPage` has two resolution paths:
1. **LEGACY_REGISTRY** (in-file map, synchronous) — keeps the `web-security-fundamentals/sql-injection-intro` demo route working
2. **Content Engine** (async, Zod-validated) — for all real content

---

## Lesson Engine (`src/types/lesson-engine.ts`)

`LessonSection` is a discriminated union of 15 section types: `hook`, `story`, `objectives`, `explanation`, `diagram`, `animation`, `real-world-example`, `practical`, `ai-mentor`, `challenge`, `common-mistakes`, `quiz`, `reflection`, `summary`, `career-connection`.

**Adding a new section type requires exactly 3 changes:**
1. Add to the `SectionType` union and update `SECTION_LABELS` / `SECTION_ICONS` in `lesson-engine.ts`
2. Add the Zod schema in `src/lib/content/schemas.ts` and include it in `LessonSectionSchema`
3. Add a renderer in `src/features/lesson/components/sections/` and a `case` in `SectionRenderer` — TypeScript's `never` exhaustive check will error if you miss this

---

## State Management

- **`useAuthStore`** (`src/store/auth-store.ts`) — user, token, isAuthenticated; only `token` and `isAuthenticated` are persisted
- **`useLessonStore`** (`src/features/lesson/store/lesson-store.ts`) — lesson progress keyed by `lessonId`; full `progress` map is persisted
- **`useUIStore`** (`src/store/ui-store.ts`) — ephemeral UI state (sidebar open/collapsed); only `sidebarCollapsed` is persisted; `sidebarOpen` starts `false`
- **`useProgressStore`** (`src/engine/save/progress-store.ts`) — mission save data; custom localStorage via `SaveService`, not Zustand persist

---

## Design System

Dark cyber aesthetic. Colors live in two places:
- **Tailwind config** (`tailwind.config.ts`): `cyber.*` palette (blue `#00D9FF`, green `#00FF87`, purple `#7B5EA7`, red `#FF4757`, orange `#FF6B35`), `base.*` dark scale (950–500), glow `boxShadow` utilities
- **CSS variables** (`src/styles/globals.css`): shadcn/ui semantic tokens bound to the dark theme

Use `bg-base-900`/`bg-base-800` for surfaces, `shadow-cyber-sm/md/lg` for glow. Gradients: `bg-gradient-cyber`, `bg-gradient-green`.

---

## Interactive Component Library (`src/features/interactive/`)

14 reusable components: `TerminalSimulator`, `InteractiveDiagram`, `PacketFlowVisualizer`, `AttackTimeline`, `ProcessFlow`, `CodeDiffViewer`, `ExpandableDiagram`, plus quiz widgets (`DragDrop`, `Ordering`, `Matching`, `Hotspot`, `ScenarioCard`). All exported via `src/features/interactive/index.ts`.

---

## Mobile / Touch

- Use `onPointerDown` (not `onClick`) on interactive `<div>` elements. `onClick` synthesis from touch is blocked on Android when `cursor: default` is set.
- Add `touchAction: 'manipulation'` to tap targets to eliminate the 300 ms tap delay.
- `audio.unlock()` must be called inside a synchronous user-gesture handler — not inside `useEffect` or after `await`.

---

## Governance Documents

- **`CONSTITUTION.md`** — product/educational/design/AI principles; all feature decisions must be traceable to it
- **`docs/curriculum/KNOWLEDGE_GRAPH.md`** — curriculum dependency engine; governs lesson sequencing and prerequisite logic
- **`docs/curriculum/CURRICULUM_ARCHITECTURE.md`** — Academy 1 lesson metadata (380 planned lessons across 5 academies)
- **`docs/curriculum/academy-02-networking.md`** — Academy 2 full lesson metadata (60 lessons, D3 Networking domain)

## Development Rules

- Never modify `CONSTITUTION.md` or `docs/curriculum/KNOWLEDGE_GRAPH.md` unless explicitly instructed.
- Never regenerate a completed academy document. If generation was interrupted, resume from the exact stopping point — do not restart.
- Validate Constitution and Knowledge Graph compliance before marking any curriculum work complete.
- Keep commits focused on a single feature or academy.
- Maintain backward compatibility unless a breaking change is explicitly approved.
