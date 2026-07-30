import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIState {
  sidebarOpen:     boolean
  sidebarCollapsed: boolean

  setSidebarOpen:      (open: boolean) => void
  setSidebarCollapsed: (collapsed: boolean) => void
  toggleSidebar:       () => void
  toggleSidebarCollapsed: () => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen:     false,
      sidebarCollapsed: false,

      setSidebarOpen:      (sidebarOpen)     => set({ sidebarOpen }),
      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
      toggleSidebar:       ()                => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      toggleSidebarCollapsed: ()             => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
    }),
    {
      name: 'cyber-learn-ui',
      partialize: (state) => ({ sidebarCollapsed: state.sidebarCollapsed }),
    }
  )
)
