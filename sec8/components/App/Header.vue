<template>
  <header class="flex items-center gap-4">
    <Logo />
    <div class="flex gap-4">
      <Button @click="$emit('deleteCustomer')">Delete First Customer</Button>
      <Button v-if="existSelectedCustomer" @click="$emit('deleteSelectedCustomers')">Delete Selected Customer</Button>
    </div>
  </header>
</template>

<script setup>
defineProps(['existSelectedCustomer'])
defineEmits(['deleteCustomer', 'deleteSelectedCustomers'])
</script>
