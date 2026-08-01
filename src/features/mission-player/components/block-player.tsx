import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CheckCircle2, ChevronLeft, ChevronRight, Circle, LayoutList, X, Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { BlockRenderer } from './block-renderer'
import { useMissionProgress } from '../hooks/use-mission-progress'
import { ROUTES } from '@/lib/constants'
import type { StandardBlock } from '@/types/mission-engine'
import type { CourseMissionMeta } from '@/lib/content'

interface BlockPlayerProps {
  mission: CourseMissionMeta
  blocks: StandardBlock[]
}

export function BlockPlayer({ mission, blocks }: BlockPlayerProps) {
  const { data, update } = useMissionProgress(mission.slug)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const total       = blocks.length
  const activeIndex = Math.min(data.activeBlockIndex, Math.max(0, total - 1))
  const completedSet = new Set(data.completedBlocks)
  const progressPct  = total > 0 ? Math.round((completedSet.size / total) * 100) : 0
  const isFinalBlock = activeIndex === total - 1
  const activeBlock  = blocks[activeIndex]

  // Mark started on mount (once)
  useEffect(() => {
    update(prev => (prev.started ? {} : { started: true }))
  }, [update])

  // Award XP when final block is first reached
  useEffect(() => {
    if (!isFinalBlock) return
    update(prev => {
      if (prev.xpAwarded) return {}
      const completedBlocks = [...new Set([...prev.completedBlocks, activeIndex])]
      return { xpAwarded: true, completedBlocks }
    })
  }, [isFinalBlock, update, activeIndex])

  // goTo — uses functional update so never reads stale state
  const goTo = useCallback((index: number) => {
    if (index < 0 || index >= total) return
    update(prev => {
      const completed = new Set(prev.completedBlocks)
      completed.add(prev.activeBlockIndex)
      return { activeBlockIndex: index, completedBlocks: [...completed] }
    })
    contentRef.current?.scrollTo({ top: 0 })
    setDrawerOpen(false)
  }, [total, update])

  // Keep refs current for keyboard handler
  const goToRef       = useRef(goTo)
  const indexRef      = useRef(activeIndex)
  goToRef.current  = goTo
  indexRef.current = activeIndex

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      if (e.key === 'ArrowRight' || e.key === 'l') goToRef.current(indexRef.current + 1)
      if (e.key === 'ArrowLeft'  || e.key === 'h') goToRef.current(indexRef.current - 1)
      if (e.key === 'Escape') setDrawerOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!activeBlock) return null

  const missionNum = mission.missionNumber != null
    ? String(mission.missionNumber).padStart(2, '0')
    : null

  // ── Shared block list item (used in both sidebar and mobile drawer) ─────────
  function BlockListItem({ block, index, compact = false }: { block: StandardBlock; index: number; compact?: boolean }) {
    const isDone   = completedSet.has(index)
    const isActive = index === activeIndex
    return (
      <button
        key={block.id}
        onClick={() => goTo(index)}
        aria-current={isActive ? 'step' : undefined}
        className={cn(
          'w-full flex items-center gap-2.5 text-left transition-colors',
          compact ? 'px-4 py-2 text-xs' : 'px-4 py-3 text-sm',
          isActive
            ? 'bg-primary/10 text-primary border-r-2 border-primary'
            : isDone
              ? 'text-foreground/70 hover:bg-base-800/50'
              : 'text-muted-foreground hover:bg-base-800/50',
        )}
      >
        <span className="shrink-0">
          {isDone ? (
            <CheckCircle2 className={cn('size-3.5', isActive ? 'text-primary' : 'text-cyber-green')} />
          ) : isActive ? (
            <div className="size-3.5 rounded-full border-2 border-primary bg-primary/25" />
          ) : (
            <Circle className="size-3.5 text-muted-foreground/35" />
          )}
        </span>
        <span className="flex-1 leading-snug truncate">{block.title}</span>
        <span className="shrink-0 text-[9px] font-mono text-muted-foreground/35">{index + 1}</span>
      </button>
    )
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">

      {/* ── Desktop Sidebar ─────────────────────────────────────────────── */}
      <aside
        className="hidden lg:flex flex-col w-64 xl:w-72 border-r border-border/40 bg-base-950 shrink-0"
        aria-label="Mission navigation"
      >
        {/* Header */}
        <div className="px-4 pt-5 pb-4 border-b border-border/40 space-y-3">
          <Link
            to={ROUTES.COURSE(mission.courseSlug)}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="size-3" />
            Back to course
          </Link>
          <div>
            {missionNum && (
              <p className="text-[9px] font-mono font-bold tracking-[0.2em] text-primary/60 mb-1">
                MISSION {missionNum}
              </p>
            )}
            <h2 className="text-sm font-semibold text-foreground leading-snug line-clamp-3">
              {mission.title}
            </h2>
          </div>
        </div>

        {/* Block list */}
        <nav className="flex-1 overflow-y-auto py-1.5" aria-label="Blocks">
          {blocks.map((block, i) => (
            <BlockListItem key={block.id} block={block} index={i} compact />
          ))}
        </nav>

        {/* Footer — progress */}
        <div className="px-4 py-3.5 border-t border-border/40 space-y-2">
          <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
            <span>{completedSet.size} / {total} complete</span>
            <span>{progressPct}%</span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={progressPct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Mission progress"
            className="h-1 rounded-full bg-base-800 overflow-hidden"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyber-blue to-cyber-green transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          {data.xpAwarded && (
            <p className="flex items-center gap-1 text-[10px] font-semibold text-cyber-green">
              <Zap className="size-3" />
              +{mission.xpReward} XP earned
            </p>
          )}
        </div>
      </aside>

      {/* ── Content Column ─────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Scrollable block content */}
        <main
          ref={contentRef}
          id="block-content"
          className="flex-1 overflow-y-auto focus:outline-none"
          tabIndex={-1}
          aria-live="polite"
          aria-label={`Block ${activeIndex + 1} of ${total}: ${activeBlock.title}`}
        >
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 pb-4">
            <BlockRenderer key={activeBlock.id} block={activeBlock} />
          </div>
        </main>

        {/* ── Nav bar ─────────────────────────────────────────────────── */}
        <div className="flex-none border-t border-border/40 bg-base-950 px-4 py-3">
          {/* Progress bar */}
          <div
            role="progressbar"
            aria-valuenow={progressPct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Mission progress"
            className="h-0.5 rounded-full bg-base-800 overflow-hidden mb-3"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyber-blue to-cyber-green transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Previous */}
            <button
              onClick={() => goTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous block"
              className={cn(
                'flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                activeIndex === 0
                  ? 'text-muted-foreground/25 pointer-events-none'
                  : 'text-muted-foreground hover:text-foreground hover:bg-base-800',
              )}
            >
              <ChevronLeft className="size-4" />
              <span className="hidden sm:inline">Prev</span>
            </button>

            {/* Centre — tappable on mobile to open drawer, informational on desktop */}
            <button
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors lg:pointer-events-none"
              onClick={() => setDrawerOpen(d => !d)}
              aria-label={`Block ${activeIndex + 1} of ${total}. Open block navigation.`}
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
            >
              <LayoutList className="size-3.5 lg:hidden" aria-hidden />
              <span>{activeIndex + 1} / {total}</span>
              <span className="text-muted-foreground/30" aria-hidden>·</span>
              <span>{progressPct}%</span>
            </button>

            {/* Next / Finish */}
            {isFinalBlock ? (
              <Link
                to={ROUTES.COURSE(mission.courseSlug)}
                aria-label="Finish mission and return to course"
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-semibold text-cyber-green hover:bg-cyber-green/10 transition-all"
              >
                <span className="hidden sm:inline">Finish</span>
                <ChevronRight className="size-4" />
              </Link>
            ) : (
              <button
                onClick={() => goTo(activeIndex + 1)}
                aria-label="Next block"
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-semibold text-primary hover:bg-primary/10 transition-all"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="size-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile / Tablet Drawer ──────────────────────────────────────── */}
      {drawerOpen && (
        <div
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Block navigation"
          className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />

          {/* Sheet */}
          <div className="relative bg-base-950 border-t border-border/40 rounded-t-2xl max-h-[72vh] flex flex-col shadow-xl">
            {/* Sheet header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
              <div>
                <p className="text-sm font-semibold text-foreground">Mission Blocks</p>
                <p className="text-[10px] font-mono text-muted-foreground">
                  {completedSet.size}/{total} complete · {progressPct}%
                </p>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label="Close navigation"
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-base-800 transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Block list */}
            <nav className="overflow-y-auto py-2" aria-label="Blocks">
              {blocks.map((block, i) => (
                <BlockListItem key={block.id} block={block} index={i} />
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}
