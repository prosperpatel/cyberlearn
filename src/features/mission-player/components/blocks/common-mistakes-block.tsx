import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { StandardBlock } from '@/types/mission-engine'

interface Mistake {
  title:       string
  wrong:       string
  right:       string
  explanation: string
  severity:    'warning' | 'critical'
  example?:    string
}

interface CommonMistakesContent {
  intro?:    string
  mistakes?: Mistake[]
}

export function CommonMistakesBlock({ block }: { block: StandardBlock }) {
  const c        = block.content as CommonMistakesContent
  const intro    = c.intro    ?? ''
  const mistakes = c.mistakes ?? []

  return (
    <div className="rounded-xl border border-red-500/30 bg-base-900 overflow-hidden">
      <div className="h-1.5 w-full bg-gradient-to-r from-red-500 to-red-500/20" />

      <div className="px-5 sm:px-8 py-6 space-y-5">
        {/* Header */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-md bg-red-500/10 border border-red-500/20 px-2 py-0.5 text-xs font-black uppercase tracking-widest text-red-400 font-mono">
            <AlertTriangle className="size-3" />
            Common Mistakes
          </span>
          <span className="text-xs text-muted-foreground ml-auto">~{block.metadata.estimatedMinutes}min</span>
        </div>

        {intro && <p className="text-base text-muted-foreground leading-relaxed">{intro}</p>}

        {/* Mistake cards */}
        <div className="space-y-4">
          {mistakes.map((m, i) => (
            <div key={i} className={cn(
              'rounded-xl border overflow-hidden',
              m.severity === 'critical' ? 'border-red-500/40' : 'border-orange-500/30',
            )}>
              {/* Card header */}
              <div className={cn(
                'flex items-center gap-2 px-4 py-2.5',
                m.severity === 'critical' ? 'bg-red-500/10' : 'bg-orange-500/8',
              )}>
                <AlertTriangle className={cn(
                  'size-3.5 shrink-0',
                  m.severity === 'critical' ? 'text-red-400' : 'text-orange-400',
                )} />
                <span className="text-base font-semibold text-foreground flex-1">{m.title}</span>
                <span className={cn(
                  'text-xs font-black uppercase tracking-wider font-mono px-1.5 py-0.5 rounded',
                  m.severity === 'critical'
                    ? 'bg-red-500/20 text-red-400 ring-1 ring-red-500/30 animate-pulse'
                    : 'bg-orange-500/20 text-orange-400',
                )}>
                  {m.severity}
                </span>
              </div>

              {/* Wrong vs right */}
              <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border/40">
                <div className="flex items-start gap-2.5 p-4 bg-red-500/5">
                  <XCircle className="size-4 shrink-0 mt-0.5 text-red-400/70" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-red-400/70 mb-1">Don't</p>
                    <p className="text-base text-foreground/85 leading-relaxed italic">{m.wrong}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-4 bg-green-500/5">
                  <CheckCircle2 className="size-4 shrink-0 mt-0.5 text-green-400/70" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-green-400/70 mb-1">Do</p>
                    <p className="text-base text-foreground/85 leading-relaxed">{m.right}</p>
                  </div>
                </div>
              </div>

              {/* Explanation */}
              <div className="px-4 py-3 border-t border-border/40 bg-base-800/30">
                <p className="text-base text-muted-foreground leading-relaxed">{m.explanation}</p>
                {m.example && (
                  <p className="mt-2 text-sm text-muted-foreground/60 italic">{m.example}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
