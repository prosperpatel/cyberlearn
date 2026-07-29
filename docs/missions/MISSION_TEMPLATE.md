# CYBERLEARN MISSION DOCUMENTATION TEMPLATE
# Official Production Standard — All Academies, Courses, Modules, and Missions

**Document Type:** Mission Design Document (MDD) Template  
**Version:** 1.0  
**Authority:** This template is the official standard for all CyberLearn mission documentation. No mission enters production without a completed MDD that conforms to this structure.  
**Maintained by:** Lead Game Director + Technical Director  
**Template location:** `docs/missions/MISSION_TEMPLATE.md`

---

## HOW TO USE THIS TEMPLATE

1. Copy this file to `docs/missions/[ACADEMY_ID]/[COURSE_ID]/[MODULE_ID]/MISSION_[MISSION_ID]_[SLUG].md`
2. Replace every `[PLACEHOLDER]` with real values
3. Delete every `> 📋 AUTHOR GUIDE` block before submitting for review
4. Leave no section blank. Use `N/A — [reason]` if a section genuinely does not apply
5. Submit to Creative Director + Technical Director for approval before any asset production begins

**File naming convention:**
```
docs/missions/academy-01/course-01/module-01/MISSION_A1C1M1L1_operation-first-contact.md
```

**ID format:**
```
A[academy]C[course]M[module]L[lesson] → A1C1M1L1
```

---

## DOCUMENT STATUS

> 📋 AUTHOR GUIDE  
> Update this block whenever the document changes. Never submit a mission for production with status DRAFT.  
> Do not advance to IN REVIEW until every section is complete and every checklist passes.

| Field | Value |
|-------|-------|
| Status | `DRAFT` / `IN REVIEW` / `APPROVED` / `IN PRODUCTION` / `SHIPPED` / `ARCHIVED` |
| Author | [NAME] |
| Reviewer | [NAME] |
| Approved by | [NAME] |
| Created | [YYYY-MM-DD] |
| Last updated | [YYYY-MM-DD] |
| Approved on | [YYYY-MM-DD or —] |
| Production start | [YYYY-MM-DD or —] |
| Ship date | [YYYY-MM-DD or —] |

**Change log:**

| Date | Author | Change |
|------|--------|--------|
| [YYYY-MM-DD] | [NAME] | Initial draft |

---

---

# PART 1 — MISSION IDENTITY

---

## Section 1 — Mission Metadata

> 📋 AUTHOR GUIDE  
> **Purpose:** The single source of truth for all mission identifiers, parameters, and discovery data. Every other system (content engine, analytics, rewards engine, save manager) references these values.  
> **How to complete:** Fill every field. Duration is a target range, not a maximum. Difficulty uses the platform scale (1–5). All IDs must follow the platform naming convention exactly.  
> **Common mistakes:**  
> — Setting duration too short (missions almost always run longer than designed)  
> — Listing vague learning objectives ("understand cybersecurity") — use Bloom's taxonomy verbs  
> — Forgetting to list prerequisites (leaves the unlock system broken)  
> **Example:** See Operation: First Contact MDD for a complete example  
> **Checklist:**  
> - [ ] Mission ID matches file name and content JSON key  
> - [ ] Duration reflects QA-measured playtime, not estimated  
> - [ ] All learning objectives use measurable action verbs  
> - [ ] Prerequisites are confirmed to exist in the content engine  
> - [ ] XP total is approved by the Rewards Director

### 1.1 Identifiers

| Field | Value |
|-------|-------|
| Mission ID | `[A1C1M1L1]` |
| Mission Slug | `[operation-first-contact]` |
| Mission Name | `[Operation: First Contact]` |
| Display Title | `[The title shown in the UI]` |
| Academy | `[Academy 1 — Cyber Foundations]` |
| Course | `[Course 1 — Why Cybersecurity Matters]` |
| Module | `[Module 1 — The Digital World]` |
| Position | `[Mission 1 of 4 in this module]` |
| Mission Type | `[TUTORIAL / STORY / PUZZLE / SIMULATION / INCIDENT_RESPONSE / BOSS / ASSESSMENT / CERTIFICATION]` |

### 1.2 Duration & Difficulty

| Field | Value |
|-------|-------|
| Target duration | `[8–12 minutes]` |
| Minimum duration | `[6 minutes]` — user completing fastest possible path |
| Maximum duration | `[20 minutes]` — user exploring every branch |
| Difficulty | `[1 / 5]` — platform scale: 1 = tutorial, 5 = expert |
| Cognitive load | `[LOW / MEDIUM / HIGH]` |
| Interaction density | `[1 interaction per [X] seconds on average]` |

### 1.3 Learning Objectives

> List 2–5 objectives. Each must be specific and measurable. Use Bloom's taxonomy: Identify, Classify, Explain, Analyze, Evaluate, Design, Apply.

| # | Objective | Bloom's Level | Validated by |
|---|-----------|--------------|--------------|
| LO1 | [The learner will identify the three components of the CIA Triad] | Remember | [Quiz Q3, interaction in Scene 4] |
| LO2 | [The learner will explain why a cyberattack on a hospital is a life-safety issue] | Understand | [Reflection prompt at scene end] |
| LO3 | [The learner will classify a real-world incident by its primary CIA violation] | Apply | [Scene 4 drag activity] |

### 1.4 Prerequisites

| Type | Required |
|------|----------|
| Previous missions | `[None — this is Mission 1]` or `[A1C1M1L1 must be complete]` |
| Module unlock | `[Module 1 must be unlocked]` |
| XP minimum | `[None]` or `[500 XP required]` |
| Age gate | `[None]` or `[13+ required]` |
| Account required | `[Yes / No]` |

### 1.5 Unlock Conditions

```
[Describe exactly when this mission becomes available]

Example:
  Mission unlocks when:
    - User has created an account
    - Module 1 has been started (triggered by first app open)
    - No XP prerequisite
```

### 1.6 Rewards

| Reward | Value | Condition |
|--------|-------|-----------|
| Base XP | `[350]` | Mission complete |
| Bonus XP — Speed | `[+50]` | Complete under [8] minutes |
| Bonus XP — Perfect | `[+50]` | All interactions correct first attempt |
| Badge | `[[Badge Name]]` | Mission complete |
| Achievement | `[[Achievement Name]]` | [Specific condition] |
| Unlock | `[Mission 2 becomes available]` | Mission complete |
| Cosmetic | `[None / [Item name]]` | [Condition] |

### 1.7 Analytics Tags

> These tags are used by the analytics system to track this mission across cohorts and experiments.

```
mission_id:     [a1c1m1l1]
mission_type:   [story]
academy:        [1]
course:         [1]
module:         [1]
difficulty:     [1]
topic_tags:     [cia-triad, ransomware, hospital-breach, cybersecurity-basics]
ab_test_group:  [N/A or [GROUP_NAME]]
```

---

## Section 2 — Mission Overview

> 📋 AUTHOR GUIDE  
> **Purpose:** A one-page brief that any stakeholder can read to understand the mission completely. This is the document leadership reads. Write it last, after all other sections are complete.  
> **How to complete:** Write in plain English. No jargon. No placeholder text. If you can not write this section clearly, the mission is not designed clearly enough yet.  
> **Common mistakes:**  
> — Writing the overview before the details are designed (it becomes inaccurate)  
> — Describing the UI instead of the experience  
> — Using passive voice ("the learner is shown") instead of active ("the learner discovers")  
> **Checklist:**  
> - [ ] Any team member could read this and know what to build  
> - [ ] Emotional journey matches the scene documentation  
> - [ ] Learning outcomes match the objectives in Section 1  
> - [ ] Success criteria are measurable

### 2.1 Mission Purpose

> One paragraph. Why does this mission exist? What gap does it fill in the learner's journey?

```
[Write 2–4 sentences explaining the purpose of this mission in the context of the full course.]

Example:
  This mission is the learner's first contact with the CyberLearn world. Before any concept is taught, 
  the learner must feel that cybersecurity is real, urgent, and personal. This mission does not teach 
  the CIA Triad through explanation — it teaches it through a hospital that lost access to its own 
  patient records at 11:47 PM. The learner should leave this mission changed, not informed.
```

### 2.2 Story Summary

> 3–5 sentences covering what happens in this mission, narratively.

```
[Write the story of this mission as if describing a short film.]

Example:
  AURA contacts the recruit for the first time. While briefing them on their role in the Agency, 
  a live incident alert fires: a hospital in London has lost access to its patient management 
  system. AURA walks the recruit through the breach in real time — who was affected, how it 
  happened, and why it could have been prevented. The recruit makes their first decision as 
  an analyst. By the end, they understand not just what cybersecurity is, but why it matters.
```

### 2.3 Emotional Journey

> Map the intended emotional arc of the learner through this mission. Must match the scene breakdown in Section 4.

```
[Opening state] → [Scene 1] → [Scene 2] → ... → [Closing state]

Example:
  Curious/neutral 
    → [Scene 1: Recruitment] → Excited, belonging
    → [Scene 2: Incident Alert] → Alert, present
    → [Scene 3: Inside the Hospital] → Concern, empathy
    → [Scene 4: The Analysis] → Analytical, capable
    → [Scene 5: The Why] → Responsible, motivated
    → [Scene 6: Welcome to AURA] → Pride, anticipation
```

### 2.4 Expected Learning Outcome

> What should the learner be able to say immediately after completing this mission? Write in first person as the learner.

```
Example:
  "I understand that cybersecurity protects real people, not just data."
  "I know that the CIA Triad describes three things security must protect: Confidentiality, Integrity, Availability."
  "I understand that one uninstalled patch can bring down a hospital."
  "I want to learn more. I feel like I belong here."
```

### 2.5 Learning Validation

> 📋 ADDED SECTION — not in original 20. Included because analytics alone cannot confirm learning; this section defines observable evidence that learning objectives were met.

For each learning objective, specify how we know it was achieved:

| LO# | Observable evidence | Mission measurement | Retention check |
|-----|--------------------|--------------------|-----------------|
| LO1 | Learner drags the correct breach element to "Availability" without a hint | Interaction result recorded in analytics | Quiz Q3 in Module Review |
| LO2 | Learner completes the reflection prompt with a response referencing human impact | Prompt completion recorded | Free recall prompt in LO2 |
| LO3 | Learner selects the correct CIA violation on first attempt | First-attempt accuracy tracked | Applied in Mission 4 |

### 2.6 Success Criteria (Mission Level)

> The mission is considered successful when:

```
- [ ] ≥ 90% of learners complete the mission (not drop off mid-mission)
- [ ] ≥ 80% of learners correctly answer LO validation interactions on first attempt
- [ ] Average session rating ≥ 4.2 / 5
- [ ] ≤ 5% of learners require more than 3 hint uses
- [ ] Mission completion drives ≥ 70% Day-1 retention (learner returns to Mission 2)
- [ ] Zero accessibility audit failures
- [ ] Lighthouse performance score ≥ 90 on all target devices
```

---

## Section 3 — Story Context

