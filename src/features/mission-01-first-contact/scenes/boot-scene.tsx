import { type CSSProperties, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Typewriter, useDialogue } from '@/engine/dialogue'
import { useAccessibility } from '@/engine/accessibility'
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

  const { reducedMotion } = useAccessibility()

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
    <div onPointerDown={handleAdvance} style={wrapStyle}>
      {/* Scanline texture overlay */}
      <div style={scanlineStyle} aria-hidden="true" />

      {/* Top label */}
      <div style={headerStyle} aria-hidden="true">
        SENTINEL CYBERSECURITY ACADEMY&nbsp;&nbsp;·&nbsp;&nbsp;MISSION 01
      </div>

      {/* ARIA identity ring — abstract pulsing SVG, no face */}
      <div style={ariaRingWrapStyle} aria-hidden="true">
        <svg width="72" height="72" viewBox="0 0 72 72" style={{ overflow: 'visible' }}>
          {!reducedMotion ? (
            <circle cx="36" cy="36" r="28" fill="none" stroke="rgba(0,217,255,0.12)" strokeWidth="1">
              <animate attributeName="r"       values="28;32;28"    dur="3.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0.2;0.7" dur="3.5s" repeatCount="indefinite" />
            </circle>
          ) : (
            <circle cx="36" cy="36" r="28" fill="none" stroke="rgba(0,217,255,0.12)" strokeWidth="1" />
          )}
          {!reducedMotion ? (
            <circle cx="36" cy="36" r="20" fill="none" stroke="rgba(0,217,255,0.18)" strokeWidth="0.75">
              <animate attributeName="r"       values="20;23;20"     dur="3.5s" begin="0.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0.25;0.8" dur="3.5s" begin="0.4s" repeatCount="indefinite" />
            </circle>
          ) : (
            <circle cx="36" cy="36" r="20" fill="none" stroke="rgba(0,217,255,0.18)" strokeWidth="0.75" />
          )}
          <circle cx="36" cy="36" r="4" fill="rgba(0,217,255,0.3)" />
          <circle cx="36" cy="36" r="2" fill="#00D9FF" opacity="0.7" />
        </svg>
      </div>

      {/* Dialogue panel — animated entrance */}
      {reducedMotion ? (
        <div style={panelStyle}>
          <PanelContent
            isComplete={isComplete}
            isTyping={isTyping}
            lineIndex={lineIndex}
            totalLines={totalLines}
            currentLine={currentLine}
            skipTypewriter={skipTypewriter}
            onTypewriterComplete={onTypewriterComplete}
          />
        </div>
      ) : (
        <motion.div
          style={panelStyle}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        >
          <PanelContent
            isComplete={isComplete}
            isTyping={isTyping}
            lineIndex={lineIndex}
            totalLines={totalLines}
            currentLine={currentLine}
            skipTypewriter={skipTypewriter}
            onTypewriterComplete={onTypewriterComplete}
          />
        </motion.div>
      )}
    </div>
  )
}

// ── Panel content (extracted to avoid JSX duplication in the conditional) ─────

interface PanelContentProps {
  isComplete:           boolean
  isTyping:             boolean
  lineIndex:            number
  totalLines:           number
  currentLine:          ReturnType<typeof useDialogue>['currentLine']
  skipTypewriter:       boolean
  onTypewriterComplete: () => void
}

function PanelContent({
  isComplete,
  isTyping,
  lineIndex,
  totalLines,
  currentLine,
  skipTypewriter,
  onTypewriterComplete,
}: PanelContentProps) {
  return (
    <>
      <div style={speakerBarStyle}>
        <span style={{ color: '#00D9FF', letterSpacing: '0.15em' }}>ARIA</span>
        <span style={statusStyle}>
          <span style={{ color: '#00FF87' }}>●&nbsp;</span>
          {isComplete ? 'READY' : 'ONLINE'}
        </span>
      </div>

      <div style={ruleStyle} />

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

      <div style={footerStyle}>
        {isComplete ? (
          <span style={{ color: 'rgba(0,255,135,0.45)', fontSize: 12, letterSpacing: '0.15em' }}>
            INITIALISING…
          </span>
        ) : (
          <>
            <span style={{ color: 'rgba(0,217,255,0.3)', fontSize: 12 }}>
              {lineIndex + 1}&thinsp;/&thinsp;{totalLines}
            </span>
            {!isTyping && (
              <span style={{ color: 'rgba(0,217,255,0.4)', fontSize: 12, letterSpacing: '0.1em' }}>
                CLICK OR PRESS SPACE
              </span>
            )}
          </>
        )}
      </div>
    </>
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
  touchAction:    'manipulation',
  gap:            20,
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
  fontSize:      11,
  letterSpacing: '0.18em',
  color:         'rgba(0,217,255,0.2)',
  zIndex:        2,
}

const ariaRingWrapStyle: CSSProperties = {
  position:  'relative',
  zIndex:    2,
  flexShrink: 0,
}

const panelStyle: CSSProperties = {
  width:        '100%',
  maxWidth:     680,
  border:       '1px solid rgba(0,217,255,0.18)',
  borderRadius: 3,
  background:   'rgba(0,10,20,0.6)',
  zIndex:       2,
}

const speakerBarStyle: CSSProperties = {
  display:        'flex',
  alignItems:     'center',
  justifyContent: 'space-between',
  padding:        '13px 22px',
  fontSize:       14,
  letterSpacing:  '0.12em',
}

const statusStyle: CSSProperties = {
  fontSize:      11,
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
  padding:    '32px 28px',
  minHeight:  100,
  fontSize:   18,
  lineHeight: 1.75,
  color:      '#D0EEF8',
}

const footerStyle: CSSProperties = {
  display:        'flex',
  justifyContent: 'space-between',
  alignItems:     'center',
  padding:        '11px 22px',
  minHeight:      38,
}
