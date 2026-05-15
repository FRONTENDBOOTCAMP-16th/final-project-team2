'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'

type loadingType = 'lazy' | 'eager' | undefined

interface ProductImageProps {
  src?: string
  alt: string
  sizes?: string
  priority?: boolean
  loading?: loadingType
  onLoadComplete?: () => void
}

export default function ProductImage({
  src,
  alt,
  sizes = '(max-width: 768px) 100vw, 25vw',
  loading = 'lazy',
  priority = false,
  onLoadComplete,
}: ProductImageProps) {
  const fallback = '/fallback.png'

  const [imgSrc, setImgSrc] = useState(src || fallback)

  const isReportedRef = useRef(false)

  const reportLoaded = () => {
    if (isReportedRef.current) return

    isReportedRef.current = true
    onLoadComplete?.()
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className="object-cover"
      onLoad={reportLoaded}
      loading={loading}
      onError={() => {
        reportLoaded()

        if (imgSrc !== fallback) {
          setImgSrc(fallback)
        }
      }}
    />
  )
}
