import { useCallback, useRef, type TouchEvent } from 'react'
import { getSwipeDirection, type SwipePoint } from '../utils/swipe'

type UseCardSwipeOptions = {
  onSwipeLeft: () => void
  onSwipeRight: () => void
}

export function useCardSwipe({ onSwipeLeft, onSwipeRight }: UseCardSwipeOptions) {
  const swipeStartRef = useRef<SwipePoint | null>(null)
  const ignoreClickUntilRef = useRef(0)

  const onTouchStart = useCallback((event: TouchEvent<HTMLElement>) => {
    const touch = event.touches[0]

    if (!touch) {
      return
    }

    swipeStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
    }
  }, [])

  const onTouchEnd = useCallback((event: TouchEvent<HTMLElement>) => {
    const touch = event.changedTouches[0]

    if (!touch) {
      swipeStartRef.current = null
      return
    }

    const direction = getSwipeDirection(
      swipeStartRef.current,
      {
        x: touch.clientX,
        y: touch.clientY,
      }
    )

    swipeStartRef.current = null

    if (!direction) {
      return
    }

    ignoreClickUntilRef.current = Date.now() + 400

    if (direction === 'left') {
      onSwipeLeft()
      return
    }

    onSwipeRight()
  }, [onSwipeLeft, onSwipeRight])

  const onTouchCancel = useCallback(() => {
    swipeStartRef.current = null
  }, [])

  const shouldIgnoreClick = useCallback(() => {
    return Date.now() < ignoreClickUntilRef.current
  }, [])

  return {
    onTouchStart,
    onTouchEnd,
    onTouchCancel,
    shouldIgnoreClick,
  }
}
