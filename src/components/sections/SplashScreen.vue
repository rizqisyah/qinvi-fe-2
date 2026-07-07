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
      <!-- Depth-ordered slabs, each a full-frame layer exported at its true Figma
           transform. Back flowers tuck behind the grass hill; foreground flowers
           sit in front of it. Every slab animates independently. -->
      <div class="cover-plane cover-plane-arch" style="--depth: 3">
        <img class="cover-layer enter-arch" src="../../assets/figma/cover-arch.webp" alt="" />
      </div>
      <div class="cover-plane cover-plane-leaves" style="--depth: 8">
        <img class="cover-layer sway-leaves enter-leaves" src="../../assets/figma/cover-leaves.webp" alt="" />
      </div>
      <div class="cover-plane cover-plane-backleft" style="--depth: 14">
        <img class="cover-layer sway-left enter-left" src="../../assets/figma/cover-backleft.webp" alt="" />
      </div>
      <div class="cover-plane cover-plane-backright" style="--depth: 14">
        <img class="cover-layer sway-right enter-right" src="../../assets/figma/cover-backright.webp" alt="" />
      </div>
      <div class="cover-plane cover-plane-hill" style="--depth: 6">
        <img class="cover-layer enter-hill" src="../../assets/figma/cover-hill.webp" alt="" />
      </div>
      <div class="cover-plane cover-plane-front" style="--depth: 20">
        <img class="cover-layer breathe-front enter-front" src="../../assets/figma/cover-front.webp" alt="" />
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
