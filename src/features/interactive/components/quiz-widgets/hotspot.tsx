import { memo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { HotspotProps, HotspotRegion } from '../../types'

export const Hotspot = memo(function Hotspot({
  question,
  context,
  imageUrl,
  imageAlt,
  regions,
  onAnswer,
  className,
}: HotspotProps) {
  const [answered,   setAnswered]   = useState<string | null>(null)   // clicked region id
  const answeredRegion = answered ? regions.find((r) => r.id === answered) : null

  const handleClick = (region: HotspotRegion) => {
    if (answered) return
    setAnswered(region.id)
    onAnswer?.(region.id, region.isCorrect)
  }

  return (
    <div className={cn('space-y-3', className)} role="region" aria-label="Hotspot Exercise">
      {/* Question */}
      <div className="space-y-1">
        <h3 className="font-bold text-foreground">{question}</h3>
        {context && <p className="text-sm text-muted-foreground">{context}</p>}
      </div>

      {/* Image / placeholder with hotspot regions */}
      <div className="relative w-full rounded-xl overflow-hidden border border-border select-none">
        {imageUrl ? (
          <img src={imageUrl} alt={imageAlt} className="w-full h-auto" draggable={false} />
        ) : (
          <div
            className="w-full bg-gradient-to-br from-zinc-900 to-zinc-800 flex items-center justify-center"
            style={{ aspectRatio: '16/9' }}
            aria-label={imageAlt}
          >
            <span className="text-muted-foreground text-sm">{imageAlt}</span>
          </div>
        )}

        {/* Clickable regions */}
        {regions.map((region) => {
          const isAnswered = answered !== null
          const isClicked  = answered === region.id
          const isCorrect  = isClicked && region.isCorrect
          const isWrong    = isClicked && !region.isCorrect
          const isReveal   = isAnswered && !isClicked && region.isCorrect

          return (
            <button
              key={region.id}
              onClick={() => handleClick(region)}
              disabled={isAnswered}
              aria-label={region.label}
              style={{
                position: 'absolute',
                left:   `${region.x}%`,
                top:    `${region.y}%`,
                width:  `${region.width}%`,
                height: `${region.height}%`,
              }}
              className={cn(
                'rounded border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                !isAnswered && 'border-white/20 hover:border-primary hover:bg-primary/20 cursor-pointer',
                isCorrect && 'border-emerald-400 bg-emerald-500/30',
                isWrong   && 'border-red-400 bg-red-500/30',
                isReveal  && 'border-emerald-400/60 bg-emerald-500/10',
              )}
            >
              {isClicked && (
                <span className="absolute top-1 right-1">
                  {isCorrect
                    ? <CheckCircle2 className="size-4 text-emerald-400" />
                    : <XCircle      className="size-4 text-red-400" />}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Region labels (keyboard accessible) */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Regions">
        {regions.map((region) => (
          <span
            key={region.id}
            className={cn(
              'rounded-lg border px-2.5 py-1 text-xs font-medium',
              answered === region.id
                ? region.isCorrect
                  ? 'border-emerald-500/60 bg-emerald-950/30 text-emerald-300'
                  : 'border-red-500/60 bg-red-950/30 text-red-300'
                : 'border-border text-muted-foreground',
            )}
          >
            {region.label}
          </span>
        ))}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {answeredRegion && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              'rounded-xl border p-3 text-sm',
              answeredRegion.isCorrect
                ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-200'
                : 'border-red-500/50 bg-red-950/40 text-red-200',
            )}
          >
            <div className="flex items-center gap-2 font-semibold mb-1">
              {answeredRegion.isCorrect
                ? <><CheckCircle2 className="size-4" /> Correct!</>
                : <><XCircle className="size-4" /> Not quite</>}
            </div>
            {answeredRegion.explanation && (
              <p className="text-xs leading-relaxed opacity-90">{answeredRegion.explanation}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})
