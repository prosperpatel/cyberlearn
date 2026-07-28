import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, BookOpen, Terminal, Target, Trophy,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { MAIN_NAV } from '@/lib/constants'

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  LayoutDashboard, BookOpen, Terminal, Target, Trophy,
}

// Mobile bottom navigation bar — shown on small screens
export function MobileNav() {
  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-30 md:hidden',
        'flex items-stretch',
        'bg-base-900/95 backdrop-blur-md border-t border-border',
        'h-16 safe-b',
      )}
      aria-label="Mobile navigation"
    >
      {MAIN_NAV.map((item) => {
        const Icon = ICON_MAP[item.icon]

        return (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex flex-1 flex-col items-center justify-center gap-0.5',
                'text-[10px] font-medium transition-colors duration-150',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground',
              )
            }
          >
            {({ isActive }) => (
              <>
                {Icon && (
                  <div
                    className={cn(
                      'flex items-center justify-center rounded-lg p-1.5 transition-all duration-150',
                      isActive && 'bg-primary/15',
                    )}
                  >
                    <Icon className={cn('size-5', isActive && 'text-primary')} />
                  </div>
                )}
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        )
      })}
    </nav>
  )
}
