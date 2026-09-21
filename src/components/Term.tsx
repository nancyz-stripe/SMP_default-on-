import type { ReactNode } from 'react'

/** A term with its definition on hover. */
export function Term({ label, children }: { label: string; children: ReactNode }) {
  return (
    <span className="term">
      {label}
      <span className="term-pop">{children}</span>
    </span>
  )
}

/** "merchant of record", with the definition the narrative explorations lean on.
 *  The concept is what the add-on fee actually buys, so it's defined wherever
 *  it's used rather than assumed. */
export function MerchantOfRecord() {
  return (
    <Term label="merchant of record">
      <b>Merchant of record.</b> The business that legally sells to your customer and is responsible
      for tax, compliance, and disputes on that sale. When autopilot is engaged, Stripe takes that
      role for the sales it covers.
    </Term>
  )
}

/** A figure that hasn't been sourced yet, flagged as such rather than quietly
 *  shipped as though it were real. */
export function NeedsData({ children }: { children: ReactNode }) {
  return (
    <span className="needs-data">
      {children}
      <span className="nd-flag">needs data</span>
    </span>
  )
}

export function CheckIcon() {
  return (
    <svg className="ic" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M2 6.4 4.6 9 10 3.2" />
    </svg>
  )
}

export function DashIcon() {
  return (
    <svg className="ic" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M2.5 6h7" />
    </svg>
  )
}
