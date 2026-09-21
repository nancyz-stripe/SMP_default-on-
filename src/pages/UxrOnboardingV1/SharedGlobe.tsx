import { useEffect, useState, type RefObject } from 'react'

/** The value cards over the globe (Figma 26702:76384).
 *
 *  Named businesses rather than capability labels: each card is something that
 *  happened to a company the merchant has heard of, so the globe reads as evidence
 *  instead of a second copy of the benefit list beside it. */
const CARDS = [
  {
    id: 'card-tax',
    kind: 'tax',
    logo: 'lovable',
    name: 'Lovable',
    line: 'Crossed a tax threshold managed by Stripe',
  },
  {
    id: 'card-fraud',
    kind: 'fraud',
    logo: 'unity',
    name: 'Unity',
    line: 'Avoided a fraud attempt caught by Stripe',
  },
  {
    id: 'card-payment',
    kind: 'payment',
    logo: 'revenuecat',
    name: 'RevenueCat',
    line: 'Recovered a payment optimized by Stripe',
  },
  {
    id: 'card-dispute',
    kind: 'dispute',
    logo: 'mobbin',
    name: 'Mobbin.com',
    line: 'Won a dispute managed by Stripe',
  },
]

const FADE_IN_DELAY = 700
const HOLD_TIME = 2000
const FADE_OUT_DELAY = 600
const PAUSE_TIME = 1200
const START_DELAY = 1000

/** The cards fade in top to bottom, so the feed reads down the globe as it fills
 *  in, hold, fade out in the same order, and repeat. */
function useCardCycle(running: boolean) {
  const [visible, setVisible] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (!running) return
    const timers: number[] = []
    const at = (delay: number, fn: () => void) => timers.push(window.setTimeout(fn, delay))

    const runCycle = () => {
      let t = 0
      CARDS.forEach((card, i) =>
        at(t + i * FADE_IN_DELAY, () => setVisible((s) => new Set(s).add(card.id))),
      )
      t += CARDS.length * FADE_IN_DELAY + HOLD_TIME
      CARDS.forEach((card, i) =>
        at(t + i * FADE_OUT_DELAY, () =>
          setVisible((s) => {
            const next = new Set(s)
            next.delete(card.id)
            return next
          }),
        ),
      )
      t += CARDS.length * FADE_OUT_DELAY + PAUSE_TIME
      at(t, runCycle)
    }

    at(START_DELAY, runCycle)
    return () => timers.forEach(clearTimeout)
  }, [running])

  return visible
}

/** The globe's element and everything laid over it.
 *
 *  It is mounted exactly once, for the page's whole life, and moved between hosts
 *  by `useSharedGlobe` — so nothing here may be conditional on which step is
 *  showing, or the move would remount it. */
export function SharedGlobe({
  element,
  holder,
  diameter,
}: {
  element: RefObject<HTMLDivElement | null>
  holder: RefObject<HTMLDivElement | null>
  /** Published by the scene, and what the glow circle and the cards size off. */
  diameter: number | null
}) {
  const visible = useCardCycle(diameter !== null)

  return (
    // Where the globe waits while other steps are on screen.
    <div id="globe-holder" ref={holder}>
      <div
        className="globe"
        ref={element}
        // The value cards take their width, their type sizes and their positions
        // off the globe's own diameter rather than the panel's.
        style={diameter ? ({ '--globe-d': `${diameter}px` } as React.CSSProperties) : undefined}
      >
        <div
          className="globe-glow-circle"
          style={diameter ? { width: diameter, height: diameter } : undefined}
        ></div>

        {CARDS.map((card) => (
          <div
            key={card.id}
            className={`globe-card ${card.kind}${visible.has(card.id) ? ' visible' : ''}`}
          >
            <img className="globe-card-logo" src={`/assets/logos/${card.logo}.svg`} alt="" />
            <div className="globe-card-text">
              <span className="globe-card-title">{card.name}</span>
              <span className="globe-card-subtitle">{card.line}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
