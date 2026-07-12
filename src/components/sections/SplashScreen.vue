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
        <img class="cover-layer enter-arch" :src="archSrc" alt="" decoding="async" fetchpriority="high" />
      </div>

      <!-- back flowers + leaves (z 2-20) -->
      <div class="cover-plane cover-plane-fl" style="z-index: 2" :style="staggerDelay(0)"><img class="cover-fl cover-n287" decoding="async" src="../../assets/figma/cover-n287.webp" alt="" /></div>
      <div class="cover-plane cover-plane-fl" style="z-index: 3" :style="staggerDelay(1)"><img class="cover-fl cover-n288" decoding="async" src="../../assets/figma/cover-n288.webp" alt="" /></div>
      <div class="cover-plane cover-plane-fl" style="z-index: 4" :style="staggerDelay(2)"><img class="cover-fl cover-n304" decoding="async" src="../../assets/figma/cover-n304.webp" alt="" /></div>
      <div class="cover-plane cover-plane-fl" style="z-index: 5" :style="staggerDelay(3)"><img class="cover-fl cover-n306" decoding="async" src="../../assets/figma/cover-n306.webp" alt="" /></div>
      <div class="cover-plane cover-plane-fl" style="z-index: 6" :style="staggerDelay(4)"><img class="cover-fl cover-n259" decoding="async" src="../../assets/figma/cover-n259.webp" alt="" /></div>
      <div class="cover-plane cover-plane-fl" style="z-index: 7" :style="staggerDelay(5)"><img class="cover-fl cover-n263" :style="leftLilyStyle" decoding="async" src="../../assets/figma/cover-n263.webp" alt="" /></div>
      <div class="cover-plane cover-plane-fl" style="z-index: 8" :style="staggerDelay(6)"><img class="cover-fl cover-n260" decoding="async" src="../../assets/figma/cover-n260.webp" alt="" /></div>
      <div class="cover-plane cover-plane-fl" style="z-index: 9" :style="staggerDelay(7)"><img class="cover-fl cover-n265" :style="rightLilyStyle" decoding="async" src="../../assets/figma/cover-n265.webp" alt="" /></div>
      <div class="cover-plane cover-plane-fl" style="z-index: 10" :style="staggerDelay(8)"><img class="cover-fl cover-n266" decoding="async" src="../../assets/figma/cover-n266.webp" alt="" /></div>
      <div class="cover-plane cover-plane-fl" style="z-index: 11" :style="staggerDelay(9)"><img class="cover-fl cover-n295" decoding="async" src="../../assets/figma/cover-n295.webp" alt="" /></div>
      <div class="cover-plane cover-plane-fl" style="z-index: 12" :style="staggerDelay(10)"><img class="cover-fl cover-n268" decoding="async" src="../../assets/figma/cover-n268.webp" alt="" /></div>
      <div class="cover-plane cover-plane-fl" style="z-index: 13" :style="staggerDelay(11)"><img class="cover-fl cover-n273" decoding="async" src="../../assets/figma/cover-n273.webp" alt="" /></div>
      <div class="cover-plane cover-plane-fl" style="z-index: 14" :style="staggerDelay(12)"><img class="cover-fl cover-n308" decoding="async" src="../../assets/figma/cover-n308.webp" alt="" /></div>
      <div class="cover-plane cover-plane-fl" style="z-index: 15" :style="staggerDelay(13)"><img class="cover-fl cover-n310" decoding="async" src="../../assets/figma/cover-n310.webp" alt="" /></div>
      <div class="cover-plane cover-plane-fl" style="z-index: 16" :style="staggerDelay(14)"><img class="cover-fl cover-n312" decoding="async" src="../../assets/figma/cover-n312.webp" alt="" /></div>
      <div class="cover-plane cover-plane-fl" style="z-index: 17" :style="staggerDelay(15)"><img class="cover-fl cover-n309" decoding="async" src="../../assets/figma/cover-n309.webp" alt="" /></div>
      <div class="cover-plane cover-plane-fl" style="z-index: 18" :style="staggerDelay(16)"><img class="cover-fl cover-n274" decoding="async" src="../../assets/figma/cover-n274.webp" alt="" /></div>
      <div class="cover-plane cover-plane-fl" style="z-index: 19" :style="staggerDelay(17)"><img class="cover-fl cover-n275" :style="leftFlowerStyle" decoding="async" src="../../assets/figma/cover-n275.webp" alt="" /></div>
      <div class="cover-plane cover-plane-fl" style="z-index: 20" :style="staggerDelay(18)"><img class="cover-fl cover-n277" :style="rightFlowerStyle" decoding="async" src="../../assets/figma/cover-n277.webp" alt="" /></div>

      <!-- grass hill (z 21): back flowers behind, front flowers ahead -->
      <div class="cover-plane cover-plane-hill" style="z-index: 21">
        <img class="cover-layer enter-hill" :src="hillSrc" alt="" decoding="async" fetchpriority="high" />
      </div>

      <!-- foreground flowers (z 22-32) -->
      <div class="cover-plane cover-plane-fl" style="z-index: 22" :style="staggerDelay(19)"><img class="cover-fl cover-n298" decoding="async" src="../../assets/figma/cover-n298.webp" alt="" /></div>
      <div class="cover-plane cover-plane-fl" style="z-index: 23" :style="staggerDelay(20)"><img class="cover-fl cover-n294" decoding="async" src="../../assets/figma/cover-n294.webp" alt="" /></div>
      <div class="cover-plane cover-plane-fl" style="z-index: 24" :style="staggerDelay(21)"><img class="cover-fl cover-n293" decoding="async" src="../../assets/figma/cover-n293.webp" alt="" /></div>
      <div class="cover-plane cover-plane-fl" style="z-index: 25" :style="staggerDelay(22)"><img class="cover-fl cover-n297" decoding="async" src="../../assets/figma/cover-n297.webp" alt="" /></div>
      <div class="cover-plane cover-plane-fl" style="z-index: 26" :style="staggerDelay(23)"><img class="cover-fl cover-n292" decoding="async" src="../../assets/figma/cover-n292.webp" alt="" /></div>
      <div class="cover-plane cover-plane-fl" style="z-index: 27" :style="staggerDelay(24)"><img class="cover-fl cover-n278" decoding="async" src="../../assets/figma/cover-n278.webp" alt="" /></div>
      <div class="cover-plane cover-plane-fl" style="z-index: 28" :style="staggerDelay(25)"><img class="cover-fl cover-n280" decoding="async" src="../../assets/figma/cover-n280.webp" alt="" /></div>
      <div class="cover-plane cover-plane-fl" style="z-index: 29" :style="staggerDelay(26)"><img class="cover-fl cover-n289" decoding="async" src="../../assets/figma/cover-n289.webp" alt="" /></div>
      <div class="cover-plane cover-plane-fl" style="z-index: 30" :style="staggerDelay(27)"><img class="cover-fl cover-n290" decoding="async" src="../../assets/figma/cover-n290.webp" alt="" /></div>
      <div class="cover-plane cover-plane-fl" style="z-index: 31" :style="staggerDelay(28)"><img class="cover-fl cover-n291" decoding="async" src="../../assets/figma/cover-n291.webp" alt="" /></div>
      <div class="cover-plane cover-plane-fl" style="z-index: 32" :style="staggerDelay(29)"><img class="cover-fl cover-n296" decoding="async" src="../../assets/figma/cover-n296.webp" alt="" /></div>

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
        <img v-else class="cover-layer breathe-mono enter-mono" :src="monogramSrc" alt="" decoding="async" fetchpriority="high" />
      </div>

      <!-- Real text + button (not baked into the artwork) -->
      <p class="cover-text cover-wedding-of enter-text" style="--enter-delay: 0.9s">The Wedding Of</p>
      <p class="cover-text cover-couple enter-text" style="--enter-delay: 1.05s">{{ coupleName }}</p>

      <p class="cover-text cover-dear enter-text" style="--enter-delay: 1.2s">Dear Mr / Mrs / Ms</p>
      <p class="cover-text cover-guest enter-text" style="--enter-delay: 1.35s">{{ guestName || 'Bapak/Ibu/Saudara/i' }}</p>

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
import archSrc from '../../assets/figma/cover-arch.webp'
import hillSrc from '../../assets/figma/cover-hill.webp'
import monogramSrc from '../../assets/figma/cover-monogram.webp'

