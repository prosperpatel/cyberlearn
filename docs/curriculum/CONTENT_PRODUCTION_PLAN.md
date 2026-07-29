# CYBER LEARN — CONTENT PRODUCTION PLAN V1.0
**Version:** 1.0 | **Created:** 2026-07-28 | **Status:** Draft
**Parent Document:** docs/curriculum/CURRICULUM_ARCHITECTURE.md V1.0
**Constitutional Reference:** CONSTITUTION.md V1.1
**Knowledge Graph Reference:** docs/curriculum/KNOWLEDGE_GRAPH.md V1.0
**Lab Inventory Reference:** docs/curriculum/LAB_INVENTORY.md V1.0
**Audience:** Content Writers, Designers, Animators, Technical Writers, Developers, Project Managers

This document is the master production roadmap for every educational asset required to launch Cyber Learn V1. It covers what must be built, by whom, in what order, and at what estimated cost. Use it to plan sprints, allocate team capacity, and track production status.

---

## SECTION 1 — EXECUTIVE SUMMARY

### Asset Totals

| Asset Type | Count | Notes |
|-----------|-------|-------|
| Academies | 5 | A1–A3 curriculum documents complete; A4/A5 pending |
| Courses | 25 | 5 per academy |
| Modules | ~95 | A1: ~19, A2: 15, A3: 20, A4: ~20, A5: ~20 |
| Lessons | 380 | Total planned; A1=80, A2=60, A3=80, A4=80, A5=80 |
| Practical labs | 380 | 1 per lesson; type varies (simulation/guided-lab/free-lab/browser-exercise) |
| Capstones | 25 | 1 per course; 60–90 min each |
| Quizzes | 380 | 1 per lesson (handled by lesson engine quiz section type) |
| Animations | ~1,140 | Average 3 per lesson; content/design task — not engineering |
| Interactive diagrams | ~220 | Unique diagram data sets for InteractiveDiagram component |
| Comparison tables | ~114 | Unique data sets for ComparisonTable (new component) |
| Terminal simulations | ~150 | Unique step sequences for TerminalSimulator |
| Flashcard sets | ~48 | For ConceptFlashCards component (new) |
| New components to build | 3 | ComparisonTable, ConceptFlashCards, SubnetCalculatorWidget |
| Illustrations / infographics | ~80 | Decorative + explanatory; design team |
| Icons | ~120 | UI icons + lesson-type icons |

### Estimated Production Effort

| Work Stream | Estimated Hours | Team | Notes |
|-------------|----------------|------|-------|
| Engineering (3 new components) | 80 hrs | 1 front-end developer | One-time; see LAB_INVENTORY.md for spec |
| Content writing (380 lessons) | ~2,560 hrs | Writers | Avg 6 hrs/lesson × 380 + module/course text |
| Expert review (legal, ethical, technical) | ~770 hrs | Subject-matter experts | ~30% of writing effort |
| Interactive content configs | ~1,294 hrs | Technical writers / content devs | JSON/TS data for existing components |
| Animation production | ~3,700 hrs | Animation team | Mid-point of 2,850–4,560 range from LAB_INVENTORY |
| Design (non-animation) | ~800 hrs | Designers | Diagrams, illustrations, icons, infographics |
| **Total** | **~9,204 hrs** | Cross-functional | **~2.3 person-years of FTE effort at a 5-person team** |

### Critical Path for V1 Launch

```
[Academy 4/5 curriculum docs] ──────────────────────┐
                                                     │
[Engineering: 3 new components] → [Academy 1 content] → [A1 Launch] ─┐
     (8–10 dev days)                  (8 weeks)                       │
                                                                       ↓
                               [Academy 2 content] → [A2 Launch] ──→ [Full V1]
                               [Academy 3 content]    (parallel)
                                   (12 weeks)
```

The critical path runs through:
1. Building `ComparisonTable` and `ConceptFlashCards` (2 weeks) — without these, Academy 1 is incomplete
2. Completing Academy 1 content production (8 weeks) — first learner touchpoint
3. Completing Academies 2 and 3 in parallel (12 weeks) — largest content volume
4. Generating curriculum documents for Academies 4 and 5 (prerequisite for their content production)

---

## SECTION 2 — ASSET TYPES

### 2.1 Lesson Narrative (Lesson Text)

**Purpose:** The primary written content of each lesson — the explanations, examples, AI Mentor guidance, and contextual framing that learners read or hear.

**Owner:** Content Writer (primary), Subject-Matter Expert Reviewer (secondary)

**Typical Production Time:**
- Beginner expository: 4–5 hours
- Intermediate discovery: 6–7 hours
- Advanced: 8–10 hours
- Module intro section: 2 hours
- Course overview section: 3 hours

**Dependencies:** Curriculum metadata (lesson ID, KG nodes, learning objectives, skills gained) must exist in the academy document before writing begins.

**Quality Checklist:**
- [ ] All 3+ learning objectives addressed with precision
- [ ] Bloom's level matches the instructional approach (remember → explain; apply → practice)
- [ ] No technical jargon introduced before definition (per KG progressive disclosure)
- [ ] AI Mentor guidance present and not generic
- [ ] Ethical framing applied where `Ethical Content: true`
- [ ] Accessibility note honored in narrative (no color-only descriptions in text)
- [ ] Security Reviewer sign-off obtained if ethical flag is true
- [ ] Constitution Part 20 fields cross-checked

---

### 2.2 Interactive Diagram Data

**Purpose:** Node/edge definitions and label data for the `InteractiveDiagram` (ClickableDiagram) component. Each lesson that uses this component requires its own data object.

**Owner:** Technical Writer / Content Developer (data); Designer (visual layout if SVG)

**Typical Production Time:** 1–2 hours per lesson diagram

**Dependencies:** `InteractiveDiagram` component is production-ready. Data must conform to `InteractiveDiagramProps` type in `src/features/interactive/types.ts`.

**Quality Checklist:**
- [ ] All nodes labeled with accessible text
- [ ] All edges directed and labeled
- [ ] Click actions reveal correct detail text
- [ ] Screen-reader labels set (`aria-label` equivalents in data)
- [ ] No color-only encoding — icon or border weight also differentiates node types
- [ ] Keyboard navigation tested (Tab/Enter cycle through nodes)

---

### 2.3 Animation Script / Storyboard

**Purpose:** Frame-by-frame description of an educational animation for the animator to produce. Each animation must be independently storyboarded before production.

**Owner:** Content Writer (script); Animator (production)

**Typical Production Time:**
- Script/storyboard: 2–4 hours
- Animation production: 4–12 hours depending on complexity
- Voiceover script (if applicable): 1 hour

**Dependencies:** Lesson narrative must exist (animations reinforce written content, not replace it). Animation content delivered as lottie/SVG/video asset consumed by the `animation` section type in the lesson engine.

**Quality Checklist:**
- [ ] Length ≤ 90 seconds for simple animations; ≤ 3 minutes for complex sequences
- [ ] Pause/play/step controls described in storyboard (required for accessibility)
- [ ] `prefers-reduced-motion` fallback is a static diagram or text summary
- [ ] No flashing content > 3 Hz (WCAG 2.3.1)
- [ ] Narration script written at Flesch-Kincaid Grade 8 or below for beginner lessons
- [ ] Animation clearly illustrates one concept — not a collage of unrelated visuals

---

### 2.4 Screenshot / UI Reference

**Purpose:** Captured screenshots of real security tools (Wireshark, Nmap, terminal output, etc.) used in lesson content or labs. Used when a TerminalSimulator cannot replicate the exact visual.

**Owner:** Technical Writer

**Typical Production Time:** 30–60 minutes per screenshot set (capture + annotate)

**Dependencies:** Access to the tool; a prepared lab environment.

**Quality Checklist:**
- [ ] Resolution ≥ 1440×900 with 2× retina export
- [ ] Sensitive data (real IPs, usernames) replaced with fictional values
- [ ] Annotations (callout boxes, arrows) clearly readable
- [ ] Alt text description written
- [ ] Captured from a known-clean lab environment

---

### 2.5 Infographic

**Purpose:** A single image summarizing a complex relationship (attack taxonomy, cert pathway, risk equation, OSI layer summary). Used in lesson summaries and as downloadable cheat sheets.

**Owner:** Designer (primary), Content Writer (copy)

**Typical Production Time:** 4–6 hours per infographic

**Dependencies:** Lesson narrative or cheat sheet text must be final.

**Quality Checklist:**
- [ ] Standalone comprehensibility (no context needed from lesson text)
- [ ] Text readable at 800px width (mobile)
- [ ] Color contrast WCAG AA minimum (4.5:1 for small text)
- [ ] Exported as SVG (scalable) and PNG (fallback)
- [ ] No information conveyed by color alone

---

### 2.6 Quiz Data Set

**Purpose:** The question bank for each lesson's quiz section. Each lesson requires at minimum 5 questions; challenge lessons require an additional scenario-based question.

**Owner:** Content Writer (primary); Subject-Matter Expert (review and validation)

**Typical Production Time:** 1–2 hours per lesson quiz (5–8 questions)

**Dependencies:** Learning objectives must be finalized. Quiz questions must map to Bloom's level declared in lesson metadata.

**Quality Checklist:**
- [ ] Minimum 5 questions per lesson
- [ ] Each learning objective covered by at least 1 question
- [ ] Distractors are plausible (common misconceptions, not obviously wrong)
- [ ] Correct answer rationale text written for every question
- [ ] No "all of the above" or "none of the above" distractors
- [ ] At least 1 scenario-based question per intermediate/advanced lesson
- [ ] Questions validated by SME before publication

---

### 2.7 Practical Lab Guide

