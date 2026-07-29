/**
 * Accessibility settings managed by the AccessibilityManager.
 *
 * `reducedMotion: 'system'` means the engine follows the OS preference
 * (`prefers-reduced-motion: reduce`). Setting it to `true` or `false`
 * overrides the system preference.
 */
export interface AccessibilitySettings {
  /** Whether to suppress or simplify animations. */
  reducedMotion: boolean | 'system'
  /** Whether to show dialogue captions. */
  captionsEnabled: boolean
  /** Font scale multiplier applied globally. */
  fontScale: 0.8 | 1 | 1.2 | 1.5
  /** Whether to boost contrast beyond the default dark theme. */
  highContrast: boolean
  /** Whether keyboard navigation hints are visible. */
  keyboardHintsVisible: boolean
}

export const DEFAULT_ACCESSIBILITY: AccessibilitySettings = {
  reducedMotion:       'system',
  captionsEnabled:     false,
  fontScale:           1,
  highContrast:        false,
  keyboardHintsVisible: false,
}

/**
 * Resolves `reducedMotion` to a concrete boolean by reading the OS media
 * query when the value is `'system'`.
 */
export function resolveReducedMotion(setting: boolean | 'system'): boolean {
  if (setting !== 'system') return setting
  return typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false
}
