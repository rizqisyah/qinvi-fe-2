<template>
  <section
    ref="rootRef"
    class="inv-section invitation-section invitation-section--couple reveal-on-scroll"
    :class="{ 'in-view': inView }"
    data-section="couple"
  >
    <!-- Background layers -->
    <img class="couple-asset couple-circle-groom" src="../../assets/figma/couple-circle-groom.png" alt="" />
    <img class="couple-asset couple-circle-bride" src="../../assets/figma/couple-circle-bride.png" alt="" />
    <img class="couple-asset couple-bg-groom" src="../../assets/figma/couple-bg-groom.png" alt="" />
    <img class="couple-asset couple-bg-bride" src="../../assets/figma/couple-bg-bride.png" alt="" />
    <img class="couple-asset couple-side-groom" src="../../assets/figma/couple-side-groom.png" alt="" />
    <img class="couple-asset couple-side-bride" src="../../assets/figma/couple-side-bride.png" alt="" />
    <!-- Ornamental frames -->
    <img class="couple-asset couple-frame-bride" src="../../assets/figma/couple-frame-bride.png" alt="" />
    <!-- Edge flowers -->
    <img class="couple-asset couple-edge couple-fl-groom-l" src="../../assets/figma/couple-flower-groom-left.png" alt="" />
    <img class="couple-asset couple-edge couple-fl-groom-r" src="../../assets/figma/couple-flower-groom-right.png" alt="" />
    <img class="couple-asset couple-edge couple-fl-bride-l" src="../../assets/figma/couple-flower-bride-left.png" alt="" />
    <img class="couple-asset couple-edge couple-fl-bride-r" src="../../assets/figma/couple-flower-bride-right.png" alt="" />
    <img class="couple-asset couple-ornament" src="../../assets/figma/couple-ornament.png" alt="" />
    <!-- Small flowers + leaves -->
    <img class="couple-asset couple-fl2 couple-fl2-groom-l" src="../../assets/figma/couple-flower2-groom-l.png" alt="" />
    <img class="couple-asset couple-fl2 couple-fl2-groom-r" src="../../assets/figma/couple-flower2-groom-r.png" alt="" />
    <img class="couple-asset couple-leaf-groom-l" src="../../assets/figma/couple-leaf-groom-l.png" alt="" />
    <img class="couple-asset couple-leaf-groom-r" src="../../assets/figma/couple-leaf-groom-r.png" alt="" />
    <img class="couple-asset couple-leaf-bride-l" src="../../assets/figma/couple-leaf-bride-l.png" alt="" />
    <img class="couple-asset couple-leaf-bride-r" src="../../assets/figma/couple-leaf-bride-r.png" alt="" />
    <!-- Foliage -->
    <img class="couple-asset couple-foliage couple-foliage-groom-l" src="../../assets/figma/couple-foliage-groom-l.png" alt="" />
    <img class="couple-asset couple-foliage couple-foliage-bride-r" src="../../assets/figma/couple-foliage-bride-r.png" alt="" />

    <h2 class="script-heading">The Bride &amp;<br />The Groom</h2>

    <div class="couple-card groom-card">
      <p class="couple-short-name">Antonio</p>
      <p class="couple-full-name">Antonio Josua Setiyadi</p>
      <p class="couple-parent">Putra Pertama dari Bapak Tono<br />&amp; Ibu Ratna</p>
    </div>

    <div class="couple-card bride-card">
      <p class="couple-short-name">Ayu</p>
      <p class="couple-full-name">Ayu Shella Pratni</p>
      <p class="couple-parent">Putri Pertama dari Bapak Heri<br />&amp; Ibu Sofie</p>
    </div>
  </section>
</template>

<script setup>
import { useScrollReveal } from '../../composables/useScrollReveal'

const { rootRef, inView } = useScrollReveal()
</script>
