<template>
  <header class="flex items-center gap-4">
    <Logo />
    <div class="flex gap-4"></div>
  </header>
</template>

<script setup>
defineProps(['existSelectedCustomer'])
defineEmits(['deleteCustomer', 'deleteSelectedCustomers'])
</script>
