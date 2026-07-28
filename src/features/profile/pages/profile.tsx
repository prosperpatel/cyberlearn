import { Flame, Zap, BookOpen, Target } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { StatCard } from '@/components/shared/stat-card'
import { XPBar } from '@/components/shared/xp-bar'
import { AchievementBadge } from '@/components/shared/achievement-badge'
import type { Achievement } from '@/types'

const MOCK_ACHIEVEMENTS: Achievement[] = [
  { id: '1', title: 'First Blood',   description: 'Complete your first lesson',  icon: '🩸', rarity: 'common',    xpReward: 50,   isUnlocked: true  },
  { id: '2', title: 'On Fire',       description: 'Maintain a 7-day streak',     icon: '🔥', rarity: 'rare',      xpReward: 200,  isUnlocked: true  },
  { id: '3', title: 'Code Breaker',  description: 'Solve 10 crypto challenges',  icon: '🔑', rarity: 'epic',      xpReward: 500,  isUnlocked: false },
  { id: '4', title: 'Zero Day Hero', description: 'Find a vulnerability in lab', icon: '☠️', rarity: 'legendary', xpReward: 1000, isUnlocked: false },
  { id: '5', title: 'Packet Master', description: 'Capture 100 packets',         icon: '📡', rarity: 'rare',      xpReward: 300,  isUnlocked: false },
  { id: '6', title: 'Shell Shock',   description: 'Run 50 terminal commands',    icon: '💻', rarity: 'common',    xpReward: 75,   isUnlocked: true  },
]

export function Profile() {
  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      {/* Hero card */}
      <Card variant="cyber-border">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <Avatar fallback="Alex Chen" size="2xl" ring="primary" />
            <div className="flex-1 space-y-3">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-black text-foreground">Alex Chen</h1>
                  <Badge variant="purple">🔍 Analyst</Badge>
                </div>
                <p className="text-sm text-muted-foreground font-mono">@alexchen · Joined Jul 2026</p>
              </div>
              <XPBar xp={3240} />
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Flame className="size-5 text-cyber-orange" />
              <span className="text-2xl font-black text-cyber-orange">7</span>
              <span className="text-sm text-muted-foreground">day streak</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Lessons"    value="47"   icon={BookOpen} accent="blue"   />
        <StatCard title="Challenges" value="18"   icon={Target}   accent="green"  />
        <StatCard title="Total XP"   value="3.2K" icon={Zap}      accent="purple" />
        <StatCard title="Streak"     value="7d"   icon={Flame}    accent="orange" />
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {MOCK_ACHIEVEMENTS.map((ach) => (
              <AchievementBadge key={ach.id} achievement={ach} size="md" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
