import { reactive, ref, computed, readonly } from 'vue'
import { getHome, submitRsvp, submitUcapan, resolveSlug } from '../lib/api'
import { sizedImage } from '../lib/image'

// Module-level singleton so any section can read the payload without prop
// drilling through the deep component tree.
const state = reactive({
  slug: resolveSlug(),
  loading: false,
  loaded: false,
  error: null,
  data: null,
})

// Shared guest name so the RSVP and Wishes forms don't ask for it twice.
const guestName = ref('')

let inflight = null

async function load() {
  if (state.loaded || inflight) return inflight
  state.loading = true
  state.error = null

  inflight = (async () => {
    try {
      const toParam = new URLSearchParams(window.location.search).get('to') || ''
      state.data = await getHome(state.slug, toParam)
      if (state.data?.guest?.guest_name) {
        guestName.value = state.data.guest.guest_name
      } else if (toParam) {
        guestName.value = toParam
      }
      // Apply theme styles dynamically
      applyTheme(state.data?.theme, state.data?.wedding)
      state.loaded = true
    } catch (err) {
      state.error = err instanceof Error ? err.message : 'Gagal memuat undangan'
    } finally {
      state.loading = false
      inflight = null
    }
  })()

  return inflight
}

/**
 * Dynamically apply theme color and font configuration variables to the document root.
 */
function applyTheme(themeData, weddingData) {
  if (typeof document === 'undefined') return

  const root = document.documentElement
  const cfg = themeData?.theme_config
  let override = {}
  try {
    override = typeof weddingData?.theme_override === 'string'
      ? JSON.parse(weddingData.theme_override)
      : weddingData?.theme_override || {}
  } catch (e) {
    override = {}
  }

  // Colors mapping: ONLY apply if explicitly customized in theme_override
  const colors = override.colors || {}

  if (colors.bg_body) {
    root.style.setProperty('--cream-bg', colors.bg_body)
  } else {
    root.style.removeProperty('--cream-bg')
  }

  if (colors.primary) {
    root.style.setProperty('--brown-main', colors.primary)
    root.style.setProperty('--gold-rsvp', colors.primary)
  } else {
    root.style.removeProperty('--brown-main')
    root.style.removeProperty('--gold-rsvp')
  }

  if (colors.text_body) {
    root.style.setProperty('--brown-dark', colors.text_body)
  } else {
    root.style.removeProperty('--brown-dark')
  }

  if (colors.accent) {
    root.style.setProperty('--red-deep', colors.accent)
  } else {
    root.style.removeProperty('--red-deep')
  }

  if (colors.secondary) {
    root.style.setProperty('--gold-pale', colors.secondary)
  } else {
    root.style.removeProperty('--gold-pale')
  }

  if (colors.text_dark) {
    root.style.setProperty('--footer-brown', colors.text_dark)
  } else {
    root.style.removeProperty('--footer-brown')
  }

  if (colors.text_light) {
    root.style.setProperty('--white-soft', colors.text_light)
  } else {
    root.style.removeProperty('--white-soft')
  }

  // Fonts mapping: ONLY apply if explicitly customized in theme_override
  const fonts = override.fonts || {}

  const cleanFont = (fontStr) => {
    if (!fontStr) return ''
    return fontStr.replace(/''/g, "'").replace(/"/g, "'").replace(/\+/g, ' ')
  }

  if (fonts.accent) {
    root.style.setProperty('--font-script', cleanFont(fonts.accent))
  } else {
    root.style.removeProperty('--font-script')
  }

  if (fonts.script) {
    root.style.setProperty('--font-playball', cleanFont(fonts.script))
  } else {
    root.style.removeProperty('--font-playball')
  }

  if (fonts.body) {
    root.style.setProperty('--font-eb-garamond', cleanFont(fonts.body))
  } else {
    root.style.removeProperty('--font-eb-garamond')
  }

  if (fonts.italic) {
    root.style.setProperty('--font-cormorant', cleanFont(fonts.italic))
  } else {
    root.style.removeProperty('--font-cormorant')
  }

  if (fonts.headline) {
    root.style.setProperty('--font-playfair-sc', cleanFont(fonts.headline))
  } else {
    root.style.removeProperty('--font-playfair-sc')
  }

  // Handle custom fonts injection if any
  if (override.fonts_custom) {
    Object.entries(override.fonts_custom).forEach(([_, val]) => {
      if (val && val.url && val.family) {
        injectCustomFont(val.family, val.url)
      }
    })
  }
}

/**
 * Dynamically inject custom font styles to the document head.
 */
function injectCustomFont(family, url) {
  if (typeof document === 'undefined') return
  const cleanFamily = family.replace(/['"]/g, "").replace(/\+/g, " ").trim()
  const id = `custom-font-${cleanFamily.replace(/\s+/g, "-")}`
  if (document.getElementById(id)) return

  if (url.includes("fonts.googleapis.com")) {
    const link = document.createElement("link")
    link.id = id
    link.rel = "stylesheet"
    link.href = url
    document.head.appendChild(link)
  } else {
    const style = document.createElement("style")
    style.id = id
    style.textContent = `@font-face { font-family: '${cleanFamily}'; src: url('${url}'); font-display: swap; }`
    document.head.appendChild(style)
  }
}

// Listen for live preview messages from the admin dashboard ("Mode Imajinasi")
if (typeof window !== 'undefined') {
  window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'QINVI_PREVIEW_UPDATE') {
      console.log('RECEIVED PREVIEW UPDATE:', event.data)
      const { wedding, theme, refetch } = event.data

      if (wedding) {
        // Parse theme_override if it is a string
        let resolvedWedding = { ...wedding }
        if (typeof resolvedWedding.theme_override === 'string') {
          try {
            resolvedWedding.theme_override = JSON.parse(resolvedWedding.theme_override)
          } catch (e) {
            console.error('Failed to parse theme_override:', e)
          }
        }
        
        state.data = {
          ...state.data,
          wedding: resolvedWedding
        }
      }

      if (theme) {
        state.data = {
          ...state.data,
          theme
        }
      }

      // Re-apply theme styles dynamically
      applyTheme(state.data?.theme, state.data?.wedding)

      if (refetch) {
        // Force refetch from the API to get updated content (pengantin, acara, gallery, etc.)
        state.loaded = false
        load()
      }
    }
  })
}

