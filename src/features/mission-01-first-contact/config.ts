import type { MissionConfig } from '@/features/mission/types'
import { BootScene } from './scenes/boot-scene'

export const mission01Config: MissionConfig = {
  metadata: {
    id:             'mission-01',
    title:          'First Contact',
    subtitle:       'ARIA Online',
    description:    'Your first day at SENTINEL. Meet your AI partner.',
    durationMin:    5,
    maxXp:          0,
    prerequisites:  [],
    academy:        1,
    course:         1,
    mission:        1,
    contentVersion: '1.0.0',
  },
  initialScene: 'boot',
  scenes: [
    { id: 'boot', component: BootScene, label: 'Boot — ARIA Introduction' },
  ],
  tracks: [],
  assets: [],
}
