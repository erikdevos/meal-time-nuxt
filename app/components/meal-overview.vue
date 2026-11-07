<template>
  <div id="dataContainer">
    <div v-if="loading">
      <loader />
    </div>
    <p v-else-if="!meals.length" class="no-results">
      Geen gerechten gevonden. Probeer een andere zoekterm of haal een filter weg.
    </p>
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
  margin: 1rem 0 3rem;
  padding: 2.5rem 1.5rem;
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-lg);
  color: var(--color-muted);
  text-align: center;
  background-color: var(--color-surface);
}

.meals-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15.5rem, 1fr));
  gap: 1.75rem;
  margin-bottom: 3rem;
}

@media only screen and (max-width: 600px) {
  .meals-container {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.9rem;
    margin-bottom: 2rem;
  }
}

@media only screen and (max-width: 300px) {
  .meals-container {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
