import { memo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { DragDropProps, DragItem, DropZone } from '../../types'

type DropState = Record<string, string | null>  // zoneId → itemId | null
type Result    = 'idle' | 'checked'

export const DragDrop = memo(function DragDrop({
  title,
  items,
  zones,
  onComplete,
  className,
}: DragDropProps) {
  const [dropped,  setDropped]  = useState<DropState>(() =>
    Object.fromEntries(zones.map((z) => [z.id, null])),
  )
  const [dragging, setDragging] = useState<string | null>(null)
  const [over,     setOver]     = useState<string | null>(null)
  const [result,   setResult]   = useState<Result>('idle')
  const [checked,  setChecked]  = useState<Record<string, boolean>>({})

  const droppedItemIds = new Set(Object.values(dropped).filter(Boolean) as string[])

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    e.dataTransfer.setData('itemId', itemId)
    setDragging(itemId)
  }

  const handleDrop = (e: React.DragEvent, zoneId: string) => {
    e.preventDefault()
    const itemId = e.dataTransfer.getData('itemId')
    setDropped((prev) => {
      // Remove item from other zone if it was already placed
      const next = { ...prev }
      for (const [z, id] of Object.entries(next)) {
        if (id === itemId) next[z] = null
      }
      next[zoneId] = itemId
      return next
    })
    setOver(null)
    setDragging(null)
    setResult('idle')
  }

  const checkAnswers = () => {
    const results: Record<string, boolean> = {}
    let score = 0
    for (const zone of zones) {
      const correct = zone.acceptedItemId === dropped[zone.id]
      results[zone.id] = correct
      if (correct) score++
    }
    setChecked(results)
    setResult('checked')
    onComplete?.(score === zones.length, score, zones.length)
  }

  const reset = () => {
    setDropped(Object.fromEntries(zones.map((z) => [z.id, null])))
    setChecked({})
    setResult('idle')
  }

  const allPlaced = Object.values(dropped).every(Boolean)
  const allCorrect = result === 'checked' && Object.values(checked).every(Boolean)

  return (
    <div className={cn('space-y-4', className)} role="region" aria-label={title ?? 'Drag and Drop Exercise'}>
      {title && <h3 className="font-bold text-foreground">{title}</h3>}

      {/* Draggable items */}
      <div className="flex flex-wrap gap-2">
        {items.map((item: DragItem) => {
          const isPlaced = droppedItemIds.has(item.id)
          return (
            <motion.div
              key={item.id}
              draggable={!isPlaced}
              onDragStart={(e) => !isPlaced && handleDragStart(e as unknown as React.DragEvent, item.id)}
              onDragEnd={() => setDragging(null)}
              animate={{ opacity: isPlaced ? 0.3 : 1 }}
              whileHover={isPlaced ? {} : { scale: 1.05 }}
              whileDrag={{ scale: 1.08, zIndex: 50 }}
              className={cn(
                'flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium select-none',
                isPlaced
                  ? 'border-border/40 bg-muted/40 text-muted-foreground cursor-default'
                  : 'border-primary/40 bg-primary/10 text-foreground cursor-grab active:cursor-grabbing',
                dragging === item.id && 'ring-2 ring-primary',
              )}
              aria-grabbed={dragging === item.id}
              aria-label={item.content}
            >
              {item.icon && <span aria-hidden>{item.icon}</span>}
              {item.content}
            </motion.div>
          )
        })}
      </div>

      {/* Drop zones */}
      <div className="grid sm:grid-cols-2 gap-3">
        {zones.map((zone: DropZone) => {
          const placedId   = dropped[zone.id]
          const placedItem = placedId ? items.find((i) => i.id === placedId) : null
          const isOver     = over === zone.id
          const zResult    = result === 'checked' ? checked[zone.id] : null

          return (
            <div
              key={zone.id}
              onDragOver={(e) => { e.preventDefault(); setOver(zone.id) }}
              onDragLeave={() => setOver(null)}
              onDrop={(e) => handleDrop(e, zone.id)}
              className={cn(
                'rounded-xl border-2 border-dashed p-3 min-h-[72px] transition-colors flex flex-col gap-2',
                isOver ? 'border-primary bg-primary/10' : 'border-border bg-card/40',
                zResult === true  && 'border-emerald-500/70 bg-emerald-950/30',
                zResult === false && 'border-red-500/70     bg-red-950/30',
              )}
              aria-label={`Drop zone: ${zone.label}`}
            >
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                {zResult === true  && <CheckCircle2 className="size-3.5 text-emerald-400" />}
                {zResult === false && <XCircle      className="size-3.5 text-red-400" />}
                {zone.label}
              </div>
              <AnimatePresence>
                {placedItem && (
                  <motion.div
                    key={placedItem.id}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-3 py-1.5 text-sm font-medium text-foreground w-fit"
                  >
                    {placedItem.icon && <span>{placedItem.icon}</span>}
                    {placedItem.content}
                    {result === 'idle' && (
                      <button
                        onClick={() => setDropped((p) => ({ ...p, [zone.id]: null }))}
                        aria-label="Remove"
                        className="ml-1 text-muted-foreground hover:text-foreground"
                      >×</button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              {!placedItem && (
                <p className="text-xs text-muted-foreground italic">{isOver ? 'Release to drop' : 'Drop here'}</p>
              )}
              {zResult === false && zone.hint && (
                <p className="text-xs text-amber-400/80 italic">{zone.hint}</p>
              )}
            </div>
          )
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 pt-1">
        {result !== 'checked' && (
          <button
            onClick={checkAnswers}
            disabled={!allPlaced}
            className={cn(
              'rounded-lg px-4 py-2 text-sm font-semibold transition-colors',
              allPlaced
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'bg-muted text-muted-foreground cursor-not-allowed',
            )}
          >
            Check Answers
          </button>
        )}
        {allCorrect && (
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
            <CheckCircle2 className="size-4" /> Perfect!
          </div>
        )}
        <button
          onClick={reset}
          className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Reset"
        >
          <RotateCcw className="size-3.5" /> Reset
        </button>
      </div>
    </div>
  )
})
