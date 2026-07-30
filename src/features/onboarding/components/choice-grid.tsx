import type { ReactNode } from 'react'

export function ChoiceGrid<T extends string | number>({
  options,
  value,
  onChange,
  multi = false,
  render,
}: {
  options:  readonly T[]
  value:    T | T[] | undefined
  onChange: (value: T | T[]) => void
  multi?:   boolean
  render:   (option: T) => ReactNode
}) {
  const selected = (option: T) =>
    multi ? Array.isArray(value) && value.includes(option) : value === option

  const choose = (option: T) => {
    if (multi) {
      const current = Array.isArray(value) ? value : []
      onChange(
        current.includes(option)
          ? current.filter(i => i !== option)
          : [...current, option],
      )
    } else {
      onChange(option)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {options.map(option => (
        <button
          key={option}
          type="button"
          aria-pressed={selected(option)}
          onClick={() => choose(option)}
          className={[
            'rounded-xl border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-cyber-blue',
            selected(option)
              ? 'border-cyber-blue bg-cyber-blue/10 text-white shadow-cyber-md'
              : 'border-slate-700 bg-base-900 text-slate-300 hover:border-slate-500',
          ].join(' ')}
        >
          {render(option)}
        </button>
      ))}
    </div>
  )
}
