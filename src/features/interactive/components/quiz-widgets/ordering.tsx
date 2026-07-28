import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, RotateCcw, GripVertical } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { OrderingProps, OrderingItem } from '../../types'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export const Ordering = memo(function Ordering({
  title,
  items,
  onComplete,
  className,
}: OrderingProps) {
  const [order,    setOrder]    = useState<OrderingItem[]>(() => shuffle(items))
  const [checked,  setChecked]  = useState(false)
  const [dragging, setDragging] = useState<number | null>(null)
  const [over,     setOver]     = useState<number | null>(null)

  const correct = checked && order.every((item, i) => item.correctPosition === i + 1)

  const moveItem = (fromIdx: number, toIdx: number) => {
    setOrder((prev) => {
      const next = [...prev]
      const [moved] = next.splice(fromIdx, 1)
      next.splice(toIdx, 0, moved)
      return next
    })
    setChecked(false)
  }

  const handleDragStart = (e: React.DragEvent, idx: number) => {
    e.dataTransfer.effectAllowed = 'move'
    setDragging(idx)
  }

  const handleDrop = (e: React.DragEvent, toIdx: number) => {
    e.preventDefault()
    if (dragging !== null && dragging !== toIdx) moveItem(dragging, toIdx)
    setDragging(null)
    setOver(null)
  }

  const check = () => {
    setChecked(true)
    onComplete?.(order.every((item, i) => item.correctPosition === i + 1))
  }

  const reset = () => {
    setOrder(shuffle(items))
    setChecked(false)
  }

  return (
    <div className={cn('space-y-4', className)} role="region" aria-label={title ?? 'Ordering Exercise'}>
      {title && <h3 className="font-bold text-foreground">{title}</h3>}
      <p className="text-xs text-muted-foreground">Drag items into the correct order.</p>

      <ol className="space-y-2" aria-label="Sortable list">
        {order.map((item, i) => {
          const isCorrect  = checked && item.correctPosition === i + 1
          const isWrong    = checked && item.correctPosition !== i + 1
          const isDragged  = dragging === i

          return (
            <motion.li
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e as unknown as React.DragEvent, i)}
              onDragEnd={() => { setDragging(null); setOver(null) }}
              onDragOver={(e) => { e.preventDefault(); setOver(i) }}
              onDragLeave={() => setOver(null)}
              onDrop={(e) => handleDrop(e as unknown as React.DragEvent, i)}
              layout
              animate={{ opacity: isDragged ? 0.4 : 1 }}
              transition={{ duration: 0.15 }}
              className={cn(
                'flex items-center gap-3 rounded-xl border p-3 cursor-grab active:cursor-grabbing transition-colors',
                over === i && !isDragged && 'border-primary bg-primary/5',
                isCorrect && 'border-emerald-500/60 bg-emerald-950/30',
                isWrong   && 'border-red-500/60     bg-red-950/30',
                !isCorrect && !isWrong && 'border-border bg-card',
              )}
              aria-label={`Item ${i + 1}: ${item.content}`}
            >
              <GripVertical className="size-4 text-muted-foreground shrink-0" aria-hidden />
              <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0">
                {i + 1}
              </span>
              <span className="flex-1 text-sm text-foreground">{item.content}</span>
              {isCorrect && <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />}
              {isWrong   && <XCircle      className="size-4 text-red-400 shrink-0"     />}
              {isWrong && item.hint && (
                <span className="text-xs text-amber-400/80 italic">{item.hint}</span>
              )}
            </motion.li>
          )
        })}
      </ol>

      <div className="flex items-center gap-3 pt-1">
        {!checked && (
          <button
            onClick={check}
            className="rounded-lg px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Check Order
          </button>
        )}
        {correct && (
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
            <CheckCircle2 className="size-4" /> Correct order!
          </div>
        )}
        {checked && !correct && (
          <p className="text-sm text-red-400">Not quite — try adjusting the order.</p>
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
