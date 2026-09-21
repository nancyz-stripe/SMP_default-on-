import { CheckIcon, DashIcon, MerchantOfRecord, NeedsData } from '../../components/Term'
import { MIX, RATE, domRate, effRate, intlRate, pct, type Scope } from '../../components/pricing'

/** The four steps of the autopilot framing. Kept in one module because they
 *  share the copy constants below and are only ever shown one at a time. */

/** The anchor copy, verbatim. Same constant, same rule as v2-b1. */
function AnchorCopy() {
  return (
    <p className="anchor-copy">
      These are the things you&rsquo;ll need as your business grows. Stripe will manage them for you
      as they come up (e.g. disputes, hitting tax thresholds). It only costs you when you start
      having global sales, so don&rsquo;t worry about it now if you&rsquo;re not there yet or
      don&rsquo;t know where your customers will come from.
    </p>
  )
}

const WATCHING: [string, string][] = [
  ['Tax thresholds', 'Registers, collects, and remits when you cross one in a new market'],
  ['Disputes', 'Responds to chargebacks on each market’s deadlines and evidence rules'],
  ['Local payment methods', 'Turns on the methods customers expect, in their currency'],
  ['Fraud and risk', 'Screens payments against patterns specific to each market'],
  ['Local processing', 'Processes in-market where it lifts your authorization rate'],
]

/** Step 1 — Engaged.
 *
 *  The instrument panel is the argument. Every row says "Standing by", because
 *  nothing has happened yet — conditional engagement becomes something the user
 *  can see rather than a promise they have to take. */
export function Step1() {
  return (
    <>
      <div className="step-eyebrow">Step 1 of 4</div>
      <h1 className="headline">
        Digital goods sell anywhere, so we&rsquo;ve switched autopilot on.{' '}
        <span className="muted">
          <NeedsData>X%</NeedsData> of businesses like yours end up selling internationally as they
          grow.
        </span>
      </h1>
      <AnchorCopy />
      <div className="panel">
        <div className="panel-head">
          <span className="panel-title">Autopilot &middot; international sales</span>
          <span className="status-on">
            <span className="status-dot"></span>On &middot; standing by
          </span>
        </div>
        {WATCHING.map(([what, how], i) => (
          <div className="watch-row" key={what} style={{ animationDelay: `${i * 50}ms` }}>
            <span className="watch-what">
              {what}
              <small>{how}</small>
            </span>
            <span className="pill-standby">Standing by</span>
          </div>
        ))}
        <div className="panel-foot">
          Nothing here is running yet &mdash; you haven&rsquo;t sold internationally. Each one
          engages on its own, the first time it applies to you. You&rsquo;re not watching the
          instruments; Stripe is.
        </div>
      </div>
    </>
  )
}

const AUTO_FEATURES = [
  <>
    Stripe becomes the <MerchantOfRecord /> for the sales it covers
  </>,
  'Tax registration, collection, and remittance',
  'Disputes handled end to end',
  'Fraud screening and local payment methods',
  'Local processing, which lifts authorization rates',
]

const MANUAL_FEATURES: ['on' | 'off', string][] = [
  ['on', 'Card processing in 135+ currencies'],
  ['on', 'Stripe Tax, Radar, and dispute tools available'],
  ['off', 'You register and remit tax in each market'],
  ['off', 'You respond to disputes on local deadlines'],
  ['off', 'You set up local entities or banking yourself'],
]

/** The metaphor's one genuine failure, named rather than papered over. A plane's
 *  autopilot leaves the pilot legally in command; this doesn't. Borrowing a
 *  mental model and marking where it stops applying teaches the MOR concept
 *  better than a definition does — and it's the part of the product the 3.5%
 *  actually buys. */
function ExceptionCallout() {
  return (
    <div className="exception">
      <span className="exception-ic">!</span>
      <div>
        <div className="exception-title">
          One way this isn&rsquo;t like a plane&rsquo;s autopilot
        </div>
        <div className="exception-body">
          In a plane, the pilot stays responsible no matter what the autopilot is doing. Here
          it&rsquo;s the opposite: when autopilot is engaged,{' '}
          <b>
            Stripe becomes the <MerchantOfRecord />
          </b>{' '}
          &mdash; the legal seller for those sales. Your customer&rsquo;s receipt names Stripe, and
          the tax and dispute liability is ours, not yours. That transfer is what the fee buys.
        </div>
      </div>
    </div>
  )
}

export type Choice = 'smp' | 'self' | null

/** Step 2 — Autopilot, or take the controls.
 *
 *  "Take the controls" is the reason to run this framing at all: it's the first
 *  self-managed label that sounds skilled rather than either apologetic or
 *  contrarian. */
