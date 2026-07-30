export const EXPERIENCE_LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const
export const LEARNING_GOALS = [
  'Get my first Cybersecurity Job',
  'SOC Analyst',
  'Penetration Tester',
  'Bug Bounty Hunter',
  'Red Team',
  'Blue Team',
  'Cloud Security',
  'General Learning',
] as const
export const INTERESTS = [
  'Web Security',
  'Network Security',
  'Linux',
  'Python',
  'OSINT',
  'Digital Forensics',
  'Malware Analysis',
  'Reverse Engineering',
  'Cloud Security',
  'Cryptography',
  'Active Directory',
  'Threat Hunting',
] as const
export const DAILY_GOALS = [15, 30, 45, 60, 90] as const

export type Experience   = (typeof EXPERIENCE_LEVELS)[number]
export type LearningGoal = (typeof LEARNING_GOALS)[number]
export type Interest     = (typeof INTERESTS)[number]
export type DailyGoal    = (typeof DAILY_GOALS)[number]

export interface Profile {
  id:           string
  username:     string
  display_name: string
  avatar_url:   string | null
  goal:         LearningGoal
  experience:   Experience
  country:      string
  daily_goal:   DailyGoal
  interests:    Interest[]
  xp:           number
  level:        number
  streak:       number
  created_at:   string
  updated_at:   string
}

export interface OnboardingData {
  displayName: string
  username:    string
  avatarUrl:   string
  country:     string
  experience?: Experience
  goal?:       LearningGoal
  interests:   Interest[]
  dailyGoal?:  DailyGoal
}

export const emptyOnboardingData: OnboardingData = {
  displayName: '',
  username:    '',
  avatarUrl:   '',
  country:     '',
  interests:   [],
}
