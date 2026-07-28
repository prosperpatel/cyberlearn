import { motion } from 'framer-motion'
import { Award, ChevronRight, CheckCircle2, Zap, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatXP, formatDuration } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ROUTES } from '@/lib/constants'
import type { SummarySection } from '@/types/lesson-engine'

interface Props { section: SummarySection }

export function SummarySectionRenderer({ section }: Props) {
  const { xpBreakdown } = section

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">
      {/* Celebration header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }}
        className="text-center space-y-4"
      >
        <div className="relative inline-block">
          <div className="flex size-20 mx-auto items-center justify-center rounded-2xl bg-gradient-cyber shadow-cyber-xl">
            <Award className="size-10 text-base-950" />
          </div>
          <div className="absolute inset-0 rounded-2xl bg-gradient-cyber blur-xl opacity-40" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-gradient-cyber">Lesson Complete!</h2>
          <p className="text-muted-foreground mt-1">You've mastered the fundamentals. Here's what you covered:</p>
        </div>
      </motion.div>

      {/* Key takeaways */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-3"
      >
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
          Key Takeaways
        </h3>
        <div className="space-y-2">
          {section.keyTakeaways.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.06 }}
              className="flex items-start gap-3 p-3 rounded-lg bg-base-800"
            >
              <CheckCircle2 className="size-4 text-cyber-green shrink-0 mt-0.5" />
              <p className="text-sm text-foreground leading-relaxed">{point}</p>
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
        <Card variant="cyber-border" className="p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="size-4 text-primary" />
            <span className="text-sm font-bold">XP Earned</span>
          </div>

          <div className="space-y-2">
            {[
              { label: 'Lesson completion',   amount: xpBreakdown.base           },
              { label: 'Hands-on lab',         amount: xpBreakdown.activityBonus  },
              { label: 'Challenge',            amount: xpBreakdown.challengeBonus },
              { label: 'Quiz',                 amount: xpBreakdown.quizBonus      },
            ].map(({ label, amount }) => amount > 0 && (
              <div key={label} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-mono font-bold text-cyber-green">+{formatXP(amount)}</span>
              </div>
            ))}

            {xpBreakdown.streakMultiplier > 1 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">🔥 Streak bonus</span>
                <span className="font-mono font-bold text-cyber-orange">
                  ×{xpBreakdown.streakMultiplier}
                </span>
              </div>
            )}

            <div className="pt-2 border-t border-border flex items-center justify-between">
              <span className="font-bold text-foreground">Total earned</span>
              <span className="font-mono font-black text-primary text-lg">
                +{formatXP(xpBreakdown.total)}
              </span>
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
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Explore Next
          </h3>
          <div className="flex flex-wrap gap-2">
            {section.relatedTopics.map((topic) => (
              <span
                key={topic}
                className="text-xs px-3 py-1.5 rounded-full border border-border bg-base-800 text-muted-foreground"
              >
                {topic}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Next lesson CTA */}
      {section.nextLesson && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card variant="interactive" className="p-5 border-primary/20">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">
                  Up next
                </p>
                <p className="font-bold text-foreground">{section.nextLesson.title}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="size-3" />
                  {formatDuration(section.nextLesson.estimatedMinutes)}
                </div>
              </div>
              <Button
                asChild
                variant="cyber"
                size="sm"
                className="shrink-0"
              >
                <Link
                  to={ROUTES.LESSON(
                    section.nextLesson.courseSlug,
                    section.nextLesson.slug,
                  )}
                >
                  Start
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