defineEmits(['open'])

const STAGE_WIDTH = 375
const STAGE_HEIGHT = 725

const { coupleNickname, guest, logoUrl, guestName } = useWedding()

const coupleName = computed(() => coupleNickname.value || 'Antonio & Ayu')
const coverRoot = ref(null)
const isReady = ref(false)
const coverScale = ref(1)

const leftFlowerStyle = computed(() => {
  if (typeof window === 'undefined') return {}
  const width = window.innerWidth >= 768 ? 480 : window.innerWidth
  const overflow = 375 - width / coverScale.value
  const viewportLeftInStage = overflow > 0 ? overflow / 2 : 0
  return {
    left: `${viewportLeftInStage}px`
  }
})

const rightFlowerStyle = computed(() => {
  if (typeof window === 'undefined') return {}
  const width = window.innerWidth >= 768 ? 480 : window.innerWidth
  const overflow = 375 - width / coverScale.value
  const viewportLeftInStage = overflow > 0 ? overflow / 2 : 0
  const leftPos = 331 - viewportLeftInStage
  return {
    left: `${leftPos}px`
  }
})

const leftLilyStyle = computed(() => {
  if (typeof window === 'undefined') return {}
  const width = window.innerWidth >= 768 ? 480 : window.innerWidth
  const overflow = 375 - width / coverScale.value
  const viewportLeftInStage = overflow > 0 ? overflow / 2 : 0
  return {
    left: `${viewportLeftInStage}px`
  }
})

const rightLilyStyle = computed(() => {
  if (typeof window === 'undefined') return {}
  const width = window.innerWidth >= 768 ? 480 : window.innerWidth
  const overflow = 375 - width / coverScale.value
  const viewportLeftInStage = overflow > 0 ? overflow / 2 : 0
  const leftPos = 328.3 - viewportLeftInStage
  return {
    left: `${leftPos}px`
  }
})

function updateScale() {
  if (typeof window === 'undefined') return
  const width = window.innerWidth >= 768 ? 480 : window.innerWidth
  const height = window.innerHeight
  coverScale.value = Math.max(width / STAGE_WIDTH, height / STAGE_HEIGHT)
}

function staggerDelay(index) {
  // Stagger each plant by 55ms, starting after 0.2s
  const delay = `${0.2 + index * 0.055}s`
  return {
    transitionDelay: delay,
    animationDelay: delay
  }
}

onMounted(async () => {

  // Preload critical above-fold images so the browser fetches them
  // before the DOM-parsed <img> tags — avoids the 6-connection limit queue.
  for (const url of [archSrc, hillSrc, monogramSrc]) {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = url
    document.head.appendChild(link)
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
