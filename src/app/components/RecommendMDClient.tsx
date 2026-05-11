'use client';

import { useState } from 'react';
import ProductsCard from './ProductsCard';
import { LucideThumbsUp } from 'lucide-react';
import { ProductWithCategory } from '@/api/getProductAll';

export interface RecommendMDClientProps {
  products: ProductWithCategory[]
  maxProducts: number
}

export default function RecommendMDClient({ products, maxProducts }: RecommendMDClientProps) {
  const [productsCount, setProductsCount] = useState(maxProducts);
  const [moreButton, setMoreButton] = useState(false);

  const moreProduct = () => {
    setProductsCount(prev => prev + 4);
    setMoreButton(true);
  };

  const visibleProducts = products.slice(0, productsCount);

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {visibleProducts.map((product) => (
          <ProductsCard
            baseUrl='/products'
            key={product.id}
            product={product}
            category={product.category_path}
          />
        ))}
      </ul>

      <button
        type="button"
        aria-disabled={moreButton}
        onClick={moreProduct}
        className="flex justify-center w-full m-auto max-w-70 font-bold rounded-2xl mbs-15 px-3 py-3 text-white bg-[#FF6B6B] aria-disabled:hidden cursor-pointer"
      >
        <LucideThumbsUp className="me-2.5" />
        추천상품 더보기
      </button>
    </>
  );
}
