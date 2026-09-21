import type { ReactNode } from 'react'

/** The three narratives.
 *
 *  Same opening move in all three — "you sell digital goods, so you'll grow" —
 *  because that's settled. They diverge on which beat carries the weight:
 *  readiness, evidence, or partnership. */

export type NarrativeKey = 'ready' | 'evidence' | 'alone'

export type Narrative = {
  name: ReactNode
  lede: ReactNode
  body: ReactNode
  /** A label above the list, where the narrative needs one to introduce it. */
  thingsIntro: string | null
  closer: ReactNode
  /** The reviewer's note in the control panel: what this framing buys and what
   *  it costs. */
  note: ReactNode
}

export const NARRATIVES: Record<NarrativeKey, Narrative> = {
  ready: {
    name: 'Set up now, ready when you are',
    lede: (
      <>
        You&rsquo;re selling digital goods, which means you can grow faster than you expect &mdash;{' '}
        <span className="muted">and in directions you can&rsquo;t really predict.</span>
      </>
    ),
    body: 'This is how we’d set you up: ready for whatever turns up, whenever it does.',
    thingsIntro: 'Ready for',
    closer: 'Until then, nothing changes and nothing costs you anything.',
    note: (
      <>
        <b>Readiness.</b> The calmest of the three &mdash; nobody is asked to do or decide anything.
        Weakest at making the fee feel earned, because it relieves an anxiety it never raises.
      </>
    ),
  },
  evidence: {
    name: 'Ready before you need it',
    lede: (
      <>
        You&rsquo;re selling digital goods, which means you&rsquo;re going to grow.{' '}
        <span className="muted">Growth can get complicated.</span>
      </>
    ),
    body: 'Here’s what businesses like yours deal with as they grow.',
    thingsIntro: null,
    // Their copy, with the missing full stop restored.
    closer:
      'Managed Payments is how Stripe handles it. Only pay for what you need, and stay in control.',
    note: (
      <>
        <b>Evidence.</b> The only one that shows the merchant something before asking for trust,
        which is what gives the fee something to attach to. Its closing line is the weakest of the
        three &mdash; it names the product early and swaps the conditional cost for two vaguer
        claims.
      </>
    ),
  },
  alone: {
    name: <>You won&rsquo;t be doing this alone</>,
    lede: (
      <>
        You&rsquo;re selling digital goods, which means you&rsquo;re going to grow.{' '}
        <span className="muted">
          Growing means running into things you haven&rsquo;t seen before.
        </span>
      </>
    ),
    body: 'You don’t need to work any of it out on your own. We’ve seen these thousands of times, and we’ll tell you when something happens.',
    thingsIntro: null,
    closer: 'There’s nothing for you to do now, and nothing to pay until it happens.',
    note: (
      <>
        <b>Partnership.</b> Warmest, and the one that best matches &ldquo;a partner that adapts over
        time&rdquo;. Carries the visibility promise the other two are missing.
      </>
    ),
  },
}

/** The four things that come up. Four, not seven — the point is recognition, not
 *  inventory. Each is one line with a quiet second line; no expanding. */
export const THINGS: [string, string][] = [
  ['Local payment methods', 'What customers in each market expect to pay with'],
  ['Tax thresholds', 'Registering and remitting once you pass one somewhere'],
  ['Disputes', 'Different deadlines and evidence rules in every market'],
  ['Fraud', 'Patterns that vary market by market'],
]
