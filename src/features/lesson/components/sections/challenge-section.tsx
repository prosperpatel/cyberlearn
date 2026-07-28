import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Target, ChevronDown, Flag, Zap, Clock, CheckCircle2, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { difficultyVariant } from '@/lib/utils'
import type { ChallengeSection } from '@/types/lesson-engine'

interface Props {
  section:      ChallengeSection
  onComplete?:  () => void
  onChallenge?: (answer: string, correct: boolean) => void
  priorAttempt?: { answer: string; correct: boolean; attempts: number }
}

export function ChallengeSectionRenderer({ section, onComplete, onChallenge, priorAttempt }: Props) {
  const [flagInput, setFlagInput] = useState(priorAttempt?.answer ?? '')
  const [submitted, setSubmitted] = useState(priorAttempt ? { correct: priorAttempt.correct } : null as { correct: boolean } | null)
  const [hintsRevealed, setHintsRevealed] = useState(0)
  const [showSolution, setShowSolution] = useState(false)
  const [attempts, setAttempts] = useState(priorAttempt?.attempts ?? 0)
  const maxAttempts = section.maxAttempts ?? 5

  function handleSubmit() {
    const correct = flagInput.trim() === section.flag?.trim()
    setSubmitted({ correct })
    setAttempts((a) => a + 1)
    onChallenge?.(flagInput, correct)
    if (correct) onComplete?.()
  }

  const outOfAttempts = attempts >= maxAttempts && !submitted?.correct

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2 text-cyber-red">
            <Target className="size-5" />
            <span className="font-bold text-sm uppercase tracking-wider">Challenge</span>
          </div>
          <Badge variant={difficultyVariant(section.difficulty)}>{section.difficulty}</Badge>
          {section.timeLimit && (
            <Badge variant="outline" className="gap-1 font-mono">
              <Clock className="size-3" />
              {section.timeLimit}m
            </Badge>
          )}
        </div>
        <h2 className="text-xl font-black text-foreground">{section.title}</h2>
        <p className="text-muted-foreground leading-relaxed">{section.description}</p>
      </motion.div>

      {/* Flag format */}
      {section.flagFormat && (
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <Flag className="size-3.5" />
          Format: <code className="text-cyber-blue">{section.flagFormat}</code>
        </div>
      )}

      {/* XP reward */}
      <div className="inline-flex items-center gap-2 rounded-lg bg-primary/10 border border-primary/20 px-3 py-1.5">
        <Zap className="size-3.5 text-primary" />
        <span className="text-xs font-bold text-primary font-mono">+{section.xpReward} XP for solving</span>
      </div>

      {/* Submission area */}
      <AnimatePresence mode="wait">
        {submitted?.correct ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl border border-cyber-green/40 bg-cyber-green/10 p-6 text-center space-y-3"
          >
            <CheckCircle2 className="size-12 text-cyber-green mx-auto" />
            <p className="text-lg font-black text-cyber-green">Flag Captured! 🎯</p>
            <p className="text-sm text-muted-foreground">
              +{section.xpReward} XP earned. Well done!
            </p>
          </motion.div>
        ) : outOfAttempts ? (
          <motion.div
            key="failed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-xl border border-cyber-red/30 bg-cyber-red/5 p-5 space-y-3"
          >
            <div className="flex items-center gap-2 text-cyber-red">
              <XCircle className="size-5" />
              <span className="font-bold">Out of attempts</span>
            </div>
            <p className="text-sm text-muted-foreground">
              You've used all {maxAttempts} attempts. Check the solution below.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            {submitted && !submitted.correct && (
              <div className="flex items-center gap-2 text-cyber-red text-sm rounded-lg bg-cyber-red/5 border border-cyber-red/20 px-4 py-2.5">
                <XCircle className="size-4 shrink-0" />
                Incorrect. {maxAttempts - attempts} attempt{maxAttempts - attempts !== 1 ? 's' : ''} remaining.
              </div>
            )}

            <div className="flex gap-2">
              <Input
                value={flagInput}
                onChange={(e) => setFlagInput(e.target.value)}
                placeholder={section.flagFormat ?? 'Enter your answer...'}
                className="font-mono"
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <Button
                onClick={handleSubmit}
                disabled={!flagInput.trim()}
                variant="default"
                className="shrink-0"
              >
                Submit
              </Button>
            </div>
            <p className="text-xs text-muted-foreground font-mono">
              {attempts}/{maxAttempts} attempts used
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hints */}
      {section.hints.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span>💡</span>
            Hints ({hintsRevealed}/{section.hints.length})
          </div>

          <AnimatePresence>
            {section.hints.slice(0, hintsRevealed).map((hint, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="rounded-lg border border-cyber-orange/20 bg-cyber-orange/5 px-4 py-3 text-sm"
              >
                <span className="font-bold text-cyber-orange">Hint {i + 1}: </span>
                {hint}
              </motion.div>
            ))}
          </AnimatePresence>

          {hintsRevealed < section.hints.length && !submitted?.correct && (
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-muted-foreground hover:text-cyber-orange text-xs"
              onClick={() => setHintsRevealed((h) => h + 1)}
            >
              <ChevronDown className="size-3.5" />
              Reveal hint
            </Button>
          )}
        </div>
      )}

      {/* Solution */}
      {section.solution && (outOfAttempts || submitted?.correct) && (
        <div className="space-y-2">
          {!showSolution ? (
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground text-xs"
              onClick={() => setShowSolution(true)}
            >
              View solution walkthrough
            </Button>
          ) : (
            <div className="rounded-lg border border-border bg-base-800 p-4 space-y-1.5">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Solution</p>
              <p className="text-sm font-mono text-foreground leading-relaxed">{section.solution}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
