import { ChevronLeft, ChevronRight, CheckCircle2, Shield } from 'lucide-react'
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
        'flex h-16 shrink-0 items-center justify-between gap-4 px-4 sm:px-6',
        'bg-base-950/80 backdrop-blur-md border-t border-border/60',
        className,
      )}
      aria-label="Mission navigation"
    >
      {/* Previous */}
      <Button
        variant="ghost"
        size="sm"
        onClick={progress.goPrev}
        disabled={progress.isFirstSection}
        className="gap-1.5 text-muted-foreground hover:text-foreground shrink-0"
      >
        <ChevronLeft className="size-4" />
        <span className="hidden sm:inline text-xs">Previous</span>
      </Button>

      {/* Centre: progress */}
      <div className="flex-1 flex items-center justify-center gap-3 min-w-0">

        {/* Segmented pip bar */}
        <div className="hidden sm:flex items-center gap-[3px] max-w-[300px] w-full">
          {Array.from({ length: progress.totalSections }, (_, i) => {
            const isCurrentPip   = i === progress.currentIndex
            const isCompletedPip = i < progress.completedCount

            return (
              <div
                key={i}
                className={cn(
                  'flex-1 h-1 rounded-full transition-all duration-500',
                  isCurrentPip   ? 'bg-primary scale-y-[1.5]' :
                  isCompletedPip ? 'bg-primary/60' :
                  'bg-base-700',
                )}
              />
            )
          })}
        </div>

        {/* Section counter */}
        <div className="flex flex-col items-center sm:items-start gap-0">
          <div className="flex items-baseline gap-1.5 text-xs font-mono whitespace-nowrap">
            <span className="font-bold text-foreground">
              {progress.currentIndex + 1}
            </span>
            <span className="text-muted-foreground/50">of</span>
            <span className="text-muted-foreground">
              {progress.totalSections}
            </span>
            <span className="text-muted-foreground/40 hidden sm:inline">·</span>
            <span className={cn(
              'font-bold hidden sm:inline',
              progress.progressPercent === 100 ? 'text-cyber-green' : 'text-primary',
            )}>
              {progress.progressPercent}%
            </span>
          </div>
        </div>
      </div>

      {/* Next / Complete Mission */}
      {progress.isLastSection ? (
        <Button
          variant="cyber"
          size="sm"
          onClick={progress.goNext}
          className="gap-1.5 shrink-0"
        >
          <Shield className="size-4" />
          <span className="hidden sm:inline">Complete Mission</span>
          <span className="sm:hidden text-xs">Done</span>
        </Button>
      ) : (
        <Button
          variant={isCurrentComplete ? 'default' : 'outline'}
          size="sm"
          onClick={progress.goNext}
          className={cn(
            'gap-1.5 shrink-0 transition-all duration-200',
            isCurrentComplete && 'bg-primary text-primary-foreground shadow-[0_0_12px_var(--tw-shadow-color)] shadow-primary/30',
          )}
        >
          {isCurrentComplete && <CheckCircle2 className="size-4" />}
          <span className="hidden sm:inline text-xs">
            {isCurrentComplete ? 'Continue' : 'Next'}
          </span>
          <ChevronRight className="size-4" />
        </Button>
      )}
    </nav>
  )
}
