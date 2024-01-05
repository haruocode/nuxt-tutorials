<template>
  <div class="w-full max-w-md p-4 border border-gray-200 rounded-lg shadow sm:p-8 bg-gray-800 border-gray-700">
    <div class="flex items-center justify-between mb-4">
      <h5 class="text-xl font-bold leading-none text-gray-900 text-white">
        {{ title }}
      </h5>
    </div>

    <div class="flow-root">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
