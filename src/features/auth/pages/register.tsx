import { Navigate } from 'react-router-dom'
import { ROUTES } from '@/lib/constants'

// Registration via email/password has been removed.
// All sign-up is handled through Google OAuth on the login page.
export function Register() {
  return <Navigate to={ROUTES.AUTH.LOGIN} replace />
}
