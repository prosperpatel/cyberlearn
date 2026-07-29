# CYBER LEARN — LAB INVENTORY V1.0
**Version:** 1.0 | **Created:** 2026-07-28 | **Status:** Draft
**Parent Document:** docs/curriculum/CURRICULUM_ARCHITECTURE.md V1.0
**Constitutional Reference:** CONSTITUTION.md V1.1
**Knowledge Graph Reference:** docs/curriculum/KNOWLEDGE_GRAPH.md V1.0

Master inventory of every interactive learning experience required to build Cyber Learn V1. All recommendations are derived from completed academy documents, the Knowledge Graph, and the existing interactive component library. Nothing is invented.

---

## SECTION 1 — EXECUTIVE SUMMARY

### Scope

| Metric | Count |
|--------|-------|
| Planned lessons (V1) | 380 (5 academies × up to 5 courses × 4 modules × 4 lessons) |
| Completed curriculum documents | Academy 1 (80 lessons), Academy 2 (60 lessons), Academy 3 (80 lessons) |
| Pending curriculum documents | Academy 4 (Windows Security, ~80 lessons), Academy 5 (Programming for Security, ~80 lessons) |
| Interactive components in codebase | 14 |
| New components required for V1 | 3 |
| Content data objects required (lesson configs) | 380+ |
| Animation scripts required | ~1,140 (avg. 3 per lesson) |

### Key Findings

1. **The codebase is well-positioned.** 14 interactive components already exist and cover ~85% of all curriculum interaction patterns. No major architecture changes are needed.

2. **Three components are missing.** `ComparisonTable`, `ConceptFlashCards`, and `SubnetCalculatorWidget` are referenced across hundreds of lessons but do not exist in `src/features/interactive/`. These are the only code-level gaps before V1 launch.

3. `QuizWidget` in curriculum metadata maps to the `quiz` section type in the lesson engine (`src/types/lesson-engine.ts`). No new component is required — the quiz renderer handles it.

4. **Content production is the dominant workload.** Every existing component needs lesson-specific data configs (terminal step sequences, diagram node/edge definitions, packet flow specs, scenario scripts, etc.). This is a content task, not a code task.

5. **`TerminalSimulator` and `InteractiveDiagram` are the two highest-volume components.** Together they appear in over 60% of all lessons. Both exist and are production-ready.

6. **Academy 3 (Linux) drives the highest interactive complexity.** 80 lessons × avg. 2 interactive components × detailed terminal sequences = the largest single content-production workload in V1.

---

## SECTION 2 — INTERACTIVE COMPONENT INVENTORY

### 2.1 Existing Components (14)

All 14 components are exported from `src/features/interactive/index.ts`.

