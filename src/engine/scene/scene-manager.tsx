import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { AnimatePresence } from 'framer-motion'
import { engineBus } from '../event-bus/event-bus'
import { SceneTransition } from './scene-transition'
import type { SceneDefinition, SceneManagerState, SceneProps } from './types'
import type { SceneId } from '../types'

const TRANSITION_DURATION_MS = 300

// ── Context ───────────────────────────────────────────────────────────

interface SceneManagerContextValue {
  /** Current runtime state. */
  state: SceneManagerState
  /**
   * Navigate to a registered scene.
   * The transition animates out the current scene and animates in the next.
   */
  navigate: (to: SceneId) => void
  /**
   * Look up a scene by ID.
   * Returns undefined if the scene is not registered.
   */
  getScene: (id: SceneId) => SceneDefinition | undefined
}

const SceneManagerContext = createContext<SceneManagerContextValue | null>(null)

// ── Provider ──────────────────────────────────────────────────────────

interface SceneManagerProviderProps {
  /** All scene definitions for the current mission. */
  scenes: SceneDefinition[]
  /** The scene that is active on first render. */
  initialSceneId: SceneId
  children?: ReactNode
}

export function SceneManagerProvider({
  scenes,
  initialSceneId,
  children,
}: SceneManagerProviderProps) {
  // Build a lookup map from the scenes array
  const registry = useMemo<Map<SceneId, SceneDefinition>>(() => {
    const map = new Map<SceneId, SceneDefinition>()
    scenes.forEach((s) => map.set(s.id, s))
    return map
  }, [scenes])

  const [state, setState] = useState<SceneManagerState>({
    currentSceneId:  initialSceneId,
    previousSceneId: null,
    isTransitioning: false,
    history:         [initialSceneId],
  })

  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const navigate = useCallback((to: SceneId): void => {
    if (!registry.has(to)) {
      console.warn(`[SceneManager] Attempted to navigate to unregistered scene: "${to}"`)
      return
    }

    setState((prev) => {
      if (prev.currentSceneId === to || prev.isTransitioning) return prev

      engineBus.emit('scene:exit',               { sceneId: prev.currentSceneId ?? '' })
      engineBus.emit('scene:transition:start',   { from: prev.currentSceneId, to })

      return {
        ...prev,
        previousSceneId: prev.currentSceneId,
        currentSceneId:  to,
        isTransitioning: true,
        history:         [...prev.history, to],
      }
    })

    // Clear the previous transition timer if a rapid navigation occurs
    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current)

    transitionTimerRef.current = setTimeout(() => {
      setState((prev) => {
        if (!prev.isTransitioning) return prev
        engineBus.emit('scene:enter',               { sceneId: prev.currentSceneId ?? '' })
        engineBus.emit('scene:transition:complete', {
          from: prev.previousSceneId,
          to:   prev.currentSceneId ?? '',
        })
        return { ...prev, isTransitioning: false }
      })
    }, TRANSITION_DURATION_MS)
  }, [registry])

  const getScene = useCallback((id: SceneId) => registry.get(id), [registry])

  const value = useMemo<SceneManagerContextValue>(
    () => ({ state, navigate, getScene }),
    [state, navigate, getScene],
  )

  // Build the scene props that every scene component receives
  const buildSceneProps = useCallback((def: SceneDefinition): SceneProps => ({
    onComplete: () => {
      if (def.nextSceneId) navigate(def.nextSceneId)
    },
    onNavigate: navigate,
  }), [navigate])

  const currentDef = state.currentSceneId
    ? registry.get(state.currentSceneId)
    : undefined

  return (
    <SceneManagerContext.Provider value={value}>
      <AnimatePresence mode="wait">
        {currentDef && (
          <SceneTransition key={currentDef.id}>
            <currentDef.component {...buildSceneProps(currentDef)} />
          </SceneTransition>
        )}
      </AnimatePresence>
      {/* Children slot — for HUD, overlays, etc. rendered outside the scene */}
      {children}
    </SceneManagerContext.Provider>
  )
}

// ── Hook ──────────────────────────────────────────────────────────────

/** Access the scene manager from any component inside <SceneManagerProvider>. */
export function useSceneManager(): SceneManagerContextValue {
  const ctx = useContext(SceneManagerContext)
  if (!ctx) throw new Error('useSceneManager must be used inside <SceneManagerProvider>')
  return ctx
}
