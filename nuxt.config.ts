export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  debug: true,
  app: {
    // Use environment variable or fallback to empty
    baseURL: process.env.BASE_URL || '', 
    head: {
      meta: [
        // Set meta settings for app
        { hid: 'robots', name: 'robots', content: 'noindex, nofollow' }
      ],
      // Page title
      title: 'Wat eten we? - Meal Time', 
    }
  }
});
