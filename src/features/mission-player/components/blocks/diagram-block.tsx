import { useState } from 'react'
import { Share2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { StandardBlock } from '@/types/mission-engine'

interface DiagramNode {
  id:     string
  label:  string
  type?:  string
  detail?: string
}

interface DiagramEdge {
  from:      string
  to:        string
  label?:    string
  type?:     string
  animated?: boolean
}

interface DiagramContent {
  title?:       string
  description?: string
  nodes?:       DiagramNode[]
  edges?:       DiagramEdge[]
  caption?:     string
}

export function DiagramBlock({ block }: { block: StandardBlock }) {
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const c           = block.content as DiagramContent
  const title       = c.title       ?? block.title
  const description = c.description ?? ''
  const nodes       = c.nodes       ?? []
  const edges       = c.edges       ?? []
  const caption     = c.caption     ?? ''

  const edgeByFrom = new Map(edges.map(e => [e.from, e]))

  return (
    <div className="rounded-xl border border-sky-500/30 bg-base-900 overflow-hidden">
      <div className="h-1.5 w-full bg-gradient-to-r from-sky-500 to-sky-500/20" />

      <div className="px-5 sm:px-8 py-6 space-y-5">
        {/* Header */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-md bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-sky-400 font-mono">
            <Share2 className="size-3" />
            Diagram
          </span>
          <span className="text-xs text-muted-foreground ml-auto">~{block.metadata.estimatedMinutes}min</span>
        </div>

        <div className="space-y-1">
          <h2 className="text-base font-bold text-foreground">{title}</h2>
          {description && <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>}
        </div>

        {/* Flow diagram — horizontal scrollable pipeline */}
        <div className="overflow-x-auto pb-2">
          <div className="flex items-start gap-0 min-w-max">
            {nodes.map((node, i) => {
              const edge       = edgeByFrom.get(node.id)
              const isActive   = activeNode === node.id
              const isAttacker = node.type === 'attacker'

              return (
                <div key={node.id} className="flex items-center">
                  {/* Node */}
                  <button
                    onClick={() => setActiveNode(isActive ? null : node.id)}
                    className={cn(
                      'flex flex-col items-center gap-1.5 p-0 transition-all focus-visible:outline-none',
                    )}
                  >
                    <div className={cn(
                      'flex size-12 items-center justify-center rounded-xl border-2 text-xs font-black font-mono transition-all',
                      isAttacker
                        ? 'border-red-500/60 bg-red-500/10 text-red-400 hover:border-red-500 hover:bg-red-500/20'
                        : 'border-sky-500/40 bg-sky-500/8 text-sky-400 hover:border-sky-500/80 hover:bg-sky-500/15',
                      isActive && (isAttacker ? 'border-red-500 bg-red-500/25 shadow-[0_0_12px_rgba(239,68,68,0.3)]' : 'border-sky-500 bg-sky-500/20 shadow-[0_0_12px_rgba(14,165,233,0.25)]'),
                    )}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <span className={cn(
                      'text-[10px] font-semibold text-center leading-tight max-w-[72px]',
                      isActive ? 'text-foreground' : 'text-muted-foreground',
                    )}>
                      {node.label}
                    </span>
                  </button>

                  {/* Arrow + edge label */}
                  {edge && i < nodes.length - 1 && (
                    <div className="flex flex-col items-center mx-1 mb-4">
                      <span className="text-[9px] text-muted-foreground/50 font-mono mb-0.5 whitespace-nowrap">
                        {edge.label ?? ''}
                      </span>
                      <div className={cn(
                        'flex items-center',
                        edge.type === 'attack' ? 'text-red-500/60' : 'text-sky-500/40',
                      )}>
                        <div className="w-8 h-px bg-current" />
                        <div className="border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-current" />
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Active node detail */}
        {activeNode && (() => {
          const node = nodes.find(n => n.id === activeNode)
          return node?.detail ? (
            <div className="rounded-lg bg-sky-500/8 border border-sky-500/25 p-4 text-sm text-foreground/90 leading-relaxed">
              <span className="font-semibold text-sky-400 mr-2">{node.label}:</span>
              {node.detail}
            </div>
          ) : null
        })()}

        {caption && (
          <p className="text-xs text-muted-foreground/60 italic border-t border-border/40 pt-3">{caption}</p>
        )}
      </div>
    </div>
  )
}
