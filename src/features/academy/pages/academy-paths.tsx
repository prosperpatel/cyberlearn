import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Lock, ChevronRight, CheckCircle2, Zap, Clock, Layers,
  Shield, GraduationCap,
} from 'lucide-react'
import { cn, formatDuration, difficultyVariant } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { loadCourse } from '@/lib/content'
import type { ContentCourse } from '@/lib/content'
import { ROUTES } from '@/lib/constants'
import { ACADEMIES } from '@/data/academyData'
import type { AcademyDef } from '@/data/academyData'

// ── Course data cache keyed by slug ──────────────────────────────────────────

type CourseMap = Map<string, ContentCourse>

// ── Progress (wire to real store when academy-level tracking is added) ────────

function useMockProgress(_slug: string) {
  return { completedModules: 0, isStarted: false, isComplete: false }
}

// ── Difficulty badge colours ──────────────────────────────────────────────────

const DIFFICULTY_LABEL: Record<string, string> = {
  beginner:     'Beginner',
  intermediate: 'Intermediate',
  advanced:     'Advanced',
  expert:       'Expert',
}

// ── Skeleton card ─────────────────────────────────────────────────────────────

function AcademyCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-base-900/60 p-6 sm:p-8 animate-pulse">
      <div className="flex items-start gap-6">
        <div className="size-16 rounded-2xl bg-base-800 shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="h-3 bg-base-800 rounded w-24" />
          <div className="h-6 bg-base-800 rounded w-2/3" />
          <div className="h-4 bg-base-800 rounded w-full" />
          <div className="h-4 bg-base-800 rounded w-3/4" />
        </div>
      </div>
    </div>
  )
}

// ── Academy card ──────────────────────────────────────────────────────────────

interface AcademyCardProps {
  academy:  AcademyDef
  course?:  ContentCourse
  index:    number
  isLast:   boolean
}

