<template>
  <div
    ref="coverRoot"
    class="cover-root"
    :class="{ 'is-ready': isReady }"
    data-section="cover"
  >
    <!-- 375x725 artwork stage, scaled to cover the viewport height. -->
    <div class="cover-stage" :style="{ '--cover-scale': coverScale }">
      <!-- Every flower/leaf is its own full-frame layer, exported at its true
           Figma transform, so each blooms and sways on its own. Back flowers
           tuck behind the grass hill; foreground flowers sit in front. -->
      <div class="cover-plane cover-plane-arch" style="z-index: 1">
        <img class="cover-layer enter-arch" src="../../assets/figma/cover-arch.webp" alt="" />
      </div>

      <!-- back flowers + leaves (z 2-20) -->
      <div class="cover-plane" style="z-index: 2"><img class="cover-fl cover-n287" :style="staggerDelay(0)" src="../../assets/figma/cover-n287.webp" alt="" /></div>
      <div class="cover-plane" style="z-index: 3"><img class="cover-fl cover-n288" :style="staggerDelay(1)" src="../../assets/figma/cover-n288.webp" alt="" /></div>
      <div class="cover-plane" style="z-index: 4"><img class="cover-fl cover-n304" :style="staggerDelay(2)" src="../../assets/figma/cover-n304.webp" alt="" /></div>
      <div class="cover-plane" style="z-index: 5"><img class="cover-fl cover-n306" :style="staggerDelay(3)" src="../../assets/figma/cover-n306.webp" alt="" /></div>
      <div class="cover-plane" style="z-index: 6"><img class="cover-fl cover-n259" :style="staggerDelay(4)" src="../../assets/figma/cover-n259.webp" alt="" /></div>
      <div class="cover-plane" style="z-index: 7"><img class="cover-fl cover-n263" :style="staggerDelay(5)" src="../../assets/figma/cover-n263.webp" alt="" /></div>
      <div class="cover-plane" style="z-index: 8"><img class="cover-fl cover-n260" :style="staggerDelay(6)" src="../../assets/figma/cover-n260.webp" alt="" /></div>
      <div class="cover-plane" style="z-index: 9"><img class="cover-fl cover-n265" :style="staggerDelay(7)" src="../../assets/figma/cover-n265.webp" alt="" /></div>
      <div class="cover-plane" style="z-index: 10"><img class="cover-fl cover-n266" :style="staggerDelay(8)" src="../../assets/figma/cover-n266.webp" alt="" /></div>
      <div class="cover-plane" style="z-index: 11"><img class="cover-fl cover-n295" :style="staggerDelay(9)" src="../../assets/figma/cover-n295.webp" alt="" /></div>
      <div class="cover-plane" style="z-index: 12"><img class="cover-fl cover-n268" :style="staggerDelay(10)" src="../../assets/figma/cover-n268.webp" alt="" /></div>
      <div class="cover-plane" style="z-index: 13"><img class="cover-fl cover-n273" :style="staggerDelay(11)" src="../../assets/figma/cover-n273.webp" alt="" /></div>
      <div class="cover-plane" style="z-index: 14"><img class="cover-fl cover-n308" :style="staggerDelay(12)" src="../../assets/figma/cover-n308.webp" alt="" /></div>
      <div class="cover-plane" style="z-index: 15"><img class="cover-fl cover-n310" :style="staggerDelay(13)" src="../../assets/figma/cover-n310.webp" alt="" /></div>
      <div class="cover-plane" style="z-index: 16"><img class="cover-fl cover-n312" :style="staggerDelay(14)" src="../../assets/figma/cover-n312.webp" alt="" /></div>
      <div class="cover-plane" style="z-index: 17"><img class="cover-fl cover-n309" :style="staggerDelay(15)" src="../../assets/figma/cover-n309.webp" alt="" /></div>
      <div class="cover-plane" style="z-index: 18"><img class="cover-fl cover-n274" :style="staggerDelay(16)" src="../../assets/figma/cover-n274.webp" alt="" /></div>
      <div class="cover-plane" style="z-index: 19"><img class="cover-fl cover-n275" :style="staggerDelay(17)" src="../../assets/figma/cover-n275.webp" alt="" /></div>
      <div class="cover-plane" style="z-index: 20"><img class="cover-fl cover-n277" :style="staggerDelay(18)" src="../../assets/figma/cover-n277.webp" alt="" /></div>

      <!-- grass hill (z 21): back flowers behind, front flowers ahead -->
      <div class="cover-plane cover-plane-hill" style="z-index: 21">
        <img class="cover-layer enter-hill" src="../../assets/figma/cover-hill.webp" alt="" />
      </div>

      <!-- foreground flowers (z 22-32) -->
      <div class="cover-plane" style="z-index: 22"><img class="cover-fl cover-n298" :style="staggerDelay(19)" src="../../assets/figma/cover-n298.webp" alt="" /></div>
      <div class="cover-plane" style="z-index: 23"><img class="cover-fl cover-n294" :style="staggerDelay(20)" src="../../assets/figma/cover-n294.webp" alt="" /></div>
      <div class="cover-plane" style="z-index: 24"><img class="cover-fl cover-n293" :style="staggerDelay(21)" src="../../assets/figma/cover-n293.webp" alt="" /></div>
      <div class="cover-plane" style="z-index: 25"><img class="cover-fl cover-n297" :style="staggerDelay(22)" src="../../assets/figma/cover-n297.webp" alt="" /></div>
      <div class="cover-plane" style="z-index: 26"><img class="cover-fl cover-n292" :style="staggerDelay(23)" src="../../assets/figma/cover-n292.webp" alt="" /></div>
      <div class="cover-plane" style="z-index: 27"><img class="cover-fl cover-n278" :style="staggerDelay(24)" src="../../assets/figma/cover-n278.webp" alt="" /></div>
      <div class="cover-plane" style="z-index: 28"><img class="cover-fl cover-n280" :style="staggerDelay(25)" src="../../assets/figma/cover-n280.webp" alt="" /></div>
      <div class="cover-plane" style="z-index: 29"><img class="cover-fl cover-n289" :style="staggerDelay(26)" src="../../assets/figma/cover-n289.webp" alt="" /></div>
      <div class="cover-plane" style="z-index: 30"><img class="cover-fl cover-n290" :style="staggerDelay(27)" src="../../assets/figma/cover-n290.webp" alt="" /></div>
      <div class="cover-plane" style="z-index: 31"><img class="cover-fl cover-n291" :style="staggerDelay(28)" src="../../assets/figma/cover-n291.webp" alt="" /></div>
      <div class="cover-plane" style="z-index: 32"><img class="cover-fl cover-n296" :style="staggerDelay(29)" src="../../assets/figma/cover-n296.webp" alt="" /></div>

      <!-- monogram (z 33) — the local artwork bakes the monogram into a
           full-frame layer, so the API logo is placed as its own element
           pinned to the same box instead of swapping the layer's src. -->
      <div class="cover-plane cover-plane-mono" style="z-index: 33">
        <img
          v-if="logoUrl"
          class="cover-logo breathe-mono enter-mono"
          :src="logoUrl"
          alt=""
        />
        <img v-else class="cover-layer breathe-mono enter-mono" src="../../assets/figma/cover-monogram.webp" alt="" />
      </div>

      <!-- Real text + button (not baked into the artwork) -->
      <p class="cover-text cover-wedding-of enter-text" style="--enter-delay: 0.9s">The Wedding Of</p>
      <p class="cover-text cover-couple enter-text" style="--enter-delay: 1.05s">{{ coupleName }}</p>

      <p class="cover-text cover-dear enter-text" style="--enter-delay: 1.2s">Dear Mr / Mrs / Ms</p>
      <p class="cover-text cover-guest enter-text" style="--enter-delay: 1.35s">{{ guestName }}</p>

      <button
        class="cover-open-button enter-text"
        style="--enter-delay: 1.5s"
        type="button"
        @click="$emit('open')"
      >
        Open Invitation
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useWedding } from '../../composables/useWedding'

