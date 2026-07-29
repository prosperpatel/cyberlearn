import type { AssetId } from '../types'

/** The kind of resource being managed. */
export type AssetType = 'image' | 'json' | 'font'

/** Declarative definition registered with the AssetManager. */
export interface AssetDefinition {
  id: AssetId
  type: AssetType
  /** URL or public path to the resource. */
  src: string
}

/** Possible loading states for a single asset. */
export type AssetStatus = 'pending' | 'loading' | 'loaded' | 'error'

/** An asset entry after the manager has processed it. */
export interface AssetEntry {
  definition: AssetDefinition
  status: AssetStatus
  /** Populated on success. For images: an HTMLImageElement. For JSON: parsed object. */
  data: HTMLImageElement | object | null
  error?: string
}

/** Progress snapshot emitted during bulk preloads. */
export interface AssetLoadProgress {
  loaded: number
  total:  number
  /** 0–1 fraction. */
  ratio:  number
}
