import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  CheckCircle2, ChevronLeft, ChevronRight, Circle, LayoutList, Lock, X, Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { BlockRenderer } from './block-renderer'
import { MissionCompleteScreen } from './mission-complete-screen'
import {
  BlockCompletionContext,
  getCompletionStrategy,
} from '@/features/mission-player/context/block-completion-context'
import { useMissionProgress } from '../hooks/use-mission-progress'
import { ROUTES } from '@/lib/constants'
import type { StandardBlock } from '@/types/mission-engine'
import type { CourseMissionMeta } from '@/lib/content'

// ── Exported types (consumed by MissionCompleteScreen and ContentMissionPage) ──

export interface NextMissionInfo {
  kind: 'mission' | 'course-complete'
  slug?: string
  title?: string
}

interface BlockPlayerProps {
  mission: CourseMissionMeta
  blocks: StandardBlock[]
  nextMission?: NextMissionInfo | null
}

// ── Block type display labels ──────────────────────────────────────────────────

const BLOCK_TYPE_LABELS: Record<string, string> = {
  'mission-brief':     'Mission Brief',
  'discussion':        'Discussion',
  'story':             'Story',
  'theory':            'Theory',
  'case-study':        'Case Study',
  'memory-anchor':     'Memory Anchor',
  'diagram':           'Diagram',
  'analogy':           'Analogy',
  'cheat-sheet':       'Reference',
  'common-mistakes':   'Common Mistakes',
  'student-questions': 'Q & A',
  'quiz':              'Quiz',
  'flashcards':        'Flashcards',
  'micro-practical':   'Practical',
  'mission-complete':  'Complete',
}

// ── Block state classification ─────────────────────────────────────────────────

type BlockState = 'locked' | 'available' | 'current' | 'completed'

function classifyBlock(
  index: number,
  activeIndex: number,
  completedSet: Set<number>,
  unlockedUpTo: number,
): BlockState {
  if (index > unlockedUpTo) return 'locked'
  if (completedSet.has(index) && index !== activeIndex) return 'completed'
  if (index === activeIndex) return 'current'
  return 'available'
}

// ── Sidebar item — module-level to avoid re-creation on every render ───────────

interface SidebarItemProps {
  block: StandardBlock
  index: number
  activeIndex: number
  completedSet: Set<number>
  unlockedUpTo: number
  lockedFeedback: number | null
  compact: boolean
  onGo: (i: number) => void
  onLockedClick: (i: number) => void
}

function SidebarItem({
  block, index, activeIndex, completedSet, unlockedUpTo,
  lockedFeedback, compact, onGo, onLockedClick,
}: SidebarItemProps) {
  const state = classifyBlock(index, activeIndex, completedSet, unlockedUpTo)
  const pad   = compact ? 'px-4 py-2.5 text-sm' : 'px-4 py-3 text-sm'

  if (state === 'locked') {
    return (
      <div>
        <button
          onClick={() => onLockedClick(index)}
          aria-disabled="true"
          aria-label={`${block.title} — locked`}
          className={cn(
            'w-full flex items-center gap-2.5 text-left',
            pad,
            'text-muted-foreground/60 hover:text-muted-foreground/80 transition-colors',
          )}
        >
          <Lock className="size-3.5 shrink-0 opacity-50" />
          <span className="flex-1 leading-snug truncate">{block.title}</span>
        </button>
        {lockedFeedback === index && (
          <p className="px-4 pb-2 text-xs text-amber-500/70 font-mono">
            Complete previous blocks first
          </p>
        )}
      </div>
    )
  }

  const icon =
    state === 'completed'
      ? <CheckCircle2 className={cn('size-3.5 shrink-0', activeIndex === index ? 'text-primary' : 'text-cyber-green')} />
      : state === 'current'
        ? <div className="size-3.5 rounded-full bg-primary border-2 border-primary/80 shrink-0" />
        : <Circle className="size-3.5 shrink-0 text-muted-foreground/35" />

  return (
    <button
      onClick={() => onGo(index)}
      aria-current={state === 'current' ? 'step' : undefined}
      className={cn(
        'w-full flex items-center gap-2.5 text-left transition-colors',
        pad,
        state === 'current'
          ? 'bg-primary/10 text-primary border-r-2 border-primary font-medium'
          : state === 'completed'
            ? 'text-foreground/70 hover:bg-base-800/50'
            : 'text-muted-foreground hover:bg-base-800/50',
      )}
    >
      {icon}
      <span className="flex-1 leading-snug truncate">{block.title}</span>
    </button>
  )
}

