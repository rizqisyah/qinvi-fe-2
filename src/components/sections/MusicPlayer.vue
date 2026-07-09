<template>
  <div v-if="musicUrl" class="music-player">
    <audio ref="audioEl" :src="musicUrl" loop preload="auto" @timeupdate="onTimeUpdate" />
    <button
      class="music-toggle"
      :class="{ 'is-playing': playing }"
      type="button"
      :aria-label="playing ? 'Pause music' : 'Play music'"
      @click="toggle"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M12 3v9.28a4 4 0 1 0 2 3.47V7h4V3h-6Z" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useWedding } from '../../composables/useWedding'

const { wedding } = useWedding()

const musicUrl = computed(() => wedding.value?.music_url || '')
const musicStart = computed(() => Number(wedding.value?.music_start) || 0)
const musicEnd = computed(() => Number(wedding.value?.music_end) || 0)

const audioEl = ref(null)
const playing = ref(false)

async function play() {
  const el = audioEl.value
  if (!el) return
  if (musicStart.value) el.currentTime = musicStart.value
  try {
    await el.play()
    playing.value = true
  } catch {
    // Autoplay blocked; stays paused until the user taps the toggle.
    playing.value = false
  }
}

function toggle() {
  const el = audioEl.value
  if (!el) return
  if (playing.value) {
    el.pause()
    playing.value = false
  } else {
    play()
  }
}

// Restart the loop segment when a music_end boundary is set.
function onTimeUpdate() {
  const el = audioEl.value
  if (!el || !musicEnd.value) return
  if (el.currentTime >= musicEnd.value) {
    el.currentTime = musicStart.value || 0
  }
}

onMounted(() => {
  // The invitation only mounts after the user taps "Open", which counts as a
  // gesture, so autoplay with sound is generally allowed here.
  play()
})

onBeforeUnmount(() => {
  audioEl.value?.pause()
})
</script>

<style scoped>
.music-player {
  position: fixed;
  right: 16px;
  bottom: 80px;
  z-index: 60;
}

.music-toggle {
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 50%;
  background: linear-gradient(135deg, #d4af37, #b8860b);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25);
}

.music-toggle.is-playing {
  animation: music-spin 4s linear infinite;
}

@keyframes music-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
