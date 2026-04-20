export function buildMnemonic(labels: string[]) {
  return labels.map((label) => label.charAt(0).toUpperCase()).join('')
}
