import { Trophy, Zap, ChevronRight, Star } from 'lucide-react'
import type { StandardBlock } from '@/types/mission-engine'

interface BadgeUnlocked { name: string; description?: string }

interface MissionCompleteContent {
  headline?:       string
  message?:        string
  xpEarned?:       number
  badgesUnlocked?: BadgeUnlocked[]
  nextSteps?:      string[]
}

export function MissionCompleteBlock({ block }: { block: StandardBlock }) {
  const c              = block.content as MissionCompleteContent
  const headline       = c.headline       ?? 'Mission Complete'
  const message        = c.message        ?? ''
  const xpEarned       = c.xpEarned       ?? 0
  const badgesUnlocked = c.badgesUnlocked ?? []
  const nextSteps      = c.nextSteps      ?? []

  return (
    <div className="rounded-xl border border-cyber-blue/40 bg-base-900 overflow-hidden">
      <div className="h-1.5 w-full bg-gradient-to-r from-cyber-blue via-cyber-green to-cyber-blue/20" />

      <div className="px-5 sm:px-8 py-8 space-y-6">
        {/* Badge icon + headline */}
        <div className="flex flex-col items-center text-center gap-4">
          <div className="relative">
            <div className="flex size-20 items-center justify-center rounded-full bg-cyber-blue/10 border-2 border-cyber-blue/40 shadow-cyber-sm">
              <Trophy className="size-9 text-cyber-blue" />
            </div>
            <div className="absolute -top-1 -right-1 flex size-6 items-center justify-center rounded-full bg-cyber-green/20 border border-cyber-green/40">
              <Star className="size-3 text-cyber-green" />
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="block text-xs font-black uppercase tracking-[0.25em] text-cyber-blue font-mono">
              Mission Complete
            </span>
            <h2 className="text-2xl font-black text-foreground leading-tight">{headline}</h2>
            {message && (
              <p className="text-base text-muted-foreground leading-relaxed max-w-md">{message}</p>
            )}
          </div>
        </div>

        {/* XP earned */}
        {xpEarned > 0 && (
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyber-green/30 bg-cyber-green/8 px-5 py-2.5">
              <Zap className="size-4 text-cyber-green" />
              <span className="text-xl font-black text-cyber-green">+{xpEarned} XP</span>
              <span className="text-sm text-muted-foreground">earned</span>
            </div>
          </div>
        )}

        {/* Badges */}
        {badgesUnlocked.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-black uppercase tracking-wider text-muted-foreground font-mono text-center">
              Badges Unlocked
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {badgesUnlocked.map((badge, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-lg border border-cyber-blue/25 bg-cyber-blue/8 px-3 py-2"
                >
                  <div className="flex size-7 items-center justify-center rounded-full bg-cyber-blue/15 border border-cyber-blue/30">
                    <Trophy className="size-3.5 text-cyber-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground leading-none">{badge.name}</p>
                    {badge.description && (
                      <p className="text-xs text-muted-foreground mt-0.5 leading-none">{badge.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next steps */}
        {nextSteps.length > 0 && (
          <div className="rounded-xl border border-border/40 bg-base-800/30 divide-y divide-border/40">
            <div className="px-5 py-3">
              <p className="text-xs font-black uppercase tracking-wider text-muted-foreground font-mono">
                What's Next
              </p>
            </div>
            {nextSteps.map((step, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3">
                <span className="shrink-0 flex size-5 items-center justify-center rounded-full bg-base-700 border border-border text-[10px] font-black font-mono text-muted-foreground">
                  {i + 1}
                </span>
                <p className="flex-1 text-base text-foreground/90 leading-snug">{step}</p>
                <ChevronRight className="size-4 shrink-0 text-muted-foreground/40" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
