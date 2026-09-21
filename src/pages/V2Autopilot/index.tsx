import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { PageRoot } from '../../components/PageRoot'
import { StripeLogotype } from '../../components/StripeLogotype'
import type { Scope } from '../../components/pricing'
import { Step1, Step2, Step3, Step4, type Choice } from './steps'
import './styles.css'

/** The autopilot framing, as a four-step narrative with a control panel for
 *  jumping around it. The panel is the point: it's a review tool, so every
 *  branch can be reached directly. */

const NOTES: Record<number, React.ReactNode> = {
  1: (
    <>
      <b>Step 1 &mdash; Engaged.</b> The instrument panel is the argument: every row reads
      &ldquo;Standing by&rdquo; because nothing has happened yet. Conditional engagement becomes
      visible instead of a promise you have to take on faith.
    </>
  ),
  2: (
    <>
      <b>Step 2 &mdash; Autopilot or the controls.</b> &ldquo;Take the controls&rdquo; is the reason
      to run this framing: the first self-managed label that sounds skilled rather than apologetic
      or contrarian.
    </>
  ),
  3: (
    <>
      <b>Step 3 &mdash; Which legs.</b> Scope reads naturally as phases of a route. Both timings
      stated symmetrically &mdash; the honest difference is conditional vs. near-certain, not later
      vs. today.
    </>
  ),
  4: (
    <>
      <b>Step 4 &mdash; Confirm.</b> &ldquo;Who sells&rdquo; is now an explicit row. On the manual
      branch, &ldquo;you remain the merchant of record&rdquo; is the cost of taking the controls.
    </>
  ),
}

export default function V2Autopilot() {
  const [params] = useSearchParams()

  // The entry state can be set from the query, so a particular branch can be
  // linked to directly.
  const [step, setStep] = useState(() => {
    const s = Number.parseInt(params.get('s') ?? '', 10)
    return s >= 1 && s <= 4 ? s : 1
  })
  const [exception, setException] = useState(params.get('exception') !== 'off')
  const [choice, setChoice] = useState<Choice>(() => {
    const s = Number.parseInt(params.get('s') ?? '', 10)
    if (!(s >= 3)) return null
    return params.get('choice') === 'self' ? 'self' : 'smp'
  })
  const [scope, setScope] = useState<Scope>(params.get('scope') === 'all' ? 'all' : 'intl')

  /** Manual has no scope to choose, so stepping over step 3 skips it in
   *  whichever direction you're travelling. */
  const go = (delta: number) => {
    let next = step + delta
    if (next === 3 && choice === 'self') next += delta
    setStep(Math.max(1, Math.min(4, next)))
  }

  const stage = () => {
    if (step === 1) return <Step1 />
    if (step === 2) return <Step2 choice={choice} exception={exception} onPick={setChoice} />
    if (step === 3) return <Step3 scope={scope} onSetScope={setScope} />
    return <Step4 choice={choice} scope={scope} />
  }

  const footer = () => {
    const back =
      step > 1 ? (
        <button className="btn-ghost" onClick={() => go(-1)}>
          Back
        </button>
      ) : (
        <span></span>
      )

    if (step === 2) {
      const ready = choice !== null
      return (
        <>
          {back}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {!ready && (
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Choose how you want to fly
              </span>
            )}
            <button className="btn btn-primary" disabled={!ready} onClick={() => go(1)}>
              {choice === 'self' ? 'Take the controls' : 'Leave autopilot on'}
            </button>
          </div>
        </>
      )
    }

    if (step === 4) {
      return (
        <>
          {back}
          <div>
            <button className="btn btn-primary" onClick={() => alert('End of prototype.')}>
              Done
            </button>
          </div>
        </>
      )
    }

    return (
      <>
        {back}
        <div>
          <button className="btn btn-primary" onClick={() => go(1)}>
            Continue
          </button>
        </div>
      </>
    )
  }

  return (
    <PageRoot slug="v2-autopilot">
      <div className="dashboard">
        <div className="sidebar">
          <div className="sidebar-logo">
            <StripeLogotype fill="#675dff" width={60} height={24} />
          </div>
          <div className="nav-item">Home</div>
          <div className="nav-item">Balances</div>
          <div className="nav-item">Transactions</div>
          <div className="nav-item active">Get started</div>
          <div className="nav-item">Products</div>
        </div>
        <div className="main-content">
          <div className="content-placeholder"></div>
        </div>
      </div>

      <div className="modal-backdrop">
        <div className="modal">
          <div className="modal-gradient"></div>
          <div className="modal-header">
            <StripeLogotype fill="#0a2540" width={64} height={26} />
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(step / 4) * 100}%` }}></div>
            </div>
          </div>
          <div className="modal-body">
            <div className="inner">{stage()}</div>
          </div>
          <div className="modal-footer">{footer()}</div>
        </div>
      </div>

      <div className="control-panel">
        <div className="cp-title">Autopilot framing</div>
        <div className="cp-group">
          <div className="cp-label">Step</div>
          <div className="cp-btns">
            {[1, 2, 3, 4].map((s) => (
              <button
                key={s}
                className={`cp-btn${step === s ? ' on' : ''}`}
                disabled={s === 3 && choice === 'self'}
                title={s === 3 && choice === 'self' ? 'Manual skips scope' : undefined}
                onClick={() => setStep(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="cp-group">
          <div className="cp-label">Merchant-of-record exception</div>
          <div className="cp-btns">
            {(
              [
                ['on', 'Shown'],
                ['off', 'Hidden'],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                className={`cp-btn${(exception ? 'on' : 'off') === value ? ' on' : ''}`}
                onClick={() => setException(value === 'on')}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="cp-note">
          {NOTES[step]}
          {step === 2 && !exception && (
            <div className="cp-warn" style={{ marginTop: '8px' }}>
              <b>Exception hidden.</b> This is the version where the metaphor actively misleads: a
              plane&rsquo;s autopilot never transfers liability, and this does. Useful to compare,
              not to ship.
            </div>
          )}
        </div>
      </div>
    </PageRoot>
  )
}