function AcademyCard({ academy, course, index, isLast }: AcademyCardProps) {
  const progress     = useMockProgress(academy.slug)
  const moduleCount  = course?.modules.reduce((s, m) => s + m.lessonCount, 0) !== undefined
    ? academy.totalModules
    : academy.totalModules
  const completedPct = moduleCount > 0
    ? Math.round((progress.completedModules / moduleCount) * 100)
    : 0

  const accentRgb = academy.accentColor

  return (
    <div className="relative flex gap-4 sm:gap-6">
      {/* Vertical connector line */}
      {!isLast && (
        <div
          className="absolute left-[27px] top-[72px] bottom-0 w-px"
          style={{ background: `linear-gradient(to bottom, ${accentRgb}40, transparent)` }}
          aria-hidden
        />
      )}

      {/* Academy number badge (left column) */}
      <div className="shrink-0 flex flex-col items-center gap-2 pt-1">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.35 }}
          className={cn(
            'flex size-14 items-center justify-center rounded-2xl border-2 text-xs font-black font-mono',
            academy.isAvailable
              ? 'text-foreground'
              : 'border-border bg-base-900 text-muted-foreground/40',
          )}
          style={academy.isAvailable ? {
            borderColor:      `${accentRgb}60`,
            backgroundColor:  `${accentRgb}10`,
            color:            accentRgb,
            boxShadow:        `0 0 16px ${accentRgb}20`,
          } : undefined}
        >
          {String(academy.id).padStart(2, '0')}
        </motion.div>
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 + 0.05, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          'flex-1 mb-8 rounded-2xl border overflow-hidden',
          'transition-all duration-200',
          academy.isAvailable
            ? 'bg-base-900/80 hover:bg-base-900 border-border hover:border-border/80'
            : 'bg-base-900/40 border-border/40',
        )}
        style={academy.isAvailable ? {
          borderColor: `${accentRgb}25`,
        } : undefined}
      >
        {/* Accent top bar */}
        <div
          className="h-0.5 w-full"
          style={{
            background: academy.isAvailable
              ? `linear-gradient(90deg, ${accentRgb}, ${accentRgb}20)`
              : 'transparent',
          }}
        />

        <div className="p-5 sm:p-7 space-y-5">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-4">
              {/* Emoji icon */}
              <div
                className={cn(
                  'flex size-12 sm:size-14 items-center justify-center rounded-xl text-2xl sm:text-3xl shrink-0',
                  !academy.isAvailable && 'opacity-30',
                )}
                style={academy.isAvailable ? {
                  background: `${accentRgb}12`,
                  border:     `1px solid ${accentRgb}30`,
                } : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {academy.isAvailable ? academy.coverEmoji : <Lock className="size-5 text-muted-foreground/40" />}
              </div>

              <div>
                <p
                  className="text-[10px] font-black uppercase tracking-[0.25em] font-mono mb-1"
                  style={{ color: academy.isAvailable ? accentRgb : undefined }}
                >
                  {academy.isAvailable ? academy.theme : 'Classified'}
                </p>
                <h2 className={cn(
                  'text-lg sm:text-xl font-black leading-snug',
                  academy.isAvailable ? 'text-foreground' : 'text-muted-foreground/40',
                )}>
                  {academy.isAvailable ? academy.name : '████████████'}
                </h2>
              </div>
            </div>

            {/* Status badge */}
            <div className="shrink-0">
              {academy.isComingSoon ? (
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50 px-2.5 py-1 rounded-full border border-border/40">
                  Coming Soon
                </span>
              ) : progress.isComplete ? (
                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-cyber-green px-2.5 py-1 rounded-full border border-cyber-green/30 bg-cyber-green/8">
                  <CheckCircle2 className="size-3" />
                  Complete
                </span>
              ) : progress.isStarted ? (
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border"
                  style={{ color: accentRgb, borderColor: `${accentRgb}40`, background: `${accentRgb}10` }}
                >
                  In Progress
                </span>
              ) : (
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 px-2.5 py-1 rounded-full border border-border/60 bg-base-800/50">
                  Available
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          {academy.isAvailable && (
            <p className="text-[0.9375rem] text-muted-foreground leading-[1.8]">
              {academy.description}
            </p>
          )}

          {/* Meta row */}
          {academy.isAvailable && (
            <div className="flex items-center flex-wrap gap-3">
              <Badge variant={difficultyVariant(academy.difficulty)}>
                {DIFFICULTY_LABEL[academy.difficulty]}
              </Badge>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Layers className="size-3.5" />
                {academy.totalModules} modules
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="size-3.5" />
                {formatDuration(academy.estimatedHours * 60)}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: accentRgb }}>
                <Zap className="size-3.5" />
                +{academy.xpReward.toLocaleString()} XP
              </span>
            </div>
          )}

          {/* Progress bar */}
          {academy.isAvailable && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                <span>{progress.completedModules}/{academy.totalModules} modules</span>
                <span className={cn('font-bold', completedPct === 100 && 'text-cyber-green')}>
                  {completedPct}%
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-base-700 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${completedPct}%` }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${accentRgb}, ${accentRgb}80)` }}
                />
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="flex items-center justify-between gap-4 pt-1">
            {academy.isAvailable ? (
              <>
                <p className="text-xs text-muted-foreground/50 font-mono">
                  Academy {String(academy.id).padStart(2, '0')} · CDA Curriculum
                </p>
                <Link
                  to={ROUTES.COURSE(academy.slug)}
                  className={cn(
                    'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold',
                    'transition-all duration-200',
                    'text-base-950',
                  )}
                  style={{
                    background: progress.isComplete
                      ? 'linear-gradient(135deg, #00FF87, #00D9FF)'
                      : `linear-gradient(135deg, ${accentRgb}, ${accentRgb}CC)`,
                    boxShadow: `0 0 20px ${accentRgb}30`,
                  }}
                >
                  {progress.isComplete
                    ? 'Review Academy'
                    : progress.isStarted
                      ? 'Continue'
                      : 'Start Academy'}
                  <ChevronRight className="size-4" />
                </Link>
              </>
            ) : (
              <p className="text-xs text-muted-foreground/40 font-mono">
                Unlock after completing Academy {academy.id - 1}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function AcademyPaths() {
  const [courses, setCourses]   = useState<CourseMap>(new Map())
  const [loading, setLoading]   = useState(true)
  const cancelRef               = useRef(false)

  useEffect(() => {
    cancelRef.current = false
    const available = ACADEMIES.filter((a) => a.isAvailable)

    Promise.allSettled(available.map((a) => loadCourse(a.slug)))
      .then((results) => {
        if (cancelRef.current) return
        const map: CourseMap = new Map()
        results.forEach((r, i) => {
          if (r.status === 'fulfilled' && r.value !== null) {
            map.set(available[i].slug, r.value)
          }
        })
        setCourses(map)
        setLoading(false)
      })
    return () => { cancelRef.current = true }
  }, [])

  const totalModules    = ACADEMIES.reduce((s, a) => s + a.totalModules, 0)
  const totalXP         = ACADEMIES.reduce((s, a) => s + a.xpReward, 0)
  const availableCount  = ACADEMIES.filter((a) => a.isAvailable).length

  return (
    <div className="min-h-screen">
      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="border-b border-border bg-base-950/60 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-cyber shadow-cyber-sm">
              <GraduationCap className="size-4 text-base-950" />
            </div>
            <div>
              <h1 className="text-lg font-black text-foreground">Academy Paths</h1>
              <p className="text-[11px] text-muted-foreground/60 font-mono">
                CDA Structured Learning Programme
              </p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="hidden sm:flex items-center gap-6 text-xs font-mono">
            <div className="text-center">
              <p className="text-foreground font-bold">{availableCount}/{ACADEMIES.length}</p>
              <p className="text-muted-foreground/60">Academies</p>
            </div>
            <div className="text-center">
              <p className="text-foreground font-bold">{totalModules}</p>
              <p className="text-muted-foreground/60">Modules</p>
            </div>
            <div className="text-center">
              <p className="text-cyber-green font-bold">+{totalXP.toLocaleString()}</p>
              <p className="text-muted-foreground/60">Total XP</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mission brief ───────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 pt-10 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-primary/20 bg-primary/4 px-6 py-5 flex items-start gap-4"
        >
          <Shield className="size-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-foreground mb-1">Mission Brief</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The CDA Academy programme is a structured path from Recruit to Elite Operator. Complete Academies in order — each builds on the skills of the last. Standalone courses are available separately on the{' '}
              <Link to={ROUTES.COURSES} className="text-primary hover:underline font-medium">Courses page</Link>.
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── Academy cards ───────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        {loading
          ? Array.from({ length: ACADEMIES.length }).map((_, i) => (
              <div key={i} className="mb-8">
                <AcademyCardSkeleton />
              </div>
            ))
          : ACADEMIES.map((academy, i) => (
              <AcademyCard
                key={academy.id}
                academy={academy}
                course={courses.get(academy.slug)}
                index={i}
                isLast={i === ACADEMIES.length - 1}
              />
            ))}
      </div>
    </div>
  )
}
