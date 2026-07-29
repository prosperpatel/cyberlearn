import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { engineBus } from '../event-bus/event-bus'
import { useProgressStore } from '../save/progress-store'
import {
  DEFAULT_ACCESSIBILITY,
  resolveReducedMotion,
  type AccessibilitySettings,
} from './types'

// ── Context ───────────────────────────────────────────────────────────

interface AccessibilityContextValue {
  settings: AccessibilitySettings
  /** Resolved `reducedMotion` value — always a concrete boolean. */
  reducedMotion: boolean
  update: <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K],
  ) => void
}

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null)

// ── Provider ──────────────────────────────────────────────────────────

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const setAccessibility = useProgressStore((s) => s.setAccessibility)
  const savedSettings    = useProgressStore((s) => s.save.settings.accessibility)

  // Merge saved settings on top of defaults (handles partial saves from older versions)
  const [settings, setSettings] = useState<AccessibilitySettings>({
    ...DEFAULT_ACCESSIBILITY,
    ...savedSettings,
  })

  // Sync OS reduced-motion preference — re-evaluate when it changes
  useEffect(() => {
    if (settings.reducedMotion !== 'system') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = () => setSettings((s) => ({ ...s })) // trigger re-render
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [settings.reducedMotion])

  // Apply font scale and high-contrast to <html>
  useEffect(() => {
    document.documentElement.style.fontSize = `${settings.fontScale * 100}%`
    document.documentElement.classList.toggle('high-contrast', settings.highContrast)
  }, [settings.fontScale, settings.highContrast])

  const update = useCallback(
    <K extends keyof AccessibilitySettings>(
      key: K,
      value: AccessibilitySettings[K],
    ) => {
      setSettings((prev) => {
        const next = { ...prev, [key]: value }
        setAccessibility(next)
        engineBus.emit('accessibility:change', { setting: key, value })
        return next
      })
    },
    [setAccessibility],
  )

  const reducedMotion = useMemo(
    () => resolveReducedMotion(settings.reducedMotion),
    [settings.reducedMotion],
  )

  const value = useMemo(
    () => ({ settings, reducedMotion, update }),
    [settings, reducedMotion, update],
  )

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  )
}

// ── Hook ──────────────────────────────────────────────────────────────

/** Access accessibility settings and the `update` mutator. */
export function useAccessibility(): AccessibilityContextValue {
  const ctx = useContext(AccessibilityContext)
  if (!ctx) {
    throw new Error('useAccessibility must be used inside <AccessibilityProvider>')
  }
  return ctx
}
