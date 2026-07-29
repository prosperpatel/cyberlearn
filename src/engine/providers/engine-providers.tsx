import type { ReactNode } from 'react'
import { AccessibilityProvider } from '../accessibility/accessibility-manager'
import { AudioProvider }         from '../audio/audio-context'
import { AssetProvider }         from '../assets/asset-context'
import { DialogueProvider }      from '../dialogue/dialogue-engine'
import { DebugOverlay }          from '../debug/debug-overlay'

interface EngineProvidersProps {
  children: ReactNode
}

/**
 * Composes all engine subsystem providers in the correct nesting order:
 *
 *   Accessibility  (must be outermost — other providers read reducedMotion)
 *     └─ Audio        (initialises volumes from saved settings)
 *          └─ Assets  (preloading; stateless singleton wrapper)
 *               └─ Dialogue (needs useAudio for voice file playback)
 *                    └─ children
 *                    └─ DebugOverlay (reads from singletons directly)
 *
 * SceneManagerProvider is NOT included here because it is per-mission —
 * each mission provides its own scene registry and initial scene.
 */
export function EngineProviders({ children }: EngineProvidersProps) {
  return (
    <AccessibilityProvider>
      <AudioProvider>
        <AssetProvider>
          <DialogueProvider>
            {children}
            <DebugOverlay />
          </DialogueProvider>
        </AssetProvider>
      </AudioProvider>
    </AccessibilityProvider>
  )
}
