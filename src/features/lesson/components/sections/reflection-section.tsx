import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { PenLine, Check, Lightbulb } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ReflectionSection } from '@/types/lesson-engine'

interface Props {
  section:    ReflectionSection
  savedNote?: string
  onSave?:   (text: string) => void
}

export function ReflectionSectionRenderer({ section, savedNote = '', onSave }: Props) {
  const [note, setNote]   = useState(savedNote)
  const [saved, setSaved] = useState(false)

  const wordCount = note.trim().split(/\s+/).filter(Boolean).length
  const minWords  = section.minWords ?? 0
  const hasEnough = wordCount >= minWords

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value)
    setSaved(false)
    onSave?.(e.target.value)
  }, [onSave])

  function handleSave() {
    onSave?.(note)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="max-w-[820px] mx-auto px-6 sm:px-8 py-14 sm:py-20 space-y-10">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary/12">
            <PenLine className="size-4 text-primary" />
          </div>
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-muted-foreground font-mono">
            Reflection
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-foreground leading-tight">
          Take a moment.<br className="hidden sm:block" /> Think about what you just learned.
        </h2>
        <p className="text-[1.0625rem] text-muted-foreground leading-[1.8]">
          Reflection deepens understanding. Your notes are saved locally and private.
        </p>
      </motion.div>

      {/* Prompts */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border border-border bg-base-800/50 p-5 sm:p-6 space-y-3"
      >
        <div className="flex items-center gap-2 text-muted-foreground mb-1">
          <Lightbulb className="size-3.5" />
          <span className="text-[11px] font-bold uppercase tracking-widest">Reflection prompts</span>
        </div>
        {section.prompts.map((prompt, i) => (
          <div key={i} className="flex items-start gap-3 text-[1.0625rem] text-foreground">
            <span className="text-primary font-bold shrink-0 font-mono text-sm mt-0.5">{i + 1}.</span>
            <span className="leading-[1.75]">{prompt}</span>
          </div>
        ))}
      </motion.div>

      {/* Text area */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-3"
      >
        <textarea
          value={note}
          onChange={handleChange}
          placeholder={section.placeholder ?? 'Write your thoughts here…'}
          rows={9}
          className={cn(
            'w-full rounded-xl border bg-base-900 px-5 py-4',
            'text-[1.0625rem] text-foreground leading-[1.85] placeholder:text-muted-foreground/50',
            'resize-none',
            'focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all',
            'border-border',
          )}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
            <span>{wordCount} {wordCount === 1 ? 'word' : 'words'}</span>
            {minWords > 0 && (
              <span className={cn(
                'font-bold transition-colors',
                hasEnough ? 'text-cyber-green' : 'text-muted-foreground/50',
              )}>
                / {minWords} minimum
              </span>
            )}
          </div>

          <button
            onClick={handleSave}
            disabled={!note.trim()}
            className={cn(
              'flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-200',
              saved
                ? 'bg-cyber-green/12 text-cyber-green border border-cyber-green/25'
                : 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary/18',
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
        className="text-xs text-muted-foreground/40 text-center"
      >
        Notes are stored locally in your browser. Only you can see them.
      </motion.p>
    </div>
  )
}
