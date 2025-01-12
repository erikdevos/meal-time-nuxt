<template>
  <div class="meal-item__wrapper">
    <NuxtLink :to="`/meals/${meal.name.replace(/\s+/g, '-').replace(/[^a-z0-9-_]/gi, '').toLowerCase()}`">
      <div class="meal-image-wrapper">
        <img
          :src="'meal-images/medium/' + meal.name.replace(/\s+/g, '_').replace(/[^a-z0-9_]/gi, '').toLowerCase() + '.webp'"
          :alt="'Gerecht ' + meal.name"
          loading="lazy"
        />
        <ul class="category-labels">
          <!-- Display labels based on meal properties -->
          <li v-if="meal.healthy === '1'" class="category-label">Healthy</li>
          <li v-if="meal.cheap === '1'" class="category-label">Cheap</li>
          <li v-if="meal.fast === '1'" class="category-label">Fast</li>
          <li v-if="meal.treat === '1'" class="category-label">Treat</li>
        </ul>
      </div>
      <div class="meal-info-wrapper">
        <h2>{{ meal.name }}</h2>
        <div class="short-description">{{ meal.description }}</div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
  defineProps({
    meal: Object, // The meal data passed from parent
  });
</script>
  
<style scoped>
    .meal-item__wrapper {
        width: 100%;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        border-radius: 0.9rem;
        background-color: var(--color-white);
        display: flex;
        flex-direction: column;
        transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        overflow: hidden;
        a {
            color: inherit;
            text-decoration: none;
        }
        &:hover {
            transform: scale(1.05);
            cursor: pointer;
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
        }

        &.active {
            transform: scale(1.05);
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
            outline: solid 5px var(--color-primary);
        }

        .label {
          margin-right: 0.5rem;
          font-weight: bold;
        }
    }

    .meal-item__wrapper .meal-image-wrapper {
      position: relative;
      .category-labels {
        position: absolute;
        left: 0.7rem;
        bottom: 0.7rem;
        @media only screen and (max-width: 900px) {
          gap: 0.3rem;
          left: 0.5rem;
          bottom: 0.5rem;
        }
        li {
            padding-left: 0.5rem;
            padding-right: 0.5rem;
            @media only screen and (max-width: 900px) {
              font-size: 0.8rem;
              padding-top: 0.1rem;
              padding-bottom: 0.1rem;
              padding-left: 0.3rem;
              padding-right: 0.3rem;
              font-weight: normal;
            }
        }
      }
    }

    .meal-item__wrapper img {
        width: 100%;
        aspect-ratio: 5/3.5;
        display: block;
        object-fit: cover;
        object-position: center center;
        border-radius: 0.3rem;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    .meal-item__wrapper .meal-info-wrapper {
        padding: 1.5rem;
        @media only screen and (max-width: 900px) {
            padding: 1rem;
        }

        h2 {
            margin-top: 0;
            margin-bottom: 0.5rem;
            font-size: 1.2rem;
            line-height: 1.2;
            @media only screen and (max-width: 900px) {
                font-size: 1.1rem;
                margin-bottom: 0.3rem;
            }
        }

        .short-description {
            @media only screen and (max-width: 900px) {
                font-size: 0.8rem;
                line-height: 1.4;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;  
                overflow: hidden;
            }
        }
    }


</style>