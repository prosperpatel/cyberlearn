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
    <div className="rounded-xl border border-blue-500/30 bg-base-900 overflow-hidden">
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-blue-500/20" />

      <div className="px-5 sm:px-8 py-6 space-y-5">
        {/* Header */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-md bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-xs font-black uppercase tracking-widest text-blue-400 font-mono">
            <BookMarked className="size-3" />
            Reference
          </span>
          <span className="text-xs text-muted-foreground ml-auto">~{block.metadata.estimatedMinutes}min</span>
        </div>

        {title && <h2 className="text-xl font-bold text-foreground">{title}</h2>}

        {/* Sections */}
        <div className="space-y-5">
          {sections.map((sec, si) => {
            const firstLabel = sec.rows[0]?.label.toLowerCase() ?? ''
            const isSpectrum = firstLabel.includes('black') || firstLabel.includes('phase 1') || firstLabel.includes('1.')
            return (
            <div key={si} className="space-y-2">
              <p className="text-xs font-black uppercase tracking-wider text-blue-400 font-mono">
                {sec.heading}
              </p>

              {/* Knowledge spectrum bar for Black/Grey/White-box sections */}
              {isSpectrum && sec.rows.length >= 3 && (
                <div className="flex items-center gap-0 mb-3 px-1">
                  {sec.rows.map((_, ri) => (
                    <div key={ri} className="flex items-center flex-1">
                      <div className="flex flex-col items-center">
                        <div className="size-2.5 rounded-full bg-blue-500/60 border border-blue-500/30" />
                        <span className="text-[9px] font-mono text-muted-foreground/50 mt-1 whitespace-nowrap">
                          {sec.rows[ri].label.split('-')[0].trim()}
                        </span>
                      </div>
                      {ri < sec.rows.length - 1 && (
                        <div className="flex-1 h-px bg-gradient-to-r from-blue-500/40 to-blue-500/15 mx-1" />
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="rounded-lg border border-border/50 overflow-hidden">
                {sec.rows.map((row, ri) => (
                  <div
                    key={ri}
                    className="grid grid-cols-[auto_1fr] border-b border-border/40 last:border-b-0 hover:bg-base-800/20 transition-colors"
                  >
                    <div className="px-3 py-2.5 text-sm font-semibold text-foreground border-r border-border/40 bg-base-800/30 min-w-[110px] max-w-[160px] leading-snug flex items-start">
                      {row.label}
                    </div>
                    <div className="px-3 py-2.5 text-sm text-muted-foreground leading-relaxed">
                      {row.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
