# GEO Audit Report: Cultivara

**Data audit:** 3 giugno 2026
**URL:** https://cultivara.it
**Tipo business:** SaaS — Agri-tech italiano (Quaderno di Campagna Digitale, compliance UE)
**Modalità attiva:** `release_free`
**Pagine analizzate:** 7 (homepage, /blog, 2 articoli, /normativa-ue-2023-564, /dlgs-150-2012, /guida-agea)

---

## Executive Summary

**GEO Score Complessivo: 31/100 — Critico**

Cultivara produce contenuti normativi di qualità adeguata (citabilità blog ~70/100), ma manca di quasi tutte le infrastrutture tecniche che permettono ai motori di ricerca AI di scoprire, interpretare e citare il sito. L'assenza di `robots.txt`, `sitemap.xml` e `llms.txt` rende il sito letteralmente invisibile ai crawler AI. La Brand Authority è quasi nulla: nessuna presenza su Wikipedia, Reddit, LinkedIn o YouTube. Lo schema strutturato, pur presente nel codice, non è rilevato dagli auditor perché probabilmente il deploy non riflette il codice aggiornato.

**Punti di forza:** Contenuti blog italiani su un topic con alta domanda AI (QDCA 2027), struttura Next.js SSR corretta, FAQ schema sulla homepage.

**Gap critici:** Nessun file di discovery crawler (robots, sitemap, llms.txt), zero brand authority su piattaforme terze, autore generico senza credenziali, nessuna pagina About.

---

## Score Breakdown

| Categoria | Score | Peso | Score Pesato |
|---|---|---|---|
| AI Citabilità | 42/100 | 25% | 10.5 |
| Brand Authority | 12/100 | 20% | 2.4 |
| Content E-E-A-T | 38/100 | 20% | 7.6 |
| Technical GEO | 54/100 | 15% | 8.1 |
| Schema & Structured Data | 2/100 | 10% | 0.2 |
| Platform Optimization | 21/100 | 10% | 2.1 |
| **GEO Score Totale** | | | **31/100** |

---

## Issue Critici (Fix Immediata)

### C1 — robots.txt mancante [404]
**Impatto:** Tutti i crawler AI non ricevono nessun segnale di accesso esplicito. Alcuni crawler con policy conservative si auto-limitano in assenza del file.
**Fix applicata:** ✅ Creato `app/robots.ts` con allow esplicito per GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended, Applebot, CCBot, Bingbot. Disallow su `/studio/` e `/api/`.

### C2 — sitemap.xml mancante [404]
**Impatto:** Gli articoli del blog e le pagine normativa non vengono scoperti sistematicamente. Solo la homepage è raggiungibile tramite crawling diretto.
**Fix applicata:** ✅ Creato `app/sitemap.ts` con route dinamiche Sanity (slug articoli), homepage, blog, normativa, dlgs, guida-agea.

### C3 — llms.txt mancante [404]
**Impatto:** I modelli AI non sanno come descrivere Cultivara quando interrogati su software QDCA italiani.
**Fix applicata:** ✅ Creato `public/llms.txt` con descrizione prodotto, link alle sezioni chiave, normativa e blog.

### C4 — Schema JSON-LD non rilevato in produzione
**Impatto:** Nonostante il codice sia corretto (Server Component senza `"use client"`), lo schema non è visibile agli auditor. Probabile gap deploy o cache CDN.
**Fix applicata:** ✅ Aggiunto schema `WebSite` + `SearchAction` in `structured-data.tsx`. Schema blog post arricchito con `@graph` (Article + BreadcrumbList), `dateModified`, `speakable`, `inLanguage: "it"`, autore con `knowsAbout`. Aggiunto `_updatedAt` alla query Sanity `POST_FIELDS_FULL`.
**Azione richiesta:** Verificare il `<head>` della pagina live con `curl -s https://cultivara.it | grep 'application/ld+json'`. Se vuoto, il problema è il deploy CDN — forzare un redeploy.

---

## Issue Alta Priorità (Fix entro 1 settimana)

