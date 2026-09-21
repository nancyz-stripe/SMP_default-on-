import { useEffect, useRef, useState } from 'react'

const FRAME_WIDTH = 1280
const FRAME_HEIGHT = 800

/** A live preview of a prototype: the route in an iframe at its design size,
 *  scaled to cover the card.
 *
 *  The original measured on a timer and tore every iframe down on window
 *  resize, because a card in a hidden tab panel has no width yet. A
 *  ResizeObserver covers both cases without either hack: it fires when the
 *  panel is first revealed and again on every resize, and the iframe is only
 *  mounted once the box has a size. */
export function CardPreview({ src }: { src: string }) {
  const container = useRef<HTMLDivElement>(null)
  const [box, setBox] = useState<{ width: number; height: number } | null>(null)

  useEffect(() => {
    const el = container.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      if (width > 0 && height > 0) setBox({ width, height })
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const scale = box
    ? Math.max(box.width / FRAME_WIDTH, box.height / FRAME_HEIGHT)
    : 0

  return (
    <div className="card-preview" ref={container}>
      {box && (
        <iframe
          src={src}
          loading="lazy"
          title=""
          tabIndex={-1}
          style={{
            transform: `scale(${scale})`,
            left: `${(box.width - FRAME_WIDTH * scale) / 2}px`,
            top: `${(box.height - FRAME_HEIGHT * scale) / 2}px`,
          }}
        />
      )}
    </div>
  )
}
