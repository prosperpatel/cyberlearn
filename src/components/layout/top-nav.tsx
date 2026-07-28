import { Search, Bell, Menu, Zap, Flame } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/store/ui-store'
import { useAuthStore } from '@/store/auth-store'
import { ROUTES } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar } from '@/components/ui/avatar'
import { Tooltip } from '@/components/ui/tooltip'

interface TopNavProps {
  className?: string
}

export function TopNav({ className }: TopNavProps) {
  const { toggleSidebar } = useUIStore()
  const { user } = useAuthStore()

  const mockXP     = user?.xp ?? 3240
  const mockStreak = user?.stats?.currentStreak ?? 7

  return (
    <header
      className={cn(
        'fixed top-0 right-0 z-20 flex h-16 items-center gap-4',
        'bg-base-900/80 backdrop-blur-md border-b border-border',
        'px-4',
        className,
      )}
    >
      {/* Mobile menu toggle */}
      <Button
        variant="ghost"
        size="icon-sm"
        className="md:hidden"
        onClick={toggleSidebar}
        aria-label="Open menu"
      >
        <Menu className="size-4" />
      </Button>

      {/* Search */}
      <div className="flex-1 max-w-md hidden sm:block">
        <Input
          placeholder="Search courses, labs, challenges..."
          startIcon={<Search />}
          className="h-9 bg-base-800 border-base-700 text-sm"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* XP display */}
        <Tooltip content="Total XP" side="bottom">
          <div className="hidden sm:flex items-center gap-1.5 rounded-lg bg-primary/10 border border-primary/20 px-2.5 py-1">
            <Zap className="size-3.5 text-primary" />
            <span className="text-xs font-bold text-primary font-mono">
              {mockXP.toLocaleString()}
            </span>
          </div>
        </Tooltip>

        {/* Streak display */}
        <Tooltip content={`${mockStreak}-day streak`} side="bottom">
          <div className="hidden sm:flex items-center gap-1.5 rounded-lg bg-cyber-orange/10 border border-cyber-orange/20 px-2.5 py-1">
            <Flame className="size-3.5 text-cyber-orange" />
            <span className="text-xs font-bold text-cyber-orange font-mono">{mockStreak}</span>
          </div>
        </Tooltip>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon-sm"
          className="relative"
          aria-label="Notifications"
        >
          <Bell className="size-4" />
          <span className="absolute top-1 right-1 size-2 rounded-full bg-cyber-red shadow-[0_0_4px_rgba(255,71,87,0.8)]" />
        </Button>

        {/* Avatar → profile */}
        <Link to={ROUTES.PROFILE} aria-label="Your profile">
          <Avatar
            src={user?.avatar}
            fallback={user?.displayName ?? 'User'}
            size="sm"
            ring="primary"
            className="cursor-pointer hover:ring-2 transition-all"
          />
        </Link>
      </div>
    </header>
  )
}
