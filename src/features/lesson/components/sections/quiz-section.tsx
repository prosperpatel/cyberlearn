import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, CheckCircle2, XCircle, Trophy, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import type { QuizSection, EngineQuizQuestion, QuizAttempt } from '@/types/lesson-engine'

interface Props {
  section:       QuizSection
  onSubmit?:     (attempt: QuizAttempt) => void
  priorAttempt?: QuizAttempt
}

type AnswerMap = Record<string, string[]>

export function QuizSectionRenderer({ section, onSubmit, priorAttempt }: Props) {
  const [answers, setAnswers]   = useState<AnswerMap>(priorAttempt?.answers ?? {})
  const [submitted, setSubmitted] = useState<QuizAttempt | null>(priorAttempt ?? null)
  const [activeQ, setActiveQ]   = useState(0)

  const passing  = section.passingScore ?? 70
  const question = section.questions[activeQ]

  function selectOption(questionId: string, optionId: string, type: EngineQuizQuestion['type']) {
    if (submitted) return
    setAnswers((prev) => {
      const current = prev[questionId] ?? []
      if (type === 'multiple') {
        const next = current.includes(optionId)
          ? current.filter((id) => id !== optionId)
          : [...current, optionId]
        return { ...prev, [questionId]: next }
      }
      return { ...prev, [questionId]: [optionId] }
    })
  }

  function handleSubmit() {
    let correct = 0
    section.questions.forEach((q) => {
      const selected   = answers[q.id] ?? []
      const correctIds = q.options.filter((o) => o.isCorrect).map((o) => o.id)
      const isCorrect  =
        correctIds.length === selected.length &&
        correctIds.every((id) => selected.includes(id))
      if (isCorrect) correct++
    })

    const score   = Math.round((correct / section.questions.length) * 100)
    const attempt: QuizAttempt = {
      answers,
      score,
      passed:      score >= passing,
      submittedAt: Date.now(),
    }
    setSubmitted(attempt)
    onSubmit?.(attempt)
  }

  const allAnswered = section.questions.every((q) => (answers[q.id] ?? []).length > 0)

  return (
    <div className="max-w-[820px] mx-auto px-6 sm:px-8 py-14 sm:py-20 space-y-10">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <div className="flex size-9 items-center justify-center rounded-xl bg-primary/12">
          <HelpCircle className="size-4 text-primary" />
        </div>
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-primary font-mono">
            Knowledge Check
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {section.questions.length} questions · {passing}% to pass
          </p>
        </div>
      </motion.div>

      {/* Result banner */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={cn(
              'rounded-xl border p-5 sm:p-6',
              submitted.passed
                ? 'border-cyber-green/30 bg-cyber-green/8'
                : 'border-cyber-red/30 bg-cyber-red/5',
            )}
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                'flex size-12 shrink-0 items-center justify-center rounded-xl',
                submitted.passed ? 'bg-cyber-green/15' : 'bg-cyber-red/15',
              )}>
                <Trophy className={cn('size-6', submitted.passed ? 'text-cyber-green' : 'text-cyber-red')} />
              </div>
              <div className="flex-1">
                <p className={cn('font-bold text-base', submitted.passed ? 'text-cyber-green' : 'text-cyber-red')}>
                  {submitted.passed
                    ? `Passed — ${submitted.score}% correct`
                    : `${submitted.score}% — review and retry`}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  {submitted.passed
                    ? `You exceeded the ${passing}% threshold. Mission intelligence verified.`
                    : `You need ${passing}% to pass. Review the explanations below.`}
                </p>
              </div>
              {/* Score ring */}
              <div className="shrink-0 relative size-14">
                <svg className="size-14 -rotate-90" viewBox="0 0 56 56">
                  <circle cx="28" cy="28" r="22" fill="none" stroke="currentColor"
                    className="text-base-700" strokeWidth="4" />
                  <circle cx="28" cy="28" r="22" fill="none"
                    stroke={submitted.passed ? '#00FF87' : '#FF4757'} strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 22}`}
                    strokeDashoffset={`${2 * Math.PI * 22 * (1 - submitted.score / 100)}`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-foreground tabular-nums">
                  {submitted.score}%
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question nav pills */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {section.questions.map((q, i) => {
          const answered = (answers[q.id] ?? []).length > 0
          const isActive = i === activeQ
          let pill = 'bg-base-700 text-muted-foreground hover:bg-base-600'

          if (submitted) {
            const selected = answers[q.id] ?? []
            const correct  = q.options.filter((o) => o.isCorrect).map((o) => o.id)
            const isRight  = correct.length === selected.length && correct.every((id) => selected.includes(id))
            pill = isRight
              ? 'bg-cyber-green/20 text-cyber-green border border-cyber-green/30'
              : 'bg-cyber-red/20 text-cyber-red border border-cyber-red/30'
          } else if (answered) {
            pill = 'bg-primary/20 text-primary border border-primary/30'
          }

          return (
            <button
              key={q.id}
              onClick={() => setActiveQ(i)}
              className={cn(
                'size-8 rounded-lg text-xs font-bold transition-all duration-150',
                pill,
                isActive && 'ring-2 ring-primary ring-offset-1 ring-offset-background',
              )}
            >
              {i + 1}
            </button>
          )
        })}
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -14 }}
          transition={{ duration: 0.2 }}
          className="space-y-5"
        >
          {/* Scenario context */}
          {question.context && (
            <div className="rounded-xl border border-border bg-base-800/60 p-4 sm:p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 font-mono">
                Scenario
              </p>
              <p className="text-sm text-foreground leading-relaxed">{question.context}</p>
            </div>
          )}

          {/* Question */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <span>Q{activeQ + 1} of {section.questions.length}</span>
              {question.type === 'multiple' && (
                <span className="bg-primary/12 text-primary px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border border-primary/20">
                  Select all that apply
                </span>
              )}
            </div>
            <p className="text-lg font-semibold text-foreground leading-snug">
              {question.question}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {question.options.map((opt) => {
              const isSelected = (answers[question.id] ?? []).includes(opt.id)

              let optClass = cn(
                'w-full flex items-start gap-4 rounded-xl border p-4 sm:p-5 text-left',
                'transition-all duration-150 cursor-pointer group',
              )

              if (submitted) {
                if (opt.isCorrect) {
                  optClass = cn(optClass, 'border-cyber-green/50 bg-cyber-green/8 cursor-default')
                } else if (isSelected && !opt.isCorrect) {
                  optClass = cn(optClass, 'border-cyber-red/40 bg-cyber-red/8 cursor-default opacity-80')
                } else {
                  optClass = cn(optClass, 'border-border/50 opacity-40 cursor-default')
                }
              } else if (isSelected) {
                optClass = cn(optClass, 'border-primary/50 bg-primary/8')
              } else {
                optClass = cn(optClass, 'border-border bg-base-900 hover:border-primary/30 hover:bg-primary/5')
              }

              return (
                <button
                  key={opt.id}
                  className={optClass}
                  onClick={() => selectOption(question.id, opt.id, question.type)}
                  disabled={!!submitted}
                >
                  {/* Option indicator */}
                  <div className={cn(
                    'flex size-6 shrink-0 items-center justify-center rounded-md border text-xs font-bold mt-0.5 transition-all',
                    submitted && opt.isCorrect
                      ? 'border-cyber-green bg-cyber-green/20 text-cyber-green'
                      : submitted && !opt.isCorrect && isSelected
                        ? 'border-cyber-red bg-cyber-red/20 text-cyber-red'
                        : !submitted && isSelected
                          ? 'border-primary bg-primary/20 text-primary'
                          : 'border-border text-muted-foreground group-hover:border-primary/50',
                  )}>
                    {submitted
                      ? opt.isCorrect
                        ? <CheckCircle2 className="size-3.5" />
                        : isSelected
                          ? <XCircle className="size-3.5" />
                          : <span className="uppercase text-[10px]">{opt.id}</span>
                      : isSelected
                        ? <CheckCircle2 className="size-3.5" />
                        : <span className="uppercase text-[10px]">{opt.id}</span>
                    }
                  </div>
                  <span className="text-[1.0625rem] text-foreground leading-[1.7]">{opt.text}</span>
                </button>
              )
            })}
          </div>

          {/* Explanation after submit */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-primary/20 bg-primary/5 overflow-hidden"
              >
                <div className="px-5 py-3 border-b border-primary/15 bg-primary/8">
                  <p className="text-xs font-bold text-primary uppercase tracking-widest font-mono">
                    Explanation
                  </p>
                </div>
                <p className="px-5 py-4 text-[1.0625rem] text-foreground leading-[1.8]">
                  {question.explanation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Question navigation */}
          <div className="flex items-center justify-between pt-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveQ((q) => Math.max(0, q - 1))}
              disabled={activeQ === 0}
              className="text-muted-foreground"
            >
              ← Previous
            </Button>

            {activeQ < section.questions.length - 1 ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveQ((q) => q + 1)}
              >
                Next question →
              </Button>
            ) : !submitted ? (
              <Button
                variant="cyber"
                size="sm"
                onClick={handleSubmit}
                disabled={!allAnswered}
              >
                Submit
              </Button>
            ) : null}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Retry */}
      {submitted && !submitted.passed && (
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2 text-muted-foreground"
          onClick={() => { setSubmitted(null); setAnswers({}); setActiveQ(0) }}
        >
          <RotateCcw className="size-3.5" />
          Retry Quiz
        </Button>
      )}
    </div>
  )
}
