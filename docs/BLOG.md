# Blog & Sanity CMS — Cultivara Landing

Documentazione completa dell'integrazione blog con Sanity.io: setup, schema, real-time editing, revalidation e operatività editoriale.

## Indice

1. [Architettura & stack](#architettura--stack)
2. [Setup iniziale](#setup-iniziale)
3. [Variabili d'ambiente](#variabili-dambiente)
4. [Struttura file](#struttura-file)
5. [Content model](#content-model)
6. [Query GROQ](#query-groq)
7. [Real-time & Visual Editing](#real-time--visual-editing)
8. [Caching & revalidation webhook](#caching--revalidation-webhook)
9. [Pagine pubbliche & routing](#pagine-pubbliche--routing)
10. [Flusso editoriale: come pubblicare un articolo](#flusso-editoriale-come-pubblicare-un-articolo)
11. [Analytics eventi blog](#analytics-eventi-blog)
12. [SEO: metadata & JSON-LD](#seo-metadata--json-ld)
13. [TypeGen (tipi da GROQ)](#typegen-tipi-da-groq)
14. [Deploy checklist](#deploy-checklist)
15. [Troubleshooting](#troubleshooting)
16. [File di riferimento](#file-di-riferimento)

---

## Architettura & stack

| Componente | Uso | File principale |
|---|---|---|
| `next-sanity` | Client + `defineLive` + `VisualEditing` + `NextStudio` | `sanity/lib/live.ts`, `sanity/lib/client.ts` |
| `sanity` + `@sanity/vision` | Studio embedded + query tool | `sanity.config.ts` |
| `@sanity/image-url` | URL builder immagini ottimizzate (CDN) | `sanity/lib/image.ts` |
| `@portabletext/react` | Rendering del body ricco (Portable Text) | `components/blog/post-body.tsx` |
| `@sanity/icons` | Icone document type nello Studio | vari `sanity/schemas/*.ts` |

### Scelte architetturali

- **Studio embedded**: lo Studio Sanity vive sulla stessa Next.js app in [/studio](../app/studio/%5B%5B...tool%5D%5D/page.tsx). Un solo deploy, un solo dominio (`cultivara.it/studio`).
- **Real-time solo lato editor**: il pubblico riceve contenuti cachati e invalidati via webhook → `revalidateTag`. Gli editor vedono preview live dei draft tramite **Presentation Tool** + `VisualEditing`. Niente SSE streaming al visitor pubblico (meno carico, no `browserToken`).
- **defineLive anche senza streaming pubblico**: usato per unificare API di fetch (`sanityFetch`) con cache taggata. `<SanityLive />` NON renderizzato nel root layout — solo `<VisualEditing />` condizionale sotto draft mode.
- **Content model completo**: post + author + category + tag + SEO + related posts.

### Dataflow pubblico

```
visitor → /blog/mio-articolo
  ↓
Next.js (server) → sanityFetch (cache-tagged)
  ├─ cache HIT  → servito istantaneo
  └─ cache MISS → Sanity CDN → render + cache
  ↓
editor pubblica modifica in Studio
  ↓
Sanity webhook POST → /api/revalidate → revalidateTag("post:mio-articolo")
  ↓
cache invalidata → prossima richiesta ri-fetcha
```

### Dataflow editor (Visual Editing)

```
editor apre Presentation in Studio
  ↓
iframe apre /api/draft-mode/enable → setta cookie draft
  ↓
Next.js ri-renderizza con perspective: "previewDrafts"
  ↓
editor modifica campo → mutation realtime → VisualEditing ri-fetcha
  ↓
editor pubblica → webhook → cache pubblica invalidata
```

---

## Setup iniziale

### 1. Crea il progetto Sanity

1. Vai su [sanity.io/manage](https://www.sanity.io/manage) → **Create new project**.
2. Copia il **Project ID** (es. `abc12345`).
3. Il dataset di default è `production`.

### 2. Crea un viewer token

Nel progetto Sanity:
1. **API** → **Tokens** → **Add API token**
2. Nome: `Next.js viewer`
3. Permissions: **Viewer**
4. Copia il token (inizia con `sk...`). **Salvalo subito, non sarà più mostrato.**

### 3. Configura CORS origins

**API** → **CORS origins** → aggiungi:
- `http://localhost:3000` — Allow credentials ✓
- `https://cultivara.it` — Allow credentials ✓
- `https://www.cultivara.it` — Allow credentials ✓

### 4. Configura il webhook per la revalidation

**API** → **Webhooks** → **Create webhook**:

| Campo | Valore |
|---|---|
| Name | `Next.js revalidate` |
| URL | `https://cultivara.it/api/revalidate` |
| Dataset | `production` |
| Trigger on | `Create` + `Update` + `Delete` |
| Filter (GROQ) | `_type in ["post", "author", "category", "tag"]` |
| Projection | `{ "tags": [_type, _type + ":" + slug.current] }` |
| HTTP method | `POST` |
| API version | `2026-02-01` |
| Include drafts | ❌ (no) |
| Secret | genera un hex random (es. `openssl rand -hex 32`) e incollalo |

Salva il **Secret** nella variabile env `SANITY_REVALIDATE_SECRET`.

### 5. Genera `.env.local`

Copia `.env.example` → `.env.local` e compila i valori Sanity. Vedi [sezione env](#variabili-dambiente).

### 6. Deploy dello Studio (primo accesso)

```bash
pnpm dev
```

Vai su `http://localhost:3000/studio`, fai login con l'account Sanity. Al primo accesso lo Studio chiederà autorizzazione al progetto — accetta.

---

## Variabili d'ambiente

```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=abc12345        # dal pannello Sanity Manage
NEXT_PUBLIC_SANITY_DATASET=production         # quasi sempre "production"
NEXT_PUBLIC_SANITY_API_VERSION=2026-02-01     # fissato — non cambiare senza motivo

SANITY_API_READ_TOKEN=sk...                   # server-only, legge drafts (per preview editor)
SANITY_REVALIDATE_SECRET=a1b2c3...            # firma webhook revalidate
NEXT_PUBLIC_SITE_URL=http://localhost:3000    # redirect target del /api/draft-mode/disable
```

Le variabili `NEXT_PUBLIC_*` sono esposte al client. `SANITY_API_READ_TOKEN` e `SANITY_REVALIDATE_SECRET` sono **solo server** — mai usare in componenti client.

L'`apiVersion` va **bumpata manualmente** quando si vuole adottare nuove feature GROQ o client; fissarla evita breaking change silenziosi.

---

## Struttura file

```
sanity.config.ts                                # entry Studio (plugins: structure, presentation, vision)
sanity.cli.ts                                   # config per `pnpm sanity` CLI
sanity-typegen.json                             # config typegen GROQ → TS

sanity/
├── env.ts                                      # assert env vars + export projectId, dataset, apiVersion
├── schemas/
│   ├── index.ts                                # aggrega tutti gli schema
│   ├── post.ts                                 # document: Articolo
│   ├── author.ts                               # document: Autore
│   ├── category.ts                             # document: Categoria
│   ├── tag.ts                                  # document: Tag
│   ├── blockContent.ts                         # array type: Portable Text (body)
│   └── seo.ts                                  # object type: campi SEO riutilizzabili
└── lib/
    ├── client.ts                               # createClient (+ stega per Visual Editing)
    ├── live.ts                                 # defineLive → sanityFetch + SanityLive
    ├── image.ts                                # urlFor() image helper
    └── queries.ts                              # tutte le GROQ queries con defineQuery

app/
├── studio/
│   ├── layout.tsx                              # esporta metadata/viewport dello Studio
│   └── [[...tool]]/page.tsx                    # "use client" + <NextStudio config={config} />
├── blog/
│   ├── page.tsx                                # lista paginata (9 post/pagina)
│   ├── [slug]/page.tsx                         # dettaglio post + JSON-LD BlogPosting
│   └── category/[slug]/page.tsx                # post filtrati per categoria
└── api/
    ├── draft-mode/
    │   ├── enable/route.ts                     # defineEnableDraftMode (entry da Presentation)
    │   └── disable/route.ts                    # disable + redirect
    └── revalidate/route.ts                     # webhook handler → revalidateTag

components/
├── blog/
│   ├── post-card.tsx                           # card in lista (/blog + /blog/category)
│   ├── post-body.tsx                           # PortableText renderer con components custom
│   ├── post-hero.tsx                           # titolo + cover + meta autore (dettaglio)
│   ├── related-posts.tsx                       # griglia "Articoli correlati"
│   ├── blog-hero.tsx                           # header pagina /blog e /category
│   ├── blog-pagination.tsx                     # paginazione ?page=N
│   └── blog-view-tracker.tsx                   # client component — fira eventi GA4/Meta
└── disable-draft-mode.tsx                      # bottone "Disattiva preview" in draft mode
```

---

## Content model

### `post` — Articolo ([post.ts](../sanity/schemas/post.ts))

Documento principale, organizzato in tre group: **Contenuto**, **Metadati**, **SEO**.

| Campo | Tipo | Note |
|---|---|---|
| `title` | string | Min 3, max 120 caratteri, obbligatorio |
| `slug` | slug | Generato da `title`, max 96 caratteri, obbligatorio |
| `excerpt` | text | Max 300 caratteri, usato in lista e social |
| `coverImage` | image | `hotspot: true` + campo `alt` obbligatorio |
| `body` | blockContent | Portable Text (vedi sotto) |
| `author` | reference → author | Obbligatorio |
| `categories` | array<reference → category> | Opzionale, multi |
| `tags` | array<reference → tag> | Opzionale, multi |
| `publishedAt` | datetime | Default: `now()` |
| `relatedPosts` | array<reference → post> | Max 3 |
| `seo` | object (type: seo) | Campi SEO opzionali (vedi sotto) |

**Preview** mostra titolo, autore, data formattata IT e cover image.

**Orderings** configurati: per data desc (default) e titolo asc.

### `author` — Autore ([author.ts](../sanity/schemas/author.ts))

`name`, `slug`, `role` (es. "Agronomo"), `picture`, `bio`.

### `category` — Categoria ([category.ts](../sanity/schemas/category.ts))

`title`, `slug`, `description`. Serve a raggruppare articoli sotto `/blog/category/[slug]`.

### `tag` — Tag ([tag.ts](../sanity/schemas/tag.ts))

`title`, `slug`. Meta-classificazione libera, attualmente non ha pagina dedicata (si può aggiungere con lo stesso pattern di `category`).

### `seo` — object riutilizzabile ([seo.ts](../sanity/schemas/seo.ts))

Oggetto collassabile, embedded in `post`:

| Campo | Tipo | Note |
|---|---|---|
| `metaTitle` | string | Sovrascrive `<title>`, max 60 |
| `metaDescription` | text | Max 160 caratteri |
| `ogImage` | image | Opzionale, fallback su `coverImage` |
| `noIndex` | boolean | Se `true` → `robots: noindex,nofollow` |

### `blockContent` — Portable Text ([blockContent.ts](../sanity/schemas/blockContent.ts))

Body ricco con: paragrafi, H2/H3/H4, citazioni, liste puntate/numerate, decoratori (grassetto, corsivo, sottolineato, codice inline), annotation `link` (href + blank), embedded `image` (con alt + caption), embedded `code` (language + code).

---

## Query GROQ

Tutte le query sono centralizzate in [sanity/lib/queries.ts](../sanity/lib/queries.ts) e avvolte in `defineQuery()` — questo abilita il **TypeGen** a derivare tipi TypeScript precisi.

### Query definite

| Nome | Uso |
|---|---|
| `POSTS_QUERY` | Lista post paginata (params: `$start`, `$end`) |
| `POSTS_COUNT_QUERY` | Conteggio totale post (per calcolo paginazione) |
| `POST_QUERY` | Dettaglio post completo (body, related, seo, ...) |
| `POST_SLUGS_QUERY` | Solo gli slug per `generateStaticParams` |
| `POST_SEO_QUERY` | Campi minimi per `generateMetadata` (stega disabilitato) |
| `CATEGORY_BY_SLUG_QUERY` | Categoria singola da slug |
| `CATEGORY_POSTS_QUERY` | Post filtrati per `categoryId` (params: `$categoryId`, `$start`, `$end`) |
| `CATEGORY_POSTS_COUNT_QUERY` | Conteggio per paginazione categoria |
| `CATEGORIES_QUERY` | Tutte le categorie ordinate per nome |
| `CATEGORY_SLUGS_QUERY` | Solo gli slug per `generateStaticParams` categorie |

### Projection fields riutilizzabili

Due costanti interne a `queries.ts`:
- `POST_FIELDS_LIST` → campi ridotti per card in lista (senza body, senza related)
- `POST_FIELDS_FULL` → campi completi per pagina dettaglio

Modificando questi due punti di verità si propaga ovunque serve.

### Pattern `sanityFetch` con cache tags

```ts
const { data: post } = await sanityFetch({
  query: POST_QUERY,
  params: { slug },
  tags: [`post:${slug}`, "author", "category"],
})
```

Il webhook invia projection `{ "tags": [_type, _type + ":" + slug.current] }` — il pattern di tag qui sopra **deve matchare** quella projection per invalidare correttamente.

### Regole per `stega`

`stega` = encoding di metadata Sanity dentro le stringhe renderizzate (abilita Visual Editing). **Sempre disabilitarlo** in:

- `generateMetadata()` — altrimenti i tag SEO conterrebbero caratteri invisibili illegibili
- `generateStaticParams()` — gli slug non devono contenere marker

Esempio:
```ts
const { data } = await sanityFetch({
  query: POST_SEO_QUERY,
  params: { slug },
  stega: false, // 👈 critico
  tags: [`post:${slug}`],
})
```

---

## Real-time & Visual Editing

### Come funziona

1. L'editor apre `/studio` → seleziona **Presentation**.
2. Presentation apre un iframe del sito, navigato su `/api/draft-mode/enable?sanity-preview-path=/blog/...` (secret validato).
3. Next.js attiva `draftMode()`; il root layout renderizza `<VisualEditing />` + bottone **Disattiva preview** ([disable-draft-mode.tsx](../components/disable-draft-mode.tsx)).
4. Le successive `sanityFetch` nel layout/pages leggono con `perspective: 'previewDrafts'` → vede draft non pubblicati.
5. Al click su un campo nel Presentation, l'overlay salta al campo corrispondente nello Studio.
6. Al salvataggio del field, `VisualEditing` re-fetcha i dati → preview aggiornata.

### Accesso manuale alla preview

Utile in sviluppo o per bypassare Presentation:

```
http://localhost:3000/api/draft-mode/enable?sanity-preview-secret=<secret>&sanity-preview-path=/blog/hello
```

Per disattivare: click sul bottone "Disattiva preview" (fixed bottom-right quando in draft mode) oppure GET su `/api/draft-mode/disable`.

### Sito pubblico = nessuno streaming

**Non** renderizziamo `<SanityLive />` in `app/layout.tsx`: il pubblico riceve pagine cachate. L'aggiornamento passa dal webhook (vedi sezione successiva).

Per attivare streaming live anche al pubblico (futuro):
1. Genera un **browser token** (Viewer) su Sanity Manage.
2. Aggiungi `browserToken` al `defineLive` in [live.ts](../sanity/lib/live.ts).
3. Monta `<SanityLive />` dentro `<body>` nel root layout (dopo `<CookieConsentProvider>`).

---

## Caching & revalidation webhook

### Strategia

`defineLive` usa internamente Next.js **Data Cache** con tags. Non viene passato un `revalidate` numerico — i contenuti restano cachati **indefinitamente** finché non arriva un'invalidation.

### Invalidation via webhook

[/api/revalidate/route.ts](../app/api/revalidate/route.ts) riceve il POST da Sanity Studio (firmato con `SANITY_REVALIDATE_SECRET`):

```ts
const { isValidSignature, body } = await parseBody<{ tags: string[] }>(
  req,
  process.env.SANITY_REVALIDATE_SECRET,
  true // waitForContentLakeEventualConsistency — evita race con CDN Sanity
)

for (const tag of body.tags) revalidateTag(tag)
```

Con projection `{ "tags": [_type, _type + ":" + slug.current] }` il webhook invalida granularmente:

- Pubblichi un **post**: invalida `post` + `post:<slug>` → la pagina `/blog/<slug>` e tutte le liste che tagano `post` vengono rigenerate al prossimo hit.
- Modifichi una **categoria**: invalida `category` + `category:<slug>` → `/blog/category/<slug>` e liste aggregate.
- Modifichi un **autore**: invalida `author` → tutte le liste che mostrano l'autore nella card si aggiornano.

### Tag applicati dalle pagine

| Pagina | Tags passati a `sanityFetch` |
|---|---|
| `/blog` | `["post", "author", "category"]` |
| `/blog/[slug]` | `["post:<slug>", "author", "category"]` |
| `/blog/category/[slug]` | `["post", "category:<slug>"]` |
| `generateMetadata` post | `["post:<slug>"]` |

### Tempi di propagazione

Il flag `true` in `parseBody(..., true)` abilita `waitForContentLakeEventualConsistency`: il webhook aspetta ~1s dopo la mutation prima di firmare la request. Questo evita che un `revalidateTag` triggeri un re-fetch che ancora legge il contenuto vecchio dal CDN di Sanity.

Dal momento della pubblicazione al momento in cui il visitor vede il nuovo contenuto: tipicamente **1-3 secondi**.

---

## Pagine pubbliche & routing

### `/blog` — [app/blog/page.tsx](../app/blog/page.tsx)

- Lista paginata, **9 post per pagina** (costante `POSTS_PER_PAGE`).
- `?page=N` in querystring; pagina 1 = URL pulito `/blog`.
- Rendering server-side dinamico (`ƒ` nel build output).
- Fetch in parallelo: `POSTS_QUERY` + `POSTS_COUNT_QUERY`.

### `/blog/[slug]` — [app/blog/[slug]/page.tsx](../app/blog/%5Bslug%5D/page.tsx)

- **SSG** via `generateStaticParams` (costruito con `perspective: 'published'` + `stega: false`).
- `generateMetadata` usa `POST_SEO_QUERY` con fallback: `seo.metaTitle` → `title`, `seo.metaDescription` → `excerpt`, `seo.ogImage` → `coverImage`.
- Include `<script type="application/ld+json">` con schema `BlogPosting` per Google Rich Results.
- `notFound()` se slug non esiste.
- `generateStaticParams` usa `try/catch` → se Sanity è irraggiungibile in build, la route fa fallback a rendering on-demand invece di crashare.

### `/blog/category/[slug]` — [app/blog/category/[slug]/page.tsx](../app/blog/category/%5Bslug%5D/page.tsx)

- SSG + pagine derivate via `?page=N`.
- Mostra la description della categoria nell'hero.
- Stesso filtro `POSTS_PER_PAGE` della lista principale.

### `/studio/[[...tool]]` — [app/studio/[[...tool]]/page.tsx](../app/studio/%5B%5B...tool%5D%5D/page.tsx)

- `"use client"` + `<NextStudio config={config} />`.
- `app/studio/layout.tsx` riesporta `metadata` e `viewport` da `next-sanity/studio` (titoli e meta corretti per l'UI).
- Il root layout wrappa comunque con providers (CookieConsent, Toaster, Analytics) — accettabile perché lo Studio è client-side e non interferiscono; l'alternativa sarebbe una route group `(studio)` con layout dedicato.

---

## Flusso editoriale: come pubblicare un articolo

### Prima volta

1. `http://localhost:3000/studio` → login.
2. **Autori** → **Create** → compila `name`, `slug`, `role`, foto, bio.
3. **Categorie** → crea almeno una (es. "Normativa", "Guide pratiche", "Ecoschemi PAC").

### Per ogni articolo

1. **Articoli** → **Create** → tab **Contenuto**:
   - Titolo
   - Slug (generato cliccando "Generate")
   - Excerpt (ciò che appare in card e social)
   - Cover image (trascina → campo `alt` obbligatorio, rilevante per SEO)
   - Body (Portable Text — usa H2 per sezioni, H3 per sottosezioni)
2. Tab **Metadati**: seleziona Autore, Categorie, Tag, data di pubblicazione, eventuali post correlati.
3. Tab **SEO** (opzionale): se non compilato si usano i fallback automatici.
4. **Publish** (pulsante in alto a destra).

Entro 1-3 secondi il webhook invalida la cache e la pagina va online su `/blog/<slug>`.

### Anteprima prima di pubblicare

Dentro Studio → **Presentation** (icona a sinistra). Naviga alla pagina blog, clicca sul post. Vedi il draft live. Modifica un campo, vedi l'aggiornamento in preview senza pubblicare.

### Unpublish / rimozione

Unpublish dallo Studio rimuove il post dalla `perspective: 'published'` → il webhook invalida → il visitor non lo vede più. Il documento resta in Sanity (draft) e può essere ripubblicato o cancellato definitivamente.

---

## Analytics eventi blog

Il tracking è coerente col sistema documentato in [TRACKING.md](./TRACKING.md). I nuovi eventi sono firati dal componente client [BlogViewTracker](../components/blog/blog-view-tracker.tsx).

| Evento | Trigger | Parametri | Pagina |
|---|---|---|---|
| `blog_list_view` | Mount di `/blog` | `page`: numero pagina | `app/blog/page.tsx` |
| `blog_post_view` | Mount di `/blog/[slug]` | `slug`: string | `app/blog/[slug]/page.tsx` |
| `blog_category_view` | Mount di `/blog/category/[slug]` | `slug`: string | `app/blog/category/[slug]/page.tsx` |

Gli eventi passano da `trackEvent` in [lib/analytics.ts](../lib/analytics.ts), quindi rispettano il consenso GDPR (GA4 fira solo se `preferences.analytics`, Meta solo se `preferences.marketing`).

### Domande che questo tracking risponde

- **Qual è il post più letto?** → group by `blog_post_view.slug`
- **Le categorie sono usate come filtro?** → volume `blog_category_view` vs `blog_list_view`
- **La paginazione è usata?** → distribuzione `blog_list_view.page`
- **Il blog porta lead?** → funnel `blog_post_view` → `cta_click` → `form_submit_success`

### Aggiungere tracking a un nuovo componente blog

Per un click tracciato (es. "Leggi articolo correlato") usa `<TrackedLink>` come descritto in [TRACKING.md](./TRACKING.md#come-aggiungere-un-nuovo-evento).

---

## SEO: metadata & JSON-LD

### Metadata dinamici

`generateMetadata` in `/blog/[slug]` popola:
- `title`: `seo.metaTitle ?? title` (il template del root layout aggiunge ` | Cultivara — ...`)
- `description`: `seo.metaDescription ?? excerpt`
- `alternates.canonical`: `https://cultivara.it/blog/<slug>`
- `robots`: `noindex, nofollow` se `seo.noIndex === true`
- `openGraph`: `type: "article"`, `publishedTime`, `authors[]`, `images[]` (1200×630)
- `twitter`: `summary_large_image`

**Critico**: `stega: false` passato a `sanityFetch` nella metadata — altrimenti i tag SEO conterrebbero caratteri invisibili che confondono i motori di ricerca.

### JSON-LD BlogPosting

Renderizzato inline in `/blog/[slug]`:

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "...",
  "description": "...",
  "datePublished": "2026-03-15T09:00:00Z",
  "author": { "@type": "Person", "name": "..." },
  "image": "https://cdn.sanity.io/...",
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://cultivara.it/blog/..." },
  "publisher": {
    "@type": "Organization",
    "name": "Cultivara",
    "logo": { "@type": "ImageObject", "url": "https://cultivara.it/logo.svg" }
  }
}
```

Testabile con [Rich Results Test](https://search.google.com/test/rich-results).

### Immagini ottimizzate

`urlFor()` in [sanity/lib/image.ts](../sanity/lib/image.ts) usa `@sanity/image-url` con `.auto("format")` → WebP/AVIF automatico dal CDN di Sanity. In [next.config.mjs](../next.config.mjs) il `remotePatterns` autorizza `cdn.sanity.io` a servire `next/image`.

Dimensioni applicate:
- Card in lista: `width(800).height(500)`
- Hero post: `width(1600).height(900)`
- Body image: `width(1200)`
- OG image: `width(1200).height(630)`

---

## TypeGen (tipi da GROQ)

Gli schemi Sanity e le query GROQ sono la **source of truth**. TypeGen estrae tipi TypeScript precisi.

### Comando

```bash
pnpm typegen
```

Esegue:
1. `sanity schema extract --path=sanity/schema.json` → snapshot JSON dello schema
2. `sanity typegen generate` → legge `sanity-typegen.json` + `defineQuery` spars per progetto → scrive `sanity/types.ts`

### Config

[sanity-typegen.json](../sanity-typegen.json):
```json
{
  "path": "./{app,components,sanity}/**/*.{ts,tsx}",
  "schema": "./sanity/schema.json",
  "generates": "./sanity/types.ts",
  "overloadClientMethods": true
}
```

Con `overloadClientMethods: true`, `client.fetch(POSTS_QUERY)` → ritorno tipizzato automaticamente.

### `.gitignore`

`sanity/schema.json` e `sanity/types.ts` sono **generati** — gitignorati. Chiunque cloni il repo deve rieseguire `pnpm typegen` dopo aver configurato l'env Sanity.

### Quando rieseguire typegen

- Modifichi uno schema in `sanity/schemas/*.ts`
- Aggiungi/modifichi una query in `sanity/lib/queries.ts`
- Aggiorni la `apiVersion` a una che introduce nuove feature GROQ

**Tip**: aggiungere `predev`/`prebuild` in `package.json` per auto-rigenerare in locale.

---

## Deploy checklist

Pre-deploy (Vercel, Netlify, ecc.):

- [ ] Variabili env configurate sul provider (TUTTE quelle in [.env.example](../.env.example))
- [ ] CORS origin del dominio produzione aggiunto su Sanity Manage
- [ ] Webhook Sanity puntato a `https://<dominio>/api/revalidate` con il secret corretto
- [ ] `pnpm typegen` eseguito prima del build (oppure aggiunto come prebuild)
- [ ] Verificato `/studio` accessibile post-deploy con login Sanity
- [ ] Creato almeno 1 post test → verificato che compaia in `/blog`
- [ ] Verificato webhook: modifica post → attendere 2s → hard-refresh → vedere modifica
- [ ] Verificato [Rich Results Test](https://search.google.com/test/rich-results) su `/blog/<slug>`

---

## Troubleshooting

| Problema | Causa probabile | Fix |
|---|---|---|
| `Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID` al build | `.env.local` non popolato | Compila tutte le vars di [.env.example](../.env.example) |
| `Dataset "production" not found for project ID "placeholder"` | Project ID placeholder mai sostituito | Vedi setup step 1 |
| 401 su `/api/revalidate` | Secret sbagliato o mancante nel webhook | Rigenera secret, aggiorna sia Vercel env che webhook Sanity |
| 403 su fetch query | CORS origin mancante su Sanity Manage | Aggiungi dominio in Manage → API → CORS origins |
| Preview mostra "Disable preview" ma niente si aggiorna | `SANITY_API_READ_TOKEN` non è un viewer token o è scaduto | Rigenera token Viewer su Sanity Manage |
| Immagini rotte con "Invalid src" | `cdn.sanity.io` non in `remotePatterns` | Verifica [next.config.mjs](../next.config.mjs) |
| Typegen fallisce | Schema o query non validi | `pnpm sanity schema extract` per vedere errori dettagliati |
| Studio `createContext is not a function` | Page Studio renderizzata server-side | Verifica che [studio/[[...tool]]/page.tsx](../app/studio/%5B%5B...tool%5D%5D/page.tsx) abbia `"use client"` |
| Caratteri strani in meta/SEO | `stega` non disabilitato in `generateMetadata` | Aggiungi `stega: false` al `sanityFetch` |
| Modifiche non si riflettono dopo publish | Webhook non configurato o URL errato | Verifica webhook attivo + URL raggiungibile da Sanity |
| Pagine blog in build output con ✕ (errore) | `generateStaticParams` lanciato errore | Il `try/catch` dovrebbe gestire; verifica env in build environment |
| Port conflict 3000 su draft mode redirect | `NEXT_PUBLIC_SITE_URL` non coincide col porto | Aggiorna env o usa `http://localhost:3000` in dev |

---

## File di riferimento

**Config:**
- [sanity.config.ts](../sanity.config.ts) — Studio config + plugins
- [sanity.cli.ts](../sanity.cli.ts) — config CLI per `pnpm sanity ...`
- [sanity-typegen.json](../sanity-typegen.json) — config TypeGen
- [next.config.mjs](../next.config.mjs) — `remotePatterns` per CDN Sanity

**Core Sanity:**
- [sanity/env.ts](../sanity/env.ts) — assert env vars
- [sanity/lib/client.ts](../sanity/lib/client.ts) — createClient (con stega)
- [sanity/lib/live.ts](../sanity/lib/live.ts) — defineLive → `sanityFetch`, `SanityLive`
- [sanity/lib/image.ts](../sanity/lib/image.ts) — `urlFor()`
- [sanity/lib/queries.ts](../sanity/lib/queries.ts) — tutte le GROQ

**Schemi:**
- [sanity/schemas/index.ts](../sanity/schemas/index.ts)
- [sanity/schemas/post.ts](../sanity/schemas/post.ts)
- [sanity/schemas/author.ts](../sanity/schemas/author.ts)
- [sanity/schemas/category.ts](../sanity/schemas/category.ts)
- [sanity/schemas/tag.ts](../sanity/schemas/tag.ts)
- [sanity/schemas/seo.ts](../sanity/schemas/seo.ts)
- [sanity/schemas/blockContent.ts](../sanity/schemas/blockContent.ts)

**Routes:**
- [app/studio/[[...tool]]/page.tsx](../app/studio/%5B%5B...tool%5D%5D/page.tsx)
- [app/studio/layout.tsx](../app/studio/layout.tsx)
- [app/blog/page.tsx](../app/blog/page.tsx)
- [app/blog/[slug]/page.tsx](../app/blog/%5Bslug%5D/page.tsx)
- [app/blog/category/[slug]/page.tsx](../app/blog/category/%5Bslug%5D/page.tsx)
- [app/api/draft-mode/enable/route.ts](../app/api/draft-mode/enable/route.ts)
- [app/api/draft-mode/disable/route.ts](../app/api/draft-mode/disable/route.ts)
- [app/api/revalidate/route.ts](../app/api/revalidate/route.ts)

**Componenti:**
- [components/blog/post-card.tsx](../components/blog/post-card.tsx)
- [components/blog/post-body.tsx](../components/blog/post-body.tsx)
- [components/blog/post-hero.tsx](../components/blog/post-hero.tsx)
- [components/blog/related-posts.tsx](../components/blog/related-posts.tsx)
- [components/blog/blog-hero.tsx](../components/blog/blog-hero.tsx)
- [components/blog/blog-pagination.tsx](../components/blog/blog-pagination.tsx)
- [components/blog/blog-view-tracker.tsx](../components/blog/blog-view-tracker.tsx)
- [components/disable-draft-mode.tsx](../components/disable-draft-mode.tsx)

**File esistenti modificati:**
- [app/layout.tsx](../app/layout.tsx) — `async` + `<VisualEditing />` condizionale
- [components/landing/navbar.tsx](../components/landing/navbar.tsx) — voce Blog + `usePathname` per anchor misti
- [components/landing/footer.tsx](../components/landing/footer.tsx) — link `/blog`

**Documentazione correlata:**
- [TRACKING.md](./TRACKING.md) — sistema analytics (gli eventi blog si integrano lì)
