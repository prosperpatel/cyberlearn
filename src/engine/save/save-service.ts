import { engineBus } from '../event-bus/event-bus'
import { DEFAULT_CHANNEL_VOLUMES, DEFAULT_MASTER_VOLUME } from '../audio/types'
import { DEFAULT_ACCESSIBILITY } from '../accessibility/types'
import {
  SAVE_VERSION,
  type MissionId,
  type MissionSaveData,
  type SaveData,
  type UserSettings,
} from './types'

const STORAGE_KEY = 'cyber-learn-engine-save'

function buildDefaultSaveData(): SaveData {
  const now = Date.now()
  return {
    version:   SAVE_VERSION,
    createdAt: now,
    updatedAt: now,
    missions:  {},
    settings: {
      masterVolume:   DEFAULT_MASTER_VOLUME,
      channelVolumes: { ...DEFAULT_CHANNEL_VOLUMES },
      accessibility:  { ...DEFAULT_ACCESSIBILITY },
    },
  }
}

/**
 * Serialises, deserialises, versions, and migrates engine save data stored in
 * localStorage. Used as the backing store for the progress Zustand store.
 *
 * Schema migrations live in `migrateFromVersion`. Always bump SAVE_VERSION and
 * add a migration step when changing SaveData shape.
 */
export class SaveService {
  private slot: number

  constructor(slot = 0) {
    this.slot = slot
  }

  private get storageKey(): string {
    return this.slot === 0 ? STORAGE_KEY : `${STORAGE_KEY}-${this.slot}`
  }

  // ── Read ──────────────────────────────────────────────────────────

  /**
   * Load save data from localStorage.
   * Returns migrated data, or fresh defaults if nothing is stored.
   */
  load(): SaveData {
    try {
      const raw = localStorage.getItem(this.storageKey)
      if (!raw) return buildDefaultSaveData()

      const parsed = JSON.parse(raw) as Partial<SaveData>
      const version = typeof parsed.version === 'number' ? parsed.version : 0
      const migrated = this.migrate(parsed, version)

      engineBus.emit('save:load', { slot: this.slot, version })
      return migrated
    } catch (err) {
      console.warn('[SaveService] Could not parse save data, resetting.', err)
      return buildDefaultSaveData()
    }
  }

  // ── Write ─────────────────────────────────────────────────────────

  /** Persist save data to localStorage. */
  write(data: SaveData): void {
    const toWrite: SaveData = { ...data, updatedAt: Date.now() }
    localStorage.setItem(this.storageKey, JSON.stringify(toWrite))
    engineBus.emit('save:write', { slot: this.slot })
  }

  // ── Reset ─────────────────────────────────────────────────────────

  /** Erase all save data for this slot and return fresh defaults. */
  reset(): SaveData {
    localStorage.removeItem(this.storageKey)
    engineBus.emit('save:reset', { slot: this.slot })
    return buildDefaultSaveData()
  }

  // ── Helpers ───────────────────────────────────────────────────────

  /** Return the save data for a specific mission, creating it if absent. */
  static ensureMission(data: SaveData, missionId: MissionId): MissionSaveData {
    if (!data.missions[missionId]) {
      data.missions[missionId] = {
        missionId,
        startedAt:     Date.now(),
        lastActiveAt:  Date.now(),
        completedAt:   null,
        visitedScenes: [],
        checkpoints:   {},
        xpEarned:      0,
        achievements:  [],
      }
    }
    return data.missions[missionId]
  }

  /** Merge partial settings into the existing settings object. */
  static mergeSettings(data: SaveData, partial: Partial<UserSettings>): SaveData {
    return {
      ...data,
      settings: {
        ...data.settings,
        ...partial,
        accessibility: {
          ...data.settings.accessibility,
          ...(partial.accessibility ?? {}),
        },
        channelVolumes: {
          ...data.settings.channelVolumes,
          ...(partial.channelVolumes ?? {}),
        },
      },
    }
  }

  // ── Migration ─────────────────────────────────────────────────────

  private migrate(raw: Partial<SaveData>, fromVersion: number): SaveData {
    if (fromVersion === SAVE_VERSION) {
      return { ...buildDefaultSaveData(), ...raw } as SaveData
    }

    // Future migration steps go here:
    // if (fromVersion < 2) raw = migrateV1toV2(raw)
    // if (fromVersion < 3) raw = migrateV2toV3(raw)

    // If the version is unknown (e.g., from a very old build), start fresh
    console.warn(
      `[SaveService] Unknown save version ${fromVersion}. Starting with defaults.`,
    )
    return buildDefaultSaveData()
  }
}

/** Default slot-0 instance. */
export const saveService = new SaveService(0)
