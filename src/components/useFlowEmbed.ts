import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

/** Several of the explorations double as a step inside the end-to-end flow,
 *  which hosts them in an iframe with `?flow=1`. Embedded, a screen:
 *
 *  - drops its own Home button, since the flow has its own chrome
 *  - takes its progress figure from the flow rather than its own constant
 *  - hands Back and Continue up to the parent instead of acting on them
 *  - stops treating a backdrop click as an exit
 */
export function useFlowEmbed(ownProgress: number) {
  const [params] = useSearchParams()
  const embedded = params.get('flow') === '1'

  const fromFlow = params.get('progress')
  const progress = embedded && fromFlow !== null ? Number(fromFlow) : ownProgress

  const send = useCallback(
    (dir: 'next' | 'back') => {
      if (!embedded) return false
      parent.postMessage({ type: 'flow-nav', dir }, '*')
      return true
    },
    [embedded],
  )

  return { embedded, progress, send }
}
