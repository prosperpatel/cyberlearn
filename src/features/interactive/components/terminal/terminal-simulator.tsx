import { memo, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Terminal, HelpCircle, CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { TerminalLine, TerminalLineType, TerminalSimulatorProps } from '../../types'

// ── Line color map ────────────────────────────────────────────────────────────

const LINE_COLOR: Record<TerminalLineType, string> = {
  output:  'text-zinc-300',
  command: 'text-emerald-400 font-semibold',
  error:   'text-red-400',
  success: 'text-emerald-300',
  system:  'text-zinc-500 italic',
  comment: 'text-zinc-600',
}

// ── Typing animation hook ─────────────────────────────────────────────────────

function useTypingAnimation(text: string, enabled: boolean, delay = 0) {
  const [displayed, setDisplayed] = useState('')
  const [done,      setDone]      = useState(!enabled)

  useEffect(() => {
    if (!enabled) { setDisplayed(text); setDone(true); return }
    setDisplayed('')
    setDone(false)
    const start = Date.now() + delay
    let i = 0
    const tick = () => {
      const now = Date.now()
      if (now < start) { requestAnimationFrame(tick); return }
      if (i <= text.length) {
        setDisplayed(text.slice(0, i))
        i++
        const t = setTimeout(tick, 25 + Math.random() * 15)
        return () => clearTimeout(t)
      } else {
        setDone(true)
      }
    }
    const t = setTimeout(tick, Math.max(0, delay))
    return () => clearTimeout(t)
  }, [text, enabled, delay])

  return { displayed, done }
}

// ── Rendered terminal line ────────────────────────────────────────────────────

interface LineViewProps {
  line:      TerminalLine
  prompt?:   string
  animate?:  boolean
}

function LineView({ line, prompt = '$', animate = false }: LineViewProps) {
  const reduced = useReducedMotion()
  const shouldAnimate = Boolean(animate && line.animated && !reduced)
  const { displayed } = useTypingAnimation(line.text, shouldAnimate, line.delay ?? 0)
  const text = shouldAnimate ? displayed : line.text

  return (
    <div className={cn('font-mono text-xs leading-6 flex', LINE_COLOR[line.type])}>
      {line.type === 'command' && (
        <span className="text-zinc-500 mr-2 shrink-0">{prompt}</span>
      )}
      <span className="whitespace-pre-wrap break-all">{text}</span>
    </div>
  )
}

// ── Readonly mode ─────────────────────────────────────────────────────────────

function ReadonlyTerminal({
  lines,
  prompt,
}: {
  lines: TerminalLine[]
  prompt: string
}) {
  return (
    <div className="space-y-0.5 p-4">
      {lines.map((line, i) => (
        <LineView key={i} line={line} prompt={prompt} animate />
      ))}
    </div>
  )
}

// ── Guided mode ───────────────────────────────────────────────────────────────

function GuidedTerminal({
  steps,
  prompt,
  onComplete,
  onCommand,
}: {
  steps:      NonNullable<TerminalSimulatorProps['steps']>
  prompt:     string
  onComplete?: () => void
  onCommand?:  (cmd: string, correct?: boolean) => void
}) {
  const [stepIdx,   setStepIdx]   = useState(0)
  const [input,     setInput]     = useState('')
  const [history,   setHistory]   = useState<Array<TerminalLine & { prompt?: string }>>([])
  const [showHint,  setShowHint]  = useState(false)
  const [status,    setStatus]    = useState<'idle' | 'correct' | 'wrong'>('idle')
  const inputRef                  = useRef<HTMLInputElement>(null)
  const endRef                    = useRef<HTMLDivElement>(null)

  const currentStep = steps[stepIdx]
  const finished    = stepIdx >= steps.length

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const submit = () => {
    const cmd     = input.trim()
    const correct = cmd === currentStep.expectedCommand

    setHistory((h) => [
      ...h,
      { prompt, text: cmd, type: 'command' },
      ...(correct ? currentStep.output : [{ text: `bash: ${cmd}: command not found`, type: 'error' as const, animated: false }]),
    ])
    onCommand?.(cmd, correct)

    if (correct) {
      setStatus('correct')
      setTimeout(() => {
        setStatus('idle')
        setShowHint(false)
        if (stepIdx + 1 >= steps.length) {
          onComplete?.()
        } else {
          setStepIdx((s) => s + 1)
        }
        setInput('')
        inputRef.current?.focus()
      }, 600)
    } else {
      setStatus('wrong')
      setTimeout(() => { setStatus('idle'); setInput('') }, 1200)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-0.5">
        {history.map((l, i) => (
          <LineView key={i} line={{ text: l.text, type: l.type }} prompt={l.prompt} />
        ))}

        {!finished && currentStep.description && (
          <div className="mt-3 mb-1 rounded-lg bg-zinc-800/60 border border-zinc-700 px-3 py-2 text-xs text-zinc-300">
            {currentStep.description}
          </div>
        )}

        {finished && (
          <div className="mt-3 flex items-center gap-2 text-emerald-400 text-sm font-semibold">
            <CheckCircle2 className="size-4" />
            All steps complete!
          </div>
        )}
        <div ref={endRef} />
      </div>

      {!finished && (
        <div className="border-t border-zinc-700 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 font-mono text-xs shrink-0">{currentStep.prompt ?? prompt}</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !finished && submit()}
              spellCheck={false}
              autoComplete="off"
              autoFocus
              className={cn(
                'flex-1 bg-transparent font-mono text-xs text-emerald-300 outline-none',
                status === 'wrong' && 'text-red-400 animate-pulse',
              )}
              aria-label="Terminal input"
            />
            {status === 'correct' && <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />}
            {status === 'wrong'   && <XCircle      className="size-4 text-red-400   shrink-0" />}
            {currentStep.hint && (
              <button
                onClick={() => setShowHint((v) => !v)}
                aria-label="Show hint"
                className="shrink-0 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <HelpCircle className="size-4" />
              </button>
            )}
          </div>
          <AnimatePresence>
            {showHint && currentStep.hint && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <p className="mt-2 text-xs text-amber-400/80 italic">{currentStep.hint}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

// ── Practice mode ─────────────────────────────────────────────────────────────

function PracticeTerminal({
  commands = {},
  unknownResponse,
  prompt,
  onCommand,
}: {
  commands?:        TerminalSimulatorProps['commands']
  unknownResponse?: TerminalSimulatorProps['unknownResponse']
  prompt:           string
  onCommand?:       TerminalSimulatorProps['onCommand']
}) {
  const [input,   setInput]   = useState('')
  const [history, setHistory] = useState<TerminalLine[]>([])
  const inputRef              = useRef<HTMLInputElement>(null)
  const endRef                = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const submit = () => {
    const cmd      = input.trim()
    if (!cmd) return
    const response = commands?.[cmd] ?? unknownResponse ?? [
      { text: `bash: ${cmd}: command not found`, type: 'error' as const },
    ]
    setHistory((h) => [
      ...h,
      { text: cmd, type: 'command' as const },
      ...response,
    ])
    onCommand?.(cmd)
    setInput('')
    inputRef.current?.focus()
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-0.5">
        {history.map((l, i) => (
          <LineView key={i} line={l} prompt={prompt} />
        ))}
        <div ref={endRef} />
      </div>
      <div className="border-t border-zinc-700 px-4 py-3 flex items-center gap-2">
        <span className="text-zinc-500 font-mono text-xs shrink-0">{prompt}</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          spellCheck={false}
          autoComplete="off"
          autoFocus
          className="flex-1 bg-transparent font-mono text-xs text-emerald-300 outline-none caret-emerald-400"
          aria-label="Terminal input"
        />
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export const TerminalSimulator = memo(function TerminalSimulator({
  mode,
  title,
  prompt       = '$',
  lines        = [],
  steps        = [],
  commands,
  unknownResponse,
  onComplete,
  onCommand,
  className,
}: TerminalSimulatorProps) {
  return (
    <div
      className={cn(
        'rounded-xl overflow-hidden border border-zinc-700 bg-zinc-950 flex flex-col',
        'min-h-[320px]',
        className,
      )}
      role="region"
      aria-label={title ?? 'Terminal Simulator'}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border-b border-zinc-700 shrink-0">
        <div className="flex gap-1.5">
          <div className="size-3 rounded-full bg-red-500/70" />
          <div className="size-3 rounded-full bg-amber-500/70" />
          <div className="size-3 rounded-full bg-emerald-500/70" />
        </div>
        <div className="flex items-center gap-1.5 ml-2">
          <Terminal className="size-3 text-zinc-500" aria-hidden />
          <span className="text-xs text-zinc-500 font-mono">{title ?? 'terminal'}</span>
        </div>
        <span className="ml-auto text-xs text-zinc-600 capitalize">{mode}</span>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-hidden">
        {mode === 'readonly' && (
          <ReadonlyTerminal lines={lines} prompt={prompt} />
        )}
        {mode === 'guided' && (
          <GuidedTerminal
            steps={steps}
            prompt={prompt}
            onComplete={onComplete}
            onCommand={onCommand}
          />
        )}
        {mode === 'practice' && (
          <PracticeTerminal
            commands={commands}
            unknownResponse={unknownResponse}
            prompt={prompt}
            onCommand={onCommand}
          />
        )}
      </div>
    </div>
  )
})
