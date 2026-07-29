import { engineBus } from '../event-bus/event-bus'
import type { AssetId } from '../types'
import type {
  AssetDefinition,
  AssetEntry,
  AssetLoadProgress,
  AssetStatus,
} from './types'

/**
 * Manages the lifecycle of non-audio assets: images and JSON data files.
 *
 * Audio assets are owned by AudioManager (Howler handles their loading).
 *
 * Usage:
 *   assetManager.register(defs)
 *   await assetManager.preload(['hero-bg', 'cia-icon'], onProgress)
 *   const img = assetManager.get('hero-bg')?.data as HTMLImageElement
 */
export class AssetManager {
  private readonly entries = new Map<AssetId, AssetEntry>()

  // ── Registration ──────────────────────────────────────────────────

  /** Register a single asset definition. Idempotent. */
  register(def: AssetDefinition): void {
    if (this.entries.has(def.id)) return
    this.entries.set(def.id, { definition: def, status: 'pending', data: null })
  }

  /** Register multiple asset definitions at once. */
  registerAll(defs: AssetDefinition[]): void {
    defs.forEach((d) => this.register(d))
  }

  // ── Loading ───────────────────────────────────────────────────────

  /**
   * Preload the specified asset IDs (or all registered assets if omitted).
   * Already-loaded assets are skipped. Resolves when all complete.
   *
   * @param ids       Asset IDs to load. Loads all registered if omitted.
   * @param onProgress Called with each progress update (0–1 ratio).
   */
  async preload(
    ids?: AssetId[],
    onProgress?: (progress: AssetLoadProgress) => void,
  ): Promise<void> {
    const targets = ids
      ? ids.filter((id) => {
          const e = this.entries.get(id)
          return e !== undefined && e.status !== 'loaded'
        })
      : [...this.entries.values()]
          .filter((e) => e.status !== 'loaded')
          .map((e) => e.definition.id)

    const total = targets.length
    if (total === 0) {
      onProgress?.({ loaded: 0, total: 0, ratio: 1 })
      return
    }

    let loaded = 0

    const report = (): void => {
      loaded++
      const ratio = loaded / total
      onProgress?.({ loaded, total, ratio })
    }

    await Promise.all(
      targets.map(async (id) => {
        try {
          await this.loadOne(id)
        } catch {
          // Errors are stored on the entry; we don't reject the whole batch
        } finally {
          report()
        }
      }),
    )

    engineBus.emit('asset:all-loaded', { total })
  }

  // ── Access ────────────────────────────────────────────────────────

  /** Retrieve a loaded entry. Returns undefined if unknown or not loaded. */
  get(id: AssetId): AssetEntry | undefined {
    return this.entries.get(id)
  }

  isLoaded(id: AssetId): boolean {
    return this.entries.get(id)?.status === 'loaded'
  }

  getStatus(id: AssetId): AssetStatus | undefined {
    return this.entries.get(id)?.status
  }

  /** Count of entries by status — used by the debug overlay. */
  stats(): { total: number; loaded: number; pending: number; error: number } {
    let loaded = 0, pending = 0, error = 0
    this.entries.forEach((e) => {
      if (e.status === 'loaded')  loaded++
      else if (e.status === 'error') error++
      else pending++
    })
    return { total: this.entries.size, loaded, pending, error }
  }

  // ── Private ───────────────────────────────────────────────────────

  private async loadOne(id: AssetId): Promise<void> {
    const entry = this.entries.get(id)
    if (!entry || entry.status === 'loaded') return

    this.setStatus(id, 'loading')
    engineBus.emit('asset:load:start', { assetId: id })

    try {
      const { type, src } = entry.definition

      if (type === 'image') {
        const img = await this.loadImage(src)
        entry.data = img
      } else if (type === 'json') {
        const res = await fetch(src)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        entry.data = (await res.json()) as object
      } else {
        // font — trigger load via FontFace API if supported
        if ('FontFace' in window) {
          const ff = new FontFace(id, `url(${src})`)
          await ff.load()
          document.fonts.add(ff)
          entry.data = null
        }
      }

      this.setStatus(id, 'loaded')
      engineBus.emit('asset:load:complete', { assetId: id })
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      entry.error = message
      this.setStatus(id, 'error')
      engineBus.emit('asset:load:error', { assetId: id, error: message })
      throw err
    }
  }

  private loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload  = () => resolve(img)
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
      img.src = src
    })
  }

  private setStatus(id: AssetId, status: AssetStatus): void {
    const entry = this.entries.get(id)
    if (entry) entry.status = status
  }
}

/** Application-wide singleton. */
export const assetManager = new AssetManager()
