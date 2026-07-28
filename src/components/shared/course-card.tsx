import { Clock, Users, Star, Lock, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn, formatDuration, formatNumber, difficultyVariant } from '@/lib/utils'
import { ROUTES, SKILL_CATEGORIES } from '@/lib/constants'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import type { Course, CourseProgress } from '@/types'

interface CourseCardProps {
  course: Course
  progress?: CourseProgress
  className?: string
  variant?: 'default' | 'compact' | 'featured'
}

export function CourseCard({ course, progress, className, variant = 'default' }: CourseCardProps) {
  const category  = SKILL_CATEGORIES[course.category]
  const isLocked  = course.isPro  // placeholder logic
  const pct       = progress?.percentComplete ?? 0
  const isStarted = pct > 0

  if (variant === 'compact') {
    return (
      <Link to={isLocked ? '#' : ROUTES.COURSE(course.slug)}>
        <Card
          variant="interactive"
          className={cn('p-4 flex items-center gap-3', className)}
        >
          <div
            className="flex size-10 shrink-0 items-center justify-center rounded-lg text-lg"
            style={{ background: `${category.color}15`, border: `1px solid ${category.color}30` }}
          >
            {isLocked ? <Lock className="size-4 text-muted-foreground" /> : course.coverImage ?? '🔐'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{course.title}</p>
            <p className="text-xs text-muted-foreground">{formatDuration(course.estimatedHours * 60)}</p>
          </div>
          {isStarted && (
            <Progress value={pct} max={100} size="xs" color="gradient" className="w-16 shrink-0" />
          )}
        </Card>
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <Link to={isLocked ? '#' : ROUTES.COURSE(course.slug)}>
        <Card
          variant="interactive"
          className={cn(
            'overflow-hidden group',
            'border-primary/20 shadow-cyber-sm hover:shadow-cyber-md',
            className,
          )}
        >
          {/* Hero gradient banner */}
          <div
            className="h-32 relative flex items-end p-4"
            style={{
              background: `linear-gradient(135deg, ${category.color}30 0%, ${category.color}10 100%)`,
            }}
          >
            <div className="absolute inset-0 bg-grid opacity-30" />
            <div className="relative flex items-end justify-between w-full">
              <div className="text-4xl">{course.coverImage ?? '🔐'}</div>
              <div className="flex gap-1.5">
                {course.isNew && <Badge variant="new">NEW</Badge>}
                {course.isPro && <Badge variant="pro">PRO</Badge>}
              </div>
            </div>
          </div>

          <CardContent className="p-4 space-y-3">
            <div>
              <Badge variant={difficultyVariant(course.difficulty)} className="mb-2">
                {course.difficulty}
              </Badge>
              <h3 className="font-semibold text-foreground leading-snug">{course.title}</h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{course.tagline}</p>
            </div>

            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="size-3" />
                {formatDuration(course.estimatedHours * 60)}
              </span>
              <span className="flex items-center gap-1">
                <Users className="size-3" />
                {formatNumber(course.stats.totalStudents)}
              </span>
              <span className="flex items-center gap-1">
                <Star className="size-3 text-yellow-400" />
                {course.stats.averageRating.toFixed(1)}
              </span>
            </div>

            {isStarted ? (
              <Progress value={pct} max={100} size="sm" color="gradient" glow showLabel label="Progress" />
            ) : (
              <div className="flex items-center gap-1 text-xs font-medium text-primary">
                <Zap className="size-3" />
                <span>+{course.xpReward} XP</span>
              </div>
            )}
          </CardContent>
        </Card>
      </Link>
    )
  }

  // Default card
  return (
    <Link to={isLocked ? '#' : ROUTES.COURSE(course.slug)}>
      <Card variant="interactive" className={cn('group overflow-hidden', className)}>
        {/* Category color bar */}
        <div
          className="h-1 w-full"
          style={{ background: `linear-gradient(90deg, ${category.color}, ${category.color}40)` }}
        />

        <CardContent className="p-5 space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div
              className="flex size-11 items-center justify-center rounded-xl text-2xl"
              style={{ background: `${category.color}12`, border: `1px solid ${category.color}25` }}
            >
              {isLocked ? <Lock className="size-5 text-muted-foreground" /> : (course.coverImage ?? '🔐')}
            </div>
            <div className="flex flex-col items-end gap-1">
              {course.isNew  && <Badge variant="new">NEW</Badge>}
              {course.isPro  && <Badge variant="pro">PRO</Badge>}
            </div>
          </div>

          {/* Info */}
          <div>
            <Badge variant={difficultyVariant(course.difficulty)} className="mb-1.5">
              {course.difficulty}
            </Badge>
            <h3 className="font-semibold text-foreground text-sm leading-snug">{course.title}</h3>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{course.tagline}</p>
          </div>

          {/* Meta row */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-border">
            <span className="flex items-center gap-1">
              <Clock className="size-3" />
              {formatDuration(course.estimatedHours * 60)}
            </span>
            <span className="flex items-center gap-1">
              <Zap className="size-3 text-primary" />
              <span className="text-primary font-medium">+{course.xpReward} XP</span>
            </span>
          </div>

          {/* Progress if started */}
          {isStarted && (
            <Progress value={pct} max={100} size="xs" color="gradient" />
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
