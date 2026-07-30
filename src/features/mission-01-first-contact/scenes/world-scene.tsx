import { type CSSProperties, useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Typewriter, useDialogue } from '@/engine/dialogue'
import { useAudio }               from '@/engine/audio'
import { useAccessibility }       from '@/engine/accessibility'
import type { DialogueState, DialogueLine, DialogueScript } from '@/engine/dialogue'
import type { SceneProps } from '@/engine/scene'
import worldRaw from '../dialogue/world.json'

// ── Dialogue scripts ──────────────────────────────────────────────────────────

interface WorldDialogues {
  intro:   DialogueScript
  inspect: DialogueScript
}

const { intro: INTRO_SCRIPT, inspect: INSPECT_SCRIPT } =
  worldRaw as unknown as WorldDialogues

// ── Network map data ──────────────────────────────────────────────────────────

interface NodeDef {
  id:        string
  cx:        number  // 0–100 in SVG viewBox
  cy:        number  // 0–60 in SVG viewBox
  highlight: boolean // true = SEA cluster, lit on inspect
}

const NODES: readonly NodeDef[] = [
  { id: 'NAM', cx: 15,  cy: 22, highlight: false },
  { id: 'SAM', cx: 22,  cy: 44, highlight: false },
  { id: 'EUR', cx: 42,  cy: 18, highlight: false },
  { id: 'AFR', cx: 46,  cy: 38, highlight: false },
  { id: 'RUS', cx: 60,  cy: 14, highlight: false },
  { id: 'SEA', cx: 72,  cy: 35, highlight: true  },
  { id: 'EAS', cx: 80,  cy: 22, highlight: true  },
  { id: 'AUS', cx: 76,  cy: 52, highlight: true  },
]

const EDGES: readonly [string, string][] = [
  ['NAM', 'EUR'],
  ['NAM', 'SAM'],
  ['EUR', 'AFR'],
  ['EUR', 'RUS'],
  ['RUS', 'SEA'],
  ['SEA', 'EAS'],
  ['SEA', 'AUS'],
  ['EAS', 'NAM'],
]

const NODE_MAP = new Map(NODES.map(n => [n.id, n]))

// ── Static activity log ───────────────────────────────────────────────────────

const LOG_ENTRIES = [
  { time: '14:32:01', msg: 'NODES    2,847 ACTIVE' },
  { time: '14:32:09', msg: 'TRAFFIC  NOMINAL'       },
  { time: '14:32:17', msg: 'SENTINEL-A     OK'      },
  { time: '14:32:25', msg: 'SENTINEL-B     OK'      },
  { time: '14:32:33', msg: 'THREAT LVL     0'       },
  { time: '14:32:41', msg: 'SEA CLUSTER    ACTIVE'  },
]

// ── Phase ─────────────────────────────────────────────────────────────────────

type WorldPhase = 'intro' | 'ready' | 'inspecting' | 'anomaly'

// ── Sub-components ────────────────────────────────────────────────────────────

function TopBar({ phase }: { phase: WorldPhase }) {
  const isAnomaly = phase === 'anomaly'
  return (
    <div style={topBarStyle}>
      <span style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(0,217,255,0.35)' }}>
        SENTINEL OPERATIONS CENTER&nbsp;&nbsp;·&nbsp;&nbsp;LIVE FEED
      </span>
      <span style={{
        fontSize: 9, letterSpacing: '0.15em',
        color: isAnomaly ? '#FF4757' : 'rgba(0,255,135,0.55)',
        display: 'flex', alignItems: 'center', gap: 5,
      }}>
        <span style={{ color: isAnomaly ? '#FF4757' : '#00FF87' }}>●</span>
        {isAnomaly ? 'ANOMALY DETECTED' : 'CONNECTED'}
      </span>
    </div>
  )
}

