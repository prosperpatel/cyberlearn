import { useState, useCallback } from 'react'

export interface MissionProgressData {
  activeBlockIndex: number
  completedBlocks: number[]
  scrollPositions: Record<string, number>
  xpAwarded: boolean
  started: boolean
}

type ProgressPatch =
  | Partial<MissionProgressData>
  | ((prev: MissionProgressData) => Partial<MissionProgressData>)

const DEFAULTS: MissionProgressData = {
  activeBlockIndex: 0,
  completedBlocks: [],
  scrollPositions: {},
  xpAwarded: false,
  started: false,
}

function storageKey(slug: string) {
  return `cyberlearn:mission-progress:${slug}`
}

function load(slug: string): MissionProgressData {
  try {
    const raw = localStorage.getItem(storageKey(slug))
    if (raw) return { ...DEFAULTS, ...(JSON.parse(raw) as Partial<MissionProgressData>) }
  } catch { /* ignore */ }
  return { ...DEFAULTS }
}

function persist(slug: string, data: MissionProgressData) {
  try { localStorage.setItem(storageKey(slug), JSON.stringify(data)) } catch { /* ignore */ }
}

/** Returns whether this mission was previously started. Safe to call outside React. */
export function getMissionStarted(slug: string): boolean {
  return load(slug).started
}

export function useMissionProgress(missionSlug: string) {
  const [data, setData] = useState<MissionProgressData>(() => load(missionSlug))

  const update = useCallback((patch: ProgressPatch) => {
    setData(prev => {
      const partial = typeof patch === 'function' ? patch(prev) : patch
      const next = { ...prev, ...partial }
      persist(missionSlug, next)
      return next
    })
  }, [missionSlug])

  return { data, update }
}
