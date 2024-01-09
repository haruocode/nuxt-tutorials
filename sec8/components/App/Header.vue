<template>
  <header class="flex items-center gap-4">
    <Logo />
    <div class="flex gap-4">
      <MyButton @click="$emit('deleteCustomer')">Delete First Customer</MyButton>
      <MyButton :disabled="!existSelectedCustomer" @click="$emit('deleteSelectedCustomers')">Delete Selected Customer</MyButton>
    </div>
  </header>
</template>

<script setup>
defineProps(['existSelectedCustomer'])
defineEmits(['deleteCustomer', 'deleteSelectedCustomers'])
</script>
