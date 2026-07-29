import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { DiagramSection, DiagramNode, DiagramEdge } from '@/types/lesson-engine'

interface Props { section: DiagramSection }

const NODE_STYLES: Record<NonNullable<DiagramNode['type']>, string> = {
  client:   'bg-cyber-blue/10 border-cyber-blue/40 text-cyber-blue',
  server:   'bg-cyber-purple/10 border-cyber-purple/40 text-cyber-purple',
  database: 'bg-cyber-green/10 border-cyber-green/40 text-cyber-green',
  attacker: 'bg-cyber-red/10 border-cyber-red/40 text-cyber-red',
  firewall: 'bg-cyber-orange/10 border-cyber-orange/40 text-cyber-orange',
  default:  'bg-base-700 border-border text-foreground',
}

const NODE_EMOJI: Record<NonNullable<DiagramNode['type']>, string> = {
  client:   '💻',
  server:   '🖥️',
  database: '🗄️',
  attacker: '🕵️',
  firewall: '🛡️',
  default:  '⬡',
}

const EDGE_STYLES: Record<NonNullable<DiagramEdge['type']>, { color: string; label: string }> = {
  normal:  { color: 'border-border text-muted-foreground',            label: '' },
  attack:  { color: 'border-cyber-red/60 text-cyber-red',            label: '⚡' },
  data:    { color: 'border-cyber-green/60 text-cyber-green',        label: '' },
  blocked: { color: 'border-cyber-orange/60 text-cyber-orange',      label: '🚫' },
}

export function DiagramSectionRenderer({ section }: Props) {
  return (
    <div className="max-w-[1040px] mx-auto px-6 sm:px-8 py-14 sm:py-20 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
        <p className="text-muted-foreground leading-relaxed">{section.description}</p>
      </motion.div>

      {/* Flow diagram — vertical chain */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-xl border border-border bg-base-900 p-6"
      >
        <div className="flex flex-col items-center gap-0">
          {section.nodes.map((node, i) => {
            const nodeType = node.type ?? 'default'
            const nodeStyle = NODE_STYLES[nodeType]
            const nodeEmoji = NODE_EMOJI[nodeType]
            const edge = section.edges?.find((e) => e.from === section.nodes[i - 1]?.id && e.to === node.id)
            const edgeStyle = edge ? EDGE_STYLES[edge.type ?? 'normal'] : null

            return (
              <div key={node.id} className="flex flex-col items-center w-full">
                {/* Edge connector */}
                {i > 0 && edge && (
                  <div className="flex flex-col items-center py-2 w-full">
                    <div className={cn('flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-full border', edgeStyle?.color)}>
                      {edgeStyle?.label}
                      {edge.label}
                    </div>
                    <div className={cn('w-0.5 h-4 mt-1', edge.type === 'attack' ? 'bg-cyber-red/40' : edge.type === 'data' ? 'bg-cyber-green/40' : 'bg-border')} />
                    <div className={cn('size-1.5 rounded-full', edge.type === 'attack' ? 'bg-cyber-red' : edge.type === 'data' ? 'bg-cyber-green' : 'bg-border')} />
                  </div>
                )}

                {/* Node */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                  className={cn(
                    'flex items-center gap-3 rounded-xl border px-4 py-3 w-full max-w-sm',
                    nodeStyle,
                  )}
                >
                  <span className="text-2xl shrink-0" aria-hidden>{nodeEmoji}</span>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm">{node.label}</p>
                    {node.detail && (
                      <p className="text-xs opacity-70 mt-0.5 font-mono leading-relaxed">
                        {node.detail}
                      </p>
                    )}
                  </div>
                </motion.div>
              </div>
            )
          })}
        </div>
      </motion.div>

      {section.caption && (
        <p className="text-xs text-muted-foreground text-center italic">{section.caption}</p>
      )}
    </div>
  )
}
