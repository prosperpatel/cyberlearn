import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'

export function ActivationModal({ onContinue }: { onContinue: () => void }) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Move focus into the modal on mount (WCAG 2.4.3).
  useEffect(() => {
    buttonRef.current?.focus()
  }, [])

  // Trap focus: only one interactive element, so Tab and Shift+Tab both cycle back.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      buttonRef.current?.focus()
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="activation-title"
      onKeyDown={handleKeyDown}
      className="fixed inset-0 z-50 grid place-items-center bg-base-950/90 p-5 backdrop-blur"
    >
      <div className="w-full max-w-md rounded-3xl border border-cyber-blue/30 bg-base-900 p-8 text-center shadow-cyber-lg">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-cyber-green/15 text-4xl">
          ✓
        </div>
        <p className="mt-6 text-sm font-bold uppercase tracking-[.2em] text-cyber-blue">
          Mission accepted
        </p>
        <h1 id="activation-title" className="mt-2 text-3xl font-black text-white">
          Cyber Agent Activated
        </h1>
        <div className="my-7 flex justify-center gap-4">
          <div className="rounded-xl bg-base-950 px-5 py-3">
            <b className="block text-xl text-cyber-green">+100 XP</b>
            <span className="text-xs text-slate-400">Starter bonus</span>
          </div>
          <div className="rounded-xl bg-base-950 px-5 py-3">
            <b className="block text-xl text-cyber-blue">Level 1</b>
            <span className="text-xs text-slate-400">Recruit</span>
          </div>
        </div>
        <Button ref={buttonRef} onClick={onContinue} className="w-full">
          Continue to dashboard
        </Button>
      </div>
    </div>
  )
}
