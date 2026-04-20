type StudyActionsProps = {
  showBack: boolean
  onPrevious: () => void
  onNext: () => void
  onFlip: () => void
  onMarkReview: () => void
  onMarkKnown: () => void
}

export function StudyActions({
  showBack,
  onPrevious,
  onNext,
  onFlip,
  onMarkReview,
  onMarkKnown,
}: StudyActionsProps) {
  return (
    <>
      <div className="actions">
        <button onClick={onPrevious}>Previous</button>
        <button className="primary" onClick={onFlip}>
          {showBack ? 'Show question' : 'Show answer'}
        </button>
        <button onClick={onNext}>Next</button>
      </div>

      <div className="grade-actions">
        <button className="review" onClick={onMarkReview}>Mark revisit</button>
        <button className="known" onClick={onMarkKnown}>Mark known</button>
      </div>
    </>
  )
}
