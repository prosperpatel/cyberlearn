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
  const c           = block.content as MemoryAnchorContent
  const title       = c.title       ?? block.title
  const concept     = c.concept     ?? ''
  const anchor      = c.anchor      ?? ''
  const explanation = c.explanation ?? ''
  const acronym     = c.acronym

  return (
    <div className="rounded-xl border border-purple-500/30 bg-base-900 overflow-hidden">
      <div className="h-1.5 w-full bg-gradient-to-r from-purple-500 to-purple-500/20" />

      <div className="px-5 sm:px-8 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-md bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 text-xs font-black uppercase tracking-widest text-purple-400 font-mono">
            <Anchor className="size-3" />
            Memory Anchor
          </span>
          <span className="text-xs text-muted-foreground ml-auto">~{block.metadata.estimatedMinutes}min</span>
        </div>

        {/* Title + concept */}
        <div className="space-y-2">
          {title && <h2 className="text-xl font-bold text-foreground">{title}</h2>}
          {concept && <p className="text-base text-muted-foreground leading-relaxed">{concept}</p>}
        </div>

        {/* Acronym — prominent, deliberate-pause treatment */}
        {acronym && acronym.letters.length > 0 && (
          <div className="rounded-xl bg-purple-500/8 border border-purple-500/25 p-6 space-y-5">
            {/* Letters row */}
            <div className="flex items-center gap-2 justify-center flex-wrap">
              {acronym.letters.map((letter, i) => (
                <div key={i} className="flex size-12 items-center justify-center rounded-lg bg-purple-500/20 border border-purple-500/40">
                  <span className="text-2xl font-black text-purple-400 font-mono">{letter}</span>
                </div>
              ))}
            </div>
            {/* Meanings */}
            <div className="space-y-2.5">
              {acronym.meanings.map((meaning, i) => (
                <div key={i} className="flex items-start gap-3 text-base">
                  <span className="font-black text-purple-400 font-mono shrink-0 w-5 text-center">
                    {acronym.letters[i]}
                  </span>
                  <span className="text-foreground/85 leading-relaxed">{meaning}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Anchor mnemonic */}
        {anchor && (
          <div className="space-y-1.5">
            <p className="text-xs font-black uppercase tracking-wider text-muted-foreground font-mono">
              The Anchor
            </p>
            <p className="text-base text-foreground/90 leading-relaxed italic border-l-4 border-purple-500/40 pl-4">
              {anchor}
            </p>
          </div>
        )}

        {/* Explanation */}
        {explanation && (
          <div className="rounded-lg bg-base-800/60 border border-border/40 p-4 text-base text-muted-foreground leading-relaxed">
            {explanation}
          </div>
        )}
      </div>
    </div>
  )
}
