# OPERATION: FIRST CONTACT — COMPLETE PRODUCTION PACKAGE
## Part 3 of 4 — Sections 8, 9, 10, 11, 12

---

# SECTION 8 — MOTION BIBLE

Every animation in the mission, precisely specified.

---

## GLOBAL ANIMATION PRINCIPLES

**Easing philosophy:** This mission uses physics-based motion. Nothing moves at constant speed. Everything has weight and momentum.

**Standard eases:**
- Entrance: `cubic-bezier(0.0, 0.0, 0.2, 1)` (ease-out — fast start, slow landing)
- Exit: `cubic-bezier(0.4, 0.0, 1, 1)` (ease-in — slow start, fast exit)
- State change: `cubic-bezier(0.4, 0.0, 0.2, 1)` (ease-in-out — balanced)
- Spring (for card snaps, button presses): `cubic-bezier(0.34, 1.56, 0.64, 1)` — slight overshoot then settle

**Duration vocabulary:**
- Micro: 80–120ms (button press feedback, immediate state confirmation)
- Fast: 150–250ms (hover states, tooltip appearance)
- Standard: 300–400ms (panel transitions, component state changes)
- Slow: 500–800ms (component entrances, card animations)
- Cinematic: 800–2000ms (scene transitions, hero animations, the ID card)

**Reduced motion rule:** Every animation listed here must have a reduced-motion alternative defined. In all cases: replace movement with a simple opacity fade of equal or shorter duration.

---

## SCENE 0 — BOOT SEQUENCE ANIMATIONS

### ANIM-001: Character Cascade

**Trigger:** Scene start (0:00)  
**Type:** Particle/text system  
**Duration:** 11 seconds (continuous, stops when resolution begins)  
**Implementation:** `<canvas>` element or DOM span grid  

Specification:
- Grid: 80 columns × 40 rows (approximated to viewport at 16px font)
- Each column starts at a random row offset (0–30)
- Each character changes every 60–120ms (randomized per column)
- Character set: `A-Z0-9@#$%><|/\-_=+`
- Color: `#00D9FF` at opacity randomly distributed 0.2–0.6
- Columns are independent; no synchronization between them
- Fill direction: top to bottom, continuous loop (when a character reaches the bottom, it re-appears at the top)

**Reduced motion:** Static grid of characters at 30% opacity. No movement. Single fade-in over 600ms.

### ANIM-002: Character Resolution (Line Formation)

**Trigger:** 0:08 (after 8 seconds of cascade)  
**Type:** Sequential text reveal  
**Duration:** 6 seconds total (lines appear over 6 seconds)

For each character that resolves:
1. Character cycles through 3 random alternatives (each 40ms)
2. On the 4th cycle, it locks to its final value
3. A white flash plays: `opacity: 1.0` for 40ms, then character settles at `color: #00D9FF`, `opacity: 1.0`
4. Characters in a word lock left to right, staggered 8ms per character
5. Words in a line lock left to right, staggered 40ms per word

The four lines:
- Line 1 (`SENTINEL NETWORK OPERATIONS CENTER`): starts resolving at 0:08, completes by 0:11
- Line 2 (`INITIALIZING SECURE CHANNEL...`): starts at 0:12, completes by 0:14; the `...` appends with 500ms between each dot
- Line 3 (`ANALYST CREDENTIALS VERIFIED`): starts at 0:17, completes by 0:19
- Line 4 (`WELCOME, ANALYST.`): starts at 0:21, completes at 0:23; `ANALYST` word changes color from `#00D9FF` to `#00FF87` with a 600ms transition then back on the white-out

**Reduced motion:** Each line fades in sequentially at 400ms intervals. No character-by-character reveal. No white flashes.

### ANIM-003: Screen White-Out

**Trigger:** 0:27  
**Type:** Full-screen overlay  
**Duration:** 200ms  
**Easing:** `ease-out`

A `position: fixed; inset: 0; background: #FFFFFF` div animates from `opacity: 0` to `opacity: 1` over 200ms. Scene 1 renders beneath it, then the overlay fades out over 300ms (ease-in) simultaneously as Scene 1 loads.

**Reduced motion:** Replace white flash with a 400ms crossfade to black (`#000000`) then to Scene 1.

---

## SCENE 1 — SOC ANIMATIONS

### ANIM-004: Camera Crane Up (S1-01)

**Trigger:** Scene 1 start (post white-out)  
**Type:** CSS 3D perspective transform  
**Duration:** 10 seconds  
**Easing:** Linear (the crane is mechanical — it moves at constant speed)

Implementation using `perspective(1200px)` container with `rotateX()` animation:
- Start: `rotateX(35deg)` (looking up steeply)
- End: `rotateX(5deg)` (nearly level, slight upward tilt)
- Simultaneously: `translateY(-60px)` (upward physical movement)

This is all CSS — no actual 3D rendering needed. The SOC background is a layered 2D composition (parallax layers).

**Reduced motion:** Static frame at final position. Fade-in from `opacity: 0` over 600ms.

### ANIM-005: Camera Dolly Left (S1-02)

**Trigger:** 10 seconds into Scene 1  
**Type:** CSS `translateX` on the scene container  
**Duration:** 17 seconds  
**Easing:** `linear` (constant dolly speed)

Movement: `translateX: 0 → -80px` over 17 seconds. The 80px moves us enough to reveal the right side of the SOC.

**Reduced motion:** Static. No movement.

### ANIM-006: Chair Push-In

**Trigger:** 27 seconds into Scene 1 (at 0:55 total)  
**Type:** Spring physics animation on chair element  
**Duration:** 800ms  
**Easing:** `cubic-bezier(0.34, 1.56, 0.64, 1)` (overshoot spring)

Chair element: `translateY: 0 → -12px` (pushed slightly inward), `rotate: 0 → 0.5deg` (tiny rotation — chairs move slightly diagonally).

**Reduced motion:** Chair appears at rest position instantly (cut).

### ANIM-007: Monitor Flicker

**Trigger:** 42 seconds into Scene 1  
**Type:** Keyframe opacity animation  
**Duration:** 120ms  
**Pattern:** `opacity: 0.1 → 0.8 → 0.2 → 1.0` at frames 0ms / 40ms / 80ms / 120ms  

After flicker resolves: monitor content fades in from `opacity: 0` to `1` over 400ms.

### ANIM-008: Terminal Text Typing

**Trigger:** Immediately after monitor flicker  
**Type:** Character-by-character reveal (CSS clip or character append)  
**Duration:** Variable based on text length  
**Character timing:** 60ms per character

Text types: `sentinel@ops-center:~$` then cursor blinks 3 times then ` tail -f network-security.log` types. Then another cursor blink before the log output appears.

### ANIM-009: Monitor Activation (Left + Right)

**Trigger:** 62 seconds into Scene 1 (at 1:30 total), staggered — left monitor first, right monitor 800ms later  
**Type:** Fade-in with very slight scale  
**Duration:** 600ms  
**Easing:** `ease-out`

Each monitor: `opacity: 0 → 1`, `scale: 0.98 → 1.0` simultaneously. The slight scale-up from 0.98 → 1.0 makes it feel like the monitor is "turning on" rather than just appearing.

---

## SCENE 2 — ARIA ANIMATIONS

### ANIM-010: ARIA Waveform Materialization

**Trigger:** Scene 2 start (2:00)  
**Type:** Canvas 2D drawing animation  
**Duration:** 3 seconds  

