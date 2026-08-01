import { useState } from 'react'
import { CheckCircle2, Circle, Terminal, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { StandardBlock } from '@/types/mission-engine'

interface MicroPracticalContent {
  objective?:       string
  requirements?:    string[]
  instructions?:    string[]
  successCriteria?: string[]
  reflection?:      string
}

export function MicroPracticalBlock({ block }: { block: StandardBlock }) {
  const c               = block.content as MicroPracticalContent
  const objective       = c.objective       ?? ''
  const requirements    = c.requirements    ?? []
  const instructions    = c.instructions    ?? []
  const successCriteria = c.successCriteria ?? []
  const reflection      = c.reflection      ?? ''

  const [checked,     setChecked]     = useState<Set<number>>(new Set())
  const [isExpanded,  setIsExpanded]  = useState(false)

  function toggle(i: number) {
    setChecked(prev => {
      const next = new Set(prev)
      if (next.has(i)) { next.delete(i) } else { next.add(i) }
      return next
    })
  }

  const allDone = successCriteria.length > 0 && checked.size === successCriteria.length

  return (
    <div className="rounded-xl border border-indigo-500/30 bg-base-900 overflow-hidden">
      <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 to-indigo-500/20" />

      <div className="px-5 sm:px-8 py-6 space-y-5">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="flex items-center gap-1.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-indigo-400 font-mono">
                <Terminal className="size-3" />
                Micro Practical
              </span>
              <span className="text-xs text-muted-foreground">~{block.metadata.estimatedMinutes}min</span>
            </div>
            {block.title && (
              <h2 className="text-base font-bold text-foreground mt-2">{block.title}</h2>
            )}
          </div>
          <button
            onClick={() => setIsExpanded(e => !e)}
            className="shrink-0 flex items-center gap-1 text-xs text-muted-foreground hover:text-indigo-400 transition-colors mt-0.5"
          >
            {isExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </button>
        </div>

        {/* Objective — always visible */}
        {objective && (
          <div className="rounded-lg border border-indigo-500/20 bg-indigo-500/5 px-4 py-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 font-mono mb-1">Objective</p>
            <p className="text-sm text-foreground/90 leading-relaxed">{objective}</p>
          </div>
        )}

        {/* Expandable body */}
        {isExpanded && (
          <div className="space-y-5">
            {/* Requirements */}
            {requirements.length > 0 && (
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 font-mono">Requirements</p>
                <ul className="space-y-1.5">
                  {requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                      <span className="shrink-0 mt-1 size-1.5 rounded-full bg-indigo-500/60" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Instructions */}
            {instructions.length > 0 && (
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 font-mono">Instructions</p>
                <ol className="space-y-2.5">
                  {instructions.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="shrink-0 flex size-5 items-center justify-center rounded-full bg-indigo-500/15 border border-indigo-500/30 text-[10px] font-black font-mono text-indigo-400 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-sm text-foreground/85 leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Success criteria — interactive checklist */}
            {successCriteria.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 font-mono">Success Criteria</p>
                  <span className="text-[10px] font-mono text-muted-foreground">{checked.size}/{successCriteria.length}</span>
                </div>
                <div className="space-y-2">
                  {successCriteria.map((crit, i) => (
                    <button
                      key={i}
                      onClick={() => toggle(i)}
                      className={cn(
                        'w-full flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-all',
                        checked.has(i)
                          ? 'border-indigo-500/40 bg-indigo-500/8 text-foreground/90'
                          : 'border-border/50 bg-base-800/30 text-muted-foreground hover:border-indigo-500/30',
                      )}
                    >
                      {checked.has(i)
                        ? <CheckCircle2 className="size-4 shrink-0 text-indigo-400" />
                        : <Circle className="size-4 shrink-0 text-muted-foreground/40" />
                      }
                      <span className={cn('leading-snug', checked.has(i) && 'line-through opacity-70')}>
                        {crit}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Reflection */}
            {reflection && (
              <div className={cn(
                'rounded-lg border p-4 transition-all',
                allDone
                  ? 'border-indigo-500/40 bg-indigo-500/8'
                  : 'border-border/40 bg-base-800/20 opacity-60',
              )}>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 font-mono mb-2">Reflection</p>
                <p className="text-sm text-foreground/80 leading-relaxed italic">{reflection}</p>
                {!allDone && (
                  <p className="text-[10px] text-muted-foreground/50 mt-2">Complete all criteria to unlock reflection</p>
                )}
              </div>
            )}

            {allDone && (
              <div className="rounded-lg border border-indigo-500/40 bg-indigo-500/8 px-4 py-3 flex items-center gap-2">
                <CheckCircle2 className="size-4 text-indigo-400 shrink-0" />
                <p className="text-sm font-semibold text-indigo-300">Practical complete!</p>
              </div>
            )}
          </div>
        )}

        {/* Collapsed CTA */}
        {!isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="w-full rounded-lg border border-indigo-500/30 bg-indigo-500/5 px-4 py-2.5 text-sm font-semibold text-indigo-400 hover:bg-indigo-500/10 hover:border-indigo-500/50 transition-all"
          >
            Start Practical →
          </button>
        )}
      </div>
    </div>
  )
}
