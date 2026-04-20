import { Fragment, type ReactNode } from 'react'
import { GlossaryHint } from '../components/GlossaryHint'
import { glossaryMap, glossaryPattern } from './glossary-matcher'

export function renderTextWithGlossary(text: string, keyPrefix: string) {
  const result: ReactNode[] = []
  const regex = new RegExp(glossaryPattern.source, 'gi')
  let lastIndex = 0
  let match: RegExpExecArray | null = regex.exec(text)

  while (match) {
    const matchedText = match[0]
    const offset = match.index

    if (offset > lastIndex) {
      result.push(text.slice(lastIndex, offset))
    }

    const entry = glossaryMap[matchedText.toLowerCase()]

    if (entry) {
      result.push(
        <GlossaryHint
          key={`${keyPrefix}-${offset}-${matchedText.toLowerCase()}`}
          term={matchedText}
          definition={entry.definition}
        />
      )
    } else {
      result.push(matchedText)
    }

    lastIndex = offset + matchedText.length
    match = regex.exec(text)
  }

  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex))
  }

  return result.length ? result : [text]
}

export function renderInline(text: string) {
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g)

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const content = part.slice(2, -2)
      return <strong key={index}>{renderTextWithGlossary(content, `b-${index}`)}</strong>
    }

    return <Fragment key={index}>{renderTextWithGlossary(part, `t-${index}`)}</Fragment>
  })
}
