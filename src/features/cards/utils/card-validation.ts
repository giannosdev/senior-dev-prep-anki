import type { Card } from '../../study/types'
import { normalize } from '../../../shared/utils/text'

type ValidationOptions = {
  priorityCardIds?: readonly string[]
  allJdItems?: readonly string[]
}

export function validatePriorityCardIds(cards: Card[], priorityCardIds: readonly string[]) {
  const missingPriorityCards = priorityCardIds.filter((id) => !cards.some((card) => card.id === id))

  if (missingPriorityCards.length > 0) {
    throw new Error(`Missing priority cards: ${missingPriorityCards.join(' | ')}`)
  }
}

export function validateJdCoverage(cards: Card[], allJdItems: readonly string[]) {
  const mappedJdItems = new Set(cards.map((card) => card.jdItem).filter(Boolean))
  const missingJdItems = allJdItems.filter((item) => !mappedJdItems.has(item))

  if (missingJdItems.length > 0) {
    throw new Error(`Expected at least one card for every JD item. Missing: ${missingJdItems.join(' | ')}`)
  }
}

export function normalizeCardFront(front: string) {
  return normalize(front).replace(/[^a-z0-9]+/g, ' ').trim()
}

export function validateNoNormalizedDuplicateFronts(cards: Card[]) {
  const seen = new Map<string, string>()

  cards.forEach((card) => {
    const normalizedFront = normalizeCardFront(card.front)

    if (!normalizedFront) {
      return
    }

    const existingId = seen.get(normalizedFront)

    if (existingId) {
      throw new Error(`Potential duplicate card front: ${existingId} | ${card.id}`)
    }

    seen.set(normalizedFront, card.id)
  })
}

export function validateCards(input: Card[], options: ValidationOptions = {}) {
  const seen = new Set<string>()

  input.forEach((card, index) => {
    if (!card.id) {
      throw new Error(`Card at index ${index} is missing an id`)
    }

    if (seen.has(card.id)) {
      throw new Error(`Duplicate card id: ${card.id}`)
    }

    seen.add(card.id)

    if (!card.front || !card.back) {
      throw new Error(`Card ${card.id} must have both front and back text`)
    }

    if (!Array.isArray(card.tags)) {
      throw new Error(`Card ${card.id} must have a tags array`)
    }
  })

  if (options.priorityCardIds) {
    validatePriorityCardIds(input, options.priorityCardIds)
  }

  if (options.allJdItems) {
    validateJdCoverage(input, options.allJdItems)
  }

  return input
}
