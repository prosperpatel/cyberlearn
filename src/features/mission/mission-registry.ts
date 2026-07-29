import type { MissionConfig } from './types'
import type { MissionId } from '@/engine/types'
import { mission01Config } from '../mission-01-first-contact/config'

/** Central registry for all mission configs. */
export const MISSION_REGISTRY = new Map<MissionId, MissionConfig>([
  ['mission-01', mission01Config],
])

export function getMissionConfig(id: MissionId): MissionConfig | undefined {
  return MISSION_REGISTRY.get(id)
}
