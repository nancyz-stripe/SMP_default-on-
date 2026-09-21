/** Sampled down the reference gradient, warm end to purple end, so the pieces
 *  carry the same ramp the fee badge sweeps through. */
export const WARM_PARTICLES = ['#f7dcb5', '#f1c1a6', '#ecb4b4', '#e0a0c8', '#c280e8', '#a478f3']

/** Purples from the palette, plus one pink to echo the globe's glow. */
export const PURPLE_PARTICLES = ['#675dff', '#8f83ff', '#b9a9f7', '#e2a4ea']

const COUNT = 12

export type BurstOptions = {
  colors?: string[]
  /** Base duration; each piece adds a little jitter of its own. */
  duration?: number
  jitter?: number
}

/** Throws a short burst of confetti out of an element's centre.
 *
 *  Stays imperative: the pieces are transient, live under document.body so no
 *  ancestor can clip them, and remove themselves when their animation
 *  finishes. Nothing about them belongs in React's tree. */
export function burstFrom(el: HTMLElement, options: BurstOptions = {}) {
  const { colors: PARTICLE_COLORS = WARM_PARTICLES, duration = 810, jitter = 270 } = options
  const r = el.getBoundingClientRect()
  const cx = r.left + r.width / 2
  const cy = r.top + r.height / 2

  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('span')
    p.className = i % 3 === 0 ? 'particle chip' : 'particle'
    const size = 3 + Math.random() * 3
    p.style.width = `${size}px`
    p.style.height = `${size}px`
    p.style.left = `${cx}px`
    p.style.top = `${cy}px`
    p.style.background = PARTICLE_COLORS[i % PARTICLE_COLORS.length]
    document.body.appendChild(p)

    // Even spread with jitter, then a little gravity on the way out.
    const angle = (i / COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.6
    const dist = 24 + Math.random() * 26
    const x = Math.cos(angle) * dist
    const y = Math.sin(angle) * dist
    const spin = (Math.random() - 0.5) * 220

    p.animate(
      [
        { transform: 'translate(-50%, -50%) scale(0.3)', opacity: 0 },
        {
          transform: `translate(calc(-50% + ${x * 0.68}px), calc(-50% + ${y * 0.68}px)) scale(1) rotate(${spin * 0.5}deg)`,
          opacity: 1,
          offset: 0.3,
        },
        {
          transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y + 12}px)) scale(0.2) rotate(${spin}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: duration + Math.random() * jitter,
        easing: 'cubic-bezier(0.2, 0.7, 0.3, 1)',
      },
    ).finished.then(() => p.remove())
  }
}

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
