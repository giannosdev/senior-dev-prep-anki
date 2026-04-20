export function splitPatternSections(text: string) {
  const sections: string[][] = []
  let current: string[] = []

  String(text || '')
    .split('\n')
    .forEach((line) => {
      if (line.trim() === '---') {
        if (current.length) {
          sections.push(current.filter((item) => item.trim().length > 0))
        }

        current = []
        return
      }

      current.push(line.trimEnd())
    })

  if (current.length) {
    sections.push(current.filter((item) => item.trim().length > 0))
  }

  return sections
}
