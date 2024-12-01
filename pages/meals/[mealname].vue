<template>
  <div>
    
    <div v-if="loading">
      <h1>Loading meal details...</h1>
    </div>

    <div v-else-if="meal" class="product-details-view">
      <h1>{{ meal.name }}</h1>
      
      <!-- Render the formatted description -->
      <h2 v-html="formattedDescription" class="meal-description"></h2>
      <p class="meal-season">{{ meal.seizoen }}</p>

      <p class="meal-recipe">{{ meal.recipe }}</p>
      
      <img
            :src="'/meal-images/medium/' + meal.name.replace(/\s+/g, '_').replace(/[^a-z0-9_]/gi, '').toLowerCase() + '.webp'"
            :alt="'Gerecht ' + meal.name"
            loading="lazy"
            class="product-detail-image"
      />
    </div>

    <div v-else>
      <h1>Meal not found</h1>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useState } from '#app'; // Import useState from Nuxt 3

// Define the reactive meal object and loading state
const meal = ref(null);
const loading = ref(true); // Track loading state
const route = useRoute();

// Use Nuxt's useState to cache the meal data for each individual meal
const cachedMeal = useState('cachedMeal', () => ({})); // Cache meal data

// Normalize the meal name (convert to lowercase and replace spaces with underscores)
const normalizeMealName = (name) => {
  console.log('Normalizing meal name:', name); // Debug the input to normalize
  return name
    .toLowerCase()                   // Convert to lowercase
    .replace(/\s+/g, '_')            // Replace spaces with underscores
    .replace(/-/g, '_')              // Replace hyphens with underscores
    .replace(/[^a-z0-9_]/gi, '');    // Remove any non-alphanumeric characters (except underscores)
};

// Fetch the meal data based on the meal name in the URL
const fetchMealDetail = async (mealName) => {
  try {
    console.log('Fetching meal details for:', mealName);

    if (cachedMeal.value[mealName]) {
      console.log('Using cached meal:', cachedMeal.value[mealName]);
      meal.value = cachedMeal.value[mealName];
      return;
    }

    const response = await fetch('/data/meals.json');
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API response data:', data);

    const normalizedMealName = normalizeMealName(mealName);
    console.log('Normalized meal name from URL:', normalizedMealName);

    const foundMeal = data.find((item) => {
      // Check if item.name exists before trying to normalize
      if (item.name) {
        const normalizedApiMealName = normalizeMealName(item.name);
        console.log('Normalized API meal name:', normalizedApiMealName);
        return normalizedApiMealName === normalizedMealName;
      }
      return false; // Skip items without a valid 'name' field
    }) || null;

    meal.value = foundMeal;

    if (foundMeal) {
      cachedMeal.value[mealName] = foundMeal;
      console.log('Found meal:', foundMeal);
    } else {
      console.warn(`Meal not found for: ${mealName}`);
    }
  } catch (err) {
    console.error('Error fetching meal detail:', err);
  } finally {
    loading.value = false;
    console.log('Loading finished, meal:', meal.value);
  }
};

// Fetch the meal data when the component is mounted or the route changes
onMounted(() => {
  const mealNameFromUrl = route.params['mealname'];
  console.log('Route params:', route.params); // Log all route params for debugging
  console.log('mealname from URL:', mealNameFromUrl); // Log the specific mealname parameter

  if (mealNameFromUrl) {
    loading.value = true; // Set loading state to true before fetching
    fetchMealDetail(mealNameFromUrl).finally(() => {
      loading.value = false; // Set loading to false once fetching is done
    });
  } else {
    console.warn('No meal name in URL'); // Log warning if no meal name is found
    loading.value = false; // Set loading to false if no meal name is present
  }
});

// Format the meal description (handle ## and nn)
const formatText = (text) => {
  // Replace ## with <h2> (for headings)
  text = text.replace(/^## (.*)/gm, '<h2>$1</h2>');
  
  // Replace nn with <br> for line breaks
  text = text.replace(/nn/g, '<br>');
  
  return text;
};

// Computed property to format and return the meal description
const formattedDescription = computed(() => {
  if (meal.value && meal.value.description) {
    return formatText(meal.value.description); // Apply formatting to description
  }
  return '';
});

</script>

<style scoped>
.product-details-view {
  margin-bottom: 3rem;
  img {
    width: 100%;
    height: auto;
  }

  h2 {
    font-size: 1rem;
  }

  .meal-recipe {
    word-break: break-word;
  }

}

</style>