function StatusPanel({ inspected }: { inspected: boolean }) {
  return (
    <div style={statusPanelStyle}>
      <div style={sectionLabelStyle}>SYSTEM STATUS</div>
      {[
        { label: 'NODES',   value: '2,847',    ok: true  },
        { label: 'TRAFFIC', value: '1.2 TB/s', ok: true  },
        { label: 'THREATS', value: '0 ACTIVE', ok: true  },
        { label: 'STATUS',  value: 'NOMINAL',  ok: true  },
      ].map(({ label, value, ok }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
          <span style={{ color: ok ? '#00FF87' : '#FF4757', fontSize: 7, flexShrink: 0 }}>●</span>
          <span style={{ fontSize: 9, color: 'rgba(0,217,255,0.4)', width: 52, flexShrink: 0 }}>
            {label}
          </span>
          <span style={{ fontSize: 9, color: '#00D9FF' }}>{value}</span>
        </div>
      ))}

      {inspected && (
        <>
          <div style={{ height: 1, background: 'rgba(0,217,255,0.08)', margin: '10px 0' }} />
          <div style={{ ...sectionLabelStyle, color: 'rgba(0,255,135,0.35)' }}>PROBE RESULTS</div>
          {[
            { label: 'CLUSTER', value: 'SEA',    warn: true },
            { label: 'DENSITY', value: 'HIGH',   warn: true },
            { label: 'STATUS',  value: 'FLAGGED',warn: true },
          ].map(({ label, value, warn }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
              <span style={{ color: warn ? '#FF6B35' : '#00FF87', fontSize: 7, flexShrink: 0 }}>●</span>
              <span style={{ fontSize: 9, color: 'rgba(0,217,255,0.4)', width: 52, flexShrink: 0 }}>
                {label}
              </span>
              <span style={{ fontSize: 9, color: '#FF6B35' }}>{value}</span>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

function NetworkMap({ inspected, reducedMotion }: { inspected: boolean; reducedMotion: boolean }) {
  return (
    <div style={{ flex: 1, padding: '10px 12px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={sectionLabelStyle}>GLOBAL NETWORK MONITOR</div>
      <svg
        viewBox="0 0 100 60"
        style={{ width: '100%', flex: 1, maxHeight: 240 }}
        aria-label="Global network activity visualization"
        role="img"
      >
        <defs>
          <pattern id="wgrid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(0,217,255,0.04)" strokeWidth="0.25" />
          </pattern>
        </defs>

        {/* Background */}
        <rect width="100" height="60" fill="rgba(0,8,18,0.5)" rx="1" />
        <rect width="100" height="60" fill="url(#wgrid)" />

        {/* Edges */}
        {EDGES.map(([a, b]) => {
          const na = NODE_MAP.get(a)
          const nb = NODE_MAP.get(b)
          if (!na || !nb) return null
          const lit = inspected && (na.highlight || nb.highlight)
          return (
            <line
              key={`${a}-${b}`}
              x1={na.cx} y1={na.cy}
              x2={nb.cx} y2={nb.cy}
              stroke={lit ? 'rgba(0,255,135,0.3)' : 'rgba(0,217,255,0.12)'}
              strokeWidth={lit ? 0.5 : 0.25}
              strokeDasharray={lit ? '2 1' : undefined}
            />
          )
        })}

        {/* Nodes */}
        {NODES.map(node => {
          const active = inspected && node.highlight
          const fill   = active ? '#00FF87' : '#00D9FF'
          const glow   = active ? 'rgba(0,255,135,0.2)' : 'rgba(0,217,255,0.12)'
          const pulseDur = active ? '1.2s' : '2.8s'

          return (
            <g key={node.id}>
              {/* Pulse ring — hidden when reducedMotion is on */}
              {!reducedMotion && (
                <circle cx={node.cx} cy={node.cy} r="2" fill="none" stroke={fill} strokeWidth="0.3">
                  <animate attributeName="r"       values="2;4.5;2"     dur={pulseDur} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0;0.6"   dur={pulseDur} repeatCount="indefinite" />
                </circle>
              )}
              {/* Glow halo */}
              <circle cx={node.cx} cy={node.cy} r="2.2" fill={glow} />
              {/* Core dot */}
              <circle cx={node.cx} cy={node.cy} r="1.1" fill={fill} />
              {/* Region label */}
              <text
                x={node.cx} y={node.cy + 4.5}
                textAnchor="middle"
                fontSize="2.8"
                fill={active ? 'rgba(0,255,135,0.55)' : 'rgba(0,217,255,0.35)'}
                fontFamily='"Courier New", monospace'
              >
                {node.id}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function EventLog({ phase }: { phase: WorldPhase }) {
  return (
    <div style={eventLogStyle}>
      <div style={sectionLabelStyle}>EVENT LOG</div>
      {LOG_ENTRIES.map(e => (
        <div key={e.time} style={{ marginBottom: 6 }}>
          <div style={{ fontSize: 7, color: 'rgba(0,217,255,0.28)' }}>{e.time}</div>
          <div style={{ fontSize: 9, color: 'rgba(0,217,255,0.55)' }}>{e.msg}</div>
        </div>
      ))}
      {phase === 'anomaly' && (
        <div style={{ marginBottom: 6 }}>
          <div style={{ fontSize: 7, color: 'rgba(255,71,87,0.45)' }}>14:32:49</div>
          <div style={{ fontSize: 9, color: '#FF4757' }}>ANOMALY DETECTED !</div>
        </div>
      )}
    </div>
  )
}

interface DialoguePanelProps {
  currentLine:          DialogueLine | null
  state:                DialogueState
  skipTypewriter:       boolean
  onTypewriterComplete: () => void
  phase:                WorldPhase
  onInspect:            () => void
  onAdvance:            () => void
}

function DialoguePanel({
  currentLine,
  state,
  skipTypewriter,
  onTypewriterComplete,
  phase,
  onInspect,
  onAdvance,
}: DialoguePanelProps) {
  const isComplete  = state.displayState === 'complete'
  const isTyping    = state.displayState === 'typing'
  const showInspect = phase === 'ready'
  const showAdvance = (phase === 'intro' || phase === 'inspecting') && !isComplete

  return (
    <div style={dialoguePanelStyle}>
      {/* Speaker bar */}
      <div style={speakerBarStyle}>
        <span style={{ color: '#00D9FF', letterSpacing: '0.12em' }}>ARIA</span>
        <span style={{ fontSize: 9, letterSpacing: '0.15em', color: 'rgba(0,255,135,0.5)', display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ color: '#00FF87' }}>●</span>ONLINE
        </span>
      </div>

      <div style={thinRuleStyle} />

      {/* Dialogue text — pointer + touch tap both advance the dialogue */}
      <div
        onPointerDown={showAdvance ? onAdvance : undefined}
        style={{
          padding:     '14px 16px',
          minHeight:   52,
          fontSize:    13,
          lineHeight:  1.7,
          color:       '#D0EEF8',
          cursor:      showAdvance ? 'pointer' : 'default',
          touchAction: showAdvance ? 'manipulation' : 'auto',
        }}
        aria-live="polite"
        aria-atomic="true"
      >
        {!isComplete && currentLine && (
          <Typewriter
            text={currentLine.text}
            charsPerSecond={44}
            skipAnimation={skipTypewriter}
            onComplete={onTypewriterComplete}
          />
        )}
        {isComplete && (
          <span style={{ color: 'rgba(0,217,255,0.3)' }}>—</span>
        )}
      </div>

      <div style={thinRuleStyle} />

      {/* Action footer */}
      <div style={actionFooterStyle}>
        {showInspect && (
          <button
            onClick={onInspect}
            autoFocus
            style={inspectBtnStyle}
            aria-label="Run diagnostic: Inspect Global Network"
          >
            ▶&nbsp;&nbsp;INSPECT GLOBAL NETWORK
          </button>
        )}
        {showAdvance && !isTyping && (
          <span style={{ fontSize: 9, color: 'rgba(0,217,255,0.32)', letterSpacing: '0.12em' }}>
            CLICK OR PRESS SPACE TO ADVANCE
          </span>
        )}
        {!showInspect && !showAdvance && <span />}
      </div>
    </div>
  )
}

function AnomalyOverlay({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={anomalyWrapStyle}
      aria-live="assertive"
      aria-atomic="true"
    >
      <motion.div
        animate={reducedMotion ? { opacity: 1 } : { opacity: [1, 0.25, 1] }}
        transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
        style={anomalyTextStyle}
        role="alert"
      >
        INCOMING ANOMALY DETECTED
      </motion.div>
    </motion.div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function WorldScene({ onComplete }: SceneProps) {
  const {
    state, currentLine, skipTypewriter, onTypewriterComplete,
    play, advance,
  } = useDialogue()

  const audio             = useAudio()
  const { reducedMotion } = useAccessibility()

  const [phase,            setPhase]           = useState<WorldPhase>('intro')
  const [networkInspected, setNetworkInspected] = useState(false)

  // Start ambient audio + intro dialogue on mount; stop ambient on unmount
  useEffect(() => {
    try { audio.play('m01-ambient') } catch { /* placeholder audio */ }
    play(INTRO_SCRIPT)
    return () => { try { audio.stop('m01-ambient') } catch { /* no-op */ } }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Dialogue-complete → phase transition
  useEffect(() => {
    if (state.displayState !== 'complete') return
    if (phase === 'intro')      setPhase('ready')
    if (phase === 'inspecting') setPhase('anomaly')
  }, [state.displayState, phase])

  // Anomaly → play SFX then navigate to hospital placeholder
  useEffect(() => {
    if (phase !== 'anomaly') return
    try { audio.play('m01-transition') } catch { /* placeholder audio */ }
    const t = setTimeout(onComplete, 2800)
    return () => clearTimeout(t)
  }, [phase, audio, onComplete])

  const handleInspect = useCallback(() => {
    if (phase !== 'ready') return
    setNetworkInspected(true)
    setPhase('inspecting')
    try { audio.play('m01-ui-click') } catch { /* placeholder audio */ }
    play(INSPECT_SCRIPT)
  }, [phase, audio, play])

  // Keyboard: Space/Enter advances dialogue or triggers the inspect action
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== ' ' && e.key !== 'Enter') return
      e.preventDefault()
      if (phase === 'intro' || phase === 'inspecting') advance()
      else if (phase === 'ready') handleInspect()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [phase, advance, handleInspect])

  return (
    <div style={wrapStyle} aria-label="SENTINEL Operations Center">
      <div style={scanlineStyle} aria-hidden="true" />

      <div style={layoutStyle}>
        <TopBar phase={phase} />

        <div style={mainAreaStyle}>
          <StatusPanel inspected={networkInspected} />
          <NetworkMap   inspected={networkInspected} reducedMotion={reducedMotion} />
          <EventLog     phase={phase} />
        </div>

        <DialoguePanel
          currentLine={currentLine}
          state={state}
          skipTypewriter={skipTypewriter}
          onTypewriterComplete={onTypewriterComplete}
          phase={phase}
          onInspect={handleInspect}
          onAdvance={advance}
        />
      </div>

      <AnimatePresence>
        {phase === 'anomaly' && (
          <AnomalyOverlay key="anomaly" reducedMotion={reducedMotion} />
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Styles ────────────────────────────────────────────────────────────────────

const wrapStyle: CSSProperties = {
  position:  'fixed',
  inset:     0,
  background:'#08080F',
  fontFamily:'"Courier New", monospace',
  overflow:  'hidden',
}

const scanlineStyle: CSSProperties = {
  position:      'fixed',
  inset:         0,
  background:    'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.06) 2px,rgba(0,0,0,0.06) 4px)',
  pointerEvents: 'none',
  zIndex:        1,
}

const layoutStyle: CSSProperties = {
  position:      'relative',
  zIndex:        2,
  display:       'flex',
  flexDirection: 'column',
  height:        '100%',
}

const topBarStyle: CSSProperties = {
  display:        'flex',
  alignItems:     'center',
  justifyContent: 'space-between',
  padding:        '7px 18px',
  borderBottom:   '1px solid rgba(0,217,255,0.1)',
  flexShrink:     0,
}

const mainAreaStyle: CSSProperties = {
  display:  'flex',
  flex:     1,
  overflow: 'hidden',
  minHeight: 0,
}

const statusPanelStyle: CSSProperties = {
  width:       160,
  flexShrink:  0,
  padding:     '12px 14px',
  borderRight: '1px solid rgba(0,217,255,0.07)',
  overflowY:   'auto',
}

const eventLogStyle: CSSProperties = {
  width:      152,
  flexShrink: 0,
  padding:    '12px 14px',
  borderLeft: '1px solid rgba(0,217,255,0.07)',
  overflowY:  'auto',
}

const sectionLabelStyle: CSSProperties = {
  fontSize:      8,
  letterSpacing: '0.2em',
  color:         'rgba(0,217,255,0.28)',
  marginBottom:  8,
  textTransform: 'uppercase' as const,
}

const dialoguePanelStyle: CSSProperties = {
  borderTop:  '1px solid rgba(0,217,255,0.1)',
  flexShrink: 0,
}

const speakerBarStyle: CSSProperties = {
  display:        'flex',
  alignItems:     'center',
  justifyContent: 'space-between',
  padding:        '8px 16px',
  fontSize:       11,
  letterSpacing:  '0.12em',
}

const thinRuleStyle: CSSProperties = {
  height:     1,
  background: 'rgba(0,217,255,0.09)',
}

const actionFooterStyle: CSSProperties = {
  display:     'flex',
  alignItems:  'center',
  padding:     '8px 16px',
  minHeight:   38,
}

const inspectBtnStyle: CSSProperties = {
  background:    'transparent',
  border:        '1px solid rgba(0,217,255,0.4)',
  color:         '#00D9FF',
  fontFamily:    '"Courier New", monospace',
  fontSize:      11,
  letterSpacing: '0.1em',
  padding:       '6px 16px',
  cursor:        'pointer',
  outline:       'none',
}

const anomalyWrapStyle: CSSProperties = {
  position:       'fixed',
  inset:          0,
  display:        'flex',
  alignItems:     'center',
  justifyContent: 'center',
  background:     'rgba(255,71,87,0.07)',
  zIndex:         50,
  pointerEvents:  'none',
}

const anomalyTextStyle: CSSProperties = {
  fontSize:      20,
  letterSpacing: '0.22em',
  color:         '#FF4757',
  textAlign:     'center',
}
