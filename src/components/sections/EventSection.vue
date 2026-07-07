<template>
  <section class="invitation-section invitation-section--events" data-section="events">
    <EventCard v-for="evt in events" :key="evt.key" :evt="evt" />
  </section>
</template>

<script setup>
import EventCard from './EventCard.vue'

const events = [
  {
    key: 'akad',
    title: 'Akad Nikah',
    date: 'Saturday, 19 April 2029',
    time: '10.00 WIB - 12.00 WIB',
    location: 'Rumah mempelai wanita',
    address:
      'Jl. Melati Raya No. 27, RT 004/RW 006, Kelurahan Cikini, Kecamatan Menteng, Jakarta Pusat, DKI Jakarta 10330',
    top: 120,
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
    key: 'resep',
    title: 'Resepsi',
    date: 'Saturday, 19 April 2029',
    time: '10.00 WIB - 12.00 WIB',
    location: 'Rumah mempelai wanita',
    address:
      'Jl. Melati Raya No. 27, RT 004/RW 006, Kelurahan Cikini, Kecamatan Menteng, Jakarta Pusat, DKI Jakarta 10330',
    top: 606,
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
</script>
