# CyberLearn — Architecture Audit

**Audited:** 2026-07-29
**Auditor:** Principal Architecture Review (Claude Sonnet 4.6)
**Branch:** `main` @ `6eb96a48`
**Scope:** 90 source files, 23 content JSON files, full dependency graph

---

## 1. Executive Summary

CyberLearn is a competently built React SPA with production-quality TypeScript discipline, an elegant content engine, and a strong design system. For its current form — a browser-based cybersecurity learning platform — the architecture is solid MVP work.

The stated new vision is a **premium mobile-first interactive cybersecurity experience closer to a AAA game** than an online course, with a new vocabulary: Agency → Campaign → Operation → Scene → Interaction. This changes the evaluation criteria significantly.

Against that vision, CyberLearn has excellent **bones** — TypeScript strictness, Zod-validated content, discriminated-union lesson engine, Framer Motion animation system, Zustand stores — and critical **gaps** — no backend, no audio system, no XP award mechanism, no event bus, no scene/dialogue engine, no offline support, no character management, and a layout paradigm (desktop sidebar) that is fundamentally wrong for mobile-first.

**The verdict:** Refactor and extend aggressively, do not rewrite. The TypeScript architecture is the asset. The mock data and missing systems are the debt.

---

## 2. Overall Architecture Score

```
★★★☆☆  3 / 5
```

**Rationale:** The framework choices, TypeScript discipline, and content engine are genuinely excellent. But for the new vision, the entire persistence layer (localStorage only), the absence of any backend, the missing audio/scene/event systems, and the desktop-first layout paradigm collectively hold the score to 3. The architecture can reach 5 without a rewrite — but it requires substantial extension.

---

## 3. Mobile Readiness Score

```
★★☆☆☆  2 / 5
```

**Current state:** `AppLayout` has two branches — a desktop sidebar branch (`hidden md:block`) and a mobile layout with `MobileNav`. The lesson player is full-screen and direction-aware. Touch is not broken.

**Problems against mobile-first vision:**
- Design language is sidebar-centric. Navigation hierarchy, spacing, grid layouts, and information density are all calibrated for 1280px+ screens.
- `MobileNav` is an afterthought (5 icons, bottom bar) — not a mission-control experience.
- Dashboard uses `lg:grid-cols-3`, `sm:grid-cols-2` — degrades gracefully but was designed for desktop first.
- No touch gesture handling (swipe to advance Operation, pull-to-refresh, haptic integration).
- No safe-area-inset handling for notched devices (iOS 12+, Android modern notches).
- No viewport-height management for mobile browser chrome (address bar show/hide causes layout jump with `min-h-screen`).
- Font sizes, tap targets, and spacing have not been audited against WCAG 2.5.5 (44×44px minimum touch targets).
- Framer Motion animations are not tuned for 60fps on mid-range Android hardware.

---

## 4. Scalability Score

```
★★☆☆☆  2 / 5
```

**Current state:** Pure client-side. All persistence is `localStorage` via Zustand `persist`. Content is static JSON discovered by Vite `import.meta.glob` at build time. No backend. No API layer. No database.

**Problems:**
- `localStorage` has a 5–10 MB browser quota. A growing curriculum (380+ planned lessons × progress state) will hit it.
- No server-side progress sync means zero cross-device continuity — a user who switches from phone to laptop loses their session.
- XP, achievements, streak, leaderboard — all mock. None have real persistence or computation.
- Content is build-time discovered. Adding a new Operation requires a full redeploy.
- No CDN strategy for large media assets (animation data, audio, cutscene video).
- No caching strategy beyond in-memory maps in `registry.ts`.
- A real leaderboard at scale requires server-side ranking — client-side has no path to this.

---

## 5. Maintainability Score

```
★★★★☆  4 / 5
```

**This is the project's greatest strength.** The TypeScript discipline is genuinely excellent:
- Zod schemas as the runtime source of truth — every content file is validated on load.
- Discriminated union (`LessonSection`) with `never` exhaustive check in `SectionRenderer` — adding a section type is mechanically enforced by the compiler.
- Three-change rule for new section types (union + schema + renderer) is documented in `CLAUDE.md`.
- Zustand with TypeScript generic stores — state shape is typed end-to-end.
- Path alias `@` — no relative path hell.
- shadcn/ui (Radix primitives) — accessible components without custom implementation.

