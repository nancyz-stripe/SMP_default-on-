/** The Dashboard's nav column, as SMP Home draws it. Icons are CSS masks on
 *  `.nav-ico`, so the markup carries only their class.
 *
 *  Groups open and close, but only those that actually have children — turning a
 *  chevron over to reveal nothing would be a lie, and only Payments has a
 *  submenu here. */
import { useState } from 'react'

export function SideNav() {
  // Open on this page: Managed Payments is where we are.
  const [paymentsOpen, setPaymentsOpen] = useState(true)

  return (
    <nav className="side-nav">
      <div className="nav-group">
        <div className="nav-item">
          <span className="nav-icobox">
            <span className="nav-ico ico-home"></span>
          </span>
          <span className="nav-label">Home</span>
        </div>
        <div className="nav-item">
          <span className="nav-icobox">
            <span className="nav-ico ico-balance"></span>
          </span>
          <span className="nav-label">Balances</span>
        </div>
        <div className="nav-item">
          <span className="nav-icobox">
            <span className="nav-ico ico-arrows-loop"></span>
          </span>
          <span className="nav-label">Transactions</span>
        </div>
        <div className="nav-item">
          <span className="nav-icobox">
            <span className="nav-ico ico-person"></span>
          </span>
          <span className="nav-label">Directory</span>
        </div>
        <div className="nav-item">
          <span className="nav-icobox">
            <span className="nav-ico ico-product"></span>
          </span>
          <span className="nav-label">Product catalog</span>
        </div>
      </div>

      <div className="nav-group">
        <div className="nav-heading">Products</div>
        <div
          className={`nav-item${paymentsOpen ? ' open' : ''}`}
          aria-expanded={paymentsOpen}
          onClick={() => setPaymentsOpen((open) => !open)}
        >
          <span className="nav-icobox">
            <span className="nav-ico ico-wallet"></span>
          </span>
          <span className="nav-label">Payments</span>
          <span className="nav-chevron"></span>
        </div>
        {paymentsOpen && (
          <div className="nav-sub">
            <div className="nav-item nav-subitem">
              <span className="nav-label">Analytics</span>
            </div>
            <div className="nav-item nav-subitem">
              <span className="nav-label">Checkout</span>
            </div>
            <div className="nav-item nav-subitem active">
              <span className="nav-label">Managed Payments</span>
            </div>
            <div className="nav-item nav-subitem">
              <span className="nav-label">Disputes</span>
            </div>
            <div className="nav-item nav-subitem">
              <span className="nav-label">Terminal</span>
            </div>
            <div className="nav-item nav-subitem">
              <span className="nav-label">Agentic commerce</span>
            </div>
          </div>
        )}
        <div className="nav-item">
          <span className="nav-icobox">
            <span className="nav-ico ico-billing"></span>
          </span>
          <span className="nav-label">Billing</span>
          <span className="nav-chevron"></span>
        </div>
        <div className="nav-item">
          <span className="nav-icobox">
            <span className="nav-ico ico-bar-chart"></span>
          </span>
          <span className="nav-label">Reporting</span>
          <span className="nav-chevron"></span>
        </div>
        <div className="nav-item">
          <span className="nav-icobox">
            <span className="nav-ico ico-more"></span>
          </span>
          <span className="nav-label">More</span>
          <span className="nav-chevron"></span>
        </div>
      </div>
    </nav>
  )
}
