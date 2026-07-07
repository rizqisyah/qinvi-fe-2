<template>
  <div
    ref="rootRef"
    class="cover-root"
    :class="{ 'is-ready': isReady }"
    data-section="cover"
    @mousemove="onPointer"
    @mouseleave="resetParallax"
  >
    <!-- 375x725 artwork stage, scaled to cover the viewport height. -->
    <div class="cover-stage" :style="{ '--cover-scale': coverScale }">
      <!-- Each decorative slab is a full-frame layer exported from Figma at its
           true transform, so it can animate (entrance + idle sway + parallax)
           independently while staying pixel-aligned. -->
      <div class="cover-plane cover-plane-base" style="--depth: 4">
        <img class="cover-layer enter-base" src="../../assets/figma/cover-base.webp" alt="" />
      </div>
      <div class="cover-plane cover-plane-bottom" style="--depth: 10">
        <img class="cover-layer sway-bottom enter-bottom" src="../../assets/figma/cover-bottom.webp" alt="" />
      </div>
      <div class="cover-plane cover-plane-left" style="--depth: 16">
        <img class="cover-layer sway-left enter-left" src="../../assets/figma/cover-left.webp" alt="" />
      </div>
      <div class="cover-plane cover-plane-right" style="--depth: 16">
        <img class="cover-layer sway-right enter-right" src="../../assets/figma/cover-right.webp" alt="" />
      </div>
      <div class="cover-plane cover-plane-mono" style="--depth: 7">
        <img class="cover-layer breathe-mono enter-mono" src="../../assets/figma/cover-monogram.webp" alt="" />
      </div>

      <!-- Real text + button (not baked into the artwork) -->
      <p class="cover-text cover-wedding-of enter-text" style="--enter-delay: 0.9s">The Wedding Of</p>
      <p class="cover-text cover-couple enter-text" style="--enter-delay: 1.05s">Antonio &amp; Ayu</p>

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
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

defineEmits(['open'])

const STAGE_HEIGHT = 725

const guestName = ref('Bapak/Ibu/Saudara/i')
const isReady = ref(false)
const coverScale = ref(1)
const rootRef = ref(null)

// Scale the fixed 375x725 artwork to cover the viewport height (never below 1).
function updateScale() {
  coverScale.value = Math.max(1, window.innerHeight / STAGE_HEIGHT)
}

// Cursor parallax: publish a normalized -1..1 offset that each plane multiplies
// by its own --depth. Uses `transform` on the plane so it never fights the
// entrance (`translate`) or idle sway (`rotate`/`scale`) on the inner image.
let rafId = 0
function onPointer(e) {
  const el = rootRef.value
  if (!el) return
  const r = el.getBoundingClientRect()
  const nx = ((e.clientX - r.left) / r.width - 0.5) * 2
  const ny = ((e.clientY - r.top) / r.height - 0.5) * 2
  if (rafId) return
  rafId = requestAnimationFrame(() => {
    rafId = 0
    el.style.setProperty('--px', nx.toFixed(3))
    el.style.setProperty('--py', ny.toFixed(3))
  })
}

function resetParallax() {
  const el = rootRef.value
  if (!el) return
  el.style.setProperty('--px', '0')
  el.style.setProperty('--py', '0')
}

onMounted(async () => {
  const guest = new URLSearchParams(window.location.search).get('to')
  if (guest) {
    guestName.value = guest
  }
  updateScale()
  window.addEventListener('resize', updateScale)
  await nextTick()
  // Next frame so the entrance transition runs from the initial state.
  requestAnimationFrame(() => {
    isReady.value = true
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScale)
  if (rafId) cancelAnimationFrame(rafId)
})
</script>