export function Step2({
  choice,
  exception,
  onPick,
}: {
  choice: Choice
  exception: boolean
  onPick: (choice: Exclude<Choice, null>) => void
}) {
  return (
    <>
      <div className="step-eyebrow">Step 2 of 4</div>
      <h1 className="headline">
        We recommend leaving autopilot on.{' '}
        <span className="muted">
          Nothing to set up now &mdash; it engages when you get there. You can take the controls
          whenever you want.
        </span>
      </h1>
      <div className="modes">
        <div className={`mode${choice === 'smp' ? ' selected' : ''}`} onClick={() => onPick('smp')}>
          <div className="mode-head">
            <span className="mode-title">Autopilot</span>
            <span className="tag-rec">Recommended</span>
          </div>
          <div className="mode-sub">
            Stripe handles each obligation as it arrives. You don&rsquo;t monitor anything.
          </div>
          <div className="price-block">
            <div className="price-main">+{pct(RATE.smp)} per transaction</div>
            <div className="price-rows">
              <div className="price-row">
                <span>International sales</span>
                <b>{pct(intlRate())}</b>
              </div>
              <div className="price-row">
                <span>Domestic sales</span>
                <b>{pct(RATE.dom)}</b>
              </div>
            </div>
            <div className="price-note">
              On top of standard processing. Charged only on the sales autopilot covers &mdash;
              nothing until you sell internationally.
            </div>
          </div>
          <div className="feat-list">
            {AUTO_FEATURES.map((feature, i) => (
              <div className="feat" key={i}>
                <CheckIcon />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`mode${choice === 'self' ? ' selected' : ''}`}
          onClick={() => onPick('self')}
        >
          <div className="mode-head">
            <span className="mode-title">Take the controls</span>
            <span className="tag-neutral">Fully supported</span>
          </div>
          <div className="mode-sub">You fly it yourself, with Stripe products to help.</div>
          <div className="price-block">
            <div className="price-main">Standard pricing</div>
            <div className="price-rows">
              <div className="price-row">
                <span>International sales</span>
                <b>{pct(RATE.intl)}</b>
              </div>
              <div className="price-row">
                <span>Domestic sales</span>
                <b>{pct(RATE.dom)}</b>
              </div>
            </div>
            <div className="price-note">
              No added fee. Tax, Radar, and dispute tooling priced separately.
            </div>
          </div>
          <div className="feat-list">
            {MANUAL_FEATURES.map(([state, label]) => (
              <div className={`feat${state === 'off' ? ' off' : ''}`} key={label}>
                {state === 'off' ? <DashIcon /> : <CheckIcon />}
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {exception && <ExceptionCallout />}
    </>
  )
}

/** Step 3 — Which legs.
 *
 *  Scope reads naturally as phases of a route. Both timings are stated plainly
 *  and symmetrically: the honest difference is conditional versus near-certain,
 *  not later versus today — nothing is charged in either scope until a
 *  transaction happens. */
export function Step3({ scope, onSetScope }: { scope: Scope; onSetScope: (scope: Scope) => void }) {
  const all = scope === 'all'

  return (
    <>
      <div className="step-eyebrow">Step 3 of 4</div>
      <h1 className="headline">
        Autopilot is flying your international sales.{' '}
        <span className="muted">Want it to fly your domestic sales too?</span>
      </h1>
      <div className="legs-card">
        <div className="legs-bar">
          <div className={`leg dom${all ? ' flown' : ''}`}>
            Domestic &middot; {pct(domRate(scope))}
          </div>
          <div className="leg intl">International &middot; {pct(intlRate())}</div>
        </div>
        <div className="legs-legend">
          <span>
            <i style={{ background: '#675dff' }}></i>Flown by autopilot
          </span>
          <span>
            <i style={{ background: '#c3cbd6' }}></i>You fly it, standard pricing
          </span>
        </div>
        <div className="caption">
          Illustrative split ({MIX.dom}% domestic / {MIX.intl}% international) to show proportion
          &mdash; not your actual volume.
        </div>
        <div className="rate-strip">
          <span className="label">Your blended rate on that split</span>
          <span className="value">{pct(effRate(scope))}</span>
        </div>
      </div>
      <div style={{ height: '16px' }}></div>
      <div className="opts">
        <div className={`opt${!all ? ' selected' : ''}`} onClick={() => onSetScope('intl')}>
          <span className="radio"></span>
          <div style={{ flex: '1' }}>
            <div className="opt-title">
              <span>International sales only</span>
              <span className="opt-rate">
                {pct(intlRate())} intl &middot; {pct(RATE.dom)} domestic
              </span>
            </div>
            <div className="opt-desc">
              Autopilot flies the international legs. Your domestic sales stay on standard pricing,
              exactly as they are.
            </div>
            <div className="opt-when">
              <b>Nothing until your first international sale.</b> If that never happens, this never
              costs you anything.
            </div>
          </div>
        </div>
        <div className={`opt${all ? ' selected' : ''}`} onClick={() => onSetScope('all')}>
          <span className="radio"></span>
          <div style={{ flex: '1' }}>
            <div className="opt-title">
              <span>All sales, including domestic</span>
              <span className="opt-rate">
                {pct(intlRate())} intl &middot; {pct(RATE.dom + RATE.smp)} domestic
              </span>
            </div>
            <div className="opt-desc">
              Autopilot flies the whole route &mdash; one way of working across your entire
              business.
            </div>
            <div className="opt-when">
              <b>Starts with your first sale, domestic or international.</b> Your domestic rate goes
              from {pct(RATE.dom)} to {pct(RATE.dom + RATE.smp)}.
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const ALACARTE: [string, string][] = [
  [
    'Stripe Tax',
    'Calculates what you owe and monitors thresholds. Registration and filing stay with you.',
  ],
  ['Radar', 'Fraud rules and risk scoring on your payments.'],
  ['Disputes', 'Tooling to track and respond to chargebacks. Deadlines are yours to meet.'],
  ['Payment methods', 'Add local methods per market as you expand.'],
]

/** Step 4 — Confirm. "Who sells" is an explicit row; on the manual branch, "you
 *  remain the merchant of record" is the cost of taking the controls. */
export function Step4({ choice, scope }: { choice: Choice; scope: Scope }) {
  if (choice === 'self') {
    return (
      <>
        <div className="step-eyebrow">Step 4 of 4</div>
        <h1 className="headline">You&rsquo;re flying it yourself.</h1>
        <div className="sum-card">
          <div className="sum-head">
            <span className="sum-title">Manual &mdash; you have the controls</span>
            <span className="tag-neutral">Fully supported</span>
          </div>
          <div className="sum-rows">
            <div className="sum-row">
              <span className="k">What you pay</span>
              <span className="v">
                Standard processing &mdash; <b>{pct(RATE.dom)}</b> domestic, <b>{pct(RATE.intl)}</b>{' '}
                international. No added fee.
              </span>
            </div>
            <div className="sum-row">
              <span className="k">What you own</span>
              <span className="v">
                Tax registration and filing, dispute responses, fraud rules, local payment methods,
                and any local entity setup. You remain the <MerchantOfRecord /> on every sale.
              </span>
            </div>
            <div className="sum-row">
              <span className="k">What changes today</span>
              <span className="v">Nothing. You can start taking payments now.</span>
            </div>
          </div>
        </div>
        <div className="feat-head">
          Stripe products that help
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
          You can hand back to autopilot at any time from your payment settings. Nothing to undo
          first.
        </div>
      </>
    )
  }

  const all = scope === 'all'

  return (
    <>
      <div className="step-eyebrow">Step 4 of 4</div>
      <h1 className="headline">Autopilot is on.</h1>
      <div className="sum-card">
        <div className="sum-head">
          <span className="sum-title">Autopilot</span>
          <span className="tag-rec">{all ? 'All sales' : 'International sales'}</span>
        </div>
        <div className="sum-rows">
          <div className="sum-row">
            <span className="k">What it flies</span>
            <span className="v">
              Tax, disputes, fraud, local payment methods, and local processing on your{' '}
              {all ? 'domestic and international' : 'international'} sales.
            </span>
          </div>
          <div className="sum-row">
            <span className="k">Who sells</span>
            <span className="v">
              Stripe is the <MerchantOfRecord /> on the sales autopilot covers.
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
                  , and <b>{pct(RATE.dom)}</b> on domestic &mdash; unchanged.
                </>
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="today-note">
        <span>&#10003;</span>
        <span>
          {all ? (
            <>
              <b>It engages on your next sale.</b> You put the whole route on autopilot, so the{' '}
              {pct(RATE.dom + RATE.smp)} rate applies domestically too.
            </>
          ) : (
            <>
              <b>Nothing is running yet.</b> Autopilot engages the first time you sell
              internationally. If that never happens, it never costs you anything.
            </>
          )}
        </span>
      </div>
      <div className="reversible">
        You can take the controls, or change which legs autopilot flies, at any time in your payment
        settings.
      </div>
    </>
  )
}
