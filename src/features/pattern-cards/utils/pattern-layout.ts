import type { Card } from '../../study/types'
import { isPriorityCard } from '../../cards/data/priority-card-ids'

export function shouldUsePatternLayout(card: Card) {
  return (
    card.category.startsWith('Interview patterns:') ||
    card.category.startsWith('Resume stories:') ||
    isPriorityCard(card.id)
  )
}
