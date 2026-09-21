import { useEffect, useMemo, useState } from 'react'

/** The three value-prop cards that float over the globe: they fade in one by
 *  one, hold, fade out one by one, pause, and repeat.
 *
 *  Their positions are expressed in globe diameters rather than pixels, which
 *  is how the later explorations kept them where v1 put them while shrinking
 *  the globe underneath. */

export const CARD_IDS = ['card-disputes', 'card-tax', 'card-fraud'] as const
export type CardId = (typeof CARD_IDS)[number]

/** v1's card width at v1's own globe size, and that width as a fraction of the
 *  globe's diameter. Together they give the scale factor for any other globe. */
const CARD_BASE_W = 240
const CARD_W_RATIO = 0.565

/** Offsets from the globe's centre, in globe diameters. */
const CARD_SPOTS: Record<CardId, { dx: number; dy: number }> = {
  'card-disputes': { dx: 0.0435, dy: -0.353 },
  'card-tax': { dx: -0.579, dy: -0.141 },
  'card-fraud': { dx: 0.087, dy: 0.198 },
}

const FADE_IN_DELAY = 900 // between each card fading in
const HOLD_TIME = 2000 // all cards visible
const FADE_OUT_DELAY = 600 // between each card fading out
const PAUSE_TIME = 1200 // before restarting
const START_DELAY = 1000

/** Which cards are currently visible, on the cycle above. */
export function useValueCardCycle(enabled = true): Set<CardId> {
  const [visible, setVisible] = useState<Set<CardId>>(new Set())

  useEffect(() => {
    if (!enabled) return
    const timers: number[] = []
    const at = (delay: number, fn: () => void) => timers.push(window.setTimeout(fn, delay))

    const show = (id: CardId) =>
      setVisible((current) => new Set(current).add(id))
    const hide = (id: CardId) =>
      setVisible((current) => {
        const next = new Set(current)
        next.delete(id)
        return next
      })

    const runCycle = () => {
      let t = 0
      // In, top to bottom, so the feed reads down the globe as it fills.
      CARD_IDS.forEach((id, i) => at(t + i * FADE_IN_DELAY, () => show(id)))
      t += CARD_IDS.length * FADE_IN_DELAY + HOLD_TIME
      CARD_IDS.forEach((id, i) => at(t + i * FADE_OUT_DELAY, () => hide(id)))
      t += CARD_IDS.length * FADE_OUT_DELAY + PAUSE_TIME
      at(t, runCycle)
    }

    at(START_DELAY, runCycle)
    return () => timers.forEach(clearTimeout)
  }, [enabled])

  return visible
}

/** Inline position and scale for each card, given the globe's pixel diameter
 *  and the size of the box it sits in. Returns nothing until the diameter is
 *  known, so the cards aren't painted at the wrong place first. */
export function useValueCardLayout(
  diameter: number | null,
  box: { width: number; height: number } | null,
) {
  return useMemo(() => {
    if (!diameter || !box) return null
    const cardScale = (CARD_W_RATIO * diameter) / CARD_BASE_W
    return Object.fromEntries(
      CARD_IDS.map((id) => {
        const spot = CARD_SPOTS[id]
        return [
          id,
          {
            '--card-scale': String(cardScale),
            left: `${box.width / 2 + spot.dx * diameter}px`,
            top: `${box.height / 2 + spot.dy * diameter}px`,
          } as React.CSSProperties,
        ]
      }),
    ) as Record<CardId, React.CSSProperties>
  }, [diameter, box])
}
