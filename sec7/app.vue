<template>
  <div class="bg-gray-900 p-3">
    <header class="flex items-center gap-4">
      <div class="text-xl text-slate-300">大阪コード学園</div>
      <div class="flex gap-4">
        <button @click="deleteCustomer()"
          class="border-2 border-solid bg-gray-900 rounded p-4 text-xl text-slate-300">Delete First Customer</button>
        <button v-if="existSelectedCustomer" @click="deleteSelectedCustomers()"
          class="border-2 border-solid bg-gray-900 rounded p-4 text-xl text-slate-300">Delete Selected Customer</button>
      </div>
    </header>
    <ContentsContainer>
      <ListContainer title="Mysterious Customers">
        <CustomerList>
          <Message v-if="customers.length === 0">There is no customers...</Message>
          <CustomerItem v-for="c in customers" :editable="true" :item="c" />
        </CustomerList>
      </ListContainer>

      <ListContainer title="Selected Customers">
        <CustomerList>
          <Message v-if="!existSelectedCustomer">There is no selected customers...</Message>
          <CustomerItem v-for="c in selectedCustomers" :item="c" :editable="false" />
        </CustomerList>
      </ListContainer>
    </ContentsContainer>
  </div>
</template>

<script setup>

// 顧客一覧
const customers = ref([
  {
    name: "Bonnie Green",
    email: "bonnie@windster.com",
    image: "https://randomuser.me/api/portraits/women/17.jpg",
    amount: 3467,
    isSelected: false,
  },
  {
    name: "Michael Gough",
    email: "michael@windster.com",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    amount: 67,
    isSelected: false,
  },
  {
    name: "Lana Byrd",
    email: "lana@windster.com",
    image: "https://randomuser.me/api/portraits/men/37.jpg",
    amount: 367,
    isSelected: false,
  },
  {
    name: "Thomes Lean",
    email: "thomes@windster.com",
    image: "https://randomuser.me/api/portraits/women/56.jpg",
    amount: 2367,
    isSelected: false,
  },
  {
    name: "大阪 太郎",
    email: "taro.osaka@windster.com",
    image: "https://pbs.twimg.com/profile_images/1057083258997956608/NWYuC6qb_400x400.jpg",
    amount: 572,
    isSelected: false,
  },
])

const selectedCustomers = computed(() => {
  return customers.value.filter(c => c.isSelected)
})

const existSelectedCustomer = computed(() => {
  return selectedCustomers.value.length > 0
})

// 先頭の顧客を削除する
function deleteCustomer() {
  return customers.value.shift()
}

// 選択された顧客を削除する
function deleteSelectedCustomers() {
  customers.value = customers.value.filter(c => !c.isSelected)
}
</script>
