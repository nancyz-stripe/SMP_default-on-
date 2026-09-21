import { MONTHS, type Card, type Unit } from './data'

/** Figures derived from the series rather than authored beside them, so the number
 *  at the top of a card and the shape under it can't drift apart. */

export const fmt: Record<Unit, (v: number) => string> = {
  pct: (v) => `${v.toFixed(1)}%`,
  usd: (v) => `$${Math.round(v).toLocaleString()}`,
  count: (v) => Math.round(v).toLocaleString(),
}

export const seriesUnit = (c: Card): Unit => c.seriesUnit ?? c.unit

/** Axis ticks are compact so four of them fit the gutter: $61k, not $61,651. */
export function tick(unit: Unit, v: number) {
  if (unit === 'pct') return `${Math.round(v)}%`
  if (unit === 'count') return Math.round(v).toLocaleString()
  return v >= 1000 ? `$${Math.round(v / 1000)}k` : `$${Math.round(v)}`
}

const sum = (a: number[]) => a.reduce((x, y) => x + y, 0)

/** Every metric is phrased so more is better, so the gap is always this way
 *  round. */
export const gapAt = (c: Card, i: number) => c.with[i] - c.without[i]

/** How much bigger `now` is than `then`, for the uplift a tooltip quotes. One
 *  decimal under 10% and none above it, so a small difference stays legible
 *  without a large one carrying precision it hasn't earned. */
export function pctChange(then: number, now: number) {
  const pc = ((now - then) / then) * 100
  return `${pc < 10 ? pc.toFixed(1) : Math.round(pc)}%`
}

/** A win rate over a slice of the window: what was won against what resolved. */
function rateOf(c: Card, from: number, to: number) {
  const won = sum(c.with.slice(from, to))
  const all = sum((c.total ?? []).slice(from, to))
  return all ? (won / all) * 100 : 0
}

function headlineValue(c: Card) {
  if (c.headline === 'sum') return sum(c.with)
  if (c.headline === 'gap') return sum(c.with.map((_, i) => gapAt(c, i)))
  if (c.headline === 'rate') return rateOf(c, 0, c.with.length)
  return c.with[c.with.length - 1]
}

export function headline(c: Card) {
  // Nothing has happened yet, so there's no figure to quote.
  if (!c.with.length) return '—'
  return fmt[c.unit](headlineValue(c))
}

/** A rate is compared with the period before it; a total or a gap is compared with
 *  the first half of its own window, since there's no prior window here. One
 *  period in, there's nothing to compare with either way. */
export function deltaOf(c: Card) {
  if (c.with.length < 2) return ''
  let now: number
  let then: number

  if (c.headline === 'last') {
    now = c.with[c.with.length - 1]
    then = c.with[c.with.length - 2]
  } else if (c.headline === 'rate') {
    const half = Math.floor(c.with.length / 2)
    then = rateOf(c, 0, half)
    now = rateOf(c, half, c.with.length)
  } else {
    const vals = c.headline === 'sum' ? c.with : c.with.map((_, i) => gapAt(c, i))
    const half = Math.floor(vals.length / 2)
    then = sum(vals.slice(0, half))
    now = sum(vals.slice(half))
  }

  const pc = ((now - then) / then) * 100
  return `${pc >= 0 ? '+' : ''}${pc.toFixed(1)}%`
}

/** Six months across twelve points, so every other point starts a month. */
export function monthLabel(i: number) {
  return `${MONTHS[Math.floor(i / 2)]} ${i % 2 ? '16' : '1'}, 2026`
}
