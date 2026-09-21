import { useState, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageRoot } from '../../components/PageRoot'
import { StripeLogotype } from '../../components/StripeLogotype'
import type { Scope } from '../../components/pricing'
import { FRAMES, type FrameKey } from './frames'
import type { Choice } from './columns'
import { Step1, Step2, Step3, Step4, type T1, type T2, type T3 } from './steps'
import './styles.css'

/** The B1 flow: four steps, each with treatments that can be swapped from the
 *  control panel, so a review can compare them without leaving the screen. */

const CP_NOTES: Record<string, ReactNode> = {
  '1B': (
    <>
      <b>1B Trigger list, collapsed.</b> Headline claim readable in five seconds, detail on demand.
      Every row says &ldquo;Stripe handles it&rdquo; &mdash; the repetition is the argument.
    </>
  ),
  '1D': (
    <>
      <b>1D Radical restraint.</b> One claim, the anchor copy, nothing else. The control for whether
      step 1 earns its space.
    </>
  ),
  '2B': (
    <>
      <b>2B Asymmetric.</b> Leading candidate. Managed Payments gets primacy; self-managed stays
      complete and correctly priced. Both prices inline, never behind a click.
    </>
  ),
  '2A': (
    <>
      <b>2A Banner + symmetrical columns.</b> The check on 2B: opinion lives in copy, not in visual
      weight. Hardest version to accuse of stacking the deck.
    </>
  ),
  '2C': (
    <>
      <b>2C Workload diff.</b> Patches the frame&rsquo;s weakness &mdash; &ldquo;Stripe handles
      it&rdquo; never says what you&rsquo;d otherwise do. Watch for tipping into fear framing.
    </>
  ),
  '2E': (
    <>
      <b>2E Recommendation first, compare if needed.</b> Accept and decline both sit on the
      recommendation card at equal weight; the comparison is genuinely optional. Price stays on the
      card, so accepting without comparing still exposes it. Now a real candidate, not just an
      instrument &mdash; and the comparison-open rate finally measures something.
    </>
  ),
  '3A': (
    <>
      <b>3A Volume bar.</b> Candidate. The domestic segment turning purple <i>is</i> the disclosure
      &mdash; the change is visible as area, not only as a number.
    </>
  ),
  '3B': (
    <>
      <b>3B Rate table.</b> Most literal disclosure. Risks the four-numbers-at-once problem that
      split steps 2 and 3 in the first place.
    </>
  ),
  '3C': (
    <>
      <b>3C Priced options only.</b> Control. If this is as clear as 3A, the visual isn&rsquo;t
      earning its space.
    </>
  ),
}

