import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { PageRoot } from '../../components/PageRoot'
import { Card } from './Card'
import { CoverageModal } from './CoverageModal'
import { Locations, type LocFilter } from './Locations'
import { SideNav } from './SideNav'
import { Pitch } from './Pitch'
import { Topbar } from './Topbar'
import {
  CARDS,
  LOCATIONS,
  SCOPES_BY_COVERAGE,
  STAGES,
  TAB_IDS,
  type Coverage,
  type Location,
  type TabId,
} from './data'
import './styles.css'

/** The Managed Payments home page: what the product did, against a modelled
 *  same-period figure for what would have happened without it.
 *
 *  The page can be read at three stages of the same account — before it has any
 *  volume, with the product and without it, and after volume arrives — and the
 *  prototype's stage switch moves between them. */

/** A slug splits on its last hyphen only if what follows is a tab, since the stage
 *  ids carry hyphens of their own (new-no-smp). */
function readSlug(slug: string) {
  const tab = TAB_IDS.find((t) => slug === t || slug.endsWith(`-${t}`))
  const stage = tab ? slug.slice(0, slug.length - tab.length).replace(/-$/, '') : slug
  return {
    stage: STAGES.some((s) => s.id === stage) ? stage : null,
    tab: tab ?? null,
  }
}

/** The stage and, where it isn't the default, the tab: `/smp-home/volume/locations`,
 *  `?stage=volume&tab=locations`, or `#volume-locations` — so any pairing can be
 *  linked to directly.
 *
 *  Arriving from the onboarding flow, the choice the account made puts it in a
 *  stage: opting into Managed Payments lands on the with-SMP stage, handling it
 *  yourself on the without. Opened on its own, Home still starts on with-SMP. */
