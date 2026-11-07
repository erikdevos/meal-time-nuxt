/**
 * Absolute URL of the image of a meal, including the app's base URL.
 *
 * Relative paths ("meal-images/...") break on GitHub Pages: /overview is redirected to
 * /overview/ and a relative path then resolves one directory too deep. They also break on
 * the detail pages (/meals/<name>).
 *
 * @param name    meal name, e.g. "Pasta Pesto" -> pasta_pesto.webp
 * @param baseURL app base URL from useRuntimeConfig().app.baseURL. This can be an empty
 *                string (no BASE_URL set) or lack a trailing slash, so it is normalised.
 */
export function mealImageUrl(name: string, baseURL: string): string {
  const base = baseURL.endsWith('/') ? baseURL : `${baseURL}/`;

  const fileName = name
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/gi, '')
    .toLowerCase();

  return `${base}meal-images/medium/${fileName}.webp`;
}
