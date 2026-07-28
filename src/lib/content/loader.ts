/**
 * Content Loader — public API for loading content
 *
 * The loader is the bridge between the content layer and the UI layer.
 * It validates content via Zod schemas and returns types that the existing
 * LessonPlayer and course pages already understand.
 *
 * The ContentLesson type is a structural superset of FullLesson:
 * - ContentLesson has all FullLesson fields + version, author, description, etc.
 * - Zod ensures the data is valid before casting, so the cast is safe.
 */

import type { FullLesson } from '@/types/lesson-engine'
import {
  getAllCourses,
  getCourse,
  getModulesForCourse,
  getLesson,
  ContentValidationError,
  ContentNotFoundError,
} from './registry'
import type { ContentCourse, ContentModule } from './schemas'

export { ContentValidationError, ContentNotFoundError }

// ── Core loaders ──────────────────────────────────────────────────────────────

/**
 * Loads and validates a course by slug.
 * Returns null if the course slug doesn't exist in the content directory.
 */
export async function loadCourse(courseSlug: string): Promise<ContentCourse | null> {
  return getCourse(courseSlug)
}

/**
 * Loads and validates a specific module within a course.
 * Returns null if the module slug doesn't exist for that course.
 */
export async function loadModule(
  courseSlug: string,
  moduleSlug: string,
): Promise<ContentModule | null> {
  const modules = await getModulesForCourse(courseSlug)
  return modules.find((m) => m.slug === moduleSlug) ?? null
}

/**
 * Loads and validates a full lesson, ready to pass to LessonPlayer.
 *
 * ContentLesson is a structural superset of FullLesson. After Zod validation,
 * the data is guaranteed to satisfy the FullLesson contract. The cast is safe.
 *
 * Throws ContentNotFoundError if the lesson doesn't exist.
 * Throws ContentValidationError with field-level detail if the JSON is invalid.
 */
export async function loadLesson(
  courseSlug: string,
  lessonSlug: string,
): Promise<FullLesson> {
  const content = await getLesson(courseSlug, lessonSlug)
  // ContentLesson ⊇ FullLesson — the extra fields (version, author, etc.) are simply ignored by the UI layer.
  return content as unknown as FullLesson
}

/**
 * Returns all courses, sorted by title.
 * Used by the courses listing page to populate the grid.
 */
export { getAllCourses }

/**
 * Returns all modules for a course, sorted by order.
 */
export async function loadModulesForCourse(courseSlug: string): Promise<ContentModule[]> {
  return getModulesForCourse(courseSlug)
}
