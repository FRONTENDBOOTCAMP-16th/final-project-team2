'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'

type ProductImageProps = {
  src?: string;
  alt: string;
  priority?: boolean;
  onLoadComplete?: () => void;
};

export default function ProductImage({ src, alt, priority = false, onLoadComplete }: ProductImageProps) {
  const fallback = '/pen_dummy.jpg';

  const [imgSrc, setImgSrc] = useState(src || fallback);

  const isReportedRef = useRef(false);

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
      priority={priority}
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
