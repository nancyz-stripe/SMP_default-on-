/** The Dashboard's top bar: search, and the icon row beside it. Static — none of
 *  it is wired up on this page. */
export function Topbar() {
  return (
    <div className="topbar">
      <span className="search">
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="7" cy="7" r="4.2" />
          <path d="M10.2 10.2L14 14" />
        </svg>
        <span>Search</span>
      </span>
      <span className="topbar-icons">
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1" />
          <rect x="9" y="2.5" width="4.5" height="4.5" rx="1" />
          <rect x="2.5" y="9" width="4.5" height="4.5" rx="1" />
          <path d="M11.2 9v4.5M9 11.2h4.5" />
        </svg>
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="8" cy="8" r="5.8" />
          <path d="M6.3 6.3c0-1 .8-1.7 1.7-1.7s1.7.7 1.7 1.6c0 1.2-1.7 1.3-1.7 2.4" />
          <circle cx="8" cy="11.2" r=".7" fill="currentColor" stroke="none" />
        </svg>
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4.5 7a3.5 3.5 0 017 0c0 2.4 1 3.5 1 3.5H3.5s1-1.1 1-3.5z" />
          <path d="M6.8 12.4a1.4 1.4 0 002.4 0" />
        </svg>
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="8" cy="8" r="2" />
          <path d="M8 2.2v1.6M8 12.2v1.6M2.2 8h1.6M12.2 8h1.6M4 4l1.1 1.1M10.9 10.9L12 12M12 4l-1.1 1.1M5.1 10.9L4 12" />
        </svg>
        <span className="plus">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 3v10M3 8h10" />
          </svg>
        </span>
      </span>
    </div>
  )
}
