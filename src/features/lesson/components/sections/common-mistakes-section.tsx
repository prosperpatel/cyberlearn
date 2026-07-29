import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, XCircle, CheckCircle2, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CommonMistakesSection } from '@/types/lesson-engine'

interface Props { section: CommonMistakesSection }

export function CommonMistakesSectionRenderer({ section }: Props) {
  const [expanded, setExpanded] = useState<number | null>(0)

  return (
    <div className="max-w-[820px] mx-auto px-6 sm:px-8 py-14 sm:py-20 space-y-10">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-cyber-orange/12">
            <AlertTriangle className="size-4 text-cyber-orange" />
          </div>
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-cyber-orange font-mono">
            Common Mistakes
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-foreground leading-tight">
          Don't learn from your own mistakes.<br className="hidden sm:block" /> Learn from everyone else's.
        </h2>
        {section.intro && (
          <p className="text-[1.0625rem] text-muted-foreground leading-[1.8]">{section.intro}</p>
        )}
      </motion.div>

      {/* Mistakes accordion */}
      <div className="space-y-3">
        {section.mistakes.map((mistake, i) => {
          const isOpen     = expanded === i
          const isCritical = mistake.severity === 'critical'

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className={cn(
                'rounded-xl border overflow-hidden transition-colors duration-200',
                isCritical
                  ? 'border-cyber-red/30'
                  : 'border-cyber-orange/30',
                isOpen && (isCritical ? 'bg-cyber-red/3' : 'bg-cyber-orange/3'),
              )}
            >
              {/* Accordion header */}
              <button
                className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-base-800/40 transition-colors"
                onClick={() => setExpanded(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                {/* Severity dot */}
                <div className={cn(
                  'flex size-9 shrink-0 items-center justify-center rounded-xl text-base',
                  isCritical
                    ? 'bg-cyber-red/12 border border-cyber-red/20'
                    : 'bg-cyber-orange/12 border border-cyber-orange/20',
                )}>
                  {isCritical ? '🔴' : '🟠'}
                </div>

                <div className="flex-1 min-w-0 space-y-0.5">
                  <p className="font-semibold text-sm text-foreground leading-snug">
                    {mistake.title}
                  </p>
                  <span className={cn(
                    'inline-flex text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded',
                    isCritical
                      ? 'bg-cyber-red/10 text-cyber-red'
                      : 'bg-cyber-orange/10 text-cyber-orange',
                  )}>
                    {mistake.severity}
                  </span>
                </div>

                <ChevronDown
                  className={cn(
                    'size-4 text-muted-foreground shrink-0 transition-transform duration-200',
                    isOpen && 'rotate-180',
                  )}
                />
              </button>

              {/* Expanded content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="px-5 pb-5 pt-1 space-y-4 border-t border-border/50">
                      {/* Wrong vs right comparison */}
                      <div className="grid sm:grid-cols-2 gap-3 mt-3">
                        <div className="rounded-xl border border-cyber-red/20 bg-cyber-red/5 p-4 space-y-2">
                          <div className="flex items-center gap-1.5 text-cyber-red text-xs font-bold uppercase tracking-wider">
                            <XCircle className="size-3.5" />
                            Common mistake
                          </div>
                          <p className="text-sm text-foreground leading-relaxed italic">
                            "{mistake.wrong}"
                          </p>
                        </div>
                        <div className="rounded-xl border border-cyber-green/20 bg-cyber-green/5 p-4 space-y-2">
                          <div className="flex items-center gap-1.5 text-cyber-green text-xs font-bold uppercase tracking-wider">
                            <CheckCircle2 className="size-3.5" />
                            What to do instead
                          </div>
                          <p className="text-sm text-foreground leading-relaxed italic">
                            "{mistake.right}"
                          </p>
                        </div>
                      </div>

                      {/* Explanation */}
                      <p className="text-[1.0625rem] text-muted-foreground leading-[1.8]">
                        {mistake.explanation}
                      </p>

                      {/* Code example */}
                      {mistake.example && (
                        <div className="rounded-xl bg-base-950 border border-border p-4">
                          <p className="text-[11px] font-mono text-muted-foreground mb-2 uppercase tracking-wider">Example</p>
                          <code className="text-sm font-mono text-cyber-blue leading-relaxed">
                            {mistake.example}
                          </code>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
