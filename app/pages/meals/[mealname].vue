<template>
  <div class="meal-page">
    <NuxtLink to="/overview" class="back-link">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="m15 5-7 7 7 7" />
      </svg>
      Terug naar overzicht
    </NuxtLink>

    <div v-if="status === 'loading'">
      <loader />
    </div>

    <div v-else-if="status === 'error'" class="meal-message" role="alert">
      <p>Het gerecht kon niet worden geladen. Probeer het later opnieuw.</p>
    </div>

    <article v-else-if="meal" class="meal-details-wrapper">
      <div class="meal-details-image">
        <img
          :src="mealImageUrl(meal.name, baseURL)"
          :alt="'Gerecht ' + meal.name"
          loading="lazy"
        />
      </div>

      <div class="meal-details-text">
        <meal-labels :meal="meal" />
        <h1>{{ meal.name }}</h1>
        <p class="meal-description">{{ meal.description }}</p>

        <div class="meal-recipe">
          <template v-for="(block, index) in recipe" :key="index">
            <h2 v-if="block.type === 'heading'">{{ block.text }}</h2>
            <ul v-else-if="block.type === 'list'">
              <li v-for="(item, itemIndex) in block.items" :key="itemIndex">{{ item }}</li>
            </ul>
            <p v-else>{{ block.text }}</p>
          </template>
        </div>
      </div>
    </article>

    <div v-else class="meal-message">
      <p>Dit gerecht bestaat niet (meer).</p>
    </div>
  </div>
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
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 1.25rem;
  padding: 0.45rem 0.9rem 0.45rem 0.6rem;
  border-radius: var(--radius-pill);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: none;
  transition: background-color 0.2s var(--ease), transform 0.2s var(--ease);
}

.back-link:hover {
  background-color: var(--color-primary-soft);
}

.back-link:hover svg {
  transform: translateX(-2px);
}

.back-link svg {
  transition: transform 0.2s var(--ease);
}

.meal-message {
  padding: 2rem 1.5rem;
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-lg);
  color: var(--color-muted);
  text-align: center;
  background-color: var(--color-surface);
}

.meal-message p {
  margin: 0;
}

.meal-details-wrapper {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: 2.5rem;
  align-items: start;
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background-color: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.meal-details-image img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: var(--radius-md);
  background-color: var(--color-primary-soft);
}

.meal-details-text {
  min-width: 0;
  padding: 0.5rem 0.5rem 0.5rem 0;
  overflow-wrap: anywhere;
}

.meal-details-text h1 {
  margin: 0.8rem 0 0.4rem;
  font-size: clamp(1.8rem, 1.3rem + 2vw, 2.4rem);
  font-weight: 800;
  letter-spacing: -0.03em;
}

.meal-description {
  margin: 0 0 1.5rem;
  font-size: 1.1rem;
  color: var(--color-muted);
}

.meal-recipe h2 {
  margin: 1.5rem 0 0.5rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.meal-recipe h2:first-child {
  margin-top: 0;
}

.meal-recipe ul {
  margin: 0 0 1rem;
  padding: 0;
  list-style: none;
}

.meal-recipe li {
  position: relative;
  padding: 0.55rem 0 0.55rem 1.4rem;
  border-bottom: 1px solid var(--color-border);
}

.meal-recipe li:last-child {
  border-bottom: none;
}

.meal-recipe li::before {
  content: '';
  position: absolute;
  top: 1.05rem;
  left: 0.2rem;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: var(--color-primary);
}

.meal-recipe p {
  margin: 0 0 0.75rem;
}

@media only screen and (max-width: 900px) {
  .meal-details-wrapper {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.25rem;
    padding: 1rem;
  }

  .meal-details-text {
    padding: 0 0.25rem 0.5rem;
  }

  .meal-description {
    font-size: 1rem;
  }
}
</style>
