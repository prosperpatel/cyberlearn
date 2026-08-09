import { type CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Typewriter, useDialogue } from '@/engine/dialogue'
import { useAudio }               from '@/engine/audio'
import { useAccessibility }       from '@/engine/accessibility'
import type { DialogueState, DialogueLine, DialogueScript } from '@/engine/dialogue'
import type { SceneProps } from '@/engine/scene'
import hospitalRaw from '../dialogue/hospital.json'

// ── Dialogue scripts ──────────────────────────────────────────────────────────

interface HospitalDialogues {
  intro:    DialogueScript
  conclude: DialogueScript
}

const { intro: INTRO_SCRIPT, conclude: CONCLUDE_SCRIPT } =
  hospitalRaw as unknown as HospitalDialogues

// ── Widget data ───────────────────────────────────────────────────────────────

type WidgetStatus = 'green' | 'yellow' | 'red'

interface WidgetDef {
  id:          string
  label:       string
  shortLabel:  string
  inspectText: string
}

const WIDGETS: readonly WidgetDef[] = [
  {
    id:          'network',
    label:       'Network Status',
    shortLabel:  'NETWORK',
    inspectText: 'Multiple internal segments experiencing latency spikes. Unusual broadcast traffic detected across subnets.',
  },
  {
    id:          'ed',
    label:       'Emergency Dept',
    shortLabel:  'EMERG DEPT',
    inspectText: 'Receiving delayed responses from patient monitoring systems. Average response time elevated to 8.3 seconds.',
  },
  {
    id:          'radiology',
    label:       'Radiology',
    shortLabel:  'RADIOLOGY',
    inspectText: 'Large increase in encrypted traffic observed. Imaging transfer queue backed up. PACS system unresponsive.',
  },
  {
    id:          'lab',
    label:       'Laboratory',
    shortLabel:  'LABORATORY',
    inspectText: 'Communication timeout to central lab servers. Sample processing log inaccessible. Manual logging initiated.',
  },
  {
    id:          'ehr',
    label:       'EHR System',
    shortLabel:  'EHR',
    inspectText: 'Electronic health records system responding slowly. Several staff unable to access patient files.',
  },
  {
    id:          'pharmacy',
    label:       'Pharmacy',
    shortLabel:  'PHARMACY',
    inspectText: 'Automated dispensing system reporting connectivity errors. Manual override protocols activated.',
  },
  {
    id:          'gateway',
    label:       'Internet Gateway',
    shortLabel:  'GATEWAY',
    inspectText: 'Outbound traffic volume is 14× above baseline. Origin traces to multiple internal hosts simultaneously.',
  },
]

const INITIAL_STATUSES: Record<string, WidgetStatus> = {
  network:   'green',
  ed:        'green',
  radiology: 'green',
  lab:       'green',
  ehr:       'green',
  pharmacy:  'green',
  gateway:   'green',
}

// ── Phase ─────────────────────────────────────────────────────────────────────

type HospitalPhase = 'briefing' | 'observing' | 'concluding' | 'transitioning'

// ── Alert log ─────────────────────────────────────────────────────────────────