Phase 1 (0–1s): Random noise fills the canvas — short, chaotic line segments in `#00D9FF` at 20% opacity. Density: 40 segments at any given moment.
Phase 2 (1–2s): The noise begins to cohere — random segments gradually align to a rough waveform shape. Opacity increases.
Phase 3 (2–3s): The waveform stabilizes into its three-layer form. The "eye" nodes appear last — they materialize with a single bright flash (opacity: 0 → 1.5 → 1.0 over 300ms).

**Reduced motion:** Waveform fades in from `opacity: 0` over 1.5 seconds. No materialization effect.

### ANIM-011: ARIA Waveform Idle Motion

**Trigger:** Continuous from materialization  
**Type:** Canvas 2D animation loop  
**Frame rate:** 60fps  

The waveform has three layers, each independently animated:
- Layer 1: `sin(t * 0.3 + x * 0.05) * 20` — slow, large amplitude
- Layer 2: `sin(t * 0.7 + x * 0.08) * 12` — medium speed, medium amplitude
- Layer 3: `sin(t * 1.1 + x * 0.12) * 8` — fast, small amplitude

The final waveform y-position = sum of all three layers at each x position.

`t` is time in seconds. `x` is horizontal position.

The "eyes": two persistent bright nodes at positions `x = 0.35 * width` and `x = 0.65 * width`. Their `y` positions follow the Layer 1 waveform. Radius: 4px at rest, scales to 6px when ARIA is speaking (follows voice amplitude).

**Emotional states:**
- Idle/thinking: Layer amplitudes all × 0.3. Eye brightness: 60%.
- Speaking: Layer amplitudes at 100%. Eye brightness: 90–100% (breathing with speech).
- Excited/emphatic: Layer amplitudes × 1.4 for 300ms then return. Eye brightness 120% (CSS: slightly overexposed).
- Serious/still: All amplitudes × 0.05. Truly near-still. Eyes at 70%.
- Green pulse: A separate layer renders a radial gradient from center, `#00FF87` at 30% opacity, expanding from radius 0 → canvas_width * 0.4 over 600ms then fading.

**Reduced motion:** Waveform is static geometric shape: three concentric ellipses with subtle opacity pulse (80%→100% over 2 seconds, looping). Eyes: two static dots.

### ANIM-012: CIA Icon Card Entrance

**Trigger:** ARIA says "Cybersecurity professionals call it the CIA Triad"  
**Type:** Slide from left edge + fade-in  
**Duration per card:** 400ms  
**Stagger:** 300ms between each card  

Each card: `translateX(-40px) → translateX(0)` + `opacity: 0 → 1`. Easing: `ease-out`.

### ANIM-013: CIA Icon Pulse (when named by ARIA)

**Trigger:** ARIA names each concept  
**Type:** Scale + glow pulse  
**Duration:** 600ms  

Scale: `1.0 → 1.08 → 1.0` at 0ms / 300ms / 600ms. Easing: ease-in-out.
Glow: `box-shadow: 0 0 0 rgba([color],0)` → `0 0 24px rgba([color],0.8)` at 0ms / 300ms then fades over 300ms.

### ANIM-014: CIA Quiz Badge Collection

**Trigger:** All three quiz items correctly matched  
**Type:** Choreographed multi-element animation  
**Duration:** 2.2 seconds total  

Phase 1 (0–800ms): All three scenario cards show their "complete" state simultaneously. Pause.
Phase 2 (800–1100ms): All three icon cards (in source panel) slide toward the first one — converging.
Phase 3 (1100–1300ms): The three icons merge — scale down together to a single point, then scale up as the CIA Triad badge (three overlapping triangles SVG).
Phase 4 (1300–2000ms): Badge flies from the left monitor to the HUD position (top center-right). Flight path: a slight arc, not straight line. Speed is ease-in then ease-out — fast in the middle, slow at endpoints.
Phase 5 (2000–2200ms): Badge lands in HUD, particle burst plays.

**Reduced motion:** Cards fade out → badge fades in at HUD position. No movement.

---

## SCENE 3 — TERMINAL ANIMATIONS

### ANIM-015: Terminal Full-Screen Transition

**Trigger:** End of Scene 2 (ARIA: "I'll be right here")  
**Type:** Camera push-in + UI layer fade  
**Duration:** 600ms  

The SOC environment scales up (perspective zoom) as the terminal fills the screen. Simultaneously: ARIA's monitor overlay expands to fill the screen via `scale(1.0 → 2.5)` + `opacity: 1 → 0`. The terminal underneath was rendering at reduced scale; it snaps to full size as ARIA's overlay fades.

### ANIM-016: Log Entry Accordion Expand

**Trigger:** Click on any collapsed log entry  
**Type:** CSS height transition  
**Duration:** 300ms  
**Easing:** `ease-in-out`

`height: 44px → [content height]px`. `overflow: hidden` during animation. Content inside fades from `opacity: 0 → 1` during the last 150ms of the height expansion (staggered).

The `▶` chevron rotates: `rotate: 0deg → 90deg`, 200ms, `ease-in-out`.

### ANIM-017: Threat Entry Discovery Flash

**Trigger:** When learner first expands Entry 3 (the email entry)  
**Type:** Left border color change + glow  
**Duration:** 400ms  

The left border animates: `#00D9FF` → `#FF9F43` over 400ms. A simultaneous glow: `box-shadow: inset 4px 0 0 #FF9F43` with a 1-second initial pulse (opacity: 0.5 → 1.0 → 0.8 over 1 second) then settles.

This only plays once — the first time Entry 3 is expanded. It signals: "this one is different."

### ANIM-018: ARIA Hint Presence Pulse

**Trigger:** 90 seconds without expanding Entry 3  
**Type:** ARIA mini-panel brightness and waveform pulse  
**Duration:** 6 seconds (3 pulses × 2 seconds each)

ARIA's mini-panel: `filter: brightness(0.5) → brightness(1.0) → brightness(0.5)` cycling 3 times.
Waveform amplitude: `× 0.4 → × 1.2 → × 0.4` cycling with the brightness.

### ANIM-019: Entry 3 Hint Pulse

**Trigger:** 120 seconds without expanding Entry 3  
**Type:** Left border glow pulse  
**Duration:** 6 seconds  

Border color: `#3A3A4A → #FF4757` over 1 second (ease-in), holds for 500ms, returns to `#3A3A4A` over 500ms (ease-out). This cycle repeats 3 times. Then permanently returns to `#3A3A4A`.

**Reduced motion:** Border color simply transitions `#3A3A4A → #FF4757` once over 1 second, holds for 3 seconds, returns. No pulsing.

### ANIM-020: Confirmation Overlay Entry

**Trigger:** Click "Flag This Entry"  
**Type:** Backdrop + modal slide-in  
**Duration:** 300ms  

Backdrop: `opacity: 0 → 0.7` over 200ms, ease-out.
Dialog: `translateY(20px) → translateY(0)` + `opacity: 0 → 1` over 300ms, ease-out.

---

## SCENE 4 — REPORT ANIMATIONS

### ANIM-021: Form Slide-In

**Trigger:** Confirm threat identification  
**Type:** Horizontal slide  
**Duration:** 400ms  
**Easing:** `cubic-bezier(0.4, 0.0, 0.2, 1)`

Terminal: `translateX(0 → -20px)` + `opacity: 1 → 0` (200ms, slightly ahead)
Form: `translateX(100vw → 0)` simultaneously over 400ms.

