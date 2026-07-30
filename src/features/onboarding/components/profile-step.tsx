import { useEffect, useState } from 'react'
import { ProfileService } from '../services/profile-service'
import { profileSchema } from '../utils/validation'
import type { OnboardingData } from '../types/profile'
import { CountrySelector } from './country-selector'
import { ErrorBanner } from './error-banner'

export function ProfileStep({
  data,
  updateData,
  userId,
}: {
  data:       OnboardingData
  updateData: (data: Partial<OnboardingData>) => void
  userId:     string
}) {
  const [usernameState, setUsernameState] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle')

  useEffect(() => {
    const username = data.username.trim().toLowerCase()
    if (!profileSchema.shape.username.safeParse(username).success) {
      setUsernameState('idle')
      return
    }
    setUsernameState('checking')
    const timer = window.setTimeout(() => {
      void ProfileService.checkUsernameAvailability(username, userId)
        .then(available => setUsernameState(available ? 'available' : 'taken'))
        .catch(() => setUsernameState('idle'))
    }, 350)
    return () => window.clearTimeout(timer)
  }, [data.username, userId])

  const displayNameCheck = profileSchema.shape.displayName.safeParse(data.displayName)
  const error = displayNameCheck.success || !data.displayName
    ? undefined
    : displayNameCheck.error.issues[0]?.message

  return (
    <section>
      <h1 className="text-3xl font-bold text-white">Build your agent profile</h1>
      <p className="mt-2 text-slate-400">This is how your squad will know you.</p>
      <div className="mt-7 space-y-5">
        <label className="block text-sm font-medium text-slate-200">
          Display name
          <input
            autoComplete="name"
            value={data.displayName}
            onChange={e => updateData({ displayName: e.target.value })}
            className="mt-2 w-full rounded-xl border border-slate-700 bg-base-950 px-4 py-3 text-white outline-none focus:border-cyber-blue"
            placeholder="Ada Lovelace"
          />
        </label>
        {error && <ErrorBanner message={error} />}
        <label className="block text-sm font-medium text-slate-200">
          Username
          <input
            autoComplete="username"
            value={data.username}
            onChange={e => updateData({ username: e.target.value.toLowerCase() })}
            className="mt-2 w-full rounded-xl border border-slate-700 bg-base-950 px-4 py-3 text-white outline-none focus:border-cyber-blue"
            placeholder="agent_ada"
          />
        </label>
        {usernameState === 'checking' && (
          <p className="text-sm text-slate-400">Checking callsign…</p>
        )}
        {usernameState === 'available' && (
          <p className="text-sm text-cyber-green">✓ Callsign is available</p>
        )}
        {usernameState === 'taken' && (
          <ErrorBanner message="That callsign is already in use." />
        )}
        <div>
          <label htmlFor="country-selector" className="block text-sm font-medium text-slate-200">
            Country
          </label>
          <CountrySelector
            id="country-selector"
            value={data.country}
            onChange={code => updateData({ country: code })}
          />
        </div>
        {data.avatarUrl && (
          <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-base-900 p-3">
            <img src={data.avatarUrl} alt="Your Google avatar" className="h-10 w-10 rounded-full" />
            <span className="text-sm text-slate-400">Google avatar linked</span>
          </div>
        )}
      </div>
    </section>
  )
}
