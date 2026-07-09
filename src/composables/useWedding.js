import { reactive, ref, computed, readonly } from 'vue'
import { getHome, submitRsvp, submitUcapan, resolveSlug } from '../lib/api'

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
      state.data = await getHome(state.slug)
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

// Theme has two layers: theme_config (theme defaults) and theme_override
// (per-client customization). Overrides win, then config, then the wedding row.
const themeConfig = computed(() => theme.value?.theme_config ?? null)
const themeOverride = computed(() => theme.value?.theme_override ?? null)

const logoUrl = computed(
  () =>
    themeOverride.value?.images?.logo_mempelai ||
    themeConfig.value?.images?.logo_mempelai ||
    wedding.value?.image_logo ||
    ''
)
const hashtagUrl = computed(() => themeOverride.value?.words?.hashtag || '')

// --- Actions ---

async function sendRsvp({ name, phone, attendance, count }) {
  return submitRsvp(state.slug, {
    guest_name: name,
    phone,
    attendance_status: attendance,
    guest_count: Number(count) || 1,
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
    logoUrl,
    hashtagUrl,
    // actions
    sendRsvp,
    sendUcapan,
  }
}
