import { useState } from 'react'
import { BackHome } from '../../components/BackHome'
import { PageRoot } from '../../components/PageRoot'
import { StripeWordmark } from '../../components/StripeWordmark'
import { Globe } from '../../globe/Globe'
import { ValueCards } from '../../globe/ValueCards'
import { ControlPanel } from './ControlPanel'
import { globeScale, type SmpConfig } from './config'
import { AutopilotPanel, ExpandPanel, ScopePanel } from './panels'
import './styles.css'

/** The merged SMP screen: one modal whose left half is swapped by framework and
 *  whose presentation is set by the other three properties.
 *
 *  It is both a page of its own and step 5 of the onboarding flow. As a page it
 *  owns its config and writes it to the URL; in the flow the parent owns it, and
 *  Back and Continue are handed up. The original did that over postMessage
 *  because the flow loaded this file in an iframe — composed directly, the
 *  callbacks are the whole protocol. */
export function SmpScreen({
  config,
  onConfigChange,
  progress = 5,
  inFlow = false,
  preview = false,
  onNav,
  onHome,
}: {
  config: SmpConfig
  onConfigChange: (key: keyof SmpConfig, value: string) => void
  progress?: number
  inFlow?: boolean
  /** Thumbnails embed this screen; they shouldn't show the panel or the Home
   *  button. */
  preview?: boolean
  onNav?: (dir: 'next' | 'back') => void
  onHome?: () => void
}) {
  const [diameter, setDiameter] = useState<number | null>(null)
  const [box, setBox] = useState<{ width: number; height: number } | null>(null)

  const panel =
    config.framework === 'scope' ? (
      <ScopePanel />
    ) : config.framework === 'autopilot' ? (
      <AutopilotPanel />
    ) : (
      <ExpandPanel />
    )

  return (
    <PageRoot slug="smp">
      {!inFlow && !preview && <BackHome />}
      {!preview && <ControlPanel config={config} onChange={onConfigChange} />}

      <div className="dashboard">
        <div className="sidebar">
          <div className="sidebar-logo">
            <svg viewBox="0 0 60 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.8 4.4C8.8 3.2 9.7 2.7 11.2 2.7C13.4 2.7 16.2 3.4 18.4 4.7V0.5C16 -0.4 13.6 -0.1 11.2 0C5.6 0 2 3 2 7.4C2 14.2 11.6 13 11.6 15.9C11.6 17.3 10.4 17.8 8.9 17.8C6.5 17.8 3.4 16.8 1 15.3V19.6C3.6 20.8 6.3 21.3 8.9 21.3C14.6 21.3 18.4 18.5 18.4 14C18.4 6.7 8.8 8.1 8.8 4.4Z"
                fill="#635BFF"
              />
            </svg>
          </div>
          <div className="nav-item active">Home</div>
          <div className="nav-item">Payments</div>
          <div className="nav-item">Balances</div>
          <div className="nav-item">Customers</div>
          <div className="nav-item">Products</div>
          <div className="nav-item">Settings</div>
        </div>
        <div className="main-content">
          <div className="content-placeholder"></div>
        </div>
      </div>

      <div
        className="modal-backdrop"
        onClick={(e) => {
          if (e.target === e.currentTarget) onHome?.()
        }}
      >
        <div className="modal">
          <div className="modal-gradient" data-grad={config.gradient}></div>
          <div className="modal-header">
            <div className="stripe-logo">
              <StripeWordmark label="" />
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
          </div>

          {/* The gradient is mirrored onto the split so panel CSS can key off
              framework and gradient together — the gradient decides whether
              unselected choices need a border to separate from the background. */}
          <div className="modal-split" data-fw={config.framework} data-grad={config.gradient}>
            <div className="modal-left">{panel}</div>

            <div className="modal-right-wrapper">
              <Globe
                // The sphere, dots and arcs are built at a fixed radius, and the
                // framework changes the split ratio the globe measures against,
                // so both need the scene rebuilt. The original reloaded the page
                // to get that; remounting is enough.
                key={`${config.globe}-${config.framework}`}
                className={`modal-right${config.cards === 'off' ? ' no-cards' : ''}`}
                id="globe-container"
                options={{ scale: globeScale(config.globe) }}
                onDiameter={setDiameter}
                onBox={setBox}
              >
                <div
                  className="globe-glow-circle"
                  id="globe-glow-circle"
                  style={diameter ? { width: diameter, height: diameter } : undefined}
                ></div>
                <ValueCards diameter={diameter} box={box} enabled={config.cards === 'on'} />
              </Globe>
            </div>
          </div>

          <div className="modal-footer">
            <button className="back-link" onClick={() => onNav?.('back')}>
              ← Back{' '}
            </button>
            <button className="btn-continue" onClick={() => onNav?.('next')}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </PageRoot>
  )
}
