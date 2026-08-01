/**
 * Mission Engine — Course → Module → Mission → Block architecture.
 *
 * CANONICAL RUNTIME TYPE: StandardBlock<TContent>
 *   Every block loaded at runtime is a StandardBlock. Metadata is universal;
 *   only `content` varies by block type. This enables sorting, analytics,
 *   XP, search, and AI generation without per-type special cases.
 *
 * LEGACY TYPES (MissionBlock union and subtypes):
 *   Kept for migration support. The block-migration layer converts them to
 *   StandardBlock at load time. Do not write new code against MissionBlock.
 *
 * Adding a new block type — 2 steps only:
 *   1. Create the React component in features/mission-player/components/blocks/
 *   2. Register it in features/mission-player/registry/registered-blocks.ts
 *   See HOW_TO_ADD_BLOCK.md for the full guide.
 */

import type { Difficulty } from './index'

// ═══════════════════════════════════════════════════════════════════════════
// STANDARD BLOCK — canonical runtime format
// ═══════════════════════════════════════════════════════════════════════════

/** Universal metadata present on EVERY block, regardless of type. */
export interface BlockMetadata {
  order:            number
  estimatedMinutes: number
  optional:         boolean
  xp:               number
  difficulty:       Difficulty
  icon:             string      // Lucide icon name, e.g. 'book-open'
  badge?:           'recommended' | 'required' | 'bonus' | 'challenge'
  tags:             string[]
}

/**
 * The canonical block type used throughout the runtime.
 * TContent is the block-type-specific data shape.
 * Default is Record<string, unknown> for untyped contexts (renderer, registry).
 */
export interface StandardBlock<TContent = Record<string, unknown>> {
  id:       string
  type:     string
  title:    string
  metadata: BlockMetadata
  content:  TContent
}

// ═══════════════════════════════════════════════════════════════════════════
// CONTENT TYPES — typed content for each built-in block type
// Use these when authoring a typed block component.
// ═══════════════════════════════════════════════════════════════════════════

export interface MissionBriefContent {
  briefing:          string
  objectives:        string[]
  operativeCodename: string
  missionTitle:      string
}

export interface StoryContent {
  narrative:   string[]
  characters?: { name: string; role: string; description: string; emoji?: string }[]
  mood?:       'neutral' | 'tense' | 'discovery' | 'triumph' | 'warning'
}

export interface TheoryContent {
  content:     string
  callouts?:   { type: 'info' | 'warning' | 'tip' | 'danger' | 'insight'; title?: string; text: string }[]
  codeBlocks?: { language: string; code: string; caption?: string }[]
  keyTerms?:   { term: string; definition: string }[]
  analogy?:    { scenario: string; mapping: string }
}

export interface CaseStudyContent {
  company:       string
  year?:         string
  industry?:     string
  incident:      string
  whatHappened:  string[]
  whyItHappened: string[]
  lessonsLearned: string[]
  impactStats?:  { value: string; label: string }[]
}

export interface MemoryAnchorContent {
  concept:     string
  anchor:      string
  explanation: string
  acronym?:    { letters: string[]; meanings: string[] }
}

export interface FunnyIllustrationContent {
  setup:     string
  punchline: string
  concept:   string
}

export interface AnalogyContent {
  realWorldThing: string
  concept:        string
  comparison:     string
  breakdown:      { realWorld: string; techEquivalent: string }[]
}

export interface DiagramContent {
  description: string
  nodes:       { id: string; label: string; type?: string; detail?: string }[]
  edges?:      { from: string; to: string; label?: string; type?: string; animated?: boolean }[]
  caption?:    string
  interactive?: boolean
}

export interface MicroPracticalContent {
  objective:       string
  requirements:    string[]
  instructions:    string[]
  successCriteria: string[]
  reflection:      string
}

export type InteractiveComponentType =
  | 'terminal'
  | 'packet-flow'
  | 'attack-timeline'
  | 'process-flow'
  | 'code-diff'
  | 'drag-drop'
  | 'scenario'

export interface InteractiveContent {
  description:   string
  componentType: InteractiveComponentType
  config:        Record<string, unknown>
}

