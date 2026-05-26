import { prisma } from '@/lib/prisma'
import { Card, Badge } from '@/components/ui'
import { formatPrice } from '@/lib/utils'

export const metadata = {
  title: 'Notre boutique',
}

async function getProducts() {
  return prisma.product.findMany({ orderBy: { createdAt: 'desc' } })
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-text">Notre boutique</h1>
        <p className="mt-2 text-text-muted">
          Découvrez notre sélection de produits artisanaux
        </p>
      </div>

      {products.length === 0 ? (
        <p className="text-text-muted">Aucun produit disponible.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-60 w-full object-cover"
              />
              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-semibold text-text leading-snug">
                    {product.name}
                  </h2>
                  <Badge variant={product.stock > 0 ? 'success' : 'danger'}>
                    {product.stock > 0 ? 'En stock' : 'Épuisé'}
                  </Badge>
                </div>
                <p className="text-sm text-text-muted line-clamp-2">
                  {product.description}
                </p>
                <p className="font-bold text-accent">
                  {formatPrice(product.price)}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </main>
  )
}
