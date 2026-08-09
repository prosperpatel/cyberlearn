import { BookOpen } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { StandardBlock } from '@/types/mission-engine'

interface Character {
  name:        string
  role:        string
  description: string
  emoji?:      string
}

interface StoryContent {
  narrative?:  string[]
  characters?: Character[]
  mood?:       'neutral' | 'tense' | 'discovery' | 'triumph' | 'warning'
}

const MOOD_CONFIG: Record<string, { label: string; badge: string; dot: string; line: string }> = {
  tense:     { label: 'Tense',     badge: 'border-red-500/30 text-red-400',     dot: 'bg-red-500',    line: 'bg-red-500/25'    },
  discovery: { label: 'Discovery', badge: 'border-cyan-500/30 text-cyan-400',   dot: 'bg-cyan-400',   line: 'bg-cyan-400/25'   },
  triumph:   { label: 'Triumph',   badge: 'border-green-500/30 text-green-400', dot: 'bg-green-400',  line: 'bg-green-400/25'  },
  warning:   { label: 'Warning',   badge: 'border-orange-500/30 text-orange-400', dot: 'bg-orange-400', line: 'bg-orange-400/25' },
  neutral:   { label: 'Neutral',   badge: 'border-border text-muted-foreground', dot: 'bg-muted-foreground', line: 'bg-muted/30' },
}

export function StoryBlock({ block }: { block: StandardBlock }) {
  const reducedMotion = useReducedMotion()
  const c              = block.content as StoryContent
  const narrative      = c.narrative  ?? []
  const characters     = c.characters ?? []
  const mood           = c.mood       ?? 'neutral'
  const moodCfg        = MOOD_CONFIG[mood] ?? MOOD_CONFIG.neutral
  const title          = block.title || 'Story'

  return (
    <div className="rounded-xl border border-purple-500/30 bg-base-900 overflow-hidden">
      <div className="h-1.5 w-full bg-gradient-to-r from-purple-500 to-purple-500/20" />

      <div className="px-5 sm:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1.5 rounded-md bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 text-xs font-black uppercase tracking-widest text-purple-400 font-mono">
            <BookOpen className="size-3" />
            Story
          </span>
          <span className={cn('rounded-md border px-2 py-0.5 text-xs font-mono uppercase tracking-wider', moodCfg.badge)}>
            {moodCfg.label}
          </span>
          <span className="text-xs text-muted-foreground ml-auto">~{block.metadata.estimatedMinutes}min</span>
        </div>

        {title && <h2 className="text-xl font-bold text-foreground">{title}</h2>}

        {/* Characters — top intro row */}
        {characters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {characters.map((char, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-lg bg-base-800/40 border border-purple-500/20 px-3 py-2"
              >
                {char.emoji && <span className="text-xl leading-none shrink-0">{char.emoji}</span>}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground leading-none">{char.name}</p>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-purple-400/70 mt-0.5">
                    {char.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cinematic timeline */}
        {narrative.length > 0 && (
          <div className="relative">
            {/* Vertical line */}
            <div className={cn('absolute left-[7px] top-3 bottom-3 w-px', moodCfg.line)} />

            <div className="space-y-4 pl-6">
              {narrative.map((para, i) => (
                <motion.div
                  key={i}
                  initial={reducedMotion ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reducedMotion ? 0 : i * 0.12, duration: 0.28 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <span className={cn(
                    'absolute -left-6 top-3 size-3.5 rounded-full border-2 border-base-900 shrink-0',
                    moodCfg.dot,
                  )} />

                  {/* Beat card */}
                  <div className="rounded-lg bg-base-800/30 border border-border/30 px-4 py-3">
                    <span className="text-[10px] font-mono text-muted-foreground/40 block mb-1">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-base text-foreground leading-loose">{para}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
