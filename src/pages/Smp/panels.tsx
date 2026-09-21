import { useState } from 'react'
import { BenefitList, RevenueTooltip } from '../../components/BenefitList'
import { CheckBox } from '../../components/CheckBox'
import { FeeRate } from '../../components/FeeRate'
import { InfoIcon } from '../../components/InfoIcon'
import { useUpgradeBadge } from '../../components/useUpgradeBadge'

/** The left half of the modal, one panel per framework. These are the three
 *  option models the merged screen switches between; everything else about the
 *  screen is presentational. */

/** A fee pill with its own copy, sitting inside an option's title. It stops the
 *  click from selecting the card it's in. */
function InlineFee({ rate, note }: { rate: string; note: string }) {
  return (
    <span className="fee-badge" onClick={(e) => e.stopPropagation()}>
      {rate} <InfoIcon />
      <span className="fee-tooltip">{note}</span>
    </span>
  )
}

/** V1 — choose your scope. Two priced options, each stating its own rate. */
export function ScopePanel() {
  const [selected, setSelected] = useState('cross_border')

  const options = [
    {
      id: 'cross_border',
      title: 'International payments only',
      fee: '+3.5% per transaction',
      note: 'This fee is additional to standard processing fees (3.4% for international).',
      description:
        'Hand off the complexity of global selling and grow your international revenue by x%.',
    },
    {
      id: 'all',
      title: 'All of my payments',
      fee: '+2.5% per transaction',
      note: 'This fee is additional to standard processing fees (3.4% for international and 2.9% for domestic).',
      description: 'Hand off operational burdens and maximize revenue at home and globally.',
    },
  ]

  return (
    <>
      <div className="modal-headline">
        Where should Stripe manage payments for you?{' '}
        <span className="muted">
          We'll increase your revenue while managing tax, fraud, and disputes for you.{' '}
        </span>
      </div>

      <div className="option-cards" role="radiogroup">
        {options.map((option) => (
          <div
            key={option.id}
            className={`option-card${selected === option.id ? ' selected' : ''}`}
            role="radio"
            aria-checked={selected === option.id}
            onClick={() => setSelected(option.id)}
          >
            <div className="radio-circle">
              <div className="radio-inner-dot"></div>
            </div>
            <div className="option-content">
              <div className="option-title">
                {option.title}
                <InlineFee rate={option.fee} note={option.note} />
              </div>
              <div className="option-description">{option.description}</div>
            </div>
          </div>
        ))}
      </div>

      <button className="link-later">I'll handle payments myself</button>
    </>
  )
}

/** V2 — Autopilot vs Self-managed, with the scope nested inside the recommended
 *  card. */
export function AutopilotPanel() {
  const [mode, setMode] = useState<'cross_border' | 'all' | 'self'>('cross_border')
  const isSelf = mode === 'self'

  const scope = (id: 'cross_border' | 'all', title: string, desc: string) => (
    <div className={`scope-card${mode === id ? ' selected' : ''}`} onClick={() => setMode(id)}>
      <div className="scope-card-group">
        <div className="radio-circle">
          <div className="radio-inner-dot"></div>
        </div>
        <div className="scope-text">
          <div className="scope-title">{title}</div>
          <div className="scope-desc">{desc}</div>
        </div>
      </div>
      <div className="scope-fee">
        3.5% fee
        <InfoIcon />
      </div>
    </div>
  )

  return (
    <>
      <div className="modal-headline">
        Choose how your payments should be managed.{' '}
        <span className="muted">You can change this anytime.</span>
      </div>

      <div className="mode-group">
        <div
          className={`autopilot-card${isSelf ? ' dimmed' : ''}`}
          // Clicking anywhere in the box selects Autopilot, keeping whichever
          // scope was already chosen.
          onClick={() => setMode((current) => (current === 'self' ? 'cross_border' : current))}
        >
          <div className="highlight-tag">Recommended</div>
          <div className="autopilot-body">
            <div>
              <div className="mode-title">Autopilot</div>
              <div className="mode-desc">
                Stripe runs tax, fraud, and disputes end to end, and takes on the work and the risk
                while lowering your operational overhead.
              </div>
            </div>
            <div className="scope-panel">
              {scope('cross_border', 'Cross-border only', 'Manage only international payments.')}
              {scope('all', 'All payments', 'Includes all domestic and International payments.')}
            </div>
          </div>
        </div>

        <div className={`self-card${isSelf ? ' selected' : ''}`} onClick={() => setMode('self')}>
          <div className="mode-title">Self-managed</div>
          <div className="mode-desc">You handle tax, fraud, and disputes yourself.</div>
        </div>
      </div>
    </>
  )
}

/** SMP — upgrade. Cross-border is taken as given; domestic coverage is the
 *  upgrade, and the badge is what registers it. */
export function ExpandPanel() {
  const { domestic, toggle, rates, badgeClass, badgeRef } = useUpgradeBadge()

  return (
    <>
      <div className="modal-headline">
        Looks like you'll accept international payments. We'll handle them for you.
      </div>

      <div className="coverage-card">
        <div className="coverage-head">
          <div className="coverage-title-row">
            <div className="coverage-title">Managed Payments</div>
            <span className={badgeClass} ref={badgeRef}>
              <FeeRate rate={rates.rate} />
              <InfoIcon className="fee-icon" />
              <span className="fee-tooltip">{rates.note}</span>
            </span>
          </div>
          <div className="coverage-desc">
            Stripe will manage your international payments. You can change your setup anytime for
            specific markets or payments.
          </div>
        </div>

        <BenefitList
          items={[
            <>
              Earn up to X% <RevenueTooltip>more revenue</RevenueTooltip>
            </>,
            'Global tax liability coverage',
            'Stripe handles fraud prevention, disputes, and customer support',
          ]}
        />

        <div className="coverage-divider"></div>

        <div className="coverage-toggle-row">
          <div className="coverage-toggle-left">
            <CheckBox checked={domestic} onToggle={toggle} label="Also manage domestic payments" />
            <div className="switch-label">Also manage domestic payments</div>
            {/* The incentive; it's spent once the upgrade is applied. */}
            <span className={`save-badge${domestic ? ' spent' : ''}`}>Save 30%</span>
          </div>
        </div>
      </div>

      <button className="link-later">I'll manage payments myself</button>
    </>
  )
}
