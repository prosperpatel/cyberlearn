export function OnboardingProgress({ step }: { step: number }) {
  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[.15em] text-slate-400">
        <span>Agent setup</span>
        <span aria-hidden>{step} / 7</span>
      </div>
      <div
        role="progressbar"
        aria-label="Onboarding progress"
        aria-valuenow={step}
        aria-valuemin={1}
        aria-valuemax={7}
        className="h-1.5 overflow-hidden rounded-full bg-base-700"
      >
        <div
          className="h-full rounded-full bg-cyber-blue transition-all duration-500"
          style={{ width: `${(step / 7) * 100}%` }}
        />
      </div>
    </div>
  )
}
