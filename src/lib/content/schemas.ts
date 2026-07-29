/**
 * Content Engine — Zod validation schemas
 *
 * Every schema maps 1:1 to the lesson-engine.ts discriminated union types.
 * Key improvement: fields that contain long text (content, code) accept either
 * a plain `string` OR a `string[]` (joined with \n) — human-friendly for JSON authors.
 *
 * After parsing, all fields are strings — the components never see arrays.
 */

import { z } from 'zod'

// ── Helper: accepts a plain string or a line array (joined with \n) ─────────

export const linesOrString = z.union([
  z.string(),
  z.array(z.string()).transform((lines) => lines.join('\n')),
])

// ── Shared enums ─────────────────────────────────────────────────────────────

export const DifficultySchema = z.enum(['beginner', 'intermediate', 'advanced', 'expert'])

export const SkillCategorySchema = z.enum([
  'foundations',
  'networking',
  'web-security',
  'cryptography',
  'malware-analysis',
  'forensics',
  'penetration-testing',
  'social-engineering',
  'linux',
  'scripting',
  'cloud-security',
])

// ── Base section — every section extends this ─────────────────────────────────

const BaseSectionSchema = z.object({
  id:               z.string().min(1, 'Section id is required'),
  sidebarLabel:     z.string().optional(),
  estimatedMinutes: z.number().positive('estimatedMinutes must be a positive number'),
  isOptional:       z.boolean().optional(),
})

// ============================================================
// HOOK
// ============================================================

const HookSectionSchema = BaseSectionSchema.extend({
  type:             z.literal('hook'),
  variant:          z.enum(['statistic', 'question', 'fact', 'scenario']),
  headline:         z.string().min(1, 'Hook headline is required'),
  subheadline:      z.string().optional(),
  stat: z.object({
    value:   z.string(),
    label:   z.string(),
    source:  z.string().optional(),
  }).optional(),
  backgroundAccent: z.enum(['blue', 'red', 'green', 'purple', 'orange']).optional(),
})

// ============================================================
// STORY
// ============================================================

const StoryCharacterSchema = z.object({
  name:        z.string(),
  role:        z.string(),
  description: z.string(),
  emoji:       z.string().optional(),
})

const StoryTimelineSchema = z.object({
  timestamp: z.string(),
  event:     z.string(),
  detail:    z.string().optional(),
  type:      z.enum(['normal', 'critical', 'resolution']).optional(),
})

const StorySectionSchema = BaseSectionSchema.extend({
  type:       z.literal('story'),
  narrative:  z.array(z.string()).min(1, 'Story must have at least one paragraph'),
  characters: z.array(StoryCharacterSchema).optional(),
  quote: z.object({
    text:         z.string(),
    attribution:  z.string().optional(),
  }).optional(),
  timeline: z.array(StoryTimelineSchema).optional(),
  mood:     z.enum(['neutral', 'tense', 'discovery', 'triumph', 'warning']).optional(),
})

// ============================================================
// OBJECTIVES
// ============================================================

const ObjectivesSectionSchema = BaseSectionSchema.extend({
  type:       z.literal('objectives'),
  objectives: z.array(z.string()).min(1, 'At least one objective is required'),
  xpPreview: z.object({
    base:    z.number(),
    bonuses: z.array(z.object({ label: z.string(), amount: z.number() })),
  }).optional(),
})

// ============================================================
// EXPLANATION
// ============================================================

const CalloutSchema = z.object({
  type:  z.enum(['info', 'warning', 'tip', 'danger', 'insight']),
  title: z.string().optional(),
  text:  z.string(),
})

const CodeBlockSchema = z.object({
  language:  z.string(),
  code:      linesOrString,  // accepts string | string[]
  caption:   z.string().optional(),
  highlight: z.array(z.number()).optional(),
})

const AnalogySchema = z.object({
  scenario: z.string(),
  mapping:  z.string(),
})

