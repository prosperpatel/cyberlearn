import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import type { StorySection } from '@/types/lesson-engine'

interface Props { section: StorySection }

const MOOD_STYLES = {
  neutral:   { accent: 'border-border',          label: '' },
  tense:     { accent: 'border-cyber-red/30',    label: '⚠️ Tense' },
  discovery: { accent: 'border-cyber-blue/30',   label: '🔍 Discovery' },
  triumph:   { accent: 'border-cyber-green/30',  label: '✅ Triumph' },
  warning:   { accent: 'border-cyber-orange/30', label: '🚨 Warning' },
} as const

const TIMELINE_TYPE_STYLES = {
  normal:     { dot: 'bg-muted-foreground', line: 'bg-border' },
  critical:   { dot: 'bg-cyber-red',       line: 'bg-cyber-red/30' },
  resolution: { dot: 'bg-cyber-green',     line: 'bg-cyber-green/30' },
}

export function StorySectionRenderer({ section }: Props) {
  const mood = MOOD_STYLES[section.mood ?? 'neutral']

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-10">
      {/* Mood label */}
      {mood.label && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-mono text-muted-foreground"
        >
          {mood.label}
        </motion.div>
      )}

      {/* Narrative paragraphs */}
      <div className="space-y-6">
        {section.narrative.map((paragraph, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className={cn(
              'text-lg leading-relaxed text-foreground',
              i === 0 && 'text-xl font-medium',
            )}
          >
            {paragraph}
          </motion.p>
        ))}
      </div>

      {/* Pull quote */}
      {section.quote && (
        <motion.blockquote
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative border-l-4 border-primary pl-6 py-2"
        >
          <Quote className="absolute top-0 left-6 size-8 text-primary/20 -translate-y-1" aria-hidden />
          <p className="text-xl font-medium italic text-foreground leading-relaxed">
            "{section.quote.text}"
          </p>
          {section.quote.attribution && (
            <footer className="mt-2 text-sm text-muted-foreground not-italic">
              — {section.quote.attribution}
            </footer>
          )}
        </motion.blockquote>
      )}

      {/* Characters */}
      {section.characters && section.characters.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="space-y-3"
        >
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            People in this story
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {section.characters.map((char, i) => (
              <Card key={i} variant="flat" className="p-4 flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-base-700 text-xl">
                  {char.emoji ?? '👤'}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-foreground">{char.name}</p>
                  <p className="text-xs text-primary font-mono">{char.role}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-3">
                    {char.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      )}

      {/* Timeline */}
      {section.timeline && section.timeline.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="space-y-3"
        >
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Timeline of events
          </h3>
          <div className="relative pl-6 space-y-0">
            {section.timeline.map((event, i) => {
              const style = TIMELINE_TYPE_STYLES[event.type ?? 'normal']
              const isLast = i === section.timeline!.length - 1
              return (
                <div key={i} className="relative flex gap-4">
                  {/* Line */}
                  {!isLast && (
                    <div className={cn('absolute left-0 top-5 w-0.5 h-full', style.line)} />
                  )}
                  {/* Dot */}
                  <div className={cn('absolute left-[-5px] top-2 size-2.5 rounded-full border-2 border-background', style.dot)} />
                  {/* Content */}
                  <div className="pb-6 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold text-muted-foreground">
                        {event.timestamp}
                      </span>
                      <span className="text-sm font-semibold text-foreground">{event.event}</span>
                    </div>
                    {event.detail && (
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        {event.detail}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}
    </div>
  )
}