function askedFor(
  routeParams: { stage?: string; tab?: string },
  search: URLSearchParams,
  hash: string,
) {
  if (routeParams.stage) {
    return { stage: routeParams.stage, tab: (routeParams.tab as TabId) ?? null }
  }
  const fromHash = decodeURIComponent(hash.replace(/^#/, ''))
  if (fromHash) return readSlug(fromHash)
  const stage = search.get('stage') ?? ''
  const tab = search.get('tab') ?? ''
  return readSlug(stage && tab ? `${stage}-${tab}` : stage)
}

/** Before there's volume the account has only just switched on, so its home market
 *  is the one covered and nowhere else is. Without the product nothing is covered
 *  at all — there'd be no location for Stripe to be managing.
 *
 *  A working copy rather than a derived view, so Enable can still flip a row in
 *  whichever stage you're in without writing back into the authored data. */
function locationsFor(stageId: string): Location[] {
  const stage = STAGES.find((s) => s.id === stageId)!
  if (!stage.masked) return LOCATIONS.map((l) => ({ ...l }))
  const home = stage.id === 'new-smp' ? 'United States' : null
  return LOCATIONS.map((l) => ({
    ...l,
    on: l.name === home,
    // Covered as of today: zero is a figure, so it's reported rather than left
    // blank the way an uncovered location's columns are.
    vol: l.name === home ? 0 : undefined,
  }))
}

export default function SmpHome() {
  const routeParams = useParams()
  const [search] = useSearchParams()
  const navigate = useNavigate()

  const asked = useMemo(
    () => askedFor(routeParams, search, window.location.hash),
    // Read once, on mount: from here on the stage switch owns it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const [stageId, setStageId] = useState(asked.stage ?? 'new-smp')
  const [tabId, setTabId] = useState<TabId>(asked.tab ?? 'performance')

  /** `confirmed` starts at 'all' since that's the coverage the page's own default
   *  scope state describes — so reaching the with-volume stage by the prototype's
   *  stage switch still shows a truthful selection. */
  const [confirmed, setConfirmed] = useState<Coverage>('all')
  const [modalOpen, setModalOpen] = useState(false)

  const scopes = SCOPES_BY_COVERAGE[confirmed]
  const [scope, setScope] = useState(scopes[0])
  const [scopeOpen, setScopeOpen] = useState(false)
  const [quickActionsOpen, setQuickActionsOpen] = useState(false)

  const [locFilter, setLocFilter] = useState<LocFilter>('all')
  // The stage owns both tabs, so changing it re-seeds the table too — otherwise
  // Locations would still be showing the previous stage's coverage.
  const [locRows, setLocRows] = useState(() => locationsFor(stageId))

  const stage = STAGES.find((s) => s.id === stageId)!

  /** Replace rather than push: switching stages or tabs shouldn't fill up the back
   *  button. Performance is the default, so it stays out of the slug — `/volume`
   *  and `/volume/performance` are the same page. */
  useEffect(() => {
    const path = tabId === 'performance' ? `/smp-home/${stageId}` : `/smp-home/${stageId}/${tabId}`
    navigate(path, { replace: true })
  }, [stageId, tabId, navigate])

  const switchStage = (id: string) => {
    if (id === stageId) return
    setStageId(id)
    setLocRows(locationsFor(id))
  }

  // Anywhere else, and on Escape, closes the popovers.
  useEffect(() => {
    const close = () => {
      setScopeOpen(false)
      setQuickActionsOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      close()
      setModalOpen(false)
    }
    document.addEventListener('click', close)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', close)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  /** Enabling flips the row in place — the tiles recount themselves from it. */
  const enableLocation = (name: string) =>
    setLocRows((rows) =>
      // Covered from today, so it reports zero rather than nothing.
      rows.map((l) => (l.name === name ? { ...l, on: true, vol: 0 } : l)),
    )

  const confirmCoverage = (coverage: Coverage) => {
    setConfirmed(coverage)
    setScope(SCOPES_BY_COVERAGE[coverage][0])
    switchStage('volume')
    setModalOpen(false)
  }

  const card = (i: number) => (
    <Card key={CARDS[i].id} card={CARDS[i]} masked={stage.masked} note={stage.note} />
  )

  // The new-user stages are a sandbox — nothing has been taken live yet — so the
  // account reads as one: the navy banner above the page and the sandbox tile in
  // the nav, the same pair the dashboard carries after onboarding. With volume
  // it's the live account, its own avatar, and no banner.
  const live = stageId === 'volume'

  return (
    <PageRoot slug="smp-home">
      {!live && (
        <div className="sandbox-banner">
          <span className="sandbox-banner-name">Sandbox</span>
          <span className="sandbox-banner-copy">
            Get set up using <b>test data</b> and copy your work when going live.
          </span>
          <button className="sandbox-banner-cta">Get your live account</button>
        </div>
      )}

      <div className="shell">
        <div className="side">
          <div className="side-scroll">
            <div className={`side-account${live ? ' live' : ''}`}>
              <div className="acct acct-sandbox">
                <span className="acct-icon">
                  <svg
                    className="acct-badge"
                    viewBox="0 0 16 16"
                    fill="#fff"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 2.6l4.6 2.4v5L8 12.4 3.4 10V5z" />
                    <path d="M3.4 5L8 7.4 12.6 5M8 7.4v5" />
                  </svg>
                </span>
                <span>
                  <span className="acct-name">Default sandbox</span>
                  <span className="acct-sub">Cactus Practice</span>
                </span>
              </div>
              <div className="acct acct-live">
                <img className="acct-avatar" src="/assets/nav/account.png" alt="" />
                <span className="acct-name">Cactus Practice</span>
              </div>
            </div>

            <SideNav />
          </div>

          {/* Prototype controls, at the foot of the nav column */}
          <div className="page-top">
            <div className="stage-switch">
              {STAGES.map((s) => (
                <button
                  key={s.id}
                  className={`stage-btn${s.id === stageId ? ' active' : ''}`}
                  onClick={() => switchStage(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <Link to="/gallery" className="back-button">
              &larr; Home
            </Link>
          </div>
        </div>

        <div className="main">
          <Topbar />

          <div className="page">
            <div className="page-head">
              <h1 className="page-title">Managed Payments</h1>
              <QuickActions
                open={quickActionsOpen}
                onToggle={() => setQuickActionsOpen((o) => !o)}
                onConfigure={() => {
                  setQuickActionsOpen(false)
                  setModalOpen(true)
                }}
              />
            </div>

            <div className="tabs">
              {TAB_IDS.map((id) => (
                <button
                  key={id}
                  className={`tab${tabId === id ? ' active' : ''}`}
                  onClick={() => setTabId(id)}
                >
                  {id === 'performance' ? 'Performance' : 'Locations'}
                </button>
              ))}
            </div>

            <div className="panel" hidden={tabId !== 'performance'}>
              {/* The pitch stands in for the figures that aren't there yet. */}
              {!stage.smp && <Pitch onSetUp={() => setModalOpen(true)} />}

              <Filters
                scope={scope}
                scopes={scopes}
                open={scopeOpen}
                onToggle={() => setScopeOpen((o) => !o)}
                onSelect={(s) => {
                  setScope(s)
                  setScopeOpen(false)
                }}
              />

              <div className="cards">
                {card(0)}
                <div className="row">
                  {card(1)}
                  {card(2)}
                </div>
                <div className="row">
                  {card(3)}
                  {card(4)}
                </div>
              </div>
            </div>

            {tabId === 'locations' && (
              <Locations
                rows={locRows}
                filter={locFilter}
                onFilter={setLocFilter}
                onEnable={enableLocation}
                covered={stage.smp}
                onSetUp={() => setModalOpen(true)}
              />
            )}
          </div>
        </div>
      </div>

      {modalOpen && (
        <CoverageModal
          initial={stageId === 'volume' ? confirmed : null}
          onClose={() => setModalOpen(false)}
          onConfirm={confirmCoverage}
        />
      )}
    </PageRoot>
  )
}

/** The three scopes the page can be read at (Figma 26707:82251). It sets what the
 *  page says it's showing; the series aren't split by scope, so the figures don't
 *  move. */
function Filters({
  scope,
  scopes,
  open,
  onToggle,
  onSelect,
}: {
  scope: string
  scopes: string[]
  open: boolean
  onToggle: () => void
  onSelect: (scope: string) => void
}) {
  return (
    <div className="filters">
      <div className={`scope${open ? ' open' : ''}`}>
        <button
          className="scope-trigger"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={(e) => {
            e.stopPropagation()
            onToggle()
          }}
        >
          <span>{scope}</span>
          <svg
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3.5 4.6L6 2.1l2.5 2.5M3.5 7.4L6 9.9l2.5-2.5" />
          </svg>
        </button>
        <div className="scope-menu" role="listbox">
          {scopes.map((s) => (
            <div
              key={s}
              className={`scope-item${s === scope ? ' selected' : ''}`}
              role="option"
              aria-selected={s === scope}
              onClick={() => onSelect(s)}
            >
              <span>{s}</span>
              <span className="scope-tick">
                <svg viewBox="0 0 12 12">
                  <circle cx="6" cy="6" r="6" fill="currentColor" />
                  <path
                    d="M3.4 6.2l1.7 1.7 3.5-3.6"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          ))}
        </div>
      </div>

      <Chip label="Date range" value="Last 6 months" clearable />
      <Chip value="Monthly" />
      <Chip label="Compare" value="Previous period" clearable />
    </div>
  )
}

function Chip({ label, value, clearable }: { label?: string; value: string; clearable?: boolean }) {
  return (
    <span className="chip">
      {clearable && (
        <span className="chip-clear">
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2">
            <circle cx="6" cy="6" r="5" />
            <path d="M4 4l4 4M8 4l-4 4" />
          </svg>
        </span>
      )}
      <span className="chip-body">
        {label && (
          <>
            {label} <span className="rule"></span>{' '}
          </>
        )}
        <span className="chip-val">{value}</span>
        <svg
          className="chevron"
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 4l3 3 3-3" />
        </svg>
      </span>
    </span>
  )
}

/** The header's action (Figma 26655:63696), with its menu under it. Only Configure
 *  settings does anything — the other three are in the design but have no
 *  behaviour defined for them yet. */
function QuickActions({
  open,
  onToggle,
  onConfigure,
}: {
  open: boolean
  onToggle: () => void
  onConfigure: () => void
}) {
  return (
    <div className={`qa-wrap${open ? ' open' : ''}`}>
      <button
        className="btn-configure"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation()
          onToggle()
        }}
      >
        <svg
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M6 2.2v7.6M2.2 6h7.6" />
        </svg>
        Quick actions
      </button>
      <div className="qa-menu" role="menu">
        <button className="qa-item" role="menuitem">
          <span className="qa-ico">
            <svg
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M0.9 6S2.6 2.9 6 2.9 11.1 6 11.1 6 9.4 9.1 6 9.1.9 6 .9 6Z" />
              <circle cx="6" cy="6" r="1.5" />
            </svg>
          </span>
          View reports
        </button>
        <button className="qa-item" role="menuitem">
          <span className="qa-ico">
            <svg
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            >
              <path d="M2 9.4V6.2M6 9.4V2.6M10 9.4V4.8" />
            </svg>
          </span>
          Analyse data
        </button>
        <button className="qa-item" role="menuitem">
          <span className="qa-ico">
            <svg
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 8V1.6M3.8 3.8 6 1.6l2.2 2.2" />
              <path d="M1.8 7.6v1.6a1.2 1.2 0 0 0 1.2 1.2h6a1.2 1.2 0 0 0 1.2-1.2V7.6" />
            </svg>
          </span>
          Export transactions
        </button>
        <button className="qa-item" role="menuitem" onClick={onConfigure}>
          <span className="qa-ico">
            <Gear />
          </span>
          Configure settings
        </button>
      </div>
    </div>
  )
}

function Gear() {
  return (
    <svg viewBox="0 0 12 12" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 7.5C6.82843 7.5 7.5 6.82843 7.5 6C7.5 5.17157 6.82843 4.5 6 4.5C5.17157 4.5 4.5 5.17157 4.5 6C4.5 6.82843 5.17157 7.5 6 7.5ZM6 8.625C7.44975 8.625 8.625 7.44975 8.625 6C8.625 4.55025 7.44975 3.375 6 3.375C4.55025 3.375 3.375 4.55025 3.375 6C3.375 7.44975 4.55025 8.625 6 8.625Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.55691 10.875H6.44315L6.48217 10.2507C6.51456 9.73239 6.84485 9.30463 7.29165 9.11934C7.74055 8.93319 8.27643 9.00402 8.66472 9.34662L9.13381 9.76052L9.76047 9.13386L9.34664 8.66486C9.00401 8.27653 8.93318 7.7406 9.11935 7.29166C9.30465 6.84485 9.73244 6.51453 10.2508 6.48213L10.875 6.44312V5.55688L10.2507 5.51786C9.73243 5.48547 9.30465 5.15516 9.11936 4.70836C8.9332 4.25944 9.00402 3.72352 9.34665 3.33521L9.76046 2.86622L9.1338 2.23956L8.6648 2.65338C8.27649 2.99601 7.74058 3.06683 7.29167 2.88067C6.84486 2.69538 6.51456 2.2676 6.48217 1.7493L6.44315 1.125H5.55691L5.51789 1.74927C5.4855 2.26759 5.15519 2.69538 4.70837 2.88068C4.25944 3.06685 3.7235 2.99603 3.33517 2.65339L2.86618 2.23957L2.23952 2.86623L2.65341 3.33531C2.99602 3.7236 3.06684 4.25948 2.88069 4.70838C2.69541 5.15518 2.26764 5.48547 1.74936 5.51786L1.12503 5.55688V6.44312L1.74934 6.48214C2.26763 6.51453 2.69541 6.84482 2.88069 7.29163C3.06686 7.74054 2.99604 8.27645 2.65341 8.66476L2.23951 9.13385L2.86617 9.76051L3.33525 9.34662C3.72356 9.00399 4.25947 8.93317 4.70839 9.11933C5.1552 9.30462 5.4855 9.7324 5.51789 10.2507L5.55691 10.875ZM3.38543 10.7834C3.43317 10.754 3.47903 10.7201 3.52244 10.6818L4.07958 10.1902C4.13378 10.1424 4.21067 10.1308 4.27744 10.1585C4.34417 10.1862 4.39058 10.2488 4.39508 10.3209L4.44143 11.0624C4.44504 11.1202 4.45351 11.1765 4.46642 11.2311C4.47399 11.2631 4.48308 11.2945 4.49361 11.3252C4.6291 11.7198 5.00323 12 5.43948 12H6.56058C6.9968 12 7.37092 11.7198 7.50642 11.3252C7.51696 11.2945 7.52606 11.2632 7.53363 11.2312C7.54655 11.1766 7.55502 11.1202 7.55863 11.0624L7.60498 10.3208C7.60948 10.2488 7.65587 10.1862 7.72259 10.1585C7.78935 10.1308 7.8662 10.1424 7.9204 10.1902L8.47754 10.6818C8.52097 10.7201 8.56685 10.754 8.6146 10.7835C8.64256 10.8007 8.67117 10.8165 8.7003 10.8307C9.07512 11.0139 9.5378 10.9475 9.84627 10.6391L10.639 9.84632C10.9475 9.53783 11.0139 9.07511 10.8306 8.70028C10.8164 8.67117 10.8007 8.64258 10.7834 8.61464C10.7539 8.56689 10.7201 8.52101 10.6817 8.47759L10.1902 7.92053C10.1424 7.86631 10.1308 7.78941 10.1585 7.72261C10.1862 7.65587 10.2488 7.60945 10.3209 7.60494L11.0624 7.5586C11.1202 7.55499 11.1765 7.54652 11.2311 7.53362C11.2631 7.52605 11.2945 7.51697 11.3252 7.50643C11.7198 7.37096 12 6.99682 12 6.56055V5.43945C12 5.0032 11.7198 4.62907 11.3252 4.49358C11.2945 4.48305 11.2631 4.47396 11.2312 4.46639C11.1766 4.45348 11.1202 4.44501 11.0624 4.4414L10.3209 4.39505C10.2488 4.39055 10.1862 4.34414 10.1585 4.27741C10.1309 4.21063 10.1424 4.13375 10.1902 4.07954L10.6817 3.52249C10.7201 3.47905 10.754 3.43316 10.7834 3.38538C10.8007 3.35743 10.8164 3.32884 10.8307 3.29972C11.0139 2.9249 10.9475 2.46223 10.639 2.15376L9.84626 1.36103C9.5378 1.05257 9.07513 0.986154 8.70031 1.16934C8.67118 1.18358 8.64259 1.19932 8.61464 1.21658C8.56687 1.24606 8.52097 1.27996 8.47753 1.3183L7.92047 1.80982C7.86627 1.85764 7.78939 1.86917 7.72261 1.84148C7.65589 1.81381 7.60948 1.75123 7.60497 1.67913L7.55863 0.937621C7.55502 0.879843 7.54655 0.823462 7.53364 0.76887C7.52607 0.736878 7.51698 0.7055 7.50644 0.674813C7.37095 0.280218 6.99682 0 6.56058 0H5.43948C5.00321 0 4.62906 0.280247 4.4936 0.674876C4.48306 0.705553 4.47398 0.736921 4.46641 0.768903C4.4535 0.823485 4.44504 0.879854 4.44143 0.937622L4.39509 1.6791C4.39058 1.75121 4.34416 1.81381 4.27742 1.84149C4.21062 1.86919 4.13372 1.85766 4.0795 1.80982L3.52245 1.31831C3.47902 1.27999 3.43314 1.2461 3.38539 1.21661C3.35745 1.19937 3.32886 1.18363 3.29975 1.16939C2.92492 0.986154 2.4622 1.05256 2.15372 1.36104L1.36099 2.15377C1.05252 2.46223 0.986111 2.92491 1.1693 3.29972C1.18354 3.32886 1.19929 3.35747 1.21655 3.38543C1.24604 3.43319 1.27993 3.47907 1.31825 3.5225L1.80984 4.07964C1.85766 4.13383 1.86918 4.21069 1.8415 4.27744C1.81383 4.34415 1.75127 4.39055 1.67919 4.39505L0.937652 4.4414C0.879863 4.44501 0.823473 4.45348 0.768871 4.4664C0.736869 4.47397 0.705482 4.48306 0.674786 4.49361C0.280221 4.62911 0 5.00323 0 5.43945V6.56055C0 6.99679 0.280245 7.37092 0.674836 7.50641C0.705524 7.51695 0.736903 7.52604 0.768897 7.53361C0.82349 7.54652 0.879872 7.55499 0.937652 7.5586L1.67916 7.60495C1.75126 7.60945 1.81384 7.65585 1.84151 7.72258C1.8692 7.78935 1.85767 7.86623 1.80985 7.92043L1.31825 8.47758C1.27994 8.52099 1.24606 8.56686 1.21658 8.6146C1.19932 8.64255 1.18357 8.67115 1.16933 8.70028C0.986092 9.07511 1.05249 9.53783 1.36098 9.84631L2.15371 10.639C2.4622 10.9475 2.92492 11.0139 3.29975 10.8307C3.32888 10.8164 3.35747 10.8007 3.38543 10.7834Z"
      />
    </svg>
  )
}
