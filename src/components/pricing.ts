/** Pricing shared by the narrative explorations, unchanged from the original
 *  prototype they were branched from. */

export const RATE = { dom: 2.9, intl: 3.4, smp: 3.5 }

/** An illustrative split, used to show proportion — not anyone's actual volume. */
export const MIX = { dom: 68, intl: 32 }

export type Scope = 'intl' | 'all'

export const pct = (n: number) => `${n.toFixed(1)}%`

/** The domestic rate only carries the add-on when autopilot covers domestic
 *  sales too. */
export const domRate = (scope: Scope) => (scope === 'all' ? RATE.dom + RATE.smp : RATE.dom)

/** International sales always carry it. */
export const intlRate = () => RATE.intl + RATE.smp

/** What the split above works out to overall. */
export const effRate = (scope: Scope) =>
  (MIX.dom / 100) * domRate(scope) + (MIX.intl / 100) * intlRate()