interface AlertEntry {
  time:  string
  msg:   string
  level: WidgetStatus
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function statusColor(s: WidgetStatus): string {
  return s === 'green' ? '#00FF87' : s === 'yellow' ? '#FF6B35' : '#FF4757'
}

function statusLabel(s: WidgetStatus): string {
  return s === 'green' ? 'NOMINAL' : s === 'yellow' ? 'DEGRADED' : 'CRITICAL'
}

// ── Sub-components ────────────────────────────────────────────────────────────

function TopBar({ criticalCount }: { criticalCount: number }) {
  const isAlert = criticalCount > 0
  return (
    <div style={topBarStyle}>
      <span style={{ fontSize: 10, letterSpacing: '0.18em', color: 'rgba(0,217,255,0.35)' }}>
        SENTINEL&nbsp;&nbsp;·&nbsp;&nbsp;HOSPITAL INCIDENT RESPONSE
      </span>
      <span style={{
        fontSize: 10, letterSpacing: '0.15em',
        color: isAlert ? '#FF4757' : 'rgba(0,255,135,0.55)',
        display: 'flex', alignItems: 'center', gap: 5,
      }}>
        <span style={{ color: isAlert ? '#FF4757' : '#00FF87' }}>●</span>
        {isAlert ? `${criticalCount} CRITICAL` : 'MONITORING'}
      </span>
    </div>
  )
}

interface WidgetCardProps {
  def:           WidgetDef
  status:        WidgetStatus
  isSelected:    boolean
  isInspected:   boolean
  canInspect:    boolean
  reducedMotion: boolean
  onClick:       () => void
}

function WidgetCard({
  def, status, isSelected, isInspected, canInspect, reducedMotion, onClick,
}: WidgetCardProps) {
  const sc    = statusColor(status)
  const sl    = statusLabel(status)
  const isBad = status !== 'green'

  const borderColor = isSelected
    ? 'rgba(0,217,255,0.35)'
    : isBad
    ? `${sc}50`
    : 'rgba(0,217,255,0.1)'

  const bgColor = isSelected
    ? 'rgba(0,217,255,0.05)'
    : isBad
    ? (status === 'red' ? 'rgba(255,71,87,0.05)' : 'rgba(255,107,53,0.04)')
    : 'rgba(0,8,18,0.4)'

  return (
    <button
      onClick={onClick}
      disabled={!canInspect}
      style={{
        background:  bgColor,
        border:      `1px solid ${borderColor}`,
        padding:     '12px 14px',
        cursor:      canInspect ? 'pointer' : 'default',
        textAlign:   'left' as const,
        fontFamily:  '"Courier New", monospace',
        width:       '100%',
        transition:  'background 0.4s, border-color 0.4s',
      }}
      aria-label={`${def.label}: ${sl}${canInspect ? '. Click to inspect.' : ''}`}
      aria-pressed={isSelected}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 11, letterSpacing: '0.12em', color: 'rgba(0,217,255,0.55)' }}>
          {def.shortLabel}
        </span>
        {isInspected && (
          <span style={{ fontSize: 10, letterSpacing: '0.1em', color: 'rgba(0,255,135,0.6)' }}>✓</span>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        {(!reducedMotion && isBad) ? (
          <motion.span
            style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: sc, flexShrink: 0 }}
            animate={{ opacity: [1, 0.25, 1] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
          />
        ) : (
          <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: sc, flexShrink: 0 }} />
        )}
        <span style={{ fontSize: 11, color: sc, letterSpacing: '0.1em' }}>{sl}</span>
      </div>
    </button>
  )
}

interface InspectPanelProps {
  widget: WidgetDef | null
  status: WidgetStatus | null
  phase:  HospitalPhase
  alerts: AlertEntry[]
}

function InspectPanel({ widget, status, phase, alerts }: InspectPanelProps) {
  return (
    <div style={inspectPanelStyle}>
      <div style={sectionLabelStyle}>SYSTEM INSPECTION</div>

      {widget && status ? (
        <>
          <div style={{ fontSize: 13, letterSpacing: '0.12em', color: '#00D9FF', marginBottom: 10, marginTop: 8 }}>
            {widget.label.toUpperCase()}
          </div>
          <div style={{
            fontSize:    14,
            lineHeight:  1.75,
            color:       'rgba(208,238,248,0.8)',
            borderTop:   '1px solid rgba(0,217,255,0.08)',
            paddingTop:  10,
            marginBottom: 12,
          }}>
            {widget.inspectText}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: statusColor(status),
              display: 'inline-block', flexShrink: 0,
            }} />
            <span style={{ fontSize: 10, color: statusColor(status), letterSpacing: '0.14em' }}>
              {statusLabel(status)}
            </span>
          </div>
          <div style={{ fontSize: 9, letterSpacing: '0.12em', color: 'rgba(0,217,255,0.3)' }}>
            OBSERVATION LOGGED
          </div>
        </>
      ) : (
        <div style={{ fontSize: 11, color: 'rgba(0,217,255,0.25)', lineHeight: 1.75, marginTop: 8 }}>
          {phase === 'briefing'
            ? 'Awaiting system access...'
            : 'Select a system widget to inspect it.'}
        </div>
      )}

      {alerts.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <div style={{ ...sectionLabelStyle, marginBottom: 6 }}>ALERT LOG</div>
          <div style={{ maxHeight: 100, overflowY: 'auto' }}>
            {alerts.map(a => (
              <div key={a.time} style={{ marginBottom: 7 }}>
                <div style={{ fontSize: 9, color: 'rgba(0,217,255,0.28)' }}>{a.time}</div>
                <div style={{ fontSize: 11, color: a.level === 'red' ? '#FF4757' : '#FF6B35' }}>
                  {a.msg}
                </div>
              </div>
            ))}
          </div>
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
  phase:                HospitalPhase
  inspectedCount:       number
  onAdvance:            () => void
}

