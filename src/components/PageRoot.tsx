import type { ReactNode } from 'react'

/** Every prototype's stylesheet is scoped to a `.page-<slug>` root, and its
 *  former `body` rules now land on that root. Rendering it through here keeps
 *  the slug in one place per page and guarantees the root is the full-height
 *  box those rules assume. */
export function PageRoot({ slug, children }: { slug: string; children: ReactNode }) {
  return <div className={`page-${slug}`}>{children}</div>
}
