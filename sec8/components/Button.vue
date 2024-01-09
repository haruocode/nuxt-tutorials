<template>
  <button @click="$emit('click')" class="border-2 border-solid bg-gray-900 rounded p-4 text-xl text-slate-300">
    <slot></slot>
  </button>
</template>

<script setup>
defineEmits(['click'])
</script>
