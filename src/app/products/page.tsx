import { prisma } from '@/lib/prisma'
import { ProductsGrid } from '@/components/ProductsGrid'

export const metadata = {
  title: 'Notre boutique',
}

async function getProducts() {
  return prisma.product.findMany({ orderBy: { createdAt: 'desc' } })
}

export default async function ProductsPage() {
  const products = await getProducts()
  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))] as string[]

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
        <ProductsGrid products={products} categories={categories} />
      )}
    </main>
  )
}
