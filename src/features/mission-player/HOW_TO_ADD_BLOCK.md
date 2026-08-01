# How to Add a New Block Type

Adding a block type is a **2-step process**. The renderer, schemas, router, and
migration layer require **zero changes**.

---

## Step 1 — Create the React Component

Create `src/features/mission-player/components/blocks/<type>-block.tsx`.

The component receives a `StandardBlock<TContent>` where `TContent` is your
block's content shape. Define `TContent` as an interface in the same file or
add it to `src/types/mission-engine.ts` if it will be reused.

```tsx
// components/blocks/video-block.tsx
import type { StandardBlock } from '@/types/mission-engine'

interface VideoContent {
  videoUrl:     string
  captionTrack?: string
  transcript?:  string
}

interface VideoBlockProps {
  block: StandardBlock<VideoContent>
}

export function VideoBlock({ block }: VideoBlockProps) {
  const { videoUrl, transcript } = block.content
  return (
    <div className="rounded-xl border border-border p-6 space-y-4">
      <h2 className="text-lg font-semibold">{block.title}</h2>
      <video src={videoUrl} controls className="w-full rounded-lg" />
      {transcript && <p className="text-sm text-muted-foreground">{transcript}</p>}
    </div>
  )
}
```

**Rules:**
- The component must accept `{ block: StandardBlock<TContent> }` as props.
- Read data from `block.content`, `block.title`, and `block.metadata`.
- Never read from `block.type` inside the component — the registry already
  guarantees the correct component is called.

---

## Step 2 — Register the Component

Open `src/features/mission-player/registry/registered-blocks.ts` and add:

```ts
import { VideoBlock } from '../components/blocks/video-block'

registerBlock('video', VideoBlock)
```

**That's it.** The `BlockRenderer` will automatically call `VideoBlock`
whenever it encounters a block with `"type": "video"`.

---

## Standard CyberLearn Mission Flow

Every mission follows this 5-phase structure. Use it as your content template.

```
Phase 1 — Engage
  1.  mission-brief       Mission Brief
  2.  discussion          Reflection Question  (prompt style)
  3.  story               Story

Phase 2 — Learn
  4.  case-study          Real World Case Study
  5.  theory              Theory
  6.  memory-anchor       Memory Anchor
  7.  diagram             Interactive Diagram  (interactive: true)
  8.  discussion          Discussion
  9.  student-questions   Questions Learners Ask
  10. common-mistakes     Common Mistakes

Phase 3 — Reinforce
  11. diagram             Mind Map  (interactive: false)
  12. cheat-sheet         Cheat Sheet
  13. quiz                Quiz
  14. flashcards          Flashcards

Phase 4 — Apply
  15. micro-practical     Micro Practical  ← always last before completion

Phase 5 — Complete
  16. mission-complete    Mission Complete
```

The **Micro Practical is always the final learning activity** before Mission
Complete. The learner journey is:

> Understand → Revise → Test Knowledge → Apply Knowledge → Complete Mission

Additional block types (`analogy`, `glossary`, `funny-illustration`, `lab`,
`assignment`, `interactive`, `ai-tutor`) may be added as supplementary blocks
anywhere in phases 1–3.

---

## Authoring a Micro Practical Block

The `micro-practical` block type replaces the old `animation` block. It
replaces passive watching with a short, safe activity the learner performs on
their own device.

**Duration:** 2–10 minutes. No cloud infrastructure, no VM, no unsafe actions.

**JSON format (standard envelope):**

```json
{
  "id": "block-15-micro-practical",
  "type": "micro-practical",
  "title": "Find a Responsible Disclosure Policy",
  "metadata": {
    "order": 15,
    "estimatedMinutes": 5,
    "optional": false,
    "xp": 20,
    "difficulty": "beginner",
    "icon": "laptop",
    "tags": ["ethical-hacking", "responsible-disclosure"]
  },
  "content": {
    "objective": "Locate and read a real responsible disclosure policy and identify the rules that define legal security research.",
    "requirements": [
      "Web browser",
      "Internet connection"
    ],
    "instructions": [
      "Open your web browser and go to a well-known company — Google, Microsoft, GitHub, or Cloudflare.",
      "Search for their 'Responsible Disclosure Policy', 'Security Policy', or 'Bug Bounty Program' page.",
      "Read the policy and note: (1) what is in scope, (2) what is out of scope, (3) what is forbidden.",
      "Write down one thing that surprised you."
    ],
    "successCriteria": [
      "You found a published responsible disclosure policy from a real company.",
      "You can name at least one permitted activity.",
      "You can name at least one forbidden activity."
    ],
    "reflection": "Why do companies publish responsible disclosure policies? What does it tell you about the relationship between researchers and the organisations they help?"
  }
}
```

