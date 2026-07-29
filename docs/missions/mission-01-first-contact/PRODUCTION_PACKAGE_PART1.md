# OPERATION: FIRST CONTACT — COMPLETE PRODUCTION PACKAGE
## Part 1 of 4 — Sections 1, 2, 3

**Mission ID:** MISSION-001  
**Codename:** Operation: First Contact  
**Academy:** Academy 1 — Digital Security Landscape  
**Module:** Module 1 — Welcome to the Grid  
**Lesson Slot:** 1 of 380  
**Document Version:** 1.0  
**Status:** Production Ready

---

# SECTION 1 — MISSION OVERVIEW

## Core Identity

| Field | Value |
|-------|-------|
| Mission ID | MISSION-001 |
| Mission Name | Operation: First Contact |
| Academy | Academy 1 — Digital Security Landscape |
| Module | Module 1 — Welcome to the Grid |
| Duration | 18–22 minutes (first play) / 12–15 minutes (replay) |
| Difficulty | Adaptive Introductory |
| Estimated XP | 350 base + up to 250 bonus = 600 max |

## Learning Outcomes

By completing this mission, the learner will be able to:

1. **Define** cybersecurity as the practice of protecting systems, networks, and data from digital attacks, unauthorized access, damage, and disruption
2. **Explain** the CIA Triad — Confidentiality, Integrity, Availability — in plain language using a real-world scenario
3. **Recognize** that cyber threats are real, continuous, human-originated, and target institutions people depend on
4. **Identify** the structural markers of a phishing email (domain spoofing, urgency cues, external links)
5. **Claim** their own role as a future cybersecurity professional — not as a student, but as an analyst

## Prerequisites

None. This is the absolute entry point of the entire platform. No prior knowledge assumed. No account history required beyond initial registration.

## Completion Criteria

All of the following must be satisfied:

- [ ] Learner advances through all 5 scenes (skipping is allowed)
- [ ] Learner correctly identifies the phishing entry in Scene 3 (hint assistance accepted)
- [ ] Learner submits the Incident Report with at minimum Sections 1, 2, and 4 filled
- [ ] Learner receives the Analyst ID card in Scene 5

## Replayability

**On replay, the following changes activate:**

- The phishing email in Scene 3 has a different subject line and sender domain variant (drawn from a pool of 4 rotations)
- ARIA opens with alternate dialogue: *"I see you're back. Good. The best analysts review everything twice."*
- If the learner has completed Module 2+, ARIA unlocks a hidden reference in Scene 2: *"You already know some of this. Show me anyway."*
- Scene 3 log entries shuffle order (threat entry position randomized within positions 2–6)
- Replay XP: 150 XP maximum. No duplicate achievement awards. One new hidden achievement unlocked only on replay.

## Estimated XP

| Source | XP |
|--------|-----|
| Base completion | 350 |
| Sharp Eyes bonus (no hints) | +100 |
| Speed bonus (completed < 15 min) | +50 |
| Explorer bonus (all 5 log entries clicked before flagging) | +50 |
| Analyst Notes bonus (Scene 4 free text ≥ 50 characters) | +50 |
| **Maximum** | **600** |

## Achievements

### Visible

| ID | Name | Trigger | Badge |
|----|------|---------|-------|
| ACH-001 | First Responder | Complete Mission 1 for the first time | Bronze |
| ACH-002 | Sharp Eyes | Identify the phishing threat with zero hints used | Silver |
| ACH-003 | Question Everything | Click and expand all 5 terminal log entries before submitting | Bronze |

### Hidden

| ID | Name | Trigger | Reveal |
|----|------|---------|--------|
| ACH-H01 | The Silent Read | Spend 30+ seconds viewing ARIA's visual before she speaks | Revealed at mission complete |
| ACH-H02 | Archivist | Discover all 3 embedded easter eggs in the terminal log (see Section 14) | Revealed at mission complete |
| ACH-H03 | Gut Check | Correctly identify the threat on first attempt in under 60 seconds | Revealed at mission complete |
| ACH-H04 | Back Again | Complete the mission a second time | Revealed on replay |

## Hidden Moments (Easter Eggs)

Three hidden data points are embedded in the terminal log in Scene 3:

1. **The Analyst Name:** Analyst "M. Chen" in the phishing email is a reference to the fictional SENTINEL founding team. Clicking her name in the expanded email entry shows a micro-profile: *"Maya Chen — SENTINEL Analyst Level 4 — 7 years of service."* No reward — pure world-building.
2. **The IP Trace:** The sender IP `185.234.218.114`, if clicked, opens a read-only geo-trace panel showing the origin country and a note: *"This IP has appeared in 847 phishing campaigns since 2021."* Unlocks Archivist progress.
3. **The Domain Registry Date:** The `sent1nel.net` domain, shown in the email comparison in Scene 4, has a tooltip on the domain showing: *"Registered 3 days ago."* This detail is real investigative tradecraft — domain age is a genuine phishing signal. Unlocks Archivist progress.

## Accessibility Notes

| Feature | Implementation |
|---------|---------------|
| Closed Captions | All dialogue captioned. Toggle in top-right HUD. Styled as terminal output, not generic subtitle bar. |
| Keyboard Navigation | Full keyboard support. Tab/Arrow keys for navigation, Enter to confirm, Escape to skip/pause. |
| Screen Reader | All interactive elements have descriptive ARIA labels. Terminal log rendered as structured table with row headers. |
| Reduced Motion | All particle and camera animations disabled. Character cascade replaced by sequential text fades. Camera movements become instant cuts. Pulse effects become static glows. |
| Color-Blind Mode | Red/green status indicators replaced with shape + text label. [!] prefix added to all threat indicators in terminal. No information is conveyed by color alone. |
| Dyslexia Font | Toggle activates OpenDyslexic font across all mission text. |
| Reading Mode | Auto-pause after every dialogue segment. Learner advances manually with Enter. |
| Touch/Mobile | Drag interactions have tap-to-select fallback. All targets ≥ 44px touch area. |

## Difficulty

**Adaptive Introductory.** This mission cannot be failed.

- If the learner hesitates 45+ seconds during threat identification: a subtle red pulse glow highlights the left border of the correct entry (3 pulses, 2-second fade-in, 10-second display window). No text indicator.
- If the learner flags the wrong entry: a single retry is granted. The incorrect entry receives a `✓ Legitimate — Explained` marker. ARIA says: *"Look more carefully. That one has a legitimate explanation."*
- If the learner fails twice on the CIA Triad quiz: ARIA provides a single targeted hint for the failed item only. No XP penalty.

## Learning Psychology

| Principle | Application |
|-----------|-------------|
| Narrative Transportation | Immersive story context reduces critical skepticism, accelerating belief and retention of concepts |
| Identity Formation | Learner is called "Analyst" from the first second. By the end, they have a literal Analyst ID card. |
| First Success Syndrome | Challenge calibrated so ~94% of learners succeed on first or second attempt, creating authentic competence |
| Emotional Priming | Music and ambient lighting create mild productive tension immediately before each learning moment |
| Spaced Micro-Repetition | CIA Triad introduced visually (icon), verbally (ARIA), applied (quiz), applied again (incident report), reinforced (debrief) — 5 passes in 22 minutes |
| Social Proof | Terminal data shows "384 analysts online globally" in the ambient ticker. The learner is not alone. |
| Closure Drive | The Incident Report creates an open loop; submitting it provides cognitive closure, cementing the memory |
| Embodied Cognition | Learner types/selects their own analysis rather than passively reading — motor engagement deepens encoding |

## Mission Philosophy

The first mission's job is not to teach cybersecurity. Its job is to make the learner believe — in their bones — that they are a cybersecurity professional. The learning follows the identity.

This mission is designed so that by minute five, no learner thinks *"I am a student taking an online course."* They think *"I am an analyst on my first day, and something real is happening."*

Every creative decision — ARIA's voice, the terminal aesthetic, the Analyst ID card, the debrief language — serves this goal. We are not presenting information. We are constructing a person.

