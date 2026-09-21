import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DoneRow } from '../../components/DoneRow'
import { PageRoot } from '../../components/PageRoot'
import { StripeLogotype } from '../../components/StripeLogotype'
import { MIX, RATE, effRate, intlRate, pct } from '../../components/pricing'
import { NARRATIVES, THINGS, type NarrativeKey } from './narratives'
import './styles.css'

/** V3 — three narratives over the same three screens, switchable from the
 *  control panel so they can be read against each other. */

type Choice = 'smp' | 'self' | null

export default function V3Narratives() {
  const [params] = useSearchParams()

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

  /** Screen 1 — the narrative. One read, no controls; the list arrives on its
   *  own. The delays are cumulative, so the items follow the copy. */
  const screen1 = () => {
    let delay = 300
    return (
      <>
        <h1 className="lede seq" style={{ animationDelay: '60ms' }}>
          {n.lede}
        </h1>
        <p className="body-copy seq" style={{ animationDelay: '220ms' }}>
          {n.body}
        </p>
        {n.thingsIntro && (
          <div className="body-copy seq" style={{ animationDelay: '300ms', marginBottom: '8px' }}>
            {n.thingsIntro}
          </div>
        )}
        <div className="things">
          {THINGS.map(([what, how]) => {
            delay += 90
            return (
              <div className="thing seq" key={what} style={{ animationDelay: `${delay}ms` }}>
                <span className="thing-what">
                  {what}
                  <small>{how}</small>
                </span>
                <span className="thing-who">Stripe</span>
              </div>
            )
          })}
        </div>
        <p className="closer seq" style={{ animationDelay: `${delay + 140}ms` }}>
          {n.closer}
        </p>
      </>
    )
  }

  /** Screen 2 — the one decision. Two cards, three lines each. The narrative
   *  already said what Stripe does, so repeating it as feature lists would
   *  rebuild the wall. */
  const screen2 = () => (
    <>
      <h1 className="lede seq" style={{ animationDelay: '60ms' }}>
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
        <div
          className={`choice${choice === 'self' ? ' on' : ''}`}
          onClick={() => setChoice('self')}
        >
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

  /** Screen 3 — confirm, with the domestic offer folded in.
   *
   *  Extending to domestic is an addition rather than a gate, so it sits under
   *  the confirmation as one optional switch instead of its own screen. That
   *  keeps the flow at three screens and one decision each. */
  const screen3 = () => {
    if (choice === 'self') {
      return (
        <>
          <h1 className="lede seq" style={{ animationDelay: '60ms' }}>
            You&rsquo;ve got it from here.{' '}
            <span className="muted">We&rsquo;ll keep you posted either way.</span>
          </h1>
          <div className="seq" style={{ animationDelay: '200ms' }}>
            <DoneRow>
              You&rsquo;re on standard pricing &mdash; <b>{pct(RATE.dom)}</b> domestic,{' '}
              <b>{pct(RATE.intl)}</b> international. No added fee.
            </DoneRow>
            <DoneRow>
              You&rsquo;ll see the same things we&rsquo;d see: tax thresholds as you approach them,
              disputes as they land.
            </DoneRow>
            <DoneRow>
              Handling them is yours &mdash; tax registration, dispute responses, fraud rules.
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
        <h1 className="lede seq" style={{ animationDelay: '60ms' }}>
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

  const note =
    step === 1 ? (
      n.note
    ) : step === 2 ? (
      <>
        <b>One decision.</b> Two cards, three lines each, both priced. No feature lists &mdash; the
        narrative already said what Stripe does.
      </>
    ) : (
      <>
        <b>Confirm.</b> The domestic offer sits here as one optional switch rather than its own
        screen: it&rsquo;s an addition, not a gate. Both timings stated symmetrically.
      </>
    )

  return (
    <PageRoot slug="v3-narratives">
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
        <div className="modal">
          <div className="modal-gradient"></div>
          <div className="modal-header">
            <StripeLogotype fill="#0a2540" width={60} height={25} />
            <div className="progress">
              {[1, 2, 3].map((i) => (
                <span key={i} className={`pip${i <= step ? ' on' : ''}`}></span>
              ))}
            </div>
          </div>
          <div className="modal-body">
            {/* Keyed on what's showing, so changing screen or narrative remounts
                the stage and replays its entry animation — the original reset
                the animation by hand for the same reason. */}
            <div className="inner" key={`${nar}-${step}`}>
              {step === 1 ? screen1() : step === 2 ? screen2() : screen3()}
            </div>
          </div>
          <div className="modal-footer">{footer()}</div>
        </div>
      </div>

      <div className="control-panel">
        <div className="cp-title">V3 — narratives</div>
        <div className="cp-group">
          <div className="cp-label">Narrative</div>
          <div className="cp-btns" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
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
        <div className="cp-note">{note}</div>
      </div>
    </PageRoot>
  )
}