| Codebase Name | Curriculum Reference Name | Category | Described Usage |
|---------------|--------------------------|----------|-----------------|
| `TerminalSimulator` | `TerminalSimulator` | Simulation | Step-by-step command execution with scripted output; used for all CLI/shell lessons in A3 and A4 |
| `InteractiveDiagram` | `ClickableDiagram` | Exploration | Clickable node-edge graphs; used for OSI model, filesystem hierarchy, network topology, packet anatomy, signing chains, cron expressions, career maps |
| `PacketFlowVisualizer` | `PacketFlowDiagram` | Simulation | Animated packet traversal across network hops; used for TCP handshake, encapsulation, DNS resolution, ARP exchange, NAT translation, routing hops |
| `AttackTimeline` | `AttackTimelineViewer` | Exploration | Chronological attack event timeline with phase labels; used for breach case studies (A1), incident response timelines (A3.C5), and attack chain walkthroughs |
| `ProcessFlow` | `ProcessFlow` | Visualization | Step-by-step process diagrams; used for boot sequence, authentication flows, package build pipeline, systemd service lifecycle |
| `CodeDiffViewer` | `CodeDiffViewer` | Comparison | Side-by-side before/after code view; used for Bash scripting, SSH config hardening, iptables rule sets, SELinux policy edits |
| `ExpandableDiagram` | `ExpandableDiagram` | Exploration | Collapsible hierarchical diagrams; used for complex network topologies, LVM volume group layout, filesystem trees |
| `DragDrop` | `DragDrop` | Assessment | Drag items to target zones; used for OSI layer mapping, kill chain phase assignment, threat actor categorization |
| `Ordering` | `DragDropOrdering` | Assessment | Arrange items into correct sequence; used for kill chain phase ordering, TCP state machine sequence, boot order, DNS resolution steps |
| `Matching` | `Matching` | Assessment | Connect pairs from two lists; used for port-to-service mapping, permission-to-octal mapping, record type-to-purpose matching |
| `Hotspot` | `Hotspot` | Assessment | Click labeled regions on a diagram; used for packet header field identification, filesystem layout, CPU architecture |
| `ScenarioCard` | `ScenarioSimulator` | Assessment | Branching scenario decisions with consequence feedback; used for 90-day plan builder (A1), incident response decisions (A3.C5), career path choices |
| `Callout` | `Callout` | Content | Styled callout boxes for warnings, tips, and key definitions; used across all lesson sections |
| `ReflectionCard` | `ReflectionCard` | Assessment | Prompted open-text or structured reflection; maps to the `reflection` section type; used in every lesson's closing reflection |

### 2.2 Missing Components (3)

These components are referenced in curriculum metadata and must be built before the lessons that use them can launch.

| New Component | Curriculum Reference | Category | First Required |
|---------------|---------------------|----------|----------------|
| `ComparisonTable` | `ComparisonTable` | Comparison | A1.C1.M3.L2 (blue vs. red team) |
| `ConceptFlashCards` | `ConceptFlashCards` | Review | A1.C2.M1.L1 (bits/bytes vocabulary) |
| `SubnetCalculatorWidget` | `SubnetCalculatorWidget` | Simulation | A2.C1.M2.L2 (subnetting and CIDR) |

### 2.3 Component Mapping Clarifications

The following curriculum names differ from codebase names but map directly — no new code is needed:

| Curriculum Name | Codebase Component | Notes |
|-----------------|-------------------|-------|
| `ClickableDiagram` | `InteractiveDiagram` | Same component; curriculum uses a more descriptive alias |
| `PacketFlowDiagram` | `PacketFlowVisualizer` | Same component; curriculum uses a shorter alias |
| `AttackTimelineViewer` | `AttackTimeline` | Same component; curriculum uses a longer alias |
| `DragDropOrdering` | `Ordering` | Same component; curriculum includes method in the name |
| `ScenarioSimulator` | `ScenarioCard` | Same component; curriculum uses a more descriptive alias |
| `QuizWidget` | `quiz` section type | Maps to the lesson engine's built-in quiz section renderer; not a separate component |
| `AnimationPlayer` | `animation` section type | Maps to the lesson engine's built-in animation section renderer; not a separate component |

---

## SECTION 3 — COMPONENT REUSE MATRIX

Estimated lesson-level usage counts per component per academy. A3 counts are derived from the completed 80-lesson document. A1 and A2 counts are derived from their completed documents. A4 and A5 counts are projected from curriculum scope patterns.

