<template>
  <header class="site-header page-row-wrapper">
    <div class="container header-inner">
      <NuxtLink to="/overview" class="brand" aria-label="Wat eten we? Naar het overzicht">
        <span class="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3.5 12h17a8.5 8.5 0 0 1-17 0z" />
            <path d="M8.5 4.5v3M12 3.5v4M15.5 4.5v3" />
          </svg>
        </span>
        <span class="brand-name">Wat eten we?</span>
      </NuxtLink>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.85);
  border-bottom: 1px solid var(--color-border);
  -webkit-backdrop-filter: saturate(1.4) blur(12px);
  backdrop-filter: saturate(1.4) blur(12px);
}

.header-inner {
  display: flex;
  align-items: center;
  min-height: 4rem;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  text-decoration: none;
  color: var(--color-text);
  border-radius: var(--radius-sm);
}

.brand-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.7rem;
  color: var(--color-on-primary);
  background: linear-gradient(135deg, #3a9462, var(--color-primary));
  box-shadow: 0 4px 10px -4px rgba(37, 104, 67, 0.7);
  transition: transform 0.3s var(--ease);
}

.brand:hover .brand-mark {
  transform: rotate(-6deg) scale(1.05);
}

.brand-name {
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

@media only screen and (max-width: 600px) {
  .header-inner {
    min-height: 3.5rem;
  }

  .brand-name {
    font-size: 1.15rem;
  }
}
</style>
