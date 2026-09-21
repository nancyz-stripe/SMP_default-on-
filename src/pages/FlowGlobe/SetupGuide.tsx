/** The setup guide over the dashboard: expanded, and the same guide collapsed to
 *  its progress and next task. Both are in the tree; which one shows is the
 *  dashboard's own `collapsed` class.
 *
 *  Collapsing the guide is also the moment the dashboard comes forward — the
 *  gradient goes and the overview returns to full strength — so the collapsed
 *  card's "Next:" line is the only thing still pointing at the next task. */
export function SetupGuide({
  onCollapse,
  onExpand,
  onVerify,
}: {
  onCollapse: () => void
  onExpand: () => void
  onVerify: () => void
}) {
  return (
    <>
      <div className="floatie">
        <div className="floatie-header">
          <span className="floatie-title">Setup guide</span>
          <span className="floatie-icons">
            <span className="floatie-edit">Edit</span>
            <svg
              onClick={onCollapse}
              aria-label="Collapse the setup guide"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            >
              <path d="M11 1L7 5M7 5h3.2M7 5V1.8M1 11l4-4M5 7H1.8M5 7v3.2" />
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

        <span className="floatie-progress">
          <i></i>
        </span>

        <div className="floatie-section">
          <div className="floatie-group">
            <div className="floatie-group-row">
              <span className="floatie-group-title">Set up payments</span>
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
              <span className="floatie-task-label">Choose how to accept payments</span>
            </div>
            <div className="floatie-task">
              <svg className="tick" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" fill="#d8dee7" />
              </svg>
              <span className="floatie-task-label">Create a non-recurring product</span>
            </div>
          </div>
          <div className="floatie-group-row" onClick={onVerify}>
            <span className="floatie-group-title">Verify your account</span>
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
        </div>
      </div>

      <div className="floatie-collapsed">
        <div className="floatie-collapsed-head">
          <span className="floatie-collapsed-title">Setup guide</span>
          <span className="floatie-collapsed-edit">Edit</span>
          <svg
            onClick={onExpand}
            aria-label="Expand the setup guide"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          >
            <path d="M7 5l4-4M11 1H7.8M11 1v3.2M5 7l-4 4M1 11h3.2M1 11V7.8" />
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
        </div>
        <span className="floatie-collapsed-bar">
          <i></i>
        </span>
        <div className="floatie-collapsed-next">
          Next: <span className="link">Set up payments</span>
        </div>
      </div>
    </>
  )
}
