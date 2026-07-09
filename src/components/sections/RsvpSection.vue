<template>
  <section
    ref="rootRef"
    class="inv-section invitation-section invitation-section--rsvp reveal-on-scroll"
    :class="{ 'in-view': inView }"
    data-section="rsvp"
  >
    <!-- rsvp-header.png — cropped from rsvp-decor.png: arch + roses + heading + description only -->
    <img class="figma-asset rsvp-header" src="../../assets/figma/rsvp-header.png" alt="" />
    <form class="rsvp-form" @submit.prevent="submit">
      <label class="form-label" for="rsvp-name">Nama:</label>
      <input id="rsvp-name" v-model="name" class="visual-input rsvp-name" type="text" />
      <label class="form-label" for="rsvp-phone">No Hp:</label>
      <input id="rsvp-phone" v-model="phone" class="visual-input rsvp-phone" type="tel" />
      <span class="form-label rsvp-attendance-label">Kehadiran</span>
      <div class="rsvp-attendance-group" role="radiogroup" aria-label="Kehadiran">
        <label class="rsvp-attendance-option">
          <input v-model="attendance" type="radio" name="rsvp-attendance" value="hadir" />
          <span>Hadir</span>
        </label>
        <label class="rsvp-attendance-option">
          <input v-model="attendance" type="radio" name="rsvp-attendance" value="tidak_hadir" />
          <span>Tidak Hadir</span>
        </label>
      </div>
      <label class="form-label" for="rsvp-count">Jumlah Tamu:</label>
      <input id="rsvp-count" v-model.number="guestCount" class="visual-input rsvp-count" type="number" min="1" />
      <p v-if="feedback" class="rsvp-feedback" :class="{ 'is-error': isError }">{{ feedback }}</p>
      <button class="decor-button send-button" type="submit" :disabled="submitting">
        {{ submitting ? 'Mengirim...' : 'Send' }}
      </button>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useScrollReveal } from '../../composables/useScrollReveal'
import { useWedding } from '../../composables/useWedding'

const { rootRef, inView } = useScrollReveal()
// guestName is shared with the Wishes form so the name is only entered once.
const { sendRsvp, guestName: name } = useWedding()

const phone = ref('')
const attendance = ref('hadir')
const guestCount = ref(1)
const submitting = ref(false)
const feedback = ref('')
const isError = ref(false)

async function submit() {
  if (!name.value.trim()) {
    feedback.value = 'Nama wajib diisi.'
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
      count: guestCount.value,
    })
    feedback.value = 'Terima kasih, konfirmasi kehadiran terkirim.'
    isError.value = false
  } catch (err) {
    feedback.value = err instanceof Error ? err.message : 'Gagal mengirim RSVP.'
    isError.value = true
  } finally {
    submitting.value = false
  }
}
</script>