**Gaps:**
- Zero test coverage. No unit tests, no integration tests, no E2E tests. This is the primary maintainability risk.
- `src/data/academyData.ts` and `src/data/courseData.ts` are hardcoded data files that duplicate the content engine. Dual data sources create drift.
- Dashboard, Sidebar, and several feature components contain inline mock data — future devs will not know which data is real.
- No Storybook or component catalogue — interactive library of 14 components has no isolated demo environment.

---

## 6. Technical Debt Score

```
★★★☆☆  3 / 5  (moderate — manageable with discipline)
```

**Debt inventory:**

| Item | Severity | Notes |
|------|----------|-------|
| All progress/XP/achievements are mock data | HIGH | Blocks every game-feel feature |
| No authentication middleware or route guards | HIGH | Any URL is accessible without login |
| `src/data/academyData.ts` + `src/data/courseData.ts` dual source | MEDIUM | Drift risk, confuses new developers |
| ~8 routes are `<ComingSoon />` stubs | MEDIUM | Labs, Challenges, Leaderboard, Profile, Settings |
| No test suite | MEDIUM | Every refactor is high-risk |
| Dashboard inline mock constants | LOW | Cosmetic but misleading |
| `LEGACY_REGISTRY` in `LessonPage` | LOW | One-off shim for SQL injection demo, should become a real JSON file |
| `setUser` and `setToken` are non-atomic in auth store | LOW | Race condition possible if both are needed simultaneously |

---

## 7. What Works Well

### Content Engine ✅ KEEP
The Vite `import.meta.glob` content discovery pattern is elegant and correct. Adding an Operation requires only creating a directory and `lesson.json` — zero config changes. The Zod validation layer provides clear error messages at runtime. The three-tier hierarchy (course → module → lesson JSON files) scales to the full 380-lesson curriculum without architectural changes.

### Discriminated Union Lesson Engine ✅ KEEP
`LessonSection` as a 15-type discriminated union with TypeScript's `never` exhaustive check in `SectionRenderer` is exactly the right design pattern for a content system with many heterogeneous section types. Adding a new section type is mechanically enforced by the compiler. This pattern should be extended, not replaced, as Scenes and Interactions are added.

### Design System ✅ KEEP
The cyber aesthetic is coherent and production-quality. Tailwind `cyber.*` palette, `base.*` dark backgrounds, `shadow-cyber-sm/md/lg` glow utilities, and shadcn/ui semantic tokens work together cleanly. The system is extensible — new game-feel tokens (e.g., `cyber-gold`, `cyber-critical`) can be added without breaking existing styles.

### Framer Motion Integration ✅ KEEP
Direction-aware section transitions in `LessonPage` (`x: ±40, 0.28s`) feel polished. The `FadeUp` wrapper in Dashboard, `AnimatePresence` for sidebar labels — Framer Motion is used idiomatically throughout. This is the right animation library for the game-feel vision.

### Lesson Player Architecture ✅ KEEP
`LessonPlayer` (full-screen `fixed inset-0`) is the right container for the Operation experience. The mobile drawer sidebar, backdrop, and `MissionComplete` overlay show the game-feel direction is already established.

### Zustand Store Design ✅ KEEP
Separate stores for auth, UI, and lesson progress is the right separation. The `persist` middleware is correct. The stores are well-typed. This pattern should be extended with new stores (XP engine, event bus, audio state) rather than replaced.

### Interactive Component Library ✅ KEEP
14 reusable components (`TerminalSimulator`, `InteractiveDiagram`, `PacketFlowVisualizer`, `AttackTimeline`, `ProcessFlow`, `CodeDiffViewer`, `ExpandableDiagram`, quiz widgets) exported from a single index — this is exactly the component architecture a game-like experience needs. Extend, do not rewrite.

---

## 8. High Priority Issues

### H1 — No XP Award Mechanism
**Current:** `xpReward` field exists on lesson JSON. `LessonStore` tracks completion. XP is a hardcoded mock constant (3240) in the Dashboard and Sidebar. There is no code path that adds XP when a lesson is completed.

**Impact:** Every gamification feature — rank progression, achievement unlocks, leaderboard, streak rewards — is blocked by this single gap.

