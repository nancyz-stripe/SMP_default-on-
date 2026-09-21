import type { ReactNode } from 'react'

function Check() {
  return (
    <svg
      className="benefit-check"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1.5 6.3l3 3 6-6.6" />
    </svg>
  )
}

/** What Managed Payments covers, as a checked list. */
export function BenefitList({ items }: { items: ReactNode[] }) {
  return (
    <div className="benefit-list">
      {items.map((item, i) => (
        <div className="benefit-row" key={i}>
          <Check />
          <span className="benefit-text">{item}</span>
        </div>
      ))}
    </div>
  )
}

/** "more revenue", with the explanation on hover or focus. */
export function RevenueTooltip({ children }: { children: ReactNode }) {
  return (
    <span className="revenue-wrap">
      <span className="revenue-link" tabIndex={0}>
        {children}
      </span>
      <span className="revenue-tooltip">
        Managed Payments can process payments locally in each customer&rsquo;s market. This can help
        banks approve them without you setting up payment operations there.
      </span>
    </span>
  )
}
