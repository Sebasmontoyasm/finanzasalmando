import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { VideoCarousel } from "@/components/video-carousel"
import { ServicesSection } from "@/components/services-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { CalendlyButton } from "@/components/calendly-button"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <VideoCarousel />
      <ServicesSection />
      <ContactSection />
      <Footer />
      <CalendlyButton />
    </main>
  )
}
