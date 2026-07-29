import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from 'react'
import { assetManager } from './asset-manager'
import type { AssetDefinition, AssetEntry, AssetLoadProgress } from './types'
import type { AssetId } from '../types'

// ── Context ───────────────────────────────────────────────────────────

interface AssetContextValue {
  /** Register asset definitions without loading them. */
  register: (defs: AssetDefinition[]) => void
  /**
   * Load a set of assets by ID (or all registered if omitted).
   * Resolves when every asset has either loaded or errored.
   */
  preload: (ids?: AssetId[], onProgress?: (p: AssetLoadProgress) => void) => Promise<void>
  /** Retrieve a loaded asset entry. */
  get:       (id: AssetId) => AssetEntry | undefined
  isLoaded:  (id: AssetId) => boolean
  /** Aggregate stats useful for loading screens. */
  stats:     () => { total: number; loaded: number; pending: number; error: number }
}

const AssetContext = createContext<AssetContextValue | null>(null)

// ── Provider ──────────────────────────────────────────────────────────

export function AssetProvider({ children }: { children: ReactNode }) {
  const register = useCallback((defs: AssetDefinition[]) => {
    assetManager.registerAll(defs)
  }, [])

  const preload = useCallback(
    (ids?: AssetId[], onProgress?: (p: AssetLoadProgress) => void) =>
      assetManager.preload(ids, onProgress),
    [],
  )

  const get      = useCallback((id: AssetId) => assetManager.get(id),      [])
  const isLoaded = useCallback((id: AssetId) => assetManager.isLoaded(id), [])
  const stats    = useCallback(() => assetManager.stats(),                   [])

  const value = useMemo<AssetContextValue>(
    () => ({ register, preload, get, isLoaded, stats }),
    [register, preload, get, isLoaded, stats],
  )

  return <AssetContext.Provider value={value}>{children}</AssetContext.Provider>
}

// ── Hook ──────────────────────────────────────────────────────────────

/** Access the asset subsystem from any component inside <AssetProvider>. */
export function useAssets(): AssetContextValue {
  const ctx = useContext(AssetContext)
  if (!ctx) throw new Error('useAssets must be used inside <AssetProvider>')
  return ctx
}
