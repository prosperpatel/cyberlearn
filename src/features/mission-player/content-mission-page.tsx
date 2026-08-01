import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMissionBySlug, getBlocksForMission } from '@/lib/content'
import { ContentNotFoundError } from '@/lib/content'
import { MissionOverview } from './components/mission-overview'
import { BlockRenderer } from './components/block-renderer'
import { PageLoader } from '@/components/shared/loading-states'
import type { CourseMissionMeta } from '@/lib/content'
import type { StandardBlock } from '@/types/mission-engine'
import { ROUTES } from '@/lib/constants'

type LoadState =
  | { phase: 'loading' }
  | { phase: 'loaded'; mission: CourseMissionMeta; blocks: StandardBlock[] }
  | { phase: 'not-found' }
  | { phase: 'error'; message: string }

interface ContentMissionPageProps {
  missionSlug: string
}

export function ContentMissionPage({ missionSlug }: ContentMissionPageProps) {
  const [state, setState] = useState<LoadState>({ phase: 'loading' })
  const cancelRef = useRef(false)

  useEffect(() => {
    cancelRef.current = false

    getMissionBySlug(missionSlug)
      .then(async (mission) => {
        if (cancelRef.current) return
        if (!mission) {
          setState({ phase: 'not-found' })
          return
        }
        const blocks = await getBlocksForMission(mission.courseSlug, mission.moduleSlug, mission.slug)
        if (cancelRef.current) return
        setState({ phase: 'loaded', mission, blocks })
      })
      .catch((err: unknown) => {
        if (cancelRef.current) return
        if (err instanceof ContentNotFoundError) {
          setState({ phase: 'not-found' })
        } else {
          setState({
            phase: 'error',
            message: err instanceof Error ? err.message : 'Failed to load mission',
          })
        }
      })

    return () => { cancelRef.current = true }
  }, [missionSlug])

  if (state.phase === 'loading') return <PageLoader />

  if (state.phase === 'not-found') {
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
        <div style={{ fontSize: 12, color: 'rgba(255,71,87,0.6)' }}>ID: {missionSlug}</div>
        <a href={ROUTES.COURSES} style={{ marginTop: 16, color: '#00D9FF', fontSize: 12, textDecoration: 'none' }}>
          ← Return to courses
        </a>
      </div>
    )
  }

  if (state.phase === 'error') {
    return (
      <div
        style={{
          position: 'fixed', inset: 0, background: '#08080F',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          fontFamily: '"Courier New", monospace', color: '#FF4757', gap: 12,
        }}
      >
        <div style={{ fontSize: 20 }}>MISSION LOAD ERROR</div>
        <div style={{ fontSize: 12, color: 'rgba(255,71,87,0.6)', maxWidth: 480, textAlign: 'center' }}>
          {state.message}
        </div>
        <a href={ROUTES.COURSES} style={{ marginTop: 16, color: '#00D9FF', fontSize: 12, textDecoration: 'none' }}>
          ← Return to courses
        </a>
      </div>
    )
  }

  const { mission, blocks } = state

  return (
    <div className="min-h-full bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 pb-24">
        <nav className="mb-6">
          <Link
            to={ROUTES.COURSES}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Courses
          </Link>
        </nav>

        <MissionOverview mission={mission} />

        <div className="space-y-4 mt-6">
          {blocks.map((block) => (
            <BlockRenderer key={block.id} block={block} />
          ))}
        </div>
      </div>
    </div>
  )
}
