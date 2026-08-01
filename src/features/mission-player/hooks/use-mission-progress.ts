import { useState, useCallback } from 'react'

export interface MissionProgressData {
  activeBlockIndex: number
  completedBlocks: number[]
  xpAwarded: boolean
  started: boolean
}

type ProgressPatch =
  | Partial<MissionProgressData>
  | ((prev: MissionProgressData) => Partial<MissionProgressData>)

const DEFAULTS: MissionProgressData = {
  activeBlockIndex: 0,
  completedBlocks: [],
  xpAwarded: false,
  started: false,
}

function key(slug: string) {
  return `cyberlearn:mission-progress:${slug}`
}

function load(slug: string): MissionProgressData {
  try {
    const raw = localStorage.getItem(key(slug))
    if (raw) return { ...DEFAULTS, ...(JSON.parse(raw) as Partial<MissionProgressData>) }
  } catch { /* ignore */ }
  return { ...DEFAULTS }
}

function persist(slug: string, data: MissionProgressData) {
  try { localStorage.setItem(key(slug), JSON.stringify(data)) } catch { /* ignore */ }
}

/** Returns whether this mission was previously started. Safe to call outside React. */
export function getMissionStarted(slug: string): boolean {
  return load(slug).started
}

export function useMissionProgress(missionSlug: string) {
  const [data, setData] = useState<MissionProgressData>(() => {
    const saved = load(missionSlug)
    // Clamp saved index in case block list shrank
    return saved
  })

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
