<template>
  <section
    ref="rootRef"
    class="inv-section invitation-section invitation-section--couple reveal-on-scroll"
    :class="{ 'in-view': inView }"
    data-section="couple"
  >
    <h2 class="script-heading">The Bride &amp;<br />The Groom</h2>

    <img class="couple-asset couple-ornament" src="../../assets/figma/couple-ornament.png" alt="" />

    <GroomCard />
    <BrideCard />
  </section>
</template>

<script setup>
import { useScrollReveal } from '../../composables/useScrollReveal'
import GroomCard from './GroomCard.vue'
import BrideCard from './BrideCard.vue'

const { rootRef, inView } = useScrollReveal()
</script>
