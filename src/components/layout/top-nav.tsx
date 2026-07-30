import { Search, Bell, Menu, Zap, Flame, LayoutDashboard, User, Settings, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/store/ui-store'
import { useAuth }    from '@/hooks/use-auth'
import { ROUTES }     from '@/lib/constants'
import { Button }     from '@/components/ui/button'
import { Input }      from '@/components/ui/input'
import { Avatar }     from '@/components/ui/avatar'
import { Tooltip }    from '@/components/ui/tooltip'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface TopNavProps {
  className?: string
}

export function TopNav({ className }: TopNavProps) {
  const { toggleSidebar } = useUIStore()
  const { user, signOut } = useAuth()
  const navigate          = useNavigate()

  const xp     = user?.xp     ?? 0
  const streak = user?.streak  ?? 0
  const name   = user?.name   ?? 'Agent'
  const avatar = user?.avatar  ?? undefined

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
        {xp > 0 && (
          <Tooltip content="Total XP" side="bottom">
            <div className="hidden sm:flex items-center gap-1.5 rounded-lg bg-primary/10 border border-primary/20 px-2.5 py-1">
              <Zap className="size-3.5 text-primary" />
              <span className="text-xs font-bold text-primary font-mono">
                {xp.toLocaleString()}
              </span>
            </div>
          </Tooltip>
        )}

        {/* Streak display */}
        {streak > 0 && (
          <Tooltip content={`${streak}-day streak`} side="bottom">
            <div className="hidden sm:flex items-center gap-1.5 rounded-lg bg-cyber-orange/10 border border-cyber-orange/20 px-2.5 py-1">
              <Flame className="size-3.5 text-cyber-orange" />
              <span className="text-xs font-bold text-cyber-orange font-mono">{streak}</span>
            </div>
          </Tooltip>
        )}

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

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              aria-label="Open user menu"
            >
              <Avatar
                src={avatar}
                fallback={name}
                size="sm"
                ring="primary"
                className="cursor-pointer hover:opacity-90 transition-opacity"
              />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-52">
            {/* User identity header */}
            <div className="px-3 py-2.5 space-y-0.5">
              <p className="text-sm font-semibold text-foreground truncate">{name}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => navigate(ROUTES.DASHBOARD)}>
              <LayoutDashboard className="size-4 text-muted-foreground" />
              Dashboard
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => navigate(ROUTES.PROFILE)}>
              <User className="size-4 text-muted-foreground" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => navigate(ROUTES.SETTINGS)}>
              <Settings className="size-4 text-muted-foreground" />
              Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={signOut}
              className="text-destructive focus:text-destructive focus:bg-destructive/10"
            >
              <LogOut className="size-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
