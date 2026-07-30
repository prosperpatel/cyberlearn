<div align="center">

<img src="https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 18.3" />
<img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript 5.7" />
<img src="https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite 6.0" />
<img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 3.4" />
<img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="MIT License" />

<br /><br />

<h1>⚡ CyberLearn</h1>

<p><strong>A story-driven cybersecurity learning platform that teaches through interactive lessons, live simulations, missions, and gamified progression.</strong></p>

<p>
  CyberLearn is built on a single belief: the best way to learn security is to live it — not memorise it.
  Every lesson is a narrative. Every lab is a real scenario. Every mission puts you in the analyst's seat.
</p>

</div>

---

## Features

| Category | What's included |
|---|---|
| **Story-first learning** | Lessons open with narrative hooks and unfold as interactive stories |
| **Mission engine** | Full-screen, scene-based cyber simulations with branching logic |
| **Interactive components** | Terminal emulator, packet flow visualiser, attack timeline, code diff viewer, process flow, expandable diagrams |
| **Quiz system** | Drag-and-drop, ordering, matching, hotspot, and scenario-card widgets |
| **XP & rank system** | Experience points, rank progression, streak tracking, achievement badges |
| **Mission Control** | Catalogued mission hub with difficulty ratings and act-based narrative structure |
| **Academy Paths** | Structured learning tracks across 11 skill categories |
| **Gamification** | Daily streaks, XP bars, leaderboard, completion rates |
| **AI Mentor** | Dedicated lesson section type for contextual guidance |
| **Accessibility** | Reduced-motion support, keyboard navigation, ARIA labels throughout |
| **Responsive design** | Collapsible desktop sidebar, mobile drawer, bottom tab navigation |
| **Dark cyber aesthetic** | Custom design system with neon palette, glow shadows, and grid textures |

---

## Screenshots

| Dashboard | Academy Paths |
|---|---|
| ![Dashboard](docs/screenshots/dashboard.png) | ![Academy](docs/screenshots/academy.png) |

| Courses | Mission Control |
|---|---|
| ![Courses](docs/screenshots/courses.png) | ![Mission Control](docs/screenshots/mission-control.png) |

| Mission 01 — Operations Center | Mission 01 — Hospital Incident |
|---|---|
| ![Operations Center](docs/screenshots/mission-01-world.png) | ![Hospital Incident](docs/screenshots/mission-01-hospital.png) |

> Screenshots coming soon. Run `npm run dev` to see the app locally.

---

## Tech Stack

### Frontend

