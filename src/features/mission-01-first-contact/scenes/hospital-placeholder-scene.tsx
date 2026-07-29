import type { CSSProperties } from 'react'
import type { SceneProps } from '@/engine/scene'

// Placeholder only — Hospital Incident scene not yet implemented.
export function HospitalPlaceholderScene(_: SceneProps) {
  return (
    <div style={wrapStyle} aria-label="Hospital Incident — Coming Soon">
      <div style={scanlineStyle} aria-hidden="true" />

      <div style={contentStyle}>
        <div style={alertTagStyle}>! INCOMING INCIDENT</div>
        <div style={titleStyle}>HOSPITAL INCIDENT</div>
        <div style={subtitleStyle}>SCENE UNDER CONSTRUCTION</div>
        <div style={hintStyle}>Use the ← EXIT button to return to the Hub</div>
      </div>
    </div>
  )
}

const wrapStyle: CSSProperties = {
  position:       'fixed',
  inset:          0,
  background:     '#08080F',
  display:        'flex',
  alignItems:     'center',
  justifyContent: 'center',
  fontFamily:     '"Courier New", monospace',
}

const scanlineStyle: CSSProperties = {
  position:      'fixed',
  inset:         0,
  background:    'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.06) 2px,rgba(0,0,0,0.06) 4px)',
  pointerEvents: 'none',
  zIndex:        1,
}

const contentStyle: CSSProperties = {
  position:  'relative',
  zIndex:    2,
  textAlign: 'center',
}

const alertTagStyle: CSSProperties = {
  fontSize:      10,
  letterSpacing: '0.2em',
  color:         '#FF4757',
  marginBottom:  16,
}

const titleStyle: CSSProperties = {
  fontSize:      28,
  fontWeight:    700,
  letterSpacing: '0.12em',
  color:         '#FF4757',
  marginBottom:  8,
}

const subtitleStyle: CSSProperties = {
  fontSize:      11,
  letterSpacing: '0.18em',
  color:         'rgba(255,71,87,0.45)',
  marginBottom:  32,
}

const hintStyle: CSSProperties = {
  fontSize:      10,
  letterSpacing: '0.1em',
  color:         'rgba(0,217,255,0.3)',
}
