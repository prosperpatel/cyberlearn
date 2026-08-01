import { useState } from 'react'
import { CheckCircle2, XCircle, Trophy, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import type { StandardBlock } from '@/types/mission-engine'

interface QuizOption   { id: string; text: string; isCorrect: boolean }
interface QuizQuestion {
  id:          string
  question:    string
  type:        string
  context?:    string
  options:     QuizOption[]
  explanation: string
  xpReward?:   number
}

interface QuizContent {
  passingScore?: number
  questions?:    QuizQuestion[]
}

export function QuizBlock({ block }: { block: StandardBlock }) {
  const c            = block.content as QuizContent
  const questions    = c.questions    ?? []
  const passingScore = c.passingScore ?? 80

  const [selected,  setSelected]  = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const correctCount = submitted
    ? questions.filter(q => {
        const sel = selected[q.id]
        return q.options.find(o => o.id === sel)?.isCorrect
      }).length
    : 0

  const scorePercent = questions.length > 0
    ? Math.round((correctCount / questions.length) * 100)
    : 0

  const passed = scorePercent >= passingScore

  function submit() {
    if (Object.keys(selected).length < questions.length) return
    setSubmitted(true)
  }

  function reset() {
    setSelected({})
    setSubmitted(false)
  }

  return (
    <div className="rounded-xl border border-emerald-500/30 bg-base-900 overflow-hidden">
      <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 to-emerald-500/20" />

      <div className="px-5 sm:px-8 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-emerald-400 font-mono">
            <Trophy className="size-3" />
            Quiz
          </span>
          <span className="text-[10px] font-mono text-muted-foreground">Pass: {passingScore}%</span>
          <span className="text-xs text-muted-foreground ml-auto">~{block.metadata.estimatedMinutes}min</span>
        </div>

        {/* Score result */}
        {submitted && (
          <div className={cn(
            'rounded-xl border p-5 flex items-center gap-4',
            passed ? 'border-emerald-500/40 bg-emerald-500/8' : 'border-red-500/40 bg-red-500/8',
          )}>
            {passed
              ? <Trophy className="size-8 text-emerald-400 shrink-0" />
              : <XCircle className="size-8 text-red-400 shrink-0" />
            }
            <div>
              <p className={cn('text-2xl font-black', passed ? 'text-emerald-400' : 'text-red-400')}>
                {scorePercent}%
              </p>
              <p className="text-sm text-foreground/80">
                {correctCount}/{questions.length} correct — {passed ? 'Passed!' : `Need ${passingScore}% to pass`}
              </p>
            </div>
            <button onClick={reset} className="ml-auto text-xs text-muted-foreground hover:text-foreground transition-colors">
              Retry
            </button>
          </div>
        )}

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((q, qi) => {
            const chosenId   = selected[q.id]
            const chosen     = q.options.find(o => o.id === chosenId)
            const isCorrect  = chosen?.isCorrect ?? false

            return (
              <div key={q.id} className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <span className="shrink-0 flex size-6 items-center justify-center rounded-full bg-base-800 border border-border text-[10px] font-black font-mono text-muted-foreground">
                    {qi + 1}
                  </span>
                  <p className="text-sm font-semibold text-foreground leading-snug">{q.question}</p>
                </div>

                {q.context && (
                  <p className="text-xs text-muted-foreground leading-relaxed pl-8 italic">{q.context}</p>
                )}

                <div className="space-y-2 pl-8">
                  {q.options.map((opt) => {
                    const isSelected = chosenId === opt.id
                    const showResult = submitted && isSelected

                    return (
                      <button
                        key={opt.id}
                        disabled={submitted}
                        onClick={() => !submitted && setSelected(prev => ({ ...prev, [q.id]: opt.id }))}
                        className={cn(
                          'w-full flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-all',
                          !submitted && !isSelected && 'border-border/50 bg-base-800/30 hover:border-emerald-500/40 hover:bg-emerald-500/5',
                          !submitted &&  isSelected && 'border-emerald-500/60 bg-emerald-500/10',
                          showResult && opt.isCorrect  && 'border-emerald-500/70 bg-emerald-500/12',
                          showResult && !opt.isCorrect && 'border-red-500/60 bg-red-500/8',
                          submitted && !isSelected && opt.isCorrect && 'border-emerald-500/30 bg-emerald-500/5',
                        )}
                      >
                        <span className={cn(
                          'shrink-0 size-4 rounded-full border-2 flex items-center justify-center transition-all',
                          isSelected && !submitted && 'border-emerald-500 bg-emerald-500',
                          showResult && opt.isCorrect  && 'border-emerald-500 bg-emerald-500',
                          showResult && !opt.isCorrect && 'border-red-500 bg-red-500',
                          !isSelected && 'border-border',
                        )}>
                          {isSelected && <span className="size-1.5 rounded-full bg-white" />}
                        </span>
                        <span className={cn(
                          'flex-1 leading-snug',
                          showResult && opt.isCorrect  && 'text-emerald-300',
                          showResult && !opt.isCorrect && 'text-red-300',
                        )}>
                          {opt.text}
                        </span>
                        {submitted && isSelected && (
                          isCorrect
                            ? <CheckCircle2 className="size-4 shrink-0 text-emerald-400" />
                            : <XCircle className="size-4 shrink-0 text-red-400" />
                        )}
                        {submitted && !isSelected && opt.isCorrect && (
                          <CheckCircle2 className="size-4 shrink-0 text-emerald-400/50" />
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Explanation */}
                {submitted && (
                  <div className={cn(
                    'ml-8 rounded-lg border p-3.5 text-sm leading-relaxed',
                    isCorrect
                      ? 'border-emerald-500/25 bg-emerald-500/6 text-emerald-300/90'
                      : 'border-red-500/25 bg-red-500/6 text-red-300/90',
                  )}>
                    {q.explanation}
                    {q.xpReward && isCorrect && (
                      <span className="flex items-center gap-1 mt-1.5 text-xs font-semibold text-primary">
                        <Zap className="size-3" /> +{q.xpReward} XP
                      </span>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Submit */}
        {!submitted && (
          <Button
            onClick={submit}
            variant="cyber"
            disabled={Object.keys(selected).length < questions.length}
            className="w-full"
          >
            Submit Answers
          </Button>
        )}
      </div>
    </div>
  )
}
