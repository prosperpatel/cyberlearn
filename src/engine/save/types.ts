import type { MissionId, SceneId } from '../types'
import type { AccessibilitySettings } from '../accessibility/types'
import type { ChannelVolumes } from '../audio/types'

/** The current schema version. Increment when the shape changes. */
export const SAVE_VERSION = 1

/** Persisted state for a single mission. */
export interface MissionSaveData {
  missionId:      MissionId
  startedAt:      number
  lastActiveAt:   number
  completedAt:    number | null
  /** Scenes the learner has visited at least once. */
  visitedScenes:  SceneId[]
  /** Arbitrary key/value checkpoints set by scene logic. */
  checkpoints:    Record<string, unknown>
  /** XP earned in this mission run. */
  xpEarned:       number
  /** Achievement IDs unlocked during this mission. */
  achievements:   string[]
}

/** User-controlled settings that persist across sessions. */
export interface UserSettings {
  masterVolume:  number
  channelVolumes: ChannelVolumes
  accessibility: AccessibilitySettings
}

/** Root save data structure stored in localStorage. */
export interface SaveData {
  version:    typeof SAVE_VERSION
  createdAt:  number
  updatedAt:  number
  missions:   Record<MissionId, MissionSaveData>
  settings:   UserSettings
}
