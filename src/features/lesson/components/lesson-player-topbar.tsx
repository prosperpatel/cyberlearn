import { ArrowLeft, Clock, Menu } from 'lucide-react'
import { Link } from 'react-router-dom'
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
  const currentSection = lesson.sections.find(
    (s) => s.id === progress.currentSectionId
  )
  const sectionLabel = currentSection
    ? (currentSection.sidebarLabel ?? SECTION_LABELS[currentSection.type])
    : ''

  return (
    <header
      className={cn(
        'flex h-14 shrink-0 items-center gap-3 px-4',
        'bg-base-900/95 backdrop-blur-md border-b border-border',
        className,
      )}
    >
      {/* Back button */}
      <Button
        asChild
        variant="ghost"
        size="icon-sm"
        className="shrink-0"
        aria-label="Back to course"
      >
        <Link to={ROUTES.COURSE(lesson.courseSlug)}>
          <ArrowLeft className="size-4" />
        </Link>
      </Button>

      {/* Mobile: menu toggle */}
      <Button
        variant="ghost"
        size="icon-sm"
        className="shrink-0 lg:hidden"
        onClick={onMenuClick}
        aria-label="Toggle sections"
      >
        <Menu className="size-4" />
      </Button>

      {/* Lesson title + section */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 truncate">
          <span className="text-sm font-semibold text-foreground truncate">
            {lesson.title}
          </span>
          {sectionLabel && (
            <>
              <span className="text-muted-foreground/50 shrink-0">·</span>
              <span className="text-xs text-muted-foreground truncate">{sectionLabel}</span>
            </>
          )}
        </div>
      </div>

      {/* Right side: section count + time remaining */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Section progress */}
        <div className="hidden sm:flex items-center gap-1.5">
          {/* Mini progress pips */}
          <div className="flex gap-0.5">
            {lesson.sections.map((s) => (
              <div
                key={s.id}
                className={cn(
                  'h-1 rounded-full transition-all duration-300',
                  progress.isSectionCompleted(s.id)
                    ? 'bg-primary w-2'
                    : progress.isSectionCurrent(s.id)
                      ? 'bg-primary/60 w-2'
                      : 'bg-base-700 w-1',
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            {progress.currentIndex + 1}/{progress.totalSections}
          </span>
        </div>

        {/* Time remaining */}
        <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="size-3" />
          <span className="font-mono">
            {formatDuration(progress.estimatedMinutesRemaining)} left
          </span>
        </div>
      </div>
    </header>
  )
}
