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
      <VideoSection />
      <GallerySection />
      <FooterSection />
      <MusicPlayer />
      <BottomNav />
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useWedding } from '../composables/useWedding'
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
import VideoSection from './sections/VideoSection.vue'
import FooterSection from './sections/FooterSection.vue'
import MusicPlayer from './sections/MusicPlayer.vue'
import BottomNav from './sections/BottomNav.vue'

const isOpen = ref(false)
const { load, wedding } = useWedding()

// Fetch the payload up-front while the splash cover is showing so every
// section has data by the time the invitation opens.
onMounted(() => {
  load()
})

// Upsert a <meta> tag by name or property attribute.
function setMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

// Push SEO metadata from the API into the document head once loaded.
watch(
  wedding,
  (w) => {
    const seo = w?.seo_settings
    if (!seo) return

    if (seo.title) document.title = seo.title
    setMeta('name', 'description', seo.description)
    if (Array.isArray(seo.keywords) && seo.keywords.length) {
      setMeta('name', 'keywords', seo.keywords.join(', '))
    }

    const og = seo.og || {}
    setMeta('property', 'og:title', og.title || seo.title)
    setMeta('property', 'og:description', og.description || seo.description)
    setMeta('property', 'og:image', og.image)
    setMeta('property', 'og:type', 'website')
  },
  { immediate: true }
)

function openInvitation() {
  isOpen.value = true
}
</script>
