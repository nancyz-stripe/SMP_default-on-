import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { PageRoot } from '../../components/PageRoot'
import { CardPreview } from './CardPreview'
import { RenameDialog } from './RenameDialog'
import { isLocal, useVariations, type Section } from './useVariations'
import { exploreVariations, flowVariations, uxrVariations, type Variation } from './variations'
import './styles.css'

const TABS = ['uxr', 'explorations', 'archive'] as const
type Tab = (typeof TABS)[number]

const TAB_LABELS: Record<Tab, string> = {
  uxr: 'UXR',
  explorations: 'Latest',
  archive: 'Archive',
}

/** Explorations card: the preview and the title, nothing else. The whole card
 *  is the link, so there's no CTA. */
function ExploreCard({ v }: { v: Variation }) {
  return (
    <Link className="card" to={v.to}>
      {v.thumb ? (
        <div className="card-preview has-thumb">
          <img className="card-thumb" src={v.thumb} alt="" />
        </div>
      ) : (
        <CardPreview src={v.preview ?? v.to} />
      )}
      <div className="card-body">
        <div className="card-explore-title">{v.title}</div>
      </div>
    </Link>
  )
}

/** Flow cards aren't reorderable or editable, and a "Start flow" button stands
 *  in for the description. */
function FlowCard({ v }: { v: Variation }) {
  return (
    <Link className="card" to={v.to}>
      <CardPreview src={v.preview ?? v.to} />
      <div className="card-body">
        <div className="card-flow-title">{v.title}</div>
        <span className="btn-start-flow">Start flow</span>
      </div>
    </Link>
  )
}

type CardProps = {
  v: Variation
  index: number
  section: Section
  menuOpen: boolean
  onToggleMenu: () => void
  onRename: () => void
  onDelete: () => void
  onDrop: (from: number, to: number) => void
}

/** An archive card: draggable to reorder, with the local-only overflow menu. */
function ArchiveCard({
  v,
  index,
  section,
  menuOpen,
  onToggleMenu,
  onRename,
  onDelete,
  onDrop,
}: CardProps) {
  const [dragging, setDragging] = useState(false)
  const [over, setOver] = useState(false)

  const classes = ['card', dragging && 'dragging', over && 'drag-over'].filter(Boolean).join(' ')

  return (
    <Link
      className={classes}
      to={v.to}
      draggable
      onDragStart={(e) => {
        setDragging(true)
        e.dataTransfer.effectAllowed = 'move'
        // The index travels on the event rather than in a module-level
        // variable, which is what the original used.
        e.dataTransfer.setData('text/plain', `${section}:${index}`)
      }}
      onDragEnd={() => {
        setDragging(false)
        setOver(false)
      }}
      onDragOver={(e) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
        setOver(true)
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault()
        setOver(false)
        const [from, at] = e.dataTransfer.getData('text/plain').split(':')
        // Cards only reorder within their own section.
        if (from !== section) return
        const fromIndex = Number(at)
        if (!Number.isNaN(fromIndex) && fromIndex !== index) onDrop(fromIndex, index)
      }}
    >
      {isLocal && (
        <>
          <span
            className="overflow-btn"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onToggleMenu()
            }}
          >
            ⋯
          </span>
          <div className={`overflow-menu${menuOpen ? ' open' : ''}`}>
            <button
              className="overflow-menu-item"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onRename()
              }}
            >
              Rename
            </button>
            <button
              className="overflow-menu-item danger"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onDelete()
              }}
            >
              Delete
            </button>
          </div>
        </>
      )}
      <CardPreview src={v.preview ?? v.to} />
      <div className="card-body">
        <div className="card-title">{v.title.replace(/^V\d+:\s*/, '')}</div>
        <div className="card-description">{v.description}</div>
      </div>
    </Link>
  )
}

export default function Gallery() {
  const { sections, reorder, rename, remove } = useVariations()
  const location = useLocation()
  const navigate = useNavigate()

  // The hash keeps the tab across reloads, so a shared link lands on the same
  // one.
  const hash = location.hash.slice(1) as Tab
  const tab: Tab = TABS.includes(hash) ? hash : TABS[0]

  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [editing, setEditing] = useState<{ section: Section; v: Variation } | null>(null)

  useEffect(() => {
    if (!openMenu) return
    const close = () => setOpenMenu(null)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [openMenu])

  const archiveCard = (section: Section, v: Variation, index: number) => (
    <ArchiveCard
      key={v.id}
      v={v}
      index={index}
      section={section}
      menuOpen={openMenu === `${section}:${v.id}`}
      onToggleMenu={() =>
        setOpenMenu((current) => {
          const key = `${section}:${v.id}`
          return current === key ? null : key
        })
      }
      onRename={() => {
        setOpenMenu(null)
        setEditing({ section, v })
      }}
      onDelete={() => {
        setOpenMenu(null)
        if (confirm(`Delete "${v.title}"?`)) remove(section, v.id)
      }}
      onDrop={(from, to) => reorder(section, from, to)}
    />
  )

  return (
    <PageRoot slug="gallery">
      <div className="header">
        <h1>Managed Payments default-on</h1>
      </div>

      <div className="tabs">
        {TABS.map((name) => (
          <button
            key={name}
            className={`tab${tab === name ? ' active' : ''}`}
            onClick={() => navigate(`#${name}`, { replace: true })}
          >
            {TAB_LABELS[name]}
          </button>
        ))}
      </div>

      {/* Every panel stays mounted — the previews in the hidden one are only
          built once it's revealed and its cards get a width. */}
      <div className={`tab-panel${tab === 'uxr' ? ' active' : ''}`}>
        <div className="section">
          <div className="grid">
            {uxrVariations.map((v) => (
              <ExploreCard key={v.id} v={v} />
            ))}
          </div>
        </div>
      </div>

      <div className={`tab-panel${tab === 'explorations' ? ' active' : ''}`}>
        <div className="section">
          <div className="grid">
            {exploreVariations.map((v) => (
              <ExploreCard key={v.id} v={v} />
            ))}
          </div>
        </div>
      </div>

      <div className={`tab-panel${tab === 'archive' ? ' active' : ''}`}>
        <div className="section">
          <div className="section-heading">Onboarding flow</div>
          <div className="grid">
            {flowVariations.map((v) => (
              <FlowCard key={v.id} v={v} />
            ))}
          </div>
        </div>

        <div className="section">
          <div className="section-heading">Latest explorations</div>
          <div className="grid">
            {sections.latest.map((v, i) =>
              v.flow ? <FlowCard key={v.id} v={v} /> : archiveCard('latest', v, i),
            )}
          </div>
        </div>

        <div className="section">
          <div className="section-heading">Past explorations</div>
          <div className="grid">{sections.past.map((v, i) => archiveCard('past', v, i))}</div>
        </div>
      </div>

      {editing && (
        <RenameDialog
          variation={editing.v}
          onCancel={() => setEditing(null)}
          onSave={(title, description) => {
            rename(editing.section, editing.v.id, title, description)
            setEditing(null)
          }}
        />
      )}
    </PageRoot>
  )
}