function DialoguePanel({
  currentLine,
  state,
  skipTypewriter,
  onTypewriterComplete,
  phase,
  inspectedCount,
  onAdvance,
}: DialoguePanelProps) {
  const isComplete   = state.displayState === 'complete'
  const isTyping     = state.displayState === 'typing'
  const showDialogue = phase === 'briefing' || phase === 'concluding'
  const showProgress = phase === 'observing'
  const canAdvance   = showDialogue && !isComplete

  return (
    <div style={dialoguePanelStyle}>
      <div style={speakerBarStyle}>
        <span style={{ color: '#00D9FF', letterSpacing: '0.12em' }}>ARIA</span>
        <span style={{
          fontSize: 11, letterSpacing: '0.15em',
          color: 'rgba(0,255,135,0.5)',
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <span style={{ color: '#00FF87' }}>●</span>ONLINE
        </span>
      </div>

      <div style={thinRuleStyle} />

      <div
        onClick={canAdvance ? onAdvance : undefined}
        style={{
          padding:    '16px 20px',
          minHeight:  60,
          fontSize:   16,
          lineHeight: 1.7,
          color:      '#D0EEF8',
          cursor:     canAdvance ? 'pointer' : 'default',
        }}
        aria-live="polite"
        aria-atomic="true"
      >
        {showDialogue && !isComplete && currentLine && (
          <Typewriter
            text={currentLine.text}
            charsPerSecond={44}
            skipAnimation={skipTypewriter}
            onComplete={onTypewriterComplete}
          />
        )}
        {showDialogue && isComplete && (
          <span style={{ color: 'rgba(0,217,255,0.3)' }}>—</span>
        )}
        {showProgress && (
          <span style={{ fontSize: 13, color: 'rgba(0,217,255,0.4)', letterSpacing: '0.06em' }}>
            Inspect systems to observe the incident. Click each widget panel.
          </span>
        )}
        {phase === 'transitioning' && (
          <span style={{ color: 'rgba(0,217,255,0.2)' }}>—</span>
        )}
      </div>

      <div style={thinRuleStyle} />

      <div style={actionFooterStyle}>
        {showProgress && (
          <span style={{ fontSize: 11, color: 'rgba(0,217,255,0.35)', letterSpacing: '0.1em' }}>
            SYSTEMS INSPECTED:&nbsp;
            <span style={{ color: inspectedCount >= 3 ? '#00FF87' : '#00D9FF' }}>
              {inspectedCount}&nbsp;/&nbsp;3
            </span>
          </span>
        )}
        {canAdvance && !isTyping && (
          <span style={{ fontSize: 11, color: 'rgba(0,217,255,0.32)', letterSpacing: '0.12em' }}>
            CLICK OR PRESS SPACE TO ADVANCE
          </span>
        )}
        {!showProgress && !canAdvance && <span />}
      </div>
    </div>
  )
}

function AlertOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position:      'fixed',
        inset:         0,
        background:    'rgba(255,71,87,0.04)',
        zIndex:        50,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function HospitalScene({ onComplete }: SceneProps) {
  const {
    state, currentLine, skipTypewriter, onTypewriterComplete,
    play, advance,
  } = useDialogue()

  const audio             = useAudio()
  const { reducedMotion } = useAccessibility()

  const [phase,      setPhase]      = useState<HospitalPhase>('briefing')
  const [statuses,   setStatuses]   = useState<Record<string, WidgetStatus>>(INITIAL_STATUSES)
  const [inspected,  setInspected]  = useState<Set<string>>(new Set())
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [alertLog,   setAlertLog]   = useState<AlertEntry[]>([])

  const concludingTriggeredRef = useRef(false)

  // Start ambient + intro dialogue on mount
  useEffect(() => {
    try { audio.play('m01-ambient') } catch { /* placeholder audio */ }
    play(INTRO_SCRIPT)
    return () => { try { audio.stop('m01-ambient') } catch { /* no-op */ } }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Dialogue complete → phase transition
  useEffect(() => {
    if (state.displayState !== 'complete') return
    if (phase === 'briefing')   setPhase('observing')
    if (phase === 'concluding') setPhase('transitioning')
  }, [state.displayState, phase])

  // Timed status degradation during observing phase
  useEffect(() => {
    if (phase !== 'observing') return

    const t1 = setTimeout(() => {
      try { audio.play('m01-warning-beep') } catch { /* placeholder audio */ }
      setStatuses(s => ({ ...s, ed: 'yellow', radiology: 'yellow', lab: 'yellow' }))
      setAlertLog(prev => [
        ...prev,
        { time: '08:17:11', msg: 'WARN: ED, Radiology, Lab — connectivity degraded', level: 'yellow' },
      ])
    }, 3000)

    const t2 = setTimeout(() => {
      try { audio.play('m01-alert-escalation') } catch { /* placeholder audio */ }
      setStatuses(s => ({ ...s, ed: 'red', gateway: 'red', ehr: 'yellow', pharmacy: 'yellow' }))
      setAlertLog(prev => [
        ...prev,
        { time: '08:17:44', msg: 'CRITICAL: Emergency Dept, Gateway unresponsive', level: 'red' },
      ])
    }, 6500)

    const t3 = setTimeout(() => {
      try { audio.play('m01-warning-beep') } catch { /* placeholder audio */ }
      setStatuses(s => ({ ...s, radiology: 'red', lab: 'red', network: 'yellow' }))
      setAlertLog(prev => [
        ...prev,
        { time: '08:18:19', msg: 'CRITICAL: Radiology, Lab offline — network degraded', level: 'red' },
      ])
    }, 11000)

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [phase, audio])

  // After ≥3 inspected → conclude
  useEffect(() => {
    if (phase !== 'observing') return
    if (inspected.size < 3) return
    if (concludingTriggeredRef.current) return
    concludingTriggeredRef.current = true
    const t = setTimeout(() => {
      setPhase('concluding')
      play(CONCLUDE_SCRIPT)
    }, 1200)
    return () => clearTimeout(t)
  }, [inspected, phase, play])

  // Transitioning → onComplete
  useEffect(() => {
    if (phase !== 'transitioning') return
    const t = setTimeout(onComplete, 1800)
    return () => clearTimeout(t)
  }, [phase, onComplete])

  const handleInspect = useCallback((id: string) => {
    if (phase !== 'observing') return
    setSelectedId(id)
    setInspected(prev => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
    try { audio.play('m01-ui-click') } catch { /* placeholder audio */ }
  }, [phase, audio])

  // Keyboard: Space/Enter advances dialogue during briefing/concluding
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== ' ' && e.key !== 'Enter') return
      if (phase === 'briefing' || phase === 'concluding') {
        e.preventDefault()
        advance()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [phase, advance])

  const selectedWidget = WIDGETS.find(w => w.id === selectedId) ?? null
  const selectedStatus = selectedId ? statuses[selectedId] ?? null : null
  const criticalCount  = Object.values(statuses).filter(s => s === 'red').length

  return (
    <div style={wrapStyle} aria-label="Hospital Incident Response">
      <div style={scanlineStyle} aria-hidden="true" />

      <div style={layoutStyle}>
        <TopBar criticalCount={criticalCount} />

        <div style={mainAreaStyle}>
          {/* Widget grid */}
          <div style={widgetAreaStyle}>
            <div style={sectionLabelStyle}>
              HOSPITAL SYSTEMS&nbsp;&nbsp;·&nbsp;&nbsp;ST. ELOWEN MEDICAL CENTER
            </div>
            <div style={widgetGridStyle}>
              {WIDGETS.map(w => (
                <WidgetCard
                  key={w.id}
                  def={w}
                  status={statuses[w.id] ?? 'green'}
                  isSelected={selectedId === w.id}
                  isInspected={inspected.has(w.id)}
                  canInspect={phase === 'observing'}
                  reducedMotion={reducedMotion}
                  onClick={() => handleInspect(w.id)}
                />
              ))}
            </div>
          </div>

          {/* Inspect panel */}
          <InspectPanel
            widget={selectedWidget}
            status={selectedStatus}
            phase={phase}
            alerts={alertLog}
          />
        </div>

        <DialoguePanel
          currentLine={currentLine}
          state={state}
          skipTypewriter={skipTypewriter}
          onTypewriterComplete={onTypewriterComplete}
          phase={phase}
          inspectedCount={inspected.size}
          onAdvance={advance}
        />
      </div>

      <AnimatePresence>
        {phase === 'concluding' && (
          <AlertOverlay key="alert" />
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
  display:   'flex',
  flex:      1,
  overflow:  'hidden',
  minHeight: 0,
}

const widgetAreaStyle: CSSProperties = {
  flex:      1,
  padding:   '12px 14px',
  overflowY: 'auto',
  minWidth:  0,
}

const widgetGridStyle: CSSProperties = {
  display:             'grid',
  gridTemplateColumns: '1fr 1fr',
  gap:                 10,
  marginTop:           8,
}

const inspectPanelStyle: CSSProperties = {
  width:      300,
  flexShrink: 0,
  padding:    '12px 16px',
  borderLeft: '1px solid rgba(0,217,255,0.07)',
  overflowY:  'auto',
}

const sectionLabelStyle: CSSProperties = {
  fontSize:      10,
  letterSpacing: '0.18em',
  color:         'rgba(0,217,255,0.28)',
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
  padding:        '10px 20px',
  fontSize:       13,
  letterSpacing:  '0.12em',
}

const thinRuleStyle: CSSProperties = {
  height:     1,
  background: 'rgba(0,217,255,0.09)',
}

const actionFooterStyle: CSSProperties = {
  display:    'flex',
  alignItems: 'center',
  padding:    '10px 20px',
  minHeight:  42,
}
