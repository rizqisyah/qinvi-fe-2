<template>
  <div class="cover-root" :class="{ 'is-ready': isReady }" data-section="cover">
    <!-- Garden-arch cover. Each decorative layer is exported full/uncropped from
         Figma and positioned by its frame-relative bounds so it can be animated
         individually later. z-index encodes the original Figma stacking order. -->
    <img class="cover-layer cover-l01" :style="revealStyle(1)" src="../../assets/figma/cover-l01.png" alt="" />
    <img class="cover-layer cover-l04" :style="revealStyle(4)" src="../../assets/figma/cover-l04.png" alt="" />
    <img class="cover-layer cover-l05" :style="revealStyle(5)" src="../../assets/figma/cover-l05.png" alt="" />
    <img class="cover-layer cover-l06" :style="revealStyle(6)" src="../../assets/figma/cover-l06.png" alt="" />
    <img class="cover-layer cover-l07" :style="revealStyle(7)" src="../../assets/figma/cover-l07.png" alt="" />
    <img class="cover-layer cover-l08" :style="revealStyle(8)" src="../../assets/figma/cover-l08.png" alt="" />
    <img class="cover-layer cover-l10" :style="revealStyle(10)" src="../../assets/figma/cover-l10.png" alt="" />
    <img class="cover-layer cover-l16" :style="revealStyle(16)" src="../../assets/figma/cover-l16.png" alt="" />
    <img class="cover-layer cover-l17" :style="revealStyle(17)" src="../../assets/figma/cover-l17.png" alt="" />
    <img class="cover-layer cover-l18" :style="revealStyle(18)" src="../../assets/figma/cover-l18.png" alt="" />
    <img class="cover-layer cover-l19" :style="revealStyle(19)" src="../../assets/figma/cover-l19.png" alt="" />
    <img class="cover-layer cover-l20" :style="revealStyle(20)" src="../../assets/figma/cover-l20.png" alt="" />
    <img class="cover-layer cover-l21" :style="revealStyle(21)" src="../../assets/figma/cover-l21.png" alt="" />
    <img class="cover-layer cover-l22" :style="revealStyle(22)" src="../../assets/figma/cover-l22.png" alt="" />
    <img class="cover-layer cover-l23" :style="revealStyle(23)" src="../../assets/figma/cover-l23.png" alt="" />
    <img class="cover-layer cover-l24" :style="revealStyle(24)" src="../../assets/figma/cover-l24.png" alt="" />
    <img class="cover-layer cover-l25" :style="revealStyle(25)" src="../../assets/figma/cover-l25.png" alt="" />
    <img class="cover-layer cover-l26" :style="revealStyle(26)" src="../../assets/figma/cover-l26.png" alt="" />
    <img class="cover-layer cover-l27" :style="revealStyle(27)" src="../../assets/figma/cover-l27.png" alt="" />
    <img class="cover-layer cover-l28" :style="revealStyle(28)" src="../../assets/figma/cover-l28.png" alt="" />
    <img class="cover-layer cover-l29" :style="revealStyle(29)" src="../../assets/figma/cover-l29.png" alt="" />
    <img class="cover-layer cover-l30" :style="revealStyle(30)" src="../../assets/figma/cover-l30.png" alt="" />
    <img class="cover-layer cover-l31" :style="revealStyle(31)" src="../../assets/figma/cover-l31.png" alt="" />
    <img class="cover-layer cover-l32" :style="revealStyle(32)" src="../../assets/figma/cover-l32.png" alt="" />
    <img class="cover-layer cover-l33" :style="revealStyle(33)" src="../../assets/figma/cover-l33.png" alt="" />
    <img class="cover-layer cover-l34" :style="revealStyle(34)" src="../../assets/figma/cover-l34.png" alt="" />
    <img class="cover-layer cover-l35" :style="revealStyle(35)" src="../../assets/figma/cover-l35.png" alt="" />
    <img class="cover-layer cover-l36" :style="revealStyle(36)" src="../../assets/figma/cover-l36.png" alt="" />
    <img class="cover-layer cover-l37" :style="revealStyle(37)" src="../../assets/figma/cover-l37.png" alt="" />
    <img class="cover-layer cover-l38" :style="revealStyle(38)" src="../../assets/figma/cover-l38.png" alt="" />
    <img class="cover-layer cover-l39" :style="revealStyle(39)" src="../../assets/figma/cover-l39.png" alt="" />
    <img class="cover-layer cover-l40" :style="revealStyle(40)" src="../../assets/figma/cover-l40.png" alt="" />
    <img class="cover-layer cover-l41 cover-monogram" :style="revealStyle(41)" src="../../assets/figma/cover-l41.png" alt="" />
    <img class="cover-layer cover-l42" :style="revealStyle(42)" src="../../assets/figma/cover-l42.png" alt="" />
    <img class="cover-layer cover-l43" :style="revealStyle(43)" src="../../assets/figma/cover-l43.png" alt="" />
    <img class="cover-layer cover-l44" :style="revealStyle(44)" src="../../assets/figma/cover-l44.png" alt="" />
    <img class="cover-layer cover-l45" :style="revealStyle(45)" src="../../assets/figma/cover-l45.png" alt="" />

    <!-- Real text + button (not baked into images) -->
    <p class="cover-text cover-wedding-of">The Wedding Of</p>
    <p class="cover-text cover-couple">Antonio &amp; Ayu</p>

    <p class="cover-text cover-dear">Dear Mr / Mrs / Ms</p>
    <p class="cover-text cover-guest">{{ guestName }}</p>

    <button class="cover-open-button" type="button" @click="$emit('open')">
      Open Invitation
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

defineEmits(['open'])

const guestName = ref('Bapak/Ibu/Saudara/i')
const isReady = ref(false)

// Per-layer hook for future staggered entrance animation (--i = Figma stack index).
function revealStyle(index) {
  return { '--i': index }
}

onMounted(async () => {
  const guest = new URLSearchParams(window.location.search).get('to')
  if (guest) {
    guestName.value = guest
  }
  await nextTick()
  isReady.value = true
})
</script>
