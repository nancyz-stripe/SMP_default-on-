import type { Narrative } from './narratives'
import { THINGS } from './narratives'

/** Screen 1, one per treatment. The treatment work is concentrated here, which
 *  is where the staleness was — screens 2–3 share one markup and only pick up
 *  the treatment's surface and type scale. */

export type TreatmentKey = 'handoff' | 'editorial' | 'stage' | 'ambient'

/** T1 — The handoff. Fixes the inert list: obligations start in your lane and
 *  move to Stripe's on a stagger. The argument is the motion, and your lane
 *  ending up empty. */
function Handoff({ n }: { n: Narrative }) {
  return (
    <>
      <h1 className="lede seq" style={{ animationDelay: '60ms' }}>
        {n.lede}
      </h1>
      <p className="body-copy seq" style={{ animationDelay: '200ms' }}>
        {n.body}
      </p>
      <div className="lanes seq" style={{ animationDelay: '300ms' }}>
        <div className="lane you">
          <div className="lane-head">You</div>
          <div className="lane-empty">Nothing here. You keep building and selling.</div>
          <span className="hand-arrow"></span>
        </div>
        <div className="lane stripe">
          <div className="lane-head">Stripe</div>
          <div className="lane-items">
            {THINGS.map(([what, how], i) => (
              <div className="lane-item" key={what} style={{ animationDelay: `${460 + i * 190}ms` }}>
                {what}
                <small>{how}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="closer seq" style={{ animationDelay: '1500ms' }}>
        {n.closer}
      </p>
    </>
  )
}

/** T2 — Editorial type. Fixes the timidity: no cards, no borders, 42px lede, one
 *  thought. Premium reads as confidence, and confidence looks like empty space. */
function Editorial({ n }: { n: Narrative }) {
  return (
    <>
      <h1 className="ed-lede seq" style={{ animationDelay: '60ms' }}>
        {n.lede}
      </h1>
      <p className="ed-body seq" style={{ animationDelay: '240ms' }}>
        {n.body}
      </p>
      <div className="ed-things seq" style={{ animationDelay: '420ms' }}>
        {THINGS.map(([what], i) => (
          <span key={what}>
            {i > 0 && <span className="sep">/</span>}
            <b>{what}</b>
          </span>
        ))}
      </div>
      <p className="ed-closer seq" style={{ animationDelay: '600ms' }}>
        {n.closer}
      </p>
    </>
  )
}

/** A golden-angle scatter, so the markets are evenly spread without looking
 *  gridded, and identical on every render. Deliberately not a globe, per the
 *  Aug 27 decision. */
function MarketField({ count }: { count: number }) {
  const dots = Array.from({ length: count }, (_, i) => {
    const r = Math.sqrt((i + 0.5) / count)
    const a = i * 2.39996
    const live = i % 6 === 2
    const size = live ? 7 : i % 3 === 0 ? 5 : 4
    return {
      key: i,
      live,
      size,
      left: `${(50 + r * 44 * Math.cos(a)).toFixed(2)}%`,
      top: `${(50 + r * 44 * Math.sin(a)).toFixed(2)}%`,
      delay: `${120 + i * 22}ms`,
    }
  })

  return (
    <div className="field">
      <div className="field-glow"></div>
      {dots.map((dot) => (
        <span
          key={dot.key}
          className={`dot${dot.live ? ' live' : ''}`}
          style={{
            left: dot.left,
            top: dot.top,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            animationDelay: dot.delay,
          }}
        ></span>
      ))}
    </div>
  )
}

/** T3 — Split stage. Fixes the missing subject: restores a focal point to look
 *  at, as a scatter field of markets standing by with live dots pulsing. */
function Stage({ n }: { n: Narrative }) {
  return (
    <div className="split">
      <div className="split-left">
        <h1 className="lede seq" style={{ animationDelay: '60ms' }}>
          {n.lede}
        </h1>
        <p className="body-copy seq" style={{ animationDelay: '200ms' }}>
          {n.body}
        </p>
        <div className="stage-things">
          {THINGS.map(([what], i) => (
            <div className="st-row seq" key={what} style={{ animationDelay: `${320 + i * 110}ms` }}>
              <span className="st-what">{what}</span>
              <span className="st-who">Stripe</span>
            </div>
          ))}
        </div>
        <p className="closer seq" style={{ animationDelay: '820ms' }}>
          {n.closer}
        </p>
      </div>
      <div className="split-right seq" style={{ animationDelay: '260ms' }}>
        <MarketField count={46} />
        <div className="field-caption">
          <b>195 markets</b> ready when you are
        </div>
      </div>
    </div>
  )
}

/** T4 — Ambient depth. Fixes the flat template surface: same layout, different
 *  material — deep field, real elevation, layered glass. */
function Ambient({ n }: { n: Narrative }) {
  return (
    <>
      <h1 className="lede seq" style={{ animationDelay: '60ms' }}>
        {n.lede}
      </h1>
      <p className="body-copy seq" style={{ animationDelay: '200ms' }}>
        {n.body}
      </p>
      <div className="amb-stack seq" style={{ animationDelay: '320ms' }}>
        <div className="amb-behind"></div>
        <div className="amb-card">
          <div className="amb-head">
            <span className="amb-title">Ready for</span>
            <span className="amb-status">
              <span className="amb-dot"></span>Standing by
            </span>
          </div>
          {THINGS.map(([what, how], i) => (
            <div className="amb-row seq" key={what} style={{ animationDelay: `${480 + i * 130}ms` }}>
              <span className="amb-what">
                {what}
                <small>{how}</small>
              </span>
              <span className="amb-who">Stripe</span>
            </div>
          ))}
        </div>
      </div>
      <p className="closer seq" style={{ animationDelay: '1100ms' }}>
        {n.closer}
      </p>
    </>
  )
}

export function Screen1({ treatment, n }: { treatment: TreatmentKey; n: Narrative }) {
  if (treatment === 'handoff') return <Handoff n={n} />
  if (treatment === 'editorial') return <Editorial n={n} />
  if (treatment === 'stage') return <Stage n={n} />
  return <Ambient n={n} />
}
