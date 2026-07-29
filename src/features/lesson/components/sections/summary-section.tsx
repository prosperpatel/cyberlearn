import { motion } from 'framer-motion'
import { ChevronRight, CheckCircle2, Zap, Clock, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatXP, formatDuration } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ROUTES } from '@/lib/constants'
import type { SummarySection } from '@/types/lesson-engine'

interface Props { section: SummarySection }

export function SummarySectionRenderer({ section }: Props) {
  const { xpBreakdown } = section
  const totalXP = xpBreakdown.total

  const xpLines = [
    { label: 'Mission completion',  amount: xpBreakdown.base          },
    { label: 'Hands-on activity',   amount: xpBreakdown.activityBonus  },
    { label: 'Field challenge',     amount: xpBreakdown.challengeBonus },
    { label: 'Knowledge check',     amount: xpBreakdown.quizBonus      },
  ].filter((x) => x.amount > 0)

  return (
    <div className="max-w-[820px] mx-auto px-6 sm:px-8 py-14 sm:py-20 space-y-12">

      {/* Mission debrief header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }}
        className="text-center space-y-5"
      >
        {/* CDA seal */}
        <div className="flex justify-center">
          <div className="relative inline-block">
            <div className="flex size-20 mx-auto items-center justify-center rounded-2xl bg-gradient-cyber shadow-cyber-xl">
              <Shield className="size-10 text-base-950" />
            </div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-cyber blur-2xl opacity-35 -z-10" />
          </div>
        </div>

        <div className="space-y-1.5">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-cyber-green/60 font-mono">
            CDA · Mission Debrief
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-gradient-cyber">
            Mission Complete
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed max-w-md mx-auto">
            Review what you covered and prepare for the next mission.
          </p>
        </div>
      </motion.div>

      {/* Key takeaways */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-4"
      >
        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">
          Mission Debrief — Key Findings
        </h3>
        <div className="space-y-2.5">
          {section.keyTakeaways.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.07 }}
              className="flex items-start gap-3.5 p-4 sm:p-5 rounded-xl bg-base-800/60 border border-border/50 hover:bg-base-800/80 transition-colors"
            >
              <CheckCircle2 className="size-4 text-cyber-green shrink-0 mt-1" />
              <p className="text-[1.0625rem] text-foreground leading-[1.75]">{point}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* XP breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card variant="cyber-border" className="overflow-hidden">
          <div className="p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/15">
                <Zap className="size-4 text-primary" />
              </div>
              <span className="text-sm font-bold text-foreground">XP Earned This Mission</span>
            </div>

            <div className="space-y-2.5">
              {xpLines.map(({ label, amount }) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-mono font-bold text-cyber-green">+{formatXP(amount)}</span>
                </div>
              ))}

              {xpBreakdown.streakMultiplier > 1 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">🔥 Streak bonus</span>
                  <span className="font-mono font-bold text-cyber-orange">×{xpBreakdown.streakMultiplier}</span>
                </div>
              )}

              <div className="pt-3 border-t border-border flex items-center justify-between">
                <span className="font-bold text-foreground">Total earned</span>
                <span className="font-mono font-black text-primary text-xl">+{formatXP(totalXP)}</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Related topics */}
      {section.relatedTopics && section.relatedTopics.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="space-y-3"
        >
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            Further Intelligence
          </h3>
          <div className="flex flex-wrap gap-2">
            {section.relatedTopics.map((topic) => (
              <span
                key={topic}
                className="text-xs px-3.5 py-1.5 rounded-full border border-border bg-base-800 text-muted-foreground hover:border-primary/30 hover:text-foreground transition-colors cursor-default"
              >
                {topic}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Next mission CTA */}
      {section.nextLesson && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card variant="interactive" className="overflow-hidden border-primary/20">
            <div className="p-5 sm:p-6 flex items-center justify-between gap-4">
              <div className="space-y-1.5">
                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-mono">
                  Next Mission
                </p>
                <p className="font-bold text-base text-foreground leading-snug">
                  {section.nextLesson.title}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="size-3" />
                  {formatDuration(section.nextLesson.estimatedMinutes)}
                </div>
              </div>
              <Button asChild variant="cyber" size="sm" className="shrink-0 gap-1.5">
                <Link to={ROUTES.LESSON(section.nextLesson.courseSlug, section.nextLesson.slug)}>
                  Begin
                  <ChevronRight className="size-4" />
                </Link>
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
