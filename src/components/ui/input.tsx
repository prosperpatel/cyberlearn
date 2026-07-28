import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ReactNode
  endIcon?:   React.ReactNode
  error?:     boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, endIcon, error, ...props }, ref) => {
    if (startIcon ?? endIcon) {
      return (
        <div className="relative flex items-center">
          {startIcon && (
            <span className="absolute left-3 text-muted-foreground [&_svg]:size-4">
              {startIcon}
            </span>
          )}
          <input
            type={type}
            ref={ref}
            className={cn(
              'flex h-10 w-full rounded-lg border bg-input px-3 py-2 text-sm text-foreground',
              'placeholder:text-muted-foreground',
              'transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-destructive focus-visible:ring-destructive',
              !error && 'border-border focus-visible:border-primary/50',
              startIcon && 'pl-9',
              endIcon   && 'pr-9',
              className,
            )}
            {...props}
          />
          {endIcon && (
            <span className="absolute right-3 text-muted-foreground [&_svg]:size-4">
              {endIcon}
            </span>
          )}
        </div>
      )
    }

    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          'flex h-10 w-full rounded-lg border bg-input px-3 py-2 text-sm text-foreground',
          'placeholder:text-muted-foreground',
          'transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-destructive focus-visible:ring-destructive',
          !error && 'border-border focus-visible:border-primary/50',
          className,
        )}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
