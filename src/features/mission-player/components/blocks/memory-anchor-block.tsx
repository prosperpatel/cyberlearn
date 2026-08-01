import { Anchor } from 'lucide-react'
import type { StandardBlock } from '@/types/mission-engine'

interface MemoryAnchorContent {
  title?:       string
  concept?:     string
  anchor?:      string
  explanation?: string
  acronym?:     { letters: string[]; meanings: string[] }
}

export function MemoryAnchorBlock({ block }: { block: StandardBlock }) {
  const c          = block.content as MemoryAnchorContent
  const title      = c.title      ?? block.title
  const concept    = c.concept    ?? ''
  const anchor     = c.anchor     ?? ''
  const explanation = c.explanation ?? ''
  const acronym    = c.acronym

  return (
    <div className="rounded-xl border border-yellow-500/30 bg-base-900 overflow-hidden">
      <div className="h-1.5 w-full bg-gradient-to-r from-yellow-500 to-yellow-500/20" />

      <div className="px-5 sm:px-8 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-md bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-yellow-400 font-mono">
            <Anchor className="size-3" />
            Memory Anchor
          </span>
          <span className="text-xs text-muted-foreground ml-auto">~{block.metadata.estimatedMinutes}min</span>
        </div>

        {/* Title + concept */}
        <div className="space-y-2">
          {title && <h2 className="text-lg font-bold text-foreground">{title}</h2>}
          {concept && <p className="text-sm text-muted-foreground leading-relaxed">{concept}</p>}
        </div>

        {/* Acronym */}
        {acronym && acronym.letters.length > 0 && (
          <div className="rounded-xl bg-yellow-500/8 border border-yellow-500/25 p-5 space-y-4">
            {/* Letters row */}
            <div className="flex items-center gap-2 justify-center">
              {acronym.letters.map((letter, i) => (
                <div key={i} className="flex size-10 items-center justify-center rounded-lg bg-yellow-500/20 border border-yellow-500/40">
                  <span className="text-xl font-black text-yellow-400 font-mono">{letter}</span>
                </div>
              ))}
            </div>
            {/* Meanings */}
            <div className="space-y-2">
              {acronym.meanings.map((meaning, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <span className="font-black text-yellow-400 font-mono shrink-0 w-5 text-center">
                    {acronym.letters[i]}
                  </span>
                  <span className="text-foreground/80 leading-relaxed">{meaning}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Anchor mnemonic */}
        {anchor && (
          <div className="space-y-1.5">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground font-mono">
              The Anchor
            </p>
            <p className="text-sm text-foreground/90 leading-relaxed italic border-l-2 border-yellow-500/40 pl-3">
              {anchor}
            </p>
          </div>
        )}

        {/* Explanation */}
        {explanation && (
          <div className="rounded-lg bg-base-800/60 border border-border/40 p-4 text-sm text-muted-foreground leading-relaxed">
            {explanation}
          </div>
        )}
      </div>
    </div>
  )
}
