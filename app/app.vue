<template>
  <section class="page-row-wrapper main-content-section">
    <a href="#main" class="skip-link">Naar de inhoud</a>

    <Header />

    <main id="main" class="container main-content">
      <NuxtPage />
    </main>

    <Footer />
  </section>
</template>

<script setup>
// Global or layout-specific JS
</script>

<style>
/* ------------------------------------------------------------------ */
/* Design tokens                                                       */
/* ------------------------------------------------------------------ */
:root {
  color-scheme: light;

  --font-sans: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif;

  /* Surfaces and text */
  --color-bg: #f5f7f3;
  --color-surface: #ffffff;
  --color-text: #1b2a20;
  --color-muted: #5b6b61;
  --color-border: #e1e7df;

  /* Brand */
  --color-primary: #2e7d4f;
  --color-primary-hover: #256843;
  --color-primary-soft: #e3f2e8;
  --color-on-primary: #ffffff;
  --color-focus: #2563eb;

  /* Category labels (also used by the filter chips) */
  --label-healthy-bg: #e3f4e9;
  --label-healthy-fg: #1d6a40;
  --label-cheap-bg: #e4eefb;
  --label-cheap-fg: #2457a0;
  --label-fast-bg: #fdf1d9;
  --label-fast-fg: #8a5200;
  --label-treat-bg: #f5e7fa;
  --label-treat-fg: #7a3598;

  /* Shape and depth */
  --radius-sm: 0.6rem;
  --radius-md: 1rem;
  --radius-lg: 1.25rem;
  --radius-pill: 999px;
  --shadow-sm: 0 1px 2px rgba(23, 43, 30, 0.06), 0 2px 8px rgba(23, 43, 30, 0.04);
  --shadow-md: 0 14px 30px -10px rgba(23, 43, 30, 0.28);

  --ease: cubic-bezier(0.2, 0.7, 0.2, 1);
}

/* ------------------------------------------------------------------ */
/* Base                                                                */
/* ------------------------------------------------------------------ */
html {
  box-sizing: border-box;
  -webkit-text-size-adjust: 100%;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

body {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 1rem;
  line-height: 1.55;
  color: var(--color-text);
  background-color: var(--color-bg);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1,
h2,
h3,
h4,
h5 {
  margin-top: 0;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

a {
  color: inherit;
}

img {
  max-width: 100%;
}

ul li {
  font-family: inherit;
}

pre {
  word-break: break-word;
}

:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */
.page-row-wrapper {
  width: 100%;
}

.main-content-section {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}

.container.main-content {
  flex: 1;
  padding-top: 2.5rem;
  padding-bottom: 4rem;
}

@media only screen and (max-width: 600px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .container.main-content {
    padding-top: 1.5rem;
    padding-bottom: 3rem;
  }
}

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */
button {
  font: inherit;
  cursor: pointer;
}

button.primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.65rem 1.15rem;
  border: none;
  border-radius: var(--radius-pill);
  font-weight: 600;
  line-height: 1.2;
  color: var(--color-on-primary);
  background-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
  transition: background-color 0.2s var(--ease), transform 0.2s var(--ease),
    box-shadow 0.2s var(--ease);
}

button.primary:hover {
  background-color: var(--color-primary-hover);
  box-shadow: 0 6px 16px -6px rgba(37, 104, 67, 0.6);
}

button.primary:active {
  transform: translateY(1px);
}

button .icon {
  display: inline-flex;
  align-items: center;
  width: 1rem;
}

button .icon img {
  width: 100%;
}

/* ------------------------------------------------------------------ */
/* Utilities                                                           */
/* ------------------------------------------------------------------ */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.skip-link {
  position: absolute;
  left: 1rem;
  top: -4rem;
  z-index: 100;
  padding: 0.6rem 1rem;
  border-radius: var(--radius-sm);
  color: var(--color-on-primary);
  background-color: var(--color-primary);
  text-decoration: none;
  transition: top 0.2s var(--ease);
}

.skip-link:focus {
  top: 1rem;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
