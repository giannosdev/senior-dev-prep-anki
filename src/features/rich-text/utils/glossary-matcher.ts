import { glossaryEntries } from '../../cards/data/glossary'
import { escapeRegExp } from '../../../shared/utils/text'

export function createGlossaryPattern(terms: readonly string[]) {
  return new RegExp(
    `\\b(${terms
      .map((term) => escapeRegExp(term))
      .sort((a, b) => b.length - a.length)
      .join('|')})\\b`,
    'gi'
  )
}

export const glossaryMap = Object.fromEntries(
  glossaryEntries.map((entry) => [entry.term.toLowerCase(), entry])
)

export const glossaryPattern = createGlossaryPattern(glossaryEntries.map((entry) => entry.term))
