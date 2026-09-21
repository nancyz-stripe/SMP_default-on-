import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageRoot } from '../../components/PageRoot'
import { BackHome } from '../../components/BackHome'
import { DashboardShell } from '../../components/DashboardShell'
import { StripeWordmark } from '../../components/StripeWordmark'
import { useFlowEmbed } from '../../components/useFlowEmbed'
import { GlobePanel } from '../../components/GlobePanel'
import { ScopeFeeIcon } from '../../components/ScopeFeeIcon'
import './styles.css'

/** v2 — Autopilot vs Self-managed. Two Autopilot scopes sit inside the
 *  recommended card; choosing Self-managed dims it. */

type Mode = 'cross_border' | 'all' | 'self'

export default function V2Latest() {
  const navigate = useNavigate()
  const { embedded, progress, send } = useFlowEmbed(5)

  // Cross-border is the default scope, and Autopilot is selected with it.
  const [mode, setMode] = useState<Mode>('cross_border')
  const isSelf = mode === 'self'

  /** Clicking anywhere in the Autopilot box selects Autopilot. A click on a
   *  scope card has already set the scope by the time this runs; a click
   *  elsewhere in the box falls back to Cross-border, but never overwrites a
   *  scope already chosen. */
  const selectAutopilot = () => setMode((current) => (current === 'self' ? 'cross_border' : current))

  return (
    <PageRoot slug="v2-latest">
      {!embedded && <BackHome />}

      <DashboardShell />

      <div
        className="modal-backdrop"
        onClick={(e) => {
          // Embedded in the flow, the backdrop isn't an exit.
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
            {/* Left half: content */}
            <div className="modal-left">
              <div className="modal-headline">
                Choose how your payments should be managed.{' '}
                <span className="muted">You can change this anytime.</span>
              </div>

              <div className="mode-group">
                <div
                  className={`autopilot-card${isSelf ? ' dimmed' : ''}`}
                  onClick={selectAutopilot}
                >
                  <div className="highlight-tag">Recommended</div>
                  <div className="autopilot-body">
                    <div>
                      <div className="mode-title">Autopilot</div>
                      <div className="mode-desc">
                        Stripe runs tax, fraud, and disputes end to end, and takes on the work and
                        the risk while lowering your operational overhead.
                      </div>
                    </div>

                    <div className="scope-panel">
                      <div
                        className={`scope-card${mode === 'cross_border' ? ' selected' : ''}`}
                        onClick={() => setMode('cross_border')}
                      >
                        <div className="scope-card-group">
                          <div className="radio-circle">
                            <div className="radio-inner-dot"></div>
                          </div>
                          <div className="scope-text">
                            <div className="scope-title">Cross-border only</div>
                            <div className="scope-desc">Manage only international payments.</div>
                          </div>
                        </div>
                        <div className="scope-fee">
                          3.5% fee
                          <ScopeFeeIcon />
                        </div>
                      </div>

                      <div
                        className={`scope-card${mode === 'all' ? ' selected' : ''}`}
                        onClick={() => setMode('all')}
                      >
                        <div className="scope-card-group">
                          <div className="radio-circle">
                            <div className="radio-inner-dot"></div>
                          </div>
                          <div className="scope-text">
                            <div className="scope-title">All payments</div>
                            <div className="scope-desc">
                              Includes all domestic and International payments.
                            </div>
                          </div>
                        </div>
                        <div className="scope-fee">
                          3.5% fee
                          <ScopeFeeIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`self-card${isSelf ? ' selected' : ''}`}
                  onClick={() => setMode('self')}
                >
                  <div className="mode-title">Self-managed</div>
                  <div className="mode-desc">You handle tax, fraud, and disputes yourself.</div>
                </div>
              </div>
            </div>

            {/* Right half: globe */}
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
