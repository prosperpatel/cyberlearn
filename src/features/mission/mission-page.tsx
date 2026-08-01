import { useParams } from 'react-router-dom'
import { MissionShell }         from './mission-shell'
import { getMissionConfig }     from './mission-registry'
import { ContentMissionPage }   from '@/features/mission-player/content-mission-page'

/**
 * Route component at `/missions/:missionId`.
 *
 * Resolution order:
 *  1. Engine registry (MISSION_REGISTRY) — cinematic scene-based missions
 *  2. Content registry (MISSION_GLOBS)   — block-based content missions
 *
 * If neither registry has the ID, ContentMissionPage renders the not-found UI.
 */
export function MissionPage() {
  const { missionId } = useParams<{ missionId: string }>()

  if (!missionId) {
    return (
      <div
        style={{
          position: 'fixed', inset: 0, background: '#08080F',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          fontFamily: '"Courier New", monospace', color: '#FF4757', gap: 12,
        }}
      >
        <div style={{ fontSize: 20 }}>MISSION NOT FOUND</div>
        <div style={{ fontSize: 12, color: 'rgba(255,71,87,0.6)' }}>No mission ID in URL</div>
        <a href="/courses" style={{ marginTop: 16, color: '#00D9FF', fontSize: 12, textDecoration: 'none' }}>
          ← Return to courses
        </a>
      </div>
    )
  }

  // Engine registry: cinematic scene-based missions (e.g. 'mission-01')
  const config = getMissionConfig(missionId)
  if (config) return <MissionShell config={config} />

  // Content registry: block-based missions (e.g. 'mission-01-what-is-ethical-hacking')
  return <ContentMissionPage missionSlug={missionId} />
}
