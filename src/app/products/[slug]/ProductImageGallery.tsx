'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ProductImageGalleryProps {
  images: string[]
  name: string
}

export function ProductImageGallery({ images, name }: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const imageSrc = images[selectedIndex] ?? null

  return (
    <div className="space-y-3">
      <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={name}
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={[
                'relative w-16 h-16 rounded-md overflow-hidden border-2 transition-colors flex-shrink-0',
                i === selectedIndex
                  ? 'border-accent'
                  : 'border-transparent hover:border-border',
              ].join(' ')}
            >
              <Image
                src={src}
                alt={`${name} vue ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
