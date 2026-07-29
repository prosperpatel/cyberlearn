import { Clock, ChevronRight, Shield, Map } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/constants'

// ── Mission catalogue data ────────────────────────────────────────────────────

type MissionDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
type MissionStatus     = 'Available' | 'Locked' | 'Coming Soon'

interface MissionDef {
  id:          string
  act:         string
  title:       string
  subtitle:    string
  description: string
  difficulty:  MissionDifficulty
  status:      MissionStatus
  duration:    string
}

const CATALOG: MissionDef[] = [
  {
    id:          'mission-01',
    act:         'Act I',
    title:       'Operation: First Contact',
    subtitle:    'ARIA Online',
    description: 'Investigate the first signs of a cyber incident.',
    difficulty:  'Beginner',
    status:      'Available',
    duration:    '~10 min',
  },
]

const DIFFICULTY_BADGE: Record<MissionDifficulty, 'success' | 'primary' | 'warning' | 'danger'> = {
  Beginner:     'success',
  Intermediate: 'primary',
  Advanced:     'warning',
  Expert:       'danger',
}

const STATUS_BADGE: Record<MissionStatus, 'success' | 'default' | 'outline'> = {
  Available:     'success',
  Locked:        'default',
  'Coming Soon': 'outline',
}

// ── Mission card ──────────────────────────────────────────────────────────────

interface MissionCardProps {
  mission: MissionDef
  onStart: () => void
}

function MissionCard({ mission, onStart }: MissionCardProps) {
  const isAvailable = mission.status === 'Available'

  return (
    <Card variant="cyber-border" className="overflow-hidden flex flex-col">
      {/* Banner */}
      <div
        className="relative h-24 flex items-start justify-between p-4"
        style={{
          background: 'linear-gradient(135deg, rgba(0,217,255,0.15) 0%, rgba(0,217,255,0.04) 100%)',
        }}
      >
        <div className="absolute inset-0 bg-grid opacity-20" aria-hidden="true" />

        {/* Act label */}
        <div className="relative flex items-center gap-2">
          <Shield className="size-3.5 text-primary/50" />
          <span className="font-mono text-[10px] font-semibold tracking-[0.22em] text-primary/50 uppercase">
            {mission.act}
          </span>
        </div>

        {/* Badges */}
        <div className="relative flex items-center gap-1.5">
          <Badge variant={DIFFICULTY_BADGE[mission.difficulty]}>
            {mission.difficulty}
          </Badge>
          <Badge variant={STATUS_BADGE[mission.status]} dot>
            {mission.status}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-5 flex flex-col flex-1 gap-4">
        <div className="space-y-1.5">
          <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
            {mission.subtitle}
          </p>
          <h3 className="text-base font-black leading-snug text-foreground">
            {mission.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {mission.description}
          </p>
        </div>

        <div className="border-t border-border mt-auto" />

        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="size-3.5" />
            {mission.duration}
          </span>
          <Button
            variant="cyber"
            size="sm"
            disabled={!isAvailable}
            onClick={onStart}
            aria-label={`Start mission: ${mission.title}`}
          >
            Start Mission
            <ChevronRight />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function Missions() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6 p-6 max-w-5xl mx-auto">
      {/* Page header */}
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 border border-primary/25">
          <Map className="size-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-foreground">Missions</h1>
          <p className="text-sm text-muted-foreground">Active operations. Real-world cyber scenarios.</p>
        </div>
      </div>

      {/* Catalog grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATALOG.map((m) => (
          <MissionCard
            key={m.id}
            mission={m}
            onStart={() => navigate(ROUTES.MISSION(m.id))}
          />
        ))}
      </div>
    </div>
  )
}
