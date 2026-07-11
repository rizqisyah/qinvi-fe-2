<template>
  <section
    ref="rootRef"
    class="invitation-section invitation-section--gift reveal-on-scroll"
    :class="{ 'in-view': inView }"
    data-section="gift"
    :style="sectionStyle"
  >
    <!-- Figma composite: card + edge ornaments + separator -->
    <img class="gift-decor" :src="img('gift-decor.png')" alt="" />

    <!-- Dynamic white card background extension to keep bank accounts inside the card -->
    <div class="gift-card-extension" :style="extensionStyle"></div>

    <!-- Title "Wedding Gift" below divider -->
    <h2 class="script-heading gift-title">Wedding Gift</h2>

    <!-- Description -->
    <p class="text-body gift-description">Bagi yang ingin memberikan tanda kasih, dapat mengirimkan melalui fitur di bawah ini:</p>

    <div
      v-for="(acct, i) in accounts"
      :key="acct.id"
      class="gift-account"
      :style="{ top: ACCOUNT_TOP + i * ACCOUNT_HEIGHT + 'px' }"
    >
      <!-- BCA has a real logo asset; other banks show their name as text. -->
      <img v-if="isBca(acct.bank_name)" class="gift-bca-logo" :src="img('gift-bca-logo.png')" alt="BCA" />
      <p v-else class="gift-bank-name">{{ acct.bank_name }}</p>

      <p class="gift-rekening">No. Rekening : {{ acct.account_number }}</p>
      <p class="gift-an">A/n {{ acct.account_name }}</p>

      <button class="decor-button copy-button" type="button" @click="copy(acct)">
        {{ copiedId === acct.id ? 'Tersalin!' : 'Copy text' }}
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useScrollReveal } from '../../composables/useScrollReveal'
import { useWedding } from '../../composables/useWedding'

const { rootRef, inView } = useScrollReveal()
const { rekening } = useWedding()

// First account sits at the original Figma slot; extra accounts stack below.
const ACCOUNT_TOP = 244
const ACCOUNT_HEIGHT = 122

const FALLBACK = [
  { id: 'fallback', bank_name: 'BCA', account_number: '8715154435', account_name: 'Muhammad Arif' },
]

const accounts = computed(() => (rekening.value.length ? rekening.value : FALLBACK))

const sectionStyle = computed(() => {
  const N = accounts.value.length
  if (N <= 3) return {}
  const height = 704 + (N - 3) * ACCOUNT_HEIGHT
  return { height: `${height}px` }
})

const extensionStyle = computed(() => {
  const N = accounts.value.length
  if (N <= 3) return { display: 'none' }
  const height = 210 + (N - 3) * ACCOUNT_HEIGHT
  return {
    top: '400px',
    height: `${height}px`
  }
})

const copiedId = ref(null)

function isBca(name) {
  return (name || '').trim().toUpperCase() === 'BCA'
}

async function copy(acct) {
  try {
    await navigator.clipboard.writeText(acct.account_number)
    copiedId.value = acct.id
    setTimeout(() => {
      if (copiedId.value === acct.id) copiedId.value = null
    }, 2000)
  } catch {
    // Clipboard blocked (insecure context / permissions); silently ignore.
  }
}

const img = (name) => new URL(`../../assets/figma/${name}`, import.meta.url).href
</script>