| Component | A1 (80L) | A2 (60L) | A3 (80L) | A4 (80L)* | A5 (80L)* | Total |
|-----------|----------|----------|----------|-----------|-----------|-------|
| `InteractiveDiagram` | 45 | 28 | 32 | 24 | 12 | **141** |
| `TerminalSimulator` | 2 | 8 | 72 | 40 | 28 | **150** |
| `ScenarioCard` | 18 | 10 | 20 | 18 | 10 | **76** |
| `PacketFlowVisualizer` | 4 | 36 | 20 | 10 | 4 | **74** |
| `AttackTimeline` | 12 | 6 | 16 | 20 | 8 | **62** |
| `Ordering` | 18 | 10 | 8 | 10 | 8 | **54** |
| `DragDrop` | 16 | 8 | 6 | 10 | 6 | **46** |
| `Matching` | 12 | 10 | 12 | 8 | 8 | **50** |
| `CodeDiffViewer` | 4 | 4 | 28 | 16 | 24 | **76** |
| `ProcessFlow` | 8 | 10 | 18 | 14 | 12 | **62** |
| `Hotspot` | 8 | 10 | 10 | 8 | 6 | **42** |
| `ExpandableDiagram` | 6 | 8 | 10 | 6 | 4 | **34** |
| `Callout` | 40 | 30 | 40 | 40 | 40 | **190** |
| `ReflectionCard` | 80 | 60 | 80 | 80 | 80 | **380** |
| `ComparisonTable` *(new)* | 28 | 22 | 32 | 20 | 12 | **114** |
| `ConceptFlashCards` *(new)* | 18 | 12 | 8 | 6 | 4 | **48** |
| `SubnetCalculatorWidget` *(new)* | 0 | 6 | 0 | 0 | 0 | **6** |

*A4/A5 projections based on curriculum scope described in CURRICULUM_ARCHITECTURE.md — actual counts will update once those academy documents are written.*

### Top 5 by Volume

1. `ReflectionCard` — 380 uses (every lesson; zero engineering work per lesson, data-driven)
2. `TerminalSimulator` — ~150 uses (dominant in A3/A4/A5; each lesson needs a custom step sequence)
3. `InteractiveDiagram` — ~141 uses (used across all five academies; each lesson needs custom node/edge data)
4. `Callout` — ~190 uses (inline content element; minimal per-lesson effort)
5. `ComparisonTable` *(new)* — ~114 uses (third-highest volume, yet not built; **highest-priority missing component**)

---

## SECTION 4 — DEVELOPMENT PRIORITY

### P0 — Launch Blockers (Must exist before Academy 1 goes live)

These components are required in Academy 1 lessons, which is the entry point for every learner.

| Component | Reason |
|-----------|--------|
| `ComparisonTable` | Used in A1.C1 (blue vs. red team), A1.C2 (memory types, CPU), A1.C3 (threat models). Without it, early lessons are incomplete. |
| `ConceptFlashCards` | Used in A1.C2.M1.L1 (binary vocabulary) and A1.C1.M3 (role definitions, certification comparison). |

### P1 — Academy 2 Blockers (Must exist before Academy 2 goes live)

| Component | Reason |
|-----------|--------|
| `SubnetCalculatorWidget` | Required for A2.C1.M2.L2 (Subnetting and CIDR), the highest-friction lesson in Academy 2. The KG flags this as KQI-E3 (high first-attempt failure rate) — the interactive calculator is not decorative; it is the pedagogical scaffold. |

### P2 — Content Production (All existing components; no code work needed)

All 14 existing components need per-lesson data configurations. Priority order mirrors the academy launch sequence:

1. **Academy 1 content configs** — InteractiveDiagram (OSI, career map, attack wheel), AttackTimeline (breach timeline, kill chain, SolarWinds), Ordering (kill chain phases), DragDrop (CIA triad violations), ScenarioCard (90-day plan, security mindset scenarios)
2. **Academy 2 content configs** — PacketFlowVisualizer (TCP handshake, DNS resolution, ARP, NAT, DHCP DORA, encapsulation), InteractiveDiagram (routing tables, TCP state machine, VLAN topology), Matching (port-service pairs)
3. **Academy 3 content configs** — TerminalSimulator (command sequences for all 80 lessons; this is the single largest content task in V1), CodeDiffViewer (Bash scripts, SSH config, iptables, SELinux policies), InteractiveDiagram (filesystem hierarchy, package signing chain, cron field anatomy)

### P3 — Future Academies (Post A1–A3 launch)

Content configs for A4 (Windows Security) and A5 (Programming for Security). Component code will already exist; only data is needed.

---

## SECTION 5 — RECOMMENDED BUILD ORDER

### Phase 1: Foundation (Before Academy 1 Launch)

