<template>
  <section
    ref="rootRef"
    class="inv-section invitation-section invitation-section--footer reveal-on-scroll"
    :class="{ 'in-view': inView }"
    data-section="footer"
  >
    <div class="footer-credit">
      <p class="footer-credit-label">Created with Love by,</p>
      <p class="footer-credit-name">@25ribuaja <span>x</span> Qinvi</p>
      <div class="footer-social">
        <a class="footer-social-icon" href="https://instagram.com/25ribuaja" target="_blank" rel="noopener" aria-label="Instagram">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        </a>
        <a class="footer-social-icon" href="https://wa.me/" target="_blank" rel="noopener" aria-label="WhatsApp">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 0 1 6.9 12.6l-.2.3.6 2.3-2.4-.6-.3.2A8.2 8.2 0 1 1 12 3.8Zm-3.1 3.9c-.2 0-.5 0-.7.3-.2.3-.9.8-.9 2s.9 2.4 1 2.5c.1.2 1.8 2.7 4.3 3.8 2.1.9 2.5.7 3 .7.4 0 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.3-.2-.5-.3l-1.8-.9c-.2-.1-.4-.1-.6.1l-.7.9c-.1.2-.3.2-.5.1-.7-.3-1.5-.8-2.1-1.4-.6-.6-1-1.2-1.3-1.9-.1-.2 0-.4.1-.5l.5-.6c.1-.2.2-.4.1-.6l-.9-2c-.1-.2-.3-.3-.5-.3Z" />
          </svg>
        </a>
      </div>
      <div class="footer-divider"></div>
    </div>
  </section>
</template>

<script setup>
import { useScrollReveal } from '../../composables/useScrollReveal'

const { rootRef, inView } = useScrollReveal()
</script>