const ExplanationSectionSchema = BaseSectionSchema.extend({
  type:       z.literal('explanation'),
  content:    linesOrString,  // markdown string or line array
  callouts:   z.array(CalloutSchema).optional(),
  codeBlocks: z.array(CodeBlockSchema).optional(),
  analogy:    AnalogySchema.optional(),
  keyTerms:   z.array(z.object({ term: z.string(), definition: z.string() })).optional(),
})

// ============================================================
// DIAGRAM
// ============================================================

const DiagramNodeSchema = z.object({
  id:     z.string(),
  label:  z.string(),
  type:   z.enum(['client', 'server', 'database', 'attacker', 'firewall', 'default']).optional(),
  detail: z.string().optional(),
})

const DiagramEdgeSchema = z.object({
  from:      z.string(),
  to:        z.string(),
  label:     z.string().optional(),
  type:      z.enum(['normal', 'attack', 'data', 'blocked']).optional(),
  animated:  z.boolean().optional(),
})

const DiagramSectionSchema = BaseSectionSchema.extend({
  type:        z.literal('diagram'),
  title:       z.string(),
  description: z.string(),
  nodes:       z.array(DiagramNodeSchema).min(2, 'Diagram must have at least 2 nodes'),
  edges:       z.array(DiagramEdgeSchema).optional(),
  caption:     z.string().optional(),
  interactive: z.boolean().optional(),
})

// ============================================================
// ANIMATION
// ============================================================

const AnimationStepSchema = z.object({
  title:       z.string(),
  description: z.string(),
  visualNote:  z.string().optional(),
  code:        linesOrString.optional(),  // also accepts string[]
  highlight:   z.enum(['attacker', 'server', 'database', 'user', 'none']).optional(),
})

const AnimationSectionSchema = BaseSectionSchema.extend({
  type:  z.literal('animation'),
  title: z.string(),
  intro: z.string(),
  steps: z.array(AnimationStepSchema).min(1, 'Animation must have at least one step'),
})

// ============================================================
// REAL WORLD EXAMPLE
// ============================================================

const RealWorldImpactStatSchema = z.object({
  value: z.string(),
  label: z.string(),
})

const RealWorldExampleSectionSchema = BaseSectionSchema.extend({
  type:           z.literal('real-world-example'),
  company:        z.string(),
  industry:       z.string().optional(),
  year:           z.string().optional(),
  incident:       z.string(),
  whatHappened:   z.array(z.string()),
  whyItHappened:  z.array(z.string()),
  impact:         z.array(RealWorldImpactStatSchema).optional(),
  lessonsLearned: z.array(z.string()),
  sourceLabel:    z.string().optional(),
})

// ============================================================
// PRACTICAL
// ============================================================

const PracticalStepSchema = z.object({
  id:             z.string(),
  title:          z.string(),
  description:    z.string(),
  command:        z.string().optional(),
  expectedOutput: z.string().optional(),
  note:           z.string().optional(),
})

const PracticalSectionSchema = BaseSectionSchema.extend({
  type:          z.literal('practical'),
  objective:     z.string(),
  practicalType: z.enum(['terminal', 'browser', 'file', 'tool', 'analysis', 'wireshark']),
  difficulty:    DifficultySchema,
  safetyNotice:  z.string().optional(),
  prerequisites: z.array(z.string()).optional(),
  steps:         z.array(PracticalStepSchema).min(1),
  hints:         z.array(z.string()),
  expectedResult: z.string(),
  solution:      z.string().optional(),
})

// ============================================================
// AI MENTOR
// ============================================================

const AIMentorSectionSchema = BaseSectionSchema.extend({
  type:             z.literal('ai-mentor'),
  topic:            z.string(),
  context:          z.string(),
  suggestedPrompts: z.array(z.string()).min(1),
})

// ============================================================
// CHALLENGE
// ============================================================