Build the 2 missing P0 components, then produce all Academy 1 content configs in parallel.

```
Week 1:   ComparisonTable — build component + Academy 1 comparison data
Week 1:   ConceptFlashCards — build component + A1 vocabulary sets
Week 2–4: Academy 1 content configs for existing components
          (InteractiveDiagram nodes, AttackTimeline events, Ordering sequences,
           DragDrop zones, ScenarioCard scripts, Callout content)
```

### Phase 2: Academy 2 (After Academy 1 Launch)

Build the 1 missing P1 component, then produce A2 content configs.

```
Week 5:   SubnetCalculatorWidget — build + integrate A2.C1.M2 subnet data
Week 5–7: Academy 2 content configs
          (PacketFlowVisualizer routes, InteractiveDiagram state machines,
           Matching pairs, ComparisonTable data for A2 modules)
```

### Phase 3: Academy 3 (After Academy 2 Launch)

No new components needed. Pure content production — the largest single phase.

```
Week 8–14: Academy 3 TerminalSimulator step sequences (80 lessons × avg 15 steps each)
Week 8–14: Academy 3 CodeDiffViewer configs, InteractiveDiagram nodes
           (Can parallelize across content team members by course)
```

### Phase 4: Academies 4–5 (After Academy 3 Launch)

Pending curriculum document generation for A4 and A5. Component code is complete by this point.

---

## SECTION 6 — ESTIMATED ENGINEERING EFFORT

### New Component Build Effort

| Component | Estimated Effort | Complexity | Notes |
|-----------|-----------------|------------|-------|
| `ComparisonTable` | 2–3 days | Low | Data-driven table with configurable headers, row groups, highlight support, WCAG 2.2 AA keyboard navigation. No business logic. |
| `ConceptFlashCards` | 2 days | Low | Flip animation (CSS transform), keyboard navigation, prefers-reduced-motion fallback, configurable card sets. No business logic. |
| `SubnetCalculatorWidget` | 4–5 days | Medium | Step-by-step subnet math (network address, broadcast, host range calculation from CIDR input), real-time validation, guided mode with intermediate step display, fully accessible number inputs. Subnet math is testable logic — write unit tests. |
| **Total (new components)** | **8–10 days** | — | One mid-level frontend engineer; no backend, no API. |

### Content Production Effort

Content configs are not code — they are structured data objects (JSON/TypeScript) that feed existing components. Effort scales with lesson count and component complexity.

| Content Task | Est. Config Time | Volume | Total |
|--------------|-----------------|--------|-------|
| `TerminalSimulator` step sequences | 2–4 hours/lesson | ~150 lessons | ~375 hours |
| `InteractiveDiagram` node/edge maps | 1–2 hours/lesson | ~141 lessons | ~210 hours |
| `PacketFlowVisualizer` route configs | 1–2 hours/lesson | ~74 lessons | ~111 hours |
| `ComparisonTable` data rows | 30–60 min/lesson | ~114 lessons | ~85 hours |
| `AttackTimeline` event arrays | 1–2 hours/lesson | ~62 lessons | ~93 hours |
| `Ordering`/`DragDrop`/`Matching` sets | 30–60 min/lesson | ~150 lessons | ~112 hours |
| `ScenarioCard` scripts | 1–3 hours/lesson | ~76 lessons | ~152 hours |
| `CodeDiffViewer` diff configs | 1–2 hours/lesson | ~76 lessons | ~114 hours |
| `ConceptFlashCards` sets | 30–60 min/lesson | ~48 lessons | ~36 hours |
| `SubnetCalculatorWidget` scenarios | 1 hour/lesson | ~6 lessons | ~6 hours |
| **Total content production** | — | — | **~1,294 hours** |

### Animation Content Effort

Animation scripts and assets are referenced in curriculum metadata but are a content/design production task, not an engineering task. The lesson engine's `animation` section type renders them — the section renderer already exists.

