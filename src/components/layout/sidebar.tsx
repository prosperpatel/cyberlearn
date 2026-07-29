import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, BookOpen, Terminal, Target, Trophy,
  User, Settings, ChevronLeft, ChevronRight, Shield,
  GraduationCap, Briefcase, Award, BookMarked, Users, Map,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/store/ui-store'
import { useAuthStore } from '@/store/auth-store'
import { MAIN_NAV, SECONDARY_NAV, APP_CONFIG } from '@/lib/constants'
import { XPBar } from '@/components/shared/xp-bar'
import { Avatar } from '@/components/ui/avatar'
import { Tooltip } from '@/components/ui/tooltip'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

// Map icon name strings to Lucide components
const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  LayoutDashboard, BookOpen, Terminal, Target, Trophy, User, Settings,
  GraduationCap, Briefcase, Award, BookMarked, Users, Map,
}

function NavIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICON_MAP[name]
  return Icon ? <Icon className={cn('size-5 shrink-0', className)} /> : null
}

// ── Sidebar ────────────────────────────────────────────────────────────────

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebarCollapsed } = useUIStore()
  const { user } = useAuthStore()
  const location = useLocation()

  const mockUser = {
    displayName: user?.displayName ?? 'Hacker',
    username: user?.username ?? '@h4ck3r',
    xp: user?.xp ?? 3240,
    avatar: user?.avatar,
  }

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarCollapsed ? 72 : 260 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        'fixed left-0 top-0 z-30 flex h-screen flex-col',
        'bg-base-900 border-r border-border',
        'overflow-hidden',
      )}
    >
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center gap-3 px-4 border-b border-border">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-cyber shadow-cyber-sm">
          <Shield className="size-4 text-base-950" />
        </div>
        <AnimatePresence initial={false}>
          {!sidebarCollapsed && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="font-bold text-foreground text-sm tracking-tight whitespace-nowrap"
            >
              {APP_CONFIG.name}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Main nav */}
      <ScrollArea className="flex-1 py-4">
        <nav className="px-2 space-y-0.5" aria-label="Main navigation">
          {MAIN_NAV.map((item) => (
            <SidebarNavItem
              key={item.href}
              item={item}
              collapsed={sidebarCollapsed}
              isActive={
                item.href === '/dashboard'
                  ? location.pathname === item.href
                  : location.pathname.startsWith(item.href)
              }
            />
          ))}
        </nav>

        <Separator className="my-4 mx-2 w-auto" />

        {/* Secondary nav */}
        <nav className="px-2 space-y-0.5" aria-label="Secondary navigation">
          {SECONDARY_NAV.map((item) => (
            <SidebarNavItem
              key={item.href}
              item={item}
              collapsed={sidebarCollapsed}
              isActive={location.pathname.startsWith(item.href)}
            />
          ))}
        </nav>
      </ScrollArea>

      {/* User panel */}
      <div className="shrink-0 border-t border-border p-3">
        {!sidebarCollapsed ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <Avatar
                src={mockUser.avatar}
                fallback={mockUser.displayName}
                size="sm"
                ring="primary"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{mockUser.displayName}</p>
                <p className="text-xs text-muted-foreground truncate font-mono">{mockUser.username}</p>
              </div>
            </div>
            <XPBar xp={mockUser.xp} compact showRankLabel={false} />
          </div>
        ) : (
          <div className="flex justify-center">
            <Tooltip content={`${mockUser.displayName} — ${mockUser.xp.toLocaleString()} XP`} side="right">
              <Avatar
                src={mockUser.avatar}
                fallback={mockUser.displayName}
                size="sm"
                ring="primary"
              />
            </Tooltip>
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={toggleSidebarCollapsed}
        className={cn(
          'absolute -right-3 top-20 z-40',
          'flex size-6 items-center justify-center',
          'rounded-full bg-base-700 border border-border',
          'text-muted-foreground hover:text-foreground hover:bg-base-600',
          'transition-colors duration-150',
          'shadow-card',
        )}
        aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {sidebarCollapsed
          ? <ChevronRight className="size-3" />
          : <ChevronLeft  className="size-3" />
        }
      </button>
    </motion.aside>
  )
}

// ── Single nav item ────────────────────────────────────────────────────────

interface SidebarNavItemProps {
  item:      { label: string; href: string; icon: string; badge?: string | number; isNew?: boolean }
  collapsed: boolean
  isActive:  boolean
}

function SidebarNavItem({ item, collapsed, isActive }: SidebarNavItemProps) {
  const link = (
    <NavLink
      to={item.href}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2.5',
        'text-sm font-medium transition-all duration-150',
        'group relative',
        isActive
          ? 'bg-primary/10 text-primary'
          : 'text-muted-foreground hover:bg-base-800 hover:text-foreground',
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {/* Active indicator bar */}
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-full bg-primary" />
      )}

      <NavIcon
        name={item.icon}
        className={isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}
      />

      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.12 }}
            className="flex-1 truncate"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>

      {!collapsed && item.badge && (
        <span className="ml-auto flex size-5 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold text-primary">
          {item.badge}
        </span>
      )}

      {!collapsed && item.isNew && (
        <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-cyber-green">
          NEW
        </span>
      )}
    </NavLink>
  )

  if (collapsed) {
    return (
      <Tooltip content={item.label} side="right">
        {link}
      </Tooltip>
    )
  }

  return link
}
