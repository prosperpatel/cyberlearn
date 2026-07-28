import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, ChevronDown, CheckCircle2, AlertTriangle, Lightbulb, Trophy, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { difficultyVariant } from '@/lib/utils'
import type { PracticalSection } from '@/types/lesson-engine'

interface Props {
  section:     PracticalSection
  isComplete?: boolean
  onComplete?: () => void
}

const TYPE_CONFIG = {
  terminal: { icon: '💻', label: 'Terminal' },
  browser:  { icon: '🌐', label: 'Browser' },
  file:     { icon: '📂', label: 'File System' },
  tool:     { icon: '🔧', label: 'Tool' },
  analysis: { icon: '🔍', label: 'Analysis' },
  wireshark:{ icon: '📡', label: 'Wireshark' },
}

export function PracticalSectionRenderer({ section, isComplete, onComplete }: Props) {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())
  const [hintsRevealed, setHintsRevealed] = useState(0)
  const [showSolution, setShowSolution] = useState(false)
  const [success, setSuccess] = useState(isComplete ?? false)

  const typeConfig = TYPE_CONFIG[section.practicalType]
  // allStepsComplete is reserved for future "require all steps" gating logic

  function toggleStep(id: string) {
    setCompletedSteps((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function copyCommand(cmd: string) {
    navigator.clipboard.writeText(cmd).catch(() => null)
  }

  function handleSuccess() {
    setSuccess(true)
    onComplete?.()
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2 text-cyber-green">
            <Terminal className="size-5" />
            <span className="font-bold text-sm uppercase tracking-wider">Hands-On Lab</span>
          </div>
          <Badge variant={difficultyVariant(section.difficulty)}>{section.difficulty}</Badge>
          <Badge variant="default" className="gap-1">
            <span>{typeConfig.icon}</span>
            {typeConfig.label}
          </Badge>
          <Badge variant="outline" className="font-mono">
            ~{section.estimatedMinutes}m
          </Badge>
        </div>
        <h2 className="text-xl font-black text-foreground">{section.objective}</h2>
      </motion.div>

      {/* Safety notice */}
      {section.safetyNotice && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-start gap-3 rounded-xl border border-cyber-red/30 bg-cyber-red/5 p-4"
        >
          <AlertTriangle className="size-4 text-cyber-red shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-cyber-red uppercase tracking-wider mb-1">Safety Notice</p>
            <p className="text-sm text-foreground leading-relaxed">{section.safetyNotice}</p>
          </div>
        </motion.div>
      )}

      {/* Prerequisites */}
      {section.prerequisites && section.prerequisites.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12 }}
          className="rounded-xl border border-border bg-base-800 p-4 space-y-2"
        >
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Before you start</p>
          <ul className="space-y-1">
            {section.prerequisites.map((req, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="size-1.5 rounded-full bg-muted-foreground shrink-0" />
                {req}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Steps */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.14 }}
        className="space-y-2"
      >
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Steps</p>

        {section.steps.map((step, i) => {
          const done = completedSteps.has(step.id)
          return (
            <div
              key={step.id}
              className={cn(
                'rounded-xl border transition-all duration-200',
                done
                  ? 'border-cyber-green/30 bg-cyber-green/5'
                  : 'border-border bg-base-900',
              )}
            >
              {/* Step header */}
              <div
                className="flex items-start gap-3 p-4 cursor-pointer"
                onClick={() => toggleStep(step.id)}
              >
                <div className={cn(
                  'flex size-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-all',
                  done
                    ? 'border-cyber-green bg-cyber-green/10 text-cyber-green'
                    : 'border-border text-muted-foreground',
                )}>
                  {done ? <CheckCircle2 className="size-4" /> : i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    'font-semibold text-sm transition-colors',
                    done ? 'text-cyber-green' : 'text-foreground',
                  )}>
                    {step.title}
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Command display */}
              {step.command && (
                <div className="mx-4 mb-3 rounded-lg bg-base-950 border border-border overflow-hidden">
                  <div className="flex items-center justify-between px-3 py-2 border-b border-border">
                    <div className="flex items-center gap-1.5">
                      <div className="size-2 rounded-full bg-cyber-red/60" />
                      <div className="size-2 rounded-full bg-cyber-orange/60" />
                      <div className="size-2 rounded-full bg-cyber-green/60" />
                    </div>
                    <button
                      onClick={() => copyCommand(step.command!)}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Copy className="size-3" />
                      Copy
                    </button>
                  </div>
                  <code className="block px-4 py-3 font-mono text-sm text-cyber-green">
                    $ {step.command}
                  </code>
                </div>
              )}

              {/* Expected output */}
              {step.expectedOutput && (
                <div className="mx-4 mb-4 space-y-1">
                  <p className="text-xs font-mono text-muted-foreground">Expected output:</p>
                  <p className="text-xs font-mono text-cyber-blue bg-base-950 rounded-lg border border-border px-3 py-2">
                    {step.expectedOutput}
                  </p>
                </div>
              )}

              {/* Note */}
              {step.note && (
                <div className="mx-4 mb-4 flex items-start gap-2 text-xs text-muted-foreground">
                  <span>ℹ️</span>
                  <span>{step.note}</span>
                </div>
              )}
            </div>
          )
        })}
      </motion.div>

      {/* Hints */}
      {section.hints.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-2">
            <Lightbulb className="size-4 text-cyber-orange" />
            <span className="text-sm font-semibold">Hints</span>
            <span className="text-xs text-muted-foreground">
              ({hintsRevealed}/{section.hints.length} revealed)
            </span>
          </div>

          <AnimatePresence>
            {section.hints.slice(0, hintsRevealed).map((hint, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="rounded-lg border border-cyber-orange/20 bg-cyber-orange/5 px-4 py-3 text-sm text-foreground leading-relaxed"
              >
                <span className="font-bold text-cyber-orange">Hint {i + 1}: </span>
                {hint}
              </motion.div>
            ))}
          </AnimatePresence>

          {hintsRevealed < section.hints.length && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2 text-cyber-orange border-cyber-orange/30 hover:border-cyber-orange/60"
              onClick={() => setHintsRevealed((h) => h + 1)}
            >
              <ChevronDown className="size-3.5" />
              Reveal next hint
            </Button>
          )}
        </motion.div>
      )}

      {/* Expected result */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-1">
        <p className="text-xs font-bold text-primary uppercase tracking-wider">Expected result</p>
        <p className="text-sm text-foreground leading-relaxed">{section.expectedResult}</p>
      </div>

      {/* Solution */}
      {section.solution && (
        <div className="space-y-2">
          {!showSolution ? (
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground text-xs"
              onClick={() => setShowSolution(true)}
            >
              Reveal solution (try first!)
            </Button>
          ) : (
            <div className="rounded-lg border border-border bg-base-800 p-4 space-y-1">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Solution</p>
              <p className="text-sm text-foreground leading-relaxed font-mono">{section.solution}</p>
            </div>
          )}
        </div>
      )}

      {/* Success button */}
      <AnimatePresence mode="wait">
        {!success ? (
          <motion.div key="btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Button
              variant="success"
              size="lg"
              className="w-full gap-2"
              onClick={handleSuccess}
            >
              <Trophy className="size-5" />
              Mark Lab Complete
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl border border-cyber-green/40 bg-cyber-green/10 p-5 text-center space-y-2"
          >
            <div className="text-3xl">🎉</div>
            <p className="font-bold text-cyber-green">Lab Complete!</p>
            <p className="text-sm text-muted-foreground">
              Great work. You just performed a SQL injection attack in a safe environment. Click Next to continue.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
