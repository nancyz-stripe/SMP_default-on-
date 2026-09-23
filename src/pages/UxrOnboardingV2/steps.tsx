import {
  CheckRows,
  Choices,
  CountrySelect,
  Check,
  Field,
  FeeLink,
  FieldInfo,
  Headline,
  type Row,
} from './fields'

/** A cut of the onboarding flow: the goods question, the managed-payments choice it
 *  leads straight into, and the domestic upsell that only follows Managed payments.
 *
 *  V1 sits a cross-border brief between the goods question and the choice — a screen
 *  listing what selling abroad brings with it. This version drops it, so the offer
 *  arrives without that framing. That omission is what the research measures. */

export function Welcome({
  location,
  onLocation,
}: {
  location: string
  onLocation: (value: string) => void
}) {
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
      <Field
        id="biz-location"
        label={
          <>
            Business location <FieldInfo />
          </>
        }
      >
        <CountrySelect id="biz-location" value={location} onChange={onLocation} />
      </Field>
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
    title: 'Accept online payments',
    label: 'Sell products or services through an online checkout.',
  },
  {
    title: 'Create subscriptions',
    label: 'Bill for products or services on a recurring schedule.',
  },
  {
    title: 'Build a platform',
    label: 'Let your customers accept payments and receive payouts through your product.',
    info: true,
    note: 'Includes tools for onboarding and verifying seller identity',
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
        What do you need to get started?{' '}
        <span className="muted">You can always change your setup later.</span>
      </Headline>
      <CheckRows items={USE_ROWS} selected={selected} onToggle={onToggle} />
      <span className="text-link">I need something else</span>
    </>
  )
}

const SELL_ROWS: Row[] = [
  {
    // AI products lead the examples: it's the fastest-growing thing sold this way,
    // and it's what a reader scanning for themselves looks for first (Figma
    // 26608:46700).
    title: 'Digital goods',
    label: 'AI products, software as a service, video games, eBooks, online courses and others.',
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
        <span className="muted">This helps tailor our recommendations.</span>
      </Headline>
      <CheckRows items={SELL_ROWS} selected={selected} onToggle={onToggle} />
    </>
  )
}

const MANAGED_CHOICES = [
  {
    title: 'Managed Payments',
    label:
      'Stripe becomes the merchant of record, the business legally responsible for your international sales.',
    benefits: [
      {
        title: 'Reduces declined payments',
        label: 'Stripe collects the payment as a local business, so more of your sales go through.',
      },
      {
        title: 'Takes on tax responsibility',
        label:
          'Stripe registers where needed, charges the right amount, and sends it on—in 80+ countries. Enter a new one and coverage is already there.',
      },
      {
        title: 'Manages disputes and fraud',
        label:
          'If a customer disputes a charge, Stripe responds to their bank for you. It also screens every payment for fraud.',
      },
    ],
    feeNote: '+3.5% per international transaction',
    feeTip: 'This fee is in addition to the standard international processing fee of 3.2%.',
  },
  {
    title: 'I’ll handle this myself',
    label:
      'You stay the merchant of record. You handle taxes, disputes, and fraud in each country—Stripe Tax and Radar can help.',
  },
]

/** The choice, stated beside the globe (Figma 26702:75040). Declining is a second
 *  card rather than a link under the offer, so both options carry the same weight
 *  and the merchant-of-record trade is stated on each side. */
export function ManagedPayments({
  selected,
  onSelect,
  globeHost,
}: {
  selected: number
  onSelect: (index: number) => void
  /** The shared globe is moved into this host while the step is on screen. */
  globeHost: (el: HTMLDivElement | null) => void
}) {
  return (
    <div className="split">
      <div className="split-copy">
        <Headline>
          With Managed Payments, we handle the work of selling globally.{' '}
          <span className="muted">You&rsquo;re covered from your first sale abroad.</span>
        </Headline>
        <Choices items={MANAGED_CHOICES} selected={selected} onSelect={onSelect} />
      </div>
      <div className="split-globe-wrap">
        <div className="split-globe" ref={globeHost}></div>
      </div>
    </div>
  )
}

/** The domestic upsell (Figma 26655:63516, checked state 26669:84902), so it only
 *  follows a Managed payments choice. The price is up whether or not the box is
 *  ticked: it's the cost of ticking it. */
export function DomesticCoverage({
  checked,
  onToggle,
}: {
  checked: boolean
  onToggle: () => void
}) {
  return (
    <>
      <Headline>
        Do you want Managed Payments to cover your domestic sales too?{' '}
        <span className="muted">This will give you full payments coverage.</span>
      </Headline>
      <div className="choice-list">
        <div
          className={`choice-card${checked ? ' selected' : ''}`}
          role="checkbox"
          aria-checked={checked}
          onClick={onToggle}
        >
          <span className="check-box">
            <Check />
          </span>
          <span className="choice-body">
            <span className="choice-title-row">
              <span className="choice-title">Cover domestic sales</span>
            </span>
            <span className="choice-sub">
              We&rsquo;re liable for sales tax in your home market, and we handle fraud, disputes,
              and customer support on every domestic sale.
            </span>
            <FeeLink
              text="+2% per domestic transaction"
              tip="This fee is in addition to the standard domestic processing fee of 2%."
            />
          </span>
        </div>
      </div>
    </>
  )
}

/* --------------------------------------------------------------------------
   Forked from src/flow/sharedSteps.tsx, which the two archive flows still
   share. Copied rather than imported so a change made for research stops
   here — these two screens are identical to theirs today, and the point of
   the fork is that they need not stay that way.
   -------------------------------------------------------------------------- */

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
