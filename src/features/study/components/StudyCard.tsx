import { PatternAnswer } from '../../pattern-cards/components/PatternAnswer'
import { shouldUsePatternLayout } from '../../pattern-cards/utils/pattern-layout'
import { RichText } from '../../rich-text/components/RichText'
import { isPriorityCard } from '../../cards/data/priority-card-ids'
import type { Card, CardStatus } from '../types'

type StudyCardProps = {
  card: Card
  status: CardStatus
  showBack: boolean
  onFlip: () => void
}

export function StudyCard({ card, status, showBack, onFlip }: StudyCardProps) {
  return (
    <section className={`card ${showBack ? 'flipped' : ''}`} onClick={onFlip}>
      <div className="card-meta">
        <span>{card.category}</span>
        <span>{card.lens}</span>
        <span>{card.type}</span>
        <span className={`status ${status}`}>{status}</span>
        {isPriorityCard(card.id) ? <span className="status priority">priority</span> : null}
      </div>

      <div className="card-content">
        {!showBack ? (
          <>
            <p className="eyebrow">Question</p>
            <h3>{card.front}</h3>
            {card.jdItem ? <p className="jd-item">JD: {card.jdItem}</p> : null}
            <p className="hint">Click or press Space to reveal answer.</p>
          </>
        ) : (
          <>
            <p className="eyebrow">Answer</p>
            {shouldUsePatternLayout(card) ? <PatternAnswer card={card} /> : <RichText text={card.back} />}
          </>
        )}
      </div>
    </section>
  )
}
