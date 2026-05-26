'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/generated/prisma/client'
import { Badge, Button, Card } from '@/components/ui'
import { formatPrice } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { name, slug, price, images, stock, category } = product
  const imageSrc = images[0] ?? null

  return (
    <Card className="overflow-hidden group hover:shadow-md hover:scale-[1.01] transition-all duration-200">
      <Link href={`/products/${slug}`} className="block">
        <div className="relative aspect-square bg-gray-100">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={name}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-200" />
          )}
          <div className="absolute top-2 left-2">
            <Badge variant="default">{category}</Badge>
          </div>
        </div>

        <div className="p-4 space-y-1">
          <h2 className="font-semibold text-text leading-snug line-clamp-2">{name}</h2>
          <p className="font-bold text-accent">{formatPrice(price)}</p>
        </div>
      </Link>

      <div className="px-4 pb-4 space-y-2">
        {stock > 0 && stock <= 5 && (
          <Badge variant="warning">Plus que {stock} en stock</Badge>
        )}
        {stock === 0 && (
          <Badge variant="danger">Rupture de stock</Badge>
        )}

        <Button
          variant="primary"
          size="sm"
          fullWidth
          disabled={stock === 0}
          onClick={() => onAddToCart ? onAddToCart(product) : console.log('add to cart:', product)}
        >
          {stock === 0 ? 'Indisponible' : 'Ajouter au panier'}
        </Button>
      </div>
    </Card>
  )
}
