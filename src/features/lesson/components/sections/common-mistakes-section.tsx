import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, XCircle, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CommonMistakesSection } from '@/types/lesson-engine'

interface Props { section: CommonMistakesSection }

export function CommonMistakesSectionRenderer({ section }: Props) {
  const [expanded, setExpanded] = useState<number | null>(0)

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <div className="flex items-center gap-2 text-cyber-orange">
          <AlertTriangle className="size-5" />
          <span className="text-xs font-bold uppercase tracking-widest font-mono">Common Mistakes</span>
        </div>
        <h2 className="text-xl font-bold text-foreground">
          Don't learn from your own mistakes. Learn from everyone else's.
        </h2>
        {section.intro && (
          <p className="text-muted-foreground leading-relaxed">{section.intro}</p>
        )}
      </motion.div>

      <div className="space-y-3">
        {section.mistakes.map((mistake, i) => {
          const isOpen = expanded === i
          const isCritical = mistake.severity === 'critical'

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={cn(
                'rounded-xl border overflow-hidden transition-all duration-200',
                isCritical ? 'border-cyber-red/30' : 'border-cyber-orange/30',
              )}
            >
              {/* Header */}
              <button
                className="w-full flex items-center gap-3 p-4 text-left hover:bg-base-800 transition-colors"
                onClick={() => setExpanded(isOpen ? null : i)}
              >
                <div className={cn(
                  'flex size-8 shrink-0 items-center justify-center rounded-lg text-sm',
                  isCritical
                    ? 'bg-cyber-red/10 text-cyber-red'
                    : 'bg-cyber-orange/10 text-cyber-orange',
                )}>
                  {isCritical ? '🔴' : '🟠'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-foreground">{mistake.title}</span>
                    <span className={cn(
                      'text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded',
                      isCritical
                        ? 'bg-cyber-red/10 text-cyber-red'
                        : 'bg-cyber-orange/10 text-cyber-orange',
                    )}>
                      {mistake.severity}
                    </span>
                  </div>
                </div>
                <span className={cn('text-xs text-muted-foreground transition-transform duration-200', isOpen && 'rotate-180')}>
                  ▾
                </span>
              </button>

              {/* Expanded content */}
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-4 pb-4 space-y-3"
                >
                  {/* Wrong vs right */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="rounded-lg border border-cyber-red/20 bg-cyber-red/5 p-3 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-cyber-red text-xs font-bold uppercase tracking-wider">
                        <XCircle className="size-3.5" />
                        Wrong
                      </div>
                      <p className="text-sm text-foreground leading-relaxed italic">"{mistake.wrong}"</p>
                    </div>
                    <div className="rounded-lg border border-cyber-green/20 bg-cyber-green/5 p-3 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-cyber-green text-xs font-bold uppercase tracking-wider">
                        <CheckCircle2 className="size-3.5" />
                        Right
                      </div>
                      <p className="text-sm text-foreground leading-relaxed italic">"{mistake.right}"</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">{mistake.explanation}</p>

                  {mistake.example && (
                    <div className="rounded-lg bg-base-950 border border-border p-3">
                      <p className="text-xs font-mono text-muted-foreground mb-1">Example:</p>
                      <code className="text-xs font-mono text-cyber-blue">{mistake.example}</code>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
