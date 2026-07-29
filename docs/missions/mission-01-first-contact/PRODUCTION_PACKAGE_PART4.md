# OPERATION: FIRST CONTACT — COMPLETE PRODUCTION PACKAGE
## Part 4 of 4 — Sections 13, 14, 15, 16, 17, 18

---

# SECTION 13 — LEARNING DESIGN

Exactly where each learning objective is introduced, reinforced, tested, and made memorable.

---

## LEARNING OBJECTIVE 1
**"Define cybersecurity as the protection of systems, networks, and data from digital attacks."**

| Phase | Time | Vehicle | Method |
|-------|------|---------|--------|
| Introduction | 2:35 | ARIA Dialogue (Lines 7–9) | Narrative — ARIA describes real organizations under attack |
| Reinforcement | 11:47 | Debrief (Line D3–D5) | ARIA explains what the phishing attack could have caused |
| Test | Scene 3 | Threat identification | Learner must recognize a real attack in a real-looking context |
| Memorable moment | 12:19 | Debrief (Line D5-D6) | The damage chain — learner visualizes what "lateral movement" actually means |

**Why this sequence works:**

The objective is introduced through stakes, not definition. ARIA never says "cybersecurity is defined as..." She says "hospitals. Power grids. Banks." The definition emerges from context — from what happens when these systems fail. This is not academic priming; it's emotional priming. The emotional encoding makes retention significantly stronger than rote definition.

The test (Scene 3) happens under mild pressure — the anomaly is real, ARIA is watching. The test is authentic, not pedagogical. Learners don't think "this is testing me on objective 1" — they think "I have a job to do." This is the key distinction between meaningful assessment and performative assessment.

The memorable moment comes in the debrief: the attack chain visualization. Seeing the five-step progression from one email to account compromise is the moment the abstract concept of cybersecurity becomes viscerally concrete. Learners who see this will remember it because it was alarming in a proportionate, real way — not hyperbolically ("hackers will destroy everything!") but accurately ("one phishing email, and here is what could happen, step by step").

---

## LEARNING OBJECTIVE 2
**"Explain the CIA Triad — Confidentiality, Integrity, Availability."**

| Phase | Time | Vehicle | Method |
|-------|------|---------|--------|
| Introduction (visual) | 3:30 | Icon cards activate on left monitor | Visual priming — three distinct icons, three distinct colors |
| Introduction (verbal) | 3:30 | ARIA Dialogue (Lines 14–21) | ARIA defines each concept in plain language |
| First reinforcement | 5:00 | CIA Quiz (Scene 2.5) | Active application — learner assigns concepts to scenarios |
| Second reinforcement | 10:00 | Incident Report (Scene 4, Section 2) | Learner selects which CIA pillar the threat targeted |
| Third reinforcement | 12:30 | Debrief (Line D7) | ARIA connects the phishing attack to the Confidentiality pillar |
| Badge anchoring | 5:50 | CIA Triad badge in HUD | Visual reminder persists in HUD for the rest of the mission |

**Why five passes in 22 minutes:**

Cognitive science (Ebbinghaus forgetting curve, spacing effect) is clear: spaced repetition across multiple contexts dramatically improves retention over a single clear explanation. But this mission can't wait for days between repetitions. So instead, it creates *context variation* within a single session: verbal introduction → visual quiz → form application → verbal debrief → persistent HUD reminder. Each encounter approaches the CIA Triad from a different angle, each one slightly deeper than the last.

The CIA quiz specifically uses **active application** (not recognition). Dragging the Confidentiality icon to "hospital records accessed by unauthorized contractor" requires the learner to construct the meaning of the concept, not just recognize a definition. Construction is more durable than recognition.

ARIA's line "That tension is the job" (Line 21) is the single most important learning moment for this objective — because it reframes the CIA Triad from a definition to a lived complexity. This sets up everything in the curriculum that follows. Every future lesson where learners must trade off security vs. availability, or integrity vs. confidentiality, will be more meaningful because this seed was planted here.

---

## LEARNING OBJECTIVE 3
**"Recognize that cyber threats are real, continuous, and human-originated."**

| Phase | Time | Vehicle | Method |
|-------|------|---------|--------|
| Introduction | 0:28 | SOC ambient ticker | Environmental — the incident counter ticking upward in the background |
| Introduction (explicit) | 2:35 | ARIA Lines 7–9 | Verbal — "thousands of attacks, every day" |
| Reinforcement | 6:30 | Terminal log | Experiential — scrolling through what looks like actual log output |
| Deep reinforcement | 11:57 | Debrief Line D5 | Humanizing: "If Analyst Chen had clicked that link" — the threat is a person, the target is a person |
| Memorable moment | 13:30 | Debrief Line D6 | "They wait. They learn." — the attacker is patient, human, strategic |

**Why "a real person" is the critical framing:**

The greatest barrier to cybersecurity learning is the abstraction of the threat. "Hackers" are a myth — a symbol. "A real person is trying to hurt real people" destroys the abstraction. It introduces the uncomfortable truth that the other side of every attack is a human being making deliberate choices. This is harder to intellectually distance from. It is also, pedagogically, more accurate.

The terminal log's authenticity is essential to this objective. The log looks real because it IS formatted exactly like a real security log. The IP addresses are formatted like real IPs. The timestamps are precise. The authorized penetration test entry (Entry 4) is there specifically because real SOC environments contain authorized scans — making the learner's task more realistic, not just more difficult.

---

## LEARNING OBJECTIVE 4
**"Identify the structural markers of a phishing email."**

| Phase | Time | Vehicle | Method |
|-------|------|---------|--------|
| Introduction | 9:00 | Terminal Entry 3 expansion | Discovery — learner reads the email entry and sees the `[!]` markers |
| Testing | 9:00–9:45 | Threat flagging decision | Learner must identify this entry as the threat (not just read it) |
| Reinforcement | 11:47 | Debrief Lines D3–D4 | ARIA names each marker explicitly |
| Deep encoding | 11:47 | Domain comparison visualization | Visual — `sentinel.net` vs `sent1nel.net` side by side |
| Conceptual frame | 12:00 | Debrief Line D4 | "The human brain pattern-matches and fills in what it expects to see" — cognitive explanation |

**The four phishing markers taught:**

