import { BookMarked } from 'lucide-react'
import type { StandardBlock } from '@/types/mission-engine'

interface CheatSheetRow     { label: string; value: string }
interface CheatSheetSection { heading: string; rows: CheatSheetRow[] }

interface CheatSheetContent {
  title?:    string
  sections?: CheatSheetSection[]
}

export function CheatSheetBlock({ block }: { block: StandardBlock }) {
  const c        = block.content as CheatSheetContent
  const title    = c.title    ?? block.title
  const sections = c.sections ?? []

  return (
    <div className="rounded-xl border border-cyan-400/30 bg-base-900 overflow-hidden">
      <div className="h-1.5 w-full bg-gradient-to-r from-cyan-400 to-cyan-400/20" />

      <div className="px-5 sm:px-8 py-6 space-y-5">
        {/* Header */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-md bg-cyan-400/10 border border-cyan-400/20 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-cyan-400 font-mono">
            <BookMarked className="size-3" />
            Cheat Sheet
          </span>
          <span className="text-xs text-muted-foreground ml-auto">~{block.metadata.estimatedMinutes}min</span>
        </div>

        {title && <h2 className="text-base font-bold text-foreground">{title}</h2>}

        {/* Sections */}
        <div className="space-y-5">
          {sections.map((sec, si) => (
            <div key={si} className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 font-mono">
                {sec.heading}
              </p>
              <div className="rounded-lg border border-border/50 overflow-hidden">
                {sec.rows.map((row, ri) => (
                  <div
                    key={ri}
                    className="grid grid-cols-[auto_1fr] border-b border-border/40 last:border-b-0 hover:bg-base-800/20 transition-colors"
                  >
                    <div className="px-3 py-2.5 text-xs font-semibold text-foreground border-r border-border/40 bg-base-800/30 min-w-[110px] max-w-[160px] leading-snug flex items-start">
                      {row.label}
                    </div>
                    <div className="px-3 py-2.5 text-xs text-muted-foreground leading-relaxed">
                      {row.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
