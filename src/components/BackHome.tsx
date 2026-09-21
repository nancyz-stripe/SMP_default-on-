import { Link } from 'react-router-dom'

/** The floating control every prototype carries in its bottom-left corner. The
 *  `.back-button` class is styled per page, so it stays on the element rather
 *  than moving into a shared stylesheet. */
export function BackHome({ id }: { id?: string }) {
  return (
    <Link to="/gallery" className="back-button" id={id}>
      &larr; Home
    </Link>
  )
}
