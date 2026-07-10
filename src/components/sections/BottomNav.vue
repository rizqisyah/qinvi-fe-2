<template>
  <nav
    class="bottom-nav"
    :class="{ 'is-hidden': lightboxOpen }"
    :inert="lightboxOpen || undefined"
    aria-label="Navigasi bagian undangan"
  >
    <ul class="bottom-nav-list">
      <li v-for="item in ITEMS" :key="item.section" class="bottom-nav-item">
        <button
          class="bottom-nav-link"
          :class="{ 'is-active': active === item.section }"
          type="button"
          :aria-current="active === item.section ? 'true' : undefined"
          @click="goTo(item.section)"
        >
          <svg
            class="bottom-nav-icon"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <template v-if="item.section === 'hero'">
              <path d="M1.3 13.3 12 2.7l10.7 10.6" />
              <path d="M4 12.5v7.5a1.3 1.3 0 0 0 1.3 1.3h13.4a1.3 1.3 0 0 0 1.3-1.3v-7.5" />
              <path d="M9 21.3v-6.7a1.3 1.3 0 0 1 1.3-1.3h3.4a1.3 1.3 0 0 1 1.3 1.3v6.7" />
            </template>

            <template v-else-if="item.section === 'couple'">
              <circle cx="5.5" cy="5" r="2.8" />
              <circle cx="18.5" cy="5" r="2.8" />
              <rect x="1.7" y="11.6" width="7.6" height="10.2" rx="2" />
              <rect x="14.7" y="11.6" width="7.6" height="10.2" rx="2" />
            </template>

            <template v-else-if="item.section === 'events'">
              <path d="M8 2v3" />
              <path d="M16 2v3" />
              <rect x="3" y="4" width="18" height="18" rx="3" />
              <path d="M8 12h.01" />
              <path d="M12 12h.01" />
              <path d="M16 12h.01" />
              <path d="M8 16h.01" />
              <path d="M12 16h.01" />
            </template>

            <template v-else>
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <circle cx="15" cy="9" r="2" />
              <path d="m3 15 3.1-3.1a2 2 0 0 1 2.8 0L18 21" />
            </template>
          </svg>
          <span class="bottom-nav-label">{{ item.label }}</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useLightbox } from '../../composables/useLightbox'

// The gallery lightbox's backdrop is translucent, so the pill would ghost
// through it unless it steps aside.
const { lightboxOpen } = useLightbox()

// Each entry points at a `data-section` slab already rendered on the page.
const ITEMS = [
  { section: 'hero', label: 'Home' },
  { section: 'couple', label: 'Mempelai' },
  { section: 'events', label: 'Acara' },
  { section: 'gallery', label: 'Gallery' },
]

// Fraction of the viewport a section must have scrolled past to become active.
const ACTIVE_LINE = 0.35

const active = ref(ITEMS[0].section)

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function sectionEl(section) {
  return document.querySelector(`[data-section="${section}"]`)
}

function goTo(section) {
  const el = sectionEl(section)
  if (!el) return
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
}

// An IntersectionObserver would blank out over the sections that have no nav
// entry (quran, gift, rsvp...), so instead highlight the last entry scrolled past.
function syncActive() {
  const line = window.scrollY + window.innerHeight * ACTIVE_LINE
  let current = ITEMS[0].section
  for (const item of ITEMS) {
    const el = sectionEl(item.section)
    if (el && el.getBoundingClientRect().top + window.scrollY <= line) current = item.section
  }
  active.value = current
}

let frame = 0

function onScroll() {
  if (frame) return
  frame = requestAnimationFrame(() => {
    frame = 0
    syncActive()
  })
}

onMounted(() => {
  syncActive()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  if (frame) cancelAnimationFrame(frame)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  left: 50%;
  bottom: calc(16px + env(safe-area-inset-bottom, 0px));
  z-index: 70;
  width: 343px;
  max-width: calc(100vw - 32px);
  transform: translateX(-50%);
  border-radius: 30px;
  background: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: opacity 0.2s ease;
  /* `backwards`, not `both`: a filled-forwards animation would pin opacity at 1
     and outrank the `.is-hidden` rule below. */
  animation: bottom-nav-in 0.5s 0.3s cubic-bezier(0.16, 1, 0.3, 1) backwards;
}

.bottom-nav.is-hidden {
  opacity: 0;
  pointer-events: none;
}

.bottom-nav-list {
  display: flex;
  height: 60px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.bottom-nav-item {
  flex: 1;
  min-width: 0;
}

.bottom-nav-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 100%;
  /* Nudges the icon + label block up so it sits where the Figma art had it. */
  padding: 0 0 2px;
  border: 0;
  border-radius: 30px;
  background: none;
  color: #bbb0a4;
  font-family: var(--font-jost);
  cursor: pointer;
  transition: color 0.2s ease, transform 0.2s ease;
}

.bottom-nav-link:hover {
  color: #8d7f70;
}

.bottom-nav-link:active {
  transform: scale(0.94);
}

.bottom-nav-link:focus-visible {
  outline: 2px solid #55391c;
  outline-offset: -3px;
}

.bottom-nav-link.is-active {
  color: #55391c;
}

.bottom-nav-label {
  overflow: hidden;
  font-size: 12px;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.01em;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bottom-nav-link.is-active .bottom-nav-label {
  font-weight: 600;
}

@keyframes bottom-nav-in {
  from {
    opacity: 0;
    transform: translate(-50%, 24px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .bottom-nav {
    animation: none;
  }

  .bottom-nav-link {
    transition: none;
  }

  .bottom-nav-link:active {
    transform: none;
  }
}
</style>
