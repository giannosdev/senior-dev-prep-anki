import { priorityCardIds } from '../../cards/data/priority-card-ids'
import { filterStudyIndexes } from './filtering'
import { countStatuses } from './stats'
import type { Card, ProgressMap, StudyFilters } from '../types'

const cards: Card[] = [
  {
    id: priorityCardIds[0],
    category: 'React',
    lens: 'Tradeoff judgment',
    type: 'Definition',
    front: 'React ownership',
    back: 'State ownership details',
    tags: ['react', 'ownership'],
    jdItem: 'JD 1',
  },
  {
    id: 'card-non-priority',
    category: 'React',
    lens: 'Tradeoff judgment',
    type: 'Definition',
    front: 'React caching',
    back: 'Caching details',
    tags: ['react'],
    jdItem: 'JD 1',
  },
  {
    id: 'card-other',
    category: 'Architecture',
    lens: 'HLD awareness',
    type: 'Design',
    front: 'Large app design',
    back: 'Architecture details',
    tags: ['architecture'],
    jdItem: 'JD 2',
  },
]

const baseFilters: StudyFilters = {
  query: '',
  category: 'All',
  tagFilter: 'All',
  lens: 'All',
  questionType: 'All',
  statusFilter: 'All',
  jdFilter: 'All',
  priorityOnly: false,
}

describe('study filtering and stats', () => {
  it('combines filters correctly', () => {
    const progress: ProgressMap = {
      [priorityCardIds[0]]: 'review',
      'card-non-priority': 'known',
    }

    const result = filterStudyIndexes({
      cards,
      studyOrder: [0, 1, 2],
      progress,
      filters: {
        ...baseFilters,
        query: 'ownership',
        category: 'React',
        lens: 'Tradeoff judgment',
        questionType: 'Definition',
        statusFilter: 'review',
        jdFilter: 'JD 1',
      },
    })

    expect(result).toEqual([0])
  })

  it('narrows results in priority-only mode', () => {
    const result = filterStudyIndexes({
      cards,
      studyOrder: [0, 1, 2],
      progress: {},
      filters: {
        ...baseFilters,
        category: 'React',
        priorityOnly: true,
      },
    })

    expect(result).toEqual([0])
  })

  it('matches tags in search and tag filtering', () => {
    const queryResult = filterStudyIndexes({
      cards,
      studyOrder: [0, 1, 2],
      progress: {},
      filters: {
        ...baseFilters,
        query: 'architecture',
      },
    })

    const tagResult = filterStudyIndexes({
      cards,
      studyOrder: [0, 1, 2],
      progress: {},
      filters: {
        ...baseFilters,
        tagFilter: 'react',
        category: 'React',
      },
    })

    expect(queryResult).toEqual([2])
    expect(tagResult).toEqual([0, 1])
  })

  it('computes known, review, and new counts', () => {
    expect(countStatuses(['known', 'review', 'review'], 5)).toEqual({
      known: 1,
      review: 2,
      new: 2,
    })
  })
})
