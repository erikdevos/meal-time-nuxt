<template>
  <ul v-if="labels.length" class="category-labels">
    <li
      v-for="label in labels"
      :key="label.key"
      class="category-label"
      :class="`category-label--${label.key}`"
    >
      {{ label.text }}
    </li>
  </ul>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  meal: {
    type: Object,
    required: true,
  },
});

// Labels follow the meal flags in the data ("1" = yes)
const LABELS = [
  { key: 'healthy', text: 'Gezond' },
  { key: 'cheap', text: 'Goedkoop' },
  { key: 'fast', text: 'Snel' },
  { key: 'treat', text: 'Speciaal' },
];

const labels = computed(() => LABELS.filter((label) => props.meal[label.key] === '1'));
</script>

<style scoped>
.category-labels {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.category-label {
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.65rem;
  border-radius: var(--radius-pill);
  font-size: 0.78rem;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0.01em;
  box-shadow: 0 1px 3px rgba(23, 43, 30, 0.18);
}

@media only screen and (max-width: 600px) {
  .category-labels {
    gap: 0.25rem;
  }

  .category-label {
    padding: 0.1rem 0.5rem;
    font-size: 0.68rem;
  }
}

.category-label--healthy {
  color: var(--label-healthy-fg);
  background-color: var(--label-healthy-bg);
}

.category-label--cheap {
  color: var(--label-cheap-fg);
  background-color: var(--label-cheap-bg);
}

.category-label--fast {
  color: var(--label-fast-fg);
  background-color: var(--label-fast-bg);
}

.category-label--treat {
  color: var(--label-treat-fg);
  background-color: var(--label-treat-bg);
}
</style>