export interface DiscussionContent {
  prompt:          string
  context?:        string
  guideQuestions?: string[]
}

export interface StudentQuestionsContent {
  intro?: string
  faqs:   { question: string; answer: string }[]
}

export interface CommonMistakesContent {
  intro?:   string
  mistakes: {
    title:       string
    wrong:       string
    right:       string
    explanation: string
    severity:    'warning' | 'critical'
    example?:    string
  }[]
}

export interface GlossaryContent {
  terms: { term: string; definition: string; category?: string }[]
}

export interface CheatSheetContent {
  sections: { heading: string; rows: { label: string; value: string }[] }[]
}

export interface QuizContent {
  questions: {
    id:          string
    question:    string
    type:        'single' | 'multiple' | 'true-false' | 'scenario'
    context?:    string
    options:     { id: string; text: string; isCorrect: boolean }[]
    explanation: string
    xpReward?:   number
  }[]
  passingScore?: number
}

export interface FlashcardsContent {
  cards: { front: string; back: string; hint?: string }[]
}

export interface AssignmentContent {
  description:    string
  deliverables:   string[]
  submissionType: 'text' | 'file' | 'url' | 'screenshot'
  dueIn?:         string
  rubric?:        { criterion: string; points: number; description: string }[]
}

export interface LabContent {
  objective:      string
  labType:        'terminal' | 'browser' | 'tool' | 'analysis' | 'wireshark'
  safetyNotice?:  string
  prerequisites?: string[]
  steps:          { id: string; title: string; description: string; command?: string; expectedOutput?: string }[]
  hints:          string[]
  expectedResult: string
}

export interface SummaryContent {
  keyTakeaways:  string[]
  xpBreakdown:   { base: number; bonuses: { label: string; amount: number }[]; total: number }
  nextMission?:  { title: string; slug: string; estimatedMinutes: number }
  relatedTopics?: string[]
}

export interface MissionCompleteContent {
  message:         string
  xpEarned:        number
  badgesUnlocked?: string[]
  nextSteps?:      string[]
}

export interface AiTutorContent {
  topic:            string
  context:          string
  suggestedPrompts: string[]
}

// ── Convenience typed block aliases ──────────────────────────────────────────

export type MissionBriefStandardBlock     = StandardBlock<MissionBriefContent>
export type StoryStandardBlock            = StandardBlock<StoryContent>
export type TheoryStandardBlock           = StandardBlock<TheoryContent>
export type CaseStudyStandardBlock        = StandardBlock<CaseStudyContent>
export type MemoryAnchorStandardBlock     = StandardBlock<MemoryAnchorContent>
export type FunnyIllustrationStandardBlock = StandardBlock<FunnyIllustrationContent>
export type AnalogyStandardBlock          = StandardBlock<AnalogyContent>
export type DiagramStandardBlock          = StandardBlock<DiagramContent>
export type MicroPracticalStandardBlock   = StandardBlock<MicroPracticalContent>
export type InteractiveStandardBlock      = StandardBlock<InteractiveContent>
export type DiscussionStandardBlock       = StandardBlock<DiscussionContent>
export type StudentQuestionsStandardBlock = StandardBlock<StudentQuestionsContent>
export type CommonMistakesStandardBlock   = StandardBlock<CommonMistakesContent>
export type GlossaryStandardBlock         = StandardBlock<GlossaryContent>
export type CheatSheetStandardBlock       = StandardBlock<CheatSheetContent>
export type QuizStandardBlock             = StandardBlock<QuizContent>
export type FlashcardsStandardBlock       = StandardBlock<FlashcardsContent>
export type AssignmentStandardBlock       = StandardBlock<AssignmentContent>
export type LabStandardBlock              = StandardBlock<LabContent>
export type SummaryStandardBlock          = StandardBlock<SummaryContent>
export type MissionCompleteStandardBlock  = StandardBlock<MissionCompleteContent>
export type AiTutorStandardBlock          = StandardBlock<AiTutorContent>

