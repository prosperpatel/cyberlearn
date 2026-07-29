import { motion } from 'framer-motion'
import { Info, AlertTriangle, Lightbulb, AlertCircle, Sparkles, BookMarked, Quote } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ExplanationSection, CalloutType } from '@/types/lesson-engine'

interface Props { section: ExplanationSection }

// ── Callout config ──────────────────────────────────────────────────────────

const CALLOUT_CONFIG: Record<CalloutType, {
  icon:     React.FC<{ className?: string }>
  border:   string
  bg:       string
  headerBg: string
  iconBg:   string
  iconText: string
  bodyText: string
  title:    string
}> = {
  info: {
    icon:     Info,
    border:   'border-primary/25',
    bg:       'bg-primary/4',
    headerBg: 'bg-primary/8',
    iconBg:   'bg-primary/20',
    iconText: 'text-primary',
    bodyText: 'text-foreground/80',
    title:    'Info',
  },
  warning: {
    icon:     AlertTriangle,
    border:   'border-cyber-orange/30',
    bg:       'bg-cyber-orange/4',
    headerBg: 'bg-cyber-orange/8',
    iconBg:   'bg-cyber-orange/20',
    iconText: 'text-cyber-orange',
    bodyText: 'text-foreground/80',
    title:    'Warning',
  },
  tip: {
    icon:     Lightbulb,
    border:   'border-cyber-green/30',
    bg:       'bg-cyber-green/4',
    headerBg: 'bg-cyber-green/8',
    iconBg:   'bg-cyber-green/20',
    iconText: 'text-cyber-green',
    bodyText: 'text-foreground/80',
    title:    'Tip',
  },
  danger: {
    icon:     AlertCircle,
    border:   'border-cyber-red/30',
    bg:       'bg-cyber-red/4',
    headerBg: 'bg-cyber-red/8',
    iconBg:   'bg-cyber-red/20',
    iconText: 'text-cyber-red',
    bodyText: 'text-foreground/80',
    title:    'Danger',
  },
  insight: {
    icon:     Sparkles,
    border:   'border-cyber-purple/35',
    bg:       'bg-cyber-purple/6',
    headerBg: 'bg-cyber-purple/10',
    iconBg:   'bg-cyber-purple/25',
    iconText: 'text-cyber-purple',
    bodyText: 'text-foreground',
    title:    'Key Insight',
  },
}

// ── Inline renderer ─────────────────────────────────────────────────────────

function renderInline(text: string): React.ReactNode {
  // ==highlight==, **bold**, *italic*, `code`
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|==[^=]+==)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
      return <em key={i} className="italic text-foreground/80">{part.slice(1, -1)}</em>
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="font-mono text-[0.875em] bg-base-800 text-cyber-blue px-1.5 py-0.5 rounded-md border border-border/50">
          {part.slice(1, -1)}
        </code>
      )
    }
    if (part.startsWith('==') && part.endsWith('==')) {
      return (
        <mark key={i} className="bg-primary/20 text-primary rounded px-1 not-italic">
          {part.slice(2, -2)}
        </mark>
      )
    }
    return part
  })
}

// ── Markdown table ──────────────────────────────────────────────────────────

