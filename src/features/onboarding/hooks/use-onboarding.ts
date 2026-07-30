import { useEffect, useState } from 'react'
import { emptyOnboardingData, type OnboardingData } from '../types/profile'

const storageKey = (userId: string) => `cyberlearn:onboarding:${userId}`

export function useOnboarding(userId: string, defaults: Partial<OnboardingData>) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<OnboardingData>({ ...emptyOnboardingData, ...defaults })

  useEffect(() => {
    const stored = localStorage.getItem(storageKey(userId))
    if (!stored) return
    try {
      const parsed = JSON.parse(stored) as { step?: number; data?: OnboardingData }
      if (parsed.step) setStep(Math.min(7, Math.max(1, parsed.step)))
      if (parsed.data) setData(v => ({ ...v, ...parsed.data }))
    } catch {
      localStorage.removeItem(storageKey(userId))
    }
  }, [userId])

  useEffect(() => {
    localStorage.setItem(storageKey(userId), JSON.stringify({ step, data }))
  }, [userId, step, data])

  return {
    step,
    setStep,
    data,
    updateData: (values: Partial<OnboardingData>) => setData(v => ({ ...v, ...values })),
    clear: () => localStorage.removeItem(storageKey(userId)),
  }
}