**Fix:** Add `awardXP(lessonId, amount)` to `useLessonStore`, persisted to localStorage initially, with a server-sync hook ready for future backend integration.

### H2 — No Authentication Middleware / Route Guards
**Current:** `useAuthStore` tracks `isAuthenticated`, but no `loader` or `<PrivateRoute>` wrapper exists in `src/router/index.tsx`. Any URL is accessible without login.

**Impact:** Demo is fine; production is not.

**Fix:** Add a `requireAuth` loader to all `AppLayout` children routes that redirects to `/login` if `!isAuthenticated`. One-hour fix.

### H3 — No Backend / API Layer
**Current:** Pure client-side. No API calls anywhere in the codebase.

**Impact:** No cross-device sync, no real leaderboard, no server-authoritative XP, no social features.

**Fix:** Define an API client interface now (even if mocked), so feature components code against the interface. When a backend is added, swap the implementation. Do not couple to a specific backend technology — use an adapter pattern (see Section 17, Migration Strategy).

### H4 — Dual Data Source Problem
**Current:** `src/data/academyData.ts` and `src/data/courseData.ts` export hardcoded course and module metadata. The Content Engine (`registry.ts`) also discovers and loads `course.json` and `module.json` files. These two sources have diverged already.

**Impact:** Confuses developers, causes stale data bugs, blocks the single-source-of-truth principle.

**Fix:** Delete `src/data/academyData.ts` and `src/data/courseData.ts`. All consumers must use the Content Engine. One week of component updates.

### H5 — No Course-Level or Module-Level Progress Tracking
**Current:** `useLessonStore` tracks per-lesson completion (`completedSectionIds`, `practicalComplete`, `challengeAttempts`). There is no aggregation of lessons into module progress or module progress into course progress.

**Impact:** Cannot display "Campaign 3 of 6 complete", cannot unlock the next module, cannot award module-completion badges.

**Fix:** Add `getModuleProgress(moduleId)` and `getCourseProgress(courseSlug)` selectors to `useLessonStore` that aggregate from existing per-lesson state. No schema change needed — the data is already there.

---

## 9. Medium Priority Issues

### M1 — Desktop-First Layout Paradigm
**Current:** `AppLayout` wraps content in a sidebar offset (`marginLeft: 260px`). Mobile gets a bottom nav with 5 icons. This is a desktop-first fallback pattern, not a mobile-first design.

**Impact:** Against the premium mobile-first vision, the navigation feel is wrong. Missions feel like web pages, not operations in a game.

**Fix:** Treat mobile as the primary breakpoint. The sidebar pattern should become a slide-in drawer on mobile (already partially implemented via `MobileNav`). Long-term, the homepage/dashboard concept needs a rethink toward a "Campaign Select" screen.

### M2 — LEGACY_REGISTRY Shim
**Current:** `LessonPage` has two resolution paths — the legacy `LEGACY_REGISTRY` (in-file map for `web-security-fundamentals/sql-injection-intro`) and the real Content Engine. This is a tech debt shim with no JSON file backing it.

**Fix:** Create the `content/courses/web-security-fundamentals/module-01-intro/sql-injection-intro/lesson.json` file and remove `LEGACY_REGISTRY`. Two hours.

### M3 — No Achievement Unlock Logic
**Current:** `Achievement` type is defined in `src/types/index.ts`. Four mock achievements are hardcoded in the Dashboard. No code path checks conditions or unlocks achievements.

**Fix:** Create `useAchievementStore` with an `evaluate(event)` function that checks achievement conditions against lesson/XP state. Wire to the XP award event.

### M4 — Non-Atomic Auth Store Updates
**Current:** `setUser()` and `setToken()` are separate Zustand actions. Code calling both in sequence (`setToken(token); setUser(user)`) triggers two renders, and the intermediate state (`isAuthenticated: true` but `user: null`) can cause UI flickers.

**Fix:** Add a single `login({ user, token })` action that sets both atomically.

### M5 — No Viewport-Height Handling for Mobile Browsers
**Current:** `LessonPlayer` uses `fixed inset-0` — correct. But `AppLayout` uses `min-h-screen`, which uses `100vh`. On mobile browsers, `100vh` includes the browser chrome, causing layout overflow when the address bar is visible.

**Fix:** Use the `dvh` (dynamic viewport height) CSS unit (`min-h-[100dvh]`) and/or the `@supports` fallback pattern throughout.