**Purpose:** Step-by-step instructions for the practical exercise in each lesson. Type varies: simulation (in-browser), guided-lab (TerminalSimulator or Wireshark emulator), free-lab (open-ended), or browser-exercise (real browser task).

**Owner:** Technical Writer (primary); Developer (for guided-lab step sequences)

**Typical Production Time:**
- Simulation: 1 hour (scenario design)
- Guided lab: 3–5 hours (step sequence + validation logic)
- Free lab: 2–3 hours (rubric-based open objective)
- Browser exercise: 2 hours (instructions + expected output)

**Dependencies:** For guided labs, the `TerminalSimulator` step sequence must be authored as structured data.

**Quality Checklist:**
- [ ] Objective clearly stated (what the learner will accomplish)
- [ ] Steps are numbered and atomic
- [ ] Expected output specified for each step
- [ ] Error states documented (what to do if something goes wrong)
- [ ] Lab environment is idempotent (can be restarted without side effects)
- [ ] Lab achievable in the declared duration

---

### 2.8 Terminal Simulation Data

**Purpose:** The scripted step sequence consumed by the `TerminalSimulator` component. Each step defines: command, expected output, explanation text, whether the step is required or skippable.

**Owner:** Technical Writer / Developer

**Typical Production Time:** 2–4 hours per lesson (avg 15 steps per lesson)

**Dependencies:** Lab environment must be tested to confirm commands produce the documented output. All commands must use fictional but realistic hostnames, usernames, and IP addresses (no real-world production systems).

**Quality Checklist:**
- [ ] All commands tested in a clean Ubuntu 22.04 LTS environment before scripting
- [ ] Fictional but realistic usernames (prosper@helix-lab), IPs (10.0.1.10), hostnames (sec-lab-01)
- [ ] No real credentials, tokens, or URLs from production systems
- [ ] Each step's explanation text written at the appropriate Bloom's level
- [ ] Error recovery steps documented for the 3 most common mistakes per lesson
- [ ] TerminalSimulator accessibility: aria-live output confirmed in testing

---

### 2.9 Voiceover Script

**Purpose:** Audio narration script for animation voiceovers and lesson introductions. V1 scope: optional for launch; recommended for accessibility and engagement.

**Owner:** Content Writer (script); Voiceover Artist or AI TTS (production)

**Typical Production Time:** 1 hour per 500 words of narration

**Dependencies:** Animation storyboard must be final.

**Quality Checklist:**
- [ ] Flesch-Kincaid Grade 8 for beginner lessons; Grade 10–12 for advanced
- [ ] No gendered pronouns for the "attacker" or "defender" (use "they")
- [ ] Pronunciation guide provided for technical terms
- [ ] Audio paired with captions (WCAG 1.2.2)
- [ ] Consistent voice/persona throughout the lesson

---

### 2.10 Illustration / Visual Asset

**Purpose:** Original artwork used in lesson sections (story, hook, concept metaphors). Not screenshots, not diagrams — original illustrative art that makes abstract concepts memorable.

**Owner:** Illustrator / Designer

**Typical Production Time:** 2–4 hours per illustration

**Dependencies:** Content Writer provides a brief describing the concept, tone, and key visual elements.

**Quality Checklist:**
- [ ] Vector format (SVG) for scalability
- [ ] Alt text written
- [ ] Consistent style guide applied across all lesson illustrations
- [ ] No stereotyped visual representations of hackers/attackers/victims
- [ ] Cultural sensitivity review for globally relevant content

---

### 2.11 Cheat Sheet

**Purpose:** A one-page reference document summarizing the key commands, concepts, or decision trees from a module. Downloadable and printable. Designed for learners to reference during labs and for exam preparation.

**Owner:** Technical Writer (content); Designer (layout)

**Typical Production Time:** 3–4 hours total (2 hrs content + 1–2 hrs layout)

**Dependencies:** Module must be complete. Cheat sheets are produced at module level (1 per module), not per lesson.

**Quality Checklist:**
- [ ] All commands tested and correct
- [ ] Fits on one A4/Letter page at 11pt font
- [ ] PDF export with selectable text (not a scanned image)
- [ ] Covers all key skills gained in the module
- [ ] Consistent formatting with other academy cheat sheets

---

### 2.12 Flashcard Set

**Purpose:** Structured data for the `ConceptFlashCards` component. Each set contains 8–16 term/definition cards for vocabulary-heavy lessons. Produced at lesson level when the lesson metadata specifies `ConceptFlashCards` as an interactive component.

**Owner:** Technical Writer

**Typical Production Time:** 30–60 minutes per set

**Dependencies:** `ConceptFlashCards` component must be built (see LAB_INVENTORY.md Section 7.2).

**Quality Checklist:**
- [ ] 8–16 cards per set
- [ ] Each term defined precisely (not circularly)
- [ ] Example sentence or real-world usage provided where helpful
- [ ] Consistent with definitions used elsewhere in the lesson narrative
- [ ] Cards reviewed by SME

---

### 2.13 Summary Notes

**Purpose:** A 200–400 word written summary of the lesson's key takeaways, generated for every lesson. Displayed in the `summary` section type in the lesson engine. Learners can export these as personal study notes.

**Owner:** Content Writer

**Typical Production Time:** 30–45 minutes per lesson

**Dependencies:** Lesson narrative must be final.

**Quality Checklist:**
- [ ] Covers all learning objectives
- [ ] No new information introduced (summary only, not new content)
- [ ] Bullet-point format for scannability
- [ ] Links to the next lesson and relevant cheat sheet
- [ ] Plain language (no jargon without prior definition)

---

### 2.14 Challenge Exercise

**Purpose:** The optional harder exercise in lessons with `Assessment: quiz-and-challenge`. A structured scenario-based problem that applies knowledge at Bloom's "apply" or higher. Distinct from the quiz — not multiple choice.

**Owner:** Technical Writer (problem design); SME (validation)

**Typical Production Time:** 2–3 hours per challenge

**Dependencies:** Learning objectives and practical type must be defined. Must integrate with the lab environment.

**Quality Checklist:**
- [ ] Clearly states the scenario, inputs, and expected outputs
- [ ] Has a rubric for evaluating open-ended responses
- [ ] Solvable within 15 minutes for a learner who passed the quiz
- [ ] 3-level hint system written (Hint 1: direction; Hint 2: approach; Hint 3: step-by-step)
- [ ] Ethical framing applied if the challenge involves offensive techniques

---

### 2.15 Capstone Guide

**Purpose:** The detailed scenario brief, step instructions, rubric, and solution guide for each course capstone. Each capstone is a 60–90 minute authentic assessment that integrates all module skills.

**Owner:** Technical Writer (scenario); SME (rubric and solution)

**Typical Production Time:** 6–10 hours (scenario design + rubric + solution guide)

**Dependencies:** All modules in the course must be finalized.

**Quality Checklist:**
- [ ] Scenario is realistic and clearly written
- [ ] Each required task is independently scoreable
- [ ] Rubric provides explicit criteria for each score band (0, 1, 2 points per task)
- [ ] Solution guide written by an SME (not the narrative writer)
- [ ] Mastery gate threshold (≥80%) applied and tested against rubric
- [ ] KG validation node coverage listed and verified

---

## SECTION 3 — LESSON PRODUCTION MATRIX

**How to use this matrix:** Every lesson is tracked with the key data needed for production planning. Update the Status column as work progresses. Priority reflects launch sequence: P0 = Academy 1 launch required, P1 = Academy 2 launch required, P2 = Academy 3 launch required, P3 = Academy 4/5 (post-launch).

**Status values:** `Not Started` | `In Writing` | `Draft Complete` | `In Review` | `Approved` | `Published`

**Diagram?** = Y if lesson requires InteractiveDiagram data config | **Term?** = Y if TerminalSimulator step sequence required | **FC?** = Y if ConceptFlashCards set required | **Anim** = estimated animation count

---

### Academy 1 — Cybersecurity Foundations (80 lessons)

#### Course A1.C1 — The Digital Security Landscape

| Lesson ID | Title | KG Nodes | Diff | Type | Diagram? | Anim | Term? | FC? | Write Hrs | Priority | Status |
|-----------|-------|----------|------|------|----------|------|-------|-----|-----------|----------|--------|
| A1.C1.M1.L1 | The Cost of Insecurity | SEC-01, SEC-02, CB-01 | beginner | expository | Y | 3 | N | N | 4 | P0 | Not Started |
| A1.C1.M1.L2 | A Day in the Life of a Security Professional | SEC-01, SEC-15 | beginner | expository | Y | 3 | N | N | 4 | P0 | Not Started |
| A1.C1.M1.L3 | How the Internet Changed Everything | CB-01, CB-06, SEC-01 | beginner | expository | Y | 3 | N | N | 4 | P0 | Not Started |
| A1.C1.M1.L4 | The Security Mindset | SEC-01, SEC-19 | beginner | discovery | N | 2 | N | N | 4 | P0 | Not Started |
| A1.C1.M2.L1 | What is a Cyberattack? | SEC-05, SEC-03, SEC-01 | beginner | expository | Y | 2 | N | N | 4 | P0 | Not Started |
| A1.C1.M2.L2 | The Kill Chain: How Attacks Unfold | SEC-08, SEC-05, SEC-03 | beginner | discovery | N | 2 | N | N | 5 | P0 | Not Started |
| A1.C1.M2.L3 | Who Are the Attackers? | SEC-03, SEC-05, SEC-19 | beginner | expository | Y | 2 | N | N | 4 | P0 | Not Started |
| A1.C1.M2.L4 | Case Study: The SolarWinds Breach | SEC-08, SEC-05, SEC-03, SEC-18 | beginner | discovery | N | 2 | N | N | 5 | P0 | Not Started |
| A1.C1.M3.L1 | Roles in Cybersecurity | SEC-15, SEC-01 | beginner | expository | Y | 2 | N | Y | 4 | P0 | Not Started |
| A1.C1.M3.L2 | Blue Team vs. Red Team | SEC-15, SEC-16, SEC-09 | beginner | expository | N | 2 | N | N | 4 | P0 | Not Started |
| A1.C1.M3.L3 | Certifications and Learning Paths | SEC-15 | beginner | expository | Y | 2 | N | N | 4 | P0 | Not Started |
| A1.C1.M3.L4 | Your First Steps in Security | SEC-15, SEC-01 | beginner | discovery | N | 2 | N | N | 4 | P0 | Not Started |
| A1.C1.M4.L1–L4 | *Module A1.C1.M4 — See CURRICULUM_ARCHITECTURE.md* | — | beginner | — | — | — | N | — | 4–5 ea | P0 | Not Started |

