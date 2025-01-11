<template>
  <div class="filter-bar">
      <button 
          id="refreshButton" 
          class="primary overview-refresh-button" 
          @click="refreshOverview">
          Shuffle 
          <span class="icon">
            <img src="/public/resources/icon_shuffle.svg" alt="">
          </span>
      </button>

      <filter-items />

      <!-- Sort by new -->
      <button 
          id="sortByNew" 
          style="display: none;" 
          @click="sortByNewest">
          Nieuwste
      </button>

      <!-- Show totals -->
      <div class="overview-totals" id="overviewTotals">
          <span id="totalResults">{{ totalResults }} gerechten</span>
      </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { shuffleMeals } from '~/utils/randomize'
import filterItems from '~/components/filter-items.vue'

const props = defineProps({
  meals: Array, // Meals data passed from the parent
});

const emit = defineEmits(['updateMeals']); // Define emit function for updating meals in the parent

const activeFilters = ref([]);
const totalResults = ref(0);

// Define the updateTotalResults function before calling it
const updateTotalResults = () => {
  totalResults.value = props.meals.filter(meal =>
    activeFilters.value.every(filter => meal.categoryLabels.includes(filter))
  ).length;
};

// Watch the meals data and update the total count after filters are applied
watch(() => props.meals, updateTotalResults, { immediate: true });

// Refresh overview (reset filters and randomize meal order)
const refreshOverview = () => {
activeFilters.value = []; // Reset filters
updateTotalResults(); // Update the results count

// Shuffle meals and emit the new order to the parent
const shuffledMeals = shuffleMeals([...props.meals]);
  emit('updateMeals', shuffledMeals);
};

const sortByNewest = () => {
  props.meals.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  updateTotalResults(); // Update the results count after sorting
};
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