import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageRoot } from '../../components/PageRoot'
import { BackHome } from '../../components/BackHome'
import { DashboardShell } from '../../components/DashboardShell'
import { GlobePanel } from '../../components/GlobePanel'
import { OptionCards } from '../../components/OptionCards'
import { StripeWordmark } from '../../components/StripeWordmark'
import { useFlowEmbed } from '../../components/useFlowEmbed'
import './styles.css'

/** v1 in the gallery's numbering, v8 on disk — the earliest of the current set:
 *  three choices asked as a plain radio group. */
const OPTIONS = [
  {
    id: 'cross_border',
    title: 'Cross-border payments only',
    description:
      'Hand off the complexity of global selling and grow your cross-border revenue by x%.',
  },
  {
    id: 'all',
    title: 'All of my payments',
    description: 'Hand off operational burdens and maximize revenue at home and globally.',
  },
  {
    id: 'manual',
    title: 'Handle payments myself',
    description: "I'll take care of all the tax, fraud, and disputes myself.",
  },
]

export default function V8Latest() {
  const navigate = useNavigate()
  const { embedded, progress, send } = useFlowEmbed(5)
  const [selected, setSelected] = useState('cross_border')

  return (
    <PageRoot slug="v8-latest">
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
                Where should Stripe manage payments for you?{' '}
                <span className="muted">
                  We'll increase your revenue while managing tax, fraud, and disputes for you.{' '}
                </span>
              </div>

              <OptionCards options={OPTIONS} selected={selected} onSelect={setSelected} />
            </div>

            <div className="modal-right-wrapper">
              <GlobePanel scale={0.85} valueCards />
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
