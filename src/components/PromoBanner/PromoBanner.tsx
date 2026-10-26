import Image from 'next/image'
import Link from 'next/link'
import { Container } from '../Container'
import { ScrollReveal } from '../ScrollReveal'
import { bannerData } from '@/data/banner'

export function PromoBanner() {
  return (
    <section id="promo-banner" className="w-full py-8 sm:py-12 bg-white" aria-label="Promotion banner">
      <Container>
        <ScrollReveal>
          <div className="group grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-xs bg-[#121212] shadow-xl transition-all duration-700 hover:shadow-2xl">
            {/* Left Column: Placeholder Photo */}
            <div className="relative min-h-[22rem] sm:min-h-[26rem] lg:min-h-[30rem] w-full overflow-hidden">
              <Image
                src={bannerData.imageSrc}
                alt={bannerData.imageAlt}
                fill
                className="object-cover object-center transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Right Column: Dark Info Card */}
            <div className="flex flex-col justify-center px-8 py-12 sm:px-12 md:px-16 lg:px-20 bg-[#121212] text-white">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                {bannerData.title}
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-gray-300 max-w-md">
                {bannerData.description}
              </p>
              <div className="mt-8">
                <Link
                  href={bannerData.buttonHref}
                  className="inline-flex items-center justify-center rounded-xs bg-white px-8 py-3.5 text-xs sm:text-sm font-semibold tracking-wide text-black transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-gray-100 hover:-translate-y-0.5 active:translate-y-0 hover:shadow-lg focus:outline-hidden"
                >
                  {bannerData.buttonText}
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  )
}
