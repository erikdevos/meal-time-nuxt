<template>
  <div class="filter-bar">
      <button 
          id="refreshButton" 
          class="primary overview-refresh-button" 
          @click="emit('shuffle')">
          Shuffle
          <span class="icon">
            <img src="/resources/icon_shuffle.svg" alt="">
          </span>
      </button>

      <filter-items @updateFilters="emit('updateFilters', $event)" />

      <!-- Show totals -->
      <div class="overview-totals" id="overviewTotals">
          <span id="totalResults">{{ total }} gerechten</span>
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
  margin-bottom: 3rem;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    margin-bottom: 1.5rem;
  }

  .overview-refresh-button {
    margin-right: 1rem;

    @media only screen and (max-width: 600px) {
      margin-right: 0;
      margin-bottom: 1rem;
    }
  }

  .overview-totals {
    margin-left: auto;
    color: var(--color-mid-gray);
    @media only screen and (max-width: 600px) {
      margin-left: initial;
      text-align: center;
    }
  }
}
</style>