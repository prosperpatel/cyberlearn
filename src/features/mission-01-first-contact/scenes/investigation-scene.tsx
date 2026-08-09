import { type CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Typewriter, useDialogue } from '@/engine/dialogue'
import { useAudio }               from '@/engine/audio'
import { useAccessibility }       from '@/engine/accessibility'
import { engineBus }              from '@/engine/event-bus'
import type { DialogueScript } from '@/engine/dialogue'
import type { SceneProps }     from '@/engine/scene'
import investigationRaw from '../dialogue/investigation.json'

// ── Dialogue scripts ──────────────────────────────────────────────────────────

interface InvestigationDialogues {
  findings: DialogueScript
  reveal:   DialogueScript
}

const { findings: FINDINGS_SCRIPT, reveal: REVEAL_SCRIPT } =
  investigationRaw as unknown as InvestigationDialogues

// ── Evidence card data ────────────────────────────────────────────────────────

interface EvidenceCard {
  id:      string
  label:   string
  metric:  string
  detail:  string
  note:    string
  color:   string
}

const EVIDENCE_CARDS: readonly EvidenceCard[] = [
  {
    id:     'traffic',
    label:  'INTERNET GATEWAY · TRAFFIC',
    metric: '14× BASELINE',
    detail: 'OUTBOUND · 08:12–08:19 UTC',
    note:   'Traffic origin: multiple internal hosts, simultaneous. No single external destination — data is being pushed out by something already inside the network.',
    color:  '#FF4757',
  },
  {
    id:     'encryption',
    label:  'FILE SYSTEM · ENCRYPTION EVENTS',
    metric: 'FILES ENCRYPTED',
    detail: 'EHR + RADIOLOGY + LAB · WITHIN 4 MIN',
    note:   'Mass file rename events across three unrelated departments in a near-simultaneous window. Original extensions replaced with unknown extension .enc7x.',
    color:  '#FF4757',
  },
  {
    id:     'lockout',
    label:  'STAFF ACCESS · AUTHENTICATION',
    metric: 'LOCKED OUT',
    detail: '47 ACCOUNTS · SIMULTANEOUS',
    note:   '47 staff credentials invalidated at 08:17:44 UTC — the same timestamp as peak outbound traffic. No password change requests originated from the accounts.',
    color:  '#FF6B35',
  },
]

// ── Answer choices ────────────────────────────────────────────────────────────

interface AnswerChoice {
  id:       string
  label:    string
  sublabel: string
  correct:  boolean
  feedback: string
}

const ANSWERS: readonly AnswerChoice[] = [
  {
    id:       'ddos',
    label:    'A',
    sublabel: 'Distributed Denial of Service (DDoS)',
    correct:  false,
    feedback: 'A DDoS attack floods a system with inbound traffic to deny access from outside — it does not encrypt files or lock staff accounts from within the network.',
  },
  {
    id:       'ransomware',
    label:    'B',
    sublabel: 'Ransomware',
    correct:  true,
    feedback: '',
  },
  {
    id:       'phishing',
    label:    'C',
    sublabel: 'Phishing Campaign',
    correct:  false,
    feedback: 'Phishing is a delivery mechanism — it tricks users into handing over credentials. What you observed is the aftermath: encryption, lockout, and C2 exfiltration.',
  },
]

// ── Phase ─────────────────────────────────────────────────────────────────────

type InvestigationPhase = 'findings' | 'identifying' | 'reveal' | 'complete'

// ── Sub-components ────────────────────────────────────────────────────────────

function TopBar({ phase }: { phase: InvestigationPhase }) {
  const isReveal = phase === 'reveal' || phase === 'complete'
  return (
    <div style={topBarStyle}>
      <span style={{ fontSize: 10, letterSpacing: '0.18em', color: 'rgba(0,217,255,0.35)' }}>
        SENTINEL&nbsp;&nbsp;·&nbsp;&nbsp;INCIDENT ANALYSIS
      </span>
      <span style={{
        fontSize: 10, letterSpacing: '0.15em',
        color: isReveal ? '#00FF87' : 'rgba(0,255,135,0.55)',
        display: 'flex', alignItems: 'center', gap: 5,
      }}>
        <span style={{ color: isReveal ? '#00FF87' : '#00FF87' }}>●</span>
        {isReveal ? 'RANSOMWARE IDENTIFIED' : 'ANALYSING'}
      </span>
    </div>
  )
}

