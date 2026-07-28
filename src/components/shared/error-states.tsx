import { AlertTriangle, RefreshCw, Lock, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/constants'

interface ErrorStateProps {
  title?:       string
  description?: string
  onRetry?:     () => void
  className?:   string
}

// ── Generic error ──────────────────────────────────────────────────────────

export function ErrorState({
  title       = 'Something went wrong',
  description = 'An unexpected error occurred. Please try again.',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-4 text-center gap-4', className)}>
      <div className="relative">
        <div className="size-20 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center">
          <AlertTriangle className="size-8 text-destructive" />
        </div>
        <div className="absolute inset-0 rounded-2xl bg-destructive/5 blur-xl" />
      </div>
      <div className="space-y-1 max-w-sm">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          <RefreshCw className="size-4" />
          Try Again
        </Button>
      )}
    </div>
  )
}

// ── Network error ──────────────────────────────────────────────────────────

export function NetworkError({ onRetry, className }: { onRetry?: () => void; className?: string }) {
  return (
    <ErrorState
      title="No Connection"
      description="Check your internet connection and try again."
      onRetry={onRetry}
      className={className}
    />
  )
}

// ── 404 Not Found ──────────────────────────────────────────────────────────

export function NotFound({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col items-center justify-center min-h-[60vh] px-4 text-center gap-6', className)}>
      {/* Glitch number */}
      <div className="relative">
        <p className="text-8xl font-black text-gradient-cyber select-none">404</p>
        <p
          className="absolute inset-0 text-8xl font-black select-none opacity-20"
          style={{ transform: 'translate(3px, 3px)', color: '#FF4757' }}
          aria-hidden
        >
          404
        </p>
      </div>

      <div className="space-y-2 max-w-sm">
        <h2 className="text-xl font-bold text-foreground">Page Not Found</h2>
        <p className="text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button asChild variant="cyber">
          <Link to={ROUTES.DASHBOARD}>Back to Dashboard</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to={ROUTES.COURSES}>Browse Courses</Link>
        </Button>
      </div>
    </div>
  )
}

// ── Access Denied ──────────────────────────────────────────────────────────

export function AccessDenied({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-20 px-4 text-center gap-6', className)}>
      <div className="size-24 rounded-2xl bg-muted flex items-center justify-center">
        <Lock className="size-10 text-muted-foreground" />
      </div>
      <div className="space-y-2 max-w-xs">
        <h3 className="text-xl font-bold text-foreground">Pro Content</h3>
        <p className="text-sm text-muted-foreground">
          Upgrade to Pro to unlock this content and all premium features.
        </p>
      </div>
      <Button variant="cyber" size="lg">
        Upgrade to Pro
      </Button>
    </div>
  )
}

// ── Empty search results ───────────────────────────────────────────────────

export function EmptySearch({ query, className }: { query: string; className?: string }) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-4 text-center gap-4', className)}>
      <div className="size-20 rounded-2xl bg-muted flex items-center justify-center">
        <Search className="size-8 text-muted-foreground" />
      </div>
      <div className="space-y-1 max-w-sm">
        <h3 className="text-base font-semibold text-foreground">No results found</h3>
        <p className="text-sm text-muted-foreground">
          No courses match <span className="text-foreground font-medium">"{query}"</span>.
          Try a different keyword.
        </p>
      </div>
    </div>
  )
}
