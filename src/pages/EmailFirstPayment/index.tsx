import { Link } from 'react-router-dom'
import { PageRoot } from '../../components/PageRoot'
import { BackHome } from '../../components/BackHome'
import { MailChrome } from '../../components/MailChrome'
import { StripeWordmark } from '../../components/StripeWordmark'
import './styles.css'

/** First-payment email (Figma 26799:123215). One screen, after the flow: what
 *  lands in the inbox on the first charge. Static — no behaviour to speak of. */
export default function EmailFirstPayment() {
  return (
    <PageRoot slug="email-first-payment">
      <BackHome />
      <MailChrome />

      <div className="mail">
        <div className="email">
          <span className="email-logo">
            <StripeWordmark />
          </span>

          <div className="email-body">
            <h1 className="email-h1">Congratulations, Screen Studio!</h1>

            <div className="email-stack">
              <div className="email-copy">
                <p>
                  You&rsquo;ve just made your first charge through Stripe Managed Payments for{' '}
                  <b>$29.00!</b>
                </p>
                <p>
                  Managed Payments reduces declined payments, takes on tax responsibility, and
                  handles fraud and disputes so you can focus on what&rsquo;s next for your
                  business.
                </p>
              </div>

              <div className="details">
                <span className="details-label">PAYMENT</span>
                <div className="details-amount">$29.00</div>

                <div className="details-rule"></div>

                <span className="details-label">CUSTOMER</span>
                <div className="details-customer">Jane Diaz</div>
                <div className="details-email">janediaz@gmail.com</div>

                <Link className="details-btn" to="/smp-home">
                  View in Dashboard
                </Link>
              </div>

              <div className="email-foot">
                <div className="email-foot-rule"></div>
                <p>
                  We&rsquo;re here to help. Visit our <a href="#">support website</a> for answers to
                  most questions and to get in touch with us.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageRoot>
  )
}
