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

      <filter-items @updateMeals="updateMeals" />

      <!-- Show totals -->
      <div class="overview-totals" id="overviewTotals">
          <span id="totalResults">{{ totalResults }} gerechten</span>
      </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { shuffleMeals } from '~/utils/randomize';
import filterItems from '~/components/filter-items.vue';

const props = defineProps({
  meals: Array, // Meals data passed from the parent
});

const emit = defineEmits(['updateMeals']); // Define emit function for updating meals in the parent

const activeFilters = ref([]); // Store active filters
const totalResults = ref(0); // Store the total count of filtered meals

// Function to update the filtered results count based on active filters
const updateTotalResults = () => {
  totalResults.value = props.meals.filter(meal =>
    activeFilters.value.every(filter => {
      return meal.categoryLabels && meal.categoryLabels.includes(filter); // Ensure categoryLabels exists
    })
  ).length;
};

// Watch the meals data and update the total count after filters are applied
watch(() => props.meals, updateTotalResults, { immediate: true });

// Handle the filter updates from filter-items
const updateMeals = (newActiveFilters) => {
  console.log('Active Filters Changed:', newActiveFilters); // Log active filters

  activeFilters.value = newActiveFilters;
  let filteredMeals = [...props.meals]; // Make a shallow copy of meals

  // Apply filters (check for '1' value for filters)
  filteredMeals = filteredMeals.filter((meal) => {
    // Check if the meal satisfies all active filters (AND logic)
    return newActiveFilters.every((filter) => meal[filter] === '1');
  });

  console.log('Filtered Meals:', filteredMeals); // Log filtered meals
  
  // Emit the filtered meals to the parent component
  emit('updateMeals', filteredMeals); 
};

// Function to filter meals based on active filters
const filterMeals = (filters) => {
  console.log('Filtering with Filters:', filters); // Log filters applied to meals
  if (filters.length === 0) {
    return props.meals; // If no filters are applied, return all meals
  }

  return props.meals.filter(meal =>
    filters.every(filter => meal[filter] === '1') // Check if meal matches all active filters
  );
};

// Refresh overview (reset filters and randomize meal order)
const refreshOverview = () => {
  if (activeFilters.value.length === 0) {  // Only shuffle when there are no active filters
    activeFilters.value = []; // Clear filters
    totalResults.value = props.meals.length; // Reset total count

    // Shuffle the meals and emit them to the parent component
    const shuffledMeals = shuffleMeals([...props.meals]);
    emit('updateMeals', shuffledMeals);
  }
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