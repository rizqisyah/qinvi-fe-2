<template>
  <section class="inv-section invitation-section invitation-section--rsvp" data-section="rsvp">
    <!-- rsvp-header.png — cropped from rsvp-decor.png: arch + roses + heading + description only -->
    <img class="figma-asset rsvp-header" src="../../assets/figma/rsvp-header.png" alt="" />
    <div class="rsvp-form">
      <label class="form-label" for="rsvp-name">Nama:</label>
      <input id="rsvp-name" class="visual-input rsvp-name" type="text" />
      <label class="form-label" for="rsvp-phone">No Hp:</label>
      <input id="rsvp-phone" class="visual-input rsvp-phone" type="tel" />
      <span class="form-label rsvp-attendance-label">Kehadiran</span>
      <div class="rsvp-attendance-group" role="radiogroup" aria-label="Kehadiran">
        <label class="rsvp-attendance-option">
          <input type="radio" name="rsvp-attendance" value="hadir" checked />
          <span>Hadir</span>
        </label>
        <label class="rsvp-attendance-option">
          <input type="radio" name="rsvp-attendance" value="tidak-hadir" />
          <span>Tidak Hadir</span>
        </label>
      </div>
      <button class="decor-button send-button" type="button">Send</button>
    </div>
  </section>
</template>
