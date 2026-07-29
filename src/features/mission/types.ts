import type { SceneDefinition } from '@/engine/scene'
import type { AudioTrackDef }   from '@/engine/audio'
import type { AssetDefinition } from '@/engine/assets'
import type { MissionId, SceneId } from '@/engine/types'

/**
 * Static metadata for a mission — used by the Hub, curriculum engine,
 * and analytics. Not used at runtime by the engine itself.
 */
export interface MissionMetadata {
  id:           MissionId
  title:        string
  subtitle:     string
  description:  string
  /** Estimated completion time in minutes. */
  durationMin:  number
  /** Maximum XP earnable on first completion. */
  maxXp:        number
  /** Ordered prerequisite mission IDs. Player must have completed these. */
  prerequisites: MissionId[]
  /** Academy number (1–5). */
  academy:       number
  /** Course number within the academy. */
  course:        number
  /** Mission number within the course. */
  mission:       number
  /** Semantic version of this mission's content. Bump on any content change. */
  contentVersion: string
}

/**
 * Full mission configuration — everything the engine needs to run a mission.
 *
 * Mission developers provide one MissionConfig object. The MissionShell
 * reads it and wires up all engine subsystems.
 */
export interface MissionConfig {
  metadata:     MissionMetadata
  /** The scene to start on. Must match a key in `scenes`. */
  initialScene: SceneId
  /** All scene definitions for this mission. */
  scenes:       SceneDefinition[]
  /** Audio tracks to register at mission start. */
  tracks:       AudioTrackDef[]
  /** Assets to preload before showing the first scene. */
  assets:       AssetDefinition[]
}
