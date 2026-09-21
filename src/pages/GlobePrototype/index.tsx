import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageRoot } from '../../components/PageRoot'
import { Globe } from '../../globe/Globe'
import type { GlobeColors, GlobeHandle } from '../../globe/createGlobe'
import './styles.css'

/** The globe playground — the original the prototypes' globes were copied from,
 *  with every colour in the scene exposed as a live control.
 *
 *  It fills the window rather than a panel, and its radius is sized against a
 *  capped width so the globe doesn't keep growing on a wide monitor. */

const FIELDS: { key: keyof GlobeColors; label: string }[] = [
  { key: 'globe', label: 'Globe' },
  { key: 'dot', label: 'Dots' },
  { key: 'ambient', label: 'Ambient' },
  { key: 'back', label: 'Back Light' },
  { key: 'front', label: 'Front Light' },
  { key: 'background', label: 'Background' },
]

const WHITE_THEME: GlobeColors = {
  globe: '#f1f2f8',
  dot: '#b8c0f0',
  ambient: '#ECEBF5',
  back: '#222222',
  front: '#44444f',
  background: '#ffffff',
}

const DARK_THEME: GlobeColors = {
  globe: '#102038',
  dot: '#306ba6',
  ambient: '#99e6fc',
  back: '#c2f0fd',
  front: '#a1a5af',
  background: '#092540',
}

/** The URL carries the colours, so a particular look can be shared. Params are
 *  bare hex without the `#`, which is what "Copy URL" writes. */
function colorsFromParams(params: URLSearchParams): GlobeColors {
  const read = (key: keyof GlobeColors) => {
    const value = params.get(key)
    return value ? `#${value}` : WHITE_THEME[key]
  }
  return {
    globe: read('globe'),
    dot: read('dot'),
    ambient: read('ambient'),
    back: read('back'),
    front: read('front'),
    background: read('background'),
  }
}

export default function GlobePrototype() {
  const [params] = useSearchParams()
  const globe = useRef<GlobeHandle>(null)

  const [colors, setColors] = useState(() => colorsFromParams(params))
  const [controlsShown, setControlsShown] = useState(true)

  // The scene is built once; colour changes are repainted in place.
  useEffect(() => {
    globe.current?.setColors(colors)
  }, [colors])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setControlsShown((shown) => !shown)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const copyURL = () => {
    const p = new URLSearchParams()
    for (const { key } of FIELDS) p.set(key, colors[key].replace('#', ''))
    const url = `${window.location.origin}${window.location.pathname}?${p}`
    navigator.clipboard.writeText(url).then(() => alert('URL copied!'))
  }

  return (
    <PageRoot slug="globe-prototype">
      <Globe
        id="globe-canvas"
        handleRef={globe}
        options={{
          palette: 'flat',
          colors,
          opaque: true,
          // Sized against a capped width, so the globe stops growing past a
          // point rather than tracking the window forever.
          radius: (width) => 180 + Math.min(width, 1080) * 0.15,
        }}
      />

      {controlsShown ? (
        <div id="controls">
          <h3>
            Globe Controls{' '}
            <span style={{ opacity: '0.5', fontWeight: 'normal', fontSize: '11px' }}>
              (Esc to hide)
            </span>
          </h3>
          {FIELDS.map(({ key, label }) => (
            <div className="control-row" key={key}>
              <label htmlFor={`color-${key}`}>{label}</label>
              <input
                id={`color-${key}`}
                type="color"
                value={colors[key]}
                onChange={(e) => setColors((current) => ({ ...current, [key]: e.target.value }))}
              />
            </div>
          ))}
          <div className="btn-row">
            <button onClick={() => setColors(WHITE_THEME)}>White</button>
            <button onClick={() => setColors(DARK_THEME)}>Dark</button>
            <button onClick={copyURL}>Copy URL</button>
          </div>
        </div>
      ) : (
        <button id="toggle-btn" onClick={() => setControlsShown(true)}>
          Show Controls
        </button>
      )}
    </PageRoot>
  )
}
