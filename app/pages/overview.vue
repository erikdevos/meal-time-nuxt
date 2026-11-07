<template>
  <div>
    <selected-meals />
    <search-bar @search="searchQuery = $event" />
    <filter-bar
      :total="filteredMeals.length"
      @updateFilters="activeFilters = $event"
      @shuffle="shuffle"
    />
    <messages :error="errorMessage" />
    <meal-overview :meals="filteredMeals" :loading="loading" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { shuffleMeals } from '~/utils/randomize';
import { fetchMeals } from '~/utils/meals';
import SelectedMeals from '~/components/selected-meals.vue';
import SearchBar from '~/components/search-bar.vue';
import FilterBar from '~/components/filter-bar.vue';
import Messages from '~/components/messages.vue';
import MealOverview from '~/components/meal-overview.vue';

// Single source of truth: the full list is never overwritten by filters or search.
const meals = ref([]); // Original meal data (order changes only via shuffle)
const searchQuery = ref('');
const activeFilters = ref([]); // e.g. ['healthy', 'fast']
const loading = ref(true);
const errorMessage = ref('');

// Visible meals = all meals that match every active filter AND the search query
const filteredMeals = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  return meals.value.filter((meal) => {
    const matchesFilters = activeFilters.value.every((filter) => meal[filter] === '1');
    const matchesSearch =
      !query ||
      meal?.name?.toLowerCase().includes(query) ||
      meal?.description?.toLowerCase().includes(query);

    return matchesFilters && matchesSearch;
  });
});

// Fetch meals data from external source
const fetchMealsData = async () => {
  try {
    meals.value = [...(await fetchMeals())];
  } catch (err) {
    console.error('Error getting meals:', err);
    errorMessage.value = 'De gerechten konden niet worden geladen. Probeer het later opnieuw.';
  } finally {
    loading.value = false;
  }
};

// Randomize the order; filters and search stay applied
const shuffle = () => {
  meals.value = shuffleMeals([...meals.value]);
};

// Fetch meal data on component mount
onMounted(() => {
  fetchMealsData();
});
</script>
