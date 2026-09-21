import type { ReactNode } from 'react'

function NavItem({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="nav-item">
      <div className="nav-icon">
        <svg viewBox="0 0 16 16" fill="currentColor">
          {children}
        </svg>
      </div>
      <span className="nav-label">{label}</span>
    </div>
  )
}

/** The sandbox Dashboard behind the wizard-style modals: an account switcher
 *  over a nav column with icons, and an empty content plate.
 *
 *  Three explorations use it. Two of them drop the Product catalog row, which is
 *  the only difference between their copies. */
export function SandboxShell({ productCatalog = false }: { productCatalog?: boolean }) {
  return (
    <div className="shell">
      <div className="account-switcher">
        <div className="account-icon">
          <div className="sandbox-badge"></div>
        </div>
        <div className="account-text">
          <div className="account-name">Default sandbox</div>
          <div className="account-business">Cactus Practice</div>
        </div>
      </div>

      <div className="sidebar" style={{ paddingTop: '56px' }}>
        <div className="sidebar-section">
          <div className="nav-item active">
            <div className="nav-icon">
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1l6 5v8a1 1 0 01-1 1H3a1 1 0 01-1-1V6l6-5z" />
              </svg>
            </div>
            <span className="nav-label">Home</span>
          </div>
          <NavItem label="Balances">
            <path d="M2 4h12v2H2V4zm1 4h10v6H3V8z" />
          </NavItem>
          <NavItem label="Transactions">
            <path d="M8 2a6 6 0 100 12A6 6 0 008 2zm0 2l2 2H6l2-2zm0 8l-2-2h4l-2 2z" />
          </NavItem>
          <NavItem label="Customers">
            <circle cx="8" cy="5" r="3" />
            <path d="M3 14c0-3 2-5 5-5s5 2 5 5H3z" />
          </NavItem>
          {productCatalog && (
            <NavItem label="Product catalog">
              <rect x="2" y="3" width="12" height="10" rx="1" />
            </NavItem>
          )}
        </div>

        <div className="sidebar-section">
          <div className="sidebar-heading">Products</div>
          <NavItem label="Connect">
            <path d="M4 2h8l2 4v8H2V6l2-4z" />
          </NavItem>
          <NavItem label="Payments">
            <path d="M2 4h12v8H2z" />
          </NavItem>
          <NavItem label="Billing">
            <path d="M3 3h10v2H3zm0 4h10v2H3zm0 4h10v2H3z" />
          </NavItem>
          <NavItem label="Reporting">
            <path d="M2 3h12v10H2z" />
          </NavItem>
          <NavItem label="More">
            <circle cx="4" cy="8" r="1.5" />
            <circle cx="8" cy="8" r="1.5" />
            <circle cx="12" cy="8" r="1.5" />
          </NavItem>
        </div>
      </div>

      <div className="page-content">
        <div className="page-content-inner"></div>
      </div>
    </div>
  )
}
