import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import './global.css'

/** Agentation's toolbar: click an element on the page, annotate it, and copy
 *  output carrying the selector and surrounding context — which is how feedback on
 *  a prototype gets back to an agent precisely enough to act on.
 *
 *  A devDependency, so it's loaded only on the dev server. Lazily imported, so the
 *  chunk exists in a production build but is never requested there. Drop the
 *  `import.meta.env.DEV` guard to put it in front of reviewers on a deployed
 *  build too. */
const Agentation = lazy(() => import('agentation').then((m) => ({ default: m.Agentation })))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    {import.meta.env.DEV && (
      <Suspense fallback={null}>
        {/* The gallery keeps its open tab in the hash, so feedback is keyed by
            path and hash together rather than by path alone. */}
        <Agentation appName="SMP default-on prototypes" useHashLocation />
      </Suspense>
    )}
  </StrictMode>,
)
