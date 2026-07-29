import { useEffect, useRef, useState } from 'react'
import { useAccessibility } from '../accessibility/accessibility-manager'

interface TypewriterProps {
  /** The full text to animate. */
  text: string
  /** Characters revealed per second (default 40). */
  charsPerSecond?: number
  /** If true, skip the animation and show the full text immediately. */
  skipAnimation?: boolean
  /** Called when the animation completes (or immediately if skipped). */
  onComplete?: () => void
}

/**
 * Renders text with a typewriter reveal animation.
 *
 * Respects the accessibility `reducedMotion` setting — when active, the
 * full text is shown immediately without animation.
 *
 * The component is purely presentational. The dialogue engine feeds it
 * `text` and `skipAnimation` and listens to `onComplete`.
 */
export function Typewriter({
  text,
  charsPerSecond = 40,
  skipAnimation = false,
  onComplete,
}: TypewriterProps) {
  const { reducedMotion } = useAccessibility()
  const [visibleCount, setVisibleCount] = useState(0)
  const rafRef    = useRef<number | null>(null)
  const startRef  = useRef<number | null>(null)
  const onCompleteRef = useRef(onComplete)

  // Keep the callback ref current without re-triggering the effect
  useEffect(() => { onCompleteRef.current = onComplete }, [onComplete])

  useEffect(() => {
    // Cancel any in-progress animation from a previous `text` value
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    startRef.current = null

    const shouldSkip = skipAnimation || reducedMotion

    if (shouldSkip || text.length === 0) {
      setVisibleCount(text.length)
      onCompleteRef.current?.()
      return
    }

    setVisibleCount(0)

    const msPerChar = 1000 / charsPerSecond

    const animate = (timestamp: number): void => {
      if (startRef.current === null) startRef.current = timestamp
      const elapsed = timestamp - startRef.current
      const target  = Math.min(Math.floor(elapsed / msPerChar), text.length)
      setVisibleCount(target)

      if (target < text.length) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        onCompleteRef.current?.()
      }
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [text, charsPerSecond, skipAnimation, reducedMotion])

  return (
    <span aria-label={text}>
      {text.slice(0, visibleCount)}
      {visibleCount < text.length && (
        <span className="animate-pulse-cyber opacity-70" aria-hidden="true">▋</span>
      )}
    </span>
  )
}
