import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, ChevronDown, ChevronRight, Clock, Zap,
  CheckCircle2, BookOpen, PlayCircle, Shield,
} from 'lucide-react'
import { cn, formatDuration, difficultyVariant } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { PageLoader } from '@/components/shared/loading-states'
import { NotFound, ErrorState } from '@/components/shared/error-states'
import { loadCourse, loadModulesForCourse, ContentNotFoundError } from '@/lib/content'
import { ROUTES, SKILL_CATEGORIES } from '@/lib/constants'
import type { ContentCourse, ContentModule } from '@/lib/content'

// ── Load state ────────────────────────────────────────────────────────────────

type LoadState =
  | { phase: 'loading' }
  | { phase: 'loaded'; course: ContentCourse; modules: ContentModule[] }
  | { phase: 'not-found' }
  | { phase: 'error'; message: string }

// ── Page ──────────────────────────────────────────────────────────────────────

export function CourseDetail() {
  const { courseSlug } = useParams<{ courseSlug: string }>()
  const [state, setState]               = useState<LoadState>({ phase: 'loading' })
  const [expandedModules, setExpanded]  = useState<Set<string>>(new Set())
  const cancelRef = useRef(false)

  useEffect(() => {
    cancelRef.current = false

    if (!courseSlug) {
      setState({ phase: 'not-found' })
      return
    }

    Promise.all([
      loadCourse(courseSlug),
      loadModulesForCourse(courseSlug),
    ])
      .then(([course, modules]) => {
        if (cancelRef.current) return
        if (!course) { setState({ phase: 'not-found' }); return }
        // Auto-expand the first module so the user can start immediately
        setExpanded(new Set(modules.length > 0 ? [modules[0].slug] : []))
        setState({ phase: 'loaded', course, modules })
      })
      .catch((err: unknown) => {
        if (cancelRef.current) return
        if (err instanceof ContentNotFoundError) {
          setState({ phase: 'not-found' })
        } else {
          setState({
            phase: 'error',
            message: err instanceof Error ? err.message : 'Failed to load course',
          })
        }
      })

    return () => { cancelRef.current = true }
  }, [courseSlug])

  if (state.phase === 'loading')   return <PageLoader />
  if (state.phase === 'not-found') return <NotFound />
  if (state.phase === 'error')     return (
    <ErrorState title="Course failed to load" description={state.message} />
  )

  const { course, modules } = state
  const catStyle     = SKILL_CATEGORIES[course.category]
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0)
  const firstLesson  = modules[0]?.lessons?.[0]
  const startHref    = firstLesson ? ROUTES.LESSON(course.slug, firstLesson.slug) : undefined

  function toggleModule(slug: string) {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(slug)) next.delete(slug)
      else next.add(slug)
      return next
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-full bg-background"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-8 pb-16">

        {/* ── Breadcrumb ──────────────────────────────────────────────── */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link
            to={ROUTES.COURSES}
            className="flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            Courses
          </Link>
          <span className="text-muted-foreground/40">/</span>
          <span className="text-foreground font-medium truncate">{course.title}</span>
        </nav>

        {/* ── Hero card ───────────────────────────────────────────────── */}
        <Card className="overflow-hidden">
          {/* Category colour bar */}
          <div
            className="h-1.5 w-full"
            style={{ background: `linear-gradient(90deg, ${catStyle.color}, ${catStyle.color}30)` }}
          />

          <div className="p-6 sm:p-8 space-y-6">
            {/* Top: emoji + badges */}
            <div className="flex items-start justify-between gap-4">
              <div
                className="flex size-16 shrink-0 items-center justify-center rounded-2xl text-3xl"
                style={{
                  background:  `${catStyle.color}12`,
                  border:      `1px solid ${catStyle.color}25`,
                }}
              >
                {course.coverEmoji ?? '🔐'}
              </div>
              <div className="flex flex-wrap items-start gap-1.5 justify-end">
                {course.isNew && <Badge variant="new">NEW</Badge>}
                {course.isPro && <Badge variant="pro">PRO</Badge>}
                <Badge variant={difficultyVariant(course.difficulty)}>
                  {course.difficulty}
                </Badge>
                <Badge
                  variant="outline"
                  style={{ borderColor: `${catStyle.color}50`, color: catStyle.color }}
                >
                  {catStyle.label}
                </Badge>
              </div>
            </div>

            {/* CDA mission framing */}
            <div className="flex items-center gap-2">
              <Shield className="size-3 text-cyber-green/50" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyber-green/50 font-mono">
                Cyber Defense Agency · {catStyle.label}
              </span>
            </div>

            {/* Title + tagline */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-black text-foreground leading-tight">
                {course.title}
              </h1>
              <p className="text-muted-foreground text-base leading-relaxed">
                {course.tagline}
              </p>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {course.description}
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-5 text-sm border-t border-border pt-4">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="size-4 shrink-0" />
                <span>{formatDuration(course.estimatedHours * 60)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="size-4 text-primary shrink-0" />
                <span className="font-semibold text-primary">
                  +{course.xpReward.toLocaleString()} XP
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <BookOpen className="size-4 shrink-0" />
                <span>{totalLessons} lessons across {modules.length} modules</span>
              </div>
            </div>

            {/* CTA */}
            {startHref && (
              <Button asChild variant="cyber" size="lg" className="gap-2 w-full sm:w-auto">
                <Link to={startHref}>
                  <PlayCircle className="size-5" />
                  Begin Mission 01
                </Link>
              </Button>
            )}
          </div>
        </Card>

        {/* ── Learning objectives ──────────────────────────────────────── */}
        {course.learningObjectives.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-base font-bold text-foreground">
              What you'll learn
            </h2>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {course.learningObjectives.map((obj, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.05 }}
                  className="flex items-start gap-3 p-3.5 rounded-lg bg-base-800/50"
                >
                  <CheckCircle2 className="size-4 text-cyber-green shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground leading-snug">{obj}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* ── Module list ──────────────────────────────────────────────── */}
        <section className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-base font-bold text-foreground">Course Modules</h2>
            <span className="text-xs text-muted-foreground font-mono shrink-0">
              {modules.length} modules · {totalLessons} missions
            </span>
          </div>

          <div className="space-y-2">
            {modules.map((module, mi) => {
              const isExpanded = expandedModules.has(module.slug)
              const moduleNum  = String(mi + 1).padStart(2, '0')

              return (
                <Card key={module.slug} className="overflow-hidden">

                  {/* Module header — clickable */}
                  <button
                    onClick={() => toggleModule(module.slug)}
                    className={cn(
                      'w-full flex items-center gap-4 px-5 py-4 text-left',
                      'transition-colors hover:bg-base-800/40',
                      isExpanded && 'bg-base-800/25',
                    )}
                    aria-expanded={isExpanded}
                  >
                    {/* Numbered badge */}
                    <div
                      className="flex size-8 shrink-0 items-center justify-center rounded-lg text-xs font-black font-mono text-base-950"
                      style={{ background: catStyle.color }}
                    >
                      {moduleNum}
                    </div>

                    {/* Module info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground leading-snug">
                        {module.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                        <span>{module.lessons.length} missions</span>
                        <span className="text-muted-foreground/40">·</span>
                        <span>{formatDuration(module.estimatedHours * 60)}</span>
                      </div>
                    </div>

                    <ChevronDown
                      className={cn(
                        'size-4 text-muted-foreground shrink-0 transition-transform duration-200',
                        isExpanded && 'rotate-180',
                      )}
                    />
                  </button>

                  {/* Lesson list — animated expand */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="border-t border-border/60 divide-y divide-border/40">
                          {module.lessons.map((lesson, li) => {
                            const href    = ROUTES.LESSON(course.slug, lesson.slug)
                            const isFirst = mi === 0 && li === 0

                            return (
                              <div
                                key={lesson.slug}
                                className="flex items-center gap-3 sm:gap-4 px-5 py-3 hover:bg-base-800/25 transition-colors"
                              >
                                {/* Step number */}
                                <span className="text-xs font-mono text-muted-foreground/40 shrink-0 w-5 text-right">
                                  {String(li + 1).padStart(2, '0')}
                                </span>

                                {/* Title + meta */}
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-foreground truncate">
                                    {lesson.title}
                                  </p>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                      <Clock className="size-3" />
                                      {formatDuration(lesson.estimatedMinutes)}
                                    </span>
                                    <span className="text-muted-foreground/30 text-xs">·</span>
                                    <span className="text-xs font-mono font-semibold text-cyber-green">
                                      +{lesson.xpReward} XP
                                    </span>
                                  </div>
                                </div>

                                {/* Difficulty — desktop only */}
                                <Badge
                                  variant={difficultyVariant(lesson.difficulty)}
                                  className="hidden sm:inline-flex shrink-0"
                                >
                                  {lesson.difficulty}
                                </Badge>

                                {/* Start button */}
                                <Button
                                  asChild
                                  variant={isFirst ? 'cyber' : 'ghost'}
                                  size="sm"
                                  className={cn('shrink-0 gap-1', !isFirst && 'text-muted-foreground')}
                                >
                                  <Link to={href}>
                                    {isFirst ? (
                                      <>
                                        <PlayCircle className="size-3.5" />
                                        <span>Start</span>
                                      </>
                                    ) : (
                                      <ChevronRight className="size-4" />
                                    )}
                                  </Link>
                                </Button>
                              </div>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              )
            })}
          </div>
        </section>

        {/* ── Prerequisites ────────────────────────────────────────────── */}
        {course.prerequisites.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Prerequisites
            </h2>
            <div className="flex flex-wrap gap-2">
              {course.prerequisites.map((prereq) => (
                <Badge key={prereq} variant="outline">{prereq}</Badge>
              ))}
            </div>
          </section>
        )}

      </div>
    </motion.div>
  )
}
