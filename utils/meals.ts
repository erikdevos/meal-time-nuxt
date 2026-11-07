const MEALS_URL = 'https://erikdevos.github.io/meal-time-data/meals.json';

let mealsPromise: Promise<any[]> | null = null;

/**
 * Fetch the meals once and share the result between pages.
 * A failed request is not cached, so the next call tries again.
 */
export function fetchMeals(): Promise<any[]> {
  if (!mealsPromise) {
    mealsPromise = fetch(MEALS_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Meals request failed with HTTP ${response.status}`);
        }
        return response.json();
      })
      .then((data) => (Array.isArray(data) ? data : []))
      .catch((error) => {
        mealsPromise = null;
        throw error;
      });
  }

  return mealsPromise;
}