| Technology | Version | Role |
|---|---|---|
| [React](https://react.dev) | 18.3 | UI rendering |
| [TypeScript](https://www.typescriptlang.org) | 5.7 | Type safety |
| [Vite](https://vitejs.dev) | 6.0 | Dev server and bundler |
| [Tailwind CSS](https://tailwindcss.com) | 3.4 | Styling and design tokens |
| [React Router DOM](https://reactrouter.com) | 6.28 | Client-side routing |

### State & Logic

| Technology | Version | Role |
|---|---|---|
| [Zustand](https://zustand-demo.pmnd.rs) | 5.0 | Global state with persistence |
| [Zod](https://zod.dev) | 3.25 | Schema validation for content |

### UI & Animation

| Technology | Version | Role |
|---|---|---|
| [Framer Motion](https://www.framer.com/motion/) | 11.15 | Animations and scene transitions |
| [Radix UI](https://www.radix-ui.com) | various | Accessible primitive components |
| [Lucide React](https://lucide.dev) | 0.469 | Icon system |
| [class-variance-authority](https://cva.style) | 0.7 | Component variant API |

### Audio

| Technology | Version | Role |
|---|---|---|
| [Howler.js](https://howlerjs.com) | 2.2 | Ambient audio and SFX engine |

### Tooling

| Tool | Role |
|---|---|
| ESLint + typescript-eslint | Linting (zero-warnings policy) |
| PostCSS + Autoprefixer | CSS processing |
| `@tailwindcss/typography` | Rich text rendering |

---

## Project Structure

```
cyber-learn/
├── content/                         # Static lesson content (JSON)
│   └── courses/
│       ├── digital-security-landscape/
│       │   ├── module-01-why-cybersecurity-matters/
│       │   └── module-02-connected-world/
│       ├── linux-for-hackers/
│       ├── networking-fundamentals/
│       └── web-security-fundamentals/
│
├── src/
│   ├── App.tsx                      # Root — EngineProviders + RouterProvider
│   ├── main.tsx                     # Entry point
│   │
│   ├── components/
│   │   ├── layout/                  # AppLayout, AuthLayout, Sidebar, TopNav, MobileNav
│   │   ├── shared/                  # XPBar, StatCard, CourseCard, AchievementBadge, loaders
│   │   └── ui/                      # Button, Card, Badge, Input, Avatar, Tooltip, etc.
│   │
│   ├── engine/                      # Game engine subsystems
│   │   ├── accessibility/           # Reduced-motion provider
│   │   ├── assets/                  # Asset manager (images, fonts)
│   │   ├── audio/                   # Howler-based audio manager
│   │   ├── debug/                   # DEV-only debug overlay
│   │   ├── dialogue/                # Typewriter dialogue engine
│   │   ├── event-bus/               # Typed publish/subscribe event bus
│   │   ├── providers/               # EngineProviders composition root
│   │   ├── save/                    # Progress store and save service
│   │   └── scene/                   # Scene manager and transition system
│   │
│   ├── features/                    # Feature modules (co-located pages, components, logic)
│   │   ├── academy/                 # Academy Paths page
│   │   ├── auth/                    # Login and Register pages
│   │   ├── challenges/              # Challenges page
│   │   ├── courses/                 # Course list and Course Detail pages
│   │   ├── dashboard/               # Dashboard page
│   │   ├── interactive/             # Reusable interactive components
│   │   │   └── components/
│   │   │       ├── attack-timeline/
│   │   │       ├── code-diff/
│   │   │       ├── expandable-diagram/
│   │   │       ├── interactive-diagram/
│   │   │       ├── packet-flow/
│   │   │       ├── process-flow/
│   │   │       ├── quiz-widgets/    # DragDrop, Ordering, Matching, Hotspot, ScenarioCard
│   │   │       ├── reflection-card/
│   │   │       └── terminal/        # TerminalSimulator
│   │   ├── labs/                    # Labs page
│   │   ├── leaderboard/             # Leaderboard page
│   │   ├── lesson/                  # Full-screen lesson player + 15 section renderers
│   │   ├── mission/                 # Mission shell (SceneManager host)
│   │   ├── mission-01-first-contact/ # Mission 01: Boot → World → Hospital → Investigation
│   │   ├── missions/                # Mission Control catalogue page
│   │   ├── profile/                 # Profile page
│   │   └── settings/                # Settings page
│   │
│   ├── hooks/                       # Shared React hooks
│   ├── lib/
│   │   ├── content/                 # Vite glob registry, Zod schemas, content loader
│   │   └── constants.ts             # Routes, nav items, app config
│   ├── router/                      # createBrowserRouter config
│   ├── store/                       # Zustand stores (auth, ui)
│   ├── styles/
│   │   └── globals.css              # Design tokens (CSS vars), Tailwind layers
│   └── types/                       # Shared TypeScript types and lesson-engine union
│
├── CLAUDE.md                        # Architecture guide for Claude Code
├── CONSTITUTION.md                  # Product and design governance
├── docs/curriculum/                 # Curriculum architecture and knowledge graph
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/prosperpatel/cyber-learn.git
cd cyber-learn

# Install dependencies
npm install

# Start the development server
npm run dev
```

The dev server starts at **http://localhost:5173** and opens in your browser automatically.

### Build for Production

```bash
npm run build      # Type-check + Vite production build → dist/
npm run preview    # Serve the production build locally
```

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the Vite dev server with HMR on port 5173 |
| `npm run build` | Run `tsc -b` (full type check) then Vite production build |
| `npm run preview` | Serve the `dist/` build to validate the production output |
| `npm run lint` | ESLint across all `.ts` / `.tsx` files — enforces zero warnings |
| `npm run type-check` | Type-check only (`tsc --noEmit`) — no build output |

---

## Application Architecture

### Rendering tree

```
StrictMode
└── App
    └── EngineProviders          ← Accessibility, Audio, Assets, Dialogue, DebugOverlay
        └── RouterProvider
            ├── AppLayout        ← Sidebar, TopNav, MobileNav (authenticated shell)
            │   ├── Dashboard
            │   ├── Academy Paths
            │   ├── Courses / Course Detail
            │   ├── Missions (Mission Control)
            │   ├── Labs
            │   ├── Challenges
            │   ├── Leaderboard
            │   ├── Profile
            │   └── Settings
            ├── AuthLayout       ← Login, Register (minimal centred shell)
            └── LessonPage       ← Full-screen, outside both shells
            └── MissionPage      ← Full-screen, outside both shells
```

### Feature-based module system

Each feature lives under `src/features/<name>/` and owns its pages, components, hooks, and local state. Cross-feature concerns (design system, shared components, global stores, routing) are kept outside features in `src/components/`, `src/store/`, and `src/lib/`.

### Content engine

Lessons are static JSON files discovered at build time via **Vite `import.meta.glob`**. No content registry needs manual updating — dropping a `lesson.json` into the right folder is sufficient.

```
content/courses/<course-slug>/<module-slug>/<lesson-slug>/lesson.json
```

The loading pipeline: `loadLesson()` → `getLesson()` (glob registry) → Zod schema validation → cached `FullLesson`.

### Mission engine

Full-screen missions run outside the app shell. Each mission is a **scene graph** — a typed array of `{ id, component, nextSceneId }` entries. The `SceneManager` handles transitions, `AudioManager` (Howler) handles ambient tracks and SFX, `DialogueEngine` handles typewriter-style NPC dialogue, and `AssetManager` handles preloading. All engine subsystems communicate through a typed **event bus**.

### Lesson section types

`LessonSection` is a discriminated union of 15 types: `hook`, `story`, `objectives`, `explanation`, `diagram`, `animation`, `real-world-example`, `practical`, `ai-mentor`, `challenge`, `common-mistakes`, `quiz`, `reflection`, `summary`, `career-connection`. TypeScript's `never` exhaustive check in `SectionRenderer` ensures every type is handled.

---

## Current Modules

### Platform features

| Module | Route | Status |
|---|---|---|
| Dashboard | `/dashboard` | ✅ Live |
| Academy Paths | `/academy-paths` | ✅ Live |
| Courses | `/courses` | ✅ Live |
| Course Detail | `/courses/:slug` | ✅ Live |
| Lesson Player | `/courses/:courseSlug/lessons/:lessonSlug` | ✅ Live |
| Mission Control | `/missions` | ✅ Live |
| Labs | `/labs` | 🚧 Shell |
| Challenges | `/challenges` | 🚧 Shell |
| Leaderboard | `/leaderboard` | 🚧 Shell |
| Profile | `/profile` | 🚧 Shell |
| Settings | `/settings` | 🚧 Shell |

### Missions

| Mission | Scenes | Status |
|---|---|---|
| **01 — First Contact** | Boot · Operations Center · Hospital Incident · Investigation | ✅ Playable |

### Content library

| Course | Modules | Lessons |
|---|---|---|
| Digital Security Landscape | 2 | 11 |
| Linux for Hackers | 1 | 1 |
| Networking Fundamentals | 1 | — (module stub) |
| Web Security Fundamentals | 1 | 2 (SQL Injection, XSS) |

---

## Roadmap

### Engine & infrastructure

- [x] Core engine (scene manager, event bus, audio, assets, dialogue, save system)
- [x] Lesson player with 15 section types and 14 interactive components
- [x] Lesson content engine (Vite glob + Zod validation)
- [x] Mission shell with scene graph and transitions
- [x] Boot scene — ARIA AI partner introduction
- [x] Operations Center — mission briefing world scene
- [x] Hospital Incident — first cyber incident response scene
- [x] Mission Control catalogue

### Upcoming missions

- [ ] Investigation Scene (Mission 01 continuation)
- [ ] Mission 02 — Interactive Malware Analysis
- [ ] Mission 03 — SOC Simulator
- [ ] Mission 04 — Network Defense
- [ ] CTF Missions
- [ ] Red Team Campaign
- [ ] Blue Team Campaign

### Platform features

- [ ] AI Mentor (real-time guidance inside lessons)
- [ ] Cloud Security module
- [ ] Certification Paths
- [ ] Multiplayer Challenges
- [ ] Mobile App (React Native)
- [ ] Full backend / auth system
- [ ] Progress persistence (server-side)

---

## Design Philosophy

CyberLearn is structured around five learning modes that cycle through every module:

```
Learn     →   Concepts introduced through narrative and real-world examples
Practice  →   Interactive exercises and quiz widgets reinforce understanding
Simulate  →   Terminal emulators, packet flows, and attack timelines build intuition
Play      →   Full-screen missions put the learner in the analyst's seat
Master    →   Challenges, labs, and CTFs prove applied skill
```

The design aesthetic mirrors the subject matter: a **dark cyber palette** with neon accent colours (`#00D9FF`, `#00FF87`, `#7B5EA7`), monospace typography (JetBrains Mono), and subtle glow effects. Everything is intentional — the UI reinforces the professional security analyst identity learners are building.

---

## Performance

| Technique | Implementation |
|---|---|
| **Code splitting** | Vite manual chunks — `vendor`, `motion`, `ui` bundles ship separately |
| **Lazy loading** | Lesson content loaded on-demand via `import.meta.glob` |
| **Tree shaking** | ES module format throughout; unused code eliminated at build |
| **Type safety** | TypeScript strict mode catches errors before runtime |
| **Minimal re-renders** | Zustand stores partialise persistence; components subscribe to slices |
| **Responsive images** | Placeholder PNG / data URI strategy for the mission engine |
| **Reduced motion** | `AccessibilityProvider` reads `prefers-reduced-motion` and propagates to all animations |

---

## Contributing

Contributions are welcome. Please follow these guidelines:

**Before starting**

1. Check open issues and discussions before proposing a change.
2. For significant features, open an issue first to align on scope.

**Development workflow**

```bash
git checkout -b feat/your-feature-name
# make changes
npm run type-check   # must pass
npm run lint         # zero warnings
npm run build        # must succeed
git commit -m "feat: describe the change"
```

**Conventions**

- Feature code lives in `src/features/<name>/`. Do not scatter feature logic into shared directories.
- New lesson section types require exactly three changes: union type, Zod schema, renderer component. The `never` check in `SectionRenderer` will error if you miss the third.
- New content goes in `content/courses/` as JSON. The glob registry picks it up automatically.
- Do not modify `CONSTITUTION.md` or `docs/curriculum/KNOWLEDGE_GRAPH.md` without prior discussion.
- Commits are scoped: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`.

**Pull requests**

- Keep PRs focused on a single concern.
- Include a clear description of what changed and why.
- All CI checks must pass before review.

---

## License

This project is licensed under the **MIT License** — see [`LICENSE`](LICENSE) for details.

---

## Credits

Designed and built by **[Prosper Patel](https://github.com/prosperpatel)**.

---

## Vision

> *"The best security professionals don't just know the theory — they've lived the scenarios."*

CyberLearn is built to be the **Duolingo × TryHackMe × Hack The Box × narrative game** of cybersecurity education — combining the habit-forming progression loops of language apps, the hands-on environment of hacking platforms, and the emotional engagement of story games.

The goal: anyone who completes a CyberLearn path should be able to walk into a security role and immediately recognise the situations, tools, and mindset they trained with.

---

<div align="center">
  <sub>Built with React, TypeScript, Vite, and a lot of ☕</sub>
</div>
