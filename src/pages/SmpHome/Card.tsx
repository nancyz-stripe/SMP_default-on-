import { InfoIcon } from '../../components/InfoIcon'
import { BarChart, LineChart } from './Chart'
import type { Card as CardData } from './data'
import { deltaOf, headline } from './metrics'

/** One metric card.
 *
 *  Masked, it keeps its title and its chart and gives up everything else: no
 *  figure, no way into a report that has nothing in it, and an eye in place of the
 *  ⓘ carrying the reason. */
export function Card({ card, masked, note }: { card: CardData; masked: boolean; note?: string }) {
  const classes = ['card', card.hero && 'hero', masked && 'masked'].filter(Boolean).join(' ')

  return (
    <section className={classes} data-card={card.id}>
      <div className="card-head">
        <div className="card-titles">
          <div className="card-title">{card.title}</div>
          {masked ? (
            <span className="masked-wrap">
              <span className="masked-eye" tabIndex={0} role="img" aria-label={note}>
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1.8 8S4.1 4.2 8 4.2s6.2 3.8 6.2 3.8-2.3 3.8-6.2 3.8S1.8 8 1.8 8Z" />
                  <circle cx="8" cy="8" r="1.9" />
                  <path d="M2.6 13.4 13.4 2.6" />
                </svg>
              </span>
              <span className="masked-tip" role="tooltip">
                {note}
              </span>
            </span>
          ) : (
            <span className="info">
              <InfoIcon />
              <span className="info-tip">{card.desc}</span>
            </span>
          )}
        </div>
        {!masked && (
          <button className="open-btn" aria-label="Open report">
            <svg
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9L9 3M4.4 3H9v4.6" />
            </svg>
          </button>
        )}
      </div>

      {!masked && (
        <div className="card-valrow">
          <span className="card-val">{headline(card)}</span>
          <span className="card-subvals">
            <span className="delta">{deltaOf(card)}</span>
          </span>
        </div>
      )}

      {/* Nothing we'd stand behind is nothing to inspect, so a masked card's
          chart doesn't answer the pointer. */}
      {card.kind === 'bars' ? (
        <BarChart card={card} interactive={!masked} />
      ) : (
        <LineChart card={card} interactive={!masked} />
      )}

      <div className="xlabels">
        {/* Nothing plotted, nothing to label. */}
        {card.with.length > 0 && (
          <>
            <span>Jan</span>
            <span>Today</span>
          </>
        )}
      </div>
    </section>
  )
}
