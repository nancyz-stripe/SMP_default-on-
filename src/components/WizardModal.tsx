import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { StripeWordmark } from './StripeWordmark'

/** The FOX-pattern wizard modal: the wordmark over a progress bar, a question
 *  in the body, and Back / Continue pinned to the footer.
 *
 *  Three explorations share it. What differs between them goes in `behind`
 *  (a gradient wash, the globe and its ring) and in the body. */
export function WizardModal({
  progress,
  children,
  behind,
  onBack,
  onContinue,
  continueDisabled = false,
  backDisabled = false,
}: {
  progress: number
  children: ReactNode
  /** Painted inside the dialog, under the content. */
  behind?: ReactNode
  onBack?: () => void
  onContinue?: () => void
  continueDisabled?: boolean
  backDisabled?: boolean
}) {
  const navigate = useNavigate()

  return (
    // Dismissing on a backdrop click returns to the gallery.
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) navigate('/gallery')
      }}
    >
      <div className="modal-dialog">
        {behind}
        <div className="modal-header">
          <div className="stripe-logo">
            <StripeWordmark label="" />
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="modal-body">
          <div className="question-container">{children}</div>
        </div>

        <div className="modal-footer">
          <button className="back-link" disabled={backDisabled} onClick={onBack}>
            ← Back{' '}
          </button>
          <div className="footer-right">
            <button className="btn-continue" disabled={continueDisabled} onClick={onContinue}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/** The radio list the wizard's questions use. Its classes differ from the
 *  split-modal `OptionCards` — `.radio-outer` / `.option-text` here. */
export function OptionsList({
  options,
  selected,
  onSelect,
}: {
  options: { id: string; title: string; description?: string }[]
  selected: string | undefined
  onSelect: (id: string) => void
}) {
  return (
    <div className="options-list">
      {options.map((opt) => (
        <div
          key={opt.id}
          className={`option-card${selected === opt.id ? ' selected' : ''}`}
          role="radio"
          aria-checked={selected === opt.id}
          tabIndex={0}
          onClick={() => onSelect(opt.id)}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault()
              onSelect(opt.id)
            }
          }}
        >
          <div className="radio-outer">
            <div className="radio-inner"></div>
          </div>
          <div className="option-text">
            <div className="option-title">{opt.title}</div>
            {opt.description && <div className="option-description">{opt.description}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}
