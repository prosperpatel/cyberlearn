import { motion } from 'framer-motion'
import { Info, AlertTriangle, Lightbulb, AlertCircle, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ExplanationSection, CalloutType } from '@/types/lesson-engine'

interface Props { section: ExplanationSection }

// ── Callout styling ────────────────────────────────────────────────────────

const CALLOUT_CONFIG: Record<CalloutType, {
  icon:    React.FC<{ className?: string }>
  classes: string
  title:   string
}> = {
  info:    { icon: Info,          classes: 'border-primary/30 bg-primary/5 text-primary',          title: 'Info'    },
  warning: { icon: AlertTriangle, classes: 'border-cyber-orange/30 bg-cyber-orange/5 text-cyber-orange', title: 'Warning' },
  tip:     { icon: Lightbulb,     classes: 'border-cyber-green/30 bg-cyber-green/5 text-cyber-green',   title: 'Tip'     },
  danger:  { icon: AlertCircle,   classes: 'border-cyber-red/30 bg-cyber-red/5 text-cyber-red',         title: 'Danger'  },
  insight: { icon: Sparkles,      classes: 'border-cyber-purple/30 bg-cyber-purple/5 text-cyber-purple', title: 'Insight' },
}

// ── Minimal markdown parser ───────────────────────────────────────────────

function parseMarkdown(text: string): React.ReactNode[] {
  const lines = text.split('\n')
  const nodes: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // H2
    if (line.startsWith('## ')) {
      nodes.push(
        <h2 key={i} className="text-xl font-bold text-foreground mt-8 mb-3 first:mt-0">
          {line.slice(3)}
        </h2>
      )
      i++; continue
    }

    // H3
    if (line.startsWith('### ')) {
      nodes.push(
        <h3 key={i} className="text-base font-semibold text-foreground mt-6 mb-2">
          {line.slice(4)}
        </h3>
      )
      i++; continue
    }

    // Fenced code block
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim()
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      nodes.push(
        <pre key={i} className="my-4 rounded-xl bg-base-950 border border-border overflow-x-auto">
          {lang && (
            <div className="flex items-center justify-between px-4 py-2 border-b border-border">
              <span className="text-xs font-mono text-muted-foreground">{lang}</span>
            </div>
          )}
          <code className="block p-4 font-mono text-sm leading-relaxed text-cyber-green whitespace-pre">
            {codeLines.join('\n')}
          </code>
        </pre>
      )
      i++; continue
    }

    // Empty line → spacer
    if (line.trim() === '') { i++; continue }

    // Paragraph — inline formatting
    nodes.push(
      <p key={i} className="text-base text-foreground leading-relaxed mb-4">
        {renderInline(line)}
      </p>
    )
    i++
  }

  return nodes
}

function renderInline(text: string): React.ReactNode {
  // Split on **bold**, *italic*, `code`
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i} className="italic">{part.slice(1, -1)}</em>
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="font-mono text-sm bg-base-800 text-cyber-blue px-1.5 py-0.5 rounded">{part.slice(1, -1)}</code>
    }
    return part
  })
}

// ── Component ─────────────────────────────────────────────────────────────

export function ExplanationSectionRenderer({ section }: Props) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
      {/* Main content */}
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="prose-custom"
      >
        {parseMarkdown(section.content)}
      </motion.article>

      {/* Analogy */}
      {section.analogy && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-xl border border-cyber-purple/30 bg-cyber-purple/5 p-5 space-y-3"
        >
          <div className="flex items-center gap-2 text-cyber-purple font-semibold text-sm">
            <span className="text-lg" aria-hidden>🧩</span>
            Think of it like this...
          </div>
          <p className="text-sm text-foreground leading-relaxed italic">
            {section.analogy.scenario}
          </p>
          <div className="divider-cyber" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">The mapping: </span>
            {section.analogy.mapping}
          </p>
        </motion.div>
      )}

      {/* Code blocks */}
      {section.codeBlocks && section.codeBlocks.map((block, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.05 }}
          className="rounded-xl overflow-hidden border border-border"
        >
          <div className="flex items-center justify-between bg-base-800 px-4 py-2.5 border-b border-border">
            <span className="text-xs font-mono text-muted-foreground">{block.language}</span>
            {block.caption && (
              <span className="text-xs text-muted-foreground">{block.caption}</span>
            )}
          </div>
          <pre className="bg-base-950 p-4 overflow-x-auto">
            <code className="font-mono text-sm leading-relaxed text-cyber-green whitespace-pre">
              {block.code}
            </code>
          </pre>
        </motion.div>
      ))}

      {/* Callouts */}
      {section.callouts && section.callouts.map((callout, i) => {
        const cfg = CALLOUT_CONFIG[callout.type]
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.06 }}
            className={cn('rounded-xl border p-4 space-y-1.5', cfg.classes)}
          >
            <div className="flex items-center gap-2 font-semibold text-sm">
              <cfg.icon className="size-4 shrink-0" />
              {callout.title ?? cfg.title}
            </div>
            <p className="text-sm leading-relaxed opacity-90">{callout.text}</p>
          </motion.div>
        )
      })}

      {/* Key terms */}
      {section.keyTerms && section.keyTerms.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Key Terms
          </h3>
          <div className="space-y-2">
            {section.keyTerms.map((term, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-lg bg-base-800">
                <code className="font-mono text-xs font-bold text-primary shrink-0 mt-0.5">
                  {term.term}
                </code>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {term.definition}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
