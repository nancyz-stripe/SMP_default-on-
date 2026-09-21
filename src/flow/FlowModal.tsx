import type { ReactNode } from 'react'
import { StripeWordmark } from '../components/StripeWordmark'
import type { FlowAction, FlowStep } from './useFlow'

const LABELS: Record<FlowAction, string> = {
  continue: 'Continue',
  skip: 'Skip',
  live: 'Get your account live now',
  sandbox: 'Go to sandbox',
}

/** Every action advances — the flow's branches are decided by what's selected on
 *  a screen, not by which button ends it. */
const PRIMARY: FlowAction[] = ['continue', 'sandbox']

/** The onboarding modal: the wordmark over a progress bar, the step's content,
 *  and its actions in the footer.
 *
 *  Hidden on the two steps that replace it — the SMP screen, which brings its own
 *  modal, and the dashboard, which is the destination. */
export function FlowModal({
  step,
  progress,
  children,
  onNext,
  onBack,
  onHome,
  hidden,
}: {
  step: FlowStep
  progress: number
  children: ReactNode
  onNext: () => void
  onBack: () => void
  onHome: () => void
  hidden: boolean
}) {
  return (
    <div
      className="modal-backdrop"
      style={hidden ? { display: 'none' } : undefined}
      // Clicking outside the modal leaves the flow. Guarded on the target so
      // clicks inside it don't bubble up into an exit.
      onClick={(e) => {
        if (e.target === e.currentTarget) onHome()
      }}
    >
      <div className="modal">
        <div className="modal-header">
          <div className="stripe-logo">
            <StripeWordmark label="" />
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="modal-body">
          <div className={`step ${step.width ?? ''}`}>{children}</div>
        </div>

        <div className="modal-footer">
          <button
            className="back-link"
            style={step.back === false ? { visibility: 'hidden' } : undefined}
            onClick={onBack}
          >
            ← Back
          </button>
          <div className="footer-actions">
            {(step.actions ?? []).map((action) => (
              <button
                key={action}
                className={PRIMARY.includes(action) ? 'btn-continue' : 'btn-secondary'}
                onClick={onNext}
              >
                {LABELS[action]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
