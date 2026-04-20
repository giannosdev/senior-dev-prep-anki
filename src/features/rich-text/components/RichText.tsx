import type { ReactNode } from 'react'
import { renderInline } from '../utils/render-inline'

type RichTextProps = {
  text: string
}

export function RichText({ text }: RichTextProps) {
  const lines = String(text || '').split('\n')
  const blocks: ReactNode[] = []
  let listItems: ReactNode[] = []

  const flushList = () => {
    if (listItems.length) {
      blocks.push(<ul key={`ul-${blocks.length}`}>{listItems}</ul>)
      listItems = []
    }
  }

  lines.forEach((rawLine, index) => {
    const line = rawLine.trimEnd()

    if (!line.trim()) {
      flushList()
      return
    }

    if (line.trim() === '---') {
      flushList()
      blocks.push(<hr key={`hr-${index}`} className="divider" />)
      return
    }

    if (line.trim().startsWith('- ')) {
      listItems.push(<li key={`li-${index}`}>{renderInline(line.trim().slice(2))}</li>)
      return
    }

    flushList()
    blocks.push(<p key={`p-${index}`}>{renderInline(line)}</p>)
  })

  flushList()

  return <div className="rich-text">{blocks}</div>
}