> 📋 AUTHOR GUIDE  
> **Purpose:** Places this mission inside the larger CyberLearn narrative. Every mission is one scene in a movie. This section ensures the author understands — and documents — how this scene connects to every other scene.  
> **How to complete:** Read the previous mission's MDD and the next mission's MDD before completing this section. This section must be consistent with both.  
> **Common mistakes:**  
> — Writing story context in isolation (creates continuity errors)  
> — Forgetting to document why characters behave the way they do  
> — Treating this as a summary (it is a continuity and causality document)  
> **Checklist:**  
> - [ ] Previous mission summary confirmed with that mission's author  
> - [ ] All characters introduced here appear in the Character Register  
> - [ ] The "connection to future missions" has been confirmed with the narrative director  
> - [ ] Timeline is chronologically consistent with the world timeline

### 3.1 Previous Mission Summary

> What does the learner know and feel entering this mission? What story events have occurred?

```
Previous mission: [MISSION_ID / Mission Name or "None — this is Mission 1"]

Summary:
[2–4 sentences describing the previous mission's story outcome and what emotional state the learner is in.]

Example (if Mission 1):
  This is the learner's first mission. They have no prior in-world experience.
  They are arriving at CyberLearn for the first time — curious, slightly uncertain, open.
```

### 3.2 Why This Mission Exists (Narrative Causality)

> What causes this mission to happen? Story logic, not gameplay logic.

```
[1–3 sentences. "Because X happened in the previous mission, this mission now occurs."]

Example:
  Director Chen authorized the recruit's access. AURA now has clearance to begin the 
  Foundations Briefing. The briefing opens with the most important question AURA can ask 
  a new recruit: "Do you understand what you're actually protecting?"
```

### 3.3 Connection to Future Missions

> How does this mission set up what comes next?

```
[Describe what seeds are planted in this mission that bloom in future missions.]

Example:
  This mission introduces the CIA Triad without naming it formally — the learner discovers the 
  concept through the breach, not a definition. Mission 2 will reference "the three things we 
  protect" and the learner will have the referent. The hospital incident is also referenced in 
  Module 3 when ransomware is taught technically — learners who completed this mission will 
  already have the emotional context.
```

### 3.4 Characters

> Every character who appears in this mission. Link to the Character Register.

| Character | Role | First appearance | Relationship to learner | Emotional register |
|-----------|------|-----------------|------------------------|-------------------|
| AURA | AI Mentor, guide | This mission | Mentor / partner | Calm, precise, warm |
| [Character Name] | [Role] | [Mission ID] | [Relationship] | [Tone] |

**Character notes (mission-specific):**

```
AURA in this mission:
  - She is meeting the recruit for the first time
  - Tone: welcoming but professional; she has assessed the recruit and chosen them
  - She does not condescend — she treats the recruit as a capable person
  - She is slightly urgent — there is always work to do
  - She never lectures — she reveals

[CHARACTER_2] in this mission:
  [Mission-specific direction]
```

### 3.5 Locations

