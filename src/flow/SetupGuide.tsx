/** Step 8's overlay: the setup guide, and the callout pointing at the task the
 *  flow's answers led to. Laid over the built-out dashboard.
 *
 *  Shared verbatim by the two flows. */
export function SetupGuide({
  spotlightShown,
  onDismissSpotlight,
}: {
  spotlightShown: boolean
  onDismissSpotlight: () => void
}) {
  return (
    <div id="dashboard-step">
      {spotlightShown && (
        <div className="spotlight">
          <div className="spotlight-title">Next, set up recurring payments</div>
          <span className="spotlight-link" onClick={onDismissSpotlight}>
            Got it
          </span>
        </div>
      )}

      <div className="floatie">
        <div className="floatie-header">
          <span className="floatie-title">Setup guide</span>
          <span className="floatie-icons">
            <svg
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            >
              <path d="M7 5l4-4M11 1v3.2M11 1H7.8M5 7l-4 4M1 11V7.8M1 11h3.2" />
            </svg>
            <svg
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            >
              <path d="M1.5 1.5l9 9M10.5 1.5l-9 9" />
            </svg>
          </span>
        </div>

        <div className="floatie-section">
          <div className="floatie-group-row">
            <span className="floatie-group-title">Set up recurring payments</span>
            <svg
              className="chev"
              viewBox="0 0 8 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 5l3-3 3 3" />
            </svg>
          </div>

          <div className="floatie-task">
            <svg className="tick current" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" fill="#d8dee7" />
            </svg>
            <span className="floatie-task-label">Choose a pricing model</span>
            <button className="floatie-go" aria-label="Start task">
              <svg
                viewBox="0 0 10 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 1l4 4-4 4" />
              </svg>
            </button>
          </div>
          <div className="floatie-task">
            <svg
              className="tick"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <circle cx="7" cy="7" r="6" />
              <path d="M3.5 10.5l7-7" />
            </svg>
            <span className="floatie-task-label">Choose how to accept recurring payments</span>
          </div>
          <div className="floatie-task">
            <svg
              className="tick"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <circle cx="7" cy="7" r="6" />
              <path d="M3.5 10.5l7-7" />
            </svg>
            <span className="floatie-task-label">Create a recurring product</span>
          </div>
          <div className="floatie-task muted">
            <svg
              className="tick"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <circle cx="7" cy="7" r="6" />
              <path d="M3.5 10.5l7-7" />
            </svg>
            <span className="floatie-task-label">Build your Checkout integration</span>
          </div>

          <div className="floatie-group-row">
            <span className="floatie-group-title">Finish your setup</span>
            <svg
              className="chev"
              viewBox="0 0 8 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 3l3 3 3-3" />
            </svg>
          </div>
          <div className="floatie-group-row">
            <span className="floatie-group-title locked">Go Live</span>
            <svg
              className="lock"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <rect x="2.5" y="5.5" width="7" height="5.5" rx="1" />
              <path d="M4.2 5.5V4a1.8 1.8 0 013.6 0v1.5" />
            </svg>
          </div>
        </div>

        <div className="floatie-footer">
          <span className="floatie-progress">
            <i></i>
          </span>
          <span className="floatie-manage">Manage tasks</span>
        </div>
      </div>
    </div>
  )
}
