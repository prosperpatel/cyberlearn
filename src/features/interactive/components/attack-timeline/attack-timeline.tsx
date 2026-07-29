import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  Search, Eye, Zap, Anchor, Flame, ShieldCheck, ChevronRight, ChevronLeft,
  Clock, AlertTriangle, Info,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type {
  AttackPhase, AttackTimelineProps, EventSeverity, TimelineEvent,
} from '../../types'

// ── Phase config ──────────────────────────────────────────────────────────────

const PHASE_CONFIG: Record<AttackPhase, {
  icon:  React.ComponentType<{ className?: string }>
  color: string
  bg:    string
  pill:  string
}> = {
  discovery:    { icon: Search,      color: 'text-blue-400',   bg: 'bg-blue-950/50',   pill: 'bg-blue-900/60 text-blue-300   border-blue-700/60' },
  recon:        { icon: Eye,         color: 'text-violet-400', bg: 'bg-violet-950/50', pill: 'bg-violet-900/60 text-violet-300 border-violet-700/60' },
  exploitation: { icon: Zap,         color: 'text-orange-400', bg: 'bg-orange-950/50', pill: 'bg-orange-900/60 text-orange-300 border-orange-700/60' },
  persistence:  { icon: Anchor,      color: 'text-amber-400',  bg: 'bg-amber-950/50',  pill: 'bg-amber-900/60  text-amber-300  border-amber-700/60'  },
  impact:       { icon: Flame,       color: 'text-red-400',    bg: 'bg-red-950/50',    pill: 'bg-red-900/60    text-red-300    border-red-700/60'    },
  recovery:     { icon: ShieldCheck, color: 'text-emerald-400',bg: 'bg-emerald-950/50',pill: 'bg-emerald-900/60 text-emerald-300 border-emerald-700/60' },
}

const SEVERITY_CONFIG: Record<EventSeverity, { label: string; cls: string }> = {
  low:      { label: 'Low',      cls: 'text-zinc-400 bg-zinc-800'         },
  medium:   { label: 'Medium',   cls: 'text-amber-400 bg-amber-900/40'    },
  high:     { label: 'High',     cls: 'text-orange-400 bg-orange-900/40'  },
  critical: { label: 'Critical', cls: 'text-red-400 bg-red-900/40'        },
}

// ── Event card ────────────────────────────────────────────────────────────────

function EventCard({
  event,
  onClick,
  active,
}: {
  event:    TimelineEvent
  onClick?: (e: TimelineEvent) => void
  active:   boolean
}) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      key={event.id}
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      onClick={() => onClick?.(event)}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.(event)}
      className={cn(
        'rounded-xl border p-4 space-y-2 transition-colors',
        active
          ? 'border-primary/50 bg-primary/5'
          : 'border-border bg-card/60 hover:border-border/80',
        onClick && 'cursor-pointer',
      )}
    >
      <div className="flex items-start gap-2">
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">{event.title}</p>
          {event.timestamp && (
            <div className="flex items-center gap-1 mt-0.5">
              <Clock className="size-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{event.timestamp}</span>
            </div>
          )}
        </div>
        {event.severity && (
          <span className={cn('rounded px-1.5 py-0.5 text-xs font-medium', SEVERITY_CONFIG[event.severity].cls)}>
            {SEVERITY_CONFIG[event.severity].label}
          </span>
        )}
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">{event.description}</p>

      {event.technique && (
        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
          <Info className="size-3" />
          <span>{event.mitreId && <span className="font-mono">{event.mitreId} – </span>}{event.technique}</span>
        </div>
      )}

      {event.ioc && (
        <div className="flex items-center gap-1.5 text-xs">
          <AlertTriangle className="size-3 text-amber-400" />
          <span className="font-mono text-amber-400/80">{event.ioc}</span>
        </div>
      )}

      {event.artifacts && event.artifacts.length > 0 && (
        <div className="flex flex-wrap gap-1 pt-1">
          {event.artifacts.map((a) => (
            <span key={a} className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs font-mono text-zinc-400">
              {a}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export const AttackTimeline = memo(function AttackTimeline({
  phases,
  onPhaseChange,
  onEventClick,
  className,
  autoPlay          = false,
  autoPlayInterval  = 4000,
}: AttackTimelineProps) {
  const [activeIdx,     setActiveIdx]     = useState(0)
  const [activeEventId, setActiveEventId] = useState<string | null>(null)
  const [playing,       setPlaying]       = useState(autoPlay)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const activePhase = phases[activeIdx]
  const cfg         = activePhase ? PHASE_CONFIG[activePhase.phase] : null

  const goTo = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(phases.length - 1, idx))
    setActiveIdx(clamped)
    setActiveEventId(null)
    onPhaseChange?.(phases[clamped].phase, clamped)
  }, [phases, onPhaseChange])

  useEffect(() => {
    if (!playing) { if (timerRef.current) clearInterval(timerRef.current); return }
    timerRef.current = setInterval(() => {
      setActiveIdx((i) => {
        const next = i + 1
        if (next >= phases.length) { setPlaying(false); return i }
        onPhaseChange?.(phases[next].phase, next)
        return next
      })
    }, autoPlayInterval)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [playing, phases, autoPlayInterval, onPhaseChange])

  return (
    <div
      className={cn('rounded-2xl border border-border bg-card overflow-hidden', className)}
      role="region"
      aria-label="Attack Timeline"
    >
      {/* Phase pills */}
      <div className="border-b border-border bg-card/80 px-4 py-3 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          {phases.map((p, i) => {
            const pcfg = PHASE_CONFIG[p.phase]
            const Icon = pcfg.icon
            const active = i === activeIdx
            return (
              <button
                key={p.phase}
                onClick={() => goTo(i)}
                aria-pressed={active}
                className={cn(
                  'flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all',
                  active ? pcfg.pill : 'border-border text-muted-foreground hover:border-border/80',
                )}
              >
                <Icon className={cn('size-3.5', active ? pcfg.color : '')} aria-hidden />
                {p.label}
                <span className={cn('ml-0.5 opacity-60', active ? '' : 'text-muted-foreground')}>
                  ({p.events.length})
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Active phase body */}
      <AnimatePresence mode="wait">
        {activePhase && cfg && (
          <motion.div
            key={activePhase.phase}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="p-4 space-y-3"
          >
            <div className={cn('flex items-center gap-2 rounded-lg px-3 py-2', cfg.bg)}>
              {(() => { const Icon = cfg.icon; return <Icon className={cn('size-5', cfg.color)} /> })()}
              <span className={cn('font-bold', cfg.color)}>{activePhase.label}</span>
              <span className="text-xs text-muted-foreground ml-auto">
                Phase {activeIdx + 1} of {phases.length}
              </span>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {activePhase.events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={onEventClick ? (e) => { setActiveEventId(e.id); onEventClick(e) } : undefined}
                  active={event.id === activeEventId}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="border-t border-border px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => goTo(activeIdx - 1)}
          disabled={activeIdx === 0}
          aria-label="Previous phase"
          className="rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 transition-colors"
        >
          <ChevronLeft className="size-4" />
        </button>

        <div className="flex-1 flex justify-center gap-1.5">
          {phases.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Phase ${i + 1}`}
              className={cn(
                'rounded-full transition-all',
                i === activeIdx ? 'w-4 h-2 bg-primary' : 'w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/60',
              )}
            />
          ))}
        </div>

        <button
          onClick={() => goTo(activeIdx + 1)}
          disabled={activeIdx >= phases.length - 1}
          aria-label="Next phase"
          className="rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 transition-colors"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  )
})
