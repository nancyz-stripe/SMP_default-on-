/** The sandbox Dashboard the onboarding flow lands on (Figma 26370:56250).
 *  Built out rather than screenshotted, so the setup guide and the callout on
 *  the final step have real components to sit over.
 *
 *  Shared verbatim by the two flows, and entirely static — the interaction on
 *  that step belongs to the setup guide laid over it. */
export function SandboxDashboard() {
  return (
    <>
      {/* The dashboard, built out (Figma 26370:56250) */}
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
            <div className="dash-account">
              <span className="dash-account-icon"></span>
              <span>
                <span className="dash-account-name">Default sandbox</span>
                <span className="dash-account-sub">Cactus Practice</span>
              </span>
            </div>
            <div className="dash-nav active">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2.5 6.5L8 2.5l5.5 4v6a1 1 0 01-1 1h-9a1 1 0 01-1-1v-6z" />
                <path d="M6.5 13.5V9h3v4.5" />
              </svg>
              <span>Home</span>
            </div>
            <div className="dash-nav">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 4.5h9M2 8h12M2 11.5h7" />
                <circle cx="12.5" cy="4.5" r="1.6" />
                <circle cx="9.5" cy="11.5" r="1.6" />
              </svg>
              <span>Balances</span>
            </div>
            <div className="dash-nav">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 5.5h9l-2.2-2.2M13 10.5H4l2.2 2.2" />
              </svg>
              <span>Transactions</span>
            </div>
            <div className="dash-nav">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="8" cy="5.5" r="2.6" />
                <path d="M3 13.2c0-2.4 2.2-3.7 5-3.7s5 1.3 5 3.7" />
              </svg>
              <span>Customers</span>
            </div>
            <div className="dash-nav">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 2l5 2.8v6.4L8 14 3 11.2V4.8z" />
                <path d="M3 4.8l5 2.8 5-2.8M8 7.6V14" />
              </svg>
              <span>Product catalog</span>
            </div>

            <span className="dash-side-label">Shortcuts</span>
            <div className="dash-nav">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10.5 2.5l3 3-2 1-3.5 3.5-1-1L4.5 12 4 11.5l2-2.5-1-1L8.5 4.5z" />
              </svg>
              <span>Subscriptions</span>
            </div>

            <span className="dash-side-label">Products</span>
            <div className="dash-nav">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 2.5l5.5 3-5.5 3-5.5-3z" />
                <path d="M2.5 9l5.5 3 5.5-3" />
              </svg>
              <span>Connect</span>
              <svg
                className="caret"
                viewBox="0 0 10 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 4l3 3 3-3" />
              </svg>
            </div>
            <div className="dash-nav">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2.5" y="4" width="11" height="8" rx="1.6" />
                <path d="M2.5 7h11" />
              </svg>
              <span>Payments</span>
              <svg
                className="caret"
                viewBox="0 0 10 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 4l3 3 3-3" />
              </svg>
            </div>
            <div className="dash-nav">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2.5" y="3" width="11" height="8.5" rx="1.6" />
                <path d="M5.5 13.5l2-2M5.5 6.5h5M5.5 8.8h3" />
              </svg>
              <span>Billing</span>
              <svg
                className="caret"
                viewBox="0 0 10 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 4l3 3 3-3" />
              </svg>
            </div>
            <div className="dash-nav">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 13V8M6.5 13V4M10 13V9.5M13.5 13V6" />
              </svg>
              <span>Reporting</span>
              <svg
                className="caret"
                viewBox="0 0 10 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 4l3 3 3-3" />
              </svg>
            </div>
            <div className="dash-nav">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="4" cy="8" r="1" />
                <circle cx="8" cy="8" r="1" />
                <circle cx="12" cy="8" r="1" />
              </svg>
              <span>More</span>
              <svg
                className="caret"
                viewBox="0 0 10 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 4l3 3 3-3" />
              </svg>
            </div>

            <div className="dash-side-foot">
              <div className="dash-nav">
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="3" width="12" height="10" rx="1.6" />
                  <path d="M5 7l1.6 1.6L5 10.2M8.6 10.2h2.6" />
                </svg>
                <span>Developer tools</span>
              </div>
            </div>
          </div>

          <div className="dash-main">
            <div className="dash-main-inner">
              <div className="dash-topbar">
                <span className="dash-search">
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
                      strokeWidth="1.4"
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
                    <span className="dash-metric-label">
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
                    <span className="dash-metric-label">
                      Gross volume{' '}
                      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2">
                        <rect x="1.5" y="1.5" width="9" height="9" rx="2" />
                        <path d="M6 5.4v3.2M6 3.6v.5" />
                      </svg>
                    </span>
                    <div className="dash-metric-value">$0.00</div>
                  </div>
                  <div className="dash-overview-col">
                    <span className="dash-metric-label">
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

        {/* Glow behind the setup-guide moment */}
        <div className="dash-glow"></div>
      </div>
    </>
  )
}
