/** The four properties that define an SMP variant. Framework is structural — it
 *  swaps the option model — and the rest are presentational. */

export type Framework = 'scope' | 'autopilot' | 'expand'
export type Gradient = 'full' | 'spotlight'
export type GlobeSize = 'large' | 'medium'
export type Cards = 'on' | 'off'

export type SmpConfig = {
  framework: Framework
  gradient: Gradient
  globe: GlobeSize
  cards: Cards
}

export type Option<T extends string> = { id: T; label: string; hidden?: boolean }

export const OPTIONS: {
  framework: Option<Framework>[]
  gradient: Option<Gradient>[]
  globe: (Option<GlobeSize> & { scale: number })[]
  cards: Option<Cards>[]
} = {
  framework: [
    { id: 'scope', label: 'V1 - Choose your scope' },
    // Off the control panel, but still a valid framework: the V2 card in Latest
    // explorations links straight to ?framework=autopilot.
    { id: 'autopilot', label: 'V2 - Autopilot vs Self-managed', hidden: true },
    { id: 'expand', label: 'SMP - Upgrade' },
  ],
  gradient: [
    { id: 'full', label: 'Full screen' },
    { id: 'spotlight', label: 'Spotlight' },
  ],
  globe: [
    { id: 'large', label: 'Large', scale: 0.85 },
    { id: 'medium', label: 'Medium', scale: 0.7225 },
  ],
  cards: [
    { id: 'on', label: 'On' },
    { id: 'off', label: 'Off' },
  ],
}

/** Where each variant starts. Gradient and cards follow the variant as it was
 *  designed; every variant defaults to the medium globe. */
export const PRESETS: Record<Framework, Omit<SmpConfig, 'framework'>> = {
  scope: { gradient: 'spotlight', globe: 'medium', cards: 'on' },
  autopilot: { gradient: 'spotlight', globe: 'medium', cards: 'off' },
  expand: { gradient: 'spotlight', globe: 'medium', cards: 'on' },
}

export const globeScale = (size: GlobeSize) => OPTIONS.globe.find((o) => o.id === size)!.scale

/** Reads a config out of query params, falling back to the framework's preset
 *  for anything not pinned. Unknown values are ignored rather than trusted. */
export function configFromParams(params: URLSearchParams): SmpConfig {
  const pick = <T extends string>(key: keyof SmpConfig, options: Option<T>[], fallback: T): T => {
    const value = params.get(key)
    return options.some((o) => o.id === value) ? (value as T) : fallback
  }

  const framework = pick('framework', OPTIONS.framework, 'scope')
  const preset = PRESETS[framework]
  return {
    framework,
    gradient: pick('gradient', OPTIONS.gradient, preset.gradient),
    globe: pick('globe', OPTIONS.globe, preset.globe),
    cards: pick('cards', OPTIONS.cards, preset.cards),
  }
}
