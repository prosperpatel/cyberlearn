import { useEffect, useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useLessonProgress } from '../hooks/use-lesson-progress'
import { SectionRenderer } from './section-renderer'
import { LessonPlayerSidebar } from './lesson-player-sidebar'
import { LessonPlayerTopbar } from './lesson-player-topbar'
import { LessonPlayerNav } from './lesson-player-nav'
import type { FullLesson } from '@/types/lesson-engine'

interface Props {
  lesson: FullLesson
}

/**
 * LessonPlayer — the orchestrator.
 *
 * Layout:
 *   ┌──────── TopBar (fixed height) ─────────────────────────┐
 *   │ Sidebar │  Content (scrollable)                        │
 *   │ (fixed) │  [SectionRenderer renders section here]      │
 *   │         │                                              │
 *   ├─────────────────── NavBar (fixed height) ──────────────┤
 *
 * On mobile: sidebar becomes a drawer (toggled by topbar menu button).
 * Progress is persisted in Zustand → localStorage.
 * Section transitions animate forward/backward via framer-motion.
 */
export function LessonPlayer({ lesson }: Props) {
  const progress = useLessonProgress(lesson)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [direction, setDirection] = useState<1 | -1>(1)
  const prevIndexRef = useRef(progress.currentIndex)
  const contentRef = useRef<HTMLDivElement>(null)

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

  // Close drawer on desktop resize
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 1024) setDrawerOpen(false)
    }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  const currentSection = lesson.sections.find(
    (s) => s.id === progress.currentSectionId
  )

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 40 }),
    center: { opacity: 1, x: 0 },
    exit:  (dir: number) => ({ opacity: 0, x: dir * -40 }),
  }

  return (
    <TooltipProvider delayDuration={300}>
      <div className="fixed inset-0 z-50 bg-background flex flex-col overflow-hidden">

        {/* ── TopBar ─────────────────────────────────────────────────── */}
        <LessonPlayerTopbar
          lesson={lesson}
          progress={progress}
          onMenuClick={() => setDrawerOpen((d) => !d)}
        />

        {/* ── Main area ──────────────────────────────────────────────── */}
        <div className="flex flex-1 overflow-hidden">

          {/* ── Desktop sidebar ──────────────────────────────────────── */}
          <LessonPlayerSidebar
            sections={lesson.sections}
            progress={progress}
            className="hidden lg:flex w-[240px] xl:w-[260px] shrink-0"
          />

          {/* ── Mobile drawer overlay ────────────────────────────────── */}
          <AnimatePresence>
            {drawerOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden"
                  onClick={() => setDrawerOpen(false)}
                />
                {/* Drawer */}
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  className="fixed left-0 top-14 bottom-0 z-50 w-[260px] lg:hidden"
                >
                  <LessonPlayerSidebar
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

          {/* ── Section content ──────────────────────────────────────── */}
          <div
            ref={contentRef}
            className={cn(
              'flex-1 overflow-y-auto overflow-x-hidden',
              'scroll-smooth',
            )}
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

        {/* ── Nav bar ────────────────────────────────────────────────── */}
        <LessonPlayerNav progress={progress} />
      </div>
    </TooltipProvider>
  )
}
