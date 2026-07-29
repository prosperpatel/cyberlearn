import { MISSION_REGISTRY } from '@/features/mission/mission-registry'
import { engineTestConfig } from './config'

// Registers 'engine-test' → accessible at /missions/engine-test
MISSION_REGISTRY.set('engine-test', engineTestConfig)
