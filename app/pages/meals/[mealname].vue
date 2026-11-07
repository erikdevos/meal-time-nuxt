<template>
  <div v-if="status === 'loading'">
    <loader />
  </div>

  <div v-else-if="status === 'error'" class="meal-message" role="alert">
    <p>Het gerecht kon niet worden geladen. Probeer het later opnieuw.</p>
  </div>

  <div v-else-if="meal">
    <div class="meal-details-wrapper">

      <div class="meal-details-text">
        <h1>{{ meal.name }}</h1>
        <h2>{{ meal.description }}</h2>

        <div class="meal-recipe">
          <template v-for="(block, index) in recipe" :key="index">
            <h3 v-if="block.type === 'heading'">{{ block.text }}</h3>
            <ul v-else-if="block.type === 'list'">
              <li v-for="(item, itemIndex) in block.items" :key="itemIndex">{{ item }}</li>
            </ul>
            <p v-else>{{ block.text }}</p>
          </template>
        </div>
      </div>

      <div class="meal-details-image">
        <img
          :src="mealImageUrl(meal.name, baseURL)"
          :alt="'Gerecht ' + meal.name"
          loading="lazy"
        />
      </div>

    <!-- More meal details here -->
  </div>

  </div>
  <div v-else class="meal-message">
    <p>Dit gerecht bestaat niet (meer).</p>
  </div>

  <NuxtLink :to="'/overview'">
        <button class="button primary">
          &lsaquo; Terug naar overzicht
        </button>
  </NuxtLink>

</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchMeals } from '~/utils/meals'
import { parseRecipe } from '~/utils/formatRecipe'
import { mealImageUrl } from '~/utils/mealImage'
import Loader from '~/components/loader.vue'

const route = useRoute()
const baseURL = useRuntimeConfig().app.baseURL

const meal = ref(null)
const status = ref('loading') // 'loading' | 'ready' | 'error'
const recipe = computed(() => parseRecipe(meal.value?.recipe))

// Normalize the meal name (convert to lowercase, replace spaces and hyphens with underscores, remove non-alphanumeric characters)
const normalizeMealName = (name) => {
  return String(name ?? '').toLowerCase().replace(/[\s\-]+/g, '_').replace(/[^a-z0-9_]/gi, '');
}

// Look up the meal from the shared meals list when the component is mounted
onMounted(async () => {
  try {
    const meals = await fetchMeals()
    const wanted = normalizeMealName(route.params['mealname'])

    meal.value = meals.find((item) => normalizeMealName(item.name) === wanted) || null
    status.value = 'ready'
  } catch (err) {
    console.error('Error fetching meal detail:', err)
    status.value = 'error'
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

.meal-message {
  margin-bottom: 2rem;
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

.meal-recipe {
  h3 {
    font-size: 1.05rem;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;

    &:first-child {
      margin-top: 0;
    }
  }

  ul {
    margin-top: 0;
    margin-bottom: 1rem;
    padding-left: 1.2rem;
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
