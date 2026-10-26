import { Container } from '../Container'
import { CollectionCard } from '../CollectionCard'
import { collectionsData } from '@/data/collections'

export function Collections() {
  return (
    <section id="collections" className="w-full py-12 sm:py-16 bg-white" aria-label="Collections section">
      <Container>
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-950">
            Collections
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {collectionsData.map((col) => (
            <CollectionCard key={col.id} collection={col} />
          ))}
        </div>
      </Container>
    </section>
  )
}
