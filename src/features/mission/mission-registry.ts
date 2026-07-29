import type { MissionConfig } from './types'
import type { MissionId } from '@/engine/types'

/**
 * Central registry for all mission configs.
 *
 * Sprint 2: import each mission's config and add it here.
 *
 * @example
 *   import { mission01Config } from '../mission-01-first-contact/config'
 *   MISSION_REGISTRY.set('mission-01', mission01Config)
 */
export const MISSION_REGISTRY = new Map<MissionId, MissionConfig>()

export function getMissionConfig(id: MissionId): MissionConfig | undefined {
  return MISSION_REGISTRY.get(id)
}
