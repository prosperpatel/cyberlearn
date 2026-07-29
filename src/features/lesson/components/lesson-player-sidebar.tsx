import {
  Zap, BookOpen, ListChecks, FileText, GitBranch, Play, Globe,
  Terminal, Bot, Target, AlertTriangle, HelpCircle, PenLine, Award, Briefcase,
  CheckCircle2, Circle, Lock, Shield,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SECTION_LABELS } from '@/types/lesson-engine'
import type { LessonSection, SectionType, FullLesson } from '@/types/lesson-engine'
import type { useLessonProgress } from '../hooks/use-lesson-progress'

type ProgressHook = ReturnType<typeof useLessonProgress>

interface Props {
  lesson:    Pick<FullLesson, 'order' | 'title'>
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

export function LessonPlayerSidebar({ lesson, sections, progress, className }: Props) {
  const missionNumber = String(lesson.order ?? 1).padStart(2, '0')

  return (
    <aside className={cn(
      'flex flex-col bg-base-900 border-r border-border',
      className,
    )}>

      {/* ── Header ──────────────────────────────────────────── */}
      <div className="px-5 pt-6 pb-5 border-b border-border shrink-0 space-y-5">
        {/* CDA classification */}
        <div className="flex items-center gap-2">
          <Shield className="size-3 text-cyber-green/40 shrink-0" />
          <span className="text-[9px] font-black uppercase tracking-[0.35em] text-cyber-green/40 font-mono">
            CDA · Mission {missionNumber}
          </span>
        </div>

        {/* Dossier label */}
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.15em] text-foreground/70">
            Mission Dossier
          </p>
          <p className="text-xs text-muted-foreground/60 mt-0.5 leading-snug truncate" title={lesson.title}>
            {lesson.title}
          </p>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="h-1.5 rounded-full bg-base-700 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-cyber transition-all duration-700 ease-out"
              style={{ width: `${progress.progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground/60">
            <span>{progress.completedCount}/{progress.totalSections} sections</span>
            <span className={cn(
              'font-bold',
              progress.progressPercent === 100 ? 'text-cyber-green' : 'text-muted-foreground/60',
            )}>
              {progress.progressPercent}%
            </span>
          </div>
        </div>
      </div>

      {/* ── Section list ────────────────────────────────────── */}
      <ScrollArea className="flex-1">
        <nav className="py-3 px-2" aria-label="Mission sections">
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
                  'relative w-full flex items-center gap-2.5 rounded-lg px-3 py-3.5 text-left',
                  'transition-all duration-150 group text-sm mb-1.5',
                  // Current: accent bg + left border glow
                  isCurrent && [
                    'bg-primary/12 text-primary',
                    'before:absolute before:left-0 before:top-1 before:bottom-1 before:w-0.5',
                    'before:rounded-full before:bg-primary before:shadow-[0_0_8px_var(--tw-shadow-color)]',
                    'before:shadow-primary/80',
                  ],
                  // Completed but not current
                  !isCurrent && isCompleted && 'text-foreground/70 hover:bg-base-800 hover:text-foreground cursor-pointer',
                  // Unlocked, not completed
                  !isCurrent && !isCompleted && canNav && 'text-muted-foreground/60 hover:bg-base-800 hover:text-foreground/80 cursor-pointer',
                  // Locked
                  !canNav && 'text-muted-foreground/30 cursor-not-allowed',
                )}
              >
                {/* Completion status icon */}
                <div className="flex size-5 shrink-0 items-center justify-center">
                  {isCompleted ? (
                    <CheckCircle2 className={cn(
                      'size-4',
                      isCurrent ? 'text-primary' : 'text-cyber-green',
                    )} />
                  ) : isCurrent ? (
                    <div className="size-2 rounded-full bg-primary animate-pulse" />
                  ) : canNav ? (
                    <Circle className="size-3.5 text-muted-foreground/30" />
                  ) : (
                    <Lock className="size-3 text-muted-foreground/20" />
                  )}
                </div>

                {/* Section type icon */}
                <Icon className={cn(
                  'size-3.5 shrink-0 transition-colors',
                  isCurrent    ? 'text-primary' : 'text-muted-foreground/40',
                  isCompleted && !isCurrent && 'text-foreground/40',
                )} />

                {/* Label */}
                <span className={cn(
                  'flex-1 truncate text-xs font-medium leading-none',
                  isCurrent ? 'font-semibold' : '',
                )}>
                  {label}
                </span>

                {/* Step number */}
                <span className={cn(
                  'text-[10px] font-mono shrink-0 tabular-nums',
                  isCurrent ? 'text-primary/60' : 'opacity-25',
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
