import { memo, useMemo, useState } from 'react'
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { MatchingPair, MatchingProps } from '../../types'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

type Status = 'idle' | 'correct' | 'wrong'
type Matched = Record<string, boolean>  // pairId → correct

export const Matching = memo(function Matching({
  title,
  pairs,
  onComplete,
  className,
}: MatchingProps) {
  const shuffledRight = useMemo(() => shuffle(pairs), [pairs])
  const [selectedLeft,  setSelectedLeft]  = useState<string | null>(null)
  const [selectedRight, setSelectedRight] = useState<string | null>(null)
  const [matched,       setMatched]       = useState<Matched>({})
  const [status,        setStatus]        = useState<Status>('idle')

  const matchedLeftIds  = useMemo(() => new Set(Object.keys(matched)), [matched])
  const matchedRightIds = useMemo(() => new Set(Object.keys(matched)), [matched])

  const handleLeft = (pairId: string) => {
    if (matchedLeftIds.has(pairId)) return
    setSelectedLeft(pairId)
    setSelectedRight(null)
    setStatus('idle')
    // If right was selected, try to match
    if (selectedRight) attemptMatch(pairId, selectedRight)
  }

  const handleRight = (pairId: string) => {
    if (matchedRightIds.has(pairId)) return
    setStatus('idle')
    if (selectedLeft) {
      attemptMatch(selectedLeft, pairId)
    } else {
      setSelectedRight(pairId)
    }
  }

  const attemptMatch = (leftId: string, rightId: string) => {
    const isCorrect = leftId === rightId
    if (isCorrect) {
      setMatched((prev) => {
        const next = { ...prev, [leftId]: true }
        if (Object.keys(next).length === pairs.length) {
          onComplete?.(pairs.length, pairs.length)
        }
        return next
      })
      setSelectedLeft(null)
      setSelectedRight(null)
      setStatus('idle')
    } else {
      setStatus('wrong')
      setTimeout(() => {
        setSelectedLeft(null)
        setSelectedRight(null)
        setStatus('idle')
      }, 800)
    }
  }

  const reset = () => {
    setMatched({})
    setSelectedLeft(null)
    setSelectedRight(null)
    setStatus('idle')
  }

  const allDone = Object.keys(matched).length === pairs.length
  const score   = Object.keys(matched).length

  return (
    <div className={cn('space-y-4', className)} role="region" aria-label={title ?? 'Matching Exercise'}>
      {title && <h3 className="font-bold text-foreground">{title}</h3>}
      <p className="text-xs text-muted-foreground">
        Click a term on the left, then its matching definition on the right.
      </p>

      <div className="grid grid-cols-2 gap-3">
        {/* Left column */}
        <div className="space-y-2">
          {pairs.map((pair: MatchingPair) => {
            const isMatched  = matchedLeftIds.has(pair.id)
            const isSelected = selectedLeft === pair.id
            const isWrong    = status === 'wrong' && isSelected

            return (
              <button
                key={pair.id}
                onClick={() => handleLeft(pair.id)}
                disabled={isMatched}
                aria-pressed={isSelected}
                className={cn(
                  'w-full text-left rounded-xl border p-3 text-sm transition-all',
                  isMatched  && 'border-emerald-500/60 bg-emerald-950/30 text-emerald-300 cursor-default',
                  isSelected && !isWrong && 'border-primary bg-primary/10 text-foreground ring-2 ring-primary',
                  isWrong    && 'border-red-500 bg-red-950/30 text-red-300',
                  !isMatched && !isSelected && 'border-border bg-card hover:border-primary/40 text-foreground cursor-pointer',
                )}
              >
                <div className="flex items-center gap-2">
                  {isMatched && <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0" />}
                  {isWrong   && <XCircle      className="size-3.5 text-red-400 shrink-0" />}
                  <span>{pair.left}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Right column */}
        <div className="space-y-2">
          {shuffledRight.map((pair: MatchingPair) => {
            const isMatched  = matchedRightIds.has(pair.id)
            const isSelected = selectedRight === pair.id
            const isWrong    = status === 'wrong' && isSelected

            return (
              <button
                key={pair.id}
                onClick={() => handleRight(pair.id)}
                disabled={isMatched}
                aria-pressed={isSelected}
                className={cn(
                  'w-full text-left rounded-xl border p-3 text-sm transition-all',
                  isMatched  && 'border-emerald-500/60 bg-emerald-950/30 text-emerald-300 cursor-default',
                  isSelected && !isWrong && 'border-primary bg-primary/10 text-foreground ring-2 ring-primary',
                  isWrong    && 'border-red-500 bg-red-950/30 text-red-300',
                  !isMatched && !isSelected && 'border-border bg-card hover:border-primary/40 text-foreground cursor-pointer',
                )}
              >
                {pair.right}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex items-center gap-3 pt-1">
        {allDone && (
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
            <CheckCircle2 className="size-4" /> All matched! ({score}/{pairs.length})
          </div>
        )}
        {!allDone && (
          <span className="text-xs text-muted-foreground">{score}/{pairs.length} matched</span>
        )}
        <button
          onClick={reset}
          className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Reset"
        >
          <RotateCcw className="size-3.5" /> Reset
        </button>
      </div>
    </div>
  )
})
