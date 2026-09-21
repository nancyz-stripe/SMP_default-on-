import { useState } from 'react'
import { CountrySelect } from './fields'

export type ActPage = 'act-page-type' | 'act-page-extras' | 'act-page-radar'

/** What the extras page offers. The Continue button carries the choice, so picking
 *  one renames it — and declining coverage is what routes on into Radar. */
type Coverage = 'international coverage' | 'full coverage' | 'no coverage'

/** Account activation, opened from the setup guide's "Verify your account" row. A
 *  page of its own over the dashboard, so it carries its own top bar and closes back
 *  to where it came from.
 *
 *  It opens with nothing chosen on the business-type page, so reopening starts over;
 *  the extras and Radar pages keep their recommended defaults, which is what the
 *  design lands on. */
export function Activation({
  open,
  page,
  onPage,
  onClose,
}: {
  open: boolean
  page: ActPage
  onPage: (page: ActPage) => void
  onClose: () => void
}) {
  const [location, setLocation] = useState('United States')
  const [bizType, setBizType] = useState<string | null>(null)
  const [coverage, setCoverage] = useState<Coverage>('international coverage')
  const [radar, setRadar] = useState('Standard')

  /** Declining coverage hands fraud and tax back to the merchant, so those become
   *  steps of their own and the flow carries on into Radar. Taking coverage has
   *  nowhere further to go yet. */
  const continueCoverage = () => {
    if (coverage === 'no coverage') onPage('act-page-radar')
  }

  const card = (
    selected: boolean,
    badged: boolean,
    title: string,
    desc: string,
    onClick: () => void,
  ) => (
    <button
      className={['act-card', badged && 'act-card-badged', selected && 'selected']
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
    >
      {badged && <span className="act-badge">Recommended</span>}
      <span className="act-card-title">{title}</span>
      <span className="act-card-desc">{desc}</span>
    </button>
  )

  const bizCard = (title: string, desc: string) =>
    card(bizType === title, false, title, desc, () => setBizType(title))

  const coverageCard = (id: Coverage, title: string, desc: string, badged = false) =>
    card(coverage === id, badged, title, desc, () => setCoverage(id))

  const radarCard = (tier: string, title: string, desc: string, badged = false) =>
    card(radar === tier, badged, title, desc, () => setRadar(tier))

  return (
    <div className={`act${open ? ' open' : ''}`}>
      <div className="act-top">
        <svg
          className="act-close"
          onClick={onClose}
          aria-label="Close activation"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        >
          <path d="M2 2l10 10M12 2L2 12" />
        </svg>
        <span className="act-top-sep"></span>
        <span className="act-top-title">Activate your account</span>
      </div>

      <div className={`act-body act-page${page === 'act-page-type' ? ' active' : ''}`}>
        <div className="act-rail">
          <div className="act-stage current">
            <span className="act-marker progress"></span>
            <span className="act-stage-title">Verify your business</span>
          </div>
          <div className="act-subs">
            <div className="act-sub current">
              <span className="act-dot"></span>Business type
            </div>
            <div className="act-sub">
              <span className="act-dot"></span>Business details
            </div>
            <div className="act-sub">
              <span className="act-dot"></span>Products or services
            </div>
            <div className="act-sub">
              <span className="act-dot"></span>Public details
            </div>
          </div>
          <div className="act-stage">
            <span className="act-marker"></span>
            <span className="act-stage-title">Secure your account</span>
          </div>
          <div className="act-stage" onClick={() => onPage('act-page-extras')}>
            <span className="act-marker"></span>
            <span className="act-stage-title">Add extras</span>
          </div>
          <div className="act-stage">
            <span className="act-marker"></span>
            <span className="act-stage-title">Review and submit</span>
          </div>
        </div>

        <div className="act-main">
          <h1 className="act-h1">Let's start with your business type</h1>
          <p className="act-lede">
            This helps Stripe set up your account correctly. Not sure which to choose?{' '}
            <span className="act-link">Learn about business types</span>
          </p>

          <div className="act-field">
            <label className="act-label" htmlFor="act-location">
              Business location{' '}
              <svg
                className="field-info"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11 2.5H5C3.61929 2.5 2.5 3.61929 2.5 5V11C2.5 12.3807 3.61929 13.5 5 13.5H11C12.3807 13.5 13.5 12.3807 13.5 11V5C13.5 3.61929 12.3807 2.5 11 2.5ZM5 1C2.79086 1 1 2.79086 1 5V11C1 13.2091 2.79086 15 5 15H11C13.2091 15 15 13.2091 15 11V5C15 2.79086 13.2091 1 11 1H5Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.25 8C6.25 7.58579 6.58579 7.25 7 7.25H8.25C8.66421 7.25 9 7.58579 9 8V11.5C9 11.9142 8.66421 12.25 8.25 12.25C7.83579 12.25 7.5 11.9142 7.5 11.5V8.75H7C6.58579 8.75 6.25 8.41421 6.25 8Z"
                  fill="currentColor"
                />
                <path
                  d="M6.75 5C6.75 4.31075 7.31075 3.75 8 3.75C8.68925 3.75 9.25 4.31075 9.25 5C9.25 5.68925 8.68925 6.25 8 6.25C7.31075 6.25 6.75 5.68925 6.75 5Z"
                  fill="currentColor"
                />
              </svg>
            </label>
            <CountrySelect id="act-location" value={location} onChange={setLocation} />
          </div>

          <div className="act-field act-field-types">
            <span className="act-label">
              Business type{' '}
              <svg
                className="field-info"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11 2.5H5C3.61929 2.5 2.5 3.61929 2.5 5V11C2.5 12.3807 3.61929 13.5 5 13.5H11C12.3807 13.5 13.5 12.3807 13.5 11V5C13.5 3.61929 12.3807 2.5 11 2.5ZM5 1C2.79086 1 1 2.79086 1 5V11C1 13.2091 2.79086 15 5 15H11C13.2091 15 15 13.2091 15 11V5C15 2.79086 13.2091 1 11 1H5Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.25 8C6.25 7.58579 6.58579 7.25 7 7.25H8.25C8.66421 7.25 9 7.58579 9 8V11.5C9 11.9142 8.66421 12.25 8.25 12.25C7.83579 12.25 7.5 11.9142 7.5 11.5V8.75H7C6.58579 8.75 6.25 8.41421 6.25 8Z"
                  fill="currentColor"
                />
                <path
                  d="M6.75 5C6.75 4.31075 7.31075 3.75 8 3.75C8.68925 3.75 9.25 4.31075 9.25 5C9.25 5.68925 8.68925 6.25 8 6.25C7.31075 6.25 6.75 5.68925 6.75 5Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <div className="act-cards">
              {bizCard(
                'Unregistered business',
                'Owned by one person and not registered with the government',
              )}
              {bizCard('Registered business', 'LLC, partnership, or corporation')}
              {bizCard('Nonprofit organization', 'Tax-exempt organization with 501(c)(3) status')}
              {bizCard('Government entity', 'Federal, state, or local government organization')}
            </div>
          </div>

          <button className="act-continue">Continue</button>
        </div>
      </div>

      {/* Add extras → Fraud protection */}
      <div className={`act-body act-page${page === 'act-page-extras' ? ' active' : ''}`}>
        <div className="act-rail">
          <div className="act-stage" onClick={() => onPage('act-page-type')}>
            <span className="act-marker done">
              <svg
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 6.4l2.6 2.6L10 3.6" />
              </svg>
            </span>
            <span className="act-stage-title">Verify your business</span>
          </div>
          <div className="act-stage linked">
            <span className="act-marker done">
              <svg
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 6.4l2.6 2.6L10 3.6" />
              </svg>
            </span>
            <span className="act-stage-title">Secure your account</span>
          </div>
          <div className="act-stage current linked">
            <span className="act-marker open"></span>
            <span className="act-stage-title">Add extras</span>
          </div>
          <div className="act-subs">
            <div className="act-sub current">
              <span className="act-dot"></span>Managed Payments
            </div>
            <div className="act-sub">
              <span className="act-dot"></span>Climate contributions
            </div>
          </div>
          <div className="act-stage">
            <span className="act-marker"></span>
            <span className="act-stage-title">Review and submit</span>
          </div>
        </div>

        <div className="act-main">
          <h1 className="act-h1">Sell globally without the complexity</h1>
          <p className="act-lede">
            Make Stripe the merchant of record for your sales to simplify your operations and
            maximize global revenue. Choose the coverage that’s right for your business.
            <br />
            <span className="act-link">Learn more about Managed payments</span>
          </p>

          <div className="act-cards act-cards-badged">
            {coverageCard(
              'international coverage',
              'International coverage (+3.5% per transaction)',
              'Have Stripe handle your international sales by reducing declined payments, taking tax responsibility, and managing disputes and fraud.',
              true,
            )}
            {coverageCard(
              'full coverage',
              'Full coverage (+3.5% per international transaction, +2% per domestic transaction)',
              'Have Stripe handle all of your payments, in your home market and abroad.',
            )}
            {coverageCard(
              'no coverage',
              'No coverage',
              'You stay the merchant of record and can use extras like Stripe Tax and Radar to manage taxes and fraud.',
            )}
          </div>

          <button className="act-continue" onClick={continueCoverage}>
            Continue with {coverage}
          </button>
        </div>
      </div>

      {/* Add extras → Fraud protection. Only reachable by declining
           coverage: without Managed Payments, fraud and tax are the
           merchant's own to set up, so they become steps of their own. */}
      <div className={`act-body act-page${page === 'act-page-radar' ? ' active' : ''}`}>
        <div className="act-rail">
          <div className="act-stage" onClick={() => onPage('act-page-type')}>
            <span className="act-marker done">
              <svg
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 6.4l2.6 2.6L10 3.6" />
              </svg>
            </span>
            <span className="act-stage-title">Verify your business</span>
          </div>
          <div className="act-stage linked">
            <span className="act-marker done">
              <svg
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 6.4l2.6 2.6L10 3.6" />
              </svg>
            </span>
            <span className="act-stage-title">Secure your account</span>
          </div>
          <div className="act-stage current linked">
            <span className="act-marker open"></span>
            <span className="act-stage-title">Add extras</span>
          </div>
          <div className="act-subs">
            <div className="act-sub" onClick={() => onPage('act-page-extras')}>
              <span className="act-dot"></span>Managed Payments
            </div>
            <div className="act-sub current">
              <span className="act-dot"></span>Fraud protection
            </div>
            <div className="act-sub">
              <span className="act-dot"></span>Tax calculation
            </div>
            <div className="act-sub">
              <span className="act-dot"></span>Climate contributions
            </div>
          </div>
          <div className="act-stage">
            <span className="act-marker"></span>
            <span className="act-stage-title">Review and submit</span>
          </div>
        </div>

        <div className="act-main">
          <h1 className="act-h1">Protect your business from fraud</h1>
          <p className="act-lede">
            Choose the level of protection that’s right for your business.
            <br />
            <span className="act-link">Learn more about Radar</span>
          </p>

          <div className="act-cards act-cards-badged">
            {radarCard(
              'Standard',
              'Standard ($0.05 per screened transaction)',
              'Protect against a broad range of fraud across all payment methods with AI-based protection. On average, businesses block 42% more fraud compared to Lite.',
              true,
            )}
            {radarCard(
              'Plus',
              'Plus ($0.07 per screened transaction)',
              'Configure Radar for your business with custom rules, risk controls, and advanced analytics.',
            )}
            {radarCard(
              'Pro',
              'Pro ($0.09 per screened transaction)',
              'Get the most advanced protection against emerging fraud threats and customer abuse.',
            )}
          </div>

          <button className="act-continue">Continue with {radar}</button>
          <button className="act-secondary">Use baseline protection with Lite (included)</button>
        </div>
      </div>
    </div>
  )
}
