<template>
  <div>
    <selected-meals />
    <search-bar :meals="meals" @updateMeals="handleUpdatedMeals" />
    <filter-bar :meals="filteredMeals" @updateMeals="updateMeals" />
    <messages />
    <meal-overview :meals="filteredMeals" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import SelectedMeals from '~/components/selected-meals.vue';
import SearchBar from '~/components/search-bar.vue';
import FilterBar from '~/components/filter-bar.vue';
import Messages from '~/components/messages.vue';
import MealOverview from '~/components/meal-overview.vue';

// Reactive meal lists
const meals = ref([]); // Original meal data
const filteredMeals = ref([]); // Filtered meal data

// Fetch meals data from external source
const fetchMealsData = async () => {
  try {
    const response = await fetch('https://jsonhost.com/json/5f19df4daab1bba7c467369dd44f8d8d');
    const data = await response.json();
    meals.value = data || [];
    filteredMeals.value = [...meals.value]; // Start with all meals
  } catch (err) {
    console.error('Error getting meals:', err);
  }
};

// Handle updates from the search-bar
const handleUpdatedMeals = (newMeals) => {
  filteredMeals.value = newMeals;
};

// Handle updates from the filter-bar
const updateMeals = (newMeals) => {
  filteredMeals.value = newMeals;
};

// Log filtered meals for debugging
watch(filteredMeals, (newMeals) => {
  console.log('Filtered Meals:', newMeals);
});

// Fetch meal data on component mount
onMounted(() => {
  fetchMealsData();
});
</script>
