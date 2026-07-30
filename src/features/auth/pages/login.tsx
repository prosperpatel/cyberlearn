import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, AlertTriangle, Loader2 } from 'lucide-react'
import { useAuth } from '@/features/auth/context/auth-context'
import { ROUTES, APP_CONFIG } from '@/lib/constants'

// ── Rotating keyword ticker ───────────────────────────────────────────────────

const KEYWORDS = [
  'SOC Analysis',
  'Linux',
  'OWASP Top 10',
  'Burp Suite',
  'Nmap',
  'Wireshark',
  'Threat Hunting',
  'Reverse Engineering',
  'MITRE ATT&CK',
  'Penetration Testing',
]

function KeywordTicker() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % KEYWORDS.length), 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex items-center gap-3 mt-8">
      <span
        className="font-mono text-xs tracking-[0.18em] text-muted-foreground/60 uppercase"
        aria-hidden
      >
        Now training
      </span>
      <div className="relative h-6 overflow-hidden flex-1">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 flex items-center"
          >
            <span className="font-mono text-sm font-semibold text-primary">
              {KEYWORDS[index]}
            </span>
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}

// ── Floating particle ─────────────────────────────────────────────────────────

interface ParticleProps {
  style: React.CSSProperties
}

function Particle({ style }: ParticleProps) {
  return (
    <div
      className="absolute rounded-full bg-primary/30 animate-float"
      style={style}
      aria-hidden
    />
  )
}