const ChallengeSectionSchema = BaseSectionSchema.extend({
  type:          z.literal('challenge'),
  title:         z.string(),
  description:   z.string(),
  challengeType: z.enum(['flag-capture', 'decode', 'identify', 'configure', 'fix-code']),
  difficulty:    DifficultySchema,
  xpReward:      z.number().positive(),
  timeLimit:     z.number().optional(),
  flagFormat:    z.string().optional(),
  flag:          z.string().optional(),
  hints:         z.array(z.string()),
  solution:      z.string().optional(),
  maxAttempts:   z.number().optional(),
})

// ============================================================
// COMMON MISTAKES
// ============================================================

const CommonMistakeSchema = z.object({
  title:       z.string(),
  wrong:       z.string(),
  right:       z.string(),
  explanation: z.string(),
  severity:    z.enum(['warning', 'critical']),
  example:     z.string().optional(),
})

const CommonMistakesSectionSchema = BaseSectionSchema.extend({
  type:     z.literal('common-mistakes'),
  intro:    z.string().optional(),
  mistakes: z.array(CommonMistakeSchema).min(1),
})

// ============================================================
// QUIZ
// ============================================================

const QuizOptionSchema = z.object({
  id:        z.string(),
  text:      z.string(),
  isCorrect: z.boolean(),
})

const QuizQuestionSchema = z.object({
  id:          z.string(),
  question:    z.string(),
  type:        z.enum(['single', 'multiple', 'true-false', 'scenario']),
  context:     z.string().optional(),
  options:     z.array(QuizOptionSchema).min(2, 'Each question needs at least 2 options'),
  explanation: z.string(),
  xpReward:    z.number().optional(),
})

const QuizSectionSchema = BaseSectionSchema.extend({
  type:         z.literal('quiz'),
  questions:    z.array(QuizQuestionSchema).min(1, 'Quiz must have at least one question'),
  passingScore: z.number().min(0).max(100).optional(),
})

// ============================================================
// REFLECTION
// ============================================================

const ReflectionSectionSchema = BaseSectionSchema.extend({
  type:        z.literal('reflection'),
  prompts:     z.array(z.string()).min(1),
  placeholder: z.string().optional(),
  minWords:    z.number().optional(),
})

// ============================================================
// SUMMARY
// ============================================================

const XPBreakdownSchema = z.object({
  base:             z.number(),
  activityBonus:    z.number(),
  challengeBonus:   z.number(),
  quizBonus:        z.number(),
  streakMultiplier: z.number(),
  total:            z.number(),
})

const SummarySectionSchema = BaseSectionSchema.extend({
  type:          z.literal('summary'),
  keyTakeaways:  z.array(z.string()).min(1),
  xpBreakdown:   XPBreakdownSchema,
  nextLesson: z.object({
    title:            z.string(),
    slug:             z.string(),
    courseSlug:       z.string(),
    estimatedMinutes: z.number(),
  }).optional(),
  relatedTopics: z.array(z.string()).optional(),
})

// ============================================================
// CAREER CONNECTION
// ============================================================

const CareerRoleSchema = z.object({
  title:       z.string(),
  description: z.string().optional(),
  salaryRange: z.string().optional(),
})

const CareerConnectionSectionSchema = BaseSectionSchema.extend({
  type:           z.literal('career-connection'),
  realWorldUsage: z.string(),
  roles:          z.array(CareerRoleSchema).min(1),
  companies:      z.array(z.string()).optional(),
  certifications: z.array(z.string()).optional(),
  careerPath:     z.array(z.string()).optional(),
})

// ============================================================
// DISCRIMINATED UNION — covers all 15 section types
// ============================================================

export const LessonSectionSchema = z.discriminatedUnion('type', [
  HookSectionSchema,
  StorySectionSchema,
  ObjectivesSectionSchema,
  ExplanationSectionSchema,
  DiagramSectionSchema,
  AnimationSectionSchema,
  RealWorldExampleSectionSchema,
  PracticalSectionSchema,
  AIMentorSectionSchema,
  ChallengeSectionSchema,
  CommonMistakesSectionSchema,
  QuizSectionSchema,
  ReflectionSectionSchema,
  SummarySectionSchema,
  CareerConnectionSectionSchema,
])

