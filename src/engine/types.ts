/**
 * Engine-wide primitive type aliases.
 *
 * All engine modules import their ID types from here so renaming is a
 * single-file change and there are no circular dependencies caused by
 * cross-module type imports.
 */

/** Opaque string that identifies a scene within a mission. */
export type SceneId = string

/** Opaque string that identifies a dialogue script. */
export type DialogueId = string

/** Opaque string that identifies a registered asset. */
export type AssetId = string

/** Opaque string that identifies an audio track. */
export type TrackId = string

/** Opaque string that identifies a dialogue speaker. */
export type SpeakerId = string

/** Opaque string that identifies a mission. */
export type MissionId = string
