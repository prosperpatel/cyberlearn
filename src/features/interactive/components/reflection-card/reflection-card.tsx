import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Save, CheckCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ReflectionCardProps } from '../../types'

function countWords(s: string): number {
  return s.trim().split(/\s+/).filter(Boolean).length
}

function loadFromStorage(key: string): Record<string, string> {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as Record<string, string>) : {}
  } catch {
    return {}
  }
}

export const ReflectionCard = memo(function ReflectionCard({
  title      = 'Reflection',
  prompts,
  storageKey,
  minWords   = 0,
  onSave,
  className,
}: ReflectionCardProps) {
  const [notes, setNotes]     = useState<Record<string, string>>(() =>
    storageKey ? loadFromStorage(storageKey) : {},
  )
  const [saved, setSaved]     = useState(false)
  const autoSaveRef           = useRef<ReturnType<typeof setTimeout> | null>(null)

  const totalWords = Object.values(notes).reduce((sum, v) => sum + countWords(v), 0)
  const meetsMin   = totalWords >= minWords

  const persist = useCallback(
    (latest: Record<string, string>) => {
      if (storageKey) {
        try { localStorage.setItem(storageKey, JSON.stringify(latest)) } catch {}
      }
    },
    [storageKey],
  )

  const handleChange = (id: string, value: string) => {
    const next = { ...notes, [id]: value }
    setNotes(next)
    setSaved(false)

    if (autoSaveRef.current) clearTimeout(autoSaveRef.current)
    autoSaveRef.current = setTimeout(() => {
      persist(next)
    }, 800)
  }

  const handleSave = () => {
    persist(notes)
    onSave?.(notes)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  useEffect(() => () => {
    if (autoSaveRef.current) clearTimeout(autoSaveRef.current)
  }, [])

  return (
    <div
      className={cn('rounded-2xl border border-border bg-card p-5 space-y-5', className)}
      role="form"
      aria-label={title}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-foreground">{title}</h3>
        {minWords > 0 && (
          <span
            className={cn(
              'text-xs font-medium tabular-nums',
              meetsMin ? 'text-emerald-400' : 'text-muted-foreground',
            )}
          >
            {totalWords}/{minWords} words
          </span>
        )}
      </div>

      <div className="space-y-4">
        {prompts.map((prompt) => (
          <div key={prompt.id} className="space-y-1.5">
            <label
              htmlFor={`reflection-${prompt.id}`}
              className="text-sm font-medium text-foreground/90"
            >
              {prompt.text}
            </label>
            <textarea
              id={`reflection-${prompt.id}`}
              value={notes[prompt.id] ?? ''}
              onChange={(e) => handleChange(prompt.id, e.target.value)}
              placeholder={prompt.placeholder ?? 'Write your thoughts here…'}
              rows={4}
              className={cn(
                'w-full resize-y rounded-lg border border-border bg-background/60',
                'px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground',
                'focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow',
              )}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-1">
        {storageKey && (
          <span className="text-xs text-muted-foreground">Auto-saved to your browser</span>
        )}
        <motion.button
          onClick={handleSave}
          disabled={!meetsMin}
          whileTap={{ scale: 0.97 }}
          className={cn(
            'ml-auto flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-sm font-semibold transition-colors',
            meetsMin
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : 'bg-muted text-muted-foreground cursor-not-allowed',
          )}
          aria-label="Save reflection"
        >
          {saved
            ? <><CheckCheck className="size-3.5" /> Saved</>
            : <><Save className="size-3.5" /> Save</>}
        </motion.button>
      </div>
    </div>
  )
})
