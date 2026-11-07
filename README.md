# Meal Time

"Wat eten we?": een overzicht van gerechten waarin je kunt zoeken, filteren en shufflen, met een detailpagina per gerecht. Gebouwd met [Nuxt 4](https://nuxt.com) en Vue 3 en gepubliceerd als statische site op GitHub Pages.

De site is bewust niet indexeerbaar (`noindex, nofollow` in `nuxt.config.ts`).

## Functies

- **Overzicht** met alle gerechten als kaarten, inclusief afbeelding en labels.
- **Zoeken** op naam en omschrijving.
- **Filters** die je combineert (alle gekozen filters moeten kloppen): Gezond, Betaalbaar, Snel en Speciaal.
- **Teller** met het aantal gerechten dat na zoeken en filteren overblijft.
- **Shuffle** om de volgorde te husselen; zoekterm en filters blijven actief.
- **Detailpagina** op `/meals/<naam>` met omschrijving, recept en afbeelding.

## Data

De gerechten worden in de browser opgehaald uit een externe JSON, die in een aparte repository staat (`meal-time-data`):

```
https://erikdevos.github.io/meal-time-data/meals.json
```

Elk gerecht heeft deze velden: `id`, `name`, `description`, `recipe` en de vlaggen `healthy`, `cheap`, `fast` en `treat`. De vlaggen zijn teksten, `"1"` (ja) of `"0"` (nee).

Als de JSON niet laadt, toont het overzicht een foutmelding en de detailpagina een melding dat het gerecht niet geladen kon worden.

### Afbeeldingen

Elk gerecht verwacht een afbeelding in `public/meal-images/medium/<bestandsnaam>.webp`. De bestandsnaam wordt uit de naam van het gerecht afgeleid: kleine letters, spaties worden `_` en alle andere tekens behalve letters en cijfers vervallen. "Pasta Pesto" wordt dus `pasta_pesto.webp`. Ontbreekt het bestand, dan laadt de afbeelding van dat gerecht niet. Op dit moment hebben alle gerechten een afbeelding.

De URL wordt opgebouwd in `app/utils/mealImage.ts`, inclusief de base-URL (`/meal-time-nuxt/` op GitHub Pages). Gebruik dus nooit een relatief pad zoals `meal-images/...`: GitHub Pages stuurt `/overview` door naar `/overview/`, en een relatief pad zoekt dan een map te diep.

## Vereisten

- **Node.js** `^22.22.3`, `^24.15.0` of `>=26` (de eis van Nuxt 4.6). De CI gebruikt Node 22.
- **pnpm 12**. De exacte versie staat in het veld `packageManager` van `package.json`. Oudere pnpm-versies kunnen de lockfile niet lezen; werk bij met `pnpm self-update`.

## Ontwikkelen

```bash
pnpm install
pnpm dev
```

De dev-server draait op `http://localhost:3000`, of op de eerstvolgende vrije poort als die bezet is. In dev-modus is Nuxt DevTools beschikbaar (Shift + Option + D op de Mac).

| Script | Doet |
| --- | --- |
| `pnpm dev` | Start de dev-server |
| `pnpm generate` | Genereert de statische site (dit gebruikt de deploy) |
| `pnpm build` | Standaard Nuxt-productiebuild |
| `pnpm preview` | Standaard Nuxt-preview van een build |

### Dependencies bijwerken

pnpm 12 heeft twee beveiligingsregels die je tegenkomt bij `pnpm install`:

- **Build-scripts van dependencies zijn standaard geblokkeerd.** Alleen `esbuild` mag er een draaien; dat staat in `pnpm-workspace.yaml`. Een nieuwe dependency met een eigen build-script meldt `ERR_PNPM_IGNORED_BUILDS`; keur die dan goed met `pnpm approve-builds <pakket>`.
- **Zeer recente pakketversies worden geweigerd** (`minimumReleaseAge`, ongeveer een dag). Faalt `pnpm install --frozen-lockfile` daarop, dan staat er een versie in de lockfile die nog te nieuw is. Werk dat pakket dan opnieuw op met `pnpm update <pakket> --depth Infinity --lockfile-only` (pnpm kiest dan een versie die oud genoeg is), of wacht een dag.

## Projectstructuur

```
app/                    de applicatie (Nuxt 4 source-map)
  app.vue               hoofdlayout en alle globale stijlen (kleuren, knoppen, container)
  pages/
    index.vue           stuurt door naar /overview
    overview.vue        zoeken, filters, shuffle en teller; houdt de volledige lijst bij
    meals/[mealname].vue  detailpagina
  components/           o.a. search-bar, filter-bar, filter-items, meal-overview, meal-item
  utils/
    meals.ts            haalt de gerechten op (eenmalig, gedeeld tussen pagina's)
    formatRecipe.ts     zet receptteksten om naar kopjes en lijsten
    mealImage.ts        bouwt de afbeeldings-URL van een gerecht (met base-URL)
    randomize.ts        shuffle
public/                 statische bestanden, iconen en gerechtafbeeldingen
nuxt.config.ts          configuratie, inclusief BASE_URL voor GitHub Pages
pnpm-workspace.yaml     pnpm-instellingen (toegestane build-scripts)
.github/workflows/      deploy-workflow
```

`resources/` en `server/` in de root bevatten geen actieve code.

## Statische site genereren

Voor GitHub Pages draait de site onder het pad `/meal-time-nuxt/`. Dat stel je in met de omgevingsvariabele `BASE_URL`:

```bash
BASE_URL=/meal-time-nuxt/ pnpm generate
```

De uitvoer staat daarna in `.output/public`. Alle links en bestandspaden in die uitvoer beginnen met `/meal-time-nuxt/`, dus serveer de map onder dat pad als je hem lokaal bekijkt. Zonder `BASE_URL` genereer je een site voor de root van een domein.

## Deploy

Een push naar `main` start de workflow in `.github/workflows/gh-pages.yml` (hij is ook handmatig te starten). Die doet het volgende:

1. Haalt de code op en installeert pnpm en Node 22.
2. Installeert de dependencies met `pnpm install --frozen-lockfile`.
3. Genereert de site met `BASE_URL=/meal-time-nuxt/ pnpm generate`.
4. Zet een `.nojekyll`-bestand in `.output/public` en publiceert die map naar de branch `gh-pages`.

In de instellingen van de GitHub-repository moet GitHub Pages die branch (`gh-pages`) als bron gebruiken.

## Bekende beperkingen

- **Recepten:** in de bron-JSON zijn bij sommige recepten de regeleinden vervangen door een letterlijke "n". `formatRecipe.ts` herstelt alleen wat eenduidig is (lijstregels en kopjes boven een lijst); losse tekstregels kunnen nog "n"-tekens bevatten. Volledig herstel vraagt een nieuwe export van de data in `meal-time-data`.
- **Directe links naar een gerecht** (bijvoorbeeld `/meal-time-nuxt/meals/lasagne`) worden op GitHub Pages geserveerd via `404.html`. De pagina werkt gewoon, maar de HTTP-status is 404.
