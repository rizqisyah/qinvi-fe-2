<template>
  <section class="inv-section invitation-section invitation-section--gallery" data-section="gallery">
    <img class="figma-asset gallery-top-divider" src="../../assets/figma/gallery-top-divider-garland.png" alt="" />

    <h2 class="script-heading gallery-title">Gallery</h2>

    <div class="gallery-carousel" role="region" aria-label="Photo gallery">
      <div class="gallery-main-photo-wrapper">
        <img
          class="gallery-main-photo"
          :src="currentPhotoSrc"
          :alt="`Gallery photo ${currentIndex + 1} of ${photos.length}`"
        />

        <button class="gallery-nav gallery-nav--prev" type="button" aria-label="Previous photo" @click="prevPhoto">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button class="gallery-nav gallery-nav--next" type="button" aria-label="Next photo" @click="nextPhoto">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div class="gallery-thumbnails">
        <button
          v-for="(photo, index) in photos"
          :key="index"
          type="button"
          class="gallery-thumb"
          :class="{ 'is-active': index === currentIndex }"
          :aria-label="`Photo ${index + 1}`"
          @click="currentIndex = index"
        >
          <img :src="img(photo)" alt="" />
        </button>
      </div>
    </div>

    <div class="gallery-closing" ref="closingEl" :class="{ 'in-view': closingInView }">
      <!-- Layers placed one-by-one, dictated from Figma -->
      <img class="closing-asset closing-anim closing-tree-l" :style="delay(0)" :src="img('closing-tree.png')" alt="" />
      <img class="closing-asset closing-anim closing-tree-r" :style="delay(1)" :src="img('closing-tree.png')" alt="" />
      <img class="closing-asset closing-anim closing-dahlia-stem-l" :style="delay(2)" :src="img('closing-dahlia-stem-l.png')" alt="" />
      <img class="closing-asset closing-anim closing-dahlia-stem-r" :style="delay(3)" :src="img('closing-dahlia-stem-l.png')" alt="" />
      <img class="closing-asset closing-anim closing-orchid-l" :style="delay(4)" :src="img('closing-orchid-2.png')" alt="" />
      <img class="closing-asset closing-anim closing-orchid-r" :style="delay(5)" :src="img('closing-orchid-2.png')" alt="" />
      <img class="closing-asset closing-anim closing-dahlia-crop-l" :style="delay(6)" :src="img('closing-dahlia-crop.png')" alt="" />
      <img class="closing-asset closing-anim closing-dahlia-crop-r" :style="delay(7)" :src="img('closing-dahlia-crop.png')" alt="" />
      <img class="closing-asset closing-anim closing-ranunculus-l" :style="delay(8)" :src="img('closing-ranunculus.png')" alt="" />
      <img class="closing-asset closing-anim closing-ranunculus-r" :style="delay(9)" :src="img('closing-ranunculus.png')" alt="" />
      <img class="closing-asset closing-anim closing-monogram" :style="delay(10)" :src="img('closing-monogram.png')" alt="" />
      <img class="closing-asset closing-anim closing-hashtag" :style="delay(11)" :src="img('closing-hashtag.png')" alt="#uniTEbyoursiDE" />
      <img class="closing-asset closing-anim closing-wax-seal" :style="delay(12)" :src="img('closing-wax-seal.png')" alt="" />
      <img class="closing-asset closing-anim closing-couple-arch" :style="delay(13)" :src="img('closing-couple-arch.png')" alt="Arif and Dita" />
      <img class="closing-asset closing-anim closing-dahlia-round-l" :style="delay(14)" :src="img('closing-dahlia-round.png')" alt="" />
      <img class="closing-asset closing-anim closing-dahlia-round-r" :style="delay(15)" :src="img('closing-dahlia-round.png')" alt="" />
      <img class="closing-asset closing-anim closing-terrace" :style="delay(16)" :src="img('closing-terrace.png')" alt="" />
      <img class="closing-asset closing-anim closing-lily-l" :style="delay(17)" :src="img('closing-lily.png')" alt="" />
      <img class="closing-asset closing-anim closing-lily-r" :style="delay(18)" :src="img('closing-lily.png')" alt="" />
      <img class="closing-asset closing-anim closing-dahlia-stem2-l" :style="delay(19)" :src="img('closing-dahlia-stem2.png')" alt="" />
      <img class="closing-asset closing-anim closing-dahlia-stem2-r" :style="delay(20)" :src="img('closing-dahlia-stem2.png')" alt="" />
      <img class="closing-asset closing-anim closing-orchid2-l" :style="delay(21)" :src="img('closing-orchid-2.png')" alt="" />
      <img class="closing-asset closing-anim closing-orchid2-r" :style="delay(22)" :src="img('closing-orchid-2.png')" alt="" />
      <img class="closing-asset closing-anim closing-vase-l" :style="delay(23)" :src="img('closing-vase.png')" alt="" />
      <img class="closing-asset closing-anim closing-vase-r" :style="delay(24)" :src="img('closing-vase.png')" alt="" />

      <p class="script-heading closing-thanks closing-anim" :style="delay(25)">Thank You!</p>
      <p class="text-body closing-message closing-anim" :style="delay(26)">
        We sincerely thank you for your presence, prayers, and blessings on our special day.
      </p>
      <img class="closing-asset closing-anim closing-divider" :style="delay(27)" :src="img('closing-divider.png')" alt="" />
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const photos = [
  'gallery-photo-main.png',
  'gallery-photo-1.png',
  'gallery-photo-2.png',
  'gallery-photo-3.png',
]

const currentIndex = ref(0)

const currentPhotoSrc = computed(() => img(photos[currentIndex.value]))

function img(name) {
  return new URL(`../../assets/figma/${name}`, import.meta.url).href
}

function prevPhoto() {
  currentIndex.value = (currentIndex.value - 1 + photos.length) % photos.length
}

function nextPhoto() {
  currentIndex.value = (currentIndex.value + 1) % photos.length
}

const closingEl = ref(null)
const closingInView = ref(false)

function delay(index) {
  return { '--stagger': `${index * 35}ms` }
}

let observer

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        closingInView.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.2 }
  )
  if (closingEl.value) observer.observe(closingEl.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>
