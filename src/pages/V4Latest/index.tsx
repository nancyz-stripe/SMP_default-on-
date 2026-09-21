import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageRoot } from '../../components/PageRoot'
import { BackHome } from '../../components/BackHome'
import { DashboardShell } from '../../components/DashboardShell'
import { InfoIcon } from '../../components/InfoIcon'
import { StripeWordmark } from '../../components/StripeWordmark'
import { useFlowEmbed } from '../../components/useFlowEmbed'
import { Globe } from '../../globe/Globe'
import { useCountUp } from '../../globe/useCountUp'
import type { CoverageMode, GlobeHandle } from '../../globe/createGlobe'
import './styles.css'

/** v4 — Autopilot vs Self-managed, with the globe adapting to the choice. The
 *  globe's dots light outward from the home market as coverage expands, the arcs
 *  switch between domestic and cross-border pairs, and the country count runs up
 *  to meet the selection. */

/** All payments adds the home market on top of the 36 cross-border countries. */
const COVERAGE: Record<CoverageMode, number> = { self: 0, cross_border: 36, all: 37 }

export default function V4Latest() {
  const navigate = useNavigate()
  const { embedded, progress, send } = useFlowEmbed(5)
  const globe = useRef<GlobeHandle>(null)

  // Cross-border is the entry state, and the globe ignites into it once its dot
  // field is ready.
  const [mode, setMode] = useState<CoverageMode>('cross_border')
  const countries = useCountUp(COVERAGE[mode])

  useEffect(() => {
    globe.current?.setMode(mode)
  }, [mode])

  const isSelf = mode === 'self'

  /** Clicking anywhere in the Autopilot box selects Autopilot, keeping an
   *  already-chosen scope; otherwise it falls back to Cross-border. */
  const selectAutopilot = () => setMode((current) => (current === 'all' ? 'all' : 'cross_border'))

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
    <PageRoot slug="v4-latest">
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
                      {scope(
                        'cross_border',
                        'Cross-border only',
                        'Manage only international payments.',
                      )}
                      {scope(
                        'all',
                        'All payments',
                        'Includes all domestic and International payments.',
                      )}
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

            <div className="modal-right-wrapper">
              <CoverageGlobe handleRef={globe} dormant={isSelf} countries={countries} />
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

/** The coverage globe, with the count sitting just under the sphere rather than
 *  at the container's floor — so it tracks the globe's size, not the panel's. */
function CoverageGlobe({
  handleRef,
  dormant,
  countries,
}: {
  handleRef: React.Ref<GlobeHandle>
  dormant: boolean
  countries: number
}) {
  const [diameter, setDiameter] = useState<number | null>(null)

  return (
    <Globe
      className={`modal-right${dormant ? ' dormant' : ''}`}
      id="globe-container"
      options={{ scale: 0.7225, coverage: true }}
      handleRef={handleRef}
      onDiameter={setDiameter}
    >
      <div
        className="globe-glow-circle"
        id="globe-glow-circle"
        style={diameter ? { width: diameter, height: diameter } : undefined}
      ></div>

      <div
        className="globe-coverage"
        style={
          diameter
            ? { top: `calc(50% + ${Math.round(diameter / 2 + 24)}px)`, bottom: 'auto' }
            : undefined
        }
      >
        <span className="globe-coverage-count">{countries}</span> countries
        <br />
        covered by Stripe
      </div>
    </Globe>
  )
}
