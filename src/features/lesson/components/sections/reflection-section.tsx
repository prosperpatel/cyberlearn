import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { PenLine, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ReflectionSection } from '@/types/lesson-engine'

interface Props {
  section:    ReflectionSection
  savedNote?: string
  onSave?:   (text: string) => void
}

export function ReflectionSectionRenderer({ section, savedNote = '', onSave }: Props) {
  const [note, setNote] = useState(savedNote)
  const [saved, setSaved] = useState(false)

  const wordCount = note.trim().split(/\s+/).filter(Boolean).length
  const minWords  = section.minWords ?? 0
  const hasEnough = wordCount >= minWords

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value)
    setSaved(false)
    onSave?.(e.target.value)
    // Debounced "saved" indicator
    setSaved(false)
  }, [onSave])

  function handleSave() {
    onSave?.(note)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <div className="flex items-center gap-2 text-foreground">
          <PenLine className="size-5 text-primary" />
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground font-mono">
            Reflection
          </span>
        </div>
        <h2 className="text-xl font-bold text-foreground">
          Take a moment. Think about what you just learned.
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Reflection deepens understanding. Your notes are saved locally and private.
        </p>
      </motion.div>

      {/* Prompts */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-2"
      >
        {section.prompts.map((prompt, i) => (
          <div key={i} className="flex items-start gap-3 text-sm text-foreground">
            <span className="text-primary font-bold shrink-0 font-mono">{i + 1}.</span>
            <span className="leading-relaxed">{prompt}</span>
          </div>
        ))}
      </motion.div>

      {/* Text area */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-2"
      >
        <textarea
          value={note}
          onChange={handleChange}
          placeholder={section.placeholder ?? 'Write your thoughts here...'}
          rows={8}
          className={cn(
            'w-full rounded-xl border bg-base-900 px-4 py-3',
            'text-sm text-foreground leading-relaxed placeholder:text-muted-foreground',
            'resize-none',
            'focus:outline-none focus:border-primary/50 transition-colors',
            'border-border',
          )}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>{wordCount} words</span>
            {minWords > 0 && (
              <span className={cn(hasEnough ? 'text-cyber-green' : 'text-muted-foreground')}>
                / {minWords} minimum
              </span>
            )}
          </div>

          <button
            onClick={handleSave}
            disabled={!note.trim()}
            className={cn(
              'flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-150',
              saved
                ? 'bg-cyber-green/10 text-cyber-green border border-cyber-green/20'
                : 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20',
              !note.trim() && 'opacity-40 cursor-not-allowed',
            )}
          >
            {saved ? (
              <>
                <Check className="size-3" />
                Saved
              </>
            ) : (
              <>
                <PenLine className="size-3" />
                Save note
              </>
            )}
          </button>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xs text-muted-foreground/50 text-center"
      >
        Notes are stored locally in your browser. Only you can see them.
      </motion.p>
    </div>
  )
}
