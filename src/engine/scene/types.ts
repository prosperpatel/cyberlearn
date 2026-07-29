import type { ComponentType } from 'react'
import type { SceneId } from '../types'

/**
 * Props injected into every scene component by the SceneManager.
 *
 * A scene component must accept these props. It uses engine hooks
 * internally for everything else (audio, dialogue, save, assets, etc.).
 */
export interface SceneProps {
  /**
   * Signal to the SceneManager that this scene has finished.
   * The SceneManager will navigate to the `nextSceneId` defined in the
   * scene's registration, or do nothing if none is defined.
   */
  onComplete: () => void

  /**
   * Navigate to an arbitrary registered scene by ID.
   * Use this for branching (e.g., quiz answer → different next scene).
   */
  onNavigate: (sceneId: SceneId) => void
}

/** A scene registration — what the developer provides to the SceneManager. */
export interface SceneDefinition {
  /** Unique identifier within this mission. */
  id: SceneId
  /** The React component to render when this scene is active. */
  component: ComponentType<SceneProps>
  /**
   * ID of the scene to navigate to when `onComplete()` is called.
   * If omitted, `onComplete()` becomes a no-op (useful for the final scene).
   */
  nextSceneId?: SceneId
  /**
   * Human-readable label — used only by the debug overlay.
   * Defaults to the scene ID if not provided.
   */
  label?: string
}

/** Runtime state of the SceneManager. */
export interface SceneManagerState {
  currentSceneId:  SceneId | null
  previousSceneId: SceneId | null
  /** True while a transition animation is in progress. */
  isTransitioning: boolean
  /** Ordered history of visited scene IDs (most recent last). */
  history:         SceneId[]
}
