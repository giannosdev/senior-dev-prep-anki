export function normalize(text: unknown) {
  return String(text || '').toLowerCase()
}

export function truncate(text: string, length = 64) {
  if (text.length <= length) {
    return text
  }

  return `${text.slice(0, length).trimEnd()}…`
}

export function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function normalizeTag(tag: string) {
  return normalize(tag).trim()
}
