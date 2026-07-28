import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

// ── Page-level full screen loader ──────────────────────────────────────────

export function PageLoader({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background gap-4">
      <div className="relative size-16">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
        {/* Spinning arc */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
        {/* Inner dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="size-2 rounded-full bg-primary animate-pulse-cyber shadow-cyber-md" />
        </div>
      </div>
      <p className="text-sm text-muted-foreground animate-pulse-cyber font-mono">{label}</p>
    </div>
  )
}

// ── Inline spinner ─────────────────────────────────────────────────────────

export function Spinner({ className, size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClass = { sm: 'size-4', md: 'size-6', lg: 'size-8' }[size]
  return (
    <svg
      className={cn('animate-spin text-primary', sizeClass, className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-label="Loading"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}

// ── Card skeleton ──────────────────────────────────────────────────────────

export function CourseCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-xl border border-border bg-card p-5 space-y-3', className)}>
      <div className="flex items-start justify-between gap-2">
        <Skeleton className="size-11 rounded-xl" />
        <Skeleton className="h-5 w-12 rounded-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-20 rounded-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>
      <div className="flex items-center justify-between pt-1">
        <Skeleton className="h-3 w-14" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  )
}

// ── Stat card skeleton ─────────────────────────────────────────────────────

export function StatCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-xl border border-border bg-card p-5 flex items-start justify-between', className)}>
      <div className="space-y-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-7 w-24" />
        <Skeleton className="h-3 w-16" />
      </div>
      <Skeleton className="size-10 rounded-xl" />
    </div>
  )
}

// ── Dashboard skeleton grid ────────────────────────────────────────────────

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 p-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      {/* Course grid */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-36" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
