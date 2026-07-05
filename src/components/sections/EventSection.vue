<template>
  <section class="invitation-section invitation-section--events" data-section="events">
    <article
      v-for="evt in events"
      :key="evt.key"
      class="events-card"
      :style="{ top: evt.top + 'px' }"
    >
      <!-- Card background surface -->
      <div class="events-card-bg"></div>

      <!-- Circle bg behind card -->
      <img
        class="events-asset events-circle-bg"
        :src="img(evt.assets.circleBg)"
        alt=""
      />

      <!-- Wax seal -->
      <img
        class="events-asset events-wax-seal"
        :src="img(evt.assets.waxSeal)"
        alt=""
      />

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

        <img
          class="events-asset events-divider"
          :src="img(evt.assets.divider)"
          alt=""
        />

        <p class="events-location">{{ evt.location }}</p>
        <p class="events-address">{{ evt.address }}</p>
      </div>

      <button class="decor-button events-maps-button" type="button" disabled>Maps</button>
    </article>
  </section>
</template>

<script setup>
const img = (name) =>
  new URL(`../../assets/figma/${name}`, import.meta.url).href

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
