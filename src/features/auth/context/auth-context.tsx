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
}

// ── Context ───────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null)

// ── Profile helpers ───────────────────────────────────────────────────────────

interface ProfileRow {
  id:                string
  email:             string
  name:              string
  avatar:            string | null
  xp:                number
  level:             number
  streak:            number
  completed_missions: number
  academy_progress:  number
  created_at:        string
  last_login:        string
}

function mapRow(row: ProfileRow): AppUser {
  return {
    id:               row.id,
    email:            row.email,
    name:             row.name,
    avatar:           row.avatar,
    xp:               row.xp,
    level:            row.level,
    streak:           row.streak,
    completedMissions: row.completed_missions,
    academyProgress:  row.academy_progress,
    createdAt:        row.created_at,
    lastLogin:        row.last_login,
  }
}

/** Upsert the user's profile row (idempotent — safe to call on every sign-in). */
async function upsertProfile(
  id: string,
  email: string,
  name: string,
  avatar: string | null,
): Promise<AppUser | null> {
  const { data, error } = await supabase
    .from('profiles')
    .upsert(
      { id, email, name, avatar, last_login: new Date().toISOString() },
      { onConflict: 'id' },
    )
    .select('*')
    .single<ProfileRow>()

  if (error) {
    console.error('[Auth] Failed to upsert profile:', error.message)
    return null
  }

  return mapRow(data)
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

  // ── Initial session + auth state listener ─────────────────────────────────

  useEffect(() => {
    let mounted = true

    // Resolve the current session from localStorage / URL hash
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!mounted) return
      setSession(session)

      if (session?.user) {
        const meta = session.user.user_metadata
        const profile = await upsertProfile(
          session.user.id,
          session.user.email ?? '',
          (meta.full_name as string | undefined) ?? (meta.name as string | undefined) ?? 'Agent',
          (meta.avatar_url as string | undefined) ?? (meta.picture as string | undefined) ?? null,
        )
        if (mounted) setUser(profile)
      }

      if (mounted) setIsLoading(false)
    })

    // React to all subsequent auth events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return
        setSession(session)

        if (session?.user) {
          const meta = session.user.user_metadata
          const profile = await upsertProfile(
            session.user.id,
            session.user.email ?? '',
            (meta.full_name as string | undefined) ?? (meta.name as string | undefined) ?? 'Agent',
            (meta.avatar_url as string | undefined) ?? (meta.picture as string | undefined) ?? null,
          )
          if (mounted) setUser(profile)
        } else {
          if (mounted) setUser(null)
        }

        // After Google OAuth completes, redirect to where the user was headed
        if (event === 'SIGNED_IN' && mounted) {
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

  // ── Actions ───────────────────────────────────────────────────────────────

  const signInWithGoogle = useCallback(async () => {
    setError(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // Supabase redirects here after Google auth; must be allow-listed in
        // the Supabase dashboard under Authentication → URL Configuration.
        redirectTo: window.location.origin,
      },
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
    // Full navigation clears all in-memory state cleanly
    window.location.replace(ROUTES.AUTH.LOGIN)
  }, [])

  const clearError = useCallback(() => setError(null), [])

  // ── Value ──────────────────────────────────────────────────────────────────

  const value = useMemo<AuthContextValue>(
    () => ({ user, session, isLoading, error, signInWithGoogle, signOut, clearError }),
    [user, session, isLoading, error, signInWithGoogle, signOut, clearError],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
