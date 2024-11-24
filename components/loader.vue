<template>
    <!-- Loader element -->
    <div id="loader" class="loader-wrapper">
        <div class="loader-image">
            <img src="/loader.svg">
        </div>
    </div>
</template>

<style scoped>
.loader-wrapper {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  width: 100%;
  .loader-image {
        margin: 0 0 2em;
        height: 60px;
        width: 60px;
        text-align: center;
        padding: 1em;
        margin: 0 auto 1em;
        display: inline-block;
        vertical-align: top;
    }

    svg path,
    svg rect {
        fill: #FF6700;
    }
}

</style>