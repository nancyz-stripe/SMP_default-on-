/** Placeholder data for the Managed Payments home page.
 *
 *  Every card carries two series: what happened with Managed Payments, and the
 *  modelled same-period figure without it. The pairing is the point of the page,
 *  so each metric is expressed as something that has a value in both worlds —
 *  "tax liability you carry" rather than "tax liability covered", which would be
 *  zero without the product and leave nothing to compare.
 *
 *  Every metric is phrased so that more is better and the measured series sits
 *  above the modelled one — fraud is what was PREVENTED rather than what was
 *  lost, for that reason. So the gap is always with − without, and purple is
 *  always the part Managed Payments accounts for, on the bars as on the lines. */

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

export type Unit = 'usd' | 'pct' | 'count'

/** How a card's headline figure is derived from its series.
 *
 *  `sum`  — the window's total (payment volume)
 *  `gap`  — the distance between the two series, which for uplift, liability and
 *           fraud IS the metric the card is named for
 *  `rate` — what was won against what resolved
 *  `last` — where a rate stands now */
export type Headline = 'sum' | 'gap' | 'rate' | 'last'

export type Card = {
  id: string
  hero?: boolean
  kind?: 'bars'
  title: string
  desc: string
  unit: Unit
  /** What the plotted series are in, which is not always what the headline is
   *  in: disputes are counted on the chart and quoted as a rate. */
  seriesUnit?: Unit
  headline: Headline
  withLabel: string
  withoutLabel: string
  with: number[]
  without: number[]
  /** Resolved disputes: the denominator a win rate is drawn from. */
  total?: number[]
  foot: (percent: string) => string
}

export const CARDS: Card[] = [
  {
    id: 'volume',
    hero: true,
    title: 'Payment volume',
    desc: 'The total value of successful payments processed through Stripe Managed Payments.',
    unit: 'usd',
    headline: 'sum',
    withLabel: 'Volume with Managed Payments',
    withoutLabel: 'Volume without',
    with: [12500, 13200, 13900, 14700, 15300, 15700, 16100, 15800, 16400, 16800, 17100, 16700],
    without: [10200, 10700, 11100, 11500, 11800, 11800, 11900, 11400, 11600, 11600, 11600, 11000],
    foot: (p) => `Managed Payments contributed to ${p} uplift in volume.`,
  },
  {
    id: 'revenue',
    title: 'Revenue',
    desc: 'Revenue earned from successful Managed Payments sales, excluding tax and adjusted for refunds.',
    unit: 'usd',
    headline: 'sum',
    withLabel: 'Revenue with Managed Payments',
    withoutLabel: 'Revenue without',
    with: [10600, 11200, 11800, 12500, 13000, 13300, 13600, 13400, 14000, 14300, 14500, 14200],
    without: [8700, 9100, 9400, 9800, 10000, 10000, 10100, 9600, 9900, 9900, 9900, 9400],
    foot: (p) => `Managed Payments contributed to ${p} uplift in revenue.`,
  },
  {
    id: 'tax',
    title: 'Tax liability covered',
    desc: 'The share of successful Managed Payments transactions where Stripe assumed tax liability instead of your business.',
    unit: 'pct',
    // A share, so the headline is where it stands now rather than a total.
    headline: 'last',
    withLabel: 'Tax coverage with Managed Payments',
    withoutLabel: 'Tax coverage without',
    with: [86.5, 87.8, 88.9, 89.8, 90.6, 91.3, 91.9, 92.4, 92.9, 93.4, 93.8, 94.2],
    // The counterfactual is zero by definition: without Managed Payments the
    // liability is all yours, so there is no coverage to plot.
    without: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    foot: (p) => `Managed Payments contributed to ${p} uplift tax coverage.`,
  },
  {
    id: 'fraud',
    kind: 'bars',
    title: 'Fraud prevented',
    desc: "Estimated fraud loss avoided by Stripe's Managed Payments fraud controls.",
    unit: 'usd',
    // The gap is what Managed Payments' controls account for.
    headline: 'gap',
    // Plotted as loss PREVENTED, not loss taken: the baseline controls stop some
    // of it without the product, so grey is that floor and purple is what
    // Managed Payments adds on top of it.
    withLabel: 'Prevented with Managed Payments',
    withoutLabel: 'Prevented without',
    with: [1040, 1140, 1240, 1320, 1400, 1420],
    without: [480, 520, 560, 600, 640, 660],
    foot: (p) => `Managed Payments contributed to ${p} more fraud prevention.`,
  },
  {
    id: 'disputes',
    kind: 'bars',
    title: 'Disputes won',
    desc: 'Disputes Stripe won after submitting evidence, shown as a share of resolved disputes.',
    // Counts on the chart, a win rate in the headline.
    unit: 'pct',
    seriesUnit: 'count',
    headline: 'rate',
    withLabel: 'Won with Managed Payments',
    withoutLabel: 'Won without',
    with: [2, 3, 3, 3, 4, 3],
    without: [1, 1, 1, 1, 1, 1],
    total: [3, 4, 4, 4, 5, 4],
    foot: (p) => `Managed Payments contributed to ${p} more in successful disputes.`,
  },
]

