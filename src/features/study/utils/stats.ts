import type { Card, CardStatus, ProgressMap, StatusCounts } from '../types'
import { getCardStatus } from './filtering'

export function countStatuses(values: CardStatus[], total: number): StatusCounts {
  const known = values.filter((value) => value === 'known').length
  const review = values.filter((value) => value === 'review').length
  const completed = values.filter((value) => value === 'known' || value === 'review').length

  return {
    known,
    review,
    new: total - completed,
  }
}

export function countStatusesForCards(cards: Card[], progress: ProgressMap) {
  return countStatuses(cards.map((card) => getCardStatus(card.id, progress)), cards.length)
}