interface EvidenceCardProps {
  card:          EvidenceCard
  index:         number
  dimmed:        boolean
  confirmed:     boolean
  reducedMotion: boolean
}

function EvidenceCardView({ card, index, dimmed, confirmed, reducedMotion }: EvidenceCardProps) {
  const cardContent = (
    <div style={{
      ...evidenceCardStyle,
      opacity:     dimmed ? 0.55 : 1,
      transition:  'opacity 0.5s ease',
      borderColor: confirmed ? 'rgba(0,255,135,0.2)' : 'rgba(0,217,255,0.12)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontSize: 9, letterSpacing: '0.18em', color: 'rgba(0,217,255,0.35)' }}>
          {card.label}
        </span>
        {confirmed && (
          <span style={{ fontSize: 10, color: 'rgba(0,255,135,0.6)' }}>✓</span>
        )}
      </div>
      <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '0.06em', color: card.color, marginBottom: 4 }}>
        {card.metric}
      </div>
      <div style={{ fontSize: 9, letterSpacing: '0.14em', color: 'rgba(0,217,255,0.4)', marginBottom: 12 }}>
        {card.detail}
      </div>
      <div style={{ fontSize: 12, lineHeight: 1.7, color: 'rgba(208,238,248,0.65)' }}>
        {card.note}
      </div>
    </div>
  )

  if (reducedMotion) return cardContent

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.3 }}
    >
      {cardContent}
    </motion.div>
  )
}

interface ClassifyPanelProps {
  selectedId:    string | null
  wrongId:       string | null
  wrongFeedback: string | null
  reducedMotion: boolean
  onSelect:      (id: string) => void
}

