import { useEffect, useImperativeHandle, useRef, type ReactNode, type Ref } from 'react'
import { createGlobe, type GlobeHandle, type GlobeOptions } from './createGlobe'

/** Mounts the globe into a host element and tears it down on unmount.
 *
 *  The options are read once, when the scene is built — changing them later
 *  would mean rebuilding it, which none of the prototypes do. Anything that
 *  does change at runtime (the coverage wave) goes through the handle. */
export function Globe({
  className,
  id,
  options,
  handleRef,
  onDiameter,
  onBox,
  children,
}: {
  className?: string
  id?: string
  options?: GlobeOptions
  handleRef?: Ref<GlobeHandle>
  onDiameter?: (diameter: number) => void
  /** The host's own size. Anything positioned from the globe's centre — the
   *  value cards — needs this as well as the diameter. */
  onBox?: (box: { width: number; height: number }) => void
  /** Anything that sits inside the globe's box — the glow circle, the value
   *  cards. The canvas is appended after these, as it was in the originals. */
  children?: ReactNode
}) {
  const host = useRef<HTMLDivElement>(null)
  const globe = useRef<GlobeHandle | null>(null)

  // Kept in refs so a new inline callback or options object on re-render
  // doesn't tear the scene down and rebuild it.
  const latest = useRef({ options, onDiameter, onBox })
  latest.current = { options, onDiameter, onBox }

  // Reported separately from the scene's own resize handling, because the cards
  // need it whether or not the scene has finished building.
  useEffect(() => {
    const el = host.current
    if (!el || !onBox) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      if (width && height) latest.current.onBox?.({ width, height })
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [onBox])

  useEffect(() => {
    const el = host.current
    if (!el) return

    const build = () => {
      globe.current = createGlobe(el, {
        ...latest.current.options,
        onDiameter: (d) => latest.current.onDiameter?.(d),
      })
    }

    // The radius is derived from the host's size, so building before layout
    // would fix the globe at zero. Several of these hosts start hidden — inside
    // a step that isn't showing yet — so wait for a real size rather than
    // assuming one is there.
    if (el.clientWidth && el.clientHeight) {
      build()
      return () => {
        globe.current?.dispose()
        globe.current = null
      }
    }

    const observer = new ResizeObserver(() => {
      if (!el.clientWidth || !el.clientHeight) return
      observer.disconnect()
      build()
    })
    observer.observe(el)
    return () => {
      observer.disconnect()
      globe.current?.dispose()
      globe.current = null
    }
  }, [])

  // A stable façade: the scene may not exist yet when a parent first reads the
  // ref, so every call is forwarded to whatever instance is live at the time.
  useImperativeHandle(
    handleRef,
    () => ({
      setMode: (mode) => globe.current?.setMode(mode),
      dispose: () => globe.current?.dispose(),
    }),
    [],
  )

  return (
    <div className={className} id={id} ref={host}>
      {children}
    </div>
  )
}
