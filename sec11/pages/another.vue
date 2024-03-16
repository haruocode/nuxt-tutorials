<template>
  <div>
    <nuxt-link to="/">Home</nuxt-link> | Another page
  </div>
  <h2>Another page</h2>
  <div>
    count: {{ count }}
  </div>
  <div>
    <button @click="increment()">increment</button>
  </div>
</template>

<script setup>

const count = 999

function increment() {}

</script>

<style></style>