The moment that makes this mission timeless is Scene 3, when ARIA says: *"Somewhere in this data stream, a real person is trying to hurt real people. Your job — starting right now — is to find them."* Then silence. The music drops. The cursor blinks. It is just the learner and the data.

That is the moment they become an analyst.

---

# SECTION 2 — EMOTIONAL JOURNEY MAP

Every minute of the experience mapped against emotional state, cause, interaction, learning, and inner monologue.

| Time | Emotional State | Intensity (1–10) | Trigger | Interaction | Learning Moment | Expected Learner Thought |
|------|----------------|-----------------|---------|-------------|-----------------|--------------------------|
| 0:00–0:10 | Anticipation | 3 | Black screen, single cursor blink | None (passive) | None | *"What is this? Where's the course?"* |
| 0:10–0:28 | Curiosity | 5 | Cyber-blue character cascade resolving into text | None | None | *"This looks different. This doesn't look like any course I've taken."* |
| 0:28–0:55 | Wonder | 7 | Camera drifts through the Sentinel Operations Center | None | None | *"Whoa. I'm somewhere. This is a place."* |
| 0:55–1:30 | Slight unease (productive) | 6 | Alert ticker reveals global incidents; two analysts visible at work | None | Cybersecurity is real, global, ongoing | *"There's actual stuff happening here. This isn't theoretical."* |
| 1:30–2:00 | Orientation | 4 | ARIA's waveform activates on the center monitor | None | None | *"Okay. There's a guide. Good."* |
| 2:00–2:45 | Trust building | 5 | ARIA introduces herself as "partner, not teacher" | Listen/read | What is SENTINEL | *"She knows what she's talking about. I'll follow her."* |
| 2:45–3:30 | Interest | 6 | ARIA describes real-world stakes — hospitals, power grids, banks | Listen/read | Stakes of cybersecurity | *"Oh. This actually matters to people's lives."* |
| 3:30–4:30 | Focused curiosity | 6 | ARIA activates CIA Triad icons on the left monitor | Explore 3 clickable icons | CIA Triad — first introduction (visual + verbal) | *"Three concepts. I can hold three things."* |
| 4:30–5:30 | Active engagement | 7 | CIA Triad micro-quiz — drag-and-match | Drag icons to scenario cards | CIA Triad — application | *"I'm actually doing something. Let me think about this."* |
| 5:30–5:45 | Small pride | 7 | Correct answers confirmed — ARIA: "Good." | See result feedback | CIA Triad — confirmed understanding | *"I got that right. On my first try."* |
| 5:45–6:00 | Pleasure | 6 | CIA Triad badge earned — flies to HUD | Watch animation | None | *"That felt good."* |
| 6:00–6:30 | Tension spike | 8 | Alert tone. ARIA's waveform shifts. "We have an anomaly." | None (involuntary attention) | Threats arrive without warning | *"Wait — something's happening. Is this real?"* |
| 6:30–7:00 | Focus | 8 | ARIA: "You're on it." Terminal fills the screen. | Navigate to terminal view | Real threat investigation context | *"I have a job to do. Right now."* |
| 7:00–9:00 | Detective engagement | 7 | Scrolling through terminal log — 5 expandable entries | Expand and read entries | Threat identification skills; normal vs anomalous behavior | *"I'm actually looking at data. Real-looking data. And I'm trying to figure out what's wrong."* |
| 9:00–9:30 | Productive doubt | 6 | Multiple suspicious-looking entries; must choose only one | Deliberate | CIA Triad application; critical analysis | *"Wait — a few of these look weird. Which one is THE threat?"* |
| 9:30–9:45 | The Quiet | 10 | Music drops to near-silence. ARIA still. Cursor blinks. | 5-second natural pause before submission | Nothing — this is the memory-forming moment | *"It's up to me. Just me."* [This is the moment they remember in 10 years.] |
| 9:45–10:15 | Relief or retry | 8 | Correct: green flash, ARIA's warmth. Incorrect: gentle feedback, retry. | Submit finding | Phishing identification — confirmed or corrected | *"Yes!"* / *"Okay — let me look again."* |
| 10:15–11:30 | Investment | 7 | Filling out the Incident Report | Fill 3 form fields | Writing about threats reinforces encoding | *"I'm filing a report. Like an actual analyst."* |
| 11:30–13:00 | Revelation | 8 | ARIA debriefs with attack chain visualization | Watch/read debrief | Phishing mechanics; domain spoofing; credential theft | *"Oh. I actually stopped something. I actually just prevented something from happening."* |
| 13:00–13:30 | Gravity | 7 | ARIA shows what WOULD have happened — the damage chain | Watch visualization | Stakes of a single compromised credential | *"One email. One click. And it could have been catastrophic."* |
| 13:30–14:30 | Pride | 8 | "That's good work, Analyst." | None | Identity reinforcement | *"She means it. That wasn't praise for the sake of it."* |
| 14:30–15:30 | Belonging | 9 | Mission Complete. SENTINEL Analyst ID card issued with their name. | Click to accept ID | Identity formation — they ARE an analyst now | *"I have an ID. I'm part of something."* |
| 15:30–16:30 | Excitement | 9 | XP counter animation, achievement unlocks, path forward shown | Navigate results | None | *"350 XP. I want more. What's next?"* |
| 16:30–17:30 | Anticipation for next session | 8 | Mission 2 preview card and path visualization | Click or close | Preview of coming curriculum | *"Ghost in the Wire. Okay. I want to know what that is."* |
| 17:30–18:00 | Warmth | 7 | ARIA: "See you at mission two, Analyst." Cursor blinks. | None | None | *"She'll be there. I'm coming back."* |

### Emotional Arc Summary

The arc follows a deliberate psychological shape:

```
10 |                                     ★ 9:35 THE QUIET
 9 |                                                     ★ 15:00 BELONGING
 8 |                              ★ 6:15                          ★ 13:30
 7 |         ★ 0:55                TENSION    ★ 11:30         ★ 14:30
 6 |   ★ 0:28     ★ 2:45                  REVELATION
 5 |                    ★ 1:30
 4 |
 3 | ★ 0:00
   |_________________________________________________________
     0:00                9:00               15:00         18:00
```

The design intent: tension rises from moment one, peaks at "the quiet" before threat submission (the emotional climax), then releases into earned pride and belonging. The mission does not end at the peak — it gives the learner time to breathe and feel the victory.

---

# SECTION 3 — COMPLETE EXPERIENCE TIMELINE

Every scene from 0:00 to Mission Complete.

---

## SCENE 0 — BOOT SEQUENCE
**Scene ID:** S0-BOOT | **Timecode:** 0:00–0:28 | **Duration:** 28 seconds

**Purpose:** Cold open. Signal immediately that this experience is different. No menus. No welcome screens. Just immersion from the first frame.

**Environment:** Black void. No UI chrome. No navigation bar. No logo. Just screen.

**Camera:** Fixed. Full screen.

**Lighting:** None for first 3 seconds. Then phosphor-blue glow begins at 0:08.

**Music:**
- 0:00–0:04: Total silence.
- 0:04–0:10: Sub-bass hum, 18Hz, felt not heard, at −40dB. A sensation, not a sound.
- 0:10–0:20: A single high-frequency ping, 2.4kHz, 80ms duration, at −18dB. Like a sonar hit.
- 0:20–0:28: Ambient data-stream drone begins, barely audible (−28dB). A continuous, slightly modulating pad.

**Ambience:**
- 0:05: Distant server room fans. Barely there. Spatially front-center.
- 0:15: A single keyboard keystroke. One key. In an impossibly large, empty room. Stereo centered.

**Dialogue:** None.

