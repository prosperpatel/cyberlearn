import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/app-layout'
import { AuthLayout } from '@/components/layout/auth-layout'
import { Dashboard } from '@/features/dashboard/pages/dashboard'
import { AcademyPaths } from '@/features/academy/pages/academy-paths'
import { Courses } from '@/features/courses/pages/courses'
import { Labs } from '@/features/labs/pages/labs'
import { Challenges } from '@/features/challenges/pages/challenges'
import { Leaderboard } from '@/features/leaderboard/pages/leaderboard'
import { Profile } from '@/features/profile/pages/profile'
import { Settings } from '@/features/settings/pages/settings'
import { Login } from '@/features/auth/pages/login'
import { Register } from '@/features/auth/pages/register'
import { LessonPage } from '@/features/lesson/pages/lesson-page'
import { CourseDetail } from '@/features/courses/pages/course-detail'
import { NotFound } from '@/components/shared/error-states'
import { MissionPage } from '@/features/mission/mission-page'
import { ROUTES } from '@/lib/constants'

// Lightweight placeholder for nav items not yet built out
function ComingSoon({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-center p-8">
      <p className="text-4xl">🚧</p>
      <h1 className="text-xl font-black text-foreground">{label}</h1>
      <p className="text-sm text-muted-foreground">This section is under construction. Check back soon.</p>
    </div>
  )
}

export const router = createBrowserRouter([
  // ── Lesson player — full-screen, outside AppLayout chrome ──
  {
    path: 'courses/:courseSlug/lessons/:lessonSlug',
    element: <LessonPage />,
  },

  // ── Mission engine — full-screen, outside AppLayout chrome ──
  {
    path: 'missions/:missionId',
    element: <MissionPage />,
  },

  // ── App shell ──
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true,                    element: <Navigate to={ROUTES.DASHBOARD} replace /> },
      { path: 'dashboard',              element: <Dashboard /> },
      { path: 'academy-paths',          element: <AcademyPaths /> },
      { path: 'courses',                element: <Courses /> },
      { path: 'courses/:courseSlug',    element: <CourseDetail /> },
      { path: 'labs',                   element: <Labs /> },
      { path: 'challenges',             element: <Challenges /> },
      { path: 'leaderboard',            element: <Leaderboard /> },
      { path: 'career-hub',             element: <ComingSoon label="Career Hub" /> },
      { path: 'certificates',           element: <ComingSoon label="Certificates" /> },
      { path: 'resources',              element: <ComingSoon label="Resources" /> },
      { path: 'community',              element: <ComingSoon label="Community" /> },
      { path: 'profile',                element: <Profile /> },
      { path: 'settings',               element: <Settings /> },
    ],
  },

  // ── Auth shell ──
  {
    element: <AuthLayout />,
    children: [
      { path: 'login',            element: <Login /> },
      { path: 'register',         element: <Register /> },
      { path: 'forgot-password',  element: <div>Forgot password — coming soon</div> },
    ],
  },

  // ── Catch-all ──
  { path: '*', element: <NotFound /> },
])
