import { Flame, Zap, BookOpen, Target } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { StatCard } from '@/components/shared/stat-card'
import { XPBar } from '@/components/shared/xp-bar'
import { AchievementBadge } from '@/components/shared/achievement-badge'
import { useAuth } from '@/features/auth/context/auth-context'
import { useProfile } from '@/features/onboarding/hooks/use-profile'
import { countryName } from '@/features/onboarding/utils/countries'
import type { Achievement } from '@/types'

const MOCK_ACHIEVEMENTS: Achievement[] = [
  { id: '1', title: 'First Blood',   description: 'Complete your first lesson',  icon: '🩸', rarity: 'common',    xpReward: 50,   isUnlocked: true  },
  { id: '2', title: 'On Fire',       description: 'Maintain a 7-day streak',     icon: '🔥', rarity: 'rare',      xpReward: 200,  isUnlocked: false },
  { id: '3', title: 'Code Breaker',  description: 'Solve 10 crypto challenges',  icon: '🔑', rarity: 'epic',      xpReward: 500,  isUnlocked: false },
  { id: '4', title: 'Zero Day Hero', description: 'Find a vulnerability in lab', icon: '☠️', rarity: 'legendary', xpReward: 1000, isUnlocked: false },
  { id: '5', title: 'Packet Master', description: 'Capture 100 packets',         icon: '📡', rarity: 'rare',      xpReward: 300,  isUnlocked: false },
  { id: '6', title: 'Shell Shock',   description: 'Run 50 terminal commands',    icon: '💻', rarity: 'common',    xpReward: 75,   isUnlocked: false },
]

export function Profile() {
  const { user } = useAuth()
  const { profile, loading } = useProfile(user?.id)

  if (!user) return null

  const joinedDate = user.createdAt
    ? new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(new Date(user.createdAt))
    : ''

  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-4xl mx-auto">
      {/* Hero card */}
      <Card variant="cyber-border">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <Avatar
              src={user.avatar ?? undefined}
              fallback={user.name}
              size="2xl"
              ring="primary"
            />
            <div className="flex-1 space-y-3">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-black text-foreground">{user.name}</h1>
                  <Badge variant="primary">Level {user.level}</Badge>
                </div>
                <p className="text-sm text-muted-foreground font-mono">
                  {profile ? `@${profile.username} · ` : ''}
                  {joinedDate ? `Joined ${joinedDate}` : ''}
                </p>
              </div>
              <XPBar xp={user.xp} />
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Flame className="size-5 text-cyber-orange" />
              <span className="text-2xl font-black text-cyber-orange">{user.streak}</span>
              <span className="text-sm text-muted-foreground">day streak</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Lessons"    value={0}                    icon={BookOpen} accent="blue"   />
        <StatCard title="Challenges" value={0}                    icon={Target}   accent="green"  />
        <StatCard title="Total XP"   value={user.xp}              icon={Zap}      accent="purple" />
        <StatCard title="Streak"     value={`${user.streak}d`}   icon={Flame}    accent="orange" />
      </div>

      {/* Agent profile details — only shown once the profile row loads */}
      {!loading && profile && (
        <Card>
          <CardHeader>
            <CardTitle>Agent Profile</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <dl className="divide-y divide-border px-6">
              <ProfileRow label="Experience"   value={profile.experience} />
              <ProfileRow label="Primary Goal" value={profile.goal} />
              <ProfileRow label="Country"      value={countryName(profile.country)} />
              <ProfileRow label="Daily Goal"   value={`${profile.daily_goal} min / day`} />
              <div className="py-3 sm:py-4 text-sm grid grid-cols-1 gap-1 sm:grid-cols-[8rem_1fr] sm:gap-3">
                <dt className="text-muted-foreground">Interests</dt>
                <dd className="flex flex-wrap gap-2">
                  {profile.interests.map(interest => (
                    <Badge key={interest} variant="outline">{interest}</Badge>
                  ))}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      )}

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {MOCK_ACHIEVEMENTS.map((ach) => (
              <AchievementBadge key={ach.id} achievement={ach} size="md" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-1 gap-0.5 py-3 text-sm sm:grid-cols-[8rem_1fr] sm:gap-3 sm:py-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium text-foreground">{value}</dd>
    </div>
  )
}
