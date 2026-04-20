type GlossaryHintProps = {
  term: string
  definition: string
}

export function GlossaryHint({ term, definition }: GlossaryHintProps) {
  return (
    <span className="glossary-wrap">
      <span className="glossary-term">{term}</span>
      <span
        className="glossary-trigger"
        tabIndex={0}
        role="button"
        aria-label={`Explain ${term}`}
        onClick={(event) => event.stopPropagation()}
        onMouseDown={(event) => event.stopPropagation()}
        onTouchStart={(event) => event.stopPropagation()}
      >
        i
        <span className="glossary-tooltip">{definition}</span>
      </span>
    </span>
  )
}
