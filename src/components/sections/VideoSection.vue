<template>
  <div
    v-if="videoUrl"
    id="videoSectionContainer"
    class="items-center justify-center w-full h-screen overflow-hidden relative bg-black"
    data-section="video"
  >
    <iframe
      v-if="embedUrl"
      id="videoSectionEmbed"
      class="absolute top-0 left-0 w-full h-full object-cover border-0"
      :src="embedUrl"
      title="Wedding video"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; mute"
      allowfullscreen
    ></iframe>
    <video
      v-else
      id="videoSection"
      class="absolute top-0 left-0 w-full h-full object-cover"
      :src="videoUrl"
      loop
      muted
      controls
      autoplay
      playsinline
      webkit-playsinline
    ></video>
  </div>
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
.items-center {
  display: flex;
  align-items: center;
}
.justify-center {
  justify-content: center;
}
.w-full {
  width: 100%;
}
.h-screen {
  position: relative;
  width: 100%;
  height: calc(100vh / var(--scale-factor, 1) + 4px); /* Compensate for canvas scale factor and rounding gaps */
  backface-visibility: hidden;
  will-change: transform;
}
.overflow-hidden {
  overflow: hidden;
}
.relative {
  position: relative;
}
.absolute {
  position: absolute;
  backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
}
.top-0 {
  top: 0;
}
.left-0 {
  left: 0;
}
.h-full {
  height: 100%;
}
.object-cover {
  object-fit: cover;
}
.border-0 {
  border: 0;
}
.bg-black {
  background-color: #000;
}
</style>
