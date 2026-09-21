import type { ReactNode } from 'react'
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

/** A cut of the onboarding flow: the goods question, the cross-border brief it
 *  leads into, the managed-payments choice, and the domestic upsell that only
 *  follows Managed payments. */

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

const BRIEF_ICONS = {
  bank: <path d="M1 4.4L6 1.6l5 2.8M2.2 4.8v4.4M4.7 4.8v4.4M7.3 4.8v4.4M9.8 4.8v4.4M1 10.4h10" />,
  document: (
    <>
      <path d="M3 1.2h3.6L9 3.6v7.2H3z" />
      <path d="M6.4 1.4v2.4h2.4" />
      <path d="M4.4 6.4h3.2M4.4 8.4h3.2" />
    </>
  ),
  warning: (
    <>
      <path d="M6 1.6l4.6 8H1.4z" />
      <path d="M6 4.8v2.4M6 8.6v.4" />
    </>
  ),
}

const BRIEF: { icon: ReactNode; title: ReactNode; label: string }[] = [
  {
    icon: BRIEF_ICONS.bank,
    title: 'Banks are stricter across borders',
    label:
      'Foreign banks decline more payments, even when the card is valid. Every decline is revenue you lose.',
  },
  {
    icon: BRIEF_ICONS.document,
    title: 'Tax rules differ in every country',
    label:
      'Tax is owed where your customer is, and each country has its own process for registering, collecting, and filing.',
  },
  {
    icon: BRIEF_ICONS.warning,
    title: <>Disputes follow your customer&rsquo;s local rules</>,
    label:
      'Each country sets its own process and deadlines, and fraud looks different in each market.',
  },
]

/** The simplified screen (Figma 26702:75374, headline 26799:94394): no gradient, no
 *  globe, no choice to make. The peer group is digital goods sellers rather than
 *  "businesses like yours", and the home market is named, so the list below reads
 *  as what leaving it brings with it.
 *
 *  The share is the design's own "x%" — a placeholder standing in until the figure
 *  is settled, so don't read it as a number that's gone missing. */
export function CrossBorderBrief() {
  return (
    <>
      <Headline>
        x% of digital goods businesses on Stripe sell globally.{' '}
        <span className="muted">
          Here&rsquo;s what comes with selling outside of the United States.
        </span>
      </Headline>
      <div className="brief-card">
        {BRIEF.map((item, i) => (
          <div className="brief-row" key={i}>
            <span className="brief-icon">
              <svg
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {item.icon}
              </svg>
            </span>
            <span style={{ flex: 1 }}>
              <span className="brief-title">{item.title}</span>
              <span className="brief-desc">{item.label}</span>
            </span>
          </div>
        ))}
      </div>
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
