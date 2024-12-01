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
import { ref, watch, computed } from 'vue';
import SelectedMeals from '~/components/selected-meals.vue';
import SearchBar from '~/components/search-bar.vue';
import FilterBar from '~/components/filter-bar.vue';
import Messages from '~/components/messages.vue';
import MealOverview from '~/components/meal-overview.vue';
import { useState } from '#app'; // Import useState to access the global meals state

// Access global meal data from state
const meals = useState('meals');

// Filtered meals based on search or filter (computed to be reactive to `meals` state)
const filteredMeals = ref([...meals.value]);

// Watch for changes in the meals state and update filteredMeals
watch(meals, (newMeals) => {
  filteredMeals.value = [...newMeals]; // Reset filtered meals when meals data changes
}, { immediate: true });

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
</script>
