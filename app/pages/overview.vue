<template>
  <div>
    <selected-meals />

    <section class="intro">
      <h1>Wat eten we vandaag?</h1>
      <p>Zoek een gerecht, filter op wat jij nodig hebt of laat de shuffle beslissen.</p>
    </section>

    <div class="toolbar">
      <search-bar @search="searchQuery = $event" />
      <filter-bar
        :total="filteredMeals.length"
        @updateFilters="activeFilters = $event"
        @shuffle="shuffle"
      />
    </div>

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

<style scoped>
.intro {
  margin-bottom: 1.75rem;
}

.intro h1 {
  margin-bottom: 0.4rem;
  font-size: clamp(1.8rem, 1.2rem + 2.4vw, 2.6rem);
  font-weight: 800;
  letter-spacing: -0.03em;
}

.intro p {
  margin: 0;
  max-width: 52ch;
  text-wrap: balance;
  font-size: 1.1rem;
  color: var(--color-muted);
}

.toolbar {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  margin-bottom: 2rem;
}

@media only screen and (max-width: 600px) {
  .intro {
    margin-bottom: 1.25rem;
  }

  .intro p {
    font-size: 1rem;
  }

  .toolbar {
    gap: 0.9rem;
    margin-bottom: 1.5rem;
  }
}
</style>
