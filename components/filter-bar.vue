<template>
  <div class="button-bar">
      <button 
          id="refreshButton" 
          class="primary overview-refresh-button" 
          @click="refreshOverview">
          Shuffle 
          <span class="icon">
            <img src="/public/resources/icon_shuffle.svg" alt="">
          </span>
      </button>

      <div class="filter-toggles" style="display: none;">
          <span class="label">Laat zien:</span>
          <button 
              class="secondary" 
              :class="{'active': activeFilters.includes('betaalbaar')}"
              @click="toggleFilter('betaalbaar')">
              Betaalbaar
          </button>

          <button 
              class="secondary" 
              :class="{'active': activeFilters.includes('gezond')}"
              @click="toggleFilter('gezond')">
              Gezond
          </button>

          <button 
              class="secondary" 
              :class="{'active': activeFilters.includes('snel')}"
              @click="toggleFilter('snel')">
              Snel
          </button>

          <button 
              class="secondary" 
              :class="{'active': activeFilters.includes('verwennerij')}"
              @click="toggleFilter('verwennerij')">
              Verwennerij
          </button>
      </div>

      <!-- Sort by new -->
      <button 
          id="sortByNew" 
          style="display: none;" 
          @click="sortByNewest">
          Nieuwste
      </button>

      <!-- Show totals -->
      <div class="overview-totals" id="overviewTotals">
          <span id="totalResults">{{ totalResults }} gerechten</span>
      </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
meals: Array, // Meals data passed from the parent
});

const emit = defineEmits(['updateMeals']); // Define emit function for updating meals in the parent

const activeFilters = ref([]);
const totalResults = ref(0);

// Define the updateTotalResults function before calling it
const updateTotalResults = () => {
totalResults.value = props.meals.filter(meal =>
  activeFilters.value.every(filter => meal.categoryLabels.includes(filter))
).length;
};

// Watch the meals data and update the total count after filters are applied
watch(() => props.meals, updateTotalResults, { immediate: true });

// Fisher-Yates shuffle algorithm to randomize the array
const shuffleMeals = (array) => {
let currentIndex = array.length, randomIndex, temporaryValue;

// While there remain elements to shuffle...
while (currentIndex !== 0) {
  randomIndex = Math.floor(Math.random() * currentIndex);
  currentIndex -= 1;

  temporaryValue = array[currentIndex];
  array[currentIndex] = array[randomIndex];
  array[randomIndex] = temporaryValue;
}

return array;
};

// Refresh overview (reset filters and randomize meal order)
const refreshOverview = () => {
activeFilters.value = []; // Reset filters
updateTotalResults(); // Update the results count

// Shuffle meals and emit the new order to the parent
const shuffledMeals = shuffleMeals([...props.meals]);
emit('updateMeals', shuffledMeals);
};

const toggleFilter = (filter) => {
if (activeFilters.value.includes(filter)) {
  activeFilters.value = activeFilters.value.filter(f => f !== filter);
} else {
  activeFilters.value.push(filter);
}
updateTotalResults(); // Update the results count after filter change
};

const sortByNewest = () => {
props.meals.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
updateTotalResults(); // Update the results count after sorting
};
</script>

<style scoped>
.button-bar {
  display: flex;
  align-items: center;
  margin-bottom: 3rem;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    margin-bottom: 1.5rem;
  }

  .overview-refresh-button {
    margin-right: 1rem;

    @media only screen and (max-width: 600px) {
      margin-right: 0;
      margin-bottom: 1rem;
    }
  }

  .filter-toggles {
    display: flex;
    align-items: center;
    @media only screen and (max-width: 600px) {
      flex-wrap: wrap;
      row-gap: 0.5rem;
      margin-bottom: 1rem;
    }
    .label {
      margin-right: 1rem;
      font-weight: bold;
    }

    button {
      margin-right: 0.5rem;
      background-color: gray;

      &.active {
        background-color: var(--color-primary-hover);
      }

      &:hover {
        background-color: var(--color-primary);
      }

      &:last-of-type {
        margin-right: 0;
      }
    }
  }

  .overview-totals {
    margin-left: auto;
    color: var(--color-mid-gray);
    @media only screen and (max-width: 600px) {
      margin-left: initial;
      text-align: center;
    }
  }
}
</style>