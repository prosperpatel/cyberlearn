import { useState } from 'react'
import { AlertTriangle, Briefcase, ChevronDown } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { StandardBlock } from '@/types/mission-engine'

interface ImpactStat { value: string; label: string }

interface CaseStudyContent {
  company?:        string
  year?:           string
  industry?:       string
  incident?:       string
  whatHappened?:   string[]
  whyItHappened?:  string[]
  lessonsLearned?: string[]
  impactStats?:    ImpactStat[]
}

function twoWords(s: string): string {
  return s.split(/\s+/).slice(0, 2).join(' ')
}

export function CaseStudyBlock({ block }: { block: StandardBlock }) {
  const reducedMotion = useReducedMotion()
  const [open, setOpen] = useState<'what' | 'why' | 'lessons' | null>('what')
  const [hoveredDot, setHoveredDot] = useState<number | null>(null)
  const c = block.content as CaseStudyContent

  const company       = c.company        ?? 'Unknown Company'
  const year          = c.year           ?? ''
  const industry      = c.industry       ?? ''
  const incident      = c.incident       ?? ''
  const whatHappened  = c.whatHappened   ?? []
  const whyItHappened = c.whyItHappened  ?? []
  const lessons       = c.lessonsLearned ?? []
  const stats         = c.impactStats    ?? []

  const sections = [
    { key: 'what'    as const, label: 'What Happened',   items: whatHappened,  dot: 'bg-orange-500', index: 0 },
    { key: 'why'     as const, label: 'Why It Happened', items: whyItHappened, dot: 'bg-red-500',    index: 1 },
    { key: 'lessons' as const, label: 'Lessons Learned', items: lessons,       dot: 'bg-green-500',  index: 2 },
  ]

  const timelineEvents = whatHappened
  const n = timelineEvents.length

  return (
    <div className="rounded-xl border border-orange-500/30 bg-base-900 overflow-hidden">
      <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 to-orange-500/20" />

      <div className="px-5 sm:px-8 py-6 space-y-5">
        {/* Header */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1.5 rounded-md bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 text-xs font-black uppercase tracking-widest text-orange-400 font-mono">
            <Briefcase className="size-3" />
            Case Study
          </span>
          {industry && (
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground border border-border/40 rounded px-1.5 py-0.5">
              {industry}
            </span>
          )}
          {year && <span className="text-xs font-mono text-muted-foreground">{year}</span>}
          <span className="text-xs text-muted-foreground ml-auto">~{block.metadata.estimatedMinutes}min</span>
        </div>

        {/* Company + incident */}
        <div className="space-y-1.5">
          <h2 className="text-xl font-bold text-foreground">{company}</h2>
          {incident && (
            <p className="text-base text-muted-foreground leading-relaxed">{incident}</p>
          )}
        </div>

        {/* Impact stats — animated */}
        {stats.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={reducedMotion ? false : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: reducedMotion ? 0 : i * 0.15, duration: 0.25 }}
                className="rounded-lg bg-orange-500/8 border border-orange-500/20 p-3 text-center"
              >
                <p className="text-3xl font-black text-orange-400 font-mono leading-tight">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{s.label}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Breach timeline bar */}
        {timelineEvents.length > 1 && (
          <div className="space-y-1">
            <p className="text-xs font-black uppercase tracking-wider text-muted-foreground font-mono">
              Breach Timeline
            </p>
            <div className="relative pt-2 pb-8">
              {/* Track background */}
              <div className="relative h-1.5 bg-base-700 rounded-full w-full overflow-hidden">
                {/* Animated fill */}
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-500/70 to-orange-500/20 rounded-full"
                  initial={reducedMotion ? false : { scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  style={{ width: '100%' }}
                />
              </div>

              {/* Event dots */}
              {timelineEvents.map((evt, i) => {
                const pct = n > 1 ? (i / (n - 1)) * 100 : 50
                const isHovered = hoveredDot === i
                return (
                  <div
                    key={i}
                    className="absolute top-0"
                    style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}
                  >
                    <button
                      className="relative focus-visible:outline-none group"
                      onMouseEnter={() => setHoveredDot(i)}
                      onMouseLeave={() => setHoveredDot(null)}
                      onFocus={() => setHoveredDot(i)}
                      onBlur={() => setHoveredDot(null)}
                      aria-label={`Event ${i + 1}: ${twoWords(evt)}`}
                    >
                      <div className={cn(
                        'size-3.5 rounded-full border-2 border-base-900 transition-all duration-200',
                        isHovered
                          ? 'bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.5)] scale-110'
                          : 'bg-orange-500',
                      )} />
                    </button>
                    <p className={cn(
                      'absolute top-6 text-[9px] font-mono text-muted-foreground/50 text-center whitespace-nowrap',
                      'max-w-[60px] overflow-hidden text-ellipsis',
                      isHovered && 'text-orange-400/70',
                    )}
                    style={{ left: '50%', transform: 'translateX(-50%)' }}
                    >
                      {twoWords(evt)}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Accordion sections */}
        <div className="space-y-2">
          {sections.map((sec) => (
            <div key={sec.key} className="rounded-lg border border-border/50 overflow-hidden">
              <button
                onClick={() => setOpen(open === sec.key ? null : sec.key)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-base-800/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40"
              >
                <span className={cn('size-2 rounded-full shrink-0', sec.dot)} />
                <span className="text-base font-semibold text-foreground flex-1">{sec.label}</span>
                <ChevronDown className={cn(
                  'size-4 text-muted-foreground transition-transform duration-200',
                  open === sec.key && 'rotate-180',
                )} />
              </button>
              {open === sec.key && (
                <div className="px-4 pb-4 pt-1 space-y-2 border-t border-border/40">
                  {sec.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-base text-foreground/85">
                      <AlertTriangle className="size-3.5 shrink-0 mt-1 text-orange-400/60" />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
