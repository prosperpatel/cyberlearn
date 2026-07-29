import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { engineBus } from '../event-bus/event-bus'
import { useAudio } from '../audio/audio-context'
import {
  INITIAL_DIALOGUE_STATE,
  type DialogueLine,
  type DialogueScript,
  type DialogueState,
  type Speaker,
} from './types'

// ── Context ───────────────────────────────────────────────────────────

interface DialogueContextValue {
  /** The full runtime state of the engine. */
  state: DialogueState

  /** Start playing a script from the beginning (or from a specific line). */
  play: (script: DialogueScript, fromIndex?: number) => void

  /**
   * Advance the dialogue:
   *   - If the typewriter is still running → show the full line immediately.
   *   - If the full line is shown → move to the next line.
   *   - If on the last line → complete the dialogue.
   */
  advance: () => void

  /** Skip the entire remaining script. */
  skipAll: () => void

  /** Pause auto-advance timer (manual pause, not scene pause). */
  pause: () => void

  /** Resume from a paused state. */
  resume: () => void

  /** Stop the current script and reset to idle. */
  stop: () => void

  /** Convenience: the current line being displayed, or null. */
  currentLine: DialogueLine | null

  /** Convenience: the speaker for the current line, or null. */
  currentSpeaker: Speaker | null

  /** Whether the typewriter animation should be skipped (show full text immediately). */
  skipTypewriter: boolean

  /**
   * Must be passed to the <Typewriter onComplete> prop.
   * Signals the engine that the typewriter animation has finished for the
   * current line, transitioning state from 'typing' → 'waiting'.
   */
  onTypewriterComplete: () => void
}

const DialogueContext = createContext<DialogueContextValue | null>(null)

// ── Provider ──────────────────────────────────────────────────────────

