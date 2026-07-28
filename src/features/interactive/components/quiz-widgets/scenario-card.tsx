import { memo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, User, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ScenarioCardProps, ScenarioChoice } from '../../types'

export const ScenarioCard = memo(function ScenarioCard({
  scenario,
  context,
  roleContext,
  choices,
  onChoice,
  className,
}: ScenarioCardProps) {
  const [selected, setSelected] = useState<ScenarioChoice | null>(null)

  const pick = (choice: ScenarioChoice) => {
    if (selected) return
    setSelected(choice)
    onChoice?.(choice)
  }

  return (
    <div
      className={cn('rounded-2xl border border-border bg-card overflow-hidden', className)}
      role="region"
      aria-label="Scenario"
    >
      {/* Role context */}
      {roleContext && (
        <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2.5">
          <User className="size-4 text-muted-foreground" aria-hidden />
          <p className="text-xs text-muted-foreground italic">{roleContext}</p>
        </div>
      )}

      <div className="p-5 space-y-4">
        {/* Context */}
        {context && (
          <div className="rounded-xl border border-amber-500/30 bg-amber-950/30 p-3 flex gap-2.5">
            <AlertTriangle className="size-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-200/90">{context}</p>
          </div>
        )}

        {/* Scenario */}
        <div>
          <p className="text-sm font-semibold text-foreground leading-relaxed">{scenario}</p>
        </div>

        {/* Choices */}
        <div className="space-y-2.5" role="group" aria-label="Answer choices">
          {choices.map((choice) => {
            const isPicked  = selected?.id === choice.id
            const isCorrect = isPicked && choice.isCorrect
            const isWrong   = isPicked && !choice.isCorrect
            const isReveal  = selected !== null && !isPicked && choice.isCorrect

            return (
              <motion.button
                key={choice.id}
                onClick={() => pick(choice)}
                disabled={!!selected}
                whileTap={selected ? {} : { scale: 0.98 }}
                className={cn(
                  'w-full text-left rounded-xl border p-3.5 text-sm transition-all',
                  !selected && 'border-border bg-card/60 hover:border-primary/40 hover:bg-primary/5 cursor-pointer',
                  isCorrect && 'border-emerald-500/70 bg-emerald-950/40',
                  isWrong   && 'border-red-500/70 bg-red-950/40',
                  isReveal  && 'border-emerald-500/30 bg-emerald-950/20',
                  selected && !isPicked && !isReveal && 'opacity-50',
                )}
                aria-pressed={isPicked}
              >
                <div className="flex items-start gap-2.5">
                  <div className={cn(
                    'shrink-0 size-5 rounded-full border-2 flex items-center justify-center mt-0.5',
                    isCorrect ? 'border-emerald-400 bg-emerald-400' : isWrong ? 'border-red-400 bg-red-400' : 'border-border',
                  )}>
                    {isCorrect && <CheckCircle2 className="size-3 text-white" />}
                    {isWrong   && <XCircle      className="size-3 text-white" />}
                  </div>
                  <div className="flex-1">
                    <p className={cn(
                      'font-medium',
                      isCorrect ? 'text-emerald-200' : isWrong ? 'text-red-200' : 'text-foreground',
                    )}>
                      {choice.text}
                    </p>

                    {/* Consequence revealed after picking */}
                    <AnimatePresence>
                      {isPicked && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className={cn(
                            'mt-1.5 text-xs leading-relaxed',
                            isCorrect ? 'text-emerald-300/80' : 'text-red-300/80',
                          )}
                        >
                          {choice.consequence}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Result summary */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold',
                selected.isCorrect
                  ? 'border-emerald-500/50 bg-emerald-950/30 text-emerald-300'
                  : 'border-red-500/50 bg-red-950/30 text-red-300',
              )}
            >
              {selected.isCorrect
                ? <><CheckCircle2 className="size-4" /> Good decision!</>
                : <><XCircle      className="size-4" /> That wouldn't end well — see the correct choice above.</>}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
})
