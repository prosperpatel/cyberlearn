import type { Difficulty } from '@/types'

export interface AcademyDef {
  id:             number
  slug:           string        // matches content-engine course slug
  name:           string
  theme:          string        // e.g. "Recruit Training"
  description:    string
  difficulty:     Difficulty
  estimatedHours: number
  xpReward:       number
  coverEmoji:     string
  accentColor:    string        // hex, used for themed card styling
  totalModules:   number        // authoritative module count
  isAvailable:    boolean       // false = coming soon / locked
  isComingSoon?:  boolean
}

export const ACADEMIES: AcademyDef[] = [
  {
    id:             1,
    slug:           'digital-security-landscape',
    name:           'Digital Security Landscape',
    theme:          'Recruit Training',
    description:    'Begin your cyber career. Understand how breaches happen, the threat landscape, and the adversarial mindset every defender needs.',
    difficulty:     'beginner',
    estimatedHours: 12,
    xpReward:       6000,
    coverEmoji:     '🛡️',
    accentColor:    '#00FF87',
    totalModules:   6,
    isAvailable:    true,
  },
  {
    id:             2,
    slug:           'networking-fundamentals',
    name:           'Networking Fundamentals',
    theme:          'Network Intelligence',
    description:    'Master TCP/IP, DNS, routing, and packet analysis. Understand the protocols attackers exploit and defenders protect.',
    difficulty:     'beginner',
    estimatedHours: 18,
    xpReward:       8000,
    coverEmoji:     '🌐',
    accentColor:    '#00D9FF',
    totalModules:   8,
    isAvailable:    true,
  },
  {
    id:             3,
    slug:           'linux-for-hackers',
    name:           'Linux for Hackers',
    theme:          'Terminal Mastery',
    description:    'Own the command line. Navigate, script, and control Linux systems the way security professionals do every day.',
    difficulty:     'intermediate',
    estimatedHours: 15,
    xpReward:       7500,
    coverEmoji:     '💻',
    accentColor:    '#22C55E',
    totalModules:   7,
    isAvailable:    true,
  },
  {
    id:             4,
    slug:           'web-security-fundamentals',
    name:           'Web Security Fundamentals',
    theme:          'Web Infiltration',
    description:    'Hunt SQL injections, XSS, CSRF, and IDOR vulnerabilities. Learn to break web applications — then learn to defend them.',
    difficulty:     'intermediate',
    estimatedHours: 20,
    xpReward:       9500,
    coverEmoji:     '🕷️',
    accentColor:    '#7B5EA7',
    totalModules:   9,
    isAvailable:    true,
  },
  {
    id:             5,
    slug:           'offensive-operations',
    name:           'Offensive Operations',
    theme:          'Red Team Tactics',
    description:    'Advanced penetration testing, exploit development, and red team methodologies. Elite-level offensive security.',
    difficulty:     'advanced',
    estimatedHours: 30,
    xpReward:       15000,
    coverEmoji:     '⚔️',
    accentColor:    '#FF4757',
    totalModules:   12,
    isAvailable:    false,
    isComingSoon:   true,
  },
]
