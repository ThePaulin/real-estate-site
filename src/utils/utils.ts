import typographicBase from 'typographic-base'

// identify if class is missing
export function missingClass (string?: string, prefix?: string) {
  if (!string) {
    return true
  }
  // class missing

  const regex = new RegExp(` ?${prefix}`, 'g')
  // true when prefix is missing
  return string.match(regex) === null
}

export function formatText (input?: string | React.ReactNode) {
  if (!input) {
    return
  }

  if (typeof input !== 'string') {
    return input
  }

  return typographicBase(input, { locale: 'en-us' }).replace(
    /\s([^\s<]+)\s*$/g,
    '\u00A0$1'
  )
}
