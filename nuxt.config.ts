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
      try {
        // Fetch meal data from the local meals.json file
        const mealData = await fetch('/data/meals.json').then(res => res.json());

        // Generate dynamic routes for each meal
        const routes = mealData.map(item => `/meal/${encodeURIComponent(item.name)}`);
        
        // Return the generated routes
        return routes;
      } catch (error) {
        console.error('Error generating routes:', error);
        return []; // Return an empty array if there's an error
      }
    }
  }
});
