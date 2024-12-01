// Ensure this is inside your nuxt.config.js or relevant configuration
export default {
  generate: {
    routes: async () => {
      const fs = require('fs');
      const path = require('path');
      try {
        // Read the meals.json file from the local filesystem (in public/data)
        const filePath = path.resolve(__dirname, 'public/data/meals.json');
        const mealData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        // Generate dynamic routes for each meal
        const routes = mealData.map((item) => `/meal/${encodeURIComponent(item.name)}`);

        // Return the generated routes
        return routes;
      } catch (error) {
        console.error('Error generating routes:', error);
        return []; // Return an empty array if there's an error
      }
    }
  }
};
