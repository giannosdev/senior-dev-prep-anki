import { cards } from '../features/cards/data/cards'
import { EmptyState } from '../features/study/components/EmptyState'
import { StudyActions } from '../features/study/components/StudyActions'
import { StudyCard } from '../features/study/components/StudyCard'
import { StudyLayout } from '../features/study/components/StudyLayout'
import { StudySidebar } from '../features/study/components/StudySidebar'
import { useKeyboardShortcuts } from '../features/study/hooks/useKeyboardShortcuts'
import { useStudyDeck } from '../features/study/hooks/useStudyDeck'
import '../styles/study.css'

export default function App() {
  const deck = useStudyDeck(cards)

  useKeyboardShortcuts({
    onFlip: deck.flipCard,
    onNext: deck.nextCard,
    onPrevious: deck.prevCard,
    onMarkKnown: deck.markKnown,
    onMarkReview: deck.markReview,
  })

  return (
    <StudyLayout
      sidebar={(
        <StudySidebar
          totalCards={cards.length}
          query={deck.query}
          category={deck.category}
          lens={deck.lens}
          questionType={deck.questionType}
          statusFilter={deck.statusFilter}
          jdFilter={deck.jdFilter}
          priorityOnly={deck.priorityOnly}
          categories={deck.categories}
          lenses={deck.lenses}
          questionTypes={deck.questionTypes}
          jdItems={deck.jdItems}
          counts={deck.counts}
          priorityCounts={deck.priorityCounts}
          priorityCards={deck.priorityCards}
          onQueryChange={deck.setQuery}
          onCategoryChange={deck.setCategory}
          onLensChange={deck.setLens}
          onQuestionTypeChange={deck.setQuestionType}
          onStatusFilterChange={deck.setStatusFilter}
          onJdFilterChange={deck.setJdFilter}
          onPriorityOnlyChange={deck.setPriorityOnly}
          onShuffle={deck.shuffleCards}
          onResetProgress={deck.resetProgress}
        />
      )}
    >
      <header className="topbar">
        <div>
          <p className="eyebrow">Filtered deck</p>
          <h2>{deck.filteredCount} cards available</h2>
        </div>
        <div className="progress-line">
          {deck.filteredCount ? `${deck.currentPosition} / ${deck.filteredCount}` : '0 / 0'}
        </div>
      </header>

      {deck.currentCard ? (
        <StudyCard
          card={deck.currentCard}
          status={deck.currentStatus}
          showBack={deck.showBack}
          onFlip={deck.flipCard}
        />
      ) : (
        <EmptyState />
      )}

      <StudyActions
        showBack={deck.showBack}
        onPrevious={deck.prevCard}
        onNext={deck.nextCard}
        onFlip={deck.flipCard}
        onMarkReview={deck.markReview}
        onMarkKnown={deck.markKnown}
      />
    </StudyLayout>
  )
}
