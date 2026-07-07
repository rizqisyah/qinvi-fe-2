<template>
  <div
    class="inv-section invitation-cover"
    :class="{ 'is-ready': isReady }"
    data-section="cover"
  >
    <img class="cover-item cover-arch" src="../../assets/figma/hero-arch.png" alt="" />
    <img class="cover-item cover-monogram" src="../../assets/figma/hero-top-ornament.png" alt="" />

    <img class="cover-item cover-foliage-left" src="../../assets/figma/quran-foliage-left-back.png" alt="" />
    <img class="cover-item cover-foliage-right" src="../../assets/figma/quran-foliage-right-back.png" alt="" />
    <img class="cover-item cover-bouquet-left" src="../../assets/figma/quran-flower-left.png" alt="" />
    <img class="cover-item cover-bouquet-right" src="../../assets/figma/quran-flower-right.png" alt="" />

    <img class="cover-item cover-pine-left" src="../../assets/figma/hero-flower-left.png" alt="" />
    <img class="cover-item cover-pine-right" src="../../assets/figma/hero-flower-right.png" alt="" />
    <img class="cover-item cover-side-left" src="../../assets/figma/hero-side-flower-left.png" alt="" />
    <img class="cover-item cover-side-right" src="../../assets/figma/hero-side-flower-right.png" alt="" />
    <img class="cover-item cover-petal-left" src="../../assets/figma/hero-small-flower-left.png" alt="" />
    <img class="cover-item cover-petal-right" src="../../assets/figma/hero-small-flower-right.png" alt="" />
    <img class="cover-item cover-vine-left" src="../../assets/figma/hero-leaf-left.png" alt="" />
    <img class="cover-item cover-vine-right" src="../../assets/figma/hero-leaf-right.png" alt="" />
    <img class="cover-item cover-vine-left-back" src="../../assets/figma/hero-leaf-left-back.png" alt="" />
    <img class="cover-item cover-vine-right-back" src="../../assets/figma/hero-leaf-right-back.png" alt="" />

    <div class="cover-lawn"></div>

    <div class="cover-title">
      <p class="cover-title-label">The Wedding Of</p>
      <p class="cover-couple-names">Antonio &amp; Ayu</p>
    </div>

    <div class="cover-guest">
      <p class="cover-guest-label">Dear Mr / Mrs / Ms</p>
      <p class="cover-guest-name">{{ guestName }}</p>
    </div>

    <button class="cover-open-button" type="button" @click="$emit('open')">
      Buka Undangan
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

defineEmits(['open'])

const guestName = ref('Bapak/Ibu/Saudara/i')
const isReady = ref(false)

onMounted(async () => {
  const guest = new URLSearchParams(window.location.search).get('to')
  if (guest) {
    guestName.value = guest
  }
  await nextTick()
  isReady.value = true
})
</script>
