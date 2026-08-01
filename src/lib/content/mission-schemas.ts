/**
 * Mission Engine — Zod validation schemas
 *
 * Two sets of schemas live here:
 *
 * 1. STANDARD schemas (BlockMetadataSchema, StandardBlockSchema, CourseMissionMetaSchema)
 *    Used for new-format blocks and mission metadata.
 *
 * 2. LEGACY schemas (MissionBlockSchema and its per-type sub-schemas)
 *    Used by block-migration.ts to validate old flat-format blocks before
 *    converting them to StandardBlock. These are NOT used for new content.
 *
 * Adding a new block type:
 *   1. Create the TypeScript content interface in src/types/mission-engine.ts
 *   2. Create the React component in features/mission-player/components/blocks/
 *   3. Register it in features/mission-player/registry/registered-blocks.ts
 *   Zod schemas are optional additions for strict validation of new block types.
 */

import { z } from 'zod'
import { DifficultySchema, linesOrString } from './schemas'

// ═══════════════════════════════════════════════════════════════════════════
// STANDARD FORMAT SCHEMAS
// ═══════════════════════════════════════════════════════════════════════════

export const BlockMetadataSchema = z.object({
  order:            z.number().int().nonnegative(),
  estimatedMinutes: z.number().positive(),
  optional:         z.boolean(),
  xp:               z.number().nonnegative(),
  difficulty:       DifficultySchema,
  icon:             z.string(),
  badge:            z.enum(['recommended', 'required', 'bonus', 'challenge']).optional(),
  tags:             z.array(z.string()),
})

export const StandardBlockSchema = z.object({
  id:       z.string().min(1),
  type:     z.string().min(1),
  title:    z.string(),
  metadata: BlockMetadataSchema,
  content:  z.record(z.unknown()),
})

// ── Mission metadata — mission.json ───────────────────────────────────────

export const MissionCompletionRequirementsSchema = z.object({
  minBlocksCompleted:    z.number().optional(),
  requiredBlockIds:      z.array(z.string()).optional(),
  minQuizScore:          z.number().min(0).max(100).optional(),
  requiresLabCompletion: z.boolean().optional(),
})

export const CourseMissionMetaSchema = z.object({
  id:               z.string().min(1),
  slug:             z.string().regex(/^[a-z0-9-]+$/),
  courseSlug:       z.string(),
  moduleSlug:       z.string(),
  title:            z.string().min(3).max(120),
  tagline:          z.string().max(200),
  description:      z.string().min(10),
  difficulty:       DifficultySchema,
  estimatedMinutes: z.number().positive(),
  xpReward:         z.number().positive(),
  order:            z.number().int().positive(),
  version:          z.string().regex(/^\d+\.\d+\.\d+$/),
  author:           z.string(),
  createdAt:        z.string().datetime(),
  updatedAt:        z.string().datetime(),
  prerequisites:    z.array(z.string()).default([]),
  tags:             z.array(z.string()).min(1),
  // Enhanced metadata
  learningObjectives:     z.array(z.string()).default([]),
  skills:                 z.array(z.string()).optional(),
  badge:                  z.string().optional(),
  missionImage:           z.string().optional(),
  missionIcon:            z.string().optional(),
  missionNumber:          z.number().optional(),
  completionRequirements: MissionCompletionRequirementsSchema.optional(),
})

// ── Mission summary — used in module.json `missions` array ────────────────

export const MissionSummarySchema = z.object({
  slug:             z.string(),
  title:            z.string(),
  order:            z.number(),
  difficulty:       DifficultySchema,
  estimatedMinutes: z.number(),
  xpReward:         z.number(),
  tags:             z.array(z.string()),
})

// ═══════════════════════════════════════════════════════════════════════════
// LEGACY FORMAT SCHEMAS — validate old flat-format block files.
// These are consumed by block-migration.ts only.
// ═══════════════════════════════════════════════════════════════════════════

const LegacyBaseBlockSchema = z.object({
  id:               z.string().min(1),
  order:            z.number().int().nonnegative(),
  estimatedMinutes: z.number().positive(),
  sidebarLabel:     z.string().optional(),
  isOptional:       z.boolean().optional(),
})

const LegacyMissionBriefSchema = LegacyBaseBlockSchema.extend({
  type:              z.literal('mission-brief'),
  missionTitle:      z.string().min(3),
  operativeCodename: z.string().min(1),
  briefing:          z.string().min(10),
  objectives:        z.array(z.string()).min(1),
  difficulty:        DifficultySchema,
  xpReward:          z.number().positive(),
  tags:              z.array(z.string()).default([]),
})

const LegacyStorySchema = LegacyBaseBlockSchema.extend({
  type:       z.literal('story'),
  narrative:  z.array(z.string()).min(1),
  characters: z.array(z.object({
    name:        z.string(),
    role:        z.string(),
    description: z.string(),
    emoji:       z.string().optional(),
  })).optional(),
  mood: z.enum(['neutral', 'tense', 'discovery', 'triumph', 'warning']).optional(),
})