1. **Domain spoofing:** `sent1nel.net` ≠ `sentinel.net` (1 character changed)
2. **Urgency language:** "verify within 30 minutes or your access will be suspended"
3. **External link:** Link goes to a non-approved external domain
4. **Known bad infrastructure:** Sender IP matches known phishing campaign infrastructure

These four markers are explicitly labeled in the terminal entry (`[!]` indicators) and reviewed in the debrief. They are real markers used in real phishing detection. Learners who encounter real phishing emails after this mission will have a framework.

---

## LEARNING OBJECTIVE 5
**"Claim their own identity as a future cybersecurity professional."**

This is the most important objective and the least visible one.

| Phase | Time | Vehicle | Method |
|-------|------|---------|--------|
| Introduction | 0:03 | Boot sequence | Address: "WELCOME, ANALYST" — learner is called by role before anything else |
| Reinforcement 1 | 2:03 | ARIA Line 1 | "Analyst. You're on time." — role confirmed by the relationship |
| Reinforcement 2 | 2:58 | ARIA Line 10 | "You're going to become one of those people." — belonging projected |
| Reinforcement 3 | 5:30 | Post-quiz line | "Faster than most first-day analysts" — comparative framing, learner is IN the analyst population |
| Test | Scene 3 | The task itself | Learner performs analyst work — actively NOT as a learner but as a practitioner |
| Identity crystallization | 15:00 | Analyst ID Card + "You're one of us now" | The ceremony is the learning |

**Why this is the most important objective:**

Self-Determination Theory (Deci & Ryan) and identity-based motivation research are consistent: people who identify AS a thing (rather than learning ABOUT a thing) are dramatically more persistent, more resilient to failure, and more intrinsically motivated. A learner who thinks "I am a cybersecurity professional developing skills" will outperform a learner who thinks "I am taking a cybersecurity course" in every measurable outcome.

The Analyst ID Card is not decoration. It is a concrete identity artifact. It has the learner's name on it. It has a date. It has an ID number that is uniquely theirs. Holding (or seeing) a credential — even a digital one — activates the same psychological ownership mechanisms as a physical credential.

ARIA's "I'll be right here" (Line 28) contributes to this objective: belonging is not just about the learner's role, but about having a relationship within the community. ARIA is the learner's first SENTINEL relationship. She matters.

---

# SECTION 14 — ACHIEVEMENT SYSTEM

---

## VISIBLE ACHIEVEMENTS

### ACH-001: First Responder
- **Trigger:** Mission 1 completed for the first time
- **Description:** "You answered the call on day one."
- **Badge:** Bronze hexagon with a pulse-wave icon
- **XP value:** 0 (completion XP is separate)
- **Display:** Shown in learner profile, mission history, and the Mission 1 card in all future views
- **Rarity:** Everyone earns this. Its value is that it marks a beginning.

### ACH-002: Sharp Eyes
- **Trigger:** Correctly identify the threat in Scene 3 without ANY hint triggering
- **Conditions:** No hint animation played; Entry 3 not highlighted; no "look more carefully" ARIA line triggered
- **Description:** "You spotted what most people miss. Keep that instinct sharp."
- **Badge:** Silver magnifying glass icon with a small [!] inside the lens
- **XP contribution:** +100 XP toward mission total
- **How to NOT earn it:** Any hint trigger (90-second ambient pulse, 120-second border pulse, or any incorrect flag) disqualifies

### ACH-003: Question Everything
- **Trigger:** Expand all 5 expandable log entries before submitting the "Flag This Entry" confirmation
- **Conditions:** Entries 1, 2, 3, 4, and 5 must all have been expanded (accordion open state) at least once before the "Confirm Threat Identification" confirmation is accepted
- **Description:** "You didn't guess. You looked at everything. That's the difference between instinct and process."
- **Badge:** Bronze icon: five horizontal lines with dots (representing a list being checked)
- **XP contribution:** +50 XP toward mission total

---

## HIDDEN ACHIEVEMENTS