### M6 — Framer Motion Not Tuned for Mobile Performance
**Current:** Animations use `x` and `opacity` transforms — correct for GPU compositing. However, `duration: 0.4` with `ease: [0.4, 0, 0.2, 1]` on section transitions has not been profiled on mid-range Android hardware.

**Fix:** Audit animations with Chrome DevTools Performance panel on a throttled CPU profile. Reduce durations to 0.2–0.25s on mobile breakpoints. Disable non-essential animations with `prefers-reduced-motion` media query.

---

## 10. Low Priority Issues

### L1 — `React.FC` vs. Direct Function Declarations
Some components use `React.FC<Props>` (older pattern) while others use direct function declarations with typed props. Not a bug, but inconsistent.

### L2 — Avatar `fallback` Prop Takes `displayName`
`Avatar` receives `fallback={mockUser.displayName}` — presumably to generate initials — but the component's behavior with full names (vs. initials) is not visible from the audit. Low risk.

### L3 — `NavIcon` ICON_MAP Is Not Exhaustive
If a nav item's `icon` string does not match `ICON_MAP`, `NavIcon` renders `null` silently. Worth adding a console warning in development.

### L4 — `ScrollArea` in Sidebar
Using shadcn `ScrollArea` in the sidebar is correct, but if the nav grows significantly (more than 10 items), keyboard focus management within the scroll area should be audited.

### L5 — `StatCard` `trend` Prop Sign Logic
`trend={-3}` with `trendLabel="↑ 3 spots"` in the Dashboard is inconsistent — negative number with upward arrow. The sign convention in `StatCard` should be documented or made explicit.

---

## 11. Keep List ✅

| System | Rating | Justification |
|--------|--------|---------------|
| Content Engine (`src/lib/content/`) | ★★★★★ | Vite glob + Zod validation + lazy loading is production-grade |
| Discriminated Union Lesson Engine (`src/types/lesson-engine.ts`) | ★★★★★ | Compiler-enforced exhaustive dispatch — extend only |
| Design System (Tailwind config + shadcn/ui + CSS variables) | ★★★★☆ | Coherent, extensible, dark cyber aesthetic — add tokens, don't replace |
| Framer Motion integration | ★★★★☆ | Used idiomatically, correct GPU-composited properties |
| Lesson Player (`lesson-player.tsx`) | ★★★★☆ | Full-screen fixed, direction-aware, mobile drawer — right architecture |
| Zustand stores (auth, UI, lesson) | ★★★★☆ | Well-typed, persist middleware, correct separation — extend with new stores |
| Interactive Component Library (14 components) | ★★★★☆ | Exactly what a game-like content system needs — extend, never delete |
| SectionRenderer exhaustive dispatch | ★★★★★ | `never` check enforces correctness — add cases as vocabulary grows |
| Three-layout router structure | ★★★☆☆ | AppLayout / AuthLayout / LessonPage separation is correct |
| Zod schema validation (`schemas.ts`) | ★★★★★ | Source of truth for all content structure — never bypass |
| `linesOrString` helper (string or string[] content) | ★★★★☆ | Elegant content authoring ergonomic |
| shadcn/ui (Radix primitives) | ★★★★☆ | Accessible, unstyled, composable — right component foundation |
| TypeScript strict mode | ★★★★★ | Non-negotiable — maintain |
| Path alias `@` | ★★★★☆ | No relative-path hell |
| Sidebar collapse animation | ★★★☆☆ | Good desktop UX — keep for desktop, deprioritize for mobile |

---

## 12. Refactor List 🔄

