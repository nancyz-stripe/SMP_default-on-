import type { Location } from './data'

/** Where the account sells, and whether Stripe is managing it there. */

export type LocFilter = 'all' | 'on' | 'off'

/** Zero is exact, so it's stated to the cent rather than rounded to $0.0K. */
const usdK = (v: number) => (v === 0 ? '$0.00' : `$${(v / 1000).toFixed(1)}K`)

/** A sparkline from the row's own volume, so no two are identical and none of them
 *  is random — the same figure always draws the same shape. */
function Sparkline({ seed }: { seed: number }) {
  const bars: { x: number; y: number; height: number }[] = []
  let s = seed
  for (let i = 0; i < 11; i++) {
    s = (s * 9301 + 49297) % 233280
    const h = 4 + (s / 233280) * 10
    bars.push({ x: i * 3, y: 14 - h, height: h })
  }
  return (
    <svg className="loc-spark" viewBox="0 0 32 14" fill="var(--chart-with)" aria-hidden="true">
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={b.y} width={2} height={b.height} rx={0.5} />
      ))}
    </svg>
  )
}

/** Three states, not two: a figure, a zero, or nothing at all. Zero gets no
 *  sparkline — there's no history to draw yet — and an uncovered location gets no
 *  cell content, because the column isn't reporting on it. */
function Figure({ value, seed = 0 }: { value?: number | false; seed?: number }) {
  if (value == null || value === false) return null
  if (!value) return <>{usdK(0)}</>
  return (
    <>
      {usdK(value)}
      <Sparkline seed={value + seed} />
    </>
  )
}

export function Locations({
  rows,
  filter,
  onFilter,
  onEnable,
  covered,
  onSetUp,
}: {
  rows: Location[]
  filter: LocFilter
  onFilter: (filter: LocFilter) => void
  onEnable: (name: string) => void
  /** Nothing is covered without the product, so there's no list to show and no
   *  counts or filters worth offering over it. */
  covered: boolean
  onSetUp: () => void
}) {
  const on = rows.filter((l) => l.on).length
  const tiles: { id: LocFilter; label: string; value: number }[] = [
    { id: 'all', label: 'All locations', value: rows.length },
    { id: 'on', label: 'Enabled', value: on },
    { id: 'off', label: 'Disabled', value: rows.length - on },
  ]

  const shown = rows.filter((l) => filter === 'all' || (filter === 'on') === l.on)

  return (
    <div className={`panel${covered ? '' : ' empty'}`}>
      <div className="loc-tiles">
        {tiles.map((t) => (
          <button
            key={t.id}
            className={`loc-tile${t.id === filter ? ' active' : ''}`}
            aria-pressed={t.id === filter}
            onClick={() => onFilter(t.id)}
          >
            <span className="loc-tile-label">{t.label}</span>
            <div className="loc-tile-value">{t.value}</div>
          </button>
        ))}
      </div>

      <div className="loc-chips">
        {['Region', 'Status'].map((label) => (
          <button className="loc-chip" key={label}>
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2">
              <circle cx="6" cy="6" r="5" />
              <path d="M6 3.6v4.8M3.6 6h4.8" />
            </svg>
            {label}
          </button>
        ))}
      </div>

      <div className="loc-search">
        <svg
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        >
          <circle cx="5" cy="5" r="3.4" />
          <path d="M7.6 7.6l2.6 2.6" />
        </svg>
        Search
      </div>

      <div className="loc-row loc-head">
        <span></span>
        <span>Location</span>
        <span>Status</span>
        <span className="sortable">
          Payment volume
          <SortArrow />
        </span>
        <span className="sortable">
          Tax liability covered
          <SortArrow />
        </span>
        <span></span>
      </div>

      <div className="loc-body">
        {shown.map((l) => (
          <div className="loc-row" key={l.name}>
            <img className="loc-flag" src={`/assets/flags/${l.code}.svg`} alt="" />
            <span className="loc-name">{l.name}</span>
            <span>
              <span className={`badge ${l.on ? 'on' : 'off'}`}>
                {l.on ? 'Enabled' : 'Disabled'}
              </span>
            </span>
            <span className="loc-figure">
              <Figure value={l.vol} />
            </span>
            <span className="loc-figure">
              <Figure value={l.vol && l.vol * 0.94} seed={7} />
            </span>
            <span className="loc-actions">
              <span className="loc-dots">···</span>
              <span className="loc-qa">
                {!l.on && (
                  <button className="qa-main" onClick={() => onEnable(l.name)}>
                    Enable
                  </button>
                )}
                <button className={`qa-more${l.on ? ' only' : ''}`} aria-label="More">
                  ···
                </button>
              </span>
            </span>
          </div>
        ))}
      </div>

      <div className="loc-foot">
        <span>
          {shown.length} of {rows.length} results
        </span>
        <span className="loc-page">
          <button disabled>Previous</button>
          <button>Next</button>
        </span>
      </div>

      <div className="empty-state">
        <div className="empty-inner">
          <span className="empty-icon">
            <svg
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="10" cy="10" r="7.6" />
              <path d="M2.4 10h15.2" />
              <path d="M10 2.4c2 2.1 3.1 4.8 3.1 7.6S12 15.5 10 17.6C8 15.5 6.9 12.8 6.9 10S8 4.5 10 2.4Z" />
            </svg>
          </span>
          <div className="empty-copy">
            <div className="empty-title">No locations covered yet</div>
            <p className="empty-desc">
              Stripe covers sales where Managed Payments is on. Set it up to see the locations you
              sell in and turn on the ones you want covered.
            </p>
          </div>
          {/* The empty state offers the same thing the hero does. */}
          <button className="btn-primary" onClick={onSetUp}>
            Set up Managed Payments
          </button>
        </div>
      </div>
    </div>
  )
}

function SortArrow() {
  return (
    <svg
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 2v6M2.6 5.6L5 8l2.4-2.4" />
    </svg>
  )
}
