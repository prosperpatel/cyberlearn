import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  // base
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'rounded-lg text-sm font-medium',
    'transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:pointer-events-none disabled:opacity-40',
    'active:scale-[0.97]',
    '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        // Filled — glowing primary action
        default: [
          'bg-primary text-primary-foreground',
          'hover:bg-primary/90 hover:shadow-cyber-md',
          'shadow-cyber-sm',
        ],
        // Secondary — muted purple
        secondary: [
          'bg-secondary text-secondary-foreground',
          'hover:bg-secondary/80',
        ],
        // Ghost — no background, hover reveals it
        ghost: [
          'text-muted-foreground',
          'hover:bg-muted hover:text-foreground',
        ],
        // Outline — border only
        outline: [
          'border border-border bg-transparent text-foreground',
          'hover:bg-muted hover:border-primary/50',
        ],
        // Destructive — danger red
        destructive: [
          'bg-destructive text-destructive-foreground',
          'hover:bg-destructive/90',
        ],
        // Success — neon green
        success: [
          'bg-cyber-green text-base-950',
          'hover:bg-cyber-green/90 hover:shadow-green-md',
          'shadow-green-sm',
        ],
        // Link — text-only with underline on hover
        link: [
          'text-primary underline-offset-4',
          'hover:underline',
          'p-0 h-auto',
        ],
        // Cyber — gradient button for special CTAs
        cyber: [
          'bg-gradient-cyber text-base-950 font-semibold',
          'hover:opacity-90 hover:shadow-cyber-lg',
          'shadow-cyber-md',
        ],
      },
      size: {
        sm:      'h-8  px-3 text-xs rounded-md gap-1.5',
        default: 'h-10 px-4',
        lg:      'h-12 px-6 text-base rounded-xl',
        xl:      'h-14 px-8 text-lg rounded-xl',
        icon:    'h-10 w-10',
        'icon-sm': 'h-8 w-8 rounded-md',
        'icon-lg': 'h-12 w-12 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size:    'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin size-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <circle
                className="opacity-25"
                cx="12" cy="12" r="10"
                stroke="currentColor" strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
