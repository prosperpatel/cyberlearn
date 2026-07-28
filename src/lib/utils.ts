import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind classes safely — the standard cn() pattern from shadcn */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Format large numbers: 1200 → "1.2K", 1500000 → "1.5M" */
export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

/** Format XP with commas: 12500 → "12,500 XP" */
export function formatXP(xp: number): string {
  return `${xp.toLocaleString()} XP`
}

/** Format duration in minutes to human-readable: 90 → "1h 30m" */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}

/** Clamp a value between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/** Calculate percentage safely (handles division by zero) */
export function percent(value: number, total: number): number {
  if (total === 0) return 0
  return clamp(Math.round((value / total) * 100), 0, 100)
}

/** Generate initials from a display name: "Alice Bob" → "AB" */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}

/** Determine difficulty color class */
export function difficultyColor(difficulty: string): string {
  const map: Record<string, string> = {
    beginner:     'text-cyber-green',
    intermediate: 'text-cyber-blue',
    advanced:     'text-cyber-orange',
    expert:       'text-cyber-red',
  }
  return map[difficulty] ?? 'text-muted-foreground'
}

/** Determine difficulty badge variant */
export function difficultyVariant(difficulty: string) {
  const map: Record<string, string> = {
    beginner:     'success',
    intermediate: 'primary',
    advanced:     'warning',
    expert:       'danger',
  }
  return (map[difficulty] ?? 'default') as 'success' | 'primary' | 'warning' | 'danger' | 'default'
}

/** Sleep for ms milliseconds (useful in animations/demos) */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** Truncate text to maxLength with ellipsis */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength).trim()}…`
}
