import { useAuthStore } from '@/store/auth-store'

export function useAuth() {
  const { user, token, isAuthenticated, isLoading, logout } = useAuthStore()
  return { user, token, isAuthenticated, isLoading, logout }
}
