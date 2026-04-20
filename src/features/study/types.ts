export type CardStatus = 'new' | 'review' | 'known'

export type Card = {
  id: string
  category: string
  lens: string
  type: string
  front: string
  back: string
  tags: string[]
  jdItem: string
}

export type GlossaryEntry = {
  term: string
  definition: string
}

export type ProgressMap = Record<string, CardStatus>

export type StatusFilter = 'All' | CardStatus

export type StudyFilters = {
  query: string
  category: string
  lens: string
  questionType: string
  statusFilter: StatusFilter
  jdFilter: string
  priorityOnly: boolean
}

export type StatusCounts = {
  known: number
  review: number
  new: number
}
