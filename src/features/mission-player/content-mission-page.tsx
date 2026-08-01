import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMissionBySlug, getBlocksForMission } from '@/lib/content'
import { ContentNotFoundError } from '@/lib/content'
import { MissionOverview } from './components/mission-overview'
import { BlockPlayer } from './components/block-player'
import { PageLoader } from '@/components/shared/loading-states'
import { Button } from '@/components/ui/button'
import { getMissionStarted } from './hooks/use-mission-progress'
import type { CourseMissionMeta } from '@/lib/content'
import type { StandardBlock } from '@/types/mission-engine'
import { ROUTES } from '@/lib/constants'

// ── Load state ───────────────────────────────────────────────────────────────

type LoadState =
  | { phase: 'loading' }
  | { phase: 'loaded'; mission: CourseMissionMeta; blocks: StandardBlock[] }
  | { phase: 'not-found' }
  | { phase: 'error'; message: string }

// ── Error screens (unchanged from original) ──────────────────────────────────

function NotFound({ slug }: { slug: string }) {
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
      <div style={{ fontSize: 12, color: 'rgba(255,71,87,0.6)' }}>ID: {slug}</div>
      <a href={ROUTES.COURSES} style={{ marginTop: 16, color: '#00D9FF', fontSize: 12, textDecoration: 'none' }}>
        ← Return to courses
      </a>
    </div>
  )
}

function LoadError({ message }: { message: string }) {
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
        {message}
      </div>
      <a href={ROUTES.COURSES} style={{ marginTop: 16, color: '#00D9FF', fontSize: 12, textDecoration: 'none' }}>
        ← Return to courses
      </a>
    </div>
  )
}

// ── Mission overview screen ───────────────────────────────────────────────────

interface OverviewScreenProps {
  mission: CourseMissionMeta
  onStart: () => void
}

function OverviewScreen({ mission, onStart }: OverviewScreenProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 pb-24">
        <nav className="mb-6">
          <Link
            to={ROUTES.COURSE(mission.courseSlug)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to course
          </Link>
        </nav>

        <MissionOverview mission={mission} />

        <div className="mt-6">
          <Button
            variant="cyber"
            size="lg"
            className="w-full"
            onClick={onStart}
          >
            Start Mission →
          </Button>
        </div>
      </div>
    </div>
  )
}

// ── Main page component ───────────────────────────────────────────────────────

interface ContentMissionPageProps {
  missionSlug: string
}

export function ContentMissionPage({ missionSlug }: ContentMissionPageProps) {
  const [loadState, setLoadState] = useState<LoadState>({ phase: 'loading' })
  const [playerPhase, setPlayerPhase] = useState<'overview' | 'playing'>('overview')
  const cancelRef = useRef(false)

  useEffect(() => {
    cancelRef.current = false

    getMissionBySlug(missionSlug)
      .then(async (mission) => {
        if (cancelRef.current) return
        if (!mission) {
          setLoadState({ phase: 'not-found' })
          return
        }
        const blocks = await getBlocksForMission(mission.courseSlug, mission.moduleSlug, mission.slug)
        if (cancelRef.current) return
        setLoadState({ phase: 'loaded', mission, blocks })
        // Resume directly into the player if the learner already started
        if (getMissionStarted(missionSlug)) setPlayerPhase('playing')
      })
      .catch((err: unknown) => {
        if (cancelRef.current) return
        if (err instanceof ContentNotFoundError) {
          setLoadState({ phase: 'not-found' })
        } else {
          setLoadState({
            phase: 'error',
            message: err instanceof Error ? err.message : 'Failed to load mission',
          })
        }
      })

    return () => { cancelRef.current = true }
  }, [missionSlug])

  if (loadState.phase === 'loading')    return <PageLoader />
  if (loadState.phase === 'not-found')  return <NotFound slug={missionSlug} />
  if (loadState.phase === 'error')      return <LoadError message={loadState.message} />

  const { mission, blocks } = loadState

  if (playerPhase === 'overview') {
    return <OverviewScreen mission={mission} onStart={() => setPlayerPhase('playing')} />
  }

  return <BlockPlayer mission={mission} blocks={blocks} />
}
