import type { ReactNode } from 'react'

/** The form controls and option rows the onboarding steps are built from. */

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

export type Row = { title: string; label?: string }

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
        <div
          key={item.title}
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
            <span className="row-title">{item.title}</span>
            {item.label && <span className="row-label">{item.label}</span>}
          </span>
        </div>
      ))}
    </div>
  )
}

export function Field({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div className="field">
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      {children}
    </div>
  )
}

export function Headline({ children }: { children: ReactNode }) {
  return <div className="headline">{children}</div>
}
