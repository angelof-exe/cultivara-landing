import { isWaitlist } from "@/lib/config"
import { UrgencyBanner } from "@/components/landing/urgency-banner"
import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Compliance } from "@/components/landing/compliance"
import { Pricing } from "@/components/landing/pricing"
import { WaitlistForm } from "@/components/landing/waitlist-form"
import { Faq } from "@/components/landing/faq"
import { Cta } from "@/components/landing/cta"
import { Footer } from "@/components/landing/footer"
import { StructuredData } from "@/components/landing/structured-data"

export default function Page() {
  return (
    <>
      <StructuredData />
      <UrgencyBanner />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Compliance />
        {isWaitlist ? <WaitlistForm /> : <Pricing />}
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
