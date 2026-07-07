<template>
  <div class="invitation-canvas" :class="{ 'is-locked': !isOpen }" aria-label="Antonio and Ayu wedding invitation">
    <Transition name="splash">
      <SplashScreen v-if="!isOpen" @open="openInvitation" />
    </Transition>

    <template v-if="isOpen">
      <HeroSection :is-ready="true" :is-open="true" />
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
import { ref } from 'vue'
import SplashScreen from './sections/SplashScreen.vue'
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

const isOpen = ref(false)

function openInvitation() {
  isOpen.value = true
}
</script>
