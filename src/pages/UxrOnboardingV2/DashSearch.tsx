import { useEffect, useRef, useState, type ReactNode } from 'react'

/** The Dashboard's global search.
 *
 *  An empty field offers the suggested filters; anything typed returns the Go to /
 *  Docs / Profiles results. Only the plain "Managed Payments" go-to row leads
 *  anywhere — it's the SMP surface, so it opens SMP Home. */

const SEARCH_FILTERS: [string, string, string][] = [
  ['is:', 'is:customer', 'object type'],
  ['last4:', 'last4:2326', 'last four digits of the card or account'],
  ['date:', 'date:YYYY/MM/DD', 'object created on date or range'],
  ['email:', 'email:jenny@example.com', 'email address'],
  ['status:', 'status:canceled', 'status of an object'],
  ['profile:', 'profile:@username', 'other businesses on Stripe'],
]

type Row = {
  label: string
  crumb?: string
  handle?: string
  /** Set on the one row that leads somewhere. */
  go?: boolean
}

type Section = { title: string; kind?: 'doc' | 'profile'; rows: Row[] }

const SEARCH_SECTIONS: Section[] = [
  {
    title: 'Go to',
    rows: [
      { label: 'Data management' },
      { crumb: 'Settings', label: 'Managed Payments' },
      // Home opens on the stage the onboarding choice puts the account in, so the
      // state that follows from that choice is the one that's waiting.
      { label: 'Managed Payments', go: true },
    ],
  },
  {
    title: 'Docs',
    kind: 'doc',
    rows: [
      { label: 'Managed Support' },
      { label: 'Managed Payments' },
      { label: 'Managed API keys' },
      { label: 'Managed Payments changelog' },
    ],
  },
  {
    title: 'Profiles',
    kind: 'profile',
    rows: [
      { label: 'Managed Services', handle: '@managedservices' },
      { label: 'Managed Company', handle: '@managedco' },
      { label: 'Managed Wild', handle: '@managedwildfarm' },
      { label: 'Managed Websites UK', handle: '@managedwebsitesuk' },
    ],
  },
]

/** Only exact occurrences of what's been typed get marked, which is why "Data
 *  management" comes back for "managed" without a highlight on it. */
function Marked({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>
  const at = text.toLowerCase().indexOf(query.toLowerCase())
  if (at === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, at)}
      <mark>{text.slice(at, at + query.length)}</mark>
      {text.slice(at + query.length)}
    </>
  )
}

/** A row keeps its place if any of its words shares a four-letter start with the
 *  query — loose enough that "managed" still surfaces "Data management". */
function hits(row: Row, query: string) {
  const head = query.slice(0, Math.min(4, query.length)).toLowerCase()
  const words = `${row.label} ${row.crumb ?? ''} ${row.handle ?? ''}`.toLowerCase().split(/[\s@]+/)
  return words.some((w) => w.startsWith(head))
}

function ChevronRight() {
  return (
    <svg
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.5 1.5L7 5l-3.5 3.5" />
    </svg>
  )
}

function DocIcon() {
  return (
    <svg
      className="doc"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 2h5l3 3v9H4z" />
      <path d="M6.2 6.5h3.4M6.2 9h3.4M6.2 11.5h2" />
    </svg>
  )
}

function SearchRow({
  row,
  kind,
  query,
  onGo,
}: {
  row: Row
  kind?: Section['kind']
  query: string
  onGo: () => void
}) {
  const label = <Marked text={row.label} query={query} />
  const go = row.go ? onGo : undefined

  if (kind === 'doc') {
    return (
      <div className="dash-search-row" onClick={go}>
        <DocIcon />
        <span>{label}</span>
      </div>
    )
  }

  if (kind === 'profile') {
    return (
      <div className="dash-search-row tall" onClick={go}>
        <span className="avatar">{row.label[0]}</span>
        <span>{label}</span>
        <span className="handle">
          <Marked text={row.handle ?? ''} query={query} />
        </span>
      </div>
    )
  }

  return (
    <div className="dash-search-row" onClick={go}>
      {row.crumb && (
        <span className="crumb">
          <Marked text={row.crumb} query={query} /> <ChevronRight />
        </span>
      )}
      <span>{label}</span>
    </div>
  )
}

export function DashSearch({ onGoToSmpHome }: { onGoToSmpHome: () => void }) {
  const [query, setQuery] = useState('')
  const input = useRef<HTMLInputElement>(null)

  // Opening the search puts the caret in it.
  useEffect(() => {
    input.current?.focus()
  }, [])

  const trimmed = query.trim()
  const sections = SEARCH_SECTIONS.map((s) => ({
    ...s,
    rows: s.rows.filter((r) => hits(r, trimmed)),
  })).filter((s) => s.rows.length)

  let panel: ReactNode
  if (!trimmed) {
    panel = (
      <>
        <div className="dash-search-section">
          <h4>Suggested filters</h4>
          {SEARCH_FILTERS.map(([token, example, about]) => (
            <div className="dash-search-row" key={token}>
              <span className="token">{token}</span>
              <span className="example">{example}</span>
              <span className="about">{about}</span>
            </div>
          ))}
        </div>
        <div className="dash-search-foot">View more filters</div>
      </>
    )
  } else if (sections.length) {
    panel = (
      <>
        {sections.map((s) => (
          <div className="dash-search-section" key={s.title}>
            <h4>{s.title}</h4>
            {s.rows.map((row, i) => (
              <SearchRow
                key={`${row.label}-${i}`}
                row={row}
                kind={s.kind}
                query={trimmed}
                onGo={onGoToSmpHome}
              />
            ))}
          </div>
        ))}
        <div className="dash-search-foot">View all results</div>
      </>
    )
  } else {
    panel = (
      <div className="dash-search-section">
        <div className="dash-search-empty">No results for &ldquo;{trimmed}&rdquo;</div>
      </div>
    )
  }

  return (
    <div className="dash-searchbox">
      <div className="dash-searchfield">
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="7" cy="7" r="4.2" />
          <path d="M10.2 10.2L14 14" />
        </svg>
        <input
          ref={input}
          type="text"
          placeholder="Search"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="dash-search-scope">
          Cactus Practice{' '}
          <svg
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2.5 4.5L6 8l3.5-3.5" />
          </svg>
        </span>
      </div>
      <div className="dash-search-panel">{panel}</div>
    </div>
  )
}
