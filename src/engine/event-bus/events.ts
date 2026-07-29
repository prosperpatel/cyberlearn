import type { SceneId, DialogueId, AssetId, TrackId, MissionId } from '../types'
import type { DialogueLine } from '../dialogue/types'
import type { AudioChannel } from '../audio/types'
import type { AccessibilitySettings } from '../accessibility/types'

/**
 * Complete typed map of every event the engine can emit or receive.
 *
 * Key   = event name  (string literal)
 * Value = payload type (plain object — never void; use `Record<never,never>` for no data)
 *
 * Adding a new event: add it here. TypeScript enforces the payload everywhere.
 */
export type EngineEventMap = {
  // ── Scene lifecycle ──────────────────────────────────────────────
  'scene:enter':               { sceneId: SceneId }
  'scene:exit':                { sceneId: SceneId }
  'scene:transition:start':    { from: SceneId | null; to: SceneId }
  'scene:transition:complete': { from: SceneId | null; to: SceneId }

  // ── Dialogue ─────────────────────────────────────────────────────
  'dialogue:start':    { dialogueId: DialogueId }
  'dialogue:line':     { dialogueId: DialogueId; lineIndex: number; line: DialogueLine }
  'dialogue:complete': { dialogueId: DialogueId }
  'dialogue:skip':     { dialogueId: DialogueId; fromIndex: number }

  // ── Audio ────────────────────────────────────────────────────────
  'audio:play':          { trackId: TrackId; channel: AudioChannel }
  'audio:stop':          { trackId: TrackId }
  'audio:fade-in':       { trackId: TrackId; durationMs: number }
  'audio:fade-out':      { trackId: TrackId; durationMs: number }
  'audio:volume:master': { volume: number }
  'audio:volume:channel':{ channel: AudioChannel; volume: number }

  // ── Assets ───────────────────────────────────────────────────────
  'asset:load:start':    { assetId: AssetId }
  'asset:load:complete': { assetId: AssetId }
  'asset:load:error':    { assetId: AssetId; error: string }
  'asset:all-loaded':    { total: number }

  // ── Mission ──────────────────────────────────────────────────────
  'mission:start':    { missionId: MissionId }
  'mission:complete': { missionId: MissionId; xpEarned: number }
  'mission:abandon':  { missionId: MissionId }

  // ── Save ─────────────────────────────────────────────────────────
  'save:write': { slot: number }
  'save:load':  { slot: number; version: number }
  'save:reset': { slot: number }

  // ── Accessibility ────────────────────────────────────────────────
  'accessibility:change': {
    setting: keyof AccessibilitySettings
    value:   AccessibilitySettings[keyof AccessibilitySettings]
  }

  // ── Debug ────────────────────────────────────────────────────────
  'debug:toggle': { visible: boolean }
}

export type EngineEventName    = keyof EngineEventMap
export type EngineEventPayload<E extends EngineEventName> = EngineEventMap[E]
