import Image from 'next/image'
import Link from 'next/link'
import { Container } from '../Container'
import { heroData } from '@/data/hero'

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-slate-100" aria-label="Hero banner">
      {/* Background Image */}
      <div className="relative h-[28rem] sm:h-[34rem] lg:h-[40rem] w-full">
        <Image
          src={heroData.imageSrc}
          alt={heroData.imageAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Subtle gradient wash */}
        <div className="absolute inset-0 bg-linear-to-r from-black/20 via-transparent to-transparent pointer-events-none" />

        {/* Content Box overlaid on the left */}
        <div className="absolute inset-0 flex items-center">
          <Container>
            <div className="animate-fade-in-up max-w-[34rem] rounded-xs bg-white/95 p-8 sm:p-10 md:p-12 shadow-xl backdrop-blur-xs transition-shadow duration-500 hover:shadow-2xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-950">
                {heroData.title}
              </h1>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-gray-700">
                {heroData.description}
              </p>
              <div className="mt-6 sm:mt-8">
                <Link
                  href={heroData.buttonHref}
                  className="inline-flex items-center justify-center rounded-xs bg-black px-7 py-3.5 text-xs sm:text-sm font-semibold tracking-wide text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-gray-800 hover:-translate-y-0.5 active:translate-y-0 hover:shadow-lg focus:outline-hidden"
                >
                  {heroData.buttonText}
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  )
}
