import type { CSSProperties, ReactNode } from 'react'

// ── Shared layout styles ──────────────────────────────────────────────────────

export const S = {
  scene: {
    position:       'fixed',
    inset:          0,
    background:     '#08080F',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    fontFamily:     '"Courier New", monospace',
    overflowY:      'auto',
    padding:        24,
  } satisfies CSSProperties,

  panel: {
    width:        '100%',
    maxWidth:     540,
    background:   'rgba(0,217,255,0.03)',
    border:       '1px solid rgba(0,217,255,0.2)',
    borderRadius: 6,
    padding:      '24px 28px',
    color:        '#00D9FF',
  } satisfies CSSProperties,

  sceneTag: {
    fontSize:      10,
    color:         'rgba(0,217,255,0.35)',
    letterSpacing: '0.15em',
    marginBottom:  8,
  } satisfies CSSProperties,

  title: {
    fontSize:      20,
    fontWeight:    700,
    letterSpacing: '0.1em',
    marginBottom:  4,
    color:         '#00D9FF',
  } satisfies CSSProperties,

  subtitle: {
    fontSize:      11,
    color:         'rgba(0,217,255,0.45)',
    marginBottom:  16,
    letterSpacing: '0.05em',
  } satisfies CSSProperties,

  table: {
    marginBottom: 20,
  } satisfies CSSProperties,

  section: {
    fontSize:      9,
    letterSpacing: '0.2em',
    color:         'rgba(0,217,255,0.3)',
    marginBottom:  8,
    marginTop:     4,
  } satisfies CSSProperties,
} as const

// ── Row component ─────────────────────────────────────────────────────────────

interface RowProps {
  label:    string
  value:    string
  pass?:    boolean
  extra?:   ReactNode
  children?: ReactNode
}

export function Row({ label, value, pass, extra, children }: RowProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 11, color: 'rgba(0,217,255,0.5)', width: 130, flexShrink: 0 }}>
          {label}
        </span>
        {value && (
          <span style={{ fontSize: 11, color: '#E0F7FF', flex: 1 }}>
            {value}
          </span>
        )}
        {pass !== undefined && (
          <Badge color={pass ? '#00FF87' : '#FF4757'}>
            {pass ? 'PASS' : 'FAIL'}
          </Badge>
        )}
        {extra}
      </div>
      {children && <div style={{ marginTop: 6 }}>{children}</div>}
    </div>
  )
}

// ── Badge component ───────────────────────────────────────────────────────────

interface BadgeProps {
  color:    string
  children: ReactNode
}

export function Badge({ color, children }: BadgeProps) {
  return (
    <span style={{
      fontSize:     9,
      fontFamily:   '"Courier New", monospace',
      color,
      border:       `1px solid ${color}`,
      borderRadius: 2,
      padding:      '1px 5px',
      letterSpacing: '0.05em',
      flexShrink:   0,
    }}>
      {children}
    </span>
  )
}

// ── NavButton component ───────────────────────────────────────────────────────

interface NavButtonProps {
  onClick:   () => void
  disabled?: boolean
  children:  ReactNode
  style?:    CSSProperties
}

export function NavButton({ onClick, disabled, children, style }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display:       'block',
        width:         '100%',
        background:    'transparent',
        border:        `1px solid ${disabled ? 'rgba(0,217,255,0.15)' : 'rgba(0,217,255,0.4)'}`,
        color:         disabled ? 'rgba(0,217,255,0.3)' : '#00D9FF',
        fontFamily:    '"Courier New", monospace',
        fontSize:      12,
        letterSpacing: '0.1em',
        padding:       '10px 0',
        cursor:        disabled ? 'default' : 'pointer',
        transition:    'border-color 150ms, color 150ms',
        ...style,
      }}
    >
      {children}
    </button>
  )
}
