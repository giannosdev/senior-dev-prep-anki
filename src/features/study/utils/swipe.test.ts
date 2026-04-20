import { getSwipeDirection } from './swipe'

describe('swipe helpers', () => {
  it('detects left and right swipes', () => {
    expect(getSwipeDirection({ x: 120, y: 40 }, { x: 40, y: 46 })).toBe('left')
    expect(getSwipeDirection({ x: 40, y: 46 }, { x: 120, y: 40 })).toBe('right')
  })

  it('ignores short or vertical-dominant gestures', () => {
    expect(getSwipeDirection({ x: 40, y: 40 }, { x: 70, y: 44 })).toBeNull()
    expect(getSwipeDirection({ x: 40, y: 40 }, { x: 96, y: 126 })).toBeNull()
  })
})
