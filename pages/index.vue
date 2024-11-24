<template>
    <overview />
</template>

<style>
:root {
  --color-white: #ffffff;
  --color-black: #222222;
  --color-mid-gray: #404040;
  --color-primary: #6bac6b;
  --color-primary-hover: #568b56;
  --color-secondary: #6b80ac;
  --color-secondary-hover: #5a6b91;
}

html {
  box-sizing: border-box;
}

h1, h2, h3, h4, h5 {
  margin-top: 0;
}

* {
  box-sizing: inherit;
}
*:before {
  box-sizing: inherit;
}
*:after {
  box-sizing: inherit;
}

body {
  margin: 0;
  font-family: "Raleway", sans-serif;
  font-size: 1rem;
  line-height: 1.3;
  background-color: #eaeaea;
}

button {
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
  padding-left: 1.2rem;
  padding-right: 1.2rem;
  cursor: pointer;
  border: none;
  outline: none;
  border-radius: 0.7rem;
  font-size: 1rem;
  transition: all ease-in-out 0.5s;
}
button.primary {
  color: var(--color-white);
  background-color: var(--color-primary);
}
button.primary:hover {
  background-color: var(--color-primary-hover);
}
button.secondary {
  color: var(--color-white);
  background-color: var(--color-secondary);
}
button.secondary:hover {
  background-color: var(--color-secondary-hover);
}
button.secondary.active {
  background-color: var(--color-secondary-hover);
}
button:hover {
  padding-left: 1.2rem;
  padding-right: 1.2rem;
}

.selected-meals {
  margin-bottom: 2rem;
  font-size: 1.2rem;
}
.selected-meals .label {
  margin-right: 0.5rem;
  font-weight: bold;
}
.selected-meals .selected-meal {
  font-weight: bold;
  color: var(--color-primary-hover);
}

ul li {
  font-family: inherit;
}

pre {
  word-break: break-word;
}

@media only screen and (max-width: 600px) {
  .main-content-section h1 {
    font-size: 1.5rem;
    word-break: break-word;
  }
}

.page-row-wrapper {
  width: 100%;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
@media only screen and (max-width: 1200px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

.category-labels {
    display: flex;
    align-items: center;
    list-style: none;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding-left: 0;
    margin-top: 0;
    margin-bottom: 0;
    li {
        display: inline-flex;
        padding-top: 0.2rem;
        padding-bottom: 0.2rem;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        border-radius: 1rem;
        margin-bottom: 0;
        background-color: var(--color-primary-hover);
        color: var(--color-white);
        font-size: 0.8rem;
        font-weight: bold;
    }
}
</style>