// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@nuxt/ui'
  ],
  supabase: {
    // Supabaseの設定
    redirect: {
      login: '/login',
      callback: '/confirm',
      home: '/'
    }
  },
  runtimeConfig: {
    // 環境変数を設定
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    }
  }
})
