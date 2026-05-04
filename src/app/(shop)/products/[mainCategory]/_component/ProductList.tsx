'use client';

import { useState } from 'react';
import { Products } from '../lib/products';
import ProductsCard from '@/app/components/ProductsCard';
import ProductListSkeleton from './ProductListSkeleton';

type Props = {
  products: Products[];
  keyword?: string;
  sort?: string;
};

export default function ProductList({ products, keyword, sort }: Props) {
  const [loadedCount, setLoadedCount] = useState(0);

  const isAllLoaded = products.length === 0 || loadedCount >= products.length;

  const handleImageLoad = () => {
    setLoadedCount(prev => prev + 1);
  };

  return (
    <div className="relative">
      {!isAllLoaded && <ProductListSkeleton count={products.length || 12} />}

      <ul
        className={`grid grid-cols-4 gap-6 transition-opacity duration-300 ${
          isAllLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
        }`}
      >
        {products.map(product => (
          <ProductsCard key={product.id} product={product} keyword={keyword} sort={sort} onImageLoad={handleImageLoad} />
        ))}
      </ul>
    </div>
  );
}
