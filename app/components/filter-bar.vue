<template>
  <div class="filter-bar">
      <filter-items @updateFilters="emit('updateFilters', $event)" />

      <div class="filter-actions">
          <!-- Show totals -->
          <div class="overview-totals" id="overviewTotals" aria-live="polite">
              <span id="totalResults">{{ total }} {{ total === 1 ? 'gerecht' : 'gerechten' }}</span>
          </div>

          <button
              id="refreshButton"
              class="primary overview-refresh-button"
              @click="emit('shuffle')">
              Shuffle
              <span class="icon">
                <img src="/resources/icon_shuffle.svg" alt="">
              </span>
          </button>
      </div>
  </div>
</template>

<script setup>
import filterItems from '~/components/filter-items.vue';

defineProps({
  total: {
    type: Number,
    default: 0, // Number of meals currently visible (filters + search applied)
  },
});

const emit = defineEmits(['updateFilters', 'shuffle']);
</script>


<style scoped>
.filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.filter-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.overview-totals {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-muted);
  white-space: nowrap;
}

@media only screen and (max-width: 600px) {
  .filter-bar {
    flex-direction: column;
    align-items: stretch;
    gap: 0.9rem;
  }

  .filter-actions {
    justify-content: space-between;
  }
}
</style>
