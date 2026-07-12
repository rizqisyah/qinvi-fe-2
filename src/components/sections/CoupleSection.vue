<template>
  <section
    ref="rootRef"
    class="inv-section invitation-section invitation-section--couple reveal-on-scroll"
    :class="{ 'in-view': inView }"
    data-section="couple"
  >
    <h2 v-if="orderGroomFirst" class="script-heading">The Groom &amp;<br />The Bride</h2>
    <h2 v-else class="script-heading">The Bride &amp;<br />The Groom</h2>

    <img class="couple-asset couple-ornament" src="../../assets/figma/couple-ornament.png" alt="" />

    <GroomCard :is-first="orderGroomFirst" />
    <BrideCard :is-first="!orderGroomFirst" />
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useScrollReveal } from '../../composables/useScrollReveal'
import { useWedding } from '../../composables/useWedding'
import GroomCard from './GroomCard.vue'
import BrideCard from './BrideCard.vue'

const { rootRef, inView } = useScrollReveal()
const { wedding } = useWedding()

const orderGroomFirst = computed(() => {
  return wedding.value?.order_groom_first !== false
})
</script>
