<template>
  <div class="invitation-canvas" :class="{ 'is-locked': isLocked }" aria-label="Antonio and Ayu wedding invitation">
    <Transition name="splash" @after-leave="onSplashLeave">
      <SplashScreen v-if="!isOpen" @open="openInvitation" />
    </Transition>

    <!-- v-show keeps sections pre-rendered in the DOM so opening the
         invitation never triggers a sudden layout reflow (flicker).
         The wrapper fades in via CSS opacity once contentVisible is true. -->
    <div
      v-show="isOpen"
      class="invitation-content"
      :class="{ 'is-visible': contentVisible }"
    >
      <VideoSection v-if="wedding?.video_url" />
      <HeroSection :is-ready="isHeroReady" :is-open="true" />
      <QuranSection />
      <CoupleSection />
      <SaveDateSection />
      <EventSection />
      <GiftSection v-if="rekening && rekening.length > 0" />
      <RsvpSection />
      <WishesSection />
      <GallerySection />
      <FooterSection />
    </div>

    <!-- Keep BottomNav outside invitation-content to avoid CSS transform position:fixed containment bug -->
    <BottomNav v-if="isOpen" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
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
import BottomNav from './sections/BottomNav.vue'

const isOpen = ref(false)
const isLocked = ref(true)
const isHeroReady = ref(false)
const contentVisible = ref(false)
const { load, wedding, rekening } = useWedding()

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

async function openInvitation() {
  isOpen.value = true
  // Wait for the DOM to update (v-show renders the sections) then fade in
  // on the next animation frame so the splash transition is already running
  // before the content becomes visible — eliminates the flicker.
  await nextTick()
  requestAnimationFrame(() => {
    contentVisible.value = true
  })
  // Trigger Hero reveal animations after cover starts fading out
  setTimeout(() => {
    isHeroReady.value = true
  }, 250)
}

function onSplashLeave() {
  isLocked.value = false
}
</script>
