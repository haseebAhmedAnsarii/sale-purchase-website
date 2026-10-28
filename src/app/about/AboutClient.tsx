import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { Container } from '@/components/Container'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Footer } from '@/components/Footer'

export function AboutClient() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      <Header />

      <main className="flex-1">
        {/* Editorial Hero */}
        <section className="relative w-full py-16 sm:py-24 bg-[#faf8f5] border-b border-gray-100">
          <Container>
            <ScrollReveal>
              <div className="max-w-3xl">
                <span className="text-xs font-bold uppercase tracking-widest text-[#765b48] mb-3 block">
                  Artisanal Provenance & Living Ethos
                </span>
                <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-950 leading-tight">
                  Objects shaped slowly by hand, designed to bring serenity to modern interiors.
                </h1>
                <p className="mt-6 text-base sm:text-lg leading-relaxed text-gray-700">
                  Founded with a vision to counter transient industrial production, TERRA STUDIO crafts heirloom stoneware, sculptural vessels, and ambient lighting that honor raw materiality and quiet spaces.
                </p>
              </div>
            </ScrollReveal>
          </Container>
        </section>

        {/* Narrative & Craft Section */}
        <section className="py-16 sm:py-24">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <ScrollReveal>
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-xs bg-[#f4f2ef] shadow-sm">
                  <Image
                    src="/images/master-potter-wheel.jpg"
                    alt="Master potter throwing stoneware ceramic bowl on the wheel"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                    priority
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={150}>
                <div className="space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-950">
                    The Union of Nordic Discipline and Japanese Wabi-Sabi
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed text-gray-700">
                    Our creative language balances the clean geometric proportions of Danish functionalism with the serene acceptance of natural imperfection found in Japanese wabi-sabi aesthetics.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed text-gray-700">
                    Rather than striving for machine sterility, we celebrate the subtle iron flecks that surface during high-fire kilning, the soft variations of hand-dipped mineral glazes, and the tactile grain of untreated stone.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/collections/all"
                      className="inline-flex items-center gap-2 rounded-xs bg-gray-950 px-6 py-3 text-xs sm:text-sm font-semibold text-white transition hover:bg-gray-800 cursor-pointer"
                    >
                      <span>Explore Studio Creations</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </Container>
        </section>

        {/* Three Material Pillars */}
        <section className="py-16 sm:py-20 bg-[#fbf9f6] border-t border-b border-gray-100">
          <Container>
            <ScrollReveal>
              <div className="max-w-2xl mb-12 sm:mb-16">
                <span className="text-xs font-bold uppercase tracking-widest text-[#765b48] mb-2 block">
                  Material Sourcing
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-950">
                  Honest, circular elements designed to age gracefully.
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ScrollReveal delay={0}>
                <div className="bg-white p-6 sm:p-8 rounded-xs border border-gray-100 shadow-xs h-full flex flex-col">
                  <span className="font-mono text-xs font-bold text-[#765b48] mb-3">01 / STONEWARE</span>
                  <h3 className="text-lg font-bold text-gray-950 mb-2">European Mineral Clays</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Sourced from historic European riverbeds and twice-fired at 1,280°C to achieve vitrified density, chip resistance, and organic matte surfaces.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={120}>
                <div className="bg-white p-6 sm:p-8 rounded-xs border border-gray-100 shadow-xs h-full flex flex-col">
                  <span className="font-mono text-xs font-bold text-[#765b48] mb-3">02 / TEXTILES</span>
                  <h3 className="text-lg font-bold text-gray-950 mb-2">Certified Flax Linen</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Woven exclusively from OEKO-TEX Standard 100 certified European flax fibers and stone-washed with natural pumice for cloud-soft drape.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={240}>
                <div className="bg-white p-6 sm:p-8 rounded-xs border border-gray-100 shadow-xs h-full flex flex-col">
                  <span className="font-mono text-xs font-bold text-[#765b48] mb-3">03 / METALS</span>
                  <h3 className="text-lg font-bold text-gray-950 mb-2">Brushed Solid Brass</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Machined solid brass components without artificial synthetic sealants, engineered to develop an authentic golden-amber patina over generations.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </Container>
        </section>

        {/* Curated Catalog Invitation */}
        <section className="py-16 sm:py-24">
          <Container>
            <ScrollReveal>
              <div className="max-w-2xl mx-auto text-center">
                <span className="text-xs font-bold uppercase tracking-widest text-[#765b48] mb-3 block">
                  Studio Catalog
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-gray-950">
                  Curate Your Sanctuary
                </h2>
                <p className="mt-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                  Explore our complete collection of handcrafted ceramic tableware, sculptural vessels, ambient lamps, and organic linen textiles.
                </p>
                <div className="mt-8">
                  <Link
                    href="/collections/all"
                    className="inline-flex items-center gap-2 rounded-xs bg-gray-950 px-8 py-3.5 text-xs sm:text-sm font-semibold tracking-wide text-white transition hover:bg-gray-800 cursor-pointer shadow-xs"
                  >
                    <span>Explore Full Studio Catalog</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  )
}
