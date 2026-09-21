import { useCallback, useEffect, useRef, useState } from 'react'
import { createGlobe, type GlobeHandle } from '../../globe/createGlobe'

/** One globe, moved between hosts.
 *
 *  The landing page's hero and the flow's opt-in step both show the same globe,
 *  and their hosts are different sizes — the landing page's is more than twice
 *  the step's. Building a scene per host would mean re-sampling 40,000 dots and
 *  re-fetching the map image every time the flow crosses that seam, so the canvas
 *  is built once and moved, with the camera re-fitting to whatever host it lands
 *  in.
 *
 *  This is the one place in the port where imperative DOM handling is the right
 *  answer rather than a leftover. A React portal would not do it: changing the
 *  portal's container unmounts and remounts the tree, which is exactly the
 *  teardown being avoided. So the globe's element is owned here, parked in a
 *  holder when no step wants it, and appended into the active host when one does. */
export function useSharedGlobe() {
  // The globe's own element, created once and never replaced.
  const element = useRef<HTMLDivElement | null>(null)
  const holder = useRef<HTMLDivElement | null>(null)
  const instance = useRef<GlobeHandle | null>(null)
  const [host, setHost] = useState<HTMLElement | null>(null)
  // Published by the scene on build and on every re-fit; the glow circle and the
  // value cards size off it.
  const [diameter, setDiameter] = useState<number | null>(null)

  /** Ref callback for a step's host: hands it over, or gives the globe back to
   *  the holder when the step unmounts. */
  const hostRef = useCallback((el: HTMLDivElement | null) => setHost(el), [])

  useEffect(() => {
    const el = element.current
    const parked = holder.current
    if (!el || !parked) return

    const target = host ?? parked
    if (el.parentElement !== target) target.appendChild(el)

    // The scene measures its container, so it can't be built while the step it
    // belongs to is off screen. The first host to take it is the one that builds
    // it; `refitByZoom` handles every host after that.
    if (!instance.current && el.clientWidth && el.clientHeight) {
      instance.current = createGlobe(el, {
        scale: 0.7225,
        refitByZoom: true,
        onDiameter: setDiameter,
      })
    }
  }, [host])

  useEffect(
    () => () => {
      instance.current?.dispose()
      instance.current = null
    },
    [],
  )

  return { element, holder, hostRef, diameter }
}
