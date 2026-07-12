<template>
  <section
    ref="rootRef"
    class="inv-section invitation-section invitation-section--rsvp reveal-on-scroll"
    :class="{ 'in-view': inView }"
    data-section="rsvp"
  >
    <!-- The form wrapper itself has the arch shape and gold background -->
    <div class="rsvp-form">
      <!-- Decorative flower assets -->
      <img class="rsvp-card-flower rsvp-card-flower--left" src="../../assets/figma/events-flower1-rsvp-left.png" alt="" />
      <img class="rsvp-card-flower rsvp-card-flower--right" src="../../assets/figma/events-flower1-rsvp-right.png" alt="" />
      
      <!-- Live HTML Header -->
      <h2 class="rsvp-title">Rsvp</h2>
      <p class="rsvp-desc">
        {{
          isEnglish
            ? 'Your presence will be a great honor for us and our family. Please confirm your attendance through the reservation form below:'
            : 'Kehadiran Bapak/Ibu/Saudara/i akan menjadi kehormatan besar bagi kami dan keluarga. Mohon konfirmasi kehadiran Anda melalui formulir reservasi di bawah:'
        }}
      </p>

      <!-- Already RSVP'd Success Message -->
      <div v-if="alreadyRsvp" class="rsvp-success-message">
        <div class="rsvp-success-icon-wrapper">
          <svg class="rsvp-success-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p class="rsvp-success-title">{{ isEnglish ? 'Thank You!' : 'Terima Kasih!' }}</p>
        <p class="rsvp-success-desc">{{ isEnglish ? 'You have confirmed your attendance for this invitation.' : 'Anda telah melakukan konfirmasi kehadiran untuk undangan ini.' }}</p>
      </div>

      <!-- RSVP Form Fields -->
      <form v-else @submit.prevent="submit">
        <label class="form-label" for="rsvp-name">{{ isEnglish ? 'Name:' : 'Nama:' }}</label>
        <input id="rsvp-name" v-model="name" class="visual-input rsvp-name" type="text" :placeholder="isEnglish ? 'Your Name' : 'Nama Anda'" required />
        
        <label class="form-label" for="rsvp-phone">{{ isEnglish ? 'Phone Number:' : 'No Hp:' }}</label>
        <input id="rsvp-phone" v-model="phone" class="visual-input rsvp-phone" type="tel" :placeholder="isEnglish ? 'Phone Number' : 'Nomor Handphone'" required />
        
        <span class="form-label rsvp-attendance-label">{{ isEnglish ? 'Attendance' : 'Kehadiran' }}</span>
        <div class="rsvp-attendance-group" role="radiogroup" :aria-label="isEnglish ? 'Attendance' : 'Kehadiran'">
          <label class="rsvp-attendance-option">
            <input v-model="attendance" type="radio" name="rsvp-attendance" value="hadir" required />
            <span>{{ isEnglish ? 'Attending' : 'Hadir' }}</span>
          </label>
          <label class="rsvp-attendance-option">
            <input v-model="attendance" type="radio" name="rsvp-attendance" value="tidak_hadir" required />
            <span>{{ isEnglish ? 'Not Attending' : 'Tidak Hadir' }}</span>
          </label>
        </div>
        
        <template v-if="isAttending">
          <label class="form-label" for="rsvp-count">{{ isEnglish ? 'Number of Guests:' : 'Jumlah Tamu:' }}</label>
          <input id="rsvp-count" v-model.number="guestCount" class="visual-input rsvp-count" type="number" min="1" :placeholder="isEnglish ? 'Number of Guests' : 'Jumlah Tamu'" required />
        </template>
        
        <p v-if="feedback" class="rsvp-feedback" :class="{ 'is-error': isError }">{{ feedback }}</p>
        <button class="decor-button send-button" type="submit" :disabled="submitting">
          {{ submitting ? (isEnglish ? 'Sending...' : 'Mengirim...') : 'Send' }}
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useScrollReveal } from '../../composables/useScrollReveal'
import { useWedding } from '../../composables/useWedding'

const { rootRef, inView } = useScrollReveal()
const { sendRsvp, guestName: name, guest, isEnglish } = useWedding()

const phone = ref('')
const attendance = ref('hadir')
const guestCount = ref(1)

const isAttending = computed(() => attendance.value === 'hadir')

watch(isAttending, (attending) => {
  guestCount.value = attending ? 1 : 0
})

const slug = window.location.pathname.split('/').filter(Boolean).pop() || 'indah-budi'
const toParam = new URLSearchParams(window.location.search).get('to') || 'general'
const storageKey = `rsvp_${slug}_${toParam}`

const alreadyRsvp = ref(false)
const submitting = ref(false)
const feedback = ref('')
const isError = ref(false)

onMounted(() => {
  let localSaved = false
  try {
    localSaved = localStorage.getItem(storageKey) === 'true'
  } catch (e) {
    console.warn('localStorage access blocked:', e)
  }
  alreadyRsvp.value = localSaved || guest.value?.has_rsvp === true
})

watch(
  guest,
  (g) => {
    if (g?.has_rsvp) {
      alreadyRsvp.value = true
    }
  },
  { immediate: true }
)

async function submit() {
  if (!name.value.trim()) {
    feedback.value = isEnglish.value ? 'Name is required.' : 'Nama wajib diisi.'
    isError.value = true
    return
  }

  submitting.value = true
  feedback.value = ''
  try {
    await sendRsvp({
      name: name.value.trim(),
      phone: phone.value.trim(),
      attendance: attendance.value,
      count: isAttending.value ? guestCount.value : 0,
    })
    try {
      localStorage.setItem(storageKey, 'true')
    } catch (e) {
      console.warn('localStorage access blocked:', e)
    }
    alreadyRsvp.value = true
    feedback.value = ''
    isError.value = false
  } catch (err) {
    feedback.value = err instanceof Error ? err.message : (isEnglish.value ? 'Failed to submit RSVP.' : 'Gagal mengirim RSVP.')
    isError.value = true
  } finally {
    submitting.value = false
  }
}
</script>
