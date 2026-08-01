/**
 * ContentRegistry — Vite glob-based content scanner
 *
 * import.meta.glob runs at BUILD TIME. Vite scans the file system and
 * creates a map of { filePath: () => Promise<module> }. This means:
 * - We always know which courses/lessons EXIST (synchronously, from Object.keys)
 * - We only LOAD a file when it's actually needed (lazy, async)
 * - New content files are automatically discovered without config changes
 *
 * Scale profile: 1000 courses × 10 modules = 10,000 module.json files.
 * Each is ~2KB. The registry holds lazy loaders, not data — O(1) memory.
 */

import { ZodError } from 'zod'
import {
  ContentCourseSchema,
  ContentModuleSchema,
  ContentLessonSchema,
} from './schemas'
import type { ContentCourse, ContentModule, ContentLesson } from './schemas'
import { CourseMissionMetaSchema } from './mission-schemas'
import type { CourseMissionMeta } from './mission-schemas'
import { migrateBlock, ContentMigrationError } from './block-migration'
import type { StandardBlock } from '@/types/mission-engine'

// ── Vite glob maps — populated at build time ──────────────────────────────────
// Patterns are relative to THIS file (src/lib/content/registry.ts)
// → ../../../content/ resolves to <project-root>/content/

const COURSE_GLOBS = import.meta.glob(
  '../../../content/courses/*/course.json',
  { import: 'default' },
)

const MODULE_GLOBS = import.meta.glob(
  '../../../content/courses/*/*/module.json',
  { import: 'default' },
)

const LESSON_GLOBS = import.meta.glob(
  '../../../content/courses/*/*/*/lesson.json',
  { import: 'default' },
)

// Mission globs — Course → Module → Mission → Block architecture
// mission.json lives at:  content/courses/{course}/{module}/{mission}/mission.json
// Block files live at:    content/courses/{course}/{module}/{mission}/blocks/*.json

const MISSION_GLOBS = import.meta.glob(
  '../../../content/courses/*/*/*/mission.json',
  { import: 'default' },
)

const BLOCK_GLOBS = import.meta.glob(
  '../../../content/courses/*/*/*/blocks/*.json',
  { import: 'default' },
)

// ── Path parsers ──────────────────────────────────────────────────────────────

function parseCourseSlug(path: string): string {
  return path.match(/courses\/([^/]+)\/course\.json$/)?.[1] ?? ''
}

function parseModuleSlugs(path: string) {
  const m = path.match(/courses\/([^/]+)\/([^/]+)\/module\.json$/)
  return { courseSlug: m?.[1] ?? '', moduleSlug: m?.[2] ?? '' }
}

function parseLessonSlugs(path: string) {
  const m = path.match(/courses\/([^/]+)\/([^/]+)\/([^/]+)\/lesson\.json$/)
  return { courseSlug: m?.[1] ?? '', moduleSlug: m?.[2] ?? '', lessonSlug: m?.[3] ?? '' }
}

function parseMissionSlugs(path: string) {
  const m = path.match(/courses\/([^/]+)\/([^/]+)\/([^/]+)\/mission\.json$/)
  return { courseSlug: m?.[1] ?? '', moduleSlug: m?.[2] ?? '', missionSlug: m?.[3] ?? '' }
}

function parseBlockPath(path: string) {
  const m = path.match(/courses\/([^/]+)\/([^/]+)\/([^/]+)\/blocks\/([^/]+)\.json$/)
  return {
    courseSlug:  m?.[1] ?? '',
    moduleSlug:  m?.[2] ?? '',
    missionSlug: m?.[3] ?? '',
    blockFile:   m?.[4] ?? '',
  }
}

// ── Module-level caches — shared across all callers in a session ──────────────

let coursesCache: ContentCourse[] | null = null
const moduleCache  = new Map<string, ContentModule>()
const lessonCache  = new Map<string, ContentLesson>()
const missionCache = new Map<string, CourseMissionMeta>()
const blockCache   = new Map<string, StandardBlock[]>()

// ── Internal: format Zod errors into a readable message ──────────────────────

function describeZodError(location: string, err: ZodError): ContentValidationError {
  const lines = err.issues.map(
    (i) => `  · ${i.path.length ? i.path.join('.') : 'root'}: ${i.message}`,
  )
  return new ContentValidationError(
    `Content validation failed for ${location}:\n${lines.join('\n')}`,
  )
}

// ── Public registry API ───────────────────────────────────────────────────────

/**
 * Returns all courses, sorted alphabetically.
 * Loads all course.json files in parallel on first call, then returns from cache.
 */
export async function getAllCourses(): Promise<ContentCourse[]> {
  if (coursesCache) return coursesCache

  const entries = Object.entries(COURSE_GLOBS)
  const results = await Promise.all(
    entries.map(async ([path, load]) => {
      const raw = await load()
      const parsed = ContentCourseSchema.safeParse(raw)
      if (!parsed.success) throw describeZodError(`course "${parseCourseSlug(path)}"`, parsed.error)
      return parsed.data
    }),
  )

  coursesCache = results.sort((a, b) => a.title.localeCompare(b.title))
  return coursesCache
}

/** Returns a single course by slug, or null if not found. */
export async function getCourse(courseSlug: string): Promise<ContentCourse | null> {
  const all = await getAllCourses()
  return all.find((c) => c.slug === courseSlug) ?? null
}

