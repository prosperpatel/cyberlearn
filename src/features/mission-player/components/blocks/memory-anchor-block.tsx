import { useState } from 'react'
import { Anchor, PenLine, Lock, Target, ShieldCheck, Database, Wifi, Search, FileText, AlertTriangle, RefreshCw, Eye, ChevronRight, Shield } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { StandardBlock } from '@/types/mission-engine'
import type { LucideIcon } from 'lucide-react'

interface MemoryAnchorContent {
  title?:       string
  concept?:     string
  anchor?:      string
  explanation?: string
  acronym?:     { letters: string[]; meanings: string[] }
}

function deriveMeaningIcon(meaning: string): LucideIcon {
  const lower = meaning.toLowerCase()
  if (lower.includes('permission'))       return PenLine
  if (lower.includes('privacy'))          return Lock
  if (lower.includes('protect'))          return Shield
  if (lower.includes('scope'))            return Target
  if (lower.includes('scan'))             return Search
  if (lower.includes('confidentiality'))  return ShieldCheck
  if (lower.includes('integrity'))        return Database
  if (lower.includes('identify'))         return Eye
  if (lower.includes('availability'))     return Wifi
  if (lower.includes('recon'))            return Search
  if (lower.includes('reporting') || lower.includes('report')) return FileText
  if (lower.includes('respond'))          return AlertTriangle
  if (lower.includes('recover'))          return RefreshCw
  if (lower.includes('exploit'))          return AlertTriangle
  if (lower.includes('scoping') || lower.startsWith('s'))      return Target
  return ChevronRight
}

export function MemoryAnchorBlock({ block }: { block: StandardBlock }) {
  const reducedMotion = useReducedMotion()
  const [revealed, setRevealed] = useState<Set<number>>(new Set())
  const c           = block.content as MemoryAnchorContent
  const title       = c.title       ?? block.title
  const concept     = c.concept     ?? ''
  const anchor      = c.anchor      ?? ''
  const explanation = c.explanation ?? ''
  const acronym     = c.acronym

  const toggle = (i: number) => {
    setRevealed(prev => {
      const next = new Set(prev)
      if (next.has(i)) { next.delete(i) } else { next.add(i) }
      return next
    })
  }

  const allRevealed = acronym
    ? revealed.size === acronym.letters.length
    : false

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

        {/* Acronym — interactive reveal tiles */}
        {acronym && acronym.letters.length > 0 && (
          <div className="rounded-xl bg-purple-500/8 border border-purple-500/25 p-5 space-y-4">
            <p className="text-xs font-black uppercase tracking-wider text-purple-400/60 font-mono">
              Click each letter to reveal
            </p>

            <div className="flex gap-3 flex-wrap">
              {acronym.letters.map((letter, i) => {
                const isOpen = revealed.has(i)
                const meaning = acronym.meanings[i] ?? ''
                const Icon = deriveMeaningIcon(meaning)

                return (
                  <div key={i} className="flex-1 min-w-[80px]">
                    <button
                      onClick={() => toggle(i)}
                      aria-expanded={isOpen}
                      className={cn(
                        'w-full flex flex-col items-center gap-1 rounded-xl border-2 transition-all duration-200',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50',
                        isOpen
                          ? 'bg-purple-500/20 border-purple-500/70 shadow-[0_0_12px_rgba(168,85,247,0.2)]'
                          : 'bg-purple-500/10 border-purple-500/35 hover:bg-purple-500/15 hover:border-purple-500/55',
                        'px-3 pt-4 pb-3',
                      )}
                    >
                      <span className="text-3xl font-black text-purple-400 font-mono leading-none">{letter}</span>
                      {!isOpen && (
                        <span className="text-[9px] font-mono text-purple-400/40 uppercase tracking-widest mt-1">
                          tap
                        </span>
                      )}
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-2 px-1 space-y-1.5">
                            <Icon className="size-4 text-purple-400/60 mx-auto" />
                            <p className="text-sm text-foreground/85 leading-relaxed text-center">{meaning}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Anchor mnemonic — appears when all revealed */}
        <AnimatePresence>
          {(allRevealed || !acronym) && anchor && (
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-1.5"
            >
              <p className="text-xs font-black uppercase tracking-wider text-muted-foreground font-mono">
                The Anchor
              </p>
              <p className="text-base text-foreground/90 leading-relaxed italic border-l-4 border-purple-500/40 pl-4">
                {anchor}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

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
