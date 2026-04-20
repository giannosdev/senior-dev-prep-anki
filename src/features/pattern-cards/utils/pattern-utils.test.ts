import { buildMnemonic } from './mnemonic'
import { splitPatternSections } from './pattern-sections'
import { inferPatternStepLabel } from './step-labels'

describe('pattern utilities', () => {
  it('splits sections on divider markers', () => {
    expect(splitPatternSections('One\n---\nTwo')).toEqual([['One'], ['Two']])
  })

  it('infers explicit step labels', () => {
    expect(inferPatternStepLabel('Criteria — make the decision criteria concrete.', 0)).toBe('Criteria')
  })

  it('builds mnemonic strings', () => {
    expect(buildMnemonic(['Frame', 'Real difference', 'Apply X', 'Move to Y', 'End tradeoff'])).toBe('FRAME')
  })
})
