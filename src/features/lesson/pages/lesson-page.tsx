import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { LessonPlayer } from '../components/lesson-player'
import { SQL_INJECTION_LESSON } from '../data/sample-lesson'
import { NotFound, ErrorState } from '@/components/shared/error-states'
import { PageLoader } from '@/components/shared/loading-states'
import { loadLesson, ContentNotFoundError } from '@/lib/content'
import type { FullLesson } from '@/types/lesson-engine'

/**
 * LessonPage — route entry point for /courses/:courseSlug/lessons/:lessonSlug
 *
 * Resolution order:
 *   1. LEGACY_REGISTRY — instant, no async (keeps old demo routes working)
 *   2. Content Engine  — validates lesson.json via Zod, lazy-loaded per lesson
 *
 * The LessonPlayer is completely data-driven and works identically
 * regardless of which source provides the FullLesson.
 */

// ── Legacy registry — backwards compat for existing demo routes ───────────────

const LEGACY_REGISTRY: Record<string, FullLesson> = {
  'web-security-fundamentals/sql-injection-intro': SQL_INJECTION_LESSON,
}

// ── Page ──────────────────────────────────────────────────────────────────────

type LoadState =
  | { phase: 'loading' }
  | { phase: 'loaded';    lesson: FullLesson }
  | { phase: 'not-found' }
  | { phase: 'error';     message: string }

export function LessonPage() {
  const { courseSlug, lessonSlug } = useParams<{
    courseSlug: string
    lessonSlug: string
  }>()

  const [state, setState] = useState<LoadState>({ phase: 'loading' })
  const cancelRef = useRef(false)

  useEffect(() => {
    cancelRef.current = false

    if (!courseSlug || !lessonSlug) {
      setState({ phase: 'not-found' })
      return
    }

    // 1. Legacy registry — synchronous fast path
    const legacy = LEGACY_REGISTRY[`${courseSlug}/${lessonSlug}`]
    if (legacy) {
      setState({ phase: 'loaded', lesson: legacy })
      return
    }

    // 2. Content engine — async with Zod validation
    setState({ phase: 'loading' })

    loadLesson(courseSlug, lessonSlug)
      .then((lesson) => {
        if (!cancelRef.current) setState({ phase: 'loaded', lesson })
      })
      .catch((err: unknown) => {
        if (cancelRef.current) return
        if (err instanceof ContentNotFoundError) {
          setState({ phase: 'not-found' })
        } else {
          setState({
            phase: 'error',
            message: err instanceof Error ? err.message : 'Failed to load lesson',
          })
        }
      })

    return () => { cancelRef.current = true }
  }, [courseSlug, lessonSlug])

  if (state.phase === 'loading')   return <PageLoader />
  if (state.phase === 'not-found') return <NotFound />
  if (state.phase === 'error')     return (
    <ErrorState
      title="Lesson failed to load"
      description={state.message}
    />
  )

  return <LessonPlayer lesson={state.lesson} />
}
