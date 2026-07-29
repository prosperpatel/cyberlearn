import type { NavItem, SkillCategory } from '@/types'

// ============================================================
// ROUTES
// ============================================================

export const ROUTES = {
  HOME:           '/',
  DASHBOARD:      '/dashboard',
  ACADEMY_PATHS:  '/academy-paths',
  COURSES:        '/courses',
  COURSE:         (slug: string) => `/courses/${slug}`,
  LESSON:         (courseSlug: string, lessonSlug: string) =>
                    `/courses/${courseSlug}/lessons/${lessonSlug}`,
  LABS:           '/labs',
  CHALLENGES:     '/challenges',
  LEADERBOARD:    '/leaderboard',
  CAREER_HUB:     '/career-hub',
  CERTIFICATES:   '/certificates',
  RESOURCES:      '/resources',
  COMMUNITY:      '/community',
  PROFILE:        '/profile',
  SETTINGS:       '/settings',
  MISSION:  (id: string) => `/missions/${id}`,
  AUTH: {
    LOGIN:    '/login',
    REGISTER: '/register',
    FORGOT:   '/forgot-password',
  },
} as const

// ============================================================
// NAVIGATION — sidebar structure
// ============================================================

export const MAIN_NAV: NavItem[] = [
  { label: 'Dashboard',      href: ROUTES.DASHBOARD,     icon: 'LayoutDashboard' },
  { label: 'Academy Paths',  href: ROUTES.ACADEMY_PATHS, icon: 'GraduationCap'   },
  { label: 'Courses',        href: ROUTES.COURSES,       icon: 'BookOpen'        },
  { label: 'Labs',           href: ROUTES.LABS,          icon: 'Terminal'        },
  { label: 'Challenges',     href: ROUTES.CHALLENGES,    icon: 'Target'          },
  { label: 'Leaderboard',    href: ROUTES.LEADERBOARD,   icon: 'Trophy'          },
  { label: 'Career Hub',     href: ROUTES.CAREER_HUB,    icon: 'Briefcase'       },
  { label: 'Certificates',   href: ROUTES.CERTIFICATES,  icon: 'Award'           },
  { label: 'Resources',      href: ROUTES.RESOURCES,     icon: 'BookMarked'      },
  { label: 'Community',      href: ROUTES.COMMUNITY,     icon: 'Users'           },
]

/** Mobile bottom tab bar — max 5 items. */
export const MOBILE_NAV: NavItem[] = [
  { label: 'Dashboard',  href: ROUTES.DASHBOARD,     icon: 'LayoutDashboard' },
  { label: 'Academy',    href: ROUTES.ACADEMY_PATHS, icon: 'GraduationCap'   },
  { label: 'Courses',    href: ROUTES.COURSES,       icon: 'BookOpen'        },
  { label: 'Labs',       href: ROUTES.LABS,          icon: 'Terminal'        },
  { label: 'Challenges', href: ROUTES.CHALLENGES,    icon: 'Target'          },
]

export const SECONDARY_NAV: NavItem[] = [
  { label: 'Profile',   href: ROUTES.PROFILE,  icon: 'User'     },
  { label: 'Settings',  href: ROUTES.SETTINGS, icon: 'Settings' },
]

// ============================================================
// SKILL CATEGORIES — metadata
// ============================================================

export const SKILL_CATEGORIES: Record<SkillCategory, { label: string; icon: string; color: string }> = {
  'foundations':         { label: 'Foundations',         icon: 'Shield',          color: '#00FF87' },
  'networking':          { label: 'Networking',          icon: 'Network',         color: '#00D9FF' },
  'web-security':        { label: 'Web Security',        icon: 'Globe',           color: '#7B5EA7' },
  'cryptography':        { label: 'Cryptography',        icon: 'Lock',            color: '#00FF87' },
  'malware-analysis':    { label: 'Malware Analysis',    icon: 'Bug',             color: '#FF4757' },
  'forensics':           { label: 'Digital Forensics',   icon: 'Search',          color: '#FF6B35' },
  'penetration-testing': { label: 'Penetration Testing', icon: 'Shield',          color: '#FFB800' },
  'social-engineering':  { label: 'Social Engineering',  icon: 'Users',           color: '#8B5CF6' },
  'linux':               { label: 'Linux',               icon: 'Terminal',        color: '#22C55E' },
  'scripting':           { label: 'Scripting',           icon: 'Code',            color: '#3B82F6' },
  'cloud-security':      { label: 'Cloud Security',      icon: 'Cloud',           color: '#06B6D4' },
}

// ============================================================
// APP CONFIG
// ============================================================

export const APP_CONFIG = {
  name:          'Cyber Learn',
  tagline:       'Master Cybersecurity Through Interactive Learning',
  version:       '0.1.0',
  maxFileUpload: 10 * 1024 * 1024, // 10 MB
  xpPerStreak:   50,
  streakGrace:   24,               // hours before streak breaks
} as const

// ============================================================
// DIFFICULTY CONFIG
// ============================================================

export const DIFFICULTY_CONFIG = {
  beginner:     { label: 'Beginner',     color: '#00FF87', bgColor: 'rgba(0,255,135,0.1)'  },
  intermediate: { label: 'Intermediate', color: '#00D9FF', bgColor: 'rgba(0,217,255,0.1)'  },
  advanced:     { label: 'Advanced',     color: '#FF6B35', bgColor: 'rgba(255,107,53,0.1)' },
  expert:       { label: 'Expert',       color: '#FF4757', bgColor: 'rgba(255,71,87,0.1)'  },
} as const

// ============================================================
// ACHIEVEMENT RARITY CONFIG
// ============================================================

export const RARITY_CONFIG = {
  common:    { label: 'Common',    color: '#6B7280', glow: 'rgba(107,114,128,0.3)' },
  rare:      { label: 'Rare',      color: '#3B82F6', glow: 'rgba(59,130,246,0.4)'  },
  epic:      { label: 'Epic',      color: '#8B5CF6', glow: 'rgba(139,92,246,0.4)'  },
  legendary: { label: 'Legendary', color: '#F59E0B', glow: 'rgba(245,158,11,0.5)'  },
} as const
