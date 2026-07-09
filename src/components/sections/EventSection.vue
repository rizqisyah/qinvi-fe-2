<template>
  <section
    class="invitation-section invitation-section--events"
    data-section="events"
    :style="{ height: sectionHeight + 'px' }"
  >
    <EventCard v-for="evt in events" :key="evt.key" :evt="evt" />
  </section>
</template>

<script setup>
import { computed } from 'vue'
import EventCard from './EventCard.vue'
import { useWedding } from '../../composables/useWedding'

// Vertical rhythm from the original static layout: first card at 120px, each
// following card 486px below.
const FIRST_TOP = 120
const CARD_GAP = 486
// Rendered height of a single card (matches the original 606px..1085px band).
const CARD_HEIGHT = 479

// The two Figma art presets (akad + resepsi). API events are mapped onto these
// by index; extra events reuse presets cyclically.
const PRESETS = [
  {
    title: 'Akad Nikah',
    foliageTop: 20,
    foliageSide: 'left',
    assets: {
      circleBg: 'events-circle-bg.png',
      waxSeal: 'events-wax-seal.png',
      foliage: 'events-foliage-akad-left.png',
      divider: 'events-divider1.png',
      deco1Left: 'events-deco1-akad-left.png',
      deco1Right: 'events-deco1-akad-right.png',
      flower1Left: 'events-flower1-akad-left.png',
      flower1Right: 'events-flower1-akad-right.png',
      deco2Left: 'events-deco2-akad-left.png',
      deco2Right: 'events-deco2-akad-right.png',
      circ1Left: 'events-circ1-akad-left.png',
      circ1Right: 'events-circ1-akad-right.png',
      deco3Left: 'events-deco3-akad-left.png',
      deco3Right: 'events-deco3-akad-right.png',
    },
  },
  {
    title: 'Resepsi',
    foliageTop: 37,
    foliageSide: 'right',
    assets: {
      circleBg: 'events-circle-bg-2.png',
      waxSeal: 'events-wax-seal-2.png',
      foliage: 'events-foliage-resep-right.png',
      divider: 'events-divider2.png',
      deco1Left: 'events-deco1-rsvp-left.png',
      deco1Right: 'events-deco1-rsvp-right.png',
      flower1Left: 'events-flower1-rsvp-left.png',
      flower1Right: 'events-flower1-rsvp-right.png',
      deco2Left: 'events-deco2-rsvp-left.png',
      deco2Right: 'events-deco2-rsvp-right.png',
      circ1Left: 'events-circ1-rsvp-left.png',
      circ1Right: 'events-circ1-rsvp-right.png',
      deco3Left: 'events-deco3-rsvp-left.png',
      deco3Right: 'events-deco3-rsvp-right.png',
    },
  },
]

// Fallback content shown when the API returns no events (keeps the design intact).
const FALLBACK = [
  {
    title: 'Akad Nikah',
    date: 'Saturday, 19 April 2029',
    time: '10.00 WIB - 12.00 WIB',
    location: 'Rumah mempelai wanita',
    address:
      'Jl. Melati Raya No. 27, RT 004/RW 006, Kelurahan Cikini, Kecamatan Menteng, Jakarta Pusat, DKI Jakarta 10330',
    mapsUrl: '',
  },
  {
    title: 'Resepsi',
    date: 'Saturday, 19 April 2029',
    time: '10.00 WIB - 12.00 WIB',
    location: 'Rumah mempelai wanita',
    address:
      'Jl. Melati Raya No. 27, RT 004/RW 006, Kelurahan Cikini, Kecamatan Menteng, Jakarta Pusat, DKI Jakarta 10330',
    mapsUrl: '',
  },
]

const { acara } = useWedding()

const events = computed(() => {
  const source = acara.value.length
    ? acara.value.map((a) => ({
        title: a.title,
        date: a.event_date,
        time: a.event_time,
        location: a.location_name,
        address: a.address,
        mapsUrl: a.maps_url || '',
      }))
    : FALLBACK

  return source.map((evt, index) => {
    const preset = PRESETS[index % PRESETS.length]
    return {
      key: `evt-${index}`,
      title: evt.title || preset.title,
      date: evt.date || '',
      time: evt.time || '',
      location: evt.location || '',
      address: evt.address || '',
      mapsUrl: evt.mapsUrl || '',
      top: FIRST_TOP + index * CARD_GAP,
      foliageTop: preset.foliageTop,
      foliageSide: preset.foliageSide,
      assets: preset.assets,
    }
  })
})

const sectionHeight = computed(
  () => FIRST_TOP + Math.max(0, events.value.length - 1) * CARD_GAP + CARD_HEIGHT
)
</script>
