'use client'

import { useState } from 'react'
import type { Product } from '@/generated/prisma/client'
import { ProductCard } from '@/components/ProductCard'
import { CategoryFilter } from '@/components/CategoryFilter'

interface ProductsGridProps {
  products: Product[]
  categories: string[]
}

export function ProductsGrid({ products, categories }: ProductsGridProps) {
  const [selected, setSelected] = useState('Tous')

  const visible =
    selected === 'Tous' ? products : products.filter((p) => p.category === selected)

  return (
    <div>
      <div className="mb-6">
        <CategoryFilter
          categories={categories}
          selected={selected}
          onChange={setSelected}
        />
      </div>

      {visible.length === 0 ? (
        <p className="text-text-muted">Aucun produit dans cette catégorie.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
