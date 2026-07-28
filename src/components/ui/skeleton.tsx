import * as React from 'react'
import { cn } from '@/lib/utils'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  rounded?: 'sm' | 'md' | 'lg' | 'full'
}

function Skeleton({ className, rounded = 'md', ...props }: SkeletonProps) {
  const roundedClass = {
    sm:   'rounded-sm',
    md:   'rounded-md',
    lg:   'rounded-lg',
    full: 'rounded-full',
  }[rounded]

  return (
    <div
      className={cn('shimmer', roundedClass, className)}
      aria-hidden="true"
      {...props}
    />
  )
}

export { Skeleton }
