// @/app/mypage/seller/products/components/SellerProductItemList.tsx
'use client'

import { useState } from 'react'
import { useUser } from '@/app/mypage/context/UserContext'
import { usePagination } from '@/hooks/usePagination'
import { SellerProduct } from '@/app/mypage/types/sellerOrderItems'
import SellerProductItemCard from './SellerProductItemCard'
import Pagination from '../../delivery/components/Pagination'
import { SellerProductItemSkeleton } from './SellerProductItemSkeleton'
import ProductEditModal from './ProductEditModal'
import { useSellerProducts } from '../hooks/useSellerProducts'

interface CustomUser {
  id: string
  store_id?: string
  email?: string
}

export default function SellerProductItemList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState<SellerProduct | null>(
    null,
  )

  const { user, isLoading: isUserLoading } = useUser()

  const storeId = (user as unknown as CustomUser)?.store_id

  const {
    products,
    isLoading: isDataLoading,
    refetch,
  } = useSellerProducts(storeId)

  const itemsPerPage = 5
  const { currentItems, totalPages } = usePagination(
    products,
    itemsPerPage,
    currentPage,
  )

  if (isUserLoading || (isDataLoading && products.length === 0)) {
    return (
      <div className="flex flex-col gap-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <SellerProductItemSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {products.length > 0 ? (
        <>
          <ul className="flex flex-col gap-4">
            {currentItems.map((product) => (
              <li key={product.id}>
                <SellerProductItemCard
                  product={product}
                  onEdit={() => setSelectedProduct(product)}
                />
              </li>
            ))}
          </ul>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <div className="py-20 text-center text-gray-500">
          등록된 상품이 없습니다.
        </div>
      )}

      {selectedProduct && (
        <ProductEditModal
          product={selectedProduct}
          onClose={() => {
            setSelectedProduct(null)
            refetch()
          }}
        />
      )}
    </div>
  )
}
