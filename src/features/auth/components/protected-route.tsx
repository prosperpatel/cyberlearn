import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/features/auth/context/auth-context'
import { LoadingScreen } from '@/components/shared/loading-screen'
import { ROUTES } from '@/lib/constants'

/**
 * Guards all child routes. While the session is resolving shows the loading
 * screen (prevents flash of protected content). Unauthenticated visitors are
 * redirected to /login; the originally requested path is stored in
 * sessionStorage so AuthProvider can restore it after Google OAuth.
 */
export function ProtectedRoute() {
  const { session, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return <LoadingScreen status="Authenticating" />
  }

  if (!session) {
    // Persist the intended path for post-login redirect
    if (location.pathname !== ROUTES.AUTH.LOGIN) {
      sessionStorage.setItem('auth:redirect', location.pathname + location.search)
    }
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />
  }

  return <Outlet />
}
