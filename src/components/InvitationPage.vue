<template>
  <div class="invitation-canvas" :class="{ 'is-locked': isLocked || state.error }" aria-label="Antonio and Ayu wedding invitation">
    <!-- Error/Restricted State Overlay -->
    <div v-if="state.error" class="restricted-overlay">
      <div class="restricted-box">
        <div class="restricted-icon">🔒</div>
        <h2 class="restricted-title">Akses Terbatas</h2>
        <p class="restricted-message">{{ state.error }}</p>
      </div>
    </div>

    <template v-else>
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
    </template>
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
const { load, wedding, guest, rekening, state } = useWedding()

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
  [wedding, guest],
  ([w, g]) => {
    if (!w) return

    // 1. Title Resolution
    let resolvedTitle = w.title
    if (g && g.custom_og_title) {
      resolvedTitle = g.custom_og_title
    } else if (g && g.guest_name) {
      const parentTitle = w.seo_settings?.title || w.title
      resolvedTitle = `${parentTitle}`
    } else if (w.seo_settings?.title) {
      resolvedTitle = w.seo_settings.title
    }
    document.title = resolvedTitle

    // 2. Description Resolution
    let resolvedDescription = `Undangan Pernikahan untuk menghadiri acara ${w.title}`
    if (g && g.custom_og_description) {
      resolvedDescription = g.custom_og_description
    } else if (w.seo_settings?.description) {
      resolvedDescription = w.seo_settings.description
    } else if (w.seo_settings?.og?.description) {
      resolvedDescription = w.seo_settings.og.description
    }
    setMeta('name', 'description', resolvedDescription)

    // 3. Image Resolution
    let resolvedImage = w.image_cover || ''
    if (g && g.custom_og_image) {
      resolvedImage = g.custom_og_image
    } else if (w.seo_settings?.og?.image) {
      resolvedImage = w.seo_settings.og.image
    } else if (w.seo_settings?.twitter?.image) {
      resolvedImage = w.seo_settings.twitter.image
    }
    setMeta('property', 'og:image', resolvedImage)
    setMeta('name', 'twitter:image', resolvedImage)

    // 4. Keywords Resolution
    let resolvedKeywords = `wedding, invitation, pernikahan, ${w.title}`
    if (Array.isArray(w.seo_settings?.keywords)) {
      resolvedKeywords = w.seo_settings.keywords.join(', ')
    }
    setMeta('name', 'keywords', resolvedKeywords)

    // 5. Other Meta
    setMeta('property', 'og:title', resolvedTitle)
    setMeta('property', 'og:description', resolvedDescription)
    setMeta('property', 'og:type', 'website')
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', resolvedTitle)
    setMeta('name', 'twitter:description', resolvedDescription)
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