#### Course A1.C2 — Computer Essentials for Security

| Lesson ID | Title | KG Nodes | Diff | Type | Diagram? | Anim | Term? | FC? | Write Hrs | Priority | Status |
|-----------|-------|----------|------|------|----------|------|-------|-----|-----------|----------|--------|
| A1.C2.M1.L1 | Bits, Bytes, and Binary | CB-02, CB-01 | beginner | expository | Y | 3 | N | Y | 4 | P0 | Not Started |
| A1.C2.M1.L2 | Memory: RAM, ROM, and Storage | CB-03, CB-01 | beginner | expository | N | 3 | N | N | 4 | P0 | Not Started |
| A1.C2.M1.L3 | The CPU: The Brain of the System | CB-04, CB-01 | beginner | expository | Y | 3 | N | N | 4 | P0 | Not Started |
| A1.C2.M1.L4 | How Programs Execute | CB-04, CB-03, CB-07 | beginner | discovery | Y | 2 | N | N | 5 | P0 | Not Started |
| A1.C2.M2.L1 | What is an Operating System? | CB-07, CB-01 | beginner | expository | Y | 2 | N | N | 4 | P0 | Not Started |
| A1.C2.M2.L2 | Files, Folders, and the File System | CB-08, CB-07 | beginner | expository | Y | 3 | N | N | 4 | P0 | Not Started |
| A1.C2.M2.L3 | Processes and Services | CB-09, CB-07 | beginner | expository | N | 3 | N | N | 4 | P0 | Not Started |
| A1.C2.M2.L4 | Windows vs. Linux: Key Differences | CB-07, CB-08, OS-L01, OS-W01 | beginner | expository | N | 2 | N | N | 4 | P0 | Not Started |
| A1.C2.M3.L1 | How the Internet Works | CB-06, NET-01 | beginner | discovery | N | 3 | N | N | 4 | P0 | Not Started |
| A1.C2.M3.L2 | IP Addresses and Domain Names | NET-02, NET-10, CB-06 | beginner | expository | Y | 3 | N | N | 4 | P0 | Not Started |
| A1.C2.M3.L3 | Browsers, Servers, and HTTP | CB-06, NET-01, WEB-01 | beginner | expository | Y | 3 | N | N | 4 | P0 | Not Started |
| A1.C2.M3.L4 | Your Digital Footprint | SEC-01, NET-01, CB-06 | beginner | discovery | N | 2 | N | N | 4 | P0 | Not Started |
| A1.C2.M4.L1–L4 | *Module A1.C2.M4 — See CURRICULUM_ARCHITECTURE.md* | — | beginner | — | — | — | N | — | 4–5 ea | P0 | Not Started |

#### Course A1.C3 — Threats, Vulnerabilities, and Risk

| Lesson ID | Title | KG Nodes | Diff | Type | Diagram? | Anim | Term? | FC? | Write Hrs | Priority | Status |
|-----------|-------|----------|------|------|----------|------|-------|-----|-----------|----------|--------|
| A1.C3.M1.L1 | Malware: Types and Behavior | SEC-07, SEC-05, SEC-03 | beginner | expository | N | 3 | N | Y | 5 | P0 | Not Started |
| A1.C3.M1.L2 | Social Engineering and Phishing | SEC-06, SEC-05 | beginner | expository | N | 3 | N | N | 5 | P0 | Not Started |
| A1.C3.M1.L3 | Insider Threats | SEC-05, SEC-03 | beginner | expository | N | 2 | N | N | 5 | P0 | Not Started |
| A1.C3.M1.L4 | Nation-State and APT Threats | SEC-05, SEC-08, SEC-03 | beginner | expository | Y | 2 | N | N | 5 | P0 | Not Started |
| A1.C3.M2.L1 | What is a Vulnerability? | SEC-17, SEC-05, SEC-03 | beginner | expository | Y | 3 | N | N | 4 | P0 | Not Started |
| A1.C3.M2.L2 | CVEs and the Vulnerability Lifecycle | SEC-17, SEC-05 | beginner | expository | Y | 3 | N | N | 4 | P0 | Not Started |
| A1.C3.M2.L3 | Zero-Days and Patch Management | SEC-17, SEC-05, SEC-03 | beginner | discovery | N | 3 | N | N | 5 | P0 | Not Started |
| A1.C3.M2.L4 | The Exploit Development Mindset | SEC-05, SEC-17, SEC-16 | beginner | discovery | N | 2 | N | N | 5 | P0 | Not Started |
| A1.C3.M3.L1 | Risk, Threat, and Vulnerability Defined | SEC-11, SEC-03 | beginner | expository | N | 2 | N | N | 4 | P0 | Not Started |
| A1.C3.M3.L2 | Risk Assessment Basics | SEC-11 | beginner | expository | N | 2 | N | N | 5 | P0 | Not Started |
| A1.C3.M3.L3 | Risk Tolerance and Appetite | SEC-11 | beginner | expository | N | 2 | N | N | 4 | P0 | Not Started |
| A1.C3.M3.L4 | Building a Risk Register | SEC-11, SEC-03 | beginner | discovery | N | 2 | N | N | 5 | P0 | Not Started |
| A1.C3.M4.L1–L4 | *Module A1.C3.M4 — See CURRICULUM_ARCHITECTURE.md* | — | beginner | — | — | — | N | — | 4–5 ea | P0 | Not Started |

#### Course A1.C4 — Security Principles and Mindset

| Lesson ID | Title | KG Nodes | Diff | Type | Diagram? | Anim | Term? | FC? | Write Hrs | Priority | Status |
|-----------|-------|----------|------|------|----------|------|-------|-----|-----------|----------|--------|
| A1.C4.M1.L1 | Confidentiality: Keeping Secrets | SEC-02, SEC-13 | beginner | expository | N | 3 | N | N | 4 | P0 | Not Started |
| A1.C4.M1.L2 | Integrity: Trusting Data | SEC-02, SEC-13 | beginner | expository | Y | 3 | N | N | 4 | P0 | Not Started |
| A1.C4.M1.L3 | Availability: Keeping Systems Running | SEC-02 | beginner | expository | N | 3 | N | N | 4 | P0 | Not Started |
| A1.C4.M1.L4 | Non-Repudiation and Authentication | SEC-02, SEC-14 | beginner | expository | Y | 3 | N | N | 4 | P0 | Not Started |
| A1.C4.M2.L1 | The Layers of Defense | SEC-09, SEC-04 | beginner | expository | Y | 2 | N | N | 4 | P0 | Not Started |
| A1.C4.M2.L2 | Security Controls: Preventive, Detective, Corrective | SEC-04, SEC-09 | beginner | expository | N | 3 | N | N | 4 | P0 | Not Started |
| A1.C4.M2.L3 | Zero Trust Architecture | SEC-10, SEC-09 | beginner | discovery | Y | 3 | N | N | 5 | P0 | Not Started |
| A1.C4.M2.L4 | Security by Design | SEC-09, SEC-04, SEC-10 | beginner | discovery | N | 3 | N | N | 5 | P0 | Not Started |
| A1.C4.M3.L1 | The Adversarial Mindset | SEC-19, SEC-05 | beginner | discovery | N | 3 | N | N | 4 | P0 | Not Started |
| A1.C4.M3.L2 | Threat Modeling Basics | SEC-19 | beginner | discovery | Y | 3 | N | N | 6 | P0 | Not Started |
| A1.C4.M3.L3 | Security Metrics and KPIs | SEC-20, SEC-11 | beginner | expository | N | 2 | N | N | 4 | P0 | Not Started |
| A1.C4.M3.L4 | Communicating Risk to Stakeholders | SEC-20, SEC-11, SEC-15 | beginner | expository | N | 2 | N | N | 4 | P0 | Not Started |
| A1.C4.M4.L1–L4 | *Module A1.C4.M4 — See CURRICULUM_ARCHITECTURE.md* | — | beginner | — | — | — | N | — | 4–5 ea | P0 | Not Started |

#### Course A1.C5 — Ethics, Laws, and Careers

