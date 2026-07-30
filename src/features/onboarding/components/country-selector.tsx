import { useEffect, useMemo, useRef, useState } from 'react'
import { Check, ChevronDown, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { COUNTRIES, countryName, detectCountryCode, flagEmoji } from '../utils/countries'

interface CountrySelectorProps {
  value:    string
  onChange: (code: string) => void
  id?:      string
}

export function CountrySelector({ value, onChange, id }: CountrySelectorProps) {
  const [open,        setOpen]        = useState(false)
  const [search,      setSearch]      = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef   = useRef<HTMLButtonElement>(null)
  const searchRef    = useRef<HTMLInputElement>(null)
  const listRef      = useRef<HTMLUListElement>(null)

  // Auto-detect country on first render when no value is saved.
  useEffect(() => {
    if (!value) {
      const code = detectCountryCode()
      if (code) onChange(code)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Filter country list by search query.
  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    if (!q) return COUNTRIES
    return COUNTRIES.filter(
      c => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q),
    )
  }, [search])

  // Focus search input and reset list when panel opens.
  useEffect(() => {
    if (open) {
      setSearch('')
      setActiveIndex(0)
      // Defer focus so the element is mounted.
      requestAnimationFrame(() => searchRef.current?.focus())
    }
  }, [open])

  // Scroll the highlighted item into view.
  useEffect(() => {
    if (!listRef.current) return
    const item = listRef.current.children[activeIndex] as HTMLElement | undefined
    item?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  // Close on outside click.
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  // Reset activeIndex when the filtered list changes.
  useEffect(() => { setActiveIndex(0) }, [filtered])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActiveIndex(i => Math.min(i + 1, filtered.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setActiveIndex(i => Math.max(i - 1, 0))
        break
      case 'Enter':
        e.preventDefault()
        if (filtered[activeIndex]) {
          onChange(filtered[activeIndex].code)
          setOpen(false)
        }
        break
      case 'Escape':
        setOpen(false)
        // Return focus to the trigger so keyboard users don't lose their place.
        triggerRef.current?.focus()
        break
      case 'Tab':
        setOpen(false)
        break
    }
  }

  const select = (code: string) => {
    onChange(code)
    setOpen(false)
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        ref={triggerRef}
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select country"
        onClick={() => setOpen(o => !o)}
        className={cn(
          'mt-2 flex w-full touch-manipulation items-center justify-between gap-2 rounded-xl border bg-base-950 px-4 py-3 text-left text-white transition-colors',
          open ? 'border-cyber-blue' : 'border-slate-700 hover:border-slate-500',
        )}
      >
        {value ? (
          <span className="flex min-w-0 items-center gap-2.5">
            <span aria-hidden className="shrink-0 text-xl leading-none">
              {flagEmoji(value)}
            </span>
            <span className="truncate">{countryName(value)}</span>
          </span>
        ) : (
          <span className="text-slate-500">Select country…</span>
        )}
        <ChevronDown
          className={cn(
            'size-4 shrink-0 text-slate-400 transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute left-0 right-0 z-50 mt-1.5 overflow-hidden rounded-xl border border-slate-700 bg-base-900 shadow-2xl">
          {/* Search input */}
          <div className="flex items-center gap-2 border-b border-slate-700/80 px-3 py-2.5">
            <Search className="size-3.5 shrink-0 text-slate-500" />
            <input
              ref={searchRef}
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search countries…"
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              aria-label="Search countries"
              aria-controls="country-listbox"
              aria-activedescendant={
                filtered[activeIndex] ? `country-opt-${filtered[activeIndex].code}` : undefined
              }
            />
          </div>

          {/* Options list */}
          <ul
            id="country-listbox"
            ref={listRef}
            role="listbox"
            aria-label="Countries"
            className="max-h-60 overflow-y-auto py-1"
          >
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-center text-sm text-slate-500">
                No countries found
              </li>
            ) : (
              filtered.map((c, i) => {
                const isSelected = c.code === value
                const isActive   = i === activeIndex
                return (
                  <li
                    key={c.code}
                    id={`country-opt-${c.code}`}
                    role="option"
                    aria-selected={isSelected}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => select(c.code)}
                    className={cn(
                      'flex cursor-pointer select-none items-center gap-2.5 px-3 py-2.5 text-sm',
                      isActive   && 'bg-base-700',
                      isSelected ? 'text-cyber-blue' : 'text-slate-300',
                    )}
                  >
                    <span aria-hidden className="w-7 text-center text-base leading-none">
                      {flagEmoji(c.code)}
                    </span>
                    <span className="flex-1">{c.name}</span>
                    {isSelected && <Check className="size-3.5 shrink-0 text-cyber-blue" />}
                  </li>
                )
              })
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
