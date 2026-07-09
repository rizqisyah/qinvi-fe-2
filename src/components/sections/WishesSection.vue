<template>
  <section class="inv-section invitation-section invitation-section--wishes" data-section="wishes">
    <div class="wishes-card">
      <h2 class="script-heading">Wedding Wish</h2>
      <p class="text-body wishes-intro">Silakan kirimkan doa dan ucapan yang tulus untuk kami:</p>
      <form class="wishes-form" @submit.prevent="submit">
        <label class="form-label" for="wish-name">Nama:<span class="required-marker">*</span></label>
        <input id="wish-name" v-model="name" class="visual-input wishes-name" type="text" />
        <p class="wishes-prompt">Sampaikan ucapan selamat untuk<br />pernikahan kami:</p>
        <textarea id="wish-message" v-model="message" class="visual-input wishes-message"></textarea>
        <p v-if="feedback" class="wishes-feedback" :class="{ 'is-error': isError }">{{ feedback }}</p>
        <button class="decor-button confirm-button" type="submit" :disabled="submitting">
          {{ submitting ? 'Mengirim...' : 'Kirim Konfirmasi' }}
        </button>
      </form>
      <div class="wishes-list">
        <div v-for="wish in wishes" :key="wish.id" class="wish-item">
          <p class="wish-author">{{ wish.guest_name }}</p>
          <p class="wish-time">{{ relativeTimeId(wish.created_at) }}</p>
          <p class="wish-text">{{ wish.message }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useWedding } from '../../composables/useWedding'
import { relativeTimeId } from '../../lib/format'

const { ucapan, sendUcapan } = useWedding()

const FALLBACK = [
  { id: 'f1', guest_name: 'Anggun', created_at: null, message: 'Happy wedding 💐 Semoga keluarga kecil kalian senantiasa diberkahi kebahagiaan, kecukupan, dan kesehatan ✨ Selamat beribadah bersama sampai jannah ya 🙏🏻' },
  { id: 'f2', guest_name: 'Amri', created_at: null, message: 'Happy wedding yaaa, semoga samawa, bahagia dunia akhirat ❤️' },
  { id: 'f3', guest_name: 'Amanda', created_at: null, message: 'Alhamdulillah, terharu banget, samawa yak' },
  { id: 'f4', guest_name: 'Gilang', created_at: null, message: 'Happy wedding broo...' },
]

const wishes = computed(() => (ucapan.value.length ? ucapan.value : FALLBACK))

const name = ref('')
const message = ref('')
const submitting = ref(false)
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
    feedback.value = 'Terima kasih atas ucapannya!'
    isError.value = false
    name.value = ''
    message.value = ''
  } catch (err) {
    feedback.value = err instanceof Error ? err.message : 'Gagal mengirim ucapan.'
    isError.value = true
  } finally {
    submitting.value = false
  }
}
</script>
