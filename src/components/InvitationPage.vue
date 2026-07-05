<template>
  <div class="invitation-canvas" :class="{ 'is-locked': !isOpen }" aria-label="Antonio and Ayu wedding invitation">
    <div v-if="isLoading" class="opening-loader" aria-label="Memuat undangan">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>

    <HeroSection :is-ready="!isLoading" :is-open="isOpen" @open="openInvitation" />
    <template v-if="isOpen">
      <QuranSection />
      <CoupleSection />
      <SaveDateSection />
      <EventSection />
      <GiftSection />
      <RsvpSection />
      <WishesSection />
      <GallerySection />
      <FooterSection />
    </template>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import HeroSection from './sections/HeroSection.vue'
import QuranSection from './sections/QuranSection.vue'
import CoupleSection from './sections/CoupleSection.vue'
import SaveDateSection from './sections/SaveDateSection.vue'
import EventSection from './sections/EventSection.vue'
import GiftSection from './sections/GiftSection.vue'
import RsvpSection from './sections/RsvpSection.vue'
import WishesSection from './sections/WishesSection.vue'
import GallerySection from './sections/GallerySection.vue'
import FooterSection from './sections/FooterSection.vue'

const isLoading = ref(true)
const isOpen = ref(false)

onMounted(() => {
  window.setTimeout(() => {
    isLoading.value = false
  }, 1100)
})

function openInvitation() {
  isOpen.value = true
}
</script>
