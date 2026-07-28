import { cn, formatXP, percent } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'
import { RANKS, type Rank } from '@/types'

interface XPBarProps {
  xp: number
  className?: string
  showRankLabel?: boolean
  compact?: boolean
}

function getRankForXP(xp: number): { current: Rank; next: Rank | null; progressXP: number; rangeXP: number } {
  let idx = 0
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (xp >= RANKS[i].minXp) { idx = i; break }
  }
  const current = RANKS[idx] ?? RANKS[0]
  const next = RANKS[idx + 1] ?? null
  const progressXP = xp - current.minXp
  const rangeXP = next ? next.minXp - current.minXp : 1

  return { current, next, progressXP, rangeXP }
}

export function XPBar({ xp, className, showRankLabel = true, compact = false }: XPBarProps) {
  const { current, next, progressXP, rangeXP } = getRankForXP(xp)
  const pct = percent(progressXP, rangeXP)

  if (compact) {
    return (
      <div className={cn('space-y-1', className)}>
        <Progress
          value={pct}
          max={100}
          size="sm"
          color="gradient"
          glow
        />
        <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono">
          <span>{formatXP(xp)}</span>
          {next && <span>{formatXP(next.minXp)}</span>}
        </div>
      </div>
    )
  }

  return (
    <div className={cn('space-y-2', className)}>
      {showRankLabel && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-base leading-none" aria-hidden>{current.icon}</span>
            <span className="text-sm font-semibold" style={{ color: current.color }}>
              {current.label}
            </span>
          </div>
          {next && (
            <span className="text-xs text-muted-foreground">
              {formatXP(next.minXp - xp)} to <span style={{ color: next.color }}>{next.label}</span>
            </span>
          )}
        </div>
      )}

      <Progress
        value={pct}
        max={100}
        size="md"
        color="gradient"
        glow
      />

      <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
        <span className="text-foreground font-semibold">{formatXP(xp)}</span>
        {next && <span>{formatXP(next.minXp)}</span>}
      </div>
    </div>
  )
}
