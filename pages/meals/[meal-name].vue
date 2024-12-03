<template>
  <div v-if="meal">
    <h1>{{ meal.name }}</h1>
    <p>{{ meal.description }}</p>
    <!-- More meal details here -->
  </div>
  <div v-else>
    <p>Meal not found</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useState } from '#app' // Import useState from Nuxt 3

// Define the reactive meal object
const meal = ref(null)
const route = useRoute()

// Use Nuxt's useState to cache the meal data for each individual meal
const cachedMeal = useState(() => ({})) // Cache meal data

// Normalize the meal name (convert to lowercase and replace spaces with underscores)
const normalizeMealName = (name) => {
  return name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/gi, '')
}

// Fetch the meal data based on the meal name in the URL
const fetchMealDetail = async (mealName) => {
  try {
    if (cachedMeal.value[mealName]) {
      meal.value = cachedMeal.value[mealName]; // Use cached meal if available
      return;
    }

    const response = await fetch('https://erikdevos.github.io/meal-time-data/meals.json')
    const data = await response.json()

    console.log('Fetched data:', data) // Log the entire API response
    console.log('Meal name to search for:', mealName) // Log the meal name parameter

    // Find the meal by its name and cache it
    const foundMeal = data.find(item => item.naam && normalizeMealName(item.naam) === mealName) || null
    meal.value = foundMeal;

    if (foundMeal) {
      cachedMeal.value[mealName] = foundMeal; // Cache the meal data
    } else {
      console.warn(`No meal found with name: ${mealName}`)
    }

  } catch (err) {
    console.error('Error fetching meal detail:', err)
  }
}

// Fetch the meal data when the component is mounted or the route changes
onMounted(() => {
  const mealNameFromUrl = route.params['meal-name']
  console.log('Route param meal-name:', mealNameFromUrl) // Log the meal name from the URL
  if (mealNameFromUrl) {
    fetchMealDetail(mealNameFromUrl)
  } else {
    console.warn('No meal name in URL')
  }
})
</script>
