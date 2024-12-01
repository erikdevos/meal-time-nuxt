export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  debug: true,
  app: {
    baseURL: '/meal-time-nuxt/',
    head: {
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex, nofollow' }
      ]
    }
  }
});
