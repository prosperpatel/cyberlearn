import { useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion'
import { Trophy, ChevronRight, Clock, CheckCircle2, Zap, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn, formatDuration } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/constants'
import type { FullLesson } from '@/types/lesson-engine'

interface Props {
  lesson:            FullLesson
  isVisible:         boolean
  onDismiss:         () => void
  xpEarned:          number
  sectionsCompleted: number
  elapsedMinutes:    number
}

function AnimatedXP({ value }: { value: number }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => `+${Math.round(v)}`)

  useEffect(() => {
    const controls = animate(count, value, { duration: 2, ease: 'easeOut', delay: 0.7 })
    return controls.stop
  }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.span className="font-black tabular-nums text-5xl sm:text-6xl text-gradient-cyber">
      {rounded}
    </motion.span>
  )
}

export function MissionComplete({
  lesson, isVisible, onDismiss, xpEarned, sectionsCompleted, elapsedMinutes,
}: Props) {
  const summarySection = lesson.sections.find((s) => s.type === 'summary')
  const nextLesson = summarySection?.type === 'summary' ? summarySection.nextLesson : undefined
  const missionNumber = String(lesson.order ?? 1).padStart(2, '0')

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] bg-background/97 backdrop-blur-2xl flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background grid */}
          <div className="absolute inset-0 bg-grid opacity-[0.08]" aria-hidden />

          {/* Pulsing glow rings from center */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
            {[280, 420, 580].map((size, i) => (
              <motion.div
                key={size}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0.6, 1], opacity: [0.3, 0] }}
                transition={{ duration: 2.5, delay: 0.2 + i * 0.35, repeat: Infinity, repeatDelay: 0.5, ease: 'easeOut' }}
                className="absolute rounded-full border border-cyber-green/30"
                style={{ width: size, height: size }}
              />
            ))}
          </div>

          {/* Radial glow behind trophy */}
          <div
            className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, #00FF87, transparent)' }}
            aria-hidden
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-7 px-6 max-w-lg w-full text-center">

            {/* Classification header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2"
            >
              <Shield className="size-3.5 text-cyber-green/60" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyber-green/60 font-mono">
                Cyber Defense Agency · Mission {missionNumber} Complete
              </span>
              <Shield className="size-3.5 text-cyber-green/60" />
            </motion.div>

            {/* Trophy */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.175, 0.885, 0.32, 1.275] }}
              className="relative"
            >
              <div className="flex size-28 items-center justify-center rounded-3xl bg-gradient-cyber shadow-cyber-xl">
                <Trophy className="size-14 text-base-950" />
              </div>
              <div className="absolute inset-0 rounded-3xl bg-gradient-cyber blur-2xl opacity-40 -z-10" />
            </motion.div>

            {/* Mission accomplished headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <p className="text-xs font-black uppercase tracking-[0.35em] text-cyber-green font-mono">
                Mission Accomplished
              </p>
              <h1 className="text-2xl sm:text-3xl font-black text-foreground leading-snug">
                {lesson.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                Outstanding work, Recruit. Your training continues.
              </p>
            </motion.div>

            {/* XP earned */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45, ease: [0.175, 0.885, 0.32, 1.275] }}
              className="flex flex-col items-center gap-1.5"
            >
              <div className="flex items-center gap-3">
                <Zap className="size-6 text-cyber-green" />
                <AnimatedXP value={xpEarned} />
                <span className="text-2xl font-black text-muted-foreground/60">XP</span>
              </div>
              <p className="text-xs text-muted-foreground font-mono">Experience earned this mission</p>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-3 w-full"
            >
              {[
                {
                  icon:  CheckCircle2,
                  label: 'Sections',
                  value: `${sectionsCompleted}/${lesson.sections.length}`,
                  color: 'text-cyber-green',
                },
                {
                  icon:  Clock,
                  label: 'Duration',
                  value: formatDuration(elapsedMinutes),
                  color: 'text-cyber-blue',
                },
                {
                  icon:  Trophy,
                  label: 'Mission',
                  value: `#${missionNumber}`,
                  color: 'text-cyber-purple',
                },
              ].map(({ icon: Icon, label, value, color }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-base-800/60 border border-border/60"
                >
                  <Icon className={cn('size-4', color)} />
                  <span className="text-sm font-bold text-foreground tabular-nums">{value}</span>
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="flex flex-col sm:flex-row gap-3 w-full"
            >
              {nextLesson && (
                <Button asChild variant="cyber" size="lg" className="flex-1 gap-2">
                  <Link to={ROUTES.LESSON(nextLesson.courseSlug, nextLesson.slug)}>
                    Begin Next Mission
                    <ChevronRight className="size-4" />
                  </Link>
                </Button>
              )}
              <Button
                variant="outline"
                size="lg"
                onClick={onDismiss}
                className={cn('gap-2', nextLesson ? 'sm:w-auto' : 'w-full')}
              >
                Review Mission
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
