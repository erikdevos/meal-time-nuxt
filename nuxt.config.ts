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
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/favicon.png' },
        { rel: 'icon', href: '/favicon.svg' },
      ],
      // Page title
      title: 'Wat eten we? - Meal Time', 
    }
  }
});
