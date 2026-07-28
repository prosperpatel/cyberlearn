import { motion } from 'framer-motion'
import { CheckCircle2, Zap } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { formatXP } from '@/lib/utils'
import type { ObjectivesSection } from '@/types/lesson-engine'

interface Props { section: ObjectivesSection }

export function ObjectivesSectionRenderer({ section }: Props) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <p className="text-xs font-bold uppercase tracking-widest text-primary font-mono">
          Learning Objectives
        </p>
        <h2 className="text-2xl font-black text-foreground">
          By the end of this lesson you will:
        </h2>
      </motion.div>

      <div className="space-y-3">
        {section.objectives.map((obj, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: i * 0.07 }}
            className="flex items-start gap-3 group"
          >
            <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/20 mt-0.5 group-hover:bg-primary/20 transition-colors">
              <CheckCircle2 className="size-4 text-primary" />
            </div>
            <p className="text-base text-foreground leading-relaxed pt-0.5">{obj}</p>
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
          <Card variant="cyber-border" className="p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="size-4 text-primary" />
              <span className="text-sm font-bold text-foreground">XP you can earn</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Base completion XP</span>
                <span className="font-mono font-bold text-foreground">+{formatXP(section.xpPreview.base)}</span>
              </div>
              {section.xpPreview.bonuses.map((bonus, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{bonus.label}</span>
                  <span className="font-mono font-bold text-cyber-green">+{formatXP(bonus.amount)}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-border flex items-center justify-between">
                <span className="font-semibold text-sm">Total potential</span>
                <span className="font-mono font-black text-primary text-base">
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
