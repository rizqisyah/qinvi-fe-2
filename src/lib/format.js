// Display formatters (Indonesian-locale friendly).

/**
 * Break a countdown target into days/hours/minutes/seconds vs. now.
 * Clamps to zero once the date has passed.
 * @param {string|Date|null} target ISO string or Date
 * @param {Date} [now]
 * @returns {{ days: number, hours: number, minutes: number, seconds: number }}
 */
export function countdownParts(target, now = new Date()) {
  const zero = { days: 0, hours: 0, minutes: 0, seconds: 0 }
  if (!target) return zero

  const end = target instanceof Date ? target : new Date(target)
  if (Number.isNaN(end.getTime())) return zero

  let diff = Math.floor((end.getTime() - now.getTime()) / 1000)
  if (diff <= 0) return zero

  const days = Math.floor(diff / 86400)
  diff -= days * 86400
  const hours = Math.floor(diff / 3600)
  diff -= hours * 3600
  const minutes = Math.floor(diff / 60)
  const seconds = diff - minutes * 60

  return { days, hours, minutes, seconds }
}

/** Zero-pad a number to 2 digits. */
export function pad2(n) {
  return String(n).padStart(2, '0')
}

/**
 * Relative "x lalu" label in Indonesian for a wish timestamp.
 * @param {string|Date|null} value
 * @param {Date} [now]
 * @returns {string}
 */
export function relativeTimeId(value, now = new Date(), isEnglish = false) {
  if (!value) return ''
  const then = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(then.getTime())) return ''

  const isEng = !!(isEnglish && typeof isEnglish === 'object' && 'value' in isEnglish ? isEnglish.value : isEnglish)

  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000)
  if (seconds < 60) return isEng ? 'just now' : 'baru saja'

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return isEng ? `${minutes}m ago` : `${minutes} menit lalu`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return isEng ? `${hours}h ago` : `${hours} jam lalu`

  const days = Math.floor(hours / 24)
  if (days < 30) return isEng ? `${days}d ago` : `${days} hari lalu`

  const months = Math.floor(days / 30)
  if (months < 12) return isEng ? `${months}mo ago` : `${months} bulan lalu`

  return isEng ? `${Math.floor(months / 12)}y ago` : `${Math.floor(months / 12)} tahun lalu`
}

/**
 * Build the "Putra/Putri ... dari Bapak ... & Ibu ..." parent line for a
 * pengantin record, tolerating missing pieces.
 * @param {{ child_of?: string|null, father_name?: string|null, mother_name?: string|null }} p
 * @returns {string}
 */
export function parentLine(p) {
  if (!p) return ''
  const parents = [p.father_name, p.mother_name].filter(Boolean).join(' ')
  const prefix = (p.child_of || '').trim()
  return [prefix, parents].filter(Boolean).join(parents ? ' ' : '').trim()
}
