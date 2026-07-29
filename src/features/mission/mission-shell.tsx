import { useCallback, useEffect, useState } from 'react'
import { useNavigate }  from 'react-router-dom'
import { SceneManagerProvider }  from '@/engine/scene'
import { useAudio }              from '@/engine/audio'
import { useAssets }             from '@/engine/assets'
import { useProgressStore }      from '@/engine/save'
import { engineBus }             from '@/engine/event-bus'
import { ErrorBoundary }         from '@/components/shared/error-boundary'
import { LoadingScreen }         from '@/components/shared/loading-screen'
import type { AssetLoadProgress } from '@/engine/assets'
import type { MissionConfig } from './types'

interface MissionShellProps {
  config: MissionConfig
}

type LoadState = 'loading' | 'ready' | 'error'

/**
 * Full-screen mission container.
 *
 * Lifecycle:
 *  1. Register audio tracks
 *  2. Register & preload assets (shows LoadingScreen with progress)
 *  3. Init mission save slot
 *  4. Render SceneManagerProvider with the mission's scene registry
 *
 * On unmount, emits `mission:abandon` if the mission was not completed.
 */
export function MissionShell({ config }: MissionShellProps) {
  const { metadata, initialScene, scenes, tracks, assets } = config

  const audio       = useAudio()
  const assetCtx    = useAssets()
  const progress    = useProgressStore()
  const routerNav   = useNavigate()

  const [loadState, setLoadState]   = useState<LoadState>('loading')
  const [loadProgress, setProgress] = useState<AssetLoadProgress>({
    loaded: 0, total: 0, ratio: 0,
  })
  const [missionComplete, setMissionComplete] = useState(false)

  // ── 1. Register tracks & assets ───────────────────────────────────

  useEffect(() => {
    audio.register(tracks)
    assetCtx.register(assets)

    let cancelled = false

    assetCtx
      .preload(undefined, (p) => { if (!cancelled) setProgress(p) })
      .then(() => {
        if (!cancelled) setLoadState('ready')
      })
      .catch(() => {
        if (!cancelled) setLoadState('error')
      })

    return () => { cancelled = true }
    // Intentional: run once on mount; config reference stable per-mission
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── 2. Init mission save & listen for completion ───────────────────

  useEffect(() => {
    progress.initMission(metadata.id)
    engineBus.emit('mission:start', { missionId: metadata.id })

    const offComplete = engineBus.on('mission:complete', ({ missionId, xpEarned }) => {
      if (missionId !== metadata.id) return
      setMissionComplete(true)
      progress.completeMission(metadata.id, xpEarned)
    })

    return () => {
      offComplete()
      if (!missionComplete) {
        engineBus.emit('mission:abandon', { missionId: metadata.id })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metadata.id])

  const handleExitToHub = useCallback(() => {
    routerNav('/courses')
  }, [routerNav])

  // ── Render ─────────────────────────────────────────────────────────

  if (loadState === 'loading') {
    return (
      <LoadingScreen
        progress={loadProgress.ratio > 0 ? loadProgress.ratio : undefined}
        status={loadProgress.total > 0
          ? `Loading ${loadProgress.loaded} / ${loadProgress.total}`
          : 'Initialising'}
      />
    )
  }

  if (loadState === 'error') {
    return (
      <LoadingScreen status="Failed to load mission assets. Please reload." />
    )
  }

  return (
    <ErrorBoundary>
      <div
        style={{
          position:   'fixed',
          inset:      0,
          background: '#08080F',
          overflow:   'hidden',
        }}
      >
        <SceneManagerProvider scenes={scenes} initialSceneId={initialScene}>
          {/* HUD or persistent overlays can be rendered here as children */}
        </SceneManagerProvider>

        {/* Exit button — always accessible */}
        <button
          onClick={handleExitToHub}
          aria-label="Exit to course hub"
          style={{
            position:   'fixed',
            top:        12,
            left:       12,
            background: 'rgba(8,8,15,0.7)',
            border:     '1px solid rgba(0,217,255,0.25)',
            color:      'rgba(0,217,255,0.6)',
            fontFamily: '"Courier New", monospace',
            fontSize:   11,
            padding:    '4px 10px',
            cursor:     'pointer',
            zIndex:     9000,
          }}
        >
          ← EXIT
        </button>
      </div>
    </ErrorBoundary>
  )
}
