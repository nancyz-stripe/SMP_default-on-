import { Link } from 'react-router-dom'
import { PageRoot } from '../../components/PageRoot'
import { BackHome } from '../../components/BackHome'
import { MailChrome } from '../../components/MailChrome'
import { StripeWordmark } from '../../components/StripeWordmark'
import './styles.css'

/** Approaching-tax-threshold email (Figma 26799:123215). Same shape as the
 *  first-payment email, but all copy — no details box — so the body is a stack
 *  of paragraphs with the button and sign-off under it. */
export default function EmailTaxThreshold() {
  return (
    <PageRoot slug="email-tax-threshold">
      <BackHome />
      <MailChrome />

      <div className="mail">
        <div className="email">
          <span className="email-logo">
            <StripeWordmark />
          </span>

          <div className="email-body">
            <div className="email-copy">
              <p>Hi Screen Studio,</p>

              <p>
                As your sales grow in more markets, the countries your customers are in will require
                you to collect and remit tax once you reach a certain level of activity there.{' '}
                <b>
                  In Germany, the tax threshold is &euro;12,349 and your sales have reached
                  &euro;10,000, so you&rsquo;re close to the threshold.
                </b>
              </p>

              <div className="email-steps">
                <p>
                  Once you cross this threshold, Germany requires you to collect and remit tax.
                  Here&rsquo;s what you can do to get ready:
                </p>
                <p>
                  Confirm your product categories: Tax rates vary by product type, so you should
                  check that each of your products is assigned an appropriate product category. Your
                  products are using your account&rsquo;s default category, Software as a Service.
                </p>
                <p>
                  Set up <span className="product">Managed Payments</span>: Stripe can take on tax
                  responsibility, reduce declined payments, and handle fraud and disputes so you
                  have lower overhead and can grow your global revenue.
                </p>
              </div>

              <p>If you have any questions, reply to this email, and we'll be happy to help.</p>
            </div>

            <Link className="email-btn" to="/smp-home">
              Set up Managed Payments
            </Link>

            <p>- The Stripe team</p>
          </div>
        </div>
      </div>
    </PageRoot>
  )
}
