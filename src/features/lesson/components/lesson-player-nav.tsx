import { ChevronLeft, ChevronRight, CheckCircle2, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import type { useLessonProgress } from '../hooks/use-lesson-progress'

type ProgressHook = ReturnType<typeof useLessonProgress>

interface Props {
  progress:  ProgressHook
  className?: string
}

export function LessonPlayerNav({ progress, className }: Props) {
  const isCurrentComplete = progress.isSectionCompleted(progress.currentSectionId)

  return (
    <nav
      className={cn(
        'flex h-16 shrink-0 items-center justify-between gap-4 px-4',
        'bg-base-900/95 backdrop-blur-md border-t border-border',
        className,
      )}
      aria-label="Lesson navigation"
    >
      {/* Previous */}
      <Button
        variant="ghost"
        size="sm"
        onClick={progress.goPrev}
        disabled={progress.isFirstSection}
        className="gap-1.5 text-muted-foreground"
      >
        <ChevronLeft className="size-4" />
        <span className="hidden sm:inline">Previous</span>
      </Button>

      {/* Center — section indicator */}
      <div className="flex-1 flex items-center justify-center gap-1.5 sm:hidden">
        <span className="text-xs text-muted-foreground font-mono">
          {progress.currentIndex + 1} / {progress.totalSections}
        </span>
      </div>

      {/* Desktop center — progress bar */}
      <div className="hidden sm:flex flex-1 items-center justify-center gap-3 max-w-sm">
        <div className="flex-1 h-1.5 rounded-full bg-base-700 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-cyber transition-all duration-500"
            style={{ width: `${progress.progressPercent}%` }}
          />
        </div>
        <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">
          {progress.progressPercent}%
        </span>
      </div>

      {/* Next / Complete */}
      {progress.isLastSection ? (
        <Button
          variant="cyber"
          size="sm"
          onClick={progress.goNext}
          className="gap-1.5"
        >
          <Trophy className="size-4" />
          <span className="hidden sm:inline">Complete Lesson</span>
          <span className="sm:hidden">Done</span>
        </Button>
      ) : (
        <Button
          variant={isCurrentComplete ? 'default' : 'outline'}
          size="sm"
          onClick={progress.goNext}
          className={cn(
            'gap-1.5',
            isCurrentComplete && 'bg-primary text-primary-foreground',
          )}
        >
          {isCurrentComplete && <CheckCircle2 className="size-4" />}
          <span className="hidden sm:inline">
            {isCurrentComplete ? 'Continue' : 'Next'}
          </span>
          <ChevronRight className="size-4" />
        </Button>
      )}
    </nav>
  )
}
