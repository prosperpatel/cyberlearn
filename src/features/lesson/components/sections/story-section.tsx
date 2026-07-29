import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import type { StorySection } from '@/types/lesson-engine'

interface Props { section: StorySection }

const MOOD_STYLES = {
  neutral:   { label: '' },
  tense:     { label: '⚠️ Tense' },
  discovery: { label: '🔍 Discovery' },
  triumph:   { label: '✅ Triumph' },
  warning:   { label: '🚨 Warning' },
} as const

const TIMELINE_STYLES = {
  normal: {
    dot:           'bg-muted-foreground ring-muted-foreground/20',
    line:          'from-border',
    cardBorder:    'border-border',
    cardBg:        'bg-base-800/40',
    timestampBg:   'bg-base-700',
    timestampText: 'text-muted-foreground',
    label:         '',
    leftBar:       'bg-border',
  },
  critical: {
    dot:           'bg-cyber-red ring-cyber-red/25',
    line:          'from-cyber-red/50',
    cardBorder:    'border-cyber-red/25',
    cardBg:        'bg-cyber-red/5',
    timestampBg:   'bg-cyber-red/15',
    timestampText: 'text-cyber-red',
    label:         'CRITICAL',
    leftBar:       'bg-cyber-red/40',
  },
  resolution: {
    dot:           'bg-cyber-green ring-cyber-green/25',
    line:          'from-cyber-green/50',
    cardBorder:    'border-cyber-green/25',
    cardBg:        'bg-cyber-green/5',
    timestampBg:   'bg-cyber-green/15',
    timestampText: 'text-cyber-green',
    label:         'RESOLVED',
    leftBar:       'bg-cyber-green/40',
  },
}

export function StorySectionRenderer({ section }: Props) {
  const mood     = MOOD_STYLES[section.mood ?? 'neutral']
  const hasWide  = (section.timeline?.length ?? 0) > 0

  return (
    <div className={cn(
      'mx-auto px-6 sm:px-8 py-14 sm:py-20 space-y-14',
      hasWide ? 'max-w-[960px]' : 'max-w-[820px]',
    )}>

      {/* Mood label */}
      {mood.label && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-mono text-muted-foreground tracking-widest"
        >
          {mood.label}
        </motion.div>
      )}

      {/* Narrative paragraphs */}
      <div className="space-y-8">
        {section.narrative.map((paragraph, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
            className={cn(
              'leading-[1.85] text-foreground',
              i === 0
                ? 'text-xl sm:text-2xl font-medium text-foreground/90'
                : 'text-[1.0625rem] text-foreground/85',
            )}
          >
            {paragraph}
          </motion.p>
        ))}
      </div>

      {/* Pull quote */}
      {section.quote && (
        <motion.blockquote
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="relative border-l-4 border-primary pl-8 py-3 my-2"
        >
          <Quote className="absolute top-2 left-6 size-10 text-primary/10 -translate-y-1" aria-hidden />
          <p className="text-xl sm:text-2xl font-medium italic text-foreground leading-relaxed">
            "{section.quote.text}"
          </p>
          {section.quote.attribution && (
            <footer className="mt-3 text-sm text-muted-foreground not-italic font-mono">
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
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            People in this story
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {section.characters.map((char, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.06 }}
              >
                <Card variant="flat" className="p-4 flex items-start gap-4 hover:bg-base-700/50 transition-colors">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-base-700 text-2xl">
                    {char.emoji ?? '👤'}
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <p className="font-bold text-sm text-foreground">{char.name}</p>
                    <p className="text-xs text-primary font-mono font-semibold">{char.role}</p>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed line-clamp-3">
                      {char.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Timeline ── premium cards */}
      {section.timeline && section.timeline.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-5"
        >
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            Timeline of events
          </h3>

          <div className="relative">
            {/* Vertical connecting line */}
            <div
              className="absolute left-[9px] top-5 bottom-5 w-px bg-gradient-to-b from-border via-border to-transparent"
              aria-hidden
            />

            <div className="space-y-4">
              {section.timeline.map((event, i) => {
                const style  = TIMELINE_STYLES[event.type ?? 'normal']
                const isLast = i === section.timeline!.length - 1

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.35 + i * 0.09 }}
                    className="relative flex gap-5 sm:gap-6"
                  >
                    {/* Dot */}
                    <div className="relative z-10 flex-shrink-0 mt-5">
                      <div className={cn(
                        'size-[18px] rounded-full ring-4 ring-background',
                        style.dot,
                      )} />
                    </div>

                    {/* Card */}
                    <div className={cn(
                      'flex-1 min-w-0 rounded-xl border overflow-hidden',
                      'transition-all duration-200',
                      style.cardBorder,
                      style.cardBg,
                      !isLast && 'mb-0',
                    )}>
                      {/* Left colored bar */}
                      <div className="flex">
                        <div className={cn('w-0.5 shrink-0', style.leftBar)} />

                        <div className="flex-1 p-5 sm:p-7 space-y-3">
                          {/* Timestamp + label row */}
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <span className={cn(
                              'inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-mono font-bold',
                              style.timestampBg, style.timestampText,
                            )}>
                              {event.timestamp}
                            </span>
                            {style.label && (
                              <span className={cn(
                                'text-[9px] font-black uppercase tracking-[0.2em] px-1.5 py-0.5 rounded',
                                style.timestampBg, style.timestampText, 'opacity-80',
                              )}>
                                {style.label}
                              </span>
                            )}
                          </div>

                          {/* Event title */}
                          <h4 className="font-bold text-base text-foreground leading-snug">
                            {event.event}
                          </h4>

                          {/* Detail */}
                          {event.detail && (
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {event.detail}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
