# Meta Ads Playbook — Cultivara Landing

Documentazione operativa per le campagne Meta (Facebook + Instagram) di Cultivara: architettura del funnel, naming, UTM, custom audiences, copy library e workflow di ottimizzazione.

## Indice

1. [Architettura del funnel](#architettura-del-funnel)
2. [Prerequisiti](#prerequisiti)
3. [Naming convention](#naming-convention)
4. [UTM scheme](#utm-scheme)
5. [Stage 1 — TOFU: blog traffic](#stage-1--tofu-blog-traffic)
6. [Stage 2 — MOFU: retargeting blog → waitlist](#stage-2--mofu-retargeting-blog--waitlist)
7. [Custom audiences da creare](#custom-audiences-da-creare)
8. [Eventi Meta Pixel rilevanti](#eventi-meta-pixel-rilevanti)
9. [Copy library — primary text + headline](#copy-library--primary-text--headline)
10. [Budget & KPI benchmark](#budget--kpi-benchmark)
11. [Workflow settimanale di ottimizzazione](#workflow-settimanale-di-ottimizzazione)
12. [Troubleshooting](#troubleshooting)
13. [File di riferimento](#file-di-riferimento)

---

## Architettura del funnel

Strategia attuale: portare traffico cold sull'articolo blog (educational), poi retargeting verso la waitlist. Approccio content-led, costruisce autorità, cohort di lead più qualificati di un Lead Ad nativo.

```
                ┌────────────────────────────────────┐
   COLD ─────►  │ STAGE 1 — Traffic / LPV            │
   (interessi)  │ Obiettivo: portare al blog post    │
                │ Budget tipico: €15/giorno          │
                │ KPI: CPLPV ≤ €0.40, CTR ≥ 1.5%    │
                └─────────────────┬──────────────────┘
                                  │ legge l'articolo
                                  ▼
                ┌────────────────────────────────────┐
   WARM ─────►  │ STAGE 2 — Conversion / Lead         │
   (custom      │ Obiettivo: spingere alla waitlist  │
   audience)    │ Budget tipico: €8-12/giorno        │
                │ KPI: CPL ≤ €10, ROAS qualitativo  │
                └─────────────────┬──────────────────┘
                                  │ submit form
                                  ▼
                            ✅  LEAD ACQUISITO
```

**Perché due stadi e non un Lead Ad nativo?** Il Lead Ad ha CPL più basso (€5-8 vs €9-16) ma raccoglie email "leggere" — utenti che cliccano su un'offerta senza contesto. La cohort blog-first è più piccola ma ha 2-3× tasso di apertura email post-iscrizione e converte meglio in trial post-launch.

Le due strategie possono coesistere se il budget lo permette: vedi sezione [Workflow settimanale di ottimizzazione](#workflow-settimanale-di-ottimizzazione).

---

## Prerequisiti

Prima di lanciare qualunque campagna verifica:

| Requisito | Dove | Azione se manca |
|---|---|---|
| Pixel Meta installato e attivo | Dashboard Meta Events Manager | Verifica via [Meta Pixel Helper](https://chromewebstore.google.com/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc) — deve sparare `PageView` su ogni pagina |
| Conversion API (CAPI) configurata | Pannello Meta — Eventi server | ⚠️ **Fortemente raccomandato**: recupera 20-40% degli eventi persi per iOS 14+ ATT e cookie banner. Cultivara lo manca al momento — è il prossimo upgrade |
| Privacy Policy live | `cultivara.it/privacy` | Necessaria sia per Meta sia per GDPR. Se manca, Meta blocca la pubblicazione di Lead Ads |
| Cookie banner GDPR | [components/cookie-consent-banner.tsx](../components/cookie-consent-banner.tsx) | Già live. Senza accettazione, gli eventi di tracking non firano e il Pixel non lavora |
| Articoli blog pubblicati | `cultivara.it/blog` | Almeno 1 articolo pubblicato (non draft) prima di Stage 1 |
| CTA waitlist nell'articolo | [components/blog/article-cta.tsx](../components/blog/article-cta.tsx) | Già attivo — `<ArticleCta variant="inline" />` + `<ArticleCta variant="final" />` su ogni post |
| Open Graph image | Per ogni articolo, campo `seo.ogImage` o `coverImage` su Sanity | Verifica con [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) — se l'anteprima link in Ads Manager è sbagliata, fai "Scrape Again" |

---

## Naming convention

Schema obbligatorio per mantenere ordine quando avrai 20+ campagne:

```
[OBIETTIVO]_[Funnel]_[Tema]_[YYYY-MM]              ← Campagna
[Paese]_[Audience]_[Età]_[Optimization]_[Versione]  ← Adset (Gruppo di inserzioni)
[Format]_[Hook]_[Versione]                          ← Inserzione
```

### Esempi

| Livello | Esempio |
|---|---|
| Campagna | `TRAFFICO_TOFU_Patentino_Verde_2026-05` |
| Adset | `IT_Hobbisti_Orto_40-70_LPV_v1` |
| Inserzione | `Post_Esistente_Patentino_Verde_Question_v1` |
| Campagna | `CONVERSION_MOFU_Retarget_Blog_2026-05` |
| Adset | `IT_Blog_Readers_30d_Lead_v1` |
| Inserzione | `Static_Urgenza_2027_v1` |

### Codici standard

| Sigla | Significato |
|---|---|
| `TOFU` | Top Of Funnel — cold acquisition |
| `MOFU` | Middle Of Funnel — retargeting warm |
| `BOFU` | Bottom Of Funnel — high-intent conversion |
| `LPV` | Landing Page Views (optimization) |
| `LEAD` | Conversion ottimizzata su `Lead` event |
| `LAL` | Lookalike Audience |
| `CA` | Custom Audience |

---

## UTM scheme

Ogni link da una ad verso il sito deve essere taggato. Senza UTM, GA4 attribuisce tutto il traffico FB a `facebook / referral`, indistinguibile dall'organico.

**Pattern**:
```
?utm_source=facebook
&utm_medium=cpc
&utm_campaign=[stage]_[tema]
&utm_content=[ad_variant_id]
```

### Esempi pratici

| Campagna | URL completo da incollare in Ads Manager |
|---|---|
| Stage 1 — Patentino Verde | `https://cultivara.it/blog/hobbisti-patentino-verde-quaderno-di-campagna?utm_source=facebook&utm_medium=cpc&utm_campaign=stage1_hobbisti_patentino&utm_content=question_v1` |
| Stage 2 — Retarget blog | `https://cultivara.it/?utm_source=facebook&utm_medium=cpc&utm_campaign=stage2_retarget_blog&utm_content=urgenza_v1#lista-attesa` |
| Boost organico | `https://cultivara.it/blog/...?utm_source=facebook&utm_medium=social&utm_campaign=patentino_organico` |

### `utm_medium` — guida valori

| Valore | Quando usarlo |
|---|---|
| `cpc` | Ad a pagamento (campagne sponsorizzate) |
| `social` | Boost di post organico, condivisione naturale |
| `email` | Newsletter Cultivara |

### First-touch attribution

[lib/session-tracker.ts](../lib/session-tracker.ts) memorizza il primo UTM con cui l'utente è arrivato e lo conserva in `sessionStorage`. Anche se l'utente:
1. Atterra sul blog con `utm_source=facebook`
2. Naviga su altre pagine
3. Torna 2 ore dopo direct e compila il form

L'evento `form_submit_success` arriverà in GA4 **con i parametri UTM originali**, mantenendo l'attribuzione corretta della ad. Vedi anche [TRACKING_ANALYTICS.md → UTM first-touch attribution](./TRACKING_ANALYTICS.md#utm-first-touch-attribution).

---

## Stage 1 — TOFU: blog traffic

### Obiettivo
Portare cold traffic verso un articolo blog. Educare, costruire pixel data, alimentare le custom audiences di Stage 2.

### Setup completo in Ads Manager

**Campagna**:
| Campo | Valore |
|---|---|
| Obiettivo | **Traffico** |
| Nome | `TRAFFICO_TOFU_[Tema]_[YYYY-MM]` |
| Categorie speciali | (vuoto) |
| Test A/B | OFF (per ora) |
| Advantage Campaign Budget (CBO) | **OFF** |

**Adset**:
| Campo | Valore |
|---|---|
| Nome | `IT_[Audience]_[Età]_LPV_v[N]` |
| Posizione di conversione | **Sito web** |
| Optimizzazione | **Visualizzazioni della pagina di destinazione** (NON "Click sul link") |
| Pixel | Cultivara |
| Budget giornaliero | **€15** (test iniziale) |
| Programmazione | Continua, almeno 7 giorni |
| Località | Italia |
| Età | secondo audience target (vedi sotto) |
| Lingua | Italiano |
| Targeting Advantage+ | **OFF** durante il test (per controllo preciso) |
| Posizionamenti | **Manuali**: Feed FB + Feed IG + Reels FB + Reels IG. Solo **mobile** |
| Audience Network | **OFF** (qualità bassa) |

**Audience consigliate per Stage 1**:

| Nome | Età | Interessi |
|---|---|---|
| **Hobbisti Orto** | 40-70 | Orticoltura, Orto familiare, Giardinaggio, Permacultura, Coltivazione biologica, Vivai, Cucina italiana, Sostenibilità, Slow food, Autoconsumo |
| **Pro Farmers** | 35-65 | Agricoltura, Coldiretti, CIA, Confagricoltura, AGEA, Coltivazione biologica, Trattore, Vinificazione, Olivicoltura, Disciplinari, Ecoschemi PAC |

Una **audience per articolo**: il post Patentino Verde matchα Hobbisti, un futuro post sulla compliance UE 2023/564 matchα Pro Farmers.

**Inserzione (boost di post esistente — preferito)**:
| Campo | Valore |
|---|---|
| Pagina | Cultivara |
| Account IG | (collegato) |
| Setup | **Usa post esistente** |
| Post | seleziona quello pubblicato organicamente |
| URL del sito web | URL del blog post **con UTM completi** |
| CTA Button | `Per saperne di più` |

**Perché boost del post esistente vs nuova creative?**
- Mantieni i like/commenti accumulati organicamente (social proof = +CTR)
- Meta storicamente premia post con engagement organico iniziale
- Risparmi tempo (niente rendering creative)

---

## Stage 2 — MOFU: retargeting blog → waitlist

### Obiettivo
Convertire i lettori del blog in lead della waitlist. Ottimizzato direttamente per `Lead`.

### Setup completo

**Campagna**:
| Campo | Valore |
|---|---|
| Obiettivo | **Conversioni** |
| Nome | `CONVERSION_MOFU_Retarget_Blog_[YYYY-MM]` |

**Adset**:
| Campo | Valore |
|---|---|
| Nome | `IT_Blog_Readers_30d_Lead_v[N]` |
| Posizione di conversione | **Sito web** |
| Evento di conversione | **Lead** |
| Pixel | Cultivara |
| Budget giornaliero | **€8-12** |
| Pubblico personalizzato | `Blog_Readers_30d` (vedi sezione successiva) |
| Esclusioni | `Leads_Lifetime` (chi è già iscritto) |
| Località | Italia |
| Età | 35-70 (largo, lascia a Meta) |
| Targeting dettagliato | (vuoto — ti basa solo sulla CA) |
| Posizionamenti | Manuali: Feed FB + Feed IG + Reels FB + Reels IG + Stories FB + Stories IG |

**Inserzione**:
| Campo | Valore |
|---|---|
| Setup | **Crea inserzione** (non boost, vuoi una creative dedicata waitlist) |
| Format | Single image 1080×1350 (4:5) o Video 9:16 |
| URL destinazione | `https://cultivara.it/?utm_source=facebook&utm_medium=cpc&utm_campaign=stage2_retarget_blog&utm_content=[hook]_v1#lista-attesa` |
| CTA Button | `Iscriviti` |

---

## Custom audiences da creare

Crea queste 4 audience **prima** di lanciare campagne. Vai a **Ads Manager → Audiences → Create → Custom Audience → Website**.

| Nome (CA) | Source | Regola | Durata | Uso |
|---|---|---|---|---|
| `Blog_Readers_30d` | Website | URL contains `/blog/` | 30 giorni | Audience principale Stage 2 |
| `Blog_Completers_30d` | Website | Custom event = `blog_post_read_progress` AND `progress >= 75` | 30 giorni | Audience alta intenzione, ROAS più alto |
| `CTA_Seen_NotClicked_30d` | Website | Custom event = `blog_cta_view` ESCLUDE chi ha `cta_click` con `location=article_*` | 30 giorni | Retargeting chirurgico: hanno *visto* il CTA, non cliccato. Creative diverso (testimonial, urgenza) |
| `Article_Sharers_30d` | Website | Custom event = `blog_post_share` | 30 giorni | Community-affine, lookalike di alta qualità |
| `Multi_Article_Readers_30d` | Website | Custom event = `related_post_click` | 30 giorni | Multi-touch readers — convertono 3-5× meglio |
| `Compliance_Clickers_30d` | Website | Custom event in [`compliance_link_click`, `blog_body_link_click`] | 30 giorni | Alta intenzione regulatory — usa creative deadline 2027 |
| `Form_Viewers_30d` | Website | Custom event = `ViewContent` AND `content_name = waitlist_form` | 30 giorni | Retargeting BOFU diretto su chi ha visto il form |
| `Leads_Lifetime` | Website | Standard event = `Lead` | 180 giorni | Lista esclusione per ogni adset Stage 1 e Stage 2 |

### Lookalike (più avanti)

Quando avrai **almeno 100 conversioni `Lead`**, crea le LAL:

| Nome | Source | Size |
|---|---|---|
| `LAL_Leads_1pct_IT` | `Leads_Lifetime` | 1% Italia |
| `LAL_Leads_2-5pct_IT` | `Leads_Lifetime` | 2-5% Italia (più ampio per scaling) |
| `LAL_BlogCompleters_1-3pct_IT` | `Blog_Completers_30d` | 1-3% Italia |

Sotto le 100 conversioni le LAL sono imprecise. Aspetta o usa `Form_Viewers_30d` come seed alternativo.

---

## Eventi Meta Pixel rilevanti

Il Pixel di Cultivara invia molti eventi (vedi [TRACKING_ANALYTICS.md](./TRACKING_ANALYTICS.md) per il dettaglio completo). Quelli rilevanti per Meta Ads:

### Eventi standard (ottimizzazione campagne)

| Evento | Quando fira | Uso in campagna |
|---|---|---|
| `PageView` | Su ogni pagina | Custom Audience baseline |
| `ViewContent` | Vista sezione `lista-attesa` | Custom Audience "ha visto il form" — **già attiva** |
| `Lead` | Submit waitlist completato | Conversion event di ottimizzazione Stage 2 |

### Eventi custom utili per CA + Lookalike

| Evento | Parametri | Custom Audience suggerita |
|---|---|---|
| `blog_post_view` | `slug, title, primary_category` | "Lettori di un articolo specifico" (filtra per slug) |
| `blog_post_read_progress` | `slug, title, progress (25/50/75/100)` | "Lettori completi" (`progress=75` o `100`) |
| `blog_post_read_time` | `slug, title, seconds (30/60/120/300)` | "Lettori engagement profondo" (`seconds=120` o `300`) |
| `blog_cta_view` | `slug, location` | "Hanno visto il CTA waitlist, non cliccato" — retarget chirurgico |
| `cta_click` | `location, label, slug?` | "Cliccatori CTA in articolo" (`location=article_inline` OR `article_final`) |
| `blog_post_share` | `slug, channel` | "Sharer dei post" — affinità community + alta intenzione |
| `related_post_click` | `target_slug, source_slug` | "Multi-articolo" — converte 3-5× meglio di lettori single-touch |
| `blog_search_zero_results` | `query_term, query_length` | Idee editoriali: cosa cercano i lettori e non trovi |
| `blog_body_link_click` | `href, is_external` | "Cliccatori fonti normative" — alta intenzione regulatory |
| `compliance_link_click` | `destination` | "Compliance interessati" — alta intenzione b2b agri |
| `form_start` | `form_id` | "Hanno iniziato il form, non completato" → retarget aggressivo |
| `faq_open` | `question` | "Lettori FAQ" — engagement moderato, target potenziale |

⚠️ **Conversion API è raccomandata** quando si lancia: senza CAPI, l'attribuzione di `Lead` perde il 20-40% degli eventi su iOS 14+ e con cookie banner rifiutati. Con CAPI Meta vede tutto e ottimizza meglio.

---

## Copy library — primary text + headline

Riferimento copy completi per le campagne attive. **Non incollare alla cieca**: rivedi sempre il messaggio sul tuo prodotto attuale.

### Stage 1 — varianti hook

#### Variante A — Question hook (consigliata)

**Primary text**:
```
🌱 «Questo obbligo riguarda anche gli hobbisti che hanno il Patentino Verde?»

Una domanda arrivata dalla nostra community che merita una risposta chiara — perché tanti di voi sono nella stessa condizione.

La risposta è sì: dal momento in cui usi il Patentino Verde per acquistare prodotti professionali, la legge ti equipara a un utilizzatore professionale. Anche se è "solo per l'orto di casa".

Ne abbiamo scritto un approfondimento con i riferimenti normativi precisi e cosa cambia dal 1° gennaio 2027.
```

**Headline**: `Patentino Verde: anche tu devi tenere il registro?`
**Description**: `Tutti gli obblighi normativi spiegati in 3 minuti.`

#### Variante B — Pain hook

**Primary text**:
```
⚠️ Hai il Patentino Verde e usi prodotti professionali nell'orto di casa?

La legge dice che devi tenere il quaderno di campagna. Punto.

Tante persone non lo sanno: dal momento in cui sfrutti il Patentino per acquistare prodotti professionali, sei equiparato a un utilizzatore professionale a tutti gli effetti.

Nell'articolo abbiamo riassunto: cosa scatta, quanto a lungo conservare la documentazione e cosa cambia dal 2027.
```

**Headline**: `Patentino Verde + prodotti pro = registro obbligatorio`
**Description**: `Cosa dice la normativa e come adeguarsi.`

#### Variante C — Authority hook

**Primary text**:
```
Quaderno di campagna: serve anche per l'orto di casa?

Sì, se usi il Patentino Verde per comprare prodotti professionali. Ecco i 3 obblighi che scattano:

✅ Quaderno entro 30 giorni dal trattamento
✅ Ricevute conservate per 3 anni
✅ Documentazione disponibile per i controlli

Riferimenti normativi e dettagli completi sul blog.
```

**Headline**: `Quaderno di campagna: cosa devi sapere`
**Description**: `D.Lgs. 150/2012, PAN 2014, D.M. 33/2018 spiegati semplici.`

### Stage 2 — varianti retargeting

#### Variante A — Riconoscimento (consigliata)

**Primary text**:
```
🌱 Hai letto il nostro post sul Patentino Verde.

Bravissimo: significa che ti interessa restare in regola.

Da gennaio 2027 il quaderno di campagna sarà obbligatoriamente digitale, anche per chi lo compila oggi su carta.

Iscriviti gratis alla lista d'attesa di Cultivara: avrai accesso anticipato e ti aggiorneremo sulle scadenze prima di chiunque altro.

→ Niente carta di credito
→ Cancellabile in qualsiasi momento
→ Aggiornamenti normativi via email
```

**Headline**: `Iscriviti gratis alla lista d'attesa`
**Description**: `Accesso anticipato a Cultivara. Niente carta richiesta.`

#### Variante B — Urgenza deadline

**Primary text**:
```
⏳ Mancano pochi mesi al 1° gennaio 2027.

Da quella data il quaderno di campagna sarà solo digitale. Tu sei pronto?

Cultivara è il quaderno di campagna digitale già conforme alla normativa: 10 sezioni AGEA, 15 controlli automatici, magazzino prodotti, costi colturali.

Iscriviti alla lista d'attesa per essere tra i primi a provarlo. Gratis, niente carta di credito.
```

**Headline**: `Sii pronto al 1° gennaio 2027`
**Description**: `Cultivara — il quaderno di campagna digitale.`

#### Variante C — Specificità + benefit

**Primary text**:
```
Cultivara fa al posto tuo:

✅ 10 sezioni AGEA precompilate
✅ 15 controlli automatici di conformità
✅ Magazzino prodotti fitosanitari
✅ Calcolo costi colturali per ettaro
✅ Export PDF/JSON/XML pronto per i controlli

Conforme al Regolamento UE 2023/564, AGEA, SIAN.

Iscriviti gratis alla lista d'attesa: nessuna carta richiesta.
```

**Headline**: `Il quaderno di campagna digitale, semplice`
**Description**: `Iscriviti gratis e prova in anteprima.`

---

## Budget & KPI benchmark

### Budget di lancio consigliato

| Stage | Budget giorn. | Durata test | Spesa totale test |
|---|---|---|---|
| Stage 1 (TOFU) | €15 | 7 giorni | ~€105 |
| Stage 2 (MOFU) | €10 | 7 giorni | ~€70 |
| **Totale pilota** | **€25** | **7 giorni** | **~€175** |

### KPI di successo settimana 1

| Metrica | Stage 1 (TOFU) | Stage 2 (MOFU) |
|---|---|---|
| **CPM** | €4-9 | €6-15 |
| **CTR** | ≥ 1.5% | ≥ 2% (audience warm) |
| **CPC** | ≤ €0.30 | ≤ €0.40 |
| **CPLPV** | ≤ €0.40 | n/a |
| **CPL** | n/a | ≤ €10 (target €5-8) |
| **Frequency** | < 2.5 | < 4 (warm può sopportare di più) |

### Soglie di intervento (giorno 7)

| Condizione | Azione |
|---|---|
| CTR < 1% **e** CPM > €15 | ⛔ Audience sbagliata — ricomponi gli interessi |
| CTR > 2% **e** CPM normale | ✅ Scala +30% di budget, lascia altre 7 giorni |
| CPL > €15 in Stage 2 | ⛔ Creative non converte — sostituiscila |
| Frequency > 5 | 📊 Audience saturata — espandi o ricicla |

---

## Workflow settimanale di ottimizzazione

Lunedì mattina, 30 minuti, in ordine:

### Ogni lunedì

1. **Apri Ads Manager** → vista campagne → range "Ultimi 7 giorni"
2. **Stage 1 — Top performer**: identifica adset con CTR ≥ 1.5% e CPLPV ≤ €0.40 → segna +30% budget
3. **Stage 1 — Underperformer**: adset con CTR < 1% dopo 7 giorni di learning → spegni e duplica con interessi diversi
4. **Stage 2 — CPL check**: se CPL > €10, controlla quale variante creative è la peggiore → sostituisci
5. **Frequency check**: ogni adset > 5 di frequency → espandi audience o cambia creative
6. **GA4 cross-check**: vai a GA4 → Acquisizione → Acquisizione del traffico → filtra per `Sorgente / mezzo` = `facebook / cpc`. Confronta con Ads Manager: se i numeri divergono di più del 20%, hai un problema di tracking (cookie consent, pixel rotto, CAPI mancante)
7. **Lead quality check**: apri la mail/EmailJS → ultimi lead → verifica che siano profili sensati (no email tipo `asdf@asdf.com`, no UTM `direct/none`)

### Ogni 30 giorni

1. **Refresh Custom Audiences**: le CA basate su 30d si rinnovano automaticamente, ma controlla la dimensione (`Audiences` panel)
2. **Lookalike check**: se hai raggiunto 100+ Lead, crea finalmente le LAL e attiva una **Campagna 3** con LAL come audience principale
3. **Creative fatigue**: se le creative top performer hanno frequency > 4 da 30 giorni, vanno rinfrescate con varianti nuove
4. **Articolo nuovo**: pubblica almeno **1 nuovo articolo blog** al mese per mantenere fresco il funnel TOFU. Senza nuova content, la stessa audience cold si esaurisce

### Ogni trimestre

1. **Conversion API audit**: verifica che gli eventi server-side stiano arrivando in Events Manager con event_match_quality ≥ 7/10
2. **Audience consolidation**: cancella audience non usate da 90+ giorni
3. **Naming hygiene**: verifica che le campagne nuove seguano la naming convention. Se hai trovato un format migliore, aggiorna `META_ADS.md`

---

## Troubleshooting

| Problema | Causa probabile | Fix |
|---|---|---|
| L'anteprima link nell'ad mostra titolo/immagine vecchi | Cache Open Graph di FB | [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) → incolla URL → "Scrape Again". Aspetta 1 min e ricarica Ads Manager |
| Pixel non mostra `Lead` in DebugView | Cookie marketing rifiutato | L'utente non ha accettato i cookie. Comportamento atteso. Verifica con un test in incognito accettando tutto |
| Campagna in "Apprendimento — Limitato" da 7+ giorni | Audience troppo piccola o budget troppo basso | Espandi audience (rimuovi un interesse ristretto) o aumenta budget a €25/giorno |
| CPL Stage 2 esplode (€20+) | CA `Blog_Readers_30d` quasi vuota | Devi alimentare prima Stage 1 per 7-14 giorni e accumulare CA. Vedi [Architettura](#architettura-del-funnel) |
| GA4 e Ads Manager mostrano numeri diversi (>20%) | Mancanza CAPI, cookie banner, attribution model | Implementa Conversion API. Confronta sempre Meta-attributed vs GA4-attributed solo orientativamente |
| Inserzione rifiutata per "Discriminazione" | Targeting età 40-70 percepito come discriminazione | Niente da fare con queste interessi (orto/orticoltura). Espandi età 25-70 e lascia che Meta ottimizzi |
| Inserzione rifiutata per "Practices Personali" | Hai usato "tu" troppo specifico (es. "Hai il Patentino Verde?") | Riscrivi in 3a persona o inclusivo: "Chi ha il Patentino Verde..." |
| Pixel non firando su `/blog/[slug]` | `next/script` non caricato | Apri DevTools → Network → cerca `connect.facebook.net/en_US/fbevents.js`. Se manca, controlla [components/analytics.tsx](../components/analytics.tsx) e che l'utente abbia consenso marketing |
| `cta_click` non arriva a Meta | Evento custom non whitelisted | Custom events arrivano automaticamente al Pixel se passi via `trackEvent()`. Verifica in Pixel Helper. Se non li vedi, controlla [lib/analytics.ts](../lib/analytics.ts) |

---

## File di riferimento

**Tracking & analytics correlati**:
- [TRACKING_ANALYTICS.md](./TRACKING_ANALYTICS.md) — sistema completo di analytics (eventi, GA4, GDPR)
- [BLOG.md](./BLOG.md) — Sanity blog (content delivery)

**Codice rilevante**:
- [components/analytics.tsx](../components/analytics.tsx) — injection Pixel + GA4 con consenso
- [components/cookie-consent-banner.tsx](../components/cookie-consent-banner.tsx) — banner GDPR
- [lib/analytics.ts](../lib/analytics.ts) — `trackEvent()` + helper standard events
- [lib/session-tracker.ts](../lib/session-tracker.ts) — first-touch UTM
- [components/blog/article-cta.tsx](../components/blog/article-cta.tsx) — CTA waitlist + `blog_cta_view` (IntersectionObserver)
- [components/blog/article-read-tracker.tsx](../components/blog/article-read-tracker.tsx) — `blog_post_read_progress` + `blog_post_read_time`
- [components/blog/blog-view-tracker.tsx](../components/blog/blog-view-tracker.tsx) — generic page-level event firer (mount-once)
- [components/blog/post-share-buttons.tsx](../components/blog/post-share-buttons.tsx) — `blog_post_share` con 7 canali
- [components/blog/post-body.tsx](../components/blog/post-body.tsx) — `blog_body_link_click` su link inline Portable Text
- [components/blog/post-card.tsx](../components/blog/post-card.tsx) — `post_card_click` (default), override per related/category
- [components/blog/related-posts.tsx](../components/blog/related-posts.tsx) — `related_post_click`
- [components/blog/post-toc.tsx](../components/blog/post-toc.tsx) — `blog_toc_click`
- [components/blog/blog-pagination.tsx](../components/blog/blog-pagination.tsx) — `blog_pagination_click`
- [components/section-view-tracker.tsx](../components/section-view-tracker.tsx) — `section_view` + Meta `ViewContent` su lista-attesa

**Tool esterni**:
- [Meta Ads Manager](https://business.facebook.com/adsmanager)
- [Meta Events Manager](https://business.facebook.com/events_manager2)
- [Meta Pixel Helper (Chrome)](https://chromewebstore.google.com/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Google Analytics 4](https://analytics.google.com)
- [Google Campaign URL Builder](https://ga-dev-tools.google/campaign-url-builder/) — generatore UTM
