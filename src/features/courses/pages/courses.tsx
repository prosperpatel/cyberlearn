import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, GraduationCap } from 'lucide-react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CourseCard } from '@/components/shared/course-card'
import { STANDALONE_COURSES } from '@/data/courseData'
import { ROUTES } from '@/lib/constants'

// ── Filter labels ─────────────────────────────────────────────────────────────

const FILTERS = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Pro']

// ── Page ──────────────────────────────────────────────────────────────────────

export function Courses() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchQuery, setSearchQuery]   = useState('')

  const visible = STANDALONE_COURSES.filter((course) => {
    if (searchQuery) {
      const q   = searchQuery.toLowerCase()
      const hit =
        course.title.toLowerCase().includes(q) ||
        course.tagline.toLowerCase().includes(q) ||
        course.tags.some((t) => t.toLowerCase().includes(q))
      if (!hit) return false
    }
    if (activeFilter === 'Pro')                         return !!course.isPro
    if (activeFilter !== 'All')                         return course.difficulty === activeFilter.toLowerCase()
    return true
  })

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-foreground">Courses</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {STANDALONE_COURSES.length} standalone courses · Learn a specific skill, fast
          </p>
        </div>

        {/* Prompt towards Academy Paths */}
        <Link
          to={ROUTES.ACADEMY_PATHS}
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl border border-primary/25 bg-primary/5 text-sm font-medium text-primary hover:bg-primary/10 transition-colors shrink-0"
        >
          <GraduationCap className="size-4" />
          Academy Paths
        </Link>
      </div>

      {/* Academy callout — helps users find the right track */}
      <div className="rounded-xl border border-border bg-base-800/40 px-5 py-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-foreground">Looking for a structured curriculum?</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Academy Paths provide a guided progression from Recruit to Elite Operator.
          </p>
        </div>
        <Link
          to={ROUTES.ACADEMY_PATHS}
          className="shrink-0 text-xs font-bold text-primary hover:underline flex items-center gap-1"
        >
          <GraduationCap className="size-3.5" />
          View Academies
        </Link>
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          placeholder="Search courses..."
          startIcon={<Search />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex items-center gap-2 flex-wrap">
          {FILTERS.map((f) => (
            <Badge
              key={f}
              variant={activeFilter === f ? 'primary' : 'outline'}
              className="cursor-pointer hover:border-primary/40 transition-colors"
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </Badge>
          ))}
          <Button variant="ghost" size="sm" className="gap-1.5">
            <Filter className="size-3.5" /> More filters
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          >
            <CourseCard course={course} />
          </motion.div>
        ))}
      </div>

      {visible.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg font-semibold">No courses match your search</p>
          <p className="text-sm mt-1">Try a different keyword or clear the filter</p>
        </div>
      )}
    </div>
  )
}
