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

Three layout contexts in `src/router/index.tsx`:
- **`AppLayout`** — sidebar nav shell for all authenticated pages (Dashboard, Courses, Labs, Challenges, Leaderboard, Profile, Settings)
- **`AuthLayout`** — minimal centered shell for Login / Register
- **`LessonPage`** — full-screen, outside both shells, at `/courses/:courseSlug/lessons/:lessonSlug`

### Content Engine (`src/lib/content/`)

Lessons are static JSON files on the filesystem. The content engine uses **Vite `import.meta.glob`** to discover all JSON files at build time and load them lazily at runtime.

Directory layout the glob patterns expect:
```
content/courses/
  <course-slug>/
    course.json
    <module-slug>/
      module.json
      <lesson-slug>/
        lesson.json
```

**Adding a new lesson**: create the folder + `lesson.json`. Vite's glob picks it up automatically — no config changes needed.

The loading pipeline: `loadLesson()` in `loader.ts` → `getLesson()` in `registry.ts` → Zod schema validation (`ContentLessonSchema`) → cached and returned as `FullLesson`.

`LessonPage` has two resolution paths:
1. **LEGACY_REGISTRY** (in-file map, synchronous) — keeps the `web-security-fundamentals/sql-injection-intro` demo route working without a JSON file
2. **Content Engine** (async, Zod-validated) — for all real content

### Lesson Engine (discriminated union)

`src/types/lesson-engine.ts` defines `LessonSection` as a discriminated union of 15 section types (`hook`, `story`, `objectives`, `explanation`, `diagram`, `animation`, `real-world-example`, `practical`, `ai-mentor`, `challenge`, `common-mistakes`, `quiz`, `reflection`, `summary`, `career-connection`).

**Adding a new section type requires exactly 3 changes:**
1. Add to the `SectionType` union and update `SECTION_LABELS` / `SECTION_ICONS` in `lesson-engine.ts`
2. Add the Zod schema in `src/lib/content/schemas.ts` and include it in `LessonSectionSchema`
3. Add a renderer component in `src/features/lesson/components/sections/` and a `case` in `SectionRenderer` — TypeScript's `never` exhaustive check will error if you forget this step

### State Management

Two Zustand stores with `persist` middleware (localStorage):
- **`useAuthStore`** (`src/store/auth-store.ts`) — user, token, isAuthenticated; only `token` and `isAuthenticated` are persisted
- **`useLessonStore`** (`src/features/lesson/store/lesson-store.ts`) — all in-progress and completed lesson progress keyed by `lessonId`; full `progress` map is persisted

`useUiStore` (`src/store/ui-store.ts`) handles ephemeral UI state (sidebar collapsed, etc.) and is not persisted.

### Design System

Dark cyber aesthetic. Colors are defined in two places:
- **Tailwind config** (`tailwind.config.ts`): custom `cyber.*` palette (blue `#00D9FF`, green `#00FF87`, purple `#7B5EA7`, red `#FF4757`, orange `#FF6B35`), `base.*` dark background scale (950–500), cyber glow `boxShadow` utilities, and custom animations
- **CSS variables** (`src/styles/globals.css`): shadcn/ui semantic tokens (`--background`, `--foreground`, `--primary`, etc.) bound to the dark theme

Use `bg-base-900`, `bg-base-800` for surfaces. Use `shadow-cyber-sm/md/lg` for glow effects. Brand gradients: `bg-gradient-cyber`, `bg-gradient-green`.

### Interactive Component Library (`src/features/interactive/`)

14 reusable components used by lesson sections: `TerminalSimulator`, `InteractiveDiagram`, `PacketFlowVisualizer`, `AttackTimeline`, `ProcessFlow`, `CodeDiffViewer`, `ExpandableDiagram`, plus quiz widgets (`DragDrop`, `Ordering`, `Matching`, `Hotspot`, `ScenarioCard`). Export all via `src/features/interactive/index.ts`.

### Governance Documents

- **`CONSTITUTION.md`** — product/educational/design/AI principles; all feature decisions must be traceable to it
- **`docs/curriculum/KNOWLEDGE_GRAPH.md`** — curriculum dependency engine; governs lesson sequencing and prerequisite logic
- **`docs/curriculum/CURRICULUM_ARCHITECTURE.md`** — Academy 1 lesson metadata (380 planned lessons across 5 academies)
- **`docs/curriculum/academy-02-networking.md`** — Academy 2 full lesson metadata (60 lessons, D3 Networking domain)
