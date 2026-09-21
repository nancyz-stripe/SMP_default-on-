import { useState, type ReactNode } from 'react'
import {
  Benefit,
  Claims,
  Disclosure,
  FeeBadge,
  Ledger,
  MerchantOfRecord,
  Radio,
  Tick,
} from './parts'
import { GOODS, MARKET_FACTS, MARKETS, eff, marketList, pct, type Choice } from './state'

/** Step 5: recommendation and comparison, seven ways. */

export type Step5Props = {
  choice: Choice
  share: number
  onPick: (choice: Choice) => void
  beat: number
  onSetBeat: (beat: number) => void
}

function Eyebrow() {
  return <div className="step-eyebrow">Step 5 of 6</div>
}

/** 5A — Responsibility ledger. Rows are the obligations; both columns say who
 *  does the work. */
export function T5A({ choice, share, onPick }: Step5Props) {
  return (
    <>
      <Eyebrow />
      <div className="modal-headline">
        Since you&rsquo;ll have customers in {marketList()}, we recommend Managed Payments.{' '}
        <span className="muted">Two ways to do this. The difference is who does the work.</span>
      </div>
      <Ledger choice={choice} share={share} onPick={onPick} />
      <div className="ldg-note">
        You can apply Managed Payments to some of your volume rather than all of it &mdash;
        that&rsquo;s the next step.
      </div>
    </>
  )
}

function Seg({
  kind,
  label,
  value,
  height,
}: {
  kind: string
  label: ReactNode
  value: string
  height: number
}) {
  return (
    <div className={`stack-seg ${kind}`} style={{ height: `${height}px` }}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  )
}

function OptionCard({
  id,
  choice,
  onPick,
  title,
  rate,
  note,
  desc,
  tag,
}: {
  id: Choice
  choice: Choice
  onPick: (choice: Choice) => void
  title: string
  rate: string
  note: string
  desc: ReactNode
  tag?: string
}) {
  return (
    <div className={`option-card${choice === id ? ' selected' : ''}`} onClick={() => onPick(id)}>
      <Radio />
      <div className="option-content">
        <div className="option-title">
          {title}
          <FeeBadge rate={rate} note={note} />
          {tag && <span className="neutral-tag">{tag}</span>}
        </div>
        <div className="option-description">{desc}</div>
      </div>
    </div>
  )
}

/** 5B — Cost stack. Compares total cost of ownership, not just fee against fee.
 *  The labour block stays deliberately unpriced. */
export function T5B({ choice, share, onPick }: Step5Props) {
  return (
    <>
      <Eyebrow />
      <div className="modal-headline">
        Selling {GOODS} into {marketList()} costs more than the processing fee.
      </div>
      <div className="step-body">
        Whichever way you go, you pay to process. The difference is everything stacked on top: the
        products that cover tax, fraud, and disputes &mdash; and the time your team spends running
        them.
      </div>
      <div className="option-cards">
        <OptionCard
          id="smp"
          choice={choice}
          onPick={onPick}
          title="Managed Payments"
          rate="+3.5% per transaction"
          note="On top of standard processing fees (3.4% for international)."
          desc={
            <>
              Stripe becomes the <MerchantOfRecord />. One fee covers tax, disputes, fraud, and
              local processing.
            </>
          }
          tag={`Effective ${pct(eff('intl', share))}`}
        />
        <OptionCard
          id="self"
          choice={choice}
          onPick={onPick}
          title="Manage myself"
          rate="2.9% domestic / 3.4% international"
          note="Standard Stripe processing fees. No additional fee."
          desc="You keep the obligations and assemble the products to cover them."
          tag={`Effective ${pct(eff('self', share))} + products + time`}
        />
      </div>
      <div className="footnote">
        Product costs are not included in either effective rate. The stack on the right shows what
        they&rsquo;re made of.
      </div>
    </>
  )
}

export function T5BRight() {
  return (
    <>
      <div className="pane-title">What you pay, stacked</div>
      <div className="stack-wrap">
        <div className="stack-col">
          <div className="stack-bar">
            <Seg kind="processing" label="Processing" value="3.4%" height={44} />
            <Seg kind="alacarte" label="Stripe Tax" value="+ cost" height={26} />
            <Seg kind="alacarte" label="Radar" value="+ cost" height={26} />
            <Seg kind="alacarte" label="Dispute handling" value="+ cost" height={26} />
            <Seg kind="labor" label={<>Your team&rsquo;s time</>} value="unpriced" height={34} />
          </div>
          <div className="stack-cap">Manage myself</div>
          <div className="stack-total">3.4% + products + time</div>
        </div>
        <div className="stack-col">
          <div className="stack-bar">
            <Seg kind="processing" label="Processing" value="3.4%" height={44} />
            <Seg kind="smp" label="Managed Payments" value="+3.5%" height={46} />
          </div>
          <div className="stack-cap">Managed Payments</div>
          <div className="stack-total">6.9% on international volume</div>
        </div>
      </div>
      <div className="footnote" style={{ textAlign: 'center' }}>
        The work block has no number on it on purpose.
      </div>
    </>
  )
}

