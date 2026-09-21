/** The greyed-out Dashboard the exploration modals sit on top of: a nav column
 *  and an empty content plate. Nine of the explorations share this markup
 *  exactly; each styles it through its own `.dashboard`/`.sidebar` rules. */
export function DashboardShell() {
  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="sidebar-logo">
          <svg viewBox="0 0 60 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.8 4.4C8.8 3.2 9.7 2.7 11.2 2.7C13.4 2.7 16.2 3.4 18.4 4.7V0.5C16 -0.4 13.6 -0.1 11.2 0C5.6 0 2 3 2 7.4C2 14.2 11.6 13 11.6 15.9C11.6 17.3 10.4 17.8 8.9 17.8C6.5 17.8 3.4 16.8 1 15.3V19.6C3.6 20.8 6.3 21.3 8.9 21.3C14.6 21.3 18.4 18.5 18.4 14C18.4 6.7 8.8 8.1 8.8 4.4Z"
              fill="#635BFF"
            />
          </svg>
        </div>
        <div className="nav-item active">Home</div>
        <div className="nav-item">Payments</div>
        <div className="nav-item">Balances</div>
        <div className="nav-item">Customers</div>
        <div className="nav-item">Products</div>
        <div className="nav-item">Settings</div>
      </div>
      <div className="main-content">
        <div className="content-placeholder"></div>
      </div>
    </div>
  )
}
