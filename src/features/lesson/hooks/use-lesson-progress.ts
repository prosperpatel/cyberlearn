import { useMemo } from 'react'
import { useLessonStore } from '../store/lesson-store'
import type { FullLesson, QuizAttempt } from '@/types/lesson-engine'

/**
 * Primary hook for lesson components.
 * Derives all UI state from the store so components never read raw progress directly.
 */
export function useLessonProgress(lesson: FullLesson) {
  const store = useLessonStore()
  const progress = store.getProgress(lesson.id)

  const sectionIds = useMemo(
    () => lesson.sections.map((s) => s.id),
    [lesson.sections]
  )

  const currentSectionId   = progress?.currentSectionId   ?? sectionIds[0]
  const completedSectionIds = progress?.completedSectionIds ?? []

  const currentIndex = sectionIds.indexOf(currentSectionId)
  const totalSections = sectionIds.length

  const completedCount = completedSectionIds.length
  const progressPercent = totalSections > 0
    ? Math.round((completedCount / totalSections) * 100)
    : 0

  const estimatedMinutesRemaining = lesson.sections
    .filter((s, i) => i >= currentIndex && !completedSectionIds.includes(s.id))
    .reduce((acc, s) => acc + s.estimatedMinutes, 0)

  const isFirstSection = currentIndex === 0
  const isLastSection  = currentIndex === totalSections - 1
  const isLessonComplete = !!progress?.completedAt

  function isSectionCompleted(sectionId: string) {
    return completedSectionIds.includes(sectionId)
  }

  function isSectionCurrent(sectionId: string) {
    return sectionId === currentSectionId
  }

  function canNavigateToSection(sectionId: string) {
    // Can always revisit completed sections and the current one
    const idx = sectionIds.indexOf(sectionId)
    const lastCompletedIdx = Math.max(
      -1,
      ...completedSectionIds.map((id) => sectionIds.indexOf(id))
    )
    return idx <= lastCompletedIdx + 1
  }

  // Actions
  function init() {
    store.initLesson(lesson.id, sectionIds[0])
  }

  function goTo(sectionId: string) {
    store.setCurrentSection(lesson.id, sectionId)
  }

  function goNext() {
    if (currentIndex < totalSections - 1) {
      const nextId = sectionIds[currentIndex + 1]
      store.markSectionComplete(lesson.id, currentSectionId)
      store.setCurrentSection(lesson.id, nextId)
    } else {
      // Last section — complete the lesson
      store.markSectionComplete(lesson.id, currentSectionId)
      store.completeLesson(lesson.id)
    }
  }

  function goPrev() {
    if (currentIndex > 0) {
      store.setCurrentSection(lesson.id, sectionIds[currentIndex - 1])
    }
  }

  function markCurrentComplete() {
    store.markSectionComplete(lesson.id, currentSectionId)
  }

  function setReflection(sectionId: string, text: string) {
    store.setReflectionNote(lesson.id, sectionId, text)
  }

  function getReflection(sectionId: string): string {
    return progress?.reflectionNotes?.[sectionId] ?? ''
  }

  function submitQuiz(sectionId: string, attempt: QuizAttempt) {
    store.submitQuiz(lesson.id, sectionId, attempt)
  }

  function getQuizAttempt(sectionId: string): QuizAttempt | undefined {
    return progress?.quizAttempts?.[sectionId]
  }

  function markPracticalDone(sectionId: string) {
    store.markPracticalComplete(lesson.id, sectionId)
  }

  function isPracticalComplete(sectionId: string): boolean {
    return progress?.practicalComplete?.[sectionId] ?? false
  }

  function recordChallenge(sectionId: string, answer: string, correct: boolean) {
    store.recordChallengeAttempt(lesson.id, sectionId, answer, correct)
  }

  function getChallengeState(sectionId: string) {
    return progress?.challengeAttempts?.[sectionId]
  }

  return {
    // State
    currentSectionId,
    currentIndex,
    totalSections,
    completedSectionIds,
    completedCount,
    progressPercent,
    estimatedMinutesRemaining,
    isFirstSection,
    isLastSection,
    isLessonComplete,

    // Computed checks
    isSectionCompleted,
    isSectionCurrent,
    canNavigateToSection,

    // Navigation
    init,
    goTo,
    goNext,
    goPrev,
    markCurrentComplete,

    // Feature-specific
    setReflection,
    getReflection,
    submitQuiz,
    getQuizAttempt,
    markPracticalDone,
    isPracticalComplete,
    recordChallenge,
    getChallengeState,
  }
}