| Lesson ID | Title | KG Nodes | Diff | Type | Diagram? | Anim | Term? | FC? | Write Hrs | Priority | Status |
|-----------|-------|----------|------|------|----------|------|-------|-----|-----------|----------|--------|
| A1.C5.M1.L1 | Computer Crime Laws (CFAA, UK CMA, GDPR) | SEC-12, GRC-01 | beginner | expository | Y | 3 | N | N | 5 | P0 | Not Started |
| A1.C5.M1.L2 | Privacy Laws and Compliance | SEC-12, GRC-01 | beginner | expository | N | 2 | N | N | 5 | P0 | Not Started |
| A1.C5.M1.L3 | Responsible Disclosure | SEC-12, SEC-16 | beginner | expository | N | 3 | N | N | 5 | P0 | Not Started |
| A1.C5.M1.L4 | Ethics in Security Research | SEC-12, SEC-16 | beginner | discovery | N | 2 | N | N | 5 | P0 | Not Started |
| A1.C5.M2.L1 | What is Penetration Testing? | SEC-16, SEC-12 | beginner | expository | Y | 2 | N | N | 5 | P0 | Not Started |
| A1.C5.M2.L2–L4 | *Lessons M2.L2–L4 — See CURRICULUM_ARCHITECTURE.md* | SEC-16, SEC-12 | beginner | — | — | — | N | — | 5 ea | P0 | Not Started |
| A1.C5.M3.L1–L4 | *Module A1.C5.M3 — See CURRICULUM_ARCHITECTURE.md* | — | beginner | — | — | — | N | — | 5 ea | P0 | Not Started |
| A1.C5.M4.L1–L4 | *Module A1.C5.M4 (Career Planning) — See CURRICULUM_ARCHITECTURE.md* | — | beginner | — | — | — | N | — | 4–5 ea | P0 | Not Started |

---

### Academy 2 — Networking (60 lessons)

#### Course A2.C1 — Network Fundamentals

| Lesson ID | Title | KG Nodes | Diff | Type | Diagram? | Anim | Term? | FC? | Write Hrs | Priority | Status |
|-----------|-------|----------|------|------|----------|------|-------|-----|-----------|----------|--------|
| A2.C1.M1.L1 | The OSI Model | NET-01 | beginner | expository | Y | 3 | N | N | 5 | P1 | Not Started |
| A2.C1.M1.L2 | TCP/IP in Practice | NET-02, NET-01 | beginner | expository | N | 3 | N | N | 5 | P1 | Not Started |
| A2.C1.M1.L3 | Encapsulation and De-encapsulation | NET-01, NET-02 | beginner | discovery | N | 3 | N | N | 5 | P1 | Not Started |
| A2.C1.M1.L4 | The OSI Model Through a Security Lens | NET-01, NET-02, SEC-01 | beginner | discovery | Y | 3 | N | N | 6 | P1 | Not Started |
| A2.C1.M2.L1 | IPv4 Fundamentals | NET-03 | beginner | expository | Y | 3 | N | Y | 5 | P1 | Not Started |
| A2.C1.M2.L2 | Subnetting and CIDR | NET-04, NET-03 | beginner | expository | N | 3 | N | N | 6 | P1 | Not Started |
| A2.C1.M2.L3 | How Routing Works | NET-18, NET-03, NET-04 | beginner | expository | Y | 3 | N | N | 5 | P1 | Not Started |
| A2.C1.M2.L4 | IPv6 and Why It Matters | NET-03 | beginner | expository | N | 3 | N | N | 5 | P1 | Not Started |
| A2.C1.M3.L1 | MAC Addresses and Ethernet Frames | NET-05 | beginner | expository | Y | 3 | N | N | 5 | P1 | Not Started |
| A2.C1.M3.L2 | ARP: Translating Addresses | NET-06, NET-05, NET-03 | beginner | expository | N | 4 | N | N | 5 | P1 | Not Started |
| A2.C1.M3.L3 | Switches, VLANs, and Network Segmentation | NET-19, NET-05 | beginner | expository | Y | 4 | N | N | 6 | P1 | Not Started |
| A2.C1.M3.L4 | NAT: Sharing One Address | NET-16, NET-03, NET-04 | beginner | expository | N | 3 | N | N | 5 | P1 | Not Started |

#### Course A2.C2 — Core Protocols

| Lesson ID | Title | KG Nodes | Diff | Type | Diagram? | Anim | Term? | FC? | Write Hrs | Priority | Status |
|-----------|-------|----------|------|------|----------|------|-------|-----|-----------|----------|--------|
| A2.C2.M1.L1 | TCP and the Three-Way Handshake | NET-09 | beginner | expository | Y | 3 | N | N | 5 | P1 | Not Started |
| A2.C2.M1.L2 | The TCP State Machine | NET-13, NET-09 | inter. | expository | Y | 3 | N | N | 6 | P1 | Not Started |
| A2.C2.M1.L3 | UDP: Fast and Connectionless | NET-10 | beginner | expository | N | 3 | N | N | 5 | P1 | Not Started |
| A2.C2.M1.L4 | Ports, Services, and the Socket Concept | NET-09, NET-10 | beginner | discovery | Y | 3 | N | N | 5 | P1 | Not Started |
| A2.C2.M2.L1 | DNS: The Internet's Directory | NET-07 | beginner | expository | Y | 3 | N | N | 5 | P1 | Not Started |
| A2.C2.M2.L2 | DNS Record Types | NET-07 | beginner | expository | Y | 3 | N | Y | 5 | P1 | Not Started |
| A2.C2.M2.L3 | DHCP: Automatic Address Assignment | NET-08 | beginner | expository | N | 3 | N | N | 5 | P1 | Not Started |
| A2.C2.M2.L4 | DNS and DHCP as Attack Surfaces | NET-07, NET-08, NET-23 | inter. | discovery | N | 3 | N | N | 6 | P1 | Not Started |
| A2.C2.M3.L1 | HTTP: The Web's Protocol | NET-11 | beginner | expository | Y | 3 | N | N | 5 | P1 | Not Started |
| A2.C2.M3.L2 | Cookies, Sessions, and State Management | NET-11 | beginner | expository | Y | 3 | N | N | 5 | P1 | Not Started |
| A2.C2.M3.L3 | TLS and HTTPS | NET-20, NET-11 | inter. | expository | Y | 4 | N | N | 7 | P1 | Not Started |
| A2.C2.M3.L4 | Reading HTTP Traffic in Wireshark | NET-11, NET-12, NET-20 | inter. | discovery | N | 3 | Y | N | 6 | P1 | Not Started |

#### Course A2.C3 — Network Analysis

| Lesson ID | Title | KG Nodes | Diff | Type | Diagram? | Anim | Term? | FC? | Write Hrs | Priority | Status |
|-----------|-------|----------|------|------|----------|------|-------|-----|-----------|----------|--------|
| A2.C3.M1.L1 | Wireshark Interface and Navigation | NET-12, NET-28 | inter. | expository | N | 3 | Y | N | 6 | P1 | Not Started |
| A2.C3.M1.L2 | Display Filters and Traffic Isolation | NET-12, NET-28 | inter. | expository | N | 3 | Y | N | 6 | P1 | Not Started |
| A2.C3.M1.L3 | Following TCP and UDP Conversations | NET-12, NET-09 | inter. | discovery | N | 3 | Y | N | 6 | P1 | Not Started |
| A2.C3.M1.L4 | Analyzing DNS and HTTP in a PCAP | NET-12, NET-07, NET-11 | inter. | discovery | N | 2 | Y | N | 7 | P1 | Not Started |
| A2.C3.M2.L1–L4 | *Module A2.C3.M2 (Nmap) — See academy-02-networking.md* | NET-25 | inter. | — | — | 3 ea | Y | — | 6–7 ea | P1 | Not Started |
| A2.C3.M3.L1–L4 | *Module A2.C3.M3 (Enterprise Protocols) — See academy-02-networking.md* | NET-14–17 | inter. | — | — | 3 ea | Y | — | 6–7 ea | P1 | Not Started |

#### Courses A2.C4 and A2.C5

| Lesson ID | Title | KG Nodes | Diff | Type | Diagram? | Anim | Term? | FC? | Write Hrs | Priority | Status |
|-----------|-------|----------|------|------|----------|------|-------|-----|-----------|----------|--------|
| A2.C4.M1–M3.L1–L4 | *Course A2.C4 (Network Attacks) — 12 lessons — See academy-02-networking.md* | NET-21–26 | inter. | — | Y | 3 ea | Y | — | 6–7 ea | P1 | Not Started |
| A2.C5.M1–M3.L1–L4 | *Course A2.C5 (Network Defense) — 12 lessons — See academy-02-networking.md* | NET-21–26 | inter. | — | Y | 3 ea | N | — | 6–8 ea | P1 | Not Started |

---

### Academy 3 — Linux (80 lessons)

#### Course A3.C1 — Linux Foundations

| Lesson ID | Title | KG Nodes | Diff | Type | Diagram? | Anim | Term? | FC? | Write Hrs | Priority | Status |
|-----------|-------|----------|------|------|----------|------|-------|-----|-----------|----------|--------|
| A3.C1.M1.L1 | What Is Linux? History and Philosophy | CB-07 | beginner | expository | Y | 3 | N | N | 5 | P2 | Not Started |
| A3.C1.M1.L2 | Linux Distributions and the Package Ecosystem | OS-L04 | beginner | expository | Y | 4 | N | N | 5 | P2 | Not Started |
| A3.C1.M1.L3 | The Linux Kernel: Architecture and Security Role | CB-07, OS-L04 | beginner | expository | Y | 4 | N | N | 6 | P2 | Not Started |
| A3.C1.M1.L4 | Open Source, Licensing, and the Security Community | CB-07, OS-L04 | beginner | discovery | N | 3 | N | N | 5 | P2 | Not Started |
| A3.C1.M2.L1 | The Terminal and Shell | CB-07 | beginner | expository | Y | 3 | Y | N | 5 | P2 | Not Started |
| A3.C1.M2.L2 | Essential Navigation Commands | CB-07, CB-08 | beginner | expository | Y | 4 | Y | N | 6 | P2 | Not Started |
| A3.C1.M2.L3 | Getting Help: man, --help, and apropos | CB-07 | beginner | expository | Y | 3 | Y | N | 5 | P2 | Not Started |
| A3.C1.M2.L4 | Your First Shell Session: Putting It Together | CB-07, CB-08 | beginner | discovery | N | 3 | Y | N | 5 | P2 | Not Started |
| A3.C1.M3.L1 | Filesystem Hierarchy Standard (FHS) | OS-L01 | beginner | expository | Y | 3 | Y | N | 5 | P2 | Not Started |
| A3.C1.M3.L2–L4 | *M3 L2–L4 (Filesystem deep dive) — See academy-03-linux.md* | OS-L01, CB-08 | beginner | — | Y | 3 ea | Y | — | 5 ea | P2 | Not Started |
| A3.C1.M4.L1–L4 | *Module A3.C1.M4 (Files and Archives) — See academy-03-linux.md* | OS-L01, CB-08 | beginner | — | N | 3 ea | Y | — | 5 ea | P2 | Not Started |

