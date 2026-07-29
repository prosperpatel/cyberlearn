import { useEffect } from 'react'
import { ArrowLeft, Clock, Menu, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { cn, formatDuration } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/constants'
import { SECTION_LABELS } from '@/types/lesson-engine'
import type { FullLesson } from '@/types/lesson-engine'
import type { useLessonProgress } from '../hooks/use-lesson-progress'

type ProgressHook = ReturnType<typeof useLessonProgress>

interface Props {
  lesson:      FullLesson
  progress:    ProgressHook
  onMenuClick: () => void
  className?:  string
}

export function LessonPlayerTopbar({ lesson, progress, onMenuClick, className }: Props) {
  const currentSection = lesson.sections.find((s) => s.id === progress.currentSectionId)
  const sectionLabel   = currentSection
    ? (currentSection.sidebarLabel ?? SECTION_LABELS[currentSection.type])
    : ''
  const missionNumber  = String(lesson.order ?? 1).padStart(2, '0')

  // Live XP counter — animates as sections are completed
  const targetXP  = Math.floor(lesson.xpReward * (progress.completedCount / progress.totalSections))
  const xpMotion  = useMotionValue(0)
  const displayXP = useTransform(xpMotion, (v) => `+${Math.round(v)}`)

  useEffect(() => {
    const controls = animate(xpMotion, targetXP, { duration: 0.7, ease: 'easeOut' })
    return controls.stop
  }, [targetXP]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <header
      className={cn(
        'flex h-14 shrink-0 items-center gap-3 px-3 sm:px-4',
        'bg-base-950/90 backdrop-blur-md border-b border-border/60',
        className,
      )}
    >
      {/* Back */}
      <Button
        asChild
        variant="ghost"
        size="icon-sm"
        className="shrink-0 text-muted-foreground hover:text-foreground"
        aria-label="Back to course"
      >
        <Link to={ROUTES.COURSE(lesson.courseSlug)}>
          <ArrowLeft className="size-4" />
        </Link>
      </Button>

      {/* Mobile menu toggle */}
      <Button
        variant="ghost"
        size="icon-sm"
        className="shrink-0 lg:hidden text-muted-foreground"
        onClick={onMenuClick}
        aria-label="Toggle sections"
      >
        <Menu className="size-4" />
      </Button>

      {/* Mission badge + title */}
      <div className="flex-1 min-w-0 flex items-center gap-2.5">
        {/* M-XX badge — desktop */}
        <div className="hidden sm:flex items-center shrink-0">
          <span className={cn(
            'inline-flex items-center px-2 py-0.5 rounded-md border',
            'border-primary/30 bg-primary/10',
            'text-[10px] font-black uppercase tracking-[0.2em] text-primary font-mono',
          )}>
            M-{missionNumber}
          </span>
        </div>

        {/* Title */}
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-sm font-semibold text-foreground truncate">{lesson.title}</span>
          {sectionLabel && (
            <>
              <span className="text-muted-foreground/30 shrink-0 hidden md:inline">·</span>
              <span className="text-xs text-muted-foreground/60 truncate hidden md:inline">
                {sectionLabel}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Right: XP + progress pips + time */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">

        {/* Live XP */}
        <motion.div
          key={targetXP}
          initial={{ scale: targetXP > 0 ? 1.2 : 1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
          className="flex items-center gap-1 text-cyber-green"
        >
          <Zap className="size-3 shrink-0" />
          <motion.span className="text-xs font-bold font-mono tabular-nums">
            {displayXP}
          </motion.span>
          <span className="text-[10px] font-mono text-cyber-green/50">XP</span>
        </motion.div>

        {/* Progress pips — desktop */}
        <div className="hidden sm:flex items-center gap-1.5">
          <div className="flex gap-[3px] items-center">
            {lesson.sections.map((s) => (
              <div
                key={s.id}
                className={cn(
                  'rounded-full transition-all duration-400',
                  progress.isSectionCompleted(s.id)
                    ? 'h-1.5 w-2 bg-primary/70'
                    : progress.isSectionCurrent(s.id)
                      ? 'h-1.5 w-3 bg-primary'
                      : 'h-1 w-1 bg-base-600',
                )}
              />
            ))}
          </div>
          <span className="text-[11px] text-muted-foreground/50 font-mono tabular-nums">
            {progress.currentIndex + 1}/{progress.totalSections}
          </span>
        </div>

        {/* Time remaining — desktop */}
        <div className="hidden lg:flex items-center gap-1 text-xs text-muted-foreground/50">
          <Clock className="size-3" />
          <span className="font-mono tabular-nums">
            {formatDuration(progress.estimatedMinutesRemaining)}
          </span>
        </div>
      </div>
    </header>
  )
}
