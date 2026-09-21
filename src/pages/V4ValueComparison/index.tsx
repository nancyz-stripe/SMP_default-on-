import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageRoot } from '../../components/PageRoot'
import { BackHome } from '../../components/BackHome'
import './styles.css'

/** Value comparison: the two scopes side by side as priced plans, rather than as
 *  a radio group. The right card is a superset of the left, which is what its
 *  first bullet says out loud. */

function Tick() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M3 8.5l3 3 7-7"
        stroke="#675dff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** A dotted orbit with a dial at its centre — the autopilot mark. */
function AutopilotIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="11" stroke="#675dff" strokeWidth="2" strokeDasharray="4 2" />
      <path d="M11 16a5 5 0 0 1 5-5" stroke="#675dff" strokeWidth="2" strokeLinecap="round" />
      <path d="M21 16a5 5 0 0 1-5 5" stroke="#675dff" strokeWidth="2" strokeLinecap="round" />
      <polygon points="11,14 9,16 11,18" fill="#675dff" />
      <polygon points="21,18 23,16 21,14" fill="#675dff" />
      <circle cx="16" cy="16" r="2" fill="#675dff" />
    </svg>
  )
}

/** A globe drawn as meridians — the cross-border mark. */
function GlobeIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="11" stroke="#675dff" strokeWidth="2" />
      <ellipse cx="16" cy="16" rx="5" ry="11" stroke="#675dff" strokeWidth="1.5" />
      <line x1="5" y1="16" x2="27" y2="16" stroke="#675dff" strokeWidth="1.5" />
      <line x1="16" y1="5" x2="16" y2="27" stroke="#675dff" strokeWidth="1.5" strokeOpacity="0.4" />
    </svg>
  )
}

type Plan = {
  id: string
  icon: React.ReactNode
  title: React.ReactNode
  subtitle: string
  bullets: React.ReactNode[]
  cta: string
  ctaClass: string
  badge?: string
}

const PLANS: Plan[] = [
  {
    id: 'crossborder',
    icon: <GlobeIcon />,
    title: 'Cross-border payments',
    subtitle: 'Optimized for international growth',
    bullets: [
      'Local payment methods shown to international customers',
      'Multi-currency optimization and conversion',
      'Cross-border tax and compliance handled',
      'Fraud prevention tuned for each market',
    ],
    cta: 'Select cross-border',
    ctaClass: 'btn-outlined',
  },
  {
    id: 'autopilot',
    icon: <AutopilotIcon />,
    title: <>All payments &mdash; Autopilot mode</>,
    subtitle: 'Hands-off, maximum revenue',
    badge: 'Recommended',
    bullets: [
      'Everything in Cross-border, plus:',
      'Domestic payment method optimization',
      <>Fully automated &mdash; zero operational burden</>,
      'Maximum revenue with no manual configuration',
    ],
    cta: 'Select autopilot',
    ctaClass: 'btn-filled',
  },
]

export default function V4ValueComparison() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <PageRoot slug="v4-value-comparison">
      <BackHome />

      {/* This exploration's own shell: a flat nav list with placeholder icons. */}
      <div className="dashboard">
        <div className="sidebar">
          <div className="sidebar-logo">
            <svg viewBox="0 0 60 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 4.5C5 3.12 6.12 2 7.5 2H12.5C13.88 2 15 3.12 15 4.5V20.5C15 21.88 13.88 23 12.5 23H7.5C6.12 23 5 21.88 5 20.5V4.5Z"
                fill="#635bff"
              />
              <path d="M20 9h4v2h-4v-2zm0 4h6v2h-6v-2zm0-8h8v2h-8v-2z" fill="#353a44" />
            </svg>
          </div>
          {['Home', 'Balances', 'Transactions', 'Customers', 'Product catalog'].map((label) => (
            <div className="nav-item" key={label}>
              <div className="nav-icon"></div>
              {label}
            </div>
          ))}
          <div className="nav-section-label">Products</div>
          {['Connect', 'Payments', 'Billing', 'Reporting', 'More'].map((label) => (
            <div className="nav-item" key={label}>
              <div className="nav-icon"></div>
              {label}
            </div>
          ))}
        </div>
        <div className="main-content"></div>
      </div>

      <div
        className="modal-backdrop"
        onClick={(e) => {
          if (e.target === e.currentTarget) navigate('/gallery')
        }}
      >
        <div className="modal">
          <div className="modal-inner">
            <div className="top-banner">
              This is a starting point &mdash; you can adjust your setup anytime
            </div>

            <div className="modal-header">
              <div className="stripe-logo">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="40" height="40" rx="8" fill="#635bff" />
                  <path
                    d="M19.2 16.6c0-.8.7-1.1 1.8-1.1 1.6 0 3.6.5 5.2 1.4V12c-1.7-.7-3.5-1-5.2-1-4.3 0-7.1 2.2-7.1 5.9 0 5.8 7.9 4.9 7.9 7.4 0 .9-.8 1.2-1.9 1.2-1.7 0-3.8-.7-5.5-1.6v5c1.9.8 3.7 1.1 5.5 1.1 4.4 0 7.3-2.1 7.3-5.9-.1-6.2-8-5.1-8-7.5z"
                    fill="white"
                  />
                </svg>
              </div>
              <h1>How should Stripe manage your payment methods?</h1>
            </div>

            <div className="cards-container">
              {PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`card${selected === plan.id ? ' selected' : ''}`}
                  onClick={() => setSelected(plan.id)}
                >
                  {plan.badge && <div className="card-badge">{plan.badge}</div>}
                  <div className="card-icon">{plan.icon}</div>
                  <div className="card-title">{plan.title}</div>
                  <div className="card-subtitle">{plan.subtitle}</div>
                  <ul className="card-bullets">
                    {plan.bullets.map((bullet, i) => (
                      <li key={i}>
                        <Tick />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`card-btn ${plan.ctaClass}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelected(plan.id)
                    }}
                  >
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-footer">
            <button className="back-link">← Back </button>
            <button className="btn-continue">Continue</button>
          </div>
        </div>
      </div>
    </PageRoot>
  )
}
