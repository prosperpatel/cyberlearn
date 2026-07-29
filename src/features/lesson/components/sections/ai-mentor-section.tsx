import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, User, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import type { AIMentorSection } from '@/types/lesson-engine'

interface Props { section: AIMentorSection }

interface Message {
  role:    'user' | 'assistant'
  content: string
}

function generateDemoResponse(prompt: string, _topic: string): string {
  const lower = prompt.toLowerCase()

  if (lower.includes('cia') || lower.includes('triad')) {
    return `Think of the CIA Triad as the three things every defender is protecting:\n\n🔒 **Confidentiality** — Only authorized people can see the data. A stolen patient file is a confidentiality failure.\n\n✏️ **Integrity** — Data is accurate and unmodified. The Bangladesh Bank heist worked by changing wire transfer instructions — an integrity attack.\n\n⚡ **Availability** — Systems are accessible when needed. WannaCry was an availability attack — it stole nothing, just made everything stop working.\n\nEvery security incident violates one or more of these three. Which one matters most depends entirely on context.`
  }

  if (lower.includes('wannacry') || lower.includes('nhs') || lower.includes('ransomware')) {
    return `WannaCry is a perfect case study because it challenges the assumption that security is about protecting data.\n\nWannaCry was an **availability attack**. It didn't steal a single patient record. It encrypted files so they became unreadable — and hospitals couldn't function without them.\n\nThe spread mechanism is what makes it significant: it exploited EternalBlue, an NSA-developed exploit that leaked publicly. WannaCry automated that exploit to spread through networks without any user clicking anything.\n\nThe patch was available for months. The NHS hadn't applied it. That's the real lesson: **known vulnerabilities with available patches are not acceptable risks**.`
  }

  if (lower.includes('sql') || lower.includes('inject')) {
    return `Imagine you're asking a librarian: "Show me books by [author]." A normal person gives you an author name. An attacker says: "Harry Potter' OR '1'='1".\n\nThe librarian follows the instruction literally and shows you every book in the library.\n\nSQL injection works the same way — the database can't tell the difference between legitimate input and code. The fix is parameterized queries: you tell the database "treat this as data, never as code."`
  }

  if (lower.includes('soc') || lower.includes('analyst') || lower.includes('career')) {
    return `A SOC (Security Operations Centre) analyst's day is less like what you see in movies and more like being an air traffic controller.\n\nYou're monitoring hundreds of alerts — most of them are false positives, benign events your detection rules incorrectly flagged. The skill is sustained quality of attention over long periods of routine work.\n\nThe Target breach in 2013 is the cautionary tale: they had a world-class detection tool (FireEye) that correctly identified the attackers. The alert was reviewed. No action was taken. 40 million cards were stolen.\n\nThe technology was fine. The organizational response wasn't. That's why security is never just a technology problem.`
  }

  if (lower.includes('mindset') || lower.includes('think') || lower.includes('adversar')) {
    return `The security mindset is really four habits working together:\n\n1️⃣ **Assume breach** — Design your defences for the world where attackers are already inside, not just trying to keep them out.\n\n2️⃣ **Find the weakest link** — Attackers don't attack your strongest point. They find and probe the weakest one. Usually, that's people.\n\n3️⃣ **Think about incentives** — A hospital faces different attackers than a defence contractor. Understanding who's likely to target you tells you where to invest.\n\n4️⃣ **Fail-safe defaults** — When something breaks, it should fail locked, blocked, and denied — not open.\n\nShimomura used all four of these to track Mitnick. He understood the attacker's incentives, found the patterns (weak link), assumed Mitnick would return (assume breach), and used Mitnick's own operational failures against him.`
  }

  return `Great question about "${prompt.slice(0, 60)}${prompt.length > 60 ? '...' : ''}".\n\nLet me think through this with you rather than just giving you an answer.\n\nWhat aspect concerns you most — the technical mechanism, the human impact, or how defenders actually respond? Each angle leads somewhere different, and I want to make sure we cover what's most useful to you, Recruit.`
}

