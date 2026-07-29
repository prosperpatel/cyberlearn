import { useEffect, useRef, useState } from 'react'
import { engineBus } from '../event-bus/event-bus'
import { audioManager } from '../audio/audio-manager'
import { assetManager } from '../assets/asset-manager'
import { saveService } from '../save/save-service'
import type { SceneId } from '../types'

interface DialogueDebugState {
  dialogueId:  string | null
  lineIndex:   number | null
}

const PANEL_STYLE: React.CSSProperties = {
  position:        'fixed',
  bottom:          16,
  right:           16,
  zIndex:          9999,
  background:      'rgba(0, 0, 0, 0.85)',
  border:          '1px solid rgba(0, 217, 255, 0.4)',
  borderRadius:    6,
  padding:         '8px 12px',
  fontFamily:      '"Courier New", monospace',
  fontSize:        11,
  color:           '#00D9FF',
  lineHeight:      1.6,
  minWidth:        220,
  backdropFilter:  'blur(8px)',
  pointerEvents:   'none',
}

const SECTION_STYLE: React.CSSProperties = {
  color:      'rgba(0, 217, 255, 0.5)',
  fontSize:   10,
  marginTop:  4,
}

const VALUE_STYLE: React.CSSProperties = { color: '#00FF87' }

// Only render this component in development
const IS_DEV = import.meta.env.DEV

/**
 * Developer debug overlay — renders in DEV builds only.
 *
 * Toggle visibility with the keyboard shortcut `` ` `` (backtick)
 * or by emitting `debug:toggle` on the engine bus.
 *
 * Shows: FPS, current scene, asset load stats, active audio tracks,
 * current dialogue, and save version.
 */
export function DebugOverlay() {
  const [visible, setVisible] = useState(false)
  const [fps, setFps] = useState(0)
  const [currentScene, setCurrentScene] = useState<SceneId | null>(null)
  const [dialogueState, setDialogueState] = useState<DialogueDebugState>({
    dialogueId: null,
    lineIndex:  null,
  })

  const frameCountRef = useRef(0)
  const lastFpsTimeRef = useRef(performance.now())
  const rafRef = useRef<number | null>(null)

  // FPS counter via rAF
  useEffect(() => {
    if (!visible) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      return
    }

    const tick = (): void => {
      frameCountRef.current++
      const now = performance.now()
      const elapsed = now - lastFpsTimeRef.current
      if (elapsed >= 500) {
        setFps(Math.round((frameCountRef.current / elapsed) * 1000))
        frameCountRef.current = 0
        lastFpsTimeRef.current = now
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [visible])

  // Engine bus listeners
  useEffect(() => {
    const offEnter  = engineBus.on('scene:enter',  ({ sceneId }) => setCurrentScene(sceneId))
    const offExit   = engineBus.on('scene:exit',   () => setCurrentScene(null))
    const offToggle = engineBus.on('debug:toggle', ({ visible: v }) => setVisible(v))
    const offDLine  = engineBus.on('dialogue:line', ({ dialogueId, lineIndex }) =>
      setDialogueState({ dialogueId, lineIndex }),
    )
    const offDComplete = engineBus.on('dialogue:complete', () =>
      setDialogueState({ dialogueId: null, lineIndex: null }),
    )

    return () => {
      offEnter(); offExit(); offToggle(); offDLine(); offDComplete()
    }
  }, [])

  // Keyboard toggle: backtick
  useEffect(() => {
    const handler = (e: KeyboardEvent): void => {
      if (e.key === '`') {
        setVisible((v) => {
          engineBus.emit('debug:toggle', { visible: !v })
          return !v
        })
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  if (!IS_DEV || !visible) return null

  const assetStats    = assetManager.stats()
  const audioSnapshot = audioManager.snapshot()
  const saveData      = saveService.load()
  const activeTracks  = Object.entries(audioSnapshot).filter(([, s]) => s === 'playing')

  return (
    <div style={PANEL_STYLE}>
      <div style={{ fontWeight: 'bold', marginBottom: 4, color: '#7B5EA7' }}>
        ◉ CL DEBUG
      </div>

      <div>
        <span style={SECTION_STYLE}>FPS </span>
        <span style={VALUE_STYLE}>{fps}</span>
      </div>

      <div>
        <span style={SECTION_STYLE}>SCENE </span>
        <span style={VALUE_STYLE}>{currentScene ?? '—'}</span>
      </div>

      <div style={{ marginTop: 4 }}>
        <span style={SECTION_STYLE}>ASSETS </span>
        <span style={VALUE_STYLE}>
          {assetStats.loaded}/{assetStats.total}
          {assetStats.error > 0 && (
            <span style={{ color: '#FF4757' }}> ERR:{assetStats.error}</span>
          )}
          {assetStats.pending > 0 && (
            <span style={{ color: '#FF6B35' }}> PENDING:{assetStats.pending}</span>
          )}
        </span>
      </div>

      <div>
        <span style={SECTION_STYLE}>AUDIO </span>
        <span style={VALUE_STYLE}>
          {activeTracks.length === 0
            ? '—'
            : activeTracks.map(([id]) => id).join(', ')}
        </span>
      </div>

      <div>
        <span style={SECTION_STYLE}>DIALOGUE </span>
        <span style={VALUE_STYLE}>
          {dialogueState.dialogueId
            ? `${dialogueState.dialogueId}#${dialogueState.lineIndex ?? 0}`
            : '—'}
        </span>
      </div>

      <div>
        <span style={SECTION_STYLE}>SAVE v</span>
        <span style={VALUE_STYLE}>{saveData?.version ?? '—'}</span>
      </div>

      <div style={{ ...SECTION_STYLE, marginTop: 6 }}>` to toggle</div>
    </div>
  )
}
