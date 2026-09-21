import type { ReactNode } from 'react'

/** A settled fact on a confirmation screen, ticked. */
export function DoneRow({ children }: { children: ReactNode }) {
  return (
    <div className="done-row">
      <span className="tick">
        <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 6.4 4.6 9 10 3.2" />
        </svg>
      </span>
      <span>{children}</span>
    </div>
  )
}
