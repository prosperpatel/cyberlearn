import { useEffect, useState } from 'react'
import { Search, Filter } from 'lucide-react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CourseCard } from '@/components/shared/course-card'
import { CourseCardSkeleton } from '@/components/shared/loading-states'
import { getAllCourses } from '@/lib/content'
import type { ContentCourse } from '@/lib/content'
import type { Course } from '@/types'

// ── Courses not yet in the content engine ────────────────────────────────────

const PLACEHOLDER_COURSES: Course[] = [
  {
    id: 'placeholder-cryptography',
    slug: 'cryptography-101',
    title: 'Cryptography 101',
    tagline: 'Secrets, ciphers, and how encryption protects data',
    description: '',
    coverImage: '🔐',
    category: 'cryptography',
    difficulty: 'intermediate',
    estimatedHours: 7,
    xpReward: 1100,
    modules: [],
    prerequisites: [],
    tags: ['cryptography', 'encryption', 'aes', 'rsa'],
    isPro: true,
    stats: { totalLessons: 21, totalStudents: 6200, averageRating: 4.9, completionRate: 58 },
  },
  {
    id: 'placeholder-malware',
    slug: 'malware-analysis',
    title: 'Malware Analysis',
    tagline: 'Reverse engineer viruses and understand their payloads',
    description: '',
    coverImage: '🦠',
    category: 'malware-analysis',
    difficulty: 'advanced',
    estimatedHours: 14,
    xpReward: 2000,
    modules: [],
    prerequisites: [],
    tags: ['malware', 'reverse-engineering', 'pe', 'disassembly'],
    stats: { totalLessons: 36, totalStudents: 4100, averageRating: 4.8, completionRate: 42 },
  },
  {
    id: 'placeholder-social',
    slug: 'social-engineering',
    title: 'Social Engineering',
    tagline: 'The human element — how attackers exploit psychology',
    description: '',
    coverImage: '🎭',
    category: 'social-engineering',
    difficulty: 'beginner',
    estimatedHours: 5,
    xpReward: 750,
    modules: [],
    prerequisites: [],
    tags: ['social-engineering', 'phishing', 'pretexting', 'osint'],
    isNew: true,
    stats: { totalLessons: 15, totalStudents: 8700, averageRating: 4.7, completionRate: 78 },
  },
]

// ── Map ContentCourse → Course for the card component ────────────────────────

function toDisplayCourse(c: ContentCourse): Course {
  return {
    id: c.id,
    slug: c.slug,
    title: c.title,
    tagline: c.tagline,
    description: c.description,
    coverImage: c.coverEmoji ?? '🔐',
    category: c.category,
    difficulty: c.difficulty,
    estimatedHours: c.estimatedHours,
    xpReward: c.xpReward,
    modules: [],
    prerequisites: c.prerequisites,
    tags: c.tags,
    isNew: c.isNew,
    isPro: c.isPro,
    stats: {
      totalLessons: c.modules.reduce((sum, m) => sum + m.lessonCount, 0),
      totalStudents: 0,
      averageRating: 0,
      completionRate: 0,
    },
  }
}

// ── Filter labels ─────────────────────────────────────────────────────────────

const FILTERS = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Pro']

// ── Page ──────────────────────────────────────────────────────────────────────

export function Courses() {
  const [contentCourses, setContentCourses] = useState<Course[]>([])
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchQuery, setSearchQuery]     = useState('')
  const [loading, setLoading]             = useState(true)

  useEffect(() => {
    getAllCourses()
      .then((courses) => setContentCourses(courses.map(toDisplayCourse)))
      .catch(() => setContentCourses([]))
      .finally(() => setLoading(false))
  }, [])

  // Merge content-engine courses (slug-deduped) with placeholders
  const contentSlugs = new Set(contentCourses.map((c) => c.slug))
  const merged = [
    ...contentCourses,
    ...PLACEHOLDER_COURSES.filter((p) => !contentSlugs.has(p.slug)),
  ]

  // Apply filter + search
  const visible = merged.filter((course) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      const hit =
        course.title.toLowerCase().includes(q) ||
        course.tagline.toLowerCase().includes(q) ||
        course.tags.some((t) => t.toLowerCase().includes(q))
      if (!hit) return false
    }
    if (activeFilter === 'Pro')                                      return !!course.isPro
    if (activeFilter !== 'All' && activeFilter !== 'Pro')            return course.difficulty === activeFilter.toLowerCase()
    return true
  })

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-foreground">Courses</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {loading ? 'Loading…' : `${merged.length} courses · Learn by doing`}
        </p>
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
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <CourseCardSkeleton key={i} />)
          : visible.map((course, i) => (
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

      {!loading && visible.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg font-semibold">No courses match your search</p>
          <p className="text-sm mt-1">Try a different keyword or clear the filter</p>
        </div>
      )}
    </div>
  )
}
