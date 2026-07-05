<template>
  <section
    class="inv-section invitation-section invitation-section--hero"
    :class="{ 'is-ready': isReady, 'is-open': isOpen }"
    data-section="hero"
  >
    <img class="hero-asset hero-home-1" src="../../assets/figma/hero-home-1.png" alt="" />
    <img class="hero-asset hero-extra-right" src="../../assets/figma/hero-extra-right.png" alt="" />
    <img class="hero-asset hero-home-2" src="../../assets/figma/hero-home-2.png" alt="" />
    <img class="hero-asset hero-arch" src="../../assets/figma/hero-arch.png" alt="" />
    <img class="hero-asset hero-medallion" src="../../assets/figma/hero-medallion.png" alt="" />
    <img class="hero-asset hero-wreath" src="../../assets/figma/hero-wreath.png" alt="" />
    <img class="hero-asset hero-top-ornament" src="../../assets/figma/hero-top-ornament.png" alt="" />
    <img class="hero-asset hero-flower-left" src="../../assets/figma/hero-flower-left.png" alt="" />
    <img class="hero-asset hero-flower-right" src="../../assets/figma/hero-flower-right.png" alt="" />
    <img class="hero-asset hero-side-flower-right" src="../../assets/figma/hero-side-flower-right.png" alt="" />
    <img class="hero-asset hero-side-flower-left" src="../../assets/figma/hero-side-flower-left.png" alt="" />
    <img class="hero-asset hero-lantern-left" src="../../assets/figma/hero-lantern-left.png" alt="" />
    <img class="hero-asset hero-lantern-right" src="../../assets/figma/hero-lantern-right.png" alt="" />
    <img class="hero-asset hero-leaf-right" src="../../assets/figma/hero-leaf-right.png" alt="" />
    <img class="hero-asset hero-leaf-left" src="../../assets/figma/hero-leaf-left.png" alt="" />
    <img class="hero-asset hero-leaf-left-back" src="../../assets/figma/hero-leaf-left-back.png" alt="" />
    <img class="hero-asset hero-leaf-right-back" src="../../assets/figma/hero-leaf-right-back.png" alt="" />
    <img class="hero-asset hero-palm-left" src="../../assets/figma/hero-palm-left.png" alt="" />
    <img class="hero-asset hero-palm-right" src="../../assets/figma/hero-palm-right.png" alt="" />
    <img class="hero-asset hero-small-flower-right" src="../../assets/figma/hero-small-flower-right.png" alt="" />
    <img class="hero-asset hero-small-flower-left" src="../../assets/figma/hero-small-flower-left.png" alt="" />
    <img class="hero-asset hero-title-script" src="../../assets/figma/hero-title-script.png" alt="The Wedding Of" />
    <img class="hero-asset hero-dot-left" src="../../assets/figma/hero-dot-left.png" alt="" />
    <img class="hero-asset hero-dot-right" src="../../assets/figma/hero-dot-right.png" alt="" />
    <img class="hero-asset hero-bud-right" src="../../assets/figma/hero-bud-right.png" alt="" />
    <img class="hero-asset hero-bud-left" src="../../assets/figma/hero-bud-left.png" alt="" />

    <button v-if="!isOpen" class="hero-open-button" type="button" @click="$emit('open')">
      Buka Undangan
    </button>
  </section>
</template>

<script setup>
defineProps({
  isReady: {
    type: Boolean,
    default: false,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['open'])
</script>
