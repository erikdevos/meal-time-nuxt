export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  debug: true,
  app: {
    baseURL: process.env.BASE_URL || '', // Correctly handle the base URL dynamically
    head: {
      title: 'Wat eten we? - Meal Time',
      meta: [
        {
          name: 'apple-mobile-web-app-capable',
          content: 'yes'
        },
        { hid: 'robots', name: 'robots', content: 'noindex, nofollow' }
      ],
      link: [
        // Use runtimeConfig for dynamic base URL in production
        { rel: 'icon', type: 'image/x-icon', href: `${process.env.BASE_URL || ''}/favicon.ico` },
        { rel: 'icon', type: 'image/png', sizes: '512x512', href: `${process.env.BASE_URL || ''}/favicon.png` },
        { rel: 'icon', href: `${process.env.BASE_URL || ''}/favicon.svg` },
        { rel: "apple-touch-icon", type: "image/png", href: `${process.env.BASE_URL || ''}/favicon.svg` }
      ],
    }
  },
  router: {
    options: {
      strict: false // Set to `false` unless you want trailing slashes in your routes
    }
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || '' // Public base URL for components/templates
    }
  },
  generate: {
    // Ensure paths are prefixed with the correct base URL for static site generation
    routes: [
      '/' // Add routes explicitly if necessary
    ]
  }
});
