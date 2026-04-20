import { cards } from './cards'
import { filterStudyIndexes } from '../../study/utils/filtering'
import type { StudyFilters } from '../../study/types'

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

describe('targeted interview-prep content coverage', () => {
  it('adds the missing browser storage and tooling topics without breaking discoverability', () => {
    const studyOrder = cards.map((_, index) => index)

    const storageIndexes = filterStudyIndexes({
      cards,
      studyOrder,
      progress: {},
      filters: {
        ...baseFilters,
        query: 'cookies',
        category: 'Browser fundamentals: Storage',
        jdFilter: 'Implement CI/CD best practices and support DevSecOps processes',
      },
    })

    const lockfileIndexes = filterStudyIndexes({
      cards,
      studyOrder,
      progress: {},
      filters: {
        ...baseFilters,
        query: 'lockfile',
        category: 'Frontend tooling: Package management',
        jdFilter: 'Experience with CI/CD pipelines and source control tools such as Git',
      },
    })

    expect(storageIndexes.map((index) => cards[index].id)).toEqual(expect.arrayContaining(['card-0100', 'card-0101']))
    expect(lockfileIndexes.map((index) => cards[index].id)).toContain('card-0106')
  })

  it('adds the missing HTTP and TypeScript topics under searchable categories', () => {
    const studyOrder = cards.map((_, index) => index)

    const httpIndexes = filterStudyIndexes({
      cards,
      studyOrder,
      progress: {},
      filters: {
        ...baseFilters,
        query: 'status-codes',
        category: 'HTTP and APIs: REST and status codes',
        jdFilter: 'Collaborate closely with backend engineers to integrate REST and/or GraphQL APIs',
      },
    })

    const typeScriptIndexes = filterStudyIndexes({
      cards,
      studyOrder,
      progress: {},
      filters: {
        ...baseFilters,
        query: 'union',
        category: 'TypeScript: Types and modeling',
        jdFilter: 'Develop, enhance, and maintain responsive front-end applications using React.js and modern JavaScript/TypeScript',
      },
    })

    expect(httpIndexes.map((index) => cards[index].id)).toEqual(expect.arrayContaining(['card-0104', 'card-0105']))
    expect(typeScriptIndexes.map((index) => cards[index].id)).toContain('card-0102')
  })

  it('keeps the new topic cards discoverable through normalized tags', () => {
    const studyOrder = cards.map((_, index) => index)

    const fundamentalsIndexes = filterStudyIndexes({
      cards,
      studyOrder,
      progress: {},
      filters: {
        ...baseFilters,
        tagFilter: 'frontend-fundamentals',
        category: 'HTTP and APIs: REST and status codes',
      },
    })

    expect(fundamentalsIndexes.map((index) => cards[index].id)).toEqual(expect.arrayContaining(['card-0103', 'card-0104', 'card-0105']))
  })
})
