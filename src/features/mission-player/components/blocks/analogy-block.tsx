import { GitMerge } from 'lucide-react'
import type { StandardBlock } from '@/types/mission-engine'

interface BreakdownRow { realWorld: string; techEquivalent: string }

interface AnalogyContent {
  title?:          string
  realWorldThing?: string
  concept?:        string
  comparison?:     string
  breakdown?:      BreakdownRow[]
}

export function AnalogyBlock({ block }: { block: StandardBlock }) {
  const c              = block.content as AnalogyContent
  const title          = c.title          ?? block.title
  const realWorldThing = c.realWorldThing ?? ''
  const concept        = c.concept        ?? ''
  const comparison     = c.comparison     ?? ''
  const breakdown      = c.breakdown      ?? []

  return (
    <div className="rounded-xl border border-blue-500/30 bg-base-900 overflow-hidden">
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-blue-500/20" />

      <div className="px-5 sm:px-8 py-6 space-y-5">
        {/* Header */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-md bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-xs font-black uppercase tracking-widest text-blue-400 font-mono">
            <GitMerge className="size-3" />
            Analogy
          </span>
          <span className="text-xs text-muted-foreground ml-auto">~{block.metadata.estimatedMinutes}min</span>
        </div>

        {title && <h2 className="text-xl font-bold text-foreground">{title}</h2>}

        {/* Parallel concepts */}
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-lg bg-base-800/60 border border-border/40 p-4 space-y-1.5">
            <p className="text-xs font-black uppercase tracking-widest text-blue-400 font-mono">Real World</p>
            <p className="text-base text-foreground/90 leading-relaxed">{realWorldThing}</p>
          </div>
          <div className="rounded-lg bg-base-800/60 border border-blue-500/20 p-4 space-y-1.5">
            <p className="text-xs font-black uppercase tracking-widest text-blue-400 font-mono">In Security</p>
            <p className="text-base text-foreground/90 leading-relaxed">{concept}</p>
          </div>
        </div>

        {/* Bridge */}
        {comparison && (
          <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4 text-base text-foreground/90 leading-relaxed">
            {comparison}
          </div>
        )}

        {/* Breakdown table */}
        {breakdown.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-black uppercase tracking-wider text-muted-foreground font-mono">
              Side by Side
            </p>
            <div className="rounded-lg border border-border/50 overflow-hidden">
              {/* Column headers */}
              <div className="grid grid-cols-2 bg-base-800/60">
                <div className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground border-r border-border/40">
                  Real World
                </div>
                <div className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-400">
                  Security Equivalent
                </div>
              </div>
              {breakdown.map((row, i) => (
                <div key={i} className="grid grid-cols-2 border-t border-border/40 hover:bg-base-800/20 transition-colors">
                  <div className="px-4 py-3 text-base text-muted-foreground leading-relaxed border-r border-border/40">
                    {row.realWorld}
                  </div>
                  <div className="px-4 py-3 text-base text-foreground/90 leading-relaxed">
                    {row.techEquivalent}
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
