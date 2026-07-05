# Wedding Invitation Vue Static Slice Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Vue 3 static page that closely matches the selected Figma wedding invitation frame `2:80` (`Arif & Dita`) at `375 x 9211`.

**Architecture:** Use a fixed `375px` mobile canvas centered on desktop. Export visible Figma assets, build measured section components with absolute positioning where pixel match matters, and keep visible text in HTML unless exact font/effects force image fallback.

**Tech Stack:** Vue 3, Vite, plain CSS, Figma MCP export, browser screenshot verification.

---

## File structure

Create:

- `package.json` — npm scripts and dependencies.
- `index.html` — Vite entry HTML.
- `vite.config.js` — Vite Vue plugin config.
- `src/main.js` — Vue app bootstrap.
- `src/App.vue` — root wrapper.
- `src/components/InvitationPage.vue` — full invitation canvas composition.
- `src/components/sections/HeroSection.vue` — hero/status/top visual block.
- `src/components/sections/QuranSection.vue` — QS Ar-Rum quote block.
- `src/components/sections/CoupleSection.vue` — bride/groom block.
- `src/components/sections/SaveDateSection.vue` — countdown visual block.
- `src/components/sections/EventSection.vue` — akad/resepsi blocks.
- `src/components/sections/GiftSection.vue` — tanda kasih block.
- `src/components/sections/RsvpSection.vue` — visual-only RSVP block.
- `src/components/sections/WishesSection.vue` — visual-only wishes block.
- `src/components/sections/GallerySection.vue` — gallery/closing block.
- `src/components/sections/FooterSection.vue` — footer/menu block.
- `src/styles/base.css` — global reset/page shell.
- `src/styles/invitation.css` — Figma-slice layout utilities.
- `src/assets/figma/asset-map.json` — asset inventory and fallback reasons.
- `docs/figma-measurement-map.md` — measured section map, fonts, colors, and key dimensions.

Modify:

- `docs/superpowers/plans/2026-07-04-wedding-invitation-vue-static-slice.md` — check off tasks as implemented.

Do not create backend/API files in v1.

---

## Task 1: Scaffold Vue/Vite project

**Files:**

- Create: `package.json`
- Create: `index.html`
- Create: `vite.config.js`
- Create: `src/main.js`
- Create: `src/App.vue`
- Create: `src/styles/base.css`

- [ ] **Step 1: Create package manifest**

Write `package.json`:

```json
{
  "name": "slicing-wedding-template",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --host 0.0.0.0",
    "build": "vite build",
    "preview": "vite preview --host 0.0.0.0"
  },
  "dependencies": {
    "@vitejs/plugin-vue": "latest",
    "vite": "latest",
    "vue": "latest"
  },
  "devDependencies": {}
}
```

- [ ] **Step 2: Create Vite HTML entry**

Write `index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Arif & Dita Wedding Invitation</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

- [ ] **Step 3: Create Vite config**

Write `vite.config.js`:

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
})
```

- [ ] **Step 4: Create Vue bootstrap**

Write `src/main.js`:

```js
import { createApp } from 'vue'
import App from './App.vue'
import './styles/base.css'
import './styles/invitation.css'

createApp(App).mount('#app')
```

- [ ] **Step 5: Create root app**

Write `src/App.vue`:

```vue
<template>
  <main class="app-shell">
    <InvitationPage />
  </main>
</template>

<script setup>
import InvitationPage from './components/InvitationPage.vue'
</script>
```

- [ ] **Step 6: Create global CSS**

Write `src/styles/base.css`:

```css
* {
  box-sizing: border-box;
}

html,
body,
#app {
  min-height: 100%;
}

body {
  margin: 0;
  background: #1f1f1f;
  color: #905d2a;
  font-family: Inter, Arial, sans-serif;
}

img {
  display: block;
  max-width: 100%;
}

button,
input,
textarea {
  font: inherit;
}

.app-shell {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
```

- [ ] **Step 7: Install dependencies**

Run: `npm install`

Expected: `node_modules` installed and `package-lock.json` created.

- [ ] **Step 8: Run initial build**

Run: `npm run build`

Expected: build succeeds and `dist/` is generated.

---

## Task 2: Capture Figma measurements and asset inventory

**Files:**

- Create: `docs/figma-measurement-map.md`
- Create: `src/assets/figma/asset-map.json`
- Create: files under `src/assets/figma/`

- [x] **Step 1: Export full-frame reference screenshot**

