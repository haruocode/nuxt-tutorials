<template>
  <div>
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-indigo-600 mb-4">WishWay</h1>
      <p class="text-xl text-gray-600 mb-8">あなたの願いを叶える場所</p>

      <div class="flex justify-center gap-4">
        <UButton to="/wishlists" color="indigo" size="lg">願いリストを見る</UButton>
        <UButton v-if="!user" to="/login" color="white" variant="outline" size="lg">ログイン</UButton>
        <UButton v-else to="/my-wishlist" color="white" variant="outline" size="lg">マイリストを管理</UButton>
      </div>
    </div>

    <div class="grid md:grid-cols-2 gap-12 mt-16">
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-2xl font-semibold mb-4">願いリストを共有しよう</h2>
        <p class="text-gray-600 mb-4">あなたの願いを登録して、友達や家族と共有しましょう。誕生日やイベントのプレゼントに最適です。</p>
        <UButton to="/wishlists" color="indigo" variant="ghost">願いリストを探す</UButton>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-2xl font-semibold mb-4">願いを叶えよう</h2>
        <p class="text-gray-600 mb-4">友達の願いリストを見て、願いを叶えてあげましょう。サプライズプレゼントにぴったりです。</p>
        <UButton to="/wishlists" color="indigo" variant="ghost">願いを叶える</UButton>
      </div>
    </div>
  </div>
</template>

<script setup>
const user = useSupabaseUser()
</script>
