'use client';

import { useState } from 'react';
import ProductsCard from '@/app/components/ProductsCard';
import ProductsCardList from '@/app/components/ProductsCardList';
import ProductListSkeleton from './ProductListSkeleton';
import { Products } from '@/app/lib/products';

type Props = {
  products: Products[];
  category: string;
  sort?: string;
};

export default function ProductListInner({ products, category, sort }: Props) {
  const [loadedCount, setLoadedCount] = useState(0);

  const isAllLoaded = products.length === 0 || loadedCount >= products.length;

  const handleImageLoad = () => {
    setLoadedCount(prev => prev + 1);
  };

  return (
    <div className="relative">
      {!isAllLoaded && <ProductListSkeleton count={products.length || 12} />}

      <ProductsCardList
        className={`transition-opacity duration-150 ${isAllLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}
      >
        {products.map(product => (
          <ProductsCard key={product.id} sort={sort} category={category} product={product} onImageLoad={handleImageLoad} />
        ))}
      </ProductsCardList>
    </div>
  );
}
