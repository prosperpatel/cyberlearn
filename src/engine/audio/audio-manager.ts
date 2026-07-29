import { Howl, Howler } from 'howler'
import { engineBus } from '../event-bus/event-bus'
import {
  DEFAULT_CHANNEL_VOLUMES,
  DEFAULT_MASTER_VOLUME,
  type AudioChannel,
  type AudioTrackDef,
  type ChannelVolumes,
  type TrackStatus,
} from './types'
import type { TrackId } from '../types'

interface RegisteredTrack {
  def:    AudioTrackDef
  howl:   Howl
  status: TrackStatus
  /** The Howler sound ID returned by howl.play() — needed for per-play control. */
  soundId: number | null
}

/**
 * Singleton audio manager wrapping Howler.js.
 *
 * Architecture:
 *   master volume ──┬── music volume   ──► track volume  (product of all three)
 *                   ├── ambient volume ──► track volume
 *                   └── sfx volume    ──► track volume
 *
 * Tracks must be registered before they can be played.
 * The manager does not know about scenes — callers handle lifecycle.
 */
export class AudioManager {
  private readonly tracks = new Map<TrackId, RegisteredTrack>()
  private masterVolume: number = DEFAULT_MASTER_VOLUME
  private channelVolumes: ChannelVolumes = { ...DEFAULT_CHANNEL_VOLUMES }

  // ── Registration ──────────────────────────────────────────────────

  /** Register a track definition. Creates the Howl instance immediately for preloading. */
  register(def: AudioTrackDef): void {
    if (this.tracks.has(def.id)) return

    const howl = new Howl({
      src:   Array.isArray(def.src) ? def.src : [def.src],
      loop:  def.loop  ?? false,
      html5: def.html5 ?? false,
      volume: this.effectiveVolume(def.channel, def.volume ?? 1),
      preload: true,
    })

    this.tracks.set(def.id, { def, howl, status: 'loading', soundId: null })

    howl.once('load',  () => this.updateStatus(def.id, 'idle'))
    howl.once('loaderror', (_, err) => {
      this.updateStatus(def.id, 'error')
      console.warn(`[AudioManager] Failed to load "${def.id}":`, err)
    })
  }

  /** Register multiple tracks at once. */
  registerAll(defs: AudioTrackDef[]): void {
    defs.forEach((d) => this.register(d))
  }

  /** Unregister and unload a track. */
  unregister(trackId: TrackId): void {
    const entry = this.tracks.get(trackId)
    if (!entry) return
    entry.howl.unload()
    this.tracks.delete(trackId)
  }

  // ── Playback ──────────────────────────────────────────────────────

  /** Play a registered track. Safe to call on a track that is already playing (no-op). */
  play(trackId: TrackId): void {
    const entry = this.tracks.get(trackId)
    if (!entry) {
      console.warn(`[AudioManager] Unknown track "${trackId}"`)
      return
    }
    if (entry.status === 'playing') return

    entry.howl.volume(this.effectiveVolume(entry.def.channel, entry.def.volume ?? 1))
    entry.soundId = entry.howl.play()
    this.updateStatus(trackId, 'playing')
    engineBus.emit('audio:play', { trackId, channel: entry.def.channel })
  }

  /** Stop a playing track (rewinds to start). */
  stop(trackId: TrackId): void {
    const entry = this.tracks.get(trackId)
    if (!entry || entry.status !== 'playing') return
    entry.howl.stop()
    entry.soundId = null
    this.updateStatus(trackId, 'stopped')
    engineBus.emit('audio:stop', { trackId })
  }

  /** Pause a playing track (preserves position). */
  pause(trackId: TrackId): void {
    const entry = this.tracks.get(trackId)
    if (!entry || entry.status !== 'playing') return
    entry.howl.pause()
    this.updateStatus(trackId, 'paused')
  }

