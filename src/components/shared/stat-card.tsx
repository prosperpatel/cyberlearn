import type { LucideIcon } from 'lucide-react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'

interface StatCardProps {
  title:       string
  value:       string | number
  icon:        LucideIcon
  trend?:      number          // positive = up, negative = down, 0/undefined = neutral
  trendLabel?: string
  accent?:     'blue' | 'green' | 'purple' | 'red' | 'orange'
  className?:  string
  size?:       'sm' | 'md'
}

const ACCENT_STYLES = {
  blue:   { icon: 'text-cyber-blue',   bg: 'bg-cyber-blue/10',   border: 'border-cyber-blue/20',   glow: 'shadow-cyber-sm'  },
  green:  { icon: 'text-cyber-green',  bg: 'bg-cyber-green/10',  border: 'border-cyber-green/20',  glow: 'shadow-green-sm'  },
  purple: { icon: 'text-cyber-purple', bg: 'bg-cyber-purple/10', border: 'border-cyber-purple/20', glow: 'shadow-purple-sm' },
  red:    { icon: 'text-cyber-red',    bg: 'bg-cyber-red/10',    border: 'border-cyber-red/20',    glow: ''                 },
  orange: { icon: 'text-cyber-orange', bg: 'bg-cyber-orange/10', border: 'border-cyber-orange/20', glow: ''                 },
} as const

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendLabel,
  accent = 'blue',
  className,
  size = 'md',
}: StatCardProps) {
  const styles = ACCENT_STYLES[accent]

  const TrendIcon = trend == null || trend === 0
    ? Minus
    : trend > 0
      ? TrendingUp
      : TrendingDown

  const trendColor = trend == null || trend === 0
    ? 'text-muted-foreground'
    : trend > 0
      ? 'text-cyber-green'
      : 'text-cyber-red'

  return (
    <Card
      variant="default"
      className={cn(
        'transition-all duration-200 hover:-translate-y-0.5',
        styles.border,
        className,
      )}
    >
      <CardContent className={cn('flex items-start justify-between', size === 'sm' ? 'p-4' : 'p-5')}>
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </p>
          <p className={cn('font-bold text-foreground', size === 'sm' ? 'text-xl' : 'text-2xl')}>
            {value}
          </p>
          {(trend != null || trendLabel) && (
            <div className={cn('flex items-center gap-1 text-xs', trendColor)}>
              <TrendIcon className="size-3" />
              <span>{trendLabel ?? (trend !== 0 && trend != null ? `${Math.abs(trend)}%` : 'No change')}</span>
            </div>
          )}
        </div>

        <div className={cn('rounded-xl p-2.5', styles.bg, styles.glow)}>
          <Icon className={cn(styles.icon, size === 'sm' ? 'size-4' : 'size-5')} />
        </div>
      </CardContent>
    </Card>
  )
}
