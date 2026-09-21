import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageRoot } from '../../components/PageRoot'
import { BackHome } from '../../components/BackHome'
import { DashboardShell } from '../../components/DashboardShell'
import { OptionCards } from '../../components/OptionCards'
import { useFlowEmbed } from '../../components/useFlowEmbed'
import { Globe } from '../../globe/Globe'
import './styles.css'

/** All volume on autopilot. Same pair of choices as v1, mirrored — the globe
 *  takes the left half here — and opening with the recommended option already
 *  chosen. */
const OPTIONS = [
  {
    id: 'all',
    title: 'All of my payments',
    badge: 'Recommended',
    description:
      'Go fully hands-off — Stripe optimizes every payment method, everywhere, with zero manual configuration.',
  },
  {
    id: 'cross_border',
    title: 'Cross-border payments only',
    description:
      'Let Stripe handle international payment methods while you manage domestic payments yourself.',
  },
]

export default function V2GlobeAllVolume() {
  const navigate = useNavigate()
  const { embedded } = useFlowEmbed(0)
  const [selected, setSelected] = useState<string | null>('all')

  return (
    <PageRoot slug="v2-globe-all-volume">
      {!embedded && <BackHome />}

      <DashboardShell />

      <div
        className="modal-backdrop"
        onClick={(e) => {
          if (!embedded && e.target === e.currentTarget) navigate('/gallery')
        }}
      >
        <div className="modal">
          <div className="modal-split">
            <Globe className="modal-left" id="globe-container" options={{ palette: 'flat' }} />

            <div className="modal-right">
              <div className="modal-headline">
                Put your payments on autopilot.{' '}
                <span className="muted">
                  Let Stripe manage everything — we'll optimize payment methods, handle fraud, tax,
                  and disputes so you don't have to.
                </span>
              </div>

              <OptionCards options={OPTIONS} selected={selected} onSelect={setSelected} />

              <p className="reassurance">
                Changes can be made anytime in Managed Payment settings
              </p>
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
