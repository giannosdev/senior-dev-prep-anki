import type { Card, CardStatus, ProgressMap, StudyFilters } from '../types'
import { isPriorityCard } from '../../cards/data/priority-card-ids'
import { normalize } from '../../../shared/utils/text'

export function getCardStatus(cardId: string, progress: ProgressMap): CardStatus {
  return progress[cardId] || 'new'
}

export function filterStudyIndexes({
  cards,
  studyOrder,
  filters,
  progress,
}: {
  cards: Card[]
  studyOrder: number[]
  filters: StudyFilters
  progress: ProgressMap
}) {
  const q = normalize(filters.query)

  return studyOrder.filter((cardIndex) => {
    const card = cards[cardIndex]
    const haystack = normalize([
      card.front,
      card.back,
      card.category,
      card.lens,
      card.type,
      card.jdItem,
      ...card.tags,
    ].join(' '))

    const matchesQuery = !q || haystack.includes(q)
    const matchesCategory = filters.category === 'All' || card.category === filters.category
    const matchesLens = filters.lens === 'All' || card.lens === filters.lens
    const matchesType = filters.questionType === 'All' || card.type === filters.questionType
    const matchesJd = filters.jdFilter === 'All' || card.jdItem === filters.jdFilter
    const matchesPriority = !filters.priorityOnly || isPriorityCard(card.id)
    const matchesStatus = filters.statusFilter === 'All' || filters.statusFilter === getCardStatus(card.id, progress)

    return matchesQuery && matchesCategory && matchesLens && matchesType && matchesJd && matchesPriority && matchesStatus
  })
}
