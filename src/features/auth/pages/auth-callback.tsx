import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/context/auth-context'
import { LoadingScreen } from '@/components/shared/loading-screen'
import { ROUTES } from '@/lib/constants'

/**
 * Fallback landing page for OAuth callbacks.
 *
 * With the current implicit-flow setup, Supabase redirects tokens to the
 * Site URL (root), where AuthProvider's getSession() picks them up
 * automatically. This page handles the case where the Supabase Dashboard
 * is later configured to send redirects explicitly to /auth/callback
 * (e.g. when switching to PKCE flow).
 *
 * If auth resolves with no session (OAuth cancelled or failed), redirects
 * to /login. If a session exists, AuthProvider's navigation guard takes over.
 */
export function AuthCallback() {
  const { session, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoading) return
    if (!session) {
      navigate(ROUTES.AUTH.LOGIN, { replace: true })
    }
    // Session present: AuthProvider's guard navigates to /dashboard or /onboarding.
  }, [isLoading, session, navigate])

  return <LoadingScreen status="Completing sign-in…" />
}
