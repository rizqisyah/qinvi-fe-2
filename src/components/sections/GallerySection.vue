<template>
  <section class="inv-section invitation-section invitation-section--gallery" data-section="gallery">
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
          <img :src="getPhotoSrc(photo)" alt="" />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const photos = [
  'gallery-photo-main.png',
  'gallery-photo-1.png',
  'gallery-photo-2.png',
  'gallery-photo-3.png',
]

const currentIndex = ref(0)

const currentPhotoSrc = computed(() => getPhotoSrc(photos[currentIndex.value]))

function getPhotoSrc(name) {
  return new URL(`../../assets/figma/${name}`, import.meta.url).href
}

function prevPhoto() {
  currentIndex.value = (currentIndex.value - 1 + photos.length) % photos.length
}

function nextPhoto() {
  currentIndex.value = (currentIndex.value + 1) % photos.length
}
</script>
