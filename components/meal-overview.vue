<template>
  <div id="dataContainer">
    <div v-if="loading">
      <loader />
    </div>
    <div v-else class="meals-container">
      <meal-item
        v-for="meal in visibleMeals"
        :key="meal.id"
        :meal="meal"
      />
    </div>

    <!-- <div ref="loadMoreTrigger" class="load-more-trigger"></div> -->
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { shuffleMeals } from '~/utils/randomize';
import MealItem from '~/components/meal-item.vue';
import Loader from '~/components/loader.vue';

const props = defineProps({
  meals: {
    type: Array,
    required: true,
  },
});

const meals = ref([]); // All meals (no shuffle)
const visibleMeals = ref([]); // Meals visible on the screen
const loading = ref(true);

// Initialize meals and state
const initializeMeals = (shuffled = false) => {
  console.log('Initializing meals, shuffled:', shuffled); // Log whether meals are shuffled or not
  meals.value = shuffled ? shuffleMeals([...props.meals]) : [...props.meals];
  visibleMeals.value = meals.value.slice(0, 99); // Show first 16 meals initially
  loading.value = false;
};

// Watch for changes in the meals prop (which may come from filters or search bar)
watch(() => props.meals, (newMeals) => {
  console.log('Meals updated in meal-overview:', newMeals); // Log the new meals being passed
  meals.value = newMeals;  // Directly assign new meals from the parent
  initializeMeals(false);  // Initialize meals without shuffling
});

// Handle updates from the filter bar
const updateMeals = (newMeals) => {
  console.log('Updating meals in meal-overview:', newMeals); // Log meals being passed for updates
  meals.value = newMeals;
  initializeMeals(false); // Don't shuffle when filters are applied
};
</script>


<style scoped>
  .meals-container {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-template-rows: 1fr;
    grid-column-gap: 3rem;
    grid-row-gap: 3rem;
    margin-bottom: 5rem;

    @media only screen and (max-width: 1200px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    
    @media only screen and (max-width: 900px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      grid-column-gap: 1.5rem;
      grid-row-gap: 1.5rem;
    }

    @media only screen and (max-width: 600px) {
      gap: 1rem;
    }
  
    @media only screen and (max-width: 300px) {
      grid-template-columns: repeat(1, minmax(0, 1fr));
      grid-column-gap: 0;
      grid-row-gap: 3rem;
    }
  }

  .load-more-trigger {
    height: 50px;
    background: red; /* Debugging color */
  }
</style>