function AURAAvatar({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dim = size === 'sm' ? 'size-7' : size === 'lg' ? 'size-16' : 'size-10'

  return (
    <div className={cn('relative shrink-0', dim)}>
      <div className={cn(
        'flex items-center justify-center rounded-full font-black text-base-950',
        'bg-gradient-to-br from-cyber-blue via-cyan-400 to-cyber-green shadow-cyber-sm',
        dim,
      )}>
        <span className={cn('font-black leading-none', size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-xl' : 'text-xs')}>
          A
        </span>
      </div>
      {/* Online pulse indicator */}
      <span className="absolute -bottom-0.5 -right-0.5 flex size-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-60" />
        <span className="relative inline-flex rounded-full size-2.5 bg-cyber-green" />
      </span>
    </div>
  )
}

export function AIMentorSectionRenderer({ section }: Props) {
  const [messages, setMessages]   = useState<Message[]>([])
  const [input, setInput]         = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [greeted, setGreeted]     = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  // AURA sends an opening greeting on mount
  useEffect(() => {
    if (greeted) return
    setGreeted(true)
    const timer = setTimeout(() => {
      setMessages([{
        role:    'assistant',
        content: `AURA online.\n\nI'm your AI mentor for this mission. I'm here to help you understand **${section.topic}** — through examples, analogies, or whatever approach makes it click for you.\n\nDon't hesitate to ask anything. There are no wrong questions at this stage of training, Recruit.`,
      }])
    }, 500)
    return () => clearTimeout(timer)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  async function sendMessage(content: string) {
    if (!content.trim() || isLoading) return
    setMessages((m) => [...m, { role: 'user', content }])
    setInput('')
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 700 + Math.random() * 700))
    const response = generateDemoResponse(content, section.topic)
    setMessages((m) => [...m, { role: 'assistant', content: response }])
    setIsLoading(false)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">

      {/* AURA identity header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-4"
      >
        <AURAAvatar size="lg" />
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <h2 className="text-xl font-black text-foreground tracking-tight">AURA</h2>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-cyber-green/30 bg-cyber-green/10 text-[9px] font-bold uppercase tracking-widest text-cyber-green font-mono">
              <Sparkles className="size-2.5" />
              Online
            </span>
          </div>
          <p className="text-xs text-muted-foreground font-mono">
            Adaptive Universal Response Assistant · Cyber Defense Agency
          </p>
          <p className="text-sm text-muted-foreground mt-1.5">
            Ask me anything about <span className="text-foreground font-medium">{section.topic}</span>.
            I'll explain it multiple ways until it clicks.
          </p>
        </div>
      </motion.div>

      {/* Chat window */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border border-border bg-base-900/60 overflow-hidden flex flex-col"
        style={{ height: 420 }}
      >
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={cn(
                  'flex items-end gap-2.5',
                  msg.role === 'user' && 'flex-row-reverse',
                )}
              >
                {/* Avatar */}
                {msg.role === 'assistant' ? (
                  <AURAAvatar size="sm" />
                ) : (
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-base-700 border border-border">
                    <User className="size-3.5 text-muted-foreground" />
                  </div>
                )}

                {/* Bubble */}
                <div className={cn(
                  'max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap',
                  msg.role === 'assistant'
                    ? 'bg-base-800 text-foreground rounded-bl-none'
                    : 'bg-primary/10 text-foreground rounded-br-none border border-primary/20',
                )}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-end gap-2.5"
            >
              <AURAAvatar size="sm" />
              <div className="bg-base-800 rounded-2xl rounded-bl-none px-4 py-3.5">
                <div className="flex gap-1 items-center">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="size-1.5 rounded-full bg-cyber-blue/60 animate-pulse"
                      style={{ animationDelay: `${i * 0.18}s` }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input row */}
        <div className="border-t border-border p-3 flex gap-2 bg-base-900/40">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask AURA a question… (Enter to send)"
            rows={1}
            className={cn(
              'flex-1 resize-none bg-base-800/80 rounded-lg border border-border px-3 py-2',
              'text-sm text-foreground placeholder:text-muted-foreground/60',
              'focus:outline-none focus:border-primary/50 transition-colors',
              'min-h-[38px] max-h-[100px]',
            )}
          />
          <Button
            variant="default"
            size="icon"
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading}
          >
            <Send className="size-4" />
          </Button>
        </div>
      </motion.div>

      {/* Suggested prompts */}
      {section.suggestedPrompts.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Ask AURA
          </p>
          <div className="flex flex-wrap gap-2">
            {section.suggestedPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => sendMessage(prompt)}
                disabled={isLoading}
                className={cn(
                  'text-xs px-3 py-1.5 rounded-full border border-border',
                  'text-muted-foreground hover:text-foreground hover:border-primary/40',
                  'bg-base-800 hover:bg-base-700',
                  'transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed',
                )}
              >
                {prompt}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
