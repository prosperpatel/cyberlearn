import { motion } from 'framer-motion'
import { Building2, AlertTriangle, BookOpen, BarChart3, ShieldAlert } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { RealWorldExampleSection } from '@/types/lesson-engine'

interface Props { section: RealWorldExampleSection }

export function RealWorldSectionRenderer({ section }: Props) {
  return (
    <div className="max-w-[860px] mx-auto px-6 sm:px-8 py-14 sm:py-20 space-y-12">

      {/* Case study header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <div className="flex items-center gap-2">
          <ShieldAlert className="size-3.5 text-cyber-red" />
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-cyber-red font-mono">
            Real World Case Study
          </p>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-foreground leading-tight">{section.incident}</h2>
      </motion.div>

      {/* Company banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="flex items-center justify-between rounded-xl border border-cyber-red/25 bg-cyber-red/5 p-5 sm:p-6 gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-cyber-red/10 border border-cyber-red/20">
            <Building2 className="size-7 text-cyber-red" />
          </div>
          <div>
            <p className="font-black text-xl text-foreground">{section.company}</p>
            {section.industry && (
              <p className="text-sm text-muted-foreground mt-0.5">{section.industry}</p>
            )}
          </div>
        </div>
        {section.year && (
          <div className="text-right shrink-0">
            <p className="text-3xl font-black text-cyber-red tabular-nums">{section.year}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Year of breach</p>
          </div>
        )}
      </motion.div>

      {/* Impact stats */}
      {section.impact && section.impact.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {section.impact.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.06 }}
              className="rounded-xl border border-border bg-base-800/70 p-4 text-center space-y-1"
            >
              <p className="text-2xl font-black text-foreground tabular-nums">{stat.value}</p>
              <p className="text-xs text-muted-foreground leading-tight">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* What happened */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-lg bg-cyber-red/10">
            <AlertTriangle className="size-3.5 text-cyber-red" />
          </div>
          <span className="text-sm font-bold text-foreground">What happened</span>
        </div>
        <ul className="space-y-2.5">
          {section.whatHappened.map((point, i) => (
            <li key={i} className="flex items-start gap-3 text-[1.0625rem] text-foreground/85 leading-[1.75]">
              <span className="mt-[9px] size-1.5 rounded-full bg-cyber-red shrink-0" />
              {point}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Why it happened */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-lg bg-cyber-orange/10">
            <BarChart3 className="size-3.5 text-cyber-orange" />
          </div>
          <span className="text-sm font-bold text-foreground">Root causes</span>
        </div>
        <ul className="space-y-2.5">
          {section.whyItHappened.map((point, i) => (
            <li key={i} className="flex items-start gap-3 text-[1.0625rem] text-foreground/85 leading-[1.75]">
              <span className="mt-[9px] size-1.5 rounded-full bg-cyber-orange shrink-0" />
              {point}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Lessons learned */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.24 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-lg bg-cyber-green/10">
            <BookOpen className="size-3.5 text-cyber-green" />
          </div>
          <span className="text-sm font-bold text-foreground">What we can learn</span>
        </div>
        <div className="space-y-2.5">
          {section.lessonsLearned.map((lesson, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.28 + i * 0.07 }}
            >
              <Card variant="flat" className="flex items-start gap-4 p-4 sm:p-5 hover:bg-base-700/60 transition-colors">
                <span className={cn(
                  'flex size-7 shrink-0 items-center justify-center rounded-full',
                  'bg-cyber-green/12 text-xs font-bold text-cyber-green border border-cyber-green/20',
                )}>
                  {i + 1}
                </span>
                <p className="text-[1.0625rem] text-foreground leading-[1.75]">{lesson}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {section.sourceLabel && (
        <p className="text-xs text-muted-foreground/50 font-mono">
          Source: {section.sourceLabel}
        </p>
      )}
    </div>
  )
}