| System | Rating | What to Change |
|--------|--------|----------------|
| `AppLayout` mobile layout | ★★☆☆☆ | Invert: build for mobile-first, desktop is the enhancement. Replace `hidden md:block` pattern with mobile-primary design |
| Dashboard | ★★★☆☆ | Replace mock constants with real data from stores/API adapter. Refactor `lg:grid-cols-3` layout toward a "Campaign Select" mobile-first screen |
| `useAuthStore` | ★★★☆☆ | Add atomic `login({ user, token })` action. Add `logout()` that clears both. Add router-integrated `requireAuth` loader |
| `useLessonStore` | ★★★☆☆ | Add `awardXP()`, `getModuleProgress()`, `getCourseProgress()` selectors. Rename `lessonId` keys to use stable IDs (currently may be slug-dependent) |
| Sidebar | ★★★☆☆ | Desktop: keep as-is. Mobile: convert to slide-in drawer with backdrop, activated from MobileNav or swipe gesture |
| `MobileNav` | ★★☆☆☆ | Currently 5 static icons. Refactor into context-aware navigation: Operation mode hides nav; Campaign overview shows mission tabs; home shows main nav |
| Course/Module JSON files (`course.json`, `module.json`) | ★★★☆☆ | Audit for completeness and alignment with Academy Architecture doc. Should be the single source of truth for catalogue metadata |
| Lesson section type vocabulary | ★★★★☆ | The 15 current types are solid. Extend with `scene`, `cutscene`, `dialogue`, `interaction` types using the same discriminated union pattern |
| `src/router/index.tsx` | ★★★☆☆ | Add `requireAuth` loaders to all AppLayout children. Rename vocabulary: `courses` → `campaigns`, `lessons` → `operations` in URL slugs (breaking change — plan carefully) |
| Interactive component export | ★★★★☆ | `src/features/interactive/index.ts` is correct. Add `GameplayWidget`, `SceneTransition`, `DialogueBox` exports as they're built |

---

## 13. Remove List ❌

| Item | Justification |
|------|---------------|
| `src/data/academyData.ts` | Replaced by Content Engine `registry.ts` — hardcoded data that will drift |
| `src/data/courseData.ts` | Same — all course metadata should come from `content/courses/*/course.json` |
| `LEGACY_REGISTRY` in `LessonPage` | Replace with real `lesson.json` file for the SQL injection demo |
| All inline mock constants in `dashboard.tsx` | `MOCK_USER`, `MOCK_FEATURED_COURSE`, `MOCK_COURSES`, `MOCK_ACHIEVEMENTS`, `MOCK_ACTIVITY` — delete after real data layer is connected |
| Inline mock in `sidebar.tsx` (`mockUser`) | Replace with real auth store data |

**Note:** Nothing else should be removed at this time. ComingSoon route stubs are placeholders, not waste — they define the navigation contract.

---

## 14. Add List ➕

| System | Priority | Description |
|--------|----------|-------------|
| **XP Engine** | P0 | `useXPStore` or extension to `useLessonStore`. `awardXP(amount, source)`, `getTotalXP()`, `getRank()`. Persisted. Fires events. |
| **API Adapter Layer** | P0 | `src/lib/api/` — interface-first. `IUserService`, `IProgressService`, `ILeaderboardService`. Mock implementations in `src/lib/api/mock/`. Swap for real HTTP when backend exists. |
| **Achievement Engine** | P1 | `useAchievementStore`. `evaluate(event: GameEvent)` checks conditions. Fires `ACHIEVEMENT_UNLOCKED` events. Persisted. |
| **Event Bus** | P1 | `src/lib/events/event-bus.ts`. Typed `GameEvent` discriminated union. `emit()` / `on()` / `off()`. No external library needed — Zustand subscriptions + a pub/sub thin wrapper suffice. |
| **Audio Manager** | P1 | `src/lib/audio/audio-manager.ts`. `play(track: AudioTrack)`, `sfx(id: SFXId)`, `setVolume()`, `mute()`. Respects `prefers-reduced-motion` and user settings. Uses Web Audio API. Background music for Campaign map, SFX for XP gains, section unlocks, achievement pops. |
| **Route Guards** | P1 | `requireAuth` loader in React Router v6 `loader` pattern. Redirects to `/login` if not authenticated. |
| **Dialogue Engine** | P1 | New section type `dialogue` in the discriminated union. `DialogueBox` component with character portrait, speaker name, text with typewriter effect, tap-to-advance. Extends the Story section model. |
| **Scene Engine** | P1 | `scene` section type. Full-screen scene transitions with `SceneTransition` component. Controls cutscene playback sequence. Powers Operation intros and ceremony sequences. |
| **Save Manager** | P2 | Wraps all Zustand persist stores. Adds `exportSave()` / `importSave()` for local backup. Adds cloud sync trigger (POST to API adapter) on each state write. |
| **Notification System** | P2 | `useNotificationStore`. In-game toast-style notifications for XP gains, achievement unlocks, streak updates. `NotificationOverlay` component layered above `AppLayout`. |
| **Campaign World Map** | P2 | Visual Campaign overview screen (`/campaigns/:slug`) replacing the current list-view courses page. Shows Operations as nodes with lock/unlock state, connection lines, completion stars. |
| **Character Manager** | P2 | `src/lib/characters/character-registry.ts`. Canonical character definitions (Director Chen, AURA, Marcus Webb, Priya Nair, Alex Torres). Portrait assets. Relationship state for future social features. |
| **Test Suite** | P2 | Vitest + React Testing Library. Start with: Zod schema roundtrip tests, Content Engine registry tests, XP Engine unit tests, SectionRenderer smoke tests. |
| **Offline Support** | P3 | Service Worker (`vite-plugin-pwa`). Cache content JSON and static assets. Queue XP/progress events for sync when online. Critical for mobile users in low-connectivity environments. |
| **Interaction Engine** | P3 | `interaction` section type. Handles timed decisions, branching dialogue choices, skill checks. The gamification layer above Quiz. |
| **Career Engine** | P3 | Connects `career-connection` section data to a persistent career interest profile. Powers "recommended next Campaign" logic. |
| **Storybook** | P3 | Component catalogue for the interactive library. Essential as the team scales. |

