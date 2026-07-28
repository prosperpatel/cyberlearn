import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  [
    'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5',
    'text-xs font-semibold leading-none',
    'transition-colors duration-150',
    'border',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-muted text-muted-foreground border-transparent',
        ],
        primary: [
          'bg-primary/10 text-primary border-primary/20',
        ],
        success: [
          'bg-cyber-green/10 text-cyber-green border-cyber-green/20',
        ],
        warning: [
          'bg-cyber-orange/10 text-cyber-orange border-cyber-orange/20',
          '[--tw-text-opacity:1] text-[#FF6B35]',
        ],
        danger: [
          'bg-cyber-red/10 text-cyber-red border-cyber-red/20',
        ],
        purple: [
          'bg-cyber-purple/10 text-cyber-purple border-cyber-purple/20',
        ],
        outline: [
          'bg-transparent text-foreground border-border',
        ],
        // Special — glow effect for achievements/ranks
        glow: [
          'bg-primary/10 text-primary border-primary/30',
          'shadow-cyber-sm',
        ],
        // NEW pill
        new: [
          'bg-gradient-cyber text-base-950 border-transparent font-bold',
        ],
        pro: [
          'bg-gradient-to-r from-cyber-purple to-primary text-white border-transparent',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean
}

function Badge({ className, variant, dot = false, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, className }))} {...props}>
      {dot && (
        <span
          className={cn(
            'size-1.5 rounded-full',
            variant === 'success' && 'bg-cyber-green',
            variant === 'danger'  && 'bg-cyber-red',
            variant === 'warning' && 'bg-cyber-orange',
            variant === 'primary' && 'bg-primary',
            variant === 'purple'  && 'bg-cyber-purple',
            (!variant || variant === 'default') && 'bg-muted-foreground',
          )}
          aria-hidden
        />
      )}
      {children}
    </span>
  )
}

export { Badge, badgeVariants }
