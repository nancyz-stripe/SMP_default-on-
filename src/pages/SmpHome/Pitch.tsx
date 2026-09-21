/** The pitch that stands in for the figures before there are any (Figma
 *  26721:39365). Tax leads: it's the responsibility being handed over, so the
 *  other two read as consequences of it rather than extras. */
export function Pitch({ onSetUp }: { onSetUp: () => void }) {
  return (
    <div className="ap-intro">
      <div className="ap-content">
        <div className="ap-head">
          <div className="ap-title">Grow globally without the complexity</div>
          <p className="ap-desc">
            Focus on growth while Managed Payments handles tax, fraud, disputes, and more as your
            merchant of record.
          </p>
        </div>
        <div className="ap-rows">
          {/* Tax leads: it's the responsibility being handed over, so the
                                 other two read as consequences of it rather than extras. */}
          <div className="ap-row">
            <span className="ap-ico">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 2h5l3 3v9H4z" />
                <path d="M9 2v3h3" />
                <path d="M6 8.5h4M6 11h2.5" />
              </svg>
            </span>
            <span>
              <span className="ap-row-title">Takes on tax responsibility</span>
              <br />
              <span className="ap-row-desc">
                Stripe registers, charges the right amount, and files—in 80+ countries.
              </span>
            </span>
          </div>
          <div className="ap-row">
            <span className="ap-ico">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1.8 11.4l3-4 2.2 1.8 2.4-3.4" />
                {/* filled, or the star closes up into a blob at 16px */}
                <path
                  d="M11.4 1.4l.62 1.72 1.72.62-1.72.62-.62 1.72-.62-1.72-1.72-.62 1.72-.62.62-1.72z"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </span>
            <span>
              <span className="ap-row-title">Reduces declined payments</span>
              <br />
              <span className="ap-row-desc">
                Stripe collects the payment as a local business, so more of your sales go through.
              </span>
            </span>
          </div>
          <div className="ap-row">
            <span className="ap-ico">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 2l5 2v4.2c0 3-2.1 5-5 6.3-2.9-1.3-5-3.3-5-6.3V4l5-2z" />
                <path d="M5.8 8l1.6 1.6L10.4 6.6" />
              </svg>
            </span>
            <span>
              <span className="ap-row-title">Manages disputes and fraud</span>
              <br />
              <span className="ap-row-desc">
                Stripe responds to disputes for you and screens every payment for fraud.
              </span>
            </span>
          </div>
        </div>
        <div className="ap-actions">
          <button className="btn-primary" onClick={onSetUp}>
            Set up Managed Payments
          </button>
          <a className="ap-link">Learn more</a>
        </div>
      </div>
      <div className="ap-art">
        <img src="/assets/ap-intro.png" alt="" />
      </div>
    </div>
  )
}
