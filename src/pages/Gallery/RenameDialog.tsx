import { useState } from 'react'
import type { Variation } from './variations'

/** Edits a card's title and description. The original built this overlay by
 *  hand and wired its buttons through globals; here it's a controlled form that
 *  hands the two values back on save. */
export function RenameDialog({
  variation,
  onSave,
  onCancel,
}: {
  variation: Variation
  onSave: (title: string, description: string) => void
  onCancel: () => void
}) {
  // The catalogue's older titles carried a "V3: " prefix that the cards strip
  // for display, so the field opens on the stripped form too.
  const [title, setTitle] = useState(variation.title.replace(/^V\d+:\s*/, ''))
  const [description, setDescription] = useState(variation.description ?? '')

  return (
    <div
      className="rename-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel()
      }}
    >
      <div className="rename-modal">
        <h3>Edit variation</h3>
        <div className="rename-field">
          <label htmlFor="rename-title">Title</label>
          <input
            id="rename-title"
            type="text"
            value={title}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="rename-field">
          <label htmlFor="rename-desc">Description</label>
          <textarea
            id="rename-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="rename-actions">
          <button className="rename-btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="rename-btn-save" onClick={() => onSave(title, description)}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