### ACH-H01: The Silent Read
- **Trigger:** Spend 30+ continuous seconds viewing ARIA's waveform before she first speaks (during the 0.5-second pre-speech pause — the timer starts when the waveform fully materializes and stops when ARIA begins Line 1)
- **How:** The 0.5-second wait before ARIA's first line is not enough. The learner must deliberately not interact (click to skip) for 30+ seconds.
- **This means:** The only way to trigger this is if the learner just... watches ARIA for a long time before anything happens. Which means: reading mode enabled, or genuinely sitting with the moment.
- **Description:** "You took your time. You looked before you listened. In this field, that patience is rare."
- **Badge:** Purple circle with a single eye-node (ARIA's eye graphic)
- **Reveal:** Announced at mission complete with a special "Hidden Achievement Unlocked" animation (purple glow, different entrance than visible achievements)
- **XP:** No direct XP. But the achievement reveals a hidden fact about ARIA in a small tooltip: "ARIA has been operational for 3 years, 4 months. She says she prefers the night shift."

### ACH-H02: Archivist
- **Trigger:** Discover all 3 easter eggs embedded in the mission
  1. Click `185.234.218.114` within Entry 3's expanded content → IP geo-trace panel opens
  2. Mouse over `sent1nel.net` domain link in the debrief visualization (Scene 4) → domain registration date tooltip reveals "Registered 3 days ago"
  3. Click `m.chen@sentinel.org` within Entry 3's expanded content → Maya Chen micro-profile panel opens
- **Description:** "You found details that weren't marked. You went looking. That's the mindset."
- **Badge:** Purple magnifying glass over a document
- **Note:** Easter eggs 2 and 3 require the learner to have done something active in two different scenes, so this achievement cannot be earned entirely in Scene 3

### ACH-H03: Gut Check
- **Trigger:** Correctly identify the threat (Entry 3) AND flag it as the threat on the first attempt AND the time from Scene 3 start to confirmation is < 60 seconds
- **Description:** "Fast and right. Some analysis is intuition, trained so thoroughly it becomes instant. You got there."
- **Badge:** Purple lightning bolt
- **Note:** This achievement acknowledges that rapid, accurate threat identification is a real skill — not just patience. The 60-second window is achievable if the learner reads the `[!]` indicators and doesn't linger.

### ACH-H04: Back Again (Replay Only)
- **Trigger:** Completing Mission 1 a second time
- **Description:** "The best analysts review everything twice. Now you're one of them."
- **Badge:** Purple refresh/cycle icon with "×2" notation
- **Only appears:** On replay runs. Cannot be earned on first playthrough.

---

## REPLAY ACHIEVEMENTS

One new achievement is ONLY available on replay runs:

### ACH-R01: Different Eyes
- **Trigger (Replay):** On replay, the phishing email has a different spoofed domain. Learner must correctly identify the threat despite the variant.
- **Conditions:** Available only if the new domain variant is different from first playthrough. Achieved by correct identification without hints.
- **Description:** "The attack looked different this time. You still found it. That's pattern recognition, not luck."
- **Badge:** Bronze eyes with an "II" (two) mark

---

## EXPLORATION REWARDS (Non-achievement)

These do not show as achievements but provide micro-rewards:

| Discovery | Reward |
|-----------|--------|
| Reading the Analyst ID card back face | Learner sees the SENTINEL motto for the first time — no XP, just world-building |
| Hovering over UTC clock in SOC (Scene 1) | Tooltip appears: "SENTINEL operates 24/7, 365 days. This clock never stops." |
| Clicking the coffee mug visible on the desk | A subtle tooltip: "Cold. Whoever sat here before you left in a hurry." |
| Reading the HVAC vent label in SOC background (very small text in the illustration) | Reveals "SENTINEL — Air Systems — Authorized Personnel Only" — micro world-building |

---

## NARRATIVE REWARDS

These are story moments that feel like rewards through their emotional content:

- **ARIA's "I'll be right here":** The learner earns this moment by completing the CIA quiz successfully. ARIA only says this line after confirming they're ready.
- **"You found it.":** Two words. The learner earns these by doing the actual work. They cannot be given without being deserved.
- **Maya Chen's micro-profile:** A small piece of world-building that rewards curiosity. Maya Chen will reappear in the curriculum.

---

# SECTION 15 — QA CHECKLIST

---

## SCENE-BY-SCENE QA

### Scene 0 — Boot Sequence

- [ ] Character cascade starts exactly at 0:03 (no earlier — pure black must exist for 3 seconds)
- [ ] Character colors are `#00D9FF` — verify not green, not white
- [ ] Line 1 begins resolving at 0:08
- [ ] `ANALYST` on Line 4 changes to `#00FF87` and then white-out plays at 0:27
- [ ] White-out transition does not flash or stutter on any tested device
- [ ] Skip triggers correctly (Escape key, 1.5s Space hold) after 0:10 only
- [ ] Skip before 0:10 does nothing
- [ ] Screen reader announces the correct text at 0:24
- [ ] Reduced motion shows sequential line fades (verify each line fades in at correct interval)
- [ ] No console errors during Scene 0

### Scene 1 — SOC

- [ ] SOC environment renders at 60fps on reference device (MacBook M1, 2021)
- [ ] Camera crane animation is smooth (no jitter)
- [ ] SOC camera movement does not cause nausea — test with 5 people including motion-sensitive users
- [ ] Analyst silhouettes visible and animate correctly (breathing animation)
- [ ] Server room LED blink pattern is correct (mostly green, occasional amber)
- [ ] Chair push-in plays at correct timing (27s into scene)
- [ ] Chair animation uses spring physics — verify slight overshoot visible
- [ ] Monitor flicker plays at 42s — verify three-frame pattern
- [ ] Terminal text types at 60ms per character — time it
- [ ] Left monitor (PacketFlow) activates at 62s
- [ ] Right monitor activates 800ms after left
- [ ] Skip transitions cleanly to Scene 2 with no leftover animations playing
- [ ] SOC ambient audio plays during this scene at specified levels
- [ ] Keyboard ambient sounds play sporadically (not on a fixed interval)
- [ ] Screen reader announces environment description at 1:00

### Scene 2 — ARIA Introduction

- [ ] ARIA waveform materializes over 3 seconds — test Phase 1, 2, 3 are distinguishable
- [ ] ARIA's 4-note theme plays at materialization — timing is correct
- [ ] Eye nodes appear last during materialization
- [ ] All 25 dialogue lines play in correct order
- [ ] Click-to-advance works for all lines
- [ ] Auto-advance after 2.5 seconds of silence works (test with no interaction)
- [ ] Reading mode toggle: auto-advance disabled when ON
- [ ] Dialogue transcript scrolls to latest line automatically
- [ ] Previous lines display in muted color correctly
- [ ] Advance indicator (cursor blink) appears at end of each line when waiting — does NOT appear while voice is playing
- [ ] CIA icon cards slide in at correct timing (at Line 13)
- [ ] Cards slide in staggered 300ms apart — verify stagger
- [ ] Hover tooltip appears after 500ms hover delay (not immediately)
- [ ] Tooltip content is correct for all 3 icons
- [ ] Tooltip does NOT appear on cursor pass-through (must hover 500ms)
- [ ] Click on icon plays scale + ripple animation
- [ ] Camera push-in at Line 7 (2:55) is imperceptible consciously
- [ ] ARIA's waveform emotional states match dialogue content — verify at lines: 10, 21, 24, 26, 28

### Scene 2.5 — CIA Quiz

- [ ] Quiz activates after Line 22 ("let's see if you already understand them")
- [ ] All 3 scenario cards slide in staggered 150ms apart from the left
- [ ] Card text is readable on all tested viewports
- [ ] Drag and drop works: pick up, drag, valid drop, invalid drop, drop to invalid area (returns to panel)
- [ ] Tap-to-select works on mobile: select icon → select drop zone → successful assignment
- [ ] Keyboard: Tab to icon, Space to pick up, Arrow to navigate cards, Space to drop
- [ ] All focus states visible (2px cyan ring)
- [ ] Correct drop: lock sound plays, checkmark appears, card fills with color
- [ ] Incorrect drop: red pulse plays, card springs back, no sound except rejection tone
- [ ] All 3 correct: badge collection animation plays (compression → merge → flight → HUD landing)
- [ ] Particle burst at HUD landing: 6 particles, correct colors
- [ ] HUD XP increments +50 XP after badge lands
- [ ] After quiz: ARIA resumes with Line 23 ("Good.")
- [ ] ARIA hint dialogue triggers correctly: 1 wrong → silent retry; 2 wrong → target hint; 3 wrong → explicit hint
- [ ] Quiz card layout on xs viewport (< 480px): stacks vertically, touch targets ≥ 44px
- [ ] Color-blind mode: icon cards have text labels, not color-only differentiation
- [ ] Screen reader: all cards have correct ARIA labels; correct/incorrect states announced

### Scene 3 — Terminal

- [ ] Full-screen terminal transition plays correctly (camera push + ARIA overlay fade)
- [ ] Terminal background is exactly `#08080F`
- [ ] All 8 log entries are visible in the terminal (may need scroll on small screens)
- [ ] `LIVE ●` indicator blinks at correct rate
- [ ] Hover state: left border `#00D9FF`, background lightens — verify 150ms transition
- [ ] Each of the 5 expandable entries expands on click — accordion 300ms
- [ ] Chevron rotates 90° on expand
- [ ] All 5 expansion contents display correctly (check all field labels, data, formatting)
- [ ] Entry 3 `[!]` indicators are all visible and formatted correctly
- [ ] Entry 3 clickable elements (IP, email, domain) work and show correct content
- [ ] "Submit Finding" button appears after 3 entries expanded — verify timing
- [ ] Submit button appears with fade-in animation (not instant)
- [ ] Submit button hover: glow effect correct
- [ ] "Flag This Entry" button appears within Entry 3 when expanded
- [ ] Clicking "Flag This Entry" opens confirmation overlay correctly
- [ ] Confirmation overlay: backdrop dims correctly, dialog slides in
- [ ] Focus trapped in confirmation dialog
- [ ] Escape closes confirmation dialog, focus returns to "Flag This Entry" button
- [ ] Confirm → Scene 4 begins correctly
- [ ] Wrong flag: amber flash on incorrect entry, ARIA speaks (correct line), `✓ LEGITIMATE` marker appears
- [ ] Hint system: 90-second no-interaction → ARIA panel brightens and pulses
- [ ] Hint system: 120-second no-Entry-3-expansion → Entry 3 border pulse (3 pulses, then fades)
- [ ] Hint pulse does NOT repeat after the first time
- [ ] ARIA mini-panel visible throughout Scene 3 in bottom-right corner
- [ ] ARIA hint dialogue only plays from mini-panel position (not full display)
- [ ] Easter egg 1 (IP click) works and shows geo-trace panel
- [ ] Easter egg 3 (email name click) works and shows Maya Chen profile
- [ ] Archivist achievement progress tracked correctly for eggs 1 and 3
- [ ] Terminal is fully keyboard navigable (arrow keys, enter, space, escape)
- [ ] Screen reader: table structure correct, expandable entries announce correctly
- [ ] Color-blind mode: all `[!]` indicators have text prefix, not color-only

### Scene 4 — Incident Report

- [ ] Form slides in from right (400ms, correct easing)
- [ ] Terminal slides out to left simultaneously
- [ ] Report header auto-fills: analyst name, date, time, incident ID — all correct
- [ ] `● HIGH` indicator pulses once on entry
- [ ] Section 1 dropdown: all options listed, correct placeholder text
- [ ] Section 1: selecting "Phishing Attack" shows green left border
- [ ] Section 1: selecting any other option: no immediate error (debrief handles it)
- [ ] Section 2: three checkbox cards render correctly in a row
- [ ] Section 2: clicking a card toggles its checked state
- [ ] Section 2: checked state shows correct visual (color fill, green checkbox)
- [ ] Section 3: textarea functions (type, scroll, character count updates)
- [ ] Section 3: character count shows at bottom right
- [ ] Section 3: at 50 characters, counter briefly turns green
- [ ] Section 3: ARIA mini-panel waveform pulses upward at 50-char milestone
- [ ] Section 3: cannot type past 280 characters
- [ ] Section 4 dropdown: all options listed, correct
- [ ] "FILE REPORT" button: disabled state (opacity 0.35) when Sections 1, 2, 4 incomplete
- [ ] "FILE REPORT" button: available after all 3 required sections filled
- [ ] Button click: loading state shows correctly (spinner + "FILING REPORT...")
- [ ] After 800ms: debrief begins
- [ ] ARIA panel expands correctly (to 45% width, spring animation)
- [ ] Form compresses to 55% correctly
- [ ] All debrief lines play in correct order with correct timing
- [ ] Attack chain animation: 5 nodes, correct colors, connector dots travel between nodes
- [ ] Domain comparison visualization: shows `sentinel.net` vs `sent1nel.net`, `i` and `1` color-coded
- [ ] "Analyst Chen has been alerted" checklist: 3 items check off as ARIA speaks
- [ ] Post-debrief: Scene 5 begins
- [ ] Incident report form: keyboard navigable (Tab order: S1 → S2 → S3 → S4 → Submit)
- [ ] Form dropdowns: keyboard accessible, arrow keys work
- [ ] Screen reader: all fieldsets have legends, correct states announced

### Scene 5 — Mission Complete

- [ ] SOC pull-back plays correctly
- [ ] Global threat map on display wall has one fewer active incident dot
- [ ] ARIA's closing lines play in correct order
- [ ] Analyst ID card materializes correctly (spring scale-up from center)
- [ ] ID card shows correct learner name
- [ ] ID card flip animation: front → back → front, back visible for ~600ms
- [ ] Holographic shimmer plays after card settles
- [ ] Card travels to HUD correctly (arc trajectory, scales down)
- [ ] HUD shows analyst ID badge after card lands
- [ ] XP panel slides up from bottom
- [ ] XP counter animates 0 → [total] with ease-out (slows near end)
- [ ] Bonus lines appear sequentially with 500ms stagger
- [ ] Level progress bar fills with gradient
- [ ] Achievement cards appear staggered with 700ms between each
- [ ] Hidden achievements have different entrance animation (scale from center)
- [ ] All earned achievements display correctly (verify against test run's actions)
- [ ] NO achievement appears that was not earned
- [ ] Path forward cards render correctly (Mission 2 highlighted, 3–5 blurred)
- [ ] Mission 2 card click navigates correctly
- [ ] Locked card hover shows tooltip
- [ ] ARIA final line plays if learner hasn't clicked Mission 2 after 15 seconds
- [ ] ARIA waveform dims over 8 seconds after final line
- [ ] Reduced motion: ID card flip replaced by front/back/front fade sequence

---

## DEVICE AND VIEWPORT QA

- [ ] Desktop Chrome (latest) — 1440×900
- [ ] Desktop Firefox (latest) — 1440×900
- [ ] Desktop Safari (latest) — 1440×900
- [ ] Mobile Safari — iPhone 14 (390×844)
- [ ] Mobile Chrome — Android mid-range (360×800)
- [ ] Tablet Safari — iPad Air (820×1180)
- [ ] Large desktop — 2560×1440 (verify content max-width constraint)
- [ ] Small laptop — 1024×768 (verify nothing breaks)

---

## ACCESSIBILITY QA

- [ ] Tab through entire mission using keyboard only — no interaction point missed
- [ ] Screen reader test (NVDA + Chrome on Windows, VoiceOver + Safari on Mac): all meaningful content announced
- [ ] All images/SVGs have correct `alt` or `aria-label`
- [ ] All interactive elements reachable via keyboard
- [ ] Focus rings visible on ALL interactive elements in default mode
- [ ] Color-blind mode: no information conveyed by color alone (verified with 3 types: deuteranopia, protanopia, tritanopia simulators)
- [ ] Reduced motion: enable `prefers-reduced-motion: reduce` in OS settings, complete full mission — verify no animations that weren't in the reduced motion spec play
- [ ] Dyslexia font mode: toggle and verify font changes throughout, no layout breaks
- [ ] High contrast: verify readability with browser high contrast mode
- [ ] Captions: verify sync < 50ms, all dialogue covered
- [ ] Zoom: mission at 150% browser zoom — verify no content clipping, no horizontal scroll
- [ ] Minimum font size: verify all text ≥ 11px at 100% zoom
- [ ] Contrast ratios: verify all text meets WCAG AA (4.5:1 for normal, 3:1 for large)

---

## AUDIO QA

- [ ] All voice lines play in the correct order
- [ ] No audible gaps or stutters in voice playback
- [ ] Music layers duck correctly when ARIA speaks (verify with audio analyzer)
- [ ] "The Quiet" (9:30): music genuinely drops to near-silence — verify with headphones
- [ ] Alert tone plays at 5:45 — correct timing
- [ ] ARIA's 4-note theme plays at 2:00 — correct timing and pitch
- [ ] Full chord resolution plays at 15:00 in Scene 5
- [ ] All UI SFX play at correct triggers
- [ ] No sounds play when they shouldn't (verify no audio bleed between scenes)
- [ ] Mission runs without audio errors with network throttled to 3G
- [ ] Audio fails gracefully if file fails to load (caption auto-activates, no error shown)
- [ ] Volume levels verified on reference headphones (Sony WH-1000XM4) and built-in laptop speakers

---

## EDGE CASES

- [ ] User reloads page mid-mission: "Resume?" overlay appears
- [ ] User navigates away and returns: save state loads correctly
- [ ] User completes mission, reloads: shown replay option, not re-shown "Resume?"
- [ ] User completes mission a second time: replay achievements awarded correctly
- [ ] User earns 0 bonus XP: panel shows only base XP, no empty bonus rows
- [ ] User earns all bonus XP: panel shows all 4 bonus rows correctly
- [ ] User's name contains special characters: Analyst ID card renders correctly
- [ ] Very long username (30+ chars): name truncates with ellipsis in HUD, shows in full on ID card
- [ ] Mission on device with no local storage: graceful fallback (no "Resume?" prompt, mission starts fresh each time, show a small notice)
- [ ] Low-power mode / background tab: verify mission does not crash when returning to foreground

---

# SECTION 16 — DEVELOPER CHECKLIST

Implementation order and dependencies.

---

## PHASE 1: FOUNDATION (Week 1)

- [ ] **1.1** Set up mission route: `/courses/academy-1/missions/first-contact`
- [ ] **1.2** Create `MissionState` Zustand store (extend `useLessonStore` or create `useMissionStore`)
- [ ] **1.3** Implement mission state machine (state transitions, event dispatch)
- [ ] **1.4** Create `localStorage` save state persistence with resume logic
- [ ] **1.5** Implement HUD component with XP display, breadcrumb, reading mode toggle
- [ ] **1.6** Stub all 5 scenes as empty components to establish routing flow
- [ ] **1.7** Verify scene transitions render without errors

**Dependencies:** None. This is the foundation.  
**Risk:** State machine design — get a second pair of eyes on the transitions before implementing.

---

## PHASE 2: SCENES 0 AND 1 (Week 1–2)

- [ ] **2.1** Implement `<BootSequence>` component (canvas cascade, text resolver, white-out)
- [ ] **2.2** Create SOC environment as layered 2D composition (SVG layers)
- [ ] **2.3** Integrate `PacketFlowVisualizer` (existing component) in left monitor at low detail
- [ ] **2.4** Build world threat map (SVG with animated dots)
- [ ] **2.5** Implement camera animations (CSS perspective transforms)
- [ ] **2.6** Implement chair push-in animation (spring)
- [ ] **2.7** Implement monitor flicker and activation sequences
- [ ] **2.8** Wire skip behavior for both scenes

**Dependencies:** 1.6 (scene stubs exist)  
**Risk:** SOC environment performance — profile canvas and SVG rendering early. If fps < 45 on mid-range mobile, simplify the threat map dot count.

---

## PHASE 3: ARIA AND CIA QUIZ (Week 2–3)

- [ ] **3.1** Build `<ARIAWaveform>` canvas component (3-layer sine waves, eye nodes, color states, emotional state API)
- [ ] **3.2** Build `<ARIADisplay>` panel component (waveform + dialogue transcript)
- [ ] **3.3** Implement dialogue system: voice file loading, playback, advance-on-click, auto-advance timer
- [ ] **3.4** Create reading mode toggle (disables auto-advance)
- [ ] **3.5** Build CIA icon cards (SVG icons, hover states, tooltips)
- [ ] **3.6** Implement CIA quiz drag-and-drop (desktop)
- [ ] **3.7** Implement CIA quiz tap-to-select (mobile fallback)
- [ ] **3.8** Implement CIA quiz keyboard navigation
- [ ] **3.9** Build badge collection animation (compression + flight + HUD landing)
- [ ] **3.10** Wire ARIA emotional state changes to dialogue timing
- [ ] **3.11** Load voice audio files and verify playback on all tested browsers

**Dependencies:** 2.* (SOC environment exists)  
**Risk:** ARIA waveform performance (60fps canvas) — must profile on low-end Android. If 60fps not achievable, implement 30fps fallback with no user-visible quality loss.

---

## PHASE 4: TERMINAL (Week 3–4)

- [ ] **4.1** Build terminal container with header and log entry list
- [ ] **4.2** Implement log entry accordion component (expand/collapse, chevron rotation)
- [ ] **4.3** Populate all 8 log entries with correct content
- [ ] **4.4** Implement hover states for all entries
- [ ] **4.5** Implement Entry 3 special behavior (discovery flash, "Flag This Entry" button)
- [ ] **4.6** Build confirmation overlay (backdrop + dialog, focus trap)
- [ ] **4.7** Implement "Submit Finding" button with 3-entry reveal condition
- [ ] **4.8** Implement wrong flag handling (amber flash, ARIA line, legitimate marker)
- [ ] **4.9** Implement 90-second hint (ARIA panel brightens + pulses)
- [ ] **4.10** Implement 120-second hint (Entry 3 border pulse, 3× only)
- [ ] **4.11** Build ARIA mini-panel for Scene 3
- [ ] **4.12** Implement easter eggs 1 and 3 (IP click panel, email name click panel)
- [ ] **4.13** Wire Archivist achievement progress
- [ ] **4.14** Implement full keyboard navigation for terminal

**Dependencies:** 3.* (ARIA component exists for mini-panel)  
**Risk:** Hint timing — the 90-second and 120-second timers must pause when the user is idle in a paused state. Ensure the timer uses mission time (active), not wall-clock time.

---

## PHASE 5: INCIDENT REPORT AND DEBRIEF (Week 4)

- [ ] **5.1** Build incident report form component (all 4 sections)
- [ ] **5.2** Implement form validation (required sections check for submit button enablement)
- [ ] **5.3** Implement correct/incorrect selection visual feedback
- [ ] **5.4** Implement Section 3 textarea with character count and 50-char milestone
- [ ] **5.5** Implement "FILE REPORT" loading state
- [ ] **5.6** Implement ARIA debrief panel expansion (split view)
- [ ] **5.7** Build attack chain visualization component (5 nodes, connector animations)
- [ ] **5.8** Build domain comparison visualization
- [ ] **5.9** Wire all debrief dialogue lines to animation triggers
- [ ] **5.10** Implement easter egg 2 (debrief domain tooltip)
- [ ] **5.11** Complete Archivist achievement tracking (all 3 eggs)

**Dependencies:** 4.* (terminal scene complete)  
**Risk:** Debrief timing — ARIA's dialogue must synchronize with the attack chain animation. Use the audio `timeupdate` event to trigger animation keyframes at specific audio timestamps.

---

## PHASE 6: MISSION COMPLETE (Week 4–5)

- [ ] **6.1** Build mission complete panel
- [ ] **6.2** Build Analyst ID card component (front/back, 3D flip CSS)
- [ ] **6.3** Implement XP counter animation
- [ ] **6.4** Implement achievement card components (visible + hidden entrance animations)
- [ ] **6.5** Calculate and display all earned XP and bonuses correctly
- [ ] **6.6** Calculate and display all earned achievements correctly
- [ ] **6.7** Build path forward strip (mission cards)
- [ ] **6.8** Implement ARIA final dim animation
- [ ] **6.9** Wire Mission 2 navigation

**Dependencies:** 5.* (all previous scenes complete)  
**Risk:** Achievement calculation — ensure all bonus conditions are tracked correctly throughout the mission (Sharp Eyes requires no hints to have fired; Explorer requires all 5 entries expanded). These flags must be in state from the beginning.

---

## PHASE 7: AUDIO (Week 5)

- [ ] **7.1** Integrate Web Audio API audio engine (or Howler.js)
- [ ] **7.2** Implement layered music system (each layer independently controllable)
- [ ] **7.3** Implement music dynamic events (tension rise, The Quiet, Scene 5 harmonic shift)
- [ ] **7.4** Implement all ambient sounds (server fans, keyboard, HVAC, alert, elevator)
- [ ] **7.5** Implement ARIA voice sync (voice plays, transcript auto-scrolls)
- [ ] **7.6** Implement all UI SFX at correct triggers
- [ ] **7.7** Implement ARIA auto-duck (other audio layers duck when ARIA speaks)
- [ ] **7.8** Test audio on mobile (iOS Safari audio unlock, Android autoplay policies)

**Dependencies:** All scenes complete (audio needs scene triggers to hook into)  
**Risk:** iOS audio autoplay policy — iOS requires a user gesture before audio plays. Ensure the first music trigger (Scene 1) fires after a user interaction (the boot sequence click-to-start or the skip). Do NOT attempt to play audio on page load.

---

## PHASE 8: ACCESSIBILITY AND POLISH (Week 5–6)

- [ ] **8.1** Implement all ARIA labels, roles, and live regions
- [ ] **8.2** Implement reduced motion support (test with OS setting)
- [ ] **8.3** Implement color-blind mode
- [ ] **8.4** Implement dyslexia font mode
- [ ] **8.5** Implement reading mode
- [ ] **8.6** Implement closed captions (synchronized with audio)
- [ ] **8.7** Verify keyboard navigation end-to-end
- [ ] **8.8** Screen reader testing pass (NVDA + Chrome, VoiceOver + Safari)
- [ ] **8.9** Performance profiling — meet all performance budget targets
- [ ] **8.10** Implement offline/service worker support

---

## CRITICAL PATH

```
Foundation → Scene 0+1 → ARIA Component → CIA Quiz → Terminal → Report → Complete → Audio → A11y
     │             │              │              │           │          │          │         │
    W1            W1-2           W2-3           W3         W3-4       W4         W4-5     W5-6
```

The ARIA waveform component is the highest-risk item on the critical path. If the canvas performance is inadequate, the fallback implementation must be prepared before it blocks other work.

---

## OPTIONAL IMPROVEMENTS (Post-launch)

- Dynamic difficulty: track analytics on CIA quiz completion rates and adjust scenario complexity if learners are completing in < 30 seconds universally
- Enhanced ARIA voice: if voice acting budget allows, record additional "react to learner speed" lines (fast vs. slow completers)
- Sound design enhancement: add spatial audio positioning (Web Audio API `PannerNode`) for ambient SOC sounds
- ARIA personality variant: a "direct" vs "conversational" ARIA mode toggle for learners who prefer less narrative
- Mission analytics dashboard: real-time heatmap of which log entries learners expand most often

---

# SECTION 17 — PRODUCTION ROADMAP

---

## MILESTONE 1 — FOUNDATION (Days 1–7)
**Deliverables:** Mission routes, state machine, HUD, save state, scene stubs
**Definition of Done:** You can navigate from mission start to Mission Complete screen with placeholder content in each scene. No animations. No audio. State machine transitions correctly. Save state works.
**Internal review:** Engineering lead reviews state machine design.

---

## MILESTONE 2 — ENVIRONMENT (Days 8–14)
**Deliverables:** Boot sequence, SOC environment, Scene 1 complete
**Definition of Done:** Someone watching the screen from 0:00 to 2:00 sees a compelling, atmospheric introduction without any dialogue. Camera movements smooth. Ambient audio works.
**Internal review:** Art director and motion director review Scene 1 against the art brief.

---

## MILESTONE 3 — ARIA AND CIA (Days 15–21)
**Deliverables:** ARIA waveform component, dialogue system, CIA quiz
**Definition of Done:** ARIA's full Scene 2 dialogue plays with correct timing. CIA quiz is completable with full interaction support. Badge collection animation works.
**Internal review:** Learning experience director reviews the CIA Triad introduction against learning objectives.

---

## MILESTONE 4 — TERMINAL AND REPORT (Days 22–31)
**Deliverables:** Terminal investigation scene, incident report, debrief
**Definition of Done:** Learner can navigate from Scene 3 to end of Scene 4 debrief. All entries expandable. Wrong flag handling works. Report form submittable. Debrief completes.
**Internal review:** Senior cybersecurity educator reviews all log entry content and debrief content for accuracy.

---

## MILESTONE 5 — COMPLETION AND AUDIO (Days 32–38)
**Deliverables:** Mission complete scene, full audio integration
**Definition of Done:** End-to-end run from 0:00 to Mission Complete works with all audio. XP calculation correct. All achievements correctly awarded.
**Internal review:** Full team end-to-end playthrough. Bug list collected.

---

## INTERNAL REVIEW (Days 39–42)
**Format:** Two playthroughs back-to-back: one with zero knowledge of the design (bring in a team member who hasn't been involved), one with the full design team.
**Questions to answer:**
1. Did the cold-open feel compelling, or just different?
2. Does ARIA feel like a character, or a voice-over?
3. Did "The Quiet" (9:30) land? Did anyone feel the weight of the moment?
4. Did the "You found it." line feel earned?
5. Did people actually look at the Analyst ID card?
6. What was the first moment someone wanted to quit? (this is your biggest problem)

---

## PLAYTEST (Days 43–47)
**Participants:** 8 learners with zero cybersecurity background. Age range: 18–45. Equal gender split.
**Observation protocol:** No assistance. Think-aloud encouraged. Facilitator stays quiet unless the learner is stuck for > 5 minutes.
**Metrics to observe:**
- Drop-off point (if any)
- CIA quiz: how many attempts, which card caused confusion
- Scene 3: which entry did they try to flag first?
- Did anyone miss the `[!]` indicators entirely?
- Did anyone look at the Analyst ID card back?
- Post-playtest question: "What do you remember most from that experience?"

---

## REVISION (Days 48–52)
Based on playtest findings, revise the highest-impact issues. Do NOT revise based on preferences — revise based on observable failure points (missed interactions, incorrect understanding, premature abandonment).
**Maximum scope of revision:** UI, timing, dialogue phrasing. NOT structural changes to the scene graph unless a fundamental failure is identified.

---

## POLISH (Days 53–56)
- Audio mixing final pass (in-ear headphones AND laptop speakers AND phone speaker)
- Animation timing micro-adjustments
- Caption QA
- Performance profiling on low-end Android
- All QA checklist items signed off

---

## LAUNCH (Day 57)
**Launch criteria:**
- [ ] All QA checklist items checked
- [ ] Performance budget met on all target devices
- [ ] Accessibility audit passed
- [ ] Analytics verified (events firing correctly)
- [ ] Offline mode tested
- [ ] At least 2 playtesters answered "The quiet before I submitted the threat" or similar when asked "what do you remember most"

---

# SECTION 18 — SELF CRITIQUE

*Naughty Dog. Pixar. Riot Games. Nintendo. Apple. IDEO. What would they find wrong?*

---

## NAUGHTY DOG (Uncharted, The Last of Us)
*Masters of pacing, character, and emotional authenticity.*

**What they'd say:**
"The ARIA character is strong on paper, but the waveform is doing all the emotional work. A truly memorable character needs a visual design that surprises you — something you haven't seen before. A waveform is elegant but safe. What if ARIA's visual representation was more unexpected? A fractal that self-assembles? An origami-like geometric form that reconfigures as she 'thinks'? Push the visual to match the voice."

**What they'd also say:**
"The debrief sequence (Scene 4) is pedagogically necessary but emotionally flat. After 'You found it. Before anyone clicked anything.' — there's a potential emotional beat you're missing. What did Maya Chen almost just experience? What are the real human stakes? The attack chain visualization is clinical. What would it mean to Maya personally? One line — just one — about what her day would have looked like if the attack succeeded. That's what Naughty Dog would write."

**Fix applied:** Add one line to ARIA's debrief: "Maya's access credentials were the target. With them, the attacker would have had her access, her identity. Every system she can reach. Every colleague who trusts a message from her." — This humanizes the abstract.

---

## PIXAR (Up, Inside Out, WALL-E)
*Masters of emotional economy — the right moment contains everything.*

**What they'd say:**
"You have 25 dialogue lines in Scene 2. That's too many. The most powerful Pixar moments happen in near-silence. ARIA's best lines are her shortest ones: 'Good.' 'That tension is the job.' 'I'll be right here.' The middle section (Lines 6–12) is exposition. Cut it in half. Trust the environment to do the world-building. Trust the learner to infer context. The less ARIA explains, the more interesting she becomes."

**They'd also say:**
"The coffee cup on the desk — that's Pixar thinking. The clock on the wall — that's Pixar thinking. Find three more of those. What's in the learner's inbox? What does the ambient newsfeed on the SOC ticker say? What's the name of the analyst on the shift before them? These invisible details make a world feel inhabited."

**Fix applied:** Add three more environmental details to the SOC illustration (a handwritten sticky note on the monitor frame, a coffee ring stain on the desk that's older than the new coffee cup, the newsfeed headline on the display wall mentioning a specific fictional incident from 3 weeks ago that the curriculum will return to later).

---

## RIOT GAMES (League of Legends, Valorant onboarding)
*Masters of onboarding — they know that the first 10 minutes determine everything.*

**What they'd say:**
"The CIA quiz at minute 5 is the first thing that asks the learner to DO anything. That's too long. The first interaction should happen in the first 90 seconds. The Boot Sequence is pure spectacle — but spectacle that demands NOTHING from the learner is easy to tune out. Give them one tiny interaction in Scene 0 or early Scene 1. Something that takes 3 seconds. But something that says: 'You are participating, not watching.'"

**They'd also say:**
"Your tutorial is a great tutorial. But the best Riot onboarding makes you feel like you're NOT in a tutorial. You're in a story. The CIA quiz frame ('let's see if you already understand them') is tutorial language. Replace it with something that feels like it's happening because of the story, not because the experience wants to teach you."

**Fix applied:** Replace "let's see if you already understand them" with: "Before we look at that anomaly together — a quick question. ARIA pulls up three incident reports on the left monitor. I want to know how you read them." — Same quiz, different justification. It's happening because ARIA wants to calibrate to this specific analyst, not because it's in the lesson plan.

**Second fix:** Add a micro-interaction at 0:24 during the Boot Sequence: after "WELCOME, ANALYST" appears, there's a cursor blinking at the end of the line. The learner must press Enter or click to proceed (instead of the white-out being automatic). This is 3 seconds. It's the first action. It sets the expectation: you're not watching — you're here.

---

## NINTENDO (Zelda, Mario, Pikmin)
*Masters of joy, surprise, and the pleasure of discovery.*

**What they'd say:**
"Where is the delight? You have meticulous craft here, but where does the learner smile? The entire mission is serious and professional and correct — but does any moment make someone laugh, gasp, or feel genuine surprise? ARIA's 'Not the agency' line is the only humor. That's one moment of lightness in 22 minutes. Find two more. They don't have to be jokes — they can be delightful details. A small surprise. An unexpected response to an unusual action."

**They'd also say:**
"The learner can't 'break' anything. There are no unexpected branches if someone tries something unusual. What if the learner clicks on the SENTINEL wordmark on the right wall of the SOC? What if they hover over the incident counter and it gives them a real breakdown? Nintendo would put 12 little surprises in a 22-minute experience that nobody found until the third playthrough. Each one a gift."

**Fix applied:** Add 5 additional interactive surprises:
1. Clicking the SENTINEL wordmark → a 2-line company founding story appears
2. Clicking the incident counter → a breakdown: "1,847 phishing | 342 DDoS | 211 other"
3. Hovering over the "Night Shift" caption → changes to the exact UTC time
4. Clicking the sticky note on the monitor → reads "r.kumar — buy more coffee." (ties to the MFA entry character)
5. Clicking on the HUD level indicator → a small popup: "Level 1 of 40. A long road. You've already taken the hardest step."

---

## APPLE (iPhone onboarding, iOS setup)
*Masters of elimination. Every unnecessary element is removed.*

**What they'd say:**
"The HUD has 8 elements. That's 6 too many during a cinematic scene. During Scenes 0–1, the HUD should disappear completely — or show only 1 element maximum. You have a breadcrumb, XP display, level indicator, analyst name, avatar, CIA badge, ID badge, and reading mode toggle all competing for attention during a scene that should be pure atmosphere. Trust the experience. Trust the learner to not need to be reminded of their XP while they're watching the SOC come to life."

**They'd also say:**
"The Incident Report form has a field labeled 'SECTION 1 — THREAT CLASSIFICATION'. Remove the section header. Just show the label 'What type of threat did you identify?' The formal section labels are for documents. This isn't a document — it's an experience that looks like a document. There's a difference."

**Fix applied:** HUD reduces to 0 visible elements during Scenes 0 and 1 (opacity: 0). A single visible element returns at the start of Scene 2: the reading mode toggle only (because learners may want to enable it before ARIA starts speaking). Full HUD returns at Scene 2.5 when the CIA badge is awarded and there's something to show.

---

## IDEO (Human-Centered Design)
*Masters of empathy — they design for the person who is confused, anxious, and unsure.*

**What they'd say:**
"Your mission is beautifully designed for the learner who is curious and engaged. Who did you design it for when the learner is frightened? Cybersecurity can be intimidating. Some learners will arrive at this platform thinking 'I'm not technical enough for this.' Nothing in your design speaks directly to that person. ARIA's opening lines ('Not your teacher') are a start — but the anxious learner doesn't hear 'not your teacher,' they hear 'you're being evaluated.'"

**They'd also say:**
"The no-failure design is right. But where is the explicit statement of 'you cannot fail this'? The design assumes learners will feel safe to try — but some won't unless you tell them directly. One line. ARIA can say it. Or it can be on a pre-mission card. But someone who is terrified needs to hear: 'There is no wrong answer. There is only what you notice and what you learn.'"

**Fix applied:** Before Scene 0 begins (on the mission start screen), add a very small line below the "Begin Mission" button: "You cannot fail. You can only discover." — In 12px, muted text. It's not a headline. It's a whisper to the person who needs to hear it.

---

## THE FINAL QUESTION

**Would someone remember ONE SPECIFIC MOMENT from this mission ten years later?**

Yes. With confidence.

The moment is this: You are looking at a terminal screen. You've been staring at log entries for a minute. Something about one of them feels wrong — four red `[!]` markers, an IP address with 847 phishing campaigns behind it, a domain name that's one character off. The music drops to almost nothing. ARIA's waveform goes still. The cursor blinks. Just you and the data.

And ARIA had said, 3 minutes ago: *"Somewhere in this data stream, a real person is trying to hurt real people. Your job — starting right now — is to find them."*

That's the moment. The silence. The weight of finding something real. The realization that they put their name on a report about it.

Ten years later, if someone asks "what do you remember from when you first learned cybersecurity?" — that cursor will blink in their memory. That silence. That one domain name with one wrong character.

That's the moment. We built toward it. We earned it.

**The mission is ready.**

---

*End of Production Package — Operation: First Contact (MISSION-001)*  
*Document authored by: CyberLearn Creative Direction*  
*All sections: 1–18 complete*  
*Parts: PRODUCTION_PACKAGE_PART1.md through PRODUCTION_PACKAGE_PART4.md*
