/**
 * Block Migration — converts old flat-format block files to StandardBlock.
 *
 * The old format mixed universal fields (id, type, order, estimatedMinutes)
 * with type-specific fields at the same level:
 *   { id, type, order, estimatedMinutes, sidebarLabel, narrative, mood }
 *
 * The new format separates universal metadata from type-specific content:
 *   { id, type, title, metadata: { order, estimatedMinutes, … }, content: { narrative, mood } }
 *
 * migrateBlock() handles both formats transparently. The registry calls it on
 * every block file so existing content continues to work without modification.
 *
 * Migration strategy:
 *   • If a block already has `metadata` and `content` fields → new format, return as-is.
 *   • Otherwise → legacy format: extract base fields, promote to metadata,
 *     place everything else in `content`.
 *
 * Field promotion from legacy to metadata:
 *   sidebarLabel   → title
 *   order          → metadata.order
 *   estimatedMinutes → metadata.estimatedMinutes
 *   isOptional     → metadata.optional
 *   xpReward       → metadata.xp  (present in mission-brief, lab, etc.)
 *   difficulty     → metadata.difficulty (present in mission-brief, lab, etc.)
 *   tags           → metadata.tags (present in mission-brief, etc.)
 */

import { MissionBlockSchema, StandardBlockSchema } from './mission-schemas'
import { BLOCK_TYPE_ICONS, BLOCK_TYPES } from '@/types/mission-engine'
import type { StandardBlock, BlockType } from '@/types/mission-engine'

// ── Fields extracted from legacy format into the standard envelope ────────────

const LEGACY_ENVELOPE_FIELDS = new Set([
  'id', 'type', 'order', 'estimatedMinutes', 'sidebarLabel', 'isOptional',
  // These appear at top-level in some old block types and promote to metadata:
  'xpReward', 'difficulty', 'tags',
])

function defaultIcon(type: string): string {
  return BLOCK_TYPE_ICONS[type as BlockType] ?? 'block'
}

function convertLegacyToStandard(raw: Record<string, unknown>): StandardBlock {
  const {
    id, type, order, estimatedMinutes, sidebarLabel, isOptional,
    xpReward, difficulty, tags,
    ...rest
  } = raw

  // Determine title: prefer sidebarLabel → fall back to type string
  const title = typeof sidebarLabel === 'string' && sidebarLabel
    ? sidebarLabel
    : typeof type === 'string'
      ? type.replace(/-/g, ' ')
      : ''

  return {
    id:    typeof id === 'string'    ? id    : String(id ?? ''),
    type:  typeof type === 'string'  ? type  : String(type ?? ''),
    title,
    metadata: {
      order:            typeof order === 'number'            ? order            : 0,
      estimatedMinutes: typeof estimatedMinutes === 'number' ? estimatedMinutes : 5,
      optional:         typeof isOptional === 'boolean'      ? isOptional       : false,
      xp:               typeof xpReward === 'number'         ? xpReward         : 0,
      difficulty:       (['beginner', 'intermediate', 'advanced', 'expert'] as const)
                          .includes(difficulty as 'beginner')
                          ? (difficulty as StandardBlock['metadata']['difficulty'])
                          : 'beginner',
      icon:             defaultIcon(String(type ?? '')),
      tags:             Array.isArray(tags) ? (tags as string[]) : [],
    },
    content: rest,
  }
}

/**
 * Converts any block file payload to StandardBlock.
 * Accepts both the new standard format and the old legacy flat format.
 * Throws ContentMigrationError if neither format can be parsed.
 */
export function migrateBlock(raw: unknown): StandardBlock {
  if (raw === null || typeof raw !== 'object') {
    throw new ContentMigrationError('Block file is not an object')
  }

  const obj = raw as Record<string, unknown>

  // New format: already has `metadata` and `content` objects
  if ('metadata' in obj && 'content' in obj) {
    const parsed = StandardBlockSchema.safeParse(obj)
    if (parsed.success) return parsed.data as StandardBlock
    // New format but invalid — fall through to try legacy migration
  }

  // Legacy format: validate then convert
  const legacy = MissionBlockSchema.safeParse(obj)
  if (legacy.success) {
    return convertLegacyToStandard(legacy.data as Record<string, unknown>)
  }

  // Neither format valid — attempt best-effort migration (tolerant mode)
  // This keeps legacy block files working even if they have minor schema gaps.
  if ('id' in obj && 'type' in obj) {
    const known = BLOCK_TYPES as readonly string[]
    if (known.includes(String(obj.type))) {
      return convertLegacyToStandard(obj)
    }
  }

  throw new ContentMigrationError(
    `Block "${obj.id ?? '?'}" (type "${obj.type ?? '?'}") does not match standard or legacy format.\n` +
    `Legacy validation errors: ${legacy.error?.issues.map(i => i.message).join(', ')}`
  )
}

// ── Migration utilities ───────────────────────────────────────────────────────

/** Returns true if the object looks like a StandardBlock (new format). */
export function isStandardBlock(raw: unknown): raw is StandardBlock {
  if (raw === null || typeof raw !== 'object') return false
  const obj = raw as Record<string, unknown>
  return 'metadata' in obj && 'content' in obj && typeof obj.type === 'string'
}

/** Returns true if the object looks like a legacy flat block. */
export function isLegacyBlock(raw: unknown): boolean {
  if (raw === null || typeof raw !== 'object') return false
  const obj = raw as Record<string, unknown>
  return (
    !('content' in obj) &&
    typeof obj.id === 'string' &&
    typeof obj.type === 'string' &&
    typeof obj.order === 'number'
  )
}

/**
 * Converts a StandardBlock back to the legacy envelope fields.
 * Used for content authoring tooling that writes back to the flat format.
 */
export function demoteToLegacy(block: StandardBlock): Record<string, unknown> {
  return {
    id:               block.id,
    type:             block.type,
    order:            block.metadata.order,
    estimatedMinutes: block.metadata.estimatedMinutes,
    sidebarLabel:     block.title,
    isOptional:       block.metadata.optional || undefined,
    ...block.content,
  }
}

/** Strips LEGACY_ENVELOPE_FIELDS from a legacy raw block to get the content-only portion. */
export function extractLegacyContent(raw: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(raw).filter(([k]) => !LEGACY_ENVELOPE_FIELDS.has(k))
  )
}

// ── Error type ────────────────────────────────────────────────────────────────

export class ContentMigrationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ContentMigrationError'
  }
}
