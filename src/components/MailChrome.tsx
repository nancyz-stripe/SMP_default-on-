import { StripeWordmark } from './StripeWordmark'

/** The mail client's header, identical in both email prototypes: who it's from,
 *  when it arrived, and the star/reply/more controls. The `.chrome` classes are
 *  declared by each email's own stylesheet. */
export function MailChrome() {
  return (
    <div className="chrome">
      <div className="sender">
        <span className="avatar">
          <StripeWordmark label="" />
        </span>
        <span>
          <span className="sender-from">
            <b>Stripe</b> <span>managedpayments@stripe.com</span>
          </span>
          <span className="sender-to">to recipient</span>
        </span>
      </div>

      <div className="chrome-actions">
        <span className="chrome-date">Sep 3, 2026, 11:02 AM</span>
        <svg
          className="star"
          viewBox="0 0 18 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-label="Star"
        >
          <path d="M9 1.6l2.28 4.62 5.1.74-3.69 3.6.87 5.08L9 13.24l-4.56 2.4.87-5.08-3.69-3.6 5.1-.74z" />
        </svg>
        <svg
          className="reply"
          viewBox="0 0 22 22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-label="Reply"
        >
          <path d="M8 5.5L3 10.5l5 5" />
          <path d="M3 10.5h9a7 7 0 017 7v0" />
        </svg>
        <svg className="more" viewBox="0 0 4 16" fill="currentColor" aria-label="More">
          <circle cx="2" cy="2.5" r="1.6" />
          <circle cx="2" cy="8" r="1.6" />
          <circle cx="2" cy="13.5" r="1.6" />
        </svg>
      </div>
    </div>
  )
}
