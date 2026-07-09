<template>
  <section
    ref="rootRef"
    class="inv-section invitation-section invitation-section--save-date reveal-on-scroll"
    :class="{ 'in-view': inView }"
    data-section="save-date"
  >
    <img class="save-asset save-bg" src="../../assets/figma/save-bg.png" alt="" />
    <img class="save-asset save-leaf-l" src="../../assets/figma/save-leaf-left.png" alt="" />
    <img class="save-asset save-leaf-r" src="../../assets/figma/save-leaf-right.png" alt="" />
    <img class="save-asset save-leaf2-l" src="../../assets/figma/save-leaf2-left.png" alt="" />
    <img class="save-asset save-leaf2-r" src="../../assets/figma/save-leaf2-right.png" alt="" />
    <img class="save-asset save-band-l" src="../../assets/figma/save-band-left.png" alt="" />
    <img class="save-asset save-band-r" src="../../assets/figma/save-band-right.png" alt="" />
    <img class="save-asset save-flower-l" src="../../assets/figma/save-flower-left.png" alt="" />
    <img class="save-asset save-flower-r" src="../../assets/figma/save-flower-right.png" alt="" />
    <img class="save-asset save-divider" src="../../assets/figma/save-divider.png" alt="" />
    <h2 class="script-heading">Save The<br />Date</h2>
    <div class="countdown-grid">
      <div class="countdown-box"><p class="countdown-num">{{ pad2(parts.days) }}</p><p class="countdown-label">Days</p></div>
      <div class="countdown-box"><p class="countdown-num">{{ pad2(parts.hours) }}</p><p class="countdown-label">Hours</p></div>
      <div class="countdown-box"><p class="countdown-num">{{ pad2(parts.minutes) }}</p><p class="countdown-label">Minutes</p></div>
      <div class="countdown-box"><p class="countdown-num">{{ pad2(parts.seconds) }}</p><p class="countdown-label">Seconds</p></div>
    </div>
    <button class="decor-button calendar-button" type="button" disabled>Add to Calender</button>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useScrollReveal } from '../../composables/useScrollReveal'
import { useWedding } from '../../composables/useWedding'
import { countdownParts, pad2 } from '../../lib/format'

const { rootRef, inView } = useScrollReveal()
const { countdownDate } = useWedding()

const parts = ref(countdownParts(countdownDate.value))
let timer

function tick() {
  parts.value = countdownParts(countdownDate.value)
}

onMounted(() => {
  tick()
  timer = setInterval(tick, 1000)
})

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>
