import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, ChevronDown, CheckCircle2, AlertTriangle, Lightbulb, Trophy, Copy, Check } from 'lucide-react'
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
  terminal: { icon: '💻', label: 'Terminal'    },
  browser:  { icon: '🌐', label: 'Browser'     },
  file:     { icon: '📂', label: 'File System' },
  tool:     { icon: '🔧', label: 'Tool'        },
  analysis: { icon: '🔍', label: 'Analysis'    },
  wireshark:{ icon: '📡', label: 'Wireshark'   },
}

export function PracticalSectionRenderer({ section, isComplete, onComplete }: Props) {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())
  const [hintsRevealed, setHintsRevealed]   = useState(0)
  const [showSolution, setShowSolution]     = useState(false)
  const [success, setSuccess]               = useState(isComplete ?? false)
  const [copied, setCopied]                 = useState<string | null>(null)

  const typeConfig = TYPE_CONFIG[section.practicalType]

  function toggleStep(id: string) {
    setCompletedSteps((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  async function copyCommand(cmd: string) {
    await navigator.clipboard.writeText(cmd).catch(() => null)
    setCopied(cmd)
    setTimeout(() => setCopied(null), 2000)
  }

  function handleSuccess() {
    setSuccess(true)
    onComplete?.()
  }

  const completedCount = completedSteps.size
  const totalSteps     = section.steps.length
  const pct            = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0

  return (
    <div className="max-w-[860px] mx-auto px-6 sm:px-8 py-14 sm:py-20 space-y-10">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 bg-cyber-green/10 border border-cyber-green/20 rounded-lg px-3 py-1.5">
            <Terminal className="size-4 text-cyber-green" />
            <span className="font-bold text-xs text-cyber-green uppercase tracking-wider">Hands-On Lab</span>
          </div>
          <Badge variant={difficultyVariant(section.difficulty)}>{section.difficulty}</Badge>
          <Badge variant="default" className="gap-1.5">
            <span>{typeConfig.icon}</span>
            {typeConfig.label}
          </Badge>
          <Badge variant="outline" className="font-mono text-xs">
            ~{section.estimatedMinutes}min
          </Badge>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-foreground leading-tight">
          {section.objective}
        </h2>

        {/* Step progress bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
            <span>{completedCount} of {totalSteps} steps complete</span>
            <span className={cn('font-bold', pct === 100 ? 'text-cyber-green' : 'text-muted-foreground')}>
              {pct}%
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-base-700 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyber-green to-emerald-400 transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </motion.div>

      {/* Safety notice */}
      {section.safetyNotice && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-start gap-3 rounded-xl border border-cyber-red/30 bg-cyber-red/5 p-4 sm:p-5"
        >
          <AlertTriangle className="size-4 text-cyber-red shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-cyber-red uppercase tracking-wider mb-1.5">Safety Notice</p>
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
          className="rounded-xl border border-border bg-base-800/60 p-4 sm:p-5 space-y-3"
        >
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Before you start</p>
          <ul className="space-y-1.5">
            {section.prerequisites.map((req, i) => (
              <li key={i} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <span className="size-1.5 rounded-full bg-muted-foreground/50 shrink-0" />
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
        className="space-y-3"
      >
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">Steps</p>

        {section.steps.map((step, i) => {
          const done = completedSteps.has(step.id)

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 + i * 0.06 }}
              className={cn(
                'rounded-xl border overflow-hidden transition-all duration-200',
                done
                  ? 'border-cyber-green/30 bg-cyber-green/5'
                  : 'border-border bg-base-900',
              )}
            >
              {/* Step header */}
              <div
                className="flex items-start gap-4 p-4 sm:p-5 cursor-pointer hover:bg-base-800/30 transition-colors"
                onClick={() => toggleStep(step.id)}
              >
                <div className={cn(
                  'flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-all',
                  done
                    ? 'border-cyber-green bg-cyber-green/10 text-cyber-green'
                    : 'border-border text-muted-foreground',
                )}>
                  {done ? <CheckCircle2 className="size-4" /> : i + 1}
                </div>
                <div className="flex-1 min-w-0 space-y-0.5">
                  <p className={cn(
                    'font-semibold text-sm transition-colors leading-snug',
                    done ? 'text-cyber-green' : 'text-foreground',
                  )}>
                    {step.title}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Command */}
              {step.command && (
                <div className="mx-4 sm:mx-5 mb-3 rounded-xl bg-base-950 border border-border overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-border">
                    <div className="flex items-center gap-1.5">
                      <div className="size-2.5 rounded-full bg-cyber-red/60" />
                      <div className="size-2.5 rounded-full bg-cyber-orange/60" />
                      <div className="size-2.5 rounded-full bg-cyber-green/60" />
                    </div>
                    <button
                      onClick={() => copyCommand(step.command!)}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {copied === step.command
                        ? <><Check className="size-3 text-cyber-green" /><span className="text-cyber-green">Copied</span></>
                        : <><Copy className="size-3" />Copy</>
                      }
                    </button>
                  </div>
                  <code className="block px-4 sm:px-5 py-3.5 font-mono text-sm text-cyber-green">
                    $ {step.command}
                  </code>
                </div>
              )}

              {/* Expected output */}
              {step.expectedOutput && (
                <div className="mx-4 sm:mx-5 mb-4 space-y-1.5">
                  <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">Expected output</p>
                  <p className="text-xs font-mono text-cyber-blue bg-base-950 rounded-xl border border-border px-4 py-3">
                    {step.expectedOutput}
                  </p>
                </div>
              )}

              {/* Note */}
              {step.note && (
                <div className="mx-4 sm:mx-5 mb-4 flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="shrink-0">ℹ️</span>
                  <span className="leading-relaxed">{step.note}</span>
                </div>
              )}
            </motion.div>
          )
        })}
      </motion.div>

      {/* Hints */}
      {section.hints.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
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
                className="rounded-xl border border-cyber-orange/20 bg-cyber-orange/5 px-5 py-4 text-sm text-foreground leading-relaxed"
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
      <div className="rounded-xl border border-primary/20 bg-primary/5 overflow-hidden">
        <div className="px-5 py-3 border-b border-primary/15 bg-primary/8">
          <p className="text-[11px] font-bold text-primary uppercase tracking-widest font-mono">Expected Result</p>
        </div>
        <p className="px-5 py-4 text-[1.0625rem] text-foreground leading-[1.8]">{section.expectedResult}</p>
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
            <div className="rounded-xl border border-border bg-base-800 overflow-hidden">
              <div className="px-5 py-3 border-b border-border">
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Solution</p>
              </div>
              <p className="px-5 py-4 text-sm text-foreground leading-relaxed font-mono">{section.solution}</p>
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
            className="rounded-xl border border-cyber-green/40 bg-cyber-green/8 p-6 sm:p-8 text-center space-y-3"
          >
            <div className="text-4xl">🎉</div>
            <p className="font-bold text-lg text-cyber-green">Lab Complete!</p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
              Great work. You've completed this lab exercise. Press Next to continue.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
