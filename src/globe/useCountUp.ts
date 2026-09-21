import { useEffect, useRef, useState } from 'react'

const DURATION_MS = 900

/** Eases a number towards a target over ~900ms, cubic out.
 *
 *  Starting from whatever is on screen rather than from the previous target is
 *  what keeps a change made mid-tween from jumping. */
export function useCountUp(target: number) {
  const [shown, setShown] = useState(target)
  const from = useRef(target)
  const frame = useRef(0)

  useEffect(() => {
    if (from.current === target) return
    const start = performance.now()
    const begin = from.current

    const step = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION_MS)
      const eased = 1 - Math.pow(1 - p, 3)
      const value = Math.round(begin + (target - begin) * eased)
      setShown(value)
      from.current = value
      if (p < 1) frame.current = requestAnimationFrame(step)
      else from.current = target
    }

    frame.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame.current)
  }, [target])

  return shown
}