| Metric | Count |
|--------|-------|
| Estimated animations across V1 (avg. 3 per lesson) | ~1,140 |
| Estimated script-writing time per animation | 2–4 hours |
| Estimated total animation content effort | ~2,850–4,560 hours |

> Animation production is the single largest effort in V1 by an order of magnitude. It is a content/design workload, not an engineering workload. Animations should be scheduled as a parallel track from day one, starting with Academy 1.

---

## SECTION 7 — MISSING COMPONENTS: SPECIFICATIONS

### 7.1 `ComparisonTable`

**Purpose:** Side-by-side comparison of two or more protocols, tools, concepts, or configurations. The most frequently referenced component that does not exist.

**Curriculum Usage Examples:**
- A1.C1.M3.L2: blue team activities vs. red team activities
- A1.C2.M1.L2: RAM vs. ROM vs. SSD vs. HDD (speed, volatility, capacity)
- A2.C1.M2.L4: IPv4 vs. IPv6 (address length, notation, NAT dependency, header structure)
- A2.C2.M1.L3: TCP vs. UDP (reliability, ordering, overhead, use cases, header size)
- A2.C1.M3.L3: hub vs. unmanaged switch vs. managed VLAN switch
- A3.C2.M4.L1: apt vs. dnf (ten-command side-by-side mapping)

**Proposed Interface:**
```typescript
interface ComparisonRow {
  label: string
  values: string[]         // one entry per column
  highlight?: boolean      // call out a key differentiator
}

interface ComparisonTableProps {
  columns: string[]        // column headers (e.g. ["TCP", "UDP"])
  rows: ComparisonRow[]
  caption?: string
}
```

**Accessibility:** WCAG 2.2 AA required. Use `<table>` with `<th scope="col">` column headers and `<th scope="row">` row headers. No color-only differentiation. Keyboard-navigable cells.

**Effort:** 2–3 days. No external dependencies. Styled with Tailwind `bg-base-800` surface and `cyber.*` accent colors matching design system.

---

### 7.2 `ConceptFlashCards`

**Purpose:** Vocabulary review through flippable cards. Each card shows a term on the front and a definition (with optional example) on the back. Used at the start of lessons that introduce a cluster of new terms before applying them.

**Curriculum Usage Examples:**
- A1.C2.M1.L1: bit, byte, KB, MB, GB — definitions and size relationships
- A2.C1.M2.L1: private IPv4 ranges (RFC 1918) — 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16
- A1.C1.M3.L1: role definitions — SOC analyst, penetration tester, CISO, red team, blue team
- A1.C1.M3.L3: certification names — ITF+, Security+, Network+, Linux+, CISSP

**Proposed Interface:**
```typescript
interface FlashCard {
  term: string
  definition: string
  example?: string
}

interface ConceptFlashCardsProps {
  cards: FlashCard[]
  shuffleable?: boolean    // allow learner to shuffle deck
}
```

**Accessibility:** Keyboard-flippable (Space/Enter to flip, arrow keys to navigate cards). `aria-live` announcement of which side is showing. `prefers-reduced-motion` disables the flip animation and switches to a crossfade. Screen reader reads both sides on focus.

**Effort:** 2 days. CSS `transform: rotateY` for flip animation. No external dependencies.

---

### 7.3 `SubnetCalculatorWidget`

**Purpose:** Interactive, step-by-step subnet calculator for Academy 2's highest-friction lesson (A2.C1.M2.L2 — Subnetting and CIDR). The KG flags this lesson as KQI-E3 (high first-attempt failure rate). The widget scaffolds the calculation by revealing one step at a time, requiring the learner to confirm each intermediate result before advancing.

**Curriculum Usage:** A2.C1.M2 (4 lessons — subnetting, CIDR, routing, IPv6). Also referenced in A2.C1.M2 capstone practical.

