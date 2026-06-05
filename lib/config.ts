/**
 * Modalità della landing, pilotata da `NEXT_PUBLIC_APP_MODE`.
 *
 * - `waitlist`     — pre-lancio: raccoglie email tramite il form lista d'attesa.
 * - `release_free` — pre-apertura P.IVA: accesso gratuito completo a tutte le
 *   funzionalità per chi si registra. Le CTA portano direttamente alla
 *   registrazione dell'app reale; nessun prezzo a pagamento è mostrato.
 * - `saas`         — regime commerciale: mostra i piani a pagamento (Pricing).
 */
export type AppMode = "waitlist" | "release_free" | "saas"

export const APP_MODE = (process.env.NEXT_PUBLIC_APP_MODE ?? "saas") as AppMode
export const isWaitlist = APP_MODE === "waitlist"
export const isReleaseFree = APP_MODE === "release_free"

/**
 * URL dell'app reale dove l'utente crea l'account e ottiene accesso gratuito.
 * Configurabile via env così da non hardcodare il dominio (staging vs prod).
 */
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.cultivara.it"
/** Pagina di registrazione self-service dell'app. */
export const SIGNUP_URL = `${APP_URL}/signup`
/** Pagina di accesso (login) dell'app. */
export const LOGIN_URL = `${APP_URL}/login`

/**
 * Destinazione della CTA primaria ("inizia"), derivata da `APP_MODE`:
 * - waitlist     → ancora in-page al form lista d'attesa
 * - release_free → URL esterno di registrazione all'app (accesso gratuito)
 * - saas         → ancora in-page alla sezione prezzi
 */
export const primaryCtaHref = isWaitlist
  ? "#lista-attesa"
  : isReleaseFree
    ? SIGNUP_URL
    : "#prezzi"

/** True quando la CTA primaria punta a un URL esterno (no anchor in-page). */
export const primaryCtaIsExternal = isReleaseFree

/** Label usata nell'analytics per la CTA primaria. */
export const primaryCtaEventLabel = isWaitlist ? "waitlist" : "inizia_gratis"

/**
 * Voce di navigazione (navbar/footer) verso la sezione "offerta" della home,
 * variabile per modalità.
 */
export const offerNavLink = isWaitlist
  ? { label: "Lista d'Attesa", href: "#lista-attesa" }
  : isReleaseFree
    ? { label: "Accesso Gratuito", href: "#accesso-gratuito" }
    : { label: "Prezzi", href: "#prezzi" }
