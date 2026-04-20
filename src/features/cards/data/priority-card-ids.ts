export const priorityCardIds = [
  'card-0005',
  'card-0008',
  'card-0016',
  'card-0021',
  'card-0023',
  'card-0024',
  'card-0025',
  'card-0036',
  'card-0075',
  'card-0076',
  'card-0078',
  'card-0079',
] as const

export function isPriorityCard(cardId: string) {
  return priorityCardIds.includes(cardId as (typeof priorityCardIds)[number])
}