| Location | Description | Appears in scene | Established here or elsewhere |
|----------|-------------|-----------------|------------------------------|
| Operations Center | AURA's intelligence hub. Multiple screens. Dark. Purposeful. | Scene 1, 6 | Established in Scene 1 |
| [Location Name] | [Description] | Scene [#] | [Established/Referenced] |

### 3.6 World Timeline

> Where does this mission fall on the in-world timeline? Used for narrative continuity.

```
In-world date/time: [Day 1 of Recruit's induction / Present day / [YYYY-MM-DD HH:MM]]
Duration of mission in story time: [Mission covers 45 minutes of story time]
Real-world historical events referenced: [NHS WannaCry attack — May 12, 2017]
```

---

---

# PART 2 — NARRATIVE & FLOW

---

## Section 4 — Storyboard

> 📋 AUTHOR GUIDE  
> **Purpose:** The high-level scene list. Think of this as the table of contents for the mission's story. Every scene is one "beat" — a unit of narrative + learning + emotional change.  
> **How to complete:** List every scene in order. Each scene should have a single dominant purpose (one thing it must accomplish). If a scene is trying to accomplish three things, split it into three scenes.  
> **Common mistakes:**  
> — Scenes that are too long (target: 60–180 seconds per scene)  
> — Scenes with no interaction (every scene should have at least one)  
> — Scenes without a clear emotional shift (learner should feel differently at the end than the start)  
> — Missing transition notes (jarring transitions destroy immersion)  
> **Checklist:**  
> - [ ] Total scene count × average scene duration ≈ target mission duration  
> - [ ] Every scene has exactly one dominant purpose  
> - [ ] No two consecutive scenes have the same emotional state  
> - [ ] Transition between every pair of adjacent scenes is documented  
> - [ ] At least one "wow moment" is designed somewhere in the mission

### 4.1 Scene List

| Scene ID | Scene Name | Duration | Learning purpose | Story purpose | Emotional shift | Interaction count |
|----------|-----------|----------|-----------------|---------------|-----------------|-------------------|
| S1 | [Scene Name] | [0:00–0:45] | [What is learned] | [What story advances] | [FROM → TO] | [#] |
| S2 | [Scene Name] | [0:45–2:30] | [What is learned] | [What story advances] | [FROM → TO] | [#] |
| S3 | [Scene Name] | [2:30–4:30] | [What is learned] | [What story advances] | [FROM → TO] | [#] |
| S4 | [Scene Name] | [4:30–7:00] | [What is learned] | [What story advances] | [FROM → TO] | [#] |
| S5 | [Scene Name] | [7:00–9:00] | [What is learned] | [What story advances] | [FROM → TO] | [#] |
| S6 | [Scene Name] | [9:00–10:30] | [What is learned] | [What story advances] | [FROM → TO] | [#] |

### 4.2 Scene Transition Map

> Define how the mission moves between scenes. Transitions are as important as scenes — a bad transition breaks immersion.

| From | To | Transition type | Duration | Audio | Notes |
|------|----|----------------|----------|-------|-------|
| S1 → S2 | [Scene 1 name] → [Scene 2 name] | `[CUT / CROSS_DISSOLVE / WIPE_LEFT / PUSH_RIGHT / ZOOM_IN / FADE_BLACK / FADE_WHITE / MATCH_CUT / REVEAL]` | [280ms] | [Audio note] | [Notes] |
| S2 → S3 | | | | | |

**Transition type definitions:**
```
CUT           — Instant. Use for urgency or when scene content is dramatically different.
CROSS_DISSOLVE — Soft fade. Use for time passing or gentle emotional shift.
FADE_BLACK    — Full black between scenes. Use for significant time/location jumps.
FADE_WHITE    — Full white. Use sparingly — completion moments, revelation.
PUSH_RIGHT    — Content slides right as new content enters. Use for forward progression.
WIPE_LEFT     — New content reveals from left edge. Use for urgency, action.
ZOOM_IN       — Camera pushes into a focal point. Use for "entering" a location.
MATCH_CUT     — Visual element in S1 matches visual element in S2. Use for thematic connection.
REVEAL        — Element hidden in current scene is revealed (drop cloth, etc.) Use for reveals.
```

### 4.3 Pacing Chart

> Visualize the rhythm of the mission across its full duration.

```
TIME:    0:00   2:00   4:00   6:00   8:00   10:00
         |      |      |      |      |      |
TENSION: ░░░▒▒▒▒▒▒▒▓▓▓▓▓███▓▓▓▒▒▒▓▓██▓▓▒▒▒░░
DIALOG:  ████▒▒▒████▒▒▒▒████▒▒░░░███▒▒▒████
INTERACT:░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
         [map each interaction point with X markers above this line]

Key:
  ░ — Low intensity (calm, exploration, reading)
  ▒ — Medium intensity (learning, discovery)
  ▓ — High intensity (challenge, decision)
  █ — Peak intensity (wow moment, consequence reveal)
```

---

## Section 5 — Scene Documentation

> 📋 AUTHOR GUIDE  
> **Purpose:** The master specification for every individual scene. This is the most detailed section of the MDD. Every element of every scene — story, learning, UI, animation, audio, interactions — is fully specified here so no creative decision is left to implementation.  
> **How to complete:** Complete one scene at a time. Do not move to the next scene until the current one is fully documented. Every subsection must be filled. Use "N/A" with a reason if a subsection truly does not apply.  
> **Common mistakes:**  
> — Vague dialogue ("AURA says something welcoming") — write the actual words  
> — Missing exit conditions (leads to engineering bugs)  
> — Not specifying accessibility per-scene  
> — Forgetting to list what assets are needed (delays production)  
> **Checklist per scene:**  
> - [ ] Scene has exactly one dominant learning objective  
> - [ ] Scene has exactly one dominant emotional objective  
> - [ ] All dialogue is written out verbatim (no summaries)  
> - [ ] All interactions are fully specified with success/failure/hint paths  
> - [ ] All assets are named and requested  
> - [ ] Exit condition is unambiguous  
> - [ ] Transition to next scene is documented

---

### SCENE TEMPLATE (duplicate for each scene)

---

#### Scene [ID] — [Scene Name]

**Scene type:** `[CINEMATIC / INTERACTIVE / DIALOGUE / CHALLENGE / TRANSITION / REWARD / ASSESSMENT]`

---

##### 5.[ID].1 — Scene Header

| Field | Value |
|-------|-------|
| Scene ID | `[S1]` |
| Scene name | `[The Transmission]` |
| Start time | `[0:00]` |
| End time | `[0:45]` |
| Duration | `[~45 seconds]` |
| Scene type | `[CINEMATIC → INTERACTIVE]` |
| Dominant learning objective | `[LO1 / LO2 / LO3 / None — transition scene]` |
| Dominant story objective | `[Establish the world. Recruit the learner. Create belonging.]` |
| Dominant emotional objective | `[Neutral → Curious → Excited]` |
| Interaction count | `[1]` |
| Hint available | `[Yes / No]` |

---

##### 5.[ID].2 — Environment

```
Location:       [Operations Center — AURA's intelligence hub]
Time of day:    [Indeterminate — the ops center has no windows]
Lighting:       [Dark with cyan accent lighting from screens. No overhead lights.]
                [Key light: screens — soft blue-cyan. Fill: none. Rim: none.]
                [Dynamic lighting: AURA's waveform pulses light onto the desk.]
Atmosphere:     [Purposeful. Focused. A place where serious work happens.]
Camera position:[Static. Wide shot establishing the room. Centered on the terminal.]
Camera movement:[None until the scene's key beat — then a slow push toward the terminal.]
Depth of field: [Wide depth — entire room visible and in focus initially.]
                [Shifts to shallow focus on the terminal at 0:30.]
Parallax:       [Subtle background parallax on screens — 2% movement on scroll/gyro]
Background:     [Animated — screens showing data streams, not readable text]
```

---

##### 5.[ID].3 — Visual Design

```
Primary palette:  [Base Dark #0A0F1A background, Cyber Blue #00D9FF accents]
Surface:          [Frosted glass panels — backdrop-filter: blur(12px), bg-opacity-10]
Typography:       [JetBrains Mono for terminal text. Inter for UI. No serif.]
Key visual:       [The terminal cursor, center screen, blinking]
Atmosphere VFX:   [Floating particle dust — very subtle, opacity 0.03–0.08, slow drift]
HUD elements:     [None in this scene — clean first impression]
Glow effects:     [shadow-cyber-sm on interactive elements only]
Post-processing:  [Subtle vignette on outer 20% of screen. No bloom in this scene.]
```

---

##### 5.[ID].4 — Dialogue

> Write every word. Include stage direction in [brackets]. Include timing in (parentheses). Write for clarity, not eloquence — the best game dialogue sounds natural when spoken.

```
[CHARACTER]: "[Dialogue line]"
             [Stage direction: tone, pacing, visual state of character]
             (Timing: appears at [0:05], fully typed at [0:08])

[CHARACTER]: "[Dialogue line]"
             [Stage direction]
             (Timing: [0:10]–[0:14])

---

AURA VOICE DIRECTION (mission-wide):
  Tone:    Calm. Intelligent. Slightly warm. Never rushed.
  Pace:    Steady — 40ms per character on screen
  Pauses:  350ms natural pause after each sentence
  Emphasis:[Words in ALL CAPS receive 15ms delay before the next character for weight]
  Silence: Intentional silence ≥ 500ms before major reveals
```

**Interrupt rules:**
```
Can the learner skip this dialogue?  [Yes / No]
If yes, after how long?              [After 2 seconds of text on screen, skip button appears]
If no, why not?                      [First-time experience — cannot be skipped on first play]
On replay, can it be skipped?        [Yes — immediately]
```

**Localization notes:**
```
[Note any culture-specific references, idioms, or humor that may need adaptation]
Example: "17-year-old" → some regions use different language for minors in legal contexts.
```

---

##### 5.[ID].5 — Voiceover

```
Character:      [AURA]
Lines:          [List each VO line by index number]
  VO-S1-01:     "[Text of line]"
  VO-S1-02:     "[Text of line]"
  
Recording notes:
  Mic presence:   [Close — intimate, direct]
  Room treatment: [Dry — slight digital processing for AURA's AI quality]
  Emotion:        [Warm professionalism. Like a trusted colleague, not an assistant]
  Emphasis cues:  [Underline words for stress: "This is __real__."]
  Breath control: [Minimal breath noise — AURA is an AI, subtle artifacts acceptable]

VO file naming:
  [VO_A1C1M1L1_S1_AURA_01.wav]
  [VO_A1C1M1L1_S1_AURA_02.wav]
```

---

##### 5.[ID].6 — Interactions

> Every interaction in this scene, fully specified. No interaction should be designed without a clear learning purpose.

**INTERACTION [ID] — [Interaction Name]**

```
Interaction ID:     [INT_S1_01]
Type:               [TAP / SWIPE / DRAG / HOLD / ZOOM / ROTATE / HIGHLIGHT / CONNECT / DECRYPT / SCAN / COMPARE / PRIORITIZE / INVESTIGATE / DECISION]
Learning purpose:   [What concept does this interaction teach or reinforce?]
Trigger:            [What causes this interaction to become available?]
Target element:     [What does the learner interact with?]
Expected action:    [What should the learner do?]

Success path:
  Action:           [What the learner does correctly]
  Animation:        [What plays on success]
  Audio:            [What plays on success]
  Dialogue:         [AURA response]
  XP awarded:       [0 / +[amount]]
  Next:             [What happens next]

Failure path:
  Action:           [What the learner does incorrectly]
  Animation:        [What plays on failure — gentle, never punishing]
  Audio:            [Subtle neutral sound — never alarming]
  Dialogue:         [AURA response — coaching, not correcting]
  Next:             [Try again / Hint offered / Auto-advance after N attempts]

Hint system:
  Hint 1 (after 10s of inactivity):   [AURA: "Subtle directional hint"]
  Hint 2 (after 20s more inactivity): [AURA: "More direct hint"]
  Hint 3 (after 20s more inactivity): [Visual indicator + AURA: explicit direction]
  Auto-complete (after Hint 3):       [Yes — after 10 additional seconds, auto-complete with animation]

Accessibility:
  Keyboard equivalent:  [Tab to focus, Enter/Space to activate]
  Screen reader label:  "[Descriptive ARIA label]"
  Touch target size:    [Minimum 44×44px]
  Reduced motion:       [Skip animation, show result state immediately]
  Color alternative:    [Shape/icon distinguishes this, not color alone]

Analytics event:
  success:  [{ event: 'interaction_complete', id: 'INT_S1_01', result: 'success', attempt: 1 }]
  failure:  [{ event: 'interaction_complete', id: 'INT_S1_01', result: 'fail', attempt: N }]
  hint:     [{ event: 'hint_used', id: 'INT_S1_01', hint_level: 1 }]

Developer notes:
  [Technical notes for the engineer implementing this interaction]
  [Reference relevant existing component if one exists]
  [Flag if this interaction requires a new component to be built]
```

---

##### 5.[ID].7 — Animations

> Every animation triggered in this scene. Reference Section 9 for the full animation specifications.

| Animation ID | Name | Trigger | Duration | Easing | Layer | Priority | Lottie? |
|-------------|------|---------|----------|--------|-------|----------|---------|
| ANIM_S1_01 | [Terminal cursor blink] | [Scene start] | [1000ms loop] | [linear] | [Foreground] | [High] | [No — CSS] |
| ANIM_S1_02 | [Text type-in] | [0:03] | [Varies] | [linear] | [Foreground] | [High] | [No — JS] |
| ANIM_S1_03 | [Camera push to terminal] | [0:30] | [1200ms] | [ease-out-cubic] | [Camera] | [Medium] | [No] |

---

##### 5.[ID].8 — Audio

| Cue ID | Type | Name/Description | Trigger | Fade in | Duration | Volume | Fade out | Notes |
|--------|------|-----------------|---------|---------|----------|--------|----------|-------|
| AUD_S1_01 | AMBIENT | [Server room hum] | [Scene start] | [1000ms] | [Loop] | [0.12] | [1000ms] | [Loop seamlessly] |
| AUD_S1_02 | SFX | [Terminal cursor click] | [Every 500ms] | [0ms] | [50ms] | [0.3] | [0ms] | [Very subtle] |
| AUD_S1_03 | MUSIC | [Tension underscore] | [0:20] | [2000ms] | [Loop] | [0.08] | [On scene exit] | [Sets emotional tone] |

---

##### 5.[ID].9 — Particle Effects

```
Effect:         [None / [Effect name]]
Trigger:        [When the effect starts]
Duration:       [How long it runs]
Density:        [Particle count and density description]
Color:          [Palette]
Motion:         [Direction and behavior]
Performance:    [Max particles on mobile: [#]; reduce to [#] if frame rate drops below 55fps]
```

---

##### 5.[ID].10 — Accessibility

```
Keyboard navigation:     [Tab order through interactive elements; Escape exits scene]
Screen reader (ARIA):    [aria-live="polite" on dialogue box; role="dialog" on modal interactions]
Reduced motion:          [All animations replaced with instant state transitions]
Captions:               [Yes — all voiceover captioned; caption file: VO_A1C1M1L1_S1.vtt]
Color blindness:         [No information conveyed by color alone]
Touch targets:           [All interactive elements ≥ 44×44px]
Focus indicators:        [2px cyber-blue focus ring, 2px offset, on all interactive elements]
Time-based content:      [Auto-advance has a visible timer; learner can pause]
Cognitive load:          [One instruction visible at a time; no competing CTAs]
```

---

##### 5.[ID].11 — Scene Exit Conditions

```
Normal exit:
  Condition:    [Learner completes the final interaction / Dialogue reaches its end]
  Saves:        [Yes — checkpoint created on scene exit]
  Transition:   [See Section 4.2 — S[N] → S[N+1] transition]

Early exit (learner taps pause/back):
  Behavior:     [Mission paused — state saved — resume from this scene's beginning]
  Save:         [Checkpoint at this scene's start is saved]

Force exit (app backgrounded):
  Behavior:     [Auto-save triggered immediately; resume from scene start on return]
  Data loss:    [Any interaction progress within the scene may be lost — acceptable]

Failure state:
  Condition:    [N/A — no fail states in tutorial missions]
  Behavior:     [If applicable: describe failure recovery]
```

---

##### 5.[ID].12 — Developer Notes

```
Component:          [Which React component renders this scene]
Route:              [/courses/[courseSlug]/lessons/[lessonSlug] — see router/index.tsx]
Content source:     [content/courses/[slug]/[module]/[lesson]/lesson.json]
State:              [useLessonStore — scene progression tracked via currentScene field]
New components:     [List any new components this scene requires]
Reuses:             [List existing components this scene uses]
Performance:        [Lazy-load this scene's assets; preload on S[N-1] exit]
Flag for tech lead: [Any technical concern that needs senior review]
```

---

##### 5.[ID].13 — Assets Required

| Asset ID | Type | Name | Description | Priority | Source | Notes |
|----------|------|------|-------------|----------|--------|-------|
| ASS_S1_01 | BACKGROUND | [ops-center-base.png] | [Full ops center environment] | [P0] | [Illustrator] | [Must be dark, high-res, layered PSD] |
| ASS_S1_02 | LOTTIE | [terminal-cursor.lottie] | [Blinking terminal cursor animation] | [P0] | [Motion Designer] | [30fps, looping, < 10KB] |
| ASS_S1_03 | AUDIO | [server-room-ambience.mp3] | [Looping ambient sound] | [P0] | [Audio Engineer] | [30s loop, seamless, 128kbps] |

---

##### 5.[ID].14 — Reusable Systems Used

```
DialogueEngine:     [Yes — character-by-character text rendering with timing]
InteractionEngine:  [Yes — INT_S1_01 uses standard tap interaction]
AudioEngine:        [Yes — ambient + SFX layering]
AnimationEngine:    [Yes — camera push, text type-in]
RewardEngine:       [No — no reward in this scene]
SaveManager:        [Yes — checkpoint on scene exit]
AnalyticsEngine:    [Yes — scene_start, scene_complete, interaction events]
```

---

---

# PART 3 — EXPERIENCE DESIGN

---

## Section 6 — Interaction Documentation

> 📋 AUTHOR GUIDE  
> **Purpose:** A complete catalog of every distinct interaction in the mission. Where Section 5 documents interactions within their scene context, this section documents them as standalone specifications — which becomes the engineer's implementation reference.  
> **How to complete:** List every interaction by ID. Group by type. Ensure every interaction has a clear learning purpose. If an interaction has no learning purpose, it should not exist.  
> **Common mistakes:**  
> — Interactions that are "decorative" (exists only to feel interactive) — delete these  
> — Ambiguous success conditions ("learner understands") — make them behavioral  
> — Missing failure paths — every interaction needs one  
> — Ignoring time-on-task (an interaction taking too long kills pacing)  
> **Checklist:**  
> - [ ] Every interaction has a learning purpose  
> - [ ] Every interaction has a success AND failure path  
> - [ ] Every interaction has a hint system  
> - [ ] Every interaction has an accessibility specification  
> - [ ] Average time per interaction is ≤ 90 seconds  
> - [ ] At least one interaction per 40 seconds of mission time

### 6.1 Interaction Catalog

| INT ID | Scene | Type | Learning purpose | Estimated time | Required? |
|--------|-------|------|-----------------|----------------|-----------|
| INT_S[N]_01 | S[N] | [TYPE] | [What it teaches] | [~30s] | [Yes/No] |

### 6.2 Interaction Type Specifications

For each type used in this mission, specify the standard implementation:

**TAP**
```
Behavior:       Single finger tap (or mouse click) on a target element
Feedback:       Scale 0.97→1.0 on press (80ms), visual highlight on release
Audio:          UI click — soft, 40ms
Success:        [Define per interaction]
Failure:        [Define per interaction]  
Touch target:   Minimum 44×44px
Keyboard:       Enter or Space on focused element
```

**DRAG**
```
Behavior:       Pick up element, move to target zone, release
Pickup:         Scale 1.0→1.05, shadow appears, source slot shows outline (80ms spring)
In-flight:      Element follows pointer/touch; target zones highlight as element approaches
Drop success:   Element snaps to target (spring, 180ms); scale back to 1.0; glow flash
Drop failure:   Element returns to origin (spring, 280ms); gentle shake (3px, 200ms)
Touch target:   Draggable element minimum 48×48px; drop zone minimum 80×80px
Keyboard:       Space to pick up, arrow keys to navigate between zones, Space to drop
Pointer events: Handle both pointer events and touch events; prevent page scroll during drag
```

**DECISION**
```
Behavior:       Learner selects one of 2–4 presented choices
Choices shown:  Side by side (2 options) or stacked (3–4 options)
Selection:      Tap/click option; slight scale-up; color highlight
Confirmation:   "CONFIRM" button appears; 500ms grace period before processing
Processing:     Brief processing animation (500ms) before consequence shown
Consequence:    Always shown — no answer disappears silently
All valid:      Decision interactions with no "wrong" answer: all choices lead to learning
All invalid:    If a choice can be wrong, the failure path must teach, not punish
```

**[Additional types as needed for this mission]**

### 6.3 Adaptive Difficulty

> 📋 ADDED SUBSECTION — Learning platforms must adapt to learner behavior. This defines the adaptation rules.

```
Struggle signal:    [Learner spends >90s on a single interaction without completing it]
Hint threshold:     [Hint offered after 15s inactivity on any interaction]
Auto-complete:      [After 3 hints, interaction completes automatically with AURA explanation]
Speed bonus:        [Tracked but not shown during mission — shown in summary only]
Skip option:        [No skip on core interactions. Optional "I already know this" on review interactions.]
Adaptation scope:   [Adaptive behavior affects only the current session — no persistent difficulty change in Mission 1]
```

---

## Section 7 — Dialogue Documentation

> 📋 AUTHOR GUIDE  
> **Purpose:** The complete script for the mission. Every word spoken or displayed by every character. This is a production script — voice actors, animators, and engineers work from this directly.  
> **How to complete:** Write every line in full. Do not summarize. Include timing, emotion, and stage direction for every line. Dialogue should be reviewed by the Narrative Director before the document is submitted.  
> **Common mistakes:**  
> — Dialogue that explains things ("The CIA Triad means Confidentiality, Integrity, Availability") — dialogue should reveal, not explain  
> — AURA sounding like a chatbot ("Great job! You did it!") — she is an intelligent analyst  
> — Lines that are too long (target < 15 words per line for on-screen text)  
> — Missing timing (causes animation sync errors)  
> **Checklist:**  
> - [ ] All dialogue reviewed by Narrative Director  
> - [ ] All dialogue fits within UI at smallest target screen size  
> - [ ] All VO lines recorded and named correctly  
> - [ ] All on-screen text lines < 15 words  
> - [ ] No line appears simultaneously with another  
> - [ ] All lines have localization notes where needed

### 7.1 Full Dialogue Script

> Format: [SCENE] [TIME] [CHARACTER] — [EMOTION] — [LINE]

```
[S1 — 0:05] AURA — [Neutral/Welcoming] — "We've been monitoring global threat activity."
            [Display duration: 2.5s before next line]
            [VO: VO_A1C1M1L1_S1_AURA_01.wav]

[S1 — 0:08] AURA — [Direct] — "Something just happened."
            [Display duration: 2.0s]
            [VO: VO_A1C1M1L1_S1_AURA_02.wav]

[...continue for every line in the mission...]
```

### 7.2 AURA Character Voice Guide (Mission-Specific Notes)

```
What AURA says in this mission:       [Summary]
What AURA never says in this mission: [Restrictions for this mission's tone]
Specific phrases to avoid:           ["Great job!", "Correct!", "You're so smart!"]
Specific phrases to use:             ["Exactly.", "That's the pattern.", "Look again."]
Cultural sensitivity flags:           [None / [Notes]]
```

### 7.3 Branching Dialogue Map

> If dialogue branches based on learner choices, document every branch.

```
Branch point:   [INT_S3_01 — Which violation does this represent?]

Choice A (Confidentiality):
  AURA: "[Response A]"
  XP: 0
  Next: [Hint to try again]

Choice B (Integrity):
  AURA: "[Response B]"
  XP: 0
  Next: [Hint with more context]

Choice C (Availability) — CORRECT:
  AURA: "[Response C]"
  XP: +10
  Next: [Continue to S4]
```

---

## Section 8 — Reward Documentation

> 📋 AUTHOR GUIDE  
> **Purpose:** Every XP award, badge, achievement, and unlock in this mission. The Rewards Engine reads this section. Nothing should be rewarded that isn't documented here.  
> **Common mistakes:**  
> — Rewarding completion of every micro-interaction (devalues the reward system)  
> — Not defining the celebration animation/audio for major rewards  
> — Forgetting to document what unlocks (engineering must know what becomes available)  
> **Checklist:**  
> - [ ] Total XP matches Section 1.6  
> - [ ] All rewards have celebration animations specified  
> - [ ] All unlocks are confirmed to exist in the content engine  
> - [ ] Reward timing is specified (mid-mission vs. end-of-mission)

### 8.1 XP Awards

| XP ID | Amount | Trigger | Timing | Animation | Audio |
|-------|--------|---------|--------|-----------|-------|
| XP_01 | [+50] | [Scene 2 complete] | [Immediate] | [Mini XP toast — slide in from top right] | [Soft tick sequence] |
| XP_02 | [+150] | [Core interaction correct — first attempt] | [Immediate] | [Mini XP toast] | [Soft tick sequence] |
| XP_03 | [+150] | [Mission complete] | [End screen] | [Full XP counter animation] | [Ascending tick sequence] |
| **Total** | **[350]** | | | | |

### 8.2 Badges

| Badge ID | Name | Image | Description | Trigger | Animation | Audio |
|----------|------|-------|-------------|---------|-----------|-------|
| BADGE_01 | [Intel Analyst] | [intel-analyst-badge.svg] | [Awarded for completing your first intelligence analysis] | [Mission complete] | [Full-screen materialization with particle burst] | [Achievement chord — resonant, sustained 1.5s] |

**Badge animation specification:**
```
Phase 1: Badge appears at 0.0 scale, center screen (0ms)
Phase 2: Scale to 1.2 (spring, 400ms, tension: 200, friction: 20)
Phase 3: Scale to 1.0 (spring, 200ms)
Phase 4: Glow ring expands from badge center to 200% diameter (400ms, ease-out)
Phase 5: Particle burst from badge center — [N] particles, [color], [trajectory]
Phase 6: Badge title types in character by character (40ms/char)
Phase 7: "TAP TO CONTINUE" prompt fades in (400ms)
```

### 8.3 Unlocks

| Unlock ID | Type | Content unlocked | Condition | Delivery |
|-----------|------|-----------------|-----------|---------|
| UNL_01 | [MISSION] | [Mission 2: Operation Shadow] | [This mission complete] | [Automatic — next mission highlighted in map] |
| UNL_02 | [REFERENCE] | [CIA Triad Cheat Sheet — Agent Dossier] | [Scene 4 complete] | [Added to dossier silently; notified at mission end] |

### 8.4 Mission Complete Screen

```
Layout:         [Mission title centered; XP counter below; badges displayed; CTA to continue]
Primary CTA:    ["CONTINUE TO MISSION 2 →"]
Secondary CTA:  ["REVIEW MISSION" / "SHARE BADGE"]
Animation:      [See badge animation spec above; XP counter ticks up after badge reveals]
Audio:          [Mission complete music — begin on screen display; fade after 5s to ambient]
Auto-advance:   [No — learner must tap to continue]
```

---

---

# PART 4 — AUDIOVISUAL DESIGN

---

## Section 9 — Animation & Motion Specification

> 📋 AUTHOR GUIDE  
> **Purpose:** Every animation in the mission, fully specified. Developers implement animations from this document — no creative decisions should be made during implementation.  
> **How to complete:** List every animation by ID. Group by category. Define every parameter. Never say "smooth" — say "280ms ease-out-cubic." Never say "nice animation" — say exactly what moves, where, when, and how.  
> **Common mistakes:**  
> — Vague easing ("smooth" or "fast") — always specify curve and duration  
> — Animations that fight each other (two animations on the same element at the same time)  
> — Ignoring prefers-reduced-motion (accessibility requirement)  
> — Animations that use layout properties (width, height, top, left) — GPU only  
> **Checklist:**  
> - [ ] Every animation uses only transform and opacity (GPU-composited)  
> - [ ] Every animation has a prefers-reduced-motion fallback  
> - [ ] No two animations fight on the same element  
> - [ ] All Lottie files are specified with size and performance targets  
> - [ ] Spring physics parameters are specified numerically  
> - [ ] All durations are in milliseconds

### 9.1 Animation Catalog

| ANIM ID | Scene | Name | Element | Trigger | Duration | Easing | Transform | Loop | Reduced motion |
|---------|-------|------|---------|---------|----------|--------|-----------|------|----------------|
| ANIM_S1_01 | S1 | [Terminal cursor blink] | [cursor] | [Scene start] | [500ms on/off] | [step(1)] | [opacity: 0↔1] | [Yes] | [Static cursor visible] |
| ANIM_S2_01 | S2 | [Alert card slide-in] | [alert-card] | [Scene load] | [280ms] | [cubic-bezier(.34,1.56,.64,1)] | [translateY(40px→0)] | [No] | [Instant appear] |

### 9.2 Spring Physics Reference

> Use these named spring presets. Define custom springs if needed.

| Preset name | Use case | Tension | Friction | Mass | Overshoot |
|------------|---------|---------|---------|------|-----------|
| `spring-snap` | Button press, card select | 400 | 30 | 1 | Minimal |
| `spring-entrance` | Cards, panels entering | 200 | 20 | 1 | Moderate |
| `spring-badge` | Badge reveals | 150 | 15 | 1 | Visible |
| `spring-subtle` | Hover effects | 600 | 35 | 1 | None |

### 9.3 Text Animation Specification

```
DIALOGUE TEXT (AURA speaking):
  Method:         Character-by-character reveal
  Speed:          40ms per character (base)
  Pause after sentence:   350ms
  Pause after paragraph:  700ms
  Pause on emphasis:      +15ms per character on key words
  Cursor:         Blinking cursor follows last character; disappears 500ms after line complete
  prefers-reduced-motion: Full line appears instantly; cursor still blinks

HEADING TEXT (Scene titles):
  Method:         Fade in + translateY(8px→0)
  Duration:       400ms
  Easing:         ease-out-cubic
  prefers-reduced-motion: Instant appear

BODY TEXT (Educational content):
  Method:         Fade in per-paragraph
  Duration:       300ms per paragraph, 200ms stagger
  prefers-reduced-motion: All text visible immediately
```

### 9.4 Camera Movement Specification

```
Camera movements in this mission:
  [ANIM_CAM_01]: Push toward terminal
    Start:        [Wide shot — full ops center visible]
    End:          [Medium shot — terminal fills 60% of frame]
    Duration:     [1200ms]
    Easing:       [ease-in-out-cubic]
    Trigger:      [0:30 — 15s into the scene]
    Note:         [Achieved via CSS scale transform on environment container — not actual 3D camera]
    prefers-reduced-motion: [No camera movement — scene stays at end state]
```

### 9.5 Lottie Animation Requirements

| Lottie ID | File name | Scene | Purpose | Dimensions | Target size | Loop | FPS | Complexity |
|-----------|-----------|-------|---------|------------|-------------|------|-----|------------|
| LOTTIE_01 | [aura-waveform.lottie] | [All] | [AURA's speaking indicator] | [120×40px] | [< 15KB] | [Yes] | [60] | [Low] |
| LOTTIE_02 | [badge-particles.lottie] | [S6] | [Badge earn celebration] | [400×400px] | [< 80KB] | [No] | [60] | [Medium] |

### 9.6 Particle System Specifications

```
Particle system: [PARTICLES_01 — ambient ops center dust]
  Count:          [40 particles on desktop, 20 on mobile]
  Size:           [2–4px, randomized]
  Opacity:        [0.03–0.08, randomized per particle]
  Color:          [#00D9FF (cyan) at opacity 0.05]
  Motion:         [Slow upward drift, 0.2–0.8px/frame, with subtle x-axis drift]
  Spawn:          [Random position within viewport]
  Life:           [8–15 seconds per particle, fade out over last 2s]
  Performance:    [Use canvas 2D API; pause if frame rate < 55fps]
  prefers-reduced-motion: [Disabled entirely]
```

---

## Section 10 — Audio Specification

> 📋 AUTHOR GUIDE  
> **Purpose:** Every sound in the mission. Audio engineers produce from this document. No sound is added during implementation that is not documented here.  
> **How to complete:** List every audio cue. Document trigger, timing, volume, and crossfade behavior. Define the adaptive music state machine. Specify silence as intentionally as you specify sound.  
> **Common mistakes:**  
> — Missing ambient layers (silence where there should be texture)  
> — Forgetting to specify volume (everything at 100% = audio chaos)  
> — Not designing for headphone users vs. speaker users  
> — Overlapping music cues without crossfade  
> **Checklist:**  
> - [ ] All audio files named and requested  
> - [ ] All volumes specified as 0.0–1.0 normalized  
> - [ ] Adaptive music states documented with transitions  
> - [ ] All SFX have a maximum simultaneous play count  
> - [ ] Mute/volume controls implemented  
> - [ ] No auto-playing audio before user interaction (browser policy)

### 10.1 Audio Layer Architecture

```
Layer 0 (base):    Music — master volume 0.6 (user controllable)
Layer 1:           Ambient loops — master volume 0.4
Layer 2:           Dialogue / VO — master volume 1.0
Layer 3:           SFX — master volume 0.7
Layer 4:           UI sounds — master volume 0.5

All layers routed through a master compressor.
Dialogue automatically ducks Layers 0–1 by –6dB during VO playback.
Mobile: Reduce Layer 0 by additional –3dB (speaker headroom).
```

### 10.2 Music Specification

| Track ID | Name | File | Trigger | BPM | Key | Fade in | Volume | Fade out | Loop point | Notes |
|----------|------|------|---------|-----|-----|---------|--------|----------|------------|-------|
| MUS_01 | [AURA Ambient] | [music_aura_ambient.mp3] | [Mission start] | [72] | [Am] | [2000ms] | [0.08] | [On scene change] | [16:00] | [Underscore — barely perceptible] |
| MUS_02 | [Incident Rising] | [music_incident_rising.mp3] | [S2 start] | [88] | [Dm] | [1500ms] | [0.15] | [S3 start +2000ms] | [32:00] | [Tension builds gradually] |

### 10.3 Adaptive Music State Machine

```
States:
  AMBIENT     — Low, exploratory, no tension
  BUILDING    — Tension building; approaching a challenge
  TENSE       — Challenge active; learner making a decision
  RESOLUTION  — Challenge resolved; positive or informative
  CELEBRATION — Reward moment; brief, then returns to AMBIENT

Transitions:
  AMBIENT     → BUILDING    : [Crossfade 1500ms when learner reaches a challenge scene]
  BUILDING    → TENSE       : [Crossfade 800ms when interaction begins]
  TENSE       → RESOLUTION  : [Crossfade 600ms on interaction complete]
  RESOLUTION  → CELEBRATION : [Cut to CELEBRATION if major reward; else crossfade to AMBIENT 1500ms]
  CELEBRATION → AMBIENT     : [Crossfade 3000ms — let the celebration breathe]

Trigger mapping:
  AMBIENT:     [S1, between interactions]
  BUILDING:    [10 seconds before any major interaction — triggered by timeline]
  TENSE:       [Any active DECISION or DRAG interaction]
  RESOLUTION:  [Success path complete]
  CELEBRATION: [Badge earned, mission complete]
```

### 10.4 Ambient Loops

| AUD ID | Name | File | Scenes | Volume | Notes |
|--------|------|------|--------|--------|-------|
| AMB_01 | [Server room hum] | [amb_server_room.mp3] | [S1, S6] | [0.12] | [Loop: seamless 30s clip] |
| AMB_02 | [SOC floor activity] | [amb_soc_floor.mp3] | [S2] | [0.10] | [Distant voices, keyboards, alert tones] |

### 10.5 Sound Effects Catalog

| SFX ID | Name | File | Trigger | Volume | Max simultaneous | Notes |
|--------|------|------|---------|--------|-----------------|-------|
| SFX_01 | [Keyboard typing] | [sfx_keyboard.mp3] | [Text type-in per character] | [0.15] | [1] | [Randomize pitch ±5% each play] |
| SFX_02 | [UI tap — soft] | [sfx_tap_soft.mp3] | [Any button tap] | [0.3] | [3] | [Felt more than heard] |
| SFX_03 | [Secure connection] | [sfx_secure_connect.mp3] | [Authentication success] | [0.6] | [1] | [Clean, resonant, 800ms] |
| SFX_04 | [Mission complete] | [sfx_mission_complete.mp3] | [Mission complete screen] | [0.8] | [1] | [Sustained chord, 2000ms] |
| SFX_05 | [XP tick] | [sfx_xp_tick.mp3] | [Per XP increment during counter] | [0.2] | [1] | [Pitch rises as counter approaches total] |
| SFX_06 | [Drag pickup] | [sfx_drag_pickup.mp3] | [Drag interaction — pickup] | [0.25] | [1] | [Subtle lift sound] |
| SFX_07 | [Drag drop success] | [sfx_drag_success.mp3] | [Correct drop zone] | [0.4] | [1] | [Satisfying click-snap] |
| SFX_08 | [Drag drop fail] | [sfx_drag_fail.mp3] | [Wrong drop zone] | [0.3] | [1] | [Soft thud, non-punishing] |
| SFX_09 | [Badge earned] | [sfx_badge_earned.mp3] | [Badge animation start] | [0.8] | [1] | [Resonant chord + sparkle tail] |

### 10.6 Silence Map

> Silence is a design choice. Document every intentional moment of audio silence.

| Scene | Time | Duration | Purpose |
|-------|------|----------|---------|
| S3 | [After Emma's story] | [1200ms — all audio fades] | [Weight of the human cost. Let it land.] |
| S4 | [Before the key reveal] | [500ms] | [Tension before AURA names the pattern] |
| S6 | [After AURA's closing line] | [800ms] | [Identity shift. Don't interrupt it with music.] |

---

## Section 11 — Visual & Asset Specification

> 📋 AUTHOR GUIDE  
> **Purpose:** Every visual asset required to produce this mission. Illustrators, UI designers, and motion designers work from this section. Nothing should be produced that is not on this list.  
> **How to complete:** List every asset. Use the asset naming convention. Specify exact dimensions for every asset. Specify file format. Flag P0 (mission-blocking) vs. P1 (enhancement) vs. P2 (optional/polish).  
> **Common mistakes:**  
> — Missing background layers (backgrounds should be layered PSD for parallax)  
> — Wrong color space (all assets: sRGB; print assets: CMYK — never mix)  
> — Not specifying dark/light variants (future feature)  
> — Assets that are too large (performance budget in Section 16)  
> **Checklist:**  
> - [ ] Every asset has a name, format, dimension, and priority  
> - [ ] All backgrounds are layered for parallax  
> - [ ] All icon assets are SVG (not PNG)  
> - [ ] All badge assets are SVG  
> - [ ] Total asset weight estimated and within performance budget

### 11.1 Environment Backgrounds

| Asset ID | Name | Scene | Format | Dimensions | Layers | Priority | Notes |
|----------|------|-------|--------|------------|--------|----------|-------|
| BG_01 | [ops-center-bg.psd] | [S1, S6] | [PSD + WebP export] | [1920×1080px base] | [4 layers: far/mid/near/foreground] | [P0] | [Parallax-ready; each layer separate WebP] |

### 11.2 Illustrations

| Asset ID | Name | Scene | Format | Dimensions | Priority | Notes |
|----------|------|-------|--------|------------|----------|-------|
| ILL_01 | [hospital-at-night.png] | [S3] | [WebP] | [1440×810px] | [P0] | [Dark hospital corridor, screens blank, clinical lights emergency-red] |

### 11.3 Icons & UI Elements

| Asset ID | Name | Usage | Format | Size | Priority | Notes |
|----------|------|-------|--------|------|----------|-------|
| ICO_01 | [aura-waveform.svg] | [AURA presence indicator — all scenes] | [SVG + Lottie] | [120×40px] | [P0] | [Vector only; Lottie for animation] |
| ICO_02 | [mission-badge-intel-analyst.svg] | [Mission complete screen] | [SVG] | [200×200px] | [P0] | [Must render well at 48×48px too] |

### 11.4 Typography Assets

```
Primary typeface:   JetBrains Mono (terminal, dialogue, code)
                    Weights: Regular (400), Bold (700)
                    Loaded via: Google Fonts (preload in <head>)

Secondary typeface: Inter (UI, labels, body)
                    Weights: Regular (400), Medium (500), SemiBold (600)
                    Loaded via: Google Fonts (preload in <head>)

Custom glyphs:      None in this mission
```

### 11.5 Video Assets

| Asset ID | Name | Scene | Format | Duration | Priority | Notes |
|----------|------|-------|--------|----------|----------|-------|
| VID_01 | [None in this mission] | — | — | — | — | — |

---

---

# PART 5 — ENGINEERING

---

## Section 12 — Screen Documentation

> 📋 AUTHOR GUIDE  
> **Purpose:** Every distinct UI screen in the mission, from the perspective of UI implementation. Where Section 5 is the scene-level view (story, animation, audio), this section is the screen-level view (layout, components, states, responsive behavior). Both are needed.  
> **How to complete:** A "screen" is any distinct UI state that requires its own layout. One scene may have multiple screens (e.g., a scene with a dialogue phase, then an interaction phase).  
> **Common mistakes:**  
> — Not documenting empty states and error states (they always exist in production)  
> — Ignoring the loading state (loading screens need design too)  
> — Assuming desktop layout scales to mobile (it never does)  
> **Checklist:**  
> - [ ] Every screen has an empty state  
> - [ ] Every screen has an error state  
> - [ ] Every screen has a loading state  
> - [ ] Mobile layout documented separately for every screen  
> - [ ] No screen requires horizontal scroll on 375px viewport

### SCREEN TEMPLATE (duplicate for each screen)

**Screen [ID] — [Screen Name]**

```
Screen ID:          [SCR_S1_01]
Scene:              [S1]
Phase:              [Dialogue / Interaction / Transition / Reward]
Purpose:            [What this screen does]

LAYOUT (Desktop — 1280px+):
  ┌─────────────────────────────────────────┐
  │  [Describe the layout in ASCII art or   │
  │   text. Define component regions.]      │
  │                                         │
  │  [TOP: navigation bar or none]          │
  │  [CENTER: main content]                 │
  │  [BOTTOM: CTA or dialogue]              │
  └─────────────────────────────────────────┘

LAYOUT (Mobile — 375px):
  [Describe mobile adjustments]
  [What reflows, what stacks, what hides]

UI HIERARCHY:
  <MissionContainer>
    <SceneBackground />                   — [static or animated env]
    <DialogueBox>                         — [AURA's dialogue]
      <CharacterIndicator />              — [AURA waveform]
      <DialogueText />                    — [typed text]
      <SkipButton />                      — [optional, appears after 2s]
    </DialogueBox>
    <InteractionLayer>                    — [interaction components, if active]
      [InteractionComponent]
    </InteractionLayer>
    <HUD>                                 — [mission progress, XP]
      <MissionTitle />
      <ProgressBar />
      <XPCounter />
    </HUD>
    <PauseButton />
  </MissionContainer>

STATES:
  Default:          [Normal state — describe appearance]
  Loading:          [Skeleton screen / spinner / terminal animation]
  Active:           [Interaction is available]
  Processing:       [After interaction submitted, before result]
  Success:          [Correct answer / completion]
  Failure:          [Incorrect answer — gentle, not alarming]
  Hint active:      [Hint UI visible]
  Paused:           [Mission paused overlay]
  Error:            [Failed to load content — offline state]

NAVIGATION:
  Back:             [Pause confirmation dialog — "Are you sure? Progress in this scene will be lost."]
  Forward:          [Only via interaction completion or CTA]
  Pause:            [Overlay appears; resume / restart scene / exit mission]

RESPONSIVE:
  375px:            [Describe layout]
  768px:            [Describe layout]  
  1280px+:          [Primary design target]
  
ACCESSIBILITY:
  Landmark roles:   [main, navigation, dialog, complementary]
  Focus order:      [Logical reading order; interactive elements in DOM order]
  Skip link:        [Skip to main interaction — for screen reader users]
```

---

## Section 13 — UI Component Library

> 📋 AUTHOR GUIDE  
> **Purpose:** Documents all reusable React components used or created in this mission. Anything built for this mission and likely to be reused should be documented here so future missions can reference it without rebuilding.  
> **Common mistakes:**  
> — Building mission-specific components that are actually platform-level  
> — Not documenting props (next author will rebuild from scratch)  
> — Forgetting to specify which components are NEW vs. which EXIST  
> **Checklist:**  
> - [ ] Every new component is documented with props and states  
> - [ ] Every existing component is referenced with its source location  
> - [ ] Component names follow platform convention (PascalCase)  
> - [ ] No component contains hardcoded mission content

### 13.1 Components Used in This Mission

| Component | Status | Source | Purpose in this mission |
|-----------|--------|--------|------------------------|
| `DialogueBox` | [NEW / EXISTS] | [`src/features/lesson/components/`] | [Display AURA's typed dialogue] |
| `MissionContainer` | [NEW] | [To be created: `src/features/mission/`] | [Root layout for all mission screens] |
| `InteractionDrag` | [EXISTS] | [`src/features/interactive/`] | [Drag-and-classify interaction] |
| `XPCounter` | [NEW] | [To be created: `src/features/rewards/`] | [Animated XP counter] |
| `BadgeReveal` | [NEW] | [To be created: `src/features/rewards/`] | [Mission-complete badge animation] |

### 13.2 New Component Specifications

For each NEW component:

```
Component:      [DialogueBox]
File:           [src/features/mission/components/DialogueBox.tsx]
Purpose:        [Renders AURA's typed dialogue with timing, character-by-character reveal]

Props:
  lines:        DialogueLine[]     — Required. Array of dialogue lines to display
  character:    'AURA' | string    — Required. Speaking character
  onComplete:   () => void         — Required. Called when all lines have displayed
  autoAdvance:  boolean            — Optional. Default: false
  skipEnabled:  boolean            — Optional. Default: true (after 2s)
  speed:        number             — Optional. Ms per character. Default: 40

States:
  idle          — No dialogue displaying
  typing        — Currently typing a line
  paused        — Between lines (natural pause)
  complete      — All lines displayed; onComplete called
  skipped       — User skipped; all text visible immediately

Accessibility:
  role:                "log"
  aria-live:           "polite"
  aria-label:          "AURA is speaking"
  Reduced motion:      All text visible immediately on mount; no typing animation

Animation:
  Character reveal:    40ms per character (see Section 9.3)
  Inter-line pause:    350ms
  Skip animation:      Instant reveal of remaining text (200ms fade in for any hidden text)

Developer notes:
  - DialogueLine type: { text: string; emotion?: string; timing?: number }
  - Timing override: if DialogueLine.timing is set, it overrides the default 40ms
  - Audio: triggers SFX_01 (keyboard typing) per character via AudioEngine
  - Do NOT use innerHTML for text — use character-by-character DOM insertion (XSS risk)
```

---

## Section 14 — Save & Progress Specification

> 📋 AUTHOR GUIDE  
> **Purpose:** Defines exactly when and what is saved, and how the learner's session resumes. Every mission must have a clear save contract.  
> **Common mistakes:**  
> — Not defining resume behavior (learner returns to Mission 2 expecting Mission 1 still there)  
> — Saving too frequently (performance impact)  
> — Not handling offline save (data loss when connectivity drops)  
> **Checklist:**  
> - [ ] Every checkpoint is documented  
> - [ ] Resume behavior is unambiguous for all exit scenarios  
> - [ ] Offline behavior documented  
> - [ ] Save format matches SaveExportEnvelope schema (see PHASE_1_IMPLEMENTATION_PLAN.md Gap 10)

### 14.1 Checkpoint Map

| Checkpoint ID | Trigger | What is saved | Resume behavior |
|--------------|---------|--------------|-----------------|
| CHK_01 | [Mission start] | [Mission started, Scene 1 unlocked] | [Always resume from CHK_01 on first play] |
| CHK_02 | [Scene 2 complete] | [Scene 1 complete, interaction results, XP earned so far] | [Resume at Scene 2 start] |
| CHK_03 | [Mission complete] | [Mission complete, all XP, badge earned, Mission 2 unlocked] | [Mission shows as complete; cannot replay without explicit "Replay" action] |

### 14.2 Save Data Schema

```typescript
interface MissionProgress {
  missionId:        string           // 'a1c1m1l1'
  status:           'not_started' | 'in_progress' | 'complete'
  currentScene:     string           // 's3'
  completedScenes:  string[]         // ['s1', 's2']
  interactionResults: {
    [interactionId: string]: {
      completed:    boolean
      correct:      boolean
      attempts:     number
      hintsUsed:    number
    }
  }
  xpEarned:         number
  badgesEarned:     string[]
  startedAt:        number           // timestamp
  completedAt:      number | null    // timestamp
  totalTimeMs:      number           // cumulative play time
}
```

### 14.3 Offline Behavior

```
Offline detection:    [Check navigator.onLine before mission load]
Offline display:      ["You're offline. Progress is saved locally and will sync when reconnected."]
In-mission offline:   [Continue playing — save to localStorage; sync on reconnect]
Asset loading:        [Core assets cached via service worker; first play requires connection]
Data conflict:        [Server wins on XP/badge data; local wins on progress/scene position]
```

---

## Section 15 — Technical Documentation

> 📋 AUTHOR GUIDE  
> **Purpose:** Engineering implementation details. Developers read this. No creative decisions here — only technical contracts.  
> **Common mistakes:**  
> — Omitting the mission state machine (engineers will invent one, inconsistently)  
> — Not referencing the content JSON path (content engine breaks without it)  
> — Missing dependency declarations (causes unresolved import errors at build time)

### 15.1 Mission State Machine

```
States:
  NOT_STARTED     — Mission exists but has never been played
  LOADING         — Assets being fetched; loading screen visible
  ACTIVE          — Mission in progress; current scene rendered
  PAUSED          — Learner tapped pause; overlay visible
  SCENE_COMPLETE  — Current scene finished; transition playing
  MISSION_COMPLETE — All scenes complete; reward screen
  ERROR           — Load failed; error state visible

Transitions:
  NOT_STARTED   → LOADING         : [User taps "Start Mission"]
  LOADING       → ACTIVE          : [All P0 assets loaded; Scene 1 begins]
  LOADING       → ERROR           : [Load timeout (10s) or network error]
  ACTIVE        → PAUSED          : [User taps pause or app backgrounds]
  PAUSED        → ACTIVE          : [User taps resume]
  ACTIVE        → SCENE_COMPLETE  : [Scene exit condition met]
  SCENE_COMPLETE → ACTIVE         : [Transition completes; next scene loads]
  SCENE_COMPLETE → MISSION_COMPLETE: [Last scene complete]
  MISSION_COMPLETE → NOT_STARTED  : [User taps "Replay Mission" explicitly]
  ERROR         → LOADING         : [User taps "Try Again"]
```

### 15.2 Content JSON

```
Path:   content/courses/[course-slug]/[module-slug]/[lesson-slug]/lesson.json
Schema: LessonSectionSchema (see src/lib/content/schemas.ts)

Mission-specific JSON keys:
  missionId:    Required — must match Mission ID from Section 1.1
  scenes:       Array of scene definitions
  rewards:      XP, badges, unlocks
  analytics:    Event definitions

Note: Content JSON is validated by Zod on load (see src/lib/content/loader.ts).
      Any schema change must update both the JSON and the Zod schema.
      See PHASE_1_IMPLEMENTATION_PLAN.md System 4 for the loading pipeline.
```

### 15.3 Route

```
Route:          /courses/:courseSlug/lessons/:lessonSlug
Component:      LessonPage (src/features/lesson/components/lesson-player.tsx)
Layout:         Outside AppLayout and AuthLayout (full-screen, standalone)
Auth:           requireAuth guard (Route Guard — see PHASE_1_IMPLEMENTATION_PLAN.md System 5)
Params:
  courseSlug:   [course-slug-from-content-engine]
  lessonSlug:   [lesson-slug-from-content-engine]
```

### 15.4 State

```
Global stores used:
  useLessonStore    — Scene progress, interaction results, completion status
  useXPStore        — XP accumulation and display
  useAuthStore      — User identity for analytics attribution

Local state (component level):
  Current scene     — React state; not persisted
  Active animation  — Ref; not persisted
  Audio context     — Ref; not persisted

Event Bus events fired:
  mission:start     — { missionId }
  scene:complete    — { missionId, sceneId }
  interaction:complete — { missionId, interactionId, correct, attempt }
  mission:complete  — { missionId, xpEarned, badgesEarned, durationMs }
```

### 15.5 Dependencies

```
New dependencies required:      [None / List any new npm packages]
Existing platform systems used: [AudioEngine, AnimationEngine, DialogueEngine, RewardEngine, SaveManager]
External services:              [None]
Browser APIs:                   [Web Audio API, Canvas API (particles), Pointer Events]
Minimum browser support:        [Chrome 90+, Safari 15+, Firefox 90+, Edge 90+]
```

---

---

# PART 6 — QUALITY & DELIVERY

---

## Section 16 — Accessibility Specification

> 📋 AUTHOR GUIDE  
> **Purpose:** CyberLearn is committed to WCAG 2.1 Level AA compliance. Every mission must pass a full accessibility audit before ship. This section defines the requirements.  
> **Common mistakes:**  
> — Adding accessibility as an afterthought (it must be designed in from the start)  
> — Using color alone to convey information  
> — Forgetting that reduced motion users still need to understand what happened  
> — Caption files created at end of production (they take time — order early)  
> **Checklist:**  
> - [ ] WCAG 2.1 AA compliance checklist completed  
> - [ ] All interactive elements reachable via keyboard  
> - [ ] All voiceover has VTT caption file  
> - [ ] Color contrast ≥ 4.5:1 for all text  
> - [ ] All animations have prefers-reduced-motion fallbacks  
> - [ ] Touch targets ≥ 44×44px  
> - [ ] Screen reader tested with VoiceOver (iOS/Mac) and NVDA (Windows)  
> - [ ] All images have alt text  
> - [ ] No time limits without user control (or override)

### 16.1 WCAG Compliance Table

| Criterion | Level | Requirement | Implementation |
|-----------|-------|-------------|----------------|
| 1.1.1 Non-text Content | A | All images have alt text | [All decorative images: aria-hidden; all informative images: descriptive alt] |
| 1.2.2 Captions | A | Captions for all VO | [VTT file per scene; see Section 12 Dialogue] |
| 1.3.1 Info and Relationships | A | Structure conveyed in markup | [Semantic HTML; heading hierarchy; ARIA landmarks] |
| 1.3.3 Sensory Characteristics | A | No color-only information | [Every color-coded element has text/icon/shape alternative] |
| 1.4.1 Use of Color | A | Information not by color alone | [See above] |
| 1.4.3 Contrast | AA | 4.5:1 minimum text | [Primary text #E8F0FE on #0A0F1A = 15.3:1 ✓] |
| 1.4.4 Resize Text | AA | Text scales to 200% | [Em/rem units; no fixed pixel text] |
| 1.4.10 Reflow | AA | Content reflows at 320px | [Tested at 375px minimum; no horizontal scroll] |
| 1.4.11 Non-text Contrast | AA | 3:1 for UI components | [Interactive elements: cyber-blue on dark = 7.2:1 ✓] |
| 1.4.12 Text Spacing | AA | Text spacing adjustable | [No fixed line-height; no overflow on spacing increase] |
| 2.1.1 Keyboard | A | All functionality keyboard-accessible | [Tab order; Enter/Space; Escape] |
| 2.1.2 No Keyboard Trap | A | Focus never trapped | [All modals have Escape exit] |
| 2.3.1 Three Flashes | A | No content flashes >3/s | [No flash effects; transitions are smooth] |
| 2.4.3 Focus Order | A | Logical focus order | [DOM order matches visual order] |
| 2.4.7 Focus Visible | AA | Visible focus indicator | [2px cyber-blue ring, 2px offset, on all elements] |
| 2.5.3 Label in Name | A | Visible labels match accessible names | [Button text = aria-label] |
| 3.1.1 Language of Page | A | Language declared | [lang="en" or localized equivalent] |
| 3.2.2 On Input | A | No unexpected context change | [No auto-advance without notification] |
| 4.1.2 Name, Role, Value | A | All UI components have ARIA | [See per-component specs] |

### 16.2 Reduced Motion Specification

> Every animation must specify its `prefers-reduced-motion` behavior:

```css
@media (prefers-reduced-motion: reduce) {
  /* All animations: instant state transitions */
  /* Text type-in: instant full display */
  /* Scene transitions: cross-dissolve only, 150ms */
  /* Particles: disabled */
  /* Camera movement: disabled */
  /* Spring animations: instant */
}
```

Component-level requirement: Every component that animates must read `window.matchMedia('(prefers-reduced-motion: reduce)')` on mount and disable its animation.

### 16.3 Caption Files Required

| VO File | Caption file | Format | Timing source |
|---------|-------------|--------|--------------|
| VO_[ID]_S1_AURA_*.wav | VO_[ID]_S1_AURA.vtt | WebVTT | [Audio engineer provides timestamps] |

---

## Section 17 — Analytics Specification

> 📋 AUTHOR GUIDE  
> **Purpose:** Defines every analytics event this mission fires. The data team reads this to build dashboards. No analytics event should be added during implementation that isn't here.  
> **Common mistakes:**  
> — Too many events (noise) or too few (can't diagnose problems)  
> — Missing timestamps (can't calculate time-on-task)  
> — Not tracking failure/hint events (most important for learning research)

### 17.1 Event Catalog

| Event | Trigger | Properties |
|-------|---------|-----------|
| `mission_start` | Mission begins (after loading) | `{ missionId, userId, sessionId, timestamp }` |
| `scene_start` | Scene begins | `{ missionId, sceneId, timestamp, resumedFrom? }` |
| `scene_complete` | Scene exit condition met | `{ missionId, sceneId, durationMs, timestamp }` |
| `interaction_start` | Interaction becomes active | `{ missionId, sceneId, interactionId, timestamp }` |
| `interaction_attempt` | Learner submits an answer | `{ missionId, interactionId, attempt, answer, correct, timestamp }` |
| `hint_requested` | Hint displayed (any level) | `{ missionId, interactionId, hintLevel, timeOnInteractionMs, timestamp }` |
| `dialogue_skip` | Learner skips dialogue | `{ missionId, sceneId, dialogueId, timestamp }` |
| `mission_pause` | Learner pauses | `{ missionId, currentScene, timestamp }` |
| `mission_resume` | Learner resumes | `{ missionId, currentScene, pauseDurationMs, timestamp }` |
| `mission_abandon` | Learner exits without completing | `{ missionId, currentScene, progressPercent, timestamp }` |
| `mission_complete` | Mission complete screen shown | `{ missionId, durationMs, xpEarned, firstAttemptAccuracy, timestamp }` |
| `badge_earned` | Badge awarded | `{ missionId, badgeId, timestamp }` |
| `error_shown` | Error state displayed | `{ missionId, errorType, timestamp }` |

### 17.2 Key Metrics to Track

| Metric | Definition | Target | Alert threshold |
|--------|-----------|--------|----------------|
| Completion rate | % who complete once started | ≥ 90% | < 75% |
| First-attempt accuracy | % interactions correct on first try | ≥ 80% | < 60% |
| Hint rate | % interactions requiring ≥ 1 hint | ≤ 20% | > 40% |
| Mission duration | Average time to complete | [8–12 min] | > 20 min avg |
| D1 retention | % who return to start Mission 2 within 24h | ≥ 70% | < 50% |
| Abandon scene | Scene with highest abandon rate | [Monitor] | > 15% abandon at any scene |
| Error rate | % sessions hitting error state | < 1% | > 3% |

### 17.3 Funnel Definition

```
Stage 1:  Mission loaded (mission_start fired)
Stage 2:  Scene 2 started (first scene complete)
Stage 3:  Core interaction completed (mission's primary learning interaction)
Stage 4:  Mission complete (mission_complete fired)
Stage 5:  Mission 2 started within 24h (retention)
```

---

## Section 18 — QA Checklist

> 📋 AUTHOR GUIDE  
> **Purpose:** The complete checklist QA engineers use before the mission ships. Every item must pass. If an item cannot be tested, escalate to the Technical Director.  
> **How to use:** QA engineers sign off each item. Any FAIL blocks ship until resolved.

### 18.1 Story & Learning QA

- [ ] All learning objectives are achievable by completing the mission as designed
- [ ] All dialogue is grammatically correct
- [ ] All dialogue fits within the UI without truncation at any target screen size
- [ ] Character voices are consistent with Section 7.2 voice guide
- [ ] No placeholder text (`[REPLACE THIS]`) remains in any visible UI
- [ ] All branch paths complete correctly (no dead ends)
- [ ] All interaction results produce the correct AURA dialogue response
- [ ] Mission duration falls within [minimum]–[maximum] range for 90% of QA testers

### 18.2 Animation QA

- [ ] All animations play at target duration and easing
- [ ] No animation uses layout-triggering properties (width, height, top, left)
- [ ] All animations respect `prefers-reduced-motion`
- [ ] Spring animations feel physically correct (no bouncing where none is specified)
- [ ] Text type-in speed is 40ms per character (no faster, no slower)
- [ ] Badge animation completes before `TAP TO CONTINUE` prompt appears
- [ ] All Lottie files load and play correctly on iOS Safari and Android Chrome
- [ ] No animations run simultaneously on the same element (no conflicts)
- [ ] Scene transitions complete without visual glitch

### 18.3 Audio QA

- [ ] All SFX trigger at correct moments
- [ ] Ambient audio loops seamlessly (no click at loop point)
- [ ] Music crossfades are smooth (no audio pops)
- [ ] VO is correctly synced with on-screen text
- [ ] Volume levels are balanced (no SFX louder than VO)
- [ ] Mute control mutes all audio
- [ ] Audio resumes correctly after app backgrounding and returning
- [ ] Audio plays on first interaction (browser autoplay policy respected)
- [ ] No audio plays before first user interaction

### 18.4 Interaction QA

- [ ] All interactions respond to touch and mouse correctly
- [ ] All touch targets are ≥ 44×44px
- [ ] Drag interactions work on both touch and mouse
- [ ] Hint system triggers at correct inactivity thresholds
- [ ] All success paths complete correctly
- [ ] All failure paths complete correctly (no stuck states)
- [ ] Auto-complete triggers correctly after all 3 hints displayed
- [ ] No interaction can be stuck in an incomplete state

### 18.5 Performance QA

- [ ] Lighthouse performance score ≥ 90 on Moto G4 (Chrome DevTools throttling)
- [ ] First Contentful Paint < 1.5s on 4G connection
- [ ] Time to Interactive < 3.0s on 4G connection
- [ ] Frame rate ≥ 55fps during all animations on target devices
- [ ] Total mission asset weight ≤ performance budget (Section 16)
- [ ] No memory leaks across 3 mission replays
- [ ] Particle system pauses when frame rate drops below 55fps
- [ ] All images are WebP with JPEG/PNG fallback

### 18.6 Accessibility QA

- [ ] All WCAG 2.1 AA criteria pass (see Section 16.1)
- [ ] Keyboard navigation reaches all interactive elements
- [ ] VoiceOver (iOS) narrates all content correctly
- [ ] NVDA (Windows) narrates all content correctly
- [ ] Captions are correct and synced to all VO
- [ ] Focus indicator is visible in all states
- [ ] Color contrast passes at ≥ 4.5:1 for all text
- [ ] No information conveyed by color alone
- [ ] All images have correct alt text or aria-hidden

### 18.7 Save & Progress QA

- [ ] Mission progress saves correctly at every checkpoint
- [ ] Resuming from mid-mission loads the correct scene
- [ ] Completing mission marks it complete in useLessonStore
- [ ] XP is credited exactly once (no double-credit on replay)
- [ ] Badge is awarded exactly once (no duplicate badges)
- [ ] Offline mode: progress saved locally; syncs correctly on reconnect
- [ ] App backgrounding and returning resumes correctly
- [ ] Force-closing app and reopening resumes from last checkpoint

### 18.8 Localization QA (if localized)

- [ ] All UI text fits within layout in all locales
- [ ] RTL layout correct for Arabic/Hebrew locales
- [ ] Date/time formats use locale-appropriate formatting
- [ ] All culture-sensitive content reviewed for target locale
- [ ] VO recorded for all locales

### 18.9 Regression QA

- [ ] Mission 1 complete does not break any other mission's unlock state
- [ ] XP awarded does not conflict with XP from other sources
- [ ] No CSS from this mission leaks into other routes
- [ ] No global state mutation persists incorrectly across sessions

---

## Section 19 — Acceptance Criteria

> 📋 AUTHOR GUIDE  
> **Purpose:** The explicit definition of DONE. The mission ships when and only when all acceptance criteria pass. These criteria are set before implementation begins, never after.  
> **How to write:** Use Given/When/Then format for each criterion. Be specific and measurable.

### 19.1 Functional Acceptance Criteria

```
GIVEN a new user with no prior progress
WHEN they start the mission and complete it
THEN:
  - [ ] Their progress is saved in useLessonStore with status: 'complete'
  - [ ] They have received exactly [350] XP in useXPStore
  - [ ] The [Intel Analyst] badge appears in their profile
  - [ ] Mission 2 is unlocked and visible in the mission map
  - [ ] The CIA Triad Cheat Sheet appears in their Agent Dossier

GIVEN a user who exits mid-mission (Scene 3)
WHEN they return to the mission
THEN:
  - [ ] The mission resumes at the start of Scene 3
  - [ ] XP earned before Scene 3 is preserved
  - [ ] Completed interactions before Scene 3 are shown as complete

GIVEN a user who completes the mission
WHEN they tap "Replay Mission"
THEN:
  - [ ] The mission replays from Scene 1
  - [ ] No duplicate XP is awarded
  - [ ] No duplicate badge is awarded
  - [ ] Their completion status remains 'complete'
```

### 19.2 Performance Acceptance Criteria

```
  - [ ] Lighthouse Performance score ≥ 90 on Moto G4 at 4G throttling
  - [ ] FCP < 1.5 seconds on 4G
  - [ ] TTI < 3.0 seconds on 4G
  - [ ] Frame rate ≥ 55fps on iPhone 12 and Pixel 5 during all animations
  - [ ] Total asset bundle for this mission ≤ [XMIB]
```

### 19.3 Quality Acceptance Criteria

```
  - [ ] All 18.x QA checklists pass with zero failures
  - [ ] Zero P0 or P1 bugs open at time of ship
  - [ ] WCAG 2.1 AA audit: zero violations
  - [ ] Internal playtesting rating ≥ 4.5/5 (minimum 5 testers)
  - [ ] At least one "wow moment" identified by ≥ 80% of testers
  - [ ] Zero testers described the experience as "feeling like a course or quiz"
```

### 19.4 Learning Acceptance Criteria

```
  - [ ] ≥ 80% of testers correctly complete all core interactions on first attempt
  - [ ] ≥ 90% of testers can name the CIA Triad immediately after completing the mission (exit survey)
  - [ ] ≥ 85% of testers report they want to continue to Mission 2 immediately
  - [ ] ≥ 80% of testers report the mission felt "like an experience, not a lesson"
```

---

## Section 20 — Mission Review

> 📋 AUTHOR GUIDE  
> **Purpose:** Completed AFTER the mission ships. Documents what was learned so future missions benefit. This is not a post-mortem — it is institutional knowledge.  
> **When to complete:** After first 30 days of production data, or after a significant revision.  
> **Who completes it:** Lead author + Creative Director + Analytics Lead

### 20.1 Retrospective

```
What worked exactly as designed:
  [Observations from production data and qualitative feedback]

What worked better than designed:
  [Positive surprises]

What did not work as designed:
  [Gaps between spec and learner behavior]
```

### 20.2 Analytics Summary

```
Completion rate:          [X%] vs. target [90%]  — [Above/Below/On target]
First-attempt accuracy:   [X%] vs. target [80%]  — [Above/Below/On target]
Average duration:         [X min] vs. target [8–12 min]
D1 retention to Mission 2:[X%] vs. target [70%]
Most-hinted interaction:  [INT_SX_0X — [% of learners used hint]]
Most-abandoned scene:     [SX at X% abandon rate]
Player rating:            [X.X/5 average]
```

### 20.3 Known Issues

| Issue ID | Severity | Description | Status |
|----------|---------|-------------|--------|
| ISS_01 | [P0/P1/P2] | [Description] | [Open / In Progress / Resolved in vX.X] |

### 20.4 Improvements for Next Revision

```
- [ ] [Improvement 1 — based on analytics]
- [ ] [Improvement 2 — based on player feedback]
- [ ] [Improvement 3 — based on learning outcomes]
```

### 20.5 Patterns to Carry Forward

> What should future mission authors know based on this mission's results?

```
Pattern [P01]: [e.g., "Silence for 1000ms after a key reveal improves retention — players 
                cite these moments in feedback. Do not skip the silence."]
                
Pattern [P02]: [e.g., "Drag interactions on mobile require ≥ 64px drop zones — 44px 
                causes frustration drop-off on touch devices."]

Pattern [P03]: [...]
```

---

---

# APPENDICES

---

## Appendix A — Mission Type Adaptations

> This template works for all mission types. Use these adaptations by mission type.

| Mission Type | Section 5 emphasis | Section 6 typical interactions | Section 8 music note | Section 18 extra QA |
|-------------|-------------------|-------------------------------|---------------------|---------------------|
| TUTORIAL | Extreme pacing detail; first-time-ever assumptions | TAP, DECISION only; no complex mechanics | Calm underscore; no tension | Verify every first-time interaction has a generous tutorial hint |
| STORY | Dialogue section is primary; interaction serves narrative | DECISION, INVESTIGATE, HIGHLIGHT | Cinematic; adaptive to emotional beats | All branch paths play-tested |
| PUZZLE | Interaction section is primary; dialogue supports | DRAG, CONNECT, DECRYPT, ROTATE, ZOOM | Minimal; puzzle focus requires quiet | All puzzle states QA'd (no stuck states, no unsolvable states) |
| SIMULATION | Scene section + Interaction section equally weighted | SIMULATE, COMPARE, PRIORITIZE | Tension-based adaptive | Simulation accuracy reviewed by subject matter expert |
| INCIDENT_RESPONSE | Real-world accuracy required; all case studies verified | INVESTIGATE, DECISION, TIMELINE | Escalating tension; real-time feel | SME sign-off required before ship |
| BOSS | High stakes; multiple attempt support required | Full interaction palette; hardest difficulty | Dynamic; responds to player performance | Fail path tested as thoroughly as success path |
| ASSESSMENT | No story; pure validation | DECISION, DRAG, MATCHING — standardized | None or neutral ambient | Answer correctness reviewed by Learning Director |
| CERTIFICATION | Assessment rules apply; legal compliance may apply | Standardized; no branching | None | Legal review if certification is externally recognized |

---

## Appendix B — Asset Naming Convention

```
Backgrounds:    bg_[scene]_[description].[ext]          bg_s1_ops-center.webp
Illustrations:  ill_[scene]_[description].[ext]         ill_s3_hospital-corridor.webp
Icons (SVG):    ico_[component]_[state].[ext]           ico_badge-intel-analyst.svg
Lottie:         lottie_[element]_[behavior].[ext]       lottie_aura_waveform.lottie
Audio — Music:  mus_[name]_[variant].[ext]              mus_incident-rising_loop.mp3
Audio — Ambient:amb_[environment]_[loop].[ext]          amb_soc-floor_01.mp3
Audio — SFX:    sfx_[action]_[variant].[ext]            sfx_keyboard_01.mp3
Audio — VO:     vo_[mission-id]_[scene]_[char]_[#].[ext] vo_a1c1m1l1_s1_aura_01.wav
Video:          vid_[scene]_[description].[ext]         vid_s4_patch-timeline.mp4
Fonts:          [handled by Google Fonts — no local asset needed]
```

---

## Appendix C — Performance Budget

> All missions must comply with this platform-wide budget.

| Asset category | Per-scene budget | Mission total budget |
|---------------|-----------------|---------------------|
| JavaScript (gzipped) | — | [≤ 150KB — mission-specific code only] |
| CSS (gzipped) | — | [≤ 20KB] |
| Images (WebP) | [≤ 200KB per background] | [≤ 1.5MB total] |
| Lottie files | [≤ 50KB per file] | [≤ 300KB total] |
| Audio — Music | — | [≤ 2MB total (128kbps MP3)] |
| Audio — SFX | [≤ 50KB per file] | [≤ 500KB total] |
| Audio — VO | [≤ 200KB per scene] | [≤ 1.5MB total] |
| **Grand total** | | **[≤ 6MB cold load; ≤ 2MB per scene incremental]** |

Mobile targets (reduce all budgets by 30% for sub-$200 Android devices):
```
Particle count:         Max 20 (vs. 40 on desktop)
Image quality:          WebP quality 75 (vs. 85 on desktop)
Ambient audio:          Disabled on devices with < 2GB RAM (if detectable)
Animation:              Reduce spring friction by 20% (snappier, less GPU time)
```

---

## Appendix D — Glossary

| Term | Definition |
|------|-----------|
| Scene | A narrative unit within a mission. A mission contains 4–8 scenes. |
| Screen | A distinct UI state within a scene. One scene may have multiple screens. |
| Interaction | A designed moment requiring learner action. Every interaction teaches. |
| Checkpoint | A save point. Progress is preserved up to the last checkpoint. |
| Wow moment | A moment designed to produce an emotional response strong enough to be remembered. Every mission must have ≥ 1. |
| P0 asset | Mission-blocking. Mission cannot ship without it. |
| P1 asset | Important but not blocking. Ship without if necessary; add in first patch. |
| P2 asset | Polish. Add after ship if bandwidth allows. |
| LO | Learning Objective |
| MDD | Mission Design Document — this document format |
| SME | Subject Matter Expert — cybersecurity professional who validates accuracy |
| VO | Voiceover |
| SFX | Sound Effect |
| Lottie | Vector animation format from Airbnb; used for complex UI animations |

---

## Appendix E — Template Changelog

| Version | Date | Author | Change |
|---------|------|--------|--------|
| 1.0 | [2026-07-29] | [CyberLearn Creative Team] | Initial release |

---

*CYBERLEARN MISSION DOCUMENTATION TEMPLATE · Version 1.0 · Official Platform Standard*  
*This document governs all mission production. Do not modify without Lead Game Director approval.*  
*Maintained at: `docs/missions/MISSION_TEMPLATE.md`*
