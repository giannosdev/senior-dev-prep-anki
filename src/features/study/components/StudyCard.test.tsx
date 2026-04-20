import { fireEvent, render, screen } from '@testing-library/react'
import { StudyCard } from './StudyCard'
import type { Card } from '../types'

const card: Card = {
  id: 'card-study-test',
  category: 'React',
  lens: 'LLD strength',
  type: 'Definition',
  front: 'What does this study card do?',
  back: 'It flips on click or tap and shows visible tags.',
  tags: ['react', 'testing'],
  jdItem: 'JD item',
}

describe('StudyCard', () => {
  it('flips on click through the provided handler and shows tags', () => {
    const onFlip = vi.fn()

    render(
      <StudyCard
        card={card}
        status="new"
        showBack={false}
        onFlip={onFlip}
        onNext={() => {}}
        onPrevious={() => {}}
      />
    )

    fireEvent.click(screen.getByText('What does this study card do?'))

    expect(onFlip).toHaveBeenCalledTimes(1)
    expect(screen.getByText('#react')).toBeInTheDocument()
    expect(screen.getByText('#testing')).toBeInTheDocument()
  })
})