const LegacyTheorySchema = LegacyBaseBlockSchema.extend({
  type:       z.literal('theory'),
  title:      z.string().min(3),
  content:    linesOrString,
  callouts:   z.array(z.object({
    type:  z.enum(['info', 'warning', 'tip', 'danger', 'insight']),
    title: z.string().optional(),
    text:  z.string(),
  })).optional(),
  codeBlocks: z.array(z.object({
    language: z.string(),
    code:     linesOrString,
    caption:  z.string().optional(),
  })).optional(),
  keyTerms: z.array(z.object({ term: z.string(), definition: z.string() })).optional(),
  analogy:  z.object({ scenario: z.string(), mapping: z.string() }).optional(),
})

const LegacyCaseStudySchema = LegacyBaseBlockSchema.extend({
  type:           z.literal('case-study'),
  company:        z.string(),
  year:           z.string().optional(),
  industry:       z.string().optional(),
  incident:       z.string(),
  whatHappened:   z.array(z.string()).min(1),
  whyItHappened:  z.array(z.string()).min(1),
  lessonsLearned: z.array(z.string()).min(1),
  impactStats:    z.array(z.object({ value: z.string(), label: z.string() })).optional(),
})

const LegacyMemoryAnchorSchema = LegacyBaseBlockSchema.extend({
  type:        z.literal('memory-anchor'),
  title:       z.string(),
  concept:     z.string(),
  anchor:      z.string(),
  explanation: z.string(),
  acronym:     z.object({
    letters:  z.array(z.string()),
    meanings: z.array(z.string()),
  }).optional(),
})

const LegacyFunnyIllustrationSchema = LegacyBaseBlockSchema.extend({
  type:      z.literal('funny-illustration'),
  title:     z.string(),
  setup:     z.string(),
  punchline: z.string(),
  concept:   z.string(),
})

const LegacyAnalogySchema = LegacyBaseBlockSchema.extend({
  type:           z.literal('analogy'),
  title:          z.string(),
  realWorldThing: z.string(),
  concept:        z.string(),
  comparison:     z.string(),
  breakdown:      z.array(z.object({
    realWorld:      z.string(),
    techEquivalent: z.string(),
  })).min(1),
})

const LegacyDiagramSchema = LegacyBaseBlockSchema.extend({
  type:        z.literal('diagram'),
  title:       z.string(),
  description: z.string(),
  nodes:       z.array(z.object({
    id:     z.string(),
    label:  z.string(),
    type:   z.string().optional(),
    detail: z.string().optional(),
  })).min(2),
  edges: z.array(z.object({
    from:     z.string(),
    to:       z.string(),
    label:    z.string().optional(),
    type:     z.string().optional(),
    animated: z.boolean().optional(),
  })).optional(),
  caption:     z.string().optional(),
  interactive: z.boolean().optional(),
})

const LegacyMicroPracticalSchema = LegacyBaseBlockSchema.extend({
  type:            z.literal('micro-practical'),
  title:           z.string(),
  objective:       z.string(),
  requirements:    z.array(z.string()),
  instructions:    z.array(z.string()).min(1),
  successCriteria: z.array(z.string()).min(1),
  reflection:      z.string().optional(),
})

const LegacyInteractiveSchema = LegacyBaseBlockSchema.extend({
  type:          z.literal('interactive'),
  title:         z.string(),
  description:   z.string(),
  componentType: z.enum(['terminal', 'packet-flow', 'attack-timeline', 'process-flow', 'code-diff', 'drag-drop', 'scenario']),
  config:        z.record(z.unknown()),
})

const LegacyDiscussionSchema = LegacyBaseBlockSchema.extend({
  type:           z.literal('discussion'),
  title:          z.string(),
  prompt:         z.string(),
  context:        z.string().optional(),
  guideQuestions: z.array(z.string()).optional(),
})

const LegacyStudentQuestionsSchema = LegacyBaseBlockSchema.extend({
  type:  z.literal('student-questions'),
  intro: z.string().optional(),
  faqs:  z.array(z.object({ question: z.string(), answer: z.string() })).min(1),
})

const LegacyCommonMistakesSchema = LegacyBaseBlockSchema.extend({
  type:     z.literal('common-mistakes'),
  intro:    z.string().optional(),
  mistakes: z.array(z.object({
    title:       z.string(),
    wrong:       z.string(),
    right:       z.string(),
    explanation: z.string(),
    severity:    z.enum(['warning', 'critical']),
    example:     z.string().optional(),
  })).min(1),
})

const LegacyGlossarySchema = LegacyBaseBlockSchema.extend({
  type:  z.literal('glossary'),
  title: z.string().optional(),
  terms: z.array(z.object({
    term:       z.string(),
    definition: z.string(),
    category:   z.string().optional(),
  })).min(1),
})

