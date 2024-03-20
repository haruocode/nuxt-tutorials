<template>
  <h2>Mouse</h2>
  <div>
    x: {{ x }}<br>
    y: {{ y }}
  </div>
</template>

<script setup>

const x = ref(0)
const y = ref(0)

function update(event) {
  x.value = event.pageX
  y.value = event.pageY
}

onMounted(() => window.addEventListener('mousemove', update))
onUnmounted(() => window.removeEventListener('mousemove', update))

</script>

<style></style>
