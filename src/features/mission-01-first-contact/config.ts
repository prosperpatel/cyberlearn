import type { MissionConfig } from '@/features/mission/types'
import { BootScene }                      from './scenes/boot-scene'
import { WorldScene }                     from './scenes/world-scene'
import { HospitalScene }                  from './scenes/hospital-scene'
import { InvestigationPlaceholderScene }  from './scenes/investigation-placeholder-scene'

// Valid 44-byte silent WAV (44100 Hz, 16-bit mono, 0 data samples).
// Placeholder until real audio assets are produced.
const SILENT_WAV = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA='

// 1×1 transparent PNG — demonstrates AssetManager registration with a placeholder.
const PLACEHOLDER_PNG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='

export const mission01Config: MissionConfig = {
  metadata: {
    id:             'mission-01',
    title:          'First Contact',
    subtitle:       'ARIA Online',
    description:    'Your first day at SENTINEL. Meet your AI partner.',
    durationMin:    10,
    maxXp:          0,
    prerequisites:  [],
    academy:        1,
    course:         1,
    mission:        1,
    contentVersion: '1.2.0',
  },

  initialScene: 'boot',

  scenes: [
    {
      id:          'boot',
      component:   BootScene,
      nextSceneId: 'world',
      label:       'Boot — ARIA Introduction',
    },
    {
      id:          'world',
      component:   WorldScene,
      nextSceneId: 'hospital',
      label:       'World — Operations Center',
    },
    {
      id:          'hospital',
      component:   HospitalScene,
      nextSceneId: 'investigation',
      label:       'Hospital Incident',
    },
    {
      id:        'investigation',
      component: InvestigationPlaceholderScene,
      label:     'Investigation — Coming Soon',
    },
  ],

  tracks: [
    { id: 'm01-ambient',          src: SILENT_WAV, channel: 'ambient', loop: true,  volume: 0.5 },
    { id: 'm01-ui-click',         src: SILENT_WAV, channel: 'sfx',     loop: false, volume: 0.9 },
    { id: 'm01-transition',       src: SILENT_WAV, channel: 'sfx',     loop: false, volume: 1.0 },
    { id: 'm01-warning-beep',     src: SILENT_WAV, channel: 'sfx',     loop: false, volume: 0.8 },
    { id: 'm01-alert-escalation', src: SILENT_WAV, channel: 'sfx',     loop: false, volume: 1.0 },
  ],

  assets: [
    { id: 'm01-world-bg', type: 'image', src: PLACEHOLDER_PNG },
  ],
}