### H1 — og:image punta a /logo.svg (SVG non supportato)
**Impatto:** Facebook, LinkedIn, Twitter e AI preview scraper rifiutano SVG. Il sito appare senza immagine anteprima ovunque venga condiviso.
**Fix applicata:** ✅ Aggiornato `app/layout.tsx` a puntare a `/og-image.png` (1200x630).
**Azione richiesta:** Creare il file `public/og-image.png` a 1200×630px con il branding Cultivara (sfondo verde #4a7a3b, logo bianco, tagline). Fino ad allora, il fallback è il 404.

### H2 — Meta description homepage: 215 caratteri (troppo lunga)
**Impatto:** Google tronca a ~155 caratteri. La frase viene tagliata a metà nei risultati di ricerca e nei snippet AI.
**Fix applicata:** ✅ Ridotta a 153 caratteri: *"Quaderno di Campagna digitale per agricoltori italiani. Conforme al Reg. UE 2023/564. 15 controlli automatici, export PDF/JSON/XML. Obbligatorio dal 2027."*

### H3 — Pagina /chi-siamo mancante
**Impatto:** I motori AI non possono verificare l'identità dell'azienda. Il footer linka a `#` (placeholder). Per un prodotto di compliance, l'assenza di una pagina About è un segnale di sfiducia.
**Azione richiesta:** Creare `app/chi-siamo/page.tsx` con: ragione sociale, missione, team (anche solo il fondatore), data fondazione, email di supporto.

### H4 — Nessun autore nominato negli articoli blog
**Impatto:** "Redazione Cultivara" senza credenziali non passa il filtro E-E-A-T dei sistemi AI. Per contenuti normativi (sanzioni, obblighi legali), l'assenza di autore nominato riduce drasticamente la probabilità di citazione.
**Azione richiesta:** In Sanity, aggiornare il campo `author` degli articoli con nome reale, ruolo (es. "Fondatore di Cultivara" o "Agronomo"), e creare la pagina autore collegata.

### H5 — Nessuna presenza LinkedIn
**Impatto:** LinkedIn è la principale fonte di verifica entità B2B per Bing Copilot e ChatGPT. La collisione del nome "Cultivara" con un'azienda canadese di arrampicata e un ETF hemp crea rischio di disambiguazione errata.
**Azione richiesta:** Creare LinkedIn Company Page con descrizione italiana, settore "Tecnologia Agricola / AgriTech", sito web, anno fondazione.

### H6 — Header di sicurezza assenti
**Fix applicata:** ✅ Aggiunto ad `next.config.mjs`: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`.

---

## Issue Media Priorità (Fix entro 1 mese)

### M1 — Citazioni a fonti primarie assenti negli articoli
Gli articoli citano Regolamento UE 2023/564 e D.Lgs. 150/2012 ma non linkano mai a EUR-Lex, normattiva.it o portali AGEA/MIPAAF ufficiali. Perplexity e ChatGPT pesano le fonti secondarie che citano fonti primarie verificabili.

### M2 — aggregateRating con dati inventati nel modo `saas`
`structured-data.tsx` emette `ratingValue: "4.8"` con `ratingCount: "120"` in modalità `saas`. Questi numeri non corrispondono a recensioni verificabili. Questo viola le policy Google per i rich result e può portare a una manual action quando il sito passa in modalità commerciale. **Rimuovere il blocco `aggregateRating` o collegarlo a recensioni reali da Trustpilot/Google Reviews prima di attivare la modalità saas.**

### M3 — Cluster contenuti: soli 4 articoli sul blog
Google Gemini e ChatGPT richiedono ampiezza tematica (15-20+ articoli interconnessi) per considerare un sito autorevole su un topic. Con 4 articoli Cultivara non soddisfa il threshold di topical authority per il QDCA.

**Articoli prioritari da produrre:**
1. Come registrare un trattamento fitosanitario passo per passo (con screenshot)
2. Sanzioni per mancata tenuta del quaderno di campagna digitale
3. Differenza tra QDCA e Fascicolo Aziendale AGEA
4. Ecoschemi PAC 2023-2027: guida completa per agricoltori
5. Direttiva Nitrati: limiti di fertilizzazione regione per regione
6. Come funziona il quaderno di campagna con SIAN
7. Prodotti fitosanitari autorizzati: come trovare un prodotto nel registro italiano

### M4 — Meta description mancante su articolo 2 e pagine normativa
`/blog/credito-imposta-agricoltura-4-0-software-2026` e tutte le pagine normativa non hanno `seo.metaDescription` in Sanity. Aggiungere tramite Sanity Studio.

### M5 — Canonical per URL blog paginati e filtrati
`/blog?page=2` e `/blog?q=...&category=...` non hanno canonical override. In `app/blog/page.tsx` aggiungere `alternates.canonical` per pagine > 1 e blocco canonical per URL con query string.

---

## Issue Bassa Priorità

### L1 — Logo publisher in BlogPosting: SVG → PNG
Aggiornato nel codice a `android-chrome-512x512.png`. Creare logo rettangolare 200×60px per i publisher schema.

### L2 — Wikidata entry
Una volta che Cultivara ha sufficiente presenza pubblica, creare un Q-item Wikidata. È la fonte più forte per entity recognition degli LLM.

### L3 — Canale YouTube
Almeno 1 video (tutorial registrazione trattamento) prima di gennaio 2027. YouTube è indicizzato da Gemini e appare in Perplexity/ChatGPT per query italiane agri-tech.

### L4 — Preconnect per Sanity CDN
Aggiungere `<link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous">` nel layout per ridurre latenza immagini blog.

---

## Quick Wins (Questa settimana)

1. ✅ `robots.ts` + `sitemap.ts` + `llms.txt` — **già implementati**
2. ✅ Security headers — **già implementati**
3. ✅ Meta description corretta — **già implementata**
4. ✅ og:image aggiornato — **già implementato** (manca creare `public/og-image.png`)
5. ✅ Schema blog arricchito (dateModified, BreadcrumbList, speakable) — **già implementato**
6. Creare `public/og-image.png` 1200×630px
7. Creare LinkedIn Company Page Cultivara
8. In Sanity Studio: aggiungere metaDescription agli articoli mancanti e alle pagine normativa
9. Verificare che il deploy live rifletta gli schema JSON-LD corretti con `curl`

---

## Piano 30 giorni

### Settimana 1 — Infrastruttura tecnica
- [x] robots.ts, sitemap.ts, llms.txt
- [x] Security headers
- [x] Meta description homepage
- [x] Schema blog arricchito
- [ ] Creare og-image.png 1200×630
- [ ] Creare /chi-siamo con info azienda e team
- [ ] LinkedIn Company Page
- [ ] Verifica deploy live (curl JSON-LD check)

### Settimana 2 — Contenuto e E-E-A-T
- [ ] Aggiornare autori articoli in Sanity con nome reale e ruolo
- [ ] Aggiungere meta description agli articoli senza (Sanity Studio)
- [ ] Aggiungere link a fonti primarie in ogni articolo (EUR-Lex, AGEA)
- [ ] Scrivere primo articolo cluster prioritario (sanzioni QDCA)

### Settimana 3 — Brand Authority
- [ ] Creare Wikidata Q-item per Cultivara
- [ ] Cercare menzione su almeno 1 testata agraria italiana (Agronotizie, Terra e Vita)
- [ ] Scrivere secondo e terzo articolo cluster

### Settimana 4 — Ottimizzazione piattaforme
- [ ] Rimuovere `aggregateRating` fake da structured-data.tsx prima del lancio saas
- [ ] Scrivere quarto articolo cluster con screenshot prodotto
- [ ] Canonical blog paginato e filtrato
- [ ] Google Search Console: submit sitemap.xml

---

## Appendice: Pagine Analizzate

| URL | Titolo | Issue principali |
|---|---|---|
| https://cultivara.it | Quaderno di Campagna Digitale \| Cultivara | robots.txt 404, og:image SVG, desc 215 char |
| https://cultivara.it/blog | Blog — Guide e novità | Nessun JSON-LD, no meta description |
| https://cultivara.it/blog/quaderno-di-campagna-digitale-obbligo-2027 | Guida obbligo 2027 | Autore generico, no citazioni fonti |
| https://cultivara.it/blog/credito-imposta-agricoltura-4-0-software-2026 | Bonus 40% Agricoltura | No meta description, autore generico |
| https://cultivara.it/normativa-ue-2023-564 | Regolamento UE 2023/564 | No meta description, no autore |
| https://cultivara.it/dlgs-150-2012 | D.Lgs. 150/2012 | Non verificata in produzione |
| https://cultivara.it/guida-agea | Guida AGEA | Non verificata in produzione |

---

## Note Disambiguazione Brand

Il nome "Cultivara" collide con: (1) un'azienda di arrampicata su alberi in British Columbia (Canada) con pagina Wikipedia; (2) un ETF/SPAC hemp quotato al Nasdaq. Nei dati di training degli LLM, queste entità possono sovrascrivere Cultivara Italia. Mitigazione: usare consistentemente "Cultivara QDCA" o "Cultivara quaderno di campagna digitale" nei testi external, nel campo `name` dello schema Organization, e come anchor text nelle citazioni terze.
