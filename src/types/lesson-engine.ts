/**
 * Lesson Engine — discriminated union type system
 *
 * Every section has a `type` discriminant. TypeScript narrows the union
 * in SectionRenderer via a switch statement with an exhaustive `never` check.
 * Adding a new section type = add to union + add a renderer case. Zero else changes.
 */

import type { Difficulty } from '@/types'

// ============================================================
// SECTION TYPE REGISTRY
// ============================================================

export type SectionType =
  | 'hook'
  | 'story'
  | 'objectives'
  | 'explanation'
  | 'diagram'
  | 'animation'
  | 'real-world-example'
  | 'practical'
  | 'ai-mentor'
  | 'challenge'
  | 'common-mistakes'
  | 'quiz'
  | 'reflection'
  | 'summary'
  | 'career-connection'

/** Human-readable labels for each section type */
export const SECTION_LABELS: Record<SectionType, string> = {
  'hook':               'Hook',
  'story':              'Story',
  'objectives':         'Objectives',
  'explanation':        'Explanation',
  'diagram':            'Diagram',
  'animation':          'Animation',
  'real-world-example': 'Real World',
  'practical':          'Hands-On',
  'ai-mentor':          'AI Mentor',
  'challenge':          'Challenge',
  'common-mistakes':    'Common Mistakes',
  'quiz':               'Quiz',
  'reflection':         'Reflection',
  'summary':            'Summary',
  'career-connection':  'Career',
}

/** Icon name (Lucide) for each section type — resolved in components */
export const SECTION_ICONS: Record<SectionType, string> = {
  'hook':               'Zap',
  'story':              'BookOpen',
  'objectives':         'ListChecks',
  'explanation':        'FileText',
  'diagram':            'GitBranch',
  'animation':          'Play',
  'real-world-example': 'Globe',
  'practical':          'Terminal',
  'ai-mentor':          'Bot',
  'challenge':          'Target',
  'common-mistakes':    'AlertTriangle',
  'quiz':               'HelpCircle',
  'reflection':         'PenLine',
  'summary':            'Award',
  'career-connection':  'Briefcase',
}

// ============================================================
// BASE — every section extends this
// ============================================================

interface BaseLessonSection {
  id:                string
  type:              SectionType
  sidebarLabel?:     string   // overrides default label in nav
  estimatedMinutes:  number
  isOptional?:       boolean
}

// ============================================================
// HOOK
// ============================================================

export type HookVariant = 'statistic' | 'question' | 'fact' | 'scenario'

export interface HookSection extends BaseLessonSection {
  type:        'hook'
  variant:     HookVariant
  headline:    string
  subheadline?: string
  stat?: {
    value:   string
    label:   string
    source?: string
  }
  backgroundAccent?: 'blue' | 'red' | 'green' | 'purple' | 'orange'
}

// ============================================================
// STORY
// ============================================================

export interface StoryCharacter {
  name:        string
  role:        string
  description: string
  emoji?:      string
}

export interface StoryTimeline {
  timestamp: string
  event:     string
  detail?:   string
  type?:     'normal' | 'critical' | 'resolution'
}

export interface StorySection extends BaseLessonSection {
  type:        'story'
  narrative:   string[]       // paragraphs rendered in sequence
  characters?: StoryCharacter[]
  quote?: {
    text:          string
    attribution?:  string
  }
  timeline?:   StoryTimeline[]
  mood?:       'neutral' | 'tense' | 'discovery' | 'triumph' | 'warning'
}

// ============================================================
// OBJECTIVES
// ============================================================

export interface ObjectivesSection extends BaseLessonSection {
  type:        'objectives'
  objectives:  string[]
  xpPreview?: {
    base:      number
    bonuses:   { label: string; amount: number }[]
  }
}

// ============================================================
// EXPLANATION
// ============================================================

export type CalloutType = 'info' | 'warning' | 'tip' | 'danger' | 'insight'

export interface Callout {
  type:  CalloutType
  title?: string
  text:  string
}

export interface CodeBlock {
  language:  string
  code:      string
  caption?:  string
  highlight?: number[]   // line numbers to highlight
}

export interface Analogy {
  scenario: string
  mapping:  string
}

export interface ExplanationSection extends BaseLessonSection {
  type:       'explanation'
  content:    string          // supports **bold** *italic* `code` and ## headings
  callouts?:  Callout[]
  codeBlocks?: CodeBlock[]
  analogy?:   Analogy
  keyTerms?:  { term: string; definition: string }[]
}

// ============================================================
// DIAGRAM
// ============================================================

export interface DiagramNode {
  id:     string
  label:  string
  type?:  'client' | 'server' | 'database' | 'attacker' | 'firewall' | 'default'
  detail?: string
}

export interface DiagramEdge {
  from:     string
  to:       string
  label?:   string
  type?:    'normal' | 'attack' | 'data' | 'blocked'
  animated?: boolean
}

export interface DiagramSection extends BaseLessonSection {
  type:        'diagram'
  title:       string
  description: string
  nodes:       DiagramNode[]
  edges?:      DiagramEdge[]
  caption?:    string
  interactive?: boolean
}

// ============================================================
// ANIMATION
// ============================================================

export interface AnimationStep {
  title:        string
  description:  string
  visualNote?:  string
  code?:        string
  highlight?:   'attacker' | 'server' | 'database' | 'user' | 'none'
}

export interface AnimationSection extends BaseLessonSection {
  type:  'animation'
  title: string
  intro: string
  steps: AnimationStep[]
}

// ============================================================
// REAL WORLD EXAMPLE
// ============================================================

export interface RealWorldImpactStat {
  value: string
  label: string
}

