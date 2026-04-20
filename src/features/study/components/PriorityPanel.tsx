import type { Card } from '../types'
import { truncate } from '../../../shared/utils/text'

type PriorityPanelProps = {
  priorityCards: Card[]
}

export function PriorityPanel({ priorityCards }: PriorityPanelProps) {
  return (
    <div className="priority-panel">
      <strong>Top-priority cards</strong>
      <ul>
        {priorityCards.map((card) => (
          <li key={card.id}>{truncate(card.front, 56)}</li>
        ))}
      </ul>
    </div>
  )
}
