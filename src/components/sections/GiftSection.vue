<template>
  <section
    ref="rootRef"
    class="invitation-section invitation-section--gift reveal-on-scroll"
    :class="{ 'in-view': inView }"
    data-section="gift"
  >
    <!-- Figma composite: card + edge ornaments + separator -->
    <img class="gift-decor" :src="img('gift-decor.png')" alt="" />

    <!-- Title "Wedding Gift" below divider -->
    <h2 class="script-heading gift-title">Wedding Gift</h2>

    <!-- Description -->
    <p class="text-body gift-description">Bagi yang ingin memberikan tanda kasih, dapat mengirimkan melalui fitur di bawah ini:</p>

    <!-- BCA Logo -->
    <img class="gift-bca-logo" :src="img('gift-bca-logo.png')" alt="BCA" />

    <!-- Rekening -->
    <p class="gift-rekening">No. Rekening : 8715154435</p>
    <p class="gift-an">A/n Muhammad Arif</p>

    <button class="decor-button copy-button" type="button" disabled>Copy text</button>
  </section>
</template>

<script setup>
import { useScrollReveal } from '../../composables/useScrollReveal'

const { rootRef, inView } = useScrollReveal()

const img = (name) =>
  new URL(`../../assets/figma/${name}`, import.meta.url).href
</script>
