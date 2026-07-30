import { useCallback, useEffect, useRef, useState } from 'react'
import { ProfileService } from '../services/profile-service'
import type { Profile } from '../types/profile'

export function useProfile(userId?: string) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(Boolean(userId))
  const [error, setError]     = useState<string | null>(null)

  // Guard against state updates after unmount (async getProfile may outlive the consumer).
  const mounted = useRef(true)
  useEffect(() => () => { mounted.current = false }, [])

  const refresh = useCallback(async () => {
    if (!userId) { setProfile(null); setLoading(false); return }
    setLoading(true); setError(null)
    try {
      const result = await ProfileService.getProfile(userId)
      if (mounted.current) setProfile(result)
    } catch (cause) {
      if (mounted.current) setError(cause instanceof Error ? cause.message : 'Could not load your profile.')
    } finally {
      if (mounted.current) setLoading(false)
    }
  }, [userId])

  useEffect(() => { void refresh() }, [refresh])

  return { profile, loading, error, refresh, setProfile }
}
