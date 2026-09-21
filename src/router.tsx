import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy, Suspense, type ComponentType } from 'react'

// Every prototype is its own chunk: one of them pulls in 130KB of scoped CSS,
// and the gallery iframes several at once, so eager-loading all 28 would make
// the first paint pay for the whole archive.
const page = (loader: () => Promise<{ default: ComponentType }>) => {
  const Lazy = lazy(loader)
  return (
    <Suspense fallback={null}>
      <Lazy />
    </Suspense>
  )
}

const Gallery = () => page(() => import('./pages/Gallery'))
const FlowGlobe = () => page(() => import('./pages/FlowGlobe'))
const SmpHome = () => page(() => import('./pages/SmpHome'))
const Flow = () => page(() => import('./pages/Flow'))
const Flow2step = () => page(() => import('./pages/Flow2step'))
const Smp = () => page(() => import('./pages/Smp'))
const Treatments = () => page(() => import('./pages/Treatments'))
const EmailFirstPayment = () => page(() => import('./pages/EmailFirstPayment'))
const EmailTaxThreshold = () => page(() => import('./pages/EmailTaxThreshold'))
const Exploration = () => page(() => import('./pages/Exploration'))
const GlobePrototype = () => page(() => import('./pages/GlobePrototype'))
const UxrOnboardingV1 = () => page(() => import('./pages/UxrOnboardingV1'))
const UxrOnboardingV2 = () => page(() => import('./pages/UxrOnboardingV2'))

// The paths vercel.json served, kept as-is so existing links and the deep links
// the prototypes build (`/onboarding/<step>`, `/smp-home/<stage>/<tab>`) still
// resolve. The step and stage segments are read by the pages themselves.
export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/gallery" replace /> },
  { path: '/gallery', element: <Gallery /> },

  { path: '/website', element: <FlowGlobe /> },
  { path: '/pricing', element: <FlowGlobe /> },
  { path: '/onboarding', element: <FlowGlobe /> },
  { path: '/onboarding/:step', element: <FlowGlobe /> },
  { path: '/dashboard', element: <FlowGlobe /> },
  { path: '/account-app', element: <FlowGlobe /> },
  { path: '/account-app/:step', element: <FlowGlobe /> },

  // The research forks of the onboarding flow, one path per version. Each names
  // every step, rather than the five /onboarding inherited from the static build.
  { path: '/uxr', element: <Navigate to="/uxr/v1" replace /> },
  { path: '/uxr/v1', element: <UxrOnboardingV1 /> },
  { path: '/uxr/v1/:step', element: <UxrOnboardingV1 /> },
  { path: '/uxr/v2', element: <UxrOnboardingV2 /> },
  { path: '/uxr/v2/:step', element: <UxrOnboardingV2 /> },

  { path: '/smp-home', element: <SmpHome /> },
  { path: '/smp-home/:stage', element: <SmpHome /> },
  { path: '/smp-home/:stage/:tab', element: <SmpHome /> },

  { path: '/flow', element: <Flow /> },
  { path: '/flow-2step', element: <Flow2step /> },
  { path: '/smp', element: <Smp /> },
  { path: '/treatments', element: <Treatments /> },

  { path: '/email/first-payment', element: <EmailFirstPayment /> },
  { path: '/email/tax-threshold', element: <EmailTaxThreshold /> },

  // The v1–v8 archive and the baseline. One route, one component, because they
  // differ only in which exploration module it renders.
  { path: '/v/:slug', element: <Exploration /> },

  // The globe playground that the prototypes' globes were copied from. It was
  // the repo's root index.html, which is now the app's entry, so it moves to a
  // path of its own.
  { path: '/globe-prototype', element: <GlobePrototype /> },

  { path: '*', element: <Navigate to="/gallery" replace /> },
])
