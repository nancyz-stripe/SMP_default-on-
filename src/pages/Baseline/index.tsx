import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PageRoot } from '../../components/PageRoot'
import './styles.css'

/** The default baseline, following FOX patterns: one question in a wizard
 *  modal, with the progress bar and footer a multi-step flow would need. Only
 *  one step was ever written, so Back and Continue have nowhere to go — kept
 *  because the shape of the pattern is the point of the comparison. */

type Option = { id: string; title: string; description?: string }

type Step = {
  heading: { question: string; muted: string }
  field: string
  options: Option[]
  progress: number
}

const STEPS: Step[] = [
  {
    heading: {
      question: 'Where should Stripe manage payments for you?',
      muted: "We'll increase your revenue while managing tax, fraud, and disputes for you.",
    },
    field: 'paymentScope',
    options: [
      {
        id: 'cross_border',
        title: 'Cross-border payments only',
        description:
          'Hand off the complexity of global selling and grow your cross-border revenue by x%.',
      },
      {
        id: 'all',
        title: 'All of my payments',
        description: 'Hand off operational burdens and maximize revenue at home and globally.',
      },
      { id: 'decide_later', title: "Customize this later / I'll decide later" },
    ],
    progress: 5,
  },
]

/** The sandbox Dashboard behind the modal — this exploration's own, with the
 *  account switcher and icon-bearing nav the later ones dropped. */
function SandboxShell() {
  const icon = (path: React.ReactNode) => (
    <div className="nav-icon">
      <svg viewBox="0 0 16 16" fill="currentColor">
        {path}
      </svg>
    </div>
  )

  return (
    <div className="shell">
      <div className="account-switcher">
        <div className="account-icon">
          <div className="sandbox-badge"></div>
        </div>
        <div className="account-text">
          <div className="account-name">Default sandbox</div>
          <div className="account-business">Cactus Practice</div>
        </div>
      </div>
      <div className="sidebar" style={{ paddingTop: '56px' }}>
        <div className="sidebar-section">
          <div className="nav-item active">
            {icon(<path d="M8 1l6 5v8a1 1 0 01-1 1H3a1 1 0 01-1-1V6l6-5z" />)}
            <span className="nav-label">Home</span>
          </div>
          <div className="nav-item">
            {icon(<path d="M2 4h12v2H2V4zm1 4h10v6H3V8z" />)}
            <span className="nav-label">Balances</span>
          </div>
          <div className="nav-item">
            {icon(<path d="M8 2a6 6 0 100 12A6 6 0 008 2zm0 2l2 2H6l2-2zm0 8l-2-2h4l-2 2z" />)}
            <span className="nav-label">Transactions</span>
          </div>
          <div className="nav-item">
            {icon(
              <>
                <circle cx="8" cy="5" r="3" />
                <path d="M3 14c0-3 2-5 5-5s5 2 5 5H3z" />
              </>,
            )}
            <span className="nav-label">Customers</span>
          </div>
          <div className="nav-item">
            {icon(<rect x="2" y="3" width="12" height="10" rx="1" />)}
            <span className="nav-label">Product catalog</span>
          </div>
        </div>
        <div className="sidebar-section">
          <div className="sidebar-heading">Products</div>
          <div className="nav-item">
            {icon(<path d="M4 2h8l2 4v8H2V6l2-4z" />)}
            <span className="nav-label">Connect</span>
          </div>
          <div className="nav-item">
            {icon(<path d="M2 4h12v8H2z" />)}
            <span className="nav-label">Payments</span>
          </div>
          <div className="nav-item">
            {icon(<path d="M3 3h10v2H3zm0 4h10v2H3zm0 4h10v2H3z" />)}
            <span className="nav-label">Billing</span>
          </div>
          <div className="nav-item">
            {icon(<path d="M2 3h12v10H2z" />)}
            <span className="nav-label">Reporting</span>
          </div>
          <div className="nav-item">
            {icon(
              <>
                <circle cx="4" cy="8" r="1.5" />
                <circle cx="8" cy="8" r="1.5" />
                <circle cx="12" cy="8" r="1.5" />
              </>,
            )}
            <span className="nav-label">More</span>
          </div>
        </div>
      </div>
      <div className="page-content">
        <div className="page-content-inner"></div>
      </div>
    </div>
  )
}

