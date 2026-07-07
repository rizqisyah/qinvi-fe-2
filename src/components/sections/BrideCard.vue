<template>
  <div ref="rootRef" class="bride-block reveal-on-scroll" :class="{ 'in-view': inView }">
    <img class="couple-asset couple-circle-bride" src="../../assets/figma/couple-circle-bride.png" alt="" />
    <img class="couple-asset couple-bg-bride" src="../../assets/figma/couple-bg-bride.png" alt="" />
    <img class="couple-asset couple-side-bride" src="../../assets/figma/couple-side-bride.png" alt="" />
    <img class="couple-asset couple-frame-bride" src="../../assets/figma/couple-frame-bride.png" alt="" />
    <img class="couple-asset couple-edge couple-fl-bride-l" src="../../assets/figma/couple-flower-bride-left.png" alt="" />
    <img class="couple-asset couple-edge couple-fl-bride-r" src="../../assets/figma/couple-flower-bride-right.png" alt="" />
    <img class="couple-asset couple-leaf-bride-l" src="../../assets/figma/couple-leaf-bride-l.png" alt="" />
    <img class="couple-asset couple-leaf-bride-r" src="../../assets/figma/couple-leaf-bride-r.png" alt="" />
    <img class="couple-asset couple-foliage couple-foliage-bride-r" src="../../assets/figma/couple-foliage-bride-r.png" alt="" />

    <div class="couple-card bride-card">
      <p class="couple-short-name">Ayu</p>
      <p class="couple-full-name">Ayu Shella Pratni</p>
      <p class="couple-parent">Putri Pertama dari Bapak Heri<br />&amp; Ibu Sofie</p>
    </div>
  </div>
</template>

<script setup>
import { useScrollReveal } from '../../composables/useScrollReveal'

const { rootRef, inView } = useScrollReveal()
</script>