// ── Completion data extractor ──────────────────────────────────────────────────

function extractCompletionData(blocks: StandardBlock[], fallbackXp: number) {
  const block = blocks.find(b => b.type === 'mission-complete')
  const c = block?.content as {
    xpEarned?: number
    badgesUnlocked?: Array<{ name: string; description?: string } | string>
    nextSteps?: string[]
  } | undefined

  const rawBadges = c?.badgesUnlocked ?? []
  const badges = rawBadges.map(b =>
    typeof b === 'string' ? { name: b } : (b as { name: string; description?: string })
  )

  return {
    xpEarned:  c?.xpEarned ?? fallbackXp,
    badges,
    nextSteps: c?.nextSteps ?? [],
  }
}

// ── BlockPlayer ────────────────────────────────────────────────────────────────

export function BlockPlayer({ mission, blocks, nextMission }: BlockPlayerProps) {
  const { data, update }            = useMissionProgress(mission.slug)
  const prefersReducedMotion        = useReducedMotion()
  const [phase, setPhase]           = useState<'playing' | 'complete'>('playing')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [lockedFeedback, setLockedFeedback] = useState<number | null>(null)
  const [blockCompleted, setBlockCompleted] = useState(false)

  const contentRef       = useRef<HTMLDivElement>(null)
  const sidebarNavRef    = useRef<HTMLElement>(null)
  const drawerCloseRef   = useRef<HTMLButtonElement>(null)
  const drawerTriggerRef = useRef<HTMLButtonElement>(null)
  const goToRef          = useRef<(i: number) => void>(() => undefined)
  const indexRef         = useRef(0)
  const blockDoneRef     = useRef(false)
  const strategyRef      = useRef<ReturnType<typeof getCompletionStrategy>>('scroll')
  const mountedRef       = useRef(false)
  const initialScrollPositions = useRef<Record<string, number>>(data.scrollPositions ?? {})
  const scrollSaveTimer  = useRef<ReturnType<typeof setTimeout>>()
  const lockedTimer      = useRef<ReturnType<typeof setTimeout>>()

  const total        = blocks.length
  const completedSet = new Set(data.completedBlocks)
  const maxCompleted = completedSet.size > 0 ? Math.max(...completedSet) : -1
  const unlockedUpTo = maxCompleted + 1
  const activeIndex  = Math.min(data.activeBlockIndex, unlockedUpTo, Math.max(0, total - 1))
  const progressPct  = total > 0 ? Math.round(completedSet.size / total * 100) : 0
  const isFinalBlock = activeIndex === total - 1
  const activeBlock  = blocks[activeIndex]
  const strategy     = getCompletionStrategy(activeBlock?.type ?? '')
  const canProceed   = blockCompleted

  const missionNum = mission.missionNumber != null
    ? String(mission.missionNumber).padStart(2, '0')
    : null

  const { xpEarned, badges, nextSteps } = extractCompletionData(blocks, mission.xpReward)
  const skills = (mission.skills && mission.skills.length > 0)
    ? mission.skills
    : mission.learningObjectives.slice(0, 6)

  blockDoneRef.current  = blockCompleted
  strategyRef.current   = strategy
  indexRef.current      = activeIndex

  const handleBlockComplete = useCallback(() => {
    setBlockCompleted(true)
  }, [])

  const completedSetRef   = useRef(completedSet)
  const strategyValueRef  = useRef(strategy)
  completedSetRef.current  = completedSet
  strategyValueRef.current = strategy

  useEffect(() => {
    const alreadyDone = completedSetRef.current.has(activeIndex)
    const isImmediate = strategyValueRef.current === 'immediate'
    setBlockCompleted(alreadyDone || isImmediate)
  }, [activeIndex])

  // ── Scroll restore / fits-check on block change ────────────────────────────
  useEffect(() => {
    const el = contentRef.current
    if (!el) return

    if (!mountedRef.current) {
      mountedRef.current = true
      const saved = initialScrollPositions.current[String(activeIndex)] ?? 0
      if (saved > 0) el.scrollTo({ top: saved, behavior: 'instant' })
    } else {
      el.scrollTo({ top: 0, behavior: 'instant' })
    }

    const exitMs = prefersReducedMotion ? 0 : Math.ceil(dur * 1000)
    const tid = setTimeout(() => {
      const el2 = contentRef.current
      if (!el2 || strategyRef.current !== 'scroll') return
      if (el2.scrollHeight <= el2.clientHeight + 60) handleBlockComplete()
    }, exitMs + 150)

    return () => clearTimeout(tid)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, handleBlockComplete, prefersReducedMotion])

  // ── Sidebar auto-scroll ─────────────────────────────────────────────────────
  useEffect(() => {
    const nav = sidebarNavRef.current
    if (!nav) return
    const active = nav.querySelector('[aria-current="step"]') as HTMLElement | null
    active?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [activeIndex])

  // ── Focus main content on block change ─────────────────────────────────────
  useEffect(() => {
    contentRef.current?.focus({ preventScroll: true })
  }, [activeIndex])

  // ── Mobile drawer focus management ─────────────────────────────────────────
  useEffect(() => {
    if (drawerOpen) {
      const tid = setTimeout(() => drawerCloseRef.current?.focus(), 50)
      return () => clearTimeout(tid)
    } else {
      drawerTriggerRef.current?.focus()
    }
  }, [drawerOpen])

  // ── Mark started ────────────────────────────────────────────────────────────
  useEffect(() => {
    update(prev => (prev.started ? {} : { started: true }))
  }, [update])

  // ── Award XP on reaching the final block ───────────────────────────────────
  useEffect(() => {
    if (!isFinalBlock) return
    update(prev => {
      if (prev.xpAwarded) return {}
      const completedBlocks = [...new Set([...prev.completedBlocks, activeIndex])]
      return { xpAwarded: true, completedBlocks }
    })
  }, [isFinalBlock, update, activeIndex])

  // ── Cleanup timers ──────────────────────────────────────────────────────────
  useEffect(() => () => {
    clearTimeout(scrollSaveTimer.current)
    clearTimeout(lockedTimer.current)
  }, [])

  // ── goTo ─────────────────────────────────────────────────────────────────────
  const goTo = useCallback((index: number) => {
    if (index < 0 || index >= total) return
    update(prev => {
      const completed = new Set(prev.completedBlocks)
      if (blockDoneRef.current) completed.add(prev.activeBlockIndex)
      const maxDone  = completed.size > 0 ? Math.max(...completed) : -1
      const frontier = maxDone + 1
      if (index > frontier) return {}
      return { activeBlockIndex: index, completedBlocks: [...completed] }
    })
    setDrawerOpen(false)
  }, [total, update])

  goToRef.current = goTo

  function handleLockedClick(index: number) {
    clearTimeout(lockedTimer.current)
    setLockedFeedback(index)
    lockedTimer.current = setTimeout(() => setLockedFeedback(null), 2000)
  }

  function onContentScroll() {
    const el = contentRef.current
    if (!el) return

    if (strategyRef.current === 'scroll' && !blockDoneRef.current) {
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 80
      if (atBottom) handleBlockComplete()
    }

    clearTimeout(scrollSaveTimer.current)
    const pos = el.scrollTop
    scrollSaveTimer.current = setTimeout(() => {
      update(prev => ({
        scrollPositions: { ...prev.scrollPositions, [String(activeIndex)]: pos },
      }))
    }, 400)
  }

  // ── Keyboard navigation ─────────────────────────────────────────────────────
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      if (e.key === 'ArrowRight' || e.key === 'l') {
        if (blockDoneRef.current) goToRef.current(indexRef.current + 1)
      }
      if (e.key === 'ArrowLeft' || e.key === 'h') {
        goToRef.current(indexRef.current - 1)
      }
      if (e.key === 'Escape') setDrawerOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!activeBlock) return null

  // ── Completion phase ─────────────────────────────────────────────────────────
  if (phase === 'complete') {
    return (
      <MissionCompleteScreen
        mission={mission}
        xpEarned={xpEarned}
        badges={badges}
        skills={skills}
        nextSteps={nextSteps}
        totalBlocks={total}
        completedCount={completedSet.size}
        nextMission={nextMission}
        onReview={() => setPhase('playing')}
      />
    )
  }

  const fadeY = prefersReducedMotion ? 0 : 16
  const dur   = prefersReducedMotion ? 0 : 0.28

  const blockTypeLabel = BLOCK_TYPE_LABELS[activeBlock.type] ?? activeBlock.type

  // ── Playing phase ─────────────────────────────────────────────────────────────
  return (
    <div className="flex h-screen bg-background overflow-hidden">

      {/* ── Screen-reader live region (block title changes) ──────────── */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        Block {activeIndex + 1} of {total}: {activeBlock.title}
      </div>

      {/* ── Desktop Sidebar ──────────────────────────────────────────── */}
      <aside
        className="hidden lg:flex flex-col w-52 xl:w-56 border-r border-border/40 bg-base-950 shrink-0"
        aria-label="Mission navigation"
      >
        <div className="px-4 pt-4 pb-3 border-b border-border/40 space-y-2.5">
          <Link
            to={ROUTES.COURSE(mission.courseSlug)}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="size-3.5" />
            Back to course
          </Link>
          <div>
            {missionNum && (
              <p className="text-[11px] font-mono font-bold tracking-[0.15em] text-primary/60 mb-1">
                MISSION {missionNum}
              </p>
            )}
            <h2 className="text-sm font-semibold text-foreground leading-snug line-clamp-3">
              {mission.title}
            </h2>
          </div>
        </div>

        <nav ref={sidebarNavRef} className="flex-1 overflow-y-auto py-1" aria-label="Blocks">
          {blocks.map((block, i) => (
            <SidebarItem
              key={block.id}
              block={block}
              index={i}
              activeIndex={activeIndex}
              completedSet={completedSet}
              unlockedUpTo={unlockedUpTo}
              lockedFeedback={lockedFeedback}
              compact
              onGo={goTo}
              onLockedClick={handleLockedClick}
            />
          ))}
        </nav>

        {/* Sidebar footer — progress (decorative; accessible progressbar is in the bottom nav) */}
        <div className="px-4 py-3 border-t border-border/40 space-y-2">
          <div className="grid grid-cols-2 gap-x-2 text-xs font-mono">
            <span className="text-muted-foreground">Done</span>
            <span className="text-muted-foreground text-right">{total - completedSet.size} left</span>
            <span className="text-foreground/70 font-semibold">{completedSet.size}/{total}</span>
            <span className="text-primary text-right font-semibold">{progressPct}%</span>
          </div>
          {/* Decorative-only bar — the accessible progressbar is in the bottom nav */}
          <div aria-hidden="true" className="h-1.5 rounded-full bg-base-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyber-blue to-cyber-green transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          {data.xpAwarded && (
            <p className="flex items-center gap-1 text-xs font-semibold text-cyber-green">
              <Zap className="size-3" />
              +{mission.xpReward} XP earned
            </p>
          )}
        </div>
      </aside>

      {/* ── Content Column ───────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* ── Top header — contextual learning anchor ────────────────── */}
        <div className="flex-none border-b border-border/20 bg-base-950/80 backdrop-blur-sm">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3 py-3">

            {/* Mobile: back button (sidebar is hidden below lg) */}
            <Link
              to={ROUTES.COURSE(mission.courseSlug)}
              aria-label="Back to course"
              className="lg:hidden shrink-0 flex items-center justify-center size-8 -ml-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-base-800 transition-colors"
            >
              <ChevronLeft className="size-4" />
            </Link>

            {/* Context: mission + block type + block title */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground/50 mb-0.5">
                {missionNum && (
                  <span className="font-bold text-primary/60 tracking-widest">MISSION {missionNum}</span>
                )}
                {missionNum && <span aria-hidden>·</span>}
                <span className="uppercase tracking-widest">{blockTypeLabel}</span>
              </div>
              <p className="text-sm font-semibold text-foreground truncate leading-snug">
                {activeBlock.title}
              </p>
            </div>

            {/* Progress % — desktop only */}
            <div className="hidden sm:flex shrink-0 items-center text-[11px] font-mono text-primary/60 font-semibold">
              {progressPct}%
            </div>
          </div>
        </div>

        {/* Scrollable block content */}
        <main
          ref={contentRef}
          id="block-content"
          className="flex-1 overflow-y-auto focus:outline-none"
          tabIndex={-1}
          aria-label={`Block ${activeIndex + 1} of ${total}: ${activeBlock.title}`}
          onScroll={onContentScroll}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeBlock.id}
              initial={{ opacity: 0, y: fadeY }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -fadeY }}
              transition={{ duration: dur, ease: 'easeOut' }}
            >
              <BlockCompletionContext.Provider value={{ complete: handleBlockComplete }}>
                <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 pb-6">
                  <BlockRenderer block={activeBlock} />
                </div>
              </BlockCompletionContext.Provider>
            </motion.div>
          </AnimatePresence>
        </main>

        {/* ── Bottom nav bar ─────────────────────────────────────────── */}
        <div className="flex-none border-t border-border/40 bg-base-950">

          {/* Authoritative mission progress bar */}
          <div
            role="progressbar"
            aria-valuenow={progressPct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Mission progress"
            className="h-2 bg-base-800 overflow-hidden"
          >
            <div
              className="h-full bg-gradient-to-r from-cyber-blue to-cyber-green transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          {/* Completion hint — visible when learner cannot proceed */}
          {!canProceed && (
            <div className="px-4 pt-3 pb-0 text-center">
              <p className="text-sm text-muted-foreground/75 font-medium">
                {strategy === 'interaction'
                  ? '↑ Complete the activity above to continue'
                  : '↓ Scroll to the bottom to continue'
                }
              </p>
            </div>
          )}

          <div className="flex items-center gap-3 px-4 py-3">

            {/* Previous */}
            <button
              onClick={() => goTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous block"
              className={cn(
                'flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium border transition-all min-h-[44px]',
                activeIndex === 0
                  ? 'border-border/20 text-muted-foreground/25 cursor-not-allowed'
                  : 'border-border/50 text-foreground/70 hover:text-foreground hover:border-border hover:bg-base-800/50',
              )}
            >
              <ChevronLeft className="size-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            {/* Centre — desktop: non-interactive display; mobile: drawer trigger */}
            <div
              aria-hidden="true"
              className="hidden lg:flex flex-1 items-center justify-center gap-2 text-xs font-mono text-muted-foreground/50"
            >
              <span className="font-semibold text-foreground/50">{activeIndex + 1} / {total}</span>
              <span>·</span>
              <span>{progressPct}%</span>
              <span className="ml-2 text-[10px] text-muted-foreground/25 select-none">← → navigate</span>
            </div>

            <button
              ref={drawerTriggerRef}
              className="flex lg:hidden flex-1 items-center justify-center gap-2 py-2.5 text-sm font-medium text-foreground/60 hover:text-foreground transition-colors min-h-[44px]"
              onClick={() => setDrawerOpen(d => !d)}
              aria-label={`Block navigation — Block ${activeIndex + 1} of ${total}`}
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
            >
              <LayoutList className="size-4" aria-hidden />
              <span>Blocks</span>
              <span className="font-mono text-muted-foreground/60">{activeIndex + 1} / {total}</span>
            </button>

            {/* Next / Complete */}
            {isFinalBlock ? (
              <button
                onClick={() => setPhase('complete')}
                disabled={!canProceed}
                aria-label="Complete mission"
                className={cn(
                  'flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold border transition-all min-h-[44px]',
                  canProceed
                    ? 'border-cyber-green/40 bg-cyber-green/8 text-cyber-green hover:bg-cyber-green/15'
                    : 'border-border/20 text-muted-foreground/30 cursor-not-allowed',
                )}
              >
                <span className="hidden sm:inline">Complete</span>
                <ChevronRight className="size-4" />
              </button>
            ) : (
              <button
                onClick={() => { if (canProceed) goTo(activeIndex + 1) }}
                disabled={!canProceed}
                aria-label={canProceed ? 'Next block' : 'Complete this block to continue'}
                aria-disabled={!canProceed}
                className={cn(
                  'flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold border transition-all min-h-[44px]',
                  canProceed
                    ? 'border-primary/40 bg-primary/8 text-primary hover:bg-primary/15'
                    : 'border-border/20 text-muted-foreground/30 cursor-not-allowed',
                )}
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="size-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile / Tablet Drawer ─────────────────────────────────── */}
      {drawerOpen && (
        <div
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Block navigation"
          className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          <div className="relative bg-base-950 border-t border-border/40 rounded-t-2xl max-h-[80vh] flex flex-col shadow-xl">
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-border/40">
              <div>
                <p className="text-sm font-semibold text-foreground">Mission Blocks</p>
                <p className="text-xs font-mono text-muted-foreground">
                  {completedSet.size}/{total} complete · {progressPct}%
                </p>
              </div>
              <button
                ref={drawerCloseRef}
                onClick={() => setDrawerOpen(false)}
                aria-label="Close navigation"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-base-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              >
                <X className="size-4" />
              </button>
            </div>
            <nav className="overflow-y-auto py-2" aria-label="Blocks">
              {blocks.map((block, i) => (
                <SidebarItem
                  key={block.id}
                  block={block}
                  index={i}
                  activeIndex={activeIndex}
                  completedSet={completedSet}
                  unlockedUpTo={unlockedUpTo}
                  lockedFeedback={lockedFeedback}
                  compact={false}
                  onGo={goTo}
                  onLockedClick={handleLockedClick}
                />
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}
