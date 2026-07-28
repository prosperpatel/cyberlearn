import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { LessonProgress, QuizAttempt } from '@/types/lesson-engine'

interface LessonStoreState {
  // map of lessonId → progress
  progress: Record<string, LessonProgress>

  // initialise a lesson's progress entry (idempotent)
  initLesson:   (lessonId: string, firstSectionId: string) => void

  // navigation
  setCurrentSection: (lessonId: string, sectionId: string) => void
  markSectionComplete: (lessonId: string, sectionId: string) => void

  // completion
  completeLesson: (lessonId: string) => void

  // reflection
  setReflectionNote: (lessonId: string, sectionId: string, text: string) => void

  // quiz
  submitQuiz: (lessonId: string, sectionId: string, attempt: QuizAttempt) => void

  // practical
  markPracticalComplete: (lessonId: string, sectionId: string) => void

  // challenge
  recordChallengeAttempt: (
    lessonId:  string,
    sectionId: string,
    answer:    string,
    correct:   boolean,
  ) => void

  // getters
  getProgress: (lessonId: string) => LessonProgress | undefined
}

export const useLessonStore = create<LessonStoreState>()(
  persist(
    (set, get) => ({
      progress: {},

      initLesson: (lessonId, firstSectionId) => {
        set((state) => {
          // Don't overwrite existing progress — enables resume
          if (state.progress[lessonId]) return state

          const now = Date.now()
          return {
            progress: {
              ...state.progress,
              [lessonId]: {
                lessonId,
                currentSectionId:    firstSectionId,
                completedSectionIds: [],
                reflectionNotes:     {},
                quizAttempts:        {},
                practicalComplete:   {},
                challengeAttempts:   {},
                startedAt:           now,
                lastActiveAt:        now,
              },
            },
          }
        })
      },

      setCurrentSection: (lessonId, sectionId) => {
        set((state) => ({
          progress: {
            ...state.progress,
            [lessonId]: {
              ...state.progress[lessonId],
              currentSectionId: sectionId,
              lastActiveAt:     Date.now(),
            },
          },
        }))
      },

      markSectionComplete: (lessonId, sectionId) => {
        set((state) => {
          const existing = state.progress[lessonId]
          if (!existing) return state
          const ids = existing.completedSectionIds
          if (ids.includes(sectionId)) return state

          return {
            progress: {
              ...state.progress,
              [lessonId]: {
                ...existing,
                completedSectionIds: [...ids, sectionId],
                lastActiveAt:        Date.now(),
              },
            },
          }
        })
      },

      completeLesson: (lessonId) => {
        set((state) => ({
          progress: {
            ...state.progress,
            [lessonId]: {
              ...state.progress[lessonId],
              completedAt:  Date.now(),
              lastActiveAt: Date.now(),
            },
          },
        }))
      },

      setReflectionNote: (lessonId, sectionId, text) => {
        set((state) => ({
          progress: {
            ...state.progress,
            [lessonId]: {
              ...state.progress[lessonId],
              reflectionNotes: {
                ...state.progress[lessonId]?.reflectionNotes,
                [sectionId]: text,
              },
              lastActiveAt: Date.now(),
            },
          },
        }))
      },

      submitQuiz: (lessonId, sectionId, attempt) => {
        set((state) => ({
          progress: {
            ...state.progress,
            [lessonId]: {
              ...state.progress[lessonId],
              quizAttempts: {
                ...state.progress[lessonId]?.quizAttempts,
                [sectionId]: attempt,
              },
              lastActiveAt: Date.now(),
            },
          },
        }))
      },

      markPracticalComplete: (lessonId, sectionId) => {
        set((state) => ({
          progress: {
            ...state.progress,
            [lessonId]: {
              ...state.progress[lessonId],
              practicalComplete: {
                ...state.progress[lessonId]?.practicalComplete,
                [sectionId]: true,
              },
              lastActiveAt: Date.now(),
            },
          },
        }))
      },

      recordChallengeAttempt: (lessonId, sectionId, answer, correct) => {
        set((state) => {
          const existing = state.progress[lessonId]?.challengeAttempts?.[sectionId]
          return {
            progress: {
              ...state.progress,
              [lessonId]: {
                ...state.progress[lessonId],
                challengeAttempts: {
                  ...state.progress[lessonId]?.challengeAttempts,
                  [sectionId]: {
                    answer,
                    correct,
                    attempts: (existing?.attempts ?? 0) + 1,
                  },
                },
                lastActiveAt: Date.now(),
              },
            },
          }
        })
      },

      getProgress: (lessonId) => get().progress[lessonId],
    }),
    {
      name: 'cyber-learn-lesson-progress',
      // Only persist the progress map; no derived state
      partialize: (state) => ({ progress: state.progress }),
    }
  )
)
