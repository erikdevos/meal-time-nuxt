<template>
  <div v-if="meal">
    <div class="meal-details-wrapper">

      <div class="meal-details-text">
        <h1>{{ meal.name }}</h1>
        <h2>{{ meal.description }}</h2>
        <p>{{ meal.recipe }}</p>
      </div>

      <div class="meal-details-image">
        <img
          :src="'../meal-images/medium/' + meal.name.replace(/\s+/g, '_').replace(/[^a-z0-9_]/gi, '').toLowerCase() + '.webp'"
          :alt="'Gerecht ' + meal.name"
          loading="lazy"
        />
      </div>

    <!-- More meal details here -->
  </div>
  
  </div>
  <div v-else>
    <p>Meal not found</p>
  </div>

  <NuxtLink :to="'/overview'">
        <button class="button primary">
          &lsaquo; Terug naar overzicht
        </button>
  </NuxtLink>

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

// Normalize the meal name (convert to lowercase, replace spaces and hyphens with underscores, remove non-alphanumeric characters)
const normalizeMealName = (name) => {
  return name.toLowerCase().replace(/[\s\-]+/g, '_').replace(/[^a-z0-9_]/gi, '');
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

    // Normalize both the meal name from URL and the name in the JSON data
    const normalizedMealName = normalizeMealName(mealName);

    // Find the meal by its normalized name and cache it
    const foundMeal = data.find(item => {
      const normalizedItemName = normalizeMealName(item.name); // Normalize the name in JSON data
      console.log(`Comparing normalized names: ${normalizedItemName} === ${normalizedMealName}`);
      return normalizedItemName === normalizedMealName;
    }) || null;

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
  const mealNameFromUrl = route.params['mealname']
  console.log('Route param mealname:', mealNameFromUrl) // Log the meal name from the URL
  if (mealNameFromUrl) {
    fetchMealDetail(mealNameFromUrl)
  } else {
    console.warn('No meal name in URL')
  }
})
</script>

<style scoped>
.meal-details-wrapper {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 0.9rem;
  background-color: var(--color-white);

  @media only screen and (max-width: 900px) {
    flex-wrap: wrap;
    padding: 1.2rem;
  }
  
}

h1 {
  font-size: 2rem;
  word-break: break-word;
  margin-bottom: 0.5rem;
  @media only screen and (max-width: 900px) {
    margin-bottom: 0;
  }
}

h2 {
  font-size: 1.3rem;
  word-break: break-word;
  @media only screen and (max-width: 900px) {
    font-size: 1.1rem;
  }
}

.meal-details-text {
  max-width: 55ch;
  word-break: break-word;
  p {
    &:last-of-type {
      margin-bottom: 0;
    }
  }
}

.meal-details-image{
  max-width: 100%;
  width: auto;
  height: auto;
  margin-left: auto;
  @media only screen and (max-width: 900px) {
   max-width: none;
   margin-left: initial;
  }
  img {
    width: 100%;
    border-radius: 10px;
  }
}
</style>