---

## 15. Missing Systems

These systems do not exist in any form and are required for the AAA mobile-first vision:

| System | Current State | Severity |
|--------|---------------|----------|
| **Backend / API** | None. Pure localStorage. | Critical — blocks all social, sync, leaderboard features |
| **Audio System** | None. Complete silence. | High — audio is 50% of game feel |
| **Event Bus** | None. Components are isolated. | High — XP → achievement → notification chain requires events |
| **XP Award Mechanism** | None. XP values exist in JSON but are never applied. | Critical — all gamification is blocked |
| **Route Guards** | None. Every URL is public. | High — any auth-gated feature is insecure |
| **Achievement Logic** | Types defined, no evaluation engine. | High — achievements are the core retention loop |
| **Dialogue Engine** | Story sections exist but no character-portrait dialogue UI. | High — AAA game feel requires voiced/illustrated dialogue |
| **Scene Engine** | None. No cutscene or transition management. | Medium — needed for ceremony, intro, module transition sequences |
| **Campaign World Map** | None. Courses page is a list. | Medium — visual campaign selection is core to game-feel navigation |
| **Offline Support** | None. Requires network for all content. | Medium — mobile users expect offline play |
| **Save Manager** | localStorage only. No export, no cloud sync. | Medium — data loss on browser clear |
| **Notification System** | None. No in-game feedback layer. | Medium — XP/achievement popups are instant-feel features |
| **Character Manager** | Characters exist in JSON but no canonical registry. | Low — needed for consistent portrait/voice management |
| **Career Engine** | career-connection section exists, no persistence or recommendations. | Low — needed for long-term retention personalization |
| **Test Suite** | Zero tests. | Medium — maintainability risk at scale |
| **Analytics / Telemetry** | None. No event tracking, no learning analytics. | Medium — needed for curriculum optimization |

---

## 16. Risks

### R1 — localStorage Quota Exhaustion (HIGH)
As curriculum grows (380 lessons × progress state), localStorage quota (5–10 MB) will be hit. All progress will be lost on quota error. **Mitigation:** Add a `Save Manager` with quota monitoring before launch.

### R2 — Content Engine Build-Time Discovery (MEDIUM)
`import.meta.glob` discovers files at build time. Adding a new Operation requires a full redeploy. This works for v1 but blocks dynamic content updates (seasonal events, live challenges). **Mitigation:** Acceptable for now. Add a remote content manifest layer later.

### R3 — No Backend Means No Authoritative State (HIGH)
XP, achievements, and leaderboard computed client-side can be trivially tampered with. For a competitive leaderboard or certification system, this is a security issue. **Mitigation:** Backend required before leaderboard or certificate features launch.

### R4 — Zero Test Coverage (MEDIUM)
Every refactor is high-risk without tests. The discriminated union and Zod schemas provide structural safety, but no behavioral safety. **Mitigation:** Prioritize Zod schema roundtrip tests and XP Engine unit tests as the first test layer.