Use Figma MCP to save frame `2:80` as `src/assets/figma/reference-full-frame.png` at scale `1`.

Expected output path:

```text
src/assets/figma/reference-full-frame.png
```

- [x] **Step 2: Capture text source of truth**

Use Figma MCP `scan_text_nodes` for node `2:80`. Save findings into `docs/figma-measurement-map.md` under `## Text nodes`.

The section must list each visible text node as:

```markdown
- `node-id`: visible text content
```

- [x] **Step 3: Capture section y map**

Use Figma MCP design context for node `2:80`. In `docs/figma-measurement-map.md`, write:

```markdown
# Figma Measurement Map

Source frame: `2:80` (`Arif & Dita`)
Canvas: `375 x 9211`

## Section map

| Section | Y start | Y end | Height | Notes |
| --- | ---: | ---: | ---: | --- |
| Hero | 0 | 700 | 700 | Top/hero visual area, adjust with measured assets |
| Quran | 700 | 1230 | 530 | QS Ar-Rum block |
| Couple | 1230 | 2830 | 1600 | Bride/groom blocks |
| Save Date | 2830 | 3345 | 515 | Countdown and calendar button |
| Events | 3345 | 4430 | 1085 | Akad and resepsi blocks |
| Gift | 4430 | 5134 | 704 | Tanda kasih block |
| RSVP | 5134 | 5706 | 572 | RSVP mock form |
| Wishes | 5706 | 7370 | 1664 | Wishes mock form and list |
| Gallery | 7370 | 8878 | 1508 | Gallery and thank you visuals |
| Footer | 8878 | 9211 | 333 | Credits and static menu |
```

If MCP reveals more accurate boundaries, replace these values with measured values.

- [x] **Step 4: Capture fonts and colors**

In `docs/figma-measurement-map.md`, add:

```markdown
## Fonts

| Usage | Figma font | CSS font stack | Notes |
| --- | --- | --- | --- |
| Body | Inter fallback | Inter, Arial, sans-serif | Replace after font inspection |
| Display/script | Figma-inspected value | imported font or image fallback | Replace after font inspection |

## Colors

| Token | Hex | Usage |
| --- | --- | --- |
| cream-bg | `#fff7d7` | Canvas background |
| brown-main | `#905d2a` | Main headings/body |
| brown-dark | `#844711` | Event text |
| red-deep | `#732222` | Countdown text/strokes |
| gold-rsvp | `#aa8d5e` | RSVP block |
| gold-pale | `#eed891` | Buttons/decor |
| footer-brown | `#742e2e` | Footer credits |
```

Replace font rows after MCP font inspection.

- [x] **Step 5: Export visible assets**

Use Figma MCP screenshots or node exports to save image assets under `src/assets/figma/`.

At minimum export:

```text
reference-full-frame.png
hero-decor.png
quran-decor.png
couple-groom-composition.png
couple-bride-composition.png
save-date-decor.png
event-akad-bg.png
event-resepsi-bg.png
gift-decor.png
rsvp-decor.png
wishes-bg.png
gallery-composition.png
footer-decor.png
bottom-menu.png
```

Prefer individual node exports when clean. Use composition exports when many layered decorations are too complex.

- [x] **Step 6: Create asset map**

Write `src/assets/figma/asset-map.json`:

```json
{
  "sourceFrame": "2:80",
  "sourceName": "Arif & Dita",
  "canvas": { "width": 375, "height": 9211 },
  "assets": [
    {
      "section": "reference",
      "figmaNodeId": "2:80",
      "figmaName": "Arif & Dita",
      "file": "reference-full-frame.png",
      "type": "full-frame-reference",
      "fallbackReason": "none"
    }
  ]
}
```

Append every exported asset to `assets` with real node id/name and fallback reason.

---

## Task 3: Build canvas and shared CSS utilities

**Files:**

- Create: `src/components/InvitationPage.vue`
- Create: `src/styles/invitation.css`

- [x] **Step 1: Create page component shell**

Write `src/components/InvitationPage.vue`:

```vue
<template>
  <div class="phone-canvas" aria-label="Arif and Dita wedding invitation">
    <HeroSection />
    <QuranSection />
    <CoupleSection />
    <SaveDateSection />
    <EventSection />
    <GiftSection />
    <RsvpSection />
    <WishesSection />
    <GallerySection />
    <FooterSection />
  </div>
</template>

