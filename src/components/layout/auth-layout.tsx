import { Outlet, Link } from 'react-router-dom'
import { Shield } from 'lucide-react'
import { motion } from 'framer-motion'
import { APP_CONFIG } from '@/lib/constants'

// Floating cyber particle — purely decorative
function Particle({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="absolute size-1 rounded-full bg-primary/40 animate-float"
      style={style}
      aria-hidden
    />
  )
}

export function AuthLayout() {
  return (
    <div className="relative min-h-screen bg-background flex overflow-hidden">
      {/* ── Left panel — branding (hidden on mobile) ──────────────────── */}
      <div className="hidden lg:flex lg:w-[55%] relative flex-col items-center justify-center p-12">
        {/* Grid background */}
        <div className="absolute inset-0 bg-grid opacity-40" />

        {/* Radial glow */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 50% 60%, rgba(0,217,255,0.15) 0%, transparent 65%)',
          }}
          aria-hidden
        />

        {/* Floating particles */}
        {[
          { top: '15%',  left: '20%',  animationDelay: '0s',    animationDuration: '3s'   },
          { top: '35%',  left: '75%',  animationDelay: '0.8s',  animationDuration: '4s'   },
          { top: '60%',  left: '15%',  animationDelay: '1.5s',  animationDuration: '3.5s' },
          { top: '75%',  left: '60%',  animationDelay: '0.4s',  animationDuration: '5s'   },
          { top: '85%',  left: '35%',  animationDelay: '2s',    animationDuration: '3.8s' },
          { top: '25%',  left: '50%',  animationDelay: '1s',    animationDuration: '4.2s' },
        ].map((s, i) => <Particle key={i} style={s} />)}

        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="relative z-10 max-w-md text-center space-y-6"
        >
          {/* Logo mark */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="size-20 rounded-2xl bg-gradient-cyber flex items-center justify-center shadow-cyber-xl">
                <Shield className="size-10 text-base-950" />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-cyber blur-xl opacity-50" />
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-black tracking-tight text-gradient-cyber">
              {APP_CONFIG.name}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {APP_CONFIG.tagline}
            </p>
          </div>

          {/* Feature bullets */}
          <div className="space-y-3 text-left">
            {[
              { emoji: '⚡', text: 'Hands-on labs — learn by doing, not reading' },
              { emoji: '🎯', text: 'Scenario-based challenges from real breaches' },
              { emoji: '🏆', text: 'XP, ranks, and achievements to keep you motivated' },
              { emoji: '🤖', text: 'AI Mentor to explain concepts 5 different ways' },
            ].map(({ emoji, text }) => (
              <div key={text} className="flex items-start gap-3">
                <span className="text-xl leading-none">{emoji}</span>
                <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Right panel — auth form ────────────────────────────────────── */}
      <div className="flex flex-1 flex-col items-center justify-center p-6 lg:p-12">
        {/* Mobile logo */}
        <div className="mb-8 flex flex-col items-center gap-3 lg:hidden">
          <div className="size-12 rounded-xl bg-gradient-cyber flex items-center justify-center shadow-cyber-md">
            <Shield className="size-6 text-base-950" />
          </div>
          <span className="text-xl font-black text-gradient-cyber">{APP_CONFIG.name}</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
          className="w-full max-w-sm"
        >
          <Outlet />
        </motion.div>

        <p className="mt-8 text-xs text-muted-foreground text-center">
          By continuing you agree to our{' '}
          <Link to="#" className="text-primary hover:underline">Terms</Link>
          {' '}and{' '}
          <Link to="#" className="text-primary hover:underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  )
}