#### Course A3.C2 — Linux Administration

| Lesson ID | Title | KG Nodes | Diff | Type | Diagram? | Anim | Term? | FC? | Write Hrs | Priority | Status |
|-----------|-------|----------|------|------|----------|------|-------|-----|-----------|----------|--------|
| A3.C2.M1.L1–L4 | *Module A3.C2.M1 (File Permissions and Ownership) — See academy-03-linux.md* | OS-L02 | beginner | — | Y | 3 ea | Y | — | 6 ea | P2 | Not Started |
| A3.C2.M2.L1–L4 | *Module A3.C2.M2 (Users and Groups) — See academy-03-linux.md* | OS-L03 | beginner | — | Y | 3 ea | Y | — | 6 ea | P2 | Not Started |
| A3.C2.M3.L1–L4 | *Module A3.C2.M3 (Shell Environment and Bash Scripting) — See academy-03-linux.md* | OS-L07 | inter. | — | N | 3 ea | Y | — | 7 ea | P2 | Not Started |
| A3.C2.M4.L1 | Package Management with apt and dnf | OS-L04 | beginner | expository | N | 4 | Y | N | 6 | P2 | Not Started |
| A3.C2.M4.L2 | Repositories, GPG Signing, and Package Integrity | OS-L04 | inter. | expository | Y | 4 | Y | N | 7 | P2 | Not Started |
| A3.C2.M4.L3 | Building Software from Source | OS-L04 | inter. | expository | Y | 5 | Y | N | 7 | P2 | Not Started |
| A3.C2.M4.L4 | Automation with cron, at, and Scheduled Tasks | OS-L07, OS-L04 | beginner | discovery | Y | 5 | Y | N | 7 | P2 | Not Started |

#### Course A3.C3 — Processes and System Management

| Lesson ID | Title | KG Nodes | Diff | Type | Diagram? | Anim | Term? | FC? | Write Hrs | Priority | Status |
|-----------|-------|----------|------|------|----------|------|-------|-----|-----------|----------|--------|
| A3.C3.M1.L1–L4 | *Module A3.C3.M1 (Linux Processes and Signals) — See academy-03-linux.md* | OS-L08 | inter. | — | Y | 3 ea | Y | — | 7 ea | P2 | Not Started |
| A3.C3.M2.L1–L4 | *Module A3.C3.M2 (systemd, Services, and Logging) — See academy-03-linux.md* | OS-L09 | inter. | — | Y | 3 ea | Y | — | 7 ea | P2 | Not Started |
| A3.C3.M3.L1–L4 | *Module A3.C3.M3 (Storage, Filesystems, Disk Management) — See academy-03-linux.md* | OS-L08 | inter. | — | Y | 3 ea | Y | — | 7 ea | P2 | Not Started |
| A3.C3.M4.L1–L4 | *Module A3.C3.M4 (Performance Monitoring, Timers, Diagnostics) — See academy-03-linux.md* | OS-L09 | inter. | — | N | 3 ea | Y | — | 6 ea | P2 | Not Started |

#### Courses A3.C4 and A3.C5

| Lesson ID | Title | KG Nodes | Diff | Type | Diagram? | Anim | Term? | FC? | Write Hrs | Priority | Status |
|-----------|-------|----------|------|------|----------|------|-------|-----|-----------|----------|--------|
| A3.C4.M1–M4.L1–L4 | *Course A3.C4 (Networking and Security) — 16 lessons — See academy-03-linux.md* | OS-L05, OS-L11, OS-L15 | inter. | — | Y | 3 ea | Y | — | 7 ea | P2 | Not Started |
| A3.C5.M1–M4.L1–L4 | *Course A3.C5 (Linux for Cybersecurity) — 16 lessons — See academy-03-linux.md* | OS-L06, OS-L10–L15 | inter.–adv. | — | Y | 3 ea | Y | — | 8 ea | P2 | Not Started |

---

### Academy 4 — Windows Security (80 lessons — Curriculum Document Pending)

| Lesson ID | Title | Notes | Priority | Status |
|-----------|-------|-------|----------|--------|
| A4.C1–C5 (80 lessons) | *All lesson data pending* | Curriculum document must be generated first (see CURRICULUM_ARCHITECTURE.md for course scope and KG coverage). Component infrastructure will be complete before A4 content production begins. | P3 | Blocked — pending A4 curriculum document |

---

### Academy 5 — Programming for Security (80 lessons — Curriculum Document Pending)

| Lesson ID | Title | Notes | Priority | Status |
|-----------|-------|-------|----------|--------|
| A5.C1–C5 (80 lessons) | *All lesson data pending* | Curriculum document must be generated first. A5 has highest CodeDiffViewer usage (~24 lessons) and TerminalSimulator dependency (~28 lessons). | P3 | Blocked — pending A5 curriculum document |

---

## SECTION 4 — ANIMATION PRODUCTION PLAN

Animations are grouped into reusable thematic categories. An animation tagged as "reusable" can be referenced across multiple lessons with minor variation; a "unique" animation is lesson-specific and cannot be repurposed.

### Category 1 — Networking (A2 Primary, A1 Secondary)

| Animation Slug | Description | Length | Complexity | Reuse | Priority |
|---------------|-------------|--------|------------|-------|----------|
| tcp-handshake-sequence | SYN → SYN-ACK → ACK with flag labels and seq numbers | 60s | Medium | High: A2.C2.M1, A4 | P1 |
| tcp-four-way-fin | FIN → ACK → FIN → ACK termination sequence | 45s | Medium | Medium: A2.C2.M1 | P1 |
| tcp-state-machine-traversal | Client and server state transitions per packet | 90s | High | Low: A2.C2.M1.L2 | P1 |
| dns-recursive-resolution | Stub → recursive → root → TLD → authoritative | 75s | Medium | High: A1.C2.M3, A2.C2.M2 | P1 |
| dns-cache-ttl-countdown | DNS cache with TTL timer | 30s | Low | Medium | P1 |
| dhcp-dora-sequence | Discover → Offer → Request → Acknowledge | 60s | Medium | High: A2.C2.M2 | P1 |
| osi-layer-reveal | 7-layer stack reveals one layer at a time | 45s | Low | High: A1.C2, A2.C1 | P1 |
| encapsulation-wrapping | Header added per layer as data travels down | 60s | Medium | High: A1.C2.M3, A2.C1.M1 | P1 |
| arp-request-broadcast-reply | ARP broadcast and unicast reply | 45s | Medium | High: A2.C1.M3 | P1 |
| nat-pat-translation | PAT translation table entry creation | 60s | Medium | Medium: A2.C1.M3 | P1 |
| subnet-mask-binary-masking | Bitwise AND for network address | 45s | Low | Medium: A2.C1.M2 | P1 |
| ipv4-binary-breakdown | 32-bit address → 4 octets animation | 30s | Low | High: A2.C1.M2, A1.C2.M3 | P1 |
| routing-longest-prefix-match | Routing table lookup visualization | 60s | Medium | Medium: A2.C1.M2 | P1 |
| tls-handshake-simplified | ClientHello → ServerHello → key exchange → Finished | 90s | High | High: A2.C2.M3, A3.C4 | P1 |
| http-request-response-cycle | Browser → DNS → TCP → HTTP GET → response | 60s | Medium | High: A1.C2.M3, A2.C2.M3 | P1 |
| wireshark-follow-tcp-stream | Wireshark interface: follow stream action | 60s | Medium | Low: A2.C3.M1 | P1 |
| rogue-dhcp-race-condition | Attacker DHCP Offer races legitimate server | 60s | Medium | Low: A2.C2.M2.L4 | P1 |
| dns-cache-poisoning | Forged DNS response injection | 60s | Medium | Low: A2.C2.M2.L4 | P1 |
| vlan-segmentation-reveal | Broadcast domain before/after VLAN | 45s | Medium | Medium: A2.C1.M3 | P1 |

### Category 2 — Linux / Operating System (A3 Primary, A1 Secondary)

