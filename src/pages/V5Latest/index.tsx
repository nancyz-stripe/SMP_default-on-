import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageRoot } from '../../components/PageRoot'
import { BackHome } from '../../components/BackHome'
import { DashboardShell } from '../../components/DashboardShell'
import { FeeBadge } from '../../components/FeeBadge'
import { GlobePanel } from '../../components/GlobePanel'
import { StripeWordmark } from '../../components/StripeWordmark'
import { useFlowEmbed } from '../../components/useFlowEmbed'
import './styles.css'

/** V5 — v3 simplified (Figma 26340:50383). The headline bundles the
 *  international given with the ask, so there's less to parse before the
 *  domestic toggle, and the fee is a flat 3.5% add-on either way, so the badge
 *  doesn't change with the switch. */
export default function V5Latest() {
  const navigate = useNavigate()
  const { embedded, progress, send } = useFlowEmbed(5)
  const [domestic, setDomestic] = useState(false)

  return (
    <PageRoot slug="v5-latest">
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
                Stripe handles your international payments.{' '}
                <span className="muted">Expand to cover your domestic payments as well.</span>
              </div>

              <div className="coverage-card">
                <div className="coverage-head">
                  <div className="coverage-title-row">
                    <div className="coverage-title">Managed payments</div>
                  </div>
                  <div className="coverage-desc">
                    Stripe manages tax, fraud, and disputes maximizing revenue while lowering your
                    operational overhead.
                  </div>
                </div>

                <div className="coverage-divider"></div>

                <div className="coverage-toggle-row">
                  <div className="coverage-toggle-left">
                    <div
                      className={`switch-el${domestic ? ' on' : ''}`}
                      role="switch"
                      aria-checked={domestic}
                      aria-label="Cover my domestic payments as well"
                      tabIndex={0}
                      onClick={() => setDomestic((on) => !on)}
                      onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                          e.preventDefault()
                          setDomestic((on) => !on)
                        }
                      }}
                    >
                      <div className="switch-thumb"></div>
                    </div>
                    <div className="switch-label">Cover my domestic payments as well</div>
                  </div>
                  {/* One price, reflecting whatever the switch currently covers */}
                  <FeeBadge />
                </div>
              </div>

              <button className="link-later">I'll manage payments myself</button>
            </div>

            <div className="modal-right-wrapper">
              <GlobePanel scale={0.830875} valueCards />
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
