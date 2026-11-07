<template>
  <div class="filter-items" role="group" aria-label="Filter de gerechten">
    <span class="label">Laat zien:</span>

    <button
      v-for="filter in FILTERS"
      :key="filter.key"
      type="button"
      class="chip"
      :class="[`chip--${filter.key}`, { active: activeFilters.includes(filter.key) }]"
      :aria-pressed="activeFilters.includes(filter.key)"
      @click="toggleFilter(filter.key)"
    >
      <svg class="chip-check" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="m5 12.5 4.5 4.5L19 7.5" />
      </svg>
      {{ filter.label }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const FILTERS = [
  { key: 'healthy', label: 'Gezond' },
  { key: 'cheap', label: 'Betaalbaar' },
  { key: 'fast', label: 'Snel' },
  { key: 'treat', label: 'Speciaal' },
];

const emit = defineEmits(['updateFilters']);
const activeFilters = ref([]); // Ensure the filters are initialized

// Toggle the filter active state
const toggleFilter = (filter) => {
  if (activeFilters.value.includes(filter)) {
    activeFilters.value = activeFilters.value.filter(f => f !== filter);
  } else {
    activeFilters.value = [...activeFilters.value, filter];
  }

  // Emit a copy of the selected filters; the parent does the actual filtering
  emit('updateFilters', [...activeFilters.value]);
};
</script>

<style scoped>
.filter-items {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.label {
  margin-right: 0.25rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-muted);
}

.chip {
  --chip-bg: var(--color-primary-soft);
  --chip-fg: var(--color-primary);

  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.2;
  color: var(--color-text);
  background-color: var(--color-surface);
  box-shadow: var(--shadow-sm);
  transition: background-color 0.2s var(--ease), border-color 0.2s var(--ease),
    color 0.2s var(--ease), transform 0.2s var(--ease);
}

.chip--healthy { --chip-bg: var(--label-healthy-bg); --chip-fg: var(--label-healthy-fg); }
.chip--cheap { --chip-bg: var(--label-cheap-bg); --chip-fg: var(--label-cheap-fg); }
.chip--fast { --chip-bg: var(--label-fast-bg); --chip-fg: var(--label-fast-fg); }
.chip--treat { --chip-bg: var(--label-treat-bg); --chip-fg: var(--label-treat-fg); }

.chip-check {
  display: none;
}

.chip:hover {
  border-color: var(--chip-fg);
}

.chip:active {
  transform: scale(0.97);
}

.chip.active {
  color: var(--chip-fg);
  background-color: var(--chip-bg);
  border-color: var(--chip-fg);
}

.chip.active .chip-check {
  display: inline-block;
}

@media only screen and (max-width: 600px) {
  .label {
    display: none;
  }

  .filter-items {
    gap: 0.4rem;
  }

  .chip {
    gap: 0.25rem;
    padding: 0.45rem 0.7rem;
    font-size: 0.875rem;
  }

  /* No checkmark on small screens: it would push the last chip to a new row.
     The coloured background and border already show the active state. */
  .chip.active .chip-check {
    display: none;
  }
}
</style>
