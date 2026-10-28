import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { FeaturedProducts } from '@/components/FeaturedProducts'
import { PromoBanner } from '@/components/PromoBanner'
import { Collections } from '@/components/Collections'
import { CraftStory } from '@/components/CraftStory'
import { Footer } from '@/components/Footer'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Featured Products */}
        <FeaturedProducts />

        {/* Middle 50/50 banner */}
        <PromoBanner />

        {/* Collections */}
        <Collections />

        {/* Craftsmanship & Brand Story (SEO Content & FAQ) */}
        <CraftStory />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
