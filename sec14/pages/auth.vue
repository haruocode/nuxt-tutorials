<template>
  <div class="w-full h-[100vh] bg-white">
    <div class="w-full flex items-center justify-center p-5 border-b border-b-gray-300">
      <NuxtLink to="/">Supabase Auth Test</NuxtLink>
    </div>

    <div class="max-w-[400px] mx-auto px-2">
      <div class="text-center my-6">Login</div>
      <div>
        <button @click="login('google')" type="button"
          class="flex items-center justify-center w-full text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 shadow-green-500/50 font-medium rounded-lg py-2.5 text-center">
          Login with Google
        </button>
        <br>
        <button @click="login('github')" type="button"
          class="flex items-center justify-center w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg py-2.5 text-center">
          Login with Github
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>

function login() {
  // some code comes here...
}

</script>
