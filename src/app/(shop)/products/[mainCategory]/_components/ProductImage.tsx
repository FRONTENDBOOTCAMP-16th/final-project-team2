'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

type ProductImageProps = {
  src?: string;
  alt: string;
  onLoadComplete?: () => void;
};

export default function ProductImage({ src, alt, onLoadComplete }: ProductImageProps) {
  const fallback = '/pen_dummy.jpg';
  const [imgSrc, setImgSrc] = useState(src || fallback);
  const isReportedRef = useRef(false);

  const reportLoaded = () => {
    if (isReportedRef.current) return;

    isReportedRef.current = true;
    onLoadComplete?.();
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className="object-cover"
      sizes="(max-width: 768px) 50vw, 25vw"
      onLoad={reportLoaded}
      onError={() => {
        reportLoaded();

        if (imgSrc !== fallback) {
          setImgSrc(fallback);
        }
      }}
    />
  );
}
