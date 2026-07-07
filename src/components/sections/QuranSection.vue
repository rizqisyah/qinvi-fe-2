<template>
  <section
    ref="rootRef"
    class="inv-section invitation-section invitation-section--quran reveal-on-scroll"
    :class="{ 'in-view': inView }"
    data-section="quran"
  >
    <img class="quran-asset quran-card" src="../../assets/figma/quran-card.png" alt="" />
    <img class="quran-asset quran-seal" src="../../assets/figma/quran-seal.png" alt="" />
    <img class="quran-asset quran-lantern quran-lantern-left" src="../../assets/figma/quran-lantern-left.png" alt="" />
    <img class="quran-asset quran-lantern quran-lantern-right" src="../../assets/figma/quran-lantern-right.png" alt="" />
    <img class="quran-asset quran-foliage quran-foliage-left-back" src="../../assets/figma/quran-foliage-left-back.png" alt="" />
    <img class="quran-asset quran-foliage quran-foliage-right-back" src="../../assets/figma/quran-foliage-right-back.png" alt="" />
    <img class="quran-asset quran-flower quran-flower-left" src="../../assets/figma/quran-flower-left.png" alt="" />
    <img class="quran-asset quran-flower quran-flower-right" src="../../assets/figma/quran-flower-right.png" alt="" />
    <img class="quran-asset quran-divider" src="../../assets/figma/quran-divider.png" alt="" />

    <div class="quran-text-wrap">
      <h2 class="script-heading">QS Ar-Rum 21</h2>
      <p class="arabic-copy">
        وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةًۗ اِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ
      </p>
      <p class="text-body quran-copy">
        “Di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda kebesaran Allah bagi kaum yang berpikir.”
      </p>
    </div>
  </section>
</template>

<script setup>
import { useScrollReveal } from '../../composables/useScrollReveal'

const { rootRef, inView } = useScrollReveal()
</script>
