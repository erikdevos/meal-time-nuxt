<template>
    <!-- Search form -->
    <div class="search-form-wrapper">
      <form @submit.prevent="handleSearch">
        <input
          type="text"
          id="search-input"
          class="search-input"
          v-model="searchQuery"
          placeholder="Zoek een gerecht"
          autofocus
        />
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from 'vue';
  
  // Define the prop to receive meals
  const props = defineProps({
    meals: {
      type: Array,
      required: true
    }
  });
  
  const searchQuery = ref('');
  const emit = defineEmits();
  
  // Live search
  const handleSearch = () => {
    const filteredMeals = props.meals.filter(meal => 
      meal.attributes.naam.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
    emit('updateMeals', filteredMeals);
  };
  </script>  
  
  <style scoped>
  .search-form-wrapper {
    margin-bottom: 2rem;
    @media only screen and (max-width: 600px) {
      margin-bottom: 1.5rem;
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
  