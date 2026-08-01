/**
 * MissionOverview — the mission brief shown before any learning blocks.
 *
 * Renders automatically before the block list in the mission player.
 * Displays mission title, tagline, difficulty, XP reward, estimated time,
 * and the learning objectives checklist.
 *
 * Data source: CourseMissionMeta from mission.json — no block file needed.
 */

import { Clock, Zap, Target, CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { difficultyVariant } from '@/lib/utils'
import type { CourseMissionMeta } from '@/lib/content/mission-schemas'

interface MissionOverviewProps {
  mission: CourseMissionMeta
}

export function MissionOverview({ mission }: MissionOverviewProps) {
  const hours   = mission.estimatedMinutes >= 60
    ? `${Math.round(mission.estimatedMinutes / 60)}h`
    : `${mission.estimatedMinutes}min`

  return (
    <div className="rounded-xl border border-primary/20 bg-base-900 overflow-hidden mb-6">
      {/* ── Header gradient ── */}
      <div className="h-2 w-full bg-gradient-cyber" />

      <div className="p-6 space-y-5">
        {/* ── Badges row ── */}
        <div className="flex flex-wrap items-center gap-2">
          {mission.missionNumber != null && (
            <Badge variant="outline" className="font-mono text-xs">
              MISSION {String(mission.missionNumber).padStart(2, '0')}
            </Badge>
          )}
          <Badge variant={difficultyVariant(mission.difficulty)}>
            {mission.difficulty}
          </Badge>
          {mission.badge && (
            <Badge variant="purple">{mission.badge}</Badge>
          )}
        </div>

        {/* ── Title + tagline ── */}
        <div>
          <h1 className="text-2xl font-bold text-foreground leading-tight">
            {mission.title}
          </h1>
          {mission.tagline && (
            <p className="text-muted-foreground mt-1">{mission.tagline}</p>
          )}
        </div>

        {/* ── Stats row ── */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Clock className="size-4" />
            {hours}
          </span>
          <span className="flex items-center gap-1.5 text-primary font-medium">
            <Zap className="size-4" />
            +{mission.xpReward} XP
          </span>
          {mission.skills && mission.skills.length > 0 && (
            <span className="flex items-center gap-1.5">
              <Target className="size-4" />
              {mission.skills.slice(0, 3).join(' · ')}
            </span>
          )}
        </div>

        {/* ── Learning objectives ── */}
        {mission.learningObjectives.length > 0 && (
          <div className="rounded-lg border border-border bg-base-800/60 p-4 space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              After completing this mission you will be able to
            </p>
            <ul className="space-y-2">
              {mission.learningObjectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 className="size-4 shrink-0 mt-0.5 text-cyber-green" />
                  <span className="text-foreground">{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
