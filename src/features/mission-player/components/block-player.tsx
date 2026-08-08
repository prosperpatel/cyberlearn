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
  const pad   = compact ? 'px-3 py-2 text-[11px]' : 'px-4 py-3 text-sm'

  if (state === 'locked') {
    return (
      <div>
        <button
          onClick={() => onLockedClick(index)}
          aria-disabled="true"
          aria-label={`${block.title} — locked`}
          className={cn(
            'w-full flex items-center gap-2 text-left',
            pad,
            'text-muted-foreground/30 hover:text-muted-foreground/50 transition-colors',
          )}
        >
          <Lock className="size-3.5 shrink-0" />
          <span className="flex-1 leading-snug truncate">{block.title}</span>
          <span className="shrink-0 text-[9px] font-mono opacity-40">{index + 1}</span>
        </button>
        {lockedFeedback === index && (
          <p className="px-3 pb-1.5 text-[10px] text-amber-500/70 font-mono">
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
        'w-full flex items-center gap-2 text-left transition-colors',
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
      <span className="shrink-0 text-[9px] font-mono text-muted-foreground/30">{index + 1}</span>
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
  // blockCompleted — is the CURRENT block completable in this session?
  const [blockCompleted, setBlockCompleted] = useState(false)

  const contentRef     = useRef<HTMLDivElement>(null)
  const sidebarNavRef  = useRef<HTMLElement>(null)
  const goToRef        = useRef<(i: number) => void>(() => undefined)
  const indexRef       = useRef(0)
  const blockDoneRef   = useRef(false)     // stable ref for goTo closure
  const strategyRef    = useRef<ReturnType<typeof getCompletionStrategy>>('scroll')
  const mountedRef     = useRef(false)
  const initialScrollPositions = useRef<Record<string, number>>(data.scrollPositions ?? {})
  const scrollSaveTimer = useRef<ReturnType<typeof setTimeout>>()
  const lockedTimer     = useRef<ReturnType<typeof setTimeout>>()

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

  // Keep refs current every render
  blockDoneRef.current  = blockCompleted
  strategyRef.current   = strategy
  indexRef.current      = activeIndex

  // ── handleBlockComplete — called by context or scroll detection ────────────
  const handleBlockComplete = useCallback(() => {
    setBlockCompleted(true)
  }, [])

  // ── Reset blockCompleted when the active block changes ─────────────────────
  // Refs let us read current values without adding them to deps.
  const completedSetRef   = useRef(completedSet)
  const strategyValueRef  = useRef(strategy)
  completedSetRef.current  = completedSet
  strategyValueRef.current = strategy

  useEffect(() => {
    const alreadyDone    = completedSetRef.current.has(activeIndex)
    const isImmediate    = strategyValueRef.current === 'immediate'
    setBlockCompleted(alreadyDone || isImmediate)
  }, [activeIndex])

  // ── Scroll restore / scroll-to-top on block change ─────────────────────────
  useEffect(() => {
    const el = contentRef.current
    if (!el) return

    if (!mountedRef.current) {
      mountedRef.current = true
      const saved = initialScrollPositions.current[String(activeIndex)] ?? 0
      if (saved > 0) {
        el.scrollTo({ top: saved, behavior: 'instant' })
      }
    } else {
      el.scrollTo({ top: 0, behavior: 'instant' })
    }

    // For scroll-strategy blocks: complete immediately when the content fits on screen.
    //
    // Why exitMs + 150 and not the original 120 ms:
    // AnimatePresence mode="wait" keeps the OLD block in the DOM for dur × 1000 ms (the
    // exit animation). At 120 ms the old block was still present, so scrollHeight measured
    // the WRONG content — intermittently blocking or prematurely completing the new block.
    // Firing after exitMs + 150 ms guarantees the new block has mounted and painted.
    const exitMs = prefersReducedMotion ? 0 : Math.ceil(dur * 1000)
    const tid = setTimeout(() => {
      const el2 = contentRef.current
      if (!el2 || strategyRef.current !== 'scroll') return
      console.debug(
        '[BlockPlayer] fits-check',
        `block=${activeIndex}`,
        `scrollHeight=${el2.scrollHeight}`,
        `clientHeight=${el2.clientHeight}`,
        `fits=${el2.scrollHeight <= el2.clientHeight + 60}`,
        `blockDone=${blockDoneRef.current}`,
      )
      if (el2.scrollHeight <= el2.clientHeight + 60) {
        handleBlockComplete()
      }
    }, exitMs + 150)

    return () => clearTimeout(tid)
  // prefersReducedMotion is intentionally included: if the user changes OS motion
  // settings mid-session, we want the correct delay on the next block transition.
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
    console.debug('[BlockPlayer] goTo called', `index=${index}`, `blockDone=${blockDoneRef.current}`, `indexRef=${indexRef.current}`)
    update(prev => {
      const completed = new Set(prev.completedBlocks)

      // Mark current block done BEFORE computing frontier, so forward navigation
      // from a just-completed block isn't blocked on a fresh session.
      if (blockDoneRef.current) {
        completed.add(prev.activeBlockIndex)
      }

      const maxDone  = completed.size > 0 ? Math.max(...completed) : -1
      const frontier = maxDone + 1

      console.debug('[BlockPlayer] goTo update', `prev.activeBlockIndex=${prev.activeBlockIndex}`, `frontier=${frontier}`, `rejected=${index > frontier}`)
      if (index > frontier) return {}   // locked — reject silently

      return { activeBlockIndex: index, completedBlocks: [...completed] }
    })
    setDrawerOpen(false)
  }, [total, update])

  goToRef.current = goTo

  // ── Locked feedback ─────────────────────────────────────────────────────────
  function handleLockedClick(index: number) {
    clearTimeout(lockedTimer.current)
    setLockedFeedback(index)
    lockedTimer.current = setTimeout(() => setLockedFeedback(null), 2000)
  }

  // ── Scroll handler ──────────────────────────────────────────────────────────
  function onContentScroll() {
    const el = contentRef.current
    if (!el) return

    // Only scroll-based blocks complete via scroll; interactive blocks own their state
    if (strategyRef.current === 'scroll' && !blockDoneRef.current) {
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 80
      console.debug(
        '[BlockPlayer] scroll',
        `block=${activeIndex}`,
        `scrollTop=${Math.round(el.scrollTop)}`,
        `clientHeight=${el.clientHeight}`,
        `scrollHeight=${el.scrollHeight}`,
        `atBottom=${atBottom}`,
        `blockDone=${blockDoneRef.current}`,
      )
      if (atBottom) handleBlockComplete()
    }

    // Debounced scroll position save
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

  const fadeY = prefersReducedMotion ? 0 : 10
  const dur   = prefersReducedMotion ? 0 : 0.18

  // ── Playing phase ─────────────────────────────────────────────────────────────
  return (
    <div className="flex h-screen bg-background overflow-hidden">

      {/* ── Desktop Sidebar ──────────────────────────────────────────────── */}
      <aside
        className="hidden lg:flex flex-col w-44 xl:w-48 border-r border-border/40 bg-base-950 shrink-0"
        aria-label="Mission navigation"
      >
        <div className="px-3 pt-4 pb-3 border-b border-border/40 space-y-2.5">
          <Link
            to={ROUTES.COURSE(mission.courseSlug)}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="size-3" />
            Back to course
          </Link>
          <div>
            {missionNum && (
              <p className="text-[9px] font-mono font-bold tracking-[0.2em] text-primary/60 mb-0.5">
                MISSION {missionNum}
              </p>
            )}
            <h2 className="text-xs font-semibold text-foreground leading-snug line-clamp-3">
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

        {/* Sidebar footer — progress */}
        <div className="px-3 py-3 border-t border-border/40 space-y-2">
          <div className="grid grid-cols-2 gap-x-2 text-[10px] font-mono">
            <span className="text-muted-foreground">Done</span>
            <span className="text-muted-foreground text-right">{total - completedSet.size} left</span>
            <span className="text-foreground/70 font-semibold">{completedSet.size}/{total}</span>
            <span className="text-primary text-right font-semibold">{progressPct}%</span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={progressPct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Mission progress"
            className="h-1.5 rounded-full bg-base-800 overflow-hidden"
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

      {/* ── Content Column ───────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Progress header */}
        <div className="flex-none border-b border-border/20 bg-base-950/80 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-2.5 gap-4">
            <div className="flex items-center gap-2 min-w-0">
              {missionNum && (
                <span className="shrink-0 text-[10px] font-mono font-bold tracking-[0.15em] text-primary/70">
                  MISSION {missionNum}
                </span>
              )}
              {missionNum && (
                <span className="text-muted-foreground/30 select-none" aria-hidden>·</span>
              )}
              <span className="text-xs text-muted-foreground truncate hidden sm:block">
                {mission.title}
              </span>
            </div>
            <div className="shrink-0 flex items-center gap-1.5 text-[10px] font-mono">
              <span className="text-foreground/60 font-semibold">
                Block {activeIndex + 1} of {total}
              </span>
              <span className="text-muted-foreground/30 select-none" aria-hidden>·</span>
              <span className="text-primary/70">{progressPct}%</span>
            </div>
          </div>
        </div>

        {/* Scrollable block content */}
        <main
          ref={contentRef}
          id="block-content"
          className="flex-1 overflow-y-auto focus:outline-none"
          tabIndex={-1}
          aria-live="polite"
          aria-label={`Block ${activeIndex + 1} of ${total}: ${activeBlock.title}`}
          onScroll={onContentScroll}
        >
          {/*
            BlockCompletionContext is keyed to the active block.
            When the block changes, the context resets — the new block renderer
            gets a fresh complete() callback and the old one is unmounted.
          */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeBlock.id}
              initial={{ opacity: 0, y: fadeY }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -fadeY }}
              transition={{ duration: dur, ease: 'easeOut' }}
            >
              <BlockCompletionContext.Provider value={{ complete: handleBlockComplete }}>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-6">
                  <BlockRenderer block={activeBlock} />
                </div>
              </BlockCompletionContext.Provider>
            </motion.div>
          </AnimatePresence>
        </main>

        {/* ── Nav bar ───────────────────────────────────────────────────── */}
        <div className="flex-none border-t border-border/40 bg-base-950">
          <div
            role="progressbar"
            aria-valuenow={progressPct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Mission progress"
            className="h-0.5 bg-base-800 overflow-hidden"
          >
            <div
              className="h-full bg-gradient-to-r from-cyber-blue to-cyber-green transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <div className="flex items-center gap-3 px-4 py-3">
            {/* Previous */}
            <button
              onClick={() => goTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous block"
              className={cn(
                'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border transition-all',
                activeIndex === 0
                  ? 'border-border/20 text-muted-foreground/25 cursor-not-allowed'
                  : 'border-border/50 text-foreground/70 hover:text-foreground hover:border-border hover:bg-base-800/50',
              )}
            >
              <ChevronLeft className="size-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            {/* Centre — block position; mobile drawer trigger */}
            <button
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors lg:pointer-events-none"
              onClick={() => setDrawerOpen(d => !d)}
              aria-label={`Block ${activeIndex + 1} of ${total}. Open block navigation.`}
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
            >
              <LayoutList className="size-3.5 lg:hidden" aria-hidden />
              <span className="font-semibold text-foreground/60">{activeIndex + 1}</span>
              <span className="text-muted-foreground/40 select-none" aria-hidden>/</span>
              <span>{total}</span>
              <span className="hidden sm:inline text-muted-foreground/40 mx-0.5 select-none" aria-hidden>·</span>
              <span className="hidden sm:inline">{progressPct}%</span>
            </button>

            {/* Next / Complete */}
            {isFinalBlock ? (
              <button
                onClick={() => setPhase('complete')}
                disabled={!canProceed}
                aria-label="Complete mission"
                className={cn(
                  'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold border transition-all',
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
                onClick={() => {
                  console.debug('[BlockPlayer] Next clicked', `canProceed=${canProceed}`, `blockDoneRef=${blockDoneRef.current}`, `activeIndex=${activeIndex}`)
                  if (canProceed) goTo(activeIndex + 1)
                }}
                disabled={!canProceed}
                aria-label={canProceed ? 'Next block' : 'Complete this block to continue'}
                aria-disabled={!canProceed}
                className={cn(
                  'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold border transition-all',
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

          {/* Completion hint for interactive blocks */}
          {!canProceed && (
            <p className="text-center text-[10px] text-muted-foreground/40 pb-2.5 -mt-1 font-mono">
              {strategy === 'interaction'
                ? 'complete the activity above to continue'
                : 'scroll to the end to continue ↓'
              }
            </p>
          )}
        </div>
      </div>

      {/* ── Mobile / Tablet Drawer ─────────────────────────────────────── */}
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
          <div className="relative bg-base-950 border-t border-border/40 rounded-t-2xl max-h-[72vh] flex flex-col shadow-xl">
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
