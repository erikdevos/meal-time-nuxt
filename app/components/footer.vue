<template>
  <footer class="site-footer page-row-wrapper">
    <div class="container">
      <p>&copy; {{ year }} Meal Time</p>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear();
</script>

<style scoped>
.site-footer {
  border-top: 1px solid var(--color-border);
  padding-top: 2rem;
  padding-bottom: 2rem;
  color: var(--color-muted);
  font-size: 0.9rem;
  text-align: center;
}

.site-footer p {
  margin: 0;
}
</style>
