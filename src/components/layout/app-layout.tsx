import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useUIStore } from '@/store/ui-store'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Sidebar } from './sidebar'
import { TopNav } from './top-nav'
import { MobileNav } from './mobile-nav'

export function AppLayout() {
  const { sidebarCollapsed } = useUIStore()

  return (
    <TooltipProvider delayDuration={300}>
      <div className="min-h-screen bg-background">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Main content area — offset by sidebar width */}
        <motion.div
          initial={false}
          animate={{
            marginLeft: sidebarCollapsed ? 72 : 260,
          }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="hidden md:block"
        >
          <TopNav className="left-0 md:left-auto" />

          <main className="min-h-screen pt-16">
            <Outlet />
          </main>
        </motion.div>

        {/* Mobile layout — no sidebar, bottom nav instead */}
        <div className="md:hidden flex flex-col min-h-screen">
          <TopNav className="left-0 right-0" />
          <main className="flex-1 pt-16 pb-16">
            <Outlet />
          </main>
          <MobileNav />
        </div>
      </div>
    </TooltipProvider>
  )
}
