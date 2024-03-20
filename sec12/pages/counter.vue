<template>
  <h2>Counter</h2>
  <div>
    count: {{ count }}
  </div>
  <div>
    <button @click="increment()">increment</button>
  </div>
</template>

<script setup>

const count = ref(0)

function increment() {
  count.value++
}

</script>

<style></style>