// ============================================================
// LESSON — full lesson.json schema
// ============================================================

export const ContentLessonSchema = z.object({
  id:                 z.string().min(1, 'Lesson id is required'),
  slug:               z.string().regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  courseSlug:         z.string(),
  moduleId:           z.string(),
  title:              z.string().min(3).max(120),
  tagline:            z.string().max(200),
  description:        z.string().min(10),
  difficulty:         DifficultySchema,
  estimatedMinutes:   z.number().positive(),
  tags:               z.array(z.string()).min(1),
  prerequisites:      z.array(z.string()).default([]),
  learningObjectives: z.array(z.string()).min(1, 'At least one learning objective is required'),
  version:            z.string().regex(/^\d+\.\d+\.\d+$/, 'Version must follow semver, e.g. 1.0.0'),
  author:             z.string(),
  createdAt:          z.string().datetime(),
  updatedAt:          z.string().datetime(),
  order:              z.number().int().positive(),
  xpReward:           z.number().positive(),
  nextLessonSlug:     z.string().optional(),
  prevLessonSlug:     z.string().optional(),
  sections:           z.array(LessonSectionSchema).min(1, 'Lesson must have at least one section'),
})

// ============================================================
// MODULE — module.json schema (includes lesson summaries for search)
// ============================================================

export const LessonSummarySchema = z.object({
  slug:             z.string(),
  title:            z.string(),
  difficulty:       DifficultySchema,
  estimatedMinutes: z.number(),
  tags:             z.array(z.string()),
  xpReward:         z.number(),
  order:            z.number(),
})

export const ContentModuleSchema = z.object({
  id:             z.string().min(1),
  slug:           z.string().regex(/^[a-z0-9-]+$/),
  courseSlug:     z.string(),
  title:          z.string().min(3),
  description:    z.string(),
  order:          z.number().int().positive(),
  estimatedHours: z.number().positive(),
  tags:           z.array(z.string()),
  version:        z.string().regex(/^\d+\.\d+\.\d+$/),
  author:         z.string(),
  createdAt:      z.string().datetime(),
  updatedAt:      z.string().datetime(),
  lessons:        z.array(LessonSummarySchema),
})

// ============================================================
// COURSE — course.json schema (includes module summaries)
// ============================================================

export const ModuleSummarySchema = z.object({
  slug:           z.string(),
  title:          z.string(),
  order:          z.number(),
  lessonCount:    z.number(),
  estimatedHours: z.number().optional(),
})

export const ContentCourseSchema = z.object({
  id:                 z.string().min(1),
  slug:               z.string().regex(/^[a-z0-9-]+$/),
  title:              z.string().min(3).max(100),
  tagline:            z.string().max(200),
  description:        z.string().min(20),
  difficulty:         DifficultySchema,
  estimatedHours:     z.number().positive(),
  xpReward:           z.number().positive(),
  category:           SkillCategorySchema,
  tags:               z.array(z.string()).min(1),
  prerequisites:      z.array(z.string()).default([]),
  learningObjectives: z.array(z.string()).min(1),
  version:            z.string().regex(/^\d+\.\d+\.\d+$/),
  author:             z.string(),
  coverEmoji:         z.string().optional(),
  isNew:              z.boolean().optional(),
  isPro:              z.boolean().optional(),
  createdAt:          z.string().datetime(),
  updatedAt:          z.string().datetime(),
  modules:            z.array(ModuleSummarySchema),
})

// ============================================================
// EXPORTED INFERRED TYPES
// ============================================================

export type ContentCourse = z.infer<typeof ContentCourseSchema>
export type ContentModule = z.infer<typeof ContentModuleSchema>
export type ContentLesson = z.infer<typeof ContentLessonSchema>
export type LessonSummary = z.infer<typeof LessonSummarySchema>
export type ModuleSummary = z.infer<typeof ModuleSummarySchema>
