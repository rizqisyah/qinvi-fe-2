// Thin fetch wrapper for the Qinvi wedding API.
// All calls go through `/api` (same-origin), which the Vite dev server proxies
// to the real backend and which production serves from the same host.

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'
const DEFAULT_SLUG = import.meta.env.VITE_DEFAULT_SLUG || 'indah-budi'

/**
 * Resolve the wedding slug from the URL's last path segment.
 * e.g. `https://site.com/indah-budi` -> `indah-budi`. Falls back to the
 * configured default when at the root.
 * @returns {string}
 */
export function resolveSlug() {
  const segments = window.location.pathname.split('/').filter(Boolean)
  return segments.length ? segments[segments.length - 1] : DEFAULT_SLUG
}

/**
 * @param {string} path
 * @param {RequestInit} [options]
 * @returns {Promise<any>}
 */
async function request(path, options = {}) {
  let res
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options,
    })
  } catch (networkError) {
    throw new Error(`Network error: ${networkError.message}`)
  }

  let payload = null
  try {
    payload = await res.json()
  } catch {
    // Non-JSON response; leave payload null.
  }

  if (!res.ok || (payload && payload.success === false)) {
    const message = (payload && payload.message) || `Request failed (${res.status})`
    throw new Error(message)
  }

  return payload
}

/**
 * Fetch the full home payload (wedding, theme, guest, content) for a slug.
 * @param {string} slug
 * @param {string} [to]
 * @returns {Promise<any>} the `data` object from the envelope
 */
export async function getHome(slug, to = '') {
  const query = to ? `?to=${encodeURIComponent(to)}` : ''
  const payload = await request(`/v1/service/menu/getHome/${encodeURIComponent(slug)}${query}`)
  return payload?.data ?? null
}

/**
 * Submit an RSVP.
 * @param {string} slug
 * @param {{ guest_name: string, phone: string, attendance_status: string, guest_count: number }} body
 * @returns {Promise<any>}
 */
export async function submitRsvp(slug, body) {
  return request(`/v1/service/menu/hadir2/${encodeURIComponent(slug)}`, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

/**
 * Submit a wish / ucapan.
 * @param {string} slug
 * @param {{ guest_name: string, message: string }} body
 * @returns {Promise<any>}
 */
export async function submitUcapan(slug, body) {
  return request(`/v1/service/menu/ucapan/${encodeURIComponent(slug)}`, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}
