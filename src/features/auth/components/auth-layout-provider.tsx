import { Outlet } from 'react-router-dom'
import { AuthProvider } from '@/features/auth/context/auth-context'

/**
 * Root layout route that wraps the entire app in AuthProvider.
 * Lives inside <RouterProvider> so useNavigate works inside AuthProvider.
 */
export function AuthLayoutProvider() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}
