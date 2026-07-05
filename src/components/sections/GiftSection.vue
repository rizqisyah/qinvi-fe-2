<template>
  <section class="invitation-section invitation-section--gift" data-section="gift">
    <!-- Decorative flowers (outside card, absolute in section) -->
    <img class="gift-flower gift-flower-tr" :src="img('gift-flower-tr.png')" alt="" />
    <img class="gift-flower gift-flower-tl" :src="img('gift-flower-tl.png')" alt="" />
    <img class="gift-flower gift-flower-mr" :src="img('gift-flower-mr.png')" alt="" />
    <img class="gift-flower gift-flower-ml" :src="img('gift-flower-ml.png')" alt="" />
    <img class="gift-flower gift-flower-br" :src="img('gift-flower-br.png')" alt="" />
    <img class="gift-flower gift-flower-bl" :src="img('gift-flower-bl.png')" alt="" />

    <img class="gift-flower2 gift-flower2-mr" :src="img('gift-flower2-mr.png')" alt="" />
    <img class="gift-flower2 gift-flower2-ml" :src="img('gift-flower2-ml.png')" alt="" />

    <!-- White card wrapper -->
    <div class="gift-card">
      <!-- Divider -->
      <img class="gift-divider" :src="img('gift-divider.png')" alt="" />

      <!-- Title -->
      <h2 class="gift-title">Wedding Gift</h2>

      <!-- Description -->
      <p class="gift-description">Bagi yang ingin memberikan tanda kasih, dapat mengirimkan melalui fitur di bawah ini:</p>

      <!-- BCA Logo -->
      <img class="gift-bca-logo" :src="img('gift-bca-logo.png')" alt="BCA" />

      <!-- Rekening info -->
      <div class="gift-rekening-wrap">
        <p class="gift-rekening">No. Rekening : 8715154435</p>
        <p class="gift-an">A/n Muhammad Arif</p>
      </div>

      <!-- Copy button -->
      <button class="gift-copy-button" type="button" disabled>Copy text</button>
    </div>
  </section>
</template>

<script setup>
const img = (name) =>
  new URL(`../../assets/figma/${name}`, import.meta.url).href
</script>
