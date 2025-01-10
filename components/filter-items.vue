<template>
    <div class="filter-items" style="display: none;">
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
</template>

<script setup>

    const activeFilters = ref([]);

    const toggleFilter = (filter) => {
    if (activeFilters.value.includes(filter)) {
        activeFilters.value = activeFilters.value.filter(f => f !== filter);
    } else {
        activeFilters.value.push(filter);
    }
    updateTotalResults(); // Update the results count after filter change
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