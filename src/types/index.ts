// ============================================================
// CORE DOMAIN TYPES
// ============================================================

export type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert'

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'purple'
  | 'outline'

export type SkillCategory =
  | 'foundations'
  | 'networking'
  | 'web-security'
  | 'cryptography'
  | 'malware-analysis'
  | 'forensics'
  | 'penetration-testing'
  | 'social-engineering'
  | 'linux'
  | 'scripting'
  | 'cloud-security'

// ============================================================
// USER
// ============================================================

export interface UserProfile {
  id: string
  username: string
  displayName: string
  email: string
  avatar?: string
  bio?: string
  rank: Rank
  xp: number
  xpToNextRank: number
  streak: number
  joinedAt: Date
  skills: UserSkill[]
  achievements: Achievement[]
  stats: UserStats
}

export interface UserStats {
  lessonsCompleted: number
  coursesCompleted: number
  challengesSolved: number
  totalHoursLearned: number
  currentStreak: number
  longestStreak: number
  labsCompleted: number
  flagsCaptured: number
}

export interface UserSkill {
  category: SkillCategory
  level: number          // 0–100
  xpEarned: number
}

// ============================================================
// XP & RANK
// ============================================================

export type RankTier =
  | 'script-kiddie'
  | 'blue-teamer'
  | 'analyst'
  | 'pentester'
  | 'red-teamer'
  | 'elite-hacker'
  | 'zero-day'

export interface Rank {
  tier: RankTier
  label: string
  icon: string
  color: string
  minXp: number
  maxXp: number
}

export const RANKS: Rank[] = [
  { tier: 'script-kiddie',  label: 'Script Kiddie',  icon: '🐣', color: '#6B7280', minXp: 0,     maxXp: 500   },
  { tier: 'blue-teamer',    label: 'Blue Teamer',    icon: '🛡️', color: '#3B82F6', minXp: 500,   maxXp: 2000  },
  { tier: 'analyst',        label: 'Analyst',        icon: '🔍', color: '#8B5CF6', minXp: 2000,  maxXp: 5000  },
  { tier: 'pentester',      label: 'Pentester',      icon: '⚔️', color: '#F59E0B', minXp: 5000,  maxXp: 12000 },
  { tier: 'red-teamer',     label: 'Red Teamer',     icon: '🔴', color: '#EF4444', minXp: 12000, maxXp: 25000 },
  { tier: 'elite-hacker',   label: 'Elite Hacker',  icon: '💀', color: '#00D9FF', minXp: 25000, maxXp: 50000 },
  { tier: 'zero-day',       label: 'Zero Day',       icon: '☠️', color: '#00FF87', minXp: 50000, maxXp: Infinity },
]

// ============================================================
// ACHIEVEMENTS
// ============================================================

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  xpReward: number
  unlockedAt?: Date
  isUnlocked: boolean
}

// ============================================================
// COURSE & LESSON
// ============================================================

export interface Course {
  id: string
  slug: string
  title: string
  tagline: string
  description: string
  coverImage?: string
  category: SkillCategory
  difficulty: Difficulty
  estimatedHours: number
  xpReward: number
  modules: Module[]
  prerequisites: string[]   // course ids
  tags: string[]
  isNew?: boolean
  isFeatured?: boolean
  isPro?: boolean
  isComingSoon?: boolean
  stats: CourseStats
}

export interface CourseStats {
  totalLessons: number
  totalStudents: number
  averageRating: number
  completionRate: number
}

export interface Module {
  id: string
  title: string
  order: number
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  slug: string
  title: string
  type: LessonType
  duration: number          // minutes
  xpReward: number
  order: number
  isCompleted?: boolean
  isLocked?: boolean
  content?: LessonContent
}

export type LessonType =
  | 'concept'
  | 'lab'
  | 'challenge'
  | 'quiz'
  | 'video'

export interface LessonContent {
  hook: string
  story: StoryBlock
  objectives: string[]
  sections: ContentSection[]
  activity: HandsOnActivity
  challenge: MiniChallenge
  quiz: QuizQuestion[]
  reflection: ReflectionPrompt
  xpBreakdown: XPBreakdown
}

export interface StoryBlock {
  narrative: string
  characters?: string[]
  setting?: string
}

export interface ContentSection {
  id: string
  type: 'explanation' | 'visual' | 'real-world' | 'code' | 'analogy'
  title: string
  content: string
  visualType?: 'diagram' | 'animation' | 'flowchart' | 'illustration'
}

export interface HandsOnActivity {
  title: string
  description: string
  type: 'terminal' | 'browser' | 'file' | 'network'
  steps: ActivityStep[]
  hints: string[]
}

export interface ActivityStep {
  order: number
  instruction: string
  command?: string
  expectedOutput?: string
  isCompleted?: boolean
}

export interface MiniChallenge {
  title: string
  description: string
  type: 'decode' | 'find-flag' | 'configure' | 'identify' | 'fix'
  difficulty: Difficulty
  hints: string[]
  solution?: string
}

export interface QuizQuestion {
  id: string
  question: string
  type: 'scenario' | 'multiple-choice' | 'true-false'
  options: QuizOption[]
  explanation: string
}

export interface QuizOption {
  id: string
  text: string
  isCorrect: boolean
}

export interface ReflectionPrompt {
  prompts: string[]
}

export interface XPBreakdown {
  base: number
  activityBonus: number
  challengeBonus: number
  quizBonus: number
  streakMultiplier: number
  total: number
}

// ============================================================
// PROGRESS
// ============================================================

export interface CourseProgress {
  courseId: string
  userId: string
  startedAt: Date
  lastActiveAt: Date
  completedAt?: Date
  completedLessonIds: string[]
  percentComplete: number
  xpEarned: number
}

// ============================================================
// NAVIGATION
// ============================================================

export interface NavItem {
  label: string
  href: string
  icon: string
  badge?: string | number
  isNew?: boolean
  isPro?: boolean
  children?: NavItem[]
}
