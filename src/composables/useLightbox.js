import { ref } from 'vue'

// Shared so floating chrome (the bottom nav) can get out of the way while a
// fullscreen overlay is up — its backdrop is translucent, so anything left
// underneath still shows through.
const lightboxOpen = ref(false)

export function useLightbox() {
  return { lightboxOpen }
}
