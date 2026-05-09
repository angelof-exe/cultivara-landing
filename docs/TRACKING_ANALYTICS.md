# Tracking & Analytics — Cultivara Landing

Documentazione completa del sistema di tracking implementato sulla landing page.

## Indice

1. [Stack & architettura](#stack--architettura)
2. [GDPR & consenso](#gdpr--consenso)
3. [Inventario eventi](#inventario-eventi)
4. [Form funnel tracking](#form-funnel-tracking)
5. [CTA qualification & session enrichment](#cta-qualification--session-enrichment)
6. [UTM first-touch attribution](#utm-first-touch-attribution)
7. [Engagement signals](#engagement-signals)
8. [Meta Pixel — eventi standard](#meta-pixel--eventi-standard)
9. [Template EmailJS](#template-emailjs)
10. [Setup GA4 & Meta](#setup-ga4--meta)
11. [Come aggiungere un nuovo evento](#come-aggiungere-un-nuovo-evento)
12. [Testing & debug](#testing--debug)
13. [Privacy & PII](#privacy--pii)

---

## Stack & architettura

| Tool | Uso | File principale |
|---|---|---|
| Google Analytics 4 (GA4) | Event tracking, lead conversion, funnel | `components/analytics.tsx` |
| Meta Pixel | Retargeting audience, ad optimization | `components/analytics.tsx` |
| EmailJS | Invio form → email al team | `components/landing/waitlist-form.tsx` |
| Cookie consent (custom) | GDPR gating | `components/cookie-consent-provider.tsx` |

**Variabili d'ambiente** (`.env.local`):

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=1234567890
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxx
```

**File core:**
- `lib/analytics.ts` — funzione generica `trackEvent` + helper dedicati (form, submission).
- `lib/session-tracker.ts` — singleton client-side con scroll depth, time, sections viewed, UTM.
- `components/tracked-link.tsx` — `<TrackedLink>` e `<TrackedAnchor>` con enrichment automatico.
- `components/section-view-tracker.tsx` — IntersectionObserver sulle sezioni.
- `components/scroll-depth-tracker.tsx`, `components/time-tracker.tsx`, `components/utm-capture.tsx` — tracker di engagement montati in `app/layout.tsx`.

---

## GDPR & consenso

Il provider `CookieConsentProvider` espone lo stato `preferences: { analytics, marketing }`. Gli script GA4 e Meta Pixel vengono iniettati **solo** se il rispettivo flag è `true`:

- `preferences.analytics === true` → GA4 `<Script>` caricato.
- `preferences.marketing === true` → Meta Pixel `<Script>` caricato.

La funzione `trackEvent` è GDPR-safe by design: controlla l'esistenza di `window.gtag` / `window.fbq`. Se gli script non sono stati caricati (consenso negato), gli eventi non vengono firati.

**UTM first-touch in `sessionStorage`**: la persistenza è gated esplicitamente da `preferences.analytics` nel componente `UtmCapture`. Se il consenso è negato, gli UTM vengono comunque letti in memoria per la sessione corrente ma non salvati.

---

## Inventario eventi

Tutti gli eventi sono firati sia su GA4 (`gtag('event', ...)`) sia su Meta Pixel (`fbq('trackCustom', ...)`), a meno che non sia specificato diversamente.

### Eventi di sezione

| Evento | Trigger | Parametri |
|---|---|---|
| `section_view` | Sezione scrolla in viewport al 30% (una volta per load) | `section`: `'urgency-banner' \| 'hero' \| 'funzionalita' \| 'come-funziona' \| 'conformita' \| 'lista-attesa' \| 'faq' \| 'cta-finale'` |

### Eventi CTA/navigazione

| Evento | Trigger | Parametri base (tutti arricchiti con session params) |
|---|---|---|
| `cta_click` | Click su CTA primarie (hero, cta finale, navbar, pricing plans) | `location`, `label` |
| `nav_click` | Click su link di navigazione (navbar, footer, logo) | `location`, `target`, opzionale `section` |
| `compliance_link_click` | Click su link normativi (UE 2023/564, D.Lgs. 150/2012, Guida AGEA) | `destination`: `'ue_2023_564' \| 'dlgs_150_2012' \| 'guida_agea'` |
| `mailto_click` | Click su link `mailto:` | `location` |
| `social_click` | Click su icone social footer | `platform`: `'instagram' \| 'facebook'` |
| `faq_open` | Apertura di un item FAQ | `question` (testo completo) |

### Eventi form (vedi sezione dedicata)

| Evento | Trigger |
|---|---|
| `form_start` | Primo focus su qualsiasi campo |
| `form_field_error` | Errore di validazione su blur |
| `form_submit_attempt` | Submit iniziato |
| `form_submit_success` | Submit completato (fire anche `generate_lead` GA4 + `Lead` Meta) |
| `form_submit_error` | Submit fallito |
| `form_abandoned` | Tab chiuso / pagina lasciata dopo `form_start` senza success |

### Eventi engagement

| Evento | Trigger | Parametri |
|---|---|---|
| `scroll_depth` | Milestone scroll raggiunta | `depth`: `25 \| 50 \| 75 \| 100` |
| `time_on_page` | Milestone tempo raggiunta (pausa se tab nascosto) | `seconds`: `15 \| 30 \| 60 \| 180` |

### Eventi blog

Page-level (firano una volta a mount):

| Evento | Trigger | Parametri |
|---|---|---|
| `blog_list_view` | Mount di `/blog` | `page`, `query_length`, `category` (or `'all'`) |
| `blog_post_view` | Mount di `/blog/[slug]` | `slug`, `title`, `author`, `primary_category` |
| `blog_category_view` | Mount di `/blog/category/[slug]` | `slug` |
| `blog_search_zero_results` | `/blog` con filtri attivi e 0 risultati | `query_length`, `category`, `query_term` (max 80 char) |

Article engagement (durante la lettura di `/blog/[slug]`):

| Evento | Trigger | Parametri |
|---|---|---|
| `blog_post_read_progress` | 25/50/75/100% scrolled within `<article>` (article-specific, NON page-level) | `slug`, `title`, `progress` |
| `blog_post_read_time` | 30/60/120/300s di lettura *visibile* (pausa su `visibilitychange→hidden`) | `slug`, `title`, `seconds` |
| `blog_cta_view` | `<ArticleCta>` entra in viewport al 50% (una volta per CTA) | `location`: `'article_inline' \| 'article_final'`, `slug` |

Click events:

| Evento | Trigger | Parametri |
|---|---|---|
| `blog_toc_click` | Click su voce dell'indice articolo | `slug`, `target_id`, `level` (`2 \| 3`), `variant` (`'desktop' \| 'mobile'`) |
| `blog_body_link_click` | Click su link interno al corpo Portable Text | `href`, `is_external` |
| `blog_post_share` | Click su un canale di condivisione articolo | `slug`, `channel`: `'web_share_api' \| 'facebook' \| 'twitter' \| 'linkedin' \| 'whatsapp' \| 'email' \| 'copy_link'` |
| `blog_pagination_click` | Click su una voce di paginazione | `from_page`, `to_page`, `direction` (`'prev' \| 'next' \| 'current'`), `base_path` |
| `post_card_click` | Click su una card articolo (default) | `slug` |
| `related_post_click` | Click su una card "Articoli correlati" (override del default) | `target_slug`, `source_slug` |
| `blog_category_click` | Click su un chip categoria dentro una card | `category`, `source_slug` |

Filtri ricerca:

| Evento | Trigger | Parametri |
|---|---|---|
| `blog_search_submit` | Submit barra ricerca su `/blog` | `query_length`, `category` |
| `blog_filter_category` | Cambio categoria nel dropdown | `category` |
| `blog_filter_clear` | Click "Azzera" filtri | — |

### Eventi standard GA4 / Meta (non custom)

| Evento | Tool | Trigger |
|---|---|---|
| `generate_lead` | GA4 | Submit form waitlist (via `trackFormSubmitSuccess`) |
| `Lead` | Meta Pixel | Submit form waitlist (via `trackFormSubmitSuccess`) |
| `PageView` | Meta Pixel | Caricamento pagina (fira dallo script di init) |
| `ViewContent` | Meta Pixel | Vista sezione `lista-attesa` — popola audience "ha visto il form" |

---

## Form funnel tracking

Tutti gli eventi form hanno `form_id: 'waitlist'` come parametro comune.

### Schema eventi

| Evento | Quando fira | Parametri specifici |
|---|---|---|
| `form_start` | Primo `focus` su qualsiasi campo (una volta per sessione form) | — |
| `form_field_error` | `onBlur` con errore Zod presente | `field_name`, `error_type` |
| `form_submit_attempt` | Entry di `onSubmit` (anche se poi fallisce) | `fields_filled_count`, `time_to_attempt_ms` |
| `form_submit_success` | `emailjs.send` risolve | `time_to_complete_ms` |
| `form_submit_error` | `emailjs.send` rigetta o config mancante | `error_type`: `'config_missing' \| 'network' \| 'validation' \| 'unknown'` |
| `form_abandoned` | `visibilitychange→hidden` o `beforeunload` dopo `form_start` senza success | `last_field`, `fields_completed_count`, `time_in_form_ms` |

### `error_type` per `form_field_error`

Gli errori Zod vengono categorizzati (nessun valore raw loggato):

| Regex matched | `error_type` |
|---|---|
| Campo `email` in errore | `invalid_email` |
| `almeno X caratteri` | `too_short` |
| `non può superare` | `too_long` |
| `obbligatorio` / `required` | `required` |
| Qualsiasi altro | `invalid` |

### Flow di sessione form

```
mount WaitlistForm
  ↓
useEffect attacca listener `beforeunload` + `visibilitychange`
  ↓
user focus su primo campo → trackFormStart + formStartedRef=true
  ↓
user blur su campo con errore → trackFormFieldError(field, type)
user blur su campo valido → fieldsCompletedRef.add(field)
  ↓
user submit → trackFormSubmitAttempt
  ├─ emailjs.send OK → trackFormSubmitSuccess + submitSucceededRef=true
  └─ emailjs.send KO → trackFormSubmitError
  ↓
user chiude tab/naviga via (senza success) → trackFormAbandoned
user click "Invia un'altra richiesta" → resetFormSession()
```

### Domande che questo tracking risponde

- **Quante persone iniziano il form?** → `form_start`
- **Dove si fermano?** → `form_abandoned.last_field` (distribuzione)
- **Quanti errori di validazione su ciascun campo?** → `form_field_error` segmentato per `field_name`
- **Qual è il tempo medio di compilazione?** → `form_submit_success.time_to_complete_ms`
- **Tasso di completamento?** → `form_submit_success / form_start`
- **Tasso di abbandono per lunghezza sessione?** → `form_abandoned.time_in_form_ms` distribuzione

---

## CTA qualification & session enrichment

Ogni click tracciato via `<TrackedLink>` o `<TrackedAnchor>` viene arricchito con parametri di contesto letti dal `session-tracker`.

### Parametri aggiunti automaticamente

| Parametro | Descrizione |
|---|---|
| `scroll_depth` | % max scrollata al momento del click (0-100) |
| `time_on_page_s` | Secondi dal page load |
| `sections_viewed_count` | Numero di sezioni viste (da `SectionViewTracker`) |
| `previous_cta_clicks` | Numero di CTA già cliccate prima di questa |
| `utm_source` / `utm_medium` / `utm_campaign` / `utm_term` / `utm_content` | Se presenti al landing |
| `gclid` / `fbclid` / `ttclid` | Se presenti al landing |
| `referrer` | Se provenienza da dominio esterno |

### Come opt-out dell'enrichment

Se vuoi un click "freddo" senza contesto (raro):

```tsx
<TrackedLink
  href="/..."
  eventName="foo_click"
  eventParams={{ ... }}
  enrichWithSession={false}
/>
```

### Esempi di segmentazione GA4

**Lead qualificati alto-intent:**
- `cta_click` con `scroll_depth >= 75` e `time_on_page_s >= 60` e `sections_viewed_count >= 5`

**Lead ad alta conversione compliance-focused:**
- User che ha triggerato `compliance_link_click` prima di `form_submit_success`

**Lead freddi (bounce-like):**
- `cta_click` con `scroll_depth < 25` e `time_on_page_s < 15`

---

## UTM first-touch attribution

### Come funziona

1. Al mount di `UtmCapture`, il session tracker parsea `window.location.search` per `utm_source/medium/campaign/term/content`, `gclid`, `fbclid`, `ttclid`.
2. Parsea anche `document.referrer` se proviene da dominio esterno.
3. Se `sessionStorage['utm_first_touch']` non esiste **e il consenso analytics è granted** → salva lo snapshot.
4. Tutti gli eventi arricchiti includono questi parametri.
5. Su submit del form, gli UTM sono passati anche nel payload EmailJS (vedi sezione template).

### Logica "first-touch"

Se l'utente naviga tra pagine del sito, gli UTM della **prima** landing vengono conservati. Su refresh con nuovi UTM, se la prima entry esiste già in `sessionStorage`, viene preservata. Questo assicura che l'attribuzione rifletta la sorgente originale del lead.

### Link UTM per campagne

Genera link con UTM per campagne via [Google Campaign URL Builder](https://ga-dev-tools.google/campaign-url-builder/) o manualmente:

```
https://cultivara.it/?utm_source=facebook&utm_medium=social&utm_campaign=pre_launch_2026
https://cultivara.it/?utm_source=instagram&utm_medium=social&utm_campaign=awareness_agritech
https://cultivara.it/?utm_source=newsletter&utm_medium=email&utm_campaign=march_2026
https://cultivara.it/?utm_source=google&utm_medium=cpc&utm_campaign=qdca_digitale
```

---

## Engagement signals

### `scroll_depth`
Milestone 25/50/75/100%. Fire una volta per soglia per page load. Throttled via `requestAnimationFrame`.

**Uso tipico:**
- Percentuale utenti che arrivano al fondo (`depth: 100`) → valutare se la pagina è troppo lunga
- Drop-off tra `depth: 50` e `depth: 75` → quale sezione perde l'attenzione

### `time_on_page`
Milestone 15/30/60/180 secondi. Pausa e riprende su `visibilitychange` (se l'utente passa ad altra tab, il tempo non viene contato).

**Uso tipico:**
- Segmentazione engagement breadth
- Correlazione con conversion (lead con ≥60s su pagina convertono X% in più)

### `urgency-banner` view
Il banner "Dal 1 Gennaio 2027..." è stato aggiunto al `SectionViewTracker`. Se l'utente lo vede (viewport 30%), fira `section_view` con `section: 'urgency-banner'`.

---

## Meta Pixel — eventi standard

Gli eventi standard Meta ottimizzano meglio le campagne ad rispetto ai custom:

| Evento | Quando fira | Scopo |
|---|---|---|
| `PageView` | Load pagina | Audience "ha visitato il sito" |
| `ViewContent` | Vista sezione `lista-attesa` | Audience "ha visto il form — retargeting" |
| `Lead` | Submit form completato | Conversion goal per campagne |

⚠️ **Non** estendere `Lead` ad azioni low-intent (es. form_start) — Meta consiglia di riservarlo a eventi che riflettono valore di business genuino, altrimenti l'ottimizzazione delle campagne si indebolisce.

---

## Template EmailJS

Template da configurare nel pannello EmailJS (Service → Templates):

```
Nuovo contatto dalla lista d'attesa Cultivara:

Nome: {{nome}}
Cognome: {{cognome}}
Email: {{email}}
Telefono: {{telefono}}
Azienda: {{nomeAzienda}}

Messaggio:
{{messaggio}}

---
Attribuzione lead:
Sorgente: {{utm_source}}
Mezzo: {{utm_medium}}
Campagna: {{utm_campaign}}
Referrer: {{referrer}}
```

### Fallback

Se il lead arriva senza UTM o direct, i valori di default sono:

| Campo | Fallback |
|---|---|
| `utm_source` | `direct` |
| `utm_medium` | `none` |
| `utm_campaign` | `none` |
| `referrer` | `direct` |

Hardcoded in `components/landing/waitlist-form.tsx` nel payload `emailjs.send`.

---

## Setup GA4 & Meta

### GA4 — azioni post-deploy

1. **Abilitare DebugView** durante lo sviluppo: aggiungere `?debug_mode=true` al primo landing.
2. **Marcare Key Events** (Conversioni):
   - Admin → Events → Mark as key event: `form_submit_success`, `compliance_link_click`, `generate_lead`.
3. **Custom dimensions** (opzionali, per segmentazione avanzata):
   - `scroll_depth` (event-scoped)
   - `time_on_page_s` (event-scoped)
   - `utm_source` (event-scoped)
   - `last_field` (event-scoped, per analisi abbandono)
4. **Explorations consigliate:**
   - Funnel: `section_view[hero]` → `section_view[lista-attesa]` → `form_start` → `form_submit_success`
   - Path analysis: da `form_start` → quali `form_field_error` precedono `form_abandoned`

### Meta Events Manager — azioni post-deploy

1. **Test Events** tab → verificare arrivo di `PageView`, `ViewContent`, `Lead`.
2. **Custom Conversions** per eventi custom (`compliance_link_click` se lo vuoi come conversion Meta).
3. **Audience** consigliate:
   - "Viewed waitlist form" → chi ha triggerato `ViewContent`, esclude `Lead`
   - "Compliance-interested" → chi ha cliccato `compliance_link_click`

---

## Come aggiungere un nuovo evento

### Caso 1: nuovo click su link o bottone

Usa `<TrackedLink>` (per `Link` Next.js) o `<TrackedAnchor>` (per `<a>` esterni/mailto):

```tsx
import { TrackedLink } from "@/components/tracked-link"

<TrackedLink
  href="/nuova-pagina"
  eventName="nuovo_evento"
  eventParams={{ location: "footer", label: "example" }}
>
  Testo link
</TrackedLink>
```

L'enrichment (scroll, time, UTM, ecc.) è automatico. Disabilitalo con `enrichWithSession={false}` se necessario.

### Caso 2: evento generico (non da click)

Importa `trackEvent` da `@/lib/analytics` e chiamalo:

```tsx
import { trackEvent } from "@/lib/analytics"

function onSomeAction() {
  trackEvent("evento_custom", {
    property1: "valore",
    property2: 42,
  })
}
```

L'evento fira su GA4 + Meta Pixel automaticamente, gated dal consenso.

### Caso 3: evento form specifico

Usa gli helper dedicati da `@/lib/analytics`:

```tsx
import {
  trackFormStart,
  trackFormFieldError,
  trackFormSubmitAttempt,
  trackFormSubmitSuccess,
  trackFormSubmitError,
  trackFormAbandoned,
} from "@/lib/analytics"
```

### Caso 4: nuova sezione da tracciare

1. Aggiungi `id="nome-sezione"` al wrapper `<section>`.
2. Aggiungi `'nome-sezione'` all'array `TRACKED_SECTIONS` in `components/section-view-tracker.tsx`.

### Caso 5: evento solo Meta Pixel (standard event)

```tsx
if (typeof window !== "undefined" && window.fbq) {
  window.fbq("track", "AddToWishlist", {
    content_name: "...",
  })
}
```

Usalo per standard events Meta (AddToWishlist, InitiateCheckout, ecc.) che Meta ottimizza meglio dei custom.

---

## Testing & debug

### In locale

```bash
npm run dev
```

Apri devtools → Network → filtra per:
- GA4: `google-analytics.com/g/collect` o `/mp/collect`
- Meta: `facebook.com/tr` o `connect.facebook.net`

**Importante:** gli eventi firano solo dopo aver accettato i cookie tramite il banner (accetta almeno analytics per GA4, marketing per Meta).

### GA4 DebugView

Aggiungi `?debug_mode=true` all'URL del primo landing. Gli eventi arrivano in real-time su GA4 → Admin → DebugView.

### Meta Pixel Helper (Chrome extension)

Installa [Meta Pixel Helper](https://chromewebstore.google.com/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc). Mostra tutti gli eventi Pixel firati + eventuali errori di payload.

### Test manuali consigliati

1. **Form funnel completo**: apri form → compila solo "Nome" e "Cognome" → chiudi tab → in DebugView verifica `form_start` + `form_abandoned` con `last_field: 'cognome'`, `fields_completed_count: 2`.
2. **Validation error**: inserisci email invalida e blurra → verifica `form_field_error` con `error_type: 'invalid_email'`.
3. **UTM attribution**: apri `?utm_source=test&utm_campaign=qa` → accetta cookies → submit form → email EmailJS deve contenere `Sorgente: test`, `Campagna: qa`.
4. **Engagement milestone**: resta 3 minuti su pagina → verifica 4 `time_on_page` events (15, 30, 60, 180).
5. **Scroll milestone**: scrolla fino al fondo → verifica 4 `scroll_depth` events (25, 50, 75, 100).
6. **CTA enrichment**: scrolla al 50%, aspetta 30s, click CTA hero → verifica `cta_click` con `scroll_depth >= 50`, `time_on_page_s >= 30`.

---

## Privacy & PII

### Cosa NON viene mai loggato

- Valori raw di nome, cognome, email, telefono, azienda, messaggio
- Messaggi di errore Zod raw (potrebbero contenere input utente) → solo categoria
- IP address (GA4 anonimizza di default; Meta Pixel non viene passato raw)

### Cosa viene loggato

- Nomi dei campi form (`nome`, `cognome`, ecc.) — costanti, non PII
- Categorie di errore (`invalid_email`, `too_short`, ecc.)
- Timing (ms) — non PII
- UTM/referrer — metadati di attribuzione, non PII personale
- `scroll_depth`, `time_on_page_s`, `sections_viewed_count` — comportamento aggregato

### Conformità GDPR

- Consenso **opt-in** richiesto per analytics e marketing (default negato)
- Script GA4/Meta non caricati senza consenso
- UTM first-touch in `sessionStorage` gated dal consenso analytics
- `sessionStorage` è tab-scoped (cleared alla chiusura tab), non cross-session
- Nessun cookie di terze parti usato direttamente dal nostro codice (solo GA4/Meta gestiscono i loro)

### Cosa succede se l'utente revoca il consenso

Gli script GA4/Meta caricati nella sessione corrente restano attivi fino al refresh. Al refresh non vengono più iniettati. Per cleanup completo immediato, si potrebbe aggiungere `gtag('consent', 'update', {...})` ma non è oggi implementato.

---

## Troubleshooting

| Problema | Causa probabile | Fix |
|---|---|---|
| Nessun evento in GA4 | Consenso non dato o `NEXT_PUBLIC_GA_MEASUREMENT_ID` mancante | Accetta cookies + verifica `.env.local` |
| Nessun evento Meta Pixel | Consenso marketing negato o `NEXT_PUBLIC_META_PIXEL_ID` mancante | Idem + verifica Pixel ID |
| UTM non arrivano in EmailJS | Template EmailJS non ha `{{utm_source}}`, ecc. | Aggiorna template (vedi sezione dedicata) |
| `form_abandoned` non fira | Submit riuscito prima (è corretto), o `form_start` mai firato | Verifica che il primo focus sia stato firato |
| `cta_click` senza enrichment | `session.init()` non chiamato | `UtmCapture` deve essere montato in `app/layout.tsx` |
| Events GA4 con `(not set)` parametri | Custom dimensions non configurate | Registra le custom dimensions in GA4 Admin |

---

## File di riferimento

**Core:**
- `lib/analytics.ts` — `trackEvent` + helper form
- `lib/session-tracker.ts` — singleton session state
- `components/analytics.tsx` — injection GA4 + Meta gated da consenso
- `components/cookie-consent-provider.tsx` — context consenso GDPR

**Tracker mount-once (in `app/layout.tsx`):**
- `components/utm-capture.tsx` — init session, cattura UTM
- `components/scroll-depth-tracker.tsx` — milestones scroll
- `components/time-tracker.tsx` — milestones tempo
- `components/section-view-tracker.tsx` — IntersectionObserver + ViewContent Meta

**Wrapper UI:**
- `components/tracked-link.tsx` — `TrackedLink` + `TrackedAnchor`

**Landing components con tracking:**
- `components/landing/waitlist-form.tsx` — form funnel completo + UTM in EmailJS
- `components/landing/hero.tsx`, `cta.tsx`, `navbar.tsx`, `footer.tsx`, `pricing.tsx`, `faq.tsx` — CTA e link tracciati
