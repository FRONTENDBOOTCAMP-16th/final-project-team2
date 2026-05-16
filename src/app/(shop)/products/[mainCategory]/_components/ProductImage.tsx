'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'

type LoadingType = 'lazy' | 'eager'

interface ProductImageProps {
  src?: string
  alt: string
  sizes?: string
  priority?: boolean
  loading?: LoadingType
  onLoadComplete?: () => void
}

export default function ProductImage({
  src,
  alt,
  sizes = '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw',
  priority = false,
  loading = 'lazy',
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
      loading={priority ? undefined : loading}
      className="object-cover"
      onLoad={reportLoaded}
      onError={() => {
        reportLoaded()

        if (imgSrc !== fallback) {
          setImgSrc(fallback)
        }
      }}
    />
  )
}
