import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useNavigate } from 'react-router-dom'
import type { Session, AuthError } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { ROUTES } from '@/lib/constants'
import { ProfileService } from '@/features/onboarding/services/profile-service'
import type { Profile } from '@/features/onboarding/types/profile'

// ── Types ─────────────────────────────────────────────────────────────────────

/** Flattened user profile combining Supabase auth + the profiles DB table. */
export interface AppUser {
  id:               string
  email:            string
  name:             string
  avatar:           string | null
  xp:               number
  level:            number
  streak:           number
  completedMissions: number
  academyProgress:  number
  createdAt:        string
  lastLogin:        string
}

interface AuthContextValue {
  user:             AppUser | null
  session:          Session | null
  isLoading:        boolean
  error:            string | null
  signInWithGoogle: () => Promise<void>
  signOut:          () => Promise<void>
  clearError:       () => void
  refreshUser:      () => Promise<void>
}

// ── Context ───────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null)

// ── Helpers ───────────────────────────────────────────────────────────────────

function mapProfile(profile: Profile, email: string): AppUser {
  return {
    id:               profile.id,
    email,
    name:             profile.display_name,
    avatar:           profile.avatar_url,
    xp:               profile.xp,
    level:            profile.level,
    streak:           profile.streak,
    completedMissions: 0,
    academyProgress:  0,
    createdAt:        profile.created_at,
    lastLogin:        profile.updated_at,
  }
}

function mapAuthError(err: AuthError): string {
  const msg = err.message.toLowerCase()
  if (msg.includes('network') || msg.includes('fetch'))
    return 'Network error. Please check your connection and try again.'
  if (err.status === 429)
    return 'Too many sign-in attempts. Please wait a moment and try again.'
  if (err.status === 403)
    return 'Access denied. Your account may be restricted.'
  return 'Authentication failed. Please try again.'
}

// ── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()

  const [session,   setSession]   = useState<Session | null>(null)
  const [user,      setUser]      = useState<AppUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error,     setError]     = useState<string | null>(null)

  // ── Session + profile loader ──────────────────────────────────────────────
  //
  // Responsibilities of this effect:
  //   1. Resolve the current session on mount
  //   2. Watch for auth state changes (token refresh, sign-out, etc.)
  //   3. After each change, load the profile and update `user`
  //
  // Navigation is intentionally NOT performed here. All route decisions live
  // in the single reactive navigation effect below, so there is only one code
  // path regardless of whether the session came from getSession() or an
  // onAuthStateChange() event.

  useEffect(() => {
    let mounted = true

    // Fetch the profile for `supabaseUser` and update component state.
    async function syncUser(supabaseUser: { id: string; email?: string } | null) {
      if (!supabaseUser) {
        if (mounted) setUser(null)
        return
      }
      const profile = await ProfileService.getProfile(supabaseUser.id).catch((err: unknown) => {
        console.warn('[Auth] getProfile error:', err)
        return null
      })
      if (mounted) {
        setUser(profile ? mapProfile(profile, supabaseUser.email ?? '') : null)
      }
    }

    // ── Initial session resolution ─────────────────────────────────────────
    // .finally() guarantees setIsLoading(false) even if getSession() or
    // syncUser() throw an unexpected error.
    supabase.auth.getSession()
      .then(async ({ data: { session } }) => {
        if (!mounted) return
        setSession(session)
        await syncUser(session?.user ?? null)
      })
      .catch((err: unknown) => {
        console.error('[Auth] getSession error:', err)
      })
      .finally(() => {
        if (mounted) setIsLoading(false)
      })

    // ── Ongoing auth state changes ─────────────────────────────────────────
    // Only updates state — navigation is handled by the guard effect below.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) return
        setSession(session)
        await syncUser(session?.user ?? null)
      },
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [navigate])

  // ── Single navigation source of truth ────────────────────────────────────
  //
  // Runs whenever auth state settles or changes. This is the ONLY place that
  // issues route redirects, preventing races between concurrent effects.
  //
  //  • session + no profile  → /onboarding
  //  • session + profile + on an auth/transition page → /dashboard (or saved path)
  //  • session + profile + on an app page → stay (page refresh scenario)
  //  • no session → ProtectedRoute handles /login redirect

  useEffect(() => {
    if (isLoading) return
    if (!session) return

    const path = window.location.pathname

    if (!user) {
      if (!path.startsWith(ROUTES.ONBOARDING)) {
        navigate(ROUTES.ONBOARDING, { replace: true })
      }
      return
    }

    // Profile exists — only redirect if we're still on an auth/transition page.
    const isAuthPage = (
      path === ROUTES.AUTH.LOGIN ||
      path === ROUTES.AUTH.REGISTER ||
      path.startsWith('/auth/')
    )
    if (isAuthPage) {
      const saved = sessionStorage.getItem('auth:redirect') ?? ROUTES.DASHBOARD
      sessionStorage.removeItem('auth:redirect')
      navigate(saved, { replace: true })
    }
  }, [isLoading, session, user, navigate])

  // ── Actions ───────────────────────────────────────────────────────────────

  const signInWithGoogle = useCallback(async () => {
    setError(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      // Use the origin only — Supabase validates redirectTo against its
      // allowlist; the Site URL (origin) is always allowed. A custom path
      // like /auth/callback is rejected unless explicitly added to the
      // dashboard's Redirect URLs, causing a fallback to root anyway.
      options: { redirectTo: window.location.origin },
    })
    if (error) setError(mapAuthError(error))
  }, [])

  const signOut = useCallback(async () => {
    setError(null)
    const { error } = await supabase.auth.signOut()
    if (error) {
      setError(mapAuthError(error))
      return
    }
    setUser(null)
    setSession(null)
    window.location.replace(ROUTES.AUTH.LOGIN)
  }, [])

  const clearError = useCallback(() => setError(null), [])

  const refreshUser = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) return
    const profile = await ProfileService.getProfile(session.user.id).catch(() => null)
    if (profile) setUser(mapProfile(profile, session.user.email ?? ''))
  }, [])

  // ── Value ──────────────────────────────────────────────────────────────────

  const value = useMemo<AuthContextValue>(
    () => ({ user, session, isLoading, error, signInWithGoogle, signOut, clearError, refreshUser }),
    [user, session, isLoading, error, signInWithGoogle, signOut, clearError, refreshUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
