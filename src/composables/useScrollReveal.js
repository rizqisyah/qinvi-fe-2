import { ref, onMounted, onBeforeUnmount } from 'vue'

/**
 * Reveal-on-scroll trigger.
 *
 * `rootMargin` trims the bottom of the viewport so a section only fires once the
 * user has actually scrolled down to it — not the instant its top peeks in. This
 * matters when sections sit close together (e.g. Quran right under the hero):
 * with a plain threshold the reveal would play while the user is still on the
 * hero and be over before they arrive.
 *
 * @param {number|{threshold?: number, rootMargin?: string}} [options]
 */
export function useScrollReveal(options = {}) {
  const { threshold = 0.1, rootMargin = '0px 0px -30% 0px' } =
    typeof options === 'number' ? { threshold: options } : options
  const rootRef = ref(null)
  const inView = ref(false)
  let observer

  onMounted(() => {
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          inView.value = true
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )
    if (rootRef.value) observer.observe(rootRef.value)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })

  return { rootRef, inView }
}
