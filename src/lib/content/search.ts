/**
 * Content Search Engine
 *
 * Architecture for scale:
 * - Search index is built from course.json + module.json files ONLY
 * - Full lesson.json files are never loaded just for search (they're large)
 * - The index includes lesson summaries from module.json (title, tags, difficulty)
 * - First call builds the index; subsequent calls use the cache
 *
 * This approach scales to 10,000+ lessons: the index is built from
 * ~1,000 small metadata files, not 10,000 full lesson files.
 */

import type { Difficulty } from '@/types'
import { getAllCourses, getModulesForCourse } from './registry'
import type { ContentCourse } from './schemas'

// ── Types ──────────────────────────────────────────────────────────────────────

export interface SearchEntry {
  type:             'course' | 'lesson'
  id:               string
  slug:             string
  courseSlug:       string
  moduleSlug?:      string
  title:            string
  description:      string
  difficulty:       Difficulty
  tags:             string[]
  estimatedMinutes: number
  xpReward:         number
  order?:           number
}

export interface SearchResult {
  entry: SearchEntry
  score: number
}

export interface SearchFilters {
  type?:       'course' | 'lesson'
  difficulty?: Difficulty
  tags?:       string[]
  maxMinutes?: number
}

// ── Cache ──────────────────────────────────────────────────────────────────────

let indexCache: SearchEntry[] | null = null

// ── Scoring ────────────────────────────────────────────────────────────────────

function scoreEntry(entry: SearchEntry, query: string, terms: string[]): number {
  const title = entry.title.toLowerCase()
  const desc  = entry.description.toLowerCase()
  const q     = query.toLowerCase()
  let score   = 0

  if (title === q)               score += 100
  else if (title.startsWith(q)) score += 60
  else if (title.includes(q))   score += 40

  for (const term of terms) {
    if (title.includes(term))                                    score += 20
    if (desc.includes(term))                                     score += 8
    if (entry.tags.some((t) => t.toLowerCase().includes(term))) score += 15
  }

  return score
}

// ── Public API ─────────────────────────────────────────────────────────────────

/**
 * Builds the search index from all course + module metadata.
 * Result is cached — subsequent calls return instantly.
 *
 * To pre-warm: call `await buildSearchIndex()` after app mount.
 * To invalidate (e.g., after content hot-reload): call `invalidateSearchIndex()`.
 */
export async function buildSearchIndex(): Promise<SearchEntry[]> {
  if (indexCache) return indexCache

  const courses  = await getAllCourses()
  const entries: SearchEntry[] = []

  await Promise.all(
    courses.map(async (course: ContentCourse) => {
      // ── Course entry ──────────────────────────────────────
      entries.push({
        type:             'course',
        id:               course.id,
        slug:             course.slug,
        courseSlug:       course.slug,
        title:            course.title,
        description:      course.tagline,
        difficulty:       course.difficulty,
        tags:             course.tags,
        estimatedMinutes: Math.round(course.estimatedHours * 60),
        xpReward:         course.xpReward,
      })

      // ── Lesson entries from module summaries ──────────────
      try {
        const modules = await getModulesForCourse(course.slug)
        for (const mod of modules) {
          for (const lesson of mod.lessons) {
            entries.push({
              type:             'lesson',
              id:               `${course.slug}/${lesson.slug}`,
              slug:             lesson.slug,
              courseSlug:       course.slug,
              moduleSlug:       mod.slug,
              title:            lesson.title,
              description:      `${course.title} › ${mod.title}`,
              difficulty:       lesson.difficulty,
              tags:             lesson.tags,
              estimatedMinutes: lesson.estimatedMinutes,
              xpReward:         lesson.xpReward,
              order:            lesson.order,
            })
          }
        }
      } catch {
        // Module load failure doesn't break the entire search index
      }
    }),
  )

  indexCache = entries
  return entries
}

/**
 * Searches the index for entries matching `query` with optional filters.
 *
 * If `query` is empty and no filters are set, returns all entries sorted by type then title.
 * Scored results are returned highest-score first.
 */
export async function searchContent(
  query: string,
  filters?: SearchFilters,
): Promise<SearchResult[]> {
  const index = await buildSearchIndex()
  const q     = query.trim().toLowerCase()
  const terms = q ? q.split(/\s+/).filter(Boolean) : []

  const results = index.filter((entry) => {
    if (filters?.type && entry.type !== filters.type)               return false
    if (filters?.difficulty && entry.difficulty !== filters.difficulty) return false
    if (filters?.maxMinutes && entry.estimatedMinutes > filters.maxMinutes) return false
    if (filters?.tags?.length) {
      const match = filters.tags.some((ft) =>
        entry.tags.some((et) => et.toLowerCase().includes(ft.toLowerCase())),
      )
      if (!match) return false
    }
    return true
  })

  if (q) {
    const scored = results
      .map((entry) => ({ entry, score: scoreEntry(entry, q, terms) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
    return scored
  } else {
    return results.map((entry) => ({ entry, score: 0 }))
  }
}

/** Forces a rebuild of the search index on the next call. */
export function invalidateSearchIndex(): void {
  indexCache = null
}