function MarkdownTable({ lines }: { lines: string[] }) {
  if (lines.length < 2) return null

  const parseRow = (line: string) =>
    line.split('|').slice(1, -1).map((c) => c.trim())

  const headers  = parseRow(lines[0])
  const dataRows = lines.slice(2).map(parseRow)

  return (
    <div className="overflow-x-auto rounded-2xl border border-border my-8 shadow-sm">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-base-800/80 border-b border-border">
            {headers.map((h, j) => (
              <th key={j} className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-widest whitespace-nowrap">
                {renderInline(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataRows.map((row, ri) => (
            <tr
              key={ri}
              className={cn(
                'border-b border-border/30 last:border-0 transition-colors',
                ri % 2 === 0 ? 'bg-base-900' : 'bg-base-800/25',
                'hover:bg-base-800/50',
              )}
            >
              {row.map((cell, ci) => (
                <td key={ci} className="px-6 py-5 text-foreground leading-[1.7]">
                  {renderInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Markdown parser ─────────────────────────────────────────────────────────

function parseMarkdown(text: string): React.ReactNode[] {
  const lines = text.split('\n')
  const nodes: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // H2 — chapter-level heading with strong separation above
    if (line.startsWith('## ')) {
      nodes.push(
        <h2 key={i} className={cn(
          'text-xl font-bold text-foreground leading-snug',
          'mt-14 mb-5 first:mt-0',
          'pb-3 border-b border-border/40',
        )}>
          {renderInline(line.slice(3))}
        </h2>
      )
      i++; continue
    }

    // H3 — section heading, slightly lighter to create hierarchy
    if (line.startsWith('### ')) {
      nodes.push(
        <h3 key={i} className="text-base font-semibold text-foreground/70 mt-10 mb-4 leading-snug tracking-[0.01em]">
          {renderInline(line.slice(4))}
        </h3>
      )
      i++; continue
    }

    // Horizontal rule — visual chapter break
    if (line.match(/^---+$/)) {
      nodes.push(
        <div key={i} className="flex items-center gap-4 my-10">
          <div className="flex-1 h-px bg-border/40" />
          <div className="flex gap-1">
            <span className="size-1 rounded-full bg-border/60" />
            <span className="size-1 rounded-full bg-border/60" />
            <span className="size-1 rounded-full bg-border/60" />
          </div>
          <div className="flex-1 h-px bg-border/40" />
        </div>
      )
      i++; continue
    }

    // Blockquote > — pull quote
    if (line.startsWith('> ')) {
      const quoteLines: string[] = []
      let attribution = ''
      while (i < lines.length && lines[i].startsWith('> ')) {
        const content = lines[i].slice(2)
        if (content.startsWith('— ') || content.startsWith('- ')) {
          attribution = content.slice(2)
        } else {
          quoteLines.push(content)
        }
        i++
      }
      nodes.push(
        <blockquote key={i} className="my-10 pl-6 border-l-[3px] border-primary/50 space-y-2 py-2">
          <Quote className="size-6 text-primary/25 mb-2" aria-hidden />
          {quoteLines.map((l, li) => (
            <p key={li} className="text-xl italic font-medium text-foreground/85 leading-[1.8]">
              {renderInline(l)}
            </p>
          ))}
          {attribution && (
            <footer className="text-sm text-muted-foreground not-italic font-mono pt-1">
              — {attribution}
            </footer>
          )}
        </blockquote>
      )
      continue
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
        <div key={i} className="my-8 rounded-2xl overflow-hidden border border-border shadow-sm">
          <div className="flex items-center gap-3 bg-base-800 px-5 py-3 border-b border-border">
            <div className="flex gap-1.5">
              <span className="size-3 rounded-full bg-cyber-red/50" />
              <span className="size-3 rounded-full bg-cyber-orange/50" />
              <span className="size-3 rounded-full bg-cyber-green/50" />
            </div>
            {lang && (
              <span className="text-[11px] font-mono text-muted-foreground/70 ml-1 tracking-wider">{lang}</span>
            )}
          </div>
          <pre className="bg-base-950 px-6 py-5 overflow-x-auto">
            <code className="font-mono text-sm leading-relaxed text-cyber-green whitespace-pre">
              {codeLines.join('\n')}
            </code>
          </pre>
        </div>
      )
      i++; continue
    }

    // Markdown table |…|
    if (line.match(/^\|.+\|$/)) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].match(/^\|.*\|$/)) {
        tableLines.push(lines[i])
        i++
      }
      nodes.push(<MarkdownTable key={i} lines={tableLines} />)
      continue
    }

    // Unordered list
    if (line.match(/^[-*]\s+/)) {
      const listItems: string[] = []
      while (i < lines.length && lines[i].match(/^[-*]\s+/)) {
        listItems.push(lines[i].replace(/^[-*]\s+/, ''))
        i++
      }
      nodes.push(
        <ul key={i} className="my-7 space-y-4 ml-1">
          {listItems.map((item, li) => (
            <li key={li} className="flex items-start gap-3.5">
              <span className="mt-[10px] size-1.5 rounded-full bg-primary/70 shrink-0" />
              <span className="text-[1.0625rem] leading-[1.9] text-foreground/80">{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      )
      continue
    }

    // Numbered list
    if (line.match(/^\d+\.\s+/)) {
      const listItems: { num: string; text: string }[] = []
      while (i < lines.length && lines[i].match(/^\d+\.\s+/)) {
        const m = lines[i].match(/^(\d+)\.\s+(.*)/)!
        listItems.push({ num: m[1], text: m[2] })
        i++
      }
      nodes.push(
        <ol key={i} className="my-7 space-y-4">
          {listItems.map((item, li) => (
            <li key={li} className="flex items-start gap-4">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary text-xs font-bold mt-0.5 border border-primary/20">
                {item.num}
              </span>
              <span className="text-[1.0625rem] leading-[1.9] text-foreground/80 pt-0.5">
                {renderInline(item.text)}
              </span>
            </li>
          ))}
        </ol>
      )
      continue
    }

    // Empty line → spacer
    if (line.trim() === '') { i++; continue }

    // Paragraph — generous line-height and bottom margin
    nodes.push(
      <p key={i} className="text-[1.0625rem] text-foreground/80 leading-[1.9] mb-7 last:mb-0">
        {renderInline(line)}
      </p>
    )
    i++
  }

  return nodes
}

// ── Component ───────────────────────────────────────────────────────────────

export function ExplanationSectionRenderer({ section }: Props) {
  return (
    <div className="max-w-[820px] mx-auto px-6 sm:px-8 py-14 sm:py-20 space-y-10">

      {/* Main prose content */}
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {parseMarkdown(section.content)}
      </motion.article>

      {/* Analogy — conceptual bridge */}
      {section.analogy && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl border border-cyber-purple/25 bg-cyber-purple/5 overflow-hidden"
        >
          <div className="flex items-center gap-3.5 px-6 py-4 border-b border-cyber-purple/15 bg-cyber-purple/8">
            <div className="flex size-8 items-center justify-center rounded-xl bg-cyber-purple/20">
              <span className="text-base" aria-hidden>🧩</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-cyber-purple">Think of it like this…</p>
              <p className="text-[11px] text-cyber-purple/60 mt-0.5">A conceptual bridge</p>
            </div>
          </div>
          <div className="px-6 py-6 space-y-4">
            <p className="text-[1.0625rem] text-foreground leading-[1.9] italic">
              {section.analogy.scenario}
            </p>
            <div className="h-px bg-cyber-purple/12" />
            <p className="text-sm text-muted-foreground leading-[1.75]">
              <span className="font-semibold text-foreground/90">The mapping: </span>
              {section.analogy.mapping}
            </p>
          </div>
        </motion.div>
      )}

      {/* Code blocks */}
      {section.codeBlocks?.map((block, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.05 }}
          className="rounded-2xl overflow-hidden border border-border shadow-sm"
        >
          <div className="flex items-center justify-between bg-base-800 px-5 py-3.5 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="size-3 rounded-full bg-cyber-red/50" />
                <span className="size-3 rounded-full bg-cyber-orange/50" />
                <span className="size-3 rounded-full bg-cyber-green/50" />
              </div>
              <span className="text-[11px] font-mono text-muted-foreground/70 tracking-wider">{block.language}</span>
            </div>
            {block.caption && (
              <span className="text-xs text-muted-foreground/60">{block.caption}</span>
            )}
          </div>
          <pre className="bg-base-950 px-6 py-6 overflow-x-auto">
            <code className="font-mono text-sm leading-relaxed text-cyber-green whitespace-pre">
              {block.code}
            </code>
          </pre>
        </motion.div>
      ))}

      {/* Callouts */}
      {section.callouts?.map((callout, i) => {
        const cfg       = CALLOUT_CONFIG[callout.type]
        const isInsight = callout.type === 'insight'

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 + i * 0.06 }}
            className={cn(
              'rounded-2xl border overflow-hidden',
              cfg.border, cfg.bg,
              isInsight && 'shadow-[0_0_40px_-12px_var(--tw-shadow-color)] shadow-cyber-purple/20',
            )}
          >
            {/* Header */}
            <div className={cn('flex items-center gap-3.5 px-6 py-4 border-b', cfg.border, cfg.headerBg)}>
              <div className={cn('flex size-8 shrink-0 items-center justify-center rounded-xl', cfg.iconBg)}>
                <cfg.icon className={cn('size-4', cfg.iconText)} />
              </div>
              <span className={cn('font-bold text-sm tracking-wide', cfg.iconText)}>
                {callout.title ?? cfg.title}
              </span>
            </div>

            {/* Body */}
            <p className={cn(
              'px-6 leading-[1.85]',
              isInsight ? 'py-6 text-[1.0625rem] font-medium' : 'py-5 text-sm',
              cfg.bodyText,
            )}>
              {callout.text}
            </p>
          </motion.div>
        )
      })}

      {/* Key terms */}
      {section.keyTerms && section.keyTerms.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2.5">
            <BookMarked className="size-4 text-muted-foreground/60" />
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
              Key Terms
            </h3>
          </div>
          <div className="space-y-2.5">
            {section.keyTerms.map((term, i) => (
              <div key={i} className="flex gap-5 px-5 py-4 rounded-xl bg-base-800/50 border border-border/40 hover:bg-base-800/70 transition-colors">
                <code className="font-mono text-xs font-bold text-primary shrink-0 mt-0.5 w-[90px] break-all leading-snug">
                  {term.term}
                </code>
                <p className="text-sm text-muted-foreground leading-[1.75]">
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
