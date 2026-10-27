import { Container } from '../Container'
import { ScrollReveal } from '../ScrollReveal'
import Link from 'next/link'

export function CraftStory() {
  const pillars = [
    {
      number: '01',
      title: 'Artisanal Provenance & Earth Clays',
      description:
        'Every TERRA STUDIO vessel begins as raw, mineral-rich stoneware clay sourced from historic European riverbeds. Hand-thrown on the wheel by master potters and twice-fired at 1,280°C, our ceramic dinnerware and vessels achieve unmatched structural density, chip resistance, and organic tactile surfaces that celebrate subtle iron speckles.',
    },
    {
      number: '02',
      title: 'Architectural Silhouettes & Natural Light',
      description:
        'Guided by the principles of Danish minimalism and organic functionalism, each sculptural vase, travertine pedestal, and candleholder is designed with architectural discipline. Clean geometric arches, rhythmic fluting, and unglazed matte surfaces capture directional daylight to introduce tranquil, living warmth into modern sanctuaries.',
    },
    {
      number: '03',
      title: 'Honest Living Fibers & Brushed Metals',
      description:
        'Beyond stoneware, our collection honors authentic material integrity. We source 100% certified European flax linen woven with heirloom eyelash fringes, alongside solid brushed brass lamps and hand-blown frosted opal glass shades that cast soothing 2700K ambient illumination without harsh glares.',
    },
  ]

  const faqs = [
    {
      question: 'How should I care for handcrafted stoneware and unglazed terracotta?',
      answer:
        'All glazed stoneware plates and bowls are dishwasher and microwave safe. For unglazed sculptural vases and raw terra cotta vessels, we recommend hand washing with warm water and mild botanical soap to preserve natural surface patinas. Travertine trays should be wiped clean with a damp cloth and mild neutral pH soap.',
    },
    {
      question: 'What defines the Scandinavian slow living philosophy behind your decor?',
      answer:
        'Slow living centers on curating fewer, more meaningful objects that elevate daily rituals. Rather than transient seasonal decor, our ceramics, lamps, and linen throws are designed to age gracefully alongside you, grounding living rooms, dining tables, and bedrooms with tactile simplicity and timeless serenity.',
    },
    {
      question: 'Are your organic linen throws and bouclé textiles sustainably crafted?',
      answer:
        'Yes. Our linen is woven exclusively from OEKO-TEX Standard 100 certified European flax cultivated without harmful synthetic pesticides. Pre-washed with natural pumice stones for immediate cloud-soft drape, our throws provide breathable, hypoallergenic year-round insulation.',
    },
  ]

  return (
    <section
      id="craftsmanship-story"
      className="w-full py-16 sm:py-24 bg-[#faf8f5] border-t border-b border-gray-100"
      aria-label="Craftsmanship and Brand Philosophy"
    >
      <Container>
        {/* Editorial Section Heading */}
        <ScrollReveal>
          <div className="max-w-3xl mb-14 sm:mb-20">
            <span className="text-xs font-bold uppercase tracking-widest text-[#765b48] mb-3 block">
              The Philosophy of Slow Living
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-950 leading-tight">
              Crafted with intention, designed to bring serenity to modern interiors.
            </h2>
            <p className="mt-5 text-sm sm:text-base leading-relaxed text-gray-700">
              In a hurried world, TERRA STUDIO crafts timeless ceramic tableware, sculptural vessels, and ambient lighting that invite mindfulness into everyday living spaces. Each piece balances tactile raw textures with refined architectural proportions.
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Editorial Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 pb-16 border-b border-gray-200">
          {pillars.map((pillar, idx) => (
            <ScrollReveal key={pillar.number} delay={idx * 120}>
              <div className="flex flex-col h-full bg-white p-6 sm:p-8 rounded-xs shadow-xs border border-gray-100">
                <span className="font-mono text-xs font-bold text-[#765b48] mb-4">
                  {pillar.number}
                </span>
                <h3 className="text-lg font-bold text-gray-950 mb-3">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-gray-600 flex-1">
                  {pillar.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Studio FAQ & Care Section for SEO Word Count and Search Intent */}
        <div className="mt-16 sm:mt-20">
          <ScrollReveal>
            <div className="max-w-2xl mb-10">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-950">
                Frequently Asked Inquiries
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-gray-600">
                Learn more about our stoneware provenance, materials, and mindful interior care.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-950">
                    {faq.question}
                  </h4>
                  <p className="text-xs leading-relaxed text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Catalog callout link */}
          <ScrollReveal delay={300}>
            <div className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-gray-500">
                Have specific design questions or bespoke interior trade requests?
              </p>
              <Link
                href="/collections/all"
                className="text-xs font-bold text-gray-950 hover:underline flex items-center gap-1 group"
              >
                <span>Browse the complete collection</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  )
}
