import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserProfile } from '@/types'

interface AuthState {
  user: UserProfile | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean

  setUser: (user: UserProfile) => void
  setToken: (token: string) => void
  logout: () => void
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user:            null,
      token:           null,
      isAuthenticated: false,
      isLoading:       false,

      setUser: (user) =>
        set({ user, isAuthenticated: true }),

      setToken: (token) =>
        set({ token }),

      logout: () =>
        set({ user: null, token: null, isAuthenticated: false }),

      setLoading: (isLoading) =>
        set({ isLoading }),
    }),
    {
      name:    'cyber-learn-auth',
      partialize: (state) => ({
        token:           state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
