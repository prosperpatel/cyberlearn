import { lazy, Suspense } from 'react'
import type { ReactElement } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AuthLayoutProvider } from '@/features/auth/components/auth-layout-provider'
import { ProtectedRoute }     from '@/features/auth/components/protected-route'
import { AuthCallback }       from '@/features/auth/pages/auth-callback'
import { AppLayout }          from '@/components/layout/app-layout'
import { NotFound }           from '@/components/shared/error-states'
import { ROUTES }             from '@/lib/constants'

// Page-level lazy imports — each route chunk loads only when first visited.
const Login          = lazy(() => import('@/features/auth/pages/login').then(m => ({ default: m.Login })))
const Register       = lazy(() => import('@/features/auth/pages/register').then(m => ({ default: m.Register })))
const OnboardingPage = lazy(() => import('@/features/onboarding/pages/onboarding-page').then(m => ({ default: m.OnboardingPage })))
const Dashboard      = lazy(() => import('@/features/dashboard/pages/dashboard').then(m => ({ default: m.Dashboard })))
const AcademyPaths   = lazy(() => import('@/features/academy/pages/academy-paths').then(m => ({ default: m.AcademyPaths })))
const Courses        = lazy(() => import('@/features/courses/pages/courses').then(m => ({ default: m.Courses })))
const CourseDetail   = lazy(() => import('@/features/courses/pages/course-detail').then(m => ({ default: m.CourseDetail })))
const Labs           = lazy(() => import('@/features/labs/pages/labs').then(m => ({ default: m.Labs })))
const Challenges     = lazy(() => import('@/features/challenges/pages/challenges').then(m => ({ default: m.Challenges })))
const Leaderboard    = lazy(() => import('@/features/leaderboard/pages/leaderboard').then(m => ({ default: m.Leaderboard })))
const Profile        = lazy(() => import('@/features/profile/pages/profile').then(m => ({ default: m.Profile })))
const Settings       = lazy(() => import('@/features/settings/pages/settings').then(m => ({ default: m.Settings })))
const Missions       = lazy(() => import('@/features/missions/pages/missions').then(m => ({ default: m.Missions })))
const LessonPage     = lazy(() => import('@/features/lesson/pages/lesson-page').then(m => ({ default: m.LessonPage })))
const MissionPage    = lazy(() => import('@/features/mission/mission-page').then(m => ({ default: m.MissionPage })))

function ComingSoon({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-center p-8">
      <p className="text-4xl">🚧</p>
      <h1 className="text-xl font-black text-foreground">{label}</h1>
      <p className="text-sm text-muted-foreground">This section is under construction. Check back soon.</p>
    </div>
  )
}

function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyber-blue border-t-transparent" />
    </div>
  )
}

function page(el: ReactElement) {
  return <Suspense fallback={<PageLoader />}>{el}</Suspense>
}

export const router = createBrowserRouter([
  {
    // Root layout — provides AuthContext to every route.
    // Must be inside RouterProvider so useNavigate works inside AuthProvider.
    element: <AuthLayoutProvider />,
    children: [

      // ── Public routes ─────────────────────────────────────────────────
      { path: ROUTES.AUTH.LOGIN,    element: page(<Login />)    },
      { path: ROUTES.AUTH.REGISTER, element: page(<Register />) },
      { path: ROUTES.AUTH.FORGOT,   element: <Navigate to={ROUTES.AUTH.LOGIN} replace /> },
      // OAuth callback — must be public (unauthenticated on arrival).
      // Supabase redirects here with tokens in the URL hash; AuthProvider
      // processes them and navigates to /dashboard or /onboarding.
      { path: 'auth/callback', element: <AuthCallback /> },

      // ── Protected routes ──────────────────────────────────────────────
      {
        element: <ProtectedRoute />,
        children: [

          // Onboarding — full-screen, no AppLayout, accessible before profile exists
          {
            path: ROUTES.ONBOARDING.slice(1),
            element: page(<OnboardingPage />),
          },

          // Full-screen — no AppLayout chrome
          {
            path: 'courses/:courseSlug/lessons/:lessonSlug',
            element: page(<LessonPage />),
          },
          {
            path: 'missions/:missionId',
            element: page(<MissionPage />),
          },

          // App shell
          {
            path: '/',
            element: <AppLayout />,
            children: [
              { index: true,                    element: <Navigate to={ROUTES.DASHBOARD} replace /> },
              { path: 'dashboard',              element: page(<Dashboard />)    },
              { path: 'academy-paths',          element: page(<AcademyPaths />) },
              { path: 'courses',                element: page(<Courses />)      },
              { path: 'courses/:courseSlug',    element: page(<CourseDetail />) },
              { path: 'missions',               element: page(<Missions />)     },
              { path: 'labs',                   element: page(<Labs />)         },
              { path: 'challenges',             element: page(<Challenges />)   },
              { path: 'leaderboard',            element: page(<Leaderboard />)  },
              { path: 'career-hub',             element: <ComingSoon label="Career Hub" />    },
              { path: 'certificates',           element: <ComingSoon label="Certificates" /> },
              { path: 'resources',              element: <ComingSoon label="Resources" />    },
              { path: 'community',              element: <ComingSoon label="Community" />    },
              { path: 'profile',                element: page(<Profile />)   },
              { path: 'settings',               element: page(<Settings />)  },
            ],
          },
        ],
      },

      // ── Catch-all ──────────────────────────────────────────────────────
      { path: '*', element: <NotFound /> },
    ],
  },
])
