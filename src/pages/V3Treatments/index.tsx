import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DoneRow } from '../../components/DoneRow'
import { PageRoot } from '../../components/PageRoot'
import { StripeLogotype } from '../../components/StripeLogotype'
import { MIX, RATE, effRate, intlRate, pct } from '../../components/pricing'
import { NARRATIVES, TREATMENTS, TREATMENT_NOTES, type NarrativeKey } from './narratives'
import { Screen1, type TreatmentKey } from './screen1'
import './styles.css'

/** V3 — four design treatments over the same three screens. The treatment rides
 *  on the modal as a data attribute, which is what the stylesheet keys its
 *  surface and type scale off. */

type Choice = 'smp' | 'self' | null

export default function V3Treatments() {
  const [params] = useSearchParams()

  const [treatment, setTreatment] = useState<TreatmentKey>(() => {
    const t = params.get('t')
    return t && t in TREATMENTS ? (t as TreatmentKey) : 'handoff'
  })
  const [nar, setNar] = useState<NarrativeKey>(() => {
    const n = params.get('n')
    return n === 'ready' || n === 'evidence' || n === 'alone' ? n : 'alone'
  })
  const [step, setStep] = useState(() => {
    const s = Number.parseInt(params.get('s') ?? '', 10)
    return s >= 1 && s <= 3 ? s : 1
  })
  const [choice, setChoice] = useState<Choice>(() => {
    const s = Number.parseInt(params.get('s') ?? '', 10)
    if (s !== 3) return null
    return params.get('choice') === 'self' ? 'self' : 'smp'
  })
  const [domestic, setDomestic] = useState(false)

  const n = NARRATIVES[nar]
  // Editorial's whole point is the larger type, so its heading class differs.
  const H = treatment === 'editorial' ? 'ed-lede' : 'lede'

  const screen2 = () => (
    <>
      <h1 className={`${H} seq`} style={{ animationDelay: '60ms' }}>
        We&rsquo;d handle your international sales for you.{' '}
        <span className="muted">Or you can handle them yourself &mdash; both work.</span>
      </h1>
      <div className="choices seq" style={{ animationDelay: '200ms' }}>
        <div className={`choice${choice === 'smp' ? ' on' : ''}`} onClick={() => setChoice('smp')}>
          <div className="choice-head">
            <span className="choice-title">We handle it</span>
            <span className="tag-rec">Recommended</span>
          </div>
          <div className="choice-line">
            We deal with each thing as it comes up, and tell you what happened.
          </div>
          <div className="choice-price">
            {pct(intlRate())} on international sales
            <small>{pct(RATE.dom)} on domestic, unchanged. Nothing until you sell abroad.</small>
          </div>
        </div>
        <div className={`choice${choice === 'self' ? ' on' : ''}`} onClick={() => setChoice('self')}>
          <div className="choice-head">
            <span className="choice-title">You handle it</span>
            <span className="tag-alt">Also supported</span>
          </div>
          <div className="choice-line">
            You&rsquo;ll see the same things we would, and decide what to do.
          </div>
          <div className="choice-price">
            {pct(RATE.intl)} on international sales
            <small>{pct(RATE.dom)} on domestic. No added fee.</small>
          </div>
        </div>
      </div>
      <p className="quiet seq" style={{ animationDelay: '340ms' }}>
        You can switch either way later.
      </p>
    </>
  )

  const screen3 = () => {
    if (choice === 'self') {
      return (
        <>
          <h1 className={`${H} seq`} style={{ animationDelay: '60ms' }}>
            You&rsquo;ve got it from here.{' '}
            <span className="muted">We&rsquo;ll keep you posted either way.</span>
          </h1>
          <div className="seq" style={{ animationDelay: '200ms' }}>
            <DoneRow>
              Standard pricing &mdash; <b>{pct(RATE.dom)}</b> domestic, <b>{pct(RATE.intl)}</b>{' '}
              international. No added fee.
            </DoneRow>
            <DoneRow>
              You&rsquo;ll see the same things we&rsquo;d see: tax thresholds as you approach them,
              disputes as they land.
            </DoneRow>
            <DoneRow>
              Handling them is yours &mdash; registration, dispute responses, fraud rules.
            </DoneRow>
          </div>
          <p className="quiet seq" style={{ animationDelay: '360ms' }}>
            Stripe Tax, Radar, and dispute tools are there when you want them.
            <span className="todo-flag">Needs the real list</span>
          </p>
          <p className="quiet seq" style={{ animationDelay: '420ms' }}>
            If you&rsquo;d rather hand it over later, you can do that any time.
          </p>
        </>
      )
    }

    return (
      <>
        <h1 className={`${H} seq`} style={{ animationDelay: '60ms' }}>
          Done &mdash; we&rsquo;ve got your international sales.{' '}
          <span className="muted">Nothing else for you to do.</span>
        </h1>
        <div className="seq" style={{ animationDelay: '200ms' }}>
          <DoneRow>
            We handle tax, disputes, fraud, and local payment methods on sales outside your market.
          </DoneRow>
          <DoneRow>
            You&rsquo;ll hear from us when something happens &mdash; what it was, and what we did.
          </DoneRow>
          <DoneRow>
            <b>{pct(intlRate())}</b> on international sales. It starts the first time you make one.
          </DoneRow>
        </div>
        <div className="expand seq" style={{ animationDelay: '340ms' }}>
          <div className="expand-title">Want us to handle your local sales too?</div>
          <div className="expand-body">
            Same thing, across your whole business &mdash; one way of working rather than two.
          </div>
          <div className="expand-row">
            <span className="expand-when">
              {domestic ? (
                <>
                  <b>Starts with your next sale, wherever it is.</b> Your domestic rate goes from{' '}
                  {pct(RATE.dom)} to {pct(RATE.dom + RATE.smp)}.
                </>
              ) : (
                <>
                  <b>Off.</b> Your domestic sales stay at {pct(RATE.dom)}, exactly as they are.
                </>
              )}
            </span>
            <button
              className={`switch${domestic ? ' on' : ''}`}
              role="switch"
              aria-checked={domestic}
              aria-label="Handle local sales too"
              onClick={() => setDomestic((on) => !on)}
            >
              <i></i>
            </button>
          </div>
          <div className="rate-line">
            <span>
              Blended rate on an illustrative {MIX.dom}/{MIX.intl} split
            </span>
            <b>{pct(effRate(domestic ? 'all' : 'intl'))}</b>
          </div>
        </div>
        <p className="quiet seq" style={{ animationDelay: '440ms' }}>
          Change or turn this off any time in payment settings.
        </p>
      </>
    )
  }

  const go = (delta: number) => setStep((s) => Math.max(1, Math.min(3, s + delta)))

  const footer = () => {
    const back =
      step > 1 ? (
        <button className="btn-ghost" onClick={() => go(-1)}>
          Back
        </button>
      ) : (
        <span></span>
      )
    if (step === 1)
      return (
        <>
          {back}
          <button className="btn btn-primary" onClick={() => go(1)}>
            Continue
          </button>
        </>
      )
    if (step === 2)
      return (
        <>
          {back}
          <button className="btn btn-primary" disabled={choice === null} onClick={() => go(1)}>
            {choice === 'self' ? <>I&rsquo;ll handle it</> : 'Sounds good'}
          </button>
        </>
      )
    return (
      <>
        {back}
        <button className="btn btn-primary" onClick={() => alert('End of prototype.')}>
          Done
        </button>
      </>
    )
  }

  return (
    <PageRoot slug="v3-treatments">
      <div className="dashboard">
        <div className="sidebar">
          <div className="sidebar-logo">
            <StripeLogotype fill="#675dff" width={60} height={24} />
          </div>
          <div className="nav-item">Home</div>
          <div className="nav-item">Balances</div>
          <div className="nav-item active">Get started</div>
          <div className="nav-item">Products</div>
        </div>
        <div className="main-content">
          <div className="content-placeholder"></div>
        </div>
      </div>

      <div className="modal-backdrop">
        <div className="modal" data-t={treatment}>
          <div className="modal-wash"></div>
          <div className="modal-header">
            <div className="progress">
              {[1, 2, 3].map((i) => (
                <span key={i} className={`pip${i <= step ? ' on' : ''}`}></span>
              ))}
            </div>
          </div>
          <div className="modal-body">
            {/* Keyed on what's showing, so changing treatment, narrative or
                screen replays the entry animation. */}
            <div className="inner" key={`${treatment}-${nar}-${step}`}>
              {step === 1 ? (
                <Screen1 treatment={treatment} n={n} />
              ) : step === 2 ? (
                screen2()
              ) : (
                screen3()
              )}
            </div>
          </div>
          <div className="modal-footer">{footer()}</div>
        </div>
      </div>

      <div className="control-panel">
        <div className="cp-title">V3 — design treatments</div>
        <div className="cp-group">
          <div className="cp-label">Treatment</div>
          <div className="cp-btns" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
            {(Object.keys(TREATMENTS) as TreatmentKey[]).map((key) => (
              <button
                key={key}
                className={`cp-btn${treatment === key ? ' on' : ''}`}
                onClick={() => setTreatment(key)}
              >
                {TREATMENTS[key]}
              </button>
            ))}
          </div>
        </div>
        <div className="cp-group">
          <div className="cp-label">Narrative</div>
          <div className="cp-btns">
            {(Object.keys(NARRATIVES) as NarrativeKey[]).map((key) => (
              <button
                key={key}
                className={`cp-btn${nar === key ? ' on' : ''}`}
                onClick={() => setNar(key)}
              >
                {NARRATIVES[key].name}
              </button>
            ))}
          </div>
        </div>
        <div className="cp-group">
          <div className="cp-label">Screen</div>
          <div className="cp-btns">
            {[1, 2, 3].map((i) => (
              <button
                key={i}
                className={`cp-btn${step === i ? ' on' : ''}`}
                onClick={() => setStep(i)}
              >
                {i}
              </button>
            ))}
          </div>
        </div>
        <div className="cp-note">
          {TREATMENT_NOTES[treatment]}
          {step > 1 && (
            <div style={{ marginTop: '8px' }}>
              Screens 2&ndash;3 share one markup and pick up the treatment&rsquo;s surface and type
              scale. The treatment work is concentrated on screen 1, which is where the staleness
              was.
            </div>
          )}
        </div>
      </div>
    </PageRoot>
  )
}
