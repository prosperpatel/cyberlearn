/**
 * UnknownBlock — fallback renderer for unregistered block types.
 *
 * Rendered by BlockRenderer when no component is registered for a block's type.
 * In development this surfaces clearly; in production it degrades gracefully
 * rather than crashing the entire mission.
 */

import type { StandardBlock } from '@/types/mission-engine'

interface UnknownBlockProps {
  block: StandardBlock
}

export function UnknownBlock({ block }: UnknownBlockProps) {
  if (import.meta.env.DEV) {
    return (
      <div className="rounded-xl border border-yellow-500/40 bg-yellow-500/5 p-6 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-yellow-400 font-mono text-sm font-bold">⚠ unregistered block</span>
          <code className="rounded bg-base-800 px-1.5 py-0.5 text-xs text-yellow-300 border border-yellow-500/30">
            {block.type}
          </code>
        </div>
        <p className="text-xs text-muted-foreground">
          No component is registered for block type <strong>{block.type}</strong>.
          Register one in <code>registry/registered-blocks.ts</code> — see{' '}
          <code>HOW_TO_ADD_BLOCK.md</code> for the two-step process.
        </p>
        <details className="text-xs text-muted-foreground/70">
          <summary className="cursor-pointer hover:text-muted-foreground">Block data</summary>
          <pre className="mt-2 overflow-auto rounded bg-base-900 p-2 text-xs">
            {JSON.stringify({ id: block.id, title: block.title, metadata: block.metadata }, null, 2)}
          </pre>
        </details>
      </div>
    )
  }

  // Production: render nothing — mission continues without this block
  return null
}
