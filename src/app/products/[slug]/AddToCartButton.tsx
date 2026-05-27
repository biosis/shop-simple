'use client'

import { useState } from 'react'
import type { Product } from '@/generated/prisma/client'
import { Button, Spinner } from '@/components/ui'
import { useCartStore } from '@/store/cart'
import { checkAndAddToCart } from '@/server/actions/cart'

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem)
  const [isAdded, setIsAdded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  async function handleClick() {
    setIsLoading(true)
    setErrorMsg(null)
    const result = await checkAndAddToCart(product.id)
    setIsLoading(false)
    if (!result.success) {
      setErrorMsg(result.error)
      setTimeout(() => setErrorMsg(null), 3000)
      return
    }
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
    <div className="space-y-2">
      <Button
        variant="primary"
        size="lg"
        fullWidth
        disabled={product.stock === 0 || isLoading}
        onClick={handleClick}
      >
        {product.stock === 0
          ? 'Indisponible'
          : isLoading
          ? <Spinner size="sm" />
          : isAdded
          ? 'Ajouté ✓'
          : 'Ajouter au panier'}
      </Button>
      {errorMsg && (
        <p className="text-sm text-red-500">{errorMsg}</p>
      )}
    </div>
  )
}
