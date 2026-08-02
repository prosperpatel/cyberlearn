/**
 * Block Completion Architecture
 *
 * Every block type owns its completion logic. The Block Player only asks:
 * "Can this block proceed?" — it never decides HOW a block reaches completion.
 *
 * CompletionStrategy:
 *   'scroll'       — completed when learner scrolls to the end (all reading blocks)
 *   'interaction'  — completed when the block renderer calls complete() explicitly
 *   'immediate'    — always complete on mount (e.g. mission-complete)
 *
 * To add a new block type: add it to COMPLETION_STRATEGIES below.
 * The Block Player requires no changes.
 */

import { createContext, useContext } from 'react'

// ── Strategy registry ──────────────────────────────────────────────────────────

export type CompletionStrategy = 'scroll' | 'interaction' | 'immediate'

export const COMPLETION_STRATEGIES: Record<string, CompletionStrategy> = {
  // Reading blocks — completed when scrolled to end
  'mission-brief':     'scroll',
  'story':             'scroll',
  'theory':            'scroll',
  'case-study':        'scroll',
  'memory-anchor':     'scroll',
  'analogy':           'scroll',
  'diagram':           'scroll',
  'discussion':        'scroll',
  'student-questions': 'scroll',
  'common-mistakes':   'scroll',
  'cheat-sheet':       'scroll',
  'funny-illustration':'scroll',
  'glossary':          'scroll',
  'summary':           'scroll',
  'ai-tutor':          'scroll',

  // Interactive blocks — renderer calls complete() when activity is done
  'quiz':              'interaction',
  'flashcards':        'interaction',
  'micro-practical':   'interaction',
  'interactive':       'interaction',
  'assignment':        'interaction',
  'lab':               'interaction',

  // Always complete immediately
  'mission-complete':  'immediate',
}

/** Returns the strategy for a block type, defaulting to 'scroll' for unknown types. */
export function getCompletionStrategy(blockType: string): CompletionStrategy {
  return COMPLETION_STRATEGIES[blockType] ?? 'scroll'
}

// ── Context ────────────────────────────────────────────────────────────────────

export interface BlockCompletionContextValue {
  /** Call this to signal that the block is complete. Idempotent. */
  complete: () => void
}

/**
 * Default value — used when a block renderer is rendered outside the Block Player
 * (e.g. in Storybook or standalone previews). complete() is a no-op in that case.
 */
export const BlockCompletionContext = createContext<BlockCompletionContextValue>({
  complete: () => undefined,
})

/**
 * Hook for block renderers to signal completion.
 *
 * Usage (inside any block renderer):
 *   const { complete } = useBlockCompletion()
 *   useEffect(() => { if (allDone) complete() }, [allDone, complete])
 */
export function useBlockCompletion(): BlockCompletionContextValue {
  return useContext(BlockCompletionContext)
}