### ANIM-022: Form Section Valid State

**Trigger:** Correct value selected in Section 1 or 4  
**Type:** Border color transition + checkmark entrance  
**Duration:** 150ms (border) + 200ms (checkmark)

Border: `#1A2535 → #00FF87` over 150ms.
Checkmark icon: `scale(0) → scale(1)` over 200ms, spring easing (slight overshoot).

### ANIM-023: FILE REPORT Loading

**Trigger:** Button click  
**Type:** Button state change  
**Duration:** 800ms (loading state) then auto-advances

Button text changes to "FILING REPORT..." simultaneously with a CSS spinner appearing (24×24px, border: 2px solid #00FF87 with top border transparent, spinning at 1 rotation/second).

### ANIM-024: ARIA Panel Debrief Expansion

**Trigger:** Filing complete  
**Type:** Panel growth + simultaneous form compress  
**Duration:** 600ms  
**Easing:** Spring

Form width: `100% → 55%` 
ARIA panel: `width: 0% → 45%` + `opacity: 0 → 1`

These happen simultaneously. The split should feel like a reveal, not a resize.

### ANIM-025: Attack Chain Node Activation

**Trigger:** Synchronized with ARIA's debrief audio  
**Type:** Sequential node illumination + connector animation  
**Duration:** Per-node: 300ms  

Each node activates as ARIA describes it:
- Node illuminate: `border-color: #2A3545 → [node-color]` + center icon `opacity: 0 → 1` (300ms)
- Connector activation: A dot travels along the connecting line between nodes. The dot is a 6px circle in the connector's color. Travel time: 600ms from node to node.

---

## SCENE 5 — COMPLETION ANIMATIONS

### ANIM-026: SOC Pull-Back

**Trigger:** Scene 5 start  
**Type:** Reverse of the Scene 3 push-in  
**Duration:** 1.5 seconds  
**Easing:** `ease-in-out`

The terminal/form environment fades out as the SOC environment comes back into view (reverse perspective zoom). The SOC appears to already be there — we're just widening our field of view.

### ANIM-027: Analyst ID Card Entrance

**Trigger:** ARIA says "Sentinel Analyst ID assigned"  
**Type:** Scale from zero + 3D card flip  
**Duration:** 2.8 seconds total  

Phase 1 (0–800ms): Card materializes from center of screen. `scale(0) → scale(1.05)`, `opacity: 0 → 1`. Easing: spring (overshoot to 1.05).
Phase 2 (800–1000ms): Card settles at `scale(1.0)`.
Phase 3 (1000–2200ms): Card performs a full 360° horizontal flip: `rotateY(0 → 360deg)`. At 180° (during the flip), the card face switches from front to back content. The back content is revealed for 600ms (at 180–270°), then the front is shown again as the flip completes.
Phase 4 (2200–2500ms): Holographic shimmer plays — a CSS gradient `linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)` moves from `left: -100%` to `left: 100%` over 1.5 seconds.

**Reduced motion:** Card fades in from `opacity: 0` over 1 second at scale(1). No flip. Back content is shown for 2 seconds, then front shown again.

### ANIM-028: Card Travel to HUD

**Trigger:** 2.5 seconds after card entrance  
**Type:** Bezier path animation + scale-down  
**Duration:** 600ms  
**Path:** Arc from center-screen to HUD top-right. Control point: slightly left and above the midpoint.

`scale(1.0 → 0.15)` simultaneously with the path travel. The card shrinks as it moves away. Lands at HUD with a subtle "snap" (1px position correction spring, 100ms).

### ANIM-029: XP Counter

**Trigger:** Panel slide-up completes  
**Type:** Number increment animation  
**Duration:** 2.5 seconds  
**Easing:** `ease-out-cubic` (fast early, very slow near the end — creates anticipation at the end of the count)

The counter: a `<span>` with JavaScript `requestAnimationFrame` loop updating the number from 0 to [final value]. The easing controls the rate of increment, not just a visual ease.

Bonus lines appear sequentially with `opacity: 0 → 1` fades, 300ms each, staggered 500ms apart after the counter completes.

### ANIM-030: Level Bar Fill

**Trigger:** After XP counter completes  
**Type:** CSS width animation  
**Duration:** 1.5 seconds  
**Easing:** `ease-out`

Width: `0% → [calculated percentage]%`. The gradient on the bar (`#00D9FF → #00FF87`) is `background-size: 200%` and shifts position as the bar fills — creating a shimmer-through effect.

### ANIM-031: Achievement Card Slide-In

**Trigger:** Level bar completes  
**Type:** Slide from right + fade  
**Duration per card:** 300ms  
**Stagger:** 700ms between cards  

`translateX(60px → 0)` + `opacity: 0 → 1`. Easing: `ease-out`.
Hidden achievements use a different entrance: `scale(0.85 → 1.0)` + `opacity: 0 → 1` from center (as if appearing from nothing).

### ANIM-032: ARIA Final Dim

**Trigger:** ARIA says "See you at mission two, Analyst"  
**Type:** Waveform amplitude and brightness decay  
**Duration:** 8 seconds  
**Easing:** `ease-in` (slow start, ends decisively)

All waveform layer amplitudes: `× 1.0 → × 0` over 8 seconds.
Eye node brightness: `100% → 0%` over 8 seconds.
Panel `opacity`: `1 → 0` over the final 2 seconds.

This is not a fade-out — it's ARIA choosing to reduce her presence, like someone stepping back to give you space.

---

## PARTICLE SYSTEM SPECIFICATIONS

### PARTICLES-001: CIA Badge Landing

6 particles. Origin: HUD badge landing position.
- Size: 3–7px (randomized)
- Colors: `#00D9FF`, `#00FF87`, `#7B5EA7` (2 of each)
- Velocity: Radial outward, speed 80–140px/s
- Lifetime: 400ms
- Decay: Linear opacity 1 → 0 over lifetime
- Shape: Circle

### PARTICLES-002: XP Total Earned

12 particles. Origin: XP total number.
- Size: 2–5px
- Color: `#00FF87`
- Velocity: Radial outward + slight upward bias, speed 60–120px/s
- Lifetime: 600ms
- Decay: Linear opacity 1 → 0

### PARTICLES-003: Achievement Unlock

8 particles. Origin: Achievement card entrance point.
- Size: 3–6px
- Colors: Match the achievement border color
- Velocity: Upward + outward, speed 40–100px/s
- Lifetime: 500ms
- Gravity: `vy += 200px/s²` (particles arc up then fall — physical)
- Decay: Opacity 1.0 → 0 over lifetime

**All particle effects disabled in reduced-motion mode.** Replace with a static `box-shadow` glow on the parent element.

---

# SECTION 9 — AUDIO BIBLE

Every sound, piece of music, and silence in the mission.

---

## MUSIC SCORE

### TRACK: SENTINEL AMBIENT (ARIA_AMBIENT_01)

**Usage:** Background throughout the mission. The sonic environment of the SOC.  
**Style:** Dark atmospheric electronic. Cinematic. Think Hans Zimmer's Interstellar meets Burial.  
**Tempo:** 110 BPM (felt, not metrically obvious)  
**Key:** C minor  

**Layers (each independently controllable):**

| Layer | Description | Start | End | Default Volume |
|-------|-------------|-------|-----|---------------|
| SUB_BASS | 18Hz sub-bass hum — felt in the chest, not quite heard | 0:04 | End | −40dB |
| SERVER_DRONE | Server room fan white noise — broadband, slightly tonal | 0:05 | End | −28dB |
| DARK_PAD | Sustained Cm pad — no attack, infinite sustain | 0:28 | End | −22dB |
| HEARTBEAT | 110 BPM hi-hat, 16th notes, very subtle | 1:30 | End | −30dB |
| TENSION_RISER | A slow, imperceptible upward frequency sweep that peaks at Scene 3 | 5:30 | 9:30 | −35dB (rises to −22dB at peak) |

**Dynamic events:**

- At 5:45 (alert moment): TENSION_RISER enters abruptly at −25dB. DARK_PAD volume jumps to −18dB. Heartbeat becomes slightly more prominent.
- At 9:30 (The Quiet): ALL layers except SUB_BASS drop to −40dB in 500ms. The near-silence is the sound design.
- At 9:45 (threat confirmed): DARK_PAD returns to −22dB. Tension riser fades out.
- At 13:00 (mission complete): DARK_PAD shifts from Cm to C major (harmonic shift). This is the single clearest musical change in the entire mission. It should be subtle enough that it's felt, not noticed.
- At 15:00 (ARIA's theme plays): All ambient layers duck to −36dB.

### TRACK: ARIA'S THEME (ARIA_THEME_01)

**Motif:** Four notes: C4 → D4 → G4 → E4 (crystalline bell synth)  
**Timbre:** Bell or Marimba-adjacent. Clear, precise attack. Long, clean decay (3–4 seconds).  
**First appearance:** Scene 2, at ARIA's materialization (2:00–2:03). The motif plays once, then decays.  
**Final appearance:** Scene 5, with full chord resolution:
- The motif plays (C4 → D4 → G4 → E4) then is followed by:
- Am chord (A3+C4+E4) sustained 2 seconds
- G major chord (G3+B3+D4) sustained 2 seconds  
- C major chord (C3+E3+G3) sustained 4 seconds
- This is the first time the theme "resolves." It has been building to this since the first mission. It should feel complete.

**Recurring appearances:**
- After CIA quiz completion: single note (E4 only — the final note of the motif). A hint.
- After successful threat identification: motif plays at 50% volume, shorter decay.

### TRACK: THREAT ALERT (ALERT_01)

**Trigger:** 5:45 — ARIA says "We have an anomaly"  
**Type:** A single audio event, not a loop  
**Design:** A brief, functional alert tone — not aggressive. Think: a tasteful security system, not a blaring alarm.
- Duration: 800ms
- Pattern: Three ascending tones: C5 (80ms) → E5 (80ms) → G5 (80ms), each with 120ms gap. Then the TENSION_RISER layer enters.
- Volume: −12dB (prominent but not jarring)

---

## UI SOUND EFFECTS

### Sound Library: UI_SFX

All UI sounds use the same sonic family — crystalline, precise, digital but warm. Think: polished glass or metal.

| SFX ID | Description | Trigger | Spec |
|--------|-------------|---------|------|
| SFX_CLICK_01 | General click | Any primary button click | 440Hz sine, 80ms, sharp attack, exponential decay |
| SFX_HOVER_01 | Subtle hover (for important elements only — not all hovers) | Hover on CIA icon cards, Mission 2 card | High-freq tick, 2.4kHz, 20ms, very low volume −28dB |
| SFX_LOCK_01 | Drop zone correct assignment | CIA quiz correct drop | 440Hz + 660Hz (2-note chord), 80ms, clear attack, 400ms decay |
| SFX_REJECT_01 | Drop zone incorrect attempt | CIA quiz incorrect drop | C2, 60ms, −12dB, brief low tone |
| SFX_EXPAND_01 | Accordion expand | Log entry expand | Short whoosh, 40ms, broadband noise filtered to 2–8kHz, −18dB |
| SFX_CONFIRM_01 | Confirmation / success state | Form section valid, threat confirmed | 3-tone ascending: D5→F5→A5, 30ms each, −16dB |
| SFX_BADGE_LAND | Badge arriving at HUD | CIA badge, achievements | Short metallic ring, 800Hz, 60ms attack, 600ms decay, −14dB |
| SFX_XP_TICK | XP counter ticking | XP count animation (every 50 XP) | Short high-freq tick, 3.2kHz, 10ms, −24dB |
| SFX_LEVEL_UP | Level progress bar completing | Level bar reaches 100% | 3-note ascending with slight reverb: C5→E5→G5, −10dB |
| SFX_CARD_FLIP | Analyst ID card flip | ID card 3D rotation | Short mechanical sound: broadband burst, 30ms, −16dB, at the 180° midpoint |
| SFX_CARD_MATERIALIZE | ID card appearing | Card entrance | Crystalline shimmer: short white noise burst through a bandpass filter, swept 200Hz→4000Hz over 600ms, −18dB |
| SFX_KEYBOARD | Login text typing | Monitor terminal typing | Individual key sounds, slightly randomized pitch (±5%), −20dB. Use a pool of 6 different key samples. |
| SFX_MONITOR_ON | Monitor activation | Left and right monitors activating | Electrical hum that rises and snaps off: 60Hz rising to 120Hz over 200ms, then clicks to silence. −20dB |

### Sound Library: ARIA_VOICE

**Recording specs:**
- Sample rate: 48kHz / 24-bit
- Noise floor: < −65dB
- Room treatment: minimal reverb (IR of small treated room, pre-delay 8ms, decay 0.4s, mix 8%)
- Processing chain: High-pass 80Hz → gentle presence boost +1.5dB at 4kHz → slight high-frequency shimmer (subtle harmonic exciter) → limiter −1dBFS
- Delivery format: OGG (primary) + MP3 (fallback) for web

**File naming convention:** `ARIA_[SCENE]_[LINE_NUMBER]_[TAKE].ogg`  
Example: `ARIA_S2_L01_T02.ogg`

**Panning and spatialization:**
- Scene 2: ARIA's voice comes from the center monitor position — front-center, slight room sound
- Scene 3: ARIA's voice (hint lines) comes from bottom-right (mini-panel position) — slightly quieter, slightly drier
- Scene 5: ARIA's voice comes from the room itself — wider stereo image, slightly more reverb — as if she's present in the space, not confined to a monitor

---

## AMBIENT SOUND DESIGN

### AMBIENT_SOC_01: Server Room Fan Layer

**Character:** Continuous broadband noise, slightly lower in the 4–8kHz range (rumbling rather than hissing).  
**Volume:** −22dB in Scene 1. Remains consistent throughout the mission as a grounding element.  
**Spatial:** Stereo-right (the server room is to the right of the SOC).  
**Variation:** Very slight amplitude modulation, 0.1Hz, 2dB peak-to-peak — gives it a "breathing" quality.

### AMBIENT_SOC_02: Analyst Keyboard Activity

**Character:** Occasional mechanical keyboard clicks, distant.  
**Volume:** −32dB  
**Spatial:** Left-center-right (multiple sources)  
**Timing:** Random interval 3–8 seconds between clicks. Sometimes a burst of 3–5 clicks (when an analyst is actively typing), sometimes isolated single clicks.  
**Note:** These ambient sounds should STOP briefly (500ms) when ARIA is speaking her most important lines (Lines 26–28 in Scene 2). Cognitive offloading.

### AMBIENT_SOC_03: Alert Chime (Distant)

**Character:** A single distant alert chime — not the learner's workstation. An alert from across the room.  
**Timing:** Once at 1:12. Not repeated.  
**Volume:** −36dB  
**Spatial:** Hard left (another analyst's workstation)  
**Effect:** Reminds the learner that other things are happening around them.

### AMBIENT_SOC_04: HVAC

**Character:** Sub-audible air movement. Low broadband noise 20–200Hz.  
**Volume:** −38dB  
**Effect:** Primarily felt rather than heard. Adds physical presence to the space.

### AMBIENT_SOC_05: Elevator Bell

**Timing:** Once at 1:15.  
**Character:** Single chime, very distant, center-stage.  
**Volume:** −40dB  
**Effect:** An easter egg in the soundscape. Nobody will consciously notice it. But the subconscious registers that this is a real building with multiple floors.

---

## SILENCE AS SOUND DESIGN

The mission uses deliberate silence three times:

**Silence 1 (0:00–0:04):** Pure black screen, absolute silence. Four seconds. This is the silence of anticipation. It signals: pay attention.

**Silence 2 (The Quiet, 9:30–9:35):** Music drops to near-silence. Only the SUB_BASS remains (inaudible to many). ARIA's waveform stills. Ambient activity pauses. 5 seconds. This is the silence of decision. It is the most important sound in the mission.

**Silence 3 (Post-"You found it," 12:42–12:47):** After ARIA says "You found it. Before anyone clicked anything," there is a 5-second silence. No music. No ambient sounds. Just the learner with the truth of what they just did. This is the silence of recognition.

---

## AUDIO MIXING

| Layer | Scene 0 | Scene 1 | Scene 2 | Scene 3 | Scene 4 | Scene 5 |
|-------|---------|---------|---------|---------|---------|---------|
| ARIA Voice | — | — | −6dB | −18dB (hint only) | −8dB | −5dB |
| ARIA Theme | — | — | −10dB (entrance) | — | — | −8dB (full) |
| Dark Pad | — | −22dB | −22dB | −22dB→−18dB | −24dB | −20dB→−16dB |
| Heartbeat | — | −30dB | −32dB | −28dB | −32dB | −30dB |
| Alert/Tension | — | — | — | −35dB→−22dB | — | — |
| Server Fans | — | −22dB | −24dB | −26dB | −26dB | −24dB |
| UI SFX | — | — | −14dB | −14dB | −14dB | −12dB |

**Note:** ARIA's voice is always the loudest element when she's speaking. All other layers automatically duck (−4dB) while ARIA is actively delivering a line.

---

## CAPTIONS

Every spoken word must have a synchronized caption. Caption spec:

- Display: Bottom 10% of the mission content area (above HUD)
- Font: JetBrains Mono, 14px, `color: #C0C0CC`
- Background: `rgba(8, 8, 15, 0.85)`, `padding: 6px 12px`, `border-radius: 4px`
- Max width: 70% of content area, centered
- Sync: < 50ms drift from audio
- Format: One sentence or clause per caption segment. No more than 10 words per segment.
- ARIA attribution: "[ARIA]" prefix in muted text `color: #5A6A7A` for all her lines
- Environmental sound captions: In italics, e.g., *[Alert tone]*, *[Keyboard sounds]*

---

# SECTION 10 — VISUAL ART BIBLE

The complete visual language of this mission.

---

## COLOR PHILOSOPHY

**The core tension:** This is a mission about dark realities (cyber attacks) experienced in a place of order and purpose (the SOC). The color palette reflects this: cold, controlled, precise — but with moments of vivid life (the cyber green of success, the cyber blue of ARIA) that signal: this is where good things happen.

**Primary experience:** Blue-dominant. Not depressing blue — focused blue. The color of concentration. Of screens in a dark room. Of the exact moment a problem becomes solvable.

**The three emotional colors:**

| Color | Hex | Meaning | Use |
|-------|-----|---------|-----|
| Cyber Blue | `#00D9FF` | Clarity, information, ARIA, systems | Primary interactive color, ARIA's color, information labels |
| Cyber Green | `#00FF87` | Success, life, safety, the right choice | Correct answers, completed states, XP, "we protected something" |
| Cyber Red | `#FF4757` | Threat, danger, urgency | Threat indicators ONLY — not errors, not warnings. Reserved for real danger. |

**Note on Amber/Orange (`#FF9F43`):** Used for WARN states — elevated attention needed but not critical. Phishing entry markers. Not danger, but do-not-ignore.

**The law of restraint:** Green and Red are used sparingly. Every time they appear, they should carry weight. If they appear on every interaction, they become noise. If they appear rarely, they become signal.

---

## LIGHTING PHILOSOPHY

**The SOC has no natural light. This is intentional.**

This is a space that operates continuously. There is no day and no night here — only shifts. The lighting is:

- **Primary source:** Cold overhead fluorescent-replacement LEDs. Color temperature: 5000K. They create blue-cast illumination with slight shadowing on vertical surfaces.
- **Secondary source:** The display wall's amber-orange glow from the threat map. This creates warm spill on anyone facing the wall (i.e., all the analysts).
- **Accent sources:** Server room (through glass, `#00D9FF` pulsing). ARIA's display (blue-purple). The learner's monitors.

**ARIA's contribution to lighting:** When ARIA is speaking, her waveform is the brightest element on the learner's desk. A subtle `#00D9FF` light appears to wash over the keyboard and immediate desk surface. This makes the learner feel like ARIA is physically present with them.

**The Quiet (Scene 3, 9:30):** The lighting subtly dims by 2% (barely perceptible) as the music drops. The terminal text appears to glow slightly brighter by contrast. The world contracts to the screen.

---

## ARCHITECTURE AND ENVIRONMENT

**The SOC design influences:**

Real-world references the art team should study:
- CISA (Cybersecurity and Infrastructure Security Agency) operations centers
- Microsoft's Cybercrime Center
- Military Combined Air Operations Centers (CAOC)
- Film reference: The operations center in Captain America: Winter Soldier — elevated, tiered, confident
- Film reference: The "glass table" scenes in The Social Network — precision, intelligence, purpose

**What we DON'T want:**
- Hacker cave (dark basement, screens everywhere, messy)
- Sci-fi spaceship (too fantastical)
- Corporate open office (too familiar/boring)

**What we DO want:**
- Professional. Serious. This is a place where people solve hard problems.
- Designed with purpose. Every element serves a function.
- Aspirational — this is a place the learner could imagine working in.

**Specific environment details:**

The server room (visible through glass):
- Rows of servers. Not cartoonishly dense — realistic.
- Blue and green status LEDs — mostly green (systems healthy), occasional amber.
- Contained within the frame. We never go in. It's a presence through glass.
- The glass has a slight reflection of the SOC interior — depth.

The display wall:
- Not a single huge screen. A mosaic of individual display panels (like a TV wall in a news studio). The seams between panels are visible — realism.
- The threat map: uses a stylized dark-background world map (Mercator projection). Countries in `#1A2535`. Active threat indicators: small pulsing circles, amber for medium threats, red for high. Currently 847 active indicators visible.
- The incident counter: `INCIDENTS LAST 24H: [number]` — the number slowly ticks upward as the learner watches. Currently at approximately 2,400.

---

## ARIA'S VISUAL ART

**The waveform — detailed specification:**

The waveform exists as a visual representation of ARIA's "presence" and emotional state. It must never look like a generic audio visualizer.

**What makes ARIA's waveform distinctive:**
- The three layers move at different speeds — this creates the interference pattern that gives it visual complexity
- The "eye" nodes are stable points within an unstable field — this is what makes them feel like eyes
- The edges of the waveform use a gradient fade to transparency (`mask-image: linear-gradient(90deg, transparent, black 15%, black 85%, transparent)`) so the waveform feels like it's emanating from somewhere rather than being contained
- The background grid (hexagonal, very dark) creates a sense that ARIA exists within a structured system
- Color gradient across the waveform: `#00D9FF` in the center, bleeding to `#7B5EA7` at edges. This gradient shifts subtly when ARIA is emotional.

**Color emotional states:**
- Neutral/operational: Center `#00D9FF` → edge `#7B5EA7`
- Warm/proud: Center `#00D9FF` → edge `#00FF87` (subtle green bleeding in)
- Serious/still: Desaturation — colors mute toward `#4A5A6A` at the edges
- Green pulse (emphasis): Separate layer, radial, `#00FF87` expanding from center

---

## TERMINAL AESTHETIC

The terminal is the most important designed space in the mission — it's where the learner does real work.

**Influences:**
- Classic Unix terminal (black background, monospace, minimal chrome)
- Security research terminals (Kali Linux, Metasploit console)
- Film: The "screens" in WarGames, Mr. Robot's hacker interfaces
- NOT: Holographic sci-fi screens, glowing floating UI

**Design principles for the terminal:**
- **Density is competence:** A lot of text, well-organized, signals "this is a real tool."
- **Color is meaning:** Only colored text conveys information. No decorative color.
- **Whitespace is hierarchy:** Separators between entries use blank lines, not graphical dividers.
- **Cursor never stops blinking:** The cursor is always blinking somewhere on screen when the terminal is active. It says: the system is alive, waiting.

---

## TYPOGRAPHY

**JetBrains Mono** is the primary font for all terminal-style content.

Design justification: JetBrains Mono has wider letterforms than most monospace fonts, making it more legible at small sizes. Its distinct characters (especially `1`, `l`, `I`, `0`, `O`) are critical for the mission's core content — the domain spoofing example (`sent1nel.net`) relies on the learner being able to distinguish `1` from `i`. JetBrains Mono makes this distinction visible.

Font loading: Load JetBrains Mono self-hosted (2 weights: Regular 400, Medium 500). Do not depend on Google Fonts (network dependency during an "offline-capable" experience is unacceptable).

---

## ICONOGRAPHY

All icons in this mission use a consistent style:
- Stroke-based (not filled), 1.5px stroke weight
- Rounded line caps and joins
- 24×24px base size (scales to 16×16 and 32×32)
- Color: inherits from context (never hardcoded)

Custom icons needed for this mission:
- **Padlock (Confidentiality):** Closed padlock, body rectangular with rounded top, shackle slightly offset right
- **Shield Check (Integrity):** Hexagonal shield outline, simple checkmark inside (not a heavy "success" check — a precise analytical check)
- **Uptime Graph (Availability):** Combined sine wave transitioning into a rising bar chart at the midpoint. Subtle but distinctive.
- **ARIA Waveform (small):** A simplified 3-wave representation used in small contexts (HUD, mini-panel icon)
- **Analyst Badge:** A stylized SENTINEL badge — hexagonal outline, "S" monogram inside, "ANALYST" text below

---

# SECTION 11 — ASSET LIST

Every asset required to build this mission, with specs and priority.

---

## CHARACTERS

| Asset ID | Description | Priority | Reuse | Est. Effort |
|----------|-------------|----------|-------|-------------|
| CHAR-001 | ARIA waveform — animated canvas component | Critical | High (every mission) | 5 days |
| CHAR-002 | Analyst silhouettes × 6 — SOC background figures | High | High (all SOC scenes) | 1 day |
| CHAR-003 | ARIA voice recording (full session) | Critical | High (every mission) | 2 days |

## ENVIRONMENT PIECES

| Asset ID | Description | Priority | Reuse | Est. Effort |
|----------|-------------|----------|-------|-------------|
| ENV-001 | SOC environment — full layered 2D composition | Critical | High (multiple missions) | 4 days |
| ENV-002 | Server room (through glass) — layered static image with LED animation | High | High | 1 day |
| ENV-003 | Display wall — world threat map component | High | High | 3 days |
| ENV-004 | Analyst workstation — 3 monitors + desk surface | Critical | High | 2 days |
| ENV-005 | SOC ceiling — overhead shots, lighting | Medium | Medium | 1 day |
| ENV-006 | UTC clock (right wall) — functional, showing real time | Low | Low | 0.5 days |

## UI COMPONENTS

| Asset ID | Description | Priority | Reuse | Est. Effort |
|----------|-------------|----------|-------|-------------|
| UI-001 | HUD bar — top persistent navigation | Critical | All missions | 2 days |
| UI-002 | ARIA display panel — monitor frame + waveform area | Critical | All ARIA scenes | 2 days |
| UI-003 | Dialogue transcript component | Critical | All ARIA scenes | 1 day |
| UI-004 | CIA Triad icon cards × 3 | Critical | Multiple missions | 1 day |
| UI-005 | CIA Quiz interaction component | Critical | Low | 2 days |
| UI-006 | Terminal log component | Critical | Multiple missions | 3 days |
| UI-007 | Log entry accordion component | Critical | Multiple missions | 1 day |
| UI-008 | Confirmation overlay component | High | Multiple missions | 0.5 days |
| UI-009 | Incident Report form component | Critical | Low | 2 days |
| UI-010 | Attack chain visualization component | High | Multiple missions | 2 days |
| UI-011 | Mission Complete panel | Critical | All missions | 2 days |
| UI-012 | XP counter animation component | Critical | All missions | 1 day |
| UI-013 | Achievement card component | Critical | All missions | 1 day |
| UI-014 | Analyst ID card component (front + back) | Critical | Low (unique per learner) | 1 day |
| UI-015 | Path forward mission card strip | High | All missions | 2 days |

## ICONS (SVG)

| Asset ID | Description | Priority | Reuse |
|----------|-------------|----------|-------|
| ICON-001 | Padlock (Confidentiality) — 24×24, 16×16, 48×48 | Critical | High |
| ICON-002 | Shield Check (Integrity) — 24×24, 16×16, 48×48 | Critical | High |
| ICON-003 | Uptime Graph (Availability) — 24×24, 16×16, 48×48 | Critical | High |
| ICON-004 | ARIA waveform small — 24×24 | High | High |
| ICON-005 | Analyst Badge — 32×32, 48×48 | Critical | High |
| ICON-006 | Lock/padlock (HUD, general) | High | High |
| ICON-007 | Book (reading mode toggle) | Medium | High |
| ICON-008 | Chevron ▶ (log entry expand) | High | High |
| ICON-009 | Trophy/badge (achievements) | High | High |
| ICON-010 | CIA Triad combined badge | Critical | Medium |

## AUDIO ASSETS

| Asset ID | Description | Priority | Format |
|----------|-------------|----------|--------|
| AUD-001 | SENTINEL AMBIENT base track (5-minute loop) | Critical | OGG/WAV |
| AUD-002 | ARIA theme motif (4-note) | Critical | OGG/WAV |
| AUD-003 | ARIA theme with chord resolution (full Scene 5 version) | Critical | OGG/WAV |
| AUD-004 | Threat alert (ALERT_01) | Critical | OGG/WAV |
| AUD-005 | ARIA voice recordings — all lines, all takes | Critical | OGG/MP3 |
| AUD-006 | Server room fan ambient loop | High | OGG/WAV |
| AUD-007 | Keyboard click pool (6 samples) | High | OGG/WAV |
| AUD-008 | SOC ambient keyboard activity (composite loop) | High | OGG/WAV |
| AUD-009 | HVAC subsonic loop | Medium | OGG/WAV |
| AUD-010 | Elevator bell (one-shot) | Low | OGG/WAV |
| AUD-011 | SFX_CLICK_01 | High | OGG/WAV |
| AUD-012 | SFX_LOCK_01 (quiz correct) | High | OGG/WAV |
| AUD-013 | SFX_REJECT_01 (quiz incorrect) | High | OGG/WAV |
| AUD-014 | SFX_BADGE_LAND | High | OGG/WAV |
| AUD-015 | SFX_CARD_FLIP | High | OGG/WAV |
| AUD-016 | SFX_CARD_MATERIALIZE | High | OGG/WAV |
| AUD-017 | SFX_MONITOR_ON | High | OGG/WAV |
| AUD-018 | SFX_XP_TICK | Medium | OGG/WAV |
| AUD-019 | SFX_LEVEL_UP | High | OGG/WAV |
| AUD-020 | SFX_EXPAND_01 | Medium | OGG/WAV |

## ANIMATION ASSETS

| Asset ID | Description | Priority | Format |
|----------|-------------|----------|--------|
| ANIM-001 | Boot sequence character cascade (React component) | Critical | React/CSS |
| ANIM-002 | ARIA waveform (canvas 2D animation — React component) | Critical | React/Canvas |
| ANIM-003 | Packet flow visualizer (existing component — low detail mode) | High | Existing |
| ANIM-004 | World threat map (SVG + CSS animations) | High | SVG/CSS |
| ANIM-005 | Attack chain node animation (React component) | High | React/CSS |
| ANIM-006 | Particle system (React component, reusable) | High | React/Canvas |
| ANIM-007 | CIA badge collection animation (React/Framer Motion) | High | React/Framer |
| ANIM-008 | Analyst ID card 3D flip (CSS 3D transform) | High | CSS |

## FONTS

| Asset ID | Description | Priority | Self-hosted |
|----------|-------------|----------|-------------|
| FONT-001 | JetBrains Mono — Regular (400) | Critical | Yes |
| FONT-002 | JetBrains Mono — Medium (500) | High | Yes |
| FONT-003 | Inter — Regular (400) | Critical | Yes |
| FONT-004 | Inter — SemiBold (600) | High | Yes |
| FONT-005 | Inter Display — SemiBold (600) | High | Yes |
| FONT-006 | OpenDyslexic — Regular (accessibility mode) | Medium | Yes |

---

# SECTION 12 — TECHNICAL SPECIFICATION

---

## STATE MACHINE

The mission is modeled as a finite state machine.

```
STATES:
  IDLE           → Initial state before mission starts
  BOOT_SEQUENCE  → Scene 0 playing
  SOC_INTRO      → Scene 1 playing
  ARIA_INTRO     → Scene 2 playing (ARIA introduction)
  CIA_QUIZ       → Scene 2.5 (quiz active)
  ARIA_TRANSITION → Brief state after quiz, ARIA resumes
  TERMINAL_ANALYSIS → Scene 3 (log investigation)
  THREAT_CONFIRMED  → Transition: learner flagged entry
  INCIDENT_REPORT   → Scene 4 (form filling)
  DEBRIEF           → Scene 4 post-submit (ARIA reviews)
  MISSION_COMPLETE  → Scene 5
  PAUSED         → Idle overlay visible
  REPLAYING      → Same flow with alternate content

TRANSITIONS:
  IDLE            → BOOT_SEQUENCE:      mission.start()
  BOOT_SEQUENCE   → SOC_INTRO:          autoAdvance(28s) OR skip()
  SOC_INTRO       → ARIA_INTRO:         autoAdvance(92s) OR skip()
  ARIA_INTRO      → CIA_QUIZ:           aria.triggerQuiz()
  CIA_QUIZ        → ARIA_TRANSITION:    quiz.allCorrect()
  ARIA_TRANSITION → TERMINAL_ANALYSIS:  aria.deliverLine(28)
  TERMINAL_ANALYSIS → THREAT_CONFIRMED: user.flagEntry(ENTRY_ID.EMAIL)
  TERMINAL_ANALYSIS → TERMINAL_ANALYSIS: user.flagEntry(WRONG_ENTRY) [retry, same state]
  THREAT_CONFIRMED → INCIDENT_REPORT:   user.confirmFlag()
  INCIDENT_REPORT → DEBRIEF:           user.submitReport()
  DEBRIEF        → MISSION_COMPLETE:    aria.completeDebrief()
  ANY            → PAUSED:             user.pause() OR idle(180s)
  PAUSED         → [previous state]:   user.resume()
```

---

## SCENE GRAPH

```
MissionRoot
├── HUD (persistent, z-index: 1000)
│   ├── BreadcrumbBar
│   ├── XPDisplay (live-updating)
│   ├── LevelIndicator
│   ├── HUDBadges (CIA triad badge, analyst ID)
│   ├── ReadingModeToggle
│   └── UserMenu
│
├── BootSequence (Scene 0)
│   ├── CharacterCascade (canvas)
│   └── TextResolver
│
├── SOCEnvironment (Scene 1, persists as background in Scenes 2-3)
│   ├── DisplayWallLayer
│   │   ├── ThreatMap (SVG)
│   │   └── IncidentCounter
│   ├── AnalystSilhouettes × 6
│   ├── ServerRoomGlass
│   ├── LearnerWorkstation
│   │   ├── MonitorLeft (PacketFlowVisualizer)
│   │   ├── MonitorCenter (primary content area)
│   │   └── MonitorRight (ThreatMapMini)
│   └── EnvironmentLighting (CSS filters)
│
├── ARIADisplay (Scene 2, inside MonitorCenter)
│   ├── ARIAWaveform (canvas component)
│   ├── DialogueTranscript (scrollable)
│   └── CIAIconPanel (Scene 2 / 2.5 phase)
│
├── CIAQuiz (Scene 2.5, overlaid on left monitor)
│   ├── ScenarioCards × 3
│   ├── IconSourcePanel
│   └── DragDropEngine
│
├── TerminalView (Scene 3, full-screen overlay)
│   ├── TerminalHeader
│   ├── LogEntryList
│   │   ├── LogEntry × 8 (3 expandable with red herring, 1 threat, 1 normal detail)
│   │   └── LogEntryContent (accordion)
│   ├── SubmitFindingButton
│   └── ARIAMiniPanel
│
├── IncidentReportView (Scene 4)
│   ├── ReportHeader
│   ├── FormSection × 4
│   └── SubmitButton
│
├── DebriefView (Scene 4 post-submit)
│   ├── FormView (compressed, 55%)
│   └── ARIADebriefPanel (45%)
│       ├── ARIAWaveform (full scale)
│       ├── DebriefTranscript
│       └── AttackChainViz
│
└── MissionCompleteView (Scene 5)
    ├── AnalystIDCard (3D flip)
    ├── XPPanel
    │   ├── XPCounter
    │   ├── BonusLines
    │   └── LevelProgressBar
    ├── AchievementStack
    └── PathForwardStrip
```

---

## DATA FLOW

```typescript
// Mission state (Zustand store extension)
interface MissionState {
  missionId: 'MISSION-001';
  state: MissionStateName;
  startedAt: number; // timestamp
  currentScene: SceneID;
  
  // Progress tracking
  entriesExpanded: Set<LogEntryID>;
  hintShown: boolean;
  wrongFlags: LogEntryID[];
  correctFlagSubmitted: boolean;
  
  // Form state
  incidentReport: {
    threatType: ThreatType | null;
    ciaImpact: CIATriadPillar[];
    description: string;
    response: ResponseType | null;
    submittedAt: number | null;
  };
  
  // Bonus tracking
  usedHints: boolean;
  completionTimeMs: number | null;
  allEntriesReviewed: boolean;
  descriptionCharCount: number;
  easterEggsFound: Set<EasterEggID>;
  ariaViewTimeMs: number;
  
  // Computed XP
  earnedXP: number;
  bonusXP: number;
  
  // Achievements
  unlockedAchievements: AchievementID[];
  
  // Replay flag
  isReplay: boolean;
}
```

```typescript
// Events emitted during mission
type MissionEvent =
  | { type: 'SCENE_COMPLETE'; scene: SceneID; timeMs: number }
  | { type: 'ENTRY_EXPANDED'; entryId: LogEntryID }
  | { type: 'WRONG_FLAG'; entryId: LogEntryID }
  | { type: 'THREAT_FLAGGED'; entryId: LogEntryID }
  | { type: 'REPORT_SUBMITTED'; report: IncidentReport }
  | { type: 'EASTER_EGG_FOUND'; eggId: EasterEggID }
  | { type: 'HINT_TRIGGERED'; hintType: HintType }
  | { type: 'MISSION_COMPLETE'; totalXP: number; achievements: AchievementID[] }
  | { type: 'SKIP'; scene: SceneID }
```

---

## ANALYTICS

Every significant learner action is tracked. Schema:

```typescript
interface MissionAnalyticsEvent {
  userId: string;
  sessionId: string;
  missionId: 'MISSION-001';
  eventType: MissionEventType;
  timestamp: number;
  properties: Record<string, unknown>;
}

// Key metrics to track:
// - Time spent per scene
// - CIA quiz: attempts per card, time to complete
// - Terminal: which entries expanded, in what order, time between actions
// - Wrong flags: which entries were incorrectly flagged
// - Hint usage: when hints triggered, whether they preceded correct action
// - Form: did they write a description? How long?
// - Total mission duration
// - Completion rate (% who start vs % who complete)
// - Drop-off points (which state were they in when they left?)
```

---

## SAVE STATE

**Storage:** `localStorage` key `sentinel_mission_001_progress`  
**Format:** JSON (serialized `MissionState`)  
**Save frequency:** After each scene completes and after any user action (debounced 2 seconds)  
**On reload:** If save state exists and `state !== 'MISSION_COMPLETE'`, show "Resume?" overlay  
**Expiry:** Save state persists indefinitely  
**After completion:** Save state preserved for 30 days (enables replay detection and achievement tracking)

---

## PERFORMANCE BUDGET

| Resource | Budget | Notes |
|----------|--------|-------|
| Initial JS bundle | < 80KB gzipped | Mission-specific code, lazy loaded |
| Initial CSS | < 20KB gzipped | Mission + global styles |
| SOC environment illustration | < 800KB | SVG-based, loads with Scene 1 |
| ARIA voice audio (all lines) | < 4MB | OGG format, streamed not preloaded |
| Music (ambient loop) | < 2MB | Loaded on demand, buffered |
| First contentful paint | < 1.5s | Boot sequence is content |
| Time to interactive | < 2.5s | Mission can begin interacting at Scene 2 |
| Canvas FPS (ARIA waveform) | 60fps | Falls to 30fps if device CPU is slow |
| Canvas FPS (particles) | 60fps | Drops particle count if below 45fps |
| Total asset weight | < 12MB | Sum of all lazily loaded resources |

---

## LAZY LOADING STRATEGY

**Phase 1 (loads before Scene 0):** Boot sequence component, HUD, minimum CSS. Target: < 50KB.

**Phase 2 (loads during Scene 0):** SOC environment assets, ARIA waveform component. The 28-second boot gives ~28 seconds of loading time on slow connections.

**Phase 3 (loads during Scene 1):** ARIA voice clips (first 4 lines), CIA icon SVGs, quiz component.

**Phase 4 (loads during Scene 2):** Remaining ARIA voice clips for Scene 2, terminal component code.

**Phase 5 (loads during Scene 2.5):** Terminal log data, Scene 3 voice clips.

**Preconnect and dns-prefetch** for audio CDN set in document `<head>`.

---

## OFFLINE BEHAVIOR

**Progressive Web App capability:**

- Service worker caches all assets after first load
- On repeat visit: instant load (from cache)
- Audio files: cached after first play
- If network unavailable: mission runs completely from cache
- Save state: always localStorage (no network dependency)
- Analytics: queued locally, sent when connection restored

---

## ERROR HANDLING

| Error | Handling |
|-------|----------|
| Audio fails to load | Continue silently. Mission works without audio. Caption toggle activates automatically. A small "Audio unavailable" toast appears and disappears after 3 seconds. |
| ARIA voice file missing | Fall back to display-only text transcript. ARIA's panel shows a text message: "[Audio unavailable — text transcript displayed]". Auto-advances after reading time estimate. |
| Save state corrupted | Clear state, restart mission. No error shown to user ("Starting fresh" message only). |
| Canvas not supported (very old browser) | ARIA displays as static SVG illustration. Boot sequence shows text only. Core functionality preserved. |
| Drag-and-drop unavailable (old mobile) | Tap-to-select mode activates automatically. |
| Performance degraded (< 45fps sustained) | Reduce particle count to 0. ARIA waveform drops to 30fps. Ambient animations reduce to 50% detail. |

---

## ACCESSIBILITY APIS

**ARIA live regions:**
- `aria-live="polite"` on dialogue transcript (announces each new ARIA line to screen readers)
- `aria-live="assertive"` on hint messages (immediately announces to screen reader)
- `aria-live="polite"` on XP counter updates

**Roles:**
- Terminal log: `role="table"` with `<thead>` for column labels and `<tbody>` for entries
- Each log entry row: `role="row"`
- Each cell: `role="cell"`
- Expanded content: `role="region"` with `aria-label="Entry details"`
- Confirmation dialog: `role="dialog"` with `aria-labelledby` pointing to the dialog heading
- CIA quiz: `role="form"` with `aria-label="CIA Triad Classification Quiz"`
- Incident report: `role="form"` with `aria-label="Incident Report"`

**Focus management:**
- Scene transitions: focus moves to first meaningful element in new scene
- Overlays: focus trapped inside while open
- Overlay close: focus returns to triggering element

**Keyboard shortcuts (mission-specific):**
- `Escape`: Skip current cinematic sequence (Scenes 0–1) / Close overlay
- `Space` / `Enter`: Advance dialogue (Scene 2) / Submit / Confirm primary action
- `R`: Toggle reading mode (when in Scene 2)
- `H`: Open help overlay with keyboard shortcuts list

---

*End of Part 3 — Sections 8, 9, 10, 11, 12*  
*Continue in PRODUCTION_PACKAGE_PART4.md — Sections 13 (Learning Design), 14 (Achievement System), 15 (QA Checklist), 16 (Developer Checklist), 17 (Production Roadmap), 18 (Self Critique)*
