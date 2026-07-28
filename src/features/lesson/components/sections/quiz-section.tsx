import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, CheckCircle2, XCircle, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import type { QuizSection, EngineQuizQuestion, QuizAttempt } from '@/types/lesson-engine'

interface Props {
  section:     QuizSection
  onSubmit?:   (attempt: QuizAttempt) => void
  priorAttempt?: QuizAttempt
}

type AnswerMap = Record<string, string[]>

export function QuizSectionRenderer({ section, onSubmit, priorAttempt }: Props) {
  const [answers, setAnswers] = useState<AnswerMap>(priorAttempt?.answers ?? {})
  const [submitted, setSubmitted] = useState<QuizAttempt | null>(priorAttempt ?? null)
  const [activeQ, setActiveQ] = useState(0)

  const passing = section.passingScore ?? 70

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
    // Calculate score
    let correct = 0
    section.questions.forEach((q) => {
      const selected = answers[q.id] ?? []
      const correctIds = q.options.filter((o) => o.isCorrect).map((o) => o.id)
      const isCorrect =
        correctIds.length === selected.length &&
        correctIds.every((id) => selected.includes(id))
      if (isCorrect) correct++
    })

    const score = Math.round((correct / section.questions.length) * 100)
    const attempt: QuizAttempt = {
      answers,
      score,
      passed:       score >= passing,
      submittedAt:  Date.now(),
    }
    setSubmitted(attempt)
    onSubmit?.(attempt)
  }

  const allAnswered = section.questions.every((q) => (answers[q.id] ?? []).length > 0)
  const question = section.questions[activeQ]

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2"
      >
        <HelpCircle className="size-5 text-primary" />
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground font-mono">
          Quiz · {section.questions.length} questions · {passing}% to pass
        </span>
      </motion.div>

      {/* Result banner */}
      {submitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            'rounded-xl border p-5 flex items-center gap-4',
            submitted.passed
              ? 'border-cyber-green/30 bg-cyber-green/10'
              : 'border-cyber-red/30 bg-cyber-red/5',
          )}
        >
          <Trophy className={cn('size-8', submitted.passed ? 'text-cyber-green' : 'text-cyber-red')} />
          <div className="flex-1">
            <p className={cn('font-bold', submitted.passed ? 'text-cyber-green' : 'text-cyber-red')}>
              {submitted.passed ? `Passed! ${submitted.score}% correct` : `${submitted.score}% — try reviewing and retaking`}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {submitted.passed
                ? `You scored above the ${passing}% threshold. Well done!`
                : `You need ${passing}% to pass. Review the explanations below.`}
            </p>
          </div>
          <Progress
            value={submitted.score}
            max={100}
            size="sm"
            color={submitted.passed ? 'success' : 'danger'}
            className="w-24"
          />
        </motion.div>
      )}

      {/* Question navigation tabs */}
      <div className="flex gap-1.5 flex-wrap">
        {section.questions.map((q, i) => {
          const answered = (answers[q.id] ?? []).length > 0
          const isActive = i === activeQ
          let statusColor = 'bg-base-700 text-muted-foreground'
          if (submitted) {
            const selected = answers[q.id] ?? []
            const correct  = q.options.filter((o) => o.isCorrect).map((o) => o.id)
            const isRight  = correct.length === selected.length && correct.every((id) => selected.includes(id))
            statusColor = isRight ? 'bg-cyber-green/20 text-cyber-green' : 'bg-cyber-red/20 text-cyber-red'
          } else if (answered) {
            statusColor = 'bg-primary/20 text-primary'
          }

          return (
            <button
              key={q.id}
              onClick={() => setActiveQ(i)}
              className={cn(
                'size-8 rounded-lg text-xs font-bold transition-all duration-150',
                statusColor,
                isActive && 'ring-2 ring-primary',
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
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          {/* Context (scenario) */}
          {question.context && (
            <div className="rounded-xl border border-border bg-base-800 p-4 text-sm text-muted-foreground leading-relaxed italic">
              📋 Scenario: {question.context}
            </div>
          )}

          {/* Question */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
              Q{activeQ + 1} of {section.questions.length}
              {question.type === 'multiple' && (
                <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-bold uppercase">
                  Select all that apply
                </span>
              )}
            </div>
            <p className="text-base font-semibold text-foreground leading-relaxed">
              {question.question}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-2">
            {question.options.map((opt) => {
              const isSelected = (answers[question.id] ?? []).includes(opt.id)
              let optStyle = cn(
                'w-full flex items-start gap-3 rounded-xl border p-4 text-left transition-all duration-150 cursor-pointer',
                'hover:border-primary/30 hover:bg-primary/5',
              )

              if (submitted) {
                if (opt.isCorrect) {
                  optStyle = cn(optStyle, 'border-cyber-green/50 bg-cyber-green/10 cursor-default')
                } else if (isSelected && !opt.isCorrect) {
                  optStyle = cn(optStyle, 'border-cyber-red/50 bg-cyber-red/10 cursor-default')
                } else {
                  optStyle = cn(optStyle, 'border-border opacity-50 cursor-default')
                }
              } else if (isSelected) {
                optStyle = cn(optStyle, 'border-primary/50 bg-primary/10')
              } else {
                optStyle = cn(optStyle, 'border-border bg-base-900')
              }

              return (
                <button
                  key={opt.id}
                  className={optStyle}
                  onClick={() => selectOption(question.id, opt.id, question.type)}
                  disabled={!!submitted}
                >
                  {/* Indicator */}
                  <div className={cn(
                    'flex size-5 shrink-0 items-center justify-center rounded border text-xs font-bold mt-0.5',
                    submitted && opt.isCorrect  && 'border-cyber-green bg-cyber-green/20 text-cyber-green',
                    submitted && !opt.isCorrect && isSelected && 'border-cyber-red bg-cyber-red/20 text-cyber-red',
                    !submitted && isSelected     && 'border-primary bg-primary/20 text-primary',
                    !submitted && !isSelected    && 'border-border text-muted-foreground',
                  )}>
                    {submitted
                      ? opt.isCorrect
                        ? <CheckCircle2 className="size-3.5" />
                        : isSelected
                          ? <XCircle className="size-3.5" />
                          : opt.id.toUpperCase()
                      : isSelected
                        ? '✓'
                        : opt.id.toUpperCase()
                    }
                  </div>
                  <span className="text-sm text-foreground leading-relaxed">{opt.text}</span>
                </button>
              )
            })}
          </div>

          {/* Explanation (after submit) */}
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-1"
            >
              <p className="text-xs font-bold text-primary uppercase tracking-wider">Explanation</p>
              <p className="text-sm text-foreground leading-relaxed">{question.explanation}</p>
            </motion.div>
          )}

          {/* Question navigation */}
          <div className="flex items-center justify-between pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveQ((q) => Math.max(0, q - 1))}
              disabled={activeQ === 0}
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
                Submit Quiz
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
          className="w-full"
          onClick={() => { setSubmitted(null); setAnswers({}); setActiveQ(0) }}
        >
          Retry Quiz
        </Button>
      )}
    </div>
  )
}
