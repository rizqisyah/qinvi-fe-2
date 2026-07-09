<template>
  <section
    v-if="videoUrl"
    ref="rootRef"
    class="inv-section invitation-section invitation-section--video reveal-on-scroll"
    :class="{ 'in-view': inView }"
    data-section="video"
  >
    <h2 class="script-heading video-title">Our Moment</h2>

    <div class="video-frame">
      <iframe
        v-if="embedUrl"
        class="video-embed"
        :src="embedUrl"
        title="Wedding video"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <video v-else class="video-embed" :src="videoUrl" controls playsinline></video>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useScrollReveal } from '../../composables/useScrollReveal'
import { useWedding } from '../../composables/useWedding'

const { rootRef, inView } = useScrollReveal()
const { wedding } = useWedding()

const videoUrl = computed(() => wedding.value?.video_url || '')

// Convert common share URLs into embeddable ones; anything else falls back to a
// native <video> element.
const embedUrl = computed(() => {
  const url = videoUrl.value
  if (!url) return ''

  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/)
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`

  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`

  return ''
})
</script>

<style scoped>
.invitation-section--video {
  padding: 40px 0 48px;
  text-align: center;
}

.video-title {
  margin: 0 0 20px;
  font-family: var(--font-script);
  font-size: 44px;
  color: #844711;
}

.video-frame {
  width: 320px;
  margin: 0 auto;
  aspect-ratio: 16 / 9;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  background: #000;
}

.video-embed {
  width: 100%;
  height: 100%;
  display: block;
  border: 0;
  object-fit: cover;
}
</style>
