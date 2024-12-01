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
import { ref } from 'vue';
import MealItem from '~/components/meal-item.vue';
import Loader from '~/components/loader.vue'; // Adjust based on actual component location

const props = defineProps({
  meals: {
    type: Array,
    required: true,
  },
});

const meals = ref(props.meals);
const loading = ref(false); // Start with the loader as false

// Update meals and show the loader
const updateMealsWithLoader = (filteredMeals) => {
  loading.value = true; // Show loader
  meals.value = []; // Clear current meals

  setTimeout(() => {
    meals.value = filteredMeals; // Update meals after delay
    loading.value = false; // Hide loader
  }, 200);
};

// Watch for changes in meals from search-bar and update meals with loader
watch(() => props.meals, (newMeals) => {
  updateMealsWithLoader(newMeals);
});
</script>

  
  <style scoped>
  .meals-container {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: 1fr;
    grid-column-gap: 3rem;
    grid-row-gap: 3rem;
    margin-bottom: 5rem;

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
  