import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// ── Track ──────────────────────────────────────────────────────────────────

const trackVariants = cva(
  'relative w-full overflow-hidden rounded-full',
  {
    variants: {
      size: {
        xs:  'h-1',
        sm:  'h-1.5',
        md:  'h-2',
        lg:  'h-3',
        xl:  'h-4',
      },
    },
    defaultVariants: { size: 'md' },
  }
)

// ── Indicator fill — uses `barColor` to avoid collision with Radix's `color` ──

const indicatorVariants = cva(
  'h-full w-full flex-1 transition-all duration-700 ease-out rounded-full',
  {
    variants: {
      barColor: {
        primary:          'bg-primary',
        success:          'bg-cyber-green',
        warning:          'bg-cyber-orange',
        danger:           'bg-cyber-red',
        purple:           'bg-cyber-purple',
        gradient:         'bg-gradient-cyber',
        'gradient-green': 'bg-gradient-green',
      },
      glow: {
        true:  '',
        false: '',
      },
    },
    compoundVariants: [
      { barColor: 'primary',  glow: true, className: 'shadow-cyber-sm' },
      { barColor: 'success',  glow: true, className: 'shadow-green-sm' },
      { barColor: 'gradient', glow: true, className: 'shadow-cyber-md' },
    ],
    defaultVariants: { barColor: 'primary', glow: false },
  }
)

// ── Public API — expose `color` for callers, map to internal `barColor` ────

type BarColor = 'primary' | 'success' | 'warning' | 'danger' | 'purple' | 'gradient' | 'gradient-green'

// Omit Radix's `color` to avoid type clash
type RadixProgressProps = Omit<
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
  'color'
>

export interface ProgressProps
  extends RadixProgressProps,
    VariantProps<typeof trackVariants> {
  value?:     number
  max?:       number
  color?:     BarColor
  glow?:      boolean
  showLabel?: boolean
  label?:     string
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    {
      className,
      value = 0,
      max = 100,
      size,
      color = 'primary',
      glow = false,
      showLabel = false,
      label,
      ...props
    },
    ref
  ) => {
    const pct = max > 0 ? Math.min(Math.max((value / max) * 100, 0), 100) : 0

    return (
      <div className="w-full space-y-1">
        {(showLabel || label) && (
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{label}</span>
            <span className="font-mono">{Math.round(pct)}%</span>
          </div>
        )}
        <ProgressPrimitive.Root
          ref={ref}
          className={cn(trackVariants({ size }), 'bg-muted', className)}
          value={value}
          max={max}
          {...props}
        >
          <ProgressPrimitive.Indicator
            className={cn(indicatorVariants({ barColor: color, glow }))}
            style={{ transform: `translateX(-${100 - pct}%)` }}
          />
        </ProgressPrimitive.Root>
      </div>
    )
  }
)
Progress.displayName = 'Progress'

export { Progress }
