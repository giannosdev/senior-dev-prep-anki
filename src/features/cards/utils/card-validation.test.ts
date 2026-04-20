import { cards } from '../data/cards'
import { allJdItems } from '../data/jd-items'
import { priorityCardIds } from '../data/priority-card-ids'
import {
  normalizeCardFront,
  validateCards,
  validateJdCoverage,
  validateNoNormalizedDuplicateFronts,
  validatePriorityCardIds,
} from './card-validation'
import type { Card } from '../../study/types'

function makeValidCard(overrides: Partial<Card> = {}): Card {
  return {
    id: 'card-test',
    category: 'Category',
    lens: 'Lens',
    type: 'Type',
    front: 'Front',
    back: 'Back',
    tags: ['tag'],
    jdItem: '',
    ...overrides,
  }
}

describe('card validation', () => {
  it('fails on duplicate ids', () => {
    expect(() => validateCards([
      makeValidCard({ id: 'dup' }),
      makeValidCard({ id: 'dup', front: 'Another front' }),
    ])).toThrow('Duplicate card id: dup')
  })

  it('fails when front or back is missing', () => {
    expect(() => validateCards([makeValidCard({ front: '' })])).toThrow('must have both front and back text')
    expect(() => validateCards([makeValidCard({ back: '' })])).toThrow('must have both front and back text')
  })

  it('fails when tags is not an array', () => {
    expect(() => validateCards([
      makeValidCard({ tags: 'not-an-array' as unknown as string[] }),
    ])).toThrow('must have a tags array')
  })

  it('ensures priority card ids all exist', () => {
    expect(() => validatePriorityCardIds(cards, priorityCardIds)).not.toThrow()
  })

  it('ensures every JD item has at least one mapped card', () => {
    expect(() => validateJdCoverage(cards, allJdItems)).not.toThrow()
  })

  it('fails on normalized front duplicates', () => {
    expect(() => validateNoNormalizedDuplicateFronts([
      makeValidCard({ id: 'card-a', front: '401 vs 403: what matters?' }),
      makeValidCard({ id: 'card-b', front: '401 vs 403 - what matters' }),
    ])).toThrow('Potential duplicate card front: card-a | card-b')
  })

  it('normalizes card fronts consistently', () => {
    expect(normalizeCardFront('localStorage vs sessionStorage vs cookies: when would you use each?'))
      .toBe('localstorage vs sessionstorage vs cookies when would you use each')
  })

  it('ensures the deck has no normalized front duplicates', () => {
    expect(() => validateNoNormalizedDuplicateFronts(cards)).not.toThrow()
  })
})
