import { useCallback, useEffect, useState } from 'react'
import { useSceneManager }  from '@/engine/scene'
import { useProgressStore } from '@/engine/save'
import { engineBus }        from '@/engine/event-bus'
import type { SceneProps }  from '@/engine/scene'
import { S, Row, NavButton } from './shared'

export function TransitionScene({ onComplete }: SceneProps) {
  const { state: sceneState } = useSceneManager()
  const progress = useProgressStore()
  const [events, setEvents]   = useState<string[]>([])

  // Load checkpoints written by previous scenes
  const bootVisited     = progress.getCheckpoint('engine-test', 'boot-visited')
  const dialoguePass    = progress.getCheckpoint('engine-test', 'dialogue-pass')
  const audioPass       = progress.getCheckpoint('engine-test', 'audio-pass')

  // Capture engine events live
  useEffect(() => {
    const push = (msg: string) =>
      setEvents((prev) => [msg, ...prev].slice(0, 6))

    const offs = [
      engineBus.on('scene:enter',             ({ sceneId })       => push(`scene:enter → ${sceneId}`)),
      engineBus.on('scene:transition:start',  ({ from, to })      => push(`transition: ${from ?? 'null'} → ${to}`)),
      engineBus.on('scene:transition:complete',({ from, to })     => push(`complete: ${from ?? 'null'} → ${to}`)),
      engineBus.on('audio:volume:master',     ({ volume })        => push(`master vol: ${volume.toFixed(2)}`)),
    ]
    return () => offs.forEach((o) => o())
  }, [])

  // Record visit
  useEffect(() => {
    progress.visitScene('engine-test', 'transition')
    progress.setCheckpoint('engine-test', 'transition-visited', true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleNext = useCallback(() => {
    progress.setCheckpoint('engine-test', 'transition-pass', true)
    onComplete()
  }, [progress, onComplete])

  return (
    <div style={S.scene}>
      <div style={S.panel}>
        <div style={S.sceneTag}>4 / 5 · TRANSITION</div>
        <div style={S.title}>SCENE MANAGER</div>

        {/* Scene state */}
        <div style={S.section}>NAVIGATION STATE</div>
        <Row label="Current Scene"  value={sceneState.currentSceneId  ?? '—'} pass={sceneState.currentSceneId === 'transition'} />
        <Row label="Previous Scene" value={sceneState.previousSceneId ?? '—'} pass={sceneState.previousSceneId === 'audio'} />
        <Row label="History depth"  value={String(sceneState.history.length)} pass={sceneState.history.length >= 4} />

        <div style={{ height: 1, background: 'rgba(0,217,255,0.1)', margin: '10px 0' }} />

        {/* Checkpoints from previous scenes */}
        <div style={S.section}>PROGRESS STORE — CHECKPOINTS</div>
        <Row label="boot-visited"     value={String(bootVisited)}  pass={bootVisited  === true} />
        <Row label="dialogue-pass"    value={String(dialoguePass)} pass={dialoguePass === true} />
        <Row label="audio-pass"       value={String(audioPass)}    pass={audioPass    === true} />

        <div style={{ height: 1, background: 'rgba(0,217,255,0.1)', margin: '10px 0' }} />

        {/* Live event log */}
        <div style={S.section}>EVENT BUS LOG (live)</div>
        <div style={{
          background:   'rgba(0,0,0,0.4)',
          border:       '1px solid rgba(0,217,255,0.1)',
          borderRadius: 3,
          padding:      '8px 10px',
          fontSize:     10,
          fontFamily:   '"Courier New", monospace',
          color:        'rgba(0,217,255,0.6)',
          minHeight:    48,
          marginBottom: 14,
        }}>
          {events.length === 0
            ? <span style={{ color: 'rgba(0,217,255,0.3)' }}>Waiting for events…</span>
            : events.map((e, i) => <div key={i}>{e}</div>)
          }
        </div>

        <NavButton onClick={handleNext}>PROCEED TO COMPLETION</NavButton>
      </div>
    </div>
  )
}
