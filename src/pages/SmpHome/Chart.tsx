import { useCallback, useEffect, useRef, useState } from 'react'
import type { Card } from './data'
import { MONTHS } from './data'
import { fmt, monthLabel, pctChange, seriesUnit, tick } from './metrics'

/** The counterfactual chart: a solid measured series, a dashed modelled series,
 *  the gap between them shaded, and a crosshair tooltip naming both. SMP has no
 *  per-method enablement dates to mark, so nothing is drawn on the line itself.
 *
 *  The original built these nodes with createElementNS and mutated attributes on
 *  hover. Here the geometry is computed and the SVG is rendered from it, with the
 *  hovered index as state — which is the same arithmetic without the DOM
 *  bookkeeping. */

const PAD = { t: 10, r: 42, b: 8, l: 0 }

/** The measured size of a chart's box, which is also its viewBox — the SVG is
 *  drawn in CSS pixels so the padding above can be read literally. */
type Geometry = { width: number; height: number }

/** Four gridlines on a zero-based domain, with headroom above the higher series so
 *  nothing touches the frame. Zero-based is required for the bars and honest for
 *  the rest — none of these metrics is a narrow band worth truncating. */
function useScale(card: Card, plotHeight: number) {
  const hi = Math.max(0, ...card.with, ...card.without)
  const top = (hi || 1) * 1.18
  const bottom = 0
  const Y = (v: number) => PAD.t + plotHeight - ((v - bottom) / (top - bottom)) * plotHeight
  return { Y, top, bottom }
}

function useMeasure(fallback: Geometry) {
  const ref = useRef<HTMLDivElement>(null)
  const [box, setBox] = useState<Geometry>(fallback)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver(() => {
      const width = el.clientWidth
      const height = el.clientHeight
      if (width && height) setBox({ width, height })
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, box] as const
}

function Gridlines({
  card,
  plotWidth,
  Y,
  top,
  bottom,
}: {
  card: Card
  plotWidth: number
  Y: (v: number) => number
  top: number
  bottom: number
}) {
  return (
    <>
      {[0, 0.33, 0.66, 1].map((f) => {
        const v = bottom + (top - bottom) * f
        return (
          <g key={f}>
            <line className="grid-line" x1={0} x2={plotWidth} y1={Y(v)} y2={Y(v)} />
            <text className="axis-label" x={plotWidth + 8} y={Y(v) + 4}>
              {tick(seriesUnit(card), v)}
            </text>
          </g>
        )
      })}
    </>
  )
}

type TipState = { index: number; cx: number; cy: number } | null

/** Sits beside the crosshair and flips side near the right edge, tracking the
 *  hovered point vertically. */
function Tooltip({
  card,
  tip,
  box,
  viewBox,
}: {
  card: Card
  tip: TipState
  box: Geometry
  viewBox: Geometry
}) {
  const ref = useRef<HTMLDivElement>(null)
  if (!tip) return <div className="chart-tip" ref={ref} style={{ opacity: 0 }} />

  const unit = seriesUnit(card)
  const w = card.with[tip.index]
  const wo = card.without[tip.index]
  const period = card.kind === 'bars' ? `${MONTHS[tip.index]} 1, 2026` : monthLabel(tip.index)

  /** The uplift the footer quotes is this point's own, measured against the
   *  counterfactual. Tax has no counterfactual to divide by — without the product
   *  the coverage is zero by definition — so there the whole of it is the uplift,
   *  and a percentage would be a division by zero dressed up as a number. */
  const foot =
    wo > 0
      ? card.foot(pctChange(wo, w))
      : `Managed Payments accounts for all ${fmt[unit](w)} of your tax coverage.`

  const px = (tip.cx / viewBox.width) * box.width
  const py = (tip.cy / viewBox.height) * box.height
  const tw = 260
  const th = ref.current?.offsetHeight || 150

  return (
    <div
      className="chart-tip"
      ref={ref}
      style={{
        opacity: 1,
        left: `${px + 12 + tw <= box.width ? px + 12 : px - 12 - tw}px`,
        top: `${Math.max(-PAD.t, Math.min(box.height - th, py - 24))}px`,
      }}
    >
      <div className="tip-body">
        <div className="tip-head">{period}</div>
        <div className="tip-row">
          <span className="sw with"></span>
          {card.withLabel}
          <span className="tip-v">{fmt[unit](w)}</span>
        </div>
        <div className="tip-row">
          <span className="sw without"></span>
          {card.withoutLabel}
          <span className="tip-v">{fmt[unit](wo)}</span>
        </div>
      </div>
      <div className="tip-foot">
        <span className="tip-ico">
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M1.5 9L4.5 5.5 6.5 7l4-5.5" />
            <path d="M7.6 1.5h2.9v2.9" />
          </svg>
        </span>
        <span>{foot}</span>
      </div>
    </div>
  )
}

export function LineChart({ card, interactive }: { card: Card; interactive: boolean }) {
  const [wrap, box] = useMeasure({ width: 460, height: 148 })
  const [tip, setTip] = useState<TipState>(null)

  const plotWidth = box.width - PAD.r
  const plotHeight = box.height - PAD.t - PAD.b
  const { Y, top, bottom } = useScale(card, plotHeight)

  // Spaced across the full window, not across the points in hand.
  const X = useCallback(
    (i: number) => (i * plotWidth) / (card.with.length - 1),
    [plotWidth, card.with.length],
  )

  const path = (a: number[]) => a.map((v, i) => `${i ? 'L' : 'M'}${X(i)},${Y(v)}`).join('')

  const m = card.with.length
  // The shaded gap: down the measured series, back along the modelled one.
  const area =
    path(card.with) +
    card.without.map((_, i) => `L${X(m - 1 - i)},${Y(card.without[m - 1 - i])}`).join('') +
    'Z'

  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!interactive) return
    const r = e.currentTarget.getBoundingClientRect()
    const px = ((e.clientX - r.left) / r.width) * box.width
    if (px > plotWidth) return
    // The nearest point, rather than a bucket — the crosshair snaps to the line.
    let index = 0
    let best = Infinity
    card.with.forEach((_, k) => {
      const d = Math.abs(X(k) - px)
      if (d < best) {
        best = d
        index = k
      }
    })
    setTip({ index, cx: X(index), cy: Y(card.with[index]) })
  }

  return (
    <div className="chartwrap" ref={wrap}>
      <svg
        preserveAspectRatio="none"
        viewBox={`0 0 ${box.width} ${box.height}`}
        aria-label={`${card.title}, with and without Managed Payments`}
        onMouseMove={onMove}
        onMouseLeave={() => setTip(null)}
      >
        <Gridlines card={card} plotWidth={plotWidth} Y={Y} top={top} bottom={bottom} />
        <path className="series-area" d={area} />
        <path className="series-without" d={path(card.without)} />
        <path className="series-with" d={path(card.with)} />

        {tip && (
          <>
            <line
              className="hover-line"
              x1={X(tip.index)}
              x2={X(tip.index)}
              y1={PAD.t}
              y2={PAD.t + plotHeight}
            />
            <circle
              className="hover-dot"
              r={4}
              stroke="var(--chart-with)"
              cx={X(tip.index)}
              cy={Y(card.with[tip.index])}
            />
            <circle
              className="hover-dot"
              r={4}
              stroke="var(--chart-without)"
              cx={X(tip.index)}
              cy={Y(card.without[tip.index])}
            />
          </>
        )}

        {/* A transparent plate over the plot, so the pointer has something to be
            over between the lines. */}
        <rect x={0} y={0} width={plotWidth} height={box.height} fill="transparent" />
      </svg>
      <Tooltip card={card} tip={tip} box={box} viewBox={box} />
    </div>
  )
}

