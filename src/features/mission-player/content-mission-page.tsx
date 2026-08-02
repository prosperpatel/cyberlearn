import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMissionBySlug, getBlocksForMission, loadModule, loadModulesForCourse } from '@/lib/content'
import { ContentNotFoundError } from '@/lib/content'
import { MissionOverview } from './components/mission-overview'
import { BlockPlayer } from './components/block-player'
import { PageLoader } from '@/components/shared/loading-states'
import { Button } from '@/components/ui/button'
import { getMissionStarted } from './hooks/use-mission-progress'
import type { CourseMissionMeta } from '@/lib/content'
import type { StandardBlock } from '@/types/mission-engine'
import type { NextMissionInfo } from './components/block-player'
import { ROUTES } from '@/lib/constants'

// ── Load state ─────────────────────────────────────────────────────────────────

type LoadState =
  | { phase: 'loading' }
  | { phase: 'loaded'; mission: CourseMissionMeta; blocks: StandardBlock[]; nextMission: NextMissionInfo | null }
  | { phase: 'not-found' }
  | { phase: 'error'; message: string }

// ── Error screens ──────────────────────────────────────────────────────────────

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

// ── Overview screen ────────────────────────────────────────────────────────────

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
          <Button variant="cyber" size="lg" className="w-full" onClick={onStart}>
            Start Mission →
          </Button>
        </div>
      </div>
    </div>
  )
}

// ── Next mission resolver (course-aware) ──────────────────────────────────────

async function resolveNextMission(
  mission: CourseMissionMeta,
): Promise<NextMissionInfo | null> {
  try {
    // Step 1 — try next mission in the same module
    const mod = await loadModule(mission.courseSlug, mission.moduleSlug)
    if (mod?.missions) {
      const missions = mod.missions as Array<{ slug: string; title: string; order: number }>
      const next = missions
        .slice()
        .sort((a, b) => a.order - b.order)
        .find(m => m.order === (mission.order ?? 0) + 1)

      if (next) return { kind: 'mission', slug: next.slug, title: next.title }
    }

    // Step 2 — try first mission of the next module in this course
    const allModules = await loadModulesForCourse(mission.courseSlug)
    const sortedMods = allModules.slice().sort((a, b) => a.order - b.order)
    const currentModIdx = sortedMods.findIndex(m => m.slug === mission.moduleSlug)

    if (currentModIdx !== -1 && currentModIdx < sortedMods.length - 1) {
      const nextMod = sortedMods[currentModIdx + 1]
      const nextModMissions = (nextMod.missions as Array<{ slug: string; title: string; order: number }> | undefined) ?? []
      const firstMission = nextModMissions
        .slice()
        .sort((a, b) => a.order - b.order)[0]

      if (firstMission) return { kind: 'mission', slug: firstMission.slug, title: firstMission.title }
    }

    // Step 3 — no more modules: course complete
    return { kind: 'course-complete' }
  } catch {
    return null
  }
}

// ── Main page component ────────────────────────────────────────────────────────

interface ContentMissionPageProps {
  missionSlug: string
}

export function ContentMissionPage({ missionSlug }: ContentMissionPageProps) {
  const [loadState, setLoadState]   = useState<LoadState>({ phase: 'loading' })
  const [playerPhase, setPlayerPhase] = useState<'overview' | 'playing'>('overview')
  const cancelRef = useRef(false)

  useEffect(() => {
    cancelRef.current = false

    getMissionBySlug(missionSlug)
      .then(async (mission) => {
        if (cancelRef.current) return
        if (!mission) { setLoadState({ phase: 'not-found' }); return }

        const [blocks, nextMission] = await Promise.all([
          getBlocksForMission(mission.courseSlug, mission.moduleSlug, mission.slug),
          resolveNextMission(mission),
        ])

        if (cancelRef.current) return
        setLoadState({ phase: 'loaded', mission, blocks, nextMission })
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

  if (loadState.phase === 'loading')   return <PageLoader />
  if (loadState.phase === 'not-found') return <NotFound slug={missionSlug} />
  if (loadState.phase === 'error')     return <LoadError message={loadState.message} />

  const { mission, blocks, nextMission } = loadState

  if (playerPhase === 'overview') {
    return <OverviewScreen mission={mission} onStart={() => setPlayerPhase('playing')} />
  }

  return <BlockPlayer mission={mission} blocks={blocks} nextMission={nextMission} />
}
