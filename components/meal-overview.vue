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
  import { ref, onMounted } from 'vue';
  import MealItem from '~/components/meal-item.vue';
  
  const props = defineProps({
    meals: {
      type: Array,
      required: true,
    },
  });
  
  const loading = ref(true);
  
  // Simulating a delay for loading state
  onMounted(() => {
    setTimeout(() => {
      loading.value = false;
    }, 500);
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
  }
  
  @media only screen and (max-width: 900px) {
    .meals-container {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      grid-column-gap: 2rem;
      grid-row-gap: 2rem;
    }
  }
  
  @media only screen and (max-width: 500px) {
    .meals-container {
      grid-template-columns: repeat(1, minmax(0, 1fr));
      grid-column-gap: 0;
      grid-row-gap: 3rem;
    }
  }
  </style>
  