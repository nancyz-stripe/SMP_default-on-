import type { ReactNode } from 'react'
import { T5A, T5B, T5BRight, T5C, T5D, T5E, T5F, T5G, type Step5Props } from './step5'
import { T6A, T6B, T6C, T6D, type Step6Props } from './step6'

/** The eleven treatments, with the note that says what each one buys and what it
 *  costs. Ids are the review's own labels, so a note and a screen can be talked
 *  about by the same name. */

export type TreatmentId = '5A' | '5B' | '5C' | '5D' | '5E' | '5F' | '5G' | '6A' | '6B' | '6C' | '6D'

export type Treatment = {
  step: 5 | 6
  label: string
  note: ReactNode
  /** The modal spans both halves, with no right pane. */
  wide?: boolean | ((beat: number) => boolean)
  /** What fills the right pane: the globe, a bespoke pane, or nothing. */
  right?: 'globe' | 'pane' | null | ((beat: number) => 'globe' | null)
  render: (props: Step5Props & Step6Props) => ReactNode
  renderRight?: () => ReactNode
}

export const ORDER: TreatmentId[] = [
  '5A',
  '5B',
  '5C',
  '5D',
  '5E',
  '5F',
  '5G',
  '6A',
  '6B',
  '6C',
  '6D',
]

/** Treatments that walk beats inside step 5 before advancing the list. */
export const BEATED: TreatmentId[] = ['5F', '5G']

export const TREATMENTS: Record<TreatmentId, Treatment> = {
  '5A': {
    step: 5,
    wide: true,
    right: null,
    label: '5A — Responsibility ledger',
    note: (
      <>
        <b>5A Responsibility ledger.</b> Rows are the obligations; both columns say who does the
        work. Strongest escape-hatch parity, and the natural home for obligation-transfer motion.
        Watch the row count — five is the ceiling.
      </>
    ),
    render: (p) => <T5A {...p} />,
  },

  '5B': {
    step: 5,
    right: 'pane',
    label: '5B — Cost stack',
    note: (
      <>
        <b>5B Cost stack.</b> Compares total cost of ownership, not just fee against fee. Makes a
        premium price look like arithmetic. Also the most manipulable treatment here &mdash; the
        labour block stays deliberately unpriced.
      </>
    ),
    render: (p) => <T5B {...p} />,
    renderRight: () => <T5BRight />,
  },

  '5C': {
    step: 5,
    right: 'globe',
    label: '5C — Advisory + equal alternative',
    note: (
      <>
        <b>5C Advisory.</b> Closest to the copy as written. The reasoning line is the transparency
        mechanism &mdash; a recommendation with visible logic is arguable. Needs the &ldquo;when we
        don&rsquo;t recommend it&rdquo; disclosure to be real, or it&rsquo;s an upsell with a badge
        on it.
      </>
    ),
    render: (p) => <T5C {...p} />,
  },

  '5D': {
    step: 5,
    wide: true,
    right: null,
    label: '5D — Diff: what changes for you',
    note: (
      <>
        <b>5D Diff view.</b> Answers the question users actually have &mdash; what&rsquo;s different
        if I say yes? Makes &ldquo;nothing changes about your product or your customers&rdquo; a
        visible row rather than a promise. Weaker at signup, where there is no &ldquo;today&rdquo;
        yet.
      </>
    ),
    render: (p) => <T5D {...p} />,
  },

  '5E': {
    step: 5,
    wide: true,
    right: null,
    label: '5E — Progressive two-panel',
    note: (
      <>
        <b>5E Progressive two-panel.</b> Lowest overload, everything present but layered. Best for
        the expert who already knows this. The objection: depth behind a disclosure is depth most
        people never open, and leadership asked us to take the space.
      </>
    ),
    render: (p) => <T5E {...p} />,
  },

  '5F': {
    step: 5,
    wide: (beat) => beat === 2,
    right: (beat) => (beat === 2 ? null : 'globe'),
    label: '5F — Sub-stepped (3 beats)',
    note: (
      <>
        <b>5F Sub-stepped.</b> The fullest reading of &ldquo;take the space we need.&rdquo; The real
        overload problem isn&rsquo;t the number of options, it&rsquo;s teaching and asking at the
        same time &mdash; this is the only treatment that separates them. Honest objection:
        it&rsquo;s three screens wearing one step&rsquo;s clothing.
      </>
    ),
    render: (p) => <T5F {...p} />,
  },

  '5G': {
    step: 5,
    wide: (beat) => beat === 2,
    right: (beat) => (beat === 2 ? null : 'globe'),
    label: '5G — Per-market multiplier',
    note: (
      <>
        <b>5G Per-market multiplier.</b> A 5F variant whose framing beat is market-agnostic: five
        obligations, each stated as something that recurs with every new market. 5A argues who does
        the work; this argues that the work repeats every time you grow. No Stripe claim until beat
        2, then all five resolve into one question &mdash; who is the merchant of record.
      </>
    ),
    render: (p) => <T5G {...p} />,
  },

  '6A': {
    step: 6,
    right: 'globe',
    label: '6A — Checkbox upgrade',
    note: (
      <>
        <b>6A Checkbox upgrade.</b> The pattern already built, with the &ldquo;Save 30%&rdquo; badge
        and the confetti removed &mdash; celebrating the selection of a more expensive option
        rewards our outcome, not their decision. The rate readout below carries the change instead.
      </>
    ),
    render: (p) => <T6A {...p} />,
  },

  '6B': {
    step: 6,
    right: 'globe',
    label: '6B — Two explicit cards',
    note: (
      <>
        <b>6B Two explicit cards.</b> Most symmetrical and most honest &mdash; neither scope is the
        default. Loses the momentum of the extension framing the copy leans on.
      </>
    ),
    render: (p) => <T6B {...p} />,
  },

  '6C': {
    step: 6,
    right: 'globe',
    label: '6C — Coverage meter',
    note: (
      <>
        <b>6C Coverage meter.</b> Keeps the extension framing but makes the control a meter with a
        live blended rate, so the decision is proportionate to how much domestic volume they
        actually have. Depends on the volume-mix answer being real rather than assumed.
      </>
    ),
    render: (p) => <T6C {...p} />,
  },

  '6D': {
    step: 6,
    right: 'globe',
    label: '6D — Defer the domestic decision',
    note: (
      <>
        <b>6D Defer.</b> Lightest onboarding, and arguably the most honest &mdash; they have no
        volume data yet on which to make this call. But it drops a decision leadership explicitly
        asked to be in the flow.
      </>
    ),
    render: (p) => <T6D {...p} />,
  },
}

export const GRADIENTS = [
  { id: 'spotlight', label: 'Spotlight' },
  { id: 'full', label: 'Full screen' },
  { id: 'none', label: 'None' },
] as const

export const SHARES = [
  { id: '0.1', label: '10%' },
  { id: '0.25', label: '25%' },
  { id: '0.7', label: '70%' },
] as const

export type GradientId = (typeof GRADIENTS)[number]['id']
