<template>
  <div id="dataContainer">
    <div v-if="loading">
      <loader />
    </div>
    <div v-else class="meals-container">
      <meal-item
        v-for="meal in meals"
        :key="meal.id"
        :meal="meal"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import MealItem from '~/components/meal-item.vue';
import Loader from '~/components/loader.vue'; // Adjust based on actual component location
import { shuffleMeals } from '~/utils/randomize'; // Import the shuffleMeals utility

const props = defineProps({
  meals: {
    type: Array,
    required: true,
  },
});

const meals = ref([]);
const loading = ref(true); // Start with the loader as true
let isFirstLoad = true; // Flag for the first load

// Watch for changes in props.meals and reapply shuffling with loader
watch(() => props.meals, (newMeals) => {
  if (isFirstLoad) {
    meals.value = shuffleMeals([...newMeals]); // Shuffle meals once on initial load
    isFirstLoad = false; // Mark as not the first load
    loading.value = false; // Hide the loader after the first load
  } else {
    loading.value = true; // Show loader for subsequent updates
    setTimeout(() => {
      meals.value = shuffleMeals([...newMeals]); // Shuffle meals
      loading.value = false; // Hide loader
    }, 150);
  }
}, { immediate: true }); // Handle the initial load
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
</style>
  