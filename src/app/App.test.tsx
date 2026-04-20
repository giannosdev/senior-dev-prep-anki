import { render, screen } from '@testing-library/react'
import App from './App'
import { cards } from '../features/cards/data/cards'
import { priorityCardIds } from '../features/cards/data/priority-card-ids'
import { StudyCard } from '../features/study/components/StudyCard'

describe('app smoke tests', () => {
  it('renders the current dataset without crashing', () => {
    render(<App />)

    expect(screen.getByText('Senior React Anki Canvas')).toBeInTheDocument()
    expect(screen.getByText(`${cards.length} interview cards`)).toBeInTheDocument()
  })

  it('renders the priority pattern card path', () => {
    const priorityCard = cards.find((card) => card.id === priorityCardIds[0])

    if (!priorityCard) {
      throw new Error('Expected a priority card in the dataset')
    }

    render(
      <StudyCard
        card={priorityCard}
        status="new"
        showBack
        onFlip={() => {}}
        onNext={() => {}}
        onPrevious={() => {}}
      />
    )

    expect(screen.getByText('Pattern')).toBeInTheDocument()
    expect(screen.getByText('Structure')).toBeInTheDocument()
  })

  it('renders glossary tooltip terms in card output', () => {
    const glossaryCard = cards.find((card) => card.id === 'card-0096')

    if (!glossaryCard) {
      throw new Error('Expected glossary coverage card in the dataset')
    }

    render(
      <StudyCard
        card={glossaryCard}
        status="new"
        showBack
        onFlip={() => {}}
        onNext={() => {}}
        onPrevious={() => {}}
      />
    )

    expect(screen.getByRole('button', { name: 'Explain shared layer' })).toBeInTheDocument()
  })
})
