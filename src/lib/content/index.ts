/**
 * Content Engine — public API
 *
 * Import from here, not from individual files.
 * This boundary lets us change internals without breaking callers.
 */

// Loaders — the main interface for UI components
export {
  loadCourse,
  loadModule,
  loadLesson,
  loadModulesForCourse,
  getAllCourses,
  ContentValidationError,
  ContentNotFoundError,
} from './loader'

// Registry utilities — for advanced use (sitemaps, pre-warming, etc.)
export {
  getAvailableLessonKeys,
  invalidateRegistry,
  getMissionBySlug,
  getBlocksForMission,
} from './registry'

export type { CourseMissionMeta } from './mission-schemas'

// Search — used by the search page / command palette
export {
  buildSearchIndex,
  searchContent,
  invalidateSearchIndex,
} from './search'

// Types — re-exported for consumers who need to type-check content data
export type {
  ContentCourse,
  ContentModule,
  ContentLesson,
  LessonSummary,
  ModuleSummary,
} from './schemas'

export type { SearchEntry, SearchResult, SearchFilters } from './search'
