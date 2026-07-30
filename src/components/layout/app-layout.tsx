import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useUIStore } from '@/store/ui-store'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Sidebar } from './sidebar'
import { TopNav } from './top-nav'
import { MobileNav } from './mobile-nav'

export function AppLayout() {
  const { sidebarCollapsed, sidebarOpen, setSidebarOpen } = useUIStore()
  const location = useLocation()

  // Close the mobile sidebar whenever the route changes (link tapped inside drawer)
  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname, setSidebarOpen])

  return (
    <TooltipProvider delayDuration={300}>
      <div className="min-h-screen bg-background">
        {/* Sidebar — always visible on desktop; on mobile shown only when sidebarOpen */}
        <div className={sidebarOpen ? 'block' : 'hidden md:block'}>
          <Sidebar />
        </div>

        {/* Mobile backdrop — sits below the header (z-[19] < header z-20) so the
            hamburger button stays tappable, but above page content (z-0) so tapping
            outside the sidebar closes it. Only rendered on mobile when sidebar is open. */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-[19] bg-background/60 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

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
