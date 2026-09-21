import { useEffect, useRef, useState } from 'react'

/** Swaps the rate by sliding the old value out and the new one in. Both sit in
 *  the same grid cell, so the badge never jumps.
 *
 *  The two states the stylesheet animates between — `arriving` and neither, and
 *  neither and `leaving` — need a frame apart to transition rather than jump,
 *  which is why the incoming value renders in its `arriving` position first and
 *  is released on the next frame. The outgoing value is kept mounted until its
 *  transition has run. */
const TRANSITION_MS = 640

export function FeeRate({ rate }: { rate: string }) {
  const [current, setCurrent] = useState(rate)
  const [leaving, setLeaving] = useState<string | null>(null)
  const [arriving, setArriving] = useState(false)

  const previous = useRef(rate)

  useEffect(() => {
    if (rate === previous.current) return
    setLeaving(previous.current)
    setCurrent(rate)
    setArriving(true)
    previous.current = rate

    const frame = requestAnimationFrame(() =>
      requestAnimationFrame(() => setArriving(false)),
    )
    const timer = window.setTimeout(() => setLeaving(null), TRANSITION_MS)
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(timer)
    }
  }, [rate])

  return (
    <span className="fee-rate-slot">
      {leaving !== null && <span className="fee-rate leaving">{leaving}</span>}
      <span className={`fee-rate${arriving ? ' arriving' : ''}`}>{current}</span>
    </span>
  )
}