export interface RealWorldExampleSection extends BaseLessonSection {
  type:            'real-world-example'
  company:         string
  industry?:       string
  year?:           string
  incident:        string
  whatHappened:    string[]
  whyItHappened:   string[]
  impact?:         RealWorldImpactStat[]
  lessonsLearned:  string[]
  sourceLabel?:    string
}

// ============================================================
// PRACTICAL
// ============================================================

export type PracticalType = 'terminal' | 'browser' | 'file' | 'tool' | 'analysis' | 'wireshark'

export interface PracticalStep {
  id:               string
  title:            string
  description:      string
  command?:         string
  expectedOutput?:  string
  note?:            string
}

export interface PracticalSection extends BaseLessonSection {
  type:              'practical'
  objective:         string
  practicalType:     PracticalType
  difficulty:        Difficulty
  safetyNotice?:     string
  prerequisites?:    string[]
  steps:             PracticalStep[]
  hints:             string[]
  expectedResult:    string
  solution?:         string
}

// ============================================================
// AI MENTOR
// ============================================================

export interface AIMentorSection extends BaseLessonSection {
  type:             'ai-mentor'
  topic:            string
  context:          string    // system context sent with requests
  suggestedPrompts: string[]
}

// ============================================================
// CHALLENGE
// ============================================================

export type ChallengeType = 'flag-capture' | 'decode' | 'identify' | 'configure' | 'fix-code'

export interface ChallengeSection extends BaseLessonSection {
  type:          'challenge'
  title:         string
  description:   string
  challengeType: ChallengeType
  difficulty:    Difficulty
  xpReward:      number
  timeLimit?:    number
  flagFormat?:   string
  flag?:         string    // hashed; compared client-side for demos
  hints:         string[]
  solution?:     string    // revealed after max attempts
  maxAttempts?:  number
}

// ============================================================
// COMMON MISTAKES
// ============================================================

export type MistakeSeverity = 'warning' | 'critical'

export interface CommonMistake {
  title:       string
  wrong:       string
  right:       string
  explanation: string
  severity:    MistakeSeverity
  example?:    string
}

export interface CommonMistakesSection extends BaseLessonSection {
  type:     'common-mistakes'
  intro?:   string
  mistakes: CommonMistake[]
}

// ============================================================
// QUIZ
// ============================================================

export type QuizQuestionType = 'single' | 'multiple' | 'true-false' | 'scenario'

export interface QuizOption {
  id:        string
  text:      string
  isCorrect: boolean
}

export interface EngineQuizQuestion {
  id:          string
  question:    string
  type:        QuizQuestionType
  context?:    string    // scenario setup paragraph
  options:     QuizOption[]
  explanation: string
  xpReward?:   number
}

export interface QuizSection extends BaseLessonSection {
  type:          'quiz'
  questions:     EngineQuizQuestion[]
  passingScore?: number   // 0-100, default 70
}

// ============================================================
// REFLECTION
// ============================================================

export interface ReflectionSection extends BaseLessonSection {
  type:         'reflection'
  prompts:      string[]
  placeholder?: string
  minWords?:    number
}

// ============================================================
// SUMMARY
// ============================================================

export interface XPBreakdownDetail {
  base:              number
  activityBonus:     number
  challengeBonus:    number
  quizBonus:         number
  streakMultiplier:  number
  total:             number
}

export interface SummarySection extends BaseLessonSection {
  type:             'summary'
  keyTakeaways:     string[]
  xpBreakdown:      XPBreakdownDetail
  nextLesson?: {
    title:            string
    slug:             string
    courseSlug:       string
    estimatedMinutes: number
  }
  relatedTopics?:   string[]
}

// ============================================================
// CAREER CONNECTION
// ============================================================

export interface CareerRole {
  title:        string
  description?: string
  salaryRange?: string
}

export interface CareerConnectionSection extends BaseLessonSection {
  type:             'career-connection'
  realWorldUsage:   string
  roles:            CareerRole[]
  companies?:       string[]
  certifications?:  string[]
  careerPath?:      string[]
}

// ============================================================
// DISCRIMINATED UNION — the complete set
// ============================================================

export type LessonSection =
  | HookSection
  | StorySection
  | ObjectivesSection
  | ExplanationSection
  | DiagramSection
  | AnimationSection
  | RealWorldExampleSection
  | PracticalSection
  | AIMentorSection
  | ChallengeSection
  | CommonMistakesSection
  | QuizSection
  | ReflectionSection
  | SummarySection
  | CareerConnectionSection

// ============================================================
// LESSON + COURSE STRUCTURE
// ============================================================

export interface LessonMeta {
  id:               string
  slug:             string
  courseSlug:       string
  moduleId:         string
  title:            string
  tagline:          string
  order:            number
  estimatedMinutes: number
  difficulty:       Difficulty
  tags:             string[]
  xpReward:         number
  prerequisites?:   string[]    // lesson IDs
  nextLessonSlug?:  string
  prevLessonSlug?:  string
}

export interface FullLesson extends LessonMeta {
  sections: LessonSection[]
}

// ============================================================
// PROGRESS TYPES (used by the store)
// ============================================================

export interface QuizAttempt {
  answers:       Record<string, string[]>   // questionId → selected option IDs
  score:         number                     // 0-100
  submittedAt:   number                     // timestamp
  passed:        boolean
}

export interface LessonProgress {
  lessonId:          string
  currentSectionId:  string
  completedSectionIds: string[]
  reflectionNotes:   Record<string, string>   // sectionId → text
  quizAttempts:      Record<string, QuizAttempt>  // sectionId → attempt
  practicalComplete: Record<string, boolean>  // sectionId → done
  challengeAttempts: Record<string, { answer: string; correct: boolean; attempts: number }>
  startedAt:         number
  completedAt?:      number
  lastActiveAt:      number
}
