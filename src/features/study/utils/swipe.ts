export type SwipePoint = {
  x: number
  y: number
}

export function getSwipeDirection(start: SwipePoint | null, end: SwipePoint | null) {
  if (!start || !end) {
    return null
  }

  const deltaX = end.x - start.x
  const deltaY = end.y - start.y
  const horizontalDistance = Math.abs(deltaX)
  const verticalDistance = Math.abs(deltaY)

  if (horizontalDistance < 56) {
    return null
  }

  if (horizontalDistance < verticalDistance * 1.25) {
    return null
  }

  return deltaX < 0 ? 'left' : 'right'
}
