import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useLessonProgress } from '../hooks/use-lesson-progress'
import { SectionRenderer } from './section-renderer'
import { LessonPlayerSidebar } from './lesson-player-sidebar'
import { LessonPlayerTopbar } from './lesson-player-topbar'
import { LessonPlayerNav } from './lesson-player-nav'
import { MissionComplete } from './mission-complete'
import type { FullLesson } from '@/types/lesson-engine'

interface Props {
  lesson: FullLesson
}

export function LessonPlayer({ lesson }: Props) {
  const progress   = useLessonProgress(lesson)
  const [drawerOpen, setDrawerOpen]               = useState(false)
  const [direction, setDirection]                 = useState<1 | -1>(1)
  const [showMissionComplete, setShowMissionComplete] = useState(false)
  const prevIndexRef    = useRef(progress.currentIndex)
  const prevCompleteRef = useRef(progress.isLessonComplete) // init with persisted state
  const sessionStartRef = useRef(Date.now())
  const contentRef      = useRef<HTMLDivElement>(null)

  // Keep a stable ref so the scroll handler always calls the latest version
  // without needing to be re-registered on every render.
  const markCurrentCompleteRef = useRef(progress.markCurrentComplete)
  markCurrentCompleteRef.current = progress.markCurrentComplete

  // Initialise progress on first mount
  useEffect(() => {
    progress.init()
  }, [lesson.id]) // eslint-disable-line react-hooks/exhaustive-deps

  // Track navigation direction for animation
  useEffect(() => {
    setDirection(progress.currentIndex >= prevIndexRef.current ? 1 : -1)
    prevIndexRef.current = progress.currentIndex
  }, [progress.currentIndex])

  // Scroll content to top on section change
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'instant' })
  }, [progress.currentSectionId])

  // Show mission-complete overlay only when the lesson transitions to complete
  // this session (not on revisit of an already-completed lesson)
  useEffect(() => {
    if (!prevCompleteRef.current && progress.isLessonComplete) {
      setShowMissionComplete(true)
    }
    prevCompleteRef.current = progress.isLessonComplete
  }, [progress.isLessonComplete])

  // Close drawer on desktop resize
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 1024) setDrawerOpen(false)
    }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  // Mark the current section complete when the user scrolls to the bottom.
  // Must listen on contentRef (the overflow-y-auto div), not window — on mobile
  // a scroll inside a custom overflow container never fires window.scroll.
  // Also schedules a delayed check so sections that fit entirely on screen
  // (no scrolling needed) are auto-completed once the enter animation settles.
  // The resize listener re-evaluates after orientation change or keyboard dismissal,
  // both of which change clientHeight and may make previously tall content fit.
  useEffect(() => {
    const el = contentRef.current
    if (!el) return

    // Guard: markCurrentComplete is idempotent at the store level, but the
    // Zustand setter is still invoked on every scroll frame once at the bottom.
    // The flag prevents any calls after the first successful completion.
    let triggered = false

    function checkBottom() {
      if (!el || triggered) return
      if (el.scrollHeight - el.scrollTop - el.clientHeight < 48) {
        triggered = true
        markCurrentCompleteRef.current()
      }
    }

    el.addEventListener('scroll', checkBottom, { passive: true })
    window.addEventListener('resize', checkBottom, { passive: true })
    // The enter animation is 280 ms; allow 600 ms for it to settle before
    // checking whether the section is short enough to auto-complete.
    const timer = window.setTimeout(checkBottom, 600)

    return () => {
      el.removeEventListener('scroll', checkBottom)
      window.removeEventListener('resize', checkBottom)
      window.clearTimeout(timer)
    }
  }, [progress.currentSectionId])

  const currentSection = lesson.sections.find(
    (s) => s.id === progress.currentSectionId
  )

  const variants = {
    enter:  (dir: number) => ({ opacity: 0, x: dir * 40 }),
    center: { opacity: 1, x: 0 },
    exit:   (dir: number) => ({ opacity: 0, x: dir * -40 }),
  }

  const elapsedMinutes = Math.max(
    1,
    Math.round((Date.now() - sessionStartRef.current) / 60_000),
  )

  return (
    <TooltipProvider delayDuration={300}>
      <div className="fixed inset-0 z-50 bg-background flex flex-col overflow-hidden">

        {/* ── TopBar ──────────────────────────────────────────── */}
        <LessonPlayerTopbar
          lesson={lesson}
          progress={progress}
          onMenuClick={() => setDrawerOpen((d) => !d)}
        />

        {/* ── Main area ───────────────────────────────────────── */}
        <div className="flex flex-1 overflow-hidden">

          {/* ── Desktop sidebar ─────────────────────────────── */}
          <LessonPlayerSidebar
            lesson={lesson}
            sections={lesson.sections}
            progress={progress}
            className="hidden lg:flex w-[240px] xl:w-[260px] shrink-0"
          />

          {/* ── Mobile drawer overlay ─────────────────────────── */}
          <AnimatePresence>
            {drawerOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden"
                  onClick={() => setDrawerOpen(false)}
                />
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  className="fixed left-0 top-14 bottom-0 z-50 w-[260px] lg:hidden"
                >
                  <LessonPlayerSidebar
                    lesson={lesson}
                    sections={lesson.sections}
                    progress={{
                      ...progress,
                      goTo: (id: string) => {
                        progress.goTo(id)
                        setDrawerOpen(false)
                      },
                    }}
                    className="flex h-full"
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* ── Section content ──────────────────────────────── */}
          <div
            ref={contentRef}
            className={cn('flex-1 overflow-y-auto overflow-x-hidden scroll-smooth')}
          >
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              {currentSection && (
                <motion.div
                  key={currentSection.id}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                  className="min-h-full"
                >
                  <SectionRenderer
                    section={currentSection}
                    progress={progress}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Nav bar ────────────────────────────────────────── */}
        <LessonPlayerNav progress={progress} />

        {/* ── Mission complete overlay ────────────────────────── */}
        <MissionComplete
          lesson={lesson}
          isVisible={showMissionComplete}
          onDismiss={() => setShowMissionComplete(false)}
          xpEarned={lesson.xpReward}
          sectionsCompleted={progress.completedCount}
          elapsedMinutes={elapsedMinutes}
        />
      </div>
    </TooltipProvider>
  )
}
