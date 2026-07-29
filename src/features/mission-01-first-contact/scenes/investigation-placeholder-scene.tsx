import type { CSSProperties } from 'react'
import type { SceneProps } from '@/engine/scene'

// Placeholder only — Investigation scene not yet implemented.
export function InvestigationPlaceholderScene(_: SceneProps) {
  return (
    <div style={wrapStyle} aria-label="Investigation — Coming Soon">
      <div style={scanlineStyle} aria-hidden="true" />

      <div style={contentStyle}>
        <div style={tagStyle}>▶ NEXT STEP</div>
        <div style={titleStyle}>INVESTIGATION</div>
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

const tagStyle: CSSProperties = {
  fontSize:      10,
  letterSpacing: '0.2em',
  color:         '#00D9FF',
  marginBottom:  16,
}

const titleStyle: CSSProperties = {
  fontSize:      28,
  fontWeight:    700,
  letterSpacing: '0.12em',
  color:         '#00D9FF',
  marginBottom:  8,
}

const subtitleStyle: CSSProperties = {
  fontSize:      11,
  letterSpacing: '0.18em',
  color:         'rgba(0,217,255,0.35)',
  marginBottom:  32,
}

const hintStyle: CSSProperties = {
  fontSize:      10,
  letterSpacing: '0.1em',
  color:         'rgba(0,217,255,0.25)',
}
