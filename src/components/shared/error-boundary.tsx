import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children:    ReactNode
  fallback?:   ReactNode
  onError?:    (error: Error, info: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error:    Error | null
}

/**
 * Class-based error boundary.
 *
 * Catches render-phase errors in the subtree and displays a fallback UI.
 * Provide a `fallback` prop for custom error screens; defaults to a minimal
 * dark-themed message that won't break the cyber aesthetic.
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    this.props.onError?.(error, info)
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  override render(): ReactNode {
    if (!this.state.hasError) return this.props.children

    if (this.props.fallback) return this.props.fallback

    return (
      <div
        style={{
          display:         'flex',
          flexDirection:   'column',
          alignItems:      'center',
          justifyContent:  'center',
          height:          '100vh',
          background:      '#08080F',
          color:           '#FF4757',
          fontFamily:      '"Courier New", monospace',
          gap:             16,
          padding:         24,
          textAlign:       'center',
        }}
      >
        <div style={{ fontSize: 32 }}>⚠</div>
        <div style={{ fontSize: 16, color: '#00D9FF' }}>SYSTEM FAULT</div>
        <div style={{ fontSize: 12, color: 'rgba(255,71,87,0.8)', maxWidth: 480 }}>
          {this.state.error?.message ?? 'An unexpected error occurred.'}
        </div>
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop:    16,
            padding:      '8px 24px',
            background:   'transparent',
            border:       '1px solid #00D9FF',
            color:        '#00D9FF',
            fontFamily:   '"Courier New", monospace',
            cursor:       'pointer',
            fontSize:     12,
          }}
        >
          RELOAD
        </button>
      </div>
    )
  }
}
