import { useNavigate } from 'react-router-dom'
import { PageRoot } from '../../components/PageRoot'
import { BackHome } from '../../components/BackHome'
import { BenefitList } from '../../components/BenefitList'
import { DashboardShell } from '../../components/DashboardShell'
import { FeeRate } from '../../components/FeeRate'
import { GlobePanel } from '../../components/GlobePanel'
import { PURPLE_PARTICLES } from '../../components/particles'
import { InfoIcon } from '../../components/InfoIcon'
import { StripeWordmark } from '../../components/StripeWordmark'
import { useFlowEmbed } from '../../components/useFlowEmbed'
import { ADD_ON_RATES, useUpgradeBadge } from '../../components/useUpgradeBadge'
import './styles.css'

/** v3.2 — v3.1 taken in another direction (Figma 26377:65122). The toggle
 *  stands on its own card, separate from the coverage it expands, and the
 *  choreography runs switch → rate swap → badge so the cause reads before the
 *  effect. */
export default function V32Latest() {
  const navigate = useNavigate()
  const { embedded, progress, send } = useFlowEmbed(5)
  const { domestic, toggle, rates, badgeClass, badgeRef, switchClass } = useUpgradeBadge({
    rates: ADD_ON_RATES,
    particles: { colors: PURPLE_PARTICLES, duration: 640, jitter: 220 },
    settle: false,
  })

  return (
    <PageRoot slug="v3-2-latest">
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
                Stripe handles your cross-border payments.{' '}
                <span className="muted">Expand to cover your domestic payments as well.</span>
              </div>

              <div className="coverage-card">
                <div className="coverage-head">
                  <div className="coverage-title-row">
                    <div className="coverage-title">Managed payments</div>
                    <span className={badgeClass} ref={badgeRef}>
                      <FeeRate rate={rates.rate} />
                      <InfoIcon className="fee-icon" />
                      <span className="fee-tooltip">{rates.note}</span>
                    </span>
                  </div>
                  <div className="coverage-desc">
                    Stripe manages tax, fraud, and disputes maximizing revenue while lowering your
                    operational overhead.
                  </div>
                </div>

                <BenefitList
                  items={[
                    'Earn up to x% more on cross border revenue',
                    'Manages all tax liability',
                    'Automate fraud prevention and disputes',
                  ]}
                />
              </div>

              {/* The toggle stands on its own card, separate from the coverage
                  it expands. */}
              <div className="coverage-card toggle-card">
                <div className="coverage-toggle-row">
                  <div className="coverage-toggle-left">
                    <div
                      className={switchClass}
                      role="switch"
                      aria-checked={domestic}
                      aria-label="Manage my domestic payments as well"
                      tabIndex={0}
                      onClick={toggle}
                      onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                          e.preventDefault()
                          toggle()
                        }
                      }}
                    >
                      <div className="switch-thumb"></div>
                    </div>
                    <div className="switch-label">Manage my domestic payments as well</div>
                    {/* The incentive; it's spent once the upgrade is applied. */}
                    <span className={`save-badge${domestic ? ' spent' : ''}`}>Save 2%</span>
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