### R5 — Framer Motion Bundle Size on Mobile (LOW)
Framer Motion is ~100 KB gzipped. On a 3G mobile connection, this adds load time. **Mitigation:** Code-split the lesson player (already on a separate route). Evaluate `motion/mini` for non-lesson pages.

### R6 — shadcn/ui Radix Accessibility on Mobile (LOW)
Radix UI primitives are ARIA-compliant for desktop screen readers but have known issues with some mobile screen readers (iOS VoiceOver). **Mitigation:** Manual accessibility audit before v1 launch.

### R7 — Curriculum Vocabulary Mismatch (MEDIUM)
The current codebase uses Academy → Course → Module → Lesson. The new vision uses Agency → Campaign → Operation → Scene. Route slugs, component names, store keys, and JSON field names all use old vocabulary. A rename without careful migration planning will break content URLs and bookmark links. **Mitigation:** See Migration Strategy (Section 17).

---

## 17. Migration Strategy

**Principle:** Extend without breaking. Old URLs must redirect. Old content files must continue to work. Rename incrementally across 3 phases.

### Phase 0 — Foundation (No user-visible changes)
1. Add `src/lib/api/` — interface + mock implementations. Wire Dashboard/Sidebar to use API adapter instead of mock constants.
2. Add `useXPStore` with `awardXP()`. Wire to lesson completion in `useLessonStore`.
3. Add `requireAuth` route loaders.
4. Delete `src/data/academyData.ts` and `src/data/courseData.ts`. All consumers migrate to Content Engine.
5. Add Vitest + first 10 tests (Zod schema roundtrips, XP engine).

### Phase 1 — Game Feel Layer (User-visible improvements)
1. Add `EventBus` — typed `GameEvent` discriminated union.
2. Add `useAchievementStore` with `evaluate()` wired to EventBus.
3. Add `NotificationOverlay` — XP gains, achievement unlocks, streak updates.
4. Add `AudioManager` — background music per Campaign, SFX library.
5. Add `dialogue` section type — `DialogueBox` component with portrait + typewriter.
6. Add `scene` section type — full-screen `SceneTransition` component.
7. Refactor `AppLayout` mobile branch: mobile-first breakpoints, context-aware nav.

### Phase 2 — Campaign World (Navigation reimagined)
1. Build `/campaigns/:slug` Campaign World Map screen.
2. Refactor Courses page to link to Campaign maps.
3. Add `CharacterRegistry` — canonical character definitions with portrait assets.
4. Implement `SaveManager` — export/import + cloud sync hook.
5. Add `interaction` section type — timed decisions, branching choices.

### Phase 3 — Vocabulary Migration (Rename with redirects)
1. Add React Router redirects: `/courses/:slug` → `/campaigns/:slug`, `/courses/:slug/lessons/:lesson` → `/campaigns/:slug/operations/:op`.
2. Rename route params in code: `courseSlug` → `campaignSlug`, `lessonSlug` → `operationSlug`.
3. Rename UI vocabulary: "Course" → "Campaign", "Lesson" → "Operation" in all display strings.
4. JSON content files: add `campaignSlug` alias alongside `courseSlug` (content backward compat).
5. Store key migration: old localStorage keys preserved via Zustand migration function.

**Do not** rename JSON field names in lesson files until every consumer and content renderer has been updated. The Zod schema is the migration gate — when the new schema is published and all JSON files pass validation, the old fields can be deprecated.

---

## 18. Estimated Refactor Effort

| Item | Effort | Who |
|------|--------|-----|
| Route guards (`requireAuth`) | 2 hours | 1 dev |
| API adapter layer (interface + mock) | 1 day | 1 dev |
| XP Engine (store + `awardXP`) | 1 day | 1 dev |
| Delete dual data sources | 1 day | 1 dev |
| Achievement Engine | 2 days | 1 dev |
| Event Bus | 4 hours | 1 dev |
| `AppLayout` mobile-first refactor | 3 days | 1 dev |
| Audio Manager | 3 days | 1 dev |
| Dialogue section type + component | 2 days | 1 dev |
| Scene section type + component | 2 days | 1 dev |
| Notification Overlay | 1 day | 1 dev |
| Campaign World Map screen | 1 week | 1 dev |
| Character Registry | 1 day | 1 dev |
| Save Manager | 2 days | 1 dev |
| Test suite foundation (20 tests) | 2 days | 1 dev |
| Vocabulary migration (Phase 3) | 1 week | 1 dev |
| **Total Phase 0 + 1** | **~4 weeks** | **1 dev** |
| **Total Phase 2 + 3** | **~4 weeks** | **1 dev** |
| **Full vision** | **~8 weeks** | **1 dev** |

