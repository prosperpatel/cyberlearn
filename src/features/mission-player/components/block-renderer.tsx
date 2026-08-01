/**
 * BlockRenderer — registry-driven, zero-switch renderer.
 *
 * Looks up the registered component for block.type and renders it.
 * Falls back to UnknownBlock if no component is registered.
 *
 * Adding a new block type does NOT require editing this file.
 * See HOW_TO_ADD_BLOCK.md — it's a 2-step process in other files.
 */

// Side-effect import: triggers all registerBlock() calls in registered-blocks.ts.
// This runs once when the module is first imported (Vite ensures single execution).
import '@/features/mission-player/registry/registered-blocks'

import { getBlock } from '@/features/mission-player/registry/block-registry'
import { UnknownBlock } from './unknown-block'
import type { StandardBlock } from '@/types/mission-engine'

interface BlockRendererProps {
  block: StandardBlock
}

export function BlockRenderer({ block }: BlockRendererProps) {
  const Component = getBlock(block.type)

  if (!Component) {
    return <UnknownBlock block={block} />
  }

  return <Component block={block} />
}
