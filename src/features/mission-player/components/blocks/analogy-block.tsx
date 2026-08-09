import { GitMerge, Building2, Droplets, Scale, FileText, Shield, Network, Flame, Lock, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { StandardBlock } from '@/types/mission-engine'
import type { LucideIcon } from 'lucide-react'

interface BreakdownRow { realWorld: string; techEquivalent: string }

interface AnalogyContent {
  title?:          string
  realWorldThing?: string
  concept?:        string
  comparison?:     string
  breakdown?:      BreakdownRow[]
}

const ROW_ICONS: LucideIcon[] = [Flame, Droplets, Scale, FileText, Shield, Network, Lock, Zap, Building2]

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
            <div className="flex items-center gap-1.5">
              <Building2 className="size-3 text-muted-foreground/50" />
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground font-mono">Real World</p>
            </div>
            <p className="text-base text-foreground/90 leading-relaxed">{realWorldThing}</p>
          </div>
          <div className="rounded-lg bg-base-800/60 border border-blue-500/20 p-4 space-y-1.5">
            <div className="flex items-center gap-1.5">
              <Shield className="size-3 text-blue-400/60" />
              <p className="text-xs font-black uppercase tracking-widest text-blue-400 font-mono">In Security</p>
            </div>
            <p className="text-base text-foreground/90 leading-relaxed">{concept}</p>
          </div>
        </div>

        {/* Bridge */}
        {comparison && (
          <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4 text-base text-foreground/90 leading-relaxed">
            {comparison}
          </div>
        )}

        {/* Visual breakdown rows */}
        {breakdown.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-black uppercase tracking-wider text-muted-foreground font-mono">
              Side by Side
            </p>
            <div className="rounded-xl border border-border/50 overflow-hidden divide-y divide-border/40">
              {/* Column headers */}
              <div className="grid grid-cols-[1fr_auto_1fr] gap-x-3 bg-base-800/60 px-4 py-2 items-center">
                <div className="flex items-center gap-1.5">
                  <Building2 className="size-3 text-muted-foreground/50" />
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Real World</span>
                </div>
                <span className="text-blue-500/20 font-mono text-sm select-none">≡</span>
                <div className="flex items-center gap-1.5">
                  <Shield className="size-3 text-blue-400/60" />
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Security</span>
                </div>
              </div>

              {breakdown.map((row, i) => {
                const Icon = ROW_ICONS[i % ROW_ICONS.length]
                return (
                  <div
                    key={i}
                    className={cn(
                      'grid grid-cols-[1fr_auto_1fr] gap-x-3 px-4 py-3 items-start',
                      'hover:bg-base-800/20 transition-colors',
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <Icon className="size-3.5 text-muted-foreground/40 shrink-0 mt-1" />
                      <span className="text-base text-muted-foreground leading-relaxed">{row.realWorld}</span>
                    </div>
                    <span className="text-blue-500/30 font-mono text-sm select-none pt-0.5">≡</span>
                    <span className="text-base text-foreground/90 leading-relaxed">{row.techEquivalent}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
