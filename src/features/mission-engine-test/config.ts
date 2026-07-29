import type { MissionConfig } from '@/features/mission/types'
import { BootScene }       from './scenes/boot-scene'
import { DialogueScene }   from './scenes/dialogue-scene'
import { AudioScene }      from './scenes/audio-scene'
import { TransitionScene } from './scenes/transition-scene'
import { CompletionScene } from './scenes/completion-scene'

// ── Placeholder audio ─────────────────────────────────────────────────────────
// Valid 44-byte WAV: 44100 Hz, 16-bit mono, 0 data samples.
// Tests AudioManager.register/play/stop/volume API without real audio files.
const SILENT_WAV = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA='

// ── Placeholder image ─────────────────────────────────────────────────────────
// 1×1 transparent PNG — tests AssetManager image loading path.
const PLACEHOLDER_PNG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='

export const engineTestConfig: MissionConfig = {
  metadata: {
    id:             'engine-test',
    title:          'Engine Test',
    subtitle:       'System validation suite',
    description:    'Exercises every engine subsystem. Dev-only, not curriculum content.',
    durationMin:    1,
    maxXp:          0,
    prerequisites:  [],
    academy:        0,
    course:         0,
    mission:        0,
    contentVersion: '1.0.0',
  },

  initialScene: 'boot',

  scenes: [
    { id: 'boot',       component: BootScene,       nextSceneId: 'dialogue', label: '1 · Boot' },
    { id: 'dialogue',   component: DialogueScene,   nextSceneId: 'audio',    label: '2 · Dialogue' },
    { id: 'audio',      component: AudioScene,      nextSceneId: 'transition', label: '3 · Audio' },
    { id: 'transition', component: TransitionScene, nextSceneId: 'complete', label: '4 · Transition' },
    { id: 'complete',   component: CompletionScene,                          label: '5 · Complete' },
  ],

  tracks: [
    { id: 'et-music',   src: SILENT_WAV, channel: 'music',   loop: true,  volume: 0.6 },
    { id: 'et-ambient', src: SILENT_WAV, channel: 'ambient', loop: true,  volume: 0.4 },
    { id: 'et-sfx',     src: SILENT_WAV, channel: 'sfx',     loop: false, volume: 1.0 },
  ],

  assets: [
    { id: 'et-image', type: 'image', src: PLACEHOLDER_PNG },
    { id: 'et-json',  type: 'json',  src: '/content/courses/digital-security-landscape/course.json' },
  ],
}
