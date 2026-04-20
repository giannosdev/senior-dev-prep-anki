import { renderToStaticMarkup } from 'react-dom/server'
import { glossaryPattern } from './glossary-matcher'
import { renderInline } from './render-inline'
import { escapeRegExp } from '../../../shared/utils/text'

describe('glossary matching', () => {
  it('matches single and multi-word glossary terms', () => {
    expect(new RegExp(glossaryPattern.source, 'gi').test('ownership')).toBe(true)
    expect(new RegExp(glossaryPattern.source, 'gi').test('boundaries')).toBe(true)
    expect(new RegExp(glossaryPattern.source, 'gi').test('shared layer')).toBe(true)
    expect(new RegExp(glossaryPattern.source, 'gi').test('unions')).toBe(true)
    expect(new RegExp(glossaryPattern.source, 'gi').test('mapped types')).toBe(true)
  })

  it('escapes regex special characters safely', () => {
    const pattern = new RegExp(escapeRegExp('a+b?'), 'g')

    expect('prefix a+b? suffix'.match(pattern)?.[0]).toBe('a+b?')
  })

  it('preserves surrounding text when rendering glossary terms inline', () => {
    const html = renderToStaticMarkup(
      <span>{renderInline('Tighter ownership and shared layer boundaries matter.')}</span>
    )

    expect(html).toContain('Tighter ')
    expect(html).toContain(' and ')
    expect(html).toContain(' matter.')
  })

  it('renders TypeScript glossary terms inline without breaking the sentence', () => {
    const html = renderToStaticMarkup(
      <span>{renderInline('type is more flexible when you need unions, intersections, tuples, and mapped types.')}</span>
    )

    expect(html).toContain('type is more flexible when you need ')
    expect(html).toContain('unions')
    expect(html).toContain('intersections')
    expect(html).toContain('tuples')
    expect(html).toContain('mapped types')
  })
})