**Visual Sequence (precise frame-by-frame):**
- 0:00–0:03: Pure `#000000`. Cursor blinks white, 1×16px, 500ms on / 500ms off. Top-left position. Nothing else.
- 0:03–0:08: Characters begin appearing across the full screen, cascading from top to bottom in independent columns. Font: `JetBrains Mono` or `Fira Code`, 12px. Color: `#00D9FF` (cyber blue) at 40% opacity. Characters are random ASCII: A–Z, 0–9, `@`, `#`, `$`, `%`, `>`, `<`, `/`.
- 0:08–0:14: The cascade continues but characters on the top lines begin to "resolve" — left to right, one column at a time. Random characters flicker 3 times then lock into readable text. Line 1 forms: `SENTINEL NETWORK OPERATIONS CENTER`. Text color: `#00D9FF` at 100% opacity.
- 0:14–0:20: Line 2 resolves: `INITIALIZING SECURE CHANNEL...` — followed by a blinking ellipsis that ticks three times then stops.
- 0:20–0:24: Line 3 resolves: `ANALYST CREDENTIALS VERIFIED`
- 0:24–0:27: Line 4 resolves: `WELCOME, ANALYST.` — the word `ANALYST` pulses once in `#00FF87` (cyber green). Duration of pulse: 600ms ease-in, 400ms ease-out.
- 0:27–0:28: Entire screen whites out. White fill `#FFFFFF`, opacity 0→1 over 200ms ease-out.

**Interaction:** None. Fully passive cinematic sequence.

**Skip:** After 0:10, learner may press Escape or hold Space for 1.5 seconds to skip. White-out transition plays immediately on skip.

**Animation Specs:**
- Character cascade: CSS animation via React component `<BootSequence>`. Uses `requestAnimationFrame`. 80 columns × 30 rows grid. Stagger: 12ms per column. Each column starts at a random row offset.
- Character resolve: each character cycles 3 random alternates at 40ms interval, then locks. Flash on lock: white, 40ms.
- White-out: `position: fixed`, `inset: 0`, `background: #fff`, CSS opacity transition `200ms ease-out`.
- Total DOM weight: ~120 spans. No images. No video.

**Transition:** Hard white cut to Scene 1.

**Failure Handling:** N/A — no interaction to fail.

**Accessibility:**
- Screen reader: Announces at 0:24 — "SENTINEL NETWORK OPERATIONS CENTER. Analyst credentials verified. Welcome, Analyst." Single announcement.
- Reduced motion: Remove cascade. Show each text line fading in sequentially — 400ms fade-in per line, 600ms gap between lines. Cursor blink only.
- Captions: Not needed (no spoken dialogue). On-screen text sufficient.

**Developer Notes:**
- This scene is pure React + CSS — no external animation library needed. Framer Motion is overkill here; it adds bundle weight.
- The BootSequence component should be lazy-loaded. It only runs once per session.
- White-out div should unmount after Scene 1 has loaded (not just hidden) to free memory.
- Total asset weight target: < 4KB including JS for this scene.

---

## SCENE 1 — THE SENTINEL OPERATIONS CENTER
**Scene ID:** S1-OPS-CENTER | **Timecode:** 0:28–2:00 | **Duration:** 92 seconds

**Purpose:** World establishment. Make the learner feel genuinely present in a real cybersecurity operations center. No dialogue. Pure atmosphere, architecture, and camera movement.

**Environment:**

The Sentinel Operations Center (SOC). A large open-plan facility on the upper floor of a modern building. Described top to bottom:

- **Ceiling:** Exposed industrial structure. Steel I-beams. Acoustic panels in dark grey. HVAC ducts visible. Directional downlights creating pools of cold-blue illumination. No warm light sources.
- **Main display wall (North):** A 40-foot curved wall covered in modular display panels. Shows: (1) A real-time world map with animated threat indicators — small pulsing dots in amber and red showing active attack origins and targets globally. (2) A live packet-flow bar chart across the top. (3) A global incident counter in the top-right corner, counting upward slowly. The wall is always moving. Nothing on it is static.
- **Analyst tiers:** Three stepped tiers of workstations facing the display wall. Each tier: four workstations side by side. Each workstation: three monitors, a mechanical keyboard, a phone handset. Only 6 of the 12 workstations are occupied (silhouettes visible, not detailed). The silhouettes type, scroll, lean back, stand occasionally. They are alive.
- **Left wall:** Floor-to-ceiling glass panels looking into an adjacent server room. Servers visible through the glass. LED status lights blink in patterns — blues and greens mostly, occasional amber.
- **Right wall:** A large analog-style clock showing UTC time. Below it: the SENTINEL wordmark in sans-serif, white on dark — no logo, just the word. Below that: "ESTABLISHED 2019."
- **Floor:** Polished dark concrete. A subtle hexagonal grid pattern is etched into the surface — visible only when light reflects at the right angle. Under the learner's workstation, the grid glows faintly `#00D9FF`.
- **The Learner's Workstation:** Front-center of the middle tier. Three monitors, all dark on entry. The chair is empty. A coffee mug is on the desk (cold, no steam — subtle detail).

**Camera Movement:**

