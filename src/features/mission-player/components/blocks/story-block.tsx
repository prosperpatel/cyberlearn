import { BookOpen } from 'lucide-react'
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

const MOOD_STYLES: Record<string, { label: string; color: string }> = {
  tense:     { label: 'Tense',     color: 'border-red-500/30 text-red-400'     },
  discovery: { label: 'Discovery', color: 'border-cyan-500/30 text-cyan-400'   },
  triumph:   { label: 'Triumph',   color: 'border-green-500/30 text-green-400' },
  warning:   { label: 'Warning',   color: 'border-orange-500/30 text-orange-400'},
  neutral:   { label: 'Neutral',   color: 'border-border text-muted-foreground' },
}

export function StoryBlock({ block }: { block: StandardBlock }) {
  const c         = block.content as StoryContent
  const narrative  = c.narrative  ?? []
  const characters = c.characters ?? []
  const mood       = c.mood ?? 'neutral'
  const moodStyle  = MOOD_STYLES[mood] ?? MOOD_STYLES.neutral
  const title      = block.title || 'Story'

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
          <span className={cn(
            'rounded-md border px-2 py-0.5 text-xs font-mono uppercase tracking-wider',
            moodStyle.color,
          )}>
            {moodStyle.label}
          </span>
          <span className="text-xs text-muted-foreground ml-auto">~{block.metadata.estimatedMinutes}min</span>
        </div>

        {/* Title */}
        {title && <h2 className="text-xl font-bold text-foreground">{title}</h2>}

        {/* Narrative — stronger left rail, larger text, generous leading */}
        <div className="space-y-5 border-l-4 border-purple-500/50 pl-6">
          {narrative.map((para, i) => (
            <p key={i} className="text-base text-foreground leading-loose">
              {para}
            </p>
          ))}
        </div>

        {/* Characters */}
        {characters.length > 0 && (
          <div className="space-y-3 pt-2 border-t border-border/40">
            <p className="text-xs font-black uppercase tracking-wider text-muted-foreground font-mono">
              Characters
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {characters.map((char, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg bg-base-800/60 border border-border/40 p-3.5">
                  {char.emoji && (
                    <span className="text-2xl shrink-0">{char.emoji}</span>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">{char.name}</p>
                    <p className="text-xs font-mono uppercase tracking-wider text-purple-400/70 mb-1">{char.role}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{char.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