export function BarChart({ card, interactive }: { card: Card; interactive: boolean }) {
  const [wrap, box] = useMeasure({ width: 900, height: 176 })
  const [tip, setTip] = useState<TipState>(null)

  const plotWidth = box.width - PAD.r
  const plotHeight = box.height - PAD.t - PAD.b
  const { Y, top, bottom } = useScale(card, plotHeight)

  // Slots for the whole window, so a part-filled window keeps the bar width.
  const slot = plotWidth / card.with.length
  const gap = 6
  const barWidth = slot - gap
  const base = PAD.t + plotHeight

  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!interactive) return
    const r = e.currentTarget.getBoundingClientRect()
    const px = ((e.clientX - r.left) / r.width) * box.width
    const index = Math.max(0, Math.min(card.with.length - 1, Math.floor(px / slot)))
    // The top of the bar, so the tooltip meets it the way it meets a line's point.
    setTip({
      index,
      cx: (index + 0.5) * slot,
      cy: Y(Math.max(card.with[index], card.without[index])),
    })
  }

  return (
    <div className="chartwrap" ref={wrap}>
      <svg
        preserveAspectRatio="none"
        viewBox={`0 0 ${box.width} ${box.height}`}
        aria-label={`${card.title}, with and without Managed Payments`}
        onMouseMove={onMove}
        onMouseLeave={() => setTip(null)}
      >
        <Gridlines card={card} plotWidth={plotWidth} Y={Y} top={top} bottom={bottom} />

        {card.with.map((v, i) => {
          /** The bar reaches the measured figure and is split at the modelled one:
           *  grey to the base is what would have happened without the product,
           *  purple on top is what Managed Payments accounts for. Still the
           *  shorter/taller of the two rather than without/with, so a month where
           *  the product is behind draws something sane instead of a negative
           *  cap. */
          const yLo = Y(Math.min(v, card.without[i]))
          const yHi = Y(Math.max(v, card.without[i]))
          const x = i * slot + gap / 2
          // 2px surface gap, then the attributed cap. Square, like the base: the
          // design has no radius anywhere on these, and a rounded cap on a square
          // base reads as a separate block floating above it.
          const capHeight = Math.max(0, yLo - yHi - 2)

          return (
            <g className={`bar-group${tip && tip.index !== i ? ' dim' : ''}`} key={i}>
              <rect
                className="bar-base"
                x={x}
                y={yLo}
                width={barWidth}
                height={Math.max(0, base - yLo)}
              />
              <rect className="bar-added" x={x} y={yHi} width={barWidth} height={capHeight} />
              <rect className="bar-hit" x={i * slot} y={0} width={slot} height={box.height} />
            </g>
          )
        })}
      </svg>
      <Tooltip card={card} tip={tip} box={box} viewBox={box} />
    </div>
  )
}
