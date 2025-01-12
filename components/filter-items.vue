<template>
  <div class="filter-items">
    <span class="label">Laat zien:</span>
    
    <button 
      class="secondary" 
      :class="{'active': activeFilters.includes('healthy')}"
      @click="toggleFilter('healthy')">
      Gezond
    </button>

    <button 
      class="secondary" 
      :class="{'active': activeFilters.includes('cheap')}"
      @click="toggleFilter('cheap')">
      Betaalbaar
    </button>

    <button 
      class="secondary" 
      :class="{'active': activeFilters.includes('fast')}"
      @click="toggleFilter('fast')">
      Snel
    </button>

    <button 
      class="secondary" 
      :class="{'active': activeFilters.includes('treat')}"
      @click="toggleFilter('treat')">
      Verwennerij
    </button>

  </div>
</template>

<script setup>
const emit = defineEmits(['updateMeals']);
const activeFilters = ref([]);

// Toggle the filter active state
const toggleFilter = (filter) => {
  if (activeFilters.value.includes(filter)) {
    activeFilters.value = activeFilters.value.filter(f => f !== filter);
  } else {
    activeFilters.value.push(filter);
  }
  emit('updateMeals', activeFilters.value); // Pass the active filters to the parent
};
</script>

<style scoped>
.filter-items {
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
</style>
