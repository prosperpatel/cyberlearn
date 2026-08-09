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

function ForkingPathsSVG() {
  return (
    <svg
      viewBox="0 0 300 72"
      className="w-full"
      style={{ height: 72 }}
      aria-hidden="true"
    >
      {/* Stem */}
      <line x1="150" y1="4" x2="150" y2="36" stroke="rgb(75 85 99)" strokeWidth="1.5" />
      {/* Left fork — authorised */}
      <line x1="150" y1="36" x2="60" y2="66" stroke="rgb(34 197 94 / 0.5)" strokeWidth="1.5" />
      {/* Right fork — unauthorised */}
      <line x1="150" y1="36" x2="240" y2="66" stroke="rgb(239 68 68 / 0.5)" strokeWidth="1.5" />
      {/* Fork point */}
      <circle cx="150" cy="36" r="3.5" fill="rgb(75 85 99)" />
      {/* End dots */}
      <circle cx="60"  cy="66" r="3" fill="rgb(34 197 94 / 0.6)" />
      <circle cx="240" cy="66" r="3" fill="rgb(239 68 68 / 0.6)" />
      {/* Labels */}
      <text
        x="60" y="59"
        fontSize="8"
        fill="rgb(74 222 128 / 0.7)"
        fontFamily="monospace"
        textAnchor="middle"
      >
        AUTHORISED
      </text>
      <text
        x="240" y="59"
        fontSize="8"
        fill="rgb(248 113 113 / 0.7)"
        fontFamily="monospace"
        textAnchor="middle"
      >
        UNAUTHORISED
      </text>
    </svg>
  )
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
          <span className="flex items-center gap-1.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 text-xs font-black uppercase tracking-widest text-cyan-400 font-mono">
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
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-500/70">
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

        {/* Forking paths visual — appears before briefing text to prime the concept */}
        {briefing && (
          <div className="py-1">
            <ForkingPathsSVG />
          </div>
        )}

        {/* Briefing */}
        {briefing && (
          <section className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground font-mono">
              Briefing
            </h3>
            <div className="space-y-3 text-base text-foreground/90 leading-relaxed">
              {briefing.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>
        )}

        {/* Why it matters */}
        {whyItMatters && (
          <section className="space-y-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-primary font-mono">
              Why This Matters
            </h3>
            <div className="space-y-3 text-base text-foreground/90 leading-relaxed">
              {whyItMatters.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>
        )}

        {/* Objectives */}
        {objectives.length > 0 && (
          <section className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground font-mono">
              Mission Objectives
            </h3>
            <ul className="space-y-2">
              {objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-3 text-base text-foreground/90">
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
            <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground font-mono flex items-center gap-1.5">
              <Target className="size-3" />
              Skills Unlocked
            </h3>
            <ul className="space-y-1.5">
              {skillsUnlocked.map((skill, i) => (
                <li key={i} className="flex items-start gap-2 text-base text-foreground/85">
                  <span className="mt-2 size-1.5 rounded-full bg-cyber-green/60 shrink-0" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Closing message */}
        {closingMessage && (
          <section className="border-t border-border/40 pt-6">
            <div className="space-y-2 text-base text-muted-foreground leading-relaxed">
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
