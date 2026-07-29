import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useAccessibility } from '../accessibility/accessibility-manager'

interface SceneTransitionProps {
  children: ReactNode
}

const FADE_VARIANTS = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit:    { opacity: 0 },
}

const INSTANT_VARIANTS = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit:    { opacity: 0 },
}

const TRANSITION = { duration: 0.3, ease: 'easeInOut' }
const INSTANT_TRANSITION = { duration: 0 }

/**
 * Wraps a scene component in a full-screen Framer Motion layer.
 *
 * When `reducedMotion` is active the crossfade is replaced with an
 * instant cut — the exit fade is preserved so Framer Motion's
 * AnimatePresence can still unmount correctly.
 */
export function SceneTransition({ children }: SceneTransitionProps) {
  const { reducedMotion } = useAccessibility()

  const variants   = reducedMotion ? INSTANT_VARIANTS : FADE_VARIANTS
  const transition = reducedMotion ? INSTANT_TRANSITION : TRANSITION

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
      style={{ position: 'absolute', inset: 0 }}
    >
      {children}
    </motion.div>
  )
}
