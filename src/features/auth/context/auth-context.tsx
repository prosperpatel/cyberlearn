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
  //   2. Watch for auth state changes
  //   3. After each change, load the profile and update `user`
  //
  // Navigation is intentionally NOT performed here.  All route decisions
  // live in the reactive navigation effect below so there is a single,
  // deterministic code path — no race between getSession() and
  // onAuthStateChange(), and no silent catch block that routes to /dashboard.

  useEffect(() => {
    let mounted = true

    // Fetch the profile for `supabaseUser` and update state.
    // Returns the profile (or null) so callers can use it without a second query.
    async function syncUser(supabaseUser: { id: string; email?: string } | null) {
      if (!supabaseUser) {
        if (mounted) setUser(null)
        return null
      }
      const profile = await ProfileService.getProfile(supabaseUser.id).catch((err: unknown) => {
        console.warn('[Auth] Profile fetch failed:', err)
        return null
      })
      if (mounted) {
        setUser(profile ? mapProfile(profile, supabaseUser.email ?? '') : null)
      }
      return profile
    }

    // ── Initial session resolution ─────────────────────────────────────────
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!mounted) return
      setSession(session)
      await syncUser(session?.user ?? null)
      if (mounted) setIsLoading(false)
    })

    // ── Ongoing auth state changes ─────────────────────────────────────────
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return
        setSession(session)

        const profile = await syncUser(session?.user ?? null)
        if (!mounted) return

        // For returning users signing in with an existing profile, honour any
        // saved redirect (e.g. they tried to open /missions/x before logging in).
        // New users (profile === null) are handled by the navigation effect below.
        if (event === 'SIGNED_IN' && profile) {
          const redirectTo = sessionStorage.getItem('auth:redirect') ?? ROUTES.DASHBOARD
          sessionStorage.removeItem('auth:redirect')
          navigate(redirectTo, { replace: true })
        }
      },
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [navigate])

  // ── Reactive onboarding guard ─────────────────────────────────────────────
  //
  // Runs whenever auth state settles (isLoading→false) or changes.
  // If the user is authenticated but has no profile, send them to /onboarding.
  // This is the ONLY place that issues this redirect, so there are no races.

  useEffect(() => {
    if (isLoading) return          // Still resolving — wait
    if (!session) return           // Not logged in — ProtectedRoute handles this
    if (user) return               // Profile exists — nothing to do

    const alreadyOnboarding = window.location.pathname.startsWith(ROUTES.ONBOARDING)
    if (!alreadyOnboarding) {
      navigate(ROUTES.ONBOARDING, { replace: true })
    }
  }, [isLoading, session, user, navigate])

  // ── Actions ───────────────────────────────────────────────────────────────

  const signInWithGoogle = useCallback(async () => {
    setError(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
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