- **0:28–0:38:** Camera starts at floor level beneath the main display wall. Facing the learner's workstation from across the room. Slow upward crane shot, 0.8°/second tilt. The display wall fills the top of frame as we rise. **Field of view:** 35mm equivalent. **Depth of field:** foreground elements (desk edge) very slightly blurred.
- **0:38–0:55:** Camera dollies slowly left, tracking at 0.4 m/s. We see the full width of the SOC. Two analyst silhouettes pass in the foreground, slightly out of focus (bokeh: f/2.2 equivalent). The server room glass comes into frame right.
- **0:55–1:10:** Camera settles into a medium shot of the learner's workstation. Three dark monitors. The empty chair slowly pushes in toward the desk — as if someone just sat down. Spring physics: overshoot by 2cm, settle in 800ms. This is the learner.
- **1:10–1:30:** Center monitor flickers. A login prompt appears on the black screen. Sound of three keystrokes. The terminal logs in. Output: `sentinel@ops-center:~$` — cursor blinks.
- **1:30–2:00:** Left monitor activates, showing a live packet-flow visualization (the platform's own `PacketFlowVisualizer` component, low-detail mode). Right monitor activates, showing a cropped view of the global threat map — a live feed. The workstation is now fully alive. We are in.

**Lighting:**

- Primary ambient: `#1A2535` — deep blue-grey overhead
- Main display wall glow: `#FF6B35` (amber/orange) — warm cast on analyst silhouettes
- Server room backlight: `#00D9FF` pulsing through the glass at 0.4Hz
- Learner's workstation: once monitors activate, the monitors become the primary light source on the desk surface — cool white-blue, approximately `#E8F4FF`
- No sunlight. No windows. Timeless.

**Music:**

- 0:28–0:55: Ambient drone continues from Scene 0, slightly fuller. A low pad: Cm, root note only, sustained. No melody. −22dB.
- 0:55–1:30: First melodic element: a single crystalline synth note (C4, 261Hz) enters at −18dB. Sustained 8 seconds. Bell-like decay.
- 1:30–2:00: A low, subtle percussion element begins: a 16th-note hi-hat pattern at 110BPM, at −30dB. This is the heartbeat of the SOC. It will subtly persist throughout the mission.

**Ambience (spatial audio where supported):**

- Server room fans: continuous, stereo-right, −22dB
- Keyboard clicks from other analysts: scattered, left-center-right, −32dB, random interval 3–8 seconds
- Alert tone from distant workstation (not the learner's): once, at 1:12, stereo-left, −36dB
- HVAC air movement: very low broadband noise, −38dB continuous
- At 1:15, very faint: elevator bell in the far distance, one chime

**Dialogue:** None.

**Interaction:** None. Pure cinematic sequence.

**Skip:** Escape or hold Space 1.5 seconds → jump to 2:00 with 200ms crossfade.

**Transition:** No hard cut. The scene transitions seamlessly into Scene 2 as ARIA's waveform materializes on the center monitor.

**Failure Handling:** N/A.

**Accessibility:**

- Screen reader: Announces at 1:00 — "You are now in the Sentinel Operations Center. A large open-plan cybersecurity operations facility. Multiple analyst workstations face a curved display wall showing a global threat map. Your workstation activates."
- Reduced motion: No camera movement. Static environment illustration (2D layered composition) with sequential element fade-ins: display wall fades in first (600ms), then analyst silhouettes (400ms), then learner's workstation (400ms). Monitor activation is an instant state change with a subtle fade.
- Captions: At 0:32, a location subtitle appears: `SENTINEL NETWORK OPERATIONS CENTER — NIGHT SHIFT` in small monospace text, bottom-left, fades after 4 seconds.

**Developer Notes:**

- The environment is a layered 2D composition (SVG + CSS 3D transforms), not a 3D model. This keeps the experience performant across all devices.
- The "camera" movements are CSS `transform: perspective()` + `translateZ()` animations.
- Analyst silhouettes are CSS shapes with subtle breathing animations (scale 1.0 → 1.005 every 4 seconds).
- The PacketFlowVisualizer on the left monitor runs in a sandboxed `<canvas>` element at 50% detail to save CPU.
- The global threat map dots are SVG circles with randomized pulse animations, pre-generated at build time.
- Transition to Scene 2: ARIA's monitor overlay fades in with `opacity: 0 → 1` over 600ms.

---

## SCENE 2 — ARIA SPEAKS
**Scene ID:** S2-ARIA-INTRO | **Timecode:** 2:00–5:30 | **Duration:** 210 seconds

**Purpose:** Introduce ARIA. Establish trust. Build the learning relationship. Introduce CIA Triad — visually, verbally, and through micro-interaction.

**Environment:** Same SOC. Camera locked on learner's workstation. ARIA's waveform occupies the top 55% of the center monitor. The bottom 45% shows her real-time dialogue transcription as she speaks, styled as terminal text.

**ARIA's Visual Design:**

ARIA is not a rendered face. She is an abstract energy form.

- **Base form:** A fluid, multilayered waveform. Think: the interference pattern created by two waveforms meeting. Three layers of sinusoidal curves, each moving at slightly different frequencies (0.3Hz, 0.7Hz, 1.1Hz). They interact, creating ever-changing nodes and antinodes.
- **Eye analogue:** Two stable bright nodes in the upper third of the waveform. They do not blink. They are always present. When ARIA is attentive, they brighten. When she is thinking, they dim slightly.
- **Voice representation:** As she speaks, the waveform amplitude modulates to match her voice — taller peaks on emphasized syllables, quieter on pauses.
- **Colors:** Base gradient: `#00D9FF` (cyber blue) → `#7B5EA7` (purple) at the edges. When she says something important, a pulse of `#00FF87` (green) ripples outward from the center node.
- **Background:** Her display area has a very subtle dark hexagonal grid, `#0D1420`, that the waveform plays over. Depth.
- **When idle/thinking:** Waveform slows to approximately 30% normal amplitude. Eye-nodes dim to 60% brightness. This reads as "thoughtful" not "off."

**Camera:** Static. Medium close-up on center monitor. Background SOC has f/2.8 equivalent blur.

**Lighting:** ARIA's waveform casts a blue-purple glow on the learner's desk surface. When she mentions something serious (casualties, consequences), the ambient behind her warms slightly toward `#FF6B35`.

**Music:**

- 2:00–2:05: ARIA's waveform activates. Her 4-note theme plays: C → D → G → E on a crystalline bell synth. 3 seconds duration. Full, clean, beautiful. Then subsides.
- 2:05 onward: The ambient heartbeat from Scene 1 continues. No new melodic elements during dialogue. The music steps back entirely for ARIA.
- Music re-enters during CIA Triad section (3:30) — a brief 2-note response to each icon activation.

**ARIA's Dialogue — Complete Script with Direction:**

---

**[Beat: 0.5 seconds of silence after waveform resolves. ARIA is looking at the learner.]**

**ARIA:** *(warm, direct, slightly amused — like a brilliant colleague who's glad you're here)*
"Analyst. You're on time. I appreciate that."

**[Beat: 0.8 seconds]**

**ARIA:** *(measured, deliberate)*
"I'm ARIA — Adaptive Response Intelligence Assistant. I'll be your partner here at SENTINEL."

**[Beat: 0.4 seconds]**

**ARIA:** *(firmer, each word weighted)*
"Not your teacher. Not your supervisor."

**[Beat: 0.3 seconds — waveform pulses once, green]*
"Your partner."

**[Beat: 1.0 seconds — waveform stills briefly]**

**ARIA:** *(quieter, almost confessional)*
"The people who built me thought that word mattered. I've come to agree."

**[Beat: 1.2 seconds]**

**ARIA:** *(shifting to operational tone — still warm, now grounded)*
"Let me tell you what SENTINEL does. In plain terms."

**[Beat: 0.5 seconds]**

**ARIA:**
"Every day, thousands of attacks target organizations that people depend on. Hospitals. Power grids. Banks. Schools."

**[Beat: 0.4 seconds — camera slowly pans left, revealing two analyst silhouettes at work across the room, then slowly returns to ARIA over 3 seconds]**

**ARIA:** *(with quiet weight)*
"Water treatment facilities."

**[Beat: 0.6 seconds]**

**ARIA:**
"Most people never see these attacks. Most attacks fail — because of people like the analysts in this room."

**[Beat: 1.0 seconds — waveform brightens — her most direct moment so far]**

**ARIA:**
"You're going to become one of those people."

**[Beat: 1.5 seconds — let it sit]**

**ARIA:** *(transitioning — now slightly more instructional but never losing warmth)*
"Before we get to our first live incident — and yes, we have one — I need to give you the three laws of defense."

**[Beat: 0.4 seconds]**

**ARIA:**
"Every decision you'll ever make in this field traces back to these three concepts."

**[LEFT MONITOR: Three holographic icon cards slide in, staggered 300ms apart. Each card is approximately 200×200px. Animation: slide-in from left edge, spring physics, slight overshoot, settle in 500ms.]**

**ARIA:** *(each concept gets a deliberate pause — she lets the word sink)*
"Cybersecurity professionals call it the CIA Triad. Not the agency."

**[Waveform flickers with a brief amused pulse — the one joke in the entire mission]**

**[Beat: 0.5 seconds]**

**ARIA:** *(pointing gesture implied by waveform brightening toward Card 1)*
"**Confidentiality.**"

**[Card 1 glows `#00D9FF` — lock icon pulses once]**

**ARIA:**
"Information reaches only those who are authorized to have it."

**[Beat: 0.6 seconds]**

**ARIA:** *(pointing toward Card 2)*
"**Integrity.**"

**[Card 2 glows `#00FF87` — shield checkmark pulses once]**

**ARIA:**
"Information is accurate. It hasn't been secretly altered."

**[Beat: 0.6 seconds]**

**ARIA:** *(pointing toward Card 3)*
"**Availability.**"

**[Card 3 glows `#7B5EA7` — uptime graph pulses once]**

**ARIA:**
"Systems and data are accessible when the people who need them need them."

**[Beat: 1.0 seconds — waveform slows]**

**ARIA:** *(the complexity — don't hide it)*
"You will encounter scenarios where all three are violated simultaneously. You will encounter scenarios where protecting one requires compromising another."

**[Beat: 0.5 seconds]**

**ARIA:** *(simply)*
"That tension is the job."

**[Beat: 1.0 seconds — waveform brightens — CIA quiz trigger]**

**ARIA:**
"For now — let's see if you already understand them."

**[CIA MICRO-QUIZ ACTIVATES — Scene 2.5]**

---

**[After quiz completion — ARIA resumes]**

**[Beat: 0.4 seconds]**

**ARIA:** *(genuine — not performative praise)*
"Good."

**[Beat: 0.6 seconds — waveform glows steadily]**

**ARIA:**
"Faster than most first-day analysts, if you're wondering."

**[Beat: 1.0 seconds — waveform shifts — brightening and quickening. The atmosphere changes.]**

**ARIA:** *(the shift to action — now alert)*
"We have an anomaly in the network. I've been watching it for four minutes. It's time for a second set of eyes."

**[Beat: 0.8 seconds]**

**ARIA:** *(delivering the mission)* 
"Somewhere in this data stream, a real person is trying to hurt real people."

**[Beat: 0.4 seconds]**

**ARIA:** *(direct, simple, weighty)*
"Your job — starting right now — is to find them."

**[MUSIC DROPS TO NEAR-SILENCE. The ambient heartbeat continues at −40dB. ARIA's waveform stills completely. The cursor blinks on the terminal. 5 full seconds of near-silence. This is the moment.]**

**ARIA:** *(softer — almost private — just between them)*
"I'll be right here."

**[Terminal activates. Scene 3 begins.]**

---

**Voice Performance Direction:**

The voice of ARIA is performed as if she is the smartest person in the room who has chosen to speak to the learner as an equal. She is not teaching. She is orienting a new partner.

- **"You're on time. I appreciate that."** — She actually appreciates it. This isn't pleasantry.
- **"Not your teacher. Not your supervisor. Your partner."** — Each word gets equal weight. The comma-pauses are real.
- **"Water treatment facilities."** — She says it alone, quietly. As if she's thought about this one before.
- **"You're going to become one of those people."** — No qualification. Pure confidence in the learner.
- **"That tension is the job."** — Delivered as a matter of fact, not a warning.
- **"Good. Faster than most first-day analysts."** — She doesn't say "great job!" She says "good" and then gives the one specific piece of comparative feedback that's actually informative.
- **"Somewhere in this data stream, a real person is trying to hurt real people."** — The word "real" emphasized both times. Not "malicious actor." A person.
- **"I'll be right here."** — Private. Warm. A promise.

**What ARIA Does NOT Say:**

- "Let's get started!" — too generic
- "Welcome to the course!" — breaks fourth wall
- "In this module, you will learn..." — destroys narrative immersion
- "Excellent!" / "Amazing!" / "Wonderful!" — hollow validation
- Any corporate training language whatsoever

**Subtext:** ARIA is, in a quiet way, testing the learner throughout this interaction. She is warm, but she is observing. The learner should feel the gentle pressure of being evaluated in a way that makes them want to rise to it — not anxiety, but dignity.

Her "I'll be right here" functions as an emotional anchor for the entire platform. It is the line that, if the platform succeeds, learners will hear in their memory every time they feel lost.

**Interaction:**

- Each dialogue beat is a click-to-advance or auto-advances after 2.5 seconds of silence at the end of each line
- Learner can re-read any previous line by clicking the transcript area on the monitor (scrollable)
- During CIA Triad section: each icon card is hoverable (tooltip: one-sentence definition) and clickable (micro-animation plays, no navigation away from scene)
- A "Reading Mode" toggle in top-right HUD pauses auto-advance and requires manual Enter to proceed

**Transition into Scene 2.5:** Left monitor transforms from static icon display into interactive quiz cards.

**Transition out of Scene 2 (after quiz):** Terminal overlay slides into the center monitor from the right as Scene 3 begins.

**Accessibility:**

- Captions: ARIA's dialogue appears as terminal-styled text in the bottom 45% of her monitor display as she speaks. Font: monospace. Color: `#A0A0A8`. Keyword highlights: `#00D9FF`. All captions stored and scrollable.
- Screen reader: Reads all dialogue. Icons have ARIA-labels: "Confidentiality icon — lock symbol. Click to expand definition." "Integrity icon — shield with checkmark. Click to expand definition." "Availability icon — uptime graph. Click to expand definition."
- Reduced motion: ARIA's waveform is a static geometric hexagonal shape with very slow opacity pulse (2-second cycle, 80%–100% opacity). Icon card entries are fade-ins, not slide-ins.
- Keyboard: Space/Enter to advance dialogue. Tab to navigate icons. Enter on icon to view tooltip.

---

## SCENE 2.5 — CIA TRIAD MICRO-QUIZ
**Scene ID:** S2.5-CIA-QUIZ | **Timecode:** 5:00–5:55 | **Duration:** 55 seconds (variable — no time limit)

**Purpose:** First interaction in the mission. First success moment. Prove that active application feels different from passive listening. Build competence confidence.

**Environment:** The left monitor expands to 60% of the visible screen area. Three scenario cards animate in from the left. The three icon cards (now smaller, stacked on the right) serve as the drag source.

**The Three Scenario Cards:**

**Card 1:**
> Background color: `#0D1420`
> Header: "INCIDENT ALPHA"
> Body: "A hospital's patient records were accessed and read by a contractor who held no authorization to view them."
> Drop zone: a dashed rectangle beneath the text, 80×80px, border `#3A3A4A`
> Correct answer: **Confidentiality** (lock icon, `#00D9FF`)

**Card 2:**
> Header: "INCIDENT BETA"
> Body: "A government official receives a financial report. Unbeknownst to everyone, the figures were altered by an attacker three days ago."
> Correct answer: **Integrity** (shield, `#00FF87`)

**Card 3:**
> Header: "INCIDENT GAMMA"
> Body: "During a crisis, first responders cannot access the emergency dispatch system. It's offline."
> Correct answer: **Availability** (uptime graph, `#7B5EA7`)

**Icon Panel (right side):**

Three icon cards are stacked vertically in the right 40% of the left monitor. Each icon card:
- 64×64px icon
- Label below: "CONFIDENTIALITY" / "INTEGRITY" / "AVAILABILITY"
- Color-coded border matching their respective colors
- Hover: scale 1.0 → 1.04, border brightens
- Selected (held): opacity 0.8, scale 1.02, drop shadow `0 4px 16px rgba(0,217,255,0.4)`

**Interaction:**

Desktop drag-and-drop:
- Pick up icon card, drag to drop zone
- While dragging: drop zone highlights with dashed border in the icon's color
- Correct drop: immediate — card snaps into place, drop zone fills with icon's color at 20% opacity, a soft "lock" chime plays (440Hz, 80ms, sinusoidal decay), a checkmark appears in the corner
- Incorrect drop: gentle red pulse on the drop zone (80ms red flash, returns to default), card returns to panel with spring animation, no chime

Mobile / tablet tap-to-select:
- First tap on icon card: selects it (highlighted border)
- Second tap on a scenario card drop zone: completes the assignment
- Behavior on correct/incorrect: identical to drag-and-drop

Keyboard:
- Tab to focus an icon card, Space to pick up
- Arrow keys to move between scenario cards
- Space on drop zone to drop
- All states have visible focus rings (2px `#00D9FF` outline)

**Feedback:**

- All 3 correct on first attempt: ARIA in her monitor softly says "Good." (one word, delivered with genuine weight). Her waveform pulses green once. A chime plays.
- 1 wrong, then corrected: Card resets silently. No verbal feedback until completion. Then: "Good." — same as above.
- 2 wrong on the same card: ARIA says *(quietly)*: "That one is about accuracy of information. Think about what changes."
- 3 wrong on the same card: The correct icon subtly pulses. No verbal hint. The pulse is the hint.

**Completion Animation:**

When all 3 are matched correctly:
- 800ms hold on completed state (all three cards locked)
- All three cards compress together horizontally, merge into a single "CIA Triad" badge (geometric: three overlapping triangles in blue/green/purple)
- Badge flies to top-right corner of the HUD (the XP/achievement area) with a spring trajectory
- Landing in HUD triggers a small particle burst (6 particles, icon color, 400ms lifespan)
- XP counter in HUD ticks: +50 XP

**Transition:** After badge lands, ARIA's waveform brightens and she resumes dialogue.

**Accessibility:**

- Screen reader: Announces scenario card content as a form label. Drop zones labeled "Drop CIA Triad concept here." Correct drop: "Correct. Confidentiality applied to Incident Alpha." Incorrect: "Incorrect. Try a different concept."
- Reduced motion: No drag animation. Instead, clicking icon card opens a selection dropdown on the scenario card. No particle effect.
- Color-blind mode: Icon cards have text labels in addition to colors. Drop zones labeled with text, not color coding alone.

---

## SCENE 3 — THE ANOMALY
**Scene ID:** S3-ANOMALY | **Timecode:** 5:55–9:45 | **Duration:** 230 seconds

**Purpose:** The learner's first real cognitive task. Navigate a terminal log, evaluate 5 expandable entries, identify the genuine threat, and submit their finding. The emotional and intellectual climax of the mission.

**Environment:** Full-screen terminal view. The SOC fades back. The center monitor fills the entire viewport. The terminal is the world now.

**Terminal Visual Design:**

```
┌─────────────────────────────────────────────────────────────────────────┐
│ sentinel@ops-center:~/logs/2024-01-15$ tail -f network-security.log     │
│                                                               [LIVE]     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  [08:42:17] INFO   NAT gateway: 10.0.1.1 → external. Traffic normal.   │
│  [08:42:23] INFO   DNS resolution: sentinel-internal.net — OK           │
│  [08:42:31] WARN ▶ Unusual login time: jdavis — 03:12 UTC              │
│  [08:42:38] INFO   Packet transfer: 1.2MB → backup server. OK.          │
│  [08:42:44] WARN ▶ Email received: From: security@sent1nel.net          │
│  [08:42:51] INFO   SSL certificate: Valid. Renewed 6 days ago.          │
│  [08:42:58] WARN ▶ Port scan: Source 192.168.40.22 [internal]          │
│  [08:43:04] INFO   MFA: 3 successful logins, 0 failed this hour.        │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Design specs:**
- Background: `#08080F`
- Default text: `#8A8A96` (muted — unimportant)
- `INFO` prefix: `#3A3A4A` (very muted — background noise)
- `WARN ▶` prefix: `#FF9F43` (amber — draws attention without screaming)
- Entry hover: left border becomes `#00D9FF`, 2px, 150ms transition; background lightens to `#0D0D18`
- Active/expanded: left border `#00FF87`, background `#0D1420`
- Clickable indicator: `▶` arrow that rotates 90° on expand (chevron style)

**The 5 Expandable Entries — Complete Expansion Content:**

---

**Entry 1: jdavis Unusual Login**
```
[08:42:31] WARN — UNUSUAL LOGIN TIME DETECTED
───────────────────────────────────────────────────
USER:       jdavis (James Davis — HR Department, L2)
LOGIN TIME: 03:12 UTC (Saturday)
NORMAL:     08:30 – 18:00 UTC (Monday–Friday)
MFA STATUS: ✓ PASSED (TOTP verification)
SOURCE IP:  10.0.44.21 (VPN — assigned to jdavis)
PRIOR ANOMALOUS LOGINS: 0 in the past 12 months

NOTES: Possible explanations — travel timezone, overtime
work, or account compromise. Recommend: monitor this
session for lateral movement. No immediate action required.
```
**Status:** RED HERRING. Unusual but explained. Not the threat today.

---

**Entry 2: Packet Transfer**
```
[08:42:38] INFO — PACKET TRANSFER COMPLETE
───────────────────────────────────────────────────
VOLUME:       1.2 MB
SOURCE:       10.0.1.45 (backup-agent-service)
DESTINATION:  sentinel-backup-01 (10.0.99.10)
TRANSFER TYPE: Scheduled nightly backup — CRON JOB
SCHEDULE ID:  BACKUP-2024-047 (matches cron registry)
INTEGRITY:    ✓ SHA-256 hash verified

This is a routine scheduled backup. All parameters
match the authorized backup profile. No anomaly.
```
**Status:** RED HERRING. Completely normal.

---

**Entry 3: Email — THE THREAT**
```
[08:42:44] WARN — INBOUND EMAIL — AUTHENTICATION ANALYSIS
───────────────────────────────────────────────────────────────
FROM:     security@sent1nel.net
          ↳ [!] DOMAIN: sent1nel.net ≠ sentinel.net (1 char swapped)
TO:       m.chen@sentinel.org (Maya Chen, Analyst L4)
SUBJECT:  "Your SENTINEL credentials require immediate verification"
          ↳ [!] URGENCY LANGUAGE DETECTED
RECEIVED: 08:42:44 UTC

BODY PREVIEW:
  "Dear Analyst Chen, SENTINEL's IT security team has
  detected suspicious activity on your account. You must
  verify your credentials within 30 minutes or your
  access will be suspended immediately.
  [VERIFY NOW →]"
  ↳ [!] EXTERNAL LINK: http://sent1nel-verify.net/login
  ↳ [!] DOMAIN NOT IN SENTINEL APPROVED LIST

SENDER IP:    185.234.218.114
              ↳ [!] MATCH: KNOWN PHISHING INFRASTRUCTURE
              ↳ [!] 847 KNOWN PHISHING CAMPAIGNS
              ↳ [!] REGISTERED: 3 DAYS AGO

SPOOF INDICATORS: 4 of 4 DETECTED
THREAT DATABASE:  POSITIVE MATCH — CREDENTIAL PHISHING
```
**Status:** THE THREAT. Four distinct phishing signals clearly labeled. Learner should recognize this by signal density if not by knowledge.

*Interactive elements within this entry:*
- `185.234.218.114` — clickable: opens Archivist Easter Egg 1 (IP geo-trace panel)
- `sent1nel.net` in the comparison — clickable in Scene 4's debrief: opens Archivist Easter Egg 2 (domain registration date)
- `m.chen@sentinel.org` — clickable: opens Archivist Easter Egg 3 (Maya Chen profile)

---

**Entry 4: Port Scan — Authorized**
```
[08:42:58] WARN — PORT SCAN DETECTED
───────────────────────────────────────────────────
SOURCE IP:    192.168.40.22
REGISTERED:   sentinel-redteam-01 (Internal Red Team)
SCAN TYPE:    TCP SYN (stealth scan)
PORTS SCANNED: 1–1024 (common ports)
AUTHORIZATION: ✓ AUTHORIZED
              CISO Memo 2024-0847
              "Scheduled penetration test: 2024-01-15
              08:00–12:00 UTC. Red team: K. Park, R. Singh"

This is an authorized internal penetration test. No
action required. Log retained for compliance record.
```
**Status:** RED HERRING. Authorized activity that looks scary but isn't.

---

**Entry 5: MFA Authentications**
```
[08:43:04] INFO — MFA AUTHENTICATION SUMMARY
───────────────────────────────────────────────────
SUCCESSFUL:  3
  ↳ r.kumar@sentinel.org — 08:39 UTC — Location: London VPN
  ↳ t.okafor@sentinel.org — 08:41 UTC — Location: Office (10.0.3.x)
  ↳ s.nakamura@sentinel.org — 08:42 UTC — Location: Tokyo VPN
FAILED:      0
LOCKED:      0

All authentications within expected parameters.
No anomaly detected.
```
**Status:** RED HERRING. Completely normal.

---

**ARIA's Presence During Scene 3:**

ARIA occupies a small panel (200×150px) in the bottom-right corner of the terminal screen. She is present but passive. Her waveform moves at 40% normal amplitude — she is watching.

She says nothing unless triggered by delay:
- **If learner hasn't clicked the email entry (Entry 3) after 90 seconds:** ARIA's panel brightens slightly. No words. Just presence. Three slow pulses.
- **If learner still hasn't clicked Entry 3 after 120 seconds:** The left border of Entry 3 pulses — `#FF4757` (cyber red), 3 pulses over 6 seconds, then fades.

ARIA does not speak again until the submission is processed.

**The Submission Flow:**

1. "Submit Finding" button appears in the bottom-right after learner has expanded at least 3 entries (signal: they've investigated, not just guessed).
2. Button style: Primary button, `#00FF87` text on dark background, `border: 1px solid #00FF87`.
3. Clicking "Submit Finding": Opens a 2-option dropdown below the button: "Flag Entry for Incident Report" / "Mark as All Clear".
4. After learner has expanded Entry 3 (the threat): the "Flag for Incident Report" button becomes available when Entry 3 is active/open. A secondary button appears within the entry: "Flag This Entry" in amber.
5. Clicking "Flag This Entry" opens a confirmation overlay:

```
┌──────────────────────────────────────────────┐
│  CONFIRM THREAT IDENTIFICATION               │
│                                              │
│  You are flagging:                           │
│  Email from security@sent1nel.net            │
│  as a potential threat requiring             │
│  incident reporting.                         │
│                                              │
│  [CONFIRM — OPEN INCIDENT REPORT]            │
│  [CANCEL — CONTINUE ANALYSIS]                │
└──────────────────────────────────────────────┘
```

6. Confirming → Scene 4 begins. The terminal fades out. The Incident Report form slides in.

**Wrong Submission Handling:**

If learner flags Entry 1, 2, 4, or 5:

- The flagged entry receives a brief amber flash, then settles
- ARIA speaks (first time she's spoken since Scene 2): *"Look more carefully at that entry. It has a legitimate explanation in the log."*
- The incorrectly flagged entry displays a marker: `✓ LEGITIMATE — CONTEXT AVAILABLE` in muted text
- Learner returns to analysis. One retry.
- If learner flags wrong a second time: ARIA says *"The one you're looking for has multiple indicators marked with [!]. Look for those."* — This is the maximum explicit hint given.

**Accessibility:**

- Screen reader: Terminal log is a `role="table"` with row headers for timestamp, level, and summary. Expanded entries are announced as region updates.
- Keyboard: Arrow keys navigate between entries. Enter/Space expands. Tab moves to interactive elements within an entry. Escape collapses.
- Reduced motion: Accordion expand is instant (0ms). No hover transitions. Flag button is always visible (not dependent on investigation count).
- Color-blind mode: `[!]` text indicators precede all threat markers. `WARN` and `INFO` are also text prefixed, not color-only.
- High contrast: Terminal background can be toggled to `#000000` with `#FFFFFF` text.

---

## SCENE 4 — INCIDENT REPORT
**Scene ID:** S4-INCIDENT-REPORT | **Timecode:** 9:45–13:00 | **Duration:** 195 seconds

**Purpose:** Consolidation. The act of formally writing and categorizing a threat reinforces retention more than passive observation. This is the closing of the cognitive loop — and makes the learner feel like a professional.

**Environment:** The terminal fades out. A document-style form slides in from the right edge, occupying the center of the screen. The form has a realistic but stylized government-document aesthetic — structured, formal, but with SENTINEL's design language.

**Form Design:**

Header area:
```
╔════════════════════════════════════════════════════════════╗
║  SENTINEL NETWORK OPERATIONS CENTER                        ║
║  INCIDENT REPORT                                           ║
║  ─────────────────────────────────────────                 ║
║  ANALYST:     [LEARNER NAME]          ID: [ANALYST-ID]     ║
║  DATE:        [AUTO-FILLED UTC]       TIME: [AUTO-FILLED]  ║
║  INCIDENT ID: INC-2024-0001-[ID]      PRIORITY: ● HIGH     ║
╚════════════════════════════════════════════════════════════╝
```

**SECTION 1 — THREAT CLASSIFICATION**
Label: "What type of threat did you identify?"
Control: Dropdown select
Options:
- "Select threat type..." (placeholder)
- "Phishing Attack" ← CORRECT
- "Malware / Ransomware"
- "DDoS Attack"
- "Insider Threat"
- "Unauthorized Access"
- "Data Exfiltration"

Feedback on correct selection: left border turns `#00FF87`, a subtle checkmark icon appears to the right (not intrusive, 16px).
Feedback on incorrect: no immediate negative signal — feedback comes during ARIA's debrief after submission, with a gentle correction.

**SECTION 2 — CIA TRIAD IMPACT**
Label: "Which security pillars are at risk? Select all that apply."
Control: Three checkbox cards (horizontal row)

Card A: Lock icon + "CONFIDENTIALITY"
Card B: Shield icon + "INTEGRITY"
Card C: Graph icon + "AVAILABILITY"

Correct: Confidentiality checked (credentials = confidential data at risk).
Integrity and Availability are defensible arguments if selected (ARIA acknowledges them in debrief without marking them wrong).

Selected state: card fills to 15% of its icon color. Checkbox shows `#00FF87` fill.

**SECTION 3 — THREAT DESCRIPTION (Optional)**
Label: "Describe what you observed. In your own words. (Optional)"
Control: Textarea, 4 rows visible, monospace font
Placeholder: "What made this entry suspicious? What signals did you notice?"
Character count: shown at bottom right, format `{n}/280`
Bonus trigger: ≥ 50 characters entered → +50 XP awarded at mission complete. ARIA's waveform briefly nods (amplitude pulse upward) when the learner crosses 50 characters, giving a silent "yes, keep going" signal.

**SECTION 4 — RECOMMENDED RESPONSE**
Label: "What action should be taken?"
Control: Dropdown select
Options:
- "Select action..." (placeholder)
- "Block the sender domain and IP" ← CORRECT
- "Alert analyst m.chen and IT Security" ← ALSO CORRECT
- "Both: Block domain + Alert m.chen" ← MOST COMPLETE (highest XP)
- "Delete the email and take no further action" ← INCORRECT — ARIA notes this in debrief
- "Forward to CISO for review"

**Submit Button:**

Available after Sections 1, 2, and 4 have values.
Label: "FILE REPORT"
Style: `#00FF87` text, dark background, `border: 2px solid #00FF87`, `padding: 12px 32px`
Hover: background fills to `#00FF87` at 10%, box-shadow: `0 0 16px rgba(0,255,135,0.3)`
On click: brief loading state (spinner, 800ms) → ARIA's debrief begins

**Post-Submission — ARIA's Debrief:**

ARIA's panel expands from the bottom-right corner to occupy 40% of the screen (animated: height expand, spring physics, 600ms). She plays the debrief audio as the form on the left side animates to show annotations on the learner's submissions.

**ARIA's Debrief Script:**

*(beat: 0.3 seconds — ARIA reviews the form)*

**ARIA:** *(measured, professional, warm — a senior analyst reviewing a new analyst's work)*
"Incident Report INC-2024-0001. Let me walk you through what you identified."

*(beat: 0.6 seconds)*

**ARIA:**
"You flagged an inbound email from `security@sent1nel.net` as a phishing attack. That's correct."

*(On the left: the email entry in the form highlights. The domain `sent1nel.net` gets an annotation arrow pointing to it: "One character. 'i' replaced with '1'.")*

**ARIA:**
"The attacker registered a domain almost identical to ours — `sent1nel.net`. Not `sentinel.net`. One character swapped."

*(A comparison appears: `s-e-n-t-i-n-e-l` vs `s-e-n-t-1-n-e-l`. The `i` and `1` are color-coded — `#00D9FF` vs `#FF4757`.)*

**ARIA:**
"Most people would read right past it. The human brain pattern-matches and fills in what it expects to see."

*(beat: 0.8 seconds — let the technical reality land)*

**ARIA:**
"If Analyst Chen had clicked that link — if she'd entered her credentials into that fake login page — the attacker would have had direct access to a verified SENTINEL analyst account."

*(A simplified attack chain animation plays: Email → Click → Fake Login Page → Credential Capture → Account Access. Each step is a node on a timeline. Clean, clinical, fast — 4 steps over 3 seconds.)*

**ARIA:**
"From there, they move laterally. They access systems they aren't supposed to see. They wait. They learn. Or they move immediately."

*(beat: 1.0 seconds)*

**ARIA:**
"The Confidentiality pillar was the primary target. Our data — protected behind credentials that would no longer be secret."

*(The Confidentiality icon pulses on the form — the learner's correct checkbox selection validated)*

*(beat: 1.2 seconds — the weight moment)*

**ARIA:**
"You found it. Before anyone clicked anything."

*(beat: 2.0 seconds — genuine silence)*

*(softer)*
"That's good work, Analyst."

*(beat: 1.0 seconds)*

**ARIA:** *(returning to operational)*
"Analyst Chen has been alerted. The domain has been added to our block list. The IP has been flagged in the threat database."

*(three checklist items appear on the right side of the screen, each marking ✓ as she speaks them)*

**ARIA:**
"Your report is filed."

*(beat: 0.5 seconds)*

"Mission complete."

*(Transition to Scene 5.)*

**Accessibility:**

- Form: fully keyboard navigable. Tab order: Section 1 → Section 2 → Section 3 → Section 4 → Submit
- Dropdown: native `<select>` or accessible custom dropdown with keyboard support
- Checkboxes: visible focus rings, keyboard-togglable with Space
- Screen reader: each form section has a `<fieldset>` with `<legend>`. Correct/incorrect states announced.
- Captions: ARIA's debrief fully captioned as terminal-styled text
- Reduced motion: attack chain animation replaced with a static numbered list

---

## SCENE 5 — MISSION COMPLETE
**Scene ID:** S5-COMPLETE | **Timecode:** 13:00–18:00 | **Duration:** 300 seconds

**Purpose:** Celebration, identity formation, XP reveal, path forward. End on a note that makes them want to come back tomorrow. And the day after. And the day after that.

**Environment:** Camera returns to the full SOC view — pulling back from the center monitor to reveal the entire operations center again. The room looks the same, but something is different: the global threat map on the display wall now has one fewer active indicator in the region where the phishing attack originated.

Small detail. Most learners won't notice. The ones who do will feel it deeply.

**ARIA's Final Words (completing the debrief):**

*(delivered as the camera pulls back, ARIA's voice now seems to come from the room itself — not just the monitor)*

**ARIA:**
"Today you learned what this work really is."

*(beat: 0.8 seconds)*

**ARIA:**
"Not firewalls and jargon."

*(beat: 0.5 seconds)*

**ARIA:** *(with genuine weight)*
"People. Protecting people."

*(beat: 1.5 seconds)*

**ARIA:**
"You also learned something else. You learned that you can do this."

*(beat: 0.6 seconds)*

**ARIA:**
"That matters more than any technical knowledge right now."

*(beat: 1.0 seconds — tone shifts to official)*

**ARIA:**
"Sentinel Analyst ID assigned."

**[THE ANALYST ID CARD ANIMATION:]**

A card materializes from the center of the screen — appearing as if printed and physically handed to the learner. Not digital-looking — physical-looking. Like a real credential.

Card design (approximately 340×215px — credit card proportion):
```
┌─────────────────────────────────────────────────────────┐
│  SENTINEL                                               │
│  ──────────────────────────────────────────             │
│                                                         │
│  [LEARNER NAME]                                         │
│  CYBERSECURITY ANALYST — LEVEL 1                        │
│                                                         │
│  ANALYST ID:  [6-digit generated code]                 │
│  ISSUED:      [TODAY'S DATE]                            │
│  ACADEMY:     1 — Digital Security Landscape            │
│                                                         │
│  ▒▒▒▒ ▒▒▒▒ ▒▒▒▒ (holographic strip graphic)           │
└─────────────────────────────────────────────────────────┘
```

Card back:
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  PROTECT. DETECT. RESPOND.                              │
│                                                         │
│  "Every attack leaves a trace.                          │
│   Every trace has a story.                              │
│   Every story has an analyst."                          │
│                                                         │
│                             — SENTINEL, est. 2019       │
└─────────────────────────────────────────────────────────┘
```

Card animation sequence:
1. Card appears from the center of the screen, scaling up from 0 — spring physics (800ms, slight overshoot)
2. Card rotates 360° horizontally (card flip) over 1200ms — showing front, then back, then front again
3. Card settles in center of screen for 2 seconds
4. Holographic shimmer effect plays across the card surface (CSS gradient animation, `#FFFFFF` at 10% opacity sweeping left-to-right over 1.5 seconds)
5. Card slides up and into the HUD area (top-right, next to the learner's name/level indicator), scaling down
6. A permanent "ID" badge appears in the HUD

**ARIA:** *(as the card animates)*
"You're one of us now."

*(beat: 2.0 seconds — the longest beat of the mission)*

*(ARIA's 4-note theme plays: C → D → G → E — but this time, a full chord resolution follows it: +Am → G → C. The first time in the mission the theme completes. It sounds like an ending. And a beginning.)*

**XP ANIMATION:**

After the ID card settles:

Full-width panel slides up from the bottom (70% viewport height, `background: #0A0A14`, border-top: `1px solid #00D9FF`):

```
╔════════════════════════════════════════════════════════════╗
║  MISSION COMPLETE                                          ║
║  Operation: First Contact                                  ║
╠════════════════════════════════════════════════════════════╣
║                                                            ║
║  BASE XP:          350 XP                                  ║
║  ─────────────────────────────────                         ║
║  Sharp Eyes:       +100 XP   (no hints used)               ║
║  Speed Bonus:      +50 XP    (15:23 completion)            ║
║  Explorer:         +50 XP    (all entries reviewed)        ║
║  Analyst Notes:    +50 XP    (79 characters written)       ║
║  ─────────────────────────────────                         ║
║  TOTAL:            600 XP  ██████████████████ MAX          ║
║                                                            ║
║  LEVEL PROGRESS:   ▓▓▓▓▓▓▓▓░░░░░░░░░░░░  Level 1 → 2     ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

XP counter: animates from 0 to total over 2.5 seconds (ease-out). Each bonus line appears sequentially with 400ms delay between each. Level progress bar fills over 1.5 seconds.

**Achievement Notifications:**

After XP animation completes, achievement cards slide in from the right, staggered 700ms apart:

Each card: 300×80px, `background: #0D1420`, `border: 1px solid [achievement color]`

- **ACH-001 "First Responder"** — bronze border `#CD7F32` — "Operation: First Contact — Complete"
- **ACH-002 "Sharp Eyes"** — silver border `#C0C0C0` — "Identified the threat without assistance"
- **ACH-003 "Question Everything"** — bronze border — "All log entries reviewed before submitting"

Hidden achievements reveal after the visible ones, with a different animation — they appear from center-screen, scale up, then settle:

- **ACH-H01 "The Silent Read"** — *"You took your time with ARIA. A rare quality in this field."*
- **ACH-H02 "Archivist"** — *"You found details most analysts walk past. Don't lose that."*
- **ACH-H03 "Gut Check"** — *"First attempt. Under 60 seconds. Trust that instinct."*

**Path Forward Panel:**

After achievements settle (or learner clicks "Continue"):

A horizontal card strip slides up:

Card 1 (current — completed state):
- "Operation: First Contact" — green border — `✓ COMPLETE`

Card 2 (next — preview):
- Thumbnail: dark, network nodes floating in space
- "MISSION 2 — Operation: Ghost in the Wire"
- "Network fundamentals. Who's talking to whom, and why."
- "Estimated: 20 minutes — 400 XP"
- "[BEGIN MISSION]" button

Card 3, 4, 5 (locked but visible):
- Blurred thumbnails
- Lock icon
- Mission titles partially visible

A progress bar above the cards: `Mission 1 of 5 — Module 1: Welcome to the Grid`

**Final Moment:**

After the panel, if learner doesn't click "Begin Mission 2" after 15 seconds:

ARIA appears again — small pane in the corner:

**ARIA:** *(almost a whisper)*
"See you at mission two, Analyst."

*(Her waveform dims slowly to dark. Screen fades. End.)*

**Accessibility:**

- XP counter has `aria-live="polite"` to announce the final total to screen readers
- Achievement cards have full text descriptions in `aria-label`
- Path Forward is keyboard navigable
- The Analyst ID card has `alt` text: "SENTINEL Analyst ID card — [Learner Name] — Level 1 — Issued [date]"
- Card flip animation: reduced motion version shows front only, then fades to back, then fades back to front (no rotation)
- The final ARIA line has caption text

---

*End of Part 1 — Sections 1, 2, 3*
*Continue in PRODUCTION_PACKAGE_PART2.md — Sections 4 (Storyboard), 5 (Dialogue Bible), 6 (Interaction Bible), 7 (UI Specification)*
