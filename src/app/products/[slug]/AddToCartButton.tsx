'use client'

import type { Product } from '@/generated/prisma/client'
import { Button } from '@/components/ui'

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  return (
    <Button
      variant="primary"
      size="lg"
      fullWidth
      disabled={product.stock === 0}
      onClick={() => console.log('add to cart:', product)}
    >
      {product.stock === 0 ? 'Indisponible' : 'Ajouter au panier'}
    </Button>
  )
}
