import { useEffect, useState } from 'react'
import type { CardStatus, ProgressMap } from '../types'

export const STORAGE_KEY = 'senior-react-anki-progress-v1'

export function useLocalProgress(storageKey = STORAGE_KEY) {
  const [progress, setProgress] = useState<ProgressMap>(() => {
    try {
      if (typeof window === 'undefined') {
        return {}
      }

      return JSON.parse(window.localStorage.getItem(storageKey) || '{}') || {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(storageKey, JSON.stringify(progress))
      }
    } catch {
      // Ignore storage failures in preview environments.
    }
  }, [progress, storageKey])

  const setStatus = (id: string, status: CardStatus) => {
    setProgress((current) => ({ ...current, [id]: status }))
  }

  const reset = () => setProgress({})

  return { progress, setStatus, reset }
}
