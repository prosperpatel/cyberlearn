import { motion } from 'framer-motion'
import { Building2, AlertTriangle, BookOpen, BarChart3 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import type { RealWorldExampleSection } from '@/types/lesson-engine'

interface Props { section: RealWorldExampleSection }

export function RealWorldSectionRenderer({ section }: Props) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">
      {/* Case study header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1"
      >
        <p className="text-xs font-bold uppercase tracking-widest text-cyber-red font-mono">
          Real World Case Study
        </p>
        <h2 className="text-2xl font-black text-foreground">{section.incident}</h2>
      </motion.div>

      {/* Company banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="flex items-center justify-between rounded-xl border border-cyber-red/20 bg-cyber-red/5 p-5"
      >
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-xl bg-cyber-red/10 border border-cyber-red/20">
            <Building2 className="size-6 text-cyber-red" />
          </div>
          <div>
            <p className="font-black text-lg text-foreground">{section.company}</p>
            {section.industry && (
              <p className="text-sm text-muted-foreground">{section.industry}</p>
            )}
          </div>
        </div>
        {section.year && (
          <div className="text-right">
            <p className="text-2xl font-black text-cyber-red">{section.year}</p>
            <p className="text-xs text-muted-foreground">Year of breach</p>
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
            <div key={i} className="rounded-xl border border-border bg-base-800 p-3 text-center">
              <p className="text-xl font-black text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      )}

      {/* What happened */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16 }}
        className="space-y-3"
      >
        <div className="flex items-center gap-2 text-sm font-bold text-foreground">
          <AlertTriangle className="size-4 text-cyber-red" />
          What happened
        </div>
        <ul className="space-y-2">
          {section.whatHappened.map((point, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-foreground leading-relaxed">
              <span className="mt-1.5 size-1.5 rounded-full bg-cyber-red shrink-0" />
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
        className="space-y-3"
      >
        <div className="flex items-center gap-2 text-sm font-bold text-foreground">
          <BarChart3 className="size-4 text-cyber-orange" />
          Root causes
        </div>
        <ul className="space-y-2">
          {section.whyItHappened.map((point, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-foreground leading-relaxed">
              <span className="mt-1.5 size-1.5 rounded-full bg-cyber-orange shrink-0" />
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
        className="space-y-3"
      >
        <div className="flex items-center gap-2 text-sm font-bold text-foreground">
          <BookOpen className="size-4 text-cyber-green" />
          What we can learn
        </div>
        <div className="space-y-2">
          {section.lessonsLearned.map((lesson, i) => (
            <Card key={i} variant="flat" className="flex items-start gap-3 p-4">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-cyber-green/10 text-xs font-bold text-cyber-green border border-cyber-green/20">
                {i + 1}
              </span>
              <p className="text-sm text-foreground leading-relaxed">{lesson}</p>
            </Card>
          ))}
        </div>
      </motion.div>

      {section.sourceLabel && (
        <p className="text-xs text-muted-foreground font-mono">
          Source: {section.sourceLabel}
        </p>
      )}
    </div>
  )
}
