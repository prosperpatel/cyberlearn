import { countryName } from '../utils/countries'
import type { OnboardingData } from '../types/profile'

const rows = (data: OnboardingData) => [
  ['Agent',        data.displayName],
  ['Callsign',     `@${data.username}`],
  ['Country',      data.country ? countryName(data.country) : ''],
  ['Experience',   data.experience],
  ['Mission',      data.goal],
  ['Focus areas',  data.interests.join(', ')],
  ['Daily cadence', data.dailyGoal ? `${data.dailyGoal} minutes` : undefined],
]

export function ReviewStep({ data }: { data: OnboardingData }) {
  return (
    <section>
      <h1 className="text-3xl font-bold text-white">Mission briefing</h1>
      <p className="mt-2 text-slate-400">Review your academy profile before activation.</p>
      <dl className="mt-7 divide-y divide-slate-800 rounded-xl border border-slate-700 bg-base-900 px-4">
        {rows(data).map(([term, desc]) => (
          <div key={term} className="grid grid-cols-1 gap-0.5 py-3 text-sm sm:grid-cols-[8rem_1fr] sm:gap-3 sm:py-4">
            <dt className="text-slate-500">{term}</dt>
            <dd className="font-medium text-slate-100">{desc}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
