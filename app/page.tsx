import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { InteractiveMap } from "@/components/interactive-map"
import { FeaturedSection } from "@/components/featured-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <InteractiveMap />
        <FeaturedSection />
      </main>
      <Footer />
    </div>
  )
}
