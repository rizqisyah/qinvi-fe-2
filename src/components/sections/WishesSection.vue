<template>
  <section class="inv-section invitation-section invitation-section--wishes" data-section="wishes">
    <div class="wishes-card">
      <h2 class="script-heading">Wedding Wish</h2>
      <p class="text-body wishes-intro">Silakan kirimkan doa dan ucapan yang tulus untuk kami:</p>
      
      <form class="wishes-form" @submit.prevent="submit">
        <label class="form-label" for="wish-name">Nama:<span class="required-marker">*</span></label>
        <input id="wish-name" v-model="name" class="visual-input wishes-name" type="text" placeholder="Nama Anda" required />
        
        <p class="wishes-prompt">Kirimkan doa dan ucapan Anda:</p>
        <textarea id="wish-message" v-model="message" class="visual-input wishes-message" placeholder="Tulis doa dan ucapan Anda..." required></textarea>
        
        <p v-if="feedback" class="wishes-feedback" :class="{ 'is-error': isError }">{{ feedback }}</p>
        <button class="decor-button confirm-button" type="submit" :disabled="submitting">
          {{ submitting ? 'Mengirim...' : 'Kirim Ucapan' }}
        </button>
      </form>

      <div class="wishes-list">
        <div v-for="wish in wishes" :key="wish.id" class="wish-item">
          <p class="wish-author">{{ wish.guest_name }}</p>
          <p class="wish-time">{{ relativeTimeId(wish.created_at) }}</p>
          <p class="wish-text">{{ wish.message }}</p>
          <hr class="wish-divider" />
        </div>
      </div>
    </div>

    <!-- Success Modal Popup (same as fe-clevert-ivana) -->
    <div
      v-if="showSuccessModal"
      class="fixed-modal-overlay"
    >
      <div class="success-modal-card">
        <div class="success-modal-icon-wrapper">
          <svg
            class="success-modal-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 class="success-modal-title">Berhasil!</h3>
        <p class="success-modal-desc">Doa dan ucapan Anda berhasil dikirim.</p>
        <button
          @click="showSuccessModal = false"
          class="decor-button success-modal-close-btn"
        >
          Tutup
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useWedding } from '../../composables/useWedding'
import { relativeTimeId } from '../../lib/format'

// guestName is shared with the RSVP form so the name is only entered once.
const { ucapan, sendUcapan, guestName: name } = useWedding()

const FALLBACK = [
  { id: 'f1', guest_name: 'Anggun', created_at: null, message: 'Happy wedding 💐 Semoga keluarga kecil kalian senantiasa diberkahi kebahagiaan, kecukupan, dan kesehatan ✨ Selamat beribadah bersama sampai jannah ya 🙏' },
  { id: 'f2', guest_name: 'Amri', created_at: null, message: 'Happy wedding yaaa, semoga samawa, bahagia dunia akhirat ❤️' },
  { id: 'f3', guest_name: 'Amanda', created_at: null, message: 'Alhamdulillah, terharu banget, samawa yak' },
  { id: 'f4', guest_name: 'Gilang', created_at: null, message: 'Happy wedding broo...' },
]

const wishes = computed(() => (ucapan.value.length ? ucapan.value : FALLBACK))

const message = ref('')
const submitting = ref(false)
const showSuccessModal = ref(false)
const feedback = ref('')
const isError = ref(false)

async function submit() {
  if (!name.value.trim() || !message.value.trim()) {
    feedback.value = 'Nama dan ucapan wajib diisi.'
    isError.value = true
    return
  }

  submitting.value = true
  feedback.value = ''
  try {
    await sendUcapan({ name: name.value.trim(), message: message.value.trim() })
    showSuccessModal.value = true
    feedback.value = ''
    isError.value = false
    message.value = ''
  } catch (err) {
    feedback.value = err instanceof Error ? err.message : 'Gagal mengirim ucapan.'
    isError.value = true
  } finally {
    submitting.value = false
  }
}
</script>
