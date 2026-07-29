import { useEffect } from 'react'
import { useDialogue }    from '@/engine/dialogue'
import { Typewriter }     from '@/engine/dialogue'
import { useProgressStore } from '@/engine/save'
import type { DialogueScript } from '@/engine/dialogue'
import type { SceneProps }     from '@/engine/scene'
import { S, NavButton } from './shared'

const TEST_SCRIPT: DialogueScript = {
  id: 'et-dialogue-test',
  speakers: {
    SYSTEM: {
      id:          'SYSTEM',
      displayName: 'SYSTEM',
      colorClass:  'text-cyber-blue',
    },
  },
  lines: [
    { id: 'l0', speakerId: 'SYSTEM', text: 'Dialogue Engine initialized.' },
    { id: 'l1', speakerId: 'SYSTEM', text: 'Testing typewriter at 50 chars/sec. Click or press [SPACE] to advance.' },
    { id: 'l2', speakerId: 'SYSTEM', text: 'Skip works too — press the SKIP ALL button to jump to the end.' },
    { id: 'l3', speakerId: 'SYSTEM', text: 'This line auto-advances in 2 seconds. Sit tight...', autoAdvanceMs: 2000 },
    { id: 'l4', speakerId: 'SYSTEM', text: 'Dialogue Engine: PASS ✓', autoAdvanceMs: 800 },
  ],
}

export function DialogueScene({ onComplete }: SceneProps) {
  const dialogue = useDialogue()
  const progress = useProgressStore()
  const {
    state, currentLine, currentSpeaker,
    skipTypewriter, onTypewriterComplete,
    play, advance, skipAll,
  } = dialogue

  // Start script on mount
  useEffect(() => {
    play(TEST_SCRIPT)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Auto-proceed when script completes
  useEffect(() => {
    if (state.displayState !== 'complete') return
    progress.setCheckpoint('engine-test', 'dialogue-pass', true)
    const t = setTimeout(onComplete, 600)
    return () => clearTimeout(t)
  }, [state.displayState, onComplete, progress])

  // Space / Enter to advance
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); advance() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [advance])

  const isComplete = state.displayState === 'complete'
  const lineTotal  = state.activeScript?.lines.length ?? 0

  return (
    <div style={S.scene}>
      <div style={S.panel}>
        <div style={S.sceneTag}>2 / 5 · DIALOGUE</div>
        <div style={S.title}>DIALOGUE ENGINE</div>

        {/* Speaker label */}
        <div style={{ fontSize: 11, color: 'rgba(0,217,255,0.5)', marginBottom: 6, letterSpacing: '0.1em' }}>
          [{currentSpeaker?.displayName ?? '—'}]
        </div>

        {/* Dialogue box */}
        <div style={{
          minHeight:    72,
          background:   'rgba(0,217,255,0.04)',
          border:       '1px solid rgba(0,217,255,0.2)',
          borderRadius: 4,
          padding:      '12px 16px',
          fontSize:     14,
          lineHeight:   1.6,
          color:        isComplete ? '#00FF87' : '#E0F7FF',
          marginBottom: 16,
        }}>
          {state.displayState !== 'idle' && currentLine && !isComplete && (
            <Typewriter
              text={currentLine.text}
              charsPerSecond={50}
              skipAnimation={skipTypewriter}
              onComplete={onTypewriterComplete}
            />
          )}
          {isComplete && 'Dialogue Engine: PASS ✓'}
        </div>

        {/* Status row */}
        <div style={{ fontSize: 10, color: 'rgba(0,217,255,0.4)', marginBottom: 12, display: 'flex', gap: 16 }}>
          <span>Line {Math.min(state.lineIndex + 1, lineTotal)} / {lineTotal}</span>
          <span>State: <span style={{ color: '#00D9FF' }}>{state.displayState}</span></span>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: 8 }}>
          <NavButton onClick={advance} disabled={isComplete}>ADVANCE [SPACE]</NavButton>
          <NavButton onClick={skipAll} disabled={isComplete}>SKIP ALL</NavButton>
        </div>
      </div>
    </div>
  )
}
