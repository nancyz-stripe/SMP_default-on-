import { useState } from 'react'
import type { Coverage } from './data'

/** What the hero's CTA opens (Figma 26767:96108), and the only thing that turns
 *  the account on: confirming moves the page to the with-volume stage and settles
 *  what the scope select is allowed to offer from then on.
 *
 *  It opens on nothing before there's volume, because nothing has been chosen yet,
 *  and on the current choice afterwards, because then it's a settings screen
 *  rather than a decision. */

/** A rate, hoverable for what it sits on top of. Reading the fee shouldn't change
 *  what's selected, as in the onboarding flow. */
function Fee({ rate, tip }: { rate: string; tip: string }) {
  return (
    <span className="fee-link" onClick={(e) => e.stopPropagation()}>
      {rate}
      <span className="fee-tooltip">{tip}</span>
    </span>
  )
}

const INTL_FEE = {
  rate: '+3.5% per international transaction',
  tip: 'This fee is in addition to the standard international processing fee of 3.2%.',
}

const DOM_FEE = {
  rate: '+2% per domestic transaction',
  tip: 'This fee is in addition to the standard domestic processing fee of 2%.',
}

export function CoverageModal({
  initial,
  onClose,
  onConfirm,
}: {
  /** The current choice when this is a settings screen, or null when it's still a
   *  decision. */
  initial: Coverage | null
  onClose: () => void
  onConfirm: (coverage: Coverage) => void
}) {
  const [selected, setSelected] = useState<Coverage | null>(initial)

  const choice = (id: Coverage, title: string, desc: string, price: React.ReactNode) => (
    <div
      className={`choice${selected === id ? ' selected' : ''}`}
      role="radio"
      aria-checked={selected === id}
      tabIndex={0}
      onClick={() => setSelected(id)}
      // Space and Enter pick the focused choice, as they would on a real radio.
      onKeyDown={(e) => {
        if (e.key !== ' ' && e.key !== 'Enter') return
        e.preventDefault()
        setSelected(id)
      }}
    >
      <span className="choice-box">
        <span className="choice-dot"></span>
      </span>
      <span className="choice-text">
        <span className="choice-lines">
          <span className="choice-title">{title}</span>
          <span className="choice-desc">{desc}</span>
        </span>
        <span className="choice-price">{price}</span>
      </span>
    </div>
  )

  return (
    // The backdrop dismisses; the card sitting on it doesn't.
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="coverageTitle">
        <button className="modal-close" aria-label="Close" onClick={onClose}>
          <svg
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          >
            <path d="M2.5 2.5l7 7M9.5 2.5l-7 7" />
          </svg>
        </button>
        <div className="modal-inner">
          <div className="modal-head">
            <div className="modal-title" id="coverageTitle">
              Which payments should Stripe manage?
            </div>
            <p className="modal-sub">
              Managed Payments applies only to the payments you choose. The rest stay on your
              current setup, and you can change this at anytime.
            </p>
          </div>
          <div className="modal-body">
            <div className="choices" role="radiogroup" aria-labelledby="coverageTitle">
              {choice(
                'intl',
                'International payments only',
                'Stripe covers sales outside your country. Domestic sales stay on your current setup.',
                <Fee {...INTL_FEE} />,
              )}
              {choice(
                'all',
                'All payments',
                'Stripe covers every sale, domestic and international.',
                <>
                  <Fee {...INTL_FEE} /> and <Fee {...DOM_FEE} />
                </>,
              )}
            </div>
            <div className="modal-actions">
              <button className="btn-lg btn-neutral" onClick={onClose}>
                Cancel
              </button>
              <button
                className="btn-lg btn-accent"
                disabled={!selected}
                onClick={() => selected && onConfirm(selected)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
