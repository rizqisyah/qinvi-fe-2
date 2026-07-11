<template>
  <section
    v-if="videoUrl"
    id="videoSectionContainer"
    class="inv-section invitation-section invitation-section--video"
    data-section="video"
  >
    <div class="video-container">
      <iframe
        v-if="embedUrl"
        id="videoSectionEmbed"
        class="video-element"
        :src="embedUrl"
        title="Wedding video"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; mute"
        allowfullscreen
      ></iframe>
      <video
        v-else
        id="videoSection"
        class="video-element"
        :src="videoUrl"
        loop
        muted
        controls
        autoplay
        playsinline
        webkit-playsinline
      ></video>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useWedding } from '../../composables/useWedding'

const { wedding } = useWedding()

const videoUrl = computed(() => wedding.value?.video_url || '')

// Convert common share URLs into embeddable ones; anything else falls back to a
// native <video> element.
const embedUrl = computed(() => {
  const url = videoUrl.value
  if (!url) return ''

  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/)
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1&mute=1&playsinline=1&loop=1&playlist=${yt[1]}`

  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1&muted=1&loop=1`

  return ''
})
</script>

<style scoped>
.invitation-section--video {
  width: 100%;
  height: 79vh;
  overflow: hidden;
  position: relative;
  background: #000;
}

.video-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-element {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 0;
}
</style>
