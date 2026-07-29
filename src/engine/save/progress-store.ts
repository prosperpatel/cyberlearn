import { create } from 'zustand'
import { saveService, SaveService } from './save-service'
import type { SaveData, MissionSaveData } from './types'
import type { MissionId, SceneId } from '../types'
import type { AccessibilitySettings } from '../accessibility/types'
import type { ChannelVolumes } from '../audio/types'

interface ProgressState {
  /** Hydrated, in-memory copy of the current save data. */
  save: SaveData

  // ── Mission actions ──────────────────────────────────────────────

  /** Touch or create the save record for a mission (idempotent). */
  initMission: (missionId: MissionId) => void

  /** Record a scene visit. */
  visitScene: (missionId: MissionId, sceneId: SceneId) => void

  /** Mark a mission as complete and record earned XP. */
  completeMission: (missionId: MissionId, xpEarned: number) => void

  /** Set an arbitrary checkpoint value inside a mission. */
  setCheckpoint: (missionId: MissionId, key: string, value: unknown) => void

  /** Read a checkpoint value. */
  getCheckpoint: (missionId: MissionId, key: string) => unknown

  /** Get full mission save data (or undefined if not started). */
  getMission: (missionId: MissionId) => MissionSaveData | undefined

  /** Unlock an achievement for a mission. */
  unlockAchievement: (missionId: MissionId, achievementId: string) => void

  // ── Settings actions ─────────────────────────────────────────────

  setMasterVolume:   (volume: number) => void
  setChannelVolumes: (volumes: Partial<ChannelVolumes>) => void
  setAccessibility:  (partial: Partial<AccessibilitySettings>) => void

  // ── Persistence ──────────────────────────────────────────────────

  /** Immediately write the current state to localStorage. */
  persist: () => void

  /** Reload state from localStorage (e.g., after an external write). */
  hydrate: () => void

  /** Erase all data and reset to defaults. */
  reset: () => void
}

export const useProgressStore = create<ProgressState>()((set, get) => {
  // Initialise from localStorage on store creation
  const initialSave = saveService.load()

  const persistCurrent = (): void => {
    saveService.write(get().save)
  }

  return {
    save: initialSave,

    // ── Mission ──────────────────────────────────────────────────

    initMission: (missionId) => {
      set((state) => {
        if (state.save.missions[missionId]) return state
        const next = { ...state.save }
        SaveService.ensureMission(next, missionId)
        return { save: next }
      })
      persistCurrent()
    },

    visitScene: (missionId, sceneId) => {
      set((state) => {
        const mission = state.save.missions[missionId]
        if (!mission || mission.visitedScenes.includes(sceneId)) return state

        return {
          save: {
            ...state.save,
            missions: {
              ...state.save.missions,
              [missionId]: {
                ...mission,
                visitedScenes: [...mission.visitedScenes, sceneId],
                lastActiveAt:  Date.now(),
              },
            },
          },
        }
      })
      persistCurrent()
    },

    completeMission: (missionId, xpEarned) => {
      set((state) => {
        const mission = state.save.missions[missionId]
        if (!mission) return state

        return {
          save: {
            ...state.save,
            missions: {
              ...state.save.missions,
              [missionId]: {
                ...mission,
                completedAt:  Date.now(),
                lastActiveAt: Date.now(),
                xpEarned,
              },
            },
          },
        }
      })
      persistCurrent()
    },

    setCheckpoint: (missionId, key, value) => {
      set((state) => {
        const mission = state.save.missions[missionId]
        if (!mission) return state

        return {
          save: {
            ...state.save,
            missions: {
              ...state.save.missions,
              [missionId]: {
                ...mission,
                checkpoints:  { ...mission.checkpoints, [key]: value },
                lastActiveAt: Date.now(),
              },
            },
          },
        }
      })
      persistCurrent()
    },

    getCheckpoint: (missionId, key) =>
      get().save.missions[missionId]?.checkpoints[key],

    getMission: (missionId) =>
      get().save.missions[missionId],

    unlockAchievement: (missionId, achievementId) => {
      set((state) => {
        const mission = state.save.missions[missionId]
        if (!mission || mission.achievements.includes(achievementId)) return state

        return {
          save: {
            ...state.save,
            missions: {
              ...state.save.missions,
              [missionId]: {
                ...mission,
                achievements: [...mission.achievements, achievementId],
              },
            },
          },
        }
      })
      persistCurrent()
    },

    // ── Settings ─────────────────────────────────────────────────

    setMasterVolume: (volume) => {
      set((state) => ({
        save: SaveService.mergeSettings(state.save, { masterVolume: volume }),
      }))
      persistCurrent()
    },

    setChannelVolumes: (volumes) => {
      set((state) => ({
        save: SaveService.mergeSettings(state.save, { channelVolumes: volumes as ChannelVolumes }),
      }))
      persistCurrent()
    },

    setAccessibility: (partial) => {
      set((state) => ({
        save: SaveService.mergeSettings(state.save, { accessibility: partial as AccessibilitySettings }),
      }))
      persistCurrent()
    },

    // ── Persistence ───────────────────────────────────────────────

    persist: persistCurrent,

    hydrate: () => {
      set({ save: saveService.load() })
    },

    reset: () => {
      set({ save: saveService.reset() })
    },
  }
})
