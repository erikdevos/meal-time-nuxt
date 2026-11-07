# Meal Time

Overzicht van gerechten ("Wat eten we?") met zoeken, filters (Gezond, Betaalbaar, Snel, Speciaal), shuffle en een detailpagina per gerecht. Gebouwd met [Nuxt 4](https://nuxt.com) en Vue 3, als statische site gepubliceerd op GitHub Pages.

De gerechten worden bij het laden opgehaald uit een externe JSON:
`https://erikdevos.github.io/meal-time-data/meals.json` (repository `meal-time-data`).

## Vereisten

- Node.js `^22.22.3` of nieuwer (zie `engines` van Nuxt)
- pnpm 12, de versie staat in het veld `packageManager` van `package.json`. Oudere pnpm-versies kunnen de lockfile niet lezen; werk bij met `pnpm self-update`.

## Ontwikkelen

```bash
pnpm install
pnpm dev
```

De dev-server draait op `http://localhost:3000` (of de eerstvolgende vrije poort).

## Structuur

- `app/` — de applicatie: `pages/`, `components/` en `utils/`
  - `utils/meals.ts` haalt de gerechten op (eenmalig, gedeeld tussen pagina's)
  - `utils/formatRecipe.ts` zet de receptteksten om naar kopjes en lijsten
- `public/` — statische bestanden en gerechtafbeeldingen (`meal-images/medium/<naam>.webp`)
- `nuxt.config.ts` — configuratie, inclusief de `BASE_URL` voor GitHub Pages

## Statische site genereren

```bash
BASE_URL=/meal-time-nuxt/ pnpm generate
```

De uitvoer staat daarna in `.output/public`. Een lokale preview kan met `pnpm preview`.

## Deploy

Een push naar `main` start de workflow `.github/workflows/gh-pages.yml`. Die installeert de dependencies met de lockfile, genereert de site met `BASE_URL=/meal-time-nuxt/` en publiceert `.output/public` naar de branch `gh-pages`.

## Bekende beperking

In de bron-JSON zijn bij sommige recepten de regeleinden vervangen door een letterlijke "n". `formatRecipe.ts` herstelt alleen wat eenduidig is (lijstregels en kopjes). Volledig herstel vraagt een nieuwe export van de data.
