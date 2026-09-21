import { CARD_IDS, useValueCardCycle, useValueCardLayout, type CardId } from './useValueCards'

/** What Managed Payments takes on, said three ways. The cards float over the
 *  globe and cycle in and out; their positions come from the globe's diameter
 *  rather than the panel's, which is how they stay put across the variants'
 *  different globe sizes. */

const CARDS: Record<
  CardId,
  { className: string; title: string; subtitle: string; icon: React.ReactNode }
> = {
  'card-disputes': {
    className: 'disputes',
    title: 'Dispute handling',
    subtitle: 'Dispute countered by Stripe',
    icon: (
      <path
        d="M8 1.5L2 4v4c0 3.5 2.5 6 6 7.5 3.5-1.5 6-4 6-7.5V4L8 1.5z"
        stroke="#635bff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  'card-tax': {
    className: 'tax',
    title: 'Tax collection and remittance',
    subtitle: 'Automated tax operations',
    icon: (
      <>
        <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="#635bff" strokeWidth="1.5" />
        <path d="M5 7h6M5 9.5h4" stroke="#635bff" strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },
  'card-fraud': {
    className: 'fraud',
    title: 'Fraud detection',
    subtitle: 'Proactive fraud prevention',
    icon: (
      <>
        <path
          d="M8 1.5L2 4v4c0 3.5 2.5 6 6 7.5 3.5-1.5 6-4 6-7.5V4L8 1.5z"
          stroke="#635bff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 8l1.5 1.5L10 7"
          stroke="#635bff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
}

export function ValueCards({
  diameter,
  box,
  enabled = true,
}: {
  /** The globe's pixel diameter, once the scene has reported it. */
  diameter: number | null
  /** The box the cards are positioned within. */
  box: { width: number; height: number } | null
  enabled?: boolean
}) {
  const visible = useValueCardCycle(enabled)
  const layout = useValueCardLayout(diameter, box)

  // Without a measured globe there's nowhere to put them, and painting them at
  // a default position first would show them jumping into place.
  if (!layout) return null

  return (
    <>
      {CARD_IDS.map((id) => {
        const card = CARDS[id]
        return (
          <div
            key={id}
            id={id}
            className={`globe-card ${card.className}${visible.has(id) ? ' visible' : ''}`}
            style={layout[id]}
          >
            <div className="globe-card-icon">
              <svg viewBox="0 0 16 16" fill="none">
                {card.icon}
              </svg>
            </div>
            <div className="globe-card-text">
              <span className="globe-card-title">
                {card.title}{' '}
                <svg className="globe-card-check" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8.5l3 3 7-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="globe-card-subtitle">{card.subtitle}</span>
            </div>
          </div>
        )
      })}
    </>
  )
}