| Animation Slug | Description | Length | Complexity | Reuse | Priority |
|---------------|-------------|--------|------------|-------|----------|
| linux-kernel-userspace-syscall | User app → syscall interface → kernel space | 60s | Medium | High: A1.C2, A3.C1 | P2 |
| linux-everywhere-montage | Linux on servers/cloud/containers/phones | 30s | Low | High: A3.C1.M1 | P2 |
| distro-family-tree-reveal | Debian/RHEL/Arch family tree expanding | 45s | Low | Medium: A3.C1.M1 | P2 |
| terminal-prompt-anatomy | Prompt components: user/host/dir/$ | 30s | Low | Medium: A3.C1.M2 | P2 |
| ls-la-output-field-decode | ls -la output with field-by-field callouts | 45s | Low | High: A3.C1.M2, A3.C2.M1 | P2 |
| cd-absolute-vs-relative | cd with absolute path vs. relative path | 45s | Low | High: A3.C1.M2 | P2 |
| fhs-directory-purpose-reveal | FHS tree with click-to-reveal directory purpose | 60s | Low | High: A3.C1.M3 | P2 |
| permission-bits-rwx | rwx permission bits → binary → octal | 45s | Medium | High: A3.C2.M1 | P2 |
| chmod-before-after | File permissions before and after chmod | 30s | Low | Medium: A3.C2.M1 | P2 |
| suid-privilege-escalation | SUID bit execution with elevated privilege | 60s | Medium | Low: A3.C2.M1, A3.C5 | P2 |
| process-lifecycle | Fork → exec → running → zombie → dead | 60s | Medium | High: A1.C2.M2, A3.C3.M1 | P2 |
| process-signals | kill command → signal → process response | 45s | Low | Medium: A3.C3.M1 | P2 |
| systemd-service-lifecycle | systemctl start → active → stop → dead | 60s | Medium | High: A3.C3.M2 | P2 |
| journald-log-flow | Service → journal → journalctl output | 45s | Low | Medium: A3.C3.M2 | P2 |
| apt-install-dependency-resolution | apt install with dependency tree animation | 60s | Medium | High: A3.C2.M4, A1.C2 | P2 |
| gpg-signature-verification-flow | Developer signs → apt verifies → install | 75s | Medium | Medium: A3.C2.M4 | P2 |
| configure-make-install-three-stage | ./configure → make → make install pipeline | 60s | Low | Medium: A3.C2.M4 | P2 |
| cron-expression-field-by-field | 5 cron fields with ranges expanding | 45s | Low | Medium: A3.C2.M4 | P2 |
| iptables-packet-traversal | Packet through INPUT/OUTPUT/FORWARD chains | 75s | High | High: A3.C4, A2.C5 | P2 |
| selinux-enforcing-mode | DAC check → SELinux MAC check → allow/deny | 75s | High | Low: A3.C4.M4 | P2 |
| boot-process-stages | BIOS/UEFI → bootloader → kernel → init → login | 90s | Medium | High: A1.C2, A3.C3.M2 | P2 |
| lvm-volume-group-layout | PV → VG → LV → filesystem | 60s | Medium | Low: A3.C3.M3 | P2 |
| tail-f-live-log | tail -f showing live log entries scrolling | 30s | Low | High: A3.C1.M3, A3.C5 | P2 |

### Category 3 — Security Concepts (A1 Primary, cross-academy)

| Animation Slug | Description | Length | Complexity | Reuse | Priority |
|---------------|-------------|--------|------------|-------|----------|
| kill-chain-phase-walkthrough | 7 kill chain phases with icons | 90s | Medium | High: A1.C1, A2.C4, A3.C5 | P0 |
| ransomware-encryption-spread | File encryption propagation across network | 60s | Medium | Low: A1.C3.M1 | P0 |
| malware-delivery-methods | Phishing → dropper → payload execution | 60s | Medium | Low: A1.C3.M1 | P0 |
| risk-equation-animation | Risk = Threat × Vulnerability × Impact | 30s | Low | Medium: A1.C3.M3 | P0 |
| cia-triad-reveal | Three properties with breach examples per property | 45s | Low | High: A1.C4.M1, A3.C5 | P0 |
| hashing-visualization | Input → hash function → digest, with tamper demo | 60s | Medium | High: A1.C4.M1, A2.C2, A5 | P0 |
| defense-in-depth-layers | Castle layers → cyber layers | 60s | Low | High: A1.C4.M2 | P0 |
| zero-trust-never-trust-always-verify | Perimeter collapse → verify every request | 60s | Low | Medium: A1.C4.M2 | P0 |
| stride-category-reveal | S-T-R-I-D-E category cards expanding | 45s | Low | Medium: A1.C4.M3 | P0 |
| phishing-email-anatomy | Email dissection with callouts | 45s | Low | Medium: A1.C3.M1 | P0 |
| cve-lifecycle | Discovery → disclosure → patch → deployment | 60s | Low | High: A1.C3.M2 | P0 |
| supply-chain-attack-animation | Trusted software update chain compromise | 60s | Medium | Low: A1.C1.M2, A3.C2.M4 | P0 |
| financial-loss-counter | Rolling counter of breach financial losses | 30s | Low | Low: A1.C1.M1 | P0 |
| digital-signature-metaphor | Private key signs → public key verifies | 60s | Medium | High: A1.C4.M1, A3.C2, A5 | P0 |
| apt-patience-timeline | APT dwell time across months | 45s | Low | Low: A1.C3.M1 | P0 |

### Category 4 — Cryptography (cross-academy)

| Animation Slug | Description | Length | Complexity | Reuse | Priority |
|---------------|-------------|--------|------------|-------|----------|
| symmetric-encryption-key-exchange | Shared secret, encrypt/decrypt | 60s | Medium | High: A2.C2.M3, A3.C4, A5 | P1 |
| asymmetric-key-pair-concept | Public/private key pair usage | 60s | Medium | High: A1.C4.M1, A2.C2.M3, A5 | P1 |
| certificate-chain-validation | Root CA → intermediate → leaf cert | 75s | Medium | High: A2.C2.M3, A3.C4 | P1 |
| sha256-digest-animation | Input → SHA-256 → fixed-length output | 45s | Low | High: A1.C4.M1, A3.C2.M4, A5 | P1 |

### Category 5 — Web Security (A2 Secondary, A5 Primary)

| Animation Slug | Description | Length | Complexity | Reuse | Priority |
|---------------|-------------|--------|------------|-------|----------|
| cookie-set-and-send-cycle | Set-Cookie header → browser storage → re-send | 45s | Low | High: A2.C2.M3, A5 | P1 |
| session-token-lifecycle | Login → session created → session expired | 45s | Low | Medium: A2.C2.M3 | P1 |
| xss-injection-visualization | Malicious script injected into page | 60s | Medium | Low: A5 | P3 |
| sql-injection-flow | User input → concatenated query → DB response | 60s | Medium | Low: A5 | P3 |

---

## SECTION 5 — DIAGRAM PRODUCTION PLAN

Diagrams below are designed to be reused across lessons. Each represents a unique `InteractiveDiagram` data configuration. Priority reflects how early in the academy sequence each diagram is first needed.

### Reusable Diagrams (highest leverage)

| Diagram Name | Purpose | First Lesson | Reused In | Complexity | Priority |
|-------------|---------|-------------|-----------|------------|----------|
| OSI 7-Layer Stack | Clickable layer explorer | A2.C1.M1.L1 | A1.C2, A2.C1, A2.C2, A2.C4 | Low | P1 |
| TCP/IP 4-Layer Model | Maps to OSI; protocol examples per layer | A2.C1.M1.L2 | A2.C1, A2.C2 | Low | P1 |
| IPv4 Address Anatomy | Four octets with binary/decimal view | A2.C1.M2.L1 | A2.C1.M2, A2.C3 | Low | P1 |
| TCP Header Anatomy | All TCP fields with clickable explanations | A2.C2.M1.L1 | A2.C2.M1, A2.C4 | Medium | P1 |
| DNS Hierarchy Tree | Root → TLD → authoritative | A2.C2.M2.L1 | A2.C2.M2 | Low | P1 |
| TLS Certificate Chain | Root CA → intermediate → leaf | A2.C2.M3.L3 | A2.C2.M3, A3.C4 | Medium | P1 |
| HTTP Request Anatomy | Method/URL/headers/body annotated | A2.C2.M3.L1 | A2.C2.M3, A5 | Low | P1 |
| Set-Cookie Header | Name/value/domain/path/flags | A2.C2.M3.L2 | A2.C2.M3, A5 | Low | P1 |
| Career Map | Clickable role overview | A1.C1.M3.L1 | A1.C5 | Low | P0 |
| Kill Chain Phases | 7 phases as clickable timeline | A1.C1.M2.L2 | A1.C1, A2.C4 | Low | P0 |
| Attack Category Wheel | Major attack types as radial diagram | A1.C1.M2.L1 | A1.C1 | Medium | P0 |
| CIA Triad Venn | Three overlapping properties | A1.C4.M1.L1 | A1.C4 | Low | P0 |
| Defense-in-Depth Layers | 6 layers with control examples | A1.C4.M2.L1 | A1.C4, A2.C5 | Low | P0 |
| Zero Trust Architecture Pillars | 5 pillars diagram | A1.C4.M2.L3 | A1.C4 | Low | P0 |
| STRIDE Category Diagram | S-T-R-I-D-E with definitions | A1.C4.M3.L2 | A1.C4 | Low | P0 |
| FHS Directory Tree | Linux filesystem hierarchy with security annotations | A3.C1.M3.L1 | A3.C1, A3.C2, A3.C5 | Medium | P2 |
| Linux Kernel Architecture | Hardware/kernel space/user space layers | A3.C1.M1.L3 | A3.C1, A3.C4 | Medium | P2 |
| Distribution Family Tree | Debian/RHEL/Arch branches | A3.C1.M1.L2 | A3.C1 | Low | P2 |
| Permission Bits Visual | rwx for user/group/other | A3.C2.M1 | A3.C2, A3.C5 | Low | P2 |
| Package Signing Chain | Developer → repo → apt → verify | A3.C2.M4.L2 | A3.C2.M4 | Medium | P2 |
| Cron Expression Fields | 5-field diagram with ranges | A3.C2.M4.L4 | A3.C2.M4 | Low | P2 |
| iptables Chain Diagram | INPUT/OUTPUT/FORWARD with table types | A3.C4 | A3.C4, A2.C5 | High | P2 |
| SELinux Policy Flow | DAC → SELinux MAC → decision | A3.C4 | A3.C4 | High | P2 |
| Network Topology (Helix Corp) | Reusable office network diagram | A2.C1 Capstone | A2.C1–C5 capstones | Medium | P1 |