*Estimates assume no backend work. Backend (API server + database) is a separate project of 4–8 weeks depending on stack choice.*

---

## 19. Recommended Development Roadmap

### Immediate (This Week) — Zero User Impact
- [ ] Add `requireAuth` route loaders to all AppLayout children
- [ ] Create `useXPStore` with `awardXP(lessonId, amount)` — wire to `useLessonStore` `markComplete`
- [ ] Create `src/lib/api/` interface layer with mock implementations
- [ ] Remove `src/data/academyData.ts` and `src/data/courseData.ts`
- [ ] Convert `LEGACY_REGISTRY` lesson to real `lesson.json` file

### Month 1 — Game Feel Foundation
- [ ] EventBus (typed `GameEvent` discriminated union)
- [ ] `useAchievementStore` with `evaluate()` wired to EventBus
- [ ] `NotificationOverlay` — XP pop, achievement unlock, streak fire
- [ ] `AudioManager` — SFX library for section advance, XP gain, achievement unlock
- [ ] `dialogue` section type — `DialogueBox` with character portrait + typewriter
- [ ] First 20 automated tests (Zod roundtrips, XP engine, achievement conditions)

### Month 2 — Mobile-First Overhaul
- [ ] Refactor `AppLayout` — mobile-first breakpoints, context-aware nav
- [ ] `scene` section type — full-screen `SceneTransition` component
- [ ] Viewport height fix (`dvh` units, safe-area-insets)
- [ ] Framer Motion performance audit on mobile hardware profile
- [ ] `SaveManager` — export/import + quota monitoring

### Month 3 — Campaign World & Backend Prep
- [ ] Campaign World Map screen
- [ ] `CharacterRegistry`
- [ ] API adapter HTTP implementation (backend ready)
- [ ] XP + achievement sync to server
- [ ] Real leaderboard (server-side ranking)

### Month 4 — Vocabulary & Polish
- [ ] URL vocabulary migration with redirects
- [ ] UI vocabulary rename (Course → Campaign, Lesson → Operation)
- [ ] `interaction` section type (branching choices, skill checks)
- [ ] `CareerEngine` — persistent interest profile
- [ ] Offline support (PWA, Service Worker)
- [ ] Accessibility audit (WCAG 2.5.5 touch targets, mobile screen readers)

---

## 20. Final Verdict

CyberLearn is **not a project that needs a rewrite**. It is a project that needs a purpose-built extension layer on top of an already sound foundation.

The TypeScript discipline is the most valuable asset in the repository. The discriminated union content engine, Zod validation, Zustand stores, and Framer Motion integration are all exactly the right choices. Do not replace them. Extend them.

The gap between current state and the AAA mobile-first vision is real — but it is a **feature gap**, not an **architecture gap**. The systems that are missing (audio, events, XP engine, scene engine, backend) are missing because they haven't been built yet, not because the existing architecture prevents them from being built.

The single highest-leverage decision in the next 30 days: **build the EventBus and XP Engine**. Every game-feel feature — achievements, streaks, notifications, audio cues, rank progression, leaderboard — flows through those two systems. Once they exist, every hour of work produces visible, motivating results. Until they exist, the platform can learn, but it cannot feel like a game.

**Prioritized verdict:**
1. **Foundation is sound.** TypeScript strictness, content engine, lesson discriminated union — keep all of it.
2. **Gamification layer is the critical path.** XP Engine → EventBus → Achievements → Audio → Notifications. Build in that order.
3. **Mobile-first is a redesign, not a tweak.** Plan a deliberate mobile-first sprint, not a responsive CSS fix.
4. **Backend is inevitable but not yet blocking.** The API adapter pattern lets you defer the backend without coupling to localStorage forever.
5. **Test coverage is the silent risk.** Add tests before any major refactor, not after.

> "The foundation is a 4-star architecture wearing a 2-star feature set.
> Build the features. The architecture will carry them."

---

*Audit produced by CyberLearn Architecture Review · 2026-07-29 · `main` @ `6eb96a48`*
