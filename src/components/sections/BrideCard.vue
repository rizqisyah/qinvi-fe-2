<template>
  <div
    ref="rootRef"
    class="reveal-on-scroll"
    :class="[isFirst ? 'groom-block' : 'bride-block', { 'in-view': inView }]"
  >
    <!-- Real photo when the API provides one; illustrated avatar otherwise. -->
    <img v-if="photoUrl" class="couple-asset couple-photo couple-photo-bride" :src="photoUrl" :alt="fullName" />
    <img v-else class="couple-asset couple-circle-bride" src="../../assets/figma/couple-circle-bride.png" alt="" />
    <img class="couple-asset couple-bg-bride" src="../../assets/figma/couple-bg-bride.png" alt="" />
    <img class="couple-asset couple-side-bride" src="../../assets/figma/couple-side-bride.png" alt="" />
    <img class="couple-asset couple-frame-bride" src="../../assets/figma/couple-frame-bride.png" alt="" />
    <img class="couple-asset couple-edge couple-fl-bride-l" src="../../assets/figma/couple-flower-bride-left.png" alt="" />
    <img class="couple-asset couple-edge couple-fl-bride-r" src="../../assets/figma/couple-flower-bride-right.png" alt="" />
    <img class="couple-asset couple-leaf-bride-l" src="../../assets/figma/couple-leaf-bride-l.png" alt="" />
    <img class="couple-asset couple-leaf-bride-r" src="../../assets/figma/couple-leaf-bride-r.png" alt="" />
    <img class="couple-asset couple-foliage couple-foliage-bride-r" src="../../assets/figma/couple-foliage-bride-r.png" alt="" />

    <div class="couple-card bride-card">
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

defineProps({
  isFirst: {
    type: Boolean,
    default: false,
  },
})

const { rootRef, inView } = useScrollReveal()
const { bride, isEnglish } = useWedding()

const shortName = computed(() => bride.value?.nickname || 'Ayu')
const fullName = computed(() => bride.value?.name || 'Ayu Shella Pratni')
const photoUrl = computed(() => bride.value?.photo_url || '')
const parents = computed(() => {
  return (
    parentLine(bride.value) ||
    (isEnglish.value
      ? 'First daughter of Mr. Heri & Mrs. Sofie'
      : 'Putri Pertama dari Bapak Heri & Ibu Sofie')
  )
})
</script>
