// ── Engine Public API ────────────────────────────────────────────────────────
// Import from this barrel in mission code. Do not import from sub-paths directly
// — the barrel enforces a stable contract between the engine and mission layers.

// Top-level types
export type { SceneId, DialogueId, AssetId, TrackId, SpeakerId, MissionId } from './types'

// Providers (mount order matters — see EngineProviders)
export { EngineProviders }                            from './providers'

// Scene system
export {
  SceneManagerProvider,
  useSceneManager,
  SceneTransition,
} from './scene'
export type { SceneDefinition, SceneProps, SceneManagerState } from './scene'

// Dialogue engine
export { DialogueProvider, useDialogue, Typewriter } from './dialogue'
export type {
  DialogueLine,
  Speaker,
  DialogueScript,
  DialogueState,
  DialogueDisplayState,
} from './dialogue'

// Audio
export { AudioProvider, useAudio, audioManager } from './audio'
export type { AudioChannel, AudioTrackDef, ChannelVolumes, TrackStatus } from './audio'

// Assets
export { AssetProvider, useAssets, assetManager } from './assets'
export type { AssetDefinition, AssetType, AssetEntry, AssetLoadProgress } from './assets'

// Save & progress
export { saveService, useProgressStore, SAVE_VERSION } from './save'
export type { SaveData, MissionSaveData, UserSettings } from './save'

// Accessibility
export { AccessibilityProvider, useAccessibility, DEFAULT_ACCESSIBILITY } from './accessibility'
export type { AccessibilitySettings } from './accessibility'

// Event bus
export { engineBus } from './event-bus'
export type { EngineEventMap } from './event-bus'

// Debug (tree-shaken in production)
export { DebugOverlay } from './debug'
