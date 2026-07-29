import { type CSSProperties, useCallback, useEffect } from 'react'
import { Typewriter, useDialogue } from '@/engine/dialogue'
import { engineBus } from '@/engine/event-bus'
import type { DialogueScript } from '@/engine/dialogue'
import type { SceneProps } from '@/engine/scene'
import bootScriptRaw from '../dialogue/boot.json'

const BOOT_SCRIPT = bootScriptRaw as unknown as DialogueScript

export function BootScene({ onComplete }: SceneProps) {
  const {
    state,
    currentLine,
    skipTypewriter,
    onTypewriterComplete,
    play,
    advance,
  } = useDialogue()

  // Play dialogue once on mount
  useEffect(() => {
    play(BOOT_SCRIPT)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // When dialogue finishes: record mission complete then signal scene done
  useEffect(() => {
    if (state.displayState !== 'complete') return
    const t = setTimeout(() => {
      engineBus.emit('mission:complete', { missionId: 'mission-01', xpEarned: 0 })
      onComplete()
    }, 1800)
    return () => clearTimeout(t)
  }, [state.displayState, onComplete])

  const handleAdvance = useCallback(() => {
    if (state.displayState !== 'complete') advance()
  }, [advance, state.displayState])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        handleAdvance()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleAdvance])

  const isComplete = state.displayState === 'complete'
  const isTyping   = state.displayState === 'typing'
  const lineIndex  = state.lineIndex
  const totalLines = BOOT_SCRIPT.lines.length

  return (
    <div onClick={handleAdvance} style={wrapStyle}>
      {/* Scanline texture overlay */}
      <div style={scanlineStyle} aria-hidden="true" />

      {/* Top label */}
      <div style={headerStyle} aria-hidden="true">
        SENTINEL CYBERSECURITY ACADEMY&nbsp;&nbsp;·&nbsp;&nbsp;MISSION 01
      </div>

      {/* Dialogue panel */}
      <div style={panelStyle}>
        {/* Speaker bar */}
        <div style={speakerBarStyle}>
          <span style={{ color: '#00D9FF', letterSpacing: '0.15em' }}>ARIA</span>
          <span style={statusStyle}>
            <span style={{ color: '#00FF87' }}>●&nbsp;</span>
            {isComplete ? 'READY' : 'ONLINE'}
          </span>
        </div>

        <div style={ruleStyle} />

        {/* Text area */}
        <div style={textAreaStyle}>
          {isComplete ? (
            <span style={{ color: '#00FF87' }}>SENTINEL LINK ESTABLISHED</span>
          ) : (
            currentLine && (
              <Typewriter
                text={currentLine.text}
                charsPerSecond={42}
                skipAnimation={skipTypewriter}
                onComplete={onTypewriterComplete}
              />
            )
          )}
        </div>

        <div style={ruleStyle} />

        {/* Footer */}
        <div style={footerStyle}>
          {isComplete ? (
            <span style={{ color: 'rgba(0,255,135,0.45)', fontSize: 10, letterSpacing: '0.15em' }}>
              INITIALISING…
            </span>
          ) : (
            <>
              <span style={{ color: 'rgba(0,217,255,0.3)', fontSize: 10 }}>
                {lineIndex + 1}&thinsp;/&thinsp;{totalLines}
              </span>
              {!isTyping && (
                <span style={{ color: 'rgba(0,217,255,0.4)', fontSize: 10, letterSpacing: '0.1em' }}>
                  CLICK OR PRESS SPACE
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Styles ────────────────────────────────────────────────────────────────────

const wrapStyle: CSSProperties = {
  position:       'fixed',
  inset:          0,
  background:     '#08080F',
  display:        'flex',
  flexDirection:  'column',
  alignItems:     'center',
  justifyContent: 'center',
  fontFamily:     '"Courier New", monospace',
  cursor:         'default',
  userSelect:     'none',
}

const scanlineStyle: CSSProperties = {
  position:      'fixed',
  inset:         0,
  background:    'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.06) 2px,rgba(0,0,0,0.06) 4px)',
  pointerEvents: 'none',
  zIndex:        1,
}

const headerStyle: CSSProperties = {
  position:      'absolute',
  top:           24,
  fontSize:      9,
  letterSpacing: '0.22em',
  color:         'rgba(0,217,255,0.2)',
  zIndex:        2,
}

const panelStyle: CSSProperties = {
  width:        '100%',
  maxWidth:     560,
  border:       '1px solid rgba(0,217,255,0.18)',
  borderRadius: 3,
  background:   'rgba(0,10,20,0.6)',
  zIndex:       2,
}

const speakerBarStyle: CSSProperties = {
  display:        'flex',
  alignItems:     'center',
  justifyContent: 'space-between',
  padding:        '11px 20px',
  fontSize:       12,
  letterSpacing:  '0.12em',
}

const statusStyle: CSSProperties = {
  fontSize:      9,
  letterSpacing: '0.15em',
  color:         'rgba(0,255,135,0.65)',
  display:       'flex',
  alignItems:    'center',
}

const ruleStyle: CSSProperties = {
  height:     1,
  background: 'rgba(0,217,255,0.12)',
}

const textAreaStyle: CSSProperties = {
  padding:    '26px 22px',
  minHeight:  96,
  fontSize:   15,
  lineHeight: 1.75,
  color:      '#D0EEF8',
}

const footerStyle: CSSProperties = {
  display:     'flex',
  justifyContent: 'space-between',
  alignItems:  'center',
  padding:     '9px 20px',
  minHeight:   34,
}
