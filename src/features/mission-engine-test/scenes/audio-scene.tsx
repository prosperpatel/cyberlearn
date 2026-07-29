import { useCallback, useEffect, useState } from 'react'
import { useAudio }         from '@/engine/audio'
import { useAccessibility } from '@/engine/accessibility'
import { useProgressStore } from '@/engine/save'
import type { SceneProps }  from '@/engine/scene'
import { S, Row, NavButton } from './shared'

function TrackRow({ id, audio }: { id: string; audio: ReturnType<typeof useAudio> }) {
  const status  = audio.getStatus(id) ?? 'not registered'
  const playing = audio.isPlaying(id)
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
      <span style={{ fontFamily: '"Courier New", monospace', fontSize: 11, color: 'rgba(0,217,255,0.5)', width: 90 }}>
        {id}
      </span>
      <span style={{ fontSize: 11, color: playing ? '#00FF87' : status === 'error' ? '#FF4757' : '#00D9FF', width: 80 }}>
        {status}
      </span>
      <button
        onClick={() => { try { audio.play(id) } catch { /* no-op */ } }}
        style={MINI_BTN}
      >▶</button>
      <button
        onClick={() => { try { audio.stop(id) } catch { /* no-op */ } }}
        style={MINI_BTN}
      >■</button>
    </div>
  )
}

const MINI_BTN: React.CSSProperties = {
  background:  'transparent',
  border:      '1px solid rgba(0,217,255,0.3)',
  color:       '#00D9FF',
  fontFamily:  '"Courier New", monospace',
  fontSize:    11,
  padding:     '2px 8px',
  cursor:      'pointer',
}

export function AudioScene({ onComplete }: SceneProps) {
  const audio        = useAudio()
  const accessibility = useAccessibility()
  const progress     = useProgressStore()

  const [masterVol,  setMasterVol]  = useState(audio.masterVolume)
  const [musicVol,   setMusicVol]   = useState(audio.channelVolumes.music)
  const [, forceRender] = useState(0)

  // Re-render every 500ms to show live status changes
  useEffect(() => {
    const t = setInterval(() => forceRender((n) => n + 1), 500)
    return () => clearInterval(t)
  }, [])

  const handleMasterVol = useCallback((v: number) => {
    setMasterVol(v)
    audio.setMasterVolume(v)
  }, [audio])

  const handleMusicVol = useCallback((v: number) => {
    setMusicVol(v)
    audio.setChannelVolume('music', v)
  }, [audio])

  const handleNext = useCallback(() => {
    // Stop all tracks before leaving
    try { audio.stop('et-music') }   catch { /* no-op */ }
    try { audio.stop('et-ambient') } catch { /* no-op */ }
    try { audio.stop('et-sfx') }     catch { /* no-op */ }
    progress.setCheckpoint('engine-test', 'audio-pass', true)
    onComplete()
  }, [audio, progress, onComplete])

  const masterPct = Math.round(masterVol * 100)
  const musicPct  = Math.round(musicVol * 100)

  return (
    <div style={S.scene}>
      <div style={S.panel}>
        <div style={S.sceneTag}>3 / 5 · AUDIO</div>
        <div style={S.title}>AUDIO MANAGER</div>

        {/* Track status */}
        <div style={S.section}>TRACK STATUS</div>
        <TrackRow id="et-music"   audio={audio} />
        <TrackRow id="et-ambient" audio={audio} />
        <TrackRow id="et-sfx"     audio={audio} />

        <div style={{ height: 1, background: 'rgba(0,217,255,0.1)', margin: '12px 0' }} />

        {/* Volume controls */}
        <div style={S.section}>VOLUME</div>
        <Row label={`Master ${masterPct}%`} value="" pass>
          <input
            type="range" min={0} max={1} step={0.05}
            value={masterVol}
            onChange={(e) => handleMasterVol(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#00D9FF' }}
          />
        </Row>
        <Row label={`Music  ${musicPct}%`} value="" pass>
          <input
            type="range" min={0} max={1} step={0.05}
            value={musicVol}
            onChange={(e) => handleMusicVol(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#7B5EA7' }}
          />
        </Row>

        <div style={{ height: 1, background: 'rgba(0,217,255,0.1)', margin: '12px 0' }} />

        {/* Accessibility */}
        <div style={S.section}>ACCESSIBILITY</div>
        <Row
          label="Reduced Motion"
          value={String(accessibility.reducedMotion)}
          pass={accessibility.reducedMotion !== null}
        />
        <Row label="Font Scale" value={`${accessibility.fontScale}×`} pass />
        <Row label="High Contrast" value={String(accessibility.highContrast)} pass />

        <NavButton onClick={handleNext} style={{ marginTop: 16 }}>NEXT → TRANSITION TEST</NavButton>
      </div>
    </div>
  )
}
