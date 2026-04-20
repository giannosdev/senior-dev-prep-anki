import { useEffect } from 'react'

type KeyboardShortcutHandlers = {
  onFlip: () => void
  onNext: () => void
  onPrevious: () => void
  onMarkKnown: () => void
  onMarkReview: () => void
}

export function useKeyboardShortcuts({
  onFlip,
  onNext,
  onPrevious,
  onMarkKnown,
  onMarkReview,
}: KeyboardShortcutHandlers) {
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null

      if (target && ['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName)) {
        return
      }

      if (event.code === 'Space' || event.key === 'Enter') {
        event.preventDefault()
        onFlip()
      }

      if (event.key === 'ArrowRight') {
        onNext()
      }

      if (event.key === 'ArrowLeft') {
        onPrevious()
      }

      if (event.key.toLowerCase() === 'k') {
        onMarkKnown()
      }

      if (event.key.toLowerCase() === 'r') {
        onMarkReview()
      }
    }

    window.addEventListener('keydown', handleKey)

    return () => window.removeEventListener('keydown', handleKey)
  }, [onFlip, onNext, onPrevious, onMarkKnown, onMarkReview])
}
