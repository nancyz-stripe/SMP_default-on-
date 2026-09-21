import { useState } from 'react'
import { PageRoot } from '../../components/PageRoot'
import { BackHome } from '../../components/BackHome'
import { SandboxShell } from '../../components/SandboxShell'
import { WizardModal } from '../../components/WizardModal'
import { Globe } from '../../globe/Globe'
import './styles.css'

/** Default-on & expand, on a full-bleed gradient: cross-border is taken as
 *  given, and the one question is whether to extend the same coverage to
 *  domestic payments. */
export default function V6FullscreenGradient() {
  const [domestic, setDomestic] = useState(false)

  return (
    <PageRoot slug="v6-fullscreen-gradient">
      <BackHome />

      <SandboxShell />

      <WizardModal
        progress={5}
        behind={
          <>
            <div className="modal-gradient"></div>
            <div className="globe-ring"></div>
            <Globe id="globe-container" />
          </>
        }
      >
        <div className="question-heading">
          Expand your payment management coverage.{' '}
          <span className="muted">
            Stripe already handles tax, fraud, and disputes on your cross-border payments. Extend
            that same coverage to your domestic payments too.
          </span>
        </div>

        <div className="switch-card">
          <div
            className={`switch-toggle${domestic ? ' on' : ''}`}
            role="switch"
            aria-checked={domestic}
            aria-label="Manage my domestic payments as well"
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
          <div className="switch-card-content">
            <div className="switch-card-title">Manage my domestic payments as well</div>
            <div className="switch-card-desc">
              Apply the same automated tax, fraud, and dispute handling to all your domestic
              transactions — zero additional setup required.
            </div>
          </div>
        </div>

        {/* Styled inline in the original — there's no rule for it in the
            stylesheet, so it stays here rather than becoming an invented
            class. */}
        <p style={{ fontSize: '12px', color: '#99a5b8', marginTop: '8px' }}>
          Changes can be made anytime in Managed Payment settings
        </p>
      </WizardModal>
    </PageRoot>
  )
}
