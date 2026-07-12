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

const { acara, isEnglish } = useWedding()

function formatEventDate(dateStr) {
  if (!dateStr) return { hari: '', tanggal: '' }
  const d = new Date(dateStr)
  if (!isNaN(d.getTime())) {
    const locale = isEnglish.value ? 'en-US' : 'id-ID'
    const formatted = d.toLocaleDateString(locale, {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
    const parts = formatted.split(',')
    if (isEnglish.value) {
      return {
        hari: parts[0]?.trim() || '',
        tanggal: `${parts[1]?.trim() || ''}, ${parts[2]?.trim() || ''}`,
      }
    }
    return {
      hari: parts[0]?.trim() || '',
      tanggal: parts[1]?.trim() || '',
    }
  }
  if (dateStr.includes(',')) {
    const parts = dateStr.split(',')
    return {
      hari: parts[0]?.trim() || '',
      tanggal: parts[1]?.trim() || '',
    }
  }
  return {
    hari: '',
    tanggal: dateStr,
  }
}

function formatSingleTime(t) {
  const parts = t.split(':')
  if (parts.length >= 2) {
    return `${parts[0]}:${parts[1]}`
  }
  return t
}

function formatEventTime(timeStr) {
  if (!timeStr) return ''
  const rangeSeparator = timeStr.includes('|')
    ? '|'
    : timeStr.includes('-')
    ? '-'
    : timeStr.includes('s/d')
    ? 's/d'
    : null
  if (rangeSeparator) {
    const parts = timeStr.split(rangeSeparator).map((p) => p.trim())
    const start = formatSingleTime(parts[0])
    const endRaw = formatSingleTime(parts[1])
    const end =
      endRaw === '23:59' || endRaw === '00:00' || endRaw === '23.59' || endRaw === '00.00'
        ? (isEnglish.value ? 'Finish' : 'Selesai')
        : endRaw
    return `${start} - ${end}`
  }
  return formatSingleTime(timeStr)
}

function generateGoogleCalendarUrl(evt) {
  const dateStr = evt.rawDate || evt.date
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return ''

  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const datePart = `${year}${month}${day}`

  let startHour = 9
  let startMin = 0
  let endHour = 11
  let endMin = 0

  const timeStr = evt.rawTime || evt.time
  if (timeStr) {
    const match = timeStr.match(/(\d{1,2})[:.](\d{2})/)
    if (match) {
      startHour = parseInt(match[1], 10)
      startMin = parseInt(match[2], 10)
      endHour = startHour + 2
      endMin = startMin

      const separator = timeStr.includes('|') ? '|' : timeStr.includes('-') ? '-' : null
      if (separator) {
        const parts = timeStr.split(separator)
        if (parts.length > 1) {
          const endMatch = parts[1].match(/(\d{1,2})[:.](\d{2})/)
          if (endMatch) {
            endHour = parseInt(endMatch[1], 10)
            endMin = parseInt(endMatch[2], 10)
          }
        }
      }
    }
  }

  const sh = String(startHour).padStart(2, '0')
  const sm = String(startMin).padStart(2, '0')
  const eh = String(endHour).padStart(2, '0')
  const em = String(endMin).padStart(2, '0')

  const dates = `${datePart}T${sh}${sm}00/${datePart}T${eh}${em}00`
  const title = evt.title || 'Wedding Event'
  const details = evt.address || ''
  const location = evt.location ? `${evt.location}, ${details}` : details

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${dates}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`
}

const events = computed(() => {
  const source = acara.value.length
    ? acara.value.map((a) => {
        const formattedDate = formatEventDate(a.event_date)
        const formattedTime = formatEventTime(a.event_time)
        return {
          title: a.title,
          hari: formattedDate.hari,
          tanggal: formattedDate.tanggal,
          date: a.event_date,
          time: formattedTime,
          rawTime: a.event_time,
          location: a.location_name,
          address: a.address,
          mapsUrl: a.maps_url || '',
        }
      })
    : FALLBACK.map((fb) => {
        const formattedDate = formatEventDate(fb.date)
        return {
          ...fb,
          hari: formattedDate.hari,
          tanggal: formattedDate.tanggal,
        }
      })

  return source.map((evt, index) => {
    const preset = PRESETS[index % PRESETS.length]
    const calendarUrl = generateGoogleCalendarUrl({
      title: evt.title || preset.title,
      date: evt.date,
      time: evt.rawTime || evt.time,
      location: evt.location || '',
      address: evt.address || '',
    })

    return {
      key: `evt-${index}`,
      title: evt.title || preset.title,
      hari: evt.hari,
      tanggal: evt.tanggal,
      date: evt.date || '',
      time: evt.time || '',
      location: evt.location || '',
      address: evt.address || '',
      mapsUrl: evt.mapsUrl || '',
      calendarUrl,
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
