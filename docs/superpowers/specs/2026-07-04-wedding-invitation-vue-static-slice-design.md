# Wedding Invitation Vue Static Slice Design

## Goal

Build a Vue web page that matches the selected Figma wedding invitation design as closely as possible for a first static slice.

The selected Figma frame is `2:80` named `Arif & Dita`, sized `375 x 9211`. It is a mobile-first long-scroll wedding invitation page.

Figma frame `2:80` is the only source of truth. All visible text, names, dates, venue details, account information, assets, colors, and spacing must be transcribed or exported from that frame before coding. Do not trust inferred section names or placeholder values if they conflict with Figma.

## Scope

### In scope

- Scaffold a Vue 3 + Vite app in this empty project.
- Export or copy every visible non-text visual asset from the selected Figma design where accessible: photos, florals, ornaments, logos, icons, background textures, controls, and decorative frames.
- Build one static invitation page.
- Match Figma layout, colors, spacing, typography, decorative images, and section order as closely as practical.
- Keep page width fixed at `375px` and center it on wider screens.
- Use editable HTML text where practical.
- Use exported image assets for decorative/photo-heavy layers.
- Include visual-only versions of buttons and forms.
- Include any other visible block/control from y=`0` to y=`9211`, even if not listed in the section summary.

### Out of scope for v1

- Working RSVP submission.
- Working guest wishes submission.
- Live countdown logic.
- Copy-to-clipboard behavior.
- Maps navigation behavior.
- Add-to-calendar behavior.
- Backend/API/database.
- Responsive redesign beyond centered 375px mobile canvas.

## Recommended approach

Use Vue 3 + Vite with plain CSS.

Reasons:

- Project is empty, so Vite gives fast setup without extra framework weight.
- Plain CSS gives direct control for pixel-close Figma slicing.
- Fixed-width mobile canvas matches source frame better than responsive rebuild.
- Vue components keep large page manageable while staying simple.

## App architecture

```text
src/
  App.vue
  main.js
  assets/
    figma/
      ...exported assets
  components/
    InvitationPage.vue
    sections/
      HeroSection.vue
      QuranSection.vue
      CoupleSection.vue
      SaveDateSection.vue
      EventSection.vue
      GiftSection.vue
      RsvpSection.vue
      WishesSection.vue
      GallerySection.vue
      FooterSection.vue
  styles/
    base.css
    invitation.css
```

`App.vue` renders `InvitationPage`. `InvitationPage` composes sections in Figma order.

## Visual design source

- Figma file: `Untitled`
- Current page: `Page 1`
- Selected frame: `2:80`, `Arif & Dita`
- Frame size: `375 x 9211`
- Base background: `#fff7d7`

Before implementation, create a measurement map from Figma MCP:

- Section start/end y positions and heights.
- Key element x/y/width/height values.
- Font family, size, weight, line-height, and color for text layers.
- Border radius, stroke, opacity, shadow, and fill values where visible.
- Asset inventory mapping Figma layer id/name to exported filename.

Build from measured Figma data, not guessed section ranges.

Important colors from Figma:

- Cream background: `#fff7d7`
- Main brown/gold text: `#905d2a`
- Dark event text: `#844711`
- Deep red: `#732222`
- RSVP gold block: `#aa8d5e`
- Pale gold: `#eed891`
- Footer/brown accent: `#742e2e`

## Page sections

1. **Hero**
   - Status bar style top area.
   - Wedding title, couple names, photo/decorative flowers.
   - Use exported decorative assets from Figma.

2. **Quran quote**
   - `QS Ar-Rum 21` title.
   - Arabic text and Indonesian translation.
   - Decorative wax seal and floral elements.

