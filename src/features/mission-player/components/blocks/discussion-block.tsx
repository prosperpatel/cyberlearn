import { MessageCircle } from 'lucide-react'
import type { StandardBlock } from '@/types/mission-engine'

interface DiscussionContent {
  title?:          string
  prompt?:         string
  context?:        string
  guideQuestions?: string[]
}

export function DiscussionBlock({ block }: { block: StandardBlock }) {
  const c = block.content as DiscussionContent
  const title          = c.title          ?? block.title
  const prompt         = c.prompt         ?? ''
  const context        = c.context        ?? ''
  const guideQuestions = c.guideQuestions ?? []

  return (
    <div className="rounded-xl border border-purple-500/30 bg-base-900 overflow-hidden">
      <div className="h-1.5 w-full bg-gradient-to-r from-purple-500 to-purple-500/20" />

      <div className="px-5 sm:px-8 py-6 space-y-5">
        {/* Header */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-md bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 text-xs font-black uppercase tracking-widest text-purple-400 font-mono">
            <MessageCircle className="size-3" />
            Discussion
          </span>
          <span className="text-xs text-muted-foreground ml-auto">~{block.metadata.estimatedMinutes}min</span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-foreground leading-snug">{title}</h2>

        {/* Main prompt */}
        <blockquote className="border-l-2 border-purple-500/60 pl-4 text-base text-foreground/90 leading-relaxed italic">
          {prompt}
        </blockquote>

        {/* Context */}
        {context && (
          <div className="rounded-lg bg-base-800/60 border border-border/40 p-4 text-base text-muted-foreground leading-relaxed">
            {context}
          </div>
        )}

        {/* Guide questions */}
        {guideQuestions.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-black uppercase tracking-wider text-muted-foreground font-mono">
              Consider
            </p>
            <ol className="space-y-2">
              {guideQuestions.map((q, i) => (
                <li key={i} className="flex items-start gap-3 text-base text-foreground/80">
                  <span className="shrink-0 mt-0.5 flex size-5 items-center justify-center rounded-full bg-purple-500/15 text-[10px] font-bold text-purple-400 font-mono">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{q}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  )
}
