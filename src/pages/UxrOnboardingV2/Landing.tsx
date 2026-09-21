/** The Managed Payments landing page on stripe.com (Figma 26707:85880). Where the
 *  merchant arrives: "Pricing" in the subnav goes to the pricing page, "Start now"
 *  goes straight into the flow.
 *
 *  A website rather than a screen in the flow, so it sits outside the modal and
 *  outside the progress bar. The hero runs the same globe the flow's opt-in step
 *  does, moved here while this step is on screen; its own value cards are hidden in
 *  favour of this page's pair. */
export function Landing({
  onPricing,
  onStart,
  globeHost,
}: {
  onPricing: () => void
  onStart: () => void
  /** The shared globe is moved into this host while the page is showing. */
  globeHost: (el: HTMLDivElement | null) => void
}) {
  return (
    <>
      <div className="mkt lp">
        <div className="mkt-rules">
          <i></i>
          <i></i>
        </div>

        <div className="mkt-nav">
          <div className="mkt-row">
            <div className="mkt-nav-left">
              <svg
                viewBox="0 0 60 25"
                fill="#061b31"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '60px', height: '25px' }}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M60 12.9C60 8.6 57.9 5.3 54 5.3C50.1 5.3 47.6 8.6 47.6 12.9C47.6 17.9 50.5 20.5 54.6 20.5C56.6 20.5 58.1 20 59.3 19.2V16C58.1 16.7 56.7 17.2 55 17.2C53.3 17.2 51.8 16.6 51.6 14.5H59.9C59.9 14.3 60 13.4 60 12.9ZM51.5 11.7C51.5 9.7 52.7 8.9 53.9 8.9C55.1 8.9 56.3 9.7 56.3 11.7H51.5ZM41.2 5.3C39.5 5.3 38.4 6.1 37.8 6.6L37.6 5.6H34V24.5L37.9 23.7V20.1C38.5 20.5 39.4 21.1 40.9 21.1C44.1 21.1 46.9 18.5 46.9 12.9C46.9 8 44 5.3 41.2 5.3ZM40.3 17.5C39.2 17.5 38.6 17.1 38.2 16.7L37.9 9.5C38.3 9.1 39 8.7 40 8.7C41.6 8.7 42.7 10.5 42.7 13.1C42.7 15.8 41.6 17.5 40.3 17.5ZM28.3 4.5L32.2 3.7V0.5L28.3 1.3V4.5ZM28.3 5.6H32.2V20.2H28.3V5.6ZM24.2 6.8L24 5.6H20.5V20.2H24.4V10C25.3 8.8 26.8 9 27.3 9.2V5.6C26.7 5.4 25 5.1 24.2 6.8ZM16.5 2L12.7 2.8V16.1C12.7 18.6 14.6 20.5 17.1 20.5C18.5 20.5 19.5 20.3 20 20V16.8C19.6 17 16.5 17.8 16.5 15.3V9H20V5.6H16.5V2ZM4.7 9.8C4.7 9.2 5.2 8.9 6 8.9C7.1 8.9 8.6 9.2 9.7 9.9V6.2C8.5 5.7 7.3 5.3 6 5.3C2.6 5.3 0.5 7 0.5 9.9C0.5 14.5 6.7 13.8 6.7 15.8C6.7 16.5 6.1 16.8 5.2 16.8C4 16.8 2.4 16.3 1.1 15.5V19.2C2.6 19.9 4 20.2 5.2 20.2C8.7 20.2 10.9 18.6 10.9 15.7C10.9 10.7 4.7 11.5 4.7 9.8Z"
                />
              </svg>
              <div className="mkt-nav-links">
                <span className="mkt-nav-link">
                  Products{' '}
                  <svg
                    viewBox="0 0 10 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 1.5l4 3 4-3" />
                  </svg>
                </span>
                <span className="mkt-nav-link">
                  Solutions{' '}
                  <svg
                    viewBox="0 0 10 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 1.5l4 3 4-3" />
                  </svg>
                </span>
                <span className="mkt-nav-link">
                  Developers{' '}
                  <svg
                    viewBox="0 0 10 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 1.5l4 3 4-3" />
                  </svg>
                </span>
                <span className="mkt-nav-link">
                  Resources{' '}
                  <svg
                    viewBox="0 0 10 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 1.5l4 3 4-3" />
                  </svg>
                </span>
                <span className="mkt-nav-link">Pricing</span>
              </div>
            </div>
            <div className="mkt-nav-actions">
              <button className="mkt-btn mkt-btn-secondary">Sign in</button>
              <button className="mkt-btn mkt-btn-primary">
                Contact sales{' '}
                <svg
                  viewBox="0 0 5 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 1l3 3-3 3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="mkt-subnav">
          <div className="mkt-row">
            <span className="mkt-subnav-name">Managed Payments</span>
            <span className="mkt-subnav-links">
              <a>Overview</a>
              <a className="on" onClick={onPricing}>
                Pricing
              </a>
              <span className="mkt-subnav-sep"></span>
              <a className="ext">
                Docs{' '}
                <svg
                  viewBox="0 0 10 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3.6 1h5.4v5.4" />
                  <path d="M9 1L4 6" />
                  <path d="M7 6.6V9H1V3h2.4" />
                </svg>
              </a>
            </span>
          </div>
        </div>

        <div className="lp-hero">
          <div className="lp-hero-copy">
            <p className="lp-h-lg">Sell globally without the complexity</p>
            <p className="lp-hero-sub">
              Focus on growth while Stripe Managed Payments handles tax, fraud, disputes, and more
              as your merchant of record.
            </p>
            <div className="lp-hero-actions">
              <button className="mkt-btn mkt-btn-primary" onClick={onStart}>
                Start now{' '}
                <svg
                  viewBox="0 0 5 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 1l3 3-3 3" />
                </svg>
              </button>
              <button className="mkt-btn mkt-btn-secondary">Contact sales</button>
            </div>
          </div>
          <div className="lp-hero-visual">
            <div className="lp-globe-host" ref={globeHost}></div>
            <div className="lp-feed lp-feed-1">
              <span className="lp-feed-icon">
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 1.6h5L12 4.6v9.8H4z" />
                  <path d="M8.8 1.8v3h3" />
                  <path d="M5.8 8.4h4.4M5.8 10.8h3" />
                </svg>
              </span>
              <span className="lp-feed-text">
                <span className="lp-feed-title">Tax collection and remittance</span>
                <span className="lp-feed-sub">Automated tax operations</span>
              </span>
              <svg
                className="lp-feed-tick"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 7.4l3.2 3.2L12 3.8" />
              </svg>
            </div>
            <div className="lp-feed lp-feed-3">
              <span className="lp-feed-icon">
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 1.5l5 1.8v4.1c0 2.9-2 5.4-5 6.6-3-1.2-5-3.7-5-6.6V3.3z" />
                  <path d="M6 8l1.4 1.4 2.8-3" />
                </svg>
              </span>
              <span className="lp-feed-text">
                <span className="lp-feed-title">Fraud prevention</span>
                <span className="lp-feed-sub">Fraudulent payment blocked</span>
              </span>
              <svg
                className="lp-feed-tick"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 7.4l3.2 3.2L12 3.8" />
              </svg>
            </div>
            <div className="lp-feed lp-feed-2">
              <span className="lp-feed-icon">
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 1.6h5L12 4.6v9.8H4z" />
                  <path d="M8.8 1.8v3h3" />
                  <path d="M6 9.2l1.4 1.4 2.8-3" />
                </svg>
              </span>
              <span className="lp-feed-text">
                <span className="lp-feed-title">Dispute handling</span>
                <span className="lp-feed-sub">Dispute countered by Stripe</span>
              </span>
              <svg
                className="lp-feed-tick"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 7.4l3.2 3.2L12 3.8" />
              </svg>
            </div>
          </div>
        </div>

        <div className="lp-logos">
          <img src="/assets/landing/logos/superwall.svg" alt="Superwall" />
          <img src="/assets/landing/logos/tailwind.svg" alt="Tailwind Labs" />
          <img src="/assets/landing/logos/razer.svg" alt="Razer" />
          <img src="/assets/landing/logos/ahrefs.svg" alt="Ahrefs" />
          <img src="/assets/landing/logos/revenuecat.svg" alt="RevenueCat" />
          <img src="/assets/landing/logos/armada.svg" alt="AppClose" />
          <img src="/assets/landing/logos/op.svg" alt="Pingo" />
        </div>

        <div className="lp-ksp">
          <div className="lp-ksp-card">
            <span className="lp-charm">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18" />
                <path d="M12 3c2.5 2.6 3.8 5.6 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
              </svg>
            </span>
            <p className="lp-ksp-copy">Streamlined tax compliance in 80+ countries</p>
            <span className="lp-link down">
              Shift your tax responsibility{' '}
              <svg
                viewBox="0 0 8 9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 1v6.4M1.4 5l2.6 2.6L6.6 5" />
              </svg>
            </span>
          </div>
          <div className="lp-ksp-card">
            <span className="lp-charm">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2.5 3h2.2l2.4 10.4h10.1" />
                <path d="M6.4 6.2h13.4l-1.6 5.6H7.7" />
                <circle cx="9.2" cy="19" r="1.5" />
                <circle cx="17.4" cy="19" r="1.5" />
              </svg>
            </span>
            <p className="lp-ksp-copy">Localized checkout across web and in-app payments</p>
            <span className="lp-link down">
              Convert more customers{' '}
              <svg
                viewBox="0 0 8 9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 1v6.4M1.4 5l2.6 2.6L6.6 5" />
              </svg>
            </span>
          </div>
          <div className="lp-ksp-card">
            <span className="lp-charm">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2.8l7.4 2.6v6.1c0 4.3-3 8.1-7.4 9.7-4.4-1.6-7.4-5.4-7.4-9.7V5.4z" />
              </svg>
            </span>
            <p className="lp-ksp-copy">Automated fraud prevention and dispute management</p>
            <span className="lp-link down">
              Reduce overhead{' '}
              <svg
                viewBox="0 0 8 9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 1v6.4M1.4 5l2.6 2.6L6.6 5" />
              </svg>
            </span>
          </div>
          <div className="lp-ksp-card">
            <span className="lp-charm">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5.5 2.6h9L19 7v14.4H5.5z" />
                <path d="M14.2 2.9v4.2h4.2" />
                <path d="M8.8 13.4l2.2 2.2 4.4-4.6" />
              </svg>
            </span>
            <p className="lp-ksp-copy">Flexible merchant of record coverage</p>
            <span className="lp-link down">
              Customize your setup{' '}
              <svg
                viewBox="0 0 8 9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 1v6.4M1.4 5l2.6 2.6L6.6 5" />
              </svg>
            </span>
          </div>
        </div>

        <div className="lp-band">
          <div className="lp-manifesto">
            <span className="lp-eyebrow">
              <svg viewBox="0 0 14 14" fill="#061b31">
                <path d="M1 2.2l5.6-.9v9.4L1 11.8z" />
                <path d="M7.6 1.3L13 2.6v7.4L7.6 10.7z" opacity="0.55" />
              </svg>
              The opportunity
            </span>
            <p className="lp-h-md">
              Selling globally takes more than accepting payments. The infrastructure required to
              enter, localize, and stay compliant in each market can be a barrier to growth.
            </p>
            <div className="lp-manifesto-cols">
              <div>
                <p>
                  Launching in a new market should be a growth opportunity, but it can become a
                  costly lift. Handling tax registrations and filings; localizing checkout; and
                  standing up processes for fraud, disputes, and customer support can slow expansion
                  and make growth more expensive.
                </p>
              </div>
              <div>
                <p>
                  Stripe Managed Payments handles tax compliance, checkout, fraud, disputes, and
                  customer support for digital goods businesses. Built on Stripe’s payments
                  infrastructure, it gives you the reliability, performance, and flexibility to
                  scale with less operational overhead.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lp-sec">
          <div className="lp-split middle">
            <div className="lp-split-copy">
              <p className="lp-h-lg">
                Shift your tax responsibility.{' '}
                <span className="rest">
                  Managed Payments handles global sales tax, VAT, GST, and post-sale compliance.
                </span>
              </p>
              <div className="lp-note-stack" style={{ marginTop: '40px' }}>
                <div>
                  <h4>Offload tax management</h4>
                  <p>
                    Transfer responsibility for tax compliance across 80+ countries and 35 product
                    categories—no registrations or filings on your end.
                  </p>
                </div>
                <div>
                  <h4>Automate tax operations</h4>
                  <p>
                    Let Managed Payments handle automatic tax calculation, collections, and
                    remittance in all supported countries.
                  </p>
                </div>
                <div>
                  <h4>Stay compliant as rules change</h4>
                  <p>
                    Maintain compliance across countries with ongoing monitoring of tax rule
                    changes.
                  </p>
                </div>
              </div>
            </div>
            <div className="lp-split-visual">
              <img
                src="/assets/landing/tax-diagram.svg"
                width="606"
                height="606"
                alt="Customer purchase flowing through Managed Payments to a Stripe payout"
              />
            </div>
          </div>
        </div>

        <div className="lp-sec" style={{ paddingBottom: '0' }}>
          <div className="lp-split middle">
            <div className="lp-split-copy" style={{ width: '520px' }}>
              <p className="lp-h-md">Grow global revenue</p>
              <p style={{ marginTop: '16px' }}>
                Increase conversion with localized checkout, and streamline post-purchase support
                through Link, Stripe’s consumer platform.
              </p>
              <div className="lp-notes" style={{ marginTop: '40px' }}>
                <p>
                  <b>Convert more global customers.</b> Use AI-powered, built-in optimizations from
                  Stripe Checkout to localize the buying experience for your customers across 30+
                  languages and 135+ currencies.
                </p>
                <p>
                  <b>Grow cross-border revenue.</b> Automatically localize prices in 150+ countries
                  with Adaptive Pricing, so customers can pay in their local currency while Stripe
                  handles exchange rates and currency conversion.
                </p>
                <p>
                  <b>Streamline post-purchase support.</b> Let your customers manage purchases,
                  update payment methods, handle subscriptions, and access 24/7 multilingual support
                  in their Link account.
                </p>
              </div>
            </div>
            <div className="lp-split-visual">
              <img
                src="/assets/landing/checkout.svg"
                width="608"
                height="608"
                alt="Localized Stripe Checkout with Link"
              />
            </div>
          </div>
          <div className="lp-stats" style={{ marginTop: '96px' }}>
            <div className="lp-stat">
              <div className="lp-stat-figure">2%–3%</div>
              <p>average conversion increase after adopting Stripe’s optimized payment surfaces</p>
            </div>
            <div className="lp-stat">
              <div className="lp-stat-figure">17.8%</div>
              <p>average cross-border revenue lift after localizing prices with Adaptive Pricing</p>
            </div>
            <div className="lp-stat">
              <div className="lp-stat-figure">16</div>
              <p>languages supported by Link’s 24/7 customer support</p>
            </div>
          </div>
        </div>

        <div className="lp-sec" style={{ paddingBottom: '64px' }}>
          <p className="lp-h-lg lp-lede" style={{ width: '760px' }}>
            Reduce overhead and get paid faster.{' '}
            <span className="rest">
              Managed Payments handles fraud and disputes automatically, while you receive funds in
              days, not months.
            </span>
          </p>
          <div className="lp-cards-3">
            <div className="lp-card">
              <div className="lp-card-visual">
                <img
                  src="/assets/landing/card-fraud.svg"
                  width="400"
                  height="430"
                  alt="Fraud dashboard"
                />
              </div>
              <div className="lp-card-body">
                <p className="lp-h-xs lp-detail-title">Fraud prevention</p>
                <p>
                  Get real-time fraud prevention that automatically detects and blocks fraudulent
                  transactions. Businesses using Stripe see a 38% reduction in fraud on average.
                </p>
                <span className="lp-link">
                  Learn more{' '}
                  <svg
                    viewBox="0 0 5 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 1l3 3-3 3" />
                  </svg>
                </span>
              </div>
            </div>
            <div className="lp-card">
              <div className="lp-card-visual">
                <img
                  src="/assets/landing/card-disputes.svg"
                  width="400"
                  height="430"
                  alt="Disputes won by Smart Disputes"
                />
              </div>
              <div className="lp-card-body">
                <p className="lp-h-xs lp-detail-title">Dispute management</p>
                <p>
                  Save time by letting Managed Payments counter disputes on your behalf. Businesses
                  using Stripe’s automated dispute solutions recover on average 18% more payment
                  volume.
                </p>
                <span className="lp-link">
                  Learn more{' '}
                  <svg
                    viewBox="0 0 5 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 1l3 3-3 3" />
                  </svg>
                </span>
              </div>
            </div>
            <div className="lp-card">
              <div className="lp-card-visual">
                <img
                  src="/assets/landing/card-payouts.svg"
                  width="400"
                  height="430"
                  alt="Balances and payout recommendations"
                />
              </div>
              <div className="lp-card-body">
                <p className="lp-h-xs lp-detail-title">Faster payouts</p>
                <p>
                  Access funds faster as you expand into new markets. Managed Payments can deliver
                  payouts up to 4x faster than the monthly cycles typical of other providers.
                </p>
                <span className="lp-link">
                  Learn more{' '}
                  <svg
                    viewBox="0 0 5 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 1l3 3-3 3" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="lp-sec">
          <p className="lp-h-lg lp-lede" style={{ width: '1000px' }}>
            Choose your merchant of record coverage.{' '}
            <span className="rest">
              Customize where and when to use Managed Payments—for your entire business or specific
              markets, products, and transactions.
            </span>
          </p>
          <div className="lp-grid-3" style={{ width: '1136px' }}>
            <p>
              <b>Transaction-level control.</b> Configure Managed Payments at the transaction level,
              applying it selectively to specific markets or products while maintaining your
              existing setup elsewhere.
            </p>
            <p>
              <b>Minimal setup required.</b> Enable or disable Managed Payments with just a few
              clicks, without disrupting existing payment flows.
            </p>
          </div>
          <div style={{ marginTop: '46px' }}>
            <img
              src="/assets/landing/dashboard.svg"
              width="1232"
              height="604"
              style={{ display: 'block' }}
              alt="Transactions filtered by Managed Payments in the Stripe Dashboard"
            />
          </div>
        </div>

        <div className="lp-band">
          <div className="lp-sec">
            <p className="lp-h-lg lp-lede">
              Built for your global growth strategy.{' '}
              <span className="rest">
                Scale quickly with the flexibility and control you need for every stage of
                expansion.
              </span>
            </p>
            <div className="lp-grid-3">
              <div className="lp-detail">
                <span className="lp-charm">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4.5l7 7.5-7 7.5" />
                    <path d="M12.5 4.5l7 7.5-7 7.5" />
                  </svg>
                </span>
                <p className="lp-h-xs lp-detail-title">Launch globally from day one</p>
                <p>
                  Offer software subscriptions, digital content, or virtual goods to customers in
                  supported countries without establishing local entities or navigating tax
                  regulations.
                </p>
              </div>
              <div className="lp-detail">
                <span className="lp-charm">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="5" y="3.5" width="14" height="17" rx="2" />
                    <path d="M9 3.5V2.2h6v1.3" />
                    <path d="M8.8 9.4h6.4M8.8 13h6.4M8.8 16.6h4" />
                  </svg>
                </span>
                <p className="lp-h-xs lp-detail-title">Test and validate new markets</p>
                <p>
                  Test market potential and customer fit before scaling, with Managed Payments
                  handling compliance and payment requirements.
                </p>
              </div>
              <div className="lp-detail">
                <span className="lp-charm">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3.2 10.4h17.6" />
                    <path d="M7.4 16.4h9.2" />
                    <path d="M14.6 14.2l2.2 2.2-2.2 2.2" />
                    <path d="M9.4 18.6l-2.2-2.2 2.2-2.2" />
                  </svg>
                </span>
                <p className="lp-h-xs lp-detail-title">Optimize by region</p>
                <p>
                  Implement a hybrid approach by using Stripe’s merchant of record solution
                  selectively and maintaining your existing setup for regions where direct control
                  is preferred.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lp-sec">
          <div className="lp-split middle">
            <div className="lp-split-copy" style={{ width: '520px' }}>
              <p className="lp-h-md">Maximize your in-app revenue</p>
              <p style={{ marginTop: '16px' }}>
                Redirect app users to a web-based checkout optimized for conversion and designed to
                feel native. Save on payment costs while maintaining operational efficiency with
                Managed Payments.
              </p>
              <button className="mkt-btn mkt-btn-secondary" style={{ marginTop: '32px' }}>
                Accept in-app payments
              </button>
            </div>
            <div className="lp-split-visual" style={{ marginLeft: '104px' }}>
              <img
                src="/assets/landing/phone.svg"
                width="608"
                height="692"
                alt="In-app checkout on a phone"
              />
            </div>
          </div>
        </div>

        <div className="lp-band">
          <div className="lp-sec">
            <div className="lp-quote">
              <img
                className="lp-quote-logo"
                src="/assets/landing/logo-unity.png"
                width="150"
                height="36"
                alt="Unity"
              />
              <p>
                “With Stripe, developers will have more flexibility and choice in how they manage
                payments across mobile, web, and PC. The seamless way Stripe handles fraud,
                disputes, and taxes behind the scenes will deliver the kind of developer-first
                experience we’re committed to providing.”
              </p>
              <p className="lp-quote-by">
                <b>Mark Feldman,</b> SVP Strategic Partnership and Corporate Development
              </p>
            </div>
            <div className="lp-quote-rule">
              <i></i>
            </div>
            <div className="lp-quote-logos">
              <img src="/assets/landing/testimonial-logos.png" alt="Unity and Superwall" />
            </div>
          </div>
        </div>

        <div className="lp-band-dark">
          <div className="lp-sec">
            <div className="lp-split middle">
              <div className="lp-split-copy" style={{ width: '520px' }}>
                <p className="lp-h-md">Get started in minutes</p>
                <p style={{ marginTop: '16px' }}>
                  Go live instantly using payment links, or add one line of code to Checkout. Stay
                  live on a reliable platform with 99.999% historical uptime.
                </p>
                <button className="lp-btn-ghost" style={{ marginTop: '32px' }}>
                  Explore the docs
                </button>
              </div>
              <div className="lp-split-visual" style={{ marginLeft: '104px', width: '608px' }}>
                <div className="lp-code">
                  <ol>
                    <li>
                      <span className="k">const</span> session = <span className="k">await</span>{' '}
                      stripe.checkout.sessions.<span className="f">create</span>({'{'}
                    </li>
                    <li> line_items: [</li>
                    <li> {'{'}</li>
                    <li>
                      {' '}
                      price:{' '}
                      <span className="s">
                        '{'{'}
                        {'{'}PRICE_ID{'}'}
                        {'}'}'
                      </span>
                      ,
                    </li>
                    <li>
                      {' '}
                      quantity: <span className="k">1</span>,
                    </li>
                    <li> {'}'},</li>
                    <li> ],</li>
                    <li> managed_payments: {'{'}</li>
                    <li>
                      {' '}
                      enabled: <span className="k">true</span>,
                    </li>
                    <li> {'}'},</li>
                    <li>
                      {' '}
                      mode: <span className="s">'subscription'</span>,
                    </li>
                    <li>
                      {' '}
                      success_url:{' '}
                      <span className="s">
                        '<span className="u">https://localhost:4242/success</span>'
                      </span>
                      ,
                    </li>
                    <li>{'}'});</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lp-sec" style={{ paddingBottom: '64px' }}>
          <p className="lp-h-lg lp-lede" style={{ width: '760px' }}>
            One platform for global businesses.{' '}
            <span className="rest">
              Extend Managed Payments with subscriptions, advanced fraud controls, and reporting.
            </span>
          </p>
          <div className="lp-cards-3">
            <div className="lp-card">
              <div className="lp-card-visual">
                <img src="/assets/landing/eco-billing.png" alt="Stripe Billing pricing options" />
              </div>
              <div className="lp-card-body">
                <p>
                  <b>Power your subscription business.</b> Use Stripe Billing with Managed Payments
                  to accept subscription payments.
                </p>
                <span className="lp-link">
                  Explore Billing{' '}
                  <svg
                    viewBox="0 0 5 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 1l3 3-3 3" />
                  </svg>
                </span>
              </div>
            </div>
            <div className="lp-card">
              <div className="lp-card-visual">
                <img src="/assets/landing/eco-radar.png" alt="Radar rule performance" />
              </div>
              <div className="lp-card-body">
                <p>
                  <b>Get advanced fraud controls.</b> Add Stripe Radar for Fraud Teams to apply
                  custom rules, risk thresholds, and Adaptive 3D Secure to your Managed Payments
                  transactions—no code required.
                </p>
                <span className="lp-link">
                  Explore Radar for Fraud Teams{' '}
                  <svg
                    viewBox="0 0 5 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 1l3 3-3 3" />
                  </svg>
                </span>
              </div>
            </div>
            <div className="lp-card">
              <div className="lp-card-visual">
                <img src="/assets/landing/eco-sigma.png" alt="Sigma query with an AI assist" />
              </div>
              <div className="lp-card-body">
                <p>
                  <b>Gain deeper insights, faster.</b> Use Stripe Sigma alongside Managed Payments
                  to build custom queries and reports for better business decisions.
                </p>
                <span className="lp-link">
                  Explore Stripe Sigma{' '}
                  <svg
                    viewBox="0 0 5 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 1l3 3-3 3" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="lp-band">
          <div className="lp-sec">
            <div className="lp-faq-grid">
              <div className="lp-faq-head">
                <p className="lp-h-md">
                  Frequently asked questions.{' '}
                  <span className="rest">Learn more about Managed Payments.</span>
                </p>
              </div>
              <div className="mkt-faq-list">
                <div className="mkt-faq-item">
                  What types of businesses should use Managed Payments?{' '}
                  <span className="mkt-faq-toggle">+</span>
                </div>
                <div className="mkt-faq-item">
                  What is the pricing for Managed Payments?{' '}
                  <span className="mkt-faq-toggle">+</span>
                </div>
                <div className="mkt-faq-item">
                  How does Managed Payments work with other Stripe products?{' '}
                  <span className="mkt-faq-toggle">+</span>
                </div>
                <div className="mkt-faq-item">
                  How does Stripe Tax compare to Stripe Managed Payments?{' '}
                  <span className="mkt-faq-toggle">+</span>
                </div>
                <div className="mkt-faq-item">
                  Can I use Managed Payments selectively for certain markets or products?{' '}
                  <span className="mkt-faq-toggle">+</span>
                </div>
                <div className="mkt-faq-item">
                  What is Link and what do customers see when using Managed Payments?{' '}
                  <span className="mkt-faq-toggle">+</span>
                </div>
              </div>
            </div>
            <div className="lp-faq-rule"></div>
            <div className="lp-guide">
              <div className="lp-guide-copy">
                <p className="lp-h-md">
                  What businesses need to know about merchant of record solutions
                </p>
                <p>
                  Learn about the merchant of record model, key responsibilities, and the
                  wide-ranging benefits for businesses.
                </p>
                <button className="mkt-btn mkt-btn-secondary">Read the guide</button>
              </div>
              <img
                src="/assets/landing/guide-card.png"
                alt="Guide: what a merchant of record does (and why it matters)"
              />
            </div>
          </div>
        </div>

        <div className="lp-sec">
          <div className="lp-cta">
            <div className="lp-cta-copy">
              <p className="lp-h-lg">Ready to get started?</p>
              <p>
                Start selling worldwide with Managed Payments today. Or, talk to our sales team to
                learn how Managed Payments can be customized for your specific business needs.
              </p>
              <div className="lp-cta-actions">
                <button className="mkt-btn mkt-btn-primary" onClick={onStart}>
                  Start now{' '}
                  <svg
                    viewBox="0 0 5 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 1l3 3-3 3" />
                  </svg>
                </button>
                <button className="mkt-btn mkt-btn-secondary">Contact sales</button>
              </div>
            </div>
            <div className="lp-cta-aside">
              <span className="lp-charm">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12.6 3.2H20a1 1 0 011 1v7.4a1 1 0 01-.3.7l-8.4 8.4a1 1 0 01-1.4 0l-7.4-7.4a1 1 0 010-1.4l8.4-8.4a1 1 0 01.7-.3z" />
                  <circle cx="16.6" cy="7.4" r="1.6" />
                </svg>
              </span>
              <p className="lp-h-xs lp-detail-title">Pricing that scales with you</p>
              <p>Pay only for what you use with our straightforward fee structure.</p>
              <span className="lp-link" onClick={onPricing}>
                See pricing{' '}
                <svg
                  viewBox="0 0 5 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 1l3 3-3 3" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        <div className="mkt-footer">
          <div className="mkt-row">
            <div className="mkt-footer-cols">
              <i></i>
              <i></i>
              <i></i>
              <div className="mkt-footer-col">
                <div className="mkt-footer-group">
                  <h3>Products and Pricing</h3>
                  <a>Pricing</a>
                  <a>Atlas</a>
                  <a>Authorization Boost</a>
                  <a>Billing</a>
                  <a>Capital</a>
                  <a>Checkout</a>
                  <a>Climate</a>
                  <a>Connect</a>
                  <a>Data Pipeline</a>
                  <a>Elements</a>
                  <a>Financial Accounts</a>
                  <a>Financial Connections</a>
                  <a>Identity</a>
                  <a>Invoicing</a>
                  <a>Issuing</a>
                  <a>Link</a>
                  <a>Managed Payments</a>
                  <a>Payments</a>
                  <a>Payment methods</a>
                  <a>Payment Links</a>
                  <a>Global Payouts</a>
                  <a>Radar</a>
                  <a>Revenue Recognition</a>
                  <a>Stripe Sigma</a>
                  <a>Tax</a>
                  <a>Terminal</a>
                  <a>Usage-based billing</a>
                </div>
              </div>
              <div className="mkt-footer-col">
                <div className="mkt-footer-group">
                  <h3>Solutions</h3>
                  <a>Enterprises</a>
                  <a>Startups</a>
                  <a>Crypto</a>
                  <a>Ecommerce</a>
                  <a>Embedded finance</a>
                  <a>Finance automation</a>
                  <a>Global businesses</a>
                  <a>Marketplaces</a>
                  <a>Platforms</a>
                  <a>SaaS</a>
                  <a>AI companies</a>
                  <a>Creator economy</a>
                  <a>Hospitality, travel, and leisure</a>
                  <a>Insurance</a>
                  <a>Media and entertainment</a>
                  <a>Nonprofits</a>
                  <a>Retail</a>
                </div>
                <div className="mkt-footer-group">
                  <h3>Integrations and custom solutions</h3>
                  <a>Stripe App Marketplace</a>
                  <a>Partner ecosystem</a>
                  <a>Professional services</a>
                </div>
              </div>
              <div className="mkt-footer-col">
                <div className="mkt-footer-group">
                  <h3>Developers</h3>
                  <a>Documentation</a>
                  <a>API reference</a>
                  <a>API status</a>
                  <a>API changelog</a>
                  <a>Libraries and SDKs</a>
                  <a>Developer blog</a>
                  <a>Customized integration plan</a>
                </div>
                <div className="mkt-footer-group">
                  <h3>Resources</h3>
                  <a>Guides</a>
                  <a>Customer stories</a>
                  <a>Blog</a>
                  <a>Sessions annual conference</a>
                  <a>Privacy and terms</a>
                  <a>Prohibited and restricted businesses</a>
                  <a>Licenses</a>
                  <a>Sitemap</a>
                  <a>Cookie settings</a>
                  <a>Your privacy choices</a>
                  <a>Legal notice</a>
                  <a>Impressum</a>
                  <a>More resources</a>
                </div>
              </div>
              <div className="mkt-footer-col">
                <div className="mkt-footer-group">
                  <h3>Company</h3>
                  <a>Institutional</a>
                  <a>Jobs</a>
                  <a>Newsroom</a>
                  <a>Stripe Press</a>
                  <a>Contact sales</a>
                </div>
                <div className="mkt-footer-group">
                  <h3>Support</h3>
                  <a>Get support</a>
                  <a>Managed support plans</a>
                  <a>CA residents: +1 888 926 2289</a>
                  <a className="mkt-footer-callout">
                    Sign in{' '}
                    <svg
                      viewBox="0 0 5 8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 1l3 3-3 3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mkt-footer-bar">
            <div className="mkt-row">
              <span className="mkt-footer-locale">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <circle cx="8" cy="8" r="6.6" />
                  <path d="M1.6 8h12.8" />
                  <path d="M8 1.4c1.8 1.8 2.7 4 2.7 6.6S9.8 12.8 8 14.6C6.2 12.8 5.3 10.6 5.3 8S6.2 3.2 8 1.4z" />
                </svg>
                United States (English)
              </span>
              <div className="mkt-footer-copy">© 2026 Stripe, Inc.</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