**Content field reference:**

| Field             | Type       | Required | Notes |
|-------------------|------------|----------|-------|
| `objective`       | string     | ✓        | One sentence — what the learner will do and why |
| `requirements`    | string[]   | ✓        | Tools/access needed, e.g. `["Web browser"]` |
| `instructions`    | string[]   | ✓        | Step-by-step numbered actions (min 1) |
| `successCriteria` | string[]   | ✓        | Checkable statements the learner verifies (min 1) |
| `reflection`      | string     | ✓        | One open question to reinforce understanding |

**Design rules for Micro Practicals:**
- Safe — no activities that could harm the learner's device or others
- Self-contained — no account creation, no payment, no personal data entry
- Beginner-accessible — a first-week learner can complete it without help
- Verifiable — the learner can check their own success against the criteria

---

## Block JSON Format

Create content files in:
```
content/courses/<course>/<module>/<mission>/blocks/<NN>-<type>.json
```

Use the **standard format** (preferred for all new blocks):

```json
{
  "id": "block-10-video",
  "type": "video",
  "title": "How DNS Resolution Works",
  "metadata": {
    "order": 10,
    "estimatedMinutes": 8,
    "optional": false,
    "xp": 30,
    "difficulty": "beginner",
    "icon": "play-circle",
    "badge": "recommended",
    "tags": ["dns", "networking"]
  },
  "content": {
    "videoUrl": "/videos/dns-resolution.mp4",
    "transcript": "In this video we explore..."
  }
}
```

The **legacy flat format** is also accepted (existing blocks only):
```json
{ "id": "...", "type": "video", "order": 10, "estimatedMinutes": 8, "sidebarLabel": "Video", "videoUrl": "..." }
```
The migration layer converts legacy blocks to `StandardBlock` automatically at
load time. New content should always use the standard format.

---

## Standard Block Fields Reference

| Field              | Type       | Required | Notes |
|--------------------|------------|----------|-------|
| `id`               | string     | ✓        | Unique within mission |
| `type`             | string     | ✓        | Matches `registerBlock(type, ...)` |
| `title`            | string     | ✓        | Sidebar label and heading |
| `metadata.order`   | number     | ✓        | Sort order within mission |
| `metadata.estimatedMinutes` | number | ✓ | Used for progress estimates |
| `metadata.optional` | boolean  | ✓        | Optional blocks don't count toward completion |
| `metadata.xp`      | number     | ✓        | XP awarded when block is completed |
| `metadata.difficulty` | string  | ✓        | `beginner` / `intermediate` / `advanced` / `expert` |
| `metadata.icon`    | string     | ✓        | Lucide icon name, e.g. `laptop` |
| `metadata.badge`   | string     | –        | `recommended` / `required` / `bonus` / `challenge` |
| `metadata.tags`    | string[]   | ✓        | Used for search and analytics |
| `content`          | object     | ✓        | Block-specific data (your TContent shape) |

---

## Optional: Add Zod Validation

For strict server-side validation of new block type content, add a schema in
`src/lib/content/mission-schemas.ts`:

```ts
const VideoBlockSchema = StandardBlockSchema.extend({
  type:    z.literal('video'),
  content: z.object({
    videoUrl:     z.string().url(),
    captionTrack: z.string().optional(),
    transcript:   z.string().optional(),
  }),
})
```

This is optional — the registry and migration work without it. Add it when the
block type becomes part of the standard curriculum and schema strictness matters.

---

## Registering a Block from a Plugin / External Package

The registry accepts any string type. Third-party block types work the same way:

```ts
import { MyCustomBlock } from '@my-org/cyber-blocks'
registerBlock('my-custom-type', MyCustomBlock)
```

Place this in `registered-blocks.ts` or call `registerBlock` in your plugin's
entry point before the mission player mounts.

---

## Checklist

- [ ] Created component file in `components/blocks/<type>-block.tsx`
- [ ] Component accepts `{ block: StandardBlock<TContent> }` props
- [ ] Registered in `registered-blocks.ts`
- [ ] Created at least one block JSON file with `"type": "<type>"`
- [ ] *(Optional)* Added Zod schema for content validation
- [ ] *(Optional)* Added `TContent` interface to `mission-engine.ts`
