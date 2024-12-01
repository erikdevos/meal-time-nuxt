export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  debug: true,
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/meal-time-nuxt/' : '/',
    head: {
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex, nofollow' }
      ]
    }
  },
  generate: {
    routes: async () => {
      const mealData = await fetch('/data/meals.json').then(res => res.json());
      const routes = mealData.map(item => `/meal/${encodeURIComponent(item.name)}`);
      return routes;
    }
  }
});
