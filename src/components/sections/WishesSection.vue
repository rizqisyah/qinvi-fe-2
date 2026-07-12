<template>
  <section class="inv-section invitation-section invitation-section--wishes" data-section="wishes">
    <div class="wishes-card">
      <h2 class="script-heading">Wedding Wish</h2>
      <p class="text-body wishes-intro">
        {{ isEnglish ? 'Please send your sincere wishes and prayers for us:' : 'Silakan kirimkan doa dan ucapan yang tulus untuk kami:' }}
      </p>
      
      <form class="wishes-form" @submit.prevent="submit">
        <label class="form-label" for="wish-name">{{ isEnglish ? 'Name:' : 'Nama:' }}<span class="required-marker">*</span></label>
        <input id="wish-name" v-model="name" class="visual-input wishes-name" type="text" :placeholder="isEnglish ? 'Your Name' : 'Nama Anda'" required />
        
        <p class="wishes-prompt">{{ isEnglish ? 'Send your prayers and wishes:' : 'Kirimkan doa dan ucapan Anda:' }}</p>
        <textarea id="wish-message" v-model="message" class="visual-input wishes-message" :placeholder="isEnglish ? 'Write your prayers and wishes here...' : 'Tulis doa dan ucapan Anda...'" required></textarea>
        
        <p v-if="feedback" class="wishes-feedback" :class="{ 'is-error': isError }">{{ feedback }}</p>
        <button class="decor-button confirm-button" type="submit" :disabled="submitting">
          {{ submitting ? (isEnglish ? 'Sending...' : 'Mengirim...') : (isEnglish ? 'Send Wishes' : 'Kirim Ucapan') }}
        </button>
      </form>

      <div class="wishes-list">
        <div v-for="wish in wishes" :key="wish.id" class="wish-item">
          <p class="wish-author">{{ wish.guest_name }}</p>
          <p class="wish-time">{{ relativeTimeId(wish.created_at, new Date(), isEnglish) }}</p>
          <p class="wish-text">{{ wish.message }}</p>
          <hr class="wish-divider" />
        </div>
      </div>
    </div>

    <!-- Success Modal Popup -->
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
        <h3 class="success-modal-title">{{ isEnglish ? 'Success!' : 'Berhasil!' }}</h3>
        <p class="success-modal-desc">{{ isEnglish ? 'Your prayers and wishes have been successfully sent.' : 'Doa dan ucapan Anda berhasil dikirim.' }}</p>
        <button
          @click="showSuccessModal = false"
          class="decor-button success-modal-close-btn"
        >
          {{ isEnglish ? 'Close' : 'Tutup' }}
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
const { ucapan, sendUcapan, guestName: name, isEnglish } = useWedding()

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
    feedback.value = isEnglish.value ? 'Name and wishes are required.' : 'Nama dan ucapan wajib diisi.'
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
    feedback.value = err instanceof Error ? err.message : (isEnglish.value ? 'Failed to send wishes.' : 'Gagal mengirim ucapan.')
    isError.value = true
  } finally {
    submitting.value = false
  }
}
</script>
