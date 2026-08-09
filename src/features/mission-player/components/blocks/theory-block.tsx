import { FileText, Info, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { StandardBlock } from '@/types/mission-engine'

interface Callout {
  type:   'info' | 'warning' | 'tip' | 'danger' | 'insight'
  title?: string
  text:   string
}

interface KeyTerm { term: string; definition: string }

interface TheoryContent {
  title?:    string
  content?:  string
  callouts?: Callout[]
  keyTerms?: KeyTerm[]
}

function renderContent(raw: string) {
  return raw.split('\n\n').map((block, bi) => {
    const lines = block.split('\n')
    const isList = lines.some(l => /^[-•]/.test(l.trim()))
    if (isList) {
      const items = lines.filter(l => l.trim()).map(l => l.replace(/^[-•]\s*/, ''))
      return (
        <ul key={bi} className="space-y-1.5 my-1">
          {items.map((item, ii) => (
            <li key={ii} className="flex items-start gap-2 text-base text-foreground/90 leading-relaxed">
              <span className="mt-2 size-1.5 rounded-full bg-primary/60 shrink-0" />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      )
    }
    return <p key={bi} className="text-base text-foreground/90 leading-relaxed">{renderInline(block)}</p>
  })
}

function renderInline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i} className="text-foreground font-semibold">{part.slice(2, -2)}</strong>
      : <span key={i}>{part}</span>
  )
}

const CALLOUT_STYLES: Record<string, { icon: React.ReactNode; border: string; bg: string; title: string }> = {
  info:    { icon: <Info className="size-4 text-blue-400" />,           border: 'border-blue-500/30',   bg: 'bg-blue-500/8',   title: 'text-blue-400'   },
  warning: { icon: <AlertTriangle className="size-4 text-orange-400" />, border: 'border-orange-500/30', bg: 'bg-orange-500/8', title: 'text-orange-400' },
  tip:     { icon: <Info className="size-4 text-green-400" />,           border: 'border-green-500/30',  bg: 'bg-green-500/8',  title: 'text-green-400'  },
  danger:  { icon: <AlertTriangle className="size-4 text-red-400" />,    border: 'border-red-500/30',    bg: 'bg-red-500/8',    title: 'text-red-400'    },
  insight: { icon: <Info className="size-4 text-purple-400" />,          border: 'border-purple-500/30', bg: 'bg-purple-500/8', title: 'text-purple-400' },
}

export function TheoryBlock({ block }: { block: StandardBlock }) {
  const c        = block.content as TheoryContent
  const title    = c.title    ?? block.title
  const content  = c.content  ?? ''
  const callouts = c.callouts ?? []
  const keyTerms = c.keyTerms ?? []

  return (
    <div className="rounded-xl border border-blue-500/40 bg-base-900 overflow-hidden">
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-blue-500/20" />
      <div className="px-5 sm:px-8 py-6 space-y-6">

        {/* Header */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1.5 rounded-md bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-xs font-black uppercase tracking-widest text-blue-400 font-mono">
            <FileText className="size-3" />
            Theory
          </span>
          <span className="text-xs text-muted-foreground ml-auto">~{block.metadata.estimatedMinutes}min</span>
        </div>

        <h2 className="text-xl font-bold text-foreground">{title}</h2>

        {/* Body */}
        {content && <div className="space-y-3">{renderContent(content)}</div>}

        {/* Callouts */}
        {callouts.map((callout, i) => {
          const style = CALLOUT_STYLES[callout.type] ?? CALLOUT_STYLES.info
          return (
            <div key={i} className={cn('rounded-lg border p-4 space-y-1.5', style.border, style.bg)}>
              <div className="flex items-center gap-2">
                {style.icon}
                {callout.title && (
                  <p className={cn('text-xs font-bold uppercase tracking-wider', style.title)}>{callout.title}</p>
                )}
              </div>
              <p className="text-base text-foreground/85 leading-relaxed">{callout.text}</p>
            </div>
          )
        })}

        {/* Key terms */}
        {keyTerms.length > 0 && (
          <div className="space-y-3 border-t border-border/40 pt-4">
            <p className="text-xs font-black uppercase tracking-wider text-muted-foreground font-mono">Key Terms</p>
            <dl className="space-y-3">
              {keyTerms.map((kt, i) => (
                <div key={i} className="rounded-lg bg-base-800/60 border border-border/40 p-3.5">
                  <dt className="text-sm font-semibold text-blue-400 mb-1">{kt.term}</dt>
                  <dd className="text-base text-muted-foreground leading-relaxed">{kt.definition}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </div>
  )
}
