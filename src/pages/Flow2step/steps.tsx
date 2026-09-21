import type { ReactNode } from 'react'
import { Check, Headline } from '../../flow/fields'

/** The cross-border stretch: the brief, the decision, and the domestic upsell
 *  that only follows it. These are what this flow has instead of the merged SMP
 *  screen. */

const ICONS = {
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

function BriefIcon({ children }: { children: ReactNode }) {
  return (
    <span className="brief-icon">
      <svg
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </svg>
    </span>
  )
}

const BRIEF: { icon: ReactNode; title: string; label: string }[] = [
  {
    icon: ICONS.bank,
    title: 'More declined payments',
    label:
      'Foreign banks decline more payments, even when the card is valid. Every decline is revenue you lose.',
  },
  {
    icon: ICONS.document,
    title: 'You’re liable for tax in every market',
    label:
      'Tax is owed where your customer is, not where you are—and you’re responsible for collecting and filing it there.',
  },
  {
    icon: ICONS.warning,
    title: 'Costlier fraud and disputes',
    label:
      'Fraud patterns differ by market. Each dispute follows the rules and deadlines of your customer’s country.',
  },
]

/** What comes with selling internationally. Read-only rows — nothing here is
 *  selectable, which is the point of this screen. */
export function CrossBorderBrief() {
  return (
    <>
      <Headline>
        X% of businesses like yours end up selling internationally as they grow.{' '}
        <span className="muted">Here’s what comes with it.</span>
      </Headline>
      <div className="brief-card">
        {BRIEF.map((item) => (
          <div className="brief-row" key={item.title}>
            <BriefIcon>{item.icon}</BriefIcon>
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

function Tick() {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1.5 6.3l3 3 6-6.6" />
    </svg>
  )
}

/** The billing line: the rate, hoverable for what it sits on top of, then the
 *  rest of the sentence. Hovering the rate must not toggle the card it sits in. */
function FeeLine({ rate, tip, rest }: { rate: string; tip: string; rest: string }) {
  return (
    <>
      <span className="fee-wrap" onClick={(e) => e.stopPropagation()}>
        <span className="fee-link">{rate}</span>
        <span className="fee-tooltip">{tip}</span>
      </span>
      {rest}
    </>
  )
}

type Benefit = { title: string; label: string }

const MANAGED_BENEFITS: Benefit[] = [
  {
    title: 'Reduces declined payments',
    label: 'Stripe collects the payment as a local business, so more of your sales go through.',
  },
  {
    title: 'Takes on tax liability',
    label:
      'Calculates, collects, files, and remits. Enter a new country and coverage is already there.',
  },
  {
    title: 'Manages disputes and fraud',
    label:
      'Screens every payment, handles disputes for you, and answers customer billing questions.',
  },
]

/** The offer, and the decision (Figma 26655:58330). Managed payments is
 *  preselected and carries its benefits; self-managed is the alternative.
 *
 *  Picking the other option collapses the detail to a title and one line, so the
 *  detail belongs to the option being taken rather than arguing with it. */
export function ManagedPayments({
  selected,
  onSelect,
}: {
  selected: number | null
  onSelect: (index: number) => void
}) {
  const cards = [
    {
      title: 'Managed payments',
      label: 'You ship your product. Stripe handles the rest.',
      benefits: MANAGED_BENEFITS,
      fee: (
        <FeeLine
          rate="+3.5% per international transaction"
          tip="3.5% for each international transaction in addition to the standard processing fees."
          rest=". No monthly fee, and nothing to pay until your first international sale."
        />
      ),
    },
    {
      title: 'I’ll handle this myself',
      label:
        'You keep control, with support where you want it — you manage tax, fraud, disputes, and registration in each market. Stripe Tax and Radar can help.',
    },
  ]

  return (
    <>
      <Headline>
        With Stripe Managed Payments, we take on the work of selling internationally.{' '}
        <span className="muted">You’re covered from your first sale abroad.</span>
      </Headline>
      <div className="choice-list">
        {cards.map((card, i) => {
          const on = selected === i
          return (
            <div
              key={card.title}
              className={`choice-card${on ? ' selected' : ''}`}
              role="radio"
              aria-checked={on}
              onClick={() => onSelect(i)}
            >
              <span className="radio">
                <i></i>
              </span>
              <span className="choice-body">
                <span className="choice-title">{card.title}</span>
                <span className="choice-sub">{card.label}</span>
                {on && card.benefits && (
                  <span className="choice-benefits">
                    {card.benefits.map((benefit) => (
                      <span className="choice-benefit" key={benefit.title}>
                        <Tick />
                        <span style={{ flex: 1 }}>
                          <span className="choice-benefit-title">{benefit.title}</span>
                          <span className="choice-benefit-desc">{benefit.label}</span>
                        </span>
                      </span>
                    ))}
                  </span>
                )}
                {on && card.fee && <span className="choice-fee">{card.fee}</span>}
              </span>
            </div>
          )
        })}
      </div>
    </>
  )
}

/** The domestic upsell (Figma 26655:59545, checked state 26655:60228). Ticking it
 *  reveals the billing line, the way the card's own copy does once it applies. */
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
        Want Managed Payments to cover your domestic sales too?{' '}
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
            <span className="choice-title">Cover domestic sales too</span>
            <span className="choice-sub">
              We’re liable for sales tax in your home market, and we handle fraud, disputes, and
              customer support on every domestic sale.
            </span>
            {checked && (
              <span className="choice-fee">
                <FeeLine
                  rate="+2% per domestic transaction"
                  tip="2% for each domestic transaction in addition to the standard processing fees."
                  rest=". No monthly fee, and nothing to pay until your first domestic sale."
                />
              </span>
            )}
          </span>
        </div>
      </div>
    </>
  )
}
