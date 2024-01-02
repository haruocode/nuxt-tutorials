<template>
    <div class="p-5 bg-white bg-gray-900 antialiased" style="height: 100vh">
      <div
        class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="flex items-center justify-between mb-4">
          <h5
            class="text-xl font-bold leading-none text-gray-900 dark:text-white"
          >
            Mysterious Customers
          </h5>
        </div>

        <div class="flow-root">
          <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
            <li class="py-3 sm:py-4">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <img class="w-8 h-8 rounded-full" src="https://pbs.twimg.com/profile_images/1057083258997956608/NWYuC6qb_400x400.jpg" alt="Neil image" />
                </div>
                <div class="flex-1 min-w-0 ms-4">
                  <p
                    class="text-sm font-medium text-gray-900 truncate dark:text-white"
                  >
                    大阪 太郎
                  </p>
                  <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                    taro.osaka@windster.com
                  </p>
                </div>
                <div
                  class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
                >
                  $5,729
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script setup>
// オブジェクト配列を設定する
// const customers = [
//   {
//     name: "大阪 太郎",
//     email: "taro.osaka@windster.com",
//     image: "https://pbs.twimg.com/profile_images/1057083258997956608/NWYuC6qb_400x400.jpg",
//     amount: 5729,
//   },
//   {
//     name: "Bonnie Green",
//     email: "bonnie@windster.com",
//     image: "https://randomuser.me/api/portraits/women/17.jpg",
//     amount: 3467,
//   },
//   {
//     name: "Michael Gough",
//     email: "michael@windster.com",
//     image: "https://randomuser.me/api/portraits/men/1.jpg",
//     amount: 67,
//   },
//   {
//     name: "Lana Byrd",
//     email: "lana@windster.com",
//     image: "https://randomuser.me/api/portraits/men/37.jpg",
//     amount: 367,
//   },
//   {
//     name: "Thomes Lean",
//     email: "thomes@windster.com",
//     image: "https://randomuser.me/api/portraits/women/56.jpg",
//     amount: 2367,
//   },
// ];
</script>
