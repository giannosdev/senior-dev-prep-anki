const patternKeywords = [
  { keywords: ['verify', 'verifying'], label: 'Verify' },
  { keywords: ['isolate', 'isolating'], label: 'Isolate' },
  { keywords: ['inspect'], label: 'Inspect' },
  { keywords: ['fix'], label: 'Fix' },
  { keywords: ['validate', 'validating'], label: 'Validate' },
  { keywords: ['definition', 'define'], label: 'Define' },
  { keywords: ['explain'], label: 'Explain' },
  { keywords: ['contrast'], label: 'Contrast' },
  { keywords: ['example'], label: 'Example' },
  { keywords: ['both options', 'both solve'], label: 'Frame' },
  { keywords: ['difference', 'distinguish'], label: 'Differentiate' },
  { keywords: ['choose'], label: 'Choose' },
  { keywords: ['tradeoff'], label: 'Tradeoff' },
  { keywords: ['simplest correct version', 'main flow'], label: 'Solve' },
  { keywords: ['state close', 'sharing need', 'owned by'], label: 'Place' },
  { keywords: ['separate'], label: 'Separate' },
  { keywords: ['handle'], label: 'Handle' },
  { keywords: ['extract'], label: 'Extract' },
  { keywords: ['clarify'], label: 'Clarify' },
  { keywords: ['split'], label: 'Split' },
  { keywords: ['shared code', 'boundaries', 'keep domain logic'], label: 'Bound' },
  { keywords: ['risk'], label: 'Risk' },
  { keywords: ['evolve'], label: 'Evolve' },
  { keywords: ['criteria'], label: 'Criteria' },
  { keywords: ['alternatives'], label: 'Compare' },
  { keywords: ['revisit'], label: 'Revisit' },
  { keywords: ['delivery flow', 'workflow'], label: 'Flow' },
  { keywords: ['checks'], label: 'Check' },
  { keywords: ['watch', 'risk areas'], label: 'Watch' },
  { keywords: ['outcome'], label: 'Outcome' },
  { keywords: ['context'], label: 'Context' },
  { keywords: ['responsibility', 'scope'], label: 'Scope' },
  { keywords: ['tension'], label: 'Tension' },
  { keywords: ['decision', 'handled it', 'what i did'], label: 'Action' },
  { keywords: ['lesson'], label: 'Lesson' },
  { keywords: ['problem'], label: 'Problem' },
  { keywords: ['view'], label: 'View' },
  { keywords: ['security', 'frontend concerns'], label: 'Focus' },
  { keywords: ['avoid'], label: 'Avoid' },
  { keywords: ['reduce', 'risk reduction'], label: 'Reduce' },
] as const

export function inferPatternStepLabel(line: string, index: number) {
  const trimmed = line.trim()
  const separators = [' — ', ': ']

  for (const separator of separators) {
    const position = trimmed.indexOf(separator)
    if (position > 0 && position < 28) {
      const candidate = trimmed.slice(0, position).trim()
      if (candidate) {
        return candidate
      }
    }
  }

  const lower = line.toLowerCase()

  for (const item of patternKeywords) {
    if (item.keywords.some((keyword) => lower.includes(keyword))) {
      return item.label
    }
  }

  let word = ''

  for (const char of trimmed) {
    const lowerChar = char.toLowerCase()
    const isLetter = lowerChar >= 'a' && lowerChar <= 'z'

    if (isLetter) {
      word += char
    } else if (word) {
      break
    }
  }

  if (word) {
    return `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`
  }

  return `Step ${index + 1}`
}
