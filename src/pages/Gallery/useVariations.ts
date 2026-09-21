import { useCallback, useState } from 'react'
import type { Variation } from './variations'
import { latestVariations, pastVariations } from './variations'

const ORDER_KEY = 'variations-order'
const DELETED_KEY = 'variations-deleted'
const VERSION_KEY = 'variations-version'

/** Bumping this drops whatever a browser has stored and starts from the
 *  catalogue again. */
const STORAGE_VERSION = '9'

/** The reorder/rename/delete controls are local authoring tools, not part of
 *  the prototype, so they only appear when it's being served locally. */
export const isLocal =
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'

export type Section = 'latest' | 'past'

type Stored = Partial<Variation> & { id: string }

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function resetIfStale() {
  if (localStorage.getItem(VERSION_KEY) !== STORAGE_VERSION) {
    localStorage.removeItem(ORDER_KEY)
    localStorage.removeItem(DELETED_KEY)
    localStorage.setItem(VERSION_KEY, STORAGE_VERSION)
  }
}

const CATALOGUE: Record<Section, Variation[]> = {
  latest: latestVariations,
  past: pastVariations,
}

/** Folds what's stored back over the catalogue: stored entries win field by
 *  field, catalogue entries missing from storage are appended, and anything
 *  deleted stays out. */
function restore(section: Section, stored: Stored[], deleted: Set<string>): Variation[] {
  const catalogue = CATALOGUE[section]
  const byId = new Map(catalogue.map((v) => [v.id, v]))

  const merged = stored
    .filter((v) => !deleted.has(v.id))
    .map((v): Variation => {
      const base = byId.get(v.id)
      if (!base) return { ...(v as Variation), description: v.description ?? '' }
      return {
        ...base,
        ...v,
        description: v.description || base.description || '',
        framework: v.framework ?? base.framework,
        gradient: v.gradient ?? base.gradient,
        globe: v.globe ?? base.globe,
        valueCards: v.valueCards ?? base.valueCards,
      }
    })

  const seen = new Set(merged.map((v) => v.id))
  for (const v of catalogue) {
    if (!seen.has(v.id) && !deleted.has(v.id)) merged.push(v)
  }
  return merged
}

function load(): Record<Section, Variation[]> {
  resetIfStale()
  const deleted = new Set(read<string[]>(DELETED_KEY, []))
  const stored = read<Partial<Record<Section, Stored[]>>>(ORDER_KEY, {})
  return {
    latest: restore('latest', stored.latest ?? [], deleted),
    past: restore('past', stored.past ?? [], deleted),
  }
}

export function useVariations() {
  const [sections, setSections] = useState(load)

  const persist = useCallback((next: Record<Section, Variation[]>) => {
    localStorage.setItem(ORDER_KEY, JSON.stringify(next))
    setSections(next)
  }, [])

  const update = useCallback((section: Section, fn: (list: Variation[]) => Variation[]) => {
    setSections((current) => {
      const next = { ...current, [section]: fn(current[section]) }
      localStorage.setItem(ORDER_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  /** Moves a card to another card's position, which is what a drop does. */
  const reorder = useCallback(
    (section: Section, from: number, to: number) =>
      update(section, (list) => {
        const next = [...list]
        const [moved] = next.splice(from, 1)
        next.splice(to, 0, moved)
        return next
      }),
    [update],
  )

  const rename = useCallback(
    (section: Section, id: string, title: string, description: string) =>
      update(section, (list) => list.map((v) => (v.id === id ? { ...v, title, description } : v))),
    [update],
  )

  /** Deletions are remembered separately, so a card stays gone even after the
   *  catalogue is folded back in on the next load. */
  const remove = useCallback(
    (section: Section, id: string) => {
      const deleted = read<string[]>(DELETED_KEY, [])
      if (!deleted.includes(id)) {
        localStorage.setItem(DELETED_KEY, JSON.stringify([...deleted, id]))
      }
      update(section, (list) => list.filter((v) => v.id !== id))
    },
    [update],
  )

  return { sections, reorder, rename, remove, persist }
}
