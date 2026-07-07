<template>
  <div class="cover-root" :class="{ 'is-ready': isReady }" data-section="cover">
    <!-- 375x725 artwork stage, scaled to cover the viewport height. -->
    <div class="cover-stage" :style="{ '--cover-scale': coverScale }">
      <!-- Full garden-arch artwork, exported vector-native from Figma (PDF -> SVG)
           so every layer is uncropped and pixel-accurate. Text + button are kept
           out of the export and overlaid below as live HTML. -->
      <img class="cover-art" src="../../assets/figma/cover-art.svg" alt="" />

      <!-- Real text + button (not baked into the artwork) -->
      <p class="cover-text cover-wedding-of">The Wedding Of</p>
      <p class="cover-text cover-couple">Antonio &amp; Ayu</p>

      <p class="cover-text cover-dear">Dear Mr / Mrs / Ms</p>
      <p class="cover-text cover-guest">{{ guestName }}</p>

      <button class="cover-open-button" type="button" @click="$emit('open')">
        Open Invitation
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

defineEmits(['open'])

const STAGE_HEIGHT = 725

const guestName = ref('Bapak/Ibu/Saudara/i')
const isReady = ref(false)
const coverScale = ref(1)

// Scale the fixed 375x725 artwork to cover the viewport height (never below 1).
function updateScale() {
  coverScale.value = Math.max(1, window.innerHeight / STAGE_HEIGHT)
}

onMounted(async () => {
  const guest = new URLSearchParams(window.location.search).get('to')
  if (guest) {
    guestName.value = guest
  }
  updateScale()
  window.addEventListener('resize', updateScale)
  await nextTick()
  isReady.value = true
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScale)
})
</script>
