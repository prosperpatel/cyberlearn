import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react'
import { audioManager } from './audio-manager'
import { useProgressStore } from '../save/progress-store'
import type { AudioChannel, AudioTrackDef, ChannelVolumes, TrackStatus } from './types'
import type { TrackId } from '../types'

// ── Context ───────────────────────────────────────────────────────────

interface AudioContextValue {
  /** Register track definitions (idempotent — safe to call on every render). */
  register: (defs: AudioTrackDef[]) => void
  play:      (trackId: TrackId) => void
  stop:      (trackId: TrackId) => void
  pause:     (trackId: TrackId) => void
  resume:    (trackId: TrackId) => void
  fadeIn:    (trackId: TrackId, durationMs: number) => void
  fadeOut:   (trackId: TrackId, durationMs: number) => void
  fade:      (trackId: TrackId, from: number, to: number, durationMs: number) => void
  setMasterVolume:  (volume: number) => void
  setChannelVolume: (channel: AudioChannel, volume: number) => void
  getStatus:  (trackId: TrackId) => TrackStatus | undefined
  isPlaying:  (trackId: TrackId) => boolean
  masterVolume:   number
  channelVolumes: Readonly<ChannelVolumes>
  /**
   * Resume the Web Audio context from a user-gesture handler.
   * Must be called during the tap/click that starts a mission so the
   * AudioContext is unlocked before any tracks attempt to play.
   */
  unlock: () => void
}

const AudioContext = createContext<AudioContextValue | null>(null)

// ── Provider ──────────────────────────────────────────────────────────

export function AudioProvider({ children }: { children: ReactNode }) {
  const savedSettings    = useProgressStore((s) => s.save.settings)
  const setMasterVolumeStore  = useProgressStore((s) => s.setMasterVolume)
  const setChannelVolumesStore = useProgressStore((s) => s.setChannelVolumes)

  // Initialise AudioManager volumes from saved settings on mount
  useEffect(() => {
    audioManager.setMasterVolume(savedSettings.masterVolume)
    const cv = savedSettings.channelVolumes
    audioManager.setChannelVolume('music',   cv.music)
    audioManager.setChannelVolume('ambient', cv.ambient)
    audioManager.setChannelVolume('sfx',     cv.sfx)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // intentionally only on mount

  const register = useCallback((defs: AudioTrackDef[]) => {
    audioManager.registerAll(defs)
  }, [])

  const play    = useCallback((id: TrackId) => audioManager.play(id),   [])
  const stop    = useCallback((id: TrackId) => audioManager.stop(id),   [])
  const pause   = useCallback((id: TrackId) => audioManager.pause(id),  [])
  const resume  = useCallback((id: TrackId) => audioManager.resume(id), [])

  const fadeIn  = useCallback(
    (id: TrackId, ms: number) => audioManager.fadeIn(id, ms), []
  )
  const fadeOut = useCallback(
    (id: TrackId, ms: number) => audioManager.fadeOut(id, ms), []
  )
  const fade    = useCallback(
    (id: TrackId, from: number, to: number, ms: number) =>
      audioManager.fade(id, from, to, ms),
    [],
  )

  const setMasterVolume = useCallback((volume: number) => {
    audioManager.setMasterVolume(volume)
    setMasterVolumeStore(volume)
  }, [setMasterVolumeStore])

  const setChannelVolume = useCallback((channel: AudioChannel, volume: number) => {
    audioManager.setChannelVolume(channel, volume)
    setChannelVolumesStore({ [channel]: volume } as Partial<ChannelVolumes>)
  }, [setChannelVolumesStore])

  const getStatus = useCallback(
    (id: TrackId) => audioManager.getStatus(id), []
  )
  const isPlaying = useCallback(
    (id: TrackId) => audioManager.isPlaying(id), []
  )
  const unlock = useCallback(() => audioManager.unlock(), [])

  const value = useMemo<AudioContextValue>(
    () => ({
      register,
      play, stop, pause, resume, fadeIn, fadeOut, fade,
      setMasterVolume, setChannelVolume,
      getStatus, isPlaying,
      unlock,
      masterVolume:   audioManager.getMasterVolume(),
      channelVolumes: audioManager.getChannelVolumes(),
    }),
    [register, play, stop, pause, resume, fadeIn, fadeOut, fade,
     setMasterVolume, setChannelVolume, getStatus, isPlaying, unlock],
  )

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
}

// ── Hook ──────────────────────────────────────────────────────────────

/** Access the audio subsystem from any component inside <AudioProvider>. */
export function useAudio(): AudioContextValue {
  const ctx = useContext(AudioContext)
  if (!ctx) throw new Error('useAudio must be used inside <AudioProvider>')
  return ctx
}
