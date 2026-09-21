import type { ReactNode } from 'react'
import type { TreatmentKey } from './screen1'

/** The same three narratives as v3-narratives, on shorter labels — here they're
 *  the variable being held constant while the design treatment changes, rather
 *  than the thing under comparison. */

export type NarrativeKey = 'ready' | 'evidence' | 'alone'

export type Narrative = {
  name: string
  lede: ReactNode
  body: string
  closer: string
}

export const NARRATIVES: Record<NarrativeKey, Narrative> = {
  ready: {
    name: 'Ready',
    lede: (
      <>
        You&rsquo;re selling digital goods, which means you can grow faster than you expect &mdash;{' '}
        <span className="muted">and in directions you can&rsquo;t really predict.</span>
      </>
    ),
    body: 'This is how we’d set you up: ready for whatever turns up, whenever it does.',
    closer: 'Until then, nothing changes and nothing costs you anything.',
  },
  evidence: {
    name: 'Evidence',
    lede: (
      <>
        You&rsquo;re selling digital goods, which means you&rsquo;re going to grow.{' '}
        <span className="muted">Growth can get complicated.</span>
      </>
    ),
    body: 'Here’s what businesses like yours deal with as they grow.',
    closer:
      'Managed Payments is how Stripe handles it. Only pay for what you need, and stay in control.',
  },
  alone: {
    name: 'Alone',
    lede: (
      <>
        You&rsquo;re selling digital goods, which means you&rsquo;re going to grow.{' '}
        <span className="muted">
          Growing means running into things you haven&rsquo;t seen before.
        </span>
      </>
    ),
    body: 'You don’t need to work any of it out on your own. We’ve seen these thousands of times, and we’ll tell you when something happens.',
    closer: 'There’s nothing for you to do now, and nothing to pay until it happens.',
  },
}

export const THINGS: [string, string][] = [
  ['Local payment methods', 'What customers in each market expect to pay with'],
  ['Tax thresholds', 'Registering and remitting once you pass one somewhere'],
  ['Disputes', 'Different deadlines and evidence rules in every market'],
  ['Fraud', 'Patterns that vary market by market'],
]

export const TREATMENTS: Record<TreatmentKey, string> = {
  handoff: 'T1 — The handoff',
  editorial: 'T2 — Editorial type',
  stage: 'T3 — Split stage',
  ambient: 'T4 — Ambient depth',
}

/** What each treatment fixes, and what it costs. */
export const TREATMENT_NOTES: Record<TreatmentKey, ReactNode> = {
  handoff: (
    <>
      <b>T1 The handoff.</b> Fixes the inert list. Obligations start in your lane and move to
      Stripe&rsquo;s on a stagger &mdash; the argument is the motion, and your lane ending up empty.
      Most explanatory of the four.
    </>
  ),
  editorial: (
    <>
      <b>T2 Editorial type.</b> Fixes the timidity. No cards, no borders, 42px lede, one thought.
      Premium reads as confidence and confidence looks like empty space. Least informative per
      screen &mdash; would need more screens.
    </>
  ),
  stage: (
    <>
      <b>T3 Split stage.</b> Fixes the missing subject &mdash; restores a focal point to look at. A
      scatter field of markets standing by, with live dots pulsing. Deliberately not a globe, per
      the Aug 27 decision.
    </>
  ),
  ambient: (
    <>
      <b>T4 Ambient depth.</b> Fixes the flat template surface. Same layout, different material:
      deep field, real elevation, layered glass. Signals premium the way a paid product looks unlike
      a settings page. Furthest from current Stripe onboarding.
    </>
  ),
}
