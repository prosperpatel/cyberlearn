import { memo, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Monitor, Server, Database, Shield, Network, Router, Cloud, Smartphone,
  AlertTriangle, HelpCircle, X, Tag,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { DiagramEdge, ExpandableDiagramProps, ExpandableNode, NodeType } from '../../types'

// ── Node config (same visual language as InteractiveDiagram) ──────────────────

const NODE_ICONS: Record<NodeType, React.ComponentType<{ className?: string }>> = {
  client:   Monitor,
  server:   Server,
  database: Database,
  attacker: AlertTriangle,
  firewall: Shield,
  switch:   Network,
  router:   Router,
  cloud:    Cloud,
  phone:    Smartphone,
  default:  HelpCircle,
}

const NODE_COLORS: Record<NodeType, { bg: string; stroke: string; icon: string }> = {
  client:   { bg: '#1e3a5f', stroke: '#3b82f6', icon: '#93c5fd' },
  server:   { bg: '#1e3a2f', stroke: '#16a34a', icon: '#86efac' },
  database: { bg: '#2d1b4e', stroke: '#7c3aed', icon: '#c4b5fd' },
  attacker: { bg: '#3b0f0f', stroke: '#ef4444', icon: '#fca5a5' },
  firewall: { bg: '#1f2d1a', stroke: '#84cc16', icon: '#bef264' },
  switch:   { bg: '#1e2d3a', stroke: '#38bdf8', icon: '#7dd3fc' },
  router:   { bg: '#25251a', stroke: '#facc15', icon: '#fde047' },
  cloud:    { bg: '#1a2535', stroke: '#64748b', icon: '#94a3b8' },
  phone:    { bg: '#1e2535', stroke: '#818cf8', icon: '#a5b4fc' },
  default:  { bg: '#27272a', stroke: '#3f3f46', icon: '#a1a1aa' },
}

const EDGE_COLORS: Record<NonNullable<DiagramEdge['type']>, string> = {
  normal:    '#3f3f46',
  attack:    '#ef4444',
  data:      '#3b82f6',
  blocked:   '#ef4444',
  encrypted: '#16a34a',
}

const NODE_R = 28
const VW     = 700
const VH     = 420

// ── Simple markdown-to-JSX renderer ──────────────────────────────────────────

function renderMarkdown(text: string) {
  const lines = text.split('\n')
  return lines.map((line, i) => {
    if (line.startsWith('## '))
      return <h3 key={i} className="text-sm font-bold text-foreground mt-3 mb-1">{line.slice(3)}</h3>
    if (line.startsWith('# '))
      return <h2 key={i} className="text-base font-bold text-foreground mt-3 mb-1">{line.slice(2)}</h2>
    if (line.startsWith('- '))
      return <li key={i} className="text-xs text-muted-foreground ml-3 list-disc">{line.slice(2)}</li>
    if (line.startsWith('**') && line.endsWith('**'))
      return <p key={i} className="text-xs font-bold text-foreground">{line.slice(2, -2)}</p>
    if (line === '')
      return <div key={i} className="h-1.5" />
    return <p key={i} className="text-xs text-muted-foreground leading-relaxed">{line}</p>
  })
}

// ── Edge element ──────────────────────────────────────────────────────────────

function EdgeEl({ edge, a, b }: { edge: DiagramEdge; a: ExpandableNode; b: ExpandableNode }) {
  const type  = edge.type ?? 'normal'
  const color = EDGE_COLORS[type]
  const dx    = b.x - a.x
  const dy    = b.y - a.y
  const len   = Math.sqrt(dx * dx + dy * dy)
  if (len === 0) return null
  const sx    = a.x + (dx / len) * NODE_R
  const sy    = a.y + (dy / len) * NODE_R
  const ex    = b.x - (dx / len) * NODE_R
  const ey    = b.y - (dy / len) * NODE_R
  const midX  = (sx + ex) / 2
  const midY  = (sy + ey) / 2

  return (
    <g>
      <line x1={sx} y1={sy} x2={ex} y2={ey} stroke={color} strokeWidth="1.5" opacity="0.6"
        markerEnd={`url(#arrow-exp-${type})`} />
      {edge.label && (
        <text x={midX} y={midY - 5} textAnchor="middle" fontSize="9" fill={color}>{edge.label}</text>
      )}
    </g>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export const ExpandableDiagram = memo(function ExpandableDiagram({
  nodes,
  edges            = [],
  defaultExpandedId,
  className,
}: ExpandableDiagramProps) {
  const [selected, setSelected] = useState<ExpandableNode | null>(
    () => nodes.find((n) => n.id === defaultExpandedId) ?? null,
  )

  const nodeMap = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes])

  return (
    <div className={cn('rounded-2xl border border-border bg-card overflow-hidden', className)}>
      <div className="flex flex-col lg:flex-row">
        {/* SVG diagram */}
        <div className={cn('flex-1 min-w-0', selected ? 'lg:w-3/5' : 'w-full')}>
          <svg
            viewBox={`0 0 ${VW} ${VH}`}
            className="w-full h-auto"
            role="img"
            aria-label="Expandable diagram"
          >
            <defs>
              {Object.entries(EDGE_COLORS).map(([key, color]) => (
                <marker key={key} id={`arrow-exp-${key}`} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill={color} />
                </marker>
              ))}
            </defs>

            {/* Edges */}
            {edges.map((edge) => {
              const a = nodeMap.get(edge.from) as ExpandableNode | undefined
              const b = nodeMap.get(edge.to)   as ExpandableNode | undefined
              if (!a || !b) return null
              return <EdgeEl key={edge.id} edge={edge} a={a} b={b} />
            })}

            {/* Nodes */}
            {nodes.map((node) => {
              const type     = node.type ?? 'default'
              const c        = NODE_COLORS[type]
              const Icon     = NODE_ICONS[type]
              const isActive = selected?.id === node.id

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onClick={() => setSelected((prev) => prev?.id === node.id ? null : node)}
                  onKeyDown={(e) => e.key === 'Enter' && setSelected((prev) => prev?.id === node.id ? null : node)}
                  role="button"
                  tabIndex={0}
                  aria-label={node.label}
                  aria-pressed={isActive}
                  style={{ cursor: 'pointer' }}
                >
                  {isActive && (
                    <circle r={NODE_R + 8} fill="none" stroke="#6366f1" strokeWidth="2" opacity="0.6" />
                  )}
                  <circle r={NODE_R} fill={c.bg} stroke={isActive ? '#6366f1' : c.stroke} strokeWidth={isActive ? 2 : 1.5} />
                  <foreignObject x={-14} y={-14} width={28} height={28} style={{ pointerEvents: 'none' }}>
                    <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.icon }}>
                      <Icon className="size-5" />
                    </div>
                  </foreignObject>
                  <text y={NODE_R + 14} textAnchor="middle" fontSize="11" fontWeight="600" fill="#d4d4d8" className="select-none pointer-events-none">
                    {node.label}
                  </text>
                  {node.sublabel && (
                    <text y={NODE_R + 26} textAnchor="middle" fontSize="9" fill="#71717a" className="select-none pointer-events-none">
                      {node.sublabel}
                    </text>
                  )}
                  {/* Pulsing dot to indicate expandable */}
                  {!isActive && (
                    <circle cx={NODE_R - 4} cy={-NODE_R + 4} r="5" fill="#6366f1" opacity="0.8" />
                  )}
                </g>
              )
            })}
          </svg>
        </div>

        {/* Detail panel */}
        <AnimatePresence>
          {selected && (
            <motion.aside
              key={selected.id}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="lg:w-2/5 overflow-hidden border-l border-border"
            >
              <div className="p-5 space-y-3 min-w-[240px]">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-foreground">{selected.label}</h3>
                    {selected.sublabel && (
                      <p className="text-xs text-muted-foreground">{selected.sublabel}</p>
                    )}
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    aria-label="Close panel"
                    className="shrink-0 rounded-lg p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                {/* Summary */}
                <p className="text-sm text-muted-foreground leading-relaxed">{selected.summary}</p>

                {/* Tags */}
                {selected.tags && selected.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    <Tag className="size-3.5 text-muted-foreground shrink-0 mt-0.5" />
                    {selected.tags.map((t) => (
                      <span key={t} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Details (markdown) */}
                <div className="rounded-lg border border-border bg-background/40 p-3 space-y-1 max-h-80 overflow-y-auto">
                  {renderMarkdown(selected.details)}
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      {!selected && (
        <p className="text-center text-xs text-muted-foreground py-2 border-t border-border">
          Click any node to explore details
        </p>
      )}
    </div>
  )
})