function Reason({ children }: { children: ReactNode }) {
  return (
    <div className="reason-line">
      <Tick />
      <span>{children}</span>
    </div>
  )
}

function AdvisoryCard({
  id,
  choice,
  onPick,
  title,
  rate,
  note,
  recommended,
  claims,
}: {
  id: Choice
  choice: Choice
  onPick: (choice: Choice) => void
  title: string
  rate: string
  note: string
  recommended?: boolean
  claims: ReactNode[]
}) {
  return (
    <div className={`option-card${choice === id ? ' selected' : ''}`} onClick={() => onPick(id)}>
      <Radio />
      <div className="option-content">
        <div className="option-title">
          {title}
          <FeeBadge rate={rate} note={note} />
          {recommended && <span className="highlight-tag">Recommended</span>}
        </div>
        <Claims items={claims} />
      </div>
    </div>
  )
}

/** 5C — Advisory. The reasoning line is the transparency mechanism: a
 *  recommendation with visible logic is arguable. The "when we don't recommend
 *  it" disclosure is what keeps it from being an upsell with a badge on it. */
export function T5C({ choice, onPick }: Step5Props) {
  return (
    <>
      <Eyebrow />
      <div className="modal-headline">
        Since you plan to have international payments, we recommend Managed Payments.
      </div>
      <div className="reason-card">
        <div className="reason-head">Why we&rsquo;re recommending this</div>
        <Reason>You sell {GOODS}, which crosses borders by default.</Reason>
        <Reason>
          You named customers in {marketList()} &mdash; three separate tax and dispute regimes.
        </Reason>
        <Reason>
          You told us you&rsquo;re not registered for tax outside the United States yet.
        </Reason>
      </div>
      <div className="option-cards">
        <AdvisoryCard
          id="smp"
          choice={choice}
          onPick={onPick}
          title="Managed Payments"
          rate="+3.5% per transaction"
          note="On top of standard processing fees (3.4% for international)."
          recommended
          claims={[
            <>
              Stripe becomes the <MerchantOfRecord />, so the tax liability is Stripe&rsquo;s
            </>,
            'Payments processed locally, which banks approve more often',
            'Stripe handles disputes, fraud, and payment support',
          ]}
        />
        <AdvisoryCard
          id="self"
          choice={choice}
          onPick={onPick}
          title="Manage myself"
          rate="2.9% domestic / 3.4% international"
          note="Standard Stripe processing fees. No additional fee."
          claims={[
            <>
              You stay the <MerchantOfRecord /> and own the tax liability
            </>,
            'You set up local processing yourself, market by market',
            'You handle disputes, fraud, and payment support',
          ]}
        />
      </div>
      <Disclosure label="When we’d tell you not to use this">
        If almost all your volume is domestic, or you already have tax registrations and a team
        handling disputes in your markets, Managed Payments is likely to cost you more than it
        saves. We&rsquo;d tell you to manage it yourself.
      </Disclosure>
    </>
  )
}

const DIFF_ROWS: [string, string, ReactNode, boolean][] = [
  ['Who the customer buys from', 'You, in every country you sell to', 'Stripe', true],
  ['Tax registration and filing', 'You, wherever you cross a threshold', 'Stripe', true],
  [
    'How payments are processed',
    'Cross-border from the United States',
    <>Locally, in each customer&rsquo;s market</>,
    true,
  ],
  ['Disputes', 'You answer them, under local rules', 'Stripe answers them', true],
  ['Fraud', 'Your rules, tuned per market', <>Stripe&rsquo;s, tuned per market</>, true],
  ['Payment support', 'You, in their language and timezone', 'Stripe', true],
  ['Your product and pricing', 'Yours', 'Yours', false],
  ['Your brand and checkout', 'Yours', 'Yours', false],
  ['Your customer relationship', 'Yours', 'Yours', false],
]

