import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageRoot } from '../../components/PageRoot'
import { BackHome } from '../../components/BackHome'
import { DashboardShell } from '../../components/DashboardShell'
import { GlobePanel } from '../../components/GlobePanel'
import './styles.css'

/** Nested choices + value cards: the scope sits inside the Automatic card as a
 *  sub-list, which appears only while Automatic is chosen. Picking Automatic
 *  defaults the scope to All payments; picking Manual clears it. */

type Main = 'automatic' | 'manual' | null
type Sub = 'all' | 'crossborder' | null

const SUB_OPTIONS: { id: Exclude<Sub, null>; title: string; desc: string }[] = [
  { id: 'all', title: 'All payments', desc: 'Includes all domestic and international payments.' },
  {
    id: 'crossborder',
    title: 'Cross-border only',
    desc: 'Includes only international payments.',
  },
]

export default function V7ModeNoGradient() {
  const navigate = useNavigate()
  const [main, setMain] = useState<Main>(null)
  const [sub, setSub] = useState<Sub>(null)

  const selectMain = (option: Exclude<Main, null>) => {
    setMain(option)
    setSub(option === 'automatic' ? 'all' : null)
  }

  return (
    <PageRoot slug="v7-mode-no-gradient">
      <BackHome />

      <DashboardShell />

      <div
        className="modal-backdrop"
        onClick={(e) => {
          if (e.target === e.currentTarget) navigate('/gallery')
        }}
      >
        <div className="modal">
          <div className="modal-split">
            <div className="modal-left">
              <div className="modal-headline">
                Choose how your payments should be managed.{' '}
                <span className="muted">
                  Stripe can handle tax, fraud, and disputes for you — or you can manage them
                  yourself.
                </span>
              </div>

              <div className="option-cards" role="radiogroup">
                <div
                  className={`option-card${main === 'automatic' ? ' selected' : ''}`}
                  role="radio"
                  aria-checked={main === 'automatic'}
                  onClick={() => selectMain('automatic')}
                >
                  <div className="radio-circle">
                    <div className="radio-inner-dot"></div>
                  </div>
                  <div className="option-content">
                    <div className="option-title">
                      Automatic
                      <span className="badge-recommended">Recommended</span>
                    </div>
                    <div className="option-description">
                      Stripe manages tax, fraud, and disputes maximizing revenue while lowering your
                      operational overhead.
                    </div>

                    <div
                      className={`sub-options${main === 'automatic' ? ' visible' : ''}`}
                      role="radiogroup"
                    >
                      {SUB_OPTIONS.map((option) => (
                        <div
                          key={option.id}
                          className={`sub-option${sub === option.id ? ' selected' : ''}`}
                          role="radio"
                          aria-checked={sub === option.id}
                          onClick={(e) => {
                            // Choosing a scope shouldn't re-run the parent's
                            // handler, which would reset it to All payments.
                            e.stopPropagation()
                            setSub(option.id)
                          }}
                        >
                          <div className="sub-radio">
                            <div className="sub-radio-inner"></div>
                          </div>
                          <div className="sub-option-content">
                            <div className="sub-option-title">{option.title}</div>
                            <div className="sub-option-desc">{option.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  className={`option-card${main === 'manual' ? ' selected' : ''}`}
                  role="radio"
                  aria-checked={main === 'manual'}
                  onClick={() => selectMain('manual')}
                >
                  <div className="radio-circle">
                    <div className="radio-inner-dot"></div>
                  </div>
                  <div className="option-content">
                    <div className="option-title">Manual</div>
                    <div className="option-description">
                      You handle tax, fraud, and disputes yourself.
                    </div>
                  </div>
                </div>
              </div>

              <p className="reassurance">
                Changes can be made anytime in Managed Payment settings
              </p>
            </div>

            <div className="modal-right-wrapper">
              <GlobePanel scale={0.85} valueCards />
            </div>
          </div>

          <div className="modal-footer">
            <button className="back-link">← Back </button>
            <button className="btn-continue">Continue</button>
          </div>
        </div>
      </div>
    </PageRoot>
  )
}
