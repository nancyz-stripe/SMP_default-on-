import type { ReactNode } from 'react'

/** The sandbox Dashboard this flow lands on (Figma 26370:56250), built out rather
 *  than screenshotted so the setup guide and the search panel have real components
 *  to sit over.
 *
 *  A richer build than the archive flow's — the masked-icon nav column and a
 *  working global search — so the two aren't shared. */
export function Dashboard({
  onSmpHome,
  onOpenSearch,
  searchOpen,
  searchWrap,
  search,
}: {
  onSmpHome: () => void
  onOpenSearch: () => void
  searchOpen: boolean
  /** So a click outside the wrap can put the search away. */
  searchWrap: React.Ref<HTMLSpanElement>
  /** The global search overlay, which lives in the topbar beside the pill that
   *  opens it. */
  search?: ReactNode
}) {
  return (
    <div className="dash">
      <div className="dash-banner">
        <span className="dash-banner-name">Sandbox</span>
        <span className="dash-banner-copy">
          Get set up using <b>test data</b> and copy your work when going live.
        </span>
        <button className="dash-banner-cta">Get your live account</button>
      </div>

      <div className="dash-body">
        <div className="dash-side">
          <div className="dash-side-scroll">
            <div className="dash-account">
              <div className="dash-acct">
                <span className="dash-acct-icon">
                  <svg
                    className="badge"
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
                  <span className="dash-acct-name">Default sandbox</span>
                  <span className="dash-acct-sub">Cactus Practice</span>
                </span>
              </div>
            </div>

            <nav className="dash-side-nav" id="dashSideNav">
              <div className="dash-nav-group">
                <div className="dash-nav active">
                  <span className="dash-nav-icobox">
                    <span className="dash-nav-ico ico-home"></span>
                  </span>
                  <span className="dash-nav-label">Home</span>
                </div>
                <div className="dash-nav">
                  <span className="dash-nav-icobox">
                    <span className="dash-nav-ico ico-balance"></span>
                  </span>
                  <span className="dash-nav-label">Balances</span>
                </div>
                <div className="dash-nav">
                  <span className="dash-nav-icobox">
                    <span className="dash-nav-ico ico-arrows-loop"></span>
                  </span>
                  <span className="dash-nav-label">Transactions</span>
                </div>
                <div className="dash-nav">
                  <span className="dash-nav-icobox">
                    <span className="dash-nav-ico ico-person"></span>
                  </span>
                  <span className="dash-nav-label">Directory</span>
                </div>
                <div className="dash-nav">
                  <span className="dash-nav-icobox">
                    <span className="dash-nav-ico ico-product"></span>
                  </span>
                  <span className="dash-nav-label">Product catalog</span>
                </div>
              </div>

              <div className="dash-nav-group">
                <div className="dash-nav-heading">Products</div>
                {/* Collapsed by default; clicking the row opens it */}
                <div className="dash-nav" aria-expanded="false">
                  <span className="dash-nav-icobox">
                    <span className="dash-nav-ico ico-wallet"></span>
                  </span>
                  <span className="dash-nav-label">Payments</span>
                  <span className="dash-nav-chevron"></span>
                </div>
                <div className="dash-nav-sub">
                  <div className="dash-nav dash-nav-subitem">
                    <span className="dash-nav-label">Analytics</span>
                  </div>
                  <div className="dash-nav dash-nav-subitem">
                    <span className="dash-nav-label">Checkout</span>
                  </div>
                  <div className="dash-nav dash-nav-subitem" onClick={onSmpHome}>
                    <span className="dash-nav-label">Managed Payments</span>
                  </div>
                  <div className="dash-nav dash-nav-subitem">
                    <span className="dash-nav-label">Disputes</span>
                  </div>
                  <div className="dash-nav dash-nav-subitem">
                    <span className="dash-nav-label">Terminal</span>
                  </div>
                  <div className="dash-nav dash-nav-subitem">
                    <span className="dash-nav-label">Agentic commerce</span>
                  </div>
                </div>
                <div className="dash-nav">
                  <span className="dash-nav-icobox">
                    <span className="dash-nav-ico ico-billing"></span>
                  </span>
                  <span className="dash-nav-label">Billing</span>
                  <span className="dash-nav-chevron"></span>
                </div>
                <div className="dash-nav">
                  <span className="dash-nav-icobox">
                    <span className="dash-nav-ico ico-bar-chart"></span>
                  </span>
                  <span className="dash-nav-label">Reporting</span>
                  <span className="dash-nav-chevron"></span>
                </div>
                <div className="dash-nav">
                  <span className="dash-nav-icobox">
                    <span className="dash-nav-ico ico-more"></span>
                  </span>
                  <span className="dash-nav-label">More</span>
                  <span className="dash-nav-chevron"></span>
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div className="dash-main">
          <div className="dash-main-inner">
            <div className="dash-topbar">
              <span className={`dash-search-wrap${searchOpen ? ' open' : ''}`} ref={searchWrap}>
                <span className="dash-search" onClick={onOpenSearch}>
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
                  <span>Search</span>
                </span>
                {search}
              </span>
              <span className="dash-topbar-icons">
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1" />
                  <rect x="9" y="2.5" width="4.5" height="4.5" rx="1" />
                  <rect x="2.5" y="9" width="4.5" height="4.5" rx="1" />
                  <path d="M11.2 9v4.5M9 11.2h4.5" />
                </svg>
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="8" cy="8" r="5.8" />
                  <path d="M6.3 6.3c0-1 .8-1.7 1.7-1.7s1.7.7 1.7 1.6c0 1.2-1.7 1.3-1.7 2.4" />
                  <circle cx="8" cy="11.2" r=".7" fill="currentColor" stroke="none" />
                </svg>
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4.5 7a3.5 3.5 0 017 0c0 2.4 1 3.5 1 3.5H3.5s1-1.1 1-3.5z" />
                  <path d="M6.8 12.4a1.4 1.4 0 002.4 0" />
                </svg>
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="8" cy="8" r="2" />
                  <path d="M8 2.2v1.6M8 12.2v1.6M2.2 8h1.6M12.2 8h1.6M4 4l1.1 1.1M10.9 10.9L12 12M12 4l-1.1 1.1M5.1 10.9L4 12" />
                </svg>
                <span className="plus">
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 3v10M3 8h10" />
                  </svg>
                </span>
              </span>
            </div>

            <div className="dash-h1">Today</div>
            <div className="dash-rule"></div>

            <div className="dash-cols">
              <div className="dash-col-main">
                <span className="dash-metric-label">
                  Gross volume{' '}
                  <svg
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
                <div className="dash-metric-value">$0.00</div>
                <div className="dash-chart"></div>
                <div className="dash-chart-axis">
                  <span>12:00 AM</span>
                  <span>11:59 PM</span>
                </div>

                <div className="dash-pair">
                  <div className="dash-pair-item">
                    <div className="dash-pair-head">
                      <span className="dash-metric-label">
                        USD Balance{' '}
                        <svg
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
                      <span className="view">View</span>
                    </div>
                    <div className="dash-metric-value">$0.00</div>
                  </div>
                  <div className="dash-pair-item">
                    <div className="dash-pair-head">
                      <span className="dash-metric-label">Payouts</span>
                      <span className="view">View</span>
                    </div>
                    <div className="dash-metric-value">$0.00</div>
                  </div>
                </div>
              </div>

              <div className="dash-apikeys">
                <div className="dash-apikeys-head">
                  <h3>API keys</h3>
                  <svg
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  >
                    <path d="M2 2l8 8M10 2l-8 8" />
                  </svg>
                </div>
                <div className="dash-apikeys-row">
                  <span>Publishable key</span>
                  <span className="val">phkey_123819238y9</span>
                </div>
                <div className="dash-apikeys-row">
                  <span>Secret key</span>
                  <span className="val dots">••••••••••••••••••</span>
                  <svg
                    className="eye"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  >
                    <path d="M1 7s2.2-3.6 6-3.6S13 7 13 7s-2.2 3.6-6 3.6S1 7 1 7z" />
                    <circle cx="7" cy="7" r="1.6" />
                  </svg>
                </div>
                <span className="dash-apikeys-link">View docs</span>
              </div>
            </div>

            <div className="dash-overview">
              <div className="dash-overview-head">
                <span className="dash-h1">Your overview</span>
                <span className="dash-overview-actions">
                  <button className="dash-btn">
                    <svg
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    >
                      <path d="M6 2v8M2 6h8" />
                    </svg>
                    Add
                  </button>
                  <button className="dash-btn">
                    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <circle cx="6" cy="6" r="1.6" />
                      <path d="M6 1.4v1.2M6 9.4v1.2M1.4 6h1.2M9.4 6h1.2" />
                    </svg>
                    Edit
                  </button>
                </span>
              </div>
              <div className="dash-overview-rule"></div>
              <div className="dash-overview-cols">
                <div className="dash-overview-col">
                  <span className="dash-widget-title">
                    Payments{' '}
                    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <rect x="1.5" y="1.5" width="9" height="9" rx="2" />
                      <path d="M6 5.4v3.2M6 3.6v.5" />
                    </svg>
                  </span>
                  <div className="dash-bar"></div>
                  <div className="dash-stat-row">
                    <span className="dot"></span>
                    <span>Succeeded</span>
                    <span className="amt">$0.00</span>
                  </div>
                  <div className="dash-stat-row">
                    <span className="dot"></span>
                    <span>Succeeded</span>
                    <span className="amt">$0.00</span>
                  </div>
                  <div className="dash-stat-row">
                    <span className="dot"></span>
                    <span>Refunded</span>
                    <span className="amt">$0.00</span>
                  </div>
                  <div className="dash-stat-row">
                    <span className="dot"></span>
                    <span>Failed</span>
                    <span className="amt">$0.00</span>
                  </div>
                </div>
                <div className="dash-overview-col">
                  <span className="dash-widget-title">
                    Gross volume{' '}
                    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <rect x="1.5" y="1.5" width="9" height="9" rx="2" />
                      <path d="M6 5.4v3.2M6 3.6v.5" />
                    </svg>
                  </span>
                  <div className="dash-metric-value">$0.00</div>
                </div>
                <div className="dash-overview-col">
                  <span className="dash-widget-title">
                    Net volume from sales{' '}
                    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <rect x="1.5" y="1.5" width="9" height="9" rx="2" />
                      <path d="M6 5.4v3.2M6 3.6v.5" />
                    </svg>
                  </span>
                  <div className="dash-metric-value">$0.00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