/**
 * Returns all modules for a course, sorted by order.
 * Modules are loaded lazily per course — only what is needed is fetched.
 */
export async function getModulesForCourse(courseSlug: string): Promise<ContentModule[]> {
  const entries = Object.entries(MODULE_GLOBS).filter(([p]) =>
    p.includes(`/courses/${courseSlug}/`),
  )

  const modules = await Promise.all(
    entries.map(async ([path, load]) => {
      if (moduleCache.has(path)) return moduleCache.get(path)!

      const raw = await load()
      const parsed = ContentModuleSchema.safeParse(raw)
      if (!parsed.success) {
        const { moduleSlug } = parseModuleSlugs(path)
        throw describeZodError(`module "${courseSlug}/${moduleSlug}"`, parsed.error)
      }
      moduleCache.set(path, parsed.data)
      return parsed.data
    }),
  )

  return modules.sort((a, b) => a.order - b.order)
}

/**
 * Loads a specific lesson by its course + lesson slug.
 * Throws ContentNotFoundError if no matching file exists.
 * Throws ContentValidationError if the JSON fails schema validation.
 */
export async function getLesson(
  courseSlug: string,
  lessonSlug: string,
): Promise<ContentLesson> {
  const key = `${courseSlug}/${lessonSlug}`
  if (lessonCache.has(key)) return lessonCache.get(key)!

  const entry = Object.entries(LESSON_GLOBS).find(([path]) => {
    const { courseSlug: cs, lessonSlug: ls } = parseLessonSlugs(path)
    return cs === courseSlug && ls === lessonSlug
  })

  if (!entry) {
    throw new ContentNotFoundError(`Lesson "${key}" not found in content directory`)
  }

  const [path, load] = entry
  const raw = await load()
  const parsed = ContentLessonSchema.safeParse(raw)
  if (!parsed.success) {
    const { lessonSlug: ls } = parseLessonSlugs(path)
    throw describeZodError(`lesson "${courseSlug}/${ls}"`, parsed.error)
  }

  lessonCache.set(key, parsed.data)
  return parsed.data
}

/**
 * Returns all known {courseSlug, lessonSlug} pairs without loading any data.
 * Used to build sitemaps, pre-warm caches, or validate routes at build time.
 */
export function getAvailableLessonKeys(): Array<{ courseSlug: string; lessonSlug: string }> {
  return Object.keys(LESSON_GLOBS).map((path) => {
    const { courseSlug, lessonSlug } = parseLessonSlugs(path)
    return { courseSlug, lessonSlug }
  })
}

/**
 * Returns mission metadata for a specific mission by its slugs.
 * Throws ContentNotFoundError if no matching mission.json exists.
 */
export async function getMission(
  courseSlug: string,
  moduleSlug: string,
  missionSlug: string,
): Promise<CourseMissionMeta> {
  const key = `${courseSlug}/${moduleSlug}/${missionSlug}`
  if (missionCache.has(key)) return missionCache.get(key)!

  const entry = Object.entries(MISSION_GLOBS).find(([path]) => {
    const s = parseMissionSlugs(path)
    return s.courseSlug === courseSlug && s.moduleSlug === moduleSlug && s.missionSlug === missionSlug
  })

  if (!entry) {
    throw new ContentNotFoundError(`Mission "${key}" not found in content directory`)
  }

  const [, load] = entry
  const raw = await load()
  const parsed = CourseMissionMetaSchema.safeParse(raw)
  if (!parsed.success) throw describeZodError(`mission "${key}"`, parsed.error)

  missionCache.set(key, parsed.data)
  return parsed.data
}

/**
 * Returns all blocks for a mission as StandardBlock[], sorted by metadata.order.
 * Accepts both new standard-format and legacy flat-format block files —
 * the migration layer converts old files transparently on first load.
 */
export async function getBlocksForMission(
  courseSlug: string,
  moduleSlug: string,
  missionSlug: string,
): Promise<StandardBlock[]> {
  const key = `${courseSlug}/${moduleSlug}/${missionSlug}`
  if (blockCache.has(key)) return blockCache.get(key)!

  const entries = Object.entries(BLOCK_GLOBS).filter(([path]) => {
    const s = parseBlockPath(path)
    return s.courseSlug === courseSlug && s.moduleSlug === moduleSlug && s.missionSlug === missionSlug
  })

  const blocks = await Promise.all(
    entries.map(async ([path, load]) => {
      const raw = await load()
      try {
        return migrateBlock(raw)
      } catch (err) {
        const { blockFile } = parseBlockPath(path)
        if (err instanceof ContentMigrationError) {
          throw new ContentValidationError(`${err.message} (file: ${key}/blocks/${blockFile})`)
        }
        throw err
      }
    }),
  )

  const sorted = blocks.sort((a, b) => a.metadata.order - b.metadata.order)
  blockCache.set(key, sorted)
  return sorted
}

/** Clears all in-memory caches. Useful in tests or after hot-reload. */
export function invalidateRegistry(): void {
  coursesCache = null
  moduleCache.clear()
  lessonCache.clear()
  missionCache.clear()
  blockCache.clear()
}

// ── Error types ───────────────────────────────────────────────────────────────

export class ContentValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ContentValidationError'
  }
}

export class ContentNotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ContentNotFoundError'
  }
}
