<template>
    <header class="page-row-wrapper">
        <div class="container">
            <h1>Wat eten we?</h1>
        </div>
    </header>
</template>

<style scoped>
    header {
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;
        background-color: var(--color-primary-hover);
        margin-bottom: 5rem;
        color: var(--color-white);
        box-shadow: 0px 5px 13px rgba(68, 68, 68, 0.2705882353);

        @media only screen and (max-width: 600px) {
            padding-top: 1rem;
            padding-bottom: 1rem;
            margin-bottom: 1rem;
        }

        h1 {
            color: inherit;
            margin-bottom: 0;
            @media only screen and (max-width: 600px) {
                text-align: center;
            }
        }

    }

</style>