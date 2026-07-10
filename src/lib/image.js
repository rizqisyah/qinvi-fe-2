// Image URL helpers.

const IMAGEKIT_HOST = 'ik.imagekit.io'

/**
 * Ask ImageKit for a resized copy of an image. Source uploads run several
 * thousand pixels wide, which is far past anything the layout renders.
 * Non-ImageKit URLs (and URLs that already carry a transform) pass through.
 * @param {string} url
 * @param {number} width target width in pixels
 * @returns {string}
 */
export function sizedImage(url, width) {
  if (!url) return ''

  let parsed
  try {
    parsed = new URL(url)
  } catch {
    return url
  }

  if (parsed.hostname !== IMAGEKIT_HOST || parsed.searchParams.has('tr')) return url

  parsed.searchParams.set('tr', `w-${width}`)
  return parsed.toString()
}