/** The same account before and after it has any volume.
 *
 *  The new-user stages keep the series — the shape is what makes the card read as
 *  a chart — but mask them: blurred, the figure withheld, and an eye saying why
 *  (Figma 26655:71422).
 *
 *  Both new-user stages withhold the figures; what separates them is why, and the
 *  eye says which. Without the product there's nothing to report — the data
 *  belongs to a service the account hasn't turned on. With it there's nothing to
 *  report YET, which is a waiting state rather than a locked one, so it doesn't
 *  carry the hero either: there's nothing left to sell. */
export type Stage = {
  id: string
  label: string
  masked: boolean
  smp: boolean
  note?: string
}

export const STAGES: Stage[] = [
  {
    id: 'new-no-smp',
    label: 'New users (without SMP)',
    masked: true,
    smp: false,
    note: 'Data only available with Managed Payments.',
  },
  {
    id: 'new-smp',
    label: 'New users (with SMP)',
    masked: true,
    smp: true,
    note: 'Nothing to show yet. Data will appear once payments start coming in.',
  },
  { id: 'volume', label: 'With volume', masked: false, smp: true },
]

export const TAB_IDS = ['performance', 'locations'] as const
export type TabId = (typeof TAB_IDS)[number]

export type Coverage = 'all' | 'intl'

/** What the account has Stripe managing decides what the scope select can even
 *  offer: on international-only there's one lens on the data, because domestic
 *  volume isn't Stripe's to report on and "all payments" would claim coverage the
 *  account hasn't bought. */
export const SCOPES_BY_COVERAGE: Record<Coverage, string[]> = {
  all: ['All payments', 'International payments', 'Domestic payments'],
  intl: ['International payments'],
}

export type Location = { code: string; name: string; on: boolean; vol?: number }

/** Where the account sells, and whether Stripe is managing it there (Figma
 *  26655:63683). Volume is the design's; tax covered is derived at 94% of it
 *  rather than repeated verbatim, since the design's two columns carry the same
 *  number and the Performance tab already puts coverage at 94.2%.
 *
 *  The counts on the tiles and in the footer are counted from this list rather
 *  than authored, so they can't disagree with the rows underneath them. */
export const LOCATIONS: Location[] = [
  { code: 'US', name: 'United States', on: true, vol: 310500 },
  { code: 'IE', name: 'Ireland', on: true, vol: 250200 },
  { code: 'GB', name: 'United Kingdom', on: true, vol: 219000 },
  { code: 'DE', name: 'Germany', on: true, vol: 178800 },
  { code: 'ES', name: 'Spain', on: true, vol: 154200 },
  { code: 'IT', name: 'Italy', on: true, vol: 111300 },
  { code: 'FR', name: 'France', on: true, vol: 103900 },
  { code: 'BR', name: 'Brazil', on: true, vol: 92700 },
  { code: 'IN', name: 'India', on: true, vol: 64200 },
  { code: 'NL', name: 'Netherlands', on: true, vol: 58400 },
  { code: 'JP', name: 'Japan', on: true, vol: 47900 },
  { code: 'SE', name: 'Sweden', on: true, vol: 42000 },
  { code: 'CA', name: 'Canada', on: true, vol: 39500 },
  { code: 'AT', name: 'Austria', on: true, vol: 32200 },
  { code: 'DZ', name: 'Algeria', on: true, vol: 28800 },
  { code: 'NG', name: 'Nigeria', on: false },
  { code: 'CO', name: 'Colombia', on: false },
  { code: 'AR', name: 'Argentina', on: false },
  { code: 'PT', name: 'Portugal', on: false },
  { code: 'SG', name: 'Singapore', on: false },
]
