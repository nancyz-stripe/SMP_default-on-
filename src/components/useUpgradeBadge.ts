import { useCallback, useEffect, useRef, useState } from 'react'
import { burstFrom, prefersReducedMotion, WARM_PARTICLES, type BurstOptions } from './particles'

export type Rate = { rate: string; note: string }

/** v3.1's rates: the fee stated per transaction, with the standard processing
 *  fees spelled out underneath. */
export const PER_TRANSACTION_RATES = {
  off: {
    rate: '+3.5% per transaction',
    note: 'This fee is additional to standard processing fees (3.4% for international).',
  },
  on: {
    rate: '+2.5% per transaction',
    note: 'This fee is additional to standard processing fees (3.4% for international and 2.9% for domestic).',
  },
} satisfies Record<'off' | 'on', Rate>

/** v3.2's: the fee as a bare percentage, described as an add-on. */
export const ADD_ON_RATES = {
  off: {
    rate: '3.5% fee',
    note: '3.5% add-on fee for each successful Managed Payments transaction',
  },
  on: {
    rate: '2.5% fee',
    note: '2.5% add-on fee for each successful Managed Payments transaction, domestic and cross-border',
  },
} satisfies Record<'off' | 'on', Rate>

const BUMP_MS = 740
const SETTLE_MS = 1240
const LOCK_MS = 760
const POP_MS = 480

export type UpgradeOptions = {
  rates?: Record<'off' | 'on', Rate>
  particles?: BurstOptions
  /** v3.1 hands the badge's gradient sweep off to a longer settle into purple;
   *  v3.2 stops at the bump. */
  settle?: boolean
}

/** Switching domestic coverage on is an upgrade: the rate drops, the badge
 *  turns purple, and the incentive pill is spent. All the motion sits on the
 *  badge, which is where the change actually lands.
 *
 *  Re-entry is locked out for the length of the sequence, as in the original —
 *  the animations overlap and would otherwise stack. */
export function useUpgradeBadge(options: UpgradeOptions = {}) {
  const {
    rates: table = PER_TRANSACTION_RATES,
    particles = { colors: WARM_PARTICLES },
    settle = true,
  } = options

  const [domestic, setDomestic] = useState(false)
  const [received, setReceived] = useState(false)
  const [settling, setSettling] = useState(false)
  const [popping, setPopping] = useState(false)

  const locked = useRef(false)
  const badge = useRef<HTMLSpanElement>(null)
  const timers = useRef<number[]>([])

  const after = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms))

  // Several timers are in flight during an upgrade; none of them should fire
  // into an unmounted component.
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const toggle = useCallback(() => {
    if (locked.current) return
    locked.current = true

    setPopping(true)
    after(POP_MS, () => setPopping(false))

    setDomestic((wasOn) => {
      const on = !wasOn
      if (on) {
        setReceived(true)
        after(BUMP_MS, () => setReceived(false))
        if (settle) {
          setSettling(true)
          after(SETTLE_MS, () => setSettling(false))
        }
        // Fires with the bump, so the badge looks like the source.
        if (!prefersReducedMotion() && badge.current) burstFrom(badge.current, particles)
      } else {
        setSettling(false)
      }
      return on
    })

    after(LOCK_MS, () => {
      locked.current = false
    })
    // `particles` and `settle` come from a literal in the caller's render, so
    // they're read through the closure rather than compared as dependencies.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    domestic,
    toggle,
    rates: domestic ? table.on : table.off,
    badgeClass: [
      'fee-badge',
      domestic && 'upgraded',
      received && 'received',
      settling && 'settling',
    ]
      .filter(Boolean)
      .join(' '),
    /** The switch's own pop, for the variants whose control animates. */
    switchClass: ['switch-el', domestic && 'on', popping && 'popping'].filter(Boolean).join(' '),
    badgeRef: badge,
  }
}