  /** Resume a paused track. */
  resume(trackId: TrackId): void {
    const entry = this.tracks.get(trackId)
    if (!entry || entry.status !== 'paused') return
    entry.howl.play()
    this.updateStatus(trackId, 'playing')
  }

  /**
   * Fade a track's volume from `from` to `to` over `durationMs`.
   * Does not change the track's stored volume — only the Howl instance.
   */
  fade(trackId: TrackId, from: number, to: number, durationMs: number): void {
    const entry = this.tracks.get(trackId)
    if (!entry) return
    entry.howl.fade(from, to, durationMs)
    if (to === 0) {
      setTimeout(() => {
        if (this.tracks.get(trackId)?.status === 'playing') {
          this.stop(trackId)
        }
      }, durationMs)
      engineBus.emit('audio:fade-out', { trackId, durationMs })
    } else {
      engineBus.emit('audio:fade-in', { trackId, durationMs })
    }
  }

  /** Fade in a stopped/idle track from 0 to its effective volume. */
  fadeIn(trackId: TrackId, durationMs: number): void {
    const entry = this.tracks.get(trackId)
    if (!entry) return
    const targetVol = this.effectiveVolume(entry.def.channel, entry.def.volume ?? 1)
    entry.howl.volume(0)
    this.play(trackId)
    entry.howl.fade(0, targetVol, durationMs)
  }

  /** Fade out a playing track to 0 and stop it. */
  fadeOut(trackId: TrackId, durationMs: number): void {
    const entry = this.tracks.get(trackId)
    if (!entry || entry.status !== 'playing') return
    const currentVol = this.effectiveVolume(entry.def.channel, entry.def.volume ?? 1)
    this.fade(trackId, currentVol, 0, durationMs)
  }

  // ── Volume ────────────────────────────────────────────────────────

  /** Set the global master volume (0–1). Immediately applies to all tracks. */
  setMasterVolume(volume: number): void {
    this.masterVolume = Math.max(0, Math.min(1, volume))
    Howler.volume(this.masterVolume)
    engineBus.emit('audio:volume:master', { volume: this.masterVolume })
    this.reapplyChannelVolumes()
  }

  /** Set the volume for a specific channel (0–1). Immediately applies to all tracks in that channel. */
  setChannelVolume(channel: AudioChannel, volume: number): void {
    this.channelVolumes[channel] = Math.max(0, Math.min(1, volume))
    engineBus.emit('audio:volume:channel', { channel, volume: this.channelVolumes[channel] })
    this.reapplyChannelVolumes()
  }

  getMasterVolume(): number { return this.masterVolume }
  getChannelVolumes(): Readonly<ChannelVolumes> { return { ...this.channelVolumes } }

  // ── Status ────────────────────────────────────────────────────────

  getStatus(trackId: TrackId): TrackStatus | undefined {
    return this.tracks.get(trackId)?.status
  }

  isPlaying(trackId: TrackId): boolean {
    return this.tracks.get(trackId)?.status === 'playing'
  }

  getRegisteredIds(): TrackId[] {
    return [...this.tracks.keys()]
  }

  /** Snapshot of all track statuses — used by the debug overlay. */
  snapshot(): Record<TrackId, TrackStatus> {
    const out: Record<TrackId, TrackStatus> = {}
    this.tracks.forEach((entry, id) => { out[id] = entry.status })
    return out
  }

  // ── Private ───────────────────────────────────────────────────────

  private effectiveVolume(channel: AudioChannel, trackVol: number): number {
    return this.masterVolume * this.channelVolumes[channel] * trackVol
  }

  private reapplyChannelVolumes(): void {
    this.tracks.forEach((entry) => {
      entry.howl.volume(this.effectiveVolume(entry.def.channel, entry.def.volume ?? 1))
    })
  }

  private updateStatus(trackId: TrackId, status: TrackStatus): void {
    const entry = this.tracks.get(trackId)
    if (entry) entry.status = status
  }
}

/** Application-wide singleton. Import this in any module needing audio. */
export const audioManager = new AudioManager()
