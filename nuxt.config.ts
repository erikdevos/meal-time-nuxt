export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  debug: true,
  app: {
    baseURL: '', // Default to '' (empty) for local development
    head: {
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex, nofollow' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: `${process.env.BASE_URL || ''}/favicon.ico` },
        { rel: 'icon', type: 'image/png', sizes: '512x512', href: `${process.env.BASE_URL || ''}/favicon.png` },
        { rel: 'icon', href: `${process.env.BASE_URL || ''}/favicon.svg` }
      ],
      title: 'Wat eten we? - Meal Time'
    }
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || '' // Use this in your components/templates
    }
  }
});
