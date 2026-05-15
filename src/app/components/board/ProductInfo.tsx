'use client'

import ProductImage from "@/app/(shop)/products/[mainCategory]/_components/ProductImage"
import { useInquireStore } from "@/store/useInquireStore"

export default function ProductInfo() {

  const { selectedProduct, setSelectedProduct } = useInquireStore()

  if (!selectedProduct) {
    return (
      <div className="mt-4 p-4 rounded-lg border text-gray-500 bg-gray-50 text-center text-sm">
        선택된 상품이 없습니다. 상품을 검색하여 선택해주세요.
      </div>
    )
  }

  function handleRemoveProduct() {
    setSelectedProduct(null)
  }


  return (
    <div>
      <p className="text-blue-500 font-semibold mb-4">선택된 상품</p>
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 relative">
            <ProductImage src={selectedProduct.thumbnail_image} alt={selectedProduct.name} />
          </div>
          <p className="font-bold text-gray-900">{selectedProduct.name}</p>
        </div>

        <button
          type="button"
          onClick={handleRemoveProduct}
          className="bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-300 h-12"
        >
          선택 취소
        </button>
      </div>
    </div>
  )
}