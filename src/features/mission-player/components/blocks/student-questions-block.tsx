import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { StandardBlock } from '@/types/mission-engine'

interface FAQ { question: string; answer: string }

interface StudentQuestionsContent {
  intro?: string
  faqs?:  FAQ[]
}

export function StudentQuestionsBlock({ block }: { block: StandardBlock }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const c    = block.content as StudentQuestionsContent
  const intro = c.intro ?? ''
  const faqs  = c.faqs  ?? []

  return (
    <div className="rounded-xl border border-lime-500/30 bg-base-900 overflow-hidden">
      <div className="h-1.5 w-full bg-gradient-to-r from-lime-500 to-lime-500/20" />

      <div className="px-5 sm:px-8 py-6 space-y-5">
        {/* Header */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-md bg-lime-500/10 border border-lime-500/20 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-lime-400 font-mono">
            <HelpCircle className="size-3" />
            Your Questions
          </span>
          <span className="text-xs text-muted-foreground ml-auto">~{block.metadata.estimatedMinutes}min</span>
        </div>

        {intro && <p className="text-sm text-muted-foreground leading-relaxed">{intro}</p>}

        {/* Accordion FAQs */}
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-lg border border-border/50 overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-start gap-3 px-4 py-3.5 text-left hover:bg-base-800/40 transition-colors"
                aria-expanded={openIdx === i}
              >
                <HelpCircle className="size-4 shrink-0 mt-0.5 text-lime-400/70" />
                <span className="flex-1 text-sm font-medium text-foreground leading-snug">{faq.question}</span>
                <ChevronDown className={cn(
                  'size-4 shrink-0 text-muted-foreground transition-transform duration-200',
                  openIdx === i && 'rotate-180',
                )} />
              </button>
              {openIdx === i && (
                <div className="px-4 pb-4 pt-1 border-t border-border/40">
                  <p className="text-sm text-foreground/80 leading-relaxed pl-7">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
