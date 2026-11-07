<template>
    <!-- For error messages -->
    <div id="messageContainer">
        <p v-if="error" class="message error" role="alert">{{ error }}</p>
    </div>
</template>

<script setup>
defineProps({
  error: {
    type: String,
    default: '',
  },
});
</script>

<style scoped>
.message {
    margin-top: 0;
    margin-bottom: 2rem;
    padding: 0.8rem 1rem;
    border-radius: 0.7rem;

    &.error {
        background-color: #fbeaea;
        color: #7a1f1f;
    }
}
</style>
