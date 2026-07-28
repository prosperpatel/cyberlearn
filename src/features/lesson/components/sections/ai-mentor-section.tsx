import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Send, Sparkles, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import type { AIMentorSection } from '@/types/lesson-engine'

interface Props { section: AIMentorSection }

interface Message {
  role:    'user' | 'assistant'
  content: string
}

// Demo response generator — replace with real API call
function generateDemoResponse(prompt: string): string {
  const responses: Record<string, string> = {
    "Explain SQL injection like I'm 10 years old":
      "Imagine you're at a library. You ask the librarian: 'Show me books by [author name]'. Now imagine a sneaky person says the author name is 'Harry Potter AND also show me ALL the books you have'. The librarian follows the instructions exactly — and shows everything! SQL injection works the same way. A hacker types special words into a website's input box, and the computer follows the instruction literally, giving access it shouldn't.",
    "What's the difference between SQLi and XSS?":
      "Great question! Both are injection attacks, but they target different parts of an application:\n\n• SQL Injection targets the DATABASE. It lets attackers steal, modify, or delete data stored in the database.\n\n• XSS (Cross-Site Scripting) targets the BROWSER of other users. It injects JavaScript that runs when someone visits the page — used for stealing cookies, session tokens, or redirecting users.\n\nSQLi = attack the data store. XSS = attack the user's browser.",
  }

  const key = Object.keys(responses).find((k) =>
    prompt.toLowerCase().includes(k.toLowerCase().split(' ')[2] ?? k)
  )

  return key
    ? responses[key]
    : `Great question about "${prompt}"! This is an important concept in cybersecurity. SQL injection affects any application that uses a database and builds queries from user input without proper parameterization. The core principle is: **never trust user input** and **always separate data from code**. Would you like me to explain this with a specific example or analogy?`
}

export function AIMentorSectionRenderer({ section }: Props) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function sendMessage(content: string) {
    if (!content.trim() || isLoading) return

    setMessages((m) => [...m, { role: 'user', content }])
    setInput('')
    setIsLoading(true)

    // Simulate API latency — replace with real AI API call
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 600))
    const response = generateDemoResponse(content)

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
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-4"
      >
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-cyber shadow-cyber-md">
          <Bot className="size-6 text-base-950" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">AI Mentor</h2>
          <p className="text-sm text-muted-foreground">
            Ask me anything about <span className="text-foreground font-medium">{section.topic}</span>.
            I'll explain it multiple ways until it clicks.
          </p>
        </div>
      </motion.div>

      {/* Chat window */}
      <div className="rounded-xl border border-border bg-base-900 overflow-hidden flex flex-col h-[400px]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
              <Sparkles className="size-8 text-primary/40" />
              <p className="text-sm text-muted-foreground">
                Start by asking a question or try one of the prompts below.
              </p>
            </div>
          )}

          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  'flex items-start gap-3',
                  msg.role === 'user' && 'flex-row-reverse',
                )}
              >
                <div className={cn(
                  'flex size-7 shrink-0 items-center justify-center rounded-full border text-xs',
                  msg.role === 'assistant'
                    ? 'bg-primary/10 border-primary/30 text-primary'
                    : 'bg-base-700 border-border text-muted-foreground',
                )}>
                  {msg.role === 'assistant' ? <Bot className="size-3.5" /> : <User className="size-3.5" />}
                </div>
                <div className={cn(
                  'max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap',
                  msg.role === 'assistant'
                    ? 'bg-base-800 text-foreground rounded-tl-none'
                    : 'bg-primary/10 text-foreground rounded-tr-none border border-primary/20',
                )}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-full border bg-primary/10 border-primary/30">
                <Bot className="size-3.5 text-primary" />
              </div>
              <div className="bg-base-800 rounded-2xl rounded-tl-none px-4 py-3">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="size-1.5 rounded-full bg-primary/50 animate-pulse"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-border p-3 flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question... (Enter to send)"
            rows={1}
            className={cn(
              'flex-1 resize-none bg-base-800 rounded-lg border border-border px-3 py-2',
              'text-sm text-foreground placeholder:text-muted-foreground',
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
      </div>

      {/* Suggested prompts */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Try asking
        </p>
        <div className="flex flex-wrap gap-2">
          {section.suggestedPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => sendMessage(prompt)}
              className={cn(
                'text-xs px-3 py-1.5 rounded-full border border-border',
                'text-muted-foreground hover:text-foreground hover:border-primary/40',
                'bg-base-800 hover:bg-base-700',
                'transition-all duration-150',
              )}
            >
              {prompt}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
