'use client'

import { useState } from 'react'
import type { Product } from '@/generated/prisma/client'
import { Button } from '@/components/ui'
import { useCartStore } from '@/store/cart'

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem)
  const [isAdded, setIsAdded] = useState(false)

  function handleClick() {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] ?? '',
    })
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 1500)
  }

  return (
    <Button
      variant="primary"
      size="lg"
      fullWidth
      disabled={product.stock === 0}
      onClick={handleClick}
    >
      {product.stock === 0 ? 'Indisponible' : isAdded ? 'Ajouté ✓' : 'Ajouter au panier'}
    </Button>
  )
}
