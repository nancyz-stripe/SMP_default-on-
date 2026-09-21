import { Benefit, CoverageCheckbox, FeeBadge, Radio, RateStrip } from './parts'
import { NOTE_ALL, NOTE_INTL, eff, pct, type Scope } from './state'

/** Step 6: extend Managed Payments to domestic volume, four ways. */

export type Step6Props = {
  scope: Scope
  share: number
  onSetScope: (scope: Scope) => void
  onToggleDomestic: () => void
}

function Eyebrow() {
  return <div className="step-eyebrow">Step 6 of 6</div>
}

/** 6A — Checkbox upgrade. The pattern already built, with the "Save 30%" badge
 *  and the confetti removed: celebrating the selection of a more expensive option
 *  rewards our outcome, not their decision. The rate readout carries the change
 *  instead. */
export function T6A({ scope, share, onToggleDomestic }: Step6Props) {
  return (
    <>
      <Eyebrow />
      <div className="modal-headline">
        Managed Payments can also take on your domestic complexity.{' '}
        <span className="muted">Want to extend it across all your payments?</span>
      </div>
      <div className="coverage-card">
        <div className="coverage-head">
          <div className="coverage-title-row">
            <div className="coverage-title">Managed Payments</div>
            <FeeBadge rate="+3.5% per transaction" note={scope === 'all' ? NOTE_ALL : NOTE_INTL} />
          </div>
          <div className="coverage-desc">
            Stripe will manage your international payments. You can change your setup anytime.
          </div>
        </div>
        <div className="benefit-list">
          <Benefit>Tax liability sits with Stripe, in every market you sell to</Benefit>
          <Benefit>Payments processed locally, so more of them get approved</Benefit>
          <Benefit>Stripe handles fraud prevention, disputes, and payment support</Benefit>
        </div>
        <div className="coverage-divider"></div>
        <CoverageCheckbox
          checked={scope === 'all'}
          label="Also manage my domestic payments"
          onToggle={onToggleDomestic}
        />
        <div className="coverage-divider"></div>
        <RateStrip value={eff(scope, share)} />
      </div>
      <div className="footnote">
        Domestic volume is about {Math.round((1 - share) * 100)}% of what you told us to expect.
      </div>
    </>
  )
}

function ScopeCard({
  id,
  scope,
  share,
  onSetScope,
  title,
  desc,
  note,
}: {
  id: Scope
  scope: Scope
  share: number
  onSetScope: (scope: Scope) => void
  title: string
  desc: string
  note: string
}) {
  return (
    <div className={`option-card${scope === id ? ' selected' : ''}`} onClick={() => onSetScope(id)}>
      <Radio />
      <div className="option-content">
        <div className="option-title">
          {title}
          <FeeBadge rate="+3.5% per transaction" note={note} />
          <span className="neutral-tag">Effective {pct(eff(id, share))}</span>
        </div>
        <div className="option-description">{desc}</div>
      </div>
    </div>
  )
}

/** 6B — Two explicit cards. Most symmetrical and most honest: neither scope is
 *  the default. Loses the momentum of the extension framing. */
export function T6B({ scope, share, onSetScope }: Step6Props) {
  return (
    <>
      <Eyebrow />
      <div className="modal-headline">
        How much of your volume should Managed Payments cover?{' '}
        <span className="muted">You can change this anytime.</span>
      </div>
      <div className="option-cards">
        <ScopeCard
          id="intl"
          scope={scope}
          share={share}
          onSetScope={onSetScope}
          title="International payments only"
          desc="Stripe manages payments from customers outside the United States. Your domestic payments work as they do today."
          note={NOTE_INTL}
        />
        <ScopeCard
          id="all"
          scope={scope}
          share={share}
          onSetScope={onSetScope}
          title="All of my payments"
          desc="Stripe manages everything, domestic included — one set of operations rather than two."
          note={NOTE_ALL}
        />
      </div>
      <RateStrip value={eff(scope, share)} />
    </>
  )
}

/** 6C — Coverage meter. Keeps the extension framing but makes the control a meter
 *  with a live blended rate, so the decision is proportionate to how much
 *  domestic volume they actually have. */
export function T6C({ scope, share, onToggleDomestic }: Step6Props) {
  const covered = scope === 'all' ? 100 : Math.round(share * 100)

  return (
    <>
      <Eyebrow />
      <div className="modal-headline">
        Managed Payments can also take on your domestic complexity.{' '}
        <span className="muted">Here&rsquo;s what extending it covers, and what it costs.</span>
      </div>
      <div className="meter-card">
        <div className="meter-head">
          <div className="coverage-title">Coverage</div>
          <FeeBadge rate="+3.5% on covered volume" note={scope === 'all' ? NOTE_ALL : NOTE_INTL} />
        </div>
        <div className="meter-bar">
          <div className="meter-seg covered" style={{ flexBasis: `${covered}%` }}>
            {covered}% covered
          </div>
          <div className="meter-seg uncovered" style={{ flexBasis: `${100 - covered}%` }}>
            {100 - covered}%
          </div>
        </div>
        <div className="meter-legend">
          <span>
            <i style={{ background: '#675dff' }}></i>Managed by Stripe
          </span>
          <span>
            <i style={{ background: '#c3cbd6' }}></i>Managed by you
          </span>
        </div>
        <div className="coverage-divider"></div>
        <CoverageCheckbox
          checked={scope === 'all'}
          label="Extend to my domestic payments too"
          onToggle={onToggleDomestic}
        />
        <RateStrip value={eff(scope, share)} />
      </div>
      <div className="footnote">
        Based on the {Math.round(share * 100)}% international share you told us to expect.
      </div>
    </>
  )
}

/** 6D — Defer. Lightest onboarding, and arguably the most honest — they have no
 *  volume data yet on which to make this call. But it drops a decision leadership
 *  explicitly asked to be in the flow. */
export function T6D({ scope, share }: Step6Props) {
  return (
    <>
      <Eyebrow />
      <div className="modal-headline">
        You&rsquo;re set up for international payments.{' '}
        <span className="muted">Domestic can wait until you have numbers to look at.</span>
      </div>
      <div className="coverage-card">
        <div className="coverage-head">
          <div className="coverage-title-row">
            <div className="coverage-title">Managed Payments &mdash; international</div>
            <FeeBadge rate="+3.5% per transaction" note={NOTE_INTL} />
          </div>
          <div className="coverage-desc">
            Covering payments from customers outside the United States, which you expect to be about{' '}
            {Math.round(share * 100)}% of your volume.
          </div>
        </div>
        <div className="benefit-list">
          <Benefit>Tax liability sits with Stripe in every market you sell to</Benefit>
          <Benefit>Payments processed locally, so more of them get approved</Benefit>
          <Benefit>Stripe handles fraud prevention, disputes, and payment support</Benefit>
        </div>
        <div className="coverage-divider"></div>
        <RateStrip value={eff(scope, share)} />
      </div>
      <div className="step-body" style={{ marginTop: '16px' }}>
        Managed Payments can take on your domestic payments too. We&rsquo;ll show you what that
        would cost once you have a month of volume to compare against &mdash; you can turn it on any
        time from your payment settings.
      </div>
    </>
  )
}
