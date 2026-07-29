import { motion } from 'framer-motion'
import { CheckCircle2, Zap } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { formatXP } from '@/lib/utils'
import type { ObjectivesSection } from '@/types/lesson-engine'

interface Props { section: ObjectivesSection }

export function ObjectivesSectionRenderer({ section }: Props) {
  return (
    <div className="max-w-[820px] mx-auto px-6 sm:px-8 py-14 sm:py-20 space-y-12">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <p className="text-[11px] font-black uppercase tracking-[0.25em] text-primary font-mono">
          Learning Objectives
        </p>
        <h2 className="text-2xl sm:text-3xl font-black text-foreground leading-tight">
          By the end of this mission you will:
        </h2>
      </motion.div>

      {/* Objectives list */}
      <div className="space-y-3">
        {section.objectives.map((obj, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.38, delay: i * 0.07 }}
            className="flex items-start gap-4 group p-4 rounded-xl hover:bg-base-800/40 transition-colors -mx-4"
          >
            <div className={[
              'flex size-8 shrink-0 items-center justify-center rounded-xl',
              'bg-primary/10 border border-primary/20 mt-0.5',
              'group-hover:bg-primary/15 transition-colors',
              'text-xs font-black font-mono text-primary',
            ].join(' ')}>
              {String(i + 1).padStart(2, '0')}
            </div>
            <div className="flex-1 pt-0.5">
              <p className="text-[1.0625rem] text-foreground leading-[1.75]">{obj}</p>
            </div>
            <CheckCircle2 className="size-4 text-muted-foreground/20 group-hover:text-primary/40 shrink-0 mt-1.5 transition-colors" />
          </motion.div>
        ))}
      </div>

      {/* XP preview */}
      {section.xpPreview && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: section.objectives.length * 0.07 + 0.1 }}
        >
          <Card variant="cyber-border" className="p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/15">
                <Zap className="size-4 text-primary" />
              </div>
              <span className="text-sm font-bold text-foreground">XP available this mission</span>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Base completion</span>
                <span className="font-mono font-bold text-foreground">+{formatXP(section.xpPreview.base)}</span>
              </div>
              {section.xpPreview.bonuses.map((bonus, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{bonus.label}</span>
                  <span className="font-mono font-bold text-cyber-green">+{formatXP(bonus.amount)}</span>
                </div>
              ))}
              <div className="pt-3 border-t border-border flex items-center justify-between">
                <span className="font-semibold text-sm text-foreground">Total potential</span>
                <span className="font-mono font-black text-primary text-lg">
                  +{formatXP(section.xpPreview.base + section.xpPreview.bonuses.reduce((s, b) => s + b.amount, 0))}
                </span>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
