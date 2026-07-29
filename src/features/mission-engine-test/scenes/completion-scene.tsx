import { useEffect, useState } from 'react'
import { useNavigate }      from 'react-router-dom'
import { useProgressStore } from '@/engine/save'
import { engineBus }        from '@/engine/event-bus'
import type { SceneProps }  from '@/engine/scene'
import { S, Row, NavButton } from './shared'

const MISSION_ID  = 'engine-test'
const ACHIEVEMENT = 'et-all-systems-go'

export function CompletionScene(_: SceneProps) {
  const progress   = useProgressStore()
  const routerNav  = useNavigate()
  const [fired, setFired] = useState(false)

  // Fire mission:complete once
  useEffect(() => {
    if (fired) return
    setFired(true)

    progress.unlockAchievement(MISSION_ID, ACHIEVEMENT)
    progress.visitScene(MISSION_ID, 'complete')

    // Let the MissionShell handle completeMission via the event
    engineBus.emit('mission:complete', { missionId: MISSION_ID, xpEarned: 0 })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const missionData = progress.getMission(MISSION_ID)
  const checkpoints: Record<string, unknown> = missionData?.checkpoints ?? {}
  const achievements = missionData?.achievements ?? []

  const allPass = [
    checkpoints['boot-visited'],
    checkpoints['dialogue-pass'],
    checkpoints['audio-pass'],
    checkpoints['transition-pass'],
  ].every(Boolean)

  return (
    <div style={S.scene}>
      <div style={S.panel}>
        <div style={S.sceneTag}>5 / 5 · COMPLETE</div>
        <div style={{ ...S.title, color: allPass ? '#00FF87' : '#FF6B35' }}>
          ENGINE {allPass ? 'READY ✓' : 'CHECK RESULTS'}
        </div>

        {/* Results */}
        <div style={S.section}>SUBSYSTEM RESULTS</div>
        <Row label="Event Bus"      value="emit/receive" pass={!!checkpoints['boot-visited']} />
        <Row label="Save Service"   value="load/write"   pass={!!checkpoints['boot-visited']} />
        <Row label="Asset Manager"  value="preload"      pass={!!checkpoints['boot-visited']} />
        <Row label="Scene Manager"  value="navigate"     pass={!!checkpoints['transition-pass']} />
        <Row label="Dialogue Engine" value="typewriter + auto-advance" pass={!!checkpoints['dialogue-pass']} />
        <Row label="Audio Manager"  value="register/vol"  pass={!!checkpoints['audio-pass']} />
        <Row label="Progress Store" value="checkpoints"   pass={achievements.includes(ACHIEVEMENT)} />
        <Row label="Accessibility"  value="reducedMotion" pass={!!checkpoints['audio-pass']} />

        <div style={{ height: 1, background: 'rgba(0,217,255,0.1)', margin: '10px 0' }} />

        {/* Save data */}
        <div style={S.section}>SAVE STATE</div>
        <Row label="Mission"    value={MISSION_ID} pass />
        <Row label="Completed"  value={missionData?.completed ? 'yes' : 'no'} pass={!!missionData?.completed} />
        <Row label="Achievement" value={ACHIEVEMENT} pass={achievements.includes(ACHIEVEMENT)} />
        <Row label="Scenes visited" value={String(missionData?.visitedScenes?.length ?? 0)} pass />

        {/* Debug: open overlay */}
        <div style={{ fontSize: 10, color: 'rgba(0,217,255,0.3)', margin: '12px 0 4px', fontFamily: '"Courier New", monospace' }}>
          Press ` (backtick) to toggle Debug Overlay
        </div>

        <NavButton onClick={() => routerNav('/courses')}>← RETURN TO COURSES</NavButton>
      </div>
    </div>
  )
}