### Unique Diagrams (lesson-specific, lower reuse)

Approximately 120 additional unique `InteractiveDiagram` data configs are needed for lessons where the diagram content is inherently lesson-specific (e.g., a specific routing table, a unique process tree, an individual PCAP diagram). These are produced alongside the lesson narrative at 1–2 hours each.

---

## SECTION 6 — WRITING ROADMAP

### 6.1 Estimated Writing Effort

| Academy | Lessons | Avg Write (hrs) | Total Write | Module/Course Overhead | Academy Total |
|---------|---------|-----------------|-------------|----------------------|--------------|
| A1 | 80 | 4.5 | 360 hrs | 80 hrs | ~440 hrs |
| A2 | 60 | 5.5 | 330 hrs | 60 hrs | ~390 hrs |
| A3 | 80 | 6.5 | 520 hrs | 80 hrs | ~600 hrs |
| A4 | 80 | 6.0 | 480 hrs | 80 hrs | ~560 hrs |
| A5 | 80 | 6.0 | 480 hrs | 80 hrs | ~560 hrs |
| **Total** | **380** | — | **2,170 hrs** | **380 hrs** | **~2,550 hrs** |

At a 5-writer team producing ~35 hrs/week of content each:
- Academy 1 alone: ~440 hrs ÷ 5 writers = ~12.5 writer-weeks
- Full V1 (380 lessons): ~2,550 hrs ÷ 5 writers = ~73 writer-weeks (~18 months)

### 6.2 Writing Batches

Write lessons in academy-sequential batches, not random order. Prerequisite lessons must be written before dependent ones — the KG chain enforces this.

| Batch | Lessons | Writers Needed | Duration |
|-------|---------|---------------|----------|
| Batch 1 | A1.C1 (12+ lessons) | 2 | 3 weeks |
| Batch 2 | A1.C2–C3 (24+ lessons) | 3 | 5 weeks |
| Batch 3 | A1.C4–C5 (24+ lessons) | 3 | 5 weeks |
| Batch 4 | A2.C1–C2 (24 lessons) | 3 | 5 weeks |
| Batch 5 | A2.C3–C5 (36 lessons) | 3 | 8 weeks |
| Batch 6 | A3.C1–C2 (32 lessons) | 4 | 6 weeks |
| Batch 7 | A3.C3–C5 (48 lessons) | 4 | 10 weeks |
| Batch 8 | A4/A5 (160 lessons) | 5 | 20 weeks |

### 6.3 Review Workflow

```
Writer produces lesson draft
        ↓
Tech review (SME validates accuracy — 2–4 hrs per lesson)
        ↓
Ethical review (required for all Ethical Content: true lessons — legal sign-off)
        ↓
KG compliance check (KG nodes cross-referenced, prerequisites verified)
        ↓
Accessibility review (lesson narrative checked against WCAG and Guardrail A1)
        ↓
Content Editor final approval
        ↓
→ Lesson marked "Approved" in production matrix
```

**Review bottleneck warning:** Ethical content lessons (A1.C3.M2.L4, A1.C5.M1.L3–L4, A1.C5.M2.L1, A2.C4 all lessons, A3.C4–C5 attacker-mindset lessons) require Security Reviewer sign-off. This is the single most likely production bottleneck. Queue these for review early — do not leave ethical content for last.

---

## SECTION 7 — DESIGN ROADMAP

### 7.1 Icon Set

~120 icons needed for the lesson engine section types, module thumbnails, career badges, certification logos, and UI navigation.

| Icon Category | Count | Format | Effort |
|--------------|-------|--------|--------|
| Section type icons (15 section types × 2 states) | 30 | SVG | 15 hrs |
| Career path badges (11 KG career paths) | 11 | SVG | 11 hrs |
| Certification logos (ITF+, Security+, Network+, Linux+, CCNA, etc.) | 12 | SVG | 6 hrs |
| Academy emblems (5 academies) | 5 | SVG | 10 hrs |
| Interactive component icons (14 components) | 14 | SVG | 7 hrs |
| Difficulty level indicators | 3 | SVG | 2 hrs |
| UI navigation icons | ~45 | SVG | 18 hrs |
| **Total** | **~120** | SVG | **~69 hrs** |

### 7.2 Illustrations

Original illustrative artwork for lesson hook and story sections. Recommended: 1 illustration per module (95 modules × 2 hrs = ~190 hrs).

**Priority illustrations for Academy 1 launch:**
- Security professional day-in-life scene
- Kill chain phase visual series (7 illustrations)
- CIA triad conceptual art
- Phishing email anatomy illustration
- Risk matrix infographic
- Defense-in-depth castle/layers metaphor

### 7.3 Infographics (Cheat Sheets)

1 infographic per module at module level = ~95 infographics × 3 hrs = ~285 hrs.

**Priority for Academy 1 launch:**
- OSI model quick reference
- TCP/IP ports cheat sheet
- Kill chain defender actions
- CIA triad with control examples
- Malware types at a glance
- Linux permissions quick reference (A3 first)

### 7.4 UI Assets

| Asset | Description | Effort |
|-------|-------------|--------|
| ComparisonTable component UI design | Column styles, highlight states, responsive layout | 8 hrs |
| ConceptFlashCards component UI design | Card face/back design, flip animation | 6 hrs |
| SubnetCalculatorWidget UI design | Step-by-step reveal layout, binary display | 10 hrs |
| Lesson progress indicators | Progress bar, completion states | 4 hrs |
| Academy completion certificates | Printable certificate design (5 academies) | 15 hrs |
| **Total** | — | **~43 hrs** |

---

## SECTION 8 — AI-ASSISTED PRODUCTION OPPORTUNITIES

AI can accelerate specific production tasks without compromising educational quality. The following are approved uses — all AI output requires expert human review before publication.

| Task | AI Role | Human Role | Risk Level |
|------|---------|-----------|-----------|
| Lesson narrative first draft | Draft from lesson metadata (KG nodes, objectives, skills) | Writer revises for accuracy, tone, pedagogical quality | Medium — factual errors possible; always review |
| Quiz question generation | Generate 10–15 draft questions per lesson from objectives | SME selects 5 and validates distractors | Medium — plausible-but-wrong distractors are a risk |
| Flashcard set generation | Generate term/definition pairs from lesson vocabulary | Tech writer reviews all definitions for precision | Low |
| Summary notes generation | Summarize approved lesson narrative | Writer reviews for completeness | Low |
| Animation storyboard draft | Generate frame descriptions from narrative | Animator reviews and edits before production | Low |
| Illustration concept briefs | Generate scene descriptions from narrative | Designer interprets; no AI-generated images in final product | Low |
| Module cheat sheet draft | Compile command/concept tables from lesson data | Tech writer reviews and formats | Low |
| Challenge exercise draft | Generate scenario problems from lesson objectives | SME validates solvability and rubric | High — scenario validity is critical |

**AI must NOT be used for:**
- Terminal simulation command verification (commands must be tested in real environment)
- Ethical content framing (requires human judgment and legal review)
- Legal and compliance information (CFAA, GDPR, HIPAA — factual accuracy is legally sensitive)
- Accessibility notes (requires human expertise in WCAG application)
- KG node assignments (Knowledge Graph mapping is a curriculum architecture decision)
- Final quiz question approval without SME review

---

## SECTION 9 — MVP CONTENT PLAN

### Classification

**Required:** Must exist at launch. Learner cannot progress without it.
**Important:** Significantly enhances learning; should be present at launch but launch is not blocked.
**Nice to Have:** Adds value but does not block completion or progression.
**Future:** Planned for post-launch; not needed for V1.

| Asset Type | Classification | Rationale |
|-----------|---------------|-----------|
| Lesson narrative (all 380 lessons) | **Required** | Lesson cannot exist without text |
| Quiz data sets (380 lessons) | **Required** | Assessment is mandatory per Constitution |
| InteractiveDiagram data (141 lessons) | **Required** | Listed as required in lesson metadata |
| ComparisonTable data (114 lessons) | **Required** | Listed as required; component must be built first |
| TerminalSimulator step sequences (150 lessons) | **Required** | Listed as required; A3 is non-functional without these |
| ConceptFlashCards data (48 lessons) | **Required** | Listed as required; component must be built first |
| SubnetCalculatorWidget scenarios | **Required** | A2.C1.M2.L2 is non-functional without it (KQI-E3 lesson) |
| Practical lab guides (380 labs) | **Required** | Every lesson has a practical |
| Capstone guides (25 capstones) | **Required** | Mastery gates depend on them |
| Summary notes (380 lessons) | **Important** | Supports learner retention; not blocking |
| Animations (~1,140 total) | **Important** for A1–A3; **Future** for A4/A5 | A1/A2 animations needed to avoid empty animation sections |
| Module cheat sheets (95 modules) | **Important** | High learner utility; not blocking for launch |
| Illustrations (~95 module artworks) | **Nice to Have** | Enhances engagement; not pedagogically required |
| Voiceover audio | **Future** | Accessibility enhancement; not in V1 scope |
| Downloadable PDFs (cheat sheets) | **Nice to Have** | Useful reference; lesson is functional without it |
| Academy completion certificates | **Nice to Have** | Motivational; not pedagogically required |
| A4/A5 curriculum documents | **Required for A4/A5** | Must exist before any A4/A5 content can be produced |

### Launch Minimum for Academy 1 (First Milestone)

The following must be complete before Academy 1 can open to learners:

1. `ComparisonTable` component built and exported
2. `ConceptFlashCards` component built and exported
3. All 80 A1 lesson narratives written and approved
4. All 80 A1 quiz data sets authored and SME-reviewed
5. All 80 A1 practical lab guides complete
6. 5 A1 course capstone guides complete
7. All A1 InteractiveDiagram data configs (approx 45 diagrams)
8. All A1 ConceptFlashCards sets (~18 sets)
9. All A1 ScenarioCard scripts (~18 sets)
10. At least 50% of A1 animations complete (remainder can follow in weeks 2–4 post-launch)

---

## SECTION 10 — PRODUCTION TIMELINE

### Phase 1 — Foundation (Weeks 1–4)

**Goal:** Engineering complete; Academy 1 content begins.

| Week | Engineering | Writing | Design | Animation |
|------|------------|---------|--------|-----------|
| 1 | Build ComparisonTable + ConceptFlashCards | A1.C1 narrative | Icon set begins | A1 storyboards |
| 2 | Build SubnetCalculatorWidget | A1.C2 narrative | Academy emblems | A1 animations batch 1 |
| 3 | Component integration testing | A1.C3 narrative | Cheat sheet template | A1 animations batch 2 |
| 4 | Content config pipeline tooling | A1.C4–C5 narrative | A1 illustrations | A1 animations batch 3 |

### Phase 2 — Academy 1 Production (Weeks 5–10)

**Goal:** Academy 1 complete. Internal testing begins.

| Task | Owner | Due |
|------|-------|-----|
| All 80 A1 lesson narratives approved | Writing team + SMEs | Week 8 |
| All 80 A1 quiz sets approved | SMEs | Week 9 |
| All 80 A1 InteractiveDiagram configs complete | Technical writers | Week 8 |
| 5 A1 capstone guides approved | SMEs | Week 10 |
| All A1 animations complete | Animation team | Week 10 |
| Academy 1 accessibility audit | Accessibility team | Week 10 |

### Phase 3 — Academy 2 and 3 Parallel Production (Weeks 11–22)

**Goal:** Academies 2 and 3 complete; A4/A5 curriculum documents generated.

| Task | Owner | Due |
|------|-------|-----|
| A2 lesson narratives (60 lessons) | Writing team | Week 16 |
| A3 lesson narratives (80 lessons) | Writing team | Week 18 |
| A2 TerminalSimulator configs | Technical writers | Week 17 |
| A3 TerminalSimulator configs (largest batch) | Technical writers | Week 20 |
| A2/A3 animations | Animation team | Week 22 |
| A4 curriculum document generated | Curriculum architect | Week 16 |
| A5 curriculum document generated | Curriculum architect | Week 18 |

### Phase 4 — Academy 4 and 5 Content (Weeks 23–38)

**Goal:** Full V1 content complete.

| Task | Owner | Due |
|------|-------|-----|
| A4 lesson narratives (80 lessons) | Writing team | Week 30 |
| A5 lesson narratives (80 lessons) | Writing team | Week 34 |
| A4/A5 component configs | Technical writers | Week 36 |
| A4/A5 animations | Animation team | Week 38 |

### Phase 5 — Quality and Polish (Weeks 35–42)

**Goal:** Full V1 audit and refinement.

| Task | Owner |
|------|-------|
| Full KG compliance audit (all 380 lessons vs. KG nodes) | Curriculum architect |
| Full accessibility audit (WCAG 2.2 AA for all components) | Accessibility specialist |
| Legal review of all ethical content lessons | Legal counsel |
| SME second-pass review of all advanced lessons | SMEs |
| End-to-end learner journey test (A1 → A5) | QA team |

### Phase 6 — V1 Launch Sequence (Weeks 40–44)

**Goal:** Staged rollout to minimize risk.

| Week | Milestone |
|------|-----------|
| Week 40 | Academy 1 opens to beta cohort |
| Week 41 | Academy 2 opens to beta cohort |
| Week 42 | Academy 3 opens to beta cohort |
| Week 43 | Academies 4–5 open to beta cohort |
| Week 44 | Full public launch |

---

## SECTION 11 — RISKS

### 11.1 Production Bottlenecks

| Risk | Severity | Likelihood | Mitigation |
|------|----------|------------|-----------|
| Animation team capacity — ~1,140 animations is 1–2 years of work for 2 animators | Critical | High | (1) Prioritize reusable animations first — 40 reusable animations replace 200+ unique ones. (2) Use Lottie/CSS for simple animations instead of full video production. (3) Phase animation delivery: text-only lesson sections launch first; animations added in post-launch updates. |
| Ethical content legal review queue — 30+ lessons require legal sign-off | High | Medium | Start ethical content review in Week 1 (parallel with writing). Do not leave for last. Batch ethical lessons for review efficiency. |
| TerminalSimulator content for A3 — 150 step sequences × 15 steps each = 2,250 steps to test and author | High | High | (1) Develop a CLI testing harness for batch-validating step sequences. (2) Hire a dedicated Linux technical writer. (3) Start A3 terminal content production in Week 8, not Week 11. |
| SME availability for 380-lesson review | Medium | High | (1) Train internal reviewers for beginner/intermediate content. (2) Reserve external SMEs for advanced and ethical content only. (3) Parallelize review across different academies. |
| A4/A5 curriculum document generation — required before content production starts | High | Medium | Generate A4 curriculum document as a parallel workstream starting Week 1, targeting Week 16 completion. A5 follows. |
| SubnetCalculatorWidget complexity — step-by-step reveal UI is the hardest part | Medium | Low | Front-load subnet math unit tests. If UI development overruns, launch A2.C1.M2.L2 with a simplified non-step version first and upgrade later. |

### 11.2 Review Bottlenecks

| Risk | Mitigation |
|------|-----------|
| Single SME becomes a bottleneck | Train 2 SMEs per domain; distribute review load across networking SME, Linux SME, security SME |
| KG compliance review takes time | Create a checklist tool that automatically cross-references lesson KG nodes against the KG document — reduces manual review time by ~60% |
| Accessibility review requires specialist skills | Engage an accessibility consultant for the component audit (one-time), then train writers to apply the checklist themselves per lesson |

### 11.3 Ways to Reduce Total Workload

| Strategy | Estimated Saving |
|---------|----------------|
| Reuse animations across lessons — 40 core animations cover ~200 lesson references | Saves ~600 hrs of animation production |
| Use AI-assisted first drafts with SME review (Section 8) | Saves ~40% of writing time (~1,020 hrs) |
| Produce cheat sheets at module level (not lesson level) | Reduces cheat sheet count from 380 to 95 — saves ~1,000 hrs design |
| Use the existing ReflectionCard and Callout components (no authoring overhead) | Zero new component work for 570 lesson uses |
| Phase animation delivery — launch without animations, add in the first 4 weeks post-launch | Decouples critical path; allows Academy 1 to launch 8–10 weeks sooner |
| Batch TerminalSimulator configs by command family (same commands appear in multiple lessons) | Reduces unique test environments from ~150 to ~30 |

---

## SECTION 12 — FINAL RECOMMENDATIONS

### Recommendation 1: Decouple animations from the launch critical path.

Animations are the largest single workload (~3,700 hours). The lesson engine renders an empty animation section gracefully if animation data is absent. Launch with complete text, quizzes, and interactive components — add animations in the 4 weeks following each academy launch. This reduces the Academy 1 critical path by 8–10 weeks.

### Recommendation 2: Build the 3 missing components before any other development work.

`ComparisonTable` appears in 114 lessons. Every day it is missing is a day 114 lessons cannot be written and tested. Build it in Week 1. `ConceptFlashCards` (48 lessons) and `SubnetCalculatorWidget` (6 lessons, but pedagogically critical) follow immediately.

### Recommendation 3: Invest in reusable animation architecture early.

The 40 highest-reuse animations (OSI model, kill chain, TCP handshake, DNS resolution, filesystem hierarchy, iptables chain, process lifecycle) appear collectively in over 200 lessons. Produce these 40 first. They serve as templates for the less reusable ones that follow, and allow lesson content to be functional immediately for the highest-traffic concepts.

### Recommendation 4: Generate A4 and A5 curriculum documents in parallel with A1 content production.

The A4 and A5 curriculum documents are the prerequisite for all A4/A5 content work. Starting curriculum generation in Week 1 means A4 content production can begin in Week 16 instead of Week 23 — saving 7 weeks off the V1 timeline. Use the same Academy 2 and 3 formats as templates.

### Recommendation 5: Hire a dedicated Linux technical writer for Academy 3.

Academy 3 has 80 lessons with TerminalSimulator step sequences. The terminal content is more complex to author and test than any other content type — each step requires a working command, realistic output, and explanation text. A single writer who knows Linux deeply can handle A3 terminal content more efficiently than two generalist writers splitting the load.

### Recommendation 6: Use AI-assisted drafting with SME review as the standard writing workflow.

An AI-drafted first lesson (from metadata) takes a writer 30–60 minutes to review and revise vs. 4–7 hours to write from scratch. Across 380 lessons, this represents approximately 1,020 hours saved — equivalent to hiring an additional writer for 6 months. The quality gate is the SME review, not the origin of the draft.

### Recommendation 7: Prioritize ethical content review from day one.

Thirty or more lessons carry `Ethical Content: true` and require Security Reviewer sign-off. These lessons are not optional — they teach learners where the legal and ethical lines are. If they are wrong, Cyber Learn has a liability problem. Queue them for legal review in Week 1 even before the narratives are complete — getting the reviewer relationship established and the review process documented early prevents a last-minute bottleneck in Week 8.

### Recommendation 8: Track every lesson in the production matrix.

This document's Section 3 matrix should be transferred to a project management tool (Linear, Notion, or GitHub Projects) where each lesson becomes a trackable issue. Status transitions — Not Started → In Writing → Draft Complete → In Review → Approved → Published — should be automatic signals for the next owner in the review chain. Manual status updates in a markdown file will not scale to 380 lessons.
