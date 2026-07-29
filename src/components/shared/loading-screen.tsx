import { motion } from 'framer-motion'

interface LoadingScreenProps {
  /** 0–1, drives the progress bar. Defaults to indeterminate if omitted. */
  progress?: number
  /** Short status string shown below the bar. */
  status?:   string
}

const PULSE_VARIANTS = {
  initial:  { opacity: 0.3 },
  animate:  { opacity: 1 },
}

const PULSE_TRANSITION = {
  duration: 1,
  repeat:   Infinity,
  repeatType: 'reverse' as const,
  ease:     'easeInOut',
}

/**
 * Full-screen loading screen used while engine assets are preloading.
 *
 * Shows a determinate progress bar when `progress` is provided,
 * otherwise shows an animated pulse to indicate activity.
 */
export function LoadingScreen({ progress, status }: LoadingScreenProps) {
  const isIndeterminate = progress === undefined

  return (
    <div
      style={{
        position:       'fixed',
        inset:          0,
        background:     '#08080F',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        gap:            24,
        zIndex:         8888,
      }}
    >
      {/* Logo mark */}
      <motion.div
        variants={PULSE_VARIANTS}
        initial="initial"
        animate="animate"
        transition={PULSE_TRANSITION}
        style={{
          fontSize:   24,
          fontFamily: '"Courier New", monospace',
          color:      '#00D9FF',
          letterSpacing: '0.2em',
          fontWeight: 700,
        }}
      >
        CL
      </motion.div>

      {/* Progress bar */}
      <div
        style={{
          width:        240,
          height:       2,
          background:   'rgba(0, 217, 255, 0.15)',
          borderRadius: 1,
          overflow:     'hidden',
        }}
      >
        {isIndeterminate ? (
          <motion.div
            style={{ height: '100%', background: '#00D9FF', borderRadius: 1 }}
            animate={{ x: ['-100%', '300%'] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        ) : (
          <motion.div
            style={{
              height:      '100%',
              background:  '#00D9FF',
              borderRadius: 1,
              originX:     0,
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress }}
            transition={{ ease: 'easeOut', duration: 0.2 }}
          />
        )}
      </div>

      {/* Status text */}
      {status && (
        <div
          style={{
            fontFamily:    '"Courier New", monospace',
            fontSize:      11,
            color:         'rgba(0, 217, 255, 0.5)',
            letterSpacing: '0.1em',
          }}
        >
          {status.toUpperCase()}
        </div>
      )}
    </div>
  )
}