// --- Derived getters (all null-safe; sections fall back to their static copy) ---

const wedding = computed(() => state.data?.wedding ?? null)
const theme = computed(() => state.data?.theme ?? null)
const guest = computed(() => state.data?.guest ?? null)
const content = computed(() => state.data?.content ?? null)

const pengantin = computed(() => content.value?.pengantin ?? [])
const groom = computed(() => pengantin.value.find((p) => p.type === 'groom') ?? null)
const bride = computed(() => pengantin.value.find((p) => p.type === 'bride') ?? null)

const acara = computed(() => content.value?.acara ?? [])
const gallery = computed(() => content.value?.gallery ?? [])
const rekening = computed(() => content.value?.rekening ?? [])
// Local ref layered over the API list so a fresh submit shows up immediately.
const ucapan = computed(() => content.value?.ucapan ?? [])

const countdownDate = computed(() => wedding.value?.countdown_date ?? null)
const coupleTitle = computed(() => wedding.value?.title ?? null)

// The cover greets the couple by the names they go by, not their full legal
// names; falls back to the wedding title when either nickname is missing.
const coupleNickname = computed(() => {
  const groomNick = groom.value?.nickname?.trim()
  const brideNick = bride.value?.nickname?.trim()
  if (!groomNick || !brideNick) return coupleTitle.value
  return `${groomNick} & ${brideNick}`
})

// Theme has two layers: the theme's own defaults (theme.theme_config) and the
// per-wedding customization (wedding.theme_override). Overrides win.
// `wedding.image_logo` is deliberately not a fallback here — it holds a paper
// texture, not a monogram.
const themeConfig = computed(() => theme.value?.theme_config ?? null)
const themeOverride = computed(() => wedding.value?.theme_override ?? null)

const logoUrl = computed(
  () =>
    themeOverride.value?.images?.logo_mempelai ||
    themeConfig.value?.images?.logo_mempelai ||
    ''
)
const words = computed(() => themeOverride.value?.words ?? null)

const hashtagUrl = computed(() => words.value?.hashtag || '')
// Arabic verse and its translation arrive as one newline-separated string.
const quoteText = computed(() => words.value?.quote_text || '')
const quoteVerse = computed(() => words.value?.quote_verse || '')

// Couple portrait. Widest box it lands in is 375px, so ~3x that covers the
// densest screens; the source upload is several thousand pixels wide.
const SPOUSE_PHOTO_WIDTH = 900
const spousePhoto = computed(() => sizedImage(wedding.value?.image_spouse || '', SPOUSE_PHOTO_WIDTH))

// --- Actions ---

async function sendRsvp({ name, phone, attendance, count }) {
  // A declining guest legitimately sends 0, so an empty field — not a zero —
  // is what falls back to 1.
  const parsed = Number(count)
  return submitRsvp(state.slug, {
    guest_name: name,
    phone,
    attendance_status: attendance,
    guest_count: Number.isFinite(parsed) && parsed >= 0 ? parsed : 1,
  })
}

async function sendUcapan({ name, message }) {
  const res = await submitUcapan(state.slug, { guest_name: name, message })
  if (!content.value) return res

  // The API may reply with the full refreshed list or just the created row;
  // fall back to a hand-built entry so the wishes list updates either way.
  const list = Array.isArray(res) ? res : Array.isArray(res?.data) ? res.data : null
  if (list) {
    content.value.ucapan = list
    return res
  }

  if (!Array.isArray(content.value.ucapan)) content.value.ucapan = []
  const row =
    res?.data && typeof res.data === 'object'
      ? res.data
      : {
        id: `local-${content.value.ucapan.length}`,
        guest_name: name,
        message,
        created_at: new Date().toISOString(),
      }
  content.value.ucapan.unshift(row)
  return res
}

export function useWedding() {
  return {
    state: readonly(state),
    load,
    guestName,
    // getters
    wedding,
    theme,
    guest,
    content,
    pengantin,
    groom,
    bride,
    acara,
    gallery,
    rekening,
    ucapan,
    countdownDate,
    coupleTitle,
    coupleNickname,
    logoUrl,
    hashtagUrl,
    quoteText,
    quoteVerse,
    spousePhoto,
    // actions
    sendRsvp,
    sendUcapan,
  }
}
