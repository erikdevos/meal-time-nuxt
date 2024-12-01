<template>
  <!-- Search form -->
  <div class="search-form-wrapper">
    <form @submit.prevent="handleSearch">
      <div class="search-input-wrapper">
        <input
          type="text"
          id="search-input"
          class="search-input"
          v-model="searchQuery"
          placeholder="Zoek een gerecht"
          autofocus
          @input="handleSearch"
        />
        <!-- Clear button always visible, but disabled when input is empty -->
        <button
          type="button"
          class="button primary no-animate clear-button"
          @click="clearSearch"
          :disabled="!searchQuery"
        >
          &times;
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  meals: {
    type: Array,
    required: true
  }
});

const searchQuery = ref('');
const emit = defineEmits(['updateMeals']);

let timeoutId = null; // To store the timeout ID

// Handle search with a slight delay
const handleSearch = () => {
  clearTimeout(timeoutId);

  timeoutId = setTimeout(() => {
    const filteredMeals = props.meals.filter(meal => {
      const searchText = searchQuery.value.toLowerCase();
      return (
        meal?.naam?.toLowerCase().includes(searchText) || 
        meal?.omschrijving?.toLowerCase().includes(searchText)
      );
    });

    emit('updateMeals', [...filteredMeals]);
  }, 300); // 300ms delay
};

// Clear the search input
const clearSearch = () => {
  searchQuery.value = '';
  emit('updateMeals', props.meals); // Reset to the full list of meals when cleared
};
</script>
  
  <style scoped>
  .search-form-wrapper {
    margin-bottom: 2rem;
    @media only screen and (max-width: 600px) {
      margin-bottom: 1.5rem;
    }
    .search-input-wrapper {
      display: flex;
      gap: 0.5rem;
    }
    input[type='text'] {
      padding-left: 1rem;
      padding-right: 1rem;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      font-size: 1rem;
      @media only screen and (max-width: 600px) {
        width: 100%;
      }
    }
  }

  
  </style>
  