const LegacyCheatSheetSchema = LegacyBaseBlockSchema.extend({
  type:     z.literal('cheat-sheet'),
  title:    z.string(),
  sections: z.array(z.object({
    heading: z.string(),
    rows:    z.array(z.object({ label: z.string(), value: z.string() })).min(1),
  })).min(1),
})

const LegacyQuizSchema = LegacyBaseBlockSchema.extend({
  type:      z.literal('quiz'),
  questions: z.array(z.object({
    id:          z.string(),
    question:    z.string(),
    type:        z.enum(['single', 'multiple', 'true-false', 'scenario']),
    context:     z.string().optional(),
    options:     z.array(z.object({
      id:        z.string(),
      text:      z.string(),
      isCorrect: z.boolean(),
    })).min(2),
    explanation: z.string(),
    xpReward:    z.number().optional(),
  })).min(1),
  passingScore: z.number().min(0).max(100).optional(),
})

const LegacyFlashcardsSchema = LegacyBaseBlockSchema.extend({
  type:  z.literal('flashcards'),
  title: z.string().optional(),
  cards: z.array(z.object({
    front: z.string(),
    back:  z.string(),
    hint:  z.string().optional(),
  })).min(1),
})

const LegacyAssignmentSchema = LegacyBaseBlockSchema.extend({
  type:           z.literal('assignment'),
  title:          z.string(),
  description:    z.string(),
  deliverables:   z.array(z.string()).min(1),
  submissionType: z.enum(['text', 'file', 'url', 'screenshot']),
  dueIn:          z.string().optional(),
  rubric:         z.array(z.object({
    criterion:   z.string(),
    points:      z.number(),
    description: z.string(),
  })).optional(),
})

const LegacyLabSchema = LegacyBaseBlockSchema.extend({
  type:           z.literal('lab'),
  title:          z.string(),
  objective:      z.string(),
  labType:        z.enum(['terminal', 'browser', 'tool', 'analysis', 'wireshark']),
  difficulty:     DifficultySchema,
  safetyNotice:   z.string().optional(),
  prerequisites:  z.array(z.string()).optional(),
  steps:          z.array(z.object({
    id:             z.string(),
    title:          z.string(),
    description:    z.string(),
    command:        z.string().optional(),
    expectedOutput: z.string().optional(),
  })).min(1),
  hints:          z.array(z.string()),
  expectedResult: z.string(),
})

const LegacySummarySchema = LegacyBaseBlockSchema.extend({
  type:         z.literal('summary'),
  keyTakeaways: z.array(z.string()).min(1),
  xpBreakdown:  z.object({
    base:    z.number(),
    bonuses: z.array(z.object({ label: z.string(), amount: z.number() })),
    total:   z.number(),
  }),
  nextMission: z.object({
    title:            z.string(),
    slug:             z.string(),
    estimatedMinutes: z.number(),
  }).optional(),
  relatedTopics: z.array(z.string()).optional(),
})

const LegacyMissionCompleteSchema = LegacyBaseBlockSchema.extend({
  type:           z.literal('mission-complete'),
  title:          z.string(),
  message:        z.string(),
  xpEarned:       z.number().nonnegative(),
  badgesUnlocked: z.array(z.string()).optional(),
  nextSteps:      z.array(z.string()).optional(),
})

const LegacyAiTutorSchema = LegacyBaseBlockSchema.extend({
  type:             z.literal('ai-tutor'),
  topic:            z.string(),
  context:          z.string(),
  suggestedPrompts: z.array(z.string()).min(1),
})

/** Discriminated union of all legacy block types — used for migration only. */
export const MissionBlockSchema = z.discriminatedUnion('type', [
  LegacyMissionBriefSchema,
  LegacyStorySchema,
  LegacyTheorySchema,
  LegacyCaseStudySchema,
  LegacyMemoryAnchorSchema,
  LegacyFunnyIllustrationSchema,
  LegacyAnalogySchema,
  LegacyDiagramSchema,
  LegacyMicroPracticalSchema,
  LegacyInteractiveSchema,
  LegacyDiscussionSchema,
  LegacyStudentQuestionsSchema,
  LegacyCommonMistakesSchema,
  LegacyGlossarySchema,
  LegacyCheatSheetSchema,
  LegacyQuizSchema,
  LegacyFlashcardsSchema,
  LegacyAssignmentSchema,
  LegacyLabSchema,
  LegacySummarySchema,
  LegacyMissionCompleteSchema,
  LegacyAiTutorSchema,
])

// ── Exported inferred types ───────────────────────────────────────────────────

export type BlockMetadataZod    = z.infer<typeof BlockMetadataSchema>
export type StandardBlockZod    = z.infer<typeof StandardBlockSchema>
export type CourseMissionMeta   = z.infer<typeof CourseMissionMetaSchema>
export type MissionSummary      = z.infer<typeof MissionSummarySchema>
