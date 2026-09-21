import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ScopeFeeIcon } from '../../components/ScopeFeeIcon'
import { FeeRate } from '../../components/FeeRate'
import { Term } from '../../components/Term'
import { OBLIGATIONS, eff, pct, type Choice } from './state'

/** The pieces the treatments are assembled from. */

/** One way to show a rate, everywhere: the number, and what it sits on top of.
 *  The rate slides when it changes rather than cutting, which is why it goes
 *  through `FeeRate`. */
export function FeeBadge({ rate, note }: { rate: string; note: string }) {
  return (
    <span className="fee-badge">
      <FeeRate rate={rate} />
      <ScopeFeeIcon className="fee-icon" />
      <span className="fee-tooltip">{note}</span>
    </span>
  )
}

export function Tick() {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1.5 6.3l3 3 6-6.6" />
    </svg>
  )
}

export function BenefitCheck() {
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

export function Radio() {
  return (
    <div className="radio-circle">
      <div className="radio-inner-dot"></div>
    </div>
  )
}

export function Benefit({ children }: { children: ReactNode }) {
  return (
    <div className="benefit-row">
      <BenefitCheck />
      <span className="benefit-text">{children}</span>
    </div>
  )
}

export function Claims({ items }: { items: ReactNode[] }) {
  return (
    <div className="claim-list">
      {items.map((item, i) => (
        <div className="claim" key={i}>
          <Tick />
          <span>{item}</span>
        </div>
      ))}
    </div>
  )
}

/** The concept the whole comparison turns on. */
export function MerchantOfRecord() {
  return (
    <Term label="merchant of record">
      The business the customer legally buys from. It&rsquo;s whose name is on the statement, who
      owes tax on the sale, and who the bank comes to in a dispute. Today that&rsquo;s you, in every
      country you sell to.
    </Term>
  )
}

/** A row that can be expanded to say what the obligation actually involves. */
function MoreRow({
  label,
  detail,
  children,
}: {
  label: ReactNode
  detail: ReactNode
  children?: ReactNode
}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <tr>
        <td>
          {label}{' '}
          <button className="row-more" onClick={() => setOpen((o) => !o)}>
            What this involves
          </button>
        </td>
        {children}
      </tr>
      <tr className="detail">
        <td colSpan={3}>
          <div className={`row-detail${open ? ' open' : ''}`}>{detail}</div>
        </td>
      </tr>
    </>
  )
}

/** The responsibility ledger: rows are the obligations, and both columns say who
 *  does the work. Shared — 5A is the whole treatment, and 5F and 5G reach the
 *  same table on their third beat. */
export function Ledger({
  choice,
  share,
  onPick,
}: {
  choice: Choice
  share: number
  onPick: (choice: Choice) => void
}) {
  return (
    <table className="ldgt">
      <thead>
        <tr>
          <th></th>
          <th>
            <div
              className={`ldg-head-card${choice === 'self' ? ' selected' : ''}`}
              onClick={() => onPick('self')}
            >
              <div className="ldg-col-head">
                <Radio />
                <div className="ldg-col-title">Manage myself</div>
              </div>
              <div className="ldg-col-sub">
                You stay the <MerchantOfRecord /> and handle these yourself.
              </div>
              <div className="ldg-price">
                <FeeBadge
                  rate="2.9% domestic / 3.4% international"
                  note="Standard Stripe processing fees. No additional fee."
                />
                <span className="neutral-tag">Effective {pct(eff('self', share))}</span>
              </div>
            </div>
          </th>
          <th>
            <div
              className={`ldg-head-card${choice === 'smp' ? ' selected' : ''}`}
              onClick={() => onPick('smp')}
            >
              <div className="ldg-col-head">
                <Radio />
                <div className="ldg-col-title">Managed Payments</div>
              </div>
              <div className="ldg-col-sub">
                Stripe becomes the <MerchantOfRecord /> and takes these on.
              </div>
              <div className="ldg-price">
                <FeeBadge
                  rate="+3.5% per transaction"
                  note="On top of standard processing fees (3.4% for international)."
                />
                <span className="neutral-tag">Effective {pct(eff('intl', share))}</span>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {OBLIGATIONS.map((o) => (
          <MoreRow
            key={o.label}
            // The label carries a deliberate line break in the original.
            label={o.label.split('\n').map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
            detail={o.detail}
          >
            <td>
              <span className="owner you">You</span>
            </td>
            <td>
              <span className="owner stripe">Stripe</span>
            </td>
          </MoreRow>
        ))}
      </tbody>
    </table>
  )
}

/** The blended rate across all payments, which rolls to its new value rather
 *  than cutting — the number is the thing that changed, so it's the thing that
 *  moves. */
export function RateStrip({ value }: { value: number }) {
  return (
    <div className="rate-strip">
      <span className="label">Your effective rate across all payments</span>
      <span className="value">
        <TweenedRate value={value} />
      </span>
    </div>
  )
}

const TWEEN_MS = 300

function TweenedRate({ value }: { value: number }) {
  const [shown, setShown] = useState(value)
  const from = useRef(value)

  useEffect(() => {
    if (from.current === value) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      from.current = value
      setShown(value)
      return
    }
    const begin = from.current
    const t0 = performance.now()
    let frame = 0
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / TWEEN_MS)
      const eased = 1 - Math.pow(1 - p, 3)
      const at = begin + (value - begin) * eased
      setShown(at)
      from.current = at
      if (p < 1) frame = requestAnimationFrame(step)
      else from.current = value
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [value])

  return <>{pct(shown)}</>
}

/** A custom checkbox that answers Space and Enter, re-used by the step-6
 *  treatments. */
export function CoverageCheckbox({
  checked,
  label,
  onToggle,
}: {
  checked: boolean
  label: string
  onToggle: () => void
}) {
  return (
    <div className="coverage-toggle-row">
      <div className="coverage-toggle-left">
        <div
          className={`box${checked ? ' on' : ''}`}
          role="checkbox"
          aria-checked={checked}
          tabIndex={0}
          onClick={onToggle}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault()
              onToggle()
            }
          }}
        >
          <svg
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M1.5 5.2l2.2 2.2L8.5 2.6" />
          </svg>
        </div>
        <div className="switch-label">{label}</div>
      </div>
    </div>
  )
}

/** A collapsible block of prose, used for the "when we'd tell you not to" and
 *  the per-problem detail. */
export function Disclosure({
  label,
  children,
  className = 'link-later',
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button className={className} onClick={() => setOpen((o) => !o)}>
        {label}
      </button>
      <div className={`row-detail${open ? ' open' : ''}`} style={{ marginTop: '8px' }}>
        {children}
      </div>
    </>
  )
}
