import { useState } from 'react'
import { MerchantOfRecord } from '../../components/Term'
import {
  MIX,
  RATE,
  domRate,
  effRate,
  intlRate,
  pct,
  type Scope,
} from '../../components/pricing'
import { AnchorCopy, TRIGGERS, type Frame } from './frames'
import { SelfColumn, SmpColumn, WORKLOAD, type Choice } from './columns'

/** The four steps, each with its treatments. The treatment letters are the
 *  review's own labels, kept so a note and a screen can be talked about by the
 *  same name. */

export type T1 = '1B' | '1D'
export type T2 = '2B' | '2A' | '2C' | '2E'
export type T3 = '3A' | '3B' | '3C'

/** Step 1 — Framing. */
export function Step1({ t1, frame, stat }: { t1: T1; frame: Frame; stat: boolean }) {
  // One row at a time, so a reader can open the one they care about without
  // collapsing the others.
  const [open, setOpen] = useState<Set<number>>(new Set())
  const toggle = (i: number) =>
    setOpen((current) => {
      const next = new Set(current)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  const head = (
    <>
      <div className="step-eyebrow">Step 1 of 4</div>
      <h1 className="headline">{frame.headline(stat)}</h1>
    </>
  )

  // 1D — radical restraint. The floor: how little framing can step 2 survive
  // on? Kept as the control for whether step 1 earns its space.
  if (t1 === '1D') {
    return (
      <>
        {head}
        <AnchorCopy />
      </>
    )
  }

  // 1B — trigger list, collapsed. Headline claim readable in five seconds;
  // depth available to anyone who wants it.
  return (
    <>
      {head}
      <AnchorCopy />
      <div className="trig-list">
        {TRIGGERS.map(([what, detail], i) => (
          <div
            className={`trig${open.has(i) ? ' open' : ''}`}
            key={what}
            style={{ animationDelay: `${i * 45}ms` }}
          >
            <div className="trig-head" onClick={() => toggle(i)}>
              <span className="trig-when">{frame.when[i]}</span>
              <span className="trig-what">{what}</span>
              <span className="trig-owner">Stripe handles it</span>
              <button className="trig-toggle" aria-label="Details" aria-expanded={open.has(i)}>
                +
              </button>
            </div>
            <div className="trig-detail">{detail}</div>
          </div>
        ))}
      </div>
    </>
  )
}

/** Step 2 — Recommendation + comparison. */
export function Step2({
  t2,
  frame,
  choice,
  onPick,
  cmpOpen,
  cmpOpened,
  onToggleCompare,
  onPickAndGo,
}: {
  t2: T2
  frame: Frame
  choice: Choice
  onPick: (choice: Exclude<Choice, null>) => void
  cmpOpen: boolean
  cmpOpened: boolean
  onToggleCompare: () => void
  onPickAndGo: (choice: Exclude<Choice, null>) => void
}) {
  const head = <div className="step-eyebrow">Step 2 of 4</div>

  // 2A — opinion in the copy, comparison symmetrical. The check on whether 2B's
  // asymmetry is doing something coercive.
  if (t2 === '2A') {
    return (
      <>
        {head}
        <h1 className="headline">Two ways to sell internationally.</h1>
        <div className="rec-banner">
          <div>
            <div className="rb-title">
              Stripe recommends Managed Payments for digital goods businesses.
            </div>
            <div className="rb-body">
              Digital goods sell across borders from day one, which means tax thresholds, disputes,
              and local payment methods arrive early. Both options are below, priced. Either is fully
              supported.
            </div>
          </div>
        </div>
        <div className="cmp">
          <SmpColumn className="rec" choice={choice} onPick={() => onPick('smp')} />
          <SelfColumn className="alt" choice={choice} onPick={() => onPick('self')} />
        </div>
      </>
    )
  }

  // 2C — the workload diff.
  if (t2 === '2C') {
    return (
      <>
        {head}
        <h1 className="headline">
          The difference is who does the work. <span className="muted">Both options priced.</span>
        </h1>
        <div className="diff-headrow">
          <span className="diff-what">&nbsp;</span>
          <span className="diff-cell">Self-managed &middot; {pct(RATE.intl)} intl</span>
          <span className="diff-cell">Managed Payments &middot; {pct(intlRate())} intl</span>
        </div>
        <div className="diff">
          {WORKLOAD.map((what) => (
            <div className="diff-row" key={what}>
              <span className="diff-what">{what}</span>
              <span className="diff-cell">
                <span className="owner you">You</span>
              </span>
              <span className="diff-cell">
                <span className="owner stripe">Stripe</span>
              </span>
            </div>
          ))}
        </div>
        <div className="cmp" style={{ marginTop: '20px' }}>
          <SelfColumn className="alt" choice={choice} onPick={() => onPick('self')} priceOnly />
          <SmpColumn className="rec" choice={choice} onPick={() => onPick('smp')} priceOnly />
        </div>
      </>
    )
  }

  // 2E — recommendation first, compare if needed.
  //
  // Both decisions are reachable from the recommendation itself. An earlier
  // version put the only selectable controls inside the comparison, which made
  // three things wrong at once: Continue was a dead end until you opened it,
  // declining cost strictly more effort than accepting (an opt-out harder to
  // reach than the opt-in isn't one), and the diagnostic was void because
  // opening the comparison was compulsory rather than voluntary.
  //
  // The accept button names what it does. Same click count as a pre-checked
  // radio under a generic "Continue", but it's an affirmative decision rather
  // than a silent default.
  if (t2 === '2E') {
    return (
      <>
        {head}
        <h1 className="headline">{frame.step2}</h1>
        <div className="rec-card">
          <div className="rec-card-head">
            <span className="col-title">Managed Payments</span>
            <span className="tag-rec">Recommended</span>
          </div>
          <p className="rec-card-body">
            Stripe manages tax, disputes, local payment methods, and fraud on your international
            sales, and becomes the <MerchantOfRecord /> for them.
          </p>
          {/* The price stays on this card, not only in the comparison. A user can
              accept without ever opening the comparison, so this is the only
              thing standing between "recommendation first" and "price hidden". */}
          <div className="rec-price">
            +{pct(RATE.smp)} per transaction
            <span className="rec-price-sub">
              {pct(intlRate())} on international sales, {pct(RATE.dom)} on domestic &mdash;
              unchanged. Charged only on the volume it covers.
            </span>
          </div>
          <div className="rec-actions">
            <button className="btn btn-primary" onClick={() => onPickAndGo('smp')}>
              Continue with Managed Payments
            </button>
            <button className="btn btn-secondary" onClick={() => onPickAndGo('self')}>
              I&rsquo;ll manage it myself
            </button>
          </div>
          <button className="compare-link" onClick={onToggleCompare}>
            {cmpOpen ? 'Hide the comparison' : 'Compare the two side by side'}
          </button>
        </div>
        {cmpOpen && (
          <div className="cmp" style={{ marginTop: '18px' }}>
            <SmpColumn className="rec" choice={choice} onPick={() => onPick('smp')} />
            <SelfColumn className="alt" choice={choice} onPick={() => onPick('self')} />
          </div>
        )}
        <div className="vol-caption" style={{ marginTop: '14px' }}>
          {cmpOpened
            ? 'Comparison opened — this user consulted the side-by-side before deciding.'
            : 'Comparison not opened. Both decisions are reachable without it, so opening it is voluntary — which is what makes the measurement mean anything.'}
        </div>
      </>
    )
  }

  // 2B — asymmetric: recommended primary, alternative complete and priced. The
  // leading candidate. The headline follows the active frame so the
  // international/growth comparison holds across both steps, not just step 1.
  return (
    <>
      {head}
      <h1 className="headline">{frame.step2}</h1>
      <div className="cmp asym">
        <SmpColumn className="rec" choice={choice} onPick={() => onPick('smp')} />
        <SelfColumn className="alt" choice={choice} onPick={() => onPick('self')} />
      </div>
    </>
  )
}

/** Step 3 — Scope.
 *
 *  Also the screen that retires "it only costs you when you start having global
 *  sales". Extending to all volume puts +3.5% on domestic, and this screen
 *  volunteers that rather than waiting to be asked. */
export function Step3({
  t3,
  scope,
  onSetScope,
}: {
  t3: T3
  scope: Scope
  onSetScope: (scope: Scope) => void
}) {
  const all = scope === 'all'

  const head = (
    <>
      <div className="step-eyebrow">Step 3 of 4</div>
      <h1 className="headline">
        How much of your volume should Managed Payments cover?{' '}
        <span className="muted">You can change this later.</span>
      </h1>
    </>
  )

  const opts = (
    <div className="scope-opts">
      <div className={`scope-opt${!all ? ' selected' : ''}`} onClick={() => onSetScope('intl')}>
        <span className="radio"></span>
        <div className="scope-body">
          <div className="scope-title">
            <span>International sales only</span>
            <span className="scope-rate">
              {pct(intlRate())} intl &middot; {pct(RATE.dom)} domestic
            </span>
          </div>
          <div className="scope-desc">
            Managed Payments covers sales outside your home market. Your domestic sales stay on
            standard pricing, exactly as they are today.
          </div>
        </div>
      </div>
      <div className={`scope-opt${all ? ' selected' : ''}`} onClick={() => onSetScope('all')}>
        <span className="radio"></span>
        <div className="scope-body">
          <div className="scope-title">
            <span>All sales, including domestic</span>
            <span className="scope-rate">
              {pct(intlRate())} intl &middot; {pct(RATE.dom + RATE.smp)} domestic
            </span>
          </div>
          <div className="scope-desc">
            Stripe also takes on tax, disputes, fraud, and support for your domestic sales &mdash;
            one operating model across your whole business.
          </div>
          <div className="scope-change">
            <span>&#9888;</span>
            <span>
              This changes what you pay at home. Your domestic rate goes from{' '}
              <b>{pct(RATE.dom)}</b> to <b>{pct(RATE.dom + RATE.smp)}</b>, and applies to sales
              you&rsquo;re already making &mdash; not only to future international ones.
            </span>
          </div>
        </div>
      </div>
    </div>
  )

  // 3C — control condition. No visual. If this reads as clearly as 3A, the bar
  // isn't earning its space.
  if (t3 === '3C') {
    return (
      <>
        {head}
        {opts}
        <div className="rate-strip" style={{ marginTop: '16px' }}>
          <span className="label">
            Your blended rate on an illustrative {MIX.dom}/{MIX.intl} domestic-international split
          </span>
          <span className="value">{pct(effRate(scope))}</span>
        </div>
      </>
    )
  }

  // 3B — the four-cell rate table. Most literal disclosure; risks the
  // simultaneous-evaluation problem that split steps 2 and 3.
  if (t3 === '3B') {
    return (
      <>
        {head}
        <div className="scope-card">
          <div className="price-rows">
            <div className="price-row">
              <span>
                <b>&nbsp;</b>
              </span>
              <b>International only</b>
            </div>
            <div className="price-row">
              <span>International sales</span>
              <b>{pct(intlRate())}</b>
            </div>
            <div className="price-row">
              <span>Domestic sales</span>
              <b>{pct(RATE.dom)} &mdash; unchanged</b>
            </div>
          </div>
          <div
            className="coverage-divider"
            style={{
              height: '1px',
              borderTop: '1px solid var(--neutral-50)',
              margin: '12px 0',
            }}
          ></div>
          <div className="price-rows">
            <div className="price-row">
              <span>
                <b>&nbsp;</b>
              </span>
              <b>All sales</b>
            </div>
            <div className="price-row">
              <span>International sales</span>
              <b>{pct(intlRate())}</b>
            </div>
            <div className="price-row">
              <span>Domestic sales</span>
              <b style={{ color: '#8a5a11' }}>
                {pct(RATE.dom)} &rarr; {pct(RATE.dom + RATE.smp)}
              </b>
            </div>
          </div>
        </div>
        {opts}
      </>
    )
  }

  // 3A — volume bar. The domestic segment lighting up *is* the disclosure: the
  // change is visible as area, not only as a number.
  return (
    <>
      {head}
      <div className="scope-card">
        <div className="vol-bar">
          <div className={`vol-seg dom${all ? ' covered' : ''}`}>
            Domestic &middot; {pct(domRate(scope))}
          </div>
          <div className="vol-seg intl">International &middot; {pct(intlRate())}</div>
        </div>
        <div className="vol-legend">
          <span>
            <i style={{ background: '#675dff' }}></i>Covered by Managed Payments
          </span>
          <span>
            <i style={{ background: '#c3cbd6' }}></i>Standard Stripe pricing
          </span>
        </div>
        <div className="vol-caption">
          Illustrative split ({MIX.dom}% domestic / {MIX.intl}% international) to show proportion
          &mdash; not your actual volume.
        </div>
        <div className="rate-strip">
          <span className="label">Your blended rate on that split</span>
          <span className="value">{pct(effRate(scope))}</span>
        </div>
      </div>
      <div style={{ height: '16px' }}></div>
      {opts}
    </>
  )
}

const ALACARTE: [string, string][] = [
  [
    'Stripe Tax',
    'Calculates what you owe in each market and monitors thresholds. Registration and filing stay with you.',
  ],
  ['Radar', 'Fraud rules and machine-learning risk scoring on your payments.'],
  [
    'Disputes',
    'Dashboard tooling to track and respond to chargebacks. Deadlines and evidence are yours to meet.',
  ],
  ['Payment methods', 'Add local methods per market as you expand into them.'],
]

/** Step 4 — Confirm. Two branches, equal fidelity.
 *
 *  The self-managed branch is the honesty test for the whole flow: if it reads as
 *  a consolation prize, the recommendation upstream was coercive. */
export function Step4({ choice, scope }: { choice: Choice; scope: Scope }) {
  const head = <div className="step-eyebrow">Step 4 of 4</div>

  if (choice === 'self') {
    return (
      <>
        {head}
        <h1 className="headline">
          You&rsquo;re set up to manage international selling yourself.
        </h1>
        <div className="sum-card">
          <div className="sum-head">
            <span className="sum-title">Self-managed</span>
            <span className="tag-neutral">Fully supported</span>
          </div>
          <div className="sum-rows">
            <div className="sum-row">
              <span className="k">What you pay</span>
              <span className="v">
                Standard processing &mdash; <b>{pct(RATE.dom)}</b> domestic,{' '}
                <b>{pct(RATE.intl)}</b> international. No added fee.
              </span>
            </div>
            <div className="sum-row">
              <span className="k">What you own</span>
              <span className="v">
                Tax registration and filing, dispute responses, fraud rules, local payment methods,
                and any local entity or banking setup.
              </span>
            </div>
            <div className="sum-row">
              <span className="k">What changes today</span>
              <span className="v">Nothing. You can start taking payments now.</span>
            </div>
          </div>
        </div>
        <div className="feat-head">
          Stripe products that cover this work
          <span className="todo-flag">Placeholder &mdash; needs the real list</span>
        </div>
        <div className="alc-list">
          {ALACARTE.map(([name, desc]) => (
            <div className="alc" key={name}>
              <span className="alc-name">{name}</span>
              <span className="alc-desc">{desc}</span>
            </div>
          ))}
        </div>
        <div className="reversible">
          Managed Payments stays available. You can switch to it at any time from your payment
          settings &mdash; there&rsquo;s nothing to undo here first.
        </div>
      </>
    )
  }

  const all = scope === 'all'

  return (
    <>
      {head}
      <h1 className="headline">Managed Payments is on.</h1>
      <div className="sum-card">
        <div className="sum-head">
          <span className="sum-title">Managed Payments</span>
          <span className="tag-rec">{all ? 'All sales' : 'International sales'}</span>
        </div>
        <div className="sum-rows">
          <div className="sum-row">
            <span className="k">What Stripe manages</span>
            <span className="v">
              Tax registration and remittance, disputes, fraud, local payment methods, and local
              processing on your {all ? 'domestic and international' : 'international'} sales.
            </span>
          </div>
          <div className="sum-row">
            <span className="k">What you pay</span>
            <span className="v">
              <b>{pct(intlRate())}</b> on international sales
              {all ? (
                <>
                  {' '}
                  and <b>{pct(RATE.dom + RATE.smp)}</b> on domestic sales.
                </>
              ) : (
                <>
                  , and <b>{pct(RATE.dom)}</b> on domestic sales &mdash; unchanged.
                </>
              )}
            </span>
          </div>
          <div className="sum-row">
            <span className="k">Blended rate</span>
            <span className="v">
              <b>{pct(effRate(scope))}</b> on an illustrative {MIX.dom}/{MIX.intl} split.
            </span>
          </div>
        </div>
      </div>
      <div className="today-note">
        <span>&#10003;</span>
        <span>
          {all ? (
            <>
              <b>The domestic fee starts with your next domestic sale.</b> You chose to extend
              Managed Payments to all sales, so the {pct(RATE.dom + RATE.smp)} rate applies at home
              too.
            </>
          ) : (
            <>
              <b>You&rsquo;re paying nothing extra today.</b> The Managed Payments fee applies only to
              international sales, so it starts the first time you make one. If that never happens, it
              never costs you anything.
            </>
          )}
        </span>
      </div>
      <div className="reversible">
        You can change coverage or turn Managed Payments off at any time in your payment settings.
      </div>
    </>
  )
}


