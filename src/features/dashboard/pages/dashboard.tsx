import {
  BookOpen, Target, Flame, Trophy, Clock, Zap,
  TrendingUp, ChevronRight, Play, Lock,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { formatXP, formatDuration } from '@/lib/utils'
import { ROUTES } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { StatCard } from '@/components/shared/stat-card'
import { XPBar } from '@/components/shared/xp-bar'
import { CourseCard } from '@/components/shared/course-card'
import { AchievementBadge } from '@/components/shared/achievement-badge'
import { Separator } from '@/components/ui/separator'
import type { Course, Achievement } from '@/types'

// ── Mock data (will be replaced by API calls) ──────────────────────────────

const MOCK_USER = {
  displayName:  'Alex Chen',
  xp:           3240,
  streak:       7,
  rank:         { label: 'Analyst', icon: '🔍', color: '#8B5CF6' },
}

const MOCK_FEATURED_COURSE: Course = {
  id: '1',
  slug: 'web-security-fundamentals',
  title: 'Web Security Fundamentals',
  tagline: "SQL Injection, XSS, CSRF — understand the web's biggest threats",
  description: '',
  coverImage: '🌐',
  category: 'web-security',
  difficulty: 'beginner',
  estimatedHours: 8,
  xpReward: 1200,
  modules: [],
  prerequisites: [],
  tags: ['web', 'sql', 'xss'],
  isNew: true,
  stats: { totalLessons: 24, totalStudents: 14320, averageRating: 4.8, completionRate: 72 },
}

const MOCK_COURSES: Course[] = [
  {
    id: '2', slug: 'linux-for-hackers', title: 'Linux for Hackers',
    tagline: 'Master the terminal — the hacker\'s playground',
    description: '', coverImage: '🐧', category: 'linux', difficulty: 'beginner',
    estimatedHours: 6, xpReward: 900, modules: [], prerequisites: [], tags: [],
    stats: { totalLessons: 18, totalStudents: 22100, averageRating: 4.9, completionRate: 81 },
  },
  {
    id: '3', slug: 'network-security', title: 'Network Security',
    tagline: 'Packets, protocols, and how attackers exploit them',
    description: '', coverImage: '🔌', category: 'networking', difficulty: 'intermediate',
    estimatedHours: 10, xpReward: 1500, modules: [], prerequisites: [], tags: [],
    stats: { totalLessons: 30, totalStudents: 9840, averageRating: 4.7, completionRate: 65 },
  },
  {
    id: '4', slug: 'cryptography-101', title: 'Cryptography 101',
    tagline: 'Secrets, ciphers, and how encryption protects data',
    description: '', coverImage: '🔐', category: 'cryptography', difficulty: 'intermediate',
    estimatedHours: 7, xpReward: 1100, modules: [], prerequisites: [], tags: [],
    isPro: true,
    stats: { totalLessons: 21, totalStudents: 6200, averageRating: 4.9, completionRate: 58 },
  },
]


const MOCK_ACHIEVEMENTS: Achievement[] = [
  { id: '1', title: 'First Blood',    description: 'Complete your first lesson',   icon: '🩸', rarity: 'common',    xpReward: 50,  isUnlocked: true,  unlockedAt: new Date() },
  { id: '2', title: 'On Fire',        description: 'Maintain a 7-day streak',      icon: '🔥', rarity: 'rare',      xpReward: 200, isUnlocked: true,  unlockedAt: new Date() },
  { id: '3', title: 'Code Breaker',   description: 'Solve 10 crypto challenges',   icon: '🔑', rarity: 'epic',      xpReward: 500, isUnlocked: false },
  { id: '4', title: 'Zero Day Hero',  description: 'Find a vulnerability in a lab',icon: '☠️', rarity: 'legendary', xpReward: 1000,isUnlocked: false },
]

const MOCK_ACTIVITY = [
  { label: 'Completed "Intro to SQL Injection"',     time: '2 hours ago',  xp: 80  },
  { label: 'Solved "XSS Challenge #3"',              time: '5 hours ago',  xp: 150 },
  { label: 'Unlocked "On Fire" achievement',         time: 'Yesterday',    xp: 200 },
  { label: 'Completed "Linux File System" module',   time: '2 days ago',   xp: 120 },
]

// ── Fade-up animation wrapper ──────────────────────────────────────────────

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

// ── Dashboard ─────────────────────────────────────────────────────────────

export function Dashboard() {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="space-y-8 p-6 pb-8 max-w-7xl mx-auto">

      {/* ── Welcome header ── */}
      <FadeUp>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground font-mono">
              {greeting}, {MOCK_USER.displayName.split(' ')[0]} 👋
            </p>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground mt-0.5">
              Your Hacking Dashboard
            </h1>
          </div>
          <Button variant="cyber" asChild>
            <Link to={ROUTES.COURSES}>
              <Zap className="size-4" />
              Continue Learning
            </Link>
          </Button>
        </div>
      </FadeUp>

      {/* ── XP + Rank card ── */}
      <FadeUp delay={0.05}>
        <Card variant="cyber-border" className="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            {/* Rank badge */}
            <div className="flex items-center gap-4 shrink-0">
              <div
                className="flex size-16 items-center justify-center rounded-2xl text-3xl"
                style={{
                  background: `${MOCK_USER.rank.color}15`,
                  border: `1px solid ${MOCK_USER.rank.color}30`,
                  boxShadow: `0 0 20px 0 ${MOCK_USER.rank.color}20`,
                }}
              >
                {MOCK_USER.rank.icon}
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">
                  Current Rank
                </p>
                <p className="text-xl font-bold" style={{ color: MOCK_USER.rank.color }}>
                  {MOCK_USER.rank.label}
                </p>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">
                  {formatXP(MOCK_USER.xp)} total
                </p>
              </div>
            </div>

            <Separator orientation="vertical" className="hidden sm:block h-16" />

            {/* XP progress */}
            <div className="flex-1">
              <XPBar xp={MOCK_USER.xp} showRankLabel />
            </div>

            <Separator orientation="vertical" className="hidden sm:block h-16" />

            {/* Streak */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex size-12 items-center justify-center rounded-xl bg-cyber-orange/15 border border-cyber-orange/25">
                <Flame className="size-6 text-cyber-orange" />
              </div>
              <div>
                <p className="text-2xl font-black text-cyber-orange">{MOCK_USER.streak}</p>
                <p className="text-xs text-muted-foreground">Day streak</p>
              </div>
            </div>
          </div>
        </Card>
      </FadeUp>

      {/* ── Stat cards ── */}
      <FadeUp delay={0.1}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Lessons Done"     value="47"      icon={BookOpen}    accent="blue"   trend={12} trendLabel="+3 this week" />
          <StatCard title="Challenges"       value="18"      icon={Target}      accent="green"  trend={8}  trendLabel="+2 this week" />
          <StatCard title="Hours Learned"    value="31h"     icon={Clock}       accent="purple" trend={5}  trendLabel="this month"   />
          <StatCard title="Leaderboard"      value="#142"    icon={Trophy}      accent="orange" trend={-3} trendLabel="↑ 3 spots"    />
        </div>
      </FadeUp>

      {/* ── Main content grid ── */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* ── Left column (2/3 width) ── */}
        <div className="lg:col-span-2 space-y-6">

          {/* Featured course */}
          <FadeUp delay={0.15}>
            <Card variant="cyber-border" className="overflow-hidden group">
              {/* Banner */}
              <div
                className="relative h-36 flex items-end p-5"
                style={{
                  background: 'linear-gradient(135deg, rgba(123,94,167,0.3) 0%, rgba(0,217,255,0.15) 100%)',
                }}
              >
                <div className="absolute inset-0 bg-grid opacity-30" />
                <div className="relative flex items-end justify-between w-full">
                  <div>
                    <Badge variant="new" className="mb-2">Featured</Badge>
                    <h2 className="text-xl font-black text-foreground">{MOCK_FEATURED_COURSE.title}</h2>
                    <p className="text-sm text-muted-foreground mt-0.5">{MOCK_FEATURED_COURSE.tagline}</p>
                  </div>
                  <div className="text-5xl hidden sm:block">{MOCK_FEATURED_COURSE.coverImage}</div>
                </div>
              </div>

              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="size-3" /> {MOCK_FEATURED_COURSE.stats.totalLessons} lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" /> {formatDuration(MOCK_FEATURED_COURSE.estimatedHours * 60)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap className="size-3 text-primary" />
                      <span className="text-primary font-medium">+{MOCK_FEATURED_COURSE.xpReward} XP</span>
                    </span>
                  </div>
                  <Button asChild variant="cyber" size="sm" className="sm:ml-auto shrink-0">
                    <Link to={ROUTES.COURSE(MOCK_FEATURED_COURSE.slug)}>
                      <Play className="size-3.5" />
                      Start Course
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </FadeUp>

          {/* Continue learning */}
          <FadeUp delay={0.2}>
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Continue Learning</CardTitle>
                  <Button asChild variant="ghost" size="sm" className="text-xs text-primary hover:text-primary">
                    <Link to={ROUTES.COURSES}>
                      View all <ChevronRight className="size-3 ml-0.5" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* In-progress course */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-base-800 hover:bg-base-700 transition-colors cursor-pointer group">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-cyber-green/10 border border-cyber-green/20 text-2xl">
                    🐧
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">Linux for Hackers</p>
                    <div className="mt-1.5 space-y-1">
                      <Progress value={28} max={100} size="xs" color="success" />
                      <p className="text-[10px] text-muted-foreground font-mono">5 of 18 lessons · 28%</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon-sm" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="size-4" />
                  </Button>
                </div>

                {/* Locked pro course teaser */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-base-800 opacity-60">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-base-700 text-2xl">
                    <Lock className="size-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate text-muted-foreground">Cryptography 101</p>
                    <Badge variant="pro" className="mt-1">PRO</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeUp>

          {/* Course recommendations */}
          <FadeUp delay={0.25}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold">Recommended Courses</h2>
                <Button asChild variant="ghost" size="sm" className="text-xs text-primary">
                  <Link to={ROUTES.COURSES}>
                    See all <ChevronRight className="size-3 ml-0.5" />
                  </Link>
                </Button>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {MOCK_COURSES.slice(0, 2).map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          </FadeUp>
        </div>

        {/* ── Right column (1/3 width) ── */}
        <div className="space-y-6">

          {/* Recent activity */}
          <FadeUp delay={0.2}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="size-4 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-0">
                {MOCK_ACTIVITY.map((item, i) => (
                  <div key={i}>
                    <div className="flex items-start gap-3 py-3">
                      <div className="mt-0.5 size-1.5 rounded-full bg-primary shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium leading-relaxed">{item.label}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-muted-foreground">{item.time}</span>
                          <span className="text-[10px] font-bold text-primary font-mono">+{item.xp} XP</span>
                        </div>
                      </div>
                    </div>
                    {i < MOCK_ACTIVITY.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </FadeUp>

          {/* Achievements */}
          <FadeUp delay={0.25}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Trophy className="size-4 text-cyber-orange" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-2">
                  {MOCK_ACHIEVEMENTS.map((ach) => (
                    <AchievementBadge key={ach.id} achievement={ach} size="sm" />
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4 text-xs">
                  View All Achievements
                </Button>
              </CardContent>
            </Card>
          </FadeUp>

          {/* Quick access */}
          <FadeUp delay={0.3}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Quick Access</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { label: 'Open Terminal Lab',   icon: '💻', href: ROUTES.LABS,       badge: 'HOT' },
                  { label: 'Daily Challenge',     icon: '🎯', href: ROUTES.CHALLENGES, badge: '2h left' },
                  { label: 'Leaderboard',         icon: '🏆', href: ROUTES.LEADERBOARD },
                ].map(({ label, icon, href, badge }) => (
                  <Link
                    key={href}
                    to={href}
                    className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-base-800 transition-colors group"
                  >
                    <span className="text-lg">{icon}</span>
                    <span className="flex-1 text-sm font-medium">{label}</span>
                    {badge && (
                      <Badge variant={badge === 'HOT' ? 'danger' : 'warning'} className="text-[10px]">
                        {badge}
                      </Badge>
                    )}
                    <ChevronRight className="size-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </CardContent>
            </Card>
          </FadeUp>
        </div>
      </div>
    </div>
  )
}
