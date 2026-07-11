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
      <h2 class="script-heading">{{ heading }}</h2>
      <p v-if="parts.arabic" class="arabic-copy">{{ parts.arabic }}</p>
      <p class="text-body quran-copy">&ldquo;{{ parts.translation }}&rdquo;</p>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useScrollReveal } from '../../composables/useScrollReveal'
import { useWedding } from '../../composables/useWedding'

const { rootRef, inView } = useScrollReveal()
const { quoteText, quoteVerse } = useWedding()

const FALLBACK_HEADING = 'QS Ar-Rum 21'

const DEFAULT_ARABIC = 'وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَرَحْمَةًۗ اِنَّ فِيْ ذٰلِكَ Lَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ'
const DEFAULT_TRANSLATION = 'Di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda kebesaran Allah bagi kaum yang berpikir.'

// Intelligently parse quoteText to allow only translation to be customized 
// without breaking the Arabic display.
const parts = computed(() => {
  const text = quoteText.value?.trim()
  if (!text) {
    return {
      arabic: DEFAULT_ARABIC,
      translation: DEFAULT_TRANSLATION
    }
  }

  // Regex to detect if text contains Arabic characters
  const arabicRegex = /[\u0600-\u06FF]/
  const lines = text.split('\n').map((line) => line.trim()).filter(Boolean)

  // Case 1: Multiple lines where the first line contains Arabic text
  if (lines.length >= 2 && arabicRegex.test(lines[0])) {
    return {
      arabic: lines[0],
      translation: lines.slice(1).join('\n')
    }
  }

  // Case 2: Only translation is provided (or no Arabic in first line)
  return {
    arabic: '',
    translation: text
  }
})

const heading = computed(() => {
  const verse = quoteVerse.value?.trim()
  if (!verse) return FALLBACK_HEADING
  
  // If it already starts with "QS" (case-insensitive), display it as-is
  if (/^qs/i.test(verse)) {
    return verse
  }
  
  // Otherwise, prepend "QS " for formatting consistency
  return `${verse}`
})
</script>
