import type { ChangeEvent } from 'react'
import { PriorityPanel } from './PriorityPanel'
import type { Card, StatusCounts, StatusFilter } from '../types'

type StudySidebarProps = {
  totalCards: number
  query: string
  category: string
  tagFilter: string
  lens: string
  questionType: string
  statusFilter: StatusFilter
  jdFilter: string
  priorityOnly: boolean
  categories: string[]
  tags: string[]
  lenses: string[]
  questionTypes: string[]
  jdItems: string[]
  counts: StatusCounts
  priorityCounts: StatusCounts
  priorityCards: Card[]
  onQueryChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onTagFilterChange: (value: string) => void
  onLensChange: (value: string) => void
  onQuestionTypeChange: (value: string) => void
  onStatusFilterChange: (value: StatusFilter) => void
  onJdFilterChange: (value: string) => void
  onPriorityOnlyChange: (value: boolean) => void
  onShuffle: () => void
  onResetProgress: () => void
}

function selectValue(event: ChangeEvent<HTMLSelectElement>) {
  return event.target.value
}

export function StudySidebar({
  totalCards,
  query,
  category,
  tagFilter,
  lens,
  questionType,
  statusFilter,
  jdFilter,
  priorityOnly,
  categories,
  tags,
  lenses,
  questionTypes,
  jdItems,
  counts,
  priorityCounts,
  priorityCards,
  onQueryChange,
  onCategoryChange,
  onTagFilterChange,
  onLensChange,
  onQuestionTypeChange,
  onStatusFilterChange,
  onJdFilterChange,
  onPriorityOnlyChange,
  onShuffle,
  onResetProgress,
}: StudySidebarProps) {
  return (
    <>
      <div className="brand">
        <div className="logo">SR</div>
        <div>
          <h1>Senior React Anki Canvas</h1>
          <p>{totalCards} interview cards</p>
        </div>
      </div>

      <label>
        Search
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="React, cookies, debugging..."
        />
      </label>

      <label>
        Category
        <select value={category} onChange={(event) => onCategoryChange(selectValue(event))}>
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>

      <label>
        Tag
        <select value={tagFilter} onChange={(event) => onTagFilterChange(selectValue(event))}>
          {tags.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>

      <label>
        Senior lens
        <select value={lens} onChange={(event) => onLensChange(selectValue(event))}>
          {lenses.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>

      <label>
        Question type
        <select value={questionType} onChange={(event) => onQuestionTypeChange(selectValue(event))}>
          {questionTypes.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>

      <label>
        JD item
        <select value={jdFilter} onChange={(event) => onJdFilterChange(selectValue(event))}>
          {jdItems.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>

      <label>
        Progress
        <select value={statusFilter} onChange={(event) => onStatusFilterChange(selectValue(event) as StatusFilter)}>
          <option value="All">All</option>
          <option value="new">new</option>
          <option value="review">review</option>
          <option value="known">known</option>
        </select>
      </label>

      <div className="stats">
        <div>
          <span>{counts.new}</span>
          <small>new</small>
        </div>
        <div>
          <span>{counts.review}</span>
          <small>review</small>
        </div>
        <div>
          <span>{counts.known}</span>
          <small>known</small>
        </div>
      </div>

      <label>
        Priority mode
        <select
          value={priorityOnly ? 'priority' : 'all'}
          onChange={(event) => onPriorityOnlyChange(selectValue(event) === 'priority')}
        >
          <option value="all">All cards</option>
          <option value="priority">Top-priority only</option>
        </select>
      </label>

      <div className="stats">
        <div>
          <span>{priorityCards.length}</span>
          <small>priority total</small>
        </div>
        <div>
          <span>{priorityCounts.review}</span>
          <small>priority review</small>
        </div>
        <div>
          <span>{priorityCounts.known}</span>
          <small>priority known</small>
        </div>
      </div>

      <PriorityPanel priorityCards={priorityCards} />

      <button className="ghost" onClick={onShuffle}>Shuffle deck</button>
      <button className="ghost danger" onClick={onResetProgress}>Reset progress</button>

      <div className="shortcuts">
        <strong>Shortcuts</strong>
        <p><kbd>Space</kbd>/<kbd>Enter</kbd> flip</p>
        <p><kbd>←</kbd>/<kbd>→</kbd> navigate</p>
        <p><kbd>K</kbd> known, <kbd>R</kbd> review</p>
      </div>
    </>
  )
}