export function DialogueProvider({ children }: { children: ReactNode }) {
  const audio = useAudio()

  const [dialogueState, setDialogueState] = useState<DialogueState>(INITIAL_DIALOGUE_STATE)
  const [skipTypewriter, setSkipTypewriter] = useState(false)

  // Timer ref for auto-advance
  const autoAdvanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearAutoAdvance = useCallback((): void => {
    if (autoAdvanceTimerRef.current !== null) {
      clearTimeout(autoAdvanceTimerRef.current)
      autoAdvanceTimerRef.current = null
    }
  }, [])

  // Cleanup on unmount
  useEffect(() => () => clearAutoAdvance(), [clearAutoAdvance])

  // When displayState becomes 'waiting' and the current line has autoAdvanceMs,
  // start the auto-advance timer
  useEffect(() => {
    if (dialogueState.displayState !== 'waiting') return
    const line = dialogueState.activeScript?.lines[dialogueState.lineIndex]
    if (!line?.autoAdvanceMs) return

    setDialogueState((s) => ({ ...s, displayState: 'auto-advancing' }))

    autoAdvanceTimerRef.current = setTimeout(() => {
      advanceInternal()
    }, line.autoAdvanceMs)

    return clearAutoAdvance
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogueState.displayState, dialogueState.lineIndex])

  // ── Internal helpers ───────────────────────────────────────────────

  const advanceInternal = useCallback((): void => {
    clearAutoAdvance()
    setDialogueState((prev) => {
      if (!prev.activeScript) return prev

      const nextIndex = prev.lineIndex + 1

      if (nextIndex >= prev.activeScript.lines.length) {
        // Script finished
        engineBus.emit('dialogue:complete', { dialogueId: prev.activeScript.id })
        return {
          ...prev,
          displayState: 'complete',
          lineIndex:    prev.activeScript.lines.length - 1,
        }
      }

      const nextLine = prev.activeScript.lines[nextIndex]
      engineBus.emit('dialogue:line', {
        dialogueId: prev.activeScript.id,
        lineIndex:  nextIndex,
        line:       nextLine,
      })

      // Play voice file if present
      if (nextLine.voiceFile) {
        try { audio.play(nextLine.voiceFile) } catch { /* no-op if not registered */ }
      }

      return {
        ...prev,
        lineIndex:    nextIndex,
        visibleText:  '',
        displayState: 'typing',
      }
    })
    setSkipTypewriter(false)
  }, [clearAutoAdvance, audio])

  // ── Public API ─────────────────────────────────────────────────────

  const play = useCallback((script: DialogueScript, fromIndex = 0): void => {
    clearAutoAdvance()
    setSkipTypewriter(false)

    const firstLine = script.lines[fromIndex]
    if (!firstLine) return

    engineBus.emit('dialogue:start', { dialogueId: script.id })
    engineBus.emit('dialogue:line', {
      dialogueId: script.id,
      lineIndex:  fromIndex,
      line:       firstLine,
    })

    if (firstLine.voiceFile) {
      try { audio.play(firstLine.voiceFile) } catch { /* no-op */ }
    }

    setDialogueState({
      activeScript:  script,
      lineIndex:     fromIndex,
      displayState:  'typing',
      visibleText:   '',
    })
  }, [clearAutoAdvance, audio])

  const advance = useCallback((): void => {
    setDialogueState((prev) => {
      if (!prev.activeScript) return prev

      // Typewriter still running → skip to full text
      if (prev.displayState === 'typing') {
        setSkipTypewriter(true)
        const fullText = prev.activeScript.lines[prev.lineIndex]?.text ?? ''
        return { ...prev, displayState: 'waiting', visibleText: fullText }
      }

      // Full text shown and skippable → advance to next line
      const line = prev.activeScript.lines[prev.lineIndex]
      if (
        (prev.displayState === 'waiting' || prev.displayState === 'auto-advancing') &&
        line?.skippable !== false
      ) {
        advanceInternal()
      }

      return prev
    })
  }, [advanceInternal])

  const skipAll = useCallback((): void => {
    if (!dialogueState.activeScript) return
    clearAutoAdvance()
    engineBus.emit('dialogue:skip', {
      dialogueId: dialogueState.activeScript.id,
      fromIndex:  dialogueState.lineIndex,
    })
    setDialogueState((prev) => ({
      ...prev,
      displayState: 'complete',
    }))
  }, [dialogueState, clearAutoAdvance])

  const pause = useCallback((): void => {
    clearAutoAdvance()
    setDialogueState((prev) =>
      prev.displayState === 'auto-advancing'
        ? { ...prev, displayState: 'waiting' }
        : prev,
    )
  }, [clearAutoAdvance])

  const resume = useCallback((): void => {
    // Re-trigger the auto-advance effect by toggling displayState
    setDialogueState((prev) =>
      prev.displayState === 'waiting'
        ? { ...prev, displayState: 'waiting' } // effect re-runs because lineIndex/displayState diff
        : prev,
    )
  }, [])

  const stop = useCallback((): void => {
    clearAutoAdvance()
    setDialogueState(INITIAL_DIALOGUE_STATE)
    setSkipTypewriter(false)
  }, [clearAutoAdvance])

  // Called by the Typewriter component when animation finishes
  const onTypewriterComplete = useCallback((): void => {
    setDialogueState((prev) => {
      if (prev.displayState !== 'typing') return prev
      const fullText = prev.activeScript?.lines[prev.lineIndex]?.text ?? ''
      return { ...prev, displayState: 'waiting', visibleText: fullText }
    })
    setSkipTypewriter(false)
  }, [])

  // ── Derived values ─────────────────────────────────────────────────

  const currentLine = useMemo<DialogueLine | null>(
    () => dialogueState.activeScript?.lines[dialogueState.lineIndex] ?? null,
    [dialogueState.activeScript, dialogueState.lineIndex],
  )

  const currentSpeaker = useMemo<Speaker | null>(() => {
    if (!currentLine || !dialogueState.activeScript) return null
    return dialogueState.activeScript.speakers[currentLine.speakerId] ?? null
  }, [currentLine, dialogueState.activeScript])

  const value = useMemo<DialogueContextValue>(
    () => ({
      state:                dialogueState,
      play, advance, skipAll, pause, resume, stop,
      currentLine,
      currentSpeaker,
      skipTypewriter,
      onTypewriterComplete,
    }),
    [dialogueState, play, advance, skipAll, pause, resume, stop,
     currentLine, currentSpeaker, skipTypewriter, onTypewriterComplete],
  )

  return (
    <DialogueContext.Provider value={value}>
      {children}
    </DialogueContext.Provider>
  )
}

// ── Hook ──────────────────────────────────────────────────────────────

/** Access the dialogue engine from any component inside <DialogueProvider>. */
export function useDialogue(): DialogueContextValue {
  const ctx = useContext(DialogueContext)
  if (!ctx) throw new Error('useDialogue must be used inside <DialogueProvider>')
  return ctx
}

export type { DialogueContextValue }
