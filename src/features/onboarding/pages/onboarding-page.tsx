import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/features/auth/context/auth-context'
import { ROUTES } from '@/lib/constants'
import { ActivationModal } from '../components/activation-modal'
import { ChoiceGrid } from '../components/choice-grid'
import { ErrorBanner } from '../components/error-banner'
import { OnboardingProgress } from '../components/onboarding-progress'
import { ProfileStep } from '../components/profile-step'
import { ReviewStep } from '../components/review-step'
import { WelcomeStep } from '../components/welcome-step'
import { useOnboarding } from '../hooks/use-onboarding'
import { ProfileService } from '../services/profile-service'
import {
  DAILY_GOALS,
  EXPERIENCE_LEVELS,
  INTERESTS,
  LEARNING_GOALS,
  type DailyGoal,
  type Experience,
  type Interest,
  type LearningGoal,
} from '../types/profile'
import { profileSchema } from '../utils/validation'

export function OnboardingPage() {
  const { session, refreshUser } = useAuth()
  const supabaseUser = session!.user

  const defaults = {
    displayName: (supabaseUser.user_metadata.full_name as string | undefined) ?? '',
    avatarUrl:   (supabaseUser.user_metadata.avatar_url as string | undefined) ?? '',
  }

  const { step, setStep, data, updateData, clear } = useOnboarding(supabaseUser.id, defaults)
  const [error,     setError]     = useState<string | null>(null)
  const [saving,    setSaving]    = useState(false)
  const [activated, setActivated] = useState(false)
  const navigate = useNavigate()

  const isStepReady = () => {
    if (step === 2) return profileSchema.pick({ displayName: true, username: true, country: true }).safeParse(data).success
    if (step === 3) return Boolean(data.experience)
    if (step === 4) return Boolean(data.goal)
    if (step === 5) return data.interests.length > 0
    if (step === 6) return Boolean(data.dailyGoal)
    return true
  }

  const next = () => {
    setError(null)
    if (!isStepReady()) { setError('Complete the highlighted mission details to continue.'); return }
    setStep(Math.min(7, step + 1))
  }

  const finish = async () => {
    const parsed = profileSchema.safeParse(data)
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Please review your profile.')
      return
    }
    setSaving(true)
    setError(null)
    try {
      const available = await ProfileService.checkUsernameAvailability(parsed.data.username, supabaseUser.id)
      if (!available) {
        setStep(2)
        throw new Error('That callsign was just claimed. Please choose another.')
      }
      await ProfileService.createProfile({
        id:           supabaseUser.id,
        username:     parsed.data.username,
        display_name: parsed.data.displayName,
        avatar_url:   data.avatarUrl || null,
        country:      parsed.data.country,
        experience:   parsed.data.experience,
        goal:         parsed.data.goal,
        interests:    parsed.data.interests,
        daily_goal:   parsed.data.dailyGoal,
      })
      await refreshUser()
      clear()
      setActivated(true)
    } catch (cause) {
      // Supabase query errors are plain objects returned from PostgREST's JSON
      // body — they have { message, code, details, hint } but are NOT Error
      // instances, so `instanceof Error` is always false for them.
      const code    = typeof cause === 'object' && cause !== null && 'code'    in cause ? String((cause as { code: unknown }).code) : ''
      const message = cause instanceof Error
        ? cause.message
        : typeof cause === 'object' && cause !== null && 'message' in cause
          ? String((cause as { message: unknown }).message)
          : 'Profile activation failed. Please try again.'

      if (code === '23505') {
        setStep(2)
        setError('That callsign was just claimed. Please choose another.')
      } else {
        setError(message)
      }
    } finally {
      setSaving(false)
    }
  }

  const body =
    step === 1 ? <WelcomeStep /> :
    step === 2 ? <ProfileStep data={data} updateData={updateData} userId={supabaseUser.id} /> :
    step === 3 ? <Picker title="What's your current experience?" subtitle="We'll calibrate your learning path." options={EXPERIENCE_LEVELS} value={data.experience} onChange={v => updateData({ experience: v as Experience })} /> :
    step === 4 ? <Picker title="Choose your primary mission" subtitle="You can adapt your path at any time." options={LEARNING_GOALS} value={data.goal} onChange={v => updateData({ goal: v as LearningGoal })} /> :
    step === 5 ? <Picker title="Select your focus areas" subtitle="Choose one or more disciplines." options={INTERESTS} value={data.interests} multi onChange={v => updateData({ interests: v as Interest[] })} /> :
    step === 6 ? <Picker title="Set a sustainable pace" subtitle="Consistency outperforms intensity." options={DAILY_GOALS} value={data.dailyGoal} onChange={v => updateData({ dailyGoal: v as DailyGoal })} render={v => `${v} min`} /> :
    <ReviewStep data={data} />

  return (
    <main className="min-h-screen bg-base-950 bg-[radial-gradient(circle_at_50%_-20%,rgba(0,217,255,0.12),transparent_38%)] px-4 py-6 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-8 flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-cyber-blue font-black text-base-950">
            C
          </span>
          <span className="font-bold tracking-widest text-white">CYBERLEARN</span>
        </div>
        {step > 1 && <OnboardingProgress step={step} />}
        <div className="rounded-3xl border border-slate-700/80 bg-base-900/90 p-5 shadow-2xl sm:p-9">
          {body}
          {error && <div className="mt-6"><ErrorBanner message={error} /></div>}
          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            {step > 1 ? (
              <button
                className="rounded-xl px-5 py-3 font-bold text-slate-400 hover:text-white"
                onClick={() => setStep(step - 1)}
              >
                Back
              </button>
            ) : <span />}
            <Button
              onClick={() => step === 7 ? void finish() : next()}
              disabled={saving}
            >
              {saving ? 'Activating…' : step === 1 ? 'Begin Mission' : step === 7 ? 'Complete Profile' : 'Continue'}
            </Button>
          </div>
        </div>
      </div>
      {activated && (
        <ActivationModal onContinue={() => navigate(ROUTES.DASHBOARD, { replace: true })} />
      )}
    </main>
  )
}

function Picker<T extends string | number>({
  title, subtitle, options, value, onChange, multi, render,
}: {
  title:    string
  subtitle: string
  options:  readonly T[]
  value:    T | T[] | undefined
  onChange: (value: T | T[]) => void
  multi?:   boolean
  render?:  (value: T) => string
}) {
  return (
    <section>
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      <p className="mt-2 text-slate-400">{subtitle}</p>
      <div className="mt-7">
        <ChoiceGrid
          options={options}
          value={value}
          onChange={onChange}
          multi={multi}
          render={option => <span className="font-semibold">{render ? render(option) : option}</span>}
        />
      </div>
    </section>
  )
}
