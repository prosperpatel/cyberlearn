import { useState } from 'react'
import { Share2 } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { StandardBlock } from '@/types/mission-engine'

interface DiagramNode {
  id:      string
  label:   string
  type?:   string
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
  const reducedMotion = useReducedMotion()
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const c           = block.content as DiagramContent
  const title       = c.title       ?? block.title
  const description = c.description ?? ''
  const nodes       = c.nodes       ?? []
  const edges       = c.edges       ?? []
  const caption     = c.caption     ?? ''

  const edgeByFrom = new Map(edges.map(e => [e.from, e]))

  return (
    <div className="rounded-xl border border-blue-500/30 bg-base-900 overflow-hidden">
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-blue-500/20" />

      <div className="px-5 sm:px-8 py-6 space-y-5">
        {/* Header */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-md bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-xs font-black uppercase tracking-widest text-blue-400 font-mono">
            <Share2 className="size-3" />
            Diagram
          </span>
          <span className="text-xs text-muted-foreground ml-auto">~{block.metadata.estimatedMinutes}min</span>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-bold text-foreground">{title}</h2>
          {description && <p className="text-base text-muted-foreground leading-relaxed">{description}</p>}
        </div>

        {/* Flow diagram — horizontal scrollable pipeline */}
        <div className="overflow-x-auto pb-2">
          <div className="flex items-start gap-0 min-w-max">
            {nodes.map((node, i) => {
              const edge       = edgeByFrom.get(node.id)
              const isActive   = activeNode === node.id
              const isAttacker = node.type === 'attacker'
              const isFromActive = activeNode === node.id

              return (
                <div key={node.id} className="flex items-center">
                  {/* Node */}
                  <motion.div
                    initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reducedMotion ? 0 : i * 0.1, duration: 0.24 }}
                  >
                    <button
                      onClick={() => setActiveNode(isActive ? null : node.id)}
                      className="flex flex-col items-center gap-1.5 p-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 rounded-xl"
                    >
                      <div className={cn(
                        'flex size-12 items-center justify-center rounded-xl border-2 text-xs font-black font-mono transition-all',
                        isAttacker
                          ? 'border-red-500/60 bg-red-500/10 text-red-400 hover:border-red-500 hover:bg-red-500/20'
                          : 'border-blue-500/40 bg-blue-500/8 text-blue-400 hover:border-blue-500/80 hover:bg-blue-500/15',
                        isActive && (isAttacker
                          ? 'border-red-500 bg-red-500/25 shadow-[0_0_12px_rgba(239,68,68,0.3)]'
                          : 'border-blue-500 bg-blue-500/20 shadow-[0_0_12px_rgba(59,130,246,0.25)]'),
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
                  </motion.div>

                  {/* Arrow + edge label */}
                  {edge && i < nodes.length - 1 && (
                    <div className="flex flex-col items-center mx-1 mb-4">
                      <span className="text-[9px] text-muted-foreground/50 font-mono mb-0.5 whitespace-nowrap">
                        {edge.label ?? ''}
                      </span>
                      <motion.div
                        animate={{ opacity: isFromActive ? 1 : 0.4 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                          'flex items-center',
                          edge.type === 'attack' ? 'text-red-500/60' : 'text-blue-500/40',
                        )}
                      >
                        <div className="w-8 h-px bg-current" />
                        <div className="border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-current" />
                      </motion.div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Active node detail — animated */}
        <AnimatePresence mode="wait">
          {activeNode && (() => {
            const node = nodes.find(n => n.id === activeNode)
            return node?.detail ? (
              <motion.div
                key={activeNode}
                initial={reducedMotion ? false : { opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="rounded-lg bg-blue-500/8 border border-blue-500/25 p-4 text-base text-foreground/90 leading-relaxed"
              >
                <span className="font-semibold text-blue-400 mr-2">{node.label}:</span>
                {node.detail}
              </motion.div>
            ) : null
          })()}
        </AnimatePresence>

        {caption && (
          <p className="text-sm text-muted-foreground/60 italic border-t border-border/40 pt-3">{caption}</p>
        )}
      </div>
    </div>
  )
}
