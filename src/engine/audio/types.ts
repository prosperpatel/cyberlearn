import type { TrackId } from '../types'

/** Channel a track belongs to — controls which volume knob it obeys. */
export type AudioChannel = 'music' | 'ambient' | 'sfx'

/** Current playback state of a registered track. */
export type TrackStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'stopped' | 'error'

/** Declarative definition of an audio track registered with the AudioManager. */
export interface AudioTrackDef {
  id: TrackId
  src: string | string[]   // Howler accepts multiple src for codec fallback
  channel: AudioChannel
  /** Loop the track indefinitely (default false). */
  loop?: boolean
  /** Volume for this specific track, 0–1 (default 1). Multiplied by channel + master volumes. */
  volume?: number
  /** HTML5 audio fallback — useful for long ambient files to avoid memory use. */
  html5?: boolean
}

/** Per-channel volume levels stored at runtime. */
export interface ChannelVolumes {
  music:   number
  ambient: number
  sfx:     number
}

export const DEFAULT_CHANNEL_VOLUMES: ChannelVolumes = {
  music:   0.70,
  ambient: 0.60,
  sfx:     1.00,
}

export const DEFAULT_MASTER_VOLUME = 0.85