**Core Functionality:**
1. Learner enters an IP address and CIDR prefix length (e.g., `192.168.10.0/26`)
2. Widget reveals the binary representation of the address and mask side by side
3. Learner identifies the network address, broadcast address, and usable host count
4. Widget validates each step with immediate feedback before advancing
5. Guided mode: fill-in-the-blank for each calculated field
6. Free mode: learner enters all values at once and receives grouped feedback

**Proposed Interface:**
```typescript
interface SubnetProblem {
  ip: string               // e.g. "192.168.10.0"
  prefix: number           // e.g. 26
  showBinary?: boolean     // show binary breakdown panel
  guidedMode?: boolean     // step-by-step vs. free-entry
}

interface SubnetCalculatorWidgetProps {
  problems: SubnetProblem[]
  onComplete?: (results: SubnetResult[]) => void
}
```

**Accessibility:** Numeric inputs with `inputmode="numeric"`. Error messages linked to inputs via `aria-describedby`. Binary display formatted as `<code>` with grouped octets. No drag interactions — all keyboard-accessible.

**Effort:** 4–5 days. Subnet math (bitwise AND for network address, bitwise OR with inverted mask for broadcast, host count = 2^(32-prefix) - 2) is straightforward. Unit-test the math separately from the UI. The step-by-step reveal UI is the complexity.

---

## Appendix A — Component File Locations

| Component | Source Path |
|-----------|------------|
| `TerminalSimulator` | `src/features/interactive/components/terminal/terminal-simulator.tsx` |
| `InteractiveDiagram` | `src/features/interactive/components/interactive-diagram/interactive-diagram.tsx` |
| `PacketFlowVisualizer` | `src/features/interactive/components/packet-flow/packet-flow-visualizer.tsx` |
| `AttackTimeline` | `src/features/interactive/components/attack-timeline/attack-timeline.tsx` |
| `ProcessFlow` | `src/features/interactive/components/process-flow/process-flow.tsx` |
| `CodeDiffViewer` | `src/features/interactive/components/code-diff/code-diff-viewer.tsx` |
| `ExpandableDiagram` | `src/features/interactive/components/expandable-diagram/expandable-diagram.tsx` |
| `DragDrop`, `Ordering`, `Matching`, `Hotspot`, `ScenarioCard` | `src/features/interactive/components/quiz-widgets/` |
| `Callout`, `ReflectionCard` | `src/features/interactive/components/callout/`, `src/features/interactive/components/reflection-card/` |
| Component types | `src/features/interactive/types.ts` |
| Export index | `src/features/interactive/index.ts` |
| *`ComparisonTable`* *(to create)* | `src/features/interactive/components/comparison-table/comparison-table.tsx` |
| *`ConceptFlashCards`* *(to create)* | `src/features/interactive/components/concept-flash-cards/concept-flash-cards.tsx` |
| *`SubnetCalculatorWidget`* *(to create)* | `src/features/interactive/components/subnet-calculator/subnet-calculator-widget.tsx` |

New components must be exported from `src/features/interactive/index.ts` and have their prop types added to `src/features/interactive/types.ts` following the existing pattern.

---

## Appendix B — KG Compliance Check

The following Knowledge Graph domains drive the highest interactive component requirements:

| KG Domain | Academy | Primary Components |
|-----------|---------|-------------------|
| D1 (Security Foundations) | A1 | AttackTimeline, InteractiveDiagram, Ordering, ScenarioCard |
| D3 (Networking) | A2 | PacketFlowVisualizer, InteractiveDiagram, Matching, SubnetCalculatorWidget |
| D2 Linux (OS — Linux) | A3 | TerminalSimulator, InteractiveDiagram, CodeDiffViewer, ComparisonTable |
| D2 Windows (OS — Windows) | A4 | TerminalSimulator, InteractiveDiagram, ComparisonTable |
| D4 (Programming) | A5 | TerminalSimulator, CodeDiffViewer, ProcessFlow |

All components above have KG node coverage traceable to OS-L01–OS-L15, NET-01–NET-19, SEC-01–SEC-19, CB-01–CB-08. No components are proposed for KG nodes not yet covered in completed academy documents.
