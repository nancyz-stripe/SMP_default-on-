import { useState, type ReactNode } from 'react'
import { Globe } from '../globe/Globe'
import { ValueCards } from '../globe/ValueCards'
import type { GlobeOptions } from '../globe/createGlobe'

/** The globe as the explorations show it: filling the modal's right half, with
 *  a CSS glow circle sized to the sphere's diameter behind it, and optionally
 *  the three value cards floating over it.
 *
 *  The glow circle and the cards are direct children of the globe's host, as
 *  they were in the originals — they're positioned against it, so nothing may
 *  come between them and it. */
export function GlobePanel({
  className = 'modal-right',
  valueCards = false,
  children,
  ...options
}: GlobeOptions & {
  className?: string
  valueCards?: boolean
  children?: ReactNode
}) {
  const [diameter, setDiameter] = useState<number | null>(null)
  const [box, setBox] = useState<{ width: number; height: number } | null>(null)

  return (
    <Globe
      className={className}
      id="globe-container"
      options={options}
      onDiameter={setDiameter}
      onBox={valueCards ? setBox : undefined}
    >
      <div
        className="globe-glow-circle"
        id="globe-glow-circle"
        style={diameter ? { width: diameter, height: diameter } : undefined}
      ></div>
      {valueCards && <ValueCards diameter={diameter} box={box} />}
      {children}
    </Globe>
  )
}
