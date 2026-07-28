import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  Monitor, Network, Router, Shield, Server, AlertTriangle, Cloud, Smartphone,
  Pause, Play, Rewind, Zap, X, ChevronDown, ChevronUp,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { NetworkNodeType, NetworkPacket, PacketFlowVisualizerProps } from '../../types'

// ── Node icons ─────────────────────────────────────────────────────────────────

const NODE_ICONS: Record<NetworkNodeType, React.ComponentType<{ className?: string }>> = {
  computer: Monitor,
  switch:   Network,
  router:   Router,
  firewall: Shield,
  server:   Server,
  attacker: AlertTriangle,
  cloud:    Cloud,
}

const NODE_COLORS: Record<NetworkNodeType, { bg: string; border: string; icon: string }> = {
  computer: { bg: 'bg-blue-950/80',    border: 'border-blue-600/60',    icon: 'text-blue-300' },
  switch:   { bg: 'bg-sky-950/80',     border: 'border-sky-600/60',     icon: 'text-sky-300'  },
  router:   { bg: 'bg-amber-950/80',   border: 'border-amber-600/60',   icon: 'text-amber-300'},
  firewall: { bg: 'bg-emerald-950/80', border: 'border-emerald-600/60', icon: 'text-emerald-300' },
  server:   { bg: 'bg-violet-950/80',  border: 'border-violet-600/60',  icon: 'text-violet-300' },
  attacker: { bg: 'bg-red-950/80',     border: 'border-red-600/60',     icon: 'text-red-300'  },
  cloud:    { bg: 'bg-zinc-900/80',    border: 'border-zinc-600/60',    icon: 'text-zinc-300' },
}

// ── Packet dot ─────────────────────────────────────────────────────────────────

interface ActivePacket {
  packet:    NetworkPacket
  id:        string  // unique per animation instance
  progress:  number  // 0..1 along the path
  speed:     number
  startTime: number
}

const SPEEDS = [0.5, 1, 2, 4]

// ── Main component ─────────────────────────────────────────────────────────────

