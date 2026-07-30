import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AuthLayoutProvider } from '@/features/auth/components/auth-layout-provider'
import { ProtectedRoute }     from '@/features/auth/components/protected-route'
import { AppLayout }          from '@/components/layout/app-layout'
import { Login }              from '@/features/auth/pages/login'
import { Register }           from '@/features/auth/pages/register'
import { Dashboard }          from '@/features/dashboard/pages/dashboard'
import { AcademyPaths }       from '@/features/academy/pages/academy-paths'
import { Courses }            from '@/features/courses/pages/courses'
import { CourseDetail }       from '@/features/courses/pages/course-detail'
import { Labs }               from '@/features/labs/pages/labs'
import { Challenges }         from '@/features/challenges/pages/challenges'
import { Leaderboard }        from '@/features/leaderboard/pages/leaderboard'
import { Profile }            from '@/features/profile/pages/profile'
import { Settings }           from '@/features/settings/pages/settings'
import { Missions }           from '@/features/missions/pages/missions'
import { LessonPage }         from '@/features/lesson/pages/lesson-page'
import { MissionPage }        from '@/features/mission/mission-page'
import { NotFound }           from '@/components/shared/error-states'
import { ROUTES }             from '@/lib/constants'

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
  {
    // Root layout — provides AuthContext to every route.
    // Must be inside RouterProvider so useNavigate works inside AuthProvider.
    element: <AuthLayoutProvider />,
    children: [

      // ── Public routes ─────────────────────────────────────────────────
      { path: ROUTES.AUTH.LOGIN,    element: <Login />    },
      { path: ROUTES.AUTH.REGISTER, element: <Register /> },
      { path: ROUTES.AUTH.FORGOT,   element: <Navigate to={ROUTES.AUTH.LOGIN} replace /> },

      // ── Protected routes ──────────────────────────────────────────────
      {
        element: <ProtectedRoute />,
        children: [

          // Full-screen — no AppLayout chrome
          {
            path: 'courses/:courseSlug/lessons/:lessonSlug',
            element: <LessonPage />,
          },
          {
            path: 'missions/:missionId',
            element: <MissionPage />,
          },

          // App shell
          {
            path: '/',
            element: <AppLayout />,
            children: [
              { index: true,                    element: <Navigate to={ROUTES.DASHBOARD} replace /> },
              { path: 'dashboard',              element: <Dashboard />    },
              { path: 'academy-paths',          element: <AcademyPaths /> },
              { path: 'courses',                element: <Courses />      },
              { path: 'courses/:courseSlug',    element: <CourseDetail /> },
              { path: 'missions',               element: <Missions />     },
              { path: 'labs',                   element: <Labs />         },
              { path: 'challenges',             element: <Challenges />   },
              { path: 'leaderboard',            element: <Leaderboard />  },
              { path: 'career-hub',             element: <ComingSoon label="Career Hub" />    },
              { path: 'certificates',           element: <ComingSoon label="Certificates" /> },
              { path: 'resources',              element: <ComingSoon label="Resources" />    },
              { path: 'community',              element: <ComingSoon label="Community" />    },
              { path: 'profile',                element: <Profile />   },
              { path: 'settings',               element: <Settings />  },
            ],
          },
        ],
      },

      // ── Catch-all ──────────────────────────────────────────────────────
      { path: '*', element: <NotFound /> },
    ],
  },
])
