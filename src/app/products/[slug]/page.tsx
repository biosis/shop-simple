import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { Badge } from '@/components/ui'
import { formatPrice } from '@/lib/utils'
import { ProductImageGallery } from './ProductImageGallery'
import { AddToCartButton } from './AddToCartButton'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await prisma.product.findUnique({ where: { slug } })
  if (!product) return {}
  return { title: product.name }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await prisma.product.findUnique({ where: { slug } })
  if (!product) notFound()

  const { name, price, stock, category, description, images } = product

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <ProductImageGallery images={images} name={name} />

        <div className="flex flex-col gap-5">
          <div>
            <Badge variant="default">{category}</Badge>
          </div>

          <h1 className="text-3xl font-bold text-text leading-tight">{name}</h1>

          <p className="text-3xl font-bold text-accent">{formatPrice(price)}</p>

          {stock > 0 && stock <= 5 && (
            <Badge variant="warning">Plus que {stock} en stock</Badge>
          )}
          {stock === 0 && (
            <Badge variant="danger">Rupture de stock</Badge>
          )}

          <p className="text-text-muted leading-relaxed">{description}</p>

          <AddToCartButton product={product} />

          <Link
            href="/products"
            className="text-sm text-text-muted hover:text-primary transition-colors w-fit"
          >
            ← Retour à la boutique
          </Link>
        </div>
      </div>
    </main>
  )
}
