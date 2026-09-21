import { useNavigate } from 'react-router-dom'
import { PageRoot } from '../../components/PageRoot'
import { BackHome } from '../../components/BackHome'
import { BenefitList, RevenueTooltip } from '../../components/BenefitList'
import { CheckBox } from '../../components/CheckBox'
import { DashboardShell } from '../../components/DashboardShell'
import { FeeRate } from '../../components/FeeRate'
import { GlobePanel } from '../../components/GlobePanel'
import { ScopeFeeIcon } from '../../components/ScopeFeeIcon'
import { StripeWordmark } from '../../components/StripeWordmark'
import { useFlowEmbed } from '../../components/useFlowEmbed'
import { useUpgradeBadge } from '../../components/useUpgradeBadge'
import './styles.css'

/** v3.1 — cross-border as the default, with domestic coverage offered as an
 *  upgrade. The fee badge is the upgrade signal: it changes rate and turns
 *  purple when domestic is switched on, and the incentive pill is spent. */
export default function V3Latest() {
  const navigate = useNavigate()
  const { embedded, progress, send } = useFlowEmbed(5)
  const { domestic, toggle, rates, badgeClass, badgeRef } = useUpgradeBadge()

  return (
    <PageRoot slug="v3-latest">
      {!embedded && <BackHome />}

      <DashboardShell />

      <div
        className="modal-backdrop"
        onClick={(e) => {
          if (!embedded && e.target === e.currentTarget) navigate('/gallery')
        }}
      >
        <div className="modal">
          <div className="modal-gradient"></div>
          <div className="modal-header">
            <div className="stripe-logo">
              <StripeWordmark label="" />
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
          </div>

          <div className="modal-split">
            <div className="modal-left">
              <div className="modal-headline">
                Looks like you'll accept international payments. We'll handle them for you.
              </div>

              <div className="coverage-card">
                <div className="coverage-head">
                  <div className="coverage-title-row">
                    <div className="coverage-title">Managed Payments</div>
                    <span className={badgeClass} ref={badgeRef}>
                      <FeeRate rate={rates.rate} />
                      <ScopeFeeIcon className="fee-icon" />
                      <span className="fee-tooltip">{rates.note}</span>
                    </span>
                  </div>
                  <div className="coverage-desc">
                    Stripe will manage your international payments. You can change your setup anytime
                    for specific markets or payments.
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
                    <CheckBox
                      checked={domestic}
                      onToggle={toggle}
                      label="Also manage domestic payments"
                    />
                    <div className="switch-label">Also manage domestic payments</div>
                    {/* The incentive; it's spent once the upgrade is applied. */}
                    <span className={`save-badge${domestic ? ' spent' : ''}`}>Save 30%</span>
                  </div>
                </div>
              </div>

              <button className="link-later">I'll manage payments myself</button>
            </div>

            <div className="modal-right-wrapper">
              <GlobePanel scale={0.7225} valueCards />
            </div>
          </div>

          <div className="modal-footer">
            <button className="back-link" onClick={() => send('back')}>
              ← Back{' '}
            </button>
            <button className="btn-continue" onClick={() => send('next')}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </PageRoot>
  )
}
