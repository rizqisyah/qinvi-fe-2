<template>
  <div ref="rootRef" class="groom-block reveal-on-scroll" :class="{ 'in-view': inView }">
    <img class="couple-asset couple-circle-groom" src="../../assets/figma/couple-circle-groom.png" alt="" />
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
      <p class="couple-short-name">Antonio</p>
      <p class="couple-full-name">Antonio Josua Setiyadi</p>
      <p class="couple-parent">Putra Pertama dari Bapak Tono<br />&amp; Ibu Ratna</p>
    </div>
  </div>
</template>

<script setup>
import { useScrollReveal } from '../../composables/useScrollReveal'

const { rootRef, inView } = useScrollReveal()
</script>