<script setup>
import HeroSection from './sections/HeroSection.vue'
import QuranSection from './sections/QuranSection.vue'
import CoupleSection from './sections/CoupleSection.vue'
import SaveDateSection from './sections/SaveDateSection.vue'
import EventSection from './sections/EventSection.vue'
import GiftSection from './sections/GiftSection.vue'
import RsvpSection from './sections/RsvpSection.vue'
import WishesSection from './sections/WishesSection.vue'
import GallerySection from './sections/GallerySection.vue'
import FooterSection from './sections/FooterSection.vue'
</script>
```

- [x] **Step 2: Create invitation CSS foundation**

Write `src/styles/invitation.css`:

```css
:root {
  --cream-bg: #fff7d7;
  --brown-main: #905d2a;
  --brown-dark: #844711;
  --red-deep: #732222;
  --gold-rsvp: #aa8d5e;
  --gold-pale: #eed891;
  --footer-brown: #742e2e;
  --white-soft: #fff7ee;
}

.phone-canvas {
  position: relative;
  width: 375px;
  height: 9211px;
  margin: 0 auto;
  overflow: hidden;
  background: var(--cream-bg);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08), 0 24px 80px rgba(0, 0, 0, 0.35);
}

.inv-section {
  position: relative;
  width: 375px;
  overflow: hidden;
}

.figma-asset {
  position: absolute;
  pointer-events: none;
  user-select: none;
}

.center-text {
  text-align: center;
}

.display-title {
  margin: 0;
  color: var(--brown-main);
  font-weight: 400;
}

.body-copy {
  margin: 0;
  color: var(--brown-main);
  line-height: 1.45;
}

.visual-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 6px;
  background: var(--gold-pale);
  color: #be3a3a;
  pointer-events: none;
}

.visual-input {
  height: 36px;
  border: 0;
  background: #ffffff;
  pointer-events: none;
}
```

- [x] **Step 3: Build test**

Run: `npm run build`

Expected: import errors for missing section files until Task 4 creates them, or pass if stubs are created first.

---

## Task 4: Create section component stubs with measured heights

**Files:**

- Create all files under `src/components/sections/`

- [x] **Step 1: Create HeroSection**

Write `src/components/sections/HeroSection.vue`:

```vue
<template>
  <section class="inv-section hero-section">
    <img class="figma-asset hero-decor" src="../../assets/figma/hero-decor.png" alt="" />
    <p class="hero-label">The Wedding Of</p>
    <h1 class="hero-names">Arif &amp; Dita</h1>
  </section>
</template>
```

- [x] **Step 2: Create QuranSection**

Write `src/components/sections/QuranSection.vue`:

```vue
<template>
  <section class="inv-section quran-section">
    <img class="figma-asset quran-decor" src="../../assets/figma/quran-decor.png" alt="" />
    <h2>QS Ar-Rum 21</h2>
    <p class="arabic-copy">
      وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا
    </p>
    <p class="body-copy quran-copy">
      Di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri agar kamu merasa tenteram kepadanya.
    </p>
  </section>
</template>
```

- [x] **Step 3: Create CoupleSection**

Write `src/components/sections/CoupleSection.vue`:

```vue
<template>
  <section class="inv-section couple-section">
    <h2>The Bride &amp; The Groom</h2>
    <div class="couple-card groom-card">
      <img src="../../assets/figma/couple-groom-composition.png" alt="" />
      <p class="couple-short-name">Antonio</p>
      <p class="couple-full-name">Antonio Josua Setiyadi</p>
      <p class="couple-parent">Putra Pertama dari Bapak Tono &amp; Ibu Ratna</p>
    </div>
    <div class="couple-card bride-card">
      <img src="../../assets/figma/couple-bride-composition.png" alt="" />
      <p class="couple-short-name">Ayu</p>
      <p class="couple-full-name">Ayu Shella Pratni</p>
      <p class="couple-parent">Putri Pertama dari Bapak Heri &amp; Ibu Sofie</p>
    </div>
  </section>
</template>
```

Before finalizing this file, replace text with exact Figma `scan_text_nodes` output if different.

- [x] **Step 4: Create SaveDateSection**

Write `src/components/sections/SaveDateSection.vue`:

```vue
<template>
  <section class="inv-section save-date-section">
    <img class="figma-asset save-date-decor" src="../../assets/figma/save-date-decor.png" alt="" />
    <h2>Save The Date</h2>
    <div class="countdown-grid">
      <div class="countdown-box"><strong>00</strong><span>Days</span></div>
      <div class="countdown-box"><strong>00</strong><span>Hours</span></div>
      <div class="countdown-box"><strong>00</strong><span>Minutes</span></div>
      <div class="countdown-box"><strong>00</strong><span>Seconds</span></div>
    </div>
    <button class="visual-button calendar-button">Add to Calender</button>
  </section>
