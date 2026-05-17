'use client'

import { useState } from 'react'
import { LucideThumbsUp } from 'lucide-react'
import { ProductWithCategory } from '@/api/getProductAll'
import ProductsCard from '../ProductsCard'
import { mainCategories } from '@/app/(shop)/products/[mainCategory]/lib/category'

export interface RecommendMDClientProps {
  products: ProductWithCategory[]
  maxProducts: number
}

export default function RecommendMDClient({
  products,
  maxProducts,
}: RecommendMDClientProps) {
  const [productsCount, setProductsCount] = useState(maxProducts)
  const [moreButton, setMoreButton] = useState(false)

  const moreProduct = () => {
    setProductsCount((prev) => prev + 4)
    setMoreButton(true)
  }

  const visibleProducts = products.slice(0, productsCount)

  return (
    <>
      <ul className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {visibleProducts.map((product, i) => (
          <ProductsCard
            key={product.id}
            product={product}
            category={mainCategories[i]}
            preload={i === 0}
          />
        ))}
      </ul>

      <button
        type="button"
        aria-disabled={moreButton}
        onClick={moreProduct}
        className="m-auto mbs-15 flex w-full max-w-70 cursor-pointer justify-center rounded-2xl bg-black px-3 py-3 font-bold text-white aria-disabled:hidden"
      >
        <LucideThumbsUp className="me-2.5" />
        추천상품 더보기
      </button>
    </>
  )
}
