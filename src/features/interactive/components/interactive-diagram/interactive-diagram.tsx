import { memo, useCallback, useMemo, useRef, useState, type PointerEvent } from 'react'
import { useReducedMotion, motion, AnimatePresence } from 'framer-motion'
import {
  Monitor, Server, Database, Shield, Network, Router, Cloud, Smartphone,
  AlertTriangle, HelpCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { DiagramEdge, DiagramNode, InteractiveDiagramProps, NodeType } from '../../types'

// ── Node icons ────────────────────────────────────────────────────────────────

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

const NODE_R = 28    // radius of node circle
const VW    = 800
const VH    = 480

// ── Edge path ─────────────────────────────────────────────────────────────────

function edgeMidpoint(a: DiagramNode, b: DiagramNode) {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
}

function edgePath(a: DiagramNode, b: DiagramNode): string {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const len = Math.sqrt(dx * dx + dy * dy)
  if (len === 0) return ''
  const sx = a.x + (dx / len) * NODE_R
  const sy = a.y + (dy / len) * NODE_R
  const ex = b.x - (dx / len) * NODE_R
  const ey = b.y - (dy / len) * NODE_R
  return `M ${sx} ${sy} L ${ex} ${ey}`
}

// ── Animated edge ─────────────────────────────────────────────────────────────

function DiagramEdgeEl({
  edge,
  a,
  b,
  isHighlighted,
  onClick,
}: {
  edge: DiagramEdge
  a: DiagramNode
  b: DiagramNode
  isHighlighted: boolean
  onClick?: () => void
}) {
  const reduced = useReducedMotion()
  const type    = edge.type ?? 'normal'
  const color   = EDGE_COLORS[type]
  const d       = edgePath(a, b)
  const mid     = edgeMidpoint(a, b)
  const isDashed = type === 'blocked' || type === 'encrypted'

  return (
    <g
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      role={onClick ? 'button' : undefined}
      aria-label={edge.label ?? `Connection from ${a.label} to ${b.label}`}
    >
      <path
        d={d}
        stroke={isHighlighted ? '#6366f1' : color}
        strokeWidth={isHighlighted ? 2.5 : 1.5}
        strokeDasharray={isDashed ? '5,3' : undefined}
        fill="none"
        markerEnd={`url(#arrow-${type})`}
        opacity={isHighlighted ? 1 : 0.6}
      />
      {edge.animated && !reduced && (
        <motion.circle
          r="4"
          fill={color}
          animate={{
            offsetDistance: ['0%', '100%'],
            opacity: [1, 1, 0],
          }}
          style={{
            offsetPath: `path("${d}")`,
            offsetDistance: '0%',
          } as React.CSSProperties}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
      )}
      {edge.bidirectional && (
        <path
          d={`M ${d.split(' ').slice(-2).join(' ')} L ${d.split(' ')[1]} ${d.split(' ')[2]}`}
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          markerEnd={`url(#arrow-${type})`}
          opacity="0.6"
        />
      )}
      {edge.label && (
        <text
          x={mid.x}
          y={mid.y - 6}
          textAnchor="middle"
          fontSize="10"
          fill={color}
          className="pointer-events-none select-none"
        >
          {edge.label}
        </text>
      )}
    </g>
  )
}

// ── Node element ──────────────────────────────────────────────────────────────

function DiagramNodeEl({
  node,
  isHighlighted,
  isSelected,
  onSelect,
}: {
  node: DiagramNode
  isHighlighted: boolean
  isSelected: boolean
  onSelect: (n: DiagramNode) => void
}) {
  const type   = node.type ?? 'default'
  const c      = NODE_COLORS[type]
  const Icon   = NODE_ICONS[type]

  return (
    <g
      transform={`translate(${node.x}, ${node.y})`}
      onClick={() => onSelect(node)}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(node)}
      role="button"
      tabIndex={0}
      aria-label={node.label}
      aria-pressed={isSelected}
      style={{ cursor: 'pointer' }}
    >
      {/* Glow ring on selected/highlighted */}
      {(isSelected || isHighlighted) && (
        <circle r={NODE_R + 6} fill="none" stroke="#6366f1" strokeWidth="1.5" opacity="0.5" />
      )}
      {/* Main circle */}
      <circle
        r={NODE_R}
        fill={c.bg}
        stroke={isSelected ? '#6366f1' : isHighlighted ? '#818cf8' : c.stroke}
        strokeWidth={isSelected ? 2 : 1.5}
      />
      {/* Icon via foreignObject */}
      <foreignObject x={-14} y={-14} width={28} height={28} style={{ pointerEvents: 'none' }}>
        <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.icon }}>
          <Icon className="size-5" />
        </div>
      </foreignObject>
      {/* Label below */}
      <text
        y={NODE_R + 14}
        textAnchor="middle"
        fontSize="11"
        fontWeight="600"
        fill="#d4d4d8"
        className="select-none pointer-events-none"
      >
        {node.label}
      </text>
      {node.sublabel && (
        <text
          y={NODE_R + 26}
          textAnchor="middle"
          fontSize="9"
          fill="#71717a"
          className="select-none pointer-events-none"
        >
          {node.sublabel}
        </text>
      )}
    </g>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export const InteractiveDiagram = memo(function InteractiveDiagram({
  nodes,
  edges           = [],
  highlightedNodes = [],
  highlightedEdges = [],
  onNodeClick,
  onEdgeClick,
  showTooltips     = true,
  enableZoom       = true,
  enablePan        = true,
  initialZoom      = 1,
  viewWidth        = VW,
  viewHeight       = VH,
  className,
}: InteractiveDiagramProps) {
  const [selectedNode, setSelectedNode] = useState<DiagramNode | null>(null)
  const [zoom,         setZoom]         = useState(initialZoom)
  const [pan,          setPan]          = useState({ x: 0, y: 0 })
  const panStart                        = useRef<{ px: number; py: number; ox: number; oy: number } | null>(null)

  const nodeMap = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes])

  const handleNodeSelect = useCallback((n: DiagramNode) => {
    setSelectedNode((prev) => (prev?.id === n.id ? null : n))
    onNodeClick?.(n)
  }, [onNodeClick])

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (!enableZoom) return
    e.preventDefault()
    setZoom((z) => Math.min(3, Math.max(0.4, z - e.deltaY * 0.001)))
  }, [enableZoom])

  const handlePointerDown = useCallback((e: PointerEvent<SVGSVGElement>) => {
    if (!enablePan || e.target !== e.currentTarget) return
    panStart.current = { px: e.clientX, py: e.clientY, ox: pan.x, oy: pan.y }
    ;(e.currentTarget as SVGSVGElement).setPointerCapture(e.pointerId)
  }, [enablePan, pan])

  const handlePointerMove = useCallback((e: PointerEvent<SVGSVGElement>) => {
    if (!panStart.current) return
    const dx = e.clientX - panStart.current.px
    const dy = e.clientY - panStart.current.py
    setPan({ x: panStart.current.ox + dx, y: panStart.current.oy + dy })
  }, [])

  const handlePointerUp = useCallback(() => {
    panStart.current = null
  }, [])

  const transform = `translate(${pan.x}, ${pan.y}) scale(${zoom})`

  return (
    <div className={cn('relative rounded-xl overflow-hidden border border-border bg-zinc-950', className)}>
      <svg
        viewBox={`0 0 ${viewWidth} ${viewHeight}`}
        className="w-full h-auto"
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{ touchAction: 'none', cursor: enablePan ? 'grab' : 'default' }}
        role="img"
        aria-label="Interactive Network Diagram"
      >
        <defs>
          {Object.entries(EDGE_COLORS).map(([key, color]) => (
            <marker key={key} id={`arrow-${key}`} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill={color} />
            </marker>
          ))}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <g transform={transform}>
          {/* Edges */}
          {edges.map((edge) => {
            const a = nodeMap.get(edge.from)
            const b = nodeMap.get(edge.to)
            if (!a || !b) return null
            return (
              <DiagramEdgeEl
                key={edge.id}
                edge={edge}
                a={a}
                b={b}
                isHighlighted={highlightedEdges.includes(edge.id)}
                onClick={onEdgeClick ? () => onEdgeClick(edge) : undefined}
              />
            )
          })}

          {/* Nodes */}
          {nodes.map((node) => (
            <DiagramNodeEl
              key={node.id}
              node={node}
              isHighlighted={highlightedNodes.includes(node.id)}
              isSelected={selectedNode?.id === node.id}
              onSelect={handleNodeSelect}
            />
          ))}
        </g>
      </svg>

      {/* Tooltip panel */}
      <AnimatePresence>
        {showTooltips && selectedNode && (
          <motion.div
            key={selectedNode.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-3 left-3 right-3 rounded-xl border border-border bg-card/95 backdrop-blur-sm p-3 shadow-xl"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-bold text-sm text-foreground">{selectedNode.label}</p>
                {selectedNode.sublabel && (
                  <p className="text-xs text-muted-foreground">{selectedNode.sublabel}</p>
                )}
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                aria-label="Close tooltip"
                className="text-muted-foreground hover:text-foreground shrink-0 text-lg leading-none"
              >
                ×
              </button>
            </div>
            {selectedNode.description && (
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                {selectedNode.description}
              </p>
            )}
            {selectedNode.metadata && Object.keys(selectedNode.metadata).length > 0 && (
              <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
                {Object.entries(selectedNode.metadata).map(([k, v]) => (
                  <div key={k} className="flex gap-1 text-xs">
                    <dt className="text-muted-foreground shrink-0">{k}:</dt>
                    <dd className="text-foreground font-mono">{v}</dd>
                  </div>
                ))}
              </dl>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zoom controls */}
      {enableZoom && (
        <div className="absolute top-3 right-3 flex flex-col gap-1">
          <button
            onClick={() => setZoom((z) => Math.min(3, z + 0.2))}
            aria-label="Zoom in"
            className="w-8 h-8 rounded-lg border border-border bg-card/90 text-foreground hover:bg-muted flex items-center justify-center text-sm font-bold transition-colors"
          >+</button>
          <button
            onClick={() => setZoom((z) => Math.max(0.4, z - 0.2))}
            aria-label="Zoom out"
            className="w-8 h-8 rounded-lg border border-border bg-card/90 text-foreground hover:bg-muted flex items-center justify-center text-sm font-bold transition-colors"
          >−</button>
          <button
            onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }) }}
            aria-label="Reset view"
            className="w-8 h-8 rounded-lg border border-border bg-card/90 text-foreground hover:bg-muted flex items-center justify-center text-xs transition-colors"
          >⌂</button>
        </div>
      )}
    </div>
  )
})