// ── Google icon (exact brand colours) ────────────────────────────────────────

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export function Login() {
  const { session, user, isLoading, error, signInWithGoogle, clearError } = useAuth()
  const navigate = useNavigate()
  const [signingIn, setSigningIn] = useState(false)

  // Safety net: if a fully-authenticated user navigates directly to /login,
  // send them to the dashboard. Requires BOTH session AND profile (user) so
  // that a user with a session-but-no-profile is handled by AuthProvider's
  // onboarding guard instead of landing here.
  useEffect(() => {
    if (!isLoading && session && user) {
      navigate(ROUTES.DASHBOARD, { replace: true })
    }
  }, [session, user, isLoading, navigate])

  async function handleGoogleSignIn() {
    clearError()
    setSigningIn(true)
    await signInWithGoogle()
    // signInWithOAuth triggers a browser redirect; if we reach here the call
    // failed (e.g. network error) — re-enable the button via error state.
    setSigningIn(false)
  }

  return (
    <div className="relative min-h-screen bg-base-950 flex overflow-hidden">

      {/* ── Left Panel — Hero ─────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[58%] relative flex-col items-center justify-center p-16">

        {/* Layered atmospheric glow orbs */}
        <div
          className="absolute top-[15%] right-[5%] size-[420px] rounded-full blur-[130px] pointer-events-none"
          style={{ background: 'rgba(0, 217, 255, 0.07)' }}
          aria-hidden
        />
        <div
          className="absolute bottom-[10%] left-[2%] size-[500px] rounded-full blur-[150px] pointer-events-none"
          style={{ background: 'rgba(0, 255, 135, 0.05)' }}
          aria-hidden
        />
        <div
          className="absolute top-[45%] left-[25%] size-[360px] rounded-full blur-[110px] pointer-events-none"
          style={{ background: 'rgba(123, 94, 167, 0.06)' }}
          aria-hidden
        />

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid opacity-[0.35]" aria-hidden />

        {/* Subtle vignette at the right edge — blends into the right panel */}
        <div
          className="absolute inset-y-0 right-0 w-32 pointer-events-none"
          style={{ background: 'linear-gradient(to right, transparent, rgba(10,11,15,0.9))' }}
          aria-hidden
        />

        {/* Floating particles */}
        {[
          { width: 3, height: 3, top: '12%', left: '18%',  animationDelay: '0s',   animationDuration: '3.2s' },
          { width: 2, height: 2, top: '28%', left: '72%',  animationDelay: '0.7s', animationDuration: '4.1s' },
          { width: 4, height: 4, top: '55%', left: '12%',  animationDelay: '1.4s', animationDuration: '3.6s' },
          { width: 2, height: 2, top: '68%', left: '58%',  animationDelay: '0.3s', animationDuration: '5.0s' },
          { width: 3, height: 3, top: '82%', left: '32%',  animationDelay: '2.1s', animationDuration: '3.9s' },
          { width: 2, height: 2, top: '20%', left: '48%',  animationDelay: '1.1s', animationDuration: '4.4s' },
          { width: 4, height: 4, top: '40%', left: '85%',  animationDelay: '0.5s', animationDuration: '3.0s' },
          { width: 2, height: 2, top: '75%', left: '78%',  animationDelay: '1.8s', animationDuration: '4.7s' },
        ].map((s, i) => (
          <Particle key={i} style={s} />
        ))}

        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="relative z-10 max-w-lg"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="mb-10"
          >
            <div className="relative inline-flex">
              <div className="size-14 rounded-2xl bg-gradient-cyber flex items-center justify-center shadow-cyber-lg">
                <Shield className="size-7 text-base-950" />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-cyber blur-2xl opacity-40" aria-hidden />
            </div>

            <div className="mt-5">
              <span className="font-mono text-xs tracking-[0.25em] text-muted-foreground/50 uppercase">
                {APP_CONFIG.name}
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
          >
            <h1 className="text-5xl font-black leading-[1.08] tracking-tight text-foreground">
              Master
              <br />
              <span className="text-gradient-cyber">Cybersecurity</span>
              <br />
              Through Missions.
            </h1>

            <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-sm">
              Hands-on scenarios. Real attack chains. AI-powered guidance.
              Build skills that actually transfer to the real world.
            </p>
          </motion.div>

          {/* Feature list */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-8 space-y-3"
          >
            {[
              { symbol: '⚡', text: 'Interactive labs — learn by doing' },
              { symbol: '🎯', text: 'Real breach scenarios to investigate' },
              { symbol: '🤖', text: 'ARIA — your AI partner in the field' },
            ].map(({ symbol, text }) => (
              <div key={text} className="flex items-center gap-3">
                <span className="text-base leading-none">{symbol}</span>
                <span className="text-sm text-muted-foreground">{text}</span>
              </div>
            ))}
          </motion.div>

          {/* Keyword ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.35 }}
          >
            <KeywordTicker />
          </motion.div>
        </motion.div>
      </div>

      {/* ── Right Panel — Sign-In Card ───────────────────────────────── */}
      <div className="flex flex-1 flex-col items-center justify-center p-6 relative">

        {/* Subtle right-panel background tint */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(160deg, rgba(17,19,24,0.6) 0%, rgba(10,11,15,0.95) 100%)' }}
          aria-hidden
        />

        {/* Mobile logo (hidden on desktop where left panel shows) */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="lg:hidden mb-10 flex flex-col items-center gap-3 relative z-10"
        >
          <div className="relative">
            <div className="size-12 rounded-2xl bg-gradient-cyber flex items-center justify-center shadow-cyber-md">
              <Shield className="size-6 text-base-950" />
            </div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-cyber blur-xl opacity-40" aria-hidden />
          </div>
          <span className="font-black text-xl text-gradient-cyber">{APP_CONFIG.name}</span>
        </motion.div>

        {/* Glassmorphism card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
          className="relative z-10 w-full max-w-sm"
        >
          <div
            className="rounded-2xl border border-white/[0.06] p-8"
            style={{
              background: 'rgba(26, 29, 38, 0.6)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow: '0 24px 64px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
            }}
          >
            {/* Card header */}
            <div className="mb-8">
              <h2 className="text-2xl font-black text-foreground tracking-tight">
                Welcome Back
              </h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Continue your cybersecurity journey.
              </p>
            </div>

            {/* Error state */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                    <AlertTriangle className="size-4 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-destructive">Sign-in failed</p>
                      <p className="text-xs text-destructive/70 mt-0.5">{error}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Google Sign-In button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={signingIn}
              className={[
                'w-full flex items-center justify-center gap-3',
                'h-12 rounded-xl px-5',
                'bg-white text-[#111] text-sm font-semibold',
                'border border-white/10',
                'transition-all duration-200',
                'hover:bg-white/90 hover:shadow-lg',
                'active:scale-[0.98]',
                'disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60',
              ].join(' ')}
            >
              {signingIn ? (
                <>
                  <Loader2 className="size-4 animate-spin text-[#333]" />
                  <span>Redirecting to Google…</span>
                </>
              ) : (
                <>
                  <GoogleIcon className="size-5 shrink-0" />
                  <span>Continue with Google</span>
                </>
              )}
            </button>

            {/* Divider */}
            <div className="mt-7 pt-6 border-t border-white/[0.06]">
              <p className="text-center text-xs text-muted-foreground/60 leading-relaxed">
                By continuing you agree to our{' '}
                <a href="#" className="text-muted-foreground hover:text-foreground underline-offset-2 hover:underline transition-colors">
                  Terms
                </a>
                {' '}and{' '}
                <a href="#" className="text-muted-foreground hover:text-foreground underline-offset-2 hover:underline transition-colors">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </motion.div>

        {/* Subtle bottom copy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="relative z-10 mt-8 text-xs text-muted-foreground/40 text-center"
        >
          Sentinel Cybersecurity Academy · {new Date().getFullYear()}
        </motion.p>
      </div>
    </div>
  )
}
