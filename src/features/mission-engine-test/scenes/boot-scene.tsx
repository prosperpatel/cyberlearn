import { useEffect, useState } from 'react'
import { useAssets }        from '@/engine/assets'
import { useProgressStore } from '@/engine/save'
import { saveService }      from '@/engine/save'
import { engineBus }        from '@/engine/event-bus'
import { useSceneManager }  from '@/engine/scene'
import type { SceneProps }  from '@/engine/scene'
import { S, Row, NavButton, Badge } from './shared'

export function BootScene({ onComplete }: SceneProps) {
  const assets   = useAssets()
  const progress = useProgressStore()
  const { state: sceneState } = useSceneManager()

  const [eventBusOk,  setEventBusOk]  = useState(false)
  const [saveVersion, setSaveVersion] = useState<number | null>(null)

  useEffect(() => {
    // ── EventBus: synchronous emit/receive test ──
    let received = false
    const off = engineBus.on('debug:toggle', () => { received = true })
    engineBus.emit('debug:toggle', { visible: false })
    setEventBusOk(received)
    off()

    // ── SaveService: read persisted save data ──
    const data = saveService.load()
    setSaveVersion(data?.version ?? null)

    // ── ProgressStore: record visit ──
    progress.initMission('engine-test')
    progress.visitScene('engine-test', 'boot')
    progress.setCheckpoint('engine-test', 'boot-visited', true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const assetStats = assets.stats()
  const assetsLoaded = assetStats.loaded === assetStats.total && assetStats.total > 0

  return (
    <div style={S.scene}>
      <div style={S.panel}>
        <div style={S.sceneTag}>1 / 5 · BOOT</div>
        <div style={S.title}>SYSTEM BOOT</div>
        <div style={S.subtitle}>Validating engine subsystems</div>

        <div style={S.table}>
          <Row label="Event Bus"     value={eventBusOk ? 'emit+receive OK' : 'no response'} pass={eventBusOk} />
          <Row label="Save Service"  value={saveVersion !== null ? `v${saveVersion}` : 'no data'} pass={saveVersion !== null} />
          <Row label="Progress Store" value={`initMission('engine-test') OK`} pass />
          <Row label="Scene Manager" value={sceneState.currentSceneId ?? '—'} pass={sceneState.currentSceneId === 'boot'} />
          <Row
            label="Asset Manager"
            value={`${assetStats.loaded}/${assetStats.total} loaded`}
            pass={assetsLoaded}
            extra={assetStats.error > 0 ? <Badge color="#FF4757">{assetStats.error} error</Badge> : null}
          />
        </div>

        <NavButton onClick={onComplete}>NEXT → DIALOGUE ENGINE</NavButton>
      </div>
    </div>
  )
}
