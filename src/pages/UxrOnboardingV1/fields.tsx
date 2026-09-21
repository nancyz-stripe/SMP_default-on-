import type { ReactNode } from 'react'

/** The controls the flow's screens are built from. Several are this flow's own
 *  drawings rather than the archive flow's, so they live here. */

export function Check() {
  return (
    <svg
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1.5 5.2l2.2 2.2L8.5 2.6" />
    </svg>
  )
}

export function Tick() {
  return (
    <svg
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

/** The rounded-square info glyph this flow uses beside a field label or a row
 *  title. A different drawing from the 12px one on the fee badges. */
export function FieldInfo({ className = 'field-info' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 2.5H5C3.61929 2.5 2.5 3.61929 2.5 5V11C2.5 12.3807 3.61929 13.5 5 13.5H11C12.3807 13.5 13.5 12.3807 13.5 11V5C13.5 3.61929 12.3807 2.5 11 2.5ZM5 1C2.79086 1 1 2.79086 1 5V11C1 13.2091 2.79086 15 5 15H11C13.2091 15 15 13.2091 15 11V5C15 2.79086 13.2091 1 11 1H5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.25 8C6.25 7.58579 6.58579 7.25 7 7.25H8.25C8.66421 7.25 9 7.58579 9 8V11.5C9 11.9142 8.66421 12.25 8.25 12.25C7.83579 12.25 7.5 11.9142 7.5 11.5V8.75H7C6.58579 8.75 6.25 8.41421 6.25 8Z"
        fill="currentColor"
      />
      <path
        d="M6.75 5C6.75 4.31075 7.31075 3.75 8 3.75C8.68925 3.75 9.25 4.31075 9.25 5C9.25 5.68925 8.68925 6.25 8 6.25C7.31075 6.25 6.75 5.68925 6.75 5Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function FieldCaret() {
  return (
    <svg className="field-caret" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.03097 4.66406C6.35434 4.40537 6.82687 4.458 7.08566 4.78124C7.34441 5.1047 7.29192 5.57718 6.96847 5.83593L4.46847 7.83593C4.19458 8.05492 3.80482 8.05499 3.53097 7.83593L1.03097 5.83593C0.707765 5.57716 0.655188 5.10461 0.913782 4.78124C1.17248 4.45788 1.64503 4.40551 1.96847 4.66406L3.99972 6.28906L6.03097 4.66406Z"
        fill="currentColor"
      />
      <path
        d="M3.63839 0.0927679C3.90013 -0.0512708 4.22867 -0.0276259 4.46847 0.164057L6.96847 2.16406C7.29192 2.42281 7.34441 2.89529 7.08566 3.21874C6.82688 3.54206 6.35437 3.59464 6.03097 3.33593L3.99972 1.71093L1.96847 3.33593C1.64503 3.59454 1.1725 3.54213 0.913782 3.21874C0.655241 2.89536 0.707736 2.42279 1.03097 2.16406L3.53097 0.164057L3.63839 0.0927679Z"
        fill="currentColor"
      />
    </svg>
  )
}

/** A select can't hold an image, so the flag is drawn over the field and swapped
 *  when the choice changes. The assets are the 16x12 set the Locations table uses. */
export const FLAG_CODES: Record<string, string> = {
  'United States': 'US',
  Canada: 'CA',
  'United Kingdom': 'GB',
  Ireland: 'IE',
  Germany: 'DE',
  Australia: 'AU',
  Singapore: 'SG',
  Japan: 'JP',
}

export function CountrySelect({
  id,
  value,
  onChange,
}: {
  id: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="field-select">
      <img className="field-flag" src={`/assets/flags/${FLAG_CODES[value] ?? 'US'}.svg`} alt="" />
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {Object.keys(FLAG_CODES).map((country) => (
          <option key={country}>{country}</option>
        ))}
      </select>
      <FieldCaret />
    </div>
  )
}

export type Row = {
  title: string
  label?: string
  /** The one row that carries the info glyph and a note above it. */
  info?: boolean
  note?: string
}

/** Checkbox rows: multi-select, so any number of choices can be on at once. */
export function CheckRows({
  items,
  selected,
  onToggle,
}: {
  items: Row[]
  selected: number[]
  onToggle: (index: number) => void
}) {
  return (
    <div className="options">
      {items.map((item, i) => (
        <div key={item.title}>
          {item.note && <span className="option-note">{item.note}</span>}
          <div
            className={`option-row${selected.includes(i) ? ' selected' : ''}`}
            role="checkbox"
            aria-checked={selected.includes(i)}
            tabIndex={0}
            onClick={() => onToggle(i)}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault()
                onToggle(i)
              }
            }}
          >
            <span className="box">
              <Check />
            </span>
            <span style={{ flex: 1 }}>
              <span className="row-title">
                {item.title}
                {item.info && <FieldInfo className="row-info" />}
              </span>
              {item.label && <span className="row-label">{item.label}</span>}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

/** The price as a line under a card's benefits rather than a badge beside the
 *  title (Figma 26702:75102). It carries the tooltip that says what the fee sits
 *  on top of, since the number means nothing without it — and hovering or clicking
 *  it must not toggle the card it's in. */
export function FeeLink({ text, tip }: { text: string; tip: string }) {
  return (
    <span className="choice-fee-link" onClick={(e) => e.stopPropagation()}>
      {text}
      <span className="fee-tooltip">{tip}</span>
    </span>
  )
}

export type Benefit = { title: string; label: string }

export function Benefits({ items }: { items: Benefit[] }) {
  return (
    <span className="choice-benefits">
      {items.map((b) => (
        <span className="choice-benefit" key={b.title}>
          <Tick />
          <span style={{ flex: 1 }}>
            <span className="choice-benefit-title">{b.title}</span>
            <span className="choice-benefit-desc">{b.label}</span>
          </span>
        </span>
      ))}
    </span>
  )
}

export type Choice = {
  title: string
  label: string
  benefits?: Benefit[]
  feeNote?: string
  feeTip?: string
}

/** Radio cards: a single choice. The benefits and the fee belong to the
 *  recommended card and stay up whichever one is selected, so declining doesn't
 *  hide what's being declined or what it would have cost. */
export function Choices({
  items,
  selected,
  onSelect,
}: {
  items: Choice[]
  selected: number
  onSelect: (index: number) => void
}) {
  return (
    <div className="choice-list">
      {items.map((item, i) => {
        const on = selected === i
        return (
          <div
            key={item.title}
            className={`choice-card${on ? ' selected' : ''}`}
            role="radio"
            aria-checked={on}
            onClick={() => onSelect(i)}
          >
            <span className="radio">
              <i></i>
            </span>
            <span className="choice-body">
              <span className="choice-title-row">
                <span className="choice-title">{item.title}</span>
              </span>
              <span className="choice-sub">{item.label}</span>
              {item.benefits && <Benefits items={item.benefits} />}
              {item.feeNote && <FeeLink text={item.feeNote} tip={item.feeTip ?? ''} />}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export function Headline({ children }: { children: ReactNode }) {
  return <div className="headline">{children}</div>
}

export function Field({
  id,
  label,
  children,
}: {
  id: string
  label: ReactNode
  children: ReactNode
}) {
  return (
    <div className="field">
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      {children}
    </div>
  )
}
