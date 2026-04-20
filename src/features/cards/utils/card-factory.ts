import type { Card } from '../../study/types'

export function joinLines(...parts: string[]) {
  return parts.join('\n')
}

export function makeCard(
  id: string,
  category: string,
  lens: string,
  type: string,
  front: string,
  back: string,
  tags: string[],
  jdItem = ''
): Card {
  return {
    id,
    category,
    lens,
    type,
    front,
    back,
    tags,
    jdItem,
  }
}
