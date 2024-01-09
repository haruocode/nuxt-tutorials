<template>
  <li class="py-3 sm:py-4">
    <div class="flex items-center">
      <div v-if="editable" class="w-6">
        <input v-model="item.isSelected" type="checkbox">
      </div>
      <div class="flex-shrink-0">
        <img class="w-8 h-8 rounded-full" :src="item.image" :alt="item.name" />
      </div>
      <div class="flex-1 min-w-0 ms-4">
        <p class="text-sm font-medium text-gray-900 truncate text-white">
          {{ item.name }}
        </p>
        <p class="text-sm text-gray-500 truncate text-gray-400">
          {{ item.email }}
        </p>
      </div>
      <div class="inline-flex items-center text-base font-semibold text-gray-900 text-white">
        {{ `$${item.amount.toLocaleString()}` }}
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
defineProps<{
  item: any
  editable: boolean
}>()
</script>
