'use client'

import ProductImage from '@/app/(shop)/products/[mainCategory]/_components/ProductImage'
import { useInquireStore } from '@/store/useInquireStore'

export default function ProductInfo() {
  const { selectedProduct, setSelectedProduct } = useInquireStore()

  if (!selectedProduct) {
    return (
      <div className="mt-4 rounded-lg border bg-gray-50 p-4 text-center text-sm text-gray-500">
        선택된 상품이 없습니다. 상품을 검색하여 선택해주세요.
      </div>
    )
  }

  function handleRemoveProduct() {
    setSelectedProduct(null)
  }

  return (
    <div>
      <p className="mb-4 font-semibold text-blue-500">선택된 상품</p>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-16 w-16">
            <ProductImage
              preload={true}
              src={selectedProduct.thumbnail_image}
              alt={selectedProduct.name}
              sizes="(max-width: 768px) 50vw, 600px"
            />
          </div>
          <p className="font-bold text-gray-900">{selectedProduct.name}</p>
        </div>

        <button
          type="button"
          onClick={handleRemoveProduct}
          className="h-12 bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-300"
        >
          선택 취소
        </button>
      </div>
    </div>
  )
}
