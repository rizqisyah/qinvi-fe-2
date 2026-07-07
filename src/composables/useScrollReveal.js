import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useScrollReveal(threshold = 0.2) {
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
      { threshold }
    )
    if (rootRef.value) observer.observe(rootRef.value)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })

  return { rootRef, inView }
}
