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
  baseUrl: string;
};

export default function ProductListInner({ products, category, sort, baseUrl }: Props) {
  const [loadedCount, setLoadedCount] = useState(0);

  const isAllLoaded = products.length === 0 || loadedCount >= products.length;

  const handleImageLoad = () => {
    setLoadedCount(prev => prev + 1);
  };

  return (
    <div className="relative">
      {/* 데이터가 불러와지기 전까지 스켈레톤을 구현했습니다 */}
      {!isAllLoaded && <ProductListSkeleton count={products.length || 12} />}

      {/*상품 정보를 넣기위한 children을 받고 있습니다 */}
      <ProductsCardList
        className={`transition-opacity duration-150 ${isAllLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}
      >
        {products.map(product => (
          <ProductsCard baseUrl={baseUrl} key={product.id} sort={sort} category={category} product={product} onImageLoad={handleImageLoad} />
        ))}
      </ProductsCardList>
    </div>
  );
}
