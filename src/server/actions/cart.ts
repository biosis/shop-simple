'use server'

import { prisma } from '@/lib/prisma'

type CheckResult =
  | { success: false; error: string }
  | { success: true; data: { stock: number } }

export async function checkAndAddToCart(productId: string): Promise<CheckResult> {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { id: true, name: true, price: true, images: true, stock: true },
  })

  if (!product) {
    return { success: false, error: 'Produit introuvable' }
  }

  if (product.stock === 0) {
    return { success: false, error: 'Produit en rupture de stock' }
  }

  return { success: true, data: { stock: product.stock } }
}
