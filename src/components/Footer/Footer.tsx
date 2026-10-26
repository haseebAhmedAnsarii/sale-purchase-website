import Link from 'next/link'
import { Container } from '../Container'
import { footerQuickLinks, footerInfo } from '@/data/footer'

export function Footer() {
  return (
    <footer className="w-full bg-black text-white pt-12 pb-10" aria-label="Site footer">
      <Container>
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10 border-b border-gray-900">
          {/* Quick links column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-200">
              Quick links
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

          {/* Store Info / Copyright column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-200">
              {footerInfo.copyright}
            </h3>
            <p className="mt-4 text-xs text-gray-400 leading-relaxed max-w-sm">
              {footerInfo.note}
            </p>
          </div>
        </div>

        {/* Footer Bottom Row */}
        <div className="mt-8 text-[0.6875rem] text-gray-500">
          <p>{footerInfo.copyright}</p>
        </div>
      </Container>
    </footer>
  )
}
