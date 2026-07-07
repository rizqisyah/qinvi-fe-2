<template>
  <article
    ref="rootRef"
    class="events-card reveal-on-scroll"
    :class="{ 'in-view': inView }"
    :style="{ top: evt.top + 'px' }"
  >
    <!-- Card background surface -->
    <div class="events-card-bg"></div>

    <!-- Circle bg behind card -->
    <img class="events-asset events-circle-bg" :src="img(evt.assets.circleBg)" alt="" />

    <!-- Wax seal -->
    <img class="events-asset events-wax-seal" :src="img(evt.assets.waxSeal)" alt="" />

    <!-- Foliage (left for akad, right for resepsi) -->
    <img
      class="events-asset events-foliage"
      :class="'events-foliage--' + evt.foliageSide"
      :src="img(evt.assets.foliage)"
      alt=""
      :style="{ top: evt.foliageTop + 'px' }"
    />

    <!-- Decorative overlay pair 1 -->
    <img class="events-asset events-deco1-left" :src="img(evt.assets.deco1Left)" alt="" />
    <img class="events-asset events-deco1-right" :src="img(evt.assets.deco1Right)" alt="" />

    <!-- Decorative overlay pair flower1 -->
    <img class="events-asset events-flower1-left" :src="img(evt.assets.flower1Left)" alt="" />
    <img class="events-asset events-flower1-right" :src="img(evt.assets.flower1Right)" alt="" />

    <!-- Decorative overlay pair 2 -->
    <img class="events-asset events-deco2-left" :src="img(evt.assets.deco2Left)" alt="" />
    <img class="events-asset events-deco2-right" :src="img(evt.assets.deco2Right)" alt="" />

    <!-- Circular decorative overlay pair -->
    <img class="events-asset events-circ1-left" :src="img(evt.assets.circ1Left)" alt="" />
    <img class="events-asset events-circ1-right" :src="img(evt.assets.circ1Right)" alt="" />

    <!-- Decorative overlay pair 3 -->
    <img class="events-asset events-deco3-left" :src="img(evt.assets.deco3Left)" alt="" />
    <img class="events-asset events-deco3-right" :src="img(evt.assets.deco3Right)" alt="" />

    <!-- Text content wrapper -->
    <div class="events-text-wrap">
      <h2 class="script-heading events-title">{{ evt.title }}</h2>
      <p class="events-date">{{ evt.date }}</p>
      <p class="events-time">{{ evt.time }}</p>

      <img class="events-asset events-divider" :src="img(evt.assets.divider)" alt="" />

      <p class="events-location">{{ evt.location }}</p>
      <p class="events-address">{{ evt.address }}</p>
    </div>

    <button class="decor-button events-maps-button" type="button" disabled>Maps</button>
  </article>
</template>

<script setup>
import { useScrollReveal } from '../../composables/useScrollReveal'

defineProps({
  evt: {
    type: Object,
    required: true,
  },
})

const { rootRef, inView } = useScrollReveal()

const img = (name) => new URL(`../../assets/figma/${name}`, import.meta.url).href
</script>
