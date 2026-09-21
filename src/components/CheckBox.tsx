/** The custom checkbox the coverage toggle uses. It carries real checkbox
 *  semantics and answers Space and Enter, which the original wired up by hand. */
export function CheckBox({
  checked,
  onToggle,
  label,
}: {
  checked: boolean
  onToggle: () => void
  label?: string
}) {
  return (
    <div
      className={`box${checked ? ' on' : ''}`}
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault()
          onToggle()
        }
      }}
    >
      <svg
        viewBox="0 0 10 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M1.5 5.2l2.2 2.2L8.5 2.6" />
      </svg>
    </div>
  )
}
