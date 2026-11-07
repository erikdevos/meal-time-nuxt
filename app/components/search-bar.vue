<template>
  <!-- Search form -->
  <form class="search-form-wrapper" role="search" @submit.prevent="handleSearch">
    <label for="search-input" class="sr-only">Zoek een gerecht</label>
    <div class="search-input-wrapper">
      <span class="search-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </span>
      <input
        type="text"
        id="search-input"
        class="search-input"
        v-model="searchQuery"
        placeholder="Zoek een gerecht"
        autocomplete="off"
        @input="handleSearch"
      />
      <button
        v-if="searchQuery"
        type="button"
        class="clear-button"
        aria-label="Zoekopdracht wissen"
        @click="clearSearch"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const searchQuery = ref('');
const emit = defineEmits(['search']);

let timeoutId = null; // To store the timeout ID

// Emit the search term after a slight delay; the parent does the actual filtering
const handleSearch = () => {
  clearTimeout(timeoutId);

  timeoutId = setTimeout(() => {
    emit('search', searchQuery.value);
  }, 300); // 300ms delay
};

// Clear the search input and reset immediately
const clearSearch = () => {
  clearTimeout(timeoutId);
  searchQuery.value = '';
  emit('search', '');
};
</script>

<style scoped>
.search-input-wrapper {
  position: relative;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 1.1rem;
  display: inline-flex;
  color: var(--color-muted);
  transform: translateY(-50%);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.95rem 3rem 0.95rem 3.1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  font: inherit;
  font-size: 1.05rem;
  color: var(--color-text);
  background-color: var(--color-surface);
  box-shadow: var(--shadow-sm);
  transition: border-color 0.2s var(--ease), box-shadow 0.2s var(--ease);
  appearance: none;
}

.search-input::placeholder {
  color: var(--color-muted);
}

.search-input:hover {
  border-color: #cbd5c9;
}

.search-input:focus-visible {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(46, 125, 79, 0.18);
}

.clear-button {
  position: absolute;
  top: 50%;
  right: 0.6rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: none;
  border-radius: 50%;
  color: var(--color-muted);
  background-color: var(--color-bg);
  transform: translateY(-50%);
  transition: background-color 0.2s var(--ease), color 0.2s var(--ease);
}

.clear-button:hover {
  color: var(--color-text);
  background-color: var(--color-border);
}

@media only screen and (max-width: 600px) {
  .search-input {
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    font-size: 1rem;
  }
}
</style>
