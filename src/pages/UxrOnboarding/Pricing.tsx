/** The pricing page on stripe.com. Built as a step so the flow starts where the
 *  merchant actually starts, but a website rather than a screen in the flow — so it
 *  sits outside the modal and outside the progress bar. */
export function Pricing({ onOverview, onStart }: { onOverview: () => void; onStart: () => void }) {
  return (
    <>
      <div className="mkt">
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
              <a className="on" onClick={onOverview}>
                Overview
              </a>
              <a>Pricing</a>
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

        <div className="mkt-col-inset mkt-hero">
          <h1>Pricing for Managed Payments</h1>
          <p className="mkt-hero-sub">
            Sell digital goods with Stripe’s merchant of record solution so you can launch in new
            markets faster, without taking on more operational complexity.
          </p>
          <div className="mkt-hero-actions">
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

        <div className="mkt-col mkt-fees">
          <div className="mkt-fee-panel">
            <div className="mkt-fee-glow">
              <img className="base" src="/assets/pricing/fee-glow-base.png" alt="" />
              <div className="mkt-fee-glow-clip">
                <img src="/assets/pricing/fee-glow.jpg" alt="" />
              </div>
            </div>

            <div className="mkt-fee-pair">
              <div className="mkt-card">
                <div className="mkt-fee-head">
                  <h3>International payments</h3>
                  <p>
                    Accept widely used credit and debit cards, prepaid cards, and digital wallets
                    for cards issued internationally.
                  </p>
                </div>
                <div className="mkt-fee-body">
                  <div className="mkt-fee-price">+3.5%</div>
                  <p>
                    per successful Managed Payments transaction in addition to the standard
                    international processing fee
                  </p>
                </div>
              </div>
              <div className="mkt-card">
                <div className="mkt-fee-head">
                  <h3>Domestic payments</h3>
                  <p>
                    Accept widely used credit and debit cards, prepaid cards, and digital wallets
                    for cards issued domestically.
                  </p>
                </div>
                <div className="mkt-fee-body">
                  <div className="mkt-fee-price">+2%</div>
                  <p>
                    per successful Managed Payments transaction in addition to the standard domestic
                    processing fee
                  </p>
                </div>
              </div>
            </div>

            <div className="mkt-card mkt-addon">
              <div className="mkt-addon-row">
                <div className="mkt-addon-left">
                  <h3>Flexible add-on pricing</h3>
                  <p>
                    Use Managed Payments across your business or selectively for the transactions
                    where you want merchant of record responsibilities handled for you.
                    <span
                      className="mkt-hint mkt-addon-hint"
                      title="Managed Payments can be turned on per transaction."
                    >
                      ?
                    </span>
                  </p>
                  <div className="mkt-addon-checks">
                    <div className="mkt-check-col">
                      <span className="mkt-check">
                        <svg viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="8" fill="#e2e4ff" />
                          <path
                            d="M4.5 8.3l2.3 2.3 4.7-5"
                            stroke="#533afd"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>{' '}
                        Tax calculation, collection, filing, and remittance in supported countries
                      </span>
                      <span className="mkt-check">
                        <svg viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="8" fill="#e2e4ff" />
                          <path
                            d="M4.5 8.3l2.3 2.3 4.7-5"
                            stroke="#533afd"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>{' '}
                        Fraud prevention and dispute management
                      </span>
                    </div>
                    <div className="mkt-check-col">
                      <span className="mkt-check">
                        <svg viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="8" fill="#e2e4ff" />
                          <path
                            d="M4.5 8.3l2.3 2.3 4.7-5"
                            stroke="#533afd"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>{' '}
                        Transaction-related customer support
                      </span>
                      <span className="mkt-check">
                        <svg viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="8" fill="#e2e4ff" />
                          <path
                            d="M4.5 8.3l2.3 2.3 4.7-5"
                            stroke="#533afd"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>{' '}
                        Standard Stripe payout timing
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mkt-col-inset mkt-custom">
          <div className="mkt-custom-card">
            <div className="mkt-custom-row">
              <div className="mkt-custom-text">
                <h3>Custom pricing</h3>
                <p>
                  Custom pricing is available for high-volume businesses or those with more complex
                  global expansion strategies.
                </p>
              </div>
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

        <div className="mkt-col-inset mkt-included">
          <h2>What’s included with Managed Payments</h2>
          <div className="mkt-groups">
            <div className="mkt-table">
              <div className="mkt-thead">Accept and optimize payments</div>
              <div className="mkt-tr">
                <div className="mkt-td-name">
                  <b>Payment methods</b>Offer cards, wallets, and eligible local payment methods
                </div>
                <div className="mkt-td-value">
                  <svg viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="#e2e4ff" />
                    <path
                      d="M4.5 8.3l2.3 2.3 4.7-5"
                      stroke="#533afd"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>{' '}
                  <a>Standard pricing applies</a>
                </div>
              </div>
              <div className="mkt-tr">
                <div className="mkt-td-name">
                  <b>Localized checkout</b>Optimize checkout based on a customer’s location,
                  including presenting prices in local currencies
                </div>
                <div className="mkt-td-value">
                  <svg viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="#e2e4ff" />
                    <path
                      d="M4.5 8.3l2.3 2.3 4.7-5"
                      stroke="#533afd"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>{' '}
                  Included
                </div>
              </div>
              <div className="mkt-tr">
                <div className="mkt-td-name">
                  <b>Payment optimizations</b>Improve payment performance with built-in
                  optimizations
                </div>
                <div className="mkt-td-value">
                  <svg viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="#e2e4ff" />
                    <path
                      d="M4.5 8.3l2.3 2.3 4.7-5"
                      stroke="#533afd"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>{' '}
                  Included
                </div>
              </div>
              <div className="mkt-tr">
                <div className="mkt-td-name">
                  <b>Local entity routing</b>Process payments locally in select markets{' '}
                  <span className="mkt-hint" title="Available in select markets.">
                    ?
                  </span>
                </div>
                <div className="mkt-td-value">
                  <svg viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="#e2e4ff" />
                    <path
                      d="M4.5 8.3l2.3 2.3 4.7-5"
                      stroke="#533afd"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>{' '}
                  Included
                </div>
              </div>
            </div>

            <div className="mkt-table">
              <div className="mkt-thead">
                Manage taxes{' '}
                <span className="mkt-hint" title="Indirect taxes on Managed Payments transactions.">
                  ?
                </span>
              </div>
              <div className="mkt-tr">
                <div className="mkt-td-name">
                  <b>Tax calculation and collection</b>Determine the tax due and collect it from the
                  customer
                </div>
                <div className="mkt-td-value">
                  <svg viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="#e2e4ff" />
                    <path
                      d="M4.5 8.3l2.3 2.3 4.7-5"
                      stroke="#533afd"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>{' '}
                  Included
                </div>
              </div>
              <div className="mkt-tr">
                <div className="mkt-td-name">
                  <b>Tax filing</b>Report collected taxes to the relevant tax authorities
                </div>
                <div className="mkt-td-value">
                  <svg viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="#e2e4ff" />
                    <path
                      d="M4.5 8.3l2.3 2.3 4.7-5"
                      stroke="#533afd"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>{' '}
                  Included
                </div>
              </div>
              <div className="mkt-tr">
                <div className="mkt-td-name">
                  <b>Tax remittance</b>Send collected taxes to the relevant tax authorities
                </div>
                <div className="mkt-td-value">
                  <svg viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="#e2e4ff" />
                    <path
                      d="M4.5 8.3l2.3 2.3 4.7-5"
                      stroke="#533afd"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>{' '}
                  Included
                </div>
              </div>
              <div className="mkt-tr">
                <div className="mkt-td-name">
                  <b>Indirect tax liability</b>Take legal responsibility for sales tax, VAT, and GST
                  owed on transactions
                </div>
                <div className="mkt-td-value">
                  <svg viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="#e2e4ff" />
                    <path
                      d="M4.5 8.3l2.3 2.3 4.7-5"
                      stroke="#533afd"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>{' '}
                  Included
                </div>
              </div>
            </div>

            <div className="mkt-table">
              <div className="mkt-thead">
                Handle disputes and fraud{' '}
                <span
                  className="mkt-hint"
                  title="Disputes and fraud on Managed Payments transactions."
                >
                  ?
                </span>
              </div>
              <div className="mkt-tr">
                <div className="mkt-td-name">
                  <b>Dispute management</b>Respond to chargebacks and submit supporting evidence
                </div>
                <div className="mkt-td-value">
                  <svg viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="#e2e4ff" />
                    <path
                      d="M4.5 8.3l2.3 2.3 4.7-5"
                      stroke="#533afd"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>{' '}
                  Included
                </div>
              </div>
              <div className="mkt-tr">
                <div className="mkt-td-name">
                  <b>Fraud prevention</b>Detect and block fraudulent payments
                </div>
                <div className="mkt-td-value">
                  <svg viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="#e2e4ff" />
                    <path
                      d="M4.5 8.3l2.3 2.3 4.7-5"
                      stroke="#533afd"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>{' '}
                  Included
                </div>
              </div>
            </div>

            <div className="mkt-table">
              <div className="mkt-thead">Provide customer experience and support</div>
              <div className="mkt-tr">
                <div className="mkt-td-name">
                  <b>Transaction-related customer support</b>Help customers with payment and
                  subscription questions
                </div>
                <div className="mkt-td-value">
                  <svg viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="#e2e4ff" />
                    <path
                      d="M4.5 8.3l2.3 2.3 4.7-5"
                      stroke="#533afd"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>{' '}
                  Included
                </div>
              </div>
              <div className="mkt-tr">
                <div className="mkt-td-name">
                  <b>Post-purchase management</b>Give customers self-serve tools to manage
                  purchases, payment methods, and subscriptions
                </div>
                <div className="mkt-td-value">
                  <svg viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="#e2e4ff" />
                    <path
                      d="M4.5 8.3l2.3 2.3 4.7-5"
                      stroke="#533afd"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>{' '}
                  Included
                </div>
              </div>
              <div className="mkt-tr">
                <div className="mkt-td-name">
                  <b>Customer communications</b>Send receipts, invoices, and subscription emails to
                  customers
                </div>
                <div className="mkt-td-value">
                  <svg viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="#e2e4ff" />
                    <path
                      d="M4.5 8.3l2.3 2.3 4.7-5"
                      stroke="#533afd"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>{' '}
                  Included
                </div>
              </div>
            </div>

            <div className="mkt-table">
              <div className="mkt-tr-total">
                <span>Pricing</span>
                <b>3.5% per successful Managed Payments transaction</b>
              </div>
            </div>
          </div>
        </div>

        <div className="mkt-col-inset mkt-differs">
          <h2>How Managed Payments differs from standard Stripe payments</h2>
          <p>
            Managed Payments is Stripe’s merchant of record solution that manages indirect tax
            compliance, fraud, disputes, and transaction-related support—for a flat 3.5% fee per
            successful transaction, on top of standard payments pricing. With standard Stripe
            payments, your business remains the merchant of record and manages these areas. Stripe
            products such as Stripe Tax, Radar, Billing, and Smart Disputes can help, with separate
            product pricing where applicable.
          </p>
        </div>

        <div className="mkt-faq">
          <div className="mkt-col-inset">
            <div className="mkt-faq-grid">
              <h2>Frequently asked questions.</h2>
              <div className="mkt-faq-list">
                <div className="mkt-faq-item">
                  What is a merchant of record? <span className="mkt-faq-toggle">+</span>
                </div>
                <div className="mkt-faq-item">
                  What is included in the Managed Payments fee?{' '}
                  <span className="mkt-faq-toggle">+</span>
                </div>
                <div className="mkt-faq-item">
                  Which Stripe integrations support Managed Payments?{' '}
                  <span className="mkt-faq-toggle">+</span>
                </div>
                <div className="mkt-faq-item">
                  How does Managed Payments compare to other merchant of record solutions?{' '}
                  <span className="mkt-faq-toggle">+</span>
                </div>
                <div className="mkt-faq-item">
                  Can I use Managed Payments together with other Stripe products?{' '}
                  <span className="mkt-faq-toggle">+</span>
                </div>
                <div className="mkt-faq-item">
                  Is custom pricing available? <span className="mkt-faq-toggle">+</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mkt-col-inset mkt-cta">
          <h2>Ready to get started? Get in touch or create an account.</h2>
          <p>
            Start selling digital goods globally with transparent pay-as-you-go pricing, or contact
            us to discuss custom pricing for your business.
          </p>
          <div className="mkt-cta-actions">
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
