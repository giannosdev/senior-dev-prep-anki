import type { Card } from '../../study/types'

const patternThemes = {
  definition: { soft: '#eff6ff', border: '#93c5fd', text: '#1d4ed8' },
  comparison: { soft: '#f5f3ff', border: '#c4b5fd', text: '#6d28d9' },
  implementation: { soft: '#ecfeff', border: '#67e8f9', text: '#0f766e' },
  architecture: { soft: '#eef2ff', border: '#a5b4fc', text: '#4338ca' },
  tradeoff: { soft: '#fffbeb', border: '#fcd34d', text: '#b45309' },
  debugging: { soft: '#fff1f2', border: '#fda4af', text: '#be123c' },
  process: { soft: '#f8fafc', border: '#94a3b8', text: '#334155' },
  ownership: { soft: '#ecfdf5', border: '#86efac', text: '#166534' },
  behavioral: { soft: '#fff7ed', border: '#fdba74', text: '#c2410c' },
  security: { soft: '#fff7ed', border: '#fdba74', text: '#9a3412' },
  default: { soft: '#eff6ff', border: '#bfdbfe', text: '#1d4ed8' },
} as const

export type PatternTheme = (typeof patternThemes)[keyof typeof patternThemes]

export function getPatternTheme(card: Card): PatternTheme {
  const source = `${card.category} ${card.front} ${card.type}`.toLowerCase()

  if (source.includes('debug')) return patternThemes.debugging
  if (source.includes('comparison')) return patternThemes.comparison
  if (source.includes('implementation') || source.includes('lld')) return patternThemes.implementation
  if (source.includes('architecture') || source.includes('hld') || source.includes('design')) return patternThemes.architecture
  if (source.includes('tradeoff') || source.includes('decision')) return patternThemes.tradeoff
  if (source.includes('process')) return patternThemes.process
  if (source.includes('ownership')) return patternThemes.ownership
  if (source.includes('behavioral')) return patternThemes.behavioral
  if (source.includes('security') || source.includes('devsecops')) return patternThemes.security
  if (source.includes('definition') || source.includes('concept')) return patternThemes.definition

  return patternThemes.default
}
