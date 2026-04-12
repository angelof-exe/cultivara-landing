export const APP_MODE = process.env.NEXT_PUBLIC_APP_MODE ?? "saas"
export const isWaitlist = APP_MODE === "waitlist"
