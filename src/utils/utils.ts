// identify if class is missing
export function missingClass (string?: string, prefix?: string): boolean {
  if (string === undefined) {
    return true
  }
  // class missing

  const regex = prefix !== undefined ? new RegExp(` ?${prefix}`, "g") : ''
  // true when prefix is missing
  return string.match(regex) === null
}
