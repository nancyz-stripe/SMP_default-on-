import type { ReactNode } from 'react'
import { NeedsData } from '../../components/Term'

/** Step 1's framing, and the copy the whole flow is anchored to.
 *
 *  The headline carries the justification for the flow's central assumption: we
 *  didn't ask whether they sell internationally because businesses like theirs
 *  do. Each variant has to land three things — the peer evidence, the assumption
 *  stated out loud, and the promise.
 *
 *  Naming the assumption is what keeps "assume global" from reading as
 *  presumptuous. If we quietly act on it, a domestic-only merchant feels
 *  railroaded; if we say "here's why we assumed this," they can disagree with a
 *  premise instead of hunting for an opt-out. */

/** Unsourced. Rendered as a visible placeholder rather than a plausible invented
 *  number — it's the most quotable line on the screen, and a made-up stat about
 *  the merchant's own peer group is the fastest way to lose them. */
export function PeerStat() {
  return <NeedsData>X%</NeedsData>
}

export type FrameKey = 'intl' | 'bridge' | 'growth'

export type Frame = {
  label: string
  headline: (stat: boolean) => ReactNode
  /** The "when" column, one label per trigger row. */
  when: string[]
  step2: ReactNode
  note: ReactNode
}

/** Three points on a spectrum of how early the word "international" appears, so
 *  the group can see the trade rather than pick between two poles.
 *
 *  Worth knowing: the locked anchor copy already opens on growth ("as your
 *  business grows"). Under `intl` the headline and the paragraph are anchored to
 *  different things; under `bridge` and `growth` they agree.
 *
 *  The trade: growth is inclusive but vague, international is specific but
 *  presumes more. Specificity is what makes SMP read as an answer to a real
 *  problem rather than an upsell, so a frame that never gets concrete has given
 *  something up. */
export const FRAMES: Record<FrameKey, Frame> = {
  intl: {
    label: 'International',
    // Digital goods in the causal position: it's why the assumption holds, not
    // a category we're filing them under.
    headline: (stat) => (
      <>
        Digital goods sell anywhere.{' '}
        <span className="muted">
          {stat ? (
            <>
              <PeerStat /> of businesses like yours end up selling internationally as they grow.
            </>
          ) : (
            'Businesses like yours usually end up selling internationally as they grow.'
          )}
        </span>
      </>
    ),
    // Geography-led.
    when: [
      'First sale abroad',
      'As disputes arrive',
      'At certain sales levels',
      'To process locally',
      'Continuously',
    ],
    step2: (
      <>
        We recommend letting Stripe manage international selling.{' '}
        <span className="muted">
          Nothing to set up now &mdash; Stripe steps in when you get there. You can also manage it
          yourself.
        </span>
      </>
    ),
    note: (
      <>
        <b>International-anchored.</b> Most specific, and the version where the fee is easiest to
        justify &mdash; the obligations named are unmistakably international. Costs the most in
        presumption: a domestic-only merchant has to read past a premise that isn&rsquo;t theirs. Note
        the headline and the anchor paragraph are anchored to different things here.
      </>
    ),
  },

  bridge: {
    label: 'Growth → markets',
    // Growth anchors, international arrives in the same breath as its
    // consequence: "supports growth at any stage" without giving up the
    // specificity that justifies the price.
    headline: (stat) => (
      <>
        Growing usually means selling in more places.{' '}
        <span className="muted">
          {stat ? (
            <>
              <PeerStat /> of businesses like yours end up selling internationally as they grow, so
              we&rsquo;ve set you up for it.
            </>
          ) : (
            <>
              Businesses like yours usually end up selling internationally, so we&rsquo;ve set you up
              for it.
            </>
          )}
        </span>
      </>
    ),
    when: [
      'Your first sale abroad',
      'As disputes arrive',
      'As sales build in a market',
      'To process locally',
      'Continuously',
    ],
    step2: (
      <>
        We recommend letting Stripe manage this as you grow.{' '}
        <span className="muted">
          Nothing to set up now &mdash; Stripe steps in when you get there. You can also manage it
          yourself.
        </span>
      </>
    ),
    note: (
      <>
        <b>Growth → markets.</b> The synthesis: growth anchors the sentence, international arrives as
        its consequence rather than its premise. Works for a new or an established business
        (John&rsquo;s point) while keeping the specificity that makes the fee defensible. Currently my
        pick.
      </>
    ),
  },

  growth: {
    label: 'Growth',
    // Purest reading of the review's ask. Geography doesn't appear until the
    // anchor paragraph — which then carries both the first mention of "global"
    // and the conditional cost, and has to do real work.
    headline: (stat) => (
      <>
        As your business grows, a few new things arrive.{' '}
        <span className="muted">
          {stat ? (
            <>
              <PeerStat /> of businesses like yours meet all of them within their first few years.
              Stripe handles each one for you.
            </>
          ) : (
            'Stripe handles each one for you, wherever your customers turn out to be.'
          )}
        </span>
      </>
    ),
    // Milestone-led, no geography.
    when: [
      'Your first sale abroad',
      'As disputes arrive',
      'As sales build in a market',
      'As volume concentrates',
      'Continuously',
    ],
    step2: (
      <>
        We recommend letting Stripe handle this as you grow.{' '}
        <span className="muted">
          Nothing to set up now &mdash; Stripe steps in when you get there. You can also manage it
          yourself.
        </span>
      </>
    ),
    note: (
      <>
        <b>Growth-anchored.</b> Least presumptuous and the most inclusive of business stage. The risk
        is vagueness: &ldquo;a few new things&rdquo; could be anything, and the obligations listed
        below are specifically international, so the anchor paragraph has to introduce geography{' '}
        <i>and</i> the conditional cost by itself. Watch whether the fee still feels earned.
      </>
    ),
  },
}

/** The anchor copy, verbatim. One source, so no screen can drift. */
export function AnchorCopy() {
  return (
    <p className="anchor-copy">
      These are the things you&rsquo;ll need as your business grows. Stripe will manage them for you
      as they come up (e.g. disputes, hitting tax thresholds). It only costs you when you start
      having global sales, so don&rsquo;t worry about it now if you&rsquo;re not there yet or
      don&rsquo;t know where your customers will come from.
    </p>
  )
}

/** What arrives, and what each one actually involves. The "when" label for each
 *  row comes from the active frame, so the column shifts from geography-led to
 *  milestone-led without the content changing. */
export const TRIGGERS: [string, string][] = [
  [
    'Local payment methods and currency',
    'Customers in most markets expect to pay with the methods they already use, priced in their own currency. Without that, they abandon checkout.',
  ],
  [
    'Chargebacks under local rules',
    'Dispute windows, evidence requirements, and deadlines differ by market and card network. Each one is a response on a clock.',
  ],
  [
    'Hitting tax thresholds',
    'Most countries require you to register, collect, and remit local sales tax or VAT once you pass a revenue threshold there. The threshold is different in every market, and crossing it is retroactive in some.',
  ],
  [
    'Local banking and entity requirements',
    'Processing in a market often means a local entity or banking relationship. It also lifts authorization rates, because issuers approve domestic transactions more often than cross-border ones.',
  ],
  [
    'Fraud, risk, and support across time zones',
    'Fraud patterns vary by market, and customer questions arrive in local business hours rather than yours.',
  ],
]