export default function V2B1() {
  const [params] = useSearchParams()
  const initialStep = Number.parseInt(params.get('s') ?? '', 10)

  // Deep links so the gallery can point at a specific step or treatment:
  // ?s=2&t2=2C.
  const [step, setStep] = useState(initialStep >= 1 && initialStep <= 4 ? initialStep : 1)
  const [t1, setT1] = useState<T1>((params.get('t1') as T1) || '1B')
  const [t2, setT2] = useState<T2>((params.get('t2') as T2) || '2B')
  const [t3, setT3] = useState<T3>((params.get('t3') as T3) || '3A')
  const [frameKey, setFrameKey] = useState<FrameKey>(() => {
    const f = params.get('frame')
    return f === 'intl' || f === 'bridge' || f === 'growth' ? f : 'bridge'
  })
  // With the stat's position settled, the live question per frame is simply
  // whether it survives without a sourced number.
  const [stat, setStat] = useState(params.get('stat') !== 'off')
  // Landing directly on step 3 or 4 implies the SMP branch was chosen.
  const [choice, setChoice] = useState<Choice>(
    initialStep >= 3 ? (params.get('choice') === 'self' ? 'self' : 'smp') : null,
  )
  const [scope, setScope] = useState<Scope>(params.get('scope') === 'all' ? 'all' : 'intl')

  // `cmpOpened` is sticky: it records that the comparison was consulted at all,
  // which is the thing worth measuring. `cmpOpen` is just current visibility.
  const [cmpOpen, setCmpOpen] = useState(false)
  const [cmpOpened, setCmpOpened] = useState(false)

  const frame = FRAMES[frameKey]

  /** Scope only exists on the SMP branch. Self-managed skips step 3 in both
   *  directions rather than showing a screen that doesn't apply. */
  const go = (delta: number) => {
    let next = step + delta
    if (next === 3 && choice === 'self') next += delta
    setStep(Math.max(1, Math.min(4, next)))
  }

  /** 2E's inline actions decide and advance in one move, so neither choice needs
   *  a trip through the comparison to become selectable. */
  const pickAndGo = (c: Exclude<Choice, null>) => {
    setChoice(c)
    setStep(c === 'self' ? 4 : 3)
  }

  const toggleCompare = () => {
    setCmpOpen((open) => {
      if (!open) setCmpOpened(true)
      return !open
    })
  }

  /** Changing the step-2 treatment resets what that treatment was measuring. */
  const changeT2 = (value: T2) => {
    setT2(value)
    setCmpOpen(false)
    setCmpOpened(false)
    setChoice(null)
  }

  const stage = () => {
    if (step === 1) return <Step1 t1={t1} frame={frame} stat={stat} />
    if (step === 2)
      return (
        <Step2
          t2={t2}
          frame={frame}
          choice={choice}
          onPick={setChoice}
          cmpOpen={cmpOpen}
          cmpOpened={cmpOpened}
          onToggleCompare={toggleCompare}
          onPickAndGo={pickAndGo}
        />
      )
    if (step === 3) return <Step3 t3={t3} scope={scope} onSetScope={setScope} />
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
      // 2E carries its own actions inside the recommendation card, so the footer
      // stays empty until the comparison is open and a column has been picked.
      // No disabled Continue implying a gate that isn't there.
      if (t2 === '2E') {
        if (!cmpOpen)
          return (
            <>
              {back}
              <span></span>
            </>
          )
        return (
          <>
            {back}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {choice === null && (
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Pick either option above, or use the buttons in the recommendation
                </span>
              )}
              <button className="btn btn-primary" disabled={choice === null} onClick={() => go(1)}>
                {choice === 'self'
                  ? 'Continue with self-managed'
                  : 'Continue with Managed Payments'}
              </button>
            </div>
          </>
        )
      }
      return (
        <>
          {back}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {choice === null && (
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Choose an option to continue
              </span>
            )}
            <button className="btn btn-primary" disabled={choice === null} onClick={() => go(1)}>
              Continue
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

  /** The frame is the live decision on steps 1–2, so its note wins there. */
  const note = () => {
    const primary =
      step <= 2 ? (
        frame.note
      ) : step === 3 ? (
        CP_NOTES[t3]
      ) : (
        <>
          <b>Step 4 Confirm.</b> Branches on the step 2 choice. The self-managed branch is the
          honesty test: if it reads as a consolation prize, the recommendation upstream was coercive.
        </>
      )
    return (
      <>
        {primary}
        {step === 1 && <div style={{ marginTop: '8px' }}>{CP_NOTES[t1]}</div>}
        {step === 2 && <div style={{ marginTop: '8px' }}>{CP_NOTES[t2]}</div>}
      </>
    )
  }

  /** One treatment picker. `2E` is marked as an instrument rather than a
   *  candidate, which its own note then qualifies. */
  const picker = <T extends string>(options: T[], value: T, onChange: (value: T) => void) => (
    <div className="cp-btns">
      {options.map((option) => (
        <button
          key={option}
          className={`cp-btn${value === option ? ' on' : ''}${option === '2E' ? ' instr' : ''}`}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  )

  return (
    <PageRoot slug="v2-b1">
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
          <div className="nav-item">Reports</div>
        </div>
        <div className="main-content">
          <div className="content-placeholder"></div>
        </div>
      </div>

      <div className="modal-backdrop">
        <div className="modal">
          <div className="modal-gradient"></div>
          <div className="modal-header">
            <div className="stripe-logo">
              <StripeLogotype fill="#0a2540" width={60} height={25} />
            </div>
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
        <div className="cp-title">B1 flow — treatments</div>

        <div className="cp-group">
          <div className="cp-label">Step</div>
          <div className="cp-btns">
            {[1, 2, 3, 4].map((s) => (
              <button
                key={s}
                className={`cp-btn${step === s ? ' on' : ''}`}
                disabled={s === 3 && choice === 'self'}
                title={s === 3 && choice === 'self' ? 'Self-managed skips scope' : undefined}
                onClick={() => setStep(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="cp-group">
          <div className="cp-label">1 — Framing</div>
          {picker<T1>(['1B', '1D'], t1, setT1)}
        </div>

        <div className="cp-group">
          <div className="cp-label">Frame — international vs. growth</div>
          <div className="cp-btns">
            {(Object.keys(FRAMES) as FrameKey[]).map((key) => (
              <button
                key={key}
                className={`cp-btn${frameKey === key ? ' on' : ''}`}
                onClick={() => setFrameKey(key)}
              >
                {FRAMES[key].label}
              </button>
            ))}
          </div>
        </div>

        <div className="cp-group">
          <div className="cp-label">Peer stat</div>
          <div className="cp-btns">
            {([[true, 'With X%'], [false, 'Without']] as const).map(([value, label]) => (
              <button
                key={label}
                className={`cp-btn${stat === value ? ' on' : ''}`}
                onClick={() => setStat(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="cp-group">
          <div className="cp-label">2 — Recommendation</div>
          {picker<T2>(['2B', '2A', '2C', '2E'], t2, changeT2)}
        </div>

        <div className="cp-group">
          <div className="cp-label">3 — Scope</div>
          {picker<T3>(['3A', '3B', '3C'], t3, setT3)}
        </div>

        <div className="cp-note">{note()}</div>
      </div>
    </PageRoot>
  )
}
