import { CheckIcon, DashIcon, MerchantOfRecord } from '../../components/Term'
import { RATE, intlRate, pct } from '../../components/pricing'

export type Choice = 'smp' | 'self' | null

const SMP_FEATURES = [
  <>
    Stripe becomes the <MerchantOfRecord /> for international sales
  </>,
  'Local payment methods and currencies, handled',
  'Tax registration, collection, and remittance',
  'Disputes and chargebacks handled end to end',
  'Fraud and risk managed by Stripe',
  'Local processing, which lifts authorization rates',
]

const SELF_FEATURES: ['on' | 'off', string][] = [
  ['on', 'Card processing in 135+ currencies'],
  ['on', 'Stripe Tax available to calculate what you owe'],
  ['on', 'Radar available for fraud rules'],
  ['off', 'You register and remit tax in each market'],
  ['off', 'You respond to every dispute, on local deadlines'],
  ['off', 'You set up local entities or banking for local processing'],
]

/** Always rendered inline on both columns — the transparency half of the trade
 *  the framing depends on. */
export function PriceBlock({ kind }: { kind: 'smp' | 'self' }) {
  if (kind === 'smp') {
    return (
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
          On top of standard processing fees. Charged only on the volume Managed Payments covers
          &mdash; so nothing until you have international sales.
        </div>
      </div>
    )
  }
  return (
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
        No added fee. Tax, Radar, and support tooling are priced separately if you add them.
      </div>
    </div>
  )
}

export function SmpColumn({
  className,
  choice,
  onPick,
  priceOnly = false,
}: {
  className: string
  choice: Choice
  onPick: () => void
  priceOnly?: boolean
}) {
  return (
    <div className={`col ${className}${choice === 'smp' ? ' selected' : ''}`} onClick={onPick}>
      <div className="col-head">
        <span className="col-title">Managed Payments</span>
        <span className="tag-rec">Recommended</span>
      </div>
      {!priceOnly && (
        <div className="col-sub">
          Stripe manages the obligations of selling internationally as they come up.
        </div>
      )}
      <PriceBlock kind="smp" />
      {!priceOnly && (
        <div className="feat-list">
          {SMP_FEATURES.map((feature, i) => (
            <div className="feat" key={i}>
              <CheckIcon />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function SelfColumn({
  className,
  choice,
  onPick,
  priceOnly = false,
}: {
  className: string
  choice: Choice
  onPick: () => void
  priceOnly?: boolean
}) {
  return (
    <div className={`col ${className}${choice === 'self' ? ' selected' : ''}`} onClick={onPick}>
      <div className="col-head">
        <span className="col-title">Self-managed</span>
        <span className="tag-neutral">Fully supported</span>
      </div>
      {!priceOnly && (
        <div className="col-sub">
          You handle international obligations yourself, with Stripe products to help.
        </div>
      )}
      <PriceBlock kind="self" />
      {!priceOnly && (
        <div className="feat-list">
          {SELF_FEATURES.map(([state, label]) => (
            <div className={`feat${state === 'off' ? ' off' : ''}`} key={label}>
              {state === 'off' ? <DashIcon /> : <CheckIcon />}
              <span>{label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/** Who does the work, either way. Patches the frame's known weakness: "Stripe
 *  handles it" never says what the merchant would otherwise do. */
export const WORKLOAD = [
  'Local payment methods',
  'Tax registration and filing',
  'Disputes and chargebacks',
  'Fraud and risk decisions',
  'Customer support for payments',
  'Local entity and banking setup',
]