3. **Bride & Groom**
   - Heading `The Bride & The Groom`.
   - Couple names, full names, and parent text must be copied exactly from Figma frame `2:80`.
   - Current Figma layer text includes template values such as `Antonio`, `Antonio Josua Setiyadi`, `Ayu`, and `Ayu Shella Pratni`; verify final visible text before coding because frame name is `Arif & Dita` and gift account references `Muhammad Arif`.
   - Photo frames and decorative layer exports.

4. **Save The Date**
   - Heading.
   - Static countdown boxes with `00` values.
   - Static date display and `Add to Calender` visual button if that spelling appears in Figma. Match Figma spelling/capitalization exactly.

5. **Akad Nikah and Resepsi**
   - Two stacked event blocks.
   - Date: `Saturday, 19 April 2029`.
   - Time: `10.00 WIB - 12.00 WIB`.
   - Venue and address text from Figma.
   - Static `Maps` buttons.

6. **Tanda Kasih**
   - Gift text.
   - BCA logo asset.
   - Account details copied exactly from Figma frame `2:80`.
   - Static copy/detail button.

7. **RSVP**
   - Intro text.
   - Visual-only inputs for name, phone, attendance.
   - Static `Send` button.

8. **Ucapan Dan Harapan**
   - Message form mockup.
   - Static comments/list rows matching Figma.

9. **Gallery and closing**
   - Exported gallery/photo assets.
   - `Thank You!` message.
   - Bottom decorative elements.

10. **Footer/menu**
    - `Created with Love by, @25ribuaja x Qinvi`.
    - Static social buttons.
    - Static bottom menu.

## Asset strategy

- Export selected frame/layers from Figma through MCP screenshots/assets.
- Store files under `src/assets/figma/`.
- Use meaningful filenames when possible, such as `hero-couple.png`, `flower-left.png`, `wax-seal.png`, `bca-logo.png`.
- Create `src/assets/figma/asset-map.json` documenting layer id/name, exported filename, intended section, and any fallback reason.
- Use `.png`, `.webp`, or `.svg` depending on export quality and transparency needs.
- Prefer individual layer exports over section screenshots.
- Use section-level screenshots only as fallback when individual layer export fails or would create unacceptable mismatch; record fallback reason in `asset-map.json`.
- Default to text as HTML for headings, body copy, form labels, and buttons.
- Export text as image only for script/logo/effect-heavy text where font/effects cannot be matched; record reason.

## Layout strategy

- Use `.phone-canvas` with:
  - `width: 375px`
  - `height: 9211px`
  - centered with `margin: 0 auto`
  - background `#fff7d7`
- Use section wrappers with fixed heights matching Figma y ranges.
- Use `position: relative` section containers and `position: absolute` children for pixel-close placement where needed.
- Use normal flow only when it does not drift from Figma.

## Error handling and fallback

- If a specific layer cannot be exported cleanly, export a larger grouped/section screenshot and use it as a background.
- Identify exact Figma font families before implementation. Use Google Fonts or local/importable font packages where license and availability allow. If a font is unavailable, choose a named fallback and document visual impact in README or implementation notes.
- If Figma layer names are unclear, use y-position/section role for filenames.
- If frame includes iOS/status bar pixels, reproduce them as static visual only. If current Figma export does not show them, omit them.

## Testing and verification

- Run project install/build commands successfully.
- Open local dev server.
- Compare rendered page with Figma selected frame visually.
- Export browser screenshot at viewport width `375px`, device scale factor `1`, browser zoom `100%`.
- Inspect major sections for alignment, text, colors, fonts, and asset presence.
- v1 acceptance:
  - desktop shows centered `375px` page;
  - exact canvas height is present;
  - full section order from Figma is preserved;
  - no visible assets are missing;
  - all visible text matches Figma spelling/capitalization;
  - major element positions are within about `4–8px` where practical;
  - colors and fonts are close enough to Figma that visual identity is preserved.

## Implementation notes

- This is not a general reusable wedding invitation engine yet.
- This is first a pixel-close static slice.
- Interactivity can be added later after v1 visual match is approved.
