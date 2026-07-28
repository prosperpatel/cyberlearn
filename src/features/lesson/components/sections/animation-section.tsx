import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import type { AnimationSection } from '@/types/lesson-engine'

interface Props { section: AnimationSection }

const HIGHLIGHT_STYLES: Record<string, string> = {
  attacker: 'bg-cyber-red/10 border-cyber-red/30',
  server:   'bg-cyber-purple/10 border-cyber-purple/30',
  database: 'bg-cyber-green/10 border-cyber-green/30',
  user:     'bg-cyber-blue/10 border-cyber-blue/30',
  none:     'bg-base-800 border-border',
}

const HIGHLIGHT_EMOJI: Record<string, string> = {
  attacker: '🕵️',
  server:   '🖥️',
  database: '🗄️',
  user:     '👤',
  none:     '⬡',
}

export function AnimationSectionRenderer({ section }: Props) {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)

  const current = section.steps[step]
  const isFirst = step === 0
  const isLast  = step === section.steps.length - 1

  function go(next: number, dir: 1 | -1) {
    setDirection(dir)
    setStep(next)
  }

  const highlight = current.highlight ?? 'none'
  const highlightStyle = HIGHLIGHT_STYLES[highlight] ?? HIGHLIGHT_STYLES.none

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
        <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
        <p className="text-muted-foreground text-sm">{section.intro}</p>
      </motion.div>

      {/* Step counter + progress */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono text-muted-foreground">
          Step {step + 1} of {section.steps.length}
        </span>
        <Progress
          value={step + 1}
          max={section.steps.length}
          size="xs"
          color="gradient"
          className="flex-1"
        />
      </div>

      {/* Animation stage */}
      <div className="rounded-xl border border-border bg-base-900 overflow-hidden min-h-[280px] flex flex-col">
        {/* Stage header */}
        <div className={cn(
          'border-b border-border px-5 py-3 flex items-center gap-3 transition-all duration-300',
          highlightStyle,
        )}>
          <span className="text-xl" aria-hidden>
            {HIGHLIGHT_EMOJI[highlight]}
          </span>
          <span className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">
            {highlight !== 'none' ? highlight : 'system'} perspective
          </span>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: direction * 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -30 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="flex-1 p-5 space-y-4"
          >
            <div>
              <h3 className="font-bold text-foreground">{current.title}</h3>
              <p className="text-muted-foreground text-sm mt-1.5 leading-relaxed">
                {current.description}
              </p>
            </div>

            {current.code && (
              <div className="rounded-lg bg-base-950 border border-border overflow-x-auto">
                <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border">
                  <div className="size-2 rounded-full bg-cyber-red/70" />
                  <div className="size-2 rounded-full bg-cyber-orange/70" />
                  <div className="size-2 rounded-full bg-cyber-green/70" />
                </div>
                <pre className="p-4 font-mono text-xs text-cyber-green leading-relaxed whitespace-pre">
                  {current.code}
                </pre>
              </div>
            )}

            {current.visualNote && (
              <div className="flex items-start gap-2 rounded-lg bg-primary/5 border border-primary/20 p-3">
                <span className="text-sm" aria-hidden>💡</span>
                <p className="text-sm text-foreground leading-relaxed">{current.visualNote}</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => go(step - 1, -1)}
          disabled={isFirst}
        >
          <ChevronLeft className="size-4" />
          Previous
        </Button>

        {/* Step dots */}
        <div className="flex items-center gap-1.5">
          {section.steps.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > step ? 1 : -1)}
              className={cn(
                'rounded-full transition-all duration-200',
                i === step
                  ? 'size-2.5 bg-primary'
                  : i < step
                    ? 'size-2 bg-primary/40'
                    : 'size-2 bg-base-600'
              )}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => go(step + 1, 1)}
          disabled={isLast}
        >
          Next
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}
