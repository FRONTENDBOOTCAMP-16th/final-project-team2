'use client';

import Image from 'next/image';
import { useState } from 'react';

type ProductImageProps = {
  src: string;
  alt: string;
  onLoadComplete?: () => void;
};

export default function ProductImage({ src, alt, onLoadComplete }: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src || '/pen_dummy.jpg');

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className="object-cover"
      onLoad={onLoadComplete}
      onError={() => {
        if (imgSrc !== '/pen_dummy.jpg') {
          setImgSrc('/pen_dummy.jpg');
        }
        onLoadComplete?.();
      }}
    />
  );
}
