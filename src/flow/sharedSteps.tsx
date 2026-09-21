import { CheckRows, Field, Headline, type Row } from './fields'

/** The screens both flows share, unchanged between them. Order and copy follow
 *  the Figma "Onboarding flow" frame (26335:42036). */

export function Welcome() {
  return (
    <>
      <Headline>
        <span className="accent">Welcome to Stripe.</span>{' '}
        <span className="muted">
          Answer a few questions to get the best setup for your business.
        </span>
      </Headline>
      <Field id="biz-name" label="Business name*">
        <input id="biz-name" type="text" placeholder="Acme Inc." />
      </Field>
      <div className="inline-field">
        <span>Business location</span>
        <svg
          className="info-icon"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <rect x="1.5" y="1.5" width="11" height="11" rx="2" />
          <path d="M7 6.2v4M7 4.1v.6" />
        </svg>
        <span>:</span>
        <span className="location-value">
          <span>🇺🇸</span>
          <span>United States</span>
          <svg
            className="chevron"
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1.5 3.5L5 7l3.5-3.5" />
          </svg>
        </span>
      </div>
    </>
  )
}

export function AboutBusiness() {
  return (
    <>
      <Headline>
        Tell us more about your business.{' '}
        <span className="muted">This helps us make setup recommendations for you.</span>
      </Headline>
      <Field id="website" label="Website">
        <input id="website" type="text" />
      </Field>
      <Field id="how-start" label="How do you want to get started?">
        <textarea id="how-start"></textarea>
      </Field>
    </>
  )
}

const USE_ROWS: Row[] = [
  {
    title: 'Non-recurring payments',
    label: 'Let your users collect payments, or collect them yourself and send payouts',
  },
  {
    title: 'Recurring payments',
    label: 'Let your users collect payments, or collect them yourself and send payouts',
  },
  {
    title: 'Build a platform or marketplace',
    label: 'Use Connect to enable money movement between multiple parties.',
  },
]

export function HowToStart({
  selected,
  onToggle,
}: {
  selected: number[]
  onToggle: (index: number) => void
}) {
  return (
    <>
      <Headline>
        Select how you want to use Stripe.{' '}
        <span className="muted">You can always add or remove products later.</span>
      </Headline>
      <CheckRows items={USE_ROWS} selected={selected} onToggle={onToggle} />
      <span className="text-link">I need something else</span>
    </>
  )
}

const SELL_ROWS: Row[] = [
  {
    title: 'Digital goods',
    label: 'Software as a service, video games, eBooks, online courses and others.',
  },
  { title: 'Physical goods', label: 'Magazines, keyboards, food, clothing and others.' },
  { title: 'Services', label: 'Landscaping, hairdressing, training and others.' },
]

export function TypesOfGoods({
  selected,
  onToggle,
}: {
  selected: number[]
  onToggle: (index: number) => void
}) {
  return (
    <>
      <Headline>
        Next, tell us what you sell.{' '}
        <span className="muted">This helps us get you the best setup.</span>
      </Headline>
      <CheckRows items={SELL_ROWS} selected={selected} onToggle={onToggle} />
    </>
  )
}

/** The two setup methods, drawn as mock screens rather than described. */
export function TypeOfSetup({
  selected,
  onSelect,
}: {
  selected: number
  onSelect: (index: number) => void
}) {
  return (
    <>
      <Headline>Choose how you want to set up:</Headline>
      <div className="method-cards">
        <div
          className={`method-card${selected === 0 ? ' selected' : ''}`}
          onClick={() => onSelect(0)}
        >
          <div className="method-art">
            <div className="mock-dash">
              <div className="mock-dash-top">
                <span></span>
              </div>
              <div className="mock-dash-body">
                <div className="mock-dash-nav">
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                </div>
                <div className="mock-dash-main">
                  <i></i>
                  <div className="mock-dash-row">
                    <div className="block"></div>
                    <div className="block sm"></div>
                  </div>
                  <div className="block"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="method-body">
            <div className="method-title">Set up in the Dashboard</div>
            <div className="method-label">Explore your account with a guided setup experience.</div>
          </div>
        </div>

        <div
          className={`method-card${selected === 1 ? ' selected' : ''}`}
          onClick={() => onSelect(1)}
        >
          <div className="method-art">
            <div className="mock-term">
              <svg className="spark" viewBox="0 0 12 12" fill="currentColor">
                <path d="M6 0l1.1 3.3L10.4 4.4 7.1 5.5 6 8.8 4.9 5.5 1.6 4.4 4.9 3.3z" />
                <path d="M10 7.6l.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5L8 9.6l1.5-.5z" />
              </svg>
              <i style={{ width: '34px' }}></i>
              <i style={{ width: '28px' }}></i>
              <i style={{ width: '96px' }}></i>
            </div>
          </div>
          <div className="method-body">
            <div className="method-title">Set up with an AI tool</div>
            <div className="method-label">
              Add Stripe skills to Claude, Cursor, or Codex for integration guidance and best
              practices.
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const SANDBOX_STEPS: [string, string][] = [
  [
    'Complete your setup',
    'Follow the steps in your setup guide to explore features that fit your business needs.',
  ],
  [
    'Switch to live account',
    "When you're ready to go live, answer some questions to verify your business.",
  ],
  ["You're ready to go", 'Copy your work to your live account and start accepting payments.'],
]

export function GetStarted() {
  return (
    <div className="sandbox-split">
      <div className="sandbox-copy">
        <Headline>
          Get started in your sandbox.{' '}
          <span className="muted">
            Your sandbox is a safe environment for testing. You can try out features without any
            real money movement.
          </span>
        </Headline>
        <div className="steps-list">
          {SANDBOX_STEPS.map(([title, label], i) => (
            <div className="steps-list-item" key={title}>
              <span className="step-num">{i + 1}</span>
              <span>
                <span className="step-num-title">{title}</span>
                <span className="step-num-label">{label}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="sandbox-art">
        <div className="sandbox-window">
          <div className="sandbox-window-top">Sandbox</div>
          <div className="sandbox-window-body">
            <div className="sandbox-window-left">
              <span className="sandbox-chip">
                <span className="avatar">M</span>
                <span className="name">matcha</span>
              </span>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </div>
            <div className="sandbox-window-right">
              <i></i>
              <i></i>
              <div className="block"></div>
              <i></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