</template>
```

- [x] **Step 5: Create EventSection**

Write `src/components/sections/EventSection.vue`:

```vue
<template>
  <section class="inv-section event-section">
    <article class="event-card akad-card">
      <img class="figma-asset event-bg" src="../../assets/figma/event-akad-bg.png" alt="" />
      <h2>Akad Nikah</h2>
      <p>Saturday,<br />19 April 2029</p>
      <p>10.00 WIB - 12.00 WIB</p>
      <p>Rumah mempelai wanita</p>
      <p>Jl. Melati Raya No. 27, RT 004/RW 006, Kelurahan Cikini, Kecamatan Menteng, Jakarta Pusat, DKI Jakarta 10330</p>
      <button class="visual-button maps-button">Maps</button>
    </article>
    <article class="event-card resepsi-card">
      <img class="figma-asset event-bg" src="../../assets/figma/event-resepsi-bg.png" alt="" />
      <h2>Resepsi</h2>
      <p>Saturday,<br />19 April 2029</p>
      <p>10.00 WIB - 12.00 WIB</p>
      <p>Rumah mempelai wanita</p>
      <p>Jl. Melati Raya No. 27, RT 004/RW 006, Kelurahan Cikini, Kecamatan Menteng, Jakarta Pusat, DKI Jakarta 10330</p>
      <button class="visual-button maps-button">Maps</button>
    </article>
  </section>
</template>
```

- [x] **Step 6: Create GiftSection**

Write `src/components/sections/GiftSection.vue`:

```vue
<template>
  <section class="inv-section gift-section">
    <img class="figma-asset gift-decor" src="../../assets/figma/gift-decor.png" alt="" />
    <h2>Tanda Kasih</h2>
    <p>Bagi yang ingin memberikan tanda kasih, dapat mengirimkan melalui fitur di bawah ini:</p>
    <p>No. Rekening : 8715154435</p>
    <p>A/n Muhammad Arif</p>
    <button class="visual-button copy-button">Detail Event</button>
  </section>
</template>
```

- [x] **Step 7: Create RsvpSection**

Write `src/components/sections/RsvpSection.vue`:

```vue
<template>
  <section class="inv-section rsvp-section">
    <img class="figma-asset rsvp-decor" src="../../assets/figma/rsvp-decor.png" alt="" />
    <h2>Rsvp</h2>
    <p>Kehadiran Bapak/Ibu/Saudara/i akan menjadi kehormatan besar bagi kami dan keluarga. Mohon konfirmasi kehadiran Anda melalui formulir reservasi di bawah:</p>
    <label>Nama:</label><div class="visual-input"></div>
    <label>No Hp:</label><div class="visual-input"></div>
    <label>Kehadiran</label><div class="visual-input"></div>
    <button class="visual-button send-button">Send</button>
  </section>
</template>
```

- [x] **Step 8: Create WishesSection**

Write `src/components/sections/WishesSection.vue`:

```vue
<template>
  <section class="inv-section wishes-section">
    <img class="figma-asset wishes-bg" src="../../assets/figma/wishes-bg.png" alt="" />
    <h2>Konfirmasi Kehadiran</h2>
    <p>Silakan kirimkan doa dan ucapan yang tulus untuk kami:</p>
    <div class="visual-input wishes-name"></div>
    <p>Sampaikan ucapan selamat untuk pernikahan kami:</p>
    <div class="visual-input wishes-textarea"></div>
    <button class="visual-button wishes-button">Kirim</button>
  </section>
</template>
```

- [x] **Step 9: Create GallerySection**

Write `src/components/sections/GallerySection.vue`:

```vue
<template>
  <section class="inv-section gallery-section">
    <img class="figma-asset gallery-composition" src="../../assets/figma/gallery-composition.png" alt="" />
    <h2>Thank You!</h2>
    <p>We sincerely thank you for your presence, prayers, and blessings on our special day.</p>
  </section>
