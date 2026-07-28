import { cn } from '@/lib/utils'
import { RARITY_CONFIG } from '@/lib/constants'
import { Tooltip } from '@/components/ui/tooltip'
import type { Achievement } from '@/types'

interface AchievementBadgeProps {
  achievement: Achievement
  size?: 'sm' | 'md' | 'lg'
  showTooltip?: boolean
  className?: string
}

const sizeClasses = {
  sm: 'size-10 text-xl',
  md: 'size-14 text-3xl',
  lg: 'size-20 text-5xl',
}

export function AchievementBadge({
  achievement,
  size = 'md',
  showTooltip = true,
  className,
}: AchievementBadgeProps) {
  const rarity = RARITY_CONFIG[achievement.rarity]

  const badge = (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-xl',
        'transition-all duration-200',
        sizeClasses[size],
        achievement.isUnlocked
          ? 'opacity-100 cursor-default'
          : 'opacity-30 grayscale cursor-not-allowed',
        achievement.isUnlocked && 'hover:scale-105',
        className,
      )}
      style={{
        background: achievement.isUnlocked
          ? `radial-gradient(circle at 40% 40%, ${rarity.color}20, ${rarity.color}08)`
          : 'hsl(var(--muted))',
        border: `1px solid ${achievement.isUnlocked ? `${rarity.color}40` : 'transparent'}`,
        boxShadow: achievement.isUnlocked ? `0 0 16px 0 ${rarity.glow}` : 'none',
      }}
      role="img"
      aria-label={achievement.title}
    >
      <span aria-hidden>{achievement.icon}</span>

      {/* Rarity indicator dot */}
      {achievement.isUnlocked && (
        <span
          className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full border-2 border-background"
          style={{ background: rarity.color }}
          aria-hidden
        />
      )}
    </div>
  )

  if (!showTooltip) return badge

  return (
    <Tooltip
      content={
        <div className="space-y-1 max-w-[200px]">
          <p className="font-semibold text-foreground">{achievement.title}</p>
          <p className="text-muted-foreground text-[11px]">{achievement.description}</p>
          <div className="flex items-center gap-1.5 pt-0.5">
            <span
              className="text-[10px] font-bold uppercase tracking-wide"
              style={{ color: rarity.color }}
            >
              {rarity.label}
            </span>
            <span className="text-[10px] text-muted-foreground">
              +{achievement.xpReward} XP
            </span>
          </div>
        </div>
      }
    >
      {badge}
    </Tooltip>
  )
}
