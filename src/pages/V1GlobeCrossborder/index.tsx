import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageRoot } from '../../components/PageRoot'
import { BackHome } from '../../components/BackHome'
import { DashboardShell } from '../../components/DashboardShell'
import { OptionCards } from '../../components/OptionCards'
import { useFlowEmbed } from '../../components/useFlowEmbed'
import { Globe } from '../../globe/Globe'
import './styles.css'

/** Automatic vs Manual: a split modal with the globe on the right. The earliest
 *  of the globe explorations — it opens with neither option chosen, and the
 *  globe is the large, flat-lit variant with no glow circle behind it. */
const OPTIONS = [
  {
    id: 'automatic',
    title: 'Automatic',
    badge: 'Recommended',
    description:
      'Stripe manages tax, fraud, and disputes across all your domestic and cross-border payments — maximizing revenue while lowering your operational overhead.',
  },
  {
    id: 'manual',
    title: 'Manual',
    description:
      'You handle tax, fraud, and disputes yourself. You control which payment methods are shown and manage compliance on your own.',
  },
]

export default function V1GlobeCrossborder() {
  const navigate = useNavigate()
  const { embedded } = useFlowEmbed(0)
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <PageRoot slug="v1-globe-crossborder">
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
            <div className="modal-left">
              <div className="modal-headline">
                Choose how your payments should be managed.{' '}
                <span className="muted">
                  Stripe can handle tax, fraud, and disputes for you — or you can manage them
                  yourself.
                </span>
              </div>

              <OptionCards options={OPTIONS} selected={selected} onSelect={setSelected} />

              <p className="reassurance">Changes can be made anytime in Managed Payment settings</p>
            </div>

            <div className="modal-right-wrapper">
              <Globe className="modal-right" id="globe-container" options={{ palette: 'flat' }} />
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
