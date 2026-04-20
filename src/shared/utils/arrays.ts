export function unique(items: string[]) {
  return Array.from(new Set(items)).sort((a, b) => a.localeCompare(b))
}
