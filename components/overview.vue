<template>
  <selected-meals />
  
  <search-bar :meals="meals" @updateMeals="handleUpdatedMeals" />
  <filter-bar :meals="filteredMeals" @updateMeals="updateMeals" />
  
  <messages />
  <meal-overview :meals="filteredMeals" />
</template>

<script setup>
import { ref, watch } from 'vue';
import mealsData from '~/public/data/meals.json';
import SearchBar from '~/components/search-bar.vue';
import FilterBar from '~/components/filter-bar.vue';
import MealOverview from '~/components/meal-overview.vue';

const meals = ref([...mealsData]); // Original meals data
const filteredMeals = ref([...mealsData]); // Meals after search/filter

// Update filtered meals based on search/filter
const updateMeals = (newMeals) => {
  filteredMeals.value = newMeals;
};

// Update filtered meals with the new data
const handleUpdatedMeals = (updatedMeals) => {
  filteredMeals.value = updatedMeals;
};

// Watch for changes and log the filtered meals to debug
watch(filteredMeals, (newMeals) => {
  console.log(newMeals); // You can replace this with more debug logic
});
</script>