defineEmits(['open'])

const STAGE_HEIGHT = 725

const { coupleNickname, guest, logoUrl } = useWedding()

const coupleName = computed(() => coupleNickname.value || 'Antonio & Ayu')

const guestName = ref('Bapak/Ibu/Saudara/i')
const coverRoot = ref(null)
const isReady = ref(false)
const coverScale = ref(1)

// Scale the stage to fill the viewport. On wider screens the stage
// exceeds the width and flowers at the edges are clipped at the screen
// bounds — the canvas (100vw, overflow:hidden) handles the clip.
function updateScale() {
  const height = coverRoot.value?.clientHeight || window.innerHeight
  const width = coverRoot.value?.clientWidth || document.documentElement.clientWidth
  coverScale.value = Math.max(height / STAGE_HEIGHT, width / 375)
}

function staggerDelay(index) {
  // Stagger each plant by 55ms, starting after 0.2s
  return { transitionDelay: `${0.2 + index * 0.055}s` }
}

onMounted(async () => {
  // Priority: personalised `?to=` link, then an API-resolved guest, else default.
  const toParam = new URLSearchParams(window.location.search).get('to')
  if (toParam) {
    guestName.value = toParam
  } else if (guest.value?.guest_name) {
    guestName.value = guest.value.guest_name
  }
  
  // Wait for DOM to paint so clientHeight is fully populated
  await nextTick()
  updateScale()
  
  // Backup run to be absolutely certain layout has settled
  setTimeout(updateScale, 150)
  
  window.addEventListener('resize', updateScale)
  requestAnimationFrame(() => {
    isReady.value = true
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScale)
})
</script>
