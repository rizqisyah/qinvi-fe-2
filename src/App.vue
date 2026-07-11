<template>
  <main class="app-shell" :style="{ '--scale-factor': scaleFactor, '--locked-height': lockedHeight }">
    <!-- Left Column (Desktop Only) - Always rendered to prevent layout shifts -->
    <div class="desktop-left-column" :style="leftBackgroundStyle">
      <div class="left-overlay"></div>
      <div class="left-content" v-if="wedding">
        <div class="left-header">
          <p class="left-subtitle">{{ words?.the_wedding_of || 'The Wedding Of' }}</p>
          <h1 class="left-title">{{ coupleNickname }}</h1>
        </div>
        <div class="left-quote-container" v-if="quoteText">
          <p class="left-quote">“{{ quoteText }}”</p>
          <span class="left-quote-verse" v-if="quoteVerse">{{ quoteVerse }}</span>
        </div>
      </div>
    </div>

    <!-- Right Column / Main Canvas - 480px width to match fe-clevert-ivana -->
    <div class="desktop-right-column">
      <InvitationPage />
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useWedding } from './composables/useWedding'
import InvitationPage from './components/InvitationPage.vue'

const { wedding, coupleNickname, quoteText, quoteVerse } = useWedding()

const scaleFactor = ref(1)
const lockedHeight = ref('100vh')

function updateScale() {
  const width = document.documentElement.clientWidth
  const height = window.innerHeight
  if (width < 768) {
    scaleFactor.value = width / 375
    lockedHeight.value = `${height / scaleFactor.value}px`
  } else {
    scaleFactor.value = 1.28
    lockedHeight.value = `${height / 1.28}px`
  }
}

onMounted(async () => {
  updateScale()
  // Wait for layout to settle and run again
  setTimeout(updateScale, 100)
  window.addEventListener('resize', updateScale)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScale)
})

const leftBackgroundStyle = computed(() => {
  const img = wedding.value?.image_bg1 || wedding.value?.image_cover || 'https://ik.imagekit.io/AdminQinvi2/3d/3d/AdliJoya/BAE_7289.webp?updatedAt=1743676227985'
  return { backgroundImage: `url(${img})` }
})

const words = computed(() => wedding.value?.theme_override?.words || null)
</script>

<style>
/* Reset and global layout settings */
@media (min-width: 768px) {
  .app-shell {
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    align-items: stretch;
    background: #1a1a1a;
  }

  .desktop-left-column {
    display: flex;
    flex: 1;
    height: 100vh;
    position: relative;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: #111; /* Fallback background color to prevent flash of empty space */
    color: #fff;
    overflow: hidden;
    transition: background-image 0.5s ease-in-out;
  }

  .left-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }

  .left-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    padding: 60px;
    animation: left-fade-in 0.8s ease-out forwards;
  }

  @keyframes left-fade-in {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .left-subtitle {
    font-size: 14px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    opacity: 0.9;
    margin: 0 0 16px 0;
    font-family: var(--font-playfair-sc), serif;
  }

  .left-title {
    font-size: 64px;
    line-height: 1.2;
    margin: 0;
    font-family: var(--font-script), cursive;
    font-weight: normal;
  }

  .left-quote-container {
    max-width: 480px;
    margin-top: auto;
    margin-bottom: 40px;
  }

  .left-quote {
    font-size: 15px;
    font-style: italic;
    line-height: 1.6;
    margin: 0 0 12px 0;
    opacity: 0.9;
    font-family: var(--font-overlock), sans-serif;
  }

  .left-quote-verse {
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 0.05em;
    opacity: 0.8;
    text-transform: uppercase;
    font-family: var(--font-jost), sans-serif;
  }

  .desktop-right-column {
    width: 480px;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    background: #fffed6; /* Matches the splash screen default background to prevent loading flash */
    box-shadow: -8px 0 32px rgba(0, 0, 0, 0.3);
  }

  /* Zoom canvas to 480px width on desktop (375 * 1.28 = 480) with auto height */
  .invitation-canvas {
    width: 375px !important;
    height: auto !important;
    zoom: 1.28 !important;
    margin: 0 auto !important;
    box-shadow: none !important;
  }

  /* When locked (splash showing), canvas fills viewport without zoom so cover
     flowers can extend to full viewport width — same approach as mobile. */
  .invitation-canvas.is-locked {
    width: 100vw !important;
    height: 100svh !important;
    overflow: visible !important;
    zoom: 1 !important;
    margin: 0 !important;
    box-shadow: none !important;
  }

  .invitation-canvas.is-locked .cover-root {
    position: fixed !important;
    inset: 0 !important;
    width: 100vw !important;
    max-width: 100vw !important;
    height: 100svh !important;
    overflow: hidden !important;
    background: #fffed6 !important;
    z-index: 9999 !important;
    margin: 0 !important;
  }

  /* Center the fixed bottom-nav inside the zoomed 375px space (half width is 187.5px) */
  .bottom-nav {
    left: auto !important;
    right: 187.5px !important;
    transform: translateX(50%) !important;
  }
}

@media (max-width: 767px) {
  html,
  body {
    background: #fff7d7 !important;
    overflow-x: hidden !important;
    width: 100% !important;
  }

  .app-shell {
    width: 100% !important;
    overflow-x: hidden !important;
  }

  .desktop-left-column {
    display: none;
  }

  .desktop-right-column {
    width: 100% !important;
    overflow-x: hidden !important;
  }

  /* Zoom the 375px canvas to fill the mobile screen width edge-to-edge once opened with auto height */
  .invitation-canvas {
    width: 375px !important;
    height: auto !important;
    zoom: var(--scale-factor, 1) !important;
    margin: 0 auto !important;
    box-shadow: none !important;
  }

  /* When locked, canvas fills viewport with zoom=1 so cover flowers aren't clipped by zoom coordinate system */
  .invitation-canvas.is-locked {
    width: 100vw !important;
    height: 100svh !important;
    overflow: hidden !important;
    zoom: 1 !important;
  }

  .invitation-canvas.is-locked .cover-root {
    width: 100vw !important;
    max-width: 100vw !important;
    height: 100% !important;
    overflow: visible !important;
  }
}

/* Smooth slide-up + fade-out for the cover/splash screen */
.splash-leave-active {
  transition:
    opacity 0.85s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.85s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.splash-leave-to {
  opacity: 0 !important;
  transform: translateY(-6%) scale(0.97) !important;
}
</style>