// ═══════════════════════════════════════════════════════════════════════════
// BLOCK TYPE REGISTRY — canonical list of built-in block types
// ═══════════════════════════════════════════════════════════════════════════

export type BlockType =
  | 'mission-brief'
  | 'story'
  | 'theory'
  | 'case-study'
  | 'memory-anchor'
  | 'funny-illustration'
  | 'analogy'
  | 'diagram'
  | 'micro-practical'
  | 'interactive'
  | 'discussion'
  | 'student-questions'
  | 'common-mistakes'
  | 'glossary'
  | 'cheat-sheet'
  | 'quiz'
  | 'flashcards'
  | 'assignment'
  | 'lab'
  | 'summary'
  | 'mission-complete'
  | 'ai-tutor'

export const BLOCK_TYPES: BlockType[] = [
  'mission-brief',
  'story',
  'theory',
  'case-study',
  'memory-anchor',
  'funny-illustration',
  'analogy',
  'diagram',
  'micro-practical',
  'interactive',
  'discussion',
  'student-questions',
  'common-mistakes',
  'glossary',
  'cheat-sheet',
  'quiz',
  'flashcards',
  'assignment',
  'lab',
  'summary',
  'mission-complete',
  'ai-tutor',
]

// Default Lucide icon for each built-in block type
export const BLOCK_TYPE_ICONS: Record<BlockType, string> = {
  'mission-brief':      'flag',
  'story':              'book-open',
  'theory':             'file-text',
  'case-study':         'briefcase',
  'memory-anchor':      'anchor',
  'funny-illustration': 'laugh',
  'analogy':            'git-merge',
  'diagram':            'share-2',
  'micro-practical':    'laptop',
  'interactive':        'mouse-pointer-click',
  'discussion':         'message-circle',
  'student-questions':  'help-circle',
  'common-mistakes':    'x-circle',
  'glossary':           'book',
  'cheat-sheet':        'clipboard-list',
  'quiz':               'check-circle',
  'flashcards':         'layers',
  'assignment':         'pencil',
  'lab':                'terminal',
  'summary':            'list-checks',
  'mission-complete':   'trophy',
  'ai-tutor':           'brain-circuit',
}

// ═══════════════════════════════════════════════════════════════════════════
// MISSION METADATA
// ═══════════════════════════════════════════════════════════════════════════

export interface MissionCompletionRequirements {
  minBlocksCompleted?: number
  requiredBlockIds?:   string[]
  minQuizScore?:       number
  requiresLabCompletion?: boolean
}

export interface CourseMissionMeta {
  id:                    string
  slug:                  string
  courseSlug:            string
  moduleSlug:            string
  title:                 string
  tagline:               string
  description:           string
  difficulty:            Difficulty
  estimatedMinutes:      number
  xpReward:              number
  order:                 number
  version:               string
  author:                string
  createdAt:             string
  updatedAt:             string
  prerequisites?:        string[]
  tags:                  string[]
  // Enhanced metadata
  learningObjectives:    string[]
  skills?:               string[]
  badge?:                string
  missionImage?:         string
  missionIcon?:          string
  missionNumber?:        number
  completionRequirements?: MissionCompletionRequirements
}

/** Full mission — metadata + loaded, migrated blocks. */
export interface CourseMission extends CourseMissionMeta {
  blocks: StandardBlock[]
}

/** Lightweight summary used in module.json listings. */
export interface MissionSummary {
  slug:             string
  title:            string
  order:            number
  difficulty:       Difficulty
  estimatedMinutes: number
  xpReward:         number
  tags:             string[]
}

// ═══════════════════════════════════════════════════════════════════════════
// LEGACY TYPES — old flat block format; kept for migration support only.
// Do not use in new code. Import StandardBlock instead.
// ═══════════════════════════════════════════════════════════════════════════

/** @deprecated Use StandardBlock instead. Kept for migration layer. */
export interface LegacyBaseBlock {
  id:               string
  type:             BlockType
  order:            number
  estimatedMinutes: number
  sidebarLabel?:    string
  isOptional?:      boolean
}

/** @deprecated */
export type LegacyMissionBlock = LegacyBaseBlock & Record<string, unknown>