export default function Baseline() {
  const navigate = useNavigate()
  const [stepIndex, setStepIndex] = useState(0)
  const [selections, setSelections] = useState<Record<string, string>>({})

  const step = STEPS[stepIndex]
  const selected = selections[step.field]

  return (
    <PageRoot slug="baseline">
      <Link className="nav-back" to="/gallery">
        ← Home
      </Link>

      <SandboxShell />

      {/* Dismissing on a backdrop click returns to the gallery. */}
      <div
        className="modal-backdrop"
        onClick={(e) => {
          if (e.target === e.currentTarget) navigate('/gallery')
        }}
      >
        <div className="modal-dialog">
          <div className="modal-header">
            <div className="stripe-logo">
              <svg viewBox="0 0 60 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M60 12.9C60 8.6 57.9 5.3 54 5.3C50.1 5.3 47.6 8.6 47.6 12.9C47.6 17.9 50.5 20.5 54.6 20.5C56.6 20.5 58.1 20 59.3 19.2V16C58.1 16.7 56.7 17.2 55 17.2C53.3 17.2 51.8 16.6 51.6 14.5H59.9C59.9 14.3 60 13.4 60 12.9ZM51.5 11.7C51.5 9.7 52.7 8.9 53.9 8.9C55.1 8.9 56.3 9.7 56.3 11.7H51.5ZM41.2 5.3C39.5 5.3 38.4 6.1 37.8 6.6L37.6 5.6H34V24.5L37.9 23.7V20.1C38.5 20.5 39.4 21.1 40.9 21.1C44.1 21.1 46.9 18.5 46.9 12.9C46.9 8 44 5.3 41.2 5.3ZM40.3 17.5C39.2 17.5 38.6 17.1 38.2 16.7L37.9 9.5C38.3 9.1 39 8.7 40 8.7C41.6 8.7 42.7 10.5 42.7 13.1C42.7 15.8 41.6 17.5 40.3 17.5ZM28.3 4.5L32.2 3.7V0.5L28.3 1.3V4.5ZM28.3 5.6H32.2V20.2H28.3V5.6ZM24.2 6.8L24 5.6H20.5V20.2H24.4V10C25.3 8.8 26.8 9 27.3 9.2V5.6C26.7 5.4 25 5.1 24.2 6.8ZM16.5 2L12.7 2.8V16.1C12.7 18.6 14.6 20.5 17.1 20.5C18.5 20.5 19.5 20.3 20 20V16.8C19.6 17 16.5 17.8 16.5 15.3V9H20V5.6H16.5V2ZM4.7 9.8C4.7 9.2 5.2 8.9 6 8.9C7.1 8.9 8.6 9.2 9.7 9.9V6.2C8.5 5.7 7.3 5.3 6 5.3C2.6 5.3 0.5 7 0.5 9.9C0.5 14.5 6.7 13.8 6.7 15.8C6.7 16.5 6.1 16.8 5.2 16.8C4 16.8 2.4 16.3 1.1 15.5V19.2C2.6 19.9 4 20.2 5.2 20.2C8.7 20.2 10.9 18.6 10.9 15.7C10.9 10.7 4.7 11.5 4.7 9.8Z"
                  fill="#635BFF"
                />
              </svg>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${step.progress}%` }}></div>
            </div>
          </div>

          <div className="modal-body">
            <div className="question-container">
              <div className="question-heading">
                {step.heading.question} <span className="muted">{step.heading.muted}</span>
              </div>
              <div className="options-list">
                {step.options.map((opt) => (
                  <div
                    key={opt.id}
                    className={`option-card${selected === opt.id ? ' selected' : ''}`}
                    onClick={() =>
                      setSelections((current) => ({ ...current, [step.field]: opt.id }))
                    }
                  >
                    <div className="radio-outer">
                      <div className="radio-inner"></div>
                    </div>
                    <div className="option-text">
                      <div className="option-title">{opt.title}</div>
                      {opt.description && (
                        <div className="option-description">{opt.description}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              className="back-link"
              disabled={stepIndex === 0}
              onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
            >
              ← Back{' '}
            </button>
            <div className="footer-right">
              <button
                className="btn-continue"
                disabled={!selected}
                onClick={() => setStepIndex((i) => Math.min(STEPS.length - 1, i + 1))}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageRoot>
  )
}
