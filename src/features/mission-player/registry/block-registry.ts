/**
 * Block Registry — plugin-driven renderer lookup.
 *
 * Replaces the switch statement in BlockRenderer. Components are registered
 * once at module init; BlockRenderer calls getBlock(type) and renders whatever
 * component is returned.
 *
 * Adding a new block type — 2 steps only:
 *   1. Create the React component (see HOW_TO_ADD_BLOCK.md)
 *   2. Call registerBlock(type, component) in registered-blocks.ts
 *
 * The renderer never needs to change.
 *
 * Type safety design:
 *   registerBlock<T> is generic so each component is type-checked against its
 *   specific content shape at registration time. The registry stores components
 *   as AnyBlockComponent (content erased to unknown) — this is the standard
 *   plugin pattern in TypeScript, and the unsafe cast is confined to one line
 *   inside registerBlock.
 */

import type { ComponentType } from 'react'
import type { StandardBlock } from '@/types/mission-engine'

// The untyped component type used inside the registry.
// Content type is erased to unknown — individual components still receive their
// specific TContent type at compile time (enforced at registerBlock call site).
type AnyBlockComponent = ComponentType<{ block: StandardBlock<unknown> }>

const _registry = new Map<string, AnyBlockComponent>()

/**
 * Registers a React component to handle a block type.
 * Call this once per block type, typically in registered-blocks.ts.
 * Registering the same type twice overwrites the previous registration.
 *
 * @param type   - The block's `type` field value, e.g. 'story'
 * @param component - React component that accepts `{ block: StandardBlock<TContent> }`
 */
export function registerBlock<TContent = Record<string, unknown>>(
  type: string,
  component: ComponentType<{ block: StandardBlock<TContent> }>,
): void {
  // Safe: the registry only passes blocks of this type to this component.
  // The cast is confined to this function — callers are fully type-checked.
  _registry.set(type, component as AnyBlockComponent)
}

/**
 * Returns the registered component for a block type, or undefined if none.
 * BlockRenderer falls back to UnknownBlock when this returns undefined.
 */
export function getBlock(type: string): AnyBlockComponent | undefined {
  return _registry.get(type)
}

/** Returns true if a component is registered for this block type. */
export function hasBlock(type: string): boolean {
  return _registry.has(type)
}

/** Returns all currently registered block type strings. */
export function listRegisteredTypes(): string[] {
  return Array.from(_registry.keys()).sort()
}

/** Removes all registered blocks. Used in tests. */
export function clearRegistry(): void {
  _registry.clear()
}
