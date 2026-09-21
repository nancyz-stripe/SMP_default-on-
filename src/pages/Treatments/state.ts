/** Shared state for the treatments review.
 *
 *  Steps 3 and 4 have already happened: the user sells AI services and named
 *  three regions. Every treatment reads from here, so the carry-over between
 *  screens is real rather than hardcoded per screen. */

export type Choice = 'smp' | 'self'
export type Scope = 'intl' | 'all'

export const GOODS = 'AI services'

export type Market =
  'Europe' | 'United Kingdom' | 'Asia-Pacific' | 'Canada' | 'Latin America' | 'Middle East & Africa'

export const MARKETS: Market[] = ['Europe', 'United Kingdom', 'Asia-Pacific']

/** Placeholders. The all-payments price is the open dependency, so both scopes
 *  assume the same +3.5% on whatever volume they cover. */
export const R = { dom: 2.9, intl: 3.4, smp: 3.5 }

export const pct = (n: number) => `${n.toFixed(2)}%`

/** The blended rate, given an international share of volume. */
export function eff(mode: Choice | Scope, share: number) {
  const s = share
  const d = 1 - s
  if (mode === 'self') return R.dom * d + R.intl * s
  if (mode === 'intl') return R.dom * d + (R.intl + R.smp) * s
  return (R.dom + R.smp) * d + (R.intl + R.smp) * s
}

/** "Europe, United Kingdom and Asia-Pacific" */
export function marketList(markets: Market[] = MARKETS) {
  if (markets.length < 2) return markets[0]
  return `${markets.slice(0, -1).join(', ')} and ${markets[markets.length - 1]}`
}

export const MARKET_FACTS: Record<Market, string> = {
  Europe: 'VAT registration once you cross €10,000 of EU sales, then filing wherever you owe.',
  'United Kingdom': 'UK VAT from your first sale, and chargebacks judged under UK consumer rules.',
  'Asia-Pacific': 'Japanese consumption tax registration, and customers who expect local methods.',
  Canada: 'GST/HST registration at CAD 30,000, plus provincial rules on top.',
  'Latin America': 'Local tax withholding, and a market where Pix and boleto outweigh cards.',
  'Middle East & Africa':
    'VAT regimes that vary by country, and low card approval without local processing.',
}

/** Where each market sits on the globe. */
export const REGION_COORDS: Record<Market, { lat: number; lng: number }> = {
  Europe: { lat: 52.5, lng: 13.4 },
  'United Kingdom': { lat: 51.5, lng: -0.1 },
  'Asia-Pacific': { lat: 35.7, lng: 139.7 },
  Canada: { lat: 43.7, lng: -79.4 },
  'Latin America': { lat: -23.5, lng: -46.6 },
  'Middle East & Africa': { lat: 25.2, lng: 55.3 },
}

/** The home market, and a second domestic point for the arc that only appears
 *  once Managed Payments covers domestic volume. */
export const HOME = { lat: 40.7, lng: -74 }
export const HOME_2 = { lat: 37.8, lng: -122.4 }

export const NOTE_INTL = 'On top of standard processing fees (3.4% for international).'
export const NOTE_ALL =
  'On top of standard processing fees (3.4% for international and 2.9% for domestic).'

export const OBLIGATIONS: { label: string; detail: string }[] = [
  {
    label: 'Tax registration\nand filing',
    detail:
      'Register where you cross a local threshold, charge the right rate, file on time in each place.',
  },
  {
    label: 'Local processing',
    detail:
      'A legal basis to process in-market, so the customer’s bank sees a domestic transaction rather than a foreign one.',
  },
  {
    label: 'Disputes',
    detail:
      'Chargebacks are judged under the customer’s local consumer protection rules, on their timeline.',
  },
  {
    label: 'Fraud',
    detail:
      'Review and rules tuned per market, where the patterns and the risk tolerance both differ.',
  },
  {
    label: 'Payment support',
    detail:
      'Refunds, failed payments, and billing questions, in the customer’s language and timezone.',
  },
]
