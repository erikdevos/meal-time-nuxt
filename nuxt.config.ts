// nuxt.config.js or related config file
export default {
  generate: {
    routes: async () => {
      const fs = require('fs');
      const path = require('path');
      try {
        // Read the meals.json file from the local filesystem (in public/data)
        const filePath = path.resolve(__dirname, 'public/data/meals.json');
        const mealData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        // Log the meal data to verify its structure
        console.log('Meal Data:', mealData);

        // Generate dynamic routes for each meal, ensuring it's a valid string
        const routes = mealData.map((item) => `/meal/${item.name}`); // Simplified, no encoding

        // Log generated routes
        console.log('Generated Routes:', routes);

        // Return the generated routes
        return routes;
      } catch (error) {
        console.error('Error generating routes:', error);
        return []; // Return an empty array if there's an error
      }
    }
  }
}
