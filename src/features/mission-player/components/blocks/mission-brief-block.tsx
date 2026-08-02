import { CheckCircle2, Flag, Target, Zap } from 'lucide-react'
import type { StandardBlock } from '@/types/mission-engine'

interface MissionBriefRawContent {
  missionTitle?:      string
  operativeCodename?: string
  subtitle?:          string
  briefing?:          string
  whyItMatters?:      string
  objectives?:        string[]
  skillsUnlocked?:    string[]
  closingMessage?:    string
}

export function MissionBriefBlock({ block }: { block: StandardBlock }) {
  const c = block.content as MissionBriefRawContent

  const missionTitle      = c.missionTitle      ?? block.title
  const operativeCodename = c.operativeCodename  ?? ''
  const subtitle          = c.subtitle           ?? ''
  const briefing          = c.briefing           ?? ''
  const whyItMatters      = c.whyItMatters       ?? ''
  const objectives        = c.objectives         ?? []
  const skillsUnlocked    = c.skillsUnlocked     ?? []
  const closingMessage    = c.closingMessage      ?? ''

  return (
    <div className="rounded-xl border border-cyan-500/40 bg-base-900 overflow-hidden">
      <div className="h-1.5 w-full bg-gradient-to-r from-cyan-500 to-cyan-500/20" />

      <div className="px-5 sm:px-8 py-6 space-y-8">

        {/* Badge row */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-cyan-400 font-mono">
            <Flag className="size-3" />
            Mission Brief
          </span>
          {block.metadata.xp > 0 && (
            <span className="flex items-center gap-1 text-xs font-semibold text-primary">
              <Zap className="size-3" />
              +{block.metadata.xp} XP
            </span>
          )}
          <span className="text-xs text-muted-foreground ml-auto">
            ~{block.metadata.estimatedMinutes}min
          </span>
        </div>

        {/* Operation codename */}
        {operativeCodename && (
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-cyan-500/20" />
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-500/70">
              {operativeCodename}
            </p>
            <div className="h-px flex-1 bg-cyan-500/20" />
          </div>
        )}

        {/* Title + subtitle */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-foreground leading-tight">
            {missionTitle}
          </h1>
          {subtitle && (
            <p className="text-base text-cyan-400/80 font-medium">{subtitle}</p>
          )}
        </div>

        {/* Briefing */}
        {briefing && (
          <section className="space-y-3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground font-mono">
              Briefing
            </h3>
            <div className="space-y-3 text-sm text-foreground/90 leading-relaxed">
              {briefing.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>
        )}

        {/* Why it matters */}
        {whyItMatters && (
          <section className="space-y-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary font-mono">
              Why This Matters
            </h3>
            <div className="space-y-3 text-sm text-foreground/90 leading-relaxed">
              {whyItMatters.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>
        )}

        {/* Objectives */}
        {objectives.length > 0 && (
          <section className="space-y-3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground font-mono">
              Mission Objectives
            </h3>
            <ul className="space-y-2">
              {objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground/90">
                  <CheckCircle2 className="size-4 shrink-0 mt-0.5 text-cyber-green" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Skills unlocked */}
        {skillsUnlocked.length > 0 && (
          <section className="space-y-3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground font-mono flex items-center gap-1.5">
              <Target className="size-3" />
              Skills Unlocked
            </h3>
            <ul className="space-y-1.5">
              {skillsUnlocked.map((skill, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                  <span className="mt-1.5 size-1.5 rounded-full bg-cyber-green/60 shrink-0" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Closing message */}
        {closingMessage && (
          <section className="border-t border-border/40 pt-6">
            <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
              {closingMessage.split('\n\n').map((para, i) => (
                <p key={i} className="italic">{para}</p>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
