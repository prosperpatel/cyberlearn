import { RouterProvider } from 'react-router-dom'
import { router }          from '@/router'
import { EngineProviders } from '@/engine/providers'

export function App() {
  return (
    <EngineProviders>
      <RouterProvider router={router} />
    </EngineProviders>
  )
}
