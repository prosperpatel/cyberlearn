import {
  Zap, BookOpen, ListChecks, FileText, GitBranch, Play, Globe,
  Terminal, Bot, Target, AlertTriangle, HelpCircle, PenLine, Award, Briefcase,
  CheckCircle2, Circle, Lock,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SECTION_LABELS } from '@/types/lesson-engine'
import type { LessonSection, SectionType } from '@/types/lesson-engine'
import type { useLessonProgress } from '../hooks/use-lesson-progress'

type ProgressHook = ReturnType<typeof useLessonProgress>

interface Props {
  sections:  LessonSection[]
  progress:  ProgressHook
  className?: string
}

const ICON_MAP: Record<SectionType, React.FC<{ className?: string }>> = {
  'hook':               Zap,
  'story':              BookOpen,
  'objectives':         ListChecks,
  'explanation':        FileText,
  'diagram':            GitBranch,
  'animation':          Play,
  'real-world-example': Globe,
  'practical':          Terminal,
  'ai-mentor':          Bot,
  'challenge':          Target,
  'common-mistakes':    AlertTriangle,
  'quiz':               HelpCircle,
  'reflection':         PenLine,
  'summary':            Award,
  'career-connection':  Briefcase,
}

export function LessonPlayerSidebar({ sections, progress, className }: Props) {
  return (
    <aside className={cn(
      'flex flex-col bg-base-900 border-r border-border',
      className,
    )}>
      {/* Title */}
      <div className="px-4 py-4 border-b border-border shrink-0">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground font-mono">
          Lesson Progress
        </p>
        <div className="mt-2 h-1.5 rounded-full bg-base-700 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-cyber transition-all duration-500"
            style={{ width: `${progress.progressPercent}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1.5 font-mono">
          {progress.completedCount}/{progress.totalSections} sections
        </p>
      </div>

      {/* Section list */}
      <ScrollArea className="flex-1">
        <nav className="py-2 px-2" aria-label="Lesson sections">
          {sections.map((section, i) => {
            const isCompleted = progress.isSectionCompleted(section.id)
            const isCurrent   = progress.isSectionCurrent(section.id)
            const canNav      = progress.canNavigateToSection(section.id)
            const Icon        = ICON_MAP[section.type]
            const label       = section.sidebarLabel ?? SECTION_LABELS[section.type]

            return (
              <button
                key={section.id}
                onClick={() => canNav && progress.goTo(section.id)}
                disabled={!canNav}
                aria-current={isCurrent ? 'step' : undefined}
                className={cn(
                  'w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-all duration-150',
                  'group text-sm',
                  isCurrent && 'bg-primary/10 text-primary',
                  !isCurrent && isCompleted && 'text-muted-foreground hover:bg-base-800 hover:text-foreground cursor-pointer',
                  !isCurrent && !isCompleted && canNav && 'text-muted-foreground hover:bg-base-800 cursor-pointer',
                  !canNav && 'text-muted-foreground/40 cursor-not-allowed',
                )}
              >
                {/* Status icon */}
                <div className={cn(
                  'flex size-5 shrink-0 items-center justify-center',
                )}>
                  {isCompleted ? (
                    <CheckCircle2 className="size-4 text-cyber-green" />
                  ) : isCurrent ? (
                    <Circle className="size-4 text-primary fill-primary/20" />
                  ) : canNav ? (
                    <Circle className="size-4 text-muted-foreground/40" />
                  ) : (
                    <Lock className="size-3.5 text-muted-foreground/30" />
                  )}
                </div>

                {/* Section icon */}
                <Icon className={cn(
                  'size-3.5 shrink-0',
                  isCurrent ? 'text-primary' : 'text-muted-foreground',
                )} />

                {/* Label + step number */}
                <span className="flex-1 truncate text-xs font-medium leading-none">
                  {label}
                </span>

                {/* Step number */}
                <span className={cn(
                  'text-[10px] font-mono shrink-0 opacity-40',
                )}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </button>
            )
          })}
        </nav>
      </ScrollArea>
    </aside>
  )
}