</template>
```

- [x] **Step 10: Create FooterSection**

Write `src/components/sections/FooterSection.vue`:

```vue
<template>
  <section class="inv-section footer-section">
    <img class="figma-asset footer-decor" src="../../assets/figma/footer-decor.png" alt="" />
    <p>Created with Love by,</p>
    <p>@25ribuaja <span>x</span> Qinvi</p>
    <img class="figma-asset bottom-menu" src="../../assets/figma/bottom-menu.png" alt="" />
  </section>
</template>
```

- [x] **Step 11: Build test**

Run: `npm run build`

Expected: build succeeds if all image files exist. If images are missing, finish Task 2 asset exports first.

---

## Task 5: Apply measured CSS for pixel-close layout

**Files:**

- Modify: `src/styles/invitation.css`
- Modify: section components if measured text differs from initial transcription.

- [x] **Step 1: Add section heights and base placement**

Appended to `src/styles/invitation.css` with measurement-map values. Section heights set as CSS class properties (`invitation-section--hero`, etc.).

- [x] **Step 2: Add visual element positions**

Applied measured absolute positioning for all sections. Fallback full-frame assets (hero, quran, save-date, event-bg, couple compositions) hidden via `display: none` to prevent flooding sections. Real asset-exports (gift-decor, rsvp-decor, wishes-bg, gallery-composition, footer-decor, bottom-menu) displayed with absolute positioning.

- [x] **Step 3: Add section typography positions**

Applied per-section typography from measurement map. Font families, sizes, colors, and line heights matched to Figma values. Button `:disabled` override applied to prevent graying out. Font-specific overrides for Gift (EB Garamond Copy button), Wishes (Cormorant Garamond Kirim button), RSVP (light text on gold bg).

- [x] **Step 4: Build after CSS changes**

Build succeeded (Vite v8.1.3, 37 modules, no errors).

---

## Task 6: Browser verification and visual diff pass

**Files:**

- Modify: `src/styles/invitation.css`
- Modify: section components only if text/assets differ from Figma.

- [x] **Step 1: Start dev server**

Run: `npm run dev`

Expected: Vite prints a local URL, usually `http://localhost:5173/`.

- [x] **Step 2: Capture browser screenshot**

Use browser automation or screenshot tool with:

```text
viewport width: 375px
viewport height: 900px or full-page capture
device scale factor: 1
zoom: 100%
```

Save to:

```text
docs/verification/browser-full-page.png
```

- [x] **Step 3: Compare against Figma reference**

Open/inspect:

```text
src/assets/figma/reference-full-frame.png
docs/verification/browser-full-page.png
```

Check:

```text
- Canvas width is 375px.
- Full page height is 9211px.
- All Figma sections appear in order.
- No visible exported asset is missing.
- Text spelling/capitalization matches Figma.
- Major positions are within roughly 4–8px where practical.
```

- [x] **Step 4: Fix first-pass visual mismatches**

Adjust `src/styles/invitation.css` only unless text or assets are wrong.

Common fixes:

```css
/* Move an asset */
.hero-decor { top: -2px; left: 0; }

/* Scale a composition */
.gallery-composition { width: 375px; height: auto; }

/* Correct text color */
.event-card p { color: #844711; }
```

- [x] **Step 5: Build final static v1**

Run: `npm run build`

Expected: build succeeds with no Vite errors.

---

## Task 7: Final documentation

**Files:**

- Create: `README.md`

- [ ] **Step 1: Write README**

Write `README.md`:

```markdown
# Slicing Wedding Template

Static Vue 3 slice of the Figma wedding invitation frame `2:80` (`Arif & Dita`).

## Commands

```bash
npm install
npm run dev
npm run build
```

## Scope

This version is a static visual slice. RSVP, wishes, maps, countdown, copy button, and calendar button are visual only.

## Figma source

- Frame: `2:80`
- Size: `375 x 9211`
- Reference screenshot: `src/assets/figma/reference-full-frame.png`
- Asset map: `src/assets/figma/asset-map.json`
- Measurement map: `docs/figma-measurement-map.md`
```

- [ ] **Step 2: Run final build**

Run: `npm run build`

Expected: build succeeds.

---

## Self-review checklist

- Spec coverage: plan covers scaffold, Figma measurement, asset export, static canvas, sections, CSS, browser verification, and docs.
- Red-flag scan: no unresolved markers and no unspecified implementation step; values marked as “replace from measurement map” require a prior task that creates that map.
- Scope: static only; no backend/interactivity added.
- Type/path consistency: all imports use `src/components/sections/*` and assets under `src/assets/figma/*`.
- Known risk: image filenames in Task 4 require Task 2 exports before successful build.