export const PacketFlowVisualizer = memo(function PacketFlowVisualizer({
  nodes,
  packets,
  onPacketClick,
  autoPlay   = true,
  className,
  direction  = 'horizontal',
}: PacketFlowVisualizerProps) {
  const reduced       = useReducedMotion()
  const [playing,     setPlaying]     = useState(autoPlay)
  const [speedIdx,    setSpeedIdx]    = useState(1)
  const [activePackets, setActive]    = useState<ActivePacket[]>([])
  const [selected,    setSelected]    = useState<NetworkPacket | null>(null)
  const rafRef                        = useRef<number | null>(null)
  const lastTime                      = useRef<number | null>(null)
  const counterRef                    = useRef(0)

  const speed      = SPEEDS[speedIdx]
  const isVertical = direction === 'vertical'

  // Spawn packets and animate them along the node path
  const tick = useCallback((now: number) => {
    const dt = lastTime.current != null ? (now - lastTime.current) / 1000 : 0
    lastTime.current = now

    setActive((prev) => {
      const updated: ActivePacket[] = []
      for (const ap of prev) {
        const next = ap.progress + dt * ap.speed
        if (next >= 1) {
          if (ap.packet.loop) {
            updated.push({ ...ap, progress: 0 })
          }
          // drop finished non-looping packets
        } else {
          updated.push({ ...ap, progress: next })
        }
      }

      // Spawn new packets (one per configured packet that isn't currently active unless loop)
      for (const pkt of packets) {
        const alreadyActive = updated.some((ap) => ap.packet.id === pkt.id)
        if (!alreadyActive) {
          const delay = pkt.delayMs ?? 0
          if (delay === 0 || now > (pkt.delayMs ?? 0)) {
            counterRef.current++
            updated.push({
              packet:    pkt,
              id:        `${pkt.id}-${counterRef.current}`,
              progress:  0,
              speed:     0.15 * speed,
              startTime: now,
            })
          }
        }
      }
      return updated
    })

    if (playing) {
      rafRef.current = requestAnimationFrame(tick)
    }
  }, [playing, packets, speed])

  useEffect(() => {
    if (playing && !reduced) {
      rafRef.current = requestAnimationFrame(tick)
    } else {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [playing, reduced, tick])

  const replay = () => {
    setActive([])
    lastTime.current = null
    setPlaying(true)
  }

  return (
    <div
      className={cn('rounded-2xl border border-border bg-card overflow-hidden', className)}
      role="region"
      aria-label="Packet Flow Visualizer"
    >
      {/* Controls bar */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-2 bg-card/80">
        <button
          onClick={() => setPlaying((v) => !v)}
          aria-label={playing ? 'Pause' : 'Play'}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold bg-muted hover:bg-muted/80 text-foreground transition-colors"
        >
          {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
          {playing ? 'Pause' : 'Resume'}
        </button>
        <button
          onClick={replay}
          aria-label="Replay"
          className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <Rewind className="size-4" />
        </button>
        <button
          onClick={() => setSpeedIdx((i) => (i + 1) % SPEEDS.length)}
          aria-label={`Speed: ${speed}x`}
          className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors font-mono"
        >
          <Zap className="size-3.5" />
          {speed}×
        </button>
        <span className="ml-auto text-xs text-muted-foreground">
          {activePackets.length} packet{activePackets.length !== 1 ? 's' : ''} in flight
        </span>
      </div>

      {/* Network path */}
      <div className={cn(
        'relative p-6 flex gap-0 items-center justify-center',
        isVertical ? 'flex-col' : 'flex-row',
      )}>
        {nodes.map((node, i) => {
          const c    = NODE_COLORS[node.type]
          const Icon = NODE_ICONS[node.type]
          const isLast = i === nodes.length - 1

          return (
            <div
              key={node.id}
              className={cn('flex items-center', isVertical ? 'flex-col' : 'flex-row')}
            >
              <div className="flex flex-col items-center gap-1.5 relative">
                <div
                  className={cn(
                    'relative size-14 rounded-xl border flex items-center justify-center',
                    c.bg, c.border,
                  )}
                  aria-label={node.label}
                >
                  <Icon className={cn('size-6', c.icon)} />

                  {/* Packet dots positioned on this node */}
                  {activePackets
                    .filter((ap) => {
                      const seg    = 1 / (nodes.length - 1)
                      const nodeProgress = i / (nodes.length - 1)
                      const half   = seg / 2
                      return Math.abs(ap.progress - nodeProgress) < half
                    })
                    .map((ap) => (
                      <motion.button
                        key={ap.id}
                        className="absolute size-3.5 rounded-full shadow-lg border border-white/20 cursor-pointer"
                        style={{ backgroundColor: ap.packet.color ?? '#6366f1' }}
                        onClick={() => { setSelected(ap.packet); onPacketClick?.(ap.packet) }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                        aria-label={`Packet: ${ap.packet.label ?? ap.packet.id}`}
                        title={ap.packet.label ?? ap.packet.id}
                      />
                    ))
                  }
                </div>
                <span className="text-xs font-semibold text-foreground whitespace-nowrap">
                  {node.label}
                </span>
                {node.detail && (
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{node.detail}</span>
                )}
              </div>

              {/* Connector line */}
              {!isLast && (
                <div className={cn(
                  'relative flex items-center justify-center',
                  isVertical ? 'h-10 w-0.5 bg-border my-1' : 'w-12 h-0.5 bg-border mx-1',
                )}>
                  {/* Travelling packets on the connector */}
                  {activePackets
                    .filter((ap) => {
                      const seg  = 1 / (nodes.length - 1)
                      const from = i / (nodes.length - 1)
                      const to   = (i + 1) / (nodes.length - 1)
                      return ap.progress > from && ap.progress < to
                    })
                    .map((ap) => {
                      const seg  = 1 / (nodes.length - 1)
                      const from = i / (nodes.length - 1)
                      const localProgress = (ap.progress - from) / seg
                      const pct = localProgress * 100

                      return (
                        <motion.button
                          key={ap.id}
                          className="absolute size-3 rounded-full shadow-lg border border-white/20 cursor-pointer z-10"
                          style={{
                            backgroundColor: ap.packet.color ?? '#6366f1',
                            [isVertical ? 'top' : 'left']: `${pct}%`,
                            transform: 'translate(-50%, -50%)',
                          }}
                          onClick={() => { setSelected(ap.packet); onPacketClick?.(ap.packet) }}
                          aria-label={`Packet: ${ap.packet.label ?? ap.packet.id}`}
                        />
                      )
                    })
                  }
                  <span className={cn(
                    'absolute text-muted-foreground',
                    isVertical ? 'text-xs' : 'text-xs -top-4',
                  )}>→</span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Packet metadata modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="absolute inset-x-4 bottom-4 rounded-xl border border-border bg-card/95 backdrop-blur-sm shadow-xl p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-bold text-sm text-foreground">
                  {selected.label ?? selected.id}
                </h4>
                {selected.metadata && (
                  <p className="text-xs text-muted-foreground">{selected.metadata.protocol}</p>
                )}
              </div>
              <button
                onClick={() => setSelected(null)}
                aria-label="Close packet details"
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            {selected.metadata && (
              <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1.5">
                {Object.entries({
                  Protocol: selected.metadata.protocol,
                  Size:     selected.metadata.size,
                  TTL:      selected.metadata.ttl,
                  Source:   selected.metadata.src,
                  Dest:     selected.metadata.dst,
                  Flags:    selected.metadata.flags?.join(' '),
                  Payload:  selected.metadata.payload,
                  ...selected.metadata.extra,
                })
                  .filter(([, v]) => v != null)
                  .map(([k, v]) => (
                    <div key={k} className="flex gap-1.5 text-xs">
                      <dt className="text-muted-foreground shrink-0">{k}:</dt>
                      <dd className="font-mono text-foreground">{String(v)}</dd>
                    </div>
                  ))}
              </dl>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})