/** 5D — Diff view. Answers the question users actually have: what's different if
 *  I say yes? Makes "nothing changes about your product or your customers" a
 *  visible row rather than a promise. */
export function T5D({ choice, share, onPick }: Step5Props) {
  return (
    <>
      <Eyebrow />
      <div className="modal-headline">
        Here&rsquo;s exactly what Managed Payments changes.{' '}
        <span className="muted">And what it doesn&rsquo;t.</span>
      </div>
      <table className="ldgt">
        <thead>
          <tr>
            <th></th>
            <th>
              <div
                className={`ldg-head-card${choice === 'self' ? ' selected' : ''}`}
                onClick={() => onPick('self')}
              >
                <div className="ldg-col-head">
                  <Radio />
                  <div className="ldg-col-title">Manage myself</div>
                </div>
                <div className="ldg-price">
                  <FeeBadge
                    rate="2.9% / 3.4%"
                    note="Standard Stripe processing fees. No additional fee."
                  />
                  <span className="neutral-tag">Effective {pct(eff('self', share))}</span>
                </div>
              </div>
            </th>
            <th>
              <div
                className={`ldg-head-card${choice === 'smp' ? ' selected' : ''}`}
                onClick={() => onPick('smp')}
              >
                <div className="ldg-col-head">
                  <Radio />
                  <div className="ldg-col-title">Managed Payments</div>
                </div>
                <div className="ldg-price">
                  <FeeBadge
                    rate="+3.5% per transaction"
                    note="On top of standard processing fees (3.4% for international)."
                  />
                  <span className="neutral-tag">Effective {pct(eff('intl', share))}</span>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {DIFF_ROWS.map(([what, today, withSmp, changes]) => (
            <tr key={what}>
              <td>{what}</td>
              <td className={changes ? '' : 'same'}>{today}</td>
              <td className={changes ? 'changed' : 'same'}>
                {withSmp}
                {changes ? (
                  <span className="diff-flag">changes</span>
                ) : (
                  <span className="diff-flag none">no change</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

function DPanel({
  id,
  choice,
  onPick,
  title,
  rate,
  note,
  sub,
  claims,
  h1,
  list1,
  h2,
  list2,
}: {
  id: Choice
  choice: Choice
  onPick: (choice: Choice) => void
  title: string
  rate: string
  note: string
  sub: ReactNode
  claims: ReactNode[]
  h1: string
  list1: ReactNode[]
  h2: string
  list2: ReactNode[]
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`dpanel${choice === id ? ' selected' : ''}`} onClick={() => onPick(id)}>
      <div className="dpanel-head">
        <Radio />
        <div style={{ flex: 1 }}>
          <div className="dpanel-title">{title}</div>
        </div>
        <FeeBadge rate={rate} note={note} />
      </div>
      <div className="dpanel-sub">{sub}</div>
      <Claims items={claims} />
      <div className={`dpanel-detail${open ? ' open' : ''}`}>
        <div>
          <div className="detail-h">{h1}</div>
          <Claims items={list1} />
          <div className="detail-h">{h2}</div>
          <Claims items={list2} />
        </div>
      </div>
      <button
        className="dpanel-expand"
        onClick={(e) => {
          e.stopPropagation()
          setOpen((o) => !o)
        }}
      >
        {open ? <>Hide the detail &uarr;</> : <>See the detail &darr;</>}
      </button>
    </div>
  )
}

/** 5E — Progressive two-panel. Lowest overload, everything present but layered.
 *  The objection: depth behind a disclosure is depth most people never open. */
export function T5E({ choice, onPick }: Step5Props) {
  return (
    <>
      <Eyebrow />
      <div className="modal-headline">
        Two ways to sell into {marketList()}.{' '}
        <span className="muted">The difference is who does the work.</span>
      </div>
      <div className="dpanels">
        <DPanel
          id="self"
          choice={choice}
          onPick={onPick}
          title="Manage myself"
          rate="2.9% domestic / 3.4% international"
          note="Standard Stripe processing fees. No additional fee."
          sub={
            <>
              You stay the <MerchantOfRecord />. You keep every obligation that comes with selling
              across borders.
            </>
          }
          claims={[
            'You own the tax liability in every market',
            'You set up local processing yourself',
            'You answer disputes and run fraud review',
          ]}
          h1="What you’d take on"
          list1={[
            'Tax registration and filing wherever you cross a local threshold',
            'A legal basis to process payments in-market, country by country',
            'Chargebacks judged under local consumer protection rules',
            'Fraud review and rules per market',
            <>Refunds and payment support in the customer&rsquo;s language and timezone</>,
          ]}
          h2="Products that cover some of it"
          list2={[
            <>Stripe Tax &mdash; calculation and filing</>,
            <>Radar &mdash; fraud rules and review</>,
            'Dispute handling tools',
          ]}
        />
        <DPanel
          id="smp"
          choice={choice}
          onPick={onPick}
          title="Managed Payments"
          rate="+3.5% per transaction"
          note="On top of standard processing fees (3.4% for international)."
          sub={
            <>
              Stripe becomes the <MerchantOfRecord /> and takes on what comes with it.
            </>
          }
          claims={[
            'Tax liability sits with Stripe',
            'Payments processed locally, so more get approved',
            'Stripe handles disputes, fraud, and support',
          ]}
          h1="What Stripe takes on"
          list1={[
            'Registering, charging, and filing tax in each market',
            'Local processing and local payment methods',
            'Disputes, under whichever rules apply',
            'Fraud prevention and review',
            'Payment support for your customers',
          ]}
          h2="What stays yours"
          list2={[
            'Your product, your pricing, your brand',
            'Your customer relationship',
            'Your data and reporting',
          ]}
        />
      </div>
    </>
  )
}

function BeatDots({
  beats,
  beat,
  onSetBeat,
}: {
  beats: string[]
  beat: number
  onSetBeat: (beat: number) => void
}) {
  return (
    <div className="beat-dots">
      {beats.map((label, i) => (
        <span
          key={label}
          className={`beat-dot${i <= beat ? ' on' : ''}`}
          title={label}
          onClick={() => onSetBeat(i)}
        ></span>
      ))}
    </div>
  )
}

const BEATS_5F = ['What this involves', 'What Managed Payments does', 'Your two options']

/** 5F — Sub-stepped. The real overload problem isn't the number of options, it's
 *  teaching and asking at the same time; this is the only treatment that
 *  separates them. */
export function T5F({ choice, share, onPick, beat, onSetBeat }: Step5Props) {
  const dots = <BeatDots beats={BEATS_5F} beat={beat} onSetBeat={onSetBeat} />

  if (beat === 0) {
    return (
      <>
        {dots}
        <div className="modal-headline">
          Selling {GOODS} into {marketList()} makes you responsible for more than payments.
        </div>
        <div className="step-body">
          The moment you take money from a customer in another country, you take on that
          country&rsquo;s rules. Here&rsquo;s what yours involve.
        </div>
        <div className="obl-list">
          {MARKETS.map((m) => (
            <div className="obl" key={m}>
              <div className="obl-mkt">{m}</div>
              <div className="obl-text">{MARKET_FACTS[m]}</div>
            </div>
          ))}
          <div className="obl">
            <div className="obl-mkt">Everywhere</div>
            <div className="obl-text">
              Disputes on local timelines, fraud review per market, and payment support in the
              customer&rsquo;s language.
            </div>
          </div>
        </div>
        <div className="footnote">
          Thresholds shown are illustrative and need verifying before this ships.
        </div>
      </>
    )
  }

  if (beat === 1) {
    return (
      <>
        {dots}
        <div className="modal-headline">Managed Payments makes Stripe the merchant of record.</div>
        <div className="step-body">
          The <MerchantOfRecord /> is the business the customer legally buys from &mdash; whose name
          is on the statement, who owes the tax, who the bank comes to in a dispute. Today
          that&rsquo;s you, in every country you sell to. With Managed Payments it&rsquo;s Stripe.
        </div>
        <div className="benefit-list">
          <Benefit>Tax registration, charging, and filing sit with Stripe</Benefit>
          <Benefit>Payments are processed locally, so more of them get approved</Benefit>
          <Benefit>Stripe handles disputes, fraud, and payment support</Benefit>
        </div>
        <div className="step-body" style={{ marginTop: '16px' }}>
          You keep your product, your pricing, your brand, and your relationship with your
          customers. That&rsquo;s the whole trade.
        </div>
      </>
    )
  }

  return (
    <>
      {dots}
      <div className="modal-headline">
        Two ways to do this. <span className="muted">The difference is who does the work.</span>
      </div>
      <Ledger choice={choice} share={share} onPick={onPick} />
    </>
  )
}

/** 5G's framing beat is market-agnostic: five obligations, each stated as
 *  something that recurs with every new market. */
const PROBLEMS = [
  {
    title: 'Tax registration and filing',
    line: 'Every new market means a new tax registration and a new filing schedule.',
    detail:
      'Rates, thresholds, and deadlines are set by each country — and digital goods often owe tax from the very first sale.',
  },
  {
    title: 'Local processing',
    line: 'Every new market needs its own local processing and its own payment methods.',
    detail:
      'Cards charged from outside the customer’s country get declined more often. And in many markets people pay by bank transfer, wallet, or invoice rather than by card — if you don’t offer those, they leave at checkout.',
  },
  {
    title: 'Disputes',
    line: 'Every new market judges disputes under its own consumer protection rules.',
    detail:
      'Chargebacks arrive on local timelines, with local evidence requirements, and the window can stay open for months after the sale.',
  },
  {
    title: 'Fraud',
    line: 'Every new market brings its own fraud patterns, and rules tuned for one don’t hold in the next.',
    detail:
      'What looks risky at home can be normal behaviour elsewhere. Block too much and you lose good customers; block too little and you pay for it.',
  },
  {
    title: 'Payment support',
    line: 'Every new market expects support in its own language and timezone.',
    detail:
      'Refunds, failed payments, and billing questions keep coming, and they scale with volume rather than with headcount.',
  },
]

const BEATS_5G = ['What this involves', 'Who the merchant is', 'Your two options']

/** 5G — Per-market multiplier. 5A argues who does the work; this argues that the
 *  work repeats every time you grow. No Stripe claim until beat 2, then all five
 *  resolve into one question — who is the merchant of record. */
export function T5G({ choice, share, onPick, beat, onSetBeat }: Step5Props) {
  const dots = <BeatDots beats={BEATS_5G} beat={beat} onSetBeat={onSetBeat} />

  if (beat === 0) {
    return (
      <>
        {dots}
        <div className="modal-headline">
          Selling internationally can get complicated.{' '}
          <span className="muted">Here&rsquo;s what it involves.</span>
        </div>
        <div className="prob-list">
          {PROBLEMS.map((p, i) => (
            <Problem key={p.title} problem={p} delay={i * 70} />
          ))}
        </div>
        <div className="prob-closer">
          You can take all of this on. Plenty of businesses do. It&rsquo;s worth knowing what it is
          first.
        </div>
      </>
    )
  }

  if (beat === 1) {
    return (
      <>
        {dots}
        <div className="modal-headline">All five come down to one question.</div>
        <div className="hinge">Who is the merchant of record?</div>
        <div className="step-body">
          The <MerchantOfRecord /> is the business the customer legally buys from &mdash; whose name
          is on the statement, who owes the tax, who the bank comes to in a dispute. Right now, in
          every market you sell to, that&rsquo;s you.
        </div>
        <div className="step-body">
          <strong>With Managed Payments, Stripe becomes the merchant of record.</strong>
        </div>
        <div className="benefit-list">
          <Benefit>Stripe registers, charges, and files the tax</Benefit>
          <Benefit>Payments are processed locally, so more of them get approved</Benefit>
          <Benefit>Stripe handles disputes, fraud, and payment support</Benefit>
          <Benefit>You keep your product, your prices, your brand, and your customers</Benefit>
        </div>
        <div className="price-line">
          <span>It costs</span>
          <FeeBadge
            rate="+3.5% per transaction"
            note="On top of standard processing fees (3.4% for international)."
          />
          <span>on top of standard processing fees.</span>
        </div>
        <div className="footnote">
          You don&rsquo;t have to apply it to everything &mdash; that&rsquo;s the step after this
          one.
        </div>
      </>
    )
  }

  return (
    <>
      {dots}
      <div className="modal-headline">
        The same five, and who does them. <span className="muted">Both options priced.</span>
      </div>
      <Ledger choice={choice} share={share} onPick={onPick} />
      <div className="ldg-note">
        Managed Payments can cover some of your volume rather than all of it &mdash; that&rsquo;s
        the next step.
      </div>
    </>
  )
}

/** One of 5G's five obligations: the claim, the recurring line, and the
 *  consequence behind an expansion. */
function Problem({
  problem,
  delay,
}: {
  problem: { title: string; line: string; detail: string }
  delay: number
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="prob" style={{ animationDelay: `${delay}ms` }}>
      <div className="prob-title">
        {problem.title}
        <button className="row-more" onClick={() => setOpen((o) => !o)}>
          What this involves
        </button>
      </div>
      <div className="prob-line">{problem.line}</div>
      <div className={`row-detail${open ? ' open' : ''}`}>{problem.detail}</div>
    </div>
  )
}
