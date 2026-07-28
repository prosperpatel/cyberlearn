import { memo, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  AlertTriangle, ShieldAlert, Lightbulb, CheckCircle2, BookOpen, Info, ChevronDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CalloutProps, CalloutVariant } from '../../types'

const VARIANT_CONFIG: Record<CalloutVariant, {
  icon:      React.ComponentType<{ className?: string }>
  label:     string
  container: string
  icon_cls:  string
  title_cls: string
}> = {
  danger: {
    icon:      ShieldAlert,
    label:     'Danger',
    container: 'bg-red-950/40 border-red-500/50 text-red-100',
    icon_cls:  'text-red-400',
    title_cls: 'text-red-300',
  },
  warning: {
    icon:      AlertTriangle,
    label:     'Warning',
    container: 'bg-amber-950/40 border-amber-500/50 text-amber-100',
    icon_cls:  'text-amber-400',
    title_cls: 'text-amber-300',
  },
  tip: {
    icon:      Lightbulb,
    label:     'Tip',
    container: 'bg-blue-950/40 border-blue-500/50 text-blue-100',
    icon_cls:  'text-blue-400',
    title_cls: 'text-blue-300',
  },
  'best-practice': {
    icon:      CheckCircle2,
    label:     'Best Practice',
    container: 'bg-emerald-950/40 border-emerald-500/50 text-emerald-100',
    icon_cls:  'text-emerald-400',
    title_cls: 'text-emerald-300',
  },
  remember: {
    icon:      BookOpen,
    label:     'Remember',
    container: 'bg-violet-950/40 border-violet-500/50 text-violet-100',
    icon_cls:  'text-violet-400',
    title_cls: 'text-violet-300',
  },
  info: {
    icon:      Info,
    label:     'Info',
    container: 'bg-sky-950/40 border-sky-500/50 text-sky-100',
    icon_cls:  'text-sky-400',
    title_cls: 'text-sky-300',
  },
}

export const Callout = memo(function Callout({
  variant,
  title,
  children,
  className,
  collapsible = false,
}: CalloutProps) {
  const [open, setOpen]  = useState(true)
  const reduced          = useReducedMotion()
  const cfg              = VARIANT_CONFIG[variant]
  const Icon             = cfg.icon
  const displayTitle     = title ?? cfg.label

  return (
    <div
      role="note"
      aria-label={`${displayTitle} callout`}
      className={cn(
        'rounded-xl border px-4 py-3 text-sm',
        cfg.container,
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <Icon className={cn('size-4 shrink-0', cfg.icon_cls)} aria-hidden />
        <span className={cn('font-semibold flex-1', cfg.title_cls)}>{displayTitle}</span>
        {collapsible && (
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Collapse' : 'Expand'}
            className="ml-auto rounded p-0.5 opacity-70 hover:opacity-100 transition-opacity"
          >
            <motion.div
              animate={{ rotate: open ? 0 : -90 }}
              transition={reduced ? { duration: 0 } : { duration: 0.2 }}
            >
              <ChevronDown className="size-4" />
            </motion.div>
          </button>
        )}
      </div>

      {/* Body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-2 leading-relaxed">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})
