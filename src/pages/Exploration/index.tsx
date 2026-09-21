import { lazy, Suspense, type ComponentType } from 'react'
import { Navigate, useParams } from 'react-router-dom'

/** The archive, behind one route. Every exploration is a page of its own; this
 *  only decides which one `/v/<slug>` means.
 *
 *  Slugs are the original filenames, so links that were written against them
 *  still resolve. Six of these were never listed in the gallery — they're
 *  reachable by URL, which is how they were reached before. */
const EXPLORATIONS: Record<string, () => Promise<{ default: ComponentType }>> = {
  baseline: () => import('../Baseline'),
  'v1-globe-crossborder': () => import('../V1GlobeCrossborder'),
  'v2-autopilot': () => import('../V2Autopilot'),
  'v2-b1': () => import('../V2B1'),
  'v2-globe-all-volume': () => import('../V2GlobeAllVolume'),
  'v2-latest': () => import('../V2Latest'),
  'v3-2-latest': () => import('../V32Latest'),
  'v3-latest': () => import('../V3Latest'),
  'v3-narratives': () => import('../V3Narratives'),
  'v3-treatments': () => import('../V3Treatments'),
  'v4-latest': () => import('../V4Latest'),
  'v4-value-comparison': () => import('../V4ValueComparison'),
  'v5-globe-behind': () => import('../V5GlobeBehind'),
  'v5-latest': () => import('../V5Latest'),
  'v6-fullscreen-gradient': () => import('../V6FullscreenGradient'),
  'v6-latest': () => import('../V6Latest'),
  'v7-mode-no-gradient': () => import('../V7ModeNoGradient'),
  'v8-latest': () => import('../V8Latest'),
}

/** Wrapped once, at module scope. A `lazy()` call inside render would return a
 *  new component type on every render, remounting the page — and with it the
 *  globe — each time. */
const PAGES: Record<string, ComponentType> = Object.fromEntries(
  Object.entries(EXPLORATIONS).map(([slug, loader]) => [slug, lazy(loader)]),
)

export default function Exploration() {
  const { slug } = useParams()
  const Page = slug ? PAGES[slug] : undefined
  if (!Page) return <Navigate to="/gallery" replace />

  return (
    <Suspense fallback={null}>
      <Page />
    </Suspense>
  )
}
