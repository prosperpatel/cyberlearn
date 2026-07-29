import { useParams } from 'react-router-dom'
import { MissionShell }      from './mission-shell'
import { getMissionConfig }  from './mission-registry'

/**
 * Route component at `/missions/:missionId`.
 *
 * Resolves the missionId param to a registered MissionConfig and
 * hands off to MissionShell. Shows a minimal error if the ID is unknown.
 */
export function MissionPage() {
  const { missionId } = useParams<{ missionId: string }>()
  const config = missionId ? getMissionConfig(missionId) : undefined

  if (!config) {
    return (
      <div
        style={{
          position:       'fixed',
          inset:          0,
          background:     '#08080F',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          justifyContent: 'center',
          fontFamily:     '"Courier New", monospace',
          color:          '#FF4757',
          gap:            12,
        }}
      >
        <div style={{ fontSize: 20 }}>MISSION NOT FOUND</div>
        <div style={{ fontSize: 12, color: 'rgba(255,71,87,0.6)' }}>
          ID: {missionId ?? '(none)'}
        </div>
        <a
          href="/courses"
          style={{
            marginTop:  16,
            color:      '#00D9FF',
            fontSize:   12,
            textDecoration: 'none',
          }}
        >
          ← Return to courses
        </a>
      </div>
    )
  }

  return <MissionShell config={config} />
}
