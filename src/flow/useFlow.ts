import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export type FlowAction = 'continue' | 'skip' | 'live' | 'sandbox'

export type FlowStep = {
  id: string
  /** Widens or narrows the modal for this screen. */
  width?: 'narrow' | 'wide'
  /** Only `welcome` hides it — there's nowhere back to go. */
  back?: boolean
  actions?: FlowAction[]
  /** The SMP screen, which replaces the modal entirely. */
  variantStep?: boolean
  /** The dashboard, which is the destination rather than a step. */
  dashboardStep?: boolean
  /** Conditional screens: the domestic upsell only follows a Managed payments
   *  choice. A step that doesn't apply is skipped in both directions. */
  when?: () => boolean
}

/** How the progress bar is computed.
 *
 *  `fixed` spreads it over every modal step, which is what the flow with the SMP
 *  screen does — that screen owns its own bar and has to line up with this one.
 *
 *  `path` spreads it over only the steps this path actually visits, so a flow
 *  whose length depends on earlier answers still fills evenly. */
export type ProgressMode = 'fixed' | 'path'

/** Drives an onboarding flow: which step is showing, how the progress bar reads,
 *  and the keyboard and backdrop behaviour both flows share. */
export function useFlow(
  steps: FlowStep[],
  {
    initialStep = 0,
    progressMode = 'fixed',
  }: { initialStep?: number; progressMode?: ProgressMode } = {},
) {
  const navigate = useNavigate()
  const [index, setIndex] = useState(initialStep)

  const goHome = useCallback(() => navigate('/gallery'), [navigate])

  /** Walks in `delta` steps until it lands on one that applies. */
  const step = useCallback(
    (delta: number) => {
      setIndex((current) => {
        let next = current + delta
        while (next > 0 && next < steps.length - 1 && steps[next].when?.() === false) {
          next += delta
        }
        return Math.max(0, Math.min(steps.length - 1, next))
      })
    },
    [steps],
  )

  const goNext = useCallback(() => step(1), [step])

  const goBack = useCallback(() => {
    // Back off the first screen leaves the flow rather than doing nothing.
    if (index === 0) goHome()
    else step(-1)
  }, [index, step, goHome])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goBack()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, goBack])

  /** The dashboard is the destination rather than a step, so the last modal
   *  screen reads as complete either way. */
  const progressFor = (i: number) => {
    if (progressMode === 'path') {
      const path = steps.filter((s) => s.when?.() !== false && !s.dashboardStep)
      const at = path.indexOf(steps[i])
      if (at === -1) return 100
      return Number((((at + 1) / path.length) * 100).toFixed(1))
    }
    const modalSteps = steps.length - 1
    return Number((4 + (i / (modalSteps - 1)) * 96).toFixed(1))
  }

  return {
    index,
    setIndex,
    current: steps[index],
    goNext,
    goBack,
    goHome,
    progress: progressFor(progressMode === 'path' ? index : Math.min(index, steps.length - 2)),
    progressFor,
  }
}
