<template>
  <div ref="rootRef" class="groom-block reveal-on-scroll" :class="{ 'in-view': inView }">
    <!-- Real photo when the API provides one; illustrated avatar otherwise. -->
    <img v-if="photoUrl" class="couple-asset couple-photo couple-photo-groom" :src="photoUrl" :alt="fullName" />
    <img v-else class="couple-asset couple-circle-groom" src="../../assets/figma/couple-circle-groom.png" alt="" />
    <img class="couple-asset couple-bg-groom" src="../../assets/figma/couple-bg-groom.png" alt="" />
    <img class="couple-asset couple-side-groom" src="../../assets/figma/couple-side-groom.png" alt="" />
    <img class="couple-asset couple-edge couple-fl-groom-l" src="../../assets/figma/couple-flower-groom-left.png" alt="" />
    <img class="couple-asset couple-edge couple-fl-groom-r" src="../../assets/figma/couple-flower-groom-right.png" alt="" />
    <img class="couple-asset couple-fl2 couple-fl2-groom-l" src="../../assets/figma/couple-flower2-groom-l.png" alt="" />
    <img class="couple-asset couple-fl2 couple-fl2-groom-r" src="../../assets/figma/couple-flower2-groom-r.png" alt="" />
    <img class="couple-asset couple-leaf-groom-l" src="../../assets/figma/couple-leaf-groom-l.png" alt="" />
    <img class="couple-asset couple-leaf-groom-r" src="../../assets/figma/couple-leaf-groom-r.png" alt="" />
    <img class="couple-asset couple-foliage couple-foliage-groom-l" src="../../assets/figma/couple-foliage-groom-l.png" alt="" />

    <div class="couple-card groom-card">
      <p class="couple-short-name">{{ shortName }}</p>
      <p class="couple-full-name">{{ fullName }}</p>
      <p class="couple-parent">{{ parents }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useScrollReveal } from '../../composables/useScrollReveal'
import { useWedding } from '../../composables/useWedding'
import { parentLine } from '../../lib/format'

const { rootRef, inView } = useScrollReveal()
const { groom } = useWedding()

const shortName = computed(() => groom.value?.nickname || 'Antonio')
const fullName = computed(() => groom.value?.name || 'Antonio Josua Setiyadi')
const photoUrl = computed(() => groom.value?.photo_url || '')
const parents = computed(
  () => parentLine(groom.value) || 'Putra Pertama dari Bapak Tono & Ibu Ratna'
)
</script>
