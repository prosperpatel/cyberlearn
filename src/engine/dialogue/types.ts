import type { DialogueId, SpeakerId } from '../types'

/** A single line in a dialogue script. */
export interface DialogueLine {
  /** Unique identifier within the script. */
  id: string
  /** Who is speaking — must match a key in the script's `speakers` map. */
  speakerId: SpeakerId
  /** The text content of this line. */
  text: string
  /**
   * Emotional state of the speaker — passed to the rendering layer as a
   * hint for visual expression (e.g., ARIA waveform state).
   */
  emotion?: string
  /** Path to the voice-over audio file for this line. Optional. */
  voiceFile?: string
  /**
   * Milliseconds to pause after this line before auto-advancing.
   * When `null`, the engine waits for an explicit user advance action.
   * Default: `null` (manual advance).
   */
  autoAdvanceMs?: number | null
  /** Whether the user can skip this line. Default: true. */
  skippable?: boolean
  /** Arbitrary metadata available to scene components. */
  metadata?: Record<string, unknown>
}

/** Visual/metadata profile for a speaker. */
export interface Speaker {
  id: SpeakerId
  displayName: string
  /** Tailwind color class used to tint the speaker name in captions. */
  colorClass?: string
  /** Path to an avatar image. Optional. */
  avatar?: string
}

/** A self-contained dialogue script — the unit the engine plays through. */
export interface DialogueScript {
  id: DialogueId
  speakers: Record<SpeakerId, Speaker>
  lines: DialogueLine[]
}

/** Runtime display state of the dialogue engine. */
export type DialogueDisplayState =
  | 'idle'            // No script loaded
  | 'typing'          // Typewriter animation running
  | 'waiting'         // Full line shown, awaiting advance
  | 'auto-advancing'  // Full line shown, timer counting down
  | 'complete'        // All lines finished

export interface DialogueState {
  activeScript:   DialogueScript | null
  lineIndex:      number
  displayState:   DialogueDisplayState
  /** The text currently visible to the user (may be partial during typing). */
  visibleText:    string
}

export const INITIAL_DIALOGUE_STATE: DialogueState = {
  activeScript:  null,
  lineIndex:     0,
  displayState:  'idle',
  visibleText:   '',
}
