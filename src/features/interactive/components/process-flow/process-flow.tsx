import { memo, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { FlowEdge, FlowNode, FlowNodeShape, ProcessFlowProps } from '../../types'

// ── Shape helpers ─────────────────────────────────────────────────────────────

const NODE_W = 120
const NODE_H = 44

function nodeShapePath(shape: FlowNodeShape, x: number, y: number): string {
  const hw = NODE_W / 2
  const hh = NODE_H / 2
  const cx = x + hw
  const cy = y + hh
  switch (shape) {
    case 'diamond':
      return `M ${cx} ${y} L ${x + NODE_W} ${cy} L ${cx} ${y + NODE_H} L ${x} ${cy} Z`
    case 'oval':
      return `M ${x + hh} ${y} A ${hh} ${hh} 0 0 0 ${x + hh} ${y + NODE_H} L ${x + NODE_W - hh} ${y + NODE_H} A ${hh} ${hh} 0 0 0 ${x + NODE_W - hh} ${y} Z`
    case 'parallelogram':
      return `M ${x + 14} ${y} L ${x + NODE_W} ${y} L ${x + NODE_W - 14} ${y + NODE_H} L ${x} ${y + NODE_H} Z`
    case 'cylinder': {
      const rx = hw, ry = 8
      return `M ${x} ${y + ry} A ${rx} ${ry} 0 0 1 ${x + NODE_W} ${y + ry} L ${x + NODE_W} ${y + NODE_H - ry} A ${rx} ${ry} 0 0 1 ${x} ${y + NODE_H - ry} Z`
    }
    default:
      return `M ${x + 6} ${y} L ${x + NODE_W - 6} ${y} Q ${x + NODE_W} ${y} ${x + NODE_W} ${y + 6} L ${x + NODE_W} ${y + NODE_H - 6} Q ${x + NODE_W} ${y + NODE_H} ${x + NODE_W - 6} ${y + NODE_H} L ${x + 6} ${y + NODE_H} Q ${x} ${y + NODE_H} ${x} ${y + NODE_H - 6} L ${x} ${y + 6} Q ${x} ${y} ${x + 6} ${y} Z`
  }
}

const VARIANT_STYLES: Record<
  NonNullable<FlowNode['variant']>,
  { fill: string; stroke: string; text: string }
> = {
  default:  { fill: '#27272a', stroke: '#3f3f46', text: '#d4d4d8' },
  start:    { fill: '#052e16', stroke: '#16a34a', text: '#86efac' },
  end:      { fill: '#1e1b4b', stroke: '#6366f1', text: '#a5b4fc' },
  decision: { fill: '#1c1917', stroke: '#d97706', text: '#fcd34d' },
  error:    { fill: '#1f0a0a', stroke: '#ef4444', text: '#fca5a5' },
}

const EDGE_STYLES = {
  normal: '#3f3f46',
  yes:    '#16a34a',
  no:     '#ef4444',
  error:  '#dc2626',
} as const

// ── Edge path ─────────────────────────────────────────────────────────────────

function edgePath(from: FlowNode, to: FlowNode): string {
  const fx = from.x + NODE_W / 2
  const fy = from.y + NODE_H
  const tx = to.x + NODE_W / 2
  const ty = to.y
  const midY = (fy + ty) / 2
  return `M ${fx} ${fy} C ${fx} ${midY}, ${tx} ${midY}, ${tx} ${ty}`
}

// ── Main component ─────────────────────────────────────────────────────────────

export const ProcessFlow = memo(function ProcessFlow({
  nodes,
  edges,
  activeNodeId,
  onNodeClick,
  className,
  animated = true,
}: ProcessFlowProps) {
  const reduced = useReducedMotion()

  const viewBox = useMemo(() => {
    if (!nodes.length) return '0 0 400 300'
    const maxX = Math.max(...nodes.map((n) => n.x + NODE_W)) + 20
    const maxY = Math.max(...nodes.map((n) => n.y + NODE_H)) + 20
    return `0 0 ${maxX} ${maxY}`
  }, [nodes])

  const nodeMap = useMemo(
    () => new Map(nodes.map((n) => [n.id, n])),
    [nodes],
  )

  return (
    <div
      className={cn('w-full overflow-x-auto rounded-xl border border-border bg-card', className)}
      role="img"
      aria-label="Process Flow Diagram"
    >
      <svg
        viewBox={viewBox}
        className="w-full h-auto min-h-[200px]"
        style={{ fontFamily: 'inherit' }}
      >
        <defs>
          {Object.entries(EDGE_STYLES).map(([key, color]) => (
            <marker
              key={key}
              id={`arrow-${key}`}
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L0,6 L8,3 z" fill={color} />
            </marker>
          ))}
        </defs>

        {/* Edges */}
        {edges.map((edge: FlowEdge) => {
          const fromNode = nodeMap.get(edge.from)
          const toNode   = nodeMap.get(edge.to)
          if (!fromNode || !toNode) return null
          const type   = edge.type ?? 'normal'
          const color  = EDGE_STYLES[type]
          const d      = edgePath(fromNode, toNode)
          const midX   = (fromNode.x + toNode.x) / 2 + NODE_W / 2
          const midY   = (fromNode.y + NODE_H + toNode.y) / 2

          return (
            <g key={edge.id}>
              <motion.path
                d={d}
                stroke={color}
                strokeWidth="1.5"
                fill="none"
                markerEnd={`url(#arrow-${type})`}
                initial={animated && !reduced ? { pathLength: 0 } : undefined}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              />
              {edge.label && (
                <text x={midX} y={midY} textAnchor="middle" fontSize="10" fill={color} dy="-4">
                  {edge.label}
                </text>
              )}
            </g>
          )
        })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const v    = node.variant ?? 'default'
          const s    = VARIANT_STYLES[v]
          const d    = nodeShapePath(node.shape, node.x, node.y)
          const isActive = node.id === activeNodeId

          return (
            <motion.g
              key={node.id}
              initial={animated && !reduced ? { opacity: 0, scale: 0.8 } : undefined}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              onClick={() => onNodeClick?.(node)}
              style={{ cursor: onNodeClick ? 'pointer' : 'default' }}
              role={onNodeClick ? 'button' : undefined}
              aria-label={node.label}
            >
              <path
                d={d}
                fill={s.fill}
                stroke={isActive ? '#6366f1' : s.stroke}
                strokeWidth={isActive ? 2 : 1.5}
              />
              {isActive && (
                <path d={d} fill="none" stroke="#6366f1" strokeWidth="3" opacity="0.3" />
              )}
              <foreignObject
                x={node.x}
                y={node.y}
                width={NODE_W}
                height={NODE_H}
                style={{ pointerEvents: 'none' }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 8px',
                  }}
                >
                  <span
                    style={{
                      color: s.text,
                      fontSize: '11px',
                      fontWeight: 600,
                      textAlign: 'center',
                      lineHeight: 1.3,
                      wordBreak: 'break-word',
                    }}
                  >
                    {node.label}
                  </span>
                </div>
              </foreignObject>
            </motion.g>
          )
        })}
      </svg>
    </div>
  )
})
