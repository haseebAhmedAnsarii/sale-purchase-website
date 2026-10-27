import Link from 'next/link'
import { Container } from '../Container'
import { ScrollReveal } from '../ScrollReveal'
import { footerQuickLinks, footerInfo } from '@/data/footer'

export function Footer() {
  return (
    <footer className="w-full bg-black text-white pt-14 pb-12" aria-label="Site footer">
      <Container>
        <ScrollReveal>
          {/* Footer Top Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 pb-12 border-b border-gray-900">
            {/* Quick links column */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-200">
                Explore Collections
              </h3>
              <ul className="mt-4 space-y-2.5">
                {footerQuickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-gray-400 hover:text-white transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Store Info / Philosophy column */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-200">
                TERRA STUDIO
              </h3>
              <p className="mt-4 text-xs text-gray-400 leading-relaxed max-w-md">
                {footerInfo.note}
              </p>
              <p className="mt-3 text-xs text-gray-500 leading-relaxed max-w-md">
                Rooted in Danish minimalism and tactile Japanese wabi-sabi philosophy, our objects are shaped slowly by hand using mineral clays, natural linen fibers, and solid brushed metals.
              </p>
            </div>
          </div>

          {/* Footer Bottom Row */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[0.6875rem] text-gray-500">
            <p>{footerInfo.copyright}</p>
            <p>Slow Living • Handcrafted Ceramics • Nordic Craftsmanship</p>
          </div>
        </ScrollReveal>
      </Container>
    </footer>
  )
}


