import type { ReactNode } from 'react'

export type OptionCard = {
  id: string
  title: ReactNode
  description?: ReactNode
  /** The "Recommended" chip some variants put beside a title. */
  badge?: string
}

/** A radio group drawn as cards, the shape the earlier explorations used to ask
 *  where Stripe should manage payments. */
export function OptionCards({
  options,
  selected,
  onSelect,
}: {
  options: OptionCard[]
  /** Empty until a choice is made, in the variants that open with none. */
  selected: string | null
  onSelect: (id: string) => void
}) {
  return (
    <div className="option-cards" role="radiogroup">
      {options.map((option) => (
        <div
          key={option.id}
          className={`option-card${selected === option.id ? ' selected' : ''}`}
          role="radio"
          aria-checked={selected === option.id}
          tabIndex={0}
          onClick={() => onSelect(option.id)}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault()
              onSelect(option.id)
            }
          }}
        >
          <div className="radio-circle">
            <div className="radio-inner-dot"></div>
          </div>
          <div className="option-content">
            <div className="option-title">
              {option.title}
              {option.badge && <span className="badge-recommended">{option.badge}</span>}
            </div>
            {option.description && <div className="option-description">{option.description}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}
