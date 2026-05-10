'use client';

import { useState } from 'react';
import ProductsCard from './ProductsCard';
import ProductsCardList from './ProductsCardList';
import { LucideThumbsUp } from 'lucide-react';
import { Products } from '@/app/lib/products';

interface RecommendMDProps {
  products: Products[];
  maxProducts: number;
}

export default function RecommendMD({ products, maxProducts }: RecommendMDProps) {
  const [productsList, setProductsList] = useState(maxProducts);
  const [moreButton, setMoreButton] = useState(false);

  const moreProduct = () => {
    setProductsList(prev => prev + 4);
    setMoreButton(true);
  };

  return (
    <>
      {/* <ProductsCardList>
        <ProductsCard maxProducts={productsList} products={products} />
      </ProductsCardList> */}

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
