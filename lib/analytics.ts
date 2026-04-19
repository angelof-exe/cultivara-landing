declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

export type FormFieldErrorType =
  | "too_short"
  | "too_long"
  | "invalid_email"
  | "required"
  | "invalid"

export type FormSubmitErrorType =
  | "config_missing"
  | "network"
  | "validation"
  | "unknown"

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return

  if (window.gtag) {
    window.gtag("event", eventName, params)
  }

  if (window.fbq) {
    window.fbq("trackCustom", eventName, params)
  }
}

export function trackFormStart(formId: string) {
  trackEvent("form_start", { form_id: formId })
}

export function trackFormFieldError(
  formId: string,
  fieldName: string,
  errorType: FormFieldErrorType
) {
  trackEvent("form_field_error", {
    form_id: formId,
    field_name: fieldName,
    error_type: errorType,
  })
}

export function trackFormSubmitAttempt(
  formId: string,
  fieldsFilledCount: number,
  timeToAttemptMs: number
) {
  trackEvent("form_submit_attempt", {
    form_id: formId,
    fields_filled_count: fieldsFilledCount,
    time_to_attempt_ms: timeToAttemptMs,
  })
}

export function trackFormSubmitSuccess(
  formId: string,
  timeToCompleteMs: number
) {
  if (typeof window === "undefined") return

  trackEvent("form_submit_success", {
    form_id: formId,
    time_to_complete_ms: timeToCompleteMs,
  })

  // GA4 — standard "generate_lead" event (Key Event in GA4)
  if (window.gtag) {
    window.gtag("event", "generate_lead", {
      event_category: formId,
      event_label: `${formId}_signup`,
      value: 1,
    })
  }

  // Meta Pixel — standard "Lead" event
  if (window.fbq) {
    window.fbq("track", "Lead", {
      content_name: `${formId}_signup`,
    })
  }
}

export function trackFormSubmitError(
  formId: string,
  errorType: FormSubmitErrorType
) {
  trackEvent("form_submit_error", {
    form_id: formId,
    error_type: errorType,
  })
}

export function trackFormAbandoned(
  formId: string,
  lastField: string,
  fieldsCompletedCount: number,
  timeInFormMs: number
) {
  trackEvent("form_abandoned", {
    form_id: formId,
    last_field: lastField,
    fields_completed_count: fieldsCompletedCount,
    time_in_form_ms: timeInFormMs,
  })
}

/**
 * @deprecated Use trackFormSubmitSuccess("waitlist", elapsed) instead.
 * Kept for backward compatibility.
 */
export function trackWaitlistSubmission() {
  trackFormSubmitSuccess("waitlist", 0)
}
