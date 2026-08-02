import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft, Award, CheckCircle2, ChevronRight, Clock, LayoutList, Zap,
} from 'lucide-react'
import { ROUTES } from '@/lib/constants'
import type { CourseMissionMeta } from '@/lib/content'
import type { NextMissionInfo } from './block-player'

interface Badge {
  name: string
  description?: string
}

interface MissionCompleteScreenProps {
  mission: CourseMissionMeta
  xpEarned: number
  badges: Badge[]
  skills: string[]
  nextSteps: string[]
  totalBlocks: number
  completedCount: number
  nextMission?: NextMissionInfo | null
  onReview: () => void
}

export function MissionCompleteScreen({
  mission,
  xpEarned,
  badges,
  skills,
  nextSteps,
  totalBlocks,
  completedCount,
  nextMission,
  onReview,
}: MissionCompleteScreenProps) {
  const prefersReduced = useReducedMotion()

  const missionNum = mission.missionNumber != null
    ? String(mission.missionNumber).padStart(2, '0')
    : null

  const progressPct = totalBlocks > 0
    ? Math.round(completedCount / totalBlocks * 100)
    : 100

  // Animation helpers
  const dur  = prefersReduced ? 0 : 0.35
  const sdur = prefersReduced ? 0 : 0.25

  const heroVariants = {
    hidden:  { opacity: 0, scale: prefersReduced ? 1 : 0.75 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: dur, ease: [0.34, 1.4, 0.64, 1] },
    },
  }

  const containerVariants = {
    hidden:  {},
    visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.07, delayChildren: prefersReduced ? 0 : 0.2 } },
  }

  const itemVariants = {
    hidden:  { opacity: 0, y: prefersReduced ? 0 : 14 },
    visible: { opacity: 1, y: 0, transition: { duration: sdur, ease: 'easeOut' } },
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* Top bar */}
      <div className="flex-none flex items-center justify-between px-4 sm:px-6 py-3 border-b border-border/30 bg-base-950">
        <button
          onClick={onReview}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Review Mission
        </button>
        <Link
          to={ROUTES.COURSE(mission.courseSlug)}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Back to Course
        </Link>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-lg mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <motion.div
            className="space-y-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >

            {/* Hero */}
            <div className="flex flex-col items-center text-center gap-5">
              <motion.div
                variants={heroVariants}
                className="flex size-24 items-center justify-center rounded-full bg-cyber-green/10 border-2 border-cyber-green/30 shadow-[0_0_40px_rgba(0,255,135,0.14)]"
              >
                <CheckCircle2 className="size-12 text-cyber-green" />
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <p className="text-[10px] font-mono font-bold tracking-[0.3em] text-cyber-green/70 uppercase">
                  {missionNum ? `Mission ${missionNum}` : 'Mission'} — Complete
                </p>
                <h1 className="text-2xl sm:text-3xl font-black text-foreground leading-tight">
                  {mission.title}
                </h1>
                {mission.tagline && (
                  <p className="text-sm text-muted-foreground">{mission.tagline}</p>
                )}
              </motion.div>

              {/* Stat pills */}
              <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-2.5">
                <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-5 py-2 shadow-[0_0_20px_rgba(0,217,255,0.07)]">
                  <Zap className="size-4 text-primary" />
                  <span className="text-xl font-black text-primary">+{xpEarned} XP</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-border/40 bg-base-900 px-4 py-2">
                  <Clock className="size-3.5 text-muted-foreground" />
                  <span className="text-sm font-semibold text-foreground/70">
                    ~{mission.estimatedMinutes} min
                  </span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-border/40 bg-base-900 px-4 py-2">
                  <LayoutList className="size-3.5 text-muted-foreground" />
                  <span className="text-sm font-semibold text-foreground/70">
                    {completedCount}/{totalBlocks} blocks
                  </span>
                </div>
              </motion.div>

              {/* Overall progress bar */}
              <motion.div variants={itemVariants} className="w-full space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                  <span>Mission Progress</span>
                  <span className="text-primary/80">{progressPct}%</span>
                </div>
                <div className="h-2 rounded-full bg-base-800 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-cyber-blue to-cyber-green"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: prefersReduced ? 0 : 0.8, ease: 'easeOut', delay: prefersReduced ? 0 : 0.3 }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Badges */}
            {badges.length > 0 && (
              <motion.section variants={itemVariants} className="space-y-3">
                <h2 className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-muted-foreground flex items-center gap-1.5">
                  <Award className="size-3" />
                  Badge{badges.length > 1 ? 's' : ''} Earned
                </h2>
                <div className="space-y-2">
                  {badges.map((badge, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4"
                    >
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                        <Award className="size-4 text-primary" />
                      </div>
                      <div className="space-y-0.5 min-w-0">
                        <p className="text-sm font-semibold text-foreground">{badge.name}</p>
                        {badge.description && (
                          <p className="text-xs text-muted-foreground leading-relaxed">{badge.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Skills unlocked */}
            {skills.length > 0 && (
              <motion.section variants={itemVariants} className="space-y-3">
                <h2 className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-muted-foreground">
                  Skills Unlocked
                </h2>
                <ul className="space-y-2">
                  {skills.map((skill, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <CheckCircle2 className="size-4 shrink-0 mt-0.5 text-cyber-green/70" />
                      <span className="leading-relaxed">{skill}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>
            )}

            {/* What's next */}
            {nextSteps.length > 0 && (
              <motion.section variants={itemVariants} className="space-y-3">
                <h2 className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-muted-foreground">
                  What's Next
                </h2>
                <ul className="space-y-2">
                  {nextSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                      <ChevronRight className="size-4 shrink-0 mt-0.5 text-primary/50" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>
            )}

            {/* Course complete banner */}
            {nextMission?.kind === 'course-complete' && (
              <motion.div
                variants={itemVariants}
                className="rounded-xl border border-cyber-green/40 bg-cyber-green/8 px-6 py-5 text-center shadow-[0_0_30px_rgba(0,255,135,0.08)]"
              >
                <p className="text-2xl mb-1" aria-label="Party">🎉</p>
                <p className="text-base font-black text-cyber-green tracking-wide">Course Complete!</p>
                <p className="text-xs text-cyber-green/60 mt-1">
                  You've finished every mission in this course.
                </p>
              </motion.div>
            )}

            {/* CTA buttons */}
            <motion.div variants={itemVariants} className="flex flex-col gap-3 pt-2">
              {nextMission?.kind === 'mission' && nextMission.slug && (
                <Link
                  to={ROUTES.MISSION(nextMission.slug)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-cyber-green/40 bg-cyber-green/8 px-6 py-3.5 text-sm font-semibold text-cyber-green hover:bg-cyber-green/15 transition-all"
                >
                  Continue to Next Mission
                  <ChevronRight className="size-4" />
                </Link>
              )}
              <Link
                to={ROUTES.COURSE(mission.courseSlug)}
                className="flex items-center justify-center gap-2 rounded-xl border border-primary/40 bg-primary/8 px-6 py-3.5 text-sm font-semibold text-primary hover:bg-primary/15 transition-all"
              >
                Return to Course
                <ChevronRight className="size-4" />
              </Link>
              <button
                onClick={onReview}
                className="flex items-center justify-center gap-2 rounded-xl border border-border/50 bg-base-900 px-6 py-3.5 text-sm font-medium text-foreground/60 hover:text-foreground hover:border-border hover:bg-base-800 transition-all"
              >
                <ArrowLeft className="size-4" />
                Review Mission
              </button>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </div>
  )
}
