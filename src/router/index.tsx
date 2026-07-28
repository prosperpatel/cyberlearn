import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/app-layout'
import { AuthLayout } from '@/components/layout/auth-layout'
import { Dashboard } from '@/features/dashboard/pages/dashboard'
import { Courses } from '@/features/courses/pages/courses'
import { Labs } from '@/features/labs/pages/labs'
import { Challenges } from '@/features/challenges/pages/challenges'
import { Leaderboard } from '@/features/leaderboard/pages/leaderboard'
import { Profile } from '@/features/profile/pages/profile'
import { Settings } from '@/features/settings/pages/settings'
import { Login } from '@/features/auth/pages/login'
import { Register } from '@/features/auth/pages/register'
import { LessonPage } from '@/features/lesson/pages/lesson-page'
import { NotFound } from '@/components/shared/error-states'
import { ROUTES } from '@/lib/constants'

export const router = createBrowserRouter([
  // ── Lesson player — full-screen, outside AppLayout chrome ──
  {
    path: 'courses/:courseSlug/lessons/:lessonSlug',
    element: <LessonPage />,
  },

  // ── App shell ──
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true,                 element: <Navigate to={ROUTES.DASHBOARD} replace /> },
      { path: 'dashboard',           element: <Dashboard /> },
      { path: 'courses',             element: <Courses /> },
      { path: 'courses/:courseSlug', element: <div className="p-8 text-muted-foreground">Course detail — coming soon</div> },
      { path: 'labs',                element: <Labs /> },
      { path: 'challenges',          element: <Challenges /> },
      { path: 'leaderboard',         element: <Leaderboard /> },
      { path: 'profile',             element: <Profile /> },
      { path: 'settings',            element: <Settings /> },
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
