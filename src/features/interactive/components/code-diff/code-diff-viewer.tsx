import { memo, useState } from 'react'
import { cn } from '@/lib/utils'
import type { CodeDiffViewerProps, DiffLine, DiffLineType } from '../../types'

// ── Minimal LCS diff ──────────────────────────────────────────────────────────

function computeDiff(original: string, modified: string): DiffLine[] {
  const oLines = original.split('\n')
  const mLines = modified.split('\n')
  const m      = oLines.length
  const n      = mLines.length

  // Build LCS table
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = oLines[i - 1] === mLines[j - 1]
        ? dp[i - 1][j - 1] + 1
        : Math.max(dp[i - 1][j], dp[i][j - 1])
    }
  }

  // Traceback
  const result: DiffLine[] = []
  let i = m, j = n
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oLines[i - 1] === mLines[j - 1]) {
      result.push({ type: 'unchanged', content: oLines[i - 1], oldLineNumber: i, newLineNumber: j })
      i--; j--
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.push({ type: 'added', content: mLines[j - 1], newLineNumber: j })
      j--
    } else {
      result.push({ type: 'removed', content: oLines[i - 1], oldLineNumber: i })
      i--
    }
  }
  return result.reverse()
}

// ── Line rendering ────────────────────────────────────────────────────────────

const LINE_STYLES: Record<DiffLineType, { bg: string; prefix: string; num: string }> = {
  added:     { bg: 'bg-emerald-950/60', prefix: '+', num: 'text-emerald-600' },
  removed:   { bg: 'bg-red-950/60',     prefix: '−', num: 'text-red-600' },
  unchanged: { bg: '',                  prefix: ' ', num: 'text-muted-foreground/50' },
}

interface DiffLineRowProps {
  line:         DiffLine
  showNumbers:  boolean
  explanation?: string
}

function DiffLineRow({ line, showNumbers, explanation }: DiffLineRowProps) {
  const [showExp, setShowExp] = useState(false)
  const s = LINE_STYLES[line.type]

  return (
    <>
      <div
        className={cn('flex group', s.bg, explanation && 'cursor-pointer')}
        onClick={() => explanation && setShowExp((v) => !v)}
        title={explanation ? 'Click to see explanation' : undefined}
        role={explanation ? 'button' : undefined}
        tabIndex={explanation ? 0 : undefined}
        onKeyDown={(e) => explanation && e.key === 'Enter' && setShowExp((v) => !v)}
        aria-expanded={explanation ? showExp : undefined}
      >
        {showNumbers && (
          <span className={cn('w-10 shrink-0 select-none pr-3 text-right text-xs leading-6', s.num)}>
            {line.type !== 'added'   ? line.oldLineNumber ?? ' ' : ' '}
          </span>
        )}
        {showNumbers && (
          <span className={cn('w-10 shrink-0 select-none pr-3 text-right text-xs leading-6', s.num)}>
            {line.type !== 'removed' ? line.newLineNumber ?? ' ' : ' '}
          </span>
        )}
        <span className={cn('w-5 shrink-0 select-none text-xs leading-6 font-mono', s.num)}>
          {s.prefix}
        </span>
        <span className="flex-1 font-mono text-xs leading-6 whitespace-pre overflow-x-auto">
          {line.content}
        </span>
        {explanation && (
          <span className="shrink-0 px-2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity leading-6">
            ?
          </span>
        )}
      </div>
      {explanation && showExp && (
        <div className="bg-blue-950/50 border-l-2 border-blue-500 px-4 py-2 text-xs text-blue-200 leading-relaxed">
          {explanation}
        </div>
      )}
    </>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

export const CodeDiffViewer = memo(function CodeDiffViewer({
  original,
  modified,
  language        = 'text',
  originalLabel   = 'Before',
  modifiedLabel   = 'After',
  explanations,
  showLineNumbers = true,
  className,
}: CodeDiffViewerProps) {
  const diff = computeDiff(original, modified)

  const stats = diff.reduce(
    (acc, l) => {
      if (l.type === 'added')   acc.added++
      if (l.type === 'removed') acc.removed++
      return acc
    },
    { added: 0, removed: 0 },
  )

  return (
    <div
      className={cn('rounded-xl overflow-hidden border border-border bg-zinc-950', className)}
      role="region"
      aria-label={`Code diff: ${originalLabel} vs ${modifiedLabel}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-border">
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-muted-foreground">{originalLabel}</span>
          <span className="text-zinc-600">→</span>
          <span className="text-muted-foreground">{modifiedLabel}</span>
          {language !== 'text' && (
            <span className="ml-2 rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-400">{language}</span>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs">
          {stats.added   > 0 && <span className="text-emerald-400">+{stats.added}</span>}
          {stats.removed > 0 && <span className="text-red-400">−{stats.removed}</span>}
        </div>
      </div>

      {/* Diff body */}
      <div className="overflow-x-auto">
        {diff.map((line, i) => (
          <DiffLineRow
            key={i}
            line={line}
            showNumbers={showLineNumbers}
            explanation={
              line.type === 'added' ? explanations?.[line.content] : undefined
            }
          />
        ))}
      </div>
    </div>
  )
})
