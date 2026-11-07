<template>
  <div id="dataContainer">
    <div v-if="loading">
      <loader />
    </div>
    <p v-else-if="!meals.length" class="no-results">Geen gerechten gevonden.</p>
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
import MealItem from '~/components/meal-item.vue';
import Loader from '~/components/loader.vue';

defineProps({
  meals: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>


<style scoped>
  .no-results {
    margin-bottom: 5rem;
  }

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
