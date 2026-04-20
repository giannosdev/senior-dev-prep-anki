import { useCallback, useEffect, useMemo, useState } from 'react'
import { allJdItems } from '../../cards/data/jd-items'
import { isPriorityCard } from '../../cards/data/priority-card-ids'
import { unique } from '../../../shared/utils/arrays'
import { useLocalProgress } from './useLocalProgress'
import { filterStudyIndexes, getCardStatus } from '../utils/filtering'
import { shuffleIndexes } from '../utils/shuffling'
import { countStatuses, countStatusesForCards } from '../utils/stats'
import type { Card, StatusFilter } from '../types'

export function useStudyDeck(cards: Card[]) {
  const { progress, setStatus, reset } = useLocalProgress()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [lens, setLens] = useState('All')
  const [questionType, setQuestionType] = useState('All')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All')
  const [jdFilter, setJdFilter] = useState('All')
  const [priorityOnly, setPriorityOnly] = useState(false)
  const [showBack, setShowBack] = useState(false)
  const [index, setIndex] = useState(0)
  const [studyOrder, setStudyOrder] = useState(() => cards.map((_, cardIndex) => cardIndex))

  const categories = useMemo(() => ['All', ...unique(cards.map((card) => card.category))], [cards])
  const lenses = useMemo(() => ['All', ...unique(cards.map((card) => card.lens))], [cards])
  const questionTypes = useMemo(() => ['All', ...unique(cards.map((card) => card.type))], [cards])
  const jdItems = useMemo(() => ['All', ...allJdItems], [])
  const priorityCards = useMemo(() => cards.filter((card) => isPriorityCard(card.id)), [cards])

  const filteredIndexes = useMemo(() => {
    return filterStudyIndexes({
      cards,
      studyOrder,
      progress,
      filters: {
        query,
        category,
        lens,
        questionType,
        statusFilter,
        jdFilter,
        priorityOnly,
      },
    })
  }, [cards, studyOrder, progress, query, category, lens, questionType, statusFilter, jdFilter, priorityOnly])

  useEffect(() => {
    setIndex(0)
    setShowBack(false)
  }, [query, category, lens, questionType, statusFilter, jdFilter, priorityOnly])

  const currentCard = filteredIndexes.length ? cards[filteredIndexes[index % filteredIndexes.length]] : null
  const currentStatus = currentCard ? getCardStatus(currentCard.id, progress) : 'new'

  const flipCard = useCallback(() => {
    setShowBack((current) => !current)
  }, [])

  const nextCard = useCallback(() => {
    if (!filteredIndexes.length) {
      return
    }

    setIndex((current) => (current + 1) % filteredIndexes.length)
    setShowBack(false)
  }, [filteredIndexes.length])

  const prevCard = useCallback(() => {
    if (!filteredIndexes.length) {
      return
    }

    setIndex((current) => (current - 1 + filteredIndexes.length) % filteredIndexes.length)
    setShowBack(false)
  }, [filteredIndexes.length])

  const markCurrent = useCallback((value: 'review' | 'known') => {
    const activeCard = filteredIndexes.length ? cards[filteredIndexes[index % filteredIndexes.length]] : null

    if (!activeCard) {
      return
    }

    setStatus(activeCard.id, value)

    if (filteredIndexes.length) {
      setIndex((current) => (current + 1) % filteredIndexes.length)
      setShowBack(false)
    }
  }, [cards, filteredIndexes, index, setStatus])

  const markKnown = useCallback(() => {
    markCurrent('known')
  }, [markCurrent])

  const markReview = useCallback(() => {
    markCurrent('review')
  }, [markCurrent])

  const shuffleCards = useCallback(() => {
    setStudyOrder(shuffleIndexes(cards.length))
    setIndex(0)
    setShowBack(false)
  }, [cards.length])

  const priorityCounts = useMemo(() => countStatusesForCards(priorityCards, progress), [priorityCards, progress])
  const counts = useMemo(() => countStatuses(Object.values(progress), cards.length), [cards.length, progress])

  return {
    query,
    category,
    lens,
    questionType,
    statusFilter,
    jdFilter,
    priorityOnly,
    showBack,
    currentCard,
    currentStatus,
    currentPosition: filteredIndexes.length ? index + 1 : 0,
    filteredCount: filteredIndexes.length,
    categories,
    lenses,
    questionTypes,
    jdItems,
    priorityCards,
    counts,
    priorityCounts,
    setQuery,
    setCategory,
    setLens,
    setQuestionType,
    setStatusFilter,
    setJdFilter,
    setPriorityOnly,
    flipCard,
    nextCard,
    prevCard,
    markKnown,
    markReview,
    shuffleCards,
    resetProgress: reset,
  }
}
