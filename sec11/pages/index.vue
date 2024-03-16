<template>
  <div>
    Home | <nuxt-link to="/another">Another page</nuxt-link>
  </div>
  <h2>Home</h2>
  <div>
    count: {{ store.count }}
  </div>
  <div>
    <button @click="store.increment()">increment</button>
  </div>
</template>

<script setup>

const store = {
  count: 999,
  increment: () => {}
}

</script>

<style></style>
