<template>
  <div class="bg-gray-900 p-3">
    <AppHeader />
    <ContentsContainer>
      <button @click="toggle()" type="button"
        class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">SWITCH</button>

      <button @click="increment()" type="button"
        class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Count Up</button>
      <MyConponent v-if="flag" :count="count" />
    </ContentsContainer>
  </div>
</template>

<script setup>

const flag = ref(false)
const count = ref(0)

function toggle() {
  flag.value = !flag.value
}

function increment() {
  count.value++;
}

</script>
