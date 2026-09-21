import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageRoot } from '../../components/PageRoot'
import { BackHome } from '../../components/BackHome'
import { DashboardShell } from '../../components/DashboardShell'
import { FeeBadge } from '../../components/FeeBadge'
import { StripeWordmark } from '../../components/StripeWordmark'
import { useFlowEmbed } from '../../components/useFlowEmbed'
import { GlobePanel } from '../../components/GlobePanel'
import './styles.css'

/** V6 — Auto-pilot vs Self-managed with an expand toggle (Figma 26365:52051).
 *  Same Recommended container as v2, but the nested pair of scope choices is
 *  replaced by a single domestic toggle. */
export default function V6Latest() {
  const navigate = useNavigate()
  const { embedded, progress, send } = useFlowEmbed(5)

  const [selfManaged, setSelfManaged] = useState(false)
  const [domestic, setDomestic] = useState(false)

  return (
    <PageRoot slug="v6-latest">
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
                Choose how your payments should be managed.{' '}
                <span className="muted">
                  Stripe can handle tax, fraud, and disputes for you &mdash; or you can manage them
                  yourself.
                </span>
              </div>

              <div className="mode-group">
                <div
                  className={`autopilot-card${selfManaged ? ' dimmed' : ''}`}
                  onClick={() => setSelfManaged(false)}
                >
                  <div className="highlight-tag">Recommended</div>
                  <div className="autopilot-body">
                    <div>
                      <div className="mode-title">Auto-pilot</div>
                      <div className="mode-desc">
                        Stripe runs tax, fraud, and disputes end to end on your international
                        payments, and takes on the work and the risk while lowering your operational
                        overhead.
                      </div>
                    </div>

                    <div className="coverage-divider"></div>

                    <div className="coverage-toggle-row">
                      <div className="coverage-toggle-left">
                        {/* The switch sits inside the Auto-pilot box, so the
                            click bubbles up — flipping coverage also picks
                            Auto-pilot. */}
                        <div
                          className={`switch-el${domestic ? ' on' : ''}`}
                          onClick={() => setDomestic((on) => !on)}
                        >
                          <div className="switch-thumb"></div>
                        </div>
                        <div className="switch-label">Manage my domestic payments as well</div>
                      </div>
                      <FeeBadge />
                    </div>
                  </div>
                </div>

                <div
                  className={`self-card${selfManaged ? ' selected' : ''}`}
                  onClick={() => setSelfManaged(true)}
                >
                  <div className="mode-title">Self-managed</div>
                  <div className="mode-desc">You handle tax, fraud, and disputes yourself.</div>
                </div>
              </div>
            </div>

            <div className="modal-right-wrapper">
              <GlobePanel scale={0.7225} />
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
