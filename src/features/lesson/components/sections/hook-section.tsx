import { motion } from 'framer-motion'
import { Zap, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { HookSection } from '@/types/lesson-engine'

interface Props { section: HookSection }

const ACCENT_STYLES = {
  blue:   { bg: 'from-cyber-blue/20 via-background to-background',   text: 'text-cyber-blue',   glow: 'text-glow-blue',   border: 'border-cyber-blue/20',   stat: 'from-cyber-blue to-cyan-400'   },
  red:    { bg: 'from-cyber-red/20 via-background to-background',    text: 'text-cyber-red',    glow: '',                  border: 'border-cyber-red/20',    stat: 'from-cyber-red to-rose-400'   },
  green:  { bg: 'from-cyber-green/15 via-background to-background',  text: 'text-cyber-green',  glow: 'text-glow-green',  border: 'border-cyber-green/20',  stat: 'from-cyber-green to-emerald-400'  },
  purple: { bg: 'from-cyber-purple/20 via-background to-background', text: 'text-cyber-purple', glow: 'text-glow-purple', border: 'border-cyber-purple/20', stat: 'from-cyber-purple to-violet-400' },
  orange: { bg: 'from-cyber-orange/20 via-background to-background', text: 'text-cyber-orange', glow: '',                  border: 'border-cyber-orange/20', stat: 'from-cyber-orange to-amber-400'  },
} as const

export function HookSectionRenderer({ section }: Props) {
  const accent = ACCENT_STYLES[section.backgroundAccent ?? 'blue']

  return (
    <div className={cn('min-h-[70vh] flex flex-col items-center justify-center', 'relative overflow-hidden px-4 py-16')}>
      {/* Background gradient */}
      <div className={cn('absolute inset-0 bg-gradient-to-b', accent.bg)} aria-hidden />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-20" aria-hidden />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: `radial-gradient(ellipse, currentColor, transparent)` }}
        aria-hidden
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center"
        >
          <div className={cn(
            'inline-flex items-center gap-2 rounded-full px-4 py-1.5',
            'border text-xs font-bold uppercase tracking-widest',
            accent.border, accent.text, 'bg-background/40 backdrop-blur-sm'
          )}>
            <Zap className="size-3" />
            {section.variant === 'statistic' ? 'Shocking Statistic' :
             section.variant === 'question'  ? 'Think About This' :
             section.variant === 'fact'      ? 'Did You Know?' : 'Real Scenario'}
          </div>
        </motion.div>

        {/* Stat (if present) */}
        {section.stat && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.175, 0.885, 0.32, 1.275] }}
            className="space-y-2"
          >
            <div className={cn(
              'text-7xl sm:text-8xl lg:text-9xl font-black tracking-tighter',
              'bg-gradient-to-br bg-clip-text text-transparent',
              accent.stat,
            )}>
              {section.stat.value}
            </div>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <TrendingUp className="size-4" />
              <span className="text-sm font-medium">{section.stat.label}</span>
            </div>
            {section.stat.source && (
              <p className="text-xs text-muted-foreground/60 font-mono">{section.stat.source}</p>
            )}
          </motion.div>
        )}

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight text-foreground"
        >
          {section.headline}
        </motion.h1>

        {/* Subheadline */}
        {section.subheadline && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            {section.subheadline}
          </motion.p>
        )}

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex justify-center pt-4"
        >
          <div className="text-xs text-muted-foreground/50 font-mono animate-bounce">
            ↓ scroll or press Next to continue
          </div>
        </motion.div>
      </div>
    </div>
  )
}
