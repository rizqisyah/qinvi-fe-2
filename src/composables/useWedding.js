import { reactive, computed, readonly } from 'vue'
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
  // Optimistically prepend so the wishes list reflects the new entry.
  if (content.value && Array.isArray(content.value.ucapan)) {
    content.value.ucapan.unshift({
      id: res?.data?.id ?? `local-${content.value.ucapan.length}`,
      guest_name: name,
      message,
      created_at: new Date().toISOString(),
    })
  }
  return res
}

export function useWedding() {
  return {
    state: readonly(state),
    load,
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
    // actions
    sendRsvp,
    sendUcapan,
  }
}
