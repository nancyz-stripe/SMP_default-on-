import { useState } from 'react'
import { OPTIONS, type SmpConfig } from './config'

/** The reviewer's panel. Collapsed by default: the screen is the point, the
 *  panel is the aside. */
export function ControlPanel({
  config,
  onChange,
}: {
  config: SmpConfig
  onChange: (key: keyof SmpConfig, value: string) => void
}) {
  const [collapsed, setCollapsed] = useState(true)

  const group = <K extends keyof SmpConfig>(key: K) => (
    <>
      {OPTIONS[key]
        .filter((option) => !option.hidden)
        .map((option) => (
          <button
            key={option.id}
            className={`opt${config[key] === option.id ? ' on' : ''}`}
            onClick={() => onChange(key, option.id)}
          >
            {option.label}
          </button>
        ))}
    </>
  )

  return (
    <div className={`control-panel${collapsed ? ' collapsed' : ''}`}>
      <div className="control-panel-head" onClick={() => setCollapsed((c) => !c)}>
        <span className="control-panel-title">Control panel</span>
        <svg
          className="control-panel-caret"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2.5 4.5L6 8l3.5-3.5" />
        </svg>
      </div>
      <div className="control-panel-body">
        <div className="control-group">
          <span className="control-label caps">Variants</span>
          <div className="control-rows">{group('framework')}</div>
        </div>
        <div className="control-group">
          <span className="control-label">Gradient</span>
          <div className="control-rows side-by-side">{group('gradient')}</div>
        </div>
        <div className="control-group">
          <span className="control-label">Globe</span>
          <div className="control-rows side-by-side">{group('globe')}</div>
          <div className="control-switch-row">
            <span
              className={`control-switch${config.cards === 'on' ? ' on' : ''}`}
              role="switch"
              aria-checked={config.cards === 'on'}
              aria-label="Value cards"
              onClick={() => onChange('cards', config.cards === 'on' ? 'off' : 'on')}
            >
              <i></i>
            </span>
            <span className="control-switch-label">Value cards</span>
          </div>
        </div>
      </div>
    </div>
  )
}
