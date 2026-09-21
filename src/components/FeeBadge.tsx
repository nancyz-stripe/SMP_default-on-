import { ScopeFeeIcon } from './ScopeFeeIcon'

/** The fee pill with its explanatory tooltip. It sits inside a card that
 *  selects on click, so it stops the click from reaching it. */
export function FeeBadge({ fee = '3.5% fee' }: { fee?: string }) {
  return (
    <span className="fee-badge" onClick={(e) => e.stopPropagation()}>
      <span>{fee}</span> <ScopeFeeIcon className="fee-icon" />
      <span className="fee-tooltip">
        3.5% add-on fee for each successful Managed Payments transaction
      </span>
    </span>
  )
}
