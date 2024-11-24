<template>
  <selected-meals />
  
  <search-bar :meals="meals" @updateMeals="handleUpdatedMeals" />
  <filter-bar :meals="filteredMeals" @updateMeals="updateMeals" />
  
  <messages />
  <meal-overview :meals="filteredMeals" />
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import SearchBar from '~/components/search-bar.vue';
import FilterBar from '~/components/filter-bar.vue';
import MealOverview from '~/components/meal-overview.vue';

// Meal data (to be fetched from external URL)
const meals = ref([]);
const filteredMeals = ref([]);

// Fetch meals data from the external URL
const fetchMealsData = async () => {
  try {
    const response = await fetch('https://jsonhost.com/json/0dcaa1a6c5578a40b36bb10ef412f19e');
    const data = await response.json();
    meals.value = data || [];
    filteredMeals.value = [...meals.value];
  } catch (err) {
    console.error('Error fetching meals:', err);
  }
};

// Update filtered meals based on search/filter
const updateMeals = (newMeals) => {
  filteredMeals.value = newMeals;
};

// Watch for changes and log the filtered meals to debug
watch(filteredMeals, (newMeals) => {
  console.log(newMeals); // You can replace this with more debug logic
});

// Fetch data on component mount
onMounted(() => {
  fetchMealsData();
});
</script>
