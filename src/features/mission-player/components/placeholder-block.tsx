/**
 * PlaceholderBlock — generic stub renderer.
 *
 * Used for all block types that don't yet have a production component.
 * Shows the block type, title, and a preview of content so authors can
 * verify JSON is loading and migrating correctly.
 *
 * To upgrade a block type from placeholder to production renderer:
 *   1. Create the component in components/blocks/<type>-block.tsx
 *   2. Update registered-blocks.ts to import and register it
 */

import { cn } from '@/lib/utils'
import type { StandardBlock } from '@/types/mission-engine'

const TYPE_COLORS: Record<string, string> = {
  'mission-brief':      'border-cyan-500/40 bg-cyan-500/5',
  'story':              'border-purple-500/40 bg-purple-500/5',
  'theory':             'border-blue-500/40 bg-blue-500/5',
  'case-study':         'border-orange-500/40 bg-orange-500/5',
  'memory-anchor':      'border-yellow-500/40 bg-yellow-500/5',
  'funny-illustration': 'border-pink-500/40 bg-pink-500/5',
  'analogy':            'border-green-500/40 bg-green-500/5',
  'diagram':            'border-sky-500/40 bg-sky-500/5',
  'micro-practical':    'border-indigo-500/40 bg-indigo-500/5',
  'interactive':        'border-violet-500/40 bg-violet-500/5',
  'discussion':         'border-teal-500/40 bg-teal-500/5',
  'student-questions':  'border-lime-500/40 bg-lime-500/5',
  'common-mistakes':    'border-red-500/40 bg-red-500/5',
  'glossary':           'border-amber-500/40 bg-amber-500/5',
  'cheat-sheet':        'border-cyan-400/40 bg-cyan-400/5',
  'quiz':               'border-emerald-500/40 bg-emerald-500/5',
  'flashcards':         'border-fuchsia-500/40 bg-fuchsia-500/5',
  'assignment':         'border-rose-500/40 bg-rose-500/5',
  'lab':                'border-orange-400/40 bg-orange-400/5',
  'summary':            'border-green-400/40 bg-green-400/5',
  'mission-complete':   'border-cyber-blue/40 bg-cyber-blue/5',
  'ai-tutor':           'border-cyber-purple/40 bg-cyber-purple/5',
}

function getPreview(content: Record<string, unknown>): string {
  // Try common string fields in priority order
  for (const key of ['briefing', 'content', 'prompt', 'incident', 'message', 'objective', 'topic', 'comparison', 'anchor', 'punchline', 'description']) {
    const val = content[key]
    if (typeof val === 'string') return val.slice(0, 140)
  }
  // Try common array fields
  for (const key of ['narrative', 'keyTakeaways', 'suggestedPrompts']) {
    const val = content[key]
    if (Array.isArray(val) && typeof val[0] === 'string') return String(val[0]).slice(0, 140)
  }
  // Count summary for collection-type blocks
  for (const [key, val] of Object.entries(content)) {
    if (Array.isArray(val) && val.length > 0) return `${val.length} ${key}`
  }
  return Object.keys(content).join(', ') || '(empty content)'
}

interface PlaceholderBlockProps {
  block: StandardBlock
}

export function PlaceholderBlock({ block }: PlaceholderBlockProps) {
  const colorClass = TYPE_COLORS[block.type] ?? 'border-border bg-base-900'
  const content    = block.content as Record<string, unknown>
  const preview    = getPreview(content)

  return (
    <div className={cn('rounded-xl border p-6 space-y-3', colorClass)}>
      <div className="flex items-center gap-3">
        <span className="rounded-md bg-base-800 px-2 py-0.5 font-mono text-xs text-muted-foreground border border-border">
          {block.type}
        </span>
        {block.metadata.xp > 0 && (
          <span className="text-xs text-primary font-medium">+{block.metadata.xp} XP</span>
        )}
        <span className="text-xs text-muted-foreground ml-auto">
          ~{block.metadata.estimatedMinutes}min
        </span>
      </div>

      {block.title && (
        <h2 className="text-lg font-semibold text-foreground leading-snug">{block.title}</h2>
      )}

      {preview && (
        <p className="text-sm text-muted-foreground line-clamp-3">{preview}…</p>
      )}

      <p className="text-xs text-muted-foreground/50 italic pt-1 border-t border-border/40">
        [{block.type} renderer coming soon]
      </p>
    </div>
  )
}
