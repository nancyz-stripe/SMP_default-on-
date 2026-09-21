import { useState, type ReactNode } from 'react'
import { Globe } from '../globe/Globe'
import type { GlobeOptions } from '../globe/createGlobe'

/** The globe as the explorations show it: filling the modal's right half, with
 *  a CSS glow circle sized to the sphere's diameter behind it. */
export function GlobePanel({
  scale,
  palette,
  className = 'modal-right',
  children,
  ...options
}: GlobeOptions & { className?: string; children?: ReactNode }) {
  const [diameter, setDiameter] = useState<number | null>(null)

  return (
    <Globe
      className={className}
      id="globe-container"
      options={{ scale, palette, ...options }}
      onDiameter={setDiameter}
    >
      <div
        className="globe-glow-circle"
        id="globe-glow-circle"
        style={diameter ? { width: diameter, height: diameter } : undefined}
      ></div>
      {children}
    </Globe>
  )
}