function ClassifyPanel({ selectedId, wrongId, wrongFeedback, reducedMotion, onSelect }: ClassifyPanelProps) {
  const panel = (
    <div style={classifyPanelStyle}>
      <div style={{ fontSize: 10, letterSpacing: '0.18em', color: 'rgba(0,217,255,0.28)', marginBottom: 14 }}>
        CLASSIFY THE ATTACK
      </div>
      <div style={{ fontSize: 15, lineHeight: 1.65, color: '#D0EEF8', marginBottom: 20 }}>
        Based on this evidence — what type of attack struck St. Elowen Medical Center?
      </div>

      {ANSWERS.map(a => {
        const isWrong    = wrongId === a.id
        const isSelected = selectedId === a.id && a.correct
        return (
          <button
            key={a.id}
            onClick={() => onSelect(a.id)}
            style={{
              ...choiceRowStyle,
              borderColor: isWrong
                ? 'rgba(255,71,87,0.5)'
                : isSelected
                ? 'rgba(0,255,135,0.5)'
                : 'rgba(0,217,255,0.15)',
              background: isWrong
                ? 'rgba(255,71,87,0.06)'
                : isSelected
                ? 'rgba(0,255,135,0.05)'
                : 'rgba(0,8,18,0.4)',
            }}
            aria-label={`${a.label}: ${a.sublabel}`}
          >
            <span style={{ fontSize: 11, color: 'rgba(0,217,255,0.45)', marginRight: 14, flexShrink: 0 }}>
              {a.label}
            </span>
            <span style={{ fontSize: 14, color: '#D0EEF8', letterSpacing: '0.04em' }}>
              {a.sublabel}
            </span>
          </button>
        )
      })}

      {/* Wrong-answer feedback */}
      <AnimatePresence>
        {wrongFeedback && (
          <motion.div
            key="feedback"
            initial={reducedMotion ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={feedbackStyle}
          >
            {wrongFeedback}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  if (reducedMotion) return panel

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {panel}
    </motion.div>
  )
}

function RevealPanel() {
  return (
    <div style={revealPanelStyle}>
      <div style={{ fontSize: 10, letterSpacing: '0.18em', color: 'rgba(0,217,255,0.28)', marginBottom: 14 }}>
        ASSESSMENT CONFIRMED
      </div>

      {ANSWERS.map(a => {
        const isCorrect  = a.correct
        return (
          <div
            key={a.id}
            style={{
              ...choiceRowStyle,
              cursor:      'default',
              borderColor: isCorrect ? 'rgba(0,217,255,0.4)' : 'rgba(0,217,255,0.08)',
              background:  isCorrect ? 'rgba(0,217,255,0.06)' : 'rgba(0,8,18,0.2)',
              opacity:     isCorrect ? 1 : 0.35,
              marginBottom: isCorrect ? 4 : 8,
            }}
            aria-label={a.sublabel}
          >
            <span style={{ fontSize: 11, color: isCorrect ? '#00D9FF' : 'rgba(0,217,255,0.3)', marginRight: 14, flexShrink: 0 }}>
              {a.label}
            </span>
            <span style={{ fontSize: 14, color: isCorrect ? '#D0EEF8' : 'rgba(208,238,248,0.4)', letterSpacing: '0.04em' }}>
              {a.sublabel}
            </span>
          </div>
        )
      })}

      {/* Correct identification label */}
      <div style={{ fontSize: 11, color: '#00FF87', letterSpacing: '0.12em', marginTop: 2, paddingLeft: 2 }}>
        ✓ CORRECT IDENTIFICATION
      </div>
    </div>
  )
}

interface DialoguePanelProps {
  currentLine:          ReturnType<typeof useDialogue>['currentLine']
  state:                ReturnType<typeof useDialogue>['state']
  skipTypewriter:       boolean
  onTypewriterComplete: () => void
  phase:                InvestigationPhase
  onAdvance:            () => void
}

function DialoguePanel({
  currentLine,
  state,
  skipTypewriter,
  onTypewriterComplete,
  phase,
  onAdvance,
}: DialoguePanelProps) {
  const isComplete  = state.displayState === 'complete'
  const isTyping    = state.displayState === 'typing'
  const showActive  = phase === 'findings' || phase === 'reveal'
  const canAdvance  = showActive && !isComplete

  return (
    <div style={dialoguePanelStyle}>
      <div style={speakerBarStyle}>
        <span style={{ color: '#00D9FF', letterSpacing: '0.12em' }}>ARIA</span>
        <span style={{ fontSize: 11, letterSpacing: '0.15em', color: 'rgba(0,255,135,0.5)', display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ color: '#00FF87' }}>●</span>ONLINE
        </span>
      </div>

      <div style={thinRuleStyle} />

      <div
        onPointerDown={canAdvance ? onAdvance : undefined}
        style={{
          padding:     '16px 20px',
          minHeight:   60,
          fontSize:    16,
          lineHeight:  1.7,
          color:       '#D0EEF8',
          cursor:      canAdvance ? 'pointer' : 'default',
          touchAction: canAdvance ? 'manipulation' : 'auto',
        }}
        aria-live="polite"
        aria-atomic="true"
      >
        {phase === 'identifying' && (
          <span style={{ fontSize: 13, color: 'rgba(0,217,255,0.4)', letterSpacing: '0.06em' }}>
            Make your assessment above.
          </span>
        )}
        {phase === 'complete' && (
          <span style={{ color: 'rgba(0,217,255,0.25)' }}>—</span>
        )}
        {showActive && !isComplete && currentLine && (
          <Typewriter
            text={currentLine.text}
            charsPerSecond={44}
            skipAnimation={skipTypewriter}
            onComplete={onTypewriterComplete}
          />
        )}
        {showActive && isComplete && (
          <span style={{ color: 'rgba(0,217,255,0.25)' }}>—</span>
        )}
      </div>

      <div style={thinRuleStyle} />

      <div style={actionFooterStyle}>
        {phase === 'complete' && (
          <span style={{ fontSize: 11, letterSpacing: '0.12em', color: 'rgba(0,255,135,0.4)' }}>
            MISSION 01 COMPLETE — LOGGING RESULTS…
          </span>
        )}
        {canAdvance && !isTyping && (
          <span style={{ fontSize: 11, color: 'rgba(0,217,255,0.32)', letterSpacing: '0.12em' }}>
            CLICK OR PRESS SPACE TO ADVANCE
          </span>
        )}
        {!canAdvance && phase !== 'complete' && <span />}
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function InvestigationScene({ onComplete }: SceneProps) {
  const {
    state, currentLine, skipTypewriter, onTypewriterComplete,
    play, advance,
  } = useDialogue()

  const audio             = useAudio()
  const { reducedMotion } = useAccessibility()

  const [phase,        setPhase]       = useState<InvestigationPhase>('findings')
  const [selectedId,   setSelectedId]  = useState<string | null>(null)
  const [wrongId,      setWrongId]     = useState<string | null>(null)
  const [wrongFeedback,setWrongFeedback] = useState<string | null>(null)
  const [isNarrow,     setIsNarrow]    = useState(() => window.innerWidth < 640)

  const identifyingTriggeredRef = useRef(false)
  const completeTriggeredRef    = useRef(false)
  const wrongTimerRef           = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Start ambient + findings dialogue on mount
  useEffect(() => {
    try { audio.play('m01-ambient') } catch { /* placeholder audio */ }
    play(FINDINGS_SCRIPT)
    return () => { try { audio.stop('m01-ambient') } catch { /* no-op */ } }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Responsive narrow-view detection
  useEffect(() => {
    const handler = () => setIsNarrow(window.innerWidth < 640)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  // Dialogue complete → phase transitions
  useEffect(() => {
    if (state.displayState !== 'complete') return

    if (phase === 'findings' && !identifyingTriggeredRef.current) {
      identifyingTriggeredRef.current = true
      setPhase('identifying')
    }

    if (phase === 'reveal' && !completeTriggeredRef.current) {
      completeTriggeredRef.current = true
      setPhase('complete')
    }
  }, [state.displayState, phase])

  // complete → emit mission:complete + call onComplete
  useEffect(() => {
    if (phase !== 'complete') return
    const t = setTimeout(() => {
      engineBus.emit('mission:complete', { missionId: 'mission-01', xpEarned: 0 })
      onComplete()
    }, 1800)
    return () => clearTimeout(t)
  }, [phase, onComplete])

  const handleSelect = useCallback((id: string) => {
    if (phase !== 'identifying') return

    const choice = ANSWERS.find(a => a.id === id)
    if (!choice) return

    if (choice.correct) {
      setSelectedId(id)
      // Clear any pending wrong timer
      if (wrongTimerRef.current) clearTimeout(wrongTimerRef.current)
      setWrongId(null)
      setWrongFeedback(null)
      try { audio.play('m01-ui-click') } catch { /* no-op */ }
      try { audio.play('m01-transition') } catch { /* no-op */ }
      setPhase('reveal')
      play(REVEAL_SCRIPT)
    } else {
      setWrongId(id)
      setWrongFeedback(choice.feedback)
      try { audio.play('m01-warning-beep') } catch { /* no-op */ }
      // Clear wrong state after 1800ms
      if (wrongTimerRef.current) clearTimeout(wrongTimerRef.current)
      wrongTimerRef.current = setTimeout(() => {
        setWrongId(null)
        setWrongFeedback(null)
      }, 2000)
    }
  }, [phase, audio, play])

  // Cleanup wrong answer timer on unmount
  useEffect(() => {
    return () => {
      if (wrongTimerRef.current) clearTimeout(wrongTimerRef.current)
    }
  }, [])

  // Keyboard: Space/Enter advances dialogue in findings/reveal; disabled during identifying
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== ' ' && e.key !== 'Enter') return
      if (phase === 'findings' || phase === 'reveal') {
        e.preventDefault()
        advance()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [phase, advance])

  const showIdentifying = phase === 'identifying'
  const showReveal      = phase === 'reveal' || phase === 'complete'
  const dimCards        = showIdentifying
  const confirmedCards  = showReveal

  return (
    <div style={wrapStyle} aria-label="Incident Analysis — Investigation">
      <div style={scanlineStyle} aria-hidden="true" />

      <div style={layoutStyle}>
        <TopBar phase={phase} />

        <div style={mainAreaStyle}>
          {/* Evidence cards — visible in all phases */}
          <div style={{
            ...evidenceAreaStyle,
            display: (showIdentifying || showReveal) && isNarrow ? 'none' : 'flex',
          }}>
            <div style={{ fontSize: 10, letterSpacing: '0.18em', color: 'rgba(0,217,255,0.28)', marginBottom: 12 }}>
              EVIDENCE — ST. ELOWEN MEDICAL CENTER
            </div>
            <div style={cardsGridStyle}>
              {EVIDENCE_CARDS.map((card, i) => (
                <EvidenceCardView
                  key={card.id}
                  card={card}
                  index={i}
                  dimmed={dimCards}
                  confirmed={confirmedCards}
                  reducedMotion={reducedMotion}
                />
              ))}
            </div>
          </div>

          {/* Classification / Reveal panel */}
          {showIdentifying && (
            <ClassifyPanel
              selectedId={selectedId}
              wrongId={wrongId}
              wrongFeedback={wrongFeedback}
              reducedMotion={reducedMotion}
              onSelect={handleSelect}
            />
          )}
          {showReveal && (
            <RevealPanel />
          )}
        </div>

        <DialoguePanel
          currentLine={currentLine}
          state={state}
          skipTypewriter={skipTypewriter}
          onTypewriterComplete={onTypewriterComplete}
          phase={phase}
          onAdvance={advance}
        />
      </div>

      {/* Mission complete overlay */}
      <AnimatePresence>
        {phase === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={completeOverlayStyle}
            aria-live="assertive"
            role="status"
          >
            <motion.div
              animate={reducedMotion ? { opacity: 1 } : { opacity: [1, 0.5, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ fontSize: 20, letterSpacing: '0.22em', color: '#00FF87' }}
            >
              MISSION 01 COMPLETE
            </motion.div>
          </motion.div>
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

const evidenceAreaStyle: CSSProperties = {
  flex:        1,
  padding:     '14px 16px',
  overflowY:   'auto',
  flexDirection: 'column',
  minWidth:    0,
}

const cardsGridStyle: CSSProperties = {
  display:             'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap:                 10,
}

const evidenceCardStyle: CSSProperties = {
  border:       '1px solid rgba(0,217,255,0.12)',
  borderRadius: 2,
  background:   'rgba(0,8,18,0.5)',
  padding:      '14px 16px',
}

const classifyPanelStyle: CSSProperties = {
  width:      320,
  flexShrink: 0,
  padding:    '14px 16px',
  borderLeft: '1px solid rgba(0,217,255,0.07)',
  overflowY:  'auto',
}

const revealPanelStyle: CSSProperties = {
  width:      320,
  flexShrink: 0,
  padding:    '14px 16px',
  borderLeft: '1px solid rgba(0,217,255,0.07)',
  overflowY:  'auto',
}

const choiceRowStyle: CSSProperties = {
  display:       'flex',
  alignItems:    'center',
  width:         '100%',
  padding:       '10px 14px',
  marginBottom:  8,
  border:        '1px solid rgba(0,217,255,0.15)',
  borderRadius:  2,
  background:    'rgba(0,8,18,0.4)',
  cursor:        'pointer',
  fontFamily:    '"Courier New", monospace',
  textAlign:     'left' as const,
  transition:    'background 0.25s, border-color 0.25s',
  outline:       'none',
}

const feedbackStyle: CSSProperties = {
  fontSize:    12,
  lineHeight:  1.65,
  color:       'rgba(255,71,87,0.85)',
  padding:     '10px 12px',
  border:      '1px solid rgba(255,71,87,0.2)',
  borderRadius: 2,
  marginTop:   4,
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

const completeOverlayStyle: CSSProperties = {
  position:       'fixed',
  inset:          0,
  display:        'flex',
  alignItems:     'center',
  justifyContent: 'center',
  background:     'rgba(0,255,135,0.04)',
  zIndex:         50,
  pointerEvents:  'none',
}
