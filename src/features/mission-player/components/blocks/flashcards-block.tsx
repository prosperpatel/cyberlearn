import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Eye, Layers } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useBlockCompletion } from '@/features/mission-player/context/block-completion-context'
import type { StandardBlock } from '@/types/mission-engine'

interface Flashcard { front: string; back: string; hint?: string }

interface FlashcardsContent {
  title?: string
  cards?: Flashcard[]
}

export function FlashcardsBlock({ block }: { block: StandardBlock }) {
  const { complete } = useBlockCompletion()
  const c       = block.content as FlashcardsContent
  const title   = c.title ?? block.title
  const cards   = c.cards ?? []

  const [index,     setIndex]     = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [showHint,  setShowHint]  = useState(false)
  const [seen,      setSeen]      = useState<Set<number>>(new Set())

  // Signal completion once every card has been flipped at least once
  useEffect(() => {
    if (cards.length > 0 && seen.size >= cards.length) complete()
  }, [seen, cards.length, complete])

  const card  = cards[index]
  const total = cards.length

  function goTo(i: number) {
    setIndex(i)
    setIsFlipped(false)
    setShowHint(false)
  }

  function flip() {
    setIsFlipped(f => !f)
    if (!isFlipped) setSeen(prev => new Set([...prev, index]))
  }

  if (!card) return null

  return (
    <div className="rounded-xl border border-emerald-500/30 bg-base-900 overflow-hidden">
      <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 to-emerald-500/20" />

      <div className="px-5 sm:px-8 py-6 space-y-5">
        {/* Header */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-xs font-black uppercase tracking-widest text-emerald-400 font-mono">
            <Layers className="size-3" />
            Flashcards
          </span>
          <span className="text-xs font-mono text-muted-foreground">
            {seen.size}/{total} seen
          </span>
          <span className="text-xs text-muted-foreground ml-auto">~{block.metadata.estimatedMinutes}min</span>
        </div>

        {title && <h2 className="text-xl font-bold text-foreground">{title}</h2>}

        {/* Progress dots */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={cn(
                'size-2 rounded-full transition-all',
                i === index   ? 'bg-emerald-500 scale-125' :
                seen.has(i)  ? 'bg-emerald-500/40'          :
                               'bg-base-700 hover:bg-base-600',
              )}
              aria-label={`Card ${i + 1}`}
            />
          ))}
        </div>

        {/* Card */}
        <div className="relative">
          <button
            onClick={flip}
            className={cn(
              'w-full rounded-xl border-2 min-h-[160px] flex flex-col items-center justify-center gap-3 px-6 py-8 transition-all duration-300 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60',
              isFlipped
                ? 'border-emerald-500/60 bg-emerald-500/8'
                : 'border-border/60 bg-base-800/40 hover:border-emerald-500/40 hover:bg-emerald-500/5',
            )}
          >
            <span className={cn(
              'text-xs font-black uppercase tracking-widest font-mono mb-1',
              isFlipped ? 'text-emerald-400' : 'text-muted-foreground/60',
            )}>
              {isFlipped ? 'Answer' : 'Question'}
            </span>
            <p className={cn(
              'text-base leading-relaxed font-medium transition-all',
              isFlipped ? 'text-foreground' : 'text-foreground/90',
            )}>
              {isFlipped ? card.back : card.front}
            </p>
            <span className="text-xs text-muted-foreground/50 mt-2">
              {isFlipped ? 'Click to see question' : 'Click to reveal answer'}
            </span>
          </button>

          {/* Card counter */}
          <div className="absolute top-3 right-3 text-xs font-mono text-muted-foreground/40">
            {index + 1}/{total}
          </div>
        </div>

        {/* Hint */}
        {card.hint && (
          <div className="text-center">
            {!showHint ? (
              <button
                onClick={() => setShowHint(true)}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-emerald-400 transition-colors mx-auto"
              >
                <Eye className="size-3.5" />
                Show hint
              </button>
            ) : (
              <p className="text-sm text-emerald-400/70 italic">{card.hint}</p>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between gap-3 border-t border-border/40 pt-3">
          <button
            onClick={() => goTo(Math.max(0, index - 1))}
            disabled={index === 0}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronLeft className="size-4" />
            Previous
          </button>
          <button
            onClick={flip}
            className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            {isFlipped ? 'See Question' : 'Reveal Answer'}
          </button>
          <button
            onClick={() => goTo(Math.min(total - 1, index + 1))}
            disabled={index === total - 1}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:pointer-events-none"
          >
            Next
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
