<template>
  <div class="bg-gray-900 p-3">
    <header class="flex items-center gap-4">
      <div class="text-xl text-slate-300">大阪コード学園</div>
      <div class="flex gap-4">
        <button @click="deleteCustomer()"
          class="border-2 border-solid bg-gray-900 rounded p-4 text-xl text-slate-300">Delete First Customer</button>
        <!-- TODO 顧客が1名以上選択されている場合に表示させる -->
        <button @click="deleteSelectedCustomer()"
          class="border-2 border-solid bg-gray-900 rounded p-4 text-xl text-slate-300">Delete Selected Customer</button>
      </div>
    </header>
    <div class="flex gap-8 p-5 bg-gray-900 antialiased">
      <div class="w-full max-w-md p-4 border border-gray-200 rounded-lg shadow sm:p-8 bg-gray-800 border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h5 class="text-xl font-bold leading-none text-gray-900 text-white">
            Mysterious Customers
          </h5>
        </div>

        <div class="flow-root">
          <ul role="list" class="divide-y divide-gray-200 divide-gray-700">
            <li v-for="c in customers" class="py-3 sm:py-4">
              <div class="flex items-center">
                <div class="w-6">
                  <input v-model="c.isSelected" type="checkbox">
                </div>
                <div class="flex-shrink-0">
                  <img class="w-8 h-8 rounded-full" :src="c.image" :alt="c.name" />
                </div>
                <div class="flex-1 min-w-0 ms-4">
                  <p class="text-sm font-medium text-gray-900 truncate text-white">
                    {{ c.name }}
                  </p>
                  <p class="text-sm text-gray-500 truncate text-gray-400">
                    {{ c.email }}
                  </p>
                </div>
                <div class="inline-flex items-center text-base font-semibold text-gray-900 text-white">
                  {{ `$${c.amount.toLocaleString()}` }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="w-full max-w-md p-4 border border-gray-200 rounded-lg shadow sm:p-8 bg-gray-800 border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h5 class="text-xl font-bold leading-none text-gray-900 text-white">
            Selected Customers
          </h5>
        </div>

        <div class="flow-root">

          <!-- TODO 選択された顧客がいない場合に表示させる -->
          <div class="text-gray-400">There is no selected customers...</div>

          <ul role="list" class="divide-y divide-gray-200 divide-gray-700">
            <li v-for="c in selectedCustomers" class="py-3 sm:py-4">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <img class="w-8 h-8 rounded-full" :src="c.image" :alt="c.name" />
                </div>
                <div class="flex-1 min-w-0 ms-4">
                  <p class="text-sm font-medium text-gray-900 truncate text-white">
                    {{ c.name }}
                  </p>
                  <p class="text-sm text-gray-500 truncate text-gray-400">
                    {{ c.email }}
                  </p>
                </div>
                <div class="inline-flex items-center text-base font-semibold text-gray-900 text-white">
                  {{ `$${c.amount.toLocaleString()}` }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
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

// TODO 算出プロパティに変更
const selectedCustomers = []

// TODO 算出プロパティに変更
const existSelectedCustomer = true

// 先頭の顧客を削除する
function deleteCustomer() {
  return customers.value.shift()
}

// 選択された顧客を削除する
function deleteSelectedCustomer() {
  customers.value = customers.value.filter(c => !c.isSelected)
}
</script>
