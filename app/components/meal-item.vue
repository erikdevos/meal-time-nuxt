<template>
  <article class="meal-item__wrapper">
    <NuxtLink
      class="meal-link"
      :to="`/meals/${meal.name.replace(/\s+/g, '-').replace(/[^a-z0-9-_]/gi, '').toLowerCase()}`"
    >
      <div class="meal-image-wrapper">
        <img
          :src="mealImageUrl(meal.name, baseURL)"
          :alt="'Gerecht ' + meal.name"
          loading="lazy"
        />
        <meal-labels class="meal-labels-overlay" :meal="meal" />
      </div>
      <div class="meal-info-wrapper">
        <h2>{{ meal.name }}</h2>
        <div class="short-description">{{ meal.description }}</div>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup>
  import { mealImageUrl } from '~/utils/mealImage';

  defineProps({
    meal: Object, // The meal data passed from parent
  });

  const baseURL = useRuntimeConfig().app.baseURL;
</script>

<style scoped>
.meal-item__wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background-color: var(--color-surface);
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s var(--ease), box-shadow 0.3s var(--ease),
    border-color 0.3s var(--ease);
}

.meal-link {
  display: flex;
  flex-direction: column;
  flex: 1;
  color: inherit;
  text-decoration: none;
}

.meal-image-wrapper {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background-color: var(--color-primary-soft);
}

.meal-image-wrapper img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.6s var(--ease);
}

.meal-labels-overlay {
  position: absolute;
  left: 0.75rem;
  right: 0.75rem;
  bottom: 0.75rem;
}

.meal-info-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 1.1rem 1.25rem 1.3rem;
}

.meal-info-wrapper h2 {
  margin: 0;
  font-size: 1.15rem;
  line-height: 1.25;
}

.short-description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: var(--color-muted);
  font-size: 0.95rem;
  line-height: 1.45;
}

@media (hover: hover) {
  .meal-item__wrapper:hover {
    transform: translateY(-4px);
    border-color: transparent;
    box-shadow: var(--shadow-md);
  }

  .meal-item__wrapper:hover .meal-image-wrapper img {
    transform: scale(1.06);
  }
}

.meal-link:focus-visible {
  outline-offset: -3px;
  border-radius: var(--radius-lg);
}

@media only screen and (max-width: 600px) {
  .meal-labels-overlay {
    left: 0.5rem;
    right: 0.5rem;
    bottom: 0.5rem;
  }

  .meal-info-wrapper {
    padding: 0.8rem 0.9rem 1rem;
  }

  .meal-info-wrapper h2 {
    font-size: 1rem;
  }

  .short-description {
    font-size: 0.85rem;
  }
}
</style>
