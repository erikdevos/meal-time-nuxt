/**
 * Absolute URL of the image of a meal, including the app's base URL.
 *
 * Relative paths ("meal-images/...") break on GitHub Pages: /overview is redirected to
 * /overview/ and a relative path then resolves one directory too deep.
 *
 * @param name    meal name, e.g. "Pasta Pesto" -> pasta_pesto.webp
 * @param baseURL app base URL from useRuntimeConfig().app.baseURL (always ends with "/")
 */
export function mealImageUrl(name: string, baseURL: string): string {
  const fileName = name
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/gi, '')
    .toLowerCase();

  return `${baseURL}meal-images/medium/${fileName}.webp`;
}
