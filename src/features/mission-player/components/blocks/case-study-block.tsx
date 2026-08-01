import { useState } from 'react'
import { AlertTriangle, Briefcase, ChevronDown } from 'lucide-react'
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

export function CaseStudyBlock({ block }: { block: StandardBlock }) {
  const [open, setOpen] = useState<'what' | 'why' | 'lessons' | null>('what')
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
    { key: 'what'    as const, label: 'What Happened',    items: whatHappened,  dot: 'bg-orange-500' },
    { key: 'why'     as const, label: 'Why It Happened',  items: whyItHappened, dot: 'bg-red-500'    },
    { key: 'lessons' as const, label: 'Lessons Learned',  items: lessons,       dot: 'bg-green-500'  },
  ]

  return (
    <div className="rounded-xl border border-orange-500/30 bg-base-900 overflow-hidden">
      <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 to-orange-500/20" />

      <div className="px-5 sm:px-8 py-6 space-y-5">
        {/* Header */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1.5 rounded-md bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-orange-400 font-mono">
            <Briefcase className="size-3" />
            Case Study
          </span>
          {industry && (
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground border border-border/40 rounded px-1.5 py-0.5">
              {industry}
            </span>
          )}
          {year && <span className="text-[10px] font-mono text-muted-foreground">{year}</span>}
          <span className="text-xs text-muted-foreground ml-auto">~{block.metadata.estimatedMinutes}min</span>
        </div>

        {/* Company + incident */}
        <div className="space-y-1.5">
          <h2 className="text-lg font-bold text-foreground">{company}</h2>
          {incident && (
            <p className="text-sm text-muted-foreground leading-relaxed">{incident}</p>
          )}
        </div>

        {/* Impact stats */}
        {stats.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {stats.map((s, i) => (
              <div key={i} className="rounded-lg bg-orange-500/8 border border-orange-500/20 p-3 text-center">
                <p className="text-xl font-black text-orange-400 font-mono">{s.value}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Accordion sections */}
        <div className="space-y-2">
          {sections.map((sec) => (
            <div key={sec.key} className="rounded-lg border border-border/50 overflow-hidden">
              <button
                onClick={() => setOpen(open === sec.key ? null : sec.key)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-base-800/40 transition-colors"
              >
                <span className={cn('size-2 rounded-full shrink-0', sec.dot)} />
                <span className="text-sm font-semibold text-foreground flex-1">{sec.label}</span>
                <ChevronDown className={cn(
                  'size-4 text-muted-foreground transition-transform duration-200',
                  open === sec.key && 'rotate-180',
                )} />
              </button>
              {open === sec.key && (
                <div className="px-4 pb-4 pt-1 space-y-2 border-t border-border/40">
                  {sec.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <AlertTriangle className="size-3.5 shrink-0 mt-0.5 text-orange-400/60" />
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
